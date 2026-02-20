(() => {
  const BRAND = {
    icon: 'assets/media/brand/stonex-icon.png',
    logo: 'assets/media/brand/stonex-logo.png'
  };

  const SERVICES = [
    {
      key: 'roof-replacement',
      title: 'Roof Replacement',
      page: 'roof-replacement.html',
      image: 'assets/media/work/home-estate.jpg',
      text: 'Full-system replacement with clean sequencing and precise installation.',
      bullets: ['Full tear-off and deck check', 'Ventilation and airflow strategy', 'Detail package for long-term weather resilience']
    },
    {
      key: 'cedar-conversion',
      title: 'Cedar to Asphalt Conversion',
      page: 'cedar-conversion.html',
      image: 'assets/media/work/cedar-after.jpg',
      text: 'Architecturally respectful conversion focused on durability and finish consistency.',
      bullets: ['Cedar removal and assessment', 'Moisture and airflow detailing', 'Premium asphalt installation']
    },
    {
      key: 'emergency-leak-repair',
      title: 'Emergency Leak Repair',
      page: 'emergency-leak-repair.html',
      image: 'assets/media/work/crew-main.jpg',
      text: 'Rapid-response stabilization with practical long-term correction paths.',
      bullets: ['Fast leak-source isolation', 'Temporary protection if needed', 'Permanent repair recommendations']
    },
    {
      key: 'metal-roofing',
      title: 'Metal Roofing',
      page: 'metal-roofing.html',
      image: 'assets/media/work/home-westvan.jpg',
      text: 'Design-forward systems with high-detail flashing and transition work.',
      bullets: ['Architectural profile options', 'Precision edge and seam details', 'Long-horizon material direction']
    },
    {
      key: 'flat-roofing',
      title: 'Flat Roofing',
      page: 'flat-roofing.html',
      image: 'assets/media/work/flat-after.jpg',
      text: 'Low-slope roofing centered on drainage logic and membrane reliability.',
      bullets: ['Slope and drainage review', 'Membrane strategy and detailing', 'Penetration and perimeter control']
    }
  ];

  const WORK = [
    { id: 'w1', title: 'Hillside Residence', image: 'assets/media/work/home-estate.jpg', className: 'span-5x2' },
    { id: 'w2', title: 'North Shore Exterior', image: 'assets/media/work/home-westvan.jpg', className: 'span-3x1' },
    { id: 'w3', title: 'Detail Installation', image: 'assets/media/detail/install-detail.jpg', className: 'span-4x1' },
    { id: 'w4', title: 'Conversion Result', image: 'assets/media/work/cedar-after.jpg', className: 'span-4x1' },
    { id: 'w5', title: 'Flat Roof Upgrade', image: 'assets/media/work/flat-after.jpg', className: 'span-4x1' },
    { id: 'w6', title: 'Roofline Detail', image: 'assets/media/detail/roof-crew.jpg', className: 'span-4x1' }
  ];

  const STORY = [
    {
      title: 'Rain',
      text: 'Water-management details are configured for sustained wet-season exposure.',
      image: 'assets/media/detail/install-close.jpg'
    },
    {
      title: 'Moss',
      text: 'Surface strategy and maintenance planning reduce moisture retention pressure.',
      image: 'assets/media/work/cedar-before.jpg'
    },
    {
      title: 'Ventilation',
      text: 'Airflow design is treated as a core part of system health.',
      image: 'assets/media/detail/roof-nailer.jpg'
    },
    {
      title: 'Flashing',
      text: 'Transitions, penetrations, and edges are handled with precision.',
      image: 'assets/media/work/home-after.jpg'
    }
  ];

  const STANDARDS = [
    'Scope clarity before work begins',
    'Disciplined staging and site protection',
    'Detail-first installation sequencing',
    'Transparent communication checkpoints',
    'Structured final walkthrough process',
    'Clean documentation handoff'
  ];

  const REVIEWS = [
    {
      quote:
        'From inspection to cleanup, everything felt organized and clearly communicated. The final walkthrough was thorough.',
      author: 'Michael R., North Vancouver'
    },
    {
      quote: 'The written scope was detailed and transparent. No surprises, just clear options and timelines.',
      author: 'David L., West Vancouver'
    },
    {
      quote: 'They explained ventilation and materials in a way that made the decision easy.',
      author: 'Sarah T., Burnaby'
    },
    {
      quote: 'Professional, punctual, and meticulous about finishing details.',
      author: 'Jason K., Vancouver'
    },
    {
      quote: 'Clear scheduling, respectful crew, and a clean site every day.',
      author: 'Amanda C., Surrey'
    },
    {
      quote: 'Attention to detail and communication were excellent from start to finish.',
      author: 'Mark D., Langley'
    }
  ];

  const REGION_CITIES = {
    'North Shore': [
      { name: 'North Vancouver', href: 'north-vancouver.html' },
      { name: 'West Vancouver', href: 'west-vancouver.html' }
    ],
    Vancouver: [
      { name: 'Vancouver', href: 'vancouver.html' },
      { name: 'Point Grey', href: 'vancouver.html' },
      { name: 'Kitsilano', href: 'vancouver.html' }
    ],
    Burnaby: [
      { name: 'Burnaby', href: 'burnaby.html' },
      { name: 'Brentwood', href: 'burnaby.html' },
      { name: 'South Slope', href: 'burnaby.html' }
    ],
    'Tri-Cities': [
      { name: 'Coquitlam', href: 'coquitlam.html' },
      { name: 'Port Coquitlam', href: 'coquitlam.html' },
      { name: 'Port Moody', href: 'coquitlam.html' }
    ],
    Richmond: [
      { name: 'Richmond', href: 'richmond.html' },
      { name: 'Steveston', href: 'richmond.html' }
    ],
    Surrey: [
      { name: 'Surrey', href: 'surrey.html' },
      { name: 'South Surrey', href: 'surrey.html' },
      { name: 'Cloverdale', href: 'surrey.html' }
    ],
    Langley: [
      { name: 'Langley', href: 'langley.html' },
      { name: 'Willoughby', href: 'langley.html' },
      { name: 'Walnut Grove', href: 'langley.html' }
    ]
  };

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setupBrand() {
    const head = document.head;
    if (head) {
      let favicon = document.querySelector('link[rel="icon"]');
      if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        head.appendChild(favicon);
      }
      favicon.href = BRAND.icon;
      favicon.type = 'image/png';
    }

    document.querySelectorAll('.logo').forEach((logo) => {
      logo.setAttribute('aria-label', 'Stonex Roofing');
      logo.innerHTML = `
        <img class="logo-brand-mark" src="${BRAND.icon}" alt="Stonex icon" />
        <img class="logo-brand-word" src="${BRAND.logo}" alt="Stonex Group" />
      `;
    });
  }

  function initials(name) {
    const root = name.split(',')[0].trim();
    const parts = root.split(' ');
    const first = parts[0] && parts[0][0] ? parts[0][0] : 'S';
    const last = parts.length > 1 && parts[parts.length - 1][0] ? parts[parts.length - 1][0] : 'R';
    return `${first}${last}`.toUpperCase();
  }

  function setupHeader() {
    const header = document.getElementById('siteHeader');
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('siteNav');
    if (!header) return;

    const sync = () => {
      header.classList.toggle('scrolled', window.scrollY > 24);
    };
    sync();
    window.addEventListener('scroll', sync, { passive: true });

    if (menuToggle && nav) {
      menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
      nav.querySelectorAll('a').forEach((a) =>
        a.addEventListener('click', () => {
          nav.classList.remove('open');
        })
      );
    }

    const page = document.body.dataset.page;
    if (page) {
      document.querySelectorAll('[data-nav]').forEach((a) => {
        if (a.getAttribute('data-nav') === page) a.classList.add('active');
      });
    }
  }

  function setupReveal() {
    const items = Array.from(document.querySelectorAll('.reveal'));
    if (!items.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('visible'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    items.forEach((el, idx) => {
      el.style.transitionDelay = `${Math.min(idx * 30, 220)}ms`;
      io.observe(el);
    });
  }

  function setupMagnetic() {
    if (prefersReducedMotion) return;
    document.querySelectorAll('.magnetic').forEach((el) => {
      const reset = () => {
        el.style.transform = '';
      };
      el.addEventListener('mousemove', (event) => {
        const rect = el.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * 0.12;
        const y = (event.clientY - rect.top - rect.height / 2) * 0.12;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
      el.addEventListener('mouseleave', reset);
      el.addEventListener('blur', reset);
    });
  }

  function setupSpotlight() {
    if (prefersReducedMotion) return;
    if (window.matchMedia('(max-width: 860px)').matches) return;

    window.addEventListener(
      'mousemove',
      (event) => {
        document.documentElement.style.setProperty('--mx', `${event.clientX}px`);
        document.documentElement.style.setProperty('--my', `${event.clientY}px`);
      },
      { passive: true }
    );
  }

  function setupServices() {
    const buttonWrap = document.getElementById('serviceButtons');
    const image = document.getElementById('servicePreviewImage');
    const title = document.getElementById('servicePreviewTitle');
    const text = document.getElementById('servicePreviewText');
    const bullets = document.getElementById('servicePreviewBullets');
    const link = document.getElementById('servicePreviewLink');
    if (!buttonWrap || !image || !title || !text || !bullets || !link) return;

    let activeKey = SERVICES[0].key;

    const renderPreview = () => {
      const item = SERVICES.find((s) => s.key === activeKey) || SERVICES[0];
      image.style.opacity = '0.5';
      setTimeout(() => {
        image.src = item.image;
        image.alt = item.title;
        image.style.opacity = '1';
      }, 90);
      title.textContent = item.title;
      text.textContent = item.text;
      link.href = item.page;
      bullets.innerHTML = '';
      item.bullets.forEach((b) => {
        const li = document.createElement('li');
        li.textContent = b;
        bullets.appendChild(li);
      });
    };

    SERVICES.forEach((service) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `service-btn ${service.key === activeKey ? 'active' : ''}`;
      btn.textContent = service.title;
      const activate = () => {
        activeKey = service.key;
        buttonWrap.querySelectorAll('.service-btn').forEach((n) => n.classList.remove('active'));
        btn.classList.add('active');
        renderPreview();
      };
      btn.addEventListener('mouseenter', activate);
      btn.addEventListener('focus', activate);
      btn.addEventListener('click', activate);
      buttonWrap.appendChild(btn);
    });

    renderPreview();
  }

  function setupWork() {
    const grid = document.getElementById('workGrid');
    const modal = document.getElementById('workModal');
    const closeBtn = document.getElementById('workModalClose');
    const backdrop = document.getElementById('workModalBackdrop');
    const modalImage = document.getElementById('workModalImage');
    const modalTitle = document.getElementById('workModalTitle');

    if (!grid || !modal || !closeBtn || !backdrop || !modalImage || !modalTitle) return;

    WORK.forEach((item) => {
      const card = document.createElement('button');
      card.className = `work-item ${item.className}`;
      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}" loading="lazy" />
        <div class="work-meta"><span>${item.title}</span><b>View</b></div>
      `;
      card.addEventListener('click', () => {
        modalImage.src = item.image;
        modalImage.alt = item.title;
        modalTitle.textContent = item.title;
        modal.classList.remove('hidden');
      });
      grid.appendChild(card);
    });

    const close = () => modal.classList.add('hidden');
    closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', close);
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  }

  function setupStory() {
    const section = document.getElementById('storySection');
    const stepsWrap = document.getElementById('storySteps');
    const progress = document.getElementById('storyProgress');
    const image = document.getElementById('storyImage');
    const label = document.getElementById('storyLabel');
    if (!section || !stepsWrap || !progress || !image || !label) return;

    let active = 0;

    STORY.forEach((item, idx) => {
      const el = document.createElement('article');
      el.className = `story-step${idx === active ? ' active' : ''}`;
      el.innerHTML = `<strong>${item.title}</strong><p>${item.text}</p>`;
      stepsWrap.appendChild(el);
    });

    const stepEls = Array.from(stepsWrap.children);

    const apply = (idx) => {
      const clamped = Math.max(0, Math.min(STORY.length - 1, idx));
      if (active === clamped) return;
      active = clamped;
      stepEls.forEach((el, i) => el.classList.toggle('active', i === active));
      image.style.opacity = '0.5';
      setTimeout(() => {
        image.src = STORY[active].image;
        label.textContent = STORY[active].title;
        image.style.opacity = '1';
      }, 70);
    };

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = rect.height - vh;
      if (total <= 0) return;
      const raw = (-rect.top / total) * 100;
      const pct = Math.max(0, Math.min(100, raw));
      progress.style.width = `${pct}%`;
      apply(Math.round((pct / 100) * (STORY.length - 1)));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
  }

  function setupStandard() {
    const wrap = document.getElementById('standardGrid');
    if (!wrap) return;
    STANDARDS.forEach((text, i) => {
      const article = document.createElement('article');
      article.className = 'card standard-item card-hover reveal';
      article.innerHTML = `
        <span class="standard-num">${String(i + 1).padStart(2, '0')}</span>
        <p>${text}</p>
      `;
      wrap.appendChild(article);
    });
  }

  function setupReviews() {
    const track = document.getElementById('reviewsTrack');
    if (!track) return;

    REVIEWS.forEach((item) => {
      const card = document.createElement('article');
      card.className = 'review-card card-hover';
      card.innerHTML = `
        <div class="review-head">
          <span class="avatar">${initials(item.author)}</span>
          <strong>${item.author}</strong>
        </div>
        <p>“${item.quote}”</p>
      `;
      track.appendChild(card);
    });

    let paused = false;
    let dragging = false;
    let startX = 0;
    let scrollStart = 0;

    track.addEventListener('mouseenter', () => (paused = true));
    track.addEventListener('mouseleave', () => {
      paused = false;
      dragging = false;
    });

    track.addEventListener('pointerdown', (e) => {
      dragging = true;
      startX = e.clientX;
      scrollStart = track.scrollLeft;
      track.style.cursor = 'grabbing';
    });

    window.addEventListener('pointerup', () => {
      dragging = false;
      track.style.cursor = 'grab';
    });

    track.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      track.scrollLeft = scrollStart - (e.clientX - startX) * 1.2;
    });

    if (!prefersReducedMotion) {
      setInterval(() => {
        if (paused || dragging) return;
        const first = track.querySelector('.review-card');
        const cardW = first ? first.getBoundingClientRect().width + 12 : 340;
        const max = track.scrollWidth - track.clientWidth;
        const next = track.scrollLeft + cardW;
        track.scrollTo({ left: next >= max - 10 ? 0 : next, behavior: 'smooth' });
      }, 2800);
    }
  }

  function setupAreas() {
    const chips = document.getElementById('regionChips');
    const cities = document.getElementById('citiesGrid');
    if (!chips || !cities) return;

    let activeRegion = Object.keys(REGION_CITIES)[0];

    const renderCities = () => {
      cities.innerHTML = '';
      (REGION_CITIES[activeRegion] || []).forEach((city) => {
        const a = document.createElement('a');
        a.href = city.href;
        a.textContent = city.name;
        cities.appendChild(a);
      });
    };

    Object.keys(REGION_CITIES).forEach((region) => {
      const btn = document.createElement('button');
      btn.className = `region-chip${region === activeRegion ? ' active' : ''}`;
      btn.textContent = region;
      btn.addEventListener('click', () => {
        activeRegion = region;
        chips.querySelectorAll('.region-chip').forEach((n) => n.classList.remove('active'));
        btn.classList.add('active');
        renderCities();
      });
      chips.appendChild(btn);
    });

    renderCities();
  }

  function setupForm() {
    const form = document.getElementById('inspectionForm');
    const step1 = document.getElementById('formStep1');
    const step2 = document.getElementById('formStep2');
    const badge = document.getElementById('stepBadge');
    const progress = document.getElementById('stepProgressFill');
    const back = document.getElementById('backBtn');
    const next = document.getElementById('nextBtn');
    const success = document.getElementById('formSuccess');
    const resetBtn = document.getElementById('resetFormBtn');
    const status = document.getElementById('formStatus');
    const successText = success ? success.querySelector('p') : null;
    if (!form || !step1 || !step2 || !badge || !progress || !back || !next || !success || !resetBtn) return;

    let currentStep = 1;

    const sync = () => {
      const step2Mode = currentStep === 2;
      step1.classList.toggle('hidden', step2Mode);
      step2.classList.toggle('hidden', !step2Mode);
      back.classList.toggle('hidden', !step2Mode);
      badge.textContent = `Step ${currentStep} of 2`;
      progress.style.width = step2Mode ? '100%' : '50%';
      next.textContent = step2Mode ? 'Submit Request' : 'Continue';
    };

    const validateStep1 = () => {
      const required = Array.from(step1.querySelectorAll('[required]'));
      let ok = true;
      required.forEach((field) => {
        if (!field.value.trim()) {
          field.style.borderColor = 'rgba(251,113,133,.8)';
          ok = false;
        } else {
          field.style.borderColor = '';
        }
      });
      const email = step1.querySelector('input[name="email"]');
      if (email && email.value && !email.value.includes('@')) {
        email.style.borderColor = 'rgba(251,113,133,.8)';
        ok = false;
      }
      return ok;
    };

    back.addEventListener('click', () => {
      currentStep = 1;
      sync();
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (currentStep === 1) {
        if (!validateStep1()) return;
        currentStep = 2;
        sync();
        return;
      }
      if (status) {
        status.textContent = '';
        status.classList.add('hidden');
        status.classList.remove('error');
      }
      next.disabled = true;
      next.textContent = 'Sending...';

      const endpoint = (form.getAttribute('action') || '').trim();
      if (!endpoint) {
        form.classList.add('hidden');
        success.classList.remove('hidden');
        if (successText) {
          successText.textContent = 'Your request has been received. If you do not receive a reply, please call +1-604-366-6140.';
        }
        next.disabled = false;
        sync();
        return;
      }

      const formData = new FormData(form);
      fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      })
        .then((response) => {
          if (!response.ok) throw new Error('Request failed');
          form.classList.add('hidden');
          success.classList.remove('hidden');
          if (successText) {
            successText.textContent = 'Your request has been submitted to stonnexbc@gmail.com. A coordinator will follow up shortly.';
          }
        })
        .catch(() => {
          if (!status) return;
          status.textContent =
            'We could not send this form right now. Please call +1-604-366-6140 or email stonnexbc@gmail.com.';
          status.classList.remove('hidden');
          status.classList.add('error');
        })
        .finally(() => {
          next.disabled = false;
          sync();
        });
    });

    resetBtn.addEventListener('click', () => {
      form.reset();
      form.classList.remove('hidden');
      success.classList.add('hidden');
      if (status) {
        status.textContent = '';
        status.classList.add('hidden');
        status.classList.remove('error');
      }
      currentStep = 1;
      sync();
    });

    sync();
  }

  setupBrand();
  setupHeader();
  setupStandard();
  setupServices();
  setupWork();
  setupStory();
  setupReviews();
  setupAreas();
  setupForm();
  setupReveal();
  setupMagnetic();
  setupSpotlight();
  setupFaq();
})();

function setupFaq() {
  document.querySelectorAll('.faq-item').forEach((item) => {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      item.parentElement?.querySelectorAll('.faq-item').forEach((n) => n.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}
