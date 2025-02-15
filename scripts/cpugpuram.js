// Fetch system usage data from the server
function fetchSystemUsage() {
    fetch('http://localhost:3000/system-usage')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateCardData(data);
            updateCharts(data);
        })
        .catch(error => console.error("Error fetching system usage:", error));
}

// Update the card elements with system usage data
function updateCardData(data) {
    document.getElementById('cpu-usage').textContent = `${Math.round(data.cpu)}%`;
    document.getElementById('gpu-usage').textContent = `${(data.gpu)}%`;
    document.getElementById('ram-usage').textContent = `${Math.round(data.ram)}%`;
}

// Create chart instances for CPU, GPU, and RAM usage
const ctxCpu = document.getElementById('cpuChart').getContext('2d');
const ctxGpu = document.getElementById('gpuChart').getContext('2d');
const ctxRam = document.getElementById('ramChart').getContext('2d');

const cpuChart = new Chart(ctxCpu, {
    type: 'line',
    data: {
        labels: [],  // Time-based labels will be added dynamically
        datasets: [{
            label: 'CPU Usage',
            data: [],  // Data will be added dynamically
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: true,
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

const gpuChart = new Chart(ctxGpu, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'GPU Usage',
            data: [],
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: true,
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

const ramChart = new Chart(ctxRam, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'RAM Usage',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

// Update the charts with the fetched system data
function updateCharts(data) {
    const timeLabel = new Date().toLocaleTimeString();  // Get the current time as label

    // Update CPU Chart
    cpuChart.data.labels.push(timeLabel);
    cpuChart.data.datasets[0].data.push(data.cpu);
    if (cpuChart.data.labels.length > 10) { // Keep only the last 10 entries
        cpuChart.data.labels.shift();
        cpuChart.data.datasets[0].data.shift();
    }
    cpuChart.update();

    // Update GPU Chart
    gpuChart.data.labels.push(timeLabel);
    gpuChart.data.datasets[0].data.push(data.gpu);
    if (gpuChart.data.labels.length > 10) {
        gpuChart.data.labels.shift();
        gpuChart.data.datasets[0].data.shift();
    }
    gpuChart.update();

    // Update RAM Chart
    ramChart.data.labels.push(timeLabel);
    ramChart.data.datasets[0].data.push(data.ram);
    if (ramChart.data.labels.length > 10) {
        ramChart.data.labels.shift();
        ramChart.data.datasets[0].data.shift();
    }
    ramChart.update();
}

// Fetch system usage every 2 seconds
setInterval(fetchSystemUsage, 2000);
