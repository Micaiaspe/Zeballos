document.addEventListener('DOMContentLoaded', () => {
    // 1. Lógica del Modal de Integrantes con fotos (US-16)
    const teamCards = document.querySelectorAll('.team-member-card');
    const profileModal = document.getElementById('profile-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    const modalAvatar = document.getElementById('modal-avatar');
    const modalTitleName = document.getElementById('modal-title-name');
    const modalAge = document.getElementById('modal-age');
    const modalBadge = document.getElementById('modal-badge');
    const modalInfoDesc = document.getElementById('modal-info-desc');
    const modalTasksList = document.getElementById('modal-tasks-list');

    const teamData = {
        juliana: {
            name: "Juliana",
            age: "Edad: 18 años",
            role: "Rol: Scrum Master",
            avatar: "img/juli.jpeg",
            desc: "Encargada de facilitar las ceremonias ágiles, eliminar impedimentos del equipo y asegurar el cumplimiento del marco de trabajo Scrum.",
            tasks: [
                "Planificación de Sprints y dailies.",
                "Gestión de artefactos y seguimiento del Backlog."
            ]
        },
        luna: {
            name: "Luna",
            age: "Edad: 19 años",
            role: "Rol: Tester / QA",
            avatar: "img/luna.jpeg",
            desc: "Responsable de verificar la calidad del software, diseño de casos de prueba y reporte de defectos.",
            tasks: [
                "Ejecución de pruebas funcionales y de integración.",
                "Validación de criterios de aceptación."
            ]
        },
        constanza: {
            name: "Constanza",
            age: "Edad: 18 años",
            role: "Rol: Diseñadora UX/UI",
            avatar: "img/coni.jpeg",
            desc: "Enfocada en la maquetación visual, paleta de colores coherente, experiencia de usuario y diseño responsive.",
            tasks: [
                "Diseño de tarjetas, grillas y componentes estéticos.",
                "Optimización de la accesibilidad visual."
            ]
        },
        micaias: {
            name: "Micaias Peralta",
            age: "Edad: 18 años",
            role: "Rol: Programador Frontend",
            avatar: "img/micaias.jpeg",
            desc: "Desarrollador web enfocado en la estructura, maquetación CSS e interacción mediante JavaScript.",
            tasks: [
                "Desarrollo en HTML, CSS y JavaScript.",
                "Implementación de la maquetación y modales interactivos."
            ]
        }
    };

    teamCards.forEach(card => {
        card.addEventListener('click', () => {
            const memberKey = card.getAttribute('data-member');
            const data = teamData[memberKey];

            if (data) {
                modalAvatar.src = data.avatar;
                modalAvatar.alt = `Foto de ${data.name}`;
                modalTitleName.textContent = data.name;
                modalAge.textContent = data.age;
                modalBadge.textContent = data.role;
                modalInfoDesc.textContent = data.desc;

                modalTasksList.innerHTML = '';
                data.tasks.forEach(task => {
                    const li = document.createElement('li');
                    li.textContent = task;
                    modalTasksList.appendChild(li);
                });

                profileModal.style.display = 'flex';
            }
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            profileModal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === profileModal) {
            profileModal.style.display = 'none';
        }
    });

    // 2. Lógica del Formulario de Contacto (US-17)
    const contactForm = document.getElementById('contact-form');
    const successMsg = document.getElementById('form-success-msg');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            successMsg.style.display = 'block';
            contactForm.reset();

            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 5000);
        });
    }

    // 3. Smooth Scroll y resaltado dinámico en el menú según la posición del scroll
    const anchorLinks = document.querySelectorAll('.sidebar-nav a[href^="#"]');
    const sections = document.querySelectorAll('main section[id]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                anchorLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});