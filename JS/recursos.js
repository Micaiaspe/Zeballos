document.addEventListener('DOMContentLoaded', () => {
    // 1. Buscador en tiempo real para el Glosario
    const searchInput = document.getElementById('glossary-search');
    const glossaryGroups = document.querySelectorAll('.glossary-group');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();

            glossaryGroups.forEach(group => {
                let visibleCount = 0;
                const items = group.querySelectorAll('.glossary-item');

                items.forEach(item => {
                    const title = item.querySelector('.term-title').textContent.toLowerCase();
                    const def = item.querySelector('.term-definition').textContent.toLowerCase();

                    if (title.includes(query) || def.includes(query)) {
                        item.style.display = 'block';
                        visibleCount++;
                    } else {
                        item.style.display = 'none';
                    }
                });

                group.style.display = visibleCount > 0 ? 'block' : 'none';
            });
        });
    }

    // 2. Filtro alfabético por letras (A-Z)
    const letterButtons = document.querySelectorAll('.letter-btn');

    letterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedLetter = btn.getAttribute('data-letter');

            letterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            glossaryGroups.forEach(group => {
                const groupLetter = group.getAttribute('data-group-letter');

                if (selectedLetter === 'all' || selectedLetter === groupLetter) {
                    group.style.display = 'block';
                    group.querySelectorAll('.glossary-item').forEach(i => i.style.display = 'block');
                } else {
                    group.style.display = 'none';
                }
            });
        });
    });

    // 3. Scroll suave para los enlaces del menú lateral
    const anchorLinks = document.querySelectorAll('.sidebar-nav a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});