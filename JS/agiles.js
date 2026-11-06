document.addEventListener('DOMContentLoaded', () => {

    // 1. Navegación suave por píldoras superiores
    const agilePills = document.querySelectorAll('.agile-pill-btn');
    agilePills.forEach(pill => {
        pill.addEventListener('click', () => {
            agilePills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
        });
    });

    // 2. Cronograma interactivo del Sprint (Scrum Profundo)
    const eventBtns = document.querySelectorAll('.event-sub-btn');
    const eventBoxes = document.querySelectorAll('.event-detail-box');

    eventBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            eventBtns.forEach(b => b.classList.remove('active'));
            eventBoxes.forEach(box => box.classList.add('hidden'));

            btn.classList.add('active');
            const targetBox = document.getElementById(`event-${btn.getAttribute('data-event')}`);
            if(targetBox) targetBox.classList.remove('hidden');
        });
    });

    // Lógica de pestañas para Marco Scrum Inmersión Profunda
    const scrumPills = document.querySelectorAll('.scrum-pill-tab');
    const scrumPanels = document.querySelectorAll('.scrum-tab-panel');

    scrumPills.forEach(pill => {
        pill.addEventListener('click', () => {
            const targetId = pill.getAttribute('data-target');

            scrumPills.forEach(p => p.classList.remove('active'));
            scrumPanels.forEach(panel => panel.classList.add('hidden'));

            pill.classList.add('active');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.remove('hidden');
            }
        });
    });

    // Visor Modal Interactivo para Esquemas y Flujos Ágiles
    const schemaCards = document.querySelectorAll('.clickable-schema');
    const schemaModal = document.getElementById('schema-modal');
    const modalImg = document.getElementById('modal-img-element');
    const modalTitle = document.getElementById('modal-title');
    const modalClose = document.getElementById('modal-close-btn');

    schemaCards.forEach(card => {
        card.addEventListener('click', () => {
            const imgSrc = card.getAttribute('data-img');
            const imgTitle = card.getAttribute('data-title');

            if (modalImg && modalTitle && schemaModal) {
                modalImg.src = imgSrc;
                modalTitle.textContent = imgTitle;
                schemaModal.classList.remove('hidden');
            }
        });
    });

    if (modalClose && schemaModal) {
        modalClose.addEventListener('click', () => {
            schemaModal.classList.add('hidden');
        });

        schemaModal.addEventListener('click', (e) => {
            if (e.target === schemaModal) {
                schemaModal.classList.add('hidden');
            }
        });
    }
});

// Lógica interactiva del Simulador de Tablero Kanban (WIP global)
function moveTask(taskId, fromCol, toCol) {
    const taskEl = document.getElementById(taskId);
    const targetContainer = document.getElementById(`col-${toCol}`);
    const doingContainer = document.getElementById('col-doing');

    if (toCol === 'doing' && doingContainer.children.length >= 2) {
        alert("¡Limite WIP alcanzado! No puedes agregar más tareas en proceso para evitar cuellos de botella.");
        return;
    }

    if (taskEl && targetContainer) {
        targetContainer.appendChild(taskEl);
        
        const btn = taskEl.querySelector('.kanban-move-btn');
        if (toCol === 'doing') {
            btn.textContent = 'Completar ->';
            btn.setAttribute("onclick", `moveTask('${taskId}', 'doing', 'done')`);
        } else if (toCol === 'done') {
            btn.textContent = 'Finalizado';
            btn.disabled = true;
            btn.style.opacity = "0.6";
            btn.style.cursor = "default";
        }

        updateCounters();
    }
}

function updateCounters() {
    const todoEl = document.getElementById('count-todo');
    const doingEl = document.getElementById('count-doing');
    const doneEl = document.getElementById('count-done');
    
    if(todoEl) todoEl.textContent = document.getElementById('col-todo').children.length;
    if(doingEl) doingEl.textContent = document.getElementById('col-doing').children.length;
    if(doneEl) doneEl.textContent = document.getElementById('col-done').children.length;
}