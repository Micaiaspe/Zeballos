document.addEventListener('DOMContentLoaded', () => {

    // 1. Lógica del Comparador Dinámico de Metodologías
    const metodologiasData = {
        scrum: {
            nombre: "Scrum",
            enfoque: "Iterativo e Incremental (Agil)",
            roles: "Product Owner, Scrum Master, Developers",
            flexibilidad: "Alta (Sprints cortos)",
            documentacion: "Ligera (Product/Sprint Backlogs)",
            ideal: "Proyectos dinamicos con alta incertidumbre"
        },
        kanban: {
            nombre: "Kanban",
            enfoque: "Gestion de Flujo Continuo (Agil)",
            roles: "Sin roles estrictos (Equipos autogestionados)",
            flexibilidad: "Muy Alta (Cambios continuos)",
            documentacion: "Minima (Tablero visual y limites WIP)",
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
        xp: {
            nombre: "XP - Extreme Programming",
            enfoque: "Ingenieria de Software Agil",
            roles: "Cliente, Desarrolladores, Coach, Tester",
            flexibilidad: "Muy Alta (Adaptacion tecnica constante)",
            documentacion: "Ligera (Enfoque en codigo y pruebas)",
            ideal: "Proyectos tecnicos complejos con alta exigencia de calidad"
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

        let headHTML = '<th>Caracteristica</th>';
        seleccionadas.forEach(key => {
            headHTML += `<th>${metodologiasData[key].nombre}</th>`;
        });
        tableHeadRow.innerHTML = headHTML;

        const caracteristicas = [
            { label: "Enfoque Principal", prop: "enfoque" },
            { label: "Roles Principales", prop: "roles" },
            { label: "Flexibilidad a Cambios", prop: "flexibilidad" },
            { label: "Nivel de Documentacion", prop: "documentacion" },
            { label: "Ideal Para", prop: "ideal" }
        ];

        let bodyHTML = '';
        if (seleccionadas.length === 0) {
            bodyHTML = `<tr><td colspan="10" style="text-align: center; color: #bfa8e6; padding: 25px;">Selecciona al menos una metodologia arriba para ver la comparativa.</td></tr>`;
        } else {
            caracteristicas.forEach(c => {
                bodyHTML += `<tr>`;
                bodyHTML += `<td class="row-label">${c.label}</td>`;
                seleccionadas.forEach(key => {
                    bodyHTML += `<td>${metodologiasData[key][c.prop]}</td>`;
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


    // 2. Lógica del Wizard de la Encuesta de Preferencias Metodológicas
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
        steps.forEach(step => {
            if (parseInt(step.getAttribute('data-step')) === currentStep) {
                step.style.display = 'block';
            } else {
                step.style.display = 'none';
            }
        });

        const progressPercentage = (currentStep / totalSteps) * 100;
        if (progressBar) progressBar.style.width = `${progressPercentage}%`;
        if (stepIndicator) stepIndicator.textContent = `Paso ${currentStep} de ${totalSteps}`;

        if (currentStep === 1) {
            if (prevBtn) prevBtn.style.display = 'none';
        } else {
            if (prevBtn) prevBtn.style.display = 'inline-block';
        }

        if (currentStep === totalSteps) {
            if (nextBtn) nextBtn.textContent = 'Ver Resultado';
        } else {
            if (nextBtn) nextBtn.textContent = 'Siguiente ->';
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
            if (currentStep > 1) {
                currentStep--;
                if (resultBox) resultBox.style.display = 'none';
                steps.forEach(s => {
                    if (parseInt(s.getAttribute('data-step')) === currentStep) s.style.display = 'block';
                });
                updateWizard();
            }
        });
    }

    function calculateResult() {
        const p1Element = document.querySelector('input[name="p1"]:checked');
        const p3Element = document.querySelector('input[name="p3"]:checked');

        const p1 = p1Element ? p1Element.value : 'scrum';
        const p3 = p3Element ? p3Element.value : 'scrum';

        steps.forEach(s => s.style.display = 'none');
        
        if (resultBox) {
            resultBox.style.display = 'block';
        }

        if (prevBtn) prevBtn.style.display = 'inline-block';
        if (nextBtn) nextBtn.style.display = 'none';
        
        if (stepIndicator) stepIndicator.textContent = '¡Completado!';
        if (progressBar) progressBar.style.width = '100%';

        let recommendation = '';
        if (p1 === 'cascada' || p3 === 'cascada') {
            recommendation = '<strong>Modelo en Cascada (Tradicional):</strong> Ideal para tu proyecto debido a la rigidez de los requisitos, la necesidad de control estricto por fases y entregas cerradas.';
        } else if (p1 === 'kanban' || p3 === 'kanban') {
            recommendation = '<strong>Kanban:</strong> La opción perfecta para gestionar flujos de trabajo continuos, limitar el trabajo en proceso (WIP) y lidiar con solicitudes cambiantes.';
        } else {
            recommendation = '<strong>Scrum:</strong> La mejor alternativa para tu desarrollo, permitiendo entregas de valor periódicas en Sprints, adaptación rápida y trabajo en equipo auto-organizado.';
        }

        if (resultText) {
            resultText.innerHTML = recommendation;
        }
    }

});