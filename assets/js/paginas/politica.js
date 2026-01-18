/**
 * ==========================================
 * PÁGINA POLÍTICA DE PRIVACIDADE - JS
 * ==========================================
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ Página de Política carregada');
  initBackToTop();
  initSmoothScroll();
});

/**
 * ==========================================
 * BOTÃO VOLTAR AO TOPO
 * ==========================================
 */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  // Mostrar/esconder botão ao scroll
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  // Scroll suave ao topo
  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  console.log('⬆️ Back to Top inicializado');
}

/**
 * ==========================================
 * SCROLL SUAVE PARA LINKS INTERNOS
 * ==========================================
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  console.log('🔗 Smooth scroll inicializado');
}

/**
 * ==========================================
 * ANIMAÇÃO AO SCROLL (OPCIONAL)
 * ==========================================
 */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1
  });

  const elements = document.querySelectorAll('.legal-text h2, .legal-text p');
  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  console.log('✨ Animações de scroll inicializadas');
}

// Inicializar animações (descomente se quiser usar)
// initScrollAnimations();

console.log('🚀 Política JS completamente carregado!');
