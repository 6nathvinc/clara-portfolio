// Transitions de page fluides
// Fondu sortant au clic, fondu entrant à l'arrivée

(function() {
  const style = document.createElement('style');
  style.textContent = `
    body {
      opacity: 0;
      transition: opacity 0.25s ease;
    }
    body.page-visible {
      opacity: 1;
    }
    body.page-leaving {
      opacity: 0;
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);

  // Fondu entrant à l'arrivée sur la page
  window.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.classList.add('page-visible');
      });
    });
  });

  // Fondu sortant au clic sur les liens internes
  document.addEventListener('click', e => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Ignorer : liens externes, ancres seules, téléchargements, mailto, tel
    if (
      link.target === '_blank' ||
      link.hasAttribute('download') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('http') ||
      href.startsWith('#')
    ) return;

    // Lien interne — fondu sortant puis navigation
    e.preventDefault();
    document.body.classList.remove('page-visible');
    document.body.classList.add('page-leaving');

    setTimeout(() => {
      window.location.href = href;
    }, 260);
  });

  // Gérer le bouton retour navigateur
  window.addEventListener('pageshow', e => {
    if (e.persisted) {
      document.body.classList.remove('page-leaving');
      document.body.classList.add('page-visible');
    }
  });
})();
