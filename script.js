// Inicialização dos ícones Lucide
if (typeof lucide !== 'undefined') {
  lucide.createIcons();
}

// 1. Menu Mobile Drawer
const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
const mobileDrawer = document.getElementById('mobile-drawer');
const menuBarsIcon = document.getElementById('menu-icon-bars');
const menuCloseIcon = document.getElementById('menu-icon-close');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (mobileToggleBtn && mobileDrawer) {
  mobileToggleBtn.addEventListener('click', () => {
    const isOpen = mobileDrawer.classList.toggle('open');
    if (menuBarsIcon) menuBarsIcon.style.display = isOpen ? 'none' : 'block';
    if (menuCloseIcon) menuCloseIcon.style.display = isOpen ? 'block' : 'none';
  });
}

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (menuBarsIcon) menuBarsIcon.style.display = 'block';
    if (menuCloseIcon) menuCloseIcon.style.display = 'none';
  });
});

// 2. Abas dos Ciclos Educacionais
const tabButtons = document.querySelectorAll('.tab-btn');
const cyclePanels = document.querySelectorAll('.cycle-panel');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    cyclePanels.forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    const targetId = btn.getAttribute('data-tab');
    const targetPanel = document.getElementById(targetId);
    if (targetPanel) {
      targetPanel.classList.add('active');
    }
  });
});

// 3. Simulador CMS de Módulos Opcionais
const cmsTrigger = document.getElementById('cms-toggle-trigger');
const cmsModalPanel = document.getElementById('cms-modal-panel');
const cmsCloseBtn = document.getElementById('cms-close-btn');

const toggleNewsCheck = document.getElementById('toggle-news-check');
const togglePaperCheck = document.getElementById('toggle-paper-check');
const cmsStatusBadge = document.getElementById('cms-status-badge');

const submoduleNoticias = document.getElementById('submodule-noticias');
const submoduleJornal = document.getElementById('submodule-jornal');
const comunicacaoSection = document.getElementById('comunicacao-section');
const comunicacaoGrid = document.getElementById('comunicacao-grid');
const navComunicacaoLink = document.getElementById('nav-comunicacao-link');
const mobileComunicacaoLink = document.getElementById('mobile-comunicacao-link');

if (cmsTrigger && cmsModalPanel) {
  cmsTrigger.addEventListener('click', () => {
    cmsModalPanel.classList.toggle('open');
  });
}

if (cmsCloseBtn && cmsModalPanel) {
  cmsCloseBtn.addEventListener('click', () => {
    cmsModalPanel.classList.remove('open');
  });
}

function updateCMSLayout() {
  if (!toggleNewsCheck || !togglePaperCheck) return;
  const showNews = toggleNewsCheck.checked;
  const showPaper = togglePaperCheck.checked;

  // Visibilidade individual dos blocos
  if (submoduleNoticias) submoduleNoticias.style.display = showNews ? 'flex' : 'none';
  if (submoduleJornal) submoduleJornal.style.display = showPaper ? 'block' : 'none';

  // Reorganização fluida de grid caso apenas 1 esteja ativo
  if (comunicacaoGrid) {
    if (showNews && !showPaper) {
      comunicacaoGrid.style.gridTemplateColumns = '1fr';
    } else if (!showNews && showPaper) {
      comunicacaoGrid.style.gridTemplateColumns = '1fr';
    } else if (window.innerWidth >= 992) {
      comunicacaoGrid.style.gridTemplateColumns = '1.25fr 0.95fr';
    }
  }

  // Se ambos estiverem desligados, ocultar a seção e o item de menu sem buracos
  if (comunicacaoSection && cmsStatusBadge) {
    if (!showNews && !showPaper) {
      comunicacaoSection.style.display = 'none';
      if (navComunicacaoLink) navComunicacaoLink.style.display = 'none';
      if (mobileComunicacaoLink) mobileComunicacaoLink.style.display = 'none';
      cmsStatusBadge.textContent = 'Essencial (Sem Mídias)';
      cmsStatusBadge.style.color = 'var(--slate-600)';
      cmsStatusBadge.style.background = 'var(--cream-200)';
    } else {
      comunicacaoSection.style.display = 'block';
      if (navComunicacaoLink) navComunicacaoLink.style.display = 'inline-flex';
      if (mobileComunicacaoLink) mobileComunicacaoLink.style.display = 'flex';

      if (showNews && showPaper) {
        cmsStatusBadge.textContent = 'Completo';
        cmsStatusBadge.style.color = 'var(--cgreen-700)';
        cmsStatusBadge.style.background = 'var(--cgreen-100)';
      } else if (showNews) {
        cmsStatusBadge.textContent = 'Apenas Notícias';
        cmsStatusBadge.style.color = 'var(--cblue-800)';
        cmsStatusBadge.style.background = 'var(--cblue-100)';
      } else {
        cmsStatusBadge.textContent = 'Apenas Jornal';
        cmsStatusBadge.style.color = 'var(--corange-800)';
        cmsStatusBadge.style.background = 'var(--corange-100)';
      }
    }
  }
}

