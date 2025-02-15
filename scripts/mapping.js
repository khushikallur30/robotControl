// Initialize the map
var map = L.map('map').setView([51.505, -0.09], 13); // Default position

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Custom icon for the robot
var robotIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1019/1019709.png", // Robot icon
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
});

// Robot marker (Initial position)
var robotMarker = L.marker([51.505, -0.09], { icon: robotIcon }).addTo(map)
    .bindPopup("Robot Location");

// Function to simulate real-time robot movement
function updateRobotPosition() {
    var lat = robotMarker.getLatLng().lat + (Math.random() - 0.5) * 0.002; // Slight random movement
    var lng = robotMarker.getLatLng().lng + (Math.random() - 0.5) * 0.002;
    robotMarker.setLatLng([lat, lng]).bindPopup("Robot Location: " + lat.toFixed(5) + ", " + lng.toFixed(5)).openPopup();
}

// Update robot position every 5 seconds (Simulated movement)
setInterval(updateRobotPosition, 5000);

// Add a marker when user clicks on the map
function onMapClick(e) {
    L.marker(e.latlng).addTo(map)
        .bindPopup("Selected Position: " + e.latlng.lat.toFixed(5) + ", " + e.latlng.lng.toFixed(5))
        .openPopup();
}

// Listen for map clicks
map.on('click', onMapClick);