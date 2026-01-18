/**
 * ==========================================
 * PÁGINA DESTAQUES
 * ==========================================
 */

document.addEventListener('componentsLoaded', () => {
  console.log('✅ Página Destaques carregada');
  initDestaquesPage();
});

function initDestaquesPage() {
  // Marca menu ativo
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes('destaques')) {
      link.classList.add('active');
    }
  });
  
  // Animação de entrada dos cards
  animateCards();
  
  console.log('🎯 Página Destaques inicializada');
}

function animateCards() {
  const cards = document.querySelectorAll('.destaque-card');
  
  if (cards.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 150);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}
