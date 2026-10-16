
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const sidebar = document.getElementById('sidebar-menu');
    const overlay = document.getElementById('sidebar-overlay');
    const subItems = document.querySelectorAll('.has-sub');

    // Abrir Sidebar
    if (menuToggle && sidebar && overlay) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            sidebar.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Evita scroll de fondo
        });
    }

    // Cerrar Sidebar con la X
    if (menuClose && sidebar && overlay) {
        menuClose.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Cerrar Sidebar haciendo clic en la sombra (overlay)
    if (overlay && sidebar) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Despliegue con clic en flechas para pantallas táctiles/móviles
    subItems.forEach(item => {
        const arrow = item.querySelector('.arrow');
        if (arrow) {
            arrow.addEventListener('click', (e) => {
                e.stopPropagation();
                item.classList.toggle('open');
            });
        }
    });
});