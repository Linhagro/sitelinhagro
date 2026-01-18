// ============================================
// PÁGINA PORTAL - LINHAGRO
// ============================================

console.log('🚀 Portal do Cliente iniciado');

// Aguarda o carregamento do header/footer
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    initPortal();
  }, 100);
});

function initPortal() {
  console.log('✅ Inicializando portal...');

  marcarNavAtivo();
  renderizarConteudos('todos');
  renderizarEventos();
  setupFiltros();
  setupNewsletter();

  console.log('✅ Portal carregado!');
}

// ============================================
// MARCA NAV-LINK ATIVO
// ============================================
function marcarNavAtivo() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (link.classList.contains('btn-portal')) {
      link.classList.add('active');
    }
  });
}

// ============================================
// BANCO DE DADOS - CONTEÚDOS
// ============================================
const conteudos = [
  // NOVIDADES
  {
    id: 1,
    categoria: 'novidades',
    titulo: 'Nova Linha de Biofertilizantes 2026',
    descricao: 'Lançamento exclusivo da nossa nova linha de biofertilizantes com tecnologia avançada para aumentar a produtividade.',
    data: '15 Jan 2026',
    autor: 'Linhagro',
    icone: 'fa-newspaper'
  },
  {
    id: 2,
    categoria: 'novidades',
    titulo: 'Parceria com Universidade Federal',
    descricao: 'Firmamos parceria estratégica para pesquisa e desenvolvimento de soluções sustentáveis para agricultura.',
    data: '10 Jan 2026',
    autor: 'Equipe',
    icone: 'fa-handshake'
  },
  {
    id: 3,
    categoria: 'novidades',
    titulo: 'Certificação ISO Conquistada',
    descricao: 'Conquistamos a certificação ISO 9001, reforçando nosso compromisso com qualidade e excelência.',
    data: '05 Jan 2026',
    autor: 'Gestão',
    icone: 'fa-award'
  },

  // PROJETOS
  {
    id: 4,
    categoria: 'projetos',
    titulo: 'Projeto Café Premium ES',
    descricao: 'Acompanhamento técnico completo para produção de café especial no Espírito Santo com aumento de 40% na produtividade.',
    data: '14 Jan 2026',
    autor: 'Consultor',
    icone: 'fa-coffee'
  },
  {
    id: 5,
    categoria: 'projetos',
    titulo: 'Recuperação de Pastagens - BA',
    descricao: 'Programa de recuperação de 500 hectares de pastagens degradadas utilizando técnicas sustentáveis.',
    data: '12 Jan 2026',
    autor: 'Agrônomo',
    icone: 'fa-leaf'
  },
  {
    id: 6,
    categoria: 'projetos',
    titulo: 'Agricultura Orgânica - MG',
    descricao: 'Transição para agricultura orgânica certificada em propriedade de hortaliças com resultados excepcionais.',
    data: '08 Jan 2026',
    autor: 'Técnico',
    icone: 'fa-seedling'
  },
  {
    id: 7,
    categoria: 'projetos',
    titulo: 'Milho Híbrido Alto Rendimento',
    descricao: 'Implementação de programa nutricional para milho com aumento de 35% na produção de sacas por hectare.',
    data: '03 Jan 2026',
    autor: 'Especialista',
    icone: 'fa-chart-line'
  },

  // EVENTOS
  {
    id: 8,
    categoria: 'eventos',
    titulo: 'Workshop: Nutrição de Solos',
    descricao: 'Workshop prático sobre correção e nutrição de solos para café. Vagas limitadas! Inscrições abertas.',
    data: '25 Jan 2026',
    autor: 'Linhagro',
    icone: 'fa-chalkboard-teacher'
  },
  {
    id: 9,
    categoria: 'eventos',
    titulo: 'Dia de Campo - Café Premium',
    descricao: 'Visita técnica a propriedade modelo com demonstração de resultados práticos e degustação.',
    data: '02 Fev 2026',
    autor: 'Eventos',
    icone: 'fa-tractor'
  },
  {
    id: 10,
    categoria: 'eventos',
    titulo: 'Palestra: Sustentabilidade',
    descricao: 'Palestra sobre práticas sustentáveis na agricultura moderna e certificações ambientais.',
    data: '15 Fev 2026',
    autor: 'Equipe',
    icone: 'fa-tree'
  },

  // CONTEÚDOS
  {
    id: 11,
    categoria: 'conteudos',
    titulo: 'Guia Completo de Adubação',
    descricao: 'E-book gratuito com técnicas e recomendações para adubação de diferentes culturas. Download disponível.',
    data: '13 Jan 2026',
    autor: 'Redação',
    icone: 'fa-book'
  },
  {
    id: 12,
    categoria: 'conteudos',
    titulo: 'Vídeo: Aplicação de Biofertilizantes',
    descricao: 'Tutorial completo sobre dosagem, período e técnicas corretas de aplicação de biofertilizantes.',
    data: '11 Jan 2026',
    autor: 'Vídeos',
    icone: 'fa-video'
  },
  {
    id: 13,
    categoria: 'conteudos',
    titulo: 'Artigo: Solo Saudável',
    descricao: 'Como manter a saúde do solo e aumentar a produtividade a longo prazo com práticas sustentáveis.',
    data: '07 Jan 2026',
    autor: 'Blog',
    icone: 'fa-file-alt'
  },
  {
    id: 14,
    categoria: 'conteudos',
    titulo: 'Infográfico: Nutrientes Essenciais',
    descricao: 'Material visual sobre os principais nutrientes para plantas e seus papéis no desenvolvimento.',
    data: '04 Jan 2026',
    autor: 'Design',
    icone: 'fa-chart-pie'
  }
];

