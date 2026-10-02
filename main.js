/**
 * ALCANÇAR - Clínica de Fisioterapia Integrada
 * Main JavaScript
 */

const CONFIG = {
  units: {
    almenara: {
      nome: "Almenara",
      whatsapp: "5533999423675",
      endereco: "Rua Henrique Heitman, 288 – São Judas – Almenara/MG"
    },
    jacinto: {
      nome: "Jacinto",
      whatsapp: "5533999193564",
      endereco: "Rua Clarindo Barbosa, 92 – Centro – Jacinto/MG"
    }
  },
  horario: "segunda a sexta, 7h às 21h",
  showTestimonials: false,
  guidedToolRules: {
    "mim-dor": "Fisioterapia ortopédica (adulto)",
    "mim-recuperacao": "Fisioterapia ortopédica (adulto)",
    "mim-desenvolvimento": "Terapeuta CME",
    "mim-emocional": "Psicologia",
    "mim-nutricao": "Nutrição",
    "mim-estetica": "Estética",
    "mim-atividade": "Pilates",
    "filho-dor": "Fisioterapia infantil",
    "filho-recuperacao": "Fisioterapia infantil",
    "filho-desenvolvimento": "Terapeuta CME",
    "filho-emocional": "Psicologia infantil",
    "filho-nutricao": "Nutrição",
    "filho-estetica": "Estética",
    "filho-atividade": "Pilates",
    "idoso-dor": "Fisioterapia para idosos",
    "idoso-recuperacao": "Fisioterapia para idosos",
    "idoso-desenvolvimento": "Terapeuta CME",
    "idoso-emocional": "Psicologia",
    "idoso-nutricao": "Nutrição",
    "idoso-estetica": "Estética",
    "idoso-atividade": "Hidroginástica e Pilates",
    "gestante-dor": "Fisioterapia pélvica",
    "gestante-recuperacao": "Fisioterapia pélvica",
    "gestante-desenvolvimento": "Psicopedagogia",
    "gestante-emocional": "Psicologia",
    "gestante-nutricao": "Nutrição",
    "gestante-estetica": "Estética",
    "gestante-atividade": "Pilates"
  },
  bodyMapRules: {
    pescoco: {
      title: "Pescoço e cabeça",
      desc: "Dor e tensão no pescoço e na região da cabeça.",
      services: "Fisioterapia ortopédica"
    },
    ombro: {
      title: "Ombro e braço",
      desc: "Dor ao levantar o braço, lesões e recuperação de cirurgia.",
      services: "Fisioterapia ortopédica"
    },
    coluna: {
      title: "Coluna",
      desc: "Dor nas costas e má postura.",
      services: "Fisioterapia ortopédica e Pilates"
    },
    quadril: {
      title: "Quadril e região pélvica",
      desc: "Dor no quadril, gestação, pós-parto e cuidados com a saúde íntima.",
      services: "Fisioterapia pélvica"
    },
    joelho: {
      title: "Joelho",
      desc: "Dor, inchaço e recuperação após lesões ou cirurgia.",
      services: "Fisioterapia ortopédica e Hidroterapia"
    },
    pe: {
      title: "Pé e tornozelo",
      desc: "Torções, dor ao caminhar e recuperação de lesões.",
      services: "Fisioterapia ortopédica"
    }
  }
};

// ============================================
// Loader
// ============================================
function initLoader() {
  const loader = document.getElementById('loader');
  const html = document.documentElement;

  // Add js-ready class
  html.classList.add('js-ready');

  // Fallback: hide loader after 1.5s regardless
  const loaderTimeout = setTimeout(() => {
    if (loader && !loader.classList.contains('hidden')) {
      loader.classList.add('hidden');
    }
  }, 1500);

  // Try to use IntersectionObserver for smoother hiding
  try {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        clearTimeout(loaderTimeout);
        if (loader) loader.classList.add('hidden');
      }, { timeout: 1000 });
    } else {
      clearTimeout(loaderTimeout);
      if (loader) loader.classList.add('hidden');
    }
  } catch (e) {
    clearTimeout(loaderTimeout);
    if (loader) loader.classList.add('hidden');
  }
}

