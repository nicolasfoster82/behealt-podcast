document.addEventListener("DOMContentLoaded", function () {
    loadFeaturedEpisodes();
});

function loadFeaturedEpisodes() {
    fetch('includes/json/episodes.json?t=' + new Date().getTime())
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("featured-episodes-container");
            container.innerHTML = ""; // Limpia el contenedor antes de agregar contenido nuevo

            const featuredEpisodes = data.episodes.filter(episode => episode.status === "featured episode");

            featuredEpisodes.forEach(episode => {
                // Determinar la miniatura correcta
                const thumbnail = episode.youtubeId
                    ? `${episode.image}` // Miniatura de YouTube
                    : `https://i.scdn.co/image/${episode.image}`; // Miniatura de Spotify

                const episodeHTML = `
                    <div class="col-md-6 col-lg-3 mb-4">
                        <a href="?episode=${episode.id}" onclick="loadEpisode('${episode.id}'); return false;" class="link-featured-episode">
                            <div class="card card-featured-episode shadow-lg h-100">
                                <div class="row g-0">
                                    <!-- Columna de la imagen -->
                                    <div class="col-4 image-container">
                                        <img src="${thumbnail}"
                                            class="img-fluid rounded-start" alt="${episode.guest}">
                                        <div class="icon-overlay"><i class='bx bx-play'></i></div>
                                    </div>
                                    <!-- Columna del contenido -->
                                    <div class="col-8">
                                        <div class="card-body d-flex flex-column justify-content-between h-100">
                                            <div>
                                                <h6 class="text-muted">${episode.guest}</h6>
                                                <h5 class="card-title">${episode.title}</h5>
                                            </div>
                                            <div class="d-flex mt-auto">
                                                <span>${episode.min_date} / ${episode.duration}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                `;
                container.insertAdjacentHTML("beforeend", episodeHTML);
            });
        })
        .catch(error => console.error("Error loading episodes:", error));
}



