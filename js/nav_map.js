const routeData = {
    "Shortest Route": { distance: "0.3 km", time: "4 min" },
    "Accessible Route": { distance: "0.4 km", time: "6 min" },
    "Shaded Path": { distance: "0.5 km", time: "7 min" }
};

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.addEventListener('DOMContentLoaded', () => {
    const destination = getQueryParam('destination') || 'Labs';
    const routeType = getQueryParam('route') || 'Shortest Route';
    
    document.querySelector('.destination-name').textContent = destination;
    
    const currentRoute = routeData[routeType] || routeData["Shortest Route"];
    
    document.querySelector('.eta-value').textContent = currentRoute.time;
    document.querySelector('.distance-value').textContent = currentRoute.distance;
    document.querySelector('.total-time').textContent = currentRoute.time;
    document.querySelector('.total-distance').textContent = currentRoute.distance;

    document.querySelector('.close-button').href = `routes.html?destination=${encodeURIComponent(destination)}&route=${encodeURIComponent(routeType)}`;

    document.getElementById('finish-trigger').addEventListener('click', () => {
        window.location.href = `arrived.html?destination=${encodeURIComponent(destination)}&time=${encodeURIComponent(currentRoute.time)}`;
    });
});