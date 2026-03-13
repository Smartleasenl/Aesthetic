import { ArrowRight, ExternalLink } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

const IMG = {
  womanLaptop: '/images/imgi_4_6910e2aed4e8026a1b652185.png',
  womanWindow: '/images/imgi_3_6910d742b133d15c1ee8b05f.png',
  linen:       '/images/imgi_5_6910ea39d1ba958698daa8e8.png',
  brandDetail: '/images/imgi_6_6910f37148a60028a9b8abfe.png',
  workspace:   '/images/imgi_7_6910fb1675ec1e391438b35f.png',
  shopifyBag:  '/images/imgi_1_6913753829bad145499fa973.jpg',
};

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

const CASES = [
  {
    id: '01',
    client: 'Lifestyle Merk — Amsterdam',
    title: 'Brand Strategie & Content',
    tags: ['Brand Strategie', 'Contentcreatie', 'Social Media'],
    img: IMG.womanLaptop,
    result: '+340% meer bereik in 3 maanden',
    desc: 'Complete merkidentiteit opgebouwd vanuit nul. Van moodboard en tone-of-voice tot maandelijkse contentplanning en community management.',
    tall: true,
  },
  {
    id: '02',
    client: 'E-commerce Brand',
    title: 'Meta Ads Campagne',
    tags: ['Meta Ads', 'Retargeting'],
    img: IMG.shopifyBag,
    result: '4.8x ROAS behaald',
    desc: 'Volledige Meta advertentiestrategie opgezet inclusief prospecting en retargeting funnels.',
    tall: false,
  },
  {
    id: '03',
    client: 'Fashion Label',
    title: 'Template Design System',
    tags: ['Template Design', 'Branding'],
    img: IMG.brandDetail,
    result: '20 custom Canva templates',
    desc: 'On-brand template set die het team zelfstandig in staat stelt om consistent te posten.',
    tall: false,
  },
  {
    id: '04',
    client: 'Beauty Clinic',
    title: 'Social Media Management',
    tags: ['Social Media', 'Contentcreatie'],
    img: IMG.workspace,
    result: '+1.200 nieuwe volgers in 60 dagen',
    desc: 'Volledig social media beheer inclusief dagelijkse posts, stories en engagement.',
    tall: true,
  },
  {
    id: '05',
    client: 'Online Retailer',
    title: 'Campagne Fotografie',
    tags: ['Fotografie', 'Contentcreatie'],
    img: IMG.linen,
    result: '80 bewerkte brand photos',
    desc: 'Product- en lifestyle fotografie voor gebruik in ads en organische feed.',
    tall: false,
  },
  {
    id: '06',
    client: 'Salon & Spa',
    title: 'Meta Ads & Rebranding',
    tags: ['Meta Ads', 'Brand Strategie'],
    img: IMG.womanWindow,
    result: '2x meer boekingen per maand',
    desc: 'Gecombineerde aanpak van merkherpositionering en gerichte Meta campagnes.',
    tall: false,
  },
];

const CATS = ['Alle', 'Brand Strategie', 'Meta Ads', 'Contentcreatie', 'Social Media', 'Template Design', 'Fotografie'];

