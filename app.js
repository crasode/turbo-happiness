import React, { useEffect, useMemo, useRef, useState } from 'https://esm.sh/react@18.2.0';
import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client';
import {
  HashRouter,
  NavLink,
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams
} from 'https://esm.sh/react-router-dom@6.30.1';
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from 'https://esm.sh/framer-motion@11.11.17?deps=react@18.2.0,react-dom@18.2.0';
import htm from 'https://esm.sh/htm@3.1.1';

const html = htm.bind(React.createElement);

const EASE = [0.22, 1, 0.36, 1];

const NAV = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Service Areas', to: '/service-areas' },
  { label: 'About', to: '/about' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'Contact', to: '/contact' }
];

const SERVICES = [
  {
    slug: 'roof-replacement',
    name: 'Roof Replacement',
    short: 'Full-system replacement with clean sequencing and precision installation.',
    bullets: ['Full tear-off and substrate check', 'Ventilation strategy aligned to roof geometry', 'Flashing and detail package for weather resilience'],
    image: 'assets/media/work/home-estate.jpg',
    detailImage: 'assets/media/detail/install-detail.jpg',
    whenNeed: ['Recurring leaks and patch fatigue', 'Aged materials nearing end of service life', 'Ventilation or drainage concerns in storms'],
    approach: [
      'Detailed inspection and risk scan',
      'System design, scope alignment, and scheduling',
      'Controlled installation and closeout walkthrough'
    ],
    faqs: [
      {
        q: 'How do we plan disruption during replacement?',
        a: 'We sequence access, material delivery, and cleanup in a defined daily rhythm to keep your property organized.'
      },
      {
        q: 'Can we review material options before finalizing?',
        a: 'Yes. We present clear options and explain style, performance, and maintenance considerations.'
      },
      {
        q: 'Do you provide written scope details?',
        a: 'Yes. Scope and deliverables are documented so decisions stay clear throughout the project.'
      }
    ]
  },
  {
    slug: 'cedar-conversion',
    name: 'Cedar to Asphalt Conversion',
    short: 'Architecturally respectful conversions focused on durability and clean finish lines.',
    bullets: ['Cedar removal and deck assessment', 'Moisture and airflow detail updates', 'Premium laminated shingle install'],
    image: 'assets/media/work/cedar-after.jpg',
    detailImage: 'assets/media/detail/roof-nailer.jpg',
    whenNeed: ['Cedar maintenance burden rising', 'Desire for modern material longevity', 'Need for cleaner weather performance'],
    approach: [
      'Existing roof condition mapping',
      'System specification and transition detailing',
      'Installation with aesthetic continuity review'
    ],
    faqs: [
      {
        q: 'Will the home character be preserved?',
        a: 'Yes. We match profile, tone direction, and edge detailing to maintain architectural intent.'
      },
      {
        q: 'Is ventilation addressed in a conversion?',
        a: 'Ventilation is reviewed as part of the conversion plan to support long-term roof health.'
      },
      {
        q: 'Can conversion be staged?',
        a: 'Staging is available depending on roof configuration and site constraints.'
      }
    ]
  },
  {
    slug: 'emergency-leak-repair',
    name: 'Emergency Leak Repair',
    short: 'Rapid response stabilization with clear next-step planning and long-term correction paths.',
    bullets: ['Immediate leak-source isolation', 'Weatherproof temporary containment if needed', 'Permanent repair scope options'],
    image: 'assets/media/work/crew-main.jpg',
    detailImage: 'assets/media/detail/install-close.jpg',
    whenNeed: ['Active interior leak events', 'Storm-related uplift or penetration failures', 'Urgent moisture-entry protection'],
    approach: ['Rapid assessment and protection', 'Targeted root-cause repair plan', 'Follow-up verification walkthrough'],
    faqs: [
      {
        q: 'What happens first during a leak call?',
        a: 'Priority is containment, safety, and source identification to prevent further interior damage.'
      },
      {
        q: 'Do you provide permanent repair options after stabilization?',
        a: 'Yes. We provide practical correction options after immediate stabilization is complete.'
      },
      {
        q: 'Will we receive documentation?',
        a: 'Yes. Findings and recommendations are summarized so next decisions are straightforward.'
      }
    ]
  },
  {
    slug: 'metal-roofing',
    name: 'Metal Roofing',
    short: 'Design-forward standing seam and architectural systems with precision detailing.',
    bullets: ['Standing seam and architectural profiles', 'High-detail flashing execution', 'Durable finish strategies for coastal climate'],
    image: 'assets/media/work/home-westvan.jpg',
    detailImage: 'assets/media/detail/roof-crew.jpg',
    whenNeed: ['Architectural upgrade priorities', 'Long-term material performance goals', 'Homes requiring refined modern profile'],
    approach: ['Design and profile selection', 'Detail engineering and staging plan', 'Precision install and finish inspection'],
    faqs: [
      {
        q: 'Is metal suitable for residential homes?',
        a: 'Yes. Properly designed residential metal systems can align with both modern and classic architecture.'
      },
      {
        q: 'How is edge detail quality maintained?',
        a: 'Edge and transition details are reviewed throughout installation to maintain consistency.'
      },
      {
        q: 'Can we compare profile options visually?',
        a: 'Yes. We present profile and finish directions before installation begins.'
      }
    ]
  },
  {
    slug: 'flat-roofing',
    name: 'Flat Roofing',
    short: 'Low-slope systems focused on drainage logic, membrane integrity, and detail reliability.',
    bullets: ['Slope and drainage pathway assessment', 'Membrane strategy with seam discipline', 'Penetration and perimeter detail control'],
    image: 'assets/media/work/flat-after.jpg',
    detailImage: 'assets/media/detail/install-detail.jpg',
    whenNeed: ['Ponding or chronic moisture retention', 'Membrane aging and seam concerns', 'Retrofit for rooftop additions'],
    approach: ['Drainage diagnostics and scope mapping', 'Membrane and detail package selection', 'Quality-controlled installation sequence'],
    faqs: [
      {
        q: 'How do you address standing water?',
        a: 'We review slope, outlets, and transitions to improve drainage behavior and reduce risk points.'
      },
      {
        q: 'Are flat systems suitable for residential properties?',
        a: 'Yes. Flat systems can perform well when detailing and drainage are treated as primary priorities.'
      },
      {
        q: 'Can maintenance planning be included?',
        a: 'Yes. We can include inspection and upkeep guidance as part of your final package.'
      }
    ]
  }
];

const STORY_STEPS = [
  {
    id: 'rain',
    title: 'Rain Load',
    copy: 'Layering and water management details are configured for sustained wet-season performance.',
    image: 'assets/media/detail/install-close.jpg'
  },
  {
    id: 'moss',
    title: 'Moss Pressure',
    copy: 'Surface strategy and maintenance planning are considered early to reduce long-term moisture retention.',
    image: 'assets/media/work/cedar-before.jpg'
  },
  {
    id: 'ventilation',
    title: 'Ventilation',
    copy: 'Airflow pathways are treated as a core part of roof system health, not an afterthought.',
    image: 'assets/media/detail/roof-nailer.jpg'
  },
  {
    id: 'flashing',
    title: 'Flashing Precision',
    copy: 'Transitions, penetrations, and edges receive high-detail attention to reduce failure points.',
    image: 'assets/media/work/home-after.jpg'
  }
];

const STANDARD_CARDS = [
  'Scope clarity before work begins',
  'Disciplined staging and site protection',
  'Detail-first installation sequencing',
  'Transparent communication checkpoints',
  'Structured final walkthrough process',
  'Clean documentation handoff'
];

