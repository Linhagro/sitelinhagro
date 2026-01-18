/**
 * ==========================================
 * COMPONENTS LOADER - LINHAGRO
 * Carrega header e footer dinamicamente
 * ==========================================
 */

function getBasePath() {
  const path = window.location.pathname;
  return path.includes('/paginas/') ? '../' : '';
}

async function loadComponent(componentName, containerId) {
  const basePath = getBasePath();
  const container = document.getElementById(containerId);
  
  if (!container) {
    console.error(`❌ Container #${containerId} não encontrado`);
    return;
  }
  
  try {
    // ✅ CORRIGIDO: Path correto para assets/components/
    const response = await fetch(`${basePath}assets/components/${componentName}.html`);
    
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }
    
    let html = await response.text();
    
    // Ajusta paths relativos para páginas internas
    if (basePath === '../') {
      const temp = document.createElement('div');
      temp.innerHTML = html;
      
      temp.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('http')) return;
        
        if (href === 'index.html') {
          link.setAttribute('href', '../index.html');
        } else if (href.startsWith('paginas/')) {
          link.setAttribute('href', href.replace('paginas/', ''));
        }
      });
      
      temp.querySelectorAll('img').forEach(img => {
        const src = img.getAttribute('src');
        if (src && !src.startsWith('http') && !src.startsWith('../')) {
          img.setAttribute('src', `../${src}`);
        }
      });
      
      temp.querySelectorAll('[onclick]').forEach(el => {
        const onclick = el.getAttribute('onclick');
        if (onclick && onclick.includes('index.html')) {
          el.setAttribute('onclick', "window.location.href='../index.html'");
        }
      });
      
      html = temp.innerHTML;
    }
    
    container.innerHTML = html;
    
    // ✅ ADICIONAR: Dispara evento individual
    const event = new CustomEvent(`${componentName}Loaded`, { 
      detail: { componentName } 
    });
    document.dispatchEvent(event);
    
    // Inicializa funcionalidades do header
    if (componentName === 'header') {
      setTimeout(() => {
        markActiveLink();
        initMobileMenu();
      }, 100);
    }
    
    console.log(`✅ ${componentName} carregado com sucesso`);
    
  } catch (error) {
    console.error(`❌ Erro ao carregar ${componentName}:`, error);
    console.error(`   Path tentado: ${basePath}assets/components/${componentName}.html`);
  }
}

function markActiveLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-link');
  
  links.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPage = href.split('/').pop();
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });
}

function initMobileMenu() {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (!mobileToggle || !navMenu) {
    console.warn('⚠️ Elementos do menu mobile não encontrados');
    return;
  }
  
  // Remove listeners antigos clonando o elemento
  const newToggle = mobileToggle.cloneNode(true);
  mobileToggle.parentNode.replaceChild(newToggle, mobileToggle);
  
  newToggle.addEventListener('click', (e) => {
    e.preventDefault();
    navMenu.classList.toggle('active');
    const icon = newToggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    }
  });
  
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const icon = newToggle.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  });
  
  console.log('✅ Menu mobile inicializado');
}

// ✅ MODIFICADO: Usa Promise.all e dispara evento global
function init() {
  console.log('🔄 Iniciando carregamento de componentes...');
  
  Promise.all([
    loadComponent('header', 'header-container'),
    loadComponent('footer', 'footer-container')
  ]).then(() => {
    // ✅ Dispara evento quando TODOS os componentes carregarem
    const event = new CustomEvent('componentsLoaded');
    document.dispatchEvent(event);
    console.log('✅ Todos os componentes carregados');
    
    // ✅ REVELA O BODY (se estiver com visibility: hidden)
    document.body.style.visibility = 'visible';
    document.body.style.opacity = '0';
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.3s ease';
      document.body.style.opacity = '1';
    }, 50);
    
  }).catch(error => {
    console.error('❌ Erro ao carregar componentes:', error);
    // Revela mesmo se houver erro
    document.body.style.visibility = 'visible';
    document.body.style.opacity = '1';
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

console.log('✅ Components Loader inicializado');
