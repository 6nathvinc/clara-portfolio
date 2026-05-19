// Curseur custom — réticule de précision
// À inclure avant </body> dans toutes les pages

(function() {
  // Créer les éléments du curseur
  const cursor = document.createElement('div');
  cursor.id = 'custom-cursor';

  const ring = document.createElement('div');
  ring.id = 'cursor-ring';

  document.body.appendChild(cursor);
  document.body.appendChild(ring);

  // Injecter les styles
  const style = document.createElement('style');
  style.textContent = `
    * { cursor: none !important; }

    #custom-cursor {
      position: fixed;
      top: 0; left: 0;
      width: 6px; height: 6px;
      background: #1E3A5F;
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%, -50%);
      transition: width .15s, height .15s, background .15s;
    }

    #cursor-ring {
      position: fixed;
      top: 0; left: 0;
      width: 32px; height: 32px;
      pointer-events: none;
      z-index: 99998;
      transform: translate(-50%, -50%);
      transition: transform .08s linear, width .2s, height .2s, opacity .2s;
    }

    /* SVG réticule dessiné via outline box-shadow */
    #cursor-ring::before,
    #cursor-ring::after {
      content: '';
      position: absolute;
      background: #1E3A5F;
    }

    /* Ligne horizontale */
    #cursor-ring::before {
      top: 50%; left: 0;
      width: 100%; height: 1px;
      transform: translateY(-50%);
    }

    /* Ligne verticale */
    #cursor-ring::after {
      left: 50%; top: 0;
      height: 100%; width: 1px;
      transform: translateX(-50%);
    }

    /* Cercle via border */
    #cursor-ring {
      border: 1px solid #1E3A5F;
      border-radius: 50%;
      opacity: 0.6;
    }

    /* État hover — curseur plein, anneau agrandi */
    body.cursor-hover #custom-cursor {
      width: 10px;
      height: 10px;
      background: #1E3A5F;
    }

    body.cursor-hover #cursor-ring {
      width: 44px;
      height: 44px;
      opacity: 0.3;
    }

    /* État click */
    body.cursor-click #custom-cursor {
      width: 4px;
      height: 4px;
    }

    body.cursor-click #cursor-ring {
      width: 20px;
      height: 20px;
      opacity: 1;
    }

    /* Masquer sur mobile/touch */
    @media (hover: none) {
      #custom-cursor, #cursor-ring { display: none; }
      * { cursor: auto !important; }
    }
  `;
  document.head.appendChild(style);

  // Position avec lerp pour fluidité
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  const lerp = (a, b, t) => a + (b - a) * t;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  // Ring avec légère inertie
  function animateRing() {
    ringX = lerp(ringX, mouseX, 0.18);
    ringY = lerp(ringY, mouseY, 0.18);
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover sur éléments interactifs
  const interactives = 'a, button, input, textarea, select, [role="button"], label';
  document.querySelectorAll(interactives).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // Observer pour éléments ajoutés dynamiquement (menu mobile)
  const observer = new MutationObserver(() => {
    document.querySelectorAll(interactives).forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Click feedback
  document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
  document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-click'));

  // Masquer quand souris quitte la fenêtre
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    ring.style.opacity = '';
  });
})();