// ============================================
// Font Size Toggle
// ============================================
function initFontSize() {
  const btn = document.getElementById('btn-font-size');
  const sizes = [18, 20, 22];
  let currentIndex = 0;

  // Try to restore saved size
  try {
    const saved = localStorage.getItem('alcancar-font-size');
    if (saved) {
      currentIndex = sizes.indexOf(parseInt(saved));
      if (currentIndex === -1) currentIndex = 0;
      document.body.style.fontSize = sizes[currentIndex] + 'px';
    }
  } catch (e) {}

  if (btn) {
    btn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % sizes.length;
      const newSize = sizes[currentIndex];
      document.body.style.fontSize = newSize + 'px';
      try {
        localStorage.setItem('alcancar-font-size', newSize);
      } catch (e) {}
    });
  }
}

// ============================================
// Hero Word Rotation
// ============================================
function initHeroWord() {
  const heroWord = document.getElementById('hero-word');
  if (!heroWord) return;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const words = ['movimento', 'bem-estar', 'futuro', 'família'];
  let currentIndex = 0;

  // Don't start if there's no JS
  heroWord.style.opacity = '1';

  setInterval(() => {
    heroWord.style.opacity = '0';
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % words.length;
      heroWord.textContent = words[currentIndex];
      heroWord.style.opacity = '1';
    }, 400);
  }, 2500);
}

// ============================================
// Mobile Menu
// ============================================
function initMobileMenu() {
  const btn = document.getElementById('btn-hamburger');
  const menu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('mobile-menu-close');
  const links = menu?.querySelectorAll('.mobile-menu-link');

  if (!btn || !menu) return;

  function openMenu() {
    menu.hidden = false;
    document.body.style.overflow = 'hidden';
    btn.setAttribute('aria-expanded', 'true');
    closeBtn?.focus();
  }

  function closeMenu() {
    menu.hidden = true;
    document.body.style.overflow = '';
    btn.setAttribute('aria-expanded', 'false');
    btn.focus();
  }

  btn.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);

  links?.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) {
      closeMenu();
    }
  });
}

// ============================================
// Modal (Scheduling)
// ============================================
function initModal() {
  const modal = document.getElementById('modal-unidade');
  const closeBtn = modal?.querySelector('[data-close]');
  const overlay = modal?.querySelector('.modal-overlay');

  if (!modal) return;

  let lastFocusedElement = null;
  let currentService = '';
  let currentUnit = '';
  let isCallMode = false;

  function openModal(service = '', unit = '', callMode = false) {
    lastFocusedElement = document.activeElement;
    currentService = service;
    currentUnit = unit;
    isCallMode = callMode;

    // Update modal content based on mode
    const title = document.getElementById('modal-titulo');
    const unitCards = modal.querySelectorAll('.modal-unit-card');

    if (callMode) {
      title.textContent = 'Ligar para qual unidade?';
      unitCards.forEach(card => {
        const unitKey = card.id.replace('modal-unit-', '');
        const unitConfig = CONFIG.units[unitKey];
        if (unitConfig) {
          card.href = `tel:+55${unitConfig.whatsapp}`;
          card.querySelector('p').textContent = unitConfig.endereco.split(' – ')[0];
        }
      });
    } else {
      title.textContent = 'Agende a sua consulta aqui';
      unitCards.forEach(card => {
        const unitKey = card.id.replace('modal-unit-', '');
        const unitConfig = CONFIG.units[unitKey];
        if (unitConfig) {
          card.href = `tel:+55${unitConfig.whatsapp}`;
          card.querySelector('p').textContent = unitConfig.endereco.split(' – ')[0];
        }
      });
    }

    // Update hrefs with message
    updateModalLinks();

    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
  }

  function updateModalLinks() {
    const unitCards = modal.querySelectorAll('.modal-unit-card');

    unitCards.forEach(card => {
      const unitKey = card.id.replace('modal-unit-', '');
      const unitConfig = CONFIG.units[unitKey];

      if (isCallMode) {
        card.href = `tel:+55${unitConfig.whatsapp}`;
      } else {
        let message;
        if (currentService) {
          message = `Olá! Gostaria de agendar ${currentService} na unidade de ${unitConfig.nome}.`;
        } else {
          message = `Olá! Gostaria de agendar uma consulta na unidade de ${unitConfig.nome}.`;
        }
        card.href = `https://wa.me/${unitConfig.whatsapp}?text=${encodeURIComponent(message)}`;
      }
    });
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  closeBtn?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) {
      closeModal();
    }
  });

  // Expose for external use
  window.openSchedulingModal = openModal;
}

