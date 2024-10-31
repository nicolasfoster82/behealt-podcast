// Define la URL de tu archivo JSON
const teamDataUrl = 'includes/json/speakers.json';

// Selecciona el contenedor donde se insertarán las tarjetas
function generateTeamCards() {
    fetch(teamDataUrl)
        .then(response => response.json())
        .then(data => {
            const teamContainer = document.getElementById('team-container');
            if (teamContainer) {
                data.team.forEach(member => {
                    const cardHTML = `
                        <div class="col-md-6 mb-4 col-lg-3">
                            <div class="card card-speaker h-100 text-center">
                                <div class="d-flex justify-content-center mt-4">
                                    <img src="${member.image}" class="card-img-top rounded-circle" alt="${member.name}" style="width: 150px; height: 150px; object-fit: cover;">
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">${member.name}</h5>
                                    <p class="card-subtitle">${member.role}</p>
                                    <p class="card-text">${member.description}</p>
                                </div>
                            </div>
                        </div>
                    `;
                    teamContainer.insertAdjacentHTML('beforeend', cardHTML);
                });
            }
        })
        .catch(error => console.error('Error al cargar los datos del equipo:', error));
}

