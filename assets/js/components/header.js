/**
 * HEADER - FUNDO VERDE APÓS SCROLL + (opcional) esconder ao rolar
 * Usa .header, .header-overlay e .header-hidden
 */

(function () {
  function initHeaderEffects() {
    const header = document.querySelector('.header');
    const navMenu = document.querySelector('.nav-menu');
    const mobileToggle = document.querySelector('.mobile-toggle');

    if (!header) {
      console.warn('⚠️ header.js: .header não encontrado');
      return;
    }

    let lastScrollY = window.scrollY;
    const overlayThreshold = 120; // px para ativar o fundo verde

    function updateOverlay() {
      const y = window.scrollY || window.pageYOffset;

      if (y >= overlayThreshold) {
        header.classList.add('header-overlay');      // fundo verde
      } else {
        header.classList.remove('header-overlay');   // volta transparente
      }
    }

    function onScroll() {
      const currentY = window.scrollY;

      // (Opcional) esconder/mostrar header conforme direção
      if (Math.abs(currentY - lastScrollY) >= 5) {
        if (currentY > lastScrollY) {
          header.classList.add('header-hidden');     // rolando pra baixo
        } else {
          header.classList.remove('header-hidden');  // rolando pra cima
        }
        lastScrollY = currentY;
      }

      updateOverlay();
    }

    // Estado inicial
    updateOverlay();

    window.addEventListener('scroll', onScroll);

    // MENU MOBILE AQUI É OPCIONAL, JÁ TEM NO components-loader.js
    // Mas se quiser manter, deixe só se não duplicar listeners
    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('active');
        mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });

      navMenu.querySelectorAll('.nav-link').forEach((link) => {
        link.addEventListener('click', () => {
          if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
          }
        });
      });
    }

    console.log('📌 header.js: fundo verde após scroll + mobile menu configurados');
  }

  // roda quando a página toda carrega (caso header já esteja no DOM)
  window.addEventListener('load', initHeaderEffects);

  // roda novamente quando o loader avisar que os componentes foram injetados
  document.addEventListener('componentsLoaded', initHeaderEffects);
})();