const WORK_ITEMS = [
  {
    id: 'w1',
    label: 'Hillside Residence',
    image: 'assets/media/work/home-estate.jpg',
    span: 'md:col-span-5 md:row-span-2'
  },
  {
    id: 'w2',
    label: 'North Shore Exterior',
    image: 'assets/media/work/home-westvan.jpg',
    span: 'md:col-span-3'
  },
  {
    id: 'w3',
    label: 'Detail Installation',
    image: 'assets/media/detail/install-detail.jpg',
    span: 'md:col-span-4'
  },
  {
    id: 'w4',
    label: 'Conversion Result',
    image: 'assets/media/work/cedar-after.jpg',
    span: 'md:col-span-4'
  },
  {
    id: 'w5',
    label: 'Flat Roof Upgrade',
    image: 'assets/media/work/flat-after.jpg',
    span: 'md:col-span-4'
  },
  {
    id: 'w6',
    label: 'Roofline Detail',
    image: 'assets/media/detail/roof-crew.jpg',
    span: 'md:col-span-4'
  }
];

const DEMO_REVIEWS = [
  {
    quote:
      'From inspection to cleanup, everything felt organized and clearly communicated. The final walkthrough was thorough.',
    author: 'Michael R., North Vancouver'
  },
  {
    quote:
      'The written scope was detailed and transparent. No surprises, just clear options and timelines.',
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
  'North Shore': ['North Vancouver', 'West Vancouver'],
  Vancouver: ['Kitsilano', 'Point Grey', 'Dunbar', 'South Vancouver'],
  Burnaby: ['Burnaby Heights', 'Brentwood', 'South Slope'],
  'Tri-Cities': ['Coquitlam', 'Port Coquitlam', 'Port Moody'],
  Richmond: ['Steveston', 'Broadmoor', 'Sea Island'],
  Surrey: ['South Surrey', 'Cloverdale', 'Fleetwood'],
  Langley: ['Willoughby', 'Walnut Grove', 'Fort Langley']
};

const CITY_SLUGS = {
  'North Vancouver': 'north-vancouver',
  'West Vancouver': 'west-vancouver',
  Kitsilano: 'kitsilano',
  'Point Grey': 'point-grey',
  Dunbar: 'dunbar',
  'South Vancouver': 'south-vancouver',
  'Burnaby Heights': 'burnaby-heights',
  Brentwood: 'brentwood',
  'South Slope': 'south-slope',
  Coquitlam: 'coquitlam',
  'Port Coquitlam': 'port-coquitlam',
  'Port Moody': 'port-moody',
  Steveston: 'steveston',
  Broadmoor: 'broadmoor',
  'Sea Island': 'sea-island',
  'South Surrey': 'south-surrey',
  Cloverdale: 'cloverdale',
  Fleetwood: 'fleetwood',
  Willoughby: 'willoughby',
  'Walnut Grove': 'walnut-grove',
  'Fort Langley': 'fort-langley'
};

function initialsFromAuthor(author) {
  const clean = author.split(',')[0].trim();
  const parts = clean.split(' ');
  if (!parts.length) return 'SR';
  return `${parts[0][0] || ''}${parts[parts.length - 1][0] || ''}`.toUpperCase();
}

function Reveal({ children, className = '', delay = 0, amount = 0.2 }) {
  const reduced = useReducedMotion();
  if (reduced) return html`<div className=${className}>${children}</div>`;
  return html`
    <${motion.div}
      className=${className}
      initial=${{ opacity: 0, y: 26, filter: 'blur(10px)' }}
      whileInView=${{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport=${{ once: true, amount }}
      transition=${{ duration: 0.64, ease: EASE, delay }}
    >
      ${children}
    </${motion.div}>
  `;
}

function MagneticButton({ as = 'a', className = '', children, href, onClick, type = 'button' }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (event) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.16;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.16;
    setOffset({ x, y });
  };

  const handleLeave = () => setOffset({ x: 0, y: 0 });

  const commonProps = {
    ref,
    className,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    style: reduced ? {} : { x: offset.x, y: offset.y },
    transition: { type: 'spring', stiffness: 260, damping: 18, mass: 0.2 }
  };

  if (as === 'button') {
    return html`
      <${motion.button} ...${commonProps} type=${type} onClick=${onClick}>
        ${children}
      </${motion.button}>
    `;
  }

  return html`
    <${motion.a} ...${commonProps} href=${href} onClick=${onClick}>
      ${children}
    </${motion.a}>
  `;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => {
    setCompact(v > 34);
  });

  return html`
    <${motion.header}
      className=${`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        compact ? 'py-2' : 'py-4'
      }`}
      animate=${{
        backgroundColor: compact ? 'rgba(9,14,22,.72)' : 'rgba(9,14,22,0)',
        borderColor: compact ? 'rgba(148,163,184,.2)' : 'rgba(148,163,184,0)'
      }}
    >
      <div
        className=${`mx-auto w-[min(1220px,92vw)] rounded-2xl border px-4 transition-all duration-300 md:px-6 ${
          compact ? 'glass shadow-soft' : 'border-transparent'
        }`}
      >
        <div className=${`flex items-center justify-between ${compact ? 'h-14' : 'h-16'}`}>
          <${Link} to="/" className="group flex items-center gap-3">
            <span
              className="grid h-9 w-9 place-content-center rounded-xl border border-slate-300/20 bg-slate-900/70 text-xs font-semibold text-blue-200"
            >
              SX
            </span>
            <div>
              <p className="text-sm font-semibold tracking-[0.18em] text-slate-300">STONNEX</p>
              <p className="text-xs text-slate-400">ROOFING DIVISION</p>
            </div>
          </${Link}>

          <nav className="hidden items-center gap-7 lg:flex">
            ${NAV.map(
              (item) => html`
                <${NavLink} to=${item.to} end=${item.to === '/'}>
                  ${(state) =>
                    html`<span
                      className="animated-underline text-sm font-medium text-slate-300 transition-colors hover:text-white"
                      data-active=${state.isActive ? 'true' : 'false'}
                    >
                      ${item.label}
                    </span>`}
                </${NavLink}>
              `
            )}
          </nav>

          <div className="flex items-center gap-3">
            <${MagneticButton}
              href="#/contact"
              className="btn-premium btn-glow hidden rounded-full border border-blue-300/40 bg-accent px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-glow md:inline-block"
            >
              Book Inspection
            </${MagneticButton}>
            <button
              onClick=${() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-400/25 bg-slate-900/60 text-slate-200 lg:hidden"
              aria-label="Toggle navigation"
            >
              <span className="text-xl">☰</span>
            </button>
          </div>
        </div>

        <${AnimatePresence}>
          ${open
            ? html`
                <${motion.div}
                  initial=${{ opacity: 0, y: -8 }}
                  animate=${{ opacity: 1, y: 0 }}
                  exit=${{ opacity: 0, y: -8 }}
                  transition=${{ duration: 0.24, ease: EASE }}
                  className="grid gap-2 border-t border-slate-500/20 py-3 lg:hidden"
                >
                  ${NAV.map(
                    (item) => html`
                      <${Link}
                        to=${item.to}
                        onClick=${() => setOpen(false)}
                        className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800/50 hover:text-white"
                        >${item.label}</${Link}
                      >
                    `
                  )}
                  <a
                    href="tel:+16043666140"
                    className="mt-1 rounded-lg border border-blue-300/30 bg-blue-900/25 px-3 py-2 text-sm font-semibold text-blue-100"
                  >
                    Call (604) 366-6140
                  </a>
                </${motion.div}>
              `
            : null}
        </${AnimatePresence}>
      </div>
    </${motion.header}>
  `;
}

