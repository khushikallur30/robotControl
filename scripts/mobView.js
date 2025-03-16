function moveElementsForMobile() {
    const scroller = document.querySelector('.scroller');
    const data = document.querySelector('.data');
    const vid = document.querySelector('.vid');
    const map = document.querySelector('.map');

    if (window.innerWidth <= 600) {
        // Mobile view: Move data, vid, and map into scroller
        scroller.appendChild(data);
        scroller.appendChild(vid);
        scroller.appendChild(map);
    } else {
        // Desktop view: Move data, vid, and map back to their original positions
        const container = document.querySelector('.container');
        const controls = document.querySelector('.controls');

        container.appendChild(data);
        controls.appendChild(vid);
        controls.appendChild(map);
    }
}

// Run on page load and window resize
window.addEventListener('resize', moveElementsForMobile);
window.addEventListener('load', moveElementsForMobile);