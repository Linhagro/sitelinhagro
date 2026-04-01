/**
 * ==========================================
 * PÁGINA POLÍTICA DE PRIVACIDADE - JS
 * ==========================================
 */

function marcarNavAtivo() {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach((link) => {
    if (link.textContent.includes('Política')) {
      link.classList.add('active');
    }
  });
}

/**
 * ==========================================
 * BOTÃO VOLTAR AO TOPO
 * ==========================================
 */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  function toggleButton() {
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleButton);

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  toggleButton();
}

/**
 * ==========================================
 * SCROLL SUAVE PARA LINKS INTERNOS
 * ==========================================
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');

      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  marcarNavAtivo();
  initBackToTop();
  initSmoothScroll();
});