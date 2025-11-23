const locationsData = {
    "Labs": {
        title: "Labs",
        description: "State-of-the-art science laboratories and research facilities.",
        hours: "Opening Hours: Mon-Fri: 8am – 9pm, Sat: 9am – 5pm",
        facilities: ["Chemistry Lab", "Physics Lab", "Biology Lab", "Computer Lab", "3D Printing", "Research Areas"],
        imageUrl: "url('assets/imgs/lab_banner.jpg')" 
    },
    "Library": {
        title: "Library",
        description: "A quiet haven for study, featuring private rooms and vast archives.",
        hours: "Opening Hours: Mon-Sun: 24 Hours",
        facilities: ["Quiet Zones", "Group Study", "Computers", "Printing", "Archives"],
        imageUrl: "url('assets/imgs/library_banner.jpg')"
    },
    "Canteen": {
        title: "Canteen",
        description: "Fresh food, coffee, and a great place to relax between classes.",
        hours: "Opening Hours: Mon-Fri: 7am – 8pm",
        facilities: ["Hot Food", "Sandwiches", "Coffee Bar", "Vending Machines"],
        imageUrl: "url('assets/imgs/canteen_banner.jpg')"
    },
    "Parking": {
        title: "Parking",
        description: "Secure parking facilities for students and staff.",
        hours: "Opening Hours: Mon-Sun: 6am – 11pm",
        facilities: ["Student Parking", "Staff Parking", "EV Charging", "Bike Racks"],
        imageUrl: "url('assets/imgs/parking_banner.jpg')"
    },
    "Admin Office": {
        title: "Admin Office",
        description: "Student services, admissions, and general inquiries.",
        hours: "Opening Hours: Mon-Fri: 9am – 5pm",
        facilities: ["Student Services", "Finance Office", "Registrar", "Lost & Found"],
        imageUrl: "url('assets/imgs/admin_office_banner.jpg')"
    }
};

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.addEventListener('DOMContentLoaded', () => {
    const destinationParam = getQueryParam('destination') || 'Labs';
    
    const currentData = locationsData[destinationParam] || locationsData["Labs"];

    document.getElementById('header-title-text').textContent = currentData.title;
    document.getElementById('page-title').textContent = currentData.title;
    document.getElementById('page-description').textContent = currentData.description;
    document.getElementById('page-hours').textContent = currentData.hours;
    
    const banner = document.getElementById('dynamic-banner');
    if (currentData.imageUrl) {
        banner.style.backgroundImage = currentData.imageUrl;
    }

    const viewMapLink = document.getElementById('view-map').parentElement;
    viewMapLink.href = `view_map.html?destination=${encodeURIComponent(destinationParam)}`;

    const startNavLink = document.getElementById('start-navigation').parentElement;
    startNavLink.href = `start_nav.html?destination=${encodeURIComponent(destinationParam)}`;

    const grid = document.getElementById('facility-grid');
    grid.innerHTML = ''; 
    
    currentData.facilities.forEach(facility => {
        const div = document.createElement('div');
        div.className = 'facility-item';
        div.textContent = facility;
        div.addEventListener('click', () => showMessage(`Facility info: ${facility}`));
        grid.appendChild(div);
    });
});

const messageBox = document.getElementById('message-box');

function showMessage(text) {
    messageBox.textContent = text;
    messageBox.style.display = 'block';
    setTimeout(() => {
        messageBox.style.display = 'none';
    }, 2500);
}