export default function PortfolioPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [active, setActive] = useState('Alle');
  const grid = useReveal();

  const filtered = active === 'Alle' ? CASES : CASES.filter(c => c.tags.includes(active));

  return (
    <div style={{ paddingTop: '80px', background: '#F0EDE6' }}>

      {/* HERO */}
      <div style={{ background: '#080604', padding: 'clamp(5rem,10vw,10rem) clamp(1.5rem,5vw,5rem) clamp(3rem,6vw,6rem)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <span style={{ fontFamily: "'Jost',sans-serif", fontSize: '.55rem', fontWeight: 500, letterSpacing: '.3em', textTransform: 'uppercase', color: '#C5D4C0', display: 'block', marginBottom: '2rem' }}>Portfolio</span>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(3.5rem,8vw,9rem)', color: '#F0EDE6', lineHeight: .88, letterSpacing: '-.04em', margin: '0 0 1.5rem' }}>
            Werk dat<br /><em style={{ fontStyle: 'italic', color: '#C5D4C0' }}>voor zichzelf spreekt.</em>
          </h1>
          <p style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: 'clamp(.85rem,1.5vw,1rem)', color: 'rgba(197,212,192,.5)', lineHeight: 1.85, maxWidth: '440px', margin: 0 }}>
            Een selectie van onze recente projecten — van campagnes tot complete merktrajecten.
          </p>
        </div>
        <div style={{ position: 'absolute', right: '-2rem', top: '50%', transform: 'translateY(-50%)', fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(14rem,28vw,32rem)', fontWeight: 300, color: 'rgba(197,212,192,.03)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>P</div>
      </div>

      {/* FILTER */}
      <div style={{ background: '#F0EDE6', borderBottom: '1px solid #DDD8CF', padding: '1.2rem clamp(1.5rem,5vw,5rem)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setActive(c)}
              onMouseEnter={e => { if (c !== active) (e.currentTarget as HTMLElement).style.color = '#2C2416'; }}
              onMouseLeave={e => { if (c !== active) (e.currentTarget as HTMLElement).style.color = 'rgba(122,106,82,.6)'; }}
              style={{
                fontFamily: "'Jost',sans-serif", fontSize: '.55rem', fontWeight: 500, letterSpacing: '.18em', textTransform: 'uppercase',
                padding: '.4rem .9rem', border: '1px solid',
                borderColor: c === active ? '#3D3426' : 'rgba(122,106,82,.2)',
                background: c === active ? '#3D3426' : 'transparent',
                color: c === active ? '#F0EDE6' : 'rgba(122,106,82,.6)',
                cursor: 'pointer', transition: 'all .2s',
              }}>{c}</button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <div ref={grid.ref} style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(3rem,6vw,6rem) clamp(1.5rem,5vw,5rem)' }}>
        <div style={{ display: 'grid', gap: '3px', background: '#C4B9A8' }} className="port-grid">
          {filtered.map((c, i) => (
            <div key={c.id} style={{
              gridRow: c.tall ? 'span 2' : 'span 1',
              position: 'relative', overflow: 'hidden', cursor: 'pointer',
              minHeight: c.tall ? 'clamp(360px,50vw,600px)' : 'clamp(220px,28vw,340px)',
              opacity: grid.vis ? 1 : 0,
              transform: grid.vis ? 'none' : 'translateY(30px)',
              transition: `all .8s cubic-bezier(.16,1,.3,1) ${i * .08}s`,
              background: '#2C2416',
            }}
              onMouseEnter={e => {
                const img = e.currentTarget.querySelector('img') as HTMLElement;
                const overlay = e.currentTarget.querySelector('.port-overlay') as HTMLElement;
                if (img) img.style.transform = 'scale(1.06)';
                if (overlay) overlay.style.opacity = '1';
              }}
              onMouseLeave={e => {
                const img = e.currentTarget.querySelector('img') as HTMLElement;
                const overlay = e.currentTarget.querySelector('.port-overlay') as HTMLElement;
                if (img) img.style.transform = 'scale(1)';
                if (overlay) overlay.style.opacity = '0';
              }}
            >
              <img src={c.img} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block', transition: 'transform .8s cubic-bezier(.25,.46,.45,.94)' }} />
              {/* always-visible bottom label */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(8,6,4,.88) 0%, transparent 100%)', padding: '2.5rem 1.8rem 1.5rem' }}>
                <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap', marginBottom: '.6rem' }}>
                  {c.tags.map(t => (
                    <span key={t} style={{ fontFamily: "'Jost',sans-serif", fontSize: '.45rem', fontWeight: 500, letterSpacing: '.18em', textTransform: 'uppercase', color: '#C5D4C0', border: '1px solid rgba(197,212,192,.25)', padding: '.2rem .5rem' }}>{t}</span>
                  ))}
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(1rem,1.8vw,1.4rem)', color: '#F0EDE6', margin: '0 0 .2rem', lineHeight: 1.1 }}>{c.title}</p>
                <p style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: '.65rem', color: 'rgba(197,212,192,.5)', margin: 0 }}>{c.client}</p>
              </div>
              {/* hover overlay */}
              <div className="port-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(61,52,38,.92)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2.5rem', opacity: 0, transition: 'opacity .4s ease' }}>
                <span style={{ fontFamily: "'Jost',sans-serif", fontSize: '.48rem', fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: '#8FA887', display: 'block', marginBottom: '1rem' }}>Resultaat</span>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(1.2rem,2vw,1.8rem)', color: '#C5D4C0', lineHeight: 1.2, margin: '0 0 1.2rem' }}>{c.result}</p>
                <p style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: '.8rem', color: 'rgba(197,212,192,.6)', lineHeight: 1.7, margin: 0 }}>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <p style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: '.9rem', color: 'rgba(122,106,82,.5)', textAlign: 'center', padding: '4rem 0' }}>Geen projecten gevonden voor deze categorie.</p>
        )}
      </div>

      {/* CTA */}
      <div style={{ background: '#3D3426', padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,5rem)', textAlign: 'center' }}>
        <span style={{ fontFamily: "'Jost',sans-serif", fontSize: '.55rem', fontWeight: 500, letterSpacing: '.3em', textTransform: 'uppercase', color: '#8FA887', display: 'block', marginBottom: '1.5rem' }}>Jouw project als volgende?</span>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(2.5rem,6vw,6rem)', color: '#F0EDE6', lineHeight: .9, letterSpacing: '-.03em', margin: '0 0 2.5rem' }}>
          Laten we samen<br /><em style={{ color: '#C5D4C0' }}>iets moois bouwen.</em>
        </h2>
        <button
          onClick={() => { window.location.href = '/contact'; }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#8FA887'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#C5D4C0'; }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '.7rem', background: '#C5D4C0', color: '#080604', padding: '1.1rem 2.5rem', fontFamily: "'Jost',sans-serif", fontSize: '.63rem', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', transition: 'background .3s' }}>
          Start Jouw Project <ArrowRight size={12} />
        </button>
      </div>

      <style>{`
        .port-grid { grid-template-columns: 1fr; }
        @media(min-width:600px)  { .port-grid { grid-template-columns: 1fr 1fr !important; } }
        @media(min-width:1000px) { .port-grid { grid-template-columns: 1fr 1fr 1fr !important; } }
      `}</style>
    </div>
  );
}