document.addEventListener('DOMContentLoaded', () => {
    // Lógica de Pestañas Interactivas para Modelos Tradicionales
    const modelTabs = document.querySelectorAll('.model-tab-btn');
    const modelBlocks = document.querySelectorAll('.model-content-block');

    modelTabs.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetModel = btn.getAttribute('data-model');

            // Quitar estado activo de los botones y ocultar bloques
            modelTabs.forEach(t => t.classList.remove('active'));
            modelBlocks.forEach(b => b.classList.add('hidden'));

            // Activar botón seleccionado y mostrar su bloque correspondiente
            btn.classList.add('active');
            const targetBlock = document.getElementById(`model-${targetModel}`);
            if (targetBlock) {
                targetBlock.classList.remove('hidden');
            }
        });
    });
});