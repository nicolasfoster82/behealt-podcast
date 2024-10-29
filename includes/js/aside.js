function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
}

// Cierra el menú cuando se hace clic en un enlace dentro del aside
document.querySelectorAll('#sidebar a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById("sidebar").classList.remove("active");
        document.getElementById("overlay").classList.remove("active");
    });
});

// Cierra el menú si se hace clic fuera del aside o en el overlay
document.addEventListener('click', (event) => {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const hamburger = document.getElementById("hamburger");

    if (sidebar.classList.contains("active") && !sidebar.contains(event.target) && event.target !== hamburger) {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    }
});

// Evita que el clic en el botón de hamburguesa cierre el menú inmediatamente
document.getElementById("hamburger").addEventListener("click", (event) => {
    event.stopPropagation();
});


