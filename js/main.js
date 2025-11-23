const cards = document.querySelectorAll('.profile-card');
const continueButton = document.getElementById('continue-button');
const messageBox = document.getElementById('message-box');
let selectedProfile = null;

function handleCardSelection(event) {
    const clickedCard = event.currentTarget;
    cards.forEach(card => card.classList.remove('selected'));
    clickedCard.classList.add('selected');
    selectedProfile = clickedCard.getAttribute('data-profile');
    continueButton.disabled = false;
}

function handleContinue() {
    if (selectedProfile) {
        const savePref = document.getElementById('save-preference').checked;
        messageBox.textContent = `Profile saved: ${selectedProfile}`;
        messageBox.style.display = 'block';
        setTimeout(() => {
            messageBox.style.display = 'none';
            window.location.href = 'campus_navigator.html';
        }, 1000);
    }
}

cards.forEach(card => {
    card.addEventListener('click', handleCardSelection);
});

continueButton.addEventListener('click', handleContinue);