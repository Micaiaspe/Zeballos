document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    function switchTab(targetId) {
        tabButtons.forEach(btn => {
            const btnTarget = btn.getAttribute('data-tab') || btn.getAttribute('data-target');
            const isActive = btnTarget === targetId;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        tabContents.forEach(content => {
            content.classList.toggle('active', content.id === targetId);
        });

        if (history.pushState) {
            history.pushState(null, null, `#${targetId}`);
        } else {
            location.hash = `#${targetId}`;
        }
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.getAttribute('data-tab') || button.getAttribute('data-target');
            switchTab(target);
        });
    });

    const currentHash = window.location.hash.replace('#', '');
    if (currentHash && document.getElementById(currentHash)) {
        switchTab(currentHash);
    }
}); 