document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const hamburger = document.getElementById("hamburger");
    
    if (!sidebar || !hamburger) return;
    
    function toggleMenu(event) {
        event.stopPropagation();
        sidebar.classList.toggle("active");
        // document.getElementById("logo").textContent = "";
    }
    
    function closeMenu(event) {
        if (!sidebar.contains(event.target) && !hamburger.contains(event.target)) {
            sidebar.classList.remove("active");
        }
    }
    
    hamburger.addEventListener("click", toggleMenu);
    document.addEventListener("click", closeMenu);
});