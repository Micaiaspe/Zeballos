document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    function switchTab(targetId) {
        // Remover clase activa de botones y contenidos
        tabButtons.forEach(btn => {
            const isActive = btn.getAttribute('data-target') === targetId;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        tabContents.forEach(content => {
            content.classList.toggle('active', content.id === targetId);
        });

        // Actualizar el hash de la URL sin recargar para soportar anclajes
        if (history.pushState) {
            history.pushState(null, null, `#${targetId}`);
        } else {
            location.hash = `#${targetId}`;
        }
    }

    // Evento click en botones
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.getAttribute('data-target');
            switchTab(target);
        });
    });

    // Soporte para anclajes directos por URL (QA Check)
    const currentHash = window.location.hash.replace('#', '');
    if (currentHash && document.getElementById(currentHash)) {
        switchTab(currentHash);
    }
});