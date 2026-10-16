document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.member-card');
    const modal = document.getElementById('member-modal');
    const modalClose = document.getElementById('modal-close');

    const modalPhoto = document.getElementById('modal-photo');
    const modalFullName = document.getElementById('modal-fullname');
    const modalAge = document.getElementById('modal-age');
    const modalRole = document.getElementById('modal-role');
    const modalInfo = document.getElementById('modal-info');
    const modalTasks = document.getElementById('modal-tasks');

    const teamData = {
        juliana: {
            nombreCompleto: "Juliana Dahud",
            edad: 18,
            rol: "Scrum Master",
            foto: "img/juli.jpeg",
            info: "Líder de metodologías ágiles, encargada de facilitar la comunicación y el seguimiento del equipo.",
            tareas: `<ul><li>Facilitación de ceremonias Scrum y sprints.</li><li>Gestión y prioridad del Product Backlog.</li></ul>`
        },
        luna: {
            nombreCompleto: "Luna Willhuber",
            edad: 19,
            rol: "Tester QA",
            foto: "img/luna.jpeg",
            info: "Especialista en control de calidad, enfocada en la detección de errores y aseguramiento del software.",
            tareas: `<ul><li>Diseño y ejecución de casos de prueba funcional.</li><li>Documentación y reporte de errores.</li></ul>`
        },
        constanza: {
            nombreCompleto: "Constanza Strumia",
            edad: 18,
            rol: "Diseñadora UI/UX",
            foto: "img/coni.jpeg",
            info: "Responsable del diseño visual, experiencia de usuario y maquetación gráfica.",
            tareas: `<ul><li>Diseño de prototipos e interfaz visual.</li><li>Selección de paleta de colores y componentes.</li></ul>`
        },
        micaias: {
            nombreCompleto: "Micaias Peralta",
            edad: 18,
            rol: "Programador Frontend",
            foto: "img/micaias.jpeg",
            info: "Desarrollador web enfocado en la estructura, maquetación CSS e interacción mediante JavaScript.",
            tareas: `<ul><li>Desarrollo en HTML, CSS3 y JavaScript.</li><li>Implementación de la maquetación y modales interactivos.</li></ul>`
        }
    };

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const memberKey = card.getAttribute('data-member');
            const data = teamData[memberKey];

            if (data) {
                if (modalFullName) modalFullName.textContent = data.nombreCompleto;
                if (modalAge) modalAge.textContent = `Edad: ${data.edad} años`;
                if (modalRole) modalRole.textContent = `Rol: ${data.rol}`;
                if (modalPhoto) modalPhoto.src = data.foto;
                if (modalInfo) modalInfo.textContent = data.info;
                if (modalTasks) modalTasks.innerHTML = data.tareas;
                if (modal) modal.classList.add('active');
            }
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            if (modal) modal.classList.remove('active');
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }
});