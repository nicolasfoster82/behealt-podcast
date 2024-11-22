document.addEventListener("DOMContentLoaded", function () {
    loadRecomendedEpisodes();
});

function loadRecomendedEpisodes() {
    // Reemplaza "episodes.json" con la ruta correcta de tu archivo JSON
    fetch('includes/json/episodes.json?t=' + new Date().getTime())
        .then(response => response.json())
        .then(data => {
            const episodesContainer = document.getElementById("recomended-episodes-container");
            episodesContainer.innerHTML = ""; // Limpia el contenedor antes de agregar contenido nuevo

            // Filtra y muestra solo los episodios con `status: "recomended episode"`
            data.episodes
                .filter(episode => episode.status === "recomended episode")
                .forEach(episode => {
                    // Determinar la miniatura correcta
                    const thumbnail = episode.youtubeId
                        ? `${episode.image}` // Miniatura de YouTube
                        : `https://i.scdn.co/image/${episode.image}`; // Miniatura de Spotify

                    const episodeHTML = `
                        <div class="col-md-4 col-lg-2 mb-4">
                            <a href="${episode.title}" onclick="loadEpisode('${episode.id}'); return false;" class="link-recomended-episode">
                                <div class="card recomended-episode-card">
                                    <div class="image-container">
                                        <img src="${thumbnail}" alt="${episode.title}">
                                        <div class="icon-overlay"><i class='bx bx-play'></i></div>
                                    </div>
                                    <div class="card-body">
                                        <h6>${episode.guest}</h6>
                                        <h5>${episode.title}</h5>
                                    </div>
                                    <div class="card-footer">
                                        <small>${episode.min_date} / ${episode.duration}</small>
                                    </div>
                                </div>
                            </a>
                        </div>
                    `;
                    episodesContainer.insertAdjacentHTML("beforeend", episodeHTML);
                });
        })
        .catch(error => console.error("Error al cargar los episodios:", error));
}