// ============================================
// Click Delegation for data-agendar
// ============================================
function initClickDelegation() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-agendar]');
    if (!btn) return;

    const service = btn.dataset.servico || '';
    const unit = btn.dataset.unidade || '';
    const isCallBtn = btn.id === 'btn-call';

    window.openSchedulingModal(service, unit, isCallBtn);
  });

  // Floating WhatsApp button
  const floatBtn = document.getElementById('btn-float');
  if (floatBtn) {
    floatBtn.addEventListener('click', () => {
      window.openSchedulingModal('', '', false);
    });
  }
}

// ============================================
// Guided Tool
// ============================================
function initGuidedTool() {
  const toolContent = document.getElementById('tool-q1');
  if (!toolContent) return;

  let step = 1;
  let answer1 = '';
  let answer2 = '';

  const q1 = document.getElementById('tool-q1');
  const q2 = document.getElementById('tool-q2');
  const result = document.getElementById('tool-result');
  const progress = document.getElementById('tool-progress');
  const backBtn = document.getElementById('tool-back');
  const restartBtn = document.getElementById('tool-restart');
  const resultService = document.getElementById('tool-result-service');
  const resultBtn = document.getElementById('tool-result-btn');

  // Answer buttons
  document.querySelectorAll('.tool-option').forEach(btn => {
    btn.addEventListener('click', () => {
      if (step === 1) {
        answer1 = btn.dataset.toolAnswer;
        step = 2;
        q1.hidden = true;
        q2.hidden = false;
        progress.textContent = 'Pergunta 2 de 2';
        backBtn.hidden = false;
      } else if (step === 2) {
        answer2 = btn.dataset.toolAnswer;
        showResult();
      }
    });
  });

  function showResult() {
    const key = `${answer1}-${answer2}`;
    const service = CONFIG.guidedToolRules[key] || 'Fisioterapia geral';

    step = 3;
    q2.hidden = true;
    result.hidden = false;
    progress.hidden = true;
    backBtn.hidden = true;

    resultService.textContent = service;
    resultBtn.dataset.servico = service;
  }

  backBtn?.addEventListener('click', () => {
    if (step === 2) {
      step = 1;
      q2.hidden = true;
      q1.hidden = false;
      progress.textContent = 'Pergunta 1 de 2';
      backBtn.hidden = true;
      answer1 = '';
    }
  });

  restartBtn?.addEventListener('click', () => {
    step = 1;
    answer1 = '';
    answer2 = '';
    result.hidden = true;
    q1.hidden = false;
    progress.hidden = false;
    progress.textContent = 'Pergunta 1 de 2';
    backBtn.hidden = true;
  });
}

