document.addEventListener('DOMContentLoaded', () => {

    // 1. Lógica del Comparador Dinámico de Metodologías (6 Metodologías)
    const metodologiasData = {
        scrum: {
            nombre: "Scrum",
            enfoque: "Iterativo e Incremental (Ágil)",
            roles: "Product Owner, Scrum Master, Developers",
            flexibilidad: "Alta (Sprints cortos)",
            documentacion: "Ligera (Product/Sprint Backlogs)",
            ideal: "Proyectos dinámicos con alta incertidumbre"
        },
        kanban: {
            nombre: "Kanban",
            enfoque: "Gestión de Flujo Continuo (Ágil)",
            roles: "Sin roles estrictos (Equipos autogestionados)",
            flexibilidad: "Muy Alta (Cambios continuos)",
            documentacion: "Mínima (Tablero visual y límites WIP)",
            ideal: "Mantenimiento, soporte y flujos continuos"
        },
        cascada: {
            nombre: "Cascada",
            enfoque: "Secuencial Predictivo (Tradicional)",
            roles: "Project Manager, Analistas, Devs, Testers",
            flexibilidad: "Baja (Costoso cambiar en etapas avanzadas)",
            documentacion: "Exhaustiva (Formal y detallada por fases)",
            ideal: "Proyectos con requisitos fijos y estables"
        },
        vmodel: {
            nombre: "Modelo en V",
            enfoque: "Validación y Verificación en Paralelo (Tradicional)",
            roles: "Project Manager, Arquitectos, Tester QA",
            flexibilidad: "Baja a Media (Pruebas planificadas desde el inicio)",
            documentacion: "Exhaustiva (Foco en planes de prueba por fase)",
            ideal: "Sistemas críticos donde los errores son muy costosos"
        },
        incremental: {
            nombre: "Modelo Incremental",
            enfoque: "Entregas por partes funcionales acumulativas (Híbrido)",
            roles: "Project Manager, Desarrolladores, Clientes",
            flexibilidad: "Media (Permite ajustes entre incrementos)",
            documentacion: "Moderada (Especificación por cada incremento)",
            ideal: "Proyectos grandes donde se requiere entregar valor rápido"
        },
        xp: {
            nombre: "XP - Extreme Programming",
            enfoque: "Ingeniería de Software Ágil",
            roles: "Cliente, Desarrolladores, Coach, Tester",
            flexibilidad: "Muy Alta (Adaptación técnica constante)",
            documentacion: "Ligera (Enfoque en código y pruebas)",
            ideal: "Proyectos técnicos complejos con alta exigencia de calidad"
        }
    };

    const checkboxes = document.querySelectorAll('.metodo-chk');
    const tableHeadRow = document.getElementById('table-head-row');
    const tableBodyRows = document.getElementById('table-body-rows');

    function renderComparador() {
        if (!tableHeadRow || !tableBodyRows) return;

        const seleccionadas = Array.from(checkboxes)
            .filter(chk => chk.checked)
            .map(chk => chk.value);

        let headHTML = '<th>Característica</th>';
        seleccionadas.forEach(key => {
            if (metodologiasData[key]) {
                headHTML += `<th>${metodologiasData[key].nombre}</th>`;
            }
        });
        tableHeadRow.innerHTML = headHTML;

        const caracteristicas = [
            { label: "Enfoque Principal", prop: "enfoque" },
            { label: "Roles Principales", prop: "roles" },
            { label: "Flexibilidad a Cambios", prop: "flexibilidad" },
            { label: "Nivel de Documentación", prop: "documentacion" },
            { label: "Ideal Para", prop: "ideal" }
        ];

        let bodyHTML = '';
        if (seleccionadas.length === 0) {
            bodyHTML = `<tr><td colspan="10" style="text-align: center; color: #bfa8e6; padding: 25px;">Selecciona al menos una metodología arriba para ver la comparativa.</td></tr>`;
        } else {
            caracteristicas.forEach(c => {
                bodyHTML += `<tr>`;
                bodyHTML += `<td class="row-label">${c.label}</td>`;
                seleccionadas.forEach(key => {
                    if (metodologiasData[key]) {
                        bodyHTML += `<td>${metodologiasData[key][c.prop]}</td>`;
                    }
                });
                bodyHTML += `</tr>`;
            });
        }
        tableBodyRows.innerHTML = bodyHTML;
    }

    if (checkboxes.length > 0) {
        checkboxes.forEach(chk => {
            chk.addEventListener('change', renderComparador);
        });
        renderComparador();
    }


    // 2. Lógica del Wizard de la Encuesta (Corrección completa de navegación)
    let currentStep = 1;
    const totalSteps = 3;

    const steps = document.querySelectorAll('.survey-step');
    const nextBtn = document.getElementById('survey-next-btn');
    const prevBtn = document.getElementById('survey-prev-btn');
    const progressBar = document.getElementById('survey-progress');
    const stepIndicator = document.getElementById('survey-step-indicator');
    const resultBox = document.getElementById('survey-result-box');
    const resultText = document.getElementById('survey-result-text');

    function updateWizard() {
        // Asegurar que la caja de resultados esté oculta al navegar por los pasos
        if (resultBox) resultBox.style.display = 'none';

        steps.forEach(step => {
            const stepNum = parseInt(step.getAttribute('data-step'));
            if (stepNum === currentStep) {
                step.style.display = 'block';
            } else {
                step.style.display = 'none';
            }
        });

        const progressPercentage = (currentStep / totalSteps) * 100;
        if (progressBar) progressBar.style.width = `${progressPercentage}%`;
        if (stepIndicator) stepIndicator.textContent = `Paso ${currentStep} de ${totalSteps}`;

        // Control del botón Anterior
        if (prevBtn) {
            if (currentStep === 1) {
                prevBtn.style.display = 'none';
            } else {
                prevBtn.style.display = 'inline-block';
            }
        }

        // Control del botón Siguiente / Ver Resultado
        if (nextBtn) {
            nextBtn.style.display = 'inline-block';
            if (currentStep === totalSteps) {
                nextBtn.textContent = 'Ver Resultado';
            } else {
                nextBtn.textContent = 'Siguiente ->';
            }
        }
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentStep < totalSteps) {
                currentStep++;
                updateWizard();
            } else {
                calculateResult();
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (resultBox && resultBox.style.display === 'block') {
                // Si estaba en la pantalla final de resultado y toca Anterior
                resultBox.style.display = 'none';
                currentStep = totalSteps;
                updateWizard();
            } else if (currentStep > 1) {
                currentStep--;
                updateWizard();
            }
        });
    }

    function calculateResult() {
        const p1Element = document.querySelector('input[name="p1"]:checked');
        const p2Element = document.querySelector('input[name="p2"]:checked');
        const p3Element = document.querySelector('input[name="p3"]:checked');

        const p1 = p1Element ? p1Element.value : 'scrum';
        const p2 = p2Element ? p2Element.value : 'scrum';
        const p3 = p3Element ? p3Element.value : 'scrum';

        // Ocultar todos los pasos
        steps.forEach(s => s.style.display = 'none');
        
        // Mostrar la caja de resultado
        if (resultBox) {
            resultBox.style.display = 'block';
        }

        // Configurar botones en estado "Resultado"
        if (prevBtn) prevBtn.style.display = 'inline-block';
        if (nextBtn) nextBtn.style.display = 'none';
        
        if (stepIndicator) stepIndicator.textContent = '¡Completado!';
        if (progressBar) progressBar.style.width = '100%';

        let recommendation = '';

        if (p1 === 'vmodel' || p3 === 'vmodel' || p2 === 'vmodel') {
            recommendation = '<strong>Modelo en V (Tradicional):</strong> La opción ideal para tu proyecto. Permite asociar una fase de pruebas específica a cada etapa de desarrollo, perfecto para sistemas críticos donde los fallos son inaceptables.';
        } else if (p1 === 'incremental' || p3 === 'incremental' || p2 === 'incremental') {
            recommendation = '<strong>Modelo Incremental (Híbrido):</strong> Muy adecuado para tu proyecto. Permite construir y entregar el software por partes funcionales sucesivas, reduciendo riesgos y mostrando avances tempranos al cliente.';
        } else if (p1 === 'cascada' || p3 === 'cascada') {
            recommendation = '<strong>Modelo en Cascada (Tradicional):</strong> Ideal para tu proyecto debido a la rigidez de los requisitos, la necesidad de control estricto por fases y entregas cerradas.';
        } else if (p1 === 'kanban' || p3 === 'kanban') {
            recommendation = '<strong>Kanban:</strong> La opción perfecta para gestionar flujos de trabajo continuos, limitar el trabajo en proceso (WIP) y lidiar con solicitudes cambiantes de manera ágil.';
        } else if (p2 === 'xp') {
            recommendation = '<strong>XP - Extreme Programming:</strong> La alternativa ideal si tu prioridad es la excelencia técnica, la calidad del código mediante pruebas rigurosas y la alta colaboración entre desarrolladores.';
        } else {
            recommendation = '<strong>Scrum:</strong> La mejor alternativa para tu desarrollo, permitiendo entregas de valor periódicas en Sprints, adaptación rápida y trabajo en equipo auto-organizado.';
        }

        if (resultText) {
            resultText.innerHTML = recommendation;
        }
    }

    // Inicialización limpia del wizard
    updateWizard();

});