if (toggleNewsCheck) {
  toggleNewsCheck.addEventListener('change', updateCMSLayout);
}
if (togglePaperCheck) {
  togglePaperCheck.addEventListener('change', updateCMSLayout);
}

// 4. Modais
const modalNewspaper = document.getElementById('modal-newspaper');
const modalNews = document.getElementById('modal-news');
const newsTitleTarget = document.getElementById('news-title-target');
const newsBodyTarget = document.getElementById('news-body-target');

function openNewspaperModal() {
  if (modalNewspaper) {
    modalNewspaper.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
}

function closeNewspaperModal() {
  if (modalNewspaper) {
    modalNewspaper.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

function openNewsModal(title, text) {
  if (newsTitleTarget) newsTitleTarget.textContent = title;
  if (newsBodyTarget) newsBodyTarget.textContent = text;
  if (modalNews) {
    modalNews.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
}

function closeNewsModal() {
  if (modalNews) {
    modalNews.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// Fechar ao clicar fora da caixa do modal
window.addEventListener('click', (e) => {
  if (modalNewspaper && e.target === modalNewspaper) closeNewspaperModal();
  if (modalNews && e.target === modalNews) closeNewsModal();
});

// 5. Download Simulado de PDF
function mockDownloadPdf() {
  const toast = document.createElement('div');
  toast.style.position = 'fixed';
  toast.style.top = '20px';
  toast.style.right = '20px';
  toast.style.zIndex = '999';
  toast.style.background = 'var(--cblue-950)';
  toast.style.color = 'var(--white)';
  toast.style.padding = '14px 20px';
  toast.style.borderRadius = 'var(--radius-lg)';
  toast.style.border = '2px solid var(--corange-500)';
  toast.style.boxShadow = 'var(--shadow-lg)';
  toast.style.fontSize = '0.85rem';
  toast.style.fontWeight = '700';
  toast.innerHTML = '📥 Download preparado: <strong>Vozes-da-Chacara-Edicao-42.pdf</strong>';
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500);
}

// 6. Formulário de Visita
function handleFormSubmit(e) {
  e.preventDefault();
  const nome = document.getElementById('form-nome').value;
  const fone = document.getElementById('form-fone').value;
  const feedback = document.getElementById('form-feedback-box');
  const submitBtn = document.getElementById('form-submit-btn');

  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Agendando carinhosamente...';

  setTimeout(() => {
    feedback.style.display = 'block';
    feedback.innerHTML = `Que alegria, <strong>${nome}</strong>! Recebemos sua solicitação. Nossa equipe entrará em contato pelo WhatsApp <strong>${fone}</strong> para marcar o café e a caminhada pela chácara com sua família!`;

    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Pedido Enviado com Sucesso! ✔';
    document.getElementById('visita-form').reset();
  }, 700);
}

// 7. Filtro Interativo da Equipe Escolar
const teamFilterBtns = document.querySelectorAll('.team-filter-btn');
const teamCards = document.querySelectorAll('.team-card');

if (teamFilterBtns.length > 0 && teamCards.length > 0) {
  teamFilterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      teamFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      teamCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Ativação automática se houver hash na URL (ex: equipe.html#gestao)
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash) {
    const matchingBtn = document.querySelector(`.team-filter-btn[data-filter="${initialHash}"]`);
    if (matchingBtn) {
      matchingBtn.click();
    }
  }
}

// 8. Filtro Interativo e Busca de Documentos Oficiais
const docFilterBtns = document.querySelectorAll('.doc-filter-btn');
const docCards = document.querySelectorAll('.doc-card');
const docSearchInput = document.getElementById('doc-search-input');

function filterDocs() {
  const activeBtn = document.querySelector('.doc-filter-btn.active');
  const activeFilter = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
  const query = docSearchInput ? docSearchInput.value.toLowerCase().trim() : '';

  docCards.forEach(card => {
    const category = card.getAttribute('data-category');
    const title = (card.querySelector('.doc-card-title')?.textContent || '').toLowerCase();
    const desc = (card.querySelector('.doc-card-desc')?.textContent || '').toLowerCase();

    const matchesFilter = (activeFilter === 'all' || category === activeFilter);
    const matchesSearch = (!query || title.includes(query) || desc.includes(query));

    if (matchesFilter && matchesSearch) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

if (docFilterBtns.length > 0 && docCards.length > 0) {
  docFilterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      docFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterDocs();
    });
  });
}

if (docSearchInput) {
  docSearchInput.addEventListener('input', filterDocs);
}


