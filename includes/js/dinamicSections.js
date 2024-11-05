function loadSection(section, element) {
    const content = document.getElementById('content');
    fetch(section)
        .then(response => response.text())
        .then(html => {
            content.innerHTML = html;

            // Desplazar hacia la parte superior de la sección cargada
            window.scrollTo(0, 0); // O utiliza esto para toda la página

            // Llama a generateTeamCards solo si se carga about.html
            if (section === 'about.html') {
                generateTeamCards();
            }

            // Llamada a otras funciones según la sección
            if (section === 'seasons.html') {
                loadEpisodes();
            }

            if (section === 'home.html') {
                loadMostListenedEpisodes();
                loadFeaturedEpisodes();
                loadRecomendedEpisodes();
            }

            if (section === 'backstage.html') {
                loadBackstageCarousels();
            }

            // Remover y agregar clases de sección activa
            const activeLinks = document.querySelectorAll('.nav-link.active-section, .nav-link.active');
            activeLinks.forEach(link => {
                link.classList.remove('active-section', 'active');
                link.classList.add('text-white');
            });
            element.classList.add('active-section', 'active');
            element.classList.remove('text-white');
        })
        .catch(error => {
            content.innerHTML = '<p>Error al cargar la sección</p>';
        });
}

// Cargar el home al inicio de la página
document.addEventListener('DOMContentLoaded', function() {
    loadSection('home.html', document.getElementById('home-link'));
});
