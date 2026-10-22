// Inicialização dos ícones Lucide
lucide.createIcons();

// 1. Menu Mobile Drawer
const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
const mobileDrawer = document.getElementById('mobile-drawer');
const menuBarsIcon = document.getElementById('menu-icon-bars');
const menuCloseIcon = document.getElementById('menu-icon-close');
const mobileLinks = document.querySelectorAll('.mobile-link');

mobileToggleBtn.addEventListener('click', () => {
  const isOpen = mobileDrawer.classList.toggle('open');
  menuBarsIcon.style.display = isOpen ? 'none' : 'block';
  menuCloseIcon.style.display = isOpen ? 'block' : 'none';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileDrawer.classList.remove('open');
    menuBarsIcon.style.display = 'block';
    menuCloseIcon.style.display = 'none';
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

cmsTrigger.addEventListener('click', () => {
  cmsModalPanel.classList.toggle('open');
});

cmsCloseBtn.addEventListener('click', () => {
  cmsModalPanel.classList.remove('open');
});

function updateCMSLayout() {
  const showNews = toggleNewsCheck.checked;
  const showPaper = togglePaperCheck.checked;

  // Visibilidade individual dos blocos
  submoduleNoticias.style.display = showNews ? 'flex' : 'none';
  submoduleJornal.style.display = showPaper ? 'block' : 'none';

  // Reorganização fluida de grid caso apenas 1 esteja ativo
  if (showNews && !showPaper) {
    comunicacaoGrid.style.gridTemplateColumns = '1fr';
  } else if (!showNews && showPaper) {
    comunicacaoGrid.style.gridTemplateColumns = '1fr';
  } else if (window.innerWidth >= 992) {
    comunicacaoGrid.style.gridTemplateColumns = '1.25fr 0.95fr';
  }

  // Se ambos estiverem desligados, ocultar a seção e o item de menu sem buracos
  if (!showNews && !showPaper) {
    comunicacaoSection.style.display = 'none';
    navComunicacaoLink.style.display = 'none';
    mobileComunicacaoLink.style.display = 'none';
    cmsStatusBadge.textContent = 'Essencial (Sem Mídias)';
    cmsStatusBadge.style.color = 'var(--slate-600)';
    cmsStatusBadge.style.background = 'var(--cream-200)';
  } else {
    comunicacaoSection.style.display = 'block';
    navComunicacaoLink.style.display = 'inline-flex';
    mobileComunicacaoLink.style.display = 'flex';

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

toggleNewsCheck.addEventListener('change', updateCMSLayout);
togglePaperCheck.addEventListener('change', updateCMSLayout);

// 4. Modais
const modalNewspaper = document.getElementById('modal-newspaper');
const modalNews = document.getElementById('modal-news');
const newsTitleTarget = document.getElementById('news-title-target');
const newsBodyTarget = document.getElementById('news-body-target');

function openNewspaperModal() {
  modalNewspaper.classList.add('active');
  document.body.style.overflow = 'hidden';
  lucide.createIcons();
}

function closeNewspaperModal() {
  modalNewspaper.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function openNewsModal(title, text) {
  newsTitleTarget.textContent = title;
  newsBodyTarget.textContent = text;
  modalNews.classList.add('active');
  document.body.style.overflow = 'hidden';
  lucide.createIcons();
}

function closeNewsModal() {
  modalNews.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Fechar ao clicar fora da caixa do modal
window.addEventListener('click', (e) => {
  if (e.target === modalNewspaper) closeNewspaperModal();
  if (e.target === modalNews) closeNewsModal();
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
