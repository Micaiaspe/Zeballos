document.addEventListener('DOMContentLoaded', () => {
    // Control de la tarjeta izquierda
    const leftButtons = document.querySelectorAll('[data-left]');
    const leftDesc = document.getElementById('left-card-desc');

    const leftData = {
        concepto: "La calidad no debe verse como un adorno al final del desarrollo. Comienza desde los requerimientos y continúa durante todo el ciclo del producto.",
        metricas: "Las métricas ágiles miden el trabajo que queda pendiente y la velocidad del equipo mediante unidades relativas (puntos de historia), evitando medir horas brutas[cite: 54, 62].",
        estandares: "Mientras que los modelos tradicionales se centran en el seguimiento estricto de procesos, los marcos ágiles se basan en el talento y conocimiento tácito de las personas[cite: 20, 33]."
    };

    leftButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            leftButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const key = btn.getAttribute('data-left');
            if (leftData[key] && leftDesc) {
                leftDesc.textContent = leftData[key];
            }
        });
    });

    // Control de la tarjeta derecha
    const isoButtons = document.querySelectorAll('[data-iso]');
    const isoTitle = document.getElementById('iso-title');
    const isoSubtitle = document.getElementById('iso-subtitle');
    const isoChecklist = document.getElementById('iso-checklist');

    const isoData = {
        iso9126: {
            title: "ISO 9126",
            subtitle: "Estándar de referencia para evaluar atributos y características vinculadas a la calidad del producto de software.",
            items: [
                "Funcionalidad del producto",
                "Fiabilidad y comportamiento",
                "Facilidad de mantenimiento"
            ]
        },
        iso10006: {
            title: "ISO 10006",
            subtitle: "Guía para la gestión de la calidad en proyectos, asegurando que se alcancen los objetivos de negocio y necesidades del cliente.",
            items: [
                "Planificación y gestión de procesos",
                "Satisfacción del cliente y usuarios",
                "Mejora continua en la ejecución"
            ]
        }
    };

    isoButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            isoButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const key = btn.getAttribute('data-iso');
            const data = isoData[key];

            if (data) {
                if (isoTitle) isoTitle.textContent = data.title;
                if (isoSubtitle) isoSubtitle.textContent = data.subtitle;
                if (isoChecklist) {
                    isoChecklist.innerHTML = data.items.map(item => `
                        <li>
                            <span class="check-badge">✓</span>
                            <span>${item}</span>
                        </li>
                    `).join('');
                }
            }
        });
    });
});