document.addEventListener('DOMContentLoaded', () => {
    // Guardar página actual en localStorage
    try {
        localStorage.setItem('sgcs_pagina_actual', 'sdlc.html');
        localStorage.setItem('sgcs_ultima_visita', new Date().toISOString());
        console.log('[Persistencia] Visita registrada en SDLC');
    } catch (e) {
        console.warn('Error accediendo a localStorage', e);
    }
});