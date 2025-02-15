// Fetch system usage data from the server
function fetchSystemUsage() {
    fetch('http://localhost:3000/system-usage')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateCardData(data);
        })
        .catch(error => console.error("Error fetching system usage:", error));
}

// Update the card elements with system usage data
function updateCardData(data) {
    document.getElementById('cpu-usage').textContent = `${Math.round(data.cpu)}%`;
    document.getElementById('gpu-usage').textContent = `${(data.gpu)}%`;
    document.getElementById('ram-usage').textContent = `${Math.round(data.ram)}%`;
}

// Fetch system usage every 2 seconds
setInterval(fetchSystemUsage, 2000);
