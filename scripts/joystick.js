const joystick = document.getElementById('joystick');
        const container = document.getElementById('joystick-container');
        const output = document.getElementById('output');
        
        let containerRect = container.getBoundingClientRect();
        let centerX = containerRect.width / 2;
        let centerY = containerRect.height / 2;

        joystick.addEventListener('mousedown', startDrag);
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('mousemove', drag);

        let isDragging = false;

        function startDrag(e) {
            isDragging = true;
        }

        function stopDrag() {
            isDragging = false;
            joystick.style.transform = `translate(0px, 0px)`;
            output.innerText = "Direction: Neutral";
        }

        function drag(e) {
            if (!isDragging) return;

            let offsetX = e.clientX - containerRect.left - centerX;
            let offsetY = e.clientY - containerRect.top - centerY;

            let distance = Math.sqrt(offsetX ** 2 + offsetY ** 2);
            let maxDistance = containerRect.width / 2 - 25;

            if (distance > maxDistance) {
                let angle = Math.atan2(offsetY, offsetX);
                offsetX = Math.cos(angle) * maxDistance;
                offsetY = Math.sin(angle) * maxDistance;
            }

            joystick.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

            detectDirection(offsetX, offsetY);
        }

        function detectDirection(x, y) {
            let direction = "Neutral";
            if (y < -30) direction = "Front";
            if (y > 30) direction = "Back";
            if (x < -30) direction = "Left";
            if (x > 30) direction = "Right";

            output.innerText = `Direction: ${direction}`;
        }