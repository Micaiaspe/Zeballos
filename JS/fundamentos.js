document.addEventListener('DOMContentLoaded', () => {
    // 1. Lógica Pestañas ISO 9126 / ISO 10006
    const tabs = document.querySelectorAll('.iso-tab');
    const contents = document.querySelectorAll('.iso-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');

            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.add('hidden'));

            tab.classList.add('active');
            const targetContent = document.getElementById(`tab-${target}`);
            if (targetContent) {
                targetContent.classList.remove('hidden');
            }
        });
    });

    // 2. Lógica Comparador Dinámico de Técnicas
    const selectA = document.getElementById('select-a');
    const selectB = document.getElementById('select-b');

    const dataTecnicas = {
        integracion: {
            nombre: "Pruebas de Integración",
            cat: "Nivel de Prueba",
            obj: "Verificar las interfaces y la comunicación entre diferentes módulos o servicios interconectados.",
            code: "Conocimiento parcial del código e interfaces de comunicación."
        },
        unitarias: {
            nombre: "Pruebas Unitarias",
            cat: "Nivel de Prueba",
            obj: "Validar el funcionamiento aislado de cada componente, función o método individual.",
            code: "Conocimiento total del código fuente (Caja Blanca)."
        },
        sistema: {
            nombre: "Pruebas de Sistema",
            cat: "Nivel de Prueba",
            obj: "Evaluar el sistema completo e integrado para verificar que cumpla con las especificaciones de requisitos.",
            code: "Enfoque principalmente de Caja Negra."
        },
        cajanegra: {
            nombre: "Caja Negra",
            cat: "Tipo / Técnica",
            obj: "Validar entradas y salidas del software evaluando requisitos sin examinar la estructura interna.",
            code: "Cero conocimiento del código fuente interno."
        },
        cajablanca: {
            nombre: "Caja Blanca",
            cat: "Tipo / Técnica",
            obj: "Examinar las estructuras internas, flujos lógicos y cobertura del código fuente.",
            code: "Conocimiento completo de la arquitectura del código."
        },
        regresion: {
            nombre: "Pruebas de Regresión",
            cat: "Tipo / Técnica",
            obj: "Garantizar que los cambios recientes o correcciones de errores no hayan roto funcionalidades previas.",
            code: "Varía según si las pruebas son unitarias o funcionales."
        }
    };

    function updateComparison() {
        if (!selectA || !selectB) return;
        const valA = dataTecnicas[selectA.value];
        const valB = dataTecnicas[selectB.value];

        if (valA) {
            document.getElementById('th-op-a').textContent = valA.nombre;
            document.getElementById('cat-a').textContent = valA.cat;
            document.getElementById('obj-a').textContent = valA.obj;
            document.getElementById('code-a').textContent = valA.code;
        }

        if (valB) {
            document.getElementById('th-op-b').textContent = valB.nombre;
            document.getElementById('cat-b').textContent = valB.cat;
            document.getElementById('obj-b').textContent = valB.obj;
            document.getElementById('code-b').textContent = valB.code;
        }
    }

    if (selectA && selectB) {
        selectA.addEventListener('change', updateComparison);
        selectB.addEventListener('change', updateComparison);
    }

    // 3. Lógica de Filtros para Herramientas de Calidad
    const filterButtons = document.querySelectorAll('.filter-btn');
    const toolCards = document.querySelectorAll('.tool-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            toolCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (filterValue === 'todos' || cardCategory === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
});

// 4. Lógica de pestañas interactivas para "Idea Central" (Concepto / Métricas / Estándares)
    const pillButtons = document.querySelectorAll('.pill-btn');
    const ideaContents = document.querySelectorAll('.idea-content');

    pillButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');

            // Quitar activo de todos los botones y ocultar contenidos
            pillButtons.forEach(b => b.classList.remove('active'));
            ideaContents.forEach(c => c.classList.add('hidden'));

            // Activar el botón presionado y mostrar su contenido correspondiente
            btn.classList.add('active');
            const targetContent = document.getElementById(`content-${targetId}`);
            if (targetContent) {
                targetContent.classList.remove('hidden');
            }
        });
    });