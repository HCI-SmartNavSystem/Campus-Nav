const cards = document.querySelectorAll('.destination-card');
const messageBox = document.getElementById('message-box');

cards.forEach(card => {
    card.addEventListener('click', function(event) {
        const destination = event.currentTarget.getAttribute('data-destination');
        

        cards.forEach(c => c.classList.remove('selected'));
        event.currentTarget.classList.add('selected');

        window.location.href = `location_detail.html?destination=${encodeURIComponent(destination)}`;
    });
});