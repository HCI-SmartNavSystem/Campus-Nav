const DB_NAME = 'CampusNavigatorDB';
const DB_VERSION = 1;
const STORE_NAME = 'searchHistory';
const MAX_HISTORY = 5;
const VALID_DESTINATIONS = ["Library", "Labs", "Canteen", "Parking", "Admin Office"];

let db;

function initIndexedDB() {
    return new Promise((resolve, reject) => {
        if (!window.indexedDB) {
            console.error("IndexedDB is not supported.");
            reject(new Error("IndexedDB not supported"));
            return;
        }

        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, { keyPath: 'term' });
                store.createIndex('by_timestamp', 'timestamp', { unique: false });
            }
        };

        request.onsuccess = (event) => {
            db = event.target.result;
            console.log("IndexedDB initialized successfully.");
            resolve(db);
        };

        request.onerror = (event) => {
            console.error("IndexedDB error:", event.target.errorCode);
            reject(event.target.error);
        };
    });
}

async function getSearchHistory() {
    if (!db) {
        await initIndexedDB();
    }

    return new Promise((resolve) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const index = store.index('by_timestamp');
        
        const request = index.openCursor(null, 'prev');
        const history = [];

        request.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor && history.length < MAX_HISTORY) {
                history.push(cursor.value.term);
                cursor.continue();
            } else {
                resolve(history);
            }
        };
        request.onerror = () => {
            console.error("Error reading search history from IndexedDB.");
            resolve([]);
        };
    });
}

async function saveSearchTerm(term) {
    const sanitizedTerm = term.trim();
    if (!sanitizedTerm || !VALID_DESTINATIONS.map(d => d.toLowerCase()).includes(sanitizedTerm.toLowerCase())) {
        return;
    }

    if (!db) {
        await initIndexedDB();
    }

    const searchEntry = {
        term: sanitizedTerm,
        timestamp: Date.now()
    };
    
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    const request = store.put(searchEntry);

    request.onsuccess = async () => {
        console.log(`Saved/Updated search term: ${sanitizedTerm}`);
        await cleanupOldHistory();
        renderHistoryFromDB();
    };

    request.onerror = (event) => {
        console.error("Error saving search term to IndexedDB:", event.target.error);
    };
}

async function cleanupOldHistory() {
    const history = await getSearchHistory();
    if (history.length <= MAX_HISTORY) return;

    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index('by_timestamp');

    const request = index.openCursor(null, 'prev');
    let count = 0;

    request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            count++;
            if (count > MAX_HISTORY) {
                store.delete(cursor.value.term).onsuccess = () => {
                    console.log(`Cleaned up old history: ${cursor.value.term}`);
                };
            }
            cursor.continue();
        }
    };
}

async function renderHistoryFromDB() {
    const history = await getSearchHistory();
    const historyList = document.getElementById('search-history-list');
    const historyHeader = document.getElementById('history-header');
    
    if (!historyList || !historyHeader) return;
    
    historyList.innerHTML = '';

    if (history.length > 0) {
        historyHeader.style.display = 'block';
    } else {
        historyHeader.style.display = 'none';
    }

    history.forEach(term => {
        const listItem = document.createElement('li');
        listItem.className = 'history-tag';
        listItem.innerHTML = `<span class="history-icon">&#x231A;</span> ${term}`;
        listItem.dataset.term = term;
        listItem.addEventListener('click', () => {
            const searchInput = document.getElementById('search-input');
            searchInput.value = term;
            filterDestinations(term);
        });
        historyList.appendChild(listItem);
    });
}

function filterDestinations(query) {
    const list = document.getElementById('destination-list');
    const cards = list.querySelectorAll('.destination-card');
    const lowerQuery = query.toLowerCase();
    let found = false;

    cards.forEach(card => {
        const destinationName = card.dataset.destination.toLowerCase();
        if (destinationName.includes(lowerQuery) || lowerQuery === '') {
            card.style.display = 'flex';
            found = true;
        } else {
            card.style.display = 'none';
        }
    });

    const header = document.querySelector('.list-header');
    if (!header) return;

    if (query && !found) {
        header.textContent = `No results found for "${query}"`;
    } else if (query && found) {
        header.textContent = `Showing results for "${query}"`;
    } else {
            header.textContent = `Main Buildings`;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    
    await initIndexedDB();
    await renderHistoryFromDB();

    const searchInput = document.getElementById('search-input');
    
    searchInput.addEventListener('input', (event) => {
        filterDestinations(event.target.value);
    });
    
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            saveSearchTerm(event.target.value);
            filterDestinations(event.target.value);
        }
    });

    const cards = document.querySelectorAll('.destination-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function(event) {
            const destination = event.currentTarget.getAttribute('data-destination');
            
            saveSearchTerm(destination);

            cards.forEach(c => c.classList.remove('selected'));
            event.currentTarget.classList.add('selected');

            window.location.href = `location_detail.html?destination=${encodeURIComponent(destination)}`;
        });
    });
    
    filterDestinations('');
});