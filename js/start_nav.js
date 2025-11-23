function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const mapImageElement = document.querySelector('.map-image');
if(mapImageElement) {
    mapImageElement.src = 'assets/imgs/mini_map.png';
}

const destination = getQueryParam('destination') || 'Labs';
document.getElementById('header-dest').textContent = destination;
document.querySelector('.tag-end').textContent = destination;

document.getElementById('back-link').href = `view_map.html?destination=${encodeURIComponent(destination)}`;

const messageBox = document.getElementById('message-box');
const routeCards = document.querySelectorAll('.route-card');

function showMessage(text) {
    messageBox.textContent = text;
    messageBox.style.display = 'block';
    setTimeout(() => { messageBox.style.display = 'none'; }, 2500);
}

routeCards.forEach(card => {
    card.addEventListener('click', (event) => {
        const routeName = event.currentTarget.getAttribute('data-route');
        
        routeCards.forEach(c => c.classList.remove('selected'));
        event.currentTarget.classList.add('selected');
        
        showMessage(`Selected: ${routeName}`);
        
        setTimeout(() => {
            const destParam = encodeURIComponent(destination);
            const routeParam = encodeURIComponent(routeName);
            window.location.href = `routes.html?destination=${destParam}&route=${routeParam}`;
        }, 1000);
    });
});