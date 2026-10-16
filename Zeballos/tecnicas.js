document.addEventListener('DOMContentLoaded', () => {
    // 1. Diccionario de datos para cada tipo o nivel de prueba
    const datosPruebas = {
        'unitarias': {
            nombre: 'Pruebas Unitarias',
            categoria: 'Nivel de Prueba',
            objetivo: 'Validar el comportamiento de un módulo, clase o función aislada de código.',
            codigo: 'Conocimiento total del código fuente interno (Caja Blanca).',
            ejecuta: 'Desarrolladores.'
        },
        'integracion': {
            nombre: 'Pruebas de Integración',
            categoria: 'Nivel de Prueba',
            objetivo: 'Verificar las interfaces y la comunicación entre diferentes módulos o servicios interconectados.',
            codigo: 'Conocimiento parcial del código e interfaces de comunicación.',
            ejecuta: 'Desarrolladores / Testers.'
        },
        'sistema': {
            nombre: 'Pruebas de Sistema',
            categoria: 'Nivel de Prueba',
            objetivo: 'Evaluar el sistema completo e integrado en un entorno similar al de producción para verificar todos sus requisitos.',
            codigo: 'Generalmente se ejecutan sin examinar el código interno (Caja Negra).',
            ejecuta: 'Equipo de QA / Testers.'
        },
        'aceptacion': {
            nombre: 'Pruebas de Aceptación (UAT)',
            categoria: 'Nivel de Prueba',
            objetivo: 'Confirmar que el sistema cumple con los requisitos del negocio y está listo para su despliegue en producción.',
            codigo: 'Sin conocimiento interno del código (Orientado a negocio).',
            ejecuta: 'Usuarios finales, Product Owner y Clientes.'
        },
        'caja-negra': {
            nombre: 'Caja Negra',
            categoria: 'Tipo / Técnica',
            objetivo: 'Validar entradas y salidas del software evaluando requisitos sin examinar la estructura interna.',
            codigo: 'Cero conocimiento del código fuente interno.',
            ejecuta: 'Testers, QA y Usuarios finales (UAT).'
        },
        'caja-blanca': {
            nombre: 'Caja Blanca',
            categoria: 'Tipo / Técnica',
            objetivo: 'Examinar la estructura interna, rutas de código, condiciones y cobertura lógica del programa.',
            codigo: 'Acceso y conocimiento total del código fuente.',
            ejecuta: 'Desarrolladores y QA Automation.'
        }
    };

    // 2. Referencias a los elementos del DOM
    const selectA = document.getElementById('select-opcion-a');
    const selectB = document.getElementById('select-opcion-b');

    // Columna A
    const colHeaderA = document.getElementById('col-header-a');
    const catA = document.getElementById('cat-a');
    const objA = document.getElementById('obj-a');
    const codA = document.getElementById('cod-a');
    const ejeA = document.getElementById('eje-a');

    // Columna B
    const colHeaderB = document.getElementById('col-header-b');
    const catB = document.getElementById('cat-b');
    const objB = document.getElementById('obj-b');
    const codB = document.getElementById('cod-b');
    const ejeB = document.getElementById('eje-b');

    // 3. Función para actualizar la tabla
    function actualizarTabla() {
        if (!selectA || !selectB) return;

        const valA = selectA.value;
        const valB = selectB.value;

        const infoA = datosPruebas[valA];
        const infoB = datosPruebas[valB];

        if (infoA) {
            if (colHeaderA) colHeaderA.textContent = infoA.nombre;
            if (catA) catA.textContent = infoA.categoria;
            if (objA) objA.textContent = infoA.objetivo;
            if (codA) codA.textContent = infoA.codigo;
            if (ejeA) ejeA.textContent = infoA.ejecuta;
        }

        if (infoB) {
            if (colHeaderB) colHeaderB.textContent = infoB.nombre;
            if (catB) catB.textContent = infoB.categoria;
            if (objB) objB.textContent = infoB.objetivo;
            if (codB) codB.textContent = infoB.codigo;
            if (ejeB) ejeB.textContent = infoB.ejecuta;
        }
    }

    // 4. Registrar los eventos 'change' en ambos selectores
    if (selectA) selectA.addEventListener('change', actualizarTabla);
    if (selectB) selectB.addEventListener('change', actualizarTabla);

    // Ejecutar una vez al cargar
    actualizarTabla();
});