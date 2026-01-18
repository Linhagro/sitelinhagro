/**
 * ==========================================
 * PÁGINA PRODUTOS
 * ==========================================
 */

// Base de dados de 56 produtos
const produtosData = [
  // FERTILIZANTES (20 produtos)
  { id: 1, nome: "NPK 04-14-08", categoria: "fertilizantes", descricao: "Fertilizante mineral misto para plantio" },
  { id: 2, nome: "NPK 04-30-10", categoria: "fertilizantes", descricao: "Alto teor de fósforo para formação de raízes" },
  { id: 3, nome: "NPK 10-10-10", categoria: "fertilizantes", descricao: "Fórmula equilibrada para manutenção" },
  { id: 4, nome: "NPK 20-05-20", categoria: "fertilizantes", descricao: "Alto nitrogênio e potássio para crescimento" },
  { id: 5, nome: "Ureia 45%", categoria: "fertilizantes", descricao: "Fertilizante nitrogenado concentrado" },
  { id: 6, nome: "Sulfato de Amônio", categoria: "fertilizantes", descricao: "Fonte de nitrogênio e enxofre" },
  { id: 7, nome: "MAP (Fosfato Monoamônico)", categoria: "fertilizantes", descricao: "Alta concentração de fósforo" },
  { id: 8, nome: "DAP (Fosfato Diamônico)", categoria: "fertilizantes", descricao: "Fósforo e nitrogênio para plantio" },
  { id: 9, nome: "Cloreto de Potássio", categoria: "fertilizantes", descricao: "Fonte concentrada de potássio" },
  { id: 10, nome: "Superfosfato Simples", categoria: "fertilizantes", descricao: "Fósforo, cálcio e enxofre" },
  { id: 11, nome: "Superfosfato Triplo", categoria: "fertilizantes", descricao: "Alta concentração de fósforo" },
  { id: 12, nome: "Nitrato de Cálcio", categoria: "fertilizantes", descricao: "Nitrogênio e cálcio prontamente disponíveis" },
  { id: 13, nome: "Nitrato de Potássio", categoria: "fertilizantes", descricao: "Nitrogênio e potássio para fertirrigação" },
  { id: 14, nome: "Fosfato Natural Reativo", categoria: "fertilizantes", descricao: "Fósforo de liberação gradual" },
  { id: 15, nome: "NPK 05-25-25", categoria: "fertilizantes", descricao: "Fórmula para frutíferas" },
  { id: 16, nome: "NPK 15-15-15", categoria: "fertilizantes", descricao: "Fórmula balanceada universal" },
  { id: 17, nome: "NPK 08-28-16", categoria: "fertilizantes", descricao: "Alto fósforo para café" },
  { id: 18, nome: "Nitrato de Amônio", categoria: "fertilizantes", descricao: "Nitrogênio de liberação rápida" },
  { id: 19, nome: "Sulfato de Potássio", categoria: "fertilizantes", descricao: "Potássio sem cloro" },
  { id: 20, nome: "MAP Purificado", categoria: "fertilizantes", descricao: "Alta pureza para fertirrigação" },

  // BIOFERTILIZANTES (16 produtos)
  { id: 21, nome: "BioNitro Plus", categoria: "biofertilizantes", descricao: "Fixação biológica de nitrogênio" },
  { id: 22, nome: "BioFós Ativo", categoria: "biofertilizantes", descricao: "Solubilização de fósforo no solo" },
  { id: 23, nome: "Azospirillum", categoria: "biofertilizantes", descricao: "Bactéria promotora de crescimento" },
  { id: 24, nome: "Bradyrhizobium", categoria: "biofertilizantes", descricao: "Fixador de nitrogênio para leguminosas" },
  { id: 25, nome: "Trichoderma", categoria: "biofertilizantes", descricao: "Biodefensor e promotor de raízes" },
  { id: 26, nome: "Bacillus subtilis", categoria: "biofertilizantes", descricao: "Controle biológico de doenças" },
  { id: 27, nome: "Micorrizas Arbusculares", categoria: "biofertilizantes", descricao: "Fungos simbiontes para raízes" },
  { id: 28, nome: "BioKomposto", categoria: "biofertilizantes", descricao: "Composto orgânico enriquecido" },
  { id: 29, nome: "Húmus de Minhoca Premium", categoria: "biofertilizantes", descricao: "Matéria orgânica de alta qualidade" },
  { id: 30, nome: "BioRaiz Concentrado", categoria: "biofertilizantes", descricao: "Estimulante natural de enraizamento" },
  { id: 31, nome: "BioFoliar Orgânico", categoria: "biofertilizantes", descricao: "Fertilizante foliar orgânico" },
  { id: 32, nome: "Bokashi Fermentado", categoria: "biofertilizantes", descricao: "Fertilizante orgânico fermentado" },
  { id: 33, nome: "Esterco Bovino Curtido", categoria: "biofertilizantes", descricao: "Matéria orgânica estabilizada" },
  { id: 34, nome: "Torta de Mamona", categoria: "biofertilizantes", descricao: "Fonte orgânica de nitrogênio" },
  { id: 35, nome: "Farinha de Ossos", categoria: "biofertilizantes", descricao: "Fósforo e cálcio orgânico" },
  { id: 36, nome: "BioAtivador de Solo", categoria: "biofertilizantes", descricao: "Mix de microrganismos benéficos" },

  // CONDICIONADORES (12 produtos)
  { id: 37, nome: "Calcário Dolomítico", categoria: "condicionadores", descricao: "Correção de acidez do solo" },
  { id: 38, nome: "Calcário Calcítico", categoria: "condicionadores", descricao: "Fonte de cálcio para correção" },
  { id: 39, nome: "Gesso Agrícola", categoria: "condicionadores", descricao: "Condicionador de subsolo" },
  { id: 40, nome: "Enxofre Elementar", categoria: "condicionadores", descricao: "Acidificante e nutriente" },
  { id: 41, nome: "Silício Solúvel", categoria: "condicionadores", descricao: "Fortalecimento de tecidos vegetais" },
  { id: 42, nome: "Condicionador Húmico", categoria: "condicionadores", descricao: "Ácidos húmicos e fúlvicos" },
  { id: 43, nome: "Zeólita Natural", categoria: "condicionadores", descricao: "Retentor de nutrientes" },
  { id: 44, nome: "Vermiculita Expandida", categoria: "condicionadores", descricao: "Condicionador físico do solo" },
  { id: 45, nome: "Turfa Preta", categoria: "condicionadores", descricao: "Matéria orgânica humificada" },
  { id: 46, nome: "Biochar Ativado", categoria: "condicionadores", descricao: "Carvão vegetal para solo" },
  { id: 47, nome: "Pó de Rocha MB-4", categoria: "condicionadores", descricao: "Remineralização do solo" },
  { id: 48, nome: "Termofosfato Magnesiano", categoria: "condicionadores", descricao: "Fósforo, cálcio e magnésio" },

  // ESPECIAIS (8 produtos)
  { id: 49, nome: "Micronutrientes Completo", categoria: "especiais", descricao: "Mix de 7 micronutrientes" },
  { id: 50, nome: "Boro Solúvel", categoria: "especiais", descricao: "Correção de deficiência de boro" },
  { id: 51, nome: "Zinco Quelatizado", categoria: "especiais", descricao: "Zinco de alta absorção" },
  { id: 52, nome: "Manganês EDTA", categoria: "especiais", descricao: "Manganês quelatizado" },
  { id: 53, nome: "Ferro Quelatizado", categoria: "especiais", descricao: "Correção de clorose férrica" },
  { id: 54, nome: "Molibdênio Líquido", categoria: "especiais", descricao: "Micronutriente para leguminosas" },
  { id: 55, nome: "Aminoácidos Livres", categoria: "especiais", descricao: "Bioestimulante vegetal" },
  { id: 56, nome: "Extrato de Algas", categoria: "especiais", descricao: "Bioestimulante marinho natural" }
];

