// Select the video element
document.addEventListener("DOMContentLoaded", () => {
    const videoElement = document.getElementById("liveVideo");
    const errorElement = document.getElementById("error");

    if (!videoElement) {
        console.error("Video element not found!");
        return;
    }


    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        errorElement.textContent = "Camera not supported on this browser.";
        return;
    }

    errorElement.textContent = "Camera Access Granted !!"

    // else{
    //     errorElement.textContent = "Camera Access granted !";
    //     return;
    // }

    // Request camera access
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            videoElement.srcObject = stream;
        })
        .catch((err) => {
            if (err.name === "NotAllowedError") {
                errorElement.textContent = "Permission denied. Please allow access to the camera.";
            } else if (err.name === "NotFoundError") {
                errorElement.textContent = "No camera found on your device.";
            } else {
                errorElement.textContent = `Error accessing camera: ${err.message}`;

            }
            console.error("Error accessing camera: ", err);
        });
    });