function Footer() {
  return html`
    <footer className="border-t border-slate-700/40 bg-[#06090f] px-4 py-14 md:px-0">
      <div className="mx-auto grid w-[min(1220px,92vw)] gap-9 md:grid-cols-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Stonnex Roofing</p>
          <p className="mt-3 max-w-sm text-sm text-slate-400">
            Premium residential roofing systems designed for Pacific Northwest conditions.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Services</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-300">
            ${SERVICES.map((s) => html`<${Link} className="city-link" to=${`/services/${s.slug}`}>${s.name}</${Link}>`)}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Navigation</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-300">
            ${NAV.map((item) => html`<${Link} className="city-link" to=${item.to}>${item.label}</${Link}>`)}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Contact</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-300">
            <a className="city-link" href="tel:+16043666140">(604) 366-6140</a>
            <a className="city-link" href="mailto:info@stonnexgroup.com">info@stonnexgroup.com</a>
            <${Link} className="city-link" to="/contact">Book Inspection</${Link}>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 w-[min(1220px,92vw)] border-t border-slate-700/30 pt-4 text-xs text-slate-500">
        Demo build for presentation. Content modules are structured for quick replacement with live data and client assets.
      </div>
    </footer>
  `;
}

function useSpotlight() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (window.matchMedia('(max-width: 1023px)').matches) return;

    const handleMove = (event) => {
      document.documentElement.style.setProperty('--mx', `${event.clientX}px`);
      document.documentElement.style.setProperty('--my', `${event.clientY}px`);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [reduced]);
}

