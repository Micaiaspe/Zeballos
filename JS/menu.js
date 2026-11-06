document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del menú lateral
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const sidebar = document.getElementById('sidebar-menu');
    const overlay = document.getElementById('sidebar-overlay');

    // Función para abrir/cerrar el sidebar
    function toggleMenu() {
        if (sidebar) sidebar.classList.toggle('open');
        if (overlay) overlay.classList.toggle('active');
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }

    if (menuClose) {
        menuClose.addEventListener('click', toggleMenu);
    }

    if (overlay) {
        overlay.addEventListener('click', toggleMenu);
    }

    // Manejo del acordeón colapsable para las subsecciones
    const subMenuGroups = document.querySelectorAll('.menu-item.has-sub');
    subMenuGroups.forEach(group => {
        const arrow = group.querySelector('.arrow');
        if (arrow) {
            arrow.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                group.classList.toggle('open');
            });
        }
    });

    // Control de clics en los enlaces del menú lateral
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (href && href.includes('#')) {
                const [targetPage, targetId] = href.split('#');
                const pathParts = window.location.pathname.split('/');
                const currentPage = pathParts[pathParts.length - 1] || 'index.html';

                // Si el enlace apunta a la página actual
                if (!targetPage || currentPage === targetPage) {
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        e.preventDefault();
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        // Cierra el menú al hacer clic
                        if (sidebar && sidebar.classList.contains('open')) {
                            toggleMenu();
                        }
                    }
                } else {
                    // Si cambia de página, cerramos el menú con prolijidad
                    if (sidebar && sidebar.classList.contains('open')) {
                        toggleMenu();
                    }
                }
            }
        });
    });
});