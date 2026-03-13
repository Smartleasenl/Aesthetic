import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

/* ─────────────────────────────────────────
   EXACTE IMAGE PADEN  (public/images/)
   ───────────────────────────────────────── */
const IMG = {
  // Shopify bag / lifestyle flat lay (jpg)
  shopifyBag:     '/images/imgi_1_6913753829bad145499fa973.jpg',
  // Portfolio mockup spread
  portfolioMock:  '/images/imgi_2_690d00875c1881a6bfeeb56d.png',
  // Vrouw bij raam / zonsondergang
  womanWindow:    '/images/imgi_3_6910d742b133d15c1ee8b05f.png',
  // Vrouw met laptop op bank
  womanLaptop:    '/images/imgi_4_6910e2aed4e8026a1b652185.png',
  // Linen / textile texture
  linen:          '/images/imgi_5_6910ea39d1ba958698daa8e8.png',
  // Brand / design detail
  brandDetail:    '/images/imgi_6_6910f37148a60028a9b8abfe.png',
  // Workspace / interior
  workspace:      '/images/imgi_7_6910fb1675ec1e391438b35f.png',
  // Portfolio werk
  portfolioWork:  '/images/imgi_8_69111394d1ba95e216dff6de.png',
  // Content extra
  content1:       '/images/imgi_9_6911139475ec1e409f3bbdf0.png',
  // Baris & Gizem founders portret samen
  foundersCouch:  '/images/imgi_10_69111394c3a1ea691a145f75.png',
  // Gizem solo
  gizemSolo:      '/images/imgi_11_69111394d4d779cc917e287b.png',
  // Portfolio mockup 2
  portfolioMock2: '/images/imgi_64_6910fbdf0d255178af45837a.png',
  // Extra linen crop (voor CTA banner)
  linenCTA:       '/images/imgi_35_6910ea39d1ba958698daa8e8.png',
  // Extra womanLaptop crop
  womanLaptop2:   '/images/imgi_32_6910e2aed4e8026a1b652185.png',
  // Extra womanWindow crop
  womanWindow2:   '/images/imgi_27_6910d742b133d15c1ee8b05f.png',
};

const STATS = [
  { value: '150+', label: 'Happy Clients' },
  { value: '500+', label: 'Projects Done' },
  { value: '10M+', label: 'Reach Generated' },
  { value: '98%',  label: 'Client Satisfaction' },
];

const TICKER_ITEMS = [
  'META ADS','✦','CONTENTCREATIE','✦','SOCIAL MEDIA','✦',
  'BRAND STRATEGIE','✦','META ADS','✦','CONTENTCREATIE','✦',
  'SOCIAL MEDIA','✦','BRAND STRATEGIE','✦',
];

const SERVICES = [
  { title: 'Contentcreatie',  desc: 'Visuele content die stopt met scrollen en converteert.' },
  { title: 'Template Design', desc: 'On-brand templates voor consistente social media.' },
  { title: 'Social Media',    desc: 'Volledig beheer van je kanalen, van strategie tot posting.' },
  { title: 'Fotografie',      desc: 'Professionele brand shoots voor een premium uitstraling.' },
  { title: 'Meta Ads',        desc: 'Gerichte campagnes die leads genereren en ROAS leveren.' },
  { title: 'E-mailflows',     desc: 'Geautomatiseerde flows die converteren terwijl je slaapt.' },
];

const MEDIA = ['VOGUE', 'ELLE', 'BAZAAR', 'JAN'];