function HeroSection() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const mediaY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const trust = ['Licensed Operations', 'Fully Insured Workflows', 'Written Scope Clarity', 'Material Warranty Options'];

  return html`
    <section ref=${ref} className="relative min-h-[100svh] overflow-hidden pt-24 md:pt-28 spotlight-surface">
      <${motion.video}
        className="absolute inset-0 h-full w-full object-cover media-mask"
        style=${reduced ? {} : { y: mediaY }}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="assets/media/hero/hero-vancouver.jpg"
      >
        <source src="assets/media/hero/pnw-roofing-loop.mp4" type="video/mp4" />
      </${motion.video}>

      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-[#050910]/70 to-[#06090f]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(59,120,181,.35),transparent_45%)]"></div>

      <div className="relative mx-auto flex min-h-[84svh] w-[min(1220px,92vw)] items-center pb-20">
        <${motion.div} style=${reduced ? {} : { y: textY }} className="max-w-4xl">
          <${motion.p}
            initial=${reduced ? false : { opacity: 0, y: 12, filter: 'blur(8px)' }}
            animate=${{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition=${{ duration: 0.5, delay: 0.05, ease: EASE }}
            className="inline-flex rounded-full border border-blue-200/25 bg-slate-900/45 px-4 py-2 text-xs uppercase tracking-[0.22em] text-blue-100"
          >
            Pacific Northwest Specialists
          </${motion.p}>
          <${motion.h1}
            initial=${reduced ? false : { opacity: 0, y: 16, filter: 'blur(10px)' }}
            animate=${{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition=${{ duration: 0.7, delay: 0.12, ease: EASE }}
            className="mt-5 text-4xl font-semibold leading-[0.95] text-white sm:text-6xl lg:text-7xl"
          >
            Roofing Built for
            <span className="bg-gradient-to-r from-blue-100 via-white to-blue-300 bg-clip-text text-transparent">
              {' '}2030-Level Expectations
            </span>
          </${motion.h1}>
          <${motion.p}
            initial=${reduced ? false : { opacity: 0, y: 16, filter: 'blur(8px)' }}
            animate=${{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition=${{ duration: 0.65, delay: 0.22, ease: EASE }}
            className="mt-5 max-w-2xl text-base text-slate-200 sm:text-xl"
          >
            Premium residential roofing experiences designed for British Columbia climate conditions,
            with clear process, disciplined execution, and polished presentation quality.
          </${motion.p}>

          <${motion.div}
            initial=${reduced ? false : { opacity: 0, y: 14 }}
            animate=${{ opacity: 1, y: 0 }}
            transition=${{ duration: 0.5, delay: 0.3, ease: EASE }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <${MagneticButton}
              href="#/contact"
              className="btn-premium btn-glow rounded-full border border-blue-200/40 bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-glow"
            >
              Book Inspection
            </${MagneticButton}>
            <a
              className="btn-premium rounded-full border border-slate-300/35 bg-slate-900/40 px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-slate-100"
              href="tel:+16043666140"
            >
              Call (604) 366-6140
            </a>
          </${motion.div}>

          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            ${trust.map(
              (item, index) => html`
                <${motion.div}
                  initial=${reduced ? false : { opacity: 0, y: 10, filter: 'blur(8px)' }}
                  animate=${{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition=${{ duration: 0.45, delay: 0.36 + index * 0.06, ease: EASE }}
                  className="glass rounded-xl2 px-4 py-3 text-sm text-slate-100"
                >
                  <span className="mr-2 text-blue-300">•</span>${item}
                </${motion.div}>
              `
            )}
          </div>
        </${motion.div}>
      </div>
    </section>
  `;
}

function TrustPanels() {
  const items = [
    {
      title: 'Structured Scope',
      text: 'Clear options, sequencing, and expectations before site work begins.'
    },
    {
      title: 'Detail Discipline',
      text: 'High-attention execution around transitions, edges, and penetrations.'
    },
    {
      title: 'Communication Rhythm',
      text: 'Consistent updates and clean decision points during active work.'
    },
    {
      title: 'Polished Handover',
      text: 'Organized walkthrough and concise documentation at closeout.'
    }
  ];

  return html`
    <section className="px-4 py-16 md:px-0">
      <div className="mx-auto w-[min(1220px,92vw)]">
        <${Reveal}>
          <h2 className="text-3xl text-white sm:text-4xl">Trust, Designed Into Every Step</h2>
        </${Reveal}>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          ${items.map(
            (item, index) => html`
              <${Reveal} delay=${index * 0.05}>
                <article className="glass soft-outline card-hover h-full rounded-xl2 p-5">
                  <div className="mb-4 inline-grid h-9 w-9 place-content-center rounded-lg border border-blue-300/35 bg-blue-900/30 text-blue-200">
                    ✦
                  </div>
                  <h3 className="text-lg text-white">${item.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">${item.text}</p>
                </article>
              </${Reveal}>
            `
          )}
        </div>
      </div>
    </section>
  `;
}

function InteractiveServices() {
  const [activeSlug, setActiveSlug] = useState(SERVICES[0].slug);
  const active = SERVICES.find((s) => s.slug === activeSlug) || SERVICES[0];

  return html`
    <section className="spotlight-surface px-4 py-16 md:px-0">
      <div className="mx-auto grid w-[min(1220px,92vw)] gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <${Reveal} className="glass soft-outline rounded-[1.4rem] p-6 lg:p-8">
          <p className="text-xs uppercase tracking-[0.22em] text-blue-200">Services</p>
          <h2 className="mt-3 text-3xl text-white sm:text-4xl">Interactive Scope Explorer</h2>
          <p className="mt-3 text-sm text-slate-300">
            Select a service to preview project framing, detail focus, and next-step action.
          </p>
          <div className="mt-6 grid gap-3">
            ${SERVICES.map(
              (service) => html`
                <button
                  onMouseEnter=${() => setActiveSlug(service.slug)}
                  onFocus=${() => setActiveSlug(service.slug)}
                  onClick=${() => setActiveSlug(service.slug)}
                  className=${`card-hover rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                    activeSlug === service.slug
                      ? 'border-blue-300/50 bg-blue-900/28 text-blue-100'
                      : 'border-slate-600/45 bg-slate-900/35 text-slate-300 hover:border-blue-300/35'
                  }`}
                >
                  <p className="font-semibold">${service.name}</p>
                  <p className="mt-1 text-xs text-slate-400">${service.short}</p>
                </button>
              `
            )}
          </div>
        </${Reveal}>

        <${Reveal} className="glass soft-outline overflow-hidden rounded-[1.4rem]">
          <${AnimatePresence} mode="wait">
            <${motion.div}
              key=${active.slug}
              initial=${{ opacity: 0, y: 16, filter: 'blur(10px)' }}
              animate=${{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit=${{ opacity: 0, y: -10, filter: 'blur(8px)' }}
              transition=${{ duration: 0.45, ease: EASE }}
              className="relative"
            >
              <img
                src=${active.image}
                alt=${active.name}
                className="h-[280px] w-full object-cover md:h-[340px]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="text-2xl text-white md:text-3xl">${active.name}</h3>
                <p className="mt-2 max-w-2xl text-sm text-slate-200">${active.short}</p>
                <ul className="mt-4 grid gap-2 text-sm text-slate-100 md:grid-cols-2">
                  ${active.bullets.map(
                    (bullet) => html`<li className="rounded-lg border border-slate-300/20 bg-slate-900/45 px-3 py-2">${bullet}</li>`
                  )}
                </ul>
                <div className="mt-5 flex flex-wrap gap-3">
                  <${MagneticButton}
                    href=${`#/services/${active.slug}`}
                    className="btn-premium rounded-full border border-blue-300/40 bg-accent px-5 py-2 text-xs font-semibold uppercase tracking-[0.13em] text-white"
                  >
                    Open Service Page
                  </${MagneticButton}>
                  <${Link}
                    to="/contact"
                    className="btn-premium rounded-full border border-slate-200/35 bg-slate-900/45 px-5 py-2 text-xs font-semibold uppercase tracking-[0.13em] text-slate-100"
                  >
                    Discuss Scope
                  </${Link}>
                </div>
              </div>
            </${motion.div}>
          </${AnimatePresence}>
        </${Reveal}>
      </div>
    </section>
  `;
}

function FeaturedWork() {
  const [selected, setSelected] = useState(null);

  return html`
    <section className="px-4 py-16 md:px-0">
      <div className="mx-auto w-[min(1220px,92vw)]">
        <${Reveal}>
          <h2 className="text-3xl text-white sm:text-4xl">Featured Work</h2>
          <p className="mt-3 max-w-2xl text-sm text-slate-300">Visual references arranged in a premium asymmetric gallery.</p>
        </${Reveal}>

        <${LayoutGroup}>
          <div className="mt-8 grid auto-rows-[200px] gap-4 md:grid-cols-12 md:auto-rows-[180px]">
            ${WORK_ITEMS.map(
              (item, index) => html`
                <${motion.button}
                  key=${item.id}
                  layoutId=${`work-${item.id}`}
                  onClick=${() => setSelected(item)}
                  className=${`group relative overflow-hidden rounded-xl2 border border-slate-500/35 bg-slate-900/50 text-left card-hover ${item.span}`}
                  initial=${{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                  whileInView=${{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport=${{ once: true, amount: 0.2 }}
                  transition=${{ duration: 0.5, delay: index * 0.04, ease: EASE }}
                >
                  <img
                    src=${item.image}
                    alt=${item.label}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-90"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-white">${item.label}</p>
                      <span className="rounded-full border border-slate-300/30 bg-slate-900/40 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-blue-100">View</span>
                    </div>
                  </div>
                </${motion.button}>
              `
            )}
          </div>

          <p className="mt-4 text-xs uppercase tracking-[0.18em] text-slate-500">Images shown for illustrative purposes.</p>

          <${AnimatePresence}>
            ${selected
              ? html`
                  <${motion.div}
                    className="modal-backdrop fixed inset-0 z-[80] grid place-items-center bg-slate-950/70 px-4"
                    initial=${{ opacity: 0 }}
                    animate=${{ opacity: 1 }}
                    exit=${{ opacity: 0 }}
                    onClick=${() => setSelected(null)}
                  >
                    <${motion.div}
                      layoutId=${`work-${selected.id}`}
                      onClick=${(e) => e.stopPropagation()}
                      className="glass soft-outline w-full max-w-3xl overflow-hidden rounded-[1.35rem]"
                    >
                      <img src=${selected.image} alt=${selected.label} className="h-[320px] w-full object-cover" />
                      <div className="p-6 md:p-7">
                        <h3 className="text-2xl text-white">${selected.label}</h3>
                        <p className="mt-2 text-sm text-slate-300">What this illustrates</p>
                        <ul className="mt-3 grid gap-2 text-sm text-slate-100 md:grid-cols-2">
                          <li className="rounded-lg border border-slate-600/40 bg-slate-900/35 px-3 py-2">Material and profile direction</li>
                          <li className="rounded-lg border border-slate-600/40 bg-slate-900/35 px-3 py-2">Detail execution quality</li>
                          <li className="rounded-lg border border-slate-600/40 bg-slate-900/35 px-3 py-2">Finish consistency and alignment</li>
                          <li className="rounded-lg border border-slate-600/40 bg-slate-900/35 px-3 py-2">Overall presentation standard</li>
                        </ul>
                        <div className="mt-5 flex items-center gap-3">
                          <${Link}
                            to="/contact"
                            className="btn-premium rounded-full border border-blue-300/40 bg-accent px-5 py-2 text-xs font-semibold uppercase tracking-[0.13em] text-white"
                          >
                            Book Inspection
                          </${Link}>
                          <button
                            className="btn-premium rounded-full border border-slate-300/40 px-5 py-2 text-xs font-semibold uppercase tracking-[0.13em] text-slate-200"
                            onClick=${() => setSelected(null)}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </${motion.div}>
                  </${motion.div}>
                `
              : null}
          </${AnimatePresence}>
        </${LayoutGroup}>
      </div>
    </section>
  `;
}

function ScrollStory() {
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const springProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(springProgress, 'change', (value) => {
    const next = Math.min(STORY_STEPS.length - 1, Math.floor(value * STORY_STEPS.length));
    setActiveIndex(next);
  });

  return html`
    <section ref=${sectionRef} className="relative h-[310vh]">
      <div className="sticky top-20 h-[calc(100vh-5rem)] px-4 md:px-0">
        <div className="mx-auto grid h-full w-[min(1220px,92vw)] gap-6 py-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="glass soft-outline rounded-[1.35rem] p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-blue-200">Scroll Story</p>
            <h2 className="mt-3 text-3xl text-white">Built for the Pacific Northwest</h2>
            <p className="mt-2 text-sm text-slate-300">Scroll to move through the climate-response framework.</p>

            <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-slate-700/50">
              <${motion.div}
                className="story-progress h-full"
                style=${reduced ? { width: `${((activeIndex + 1) / STORY_STEPS.length) * 100}%` } : { scaleX: springProgress, transformOrigin: '0% 50%' }}
              />
            </div>

            <div className="mt-6 grid gap-3">
              ${STORY_STEPS.map(
                (step, index) => html`
                  <div
                    className=${`rounded-xl border px-4 py-3 transition ${
                      activeIndex === index
                        ? 'border-blue-300/45 bg-blue-900/30'
                        : 'border-slate-600/45 bg-slate-900/30'
                    }`}
                  >
                    <p className="text-sm font-semibold text-white">${step.title}</p>
                    <p className="mt-1 text-sm text-slate-300">${step.copy}</p>
                  </div>
                `
              )}
            </div>
          </div>

          <div className="glass soft-outline relative overflow-hidden rounded-[1.35rem]">
            <${AnimatePresence} mode="wait">
              <${motion.img}
                key=${STORY_STEPS[activeIndex].id}
                src=${STORY_STEPS[activeIndex].image}
                alt=${STORY_STEPS[activeIndex].title}
                className="h-full w-full object-cover"
                initial=${{ opacity: 0, scale: 1.03, filter: 'blur(8px)' }}
                animate=${{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit=${{ opacity: 0, scale: 0.99, filter: 'blur(8px)' }}
                transition=${{ duration: 0.45, ease: EASE }}
              />
            </${AnimatePresence}>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 to-transparent p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-blue-100">${activeIndex + 1} / ${STORY_STEPS.length}</p>
              <p className="mt-1 text-xl text-white">${STORY_STEPS[activeIndex].title}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function StonnexStandard() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 20%'] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 22 });

  return html`
    <section ref=${ref} className="px-4 py-16 md:px-0">
      <div className="mx-auto w-[min(1220px,92vw)]">
        <${Reveal}>
          <p className="text-xs uppercase tracking-[0.22em] text-blue-200">Process</p>
          <h2 className="mt-3 text-3xl text-white sm:text-4xl">The Stonnex Standard</h2>
        </${Reveal}>
        <div className="relative mt-8">
          <div className="absolute left-3 top-0 hidden h-full w-px bg-slate-700 md:block"></div>
          <${motion.div}
            className="absolute left-3 top-0 hidden w-px bg-gradient-to-b from-blue-300 to-blue-600 md:block"
            style=${reduced ? { height: '100%' } : { scaleY: lineScale, transformOrigin: '0% 0%' }}
          />

          <div className="grid gap-4 md:grid-cols-2">
            ${STANDARD_CARDS.map(
              (text, idx) => html`
                <${Reveal} delay=${idx * 0.04}>
                  <article className="glass soft-outline card-hover flex items-start gap-4 rounded-xl2 p-5">
                    <div className="grid h-9 w-9 place-content-center rounded-full border border-blue-300/40 bg-blue-900/30 text-xs font-semibold text-blue-100">
                      ${String(idx + 1).padStart(2, '0')}
                    </div>
                    <p className="text-sm text-slate-100">${text}</p>
                  </article>
                </${Reveal}>
              `
            )}
          </div>
        </div>
      </div>
    </section>
  `;
}

function ReviewsCarousel({ compact = false }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    const timer = setInterval(() => {
      if (paused) return;
      const card = el.querySelector('[data-review-card]');
      const cardWidth = card ? card.getBoundingClientRect().width + 16 : 340;
      const max = el.scrollWidth - el.clientWidth;
      const next = el.scrollLeft + cardWidth;
      el.scrollTo({ left: next >= max - 8 ? 0 : next, behavior: 'smooth' });
    }, 2800);

    return () => clearInterval(timer);
  }, [paused, reduced]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onPointerDown = (e) => {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      el.classList.add('cursor-grabbing');
    };

    const onPointerMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.25;
      el.scrollLeft = scrollLeft - walk;
    };

    const stop = () => {
      isDown = false;
      el.classList.remove('cursor-grabbing');
    };

    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', stop);

    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', stop);
    };
  }, []);

  return html`
    <div className=${compact ? '' : 'px-4 py-16 md:px-0'}>
      <div className=${compact ? '' : 'mx-auto w-[min(1220px,92vw)]'}>
        ${!compact
          ? html`
              <${Reveal}>
                <h2 className="text-3xl text-white sm:text-4xl">Client Experience Signals</h2>
                <p className="mt-3 text-sm text-slate-300">Demo review module designed for easy replacement with live reviews.</p>
              </${Reveal}>
            `
          : null}
        <div className="mt-7 rounded-[1.35rem] border border-slate-600/35 bg-slate-900/35 p-4">
          <div
            ref=${ref}
            className="hide-scrollbar review-snap flex cursor-grab gap-4 overflow-x-auto pb-2"
            onMouseEnter=${() => setPaused(true)}
            onMouseLeave=${() => setPaused(false)}
          >
            ${DEMO_REVIEWS.map((review, idx) => html`
              <article
                data-review-card
                key=${idx}
                className="card-hover glass soft-outline min-w-[300px] max-w-[300px] rounded-xl2 p-5 md:min-w-[360px] md:max-w-[360px]"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-content-center rounded-full border border-blue-300/45 bg-blue-900/30 text-xs font-semibold text-blue-100">
                    ${initialsFromAuthor(review.author)}
                  </div>
                  <p className="text-sm text-slate-200">${review.author}</p>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-100">“${review.quote}”</p>
              </article>
            `)}
          </div>
          <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-slate-500">
            Data source placeholder for later integration
          </p>
        </div>
      </div>
    </div>
  `;
}

