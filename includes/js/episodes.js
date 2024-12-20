// Función para cargar episodios en los carruseles
function loadEpisodes() {
    fetch('includes/json/episodes.json?t=' + new Date().getTime())
        .then(response => response.json())
        .then(data => {
            const episodesBySeason = {};

            // Agrupar episodios por temporada
            data.episodes.forEach(episode => {
                if (!episodesBySeason[episode.season]) {
                    episodesBySeason[episode.season] = [];
                }
                episodesBySeason[episode.season].push(episode);
            });

            // Cargar episodios en cada carrusel
            for (const [season, episodes] of Object.entries(episodesBySeason)) {
                const carouselTrack = document.getElementById(`carousel-track-${season}`);
                carouselTrack.innerHTML = episodes.map(episode => {
                    // Determinar la miniatura correcta
                    const thumbnail = episode.youtubeId
                        ? `${episode.image}` // Miniatura de YouTube
                        : `https://i.scdn.co/image/${episode.image}`; // Miniatura de Spotify

                    return `
                        <div class="episode">
                            <a href="${episode.title}" onclick="loadEpisode('${episode.id}'); return false;">
                                <div class="image-container image-100">
                                    <img src="${thumbnail}" alt="Podcast ${episode.title}">
                                    <div class="icon-overlay"><i class='bx bx-play'></i></div>
                                </div>
                            </a>
                        </div>
                    `;
                }).join('');

                // Inicializar Owl Carousel
                $(carouselTrack).owlCarousel({
                    loop: true,
                    margin: 10,
                    nav: true,
                    dots: true,
                    autoplay: true,
                    autoplayTimeout: 3000,
                    navText: ["<i class='bx bx-chevron-left'></i>", "<i class='bx bx-chevron-right'></i>"],
                    autoplayHoverPause: true,
                    responsive: {
                        0: { items: 1 },
                        600: { items: 3 },
                        1000: { items: 6 }
                    }
                });
            }
        })
        .catch(error => console.error('Error al cargar los episodios:', error));
}

// Función para cargar la ficha técnica del episodio desde el JSON
function loadEpisode(episodeId) {
    fetch('includes/json/episodes.json?t=' + new Date().getTime())
        .then(response => response.json())
        .then(data => {
            const episode = data.episodes.find(ep => ep.id === episodeId);
            if (episode) {
                window.scrollTo(0, 0); // Scroll al inicio de la página
                const content = document.getElementById('content');
                content.innerHTML = `
                    <section class="team py-5">
                        <h2 class="episode-title">${episode.title}</h2>
                        <div class="episode-player">
                            ${
                                episode.spotifyId
                                    ? `<iframe class="spotify-player" style="border-radius:12px" src="https://open.spotify.com/embed/episode/${episode.spotifyId}?utm_source=generator" width="100%" height="325px" frameborder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
                                    : episode.youtubeId
                                    ? `<iframe class="youtube-player" style="border-radius:12px" width="100%" src="https://www.youtube.com/embed/${episode.youtubeId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                                    : `<p>Contenido no disponible.</p>`
                            }
                        </div>
                        <h3 class="episode-subtitle">Invitado/a</h3>
                        <p class="episode-description">${episode.guest}</p>

                        <h3 class="episode-subtitle">Fecha de publicación</h3>
                        <p class="episode-description">${episode.date}</p>

                        <h3 class="episode-subtitle">Descripción</h3>
                        <p class="episode-description">${episode.description}</p>
                        <a class="more-episode-link" href="" onclick="loadSection('salud-en-control.html', this); return false;">Más episodios</a>
                    </section>
                `;

                // Actualizar la URL dinámica sin recargar
                history.pushState({ episodeId }, episode.title, `?episode=${episodeId}`);
            } else {
                console.error('Episodio no encontrado');
            }
        })
        .catch(error => console.error('Error al cargar los detalles del episodio:', error));
}

// Manejar la carga inicial desde la URL
function handleInitialLoad() {
    const urlParams = new URLSearchParams(window.location.search);
    const episodeId = urlParams.get('episode');
    if (episodeId) {
        loadEpisode(episodeId);
    } else {
        console.error('No se especificó ningún episodio en la URL.');
    }
}

// Manejar el botón "Atrás" o "Adelante" del navegador
window.addEventListener('popstate', event => {
    if (event.state && event.state.episodeId) {
        loadEpisode(event.state.episodeId);
    } else {
        console.error('No hay estado en el historial.');
    }
});

// Llamada inicial
handleInitialLoad();