// ============================================
// Body Map
// ============================================
function initBodyMap() {
  const parts = document.querySelectorAll('.body-part');
  const chips = document.querySelectorAll('.body-chip');
  const resultTitle = document.getElementById('body-result-title');
  const resultDesc = document.getElementById('body-result-desc');
  const resultServices = document.getElementById('body-result-services');
  const resultBtn = document.getElementById('body-result-btn');

  if (!parts.length) return;

  function updateBodyPart(partKey) {
    const rule = CONFIG.bodyMapRules[partKey];
    if (!rule) return;

    // Update active state
    parts.forEach(p => p.classList.remove('active'));
    chips.forEach(c => c.classList.remove('active'));

    document.querySelector(`[data-body-part="${partKey}"]`)?.classList.add('active');
    document.querySelector(`.body-chip[data-body-part="${partKey}"]`)?.classList.add('active');

    // Update result
    resultTitle.textContent = rule.title;
    resultDesc.textContent = rule.desc;
    resultServices.textContent = rule.services;
    resultBtn.dataset.servico = rule.services;
  }

  // Click/tap on SVG parts
  parts.forEach(part => {
    part.addEventListener('click', () => {
      updateBodyPart(part.dataset.bodyPart);
    });
    part.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        updateBodyPart(part.dataset.bodyPart);
      }
    });
  });

  // Click on chips
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      updateBodyPart(chip.dataset.bodyPart);
    });
  });
}

// ============================================
// Services Tabs & Cards
// ============================================
function initServices() {
  const tabs = document.querySelectorAll('.service-tab');
  const cards = document.querySelectorAll('.service-card');
  const toggleBtn = document.getElementById('services-toggle-btn');
  let showingAll = false;

  if (!tabs.length) return;

  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const tabName = tab.dataset.tab;

      cards.forEach(card => {
        const cats = card.dataset.categories || '';
        const isVisible = tabName === 'todos' || cats.includes(tabName);

        if (!showingAll && tabName === 'todos') {
          // Show only first 6 for "Todos"
          const index = Array.from(cards).indexOf(card);
          card.classList.toggle('hidden-card', index >= 6);
        } else {
          card.classList.toggle('hidden-card', !isVisible);
        }
        card.classList.remove('expanded');
      });

      // Scroll tab into view
      tab.scrollIntoView({ inline: 'center', behavior: 'smooth' });
    });
  });

  // Card expand/collapse
  cards.forEach(card => {
    const toggle = card.querySelector('.service-card-toggle');
    toggle?.addEventListener('click', (e) => {
      // Don't collapse if clicking the agendar button
      if (e.target.closest('[data-agendar]')) return;

      const wasExpanded = card.classList.contains('expanded');

      // Close all others
      cards.forEach(c => c.classList.remove('expanded'));

      // Toggle current
      if (!wasExpanded) {
        card.classList.add('expanded');
        toggle.setAttribute('aria-expanded', 'true');
      } else {
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Show all / Show less
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      showingAll = !showingAll;

      cards.forEach(card => {
        card.classList.toggle('hidden-card', !showingAll);
      });

      toggleBtn.textContent = showingAll ? 'Mostrar menos' : 'Ver todos os serviços (16)';
    });

    // Initially hide cards beyond 6
    cards.forEach((card, index) => {
      if (index >= 6) {
        card.classList.add('hidden-card');
      }
    });
  }
}

// ============================================
// Units Tabs
// ============================================
function initUnits() {
  const tabs = document.querySelectorAll('.unidade-tab');
  const panels = document.querySelectorAll('.unidade-panel');

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const unit = tab.dataset.unidade;

      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      panels.forEach(p => {
        p.hidden = p.id !== `unidade-${unit}`;
      });
    });
  });
}

