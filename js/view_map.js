const mapImages = {
    "Labs": "lab_map.jpg",
    "Library": "library_map.jpg",
    "Canteen": "canteen_map.jpg",
    "Parking": "parking_map.jpg",
    "Admin Office": "admin_office_map.jpg"
};

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.addEventListener('DOMContentLoaded', () => {
    const destination = getQueryParam('destination') || 'Labs';
    
    document.getElementById('header-dest').textContent = destination;
    

    const mapImgName = mapImages[destination] || "lab_map.jpg";
    
    const mapImageElement = document.querySelector('.map-placeholder');
    if(mapImageElement) {
        mapImageElement.src = `assets/imgs/${mapImgName}`;
    }

    document.getElementById('back-link').href = `location_detail.html?destination=${encodeURIComponent(destination)}`;
    
    document.getElementById('start-nav-btn').addEventListener('click', () => {
        window.location.href = `start_nav.html?destination=${encodeURIComponent(destination)}`;
    });
});