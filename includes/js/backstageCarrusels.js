function loadBackstageCarousels() {
    fetch('includes/json/backstageEpisodes.json?t=' + new Date().getTime())
        .then(response => response.json())
        .then(data => {
            const backstageSection = document.getElementById('backstage-section');

            // Cargar cada episodio y crear un carrusel por episodio
            data.episodes.forEach(episode => {
                const carouselContainer = document.createElement('div');
                carouselContainer.classList.add('episode-carousel');
                carouselContainer.innerHTML = `
                    <h3>${episode.title}</h3>
                    <div id="carousel-track-${episode.id}" class="owl-carousel owl-theme"></div>
                `;

                backstageSection.appendChild(carouselContainer);

                const carouselTrack = document.getElementById(`carousel-track-${episode.id}`);
                episode.content.forEach(content => {
                    if (content.type === "image") {
                        carouselTrack.innerHTML += `
                            <div class="item">
                                <img src="${content.src}" alt="${content.alt}" data-bs-toggle="modal" data-bs-target="#lightboxModal" onclick="openLightbox('${content.src}', 'image', '${content.alt}')">
                            </div>
                        `;
                    } else if (content.type === "video") {
                        const thumbnailUrl = `https://img.youtube.com/vi/${content.youtubeId}/hqdefault.jpg`;
                        carouselTrack.innerHTML += `
                            <div class="item video-thumbnail" data-bs-toggle="modal" data-bs-target="#lightboxModal" onclick="openLightbox('${content.youtubeId}', 'video')">
                                <img src="${thumbnailUrl}" alt="${content.alt}">
                                <div class="play-icon"><i class='bx bx-play'></i></div>
                            </div>
                        `;
                    }
                });

                // Inicializar Owl Carousel para cada episodio
                $(`#carousel-track-${episode.id}`).owlCarousel({
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
                        600: { items: 2 },
                        1000: { items: 4 }
                    }
                });

                // Añadir un <hr> después de cada carrusel
                const hr = document.createElement('hr');
                hr.classList.add('separator'); // Clase opcional para estilos adicionales
                backstageSection.appendChild(hr);
            });
        })
        .catch(error => console.error('Error al cargar el contenido del backstage:', error));
}

// Función para abrir el contenido en el lightbox modal
function openLightbox(src, type, alt = '') {
    const lightboxContent = document.getElementById('lightboxContent');
    const modalTitle = document.getElementById('lightboxModalLabel');

    lightboxContent.innerHTML = ''; // Limpiar contenido previo

    if (type === 'image') {
        lightboxContent.innerHTML = `<img src="${src}" alt="${alt}" class="img-fluid">`;
        modalTitle.textContent = alt;
    } else if (type === 'video') {
        lightboxContent.innerHTML = `
            <div class="ratio ratio-16x9">
                <iframe src="https://www.youtube.com/embed/${src}?autoplay=1" title="${alt}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        `;
        modalTitle.textContent = "Video del episodio";
    }

    // Mostrar el modal
    const lightboxModal = new bootstrap.Modal(document.getElementById('lightboxModal'));
    lightboxModal.show();
}

// Limpiar contenido del modal al cerrarlo
document.getElementById('lightboxModal').addEventListener('hidden.bs.modal', () => {
    document.getElementById('lightboxContent').innerHTML = ''; // Detener la reproducción del video y limpiar el contenido
});

// Cargar carruseles de backstage al cargar la página
document.addEventListener('DOMContentLoaded', loadBackstageCarousels);