// ============================================
// BANCO DE DADOS - EVENTOS
// ============================================
const eventos = [
  {
    dia: '25',
    mes: 'Jan',
    titulo: 'Workshop: Nutrição de Solos',
    descricao: 'Aprenda técnicas avançadas de correção e nutrição de solos para maximizar a produtividade.',
    horario: '14:00 - 17:00',
    local: 'Sede Linhagro - ES',
    vagas: '30 vagas disponíveis'
  },
  {
    dia: '02',
    mes: 'Fev',
    titulo: 'Dia de Campo - Café Premium',
    descricao: 'Visita técnica em propriedade modelo com demonstração prática de resultados.',
    horario: '08:00 - 12:00',
    local: 'Fazenda Santa Clara - ES',
    vagas: '50 participantes'
  },
  {
    dia: '15',
    mes: 'Fev',
    titulo: 'Palestra: Sustentabilidade na Agricultura',
    descricao: 'Práticas sustentáveis e certificações para agricultura moderna e consciente.',
    horario: '19:00 - 21:00',
    local: 'Online via Zoom',
    vagas: 'Inscrições abertas'
  }
];

// ============================================
// RENDERIZAR CONTEÚDOS
// ============================================
function renderizarConteudos(categoria) {
  const grid = document.getElementById('conteudo-grid');
  const semResultados = document.getElementById('sem-resultados');

  if (!grid) return;

  // Filtrar conteúdos
  const conteudosFiltrados = categoria === 'todos' 
    ? conteudos 
    : conteudos.filter(c => c.categoria === categoria);

  // Mostrar/ocultar mensagem
  if (conteudosFiltrados.length === 0) {
    grid.style.display = 'none';
    semResultados.style.display = 'block';
    return;
  } else {
    grid.style.display = 'grid';
    semResultados.style.display = 'none';
  }

  // Renderizar cards
  grid.innerHTML = conteudosFiltrados.map(c => `
    <article class="conteudo-card" data-categoria="${c.categoria}">
      <div class="conteudo-imagem">
        <div class="conteudo-imagem-placeholder">
          <i class="fas ${c.icone}"></i>
        </div>
        <span class="conteudo-categoria categoria-${c.categoria}">
          ${c.categoria}
        </span>
        <span class="conteudo-data">
          <i class="far fa-calendar"></i>
          ${c.data}
        </span>
      </div>
      <div class="conteudo-corpo">
        <h3 class="conteudo-titulo">${c.titulo}</h3>
        <p class="conteudo-descricao">${c.descricao}</p>
        <div class="conteudo-rodape">
          <div class="conteudo-autor">
            <div class="autor-avatar">${c.autor.charAt(0)}</div>
            <span>${c.autor}</span>
          </div>
          <a href="#" class="conteudo-btn">
            Ver mais
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </article>
  `).join('');

  // Animação de entrada
  animarCards();
}

// ============================================
// ANIMAR CARDS
// ============================================
function animarCards() {
  const cards = document.querySelectorAll('.conteudo-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';

    setTimeout(() => {
      card.style.transition = 'all 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
}

// ============================================
// RENDERIZAR EVENTOS
// ============================================
function renderizarEventos() {
  const timeline = document.getElementById('eventos-timeline');
  if (!timeline) return;

  timeline.innerHTML = eventos.map(e => `
    <div class="evento-item">
      <div class="evento-data-badge">
        <span class="evento-dia">${e.dia}</span>
        <span class="evento-mes">${e.mes}</span>
      </div>
      <div class="evento-conteudo">
        <h3 class="evento-titulo">${e.titulo}</h3>
        <p class="evento-descricao">${e.descricao}</p>
        <div class="evento-info">
          <span><i class="far fa-clock"></i> ${e.horario}</span>
          <span><i class="fas fa-map-marker-alt"></i> ${e.local}</span>
          <span><i class="fas fa-users"></i> ${e.vagas}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// ============================================
// SETUP FILTROS
// ============================================
function setupFiltros() {
  const filtros = document.querySelectorAll('.filtro-btn');

  filtros.forEach(filtro => {
    filtro.addEventListener('click', () => {
      // Remove active de todos
      filtros.forEach(f => f.classList.remove('active'));

      // Adiciona active no clicado
      filtro.classList.add('active');

      // Renderiza conteúdos filtrados
      const categoria = filtro.dataset.categoria;
      renderizarConteudos(categoria);

      console.log(`🔍 Filtro aplicado: ${categoria}`);
    });
  });
}

// ============================================
// SETUP NEWSLETTER
// ============================================
function setupNewsletter() {
  const btn = document.getElementById('newsletter-btn');
  const input = document.getElementById('newsletter-email');

  if (!btn || !input) return;

  btn.addEventListener('click', () => {
    const email = input.value.trim();

    if (!email) {
      alert('Por favor, insira seu e-mail');
      return;
    }

    if (!validarEmail(email)) {
      alert('Por favor, insira um e-mail válido');
      return;
    }

    // Simula envio
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check"></i> Inscrito!';
      btn.style.background = '#2ecc71';
      input.value = '';

      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> <span>Inscrever-se</span>';
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);

      console.log(`📧 Newsletter: ${email} inscrito`);
    }, 1500);
  });

  // Enter no input
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      btn.click();
    }
  });
}

// ============================================
// VALIDAR E-MAIL
// ============================================
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}