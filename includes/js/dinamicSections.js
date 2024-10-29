// Función para cargar secciones dinámicamente (como Inicio, Episodios Destacados, etc.)
function loadSection(section, element) {
    const content = document.getElementById('content');
    fetch(section)
        .then(response => response.text())
        .then(html => {
            content.innerHTML = html;
            // Aquí llamamos a la función que carga los episodios destacados si es necesario
            if (section === 'seasons.html') {
                loadEpisodes(); // Llama a la función que carga todos los episodios
            }

            if (section === 'home.html') {
                loadMostListenedEpisodes(); // Llama a la función que carga episodios mas vistos
                loadFeaturedEpisodes(); // Llama a la función que carga episodios recomendados
            }

            // Remover las clases de la sección activa anterior
            const activeLinks = document.querySelectorAll('.nav-link.active-section, .nav-link.active');
            activeLinks.forEach(link => {
                link.classList.remove('active-section', 'active');
                link.classList.add('text-white'); // Asegúrate de que el color del texto sea blanco
            });

            // Agregar las clases a la sección seleccionada
            element.classList.add('active-section', 'active');
            element.classList.remove('text-white'); // Remover el texto blanco si se está utilizando
        })
        .catch(error => {
            content.innerHTML = '<p>Error al cargar la sección</p>';
        });
}

// Cargar el home al inicio de la página
document.addEventListener('DOMContentLoaded', function() {
    loadSection('home.html', document.getElementById('home-link')); // Cargar la página de inicio por defecto
});