// ============================================
// Unit Status (Open/Closed)
// ============================================
function initUnitStatus() {
  function updateStatus() {
    const now = new Date();
    // Use São Paulo timezone
    const options = { timeZone: 'America/Sao_Paulo', hour: 'numeric', minute: 'numeric', hour12: false };
    const timeStr = now.toLocaleTimeString('en-US', options);
    const hour = parseInt(timeStr.split(':')[0]);
    const day = now.getDay();

    const isOpen = day >= 1 && day <= 5 && hour >= 7 && hour < 21;
    const statusText = isOpen ? 'Aberto agora' : 'Fechado agora';
    const statusClass = isOpen ? '' : 'closed';

    document.querySelectorAll('.unidade-status').forEach(el => {
      el.textContent = statusText;
      el.classList.toggle('closed', !isOpen);
    });
  }

  updateStatus();
  setInterval(updateStatus, 60000);
}

// ============================================
// Form
// ============================================
function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome');
    const unidade = document.getElementById('unidade');
    const servico = document.getElementById('servico');
    const mensagem = document.getElementById('mensagem');

    // Clear previous errors
    document.querySelectorAll('.form-error').forEach(el => el.textContent = '');

    // Validate
    let hasError = false;

    if (!nome.value.trim()) {
      document.getElementById('nome-error').textContent = 'Por favor, preencha seu nome';
      hasError = true;
    }

    if (!unidade.value) {
      document.getElementById('unidade-error').textContent = 'Por favor, escolha uma unidade';
      hasError = true;
    }

    if (!servico.value) {
      document.getElementById('servico-error').textContent = 'Por favor, escolha um serviço';
      hasError = true;
    }

    if (hasError) return;

    // Build message
    const unitConfig = CONFIG.units[unidade.value.toLowerCase()];
    let message = `Olá! Meu nome é ${nome.value}. Gostaria de ${servico.value} na unidade de ${unitConfig?.nome || unidade.value}.`;

    if (mensagem.value.trim()) {
      message += ` ${mensagem.value.trim()}`;
    }

    // Open WhatsApp
    const waUrl = `https://wa.me/${unitConfig?.whatsapp || ''}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  });
}

// ============================================
// FAQ Accordion
// ============================================
function initFAQ() {
  // <details>/<summary> handles this natively
  // Just ensure proper styling in CSS
}

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ============================================
// Initialize Everything
// ============================================
(function init() {
  try {
    initLoader();
    initFontSize();
    initMobileMenu();
    initModal();
    initClickDelegation();
    initHeroWord();
    initGuidedTool();
    initBodyMap();
    initServices();
    initUnits();
    initUnitStatus();
    initForm();
    initFAQ();
    initSmoothScroll();
  } catch (e) {
    console.error('Initialization error:', e);
    // Reveal everything in case of error
    document.querySelectorAll('.reveal, [hidden]').forEach(el => {
      if (el.id !== 'modal-unidade' && el.id !== 'mobile-menu') {
        el.hidden = false;
        el.style.opacity = '1';
      }
    });
  }
})();

// ============================================
// Test: Verify all 28 guided tool combinations
// ============================================
if (typeof window !== 'undefined') {
  window.testGuidedTool = function() {
    const combinations = [
      'mim-dor', 'mim-recuperacao', 'mim-desenvolvimento', 'mim-emocional', 'mim-nutricao', 'mim-estetica', 'mim-atividade',
      'filho-dor', 'filho-recuperacao', 'filho-desenvolvimento', 'filho-emocional', 'filho-nutricao', 'filho-estetica', 'filho-atividade',
      'idoso-dor', 'idoso-recuperacao', 'idoso-desenvolvimento', 'idoso-emocional', 'idoso-nutricao', 'idoso-estetica', 'idoso-atividade',
      'gestante-dor', 'gestante-recuperacao', 'gestante-desenvolvimento', 'gestante-emocional', 'gestante-nutricao', 'gestante-estetica', 'gestante-atividade'
    ];

    let passed = 0;
    let failed = 0;

    combinations.forEach(key => {
      const result = CONFIG.guidedToolRules[key];
      if (result) {
        passed++;
      } else {
        console.error(`Missing result for: ${key}`);
        failed++;
      }
    });

    console.log(`Guided Tool Test: ${passed} passed, ${failed} failed`);
    return failed === 0;
  };
}