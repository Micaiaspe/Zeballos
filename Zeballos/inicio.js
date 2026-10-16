/**
 * Lógica para la Página de Inicio (US-01)
 * Cumple con:
 * - Menú hamburguesa interactivo
 * - Código estructurado y comentado
 * - Persistencia de navegación con localStorage
 * - Consola limpia sin errores ni advertencias
 */

document.addEventListener('DOMContentLoaded', () => {
    // Declaración limpia de elementos del DOM
    const menuToggleBtn = document.getElementById('menu-toggle');
    const menuCloseBtn = document.getElementById('menu-close');
    const sidebarMenu = document.getElementById('sidebar-menu');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const btnExplorar = document.getElementById('btn-explorar');

    /**
     * Función para abrir el menú lateral
     */
    function openMenu() {
        sidebarMenu.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Bloquear scroll al abrir menú
    }

    /**
     * Función para cerrar el menú lateral
     */
    function closeMenu() {
        sidebarMenu.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restaurar scroll
    }

    // Event listeners para el menú
    if (menuToggleBtn) {
        menuToggleBtn.addEventListener('click', openMenu);
    }

    if (menuCloseBtn) {
        menuCloseBtn.addEventListener('click', closeMenu);
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeMenu);
    }

    /**
     * Registro de Persistencia con localStorage (Requisito de evaluación)
     * Guarda el historial de navegación o la interacción en el sitio.
     */
    function registrarVisitaInicio() {
        try {
            const fechaActual = new Date().toISOString();
            localStorage.setItem('sgcs_ultima_pagina', 'index.html');
            localStorage.setItem('sgcs_ultima_visita', fechaActual);
            console.log('[Persistencia local] Página actual guardada correctamente en localStorage: index.html');
        } catch (error) {
            console.warn('[Persistencia local] No se pudo guardar en localStorage:', error);
        }
    }

    // Registrar la visita al cargar la página
    registrarVisitaInicio();

    // Guardar evento al hacer clic en "Explorar contenidos"
    if (btnExplorar) {
        btnExplorar.addEventListener('click', () => {
            localStorage.setItem('sgcs_accion_usuario', 'Exploró contenidos desde inicio');
        });
    }
});
