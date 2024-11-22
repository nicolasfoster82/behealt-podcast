function loadMostListenedEpisodes() {
    fetch('includes/json/episodes.json?t=' + new Date().getTime())
        .then(response => response.json())
        .then(data => {
            const mostListenedEpisodes = data.episodes.filter(episode => episode.most_listened);

            // Limitar a los primeros 5 episodios
            const limitedEpisodes = mostListenedEpisodes.slice(0, 5);

            const episodesContainer = document.getElementById('episodes-container');
            episodesContainer.innerHTML = ''; // Limpiar contenido previo

            // Crear el HTML para los episodios más escuchados
            limitedEpisodes.forEach((episode, index) => {
                const colDiv = document.createElement('div');
                colDiv.className = 'col d-flex align-items-center justify-content-center';

                const h3 = document.createElement('h3');
                h3.textContent = index + 1; // Números del 1 al 5

                // Determinar la imagen correcta (YouTube o Spotify)
                const img = document.createElement('img');
                img.src = episode.youtubeId
                    ? `${episode.image}` // Miniatura de YouTube
                    : `https://i.scdn.co/image/${episode.image}`; // Imagen de Spotify
                img.alt = episode.title;

                // Asignar el evento onclick a la imagen y al número
                img.onclick = () => loadEpisode(episode.id);
                h3.onclick = () => loadEpisode(episode.id);

                colDiv.appendChild(h3);
                colDiv.appendChild(img);
                episodesContainer.appendChild(colDiv);
            });
        })
        .catch(error => console.error('Error al cargar los episodios:', error));
}

// Función para cargar la ficha técnica del episodio
function loadEpisode(episodeId) {
    // Aquí puedes redirigir a la ficha técnica del episodio
    window.location.href = `ficha-tecnica.html?episodeId=${episodeId}`; // Cambia la URL según tu estructura
}

// Cargar episodios más escuchados al cargar la página
document.addEventListener('DOMContentLoaded', loadMostListenedEpisodes);

