function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.addEventListener('DOMContentLoaded', () => {
    const destination = getQueryParam('destination') || 'Labs';
    const time = getQueryParam('time') || '4 min';

    document.querySelector('.location-badge').textContent = destination;

    const timeParts = time.split(' ');
    if (timeParts.length >= 2) {
        document.querySelector('.card-value').textContent = timeParts[0];
        document.querySelector('.card-unit').textContent = timeParts[1]; 
    } else {
        document.querySelector('.card-value').textContent = time;
        document.querySelector('.card-unit').textContent = "";
    }
});