let produtosFiltrados = [...produtosData];

document.addEventListener('componentsLoaded', () => {
  console.log('✅ Página Produtos carregada');
  initProdutosPage();
});

function initProdutosPage() {
  // Marca menu ativo
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes('produtos')) {
      link.classList.add('active');
    }
  });

  // Renderiza todos os produtos
  renderProdutos(produtosData);

  // Configura busca
  setupBusca();

  // Configura filtros
  setupFiltros();

  console.log('🎯 Página Produtos inicializada com', produtosData.length, 'produtos');
}

function renderProdutos(produtos) {
  const grid = document.getElementById('produtos-grid');
  const noResults = document.getElementById('no-results');
  const totalElement = document.getElementById('total-produtos');

  if (produtos.length === 0) {
    grid.innerHTML = '';
    noResults.style.display = 'block';
    totalElement.textContent = '0';
    return;
  }

  noResults.style.display = 'none';
  totalElement.textContent = produtos.length;

  grid.innerHTML = produtos.map(produto => `
    <article class="produto-card" data-categoria="${produto.categoria}">
      <div class="produto-icon">
        <i class="fas ${getCategoriaIcon(produto.categoria)}"></i>
      </div>
      <h3 class="produto-nome">${produto.nome}</h3>
      <p class="produto-categoria">${getCategoriaLabel(produto.categoria)}</p>
      <p class="produto-descricao">${produto.descricao}</p>
      <button class="btn-produto" onclick="abrirWhatsApp('${produto.nome}')">
        <i class="fab fa-whatsapp"></i>
        <span>Solicitar Orçamento</span>
      </button>
    </article>
  `).join('');

  // Anima cards
  animateCards();
}

