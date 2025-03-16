// Function to update slider values
function updateSlider(sliderId, valueId) {
    document.getElementById(valueId).innerText = document.getElementById(sliderId).value;
}

// Event listeners for sliders
document.getElementById("slider1").addEventListener("input", function() {
    updateSlider("slider1", "value1");
});

document.getElementById("slider2").addEventListener("input", function() {
    updateSlider("slider2", "value2");
});