function ServiceAreasModule({ compact = false }) {
  const [region, setRegion] = useState('North Shore');
  const cities = REGION_CITIES[region] || [];

  return html`
    <div className=${compact ? '' : 'px-4 py-16 md:px-0'}>
      <div className=${compact ? '' : 'mx-auto w-[min(1220px,92vw)]'}>
        ${!compact
          ? html`
              <${Reveal}>
                <h2 className="text-3xl text-white sm:text-4xl">Service Areas</h2>
                <p className="mt-3 text-sm text-slate-300">
                  Region-based navigation designed to keep homeowners focused on local relevance.
                </p>
              </${Reveal}>
            `
          : null}

        <div className="glass soft-outline mt-7 overflow-hidden rounded-[1.35rem]">
          <div className="relative h-56 md:h-72">
            <img src="assets/media/location/vancouver-aerial.jpg" alt="Lower Mainland" className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 to-slate-950/35"></div>
            <div className="absolute inset-0 p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-blue-100">Coverage Module</p>
              <p className="mt-2 max-w-md text-lg text-white md:text-2xl">Select a region to filter the nearby city pages.</p>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-wrap gap-2">
              ${Object.keys(REGION_CITIES).map(
                (item) => html`
                  <button
                    className=${`region-chip rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.13em] ${
                      item === region
                        ? 'border-blue-300/45 bg-blue-900/35 text-blue-100'
                        : 'border-slate-600/45 bg-slate-900/30 text-slate-300'
                    }`}
                    onClick=${() => setRegion(item)}
                  >
                    ${item}
                  </button>
                `
              )}
            </div>

            <${AnimatePresence} mode="wait">
              <${motion.div}
                key=${region}
                initial=${{ opacity: 0, y: 12, filter: 'blur(8px)' }}
                animate=${{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit=${{ opacity: 0, y: -8, filter: 'blur(8px)' }}
                transition=${{ duration: 0.34, ease: EASE }}
                className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
              >
                ${cities.map(
                  (city) => html`
                    <${Link}
                      className="card-hover rounded-xl border border-slate-600/40 bg-slate-900/35 px-4 py-3 text-sm text-slate-200"
                      to=${`/service-areas/${CITY_SLUGS[city] || city.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <p className="font-medium">${city}</p>
                      <p className="mt-1 text-xs text-slate-400">Open local service page</p>
                    </${Link}>
                  `
                )}
              </${motion.div}>
            </${AnimatePresence}>
          </div>
        </div>
      </div>
    </div>
  `;
}

function BookInspectionForm({ title = 'Book Inspection', compact = false }) {
  const [step, setStep] = useState(1);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    service: '',
    notes: '',
    file: null
  });

  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateStep1 = () => {
    const next = {};
    if (!data.name.trim()) next.name = 'Name is required';
    if (!data.phone.trim()) next.phone = 'Phone is required';
    if (!data.email.includes('@')) next.email = 'Valid email is required';
    if (!data.service.trim()) next.service = 'Select a service';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (event) => {
    event.preventDefault();
    if (step === 1) {
      if (!validateStep1()) return;
      setStep(2);
      return;
    }

    setSent(true);
  };

  return html`
    <section className=${compact ? '' : 'px-4 py-16 md:px-0'}>
      <div className=${compact ? '' : 'mx-auto w-[min(1220px,92vw)]'}>
        <div className="glass soft-outline rounded-[1.4rem] p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-blue-200">Conversion Experience</p>
              <h2 className="mt-2 text-3xl text-white">${title}</h2>
            </div>
            <p className="rounded-full border border-slate-500/40 bg-slate-900/35 px-4 py-1 text-xs uppercase tracking-[0.14em] text-slate-300">
              Step ${step} of 2
            </p>
          </div>

          <div className="mt-4 h-1 rounded-full bg-slate-700/45">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-300 transition-all duration-300"
              style=${{ width: step === 1 ? '50%' : '100%' }}
            ></div>
          </div>

          <${AnimatePresence} mode="wait">
            ${sent
              ? html`
                  <${motion.div}
                    key="sent"
                    initial=${{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                    animate=${{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    className="mt-6 rounded-xl border border-blue-300/40 bg-blue-900/25 p-6"
                  >
                    <p className="text-xl text-white">Request received</p>
                    <p className="mt-2 text-sm text-slate-200">
                      This demo submission flow is active. Connect this module to your production form endpoint when ready.
                    </p>
                    <button
                      onClick=${() => {
                        setSent(false);
                        setStep(1);
                        setData({
                          name: '',
                          phone: '',
                          email: '',
                          address: '',
                          service: '',
                          notes: '',
                          file: null
                        });
                      }}
                      className="btn-premium mt-4 rounded-full border border-slate-300/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-100"
                    >
                      Submit Another
                    </button>
                  </${motion.div}>
                `
              : html`
                  <${motion.form}
                    key=${`step-${step}`}
                    initial=${{ opacity: 0, y: 14, filter: 'blur(8px)' }}
                    animate=${{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit=${{ opacity: 0, y: -10, filter: 'blur(8px)' }}
                    transition=${{ duration: 0.3, ease: EASE }}
                    className="mt-6 grid gap-4"
                    onSubmit=${submit}
                  >
                    ${step === 1
                      ? html`
                          <div className="grid gap-4 md:grid-cols-2">
                            ${[
                              { key: 'name', label: 'Full Name', type: 'text' },
                              { key: 'phone', label: 'Phone', type: 'tel' },
                              { key: 'email', label: 'Email', type: 'email' },
                              { key: 'address', label: 'Address', type: 'text' }
                            ].map(
                              (f) => html`
                                <label className="grid gap-2 text-xs uppercase tracking-[0.14em] text-slate-400">
                                  ${f.label}
                                  <input
                                    type=${f.type}
                                    value=${data[f.key]}
                                    onInput=${(e) => handleChange(f.key, e.target.value)}
                                    className="rounded-xl border border-slate-600/45 bg-slate-900/40 px-3 py-3 text-sm text-slate-100 outline-none ring-blue-300/30 transition focus:ring"
                                  />
                                  ${errors[f.key]
                                    ? html`<span className="text-[11px] text-rose-300">${errors[f.key]}</span>`
                                    : null}
                                </label>
                              `
                            )}

                            <label className="grid gap-2 text-xs uppercase tracking-[0.14em] text-slate-400 md:col-span-2">
                              Service Interest
                              <select
                                value=${data.service}
                                onInput=${(e) => handleChange('service', e.target.value)}
                                className="rounded-xl border border-slate-600/45 bg-slate-900/40 px-3 py-3 text-sm text-slate-100 outline-none ring-blue-300/30 transition focus:ring"
                              >
                                <option value="">Select service</option>
                                ${SERVICES.map((service) => html`<option value=${service.name}>${service.name}</option>`)}
                              </select>
                              ${errors.service ? html`<span className="text-[11px] text-rose-300">${errors.service}</span>` : null}
                            </label>
                          </div>
                        `
                      : html`
                          <label className="grid gap-2 text-xs uppercase tracking-[0.14em] text-slate-400">
                            Project Notes
                            <textarea
                              value=${data.notes}
                              onInput=${(e) => handleChange('notes', e.target.value)}
                              className="min-h-[140px] rounded-xl border border-slate-600/45 bg-slate-900/40 px-3 py-3 text-sm text-slate-100 outline-none ring-blue-300/30 transition focus:ring"
                              placeholder="Tell us what you want to solve first."
                            ></textarea>
                          </label>
                          <label className="grid gap-2 text-xs uppercase tracking-[0.14em] text-slate-400">
                            Optional Photo / File
                            <input
                              type="file"
                              onInput=${(e) => handleChange('file', e.target.files?.[0] || null)}
                              className="rounded-xl border border-dashed border-slate-600/45 bg-slate-900/40 px-3 py-3 text-sm text-slate-100"
                            />
                          </label>
                        `}

                    <div className="mt-2 flex flex-wrap gap-3">
                      ${step === 2
                        ? html`
                            <button
                              type="button"
                              className="btn-premium rounded-full border border-slate-400/45 px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-200"
                              onClick=${() => setStep(1)}
                            >
                              Back
                            </button>
                          `
                        : null}
                      <${MagneticButton}
                        as="button"
                        type="submit"
                        className="btn-premium btn-glow rounded-full border border-blue-300/45 bg-accent px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white"
                      >
                        ${step === 1 ? 'Continue to Step 2' : 'Submit Request'}
                      </${MagneticButton}>
                    </div>
                  </${motion.form}>
                `}
          </${AnimatePresence}>
        </div>
      </div>
    </section>
  `;
}

function HomePage() {
  return html`
    <main>
      <${HeroSection} />
      <${TrustPanels} />
      <div className="section-divider"></div>
      <${InteractiveServices} />
      <div className="section-divider"></div>
      <${FeaturedWork} />
      <div className="section-divider"></div>
      <${ScrollStory} />
      <div className="section-divider"></div>
      <${StonnexStandard} />
      <div className="section-divider"></div>
      <${ReviewsCarousel} />
      <div className="section-divider"></div>
      <${ServiceAreasModule} />
      <div className="section-divider"></div>
      <${BookInspectionForm} title="Book Your Inspection" />
    </main>
  `;
}

function ServicesHubPage() {
  return html`
    <main className="pt-28">
      <section className="px-4 py-16 md:px-0">
        <div className="mx-auto w-[min(1220px,92vw)]">
          <${Reveal}>
            <p className="text-xs uppercase tracking-[0.22em] text-blue-200">Services Hub</p>
            <h1 className="mt-3 text-4xl text-white sm:text-5xl">Premium Roofing Service Paths</h1>
            <p className="mt-4 max-w-2xl text-sm text-slate-300">
              Select the service path that matches your immediate priority and project direction.
            </p>
          </${Reveal}>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            ${SERVICES.map(
              (service, i) => html`
                <${Reveal} delay=${i * 0.04}>
                  <${Link}
                    to=${`/services/${service.slug}`}
                    className="glass soft-outline card-hover block overflow-hidden rounded-xl2"
                  >
                    <img src=${service.image} alt=${service.name} className="h-48 w-full object-cover" loading="lazy" />
                    <div className="p-5">
                      <h3 className="text-xl text-white">${service.name}</h3>
                      <p className="mt-2 text-sm text-slate-300">${service.short}</p>
                      <p className="mt-4 text-xs uppercase tracking-[0.14em] text-blue-100">Open Service Page →</p>
                    </div>
                  </${Link}>
                </${Reveal}>
              `
            )}
          </div>
        </div>
      </section>
      <${BookInspectionForm} title="Need Help Choosing the Right Service?" />
    </main>
  `;
}

function FAQAccordion({ items }) {
  const [open, setOpen] = useState(0);
  return html`
    <div className="grid gap-3">
      ${items.map(
        (item, idx) => html`
          <div className="rounded-xl border border-slate-600/45 bg-slate-900/35">
            <button
              className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-slate-100"
              onClick=${() => setOpen(open === idx ? -1 : idx)}
            >
              ${item.q}
              <span className="text-blue-200">${open === idx ? '−' : '+'}</span>
            </button>
            <${AnimatePresence} initial=${false}>
              ${open === idx
                ? html`
                    <${motion.div}
                      key=${idx}
                      initial=${{ height: 0, opacity: 0 }}
                      animate=${{ height: 'auto', opacity: 1 }}
                      exit=${{ height: 0, opacity: 0 }}
                      transition=${{ duration: 0.25, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-4 text-sm text-slate-300">${item.a}</p>
                    </${motion.div}>
                  `
                : null}
            </${AnimatePresence}>
          </div>
        `
      )}
    </div>
  `;
}

function ServicePage() {
  const { serviceSlug } = useParams();
  const service = SERVICES.find((s) => s.slug === serviceSlug) || SERVICES[0];
  const reduced = useReducedMotion();
  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start 80%', 'end 20%'] });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 22 });

  return html`
    <main className="pt-24">
      <section className="px-4 pb-8 pt-10 md:px-0">
        <div className="mx-auto grid w-[min(1220px,92vw)] gap-6 lg:grid-cols-[1.03fr_.97fr]">
          <div className="glass soft-outline rounded-[1.35rem] p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-blue-200">Service Page</p>
            <h1 className="mt-3 text-4xl text-white sm:text-5xl">${service.name}</h1>
            <p className="mt-4 max-w-2xl text-sm text-slate-300">${service.short}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <${Link}
                to="/contact"
                className="btn-premium rounded-full border border-blue-300/45 bg-accent px-5 py-2 text-xs font-semibold uppercase tracking-[0.13em] text-white"
              >
                Book Inspection
              </${Link}>
              <a
                href="tel:+16043666140"
                className="btn-premium rounded-full border border-slate-300/35 bg-slate-900/35 px-5 py-2 text-xs font-semibold uppercase tracking-[0.13em] text-slate-200"
              >
                Call
              </a>
            </div>
          </div>
          <img src=${service.image} alt=${service.name} className="glass soft-outline h-full min-h-[300px] rounded-[1.35rem] object-cover" />
        </div>
      </section>

      <section className="px-4 py-8 md:px-0">
        <div className="mx-auto grid w-[min(1220px,92vw)] gap-6 lg:grid-cols-2">
          <div className="glass soft-outline rounded-xl2 p-6">
            <h2 className="text-2xl text-white">When You Need This</h2>
            <ul className="mt-4 grid gap-2 text-sm text-slate-200">
              ${service.whenNeed.map((item) => html`<li className="rounded-lg border border-slate-600/40 bg-slate-900/35 px-3 py-2">${item}</li>`)}
            </ul>
          </div>
          <div className="glass soft-outline rounded-xl2 p-6">
            <h2 className="text-2xl text-white">Our Approach Timeline</h2>
            <div ref=${trackRef} className="relative mt-5 space-y-4 pl-6">
              <div className="absolute left-[9px] top-1 h-[calc(100%-8px)] w-px bg-slate-700"></div>
              <${motion.div}
                className="absolute left-[9px] top-1 w-px bg-gradient-to-b from-blue-200 to-blue-500"
                style=${reduced ? { height: 'calc(100% - 8px)' } : { scaleY: lineProgress, transformOrigin: '0% 0%' }}
              />
              ${service.approach.map(
                (step, idx) => html`
                  <div className="relative rounded-lg border border-slate-600/40 bg-slate-900/35 px-3 py-3 text-sm text-slate-200">
                    <span className="absolute -left-[22px] top-4 grid h-4 w-4 place-content-center rounded-full border border-blue-300/40 bg-blue-900/35 text-[9px] text-blue-100">${idx + 1}</span>
                    ${step}
                  </div>
                `
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 md:px-0">
        <div className="mx-auto grid w-[min(1220px,92vw)] gap-6 lg:grid-cols-[1fr_.9fr]">
          <div className="glass soft-outline rounded-xl2 p-6">
            <h2 className="text-2xl text-white">FAQ</h2>
            <div className="mt-4"><${FAQAccordion} items=${service.faqs} /></div>
          </div>
          <div className="glass soft-outline overflow-hidden rounded-xl2">
            <img src=${service.detailImage} alt="Detail" className="h-56 w-full object-cover" loading="lazy" />
            <div className="p-5">
              <p className="text-sm text-slate-300">Need a tailored recommendation for your property?</p>
              <${Link}
                to="/contact"
                className="btn-premium mt-4 inline-block rounded-full border border-blue-300/45 bg-accent px-5 py-2 text-xs font-semibold uppercase tracking-[0.13em] text-white"
              >
                Book Inspection
              </${Link}>
            </div>
          </div>
        </div>
      </section>
    </main>
  `;
}

function ServiceAreasHubPage() {
  return html`
    <main className="pt-28">
      <section className="px-4 py-16 md:px-0">
        <div className="mx-auto w-[min(1220px,92vw)]">
          <${Reveal}>
            <p className="text-xs uppercase tracking-[0.22em] text-blue-200">Service Areas Hub</p>
            <h1 className="mt-3 text-4xl text-white sm:text-5xl">Find Your Local Service Area Page</h1>
          </${Reveal}>
        </div>
      </section>
      <${ServiceAreasModule} compact=${true} />
      <${BookInspectionForm} title="Request a Local Scope Review" />
    </main>
  `;
}

function ServiceAreaCityPage() {
  const { citySlug } = useParams();
  const city = useMemo(() => {
    const found = Object.entries(CITY_SLUGS).find(([, slug]) => slug === citySlug);
    return found ? found[0] : citySlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }, [citySlug]);

  return html`
    <main className="pt-24">
      <section className="px-4 py-10 md:px-0">
        <div className="mx-auto grid w-[min(1220px,92vw)] gap-6 lg:grid-cols-[1.05fr_.95fr]">
          <div className="glass soft-outline rounded-[1.35rem] p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-blue-200">Service Area</p>
            <h1 className="mt-3 text-4xl text-white sm:text-5xl">Roofing in ${city}</h1>
            <p className="mt-4 text-sm text-slate-300">
              Local page template for city-level messaging, route relevance, and conversion-focused content.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <${Link}
                to="/contact"
                className="btn-premium rounded-full border border-blue-300/45 bg-accent px-5 py-2 text-xs font-semibold uppercase tracking-[0.13em] text-white"
              >
                Book Inspection
              </${Link}>
              <${Link}
                to="/service-areas"
                className="btn-premium rounded-full border border-slate-300/35 bg-slate-900/35 px-5 py-2 text-xs font-semibold uppercase tracking-[0.13em] text-slate-200"
              >
                Back to Areas
              </${Link}>
            </div>
          </div>
          <img src="assets/media/location/aerial-northshore.jpg" alt="Location" className="glass soft-outline h-full min-h-[280px] rounded-[1.35rem] object-cover" />
        </div>
      </section>

      <section className="px-4 py-8 md:px-0">
        <div className="mx-auto grid w-[min(1220px,92vw)] gap-4 md:grid-cols-3">
          <article className="glass soft-outline rounded-xl2 p-5 text-sm text-slate-200">Climate-aware detailing for rain, wind, and seasonal moisture shifts.</article>
          <article className="glass soft-outline rounded-xl2 p-5 text-sm text-slate-200">Clear communication checkpoints from planning through handoff.</article>
          <article className="glass soft-outline rounded-xl2 p-5 text-sm text-slate-200">Premium presentation standards for high-value residential properties.</article>
        </div>
      </section>
    </main>
  `;
}

function AboutPage() {
  return html`
    <main className="pt-24">
      <section className="px-4 py-12 md:px-0">
        <div className="mx-auto grid w-[min(1220px,92vw)] gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="glass soft-outline rounded-[1.35rem] p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-blue-200">About</p>
            <h1 className="mt-3 text-4xl text-white sm:text-5xl">A Premium Roofing Experience by Design</h1>
            <p className="mt-4 text-sm text-slate-300">
              Stonnex Roofing focuses on performance, detail quality, and communication standards that align with high-expectation homeowners.
            </p>
          </div>
          <img src="assets/media/work/luxury-home.jpg" alt="Home exterior" className="glass soft-outline h-full min-h-[320px] rounded-[1.35rem] object-cover" loading="lazy" />
        </div>
      </section>

      <section className="px-4 py-8 md:px-0">
        <div className="mx-auto grid w-[min(1220px,92vw)] gap-4 md:grid-cols-3">
          ${[
            'Architectural-grade visual and material direction',
            'Clear scope communication with practical decision checkpoints',
            'Detail-focused execution for Pacific Northwest weather demands'
          ].map((line) => html`<article className="glass soft-outline rounded-xl2 p-5 text-sm text-slate-200">${line}</article>`)}
        </div>
      </section>
    </main>
  `;
}

function ReviewsPage() {
  return html`
    <main className="pt-24">
      <section className="px-4 py-12 md:px-0">
        <div className="mx-auto w-[min(1220px,92vw)]">
          <${Reveal}>
            <p className="text-xs uppercase tracking-[0.22em] text-blue-200">Reviews</p>
            <h1 className="mt-3 text-4xl text-white sm:text-5xl">Homeowner Experience Module</h1>
            <p className="mt-4 max-w-2xl text-sm text-slate-300">
              Demo review structure built for quick replacement with production review feeds and media.
            </p>
          </${Reveal}>
        </div>
      </section>
      <${ReviewsCarousel} compact=${true} />
      <section className="px-4 py-10 md:px-0">
        <div className="mx-auto grid w-[min(1220px,92vw)] gap-4 md:grid-cols-3">
          <article className="glass soft-outline rounded-xl2 p-5 text-sm text-slate-200">Consistent communication is a core trust signal in premium home services.</article>
          <article className="glass soft-outline rounded-xl2 p-5 text-sm text-slate-200">Written clarity around scope and options improves decision confidence.</article>
          <article className="glass soft-outline rounded-xl2 p-5 text-sm text-slate-200">Clean execution and final walkthrough quality influence referral behavior.</article>
        </div>
      </section>
    </main>
  `;
}

function ContactPage() {
  return html`
    <main className="pt-24">
      <section className="px-4 py-12 md:px-0">
        <div className="mx-auto grid w-[min(1220px,92vw)] gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="glass soft-outline rounded-[1.35rem] p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-blue-200">Contact</p>
            <h1 className="mt-3 text-4xl text-white sm:text-5xl">Book Your Roof Inspection</h1>
            <p className="mt-4 text-sm text-slate-300">
              Use the step flow below to submit your property details and project focus.
            </p>
            <div className="mt-6 grid gap-2 text-sm text-slate-200">
              <a href="tel:+16043666140" className="city-link">(604) 366-6140</a>
              <a href="mailto:info@stonnexgroup.com" className="city-link">info@stonnexgroup.com</a>
              <p>Mon–Sat · 7AM–6PM</p>
            </div>
          </div>
          <img src="assets/media/location/aerial-hillside.jpg" alt="North Shore" className="glass soft-outline h-full min-h-[320px] rounded-[1.35rem] object-cover" loading="lazy" />
        </div>
      </section>
      <${BookInspectionForm} title="Book Your Inspection" compact=${true} />
    </main>
  `;
}

function NotFound() {
  const navigate = useNavigate();
  return html`
    <main className="grid min-h-screen place-content-center px-4 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Route Not Found</p>
      <h1 className="mt-2 text-4xl text-white">This page is not configured yet.</h1>
      <button
        className="btn-premium mx-auto mt-5 rounded-full border border-blue-300/40 bg-accent px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white"
        onClick=${() => navigate('/')}
      >
        Back to Home
      </button>
    </main>
  `;
}

function AppRoutes() {
  const location = useLocation();

  return html`
    <${AnimatePresence} mode="wait">
      <${motion.div}
        key=${location.pathname}
        initial=${{ opacity: 0, y: 10, filter: 'blur(10px)' }}
        animate=${{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit=${{ opacity: 0, y: -8, filter: 'blur(8px)' }}
        transition=${{ duration: 0.28, ease: EASE }}
      >
        <${Routes} location=${location}>
          <${Route} path="/" element=${html`<${HomePage} />`} />
          <${Route} path="/services" element=${html`<${ServicesHubPage} />`} />
          <${Route} path="/services/:serviceSlug" element=${html`<${ServicePage} />`} />
          <${Route} path="/service-areas" element=${html`<${ServiceAreasHubPage} />`} />
          <${Route} path="/service-areas/:citySlug" element=${html`<${ServiceAreaCityPage} />`} />
          <${Route} path="/about" element=${html`<${AboutPage} />`} />
          <${Route} path="/reviews" element=${html`<${ReviewsPage} />`} />
          <${Route} path="/contact" element=${html`<${ContactPage} />`} />
          <${Route} path="*" element=${html`<${NotFound} />`} />
        </${Routes}>
      </${motion.div}>
    </${AnimatePresence}>
  `;
}

function AppShell() {
  useSpotlight();

  return html`
    <div className="relative min-h-screen overflow-hidden">
      <${Header} />
      <${AppRoutes} />
      <${Footer} />
      <${Link}
        to="/contact"
        className="btn-premium fixed bottom-4 right-4 z-40 rounded-full border border-blue-300/40 bg-accent px-5 py-3 text-xs font-semibold uppercase tracking-[0.13em] text-white shadow-glow"
      >
        Book Inspection
      </${Link}>
    </div>
  `;
}

function Root() {
  return html`
    <${HashRouter}>
      <${AppShell} />
    </${HashRouter}>
  `;
}

createRoot(document.getElementById('app')).render(html`<${Root} />`);