function getCategoriaIcon(categoria) {
  const icons = {
    fertilizantes: 'fa-flask',
    biofertilizantes: 'fa-leaf',
    condicionadores: 'fa-seedling',
    especiais: 'fa-star'
  };
  return icons[categoria] || 'fa-box';
}

function getCategoriaLabel(categoria) {
  const labels = {
    fertilizantes: 'Fertilizante',
    biofertilizantes: 'Biofertilizante',
    condicionadores: 'Condicionador',
    especiais: 'Especial'
  };
  return labels[categoria] || categoria;
}

function setupBusca() {
  const input = document.getElementById('busca-produto');

  input.addEventListener('input', (e) => {
    const termo = e.target.value.toLowerCase().trim();

    const categoriaAtiva = document.querySelector('.filtro-btn.active').dataset.categoria;

    let produtosFiltrados = produtosData;

    // Filtra por categoria se não for "todos"
    if (categoriaAtiva !== 'todos') {
      produtosFiltrados = produtosFiltrados.filter(p => p.categoria === categoriaAtiva);
    }

    // Filtra por busca
    if (termo) {
      produtosFiltrados = produtosFiltrados.filter(p => 
        p.nome.toLowerCase().includes(termo) ||
        p.descricao.toLowerCase().includes(termo) ||
        p.categoria.toLowerCase().includes(termo)
      );
    }

    renderProdutos(produtosFiltrados);
  });
}

function setupFiltros() {
  const botoes = document.querySelectorAll('.filtro-btn');

  botoes.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active de todos
      botoes.forEach(b => b.classList.remove('active'));

      // Adiciona active no clicado
      btn.classList.add('active');

      const categoria = btn.dataset.categoria;
      const termoBusca = document.getElementById('busca-produto').value.toLowerCase().trim();

      let produtosFiltrados = produtosData;

      // Filtra por categoria
      if (categoria !== 'todos') {
        produtosFiltrados = produtosFiltrados.filter(p => p.categoria === categoria);
      }

      // Aplica busca se houver
      if (termoBusca) {
        produtosFiltrados = produtosFiltrados.filter(p => 
          p.nome.toLowerCase().includes(termoBusca) ||
          p.descricao.toLowerCase().includes(termoBusca)
        );
      }

      renderProdutos(produtosFiltrados);
    });
  });
}

function animateCards() {
  const cards = document.querySelectorAll('.produto-card');

  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';

    setTimeout(() => {
      card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 30);
  });
}

function abrirWhatsApp(nomeProduto) {
  const mensagem = encodeURIComponent(`Olá! Gostaria de solicitar um orçamento para o produto: ${nomeProduto}`);
  const numero = '5527999999999';
  window.open(`https://wa.me/${numero}?text=${mensagem}`, '_blank');
}