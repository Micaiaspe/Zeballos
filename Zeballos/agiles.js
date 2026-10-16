document.addEventListener('DOMContentLoaded', () => {
    // Registro de persistencia
    try {
        localStorage.setItem('sgcs_pagina_actual', 'agiles.html');
        localStorage.setItem('sgcs_ultima_seccion', 'Metodologías Ágiles');
    } catch(e) {}
});