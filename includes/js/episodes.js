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
                carouselTrack.innerHTML = episodes.map(episode => `
                    <div class="episode">
                        <a href="${episode.title}" onclick="loadEpisode('${episode.id}'); return false;">
                            <div class="image-container">
                                <img src="https://i.scdn.co/image/${episode.image}" alt="Podcast ${episode.title}">
                                <div class="icon-overlay"><i class='bx bx-play'></i></div>
                            </div>
                        </a>
                    </div>
                `).join('');

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
    fetch('includes/json/episodes.json')  // Asegúrate de que esta ruta sea correcta
        .then(response => response.json())
        .then(data => {
            const episode = data.episodes.find(ep => ep.id === episodeId);
            if (episode) {
                const content = document.getElementById('content'); // Reemplazamos el contenido del <main> con la ficha técnica
                content.innerHTML = `
                    <h1>${episode.title}</h1>
                    <section class="spotify-player">
                        <iframe style="border-radius:12px" src="https://open.spotify.com/embed/episode/${episode.spotifyId}?utm_source=generator" width="100%" height="325px" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                    </section>

                    <h3>Invitado/a</h3>
                    <p>${episode.guest}</p>

                    <h3>Fecha de publicación</h3>
                    <p>${episode.date}</p>

                    <h3>Descripción</h3>
                    <p>${episode.description}</p>
                    <a href="" onclick="loadSection('seasons.html', this); return false;">Volver a episodios</a>
                `;
            } else {
                console.error('Episodio no encontrado');
            }
        })
        .catch(error => console.error('Error al cargar los detalles del episodio:', error));
}

// Cargar episodios al cargar la página
document.addEventListener('DOMContentLoaded', loadEpisodes);



