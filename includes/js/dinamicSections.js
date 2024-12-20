// Función para cargar una sección
function loadSection(section, element) {
    const content = document.getElementById('content');

    // Limpiar la URL si se navega desde un episodio
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('episode')) {
        // Remover el parámetro `episode` de la URL
        history.replaceState({}, '', window.location.pathname);
    }

    fetch(section)
        .then(response => response.text())
        .then(html => {
            content.innerHTML = html;

            // Desplazar hacia la parte superior de la sección cargada
            window.scrollTo(0, 0);

            // Verificar si hay un parámetro `episode` en la URL
            const urlParams = new URLSearchParams(window.location.search);
            const episodeId = urlParams.get('episode');

            if (section === 'salud-en-control.html') {
                // Cargar los episodios al abrir la sección
                loadEpisodes();

                // Si hay un episodio especificado en la URL, cargarlo
                if (episodeId) {
                    fetch('includes/json/episodes.json?t=' + new Date().getTime())
                        .then(response => response.json())
                        .then(data => {
                            const episodeExists = data.episodes.some(ep => ep.id === episodeId);
                            if (episodeExists) {
                                loadEpisode(episodeId);
                            } else {
                                // Si el episodio no existe, redirigir a home
                                loadSection('home.html', document.getElementById('home-link'));
                            }
                        })
                        .catch(error => {
                            console.error('Error al verificar el episodio:', error);
                            loadSection('home.html', document.getElementById('home-link'));
                        });
                }
            }

            if (section === 'home.html') {
                loadMostListenedEpisodes();
                loadFeaturedEpisodes();
                loadRecomendedEpisodes();
            }

            if (section === 'about.html') {
                generateTeamCards();
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
            if (element) {
                element.classList.add('active-section', 'active');
                element.classList.remove('text-white');
            }
        })
        .catch(error => {
            content.innerHTML = '<p>Error al cargar la sección</p>';
        });
}

// Cargar el home al inicio de la página
document.addEventListener('DOMContentLoaded', function() {
    loadSection('home.html', document.getElementById('home-link'));
});

