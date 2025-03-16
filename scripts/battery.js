// Update battery level and charging time every second

if (navigator.getBattery) {
    navigator.getBattery()
        .then((battery) => {
            const batteryLevelElement = document.getElementById("bat");

            if (!batteryLevelElement) {
                console.error("Element with ID 'batteryLevel' not found!");
                return;
            }

            const updateBatteryLevel = () => {
                batteryLevelElement.textContent = Math.round(battery.level * 100) + "%";
            };

            // Initial update and every time battery level changes
            updateBatteryLevel();
            battery.addEventListener("levelchange", updateBatteryLevel);
        })
        .catch((err) => {
            console.error("Error accessing battery status: ", err);
        });
} else {
    console.error("Battery API is not supported in this browser.");
}