/* ═══════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════ */
function Hero() {
  const [phase, setPhase] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);

  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 600),
      setTimeout(() => setPhase(3), 1100),
      setTimeout(() => setPhase(4), 1600),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    const orbs = Array.from({ length: 6 }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 180 + Math.random() * 220,
      speed: 0.0003 + Math.random() * 0.0004,
      phase: Math.random() * Math.PI * 2,
      color: i % 2 === 0 ? '197,212,192' : '61,52,38',
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      orbs.forEach(orb => {
        const x = orb.x + Math.sin(frame * orb.speed + orb.phase) * 120;
        const y = orb.y + Math.cos(frame * orb.speed * 0.7 + orb.phase) * 80;
        const g = ctx.createRadialGradient(x, y, 0, x, y, orb.r);
        g.addColorStop(0, `rgba(${orb.color},0.13)`);
        g.addColorStop(1, `rgba(${orb.color},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: '#0D0B08' }}>

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Film grain */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        opacity: 0.04, mixBlendMode: 'overlay',
      }} />

      {/* Scanline */}
      <div className="absolute left-0 right-0 h-px pointer-events-none" style={{
        background: 'linear-gradient(90deg,transparent,rgba(197,212,192,0.4),transparent)',
        animation: 'scanline 8s ease-in-out infinite',
      }} />

      {/* Top accent line */}
      <div className="relative z-10 h-px w-full"
        style={{ background: 'linear-gradient(90deg,transparent,#C5D4C0,transparent)' }} />

      {/* Ticker */}
      <div className="relative z-10 border-b overflow-hidden"
        style={{ borderColor: 'rgba(197,212,192,0.15)' }}>
        <div className="flex gap-10 py-3 whitespace-nowrap"
          style={{ animation: 'ticker 25s linear infinite' }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="text-[9px] tracking-[0.25em] font-medium shrink-0" style={{
              color: item === '✦' ? '#C5D4C0' : 'rgba(197,212,192,0.45)',
              fontFamily: "'Jost',sans-serif",
            }}>{item}</span>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-24">

        {/* Badge */}
        <div className="flex items-center gap-3 mb-14" style={{
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 0.7s ease',
        }}>
          <div className="h-px w-10" style={{ background: '#C5D4C0' }} />
          <span style={{
            fontFamily: "'Jost',sans-serif", fontSize: '0.6rem', fontWeight: 500,
            letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C5D4C0',
          }}>Premium Marketing Agency — Est. 2024</span>
          <div className="h-px w-10" style={{ background: '#C5D4C0' }} />
        </div>

        {/* Headline */}
        <div className="text-center max-w-6xl mx-auto mb-10">
          <h1 style={{
            fontFamily: "'Cormorant Garamond',serif", fontWeight: 300,
            fontSize: 'clamp(4rem,12vw,11rem)', color: '#F0EDE6',
            letterSpacing: '-0.02em', lineHeight: 0.95, marginBottom: '0.08em',
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? 'translateY(0)' : 'translateY(32px)',
            transition: 'all 1s ease',
          }}>Transformeer</h1>
          <h1 style={{
            fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontStyle: 'italic',
            fontSize: 'clamp(4rem,12vw,11rem)', letterSpacing: '-0.02em', lineHeight: 0.95,
            backgroundImage: 'linear-gradient(135deg,#C5D4C0 0%,#F0EDE6 45%,#8FA887 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? 'translateY(0)' : 'translateY(32px)',
            transition: 'all 1s ease 150ms',
          }}>Je Merk.</h1>
        </div>

        {/* Sub + CTA */}
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14 mt-4" style={{
          opacity: phase >= 3 ? 1 : 0,
          transform: phase >= 3 ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.9s ease',
        }}>
          <p className="max-w-[280px] text-center md:text-left leading-loose" style={{
            fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: '0.9rem',
            color: 'rgba(197,212,192,0.6)',
          }}>
            Strategieën die ervoor zorgen dat je niet alleen gezien wordt, maar ook{' '}
            <span style={{ color: '#C5D4C0', fontWeight: 400 }}>onthouden</span>.
          </p>
          <div className="h-12 w-px hidden md:block"
            style={{ background: 'rgba(197,212,192,0.2)' }} />
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => scrollTo('contact')}
              onMouseEnter={e => (e.currentTarget.style.background = '#8FA887')}
              onMouseLeave={e => (e.currentTarget.style.background = '#C5D4C0')}
              className="group flex items-center gap-3" style={{
                background: '#C5D4C0', color: '#0D0B08', padding: '1rem 2rem',
                fontFamily: "'Jost',sans-serif", fontSize: '0.65rem', fontWeight: 600,
                letterSpacing: '0.18em', textTransform: 'uppercase', border: 'none',
                cursor: 'pointer', transition: 'background 0.3s ease',
              }}>
              Werken Met Ons
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => scrollTo('portfolio')}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#C5D4C0'; e.currentTarget.style.color = '#F0EDE6'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(197,212,192,0.25)'; e.currentTarget.style.color = '#C5D4C0'; }}
              style={{
                background: 'transparent', color: '#C5D4C0', padding: '1rem 2rem',
                fontFamily: "'Jost',sans-serif", fontSize: '0.65rem', fontWeight: 500,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                border: '1px solid rgba(197,212,192,0.25)', cursor: 'pointer', transition: 'all 0.3s ease',
              }}>
              Bekijk Portfolio
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 flex flex-col items-center gap-2" style={{
          opacity: phase >= 4 ? 0.45 : 0, transition: 'opacity 1s ease',
        }}>
          <div className="w-px" style={{
            height: '52px',
            background: 'linear-gradient(to bottom,transparent,#C5D4C0)',
            animation: 'breathe 2.5s ease-in-out infinite',
          }} />
          <span style={{
            fontFamily: "'Jost',sans-serif", fontSize: '0.55rem',
            letterSpacing: '0.3em', color: 'rgba(197,212,192,0.5)', textTransform: 'uppercase',
          }}>Scroll</span>
        </div>
      </div>

      {/* Stats */}
      <div className="relative z-10 border-t" style={{
        borderColor: 'rgba(197,212,192,0.12)',
        opacity: phase >= 4 ? 1 : 0,
        transform: phase >= 4 ? 'translateY(0)' : 'translateY(16px)',
        transition: 'all 1s ease',
      }}>
        <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4">
          {STATS.map(({ value, label }, i) => (
            <div key={label} className="text-center py-4" style={{
              borderRight: i < 3 ? '1px solid rgba(197,212,192,0.1)' : 'none',
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond',serif", fontWeight: 300,
                fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: '#F0EDE6',
                lineHeight: 1, marginBottom: '0.4rem',
              }}>{value}</div>
              <div style={{
                fontFamily: "'Jost',sans-serif", fontSize: '0.58rem',
                letterSpacing: '0.22em', color: 'rgba(197,212,192,0.4)', textTransform: 'uppercase',
              }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker   { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes scanline { 0%{top:-2%;opacity:0} 8%{opacity:1} 92%{opacity:1} 100%{top:105%;opacity:0} }
        @keyframes breathe  { 0%,100%{opacity:0.4;transform:scaleY(1)} 50%{opacity:1;transform:scaleY(1.15)} }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════
   ABOUT — twee kolommen met echte foto's
   ═══════════════════════════════════════════ */
function About() {
  return (
    <section id="about" style={{ background: '#F0EDE6' }}>

      {/* WAT WIJ DOEN */}
      <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p style={{
            fontFamily: "'Jost',sans-serif", fontSize: '0.6rem', fontWeight: 500,
            letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8FA887', marginBottom: '1.5rem',
          }}>Aesthetic Social Haus</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond',serif", fontWeight: 400,
            fontSize: 'clamp(2.2rem,4vw,3.5rem)', color: '#2C2416', lineHeight: 1.1, marginBottom: '1.5rem',
          }}>Volledige Marketing<br /><em>&amp; Strategie</em></h2>
          <div style={{ width: '40px', height: '1px', background: '#C4B9A8', marginBottom: '2rem' }} />
          <div style={{
            fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: '0.9rem',
            color: '#7A6A52', lineHeight: 1.9,
          }}>
            {['Contentcreatie', 'Template Design', 'Social Media', 'Fotografie',
              'Branding', 'Meta Ads', 'E-mailflows', 'Automatiseringen'].map(s => (
              <div key={s} className="flex items-center gap-3 mb-1">
                <span style={{ color: '#C5D4C0', fontSize: '0.7rem' }}>✦</span>
                <span>{s}</span>
              </div>
            ))}
          </div>
          <button className="group flex items-center gap-2 mt-8" style={{
            fontFamily: "'Jost',sans-serif", fontSize: '0.65rem', fontWeight: 500,
            letterSpacing: '0.18em', textTransform: 'uppercase', color: '#3D3426',
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          }}>
            Meer Over Ons
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Foto vrouw met laptop — met decoratieve border offset */}
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-full h-full border border-[#DDD8CF]" style={{ zIndex: 0 }} />
          <img
            src={IMG.womanLaptop}
            alt="Aesthetic Social Haus"
            className="relative w-full object-cover"
            style={{ zIndex: 1, aspectRatio: '4/5' }}
          />
          {/* floating small image rechtsboven */}
          <div className="absolute -top-6 -right-6 w-28 h-36 overflow-hidden border-4 border-[#F0EDE6] hidden md:block" style={{ zIndex: 2 }}>
            <img src={IMG.shopifyBag} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* FOUNDERS — donker blok */}
      <div style={{ background: '#3D3426' }} className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

          {/* Foto founders */}
          <div className="relative order-2 md:order-1">
            <img
              src={IMG.foundersCouch}
              alt="Baris en Gizem"
              className="w-full object-cover"
              style={{ aspectRatio: '3/4' }}
            />
            {/* floating detail: Gizem solo */}
            <div className="absolute -bottom-8 -right-8 w-44 h-52 overflow-hidden border-4 border-[#3D3426] hidden md:block">
              <img src={IMG.gizemSolo} alt="Gizem" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Tekst */}
          <div className="order-1 md:order-2">
            <p style={{
              fontFamily: "'Jost',sans-serif", fontSize: '0.6rem', fontWeight: 500,
              letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8FA887', marginBottom: '1.5rem',
            }}>The Founder</p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond',serif", fontWeight: 400,
              fontSize: 'clamp(2.2rem,4vw,3.5rem)', color: '#F0EDE6', lineHeight: 1.1, marginBottom: '1.5rem',
            }}>Meet Baris<br /><em>&amp; Gizem</em></h2>
            <div style={{ width: '40px', height: '1px', background: 'rgba(197,212,192,0.3)', marginBottom: '2rem' }} />
            <div style={{
              fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: '0.9rem',
              color: 'rgba(197,212,192,0.65)', lineHeight: 1.9, display: 'flex', flexDirection: 'column', gap: '1rem',
            }}>
              <p>Ik ben Baris, oprichter van <strong style={{ color: '#C5D4C0', fontWeight: 400 }}>Aesthetic Social Haus</strong>. Na jaren actief te zijn geweest in de e-commerce wereld, ontdekte ik dat veel bedrijven zich focussen op mooie content, maar de strategie erachter missen.</p>
              <p>Niet lang daarna sloot Gizem zich aan — mijn vrouw en creatieve hart achter het merk. Met haar oog voor detail en gevoel voor esthetiek brengt ze onze ideeën tot leven.</p>
              <p>Samen bouwen we dagelijks aan merken die opvallen, onthouden worden en vertrouwen uitstralen.</p>
            </div>
            <button className="group flex items-center gap-2 mt-8" style={{
              fontFamily: "'Jost',sans-serif", fontSize: '0.65rem', fontWeight: 500,
              letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C5D4C0',
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            }}>
              Meer Over Ons
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SERVICES
   ═══════════════════════════════════════════ */
function Services() {
  return (
    <section id="services" className="relative overflow-hidden" style={{ background: '#F0EDE6' }}>
      {/* Linen texture rechts */}
      <div className="absolute inset-y-0 right-0 w-1/3 pointer-events-none hidden lg:block">
        <img src={IMG.linen} alt="" className="w-full h-full object-cover opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-xl mb-16">
          <p style={{
            fontFamily: "'Jost',sans-serif", fontSize: '0.6rem', fontWeight: 500,
            letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8FA887', marginBottom: '1rem',
          }}>Wat Wij Doen</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond',serif", fontWeight: 400,
            fontSize: 'clamp(2.2rem,4vw,3.5rem)', color: '#2C2416', lineHeight: 1.1,
          }}>Alles wat je nodig hebt<br /><em>onder één dak</em></h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: '#DDD8CF' }}>
          {SERVICES.map(({ title, desc }, i) => (
            <div key={title}
              className="group p-10 cursor-pointer"
              style={{ background: '#F0EDE6', transition: 'background 0.3s ease' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#3D3426')}
              onMouseLeave={e => (e.currentTarget.style.background = '#F0EDE6')}
            >
              <div className="flex justify-between items-start mb-6">
                <span style={{
                  fontFamily: "'Jost',sans-serif", fontSize: '0.6rem', fontWeight: 500,
                  letterSpacing: '0.2em', color: '#C4B9A8',
                }} className="group-hover:!text-[#8FA887] transition-colors">0{i + 1}</span>
                <ArrowUpRight size={14} style={{ color: '#C4B9A8' }}
                  className="group-hover:!text-[#C5D4C0] transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <h3 style={{
                fontFamily: "'Cormorant Garamond',serif", fontWeight: 400,
                fontSize: '1.5rem', color: '#2C2416', marginBottom: '0.75rem',
              }} className="group-hover:!text-[#F0EDE6] transition-colors">{title}</h3>
              <p style={{
                fontFamily: "'Jost',sans-serif", fontWeight: 300,
                fontSize: '0.85rem', color: '#7A6A52', lineHeight: 1.7,
              }} className="group-hover:!text-[rgba(197,212,192,0.65)] transition-colors">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   TESTIMONIAL
   ═══════════════════════════════════════════ */
function Testimonial() {
  return (
    <section style={{ background: '#2C2416' }} className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p style={{
          fontFamily: "'Jost',sans-serif", fontSize: '0.6rem', fontWeight: 500,
          letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8FA887', marginBottom: '3rem',
        }}>Kind Words</p>
        <div style={{
          fontFamily: "'Cormorant Garamond',serif", fontWeight: 300,
          fontSize: 'clamp(1.4rem,3vw,2.2rem)', color: '#F0EDE6',
          lineHeight: 1.6, fontStyle: 'italic', marginBottom: '3rem',
        }}>
          "Werken met Baris en het team van Aesthetic Social Haus heeft mijn bedrijf volledig
          veranderd. Voorheen voelde social media als iets dat 'erbij hoorde', maar nu is het
          een echte groeistrategie. Ik kan ze aan iedereen aanbevelen."
        </div>
        <div style={{ width: '40px', height: '1px', background: 'rgba(197,212,192,0.3)', margin: '0 auto 1.5rem' }} />
        <p style={{
          fontFamily: "'Jost',sans-serif", fontSize: '0.65rem',
          letterSpacing: '0.2em', color: '#8FA887', textTransform: 'uppercase',
        }}>Lara van der Veen — Lara Beauty Clinic</p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PORTFOLIO
   ═══════════════════════════════════════════ */
function Portfolio() {
  const items = [
    { img: IMG.portfolioMock,  label: 'Brand Identity',   client: 'Beauty Clinic' },
    { img: IMG.portfolioMock2, label: 'Social Templates', client: 'E-commerce' },
    { img: IMG.brandDetail,    label: 'Content Creatie',  client: 'Fashion Brand' },
    { img: IMG.workspace,      label: 'Brand Strategie',  client: 'Lifestyle' },
  ];

  return (
    <section id="portfolio" style={{ background: '#F0EDE6' }} className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p style={{
              fontFamily: "'Jost',sans-serif", fontSize: '0.6rem', fontWeight: 500,
              letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8FA887', marginBottom: '1rem',
            }}>Portfolio</p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond',serif", fontWeight: 400,
              fontSize: 'clamp(2.2rem,4vw,3.5rem)', color: '#2C2416', lineHeight: 1.1,
            }}>Uitgelichte<br /><em>Designs</em></h2>
          </div>
          <button className="group flex items-center gap-2 self-start md:self-auto" style={{
            fontFamily: "'Jost',sans-serif", fontSize: '0.65rem', fontWeight: 500,
            letterSpacing: '0.18em', textTransform: 'uppercase', color: '#3D3426',
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          }}>
            Bekijk Alles <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map(({ img, label, client }) => (
            <div key={label} className="group relative overflow-hidden cursor-pointer"
              style={{ aspectRatio: '3/4' }}>
              <img src={img} alt={label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(to top,rgba(44,36,22,0.88) 0%,transparent 55%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p style={{
                  fontFamily: "'Cormorant Garamond',serif", fontSize: '1.2rem',
                  color: '#F0EDE6', fontWeight: 400,
                }}>{label}</p>
                <p style={{
                  fontFamily: "'Jost',sans-serif", fontSize: '0.6rem',
                  letterSpacing: '0.15em', color: 'rgba(197,212,192,0.7)', textTransform: 'uppercase',
                }}>{client}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   MEDIA LOGOS
   ═══════════════════════════════════════════ */
function MediaLogos() {
  return (
    <div style={{ background: '#F0EDE6', borderTop: '1px solid #DDD8CF', borderBottom: '1px solid #DDD8CF' }}
      className="py-10">
      <div className="max-w-4xl mx-auto px-6">
        <p style={{
          fontFamily: "'Jost',sans-serif", fontSize: '0.55rem', fontWeight: 500,
          letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C4B9A8',
          textAlign: 'center', marginBottom: '2rem',
        }}>Onze Klanten Zijn Verschenen In</p>
        <div className="flex justify-center items-center gap-12 flex-wrap">
          {MEDIA.map(m => (
            <span key={m} style={{
              fontFamily: "'Cormorant Garamond',serif", fontWeight: 600,
              fontSize: 'clamp(1.2rem,2.5vw,2rem)', color: '#C4B9A8', letterSpacing: '0.1em',
            }}>{m}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CTA BANNER
   ═══════════════════════════════════════════ */
function CTABanner() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative overflow-hidden" style={{ background: '#3D3426', minHeight: '420px' }}>
      {/* linen texture als achtergrond */}
      <div className="absolute inset-0 pointer-events-none">
        <img src={IMG.linenCTA} alt="" className="w-full h-full object-cover opacity-15" />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-24">
        <p style={{
          fontFamily: "'Jost',sans-serif", fontSize: '0.6rem', fontWeight: 500,
          letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8FA887', marginBottom: '1.5rem',
        }}>Vrijblijvend gesprek</p>
        <h2 style={{
          fontFamily: "'Cormorant Garamond',serif", fontWeight: 300,
          fontSize: 'clamp(2.5rem,6vw,5rem)', color: '#F0EDE6', lineHeight: 1.1, marginBottom: '1rem',
        }}>Klaar om je social media<br /><em>te transformeren?</em></h2>
        <div style={{ width: '40px', height: '1px', background: 'rgba(197,212,192,0.3)', margin: '1.5rem auto' }} />
        <p style={{
          fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: '0.9rem',
          color: 'rgba(197,212,192,0.6)', maxWidth: '480px', lineHeight: 1.8, marginBottom: '2.5rem',
        }}>
          Wil je een opvallende online aanwezigheid creëren? Met onze expertise bouw je een
          krachtige social media strategie die zorgt voor groei op de lange termijn.
        </p>
        <button onClick={() => scrollTo('contact')}
          onMouseEnter={e => (e.currentTarget.style.background = '#8FA887')}
          onMouseLeave={e => (e.currentTarget.style.background = '#C5D4C0')}
          className="group flex items-center gap-3" style={{
            background: '#C5D4C0', color: '#2C2416', padding: '1rem 2.5rem',
            fontFamily: "'Jost',sans-serif", fontSize: '0.7rem', fontWeight: 600,
            letterSpacing: '0.18em', textTransform: 'uppercase', border: 'none',
            cursor: 'pointer', transition: 'background 0.3s ease',
          }}>
          Werken Met Ons
          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   EXPORT
   ═══════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Testimonial />
      <Portfolio />
      <MediaLogos />
      <CTABanner />
    </>
  );
}