/**
 * ==========================================
 * PÁGINA QUEM SOMOS - NOVO LAYOUT ANIMADO
 * ==========================================
 */


let mapa;
let paginaInicializada = false;


document.addEventListener('componentsLoaded', () => {
  initQuemSomosPage();
});


document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    initQuemSomosPage();
  }, 200);
});


function initQuemSomosPage() {
  if (paginaInicializada) return;
  paginaInicializada = true;

  marcarNavAtivoQuemSomos();
  initRevealAnimations();
  animateNumbers();
  inicializarMapa();
  setupFiltros();
  initFloatingWhatsappMessage();
}


// NAV ATIVO
function marcarNavAtivoQuemSomos() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') && link.getAttribute('href').includes('quem-somos')) {
      link.classList.add('active');
    }
  });
}


// REVEAL ANIMATIONS
function initRevealAnimations() {
  const items = document.querySelectorAll('.reveal-item');

  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, Number(delay));
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  items.forEach((item, index) => {
    item.dataset.delay = (index % 4) * 80;
    observer.observe(item);
  });
}


// NÚMEROS
function animateNumbers() {
  const numeroCards = document.querySelectorAll('.numero-valor');

  if (!numeroCards.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = parseInt(target.getAttribute('data-valor'), 10);
        animateValue(target, finalValue, 1800);
        observer.unobserve(target);
      }
    });
  }, {
    threshold: 0.4
  });

  numeroCards.forEach(card => observer.observe(card));
}


function animateValue(element, end, duration) {
  let startTimestamp = null;

  function step(timestamp) {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(easedProgress * end);
    element.textContent = current.toLocaleString('pt-BR');

    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = end.toLocaleString('pt-BR');
    }
  }

  window.requestAnimationFrame(step);
}


/**
 * ==========================================
 * FILIAIS
 * ==========================================
 */


const filiais = [
  {
    nome: 'LINHAGRO - MATRIZ',
    cidade: 'Linhares',
    estado: 'ES',
    endereco: 'Rua Samuel Batista Cruz, 2959 - Nossa Senhora da Conceição',
    coordenadas: [-19.383869647660646, -40.067497604698]
  },
  {
    nome: 'LINHAGRO JAGUARÉ',
    cidade: 'Jaguare',
    estado: 'ES',
    endereco: 'Rua Nove de Agosto, 2857 - Centro',
    coordenadas: [-18.87084281652228, -40.08645601202899]
  },
  {
    nome: 'LINHAGRO RIO BANANAL',
    cidade: 'Rio Bananal',
    estado: 'ES',
    endereco: 'Rua Henrique Gaburro, 446 - Santo Antônio',
    coordenadas: [-19.260898987755045, -40.3333937335372]
  },
  {
    nome: 'LINHAGRO TEIXEIRA DE FREITAS',
    cidade: 'Teixeira de Freitas',
    estado: 'BA',
    endereco: 'Rua Santíssima Trindade, 22 - São José',
    coordenadas: [-17.523468309809783, -39.710360862420465]
  }
];


/**
 * ==========================================
 * MAPA
 * ==========================================
 */


function inicializarMapa() {
  const mapaEl = document.getElementById('mapa');
  if (!mapaEl || typeof L === 'undefined') return;

  const centroMapa = [-18.3, -40.1];

  mapa = L.map('mapa', {
    scrollWheelZoom: false
  }).setView(centroMapa, 7);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors',
    referrerPolicy: 'strict-origin-when-cross-origin'
  }).addTo(mapa);

  adicionarMarcadoresFiliais('todos');

  setTimeout(() => {
    mapa.invalidateSize();
  }, 300);

  window.addEventListener('resize', () => {
    if (mapa) {
      mapa.invalidateSize();
    }
  });
}


function adicionarMarcadoresFiliais(estadoFiltro) {
  if (!mapa) return;

  mapa.eachLayer(layer => {
    if (!(layer instanceof L.TileLayer)) {
      mapa.removeLayer(layer);
    }
  });

  const filiaisFiltradas =
    estadoFiltro === 'todos'
      ? filiais
      : filiais.filter(f => f.estado === estadoFiltro);

  const markers = [];

  filiaisFiltradas.forEach(filial => {
    const iconeFilial = L.divIcon({
      html:
        '<div class="marker-filial">' +
          '<img src="../assets/imagens/logo-white.png" alt="Linhagro">' +
        '</div>',
      className: 'custom-marker-filial',
      iconSize: [50, 50],
      iconAnchor: [25, 50]
    });

    const popupHTML =
      '<div class="popup-consultor">' +
        '<div class="popup-nome">' + filial.nome + '</div>' +
        '<div class="popup-info">' +
          '<span><i class="fas fa-map-marker-alt"></i> ' + filial.endereco + '</span>' +
          '<span><i class="fas fa-city"></i> ' + filial.cidade + ' - ' + filial.estado + '</span>' +
        '</div>' +
      '</div>';

    const marker = L.marker(filial.coordenadas, { icon: iconeFilial })
      .addTo(mapa)
      .bindPopup(popupHTML);

    markers.push(marker);
  });

  if (markers.length > 0) {
    const grupo = L.featureGroup(markers);
    mapa.fitBounds(grupo.getBounds().pad(0.22));
  }
}


/**
 * ==========================================
 * FILTROS
 * ==========================================
 */


function setupFiltros() {
  const filtros = document.querySelectorAll('.filtro-btn');
  const cards = document.querySelectorAll('.filial-card');

  if (!filtros.length) return;

  filtros.forEach(filtro => {
    filtro.addEventListener('click', () => {
      filtros.forEach(f => f.classList.remove('active'));
      filtro.classList.add('active');

      const estado = filtro.dataset.estado || 'todos';

      adicionarMarcadoresFiliais(estado);
      filtrarCardsFiliais(cards, estado);

      setTimeout(() => {
        if (mapa) mapa.invalidateSize();
      }, 150);
    });
  });
}


function filtrarCardsFiliais(cards, estado) {
  cards.forEach(card => {
    const estadoCard = card.getAttribute('data-estado-card');

    if (estado === 'todos' || estadoCard === estado) {
      card.classList.remove('oculta');
    } else {
      card.classList.add('oculta');
    }
  });
}


/**
 * ==========================================
 * WHATSAPP FLUTUANTE
 * ==========================================
 */


function initFloatingWhatsappMessage() {
  const messageEl = document.querySelector('.whatsapp-floating-message');
  if (!messageEl) return;

  const mensagens = [
    'Fale com um consultor<br>especialista Linhagro',
    'Quer melhorar a<br>produtividade da lavoura?',
    'Tire suas dúvidas<br>pelo WhatsApp',
    'Fale com nosso time<br>técnico agora'
  ];

  let idx = 0;

  function mostrarMensagem() {
    const span = messageEl.querySelector('span');
    if (!span) return;

    span.innerHTML = mensagens[idx];
    messageEl.classList.add('visible');

    setTimeout(() => {
      messageEl.classList.remove('visible');
    }, 2500);

    idx = (idx + 1) % mensagens.length;
  }

  setTimeout(mostrarMensagem, 3000);
  setInterval(mostrarMensagem, 6000);
}