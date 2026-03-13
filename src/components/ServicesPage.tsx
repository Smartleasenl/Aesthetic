import { ArrowRight, CheckCircle } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

const IMG = {
  womanLaptop: '/images/imgi_4_6910e2aed4e8026a1b652185.png',
  linen:       '/images/imgi_5_6910ea39d1ba958698daa8e8.png',
  brandDetail: '/images/imgi_6_6910f37148a60028a9b8abfe.png',
  workspace:   '/images/imgi_7_6910fb1675ec1e391438b35f.png',
  womanWindow: '/images/imgi_3_6910d742b133d15c1ee8b05f.png',
  shopifyBag:  '/images/imgi_1_6913753829bad145499fa973.jpg',
};

function useReveal(threshold = 0.12) {
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

const SERVICES = [
  {
    n: '01',
    title: 'Meta Ads',
    sub: 'Gerichte advertenties die converteren',
    img: IMG.shopifyBag,
    desc: 'Wij bouwen en beheren Meta advertentiecampagnes die niet alleen clicks genereren, maar échte klanten. Van doelgroepanalyse tot creatieve copy en continue optimalisatie.',
    items: ['Doelgroep research & segmentatie', 'Ad creative productie', 'A/B testing & optimalisatie', 'Maandelijkse ROAS rapportage', 'Retargeting funnels'],
  },
  {
    n: '02',
    title: 'Contentcreatie',
    sub: 'Visuele content die stopt met scrollen',
    img: IMG.womanLaptop,
    desc: 'Van concept tot publicatie — wij produceren content die past bij jouw merk en aansluit op je doelgroep. Reels, carousels, stories en statische posts die converteren.',
    items: ['Contentplanning & strategie', 'Reels & video productie', 'Grafisch design & templates', 'Copywriting in jouw tone-of-voice', 'Maandelijkse contentkalender'],
  },
  {
    n: '03',
    title: 'Social Media Management',
    sub: 'Volledig kanaalbeheer, van strategie tot community',
    img: IMG.workspace,
    desc: 'Wij nemen je social media volledig uit handen. Van dagelijkse posts tot community management en rapportages — jij focust op je business, wij op je bereik.',
    items: ['Strategie & contentstrategie', 'Dagelijks posten & plannen', 'Community management', 'Hashtag & SEO optimalisatie', 'Maandelijkse groei rapportage'],
  },
  {
    n: '04',
    title: 'Brand Strategie',
    sub: 'Een merk dat je doelgroep onthoudt',
    img: IMG.brandDetail,
    desc: 'Een sterk merk begint met een duidelijke identiteit. Wij helpen je jouw positionering, tone-of-voice en visuele stijl te definiëren zodat alles klopt — van bio tot campagne.',
    items: ['Merkidentiteit & positionering', 'Tone-of-voice document', 'Brand moodboard & kleurpalet', 'Concurrentieanalyse', 'Brand guidelines document'],
  },
  {
    n: '05',
    title: 'Template Design',
    sub: 'On-brand Canva templates voor consistentie',
    img: IMG.linen,
    desc: 'Professionele, bewerkbare Canva templates die passen bij jouw merk. Zo post je altijd consistent en on-brand — ook als je het zelf doet.',
    items: ['10–20 custom Canva templates', 'Feed grid layout', 'Stories & highlights templates', 'Kleur- & fontafstemming op brand', 'Instructievideo voor gebruik'],
  },
  {
    n: '06',
    title: 'Fotografie',
    sub: 'Professionele brand shoots',
    img: IMG.womanWindow,
    desc: 'Authentieke, premium fotografie die jouw merk tot leven brengt. Wij verzorgen de volledige shoot — van locatiescouting tot eindresultaat.',
    items: ['Conceptontwikkeling & moodboard', 'Locatie & styling advies', 'Professionele belichting', '50–100 bewerkte foto\'s', 'Levering binnen 5 werkdagen'],
  },
];

function ServiceBlock({ s, i }: { s: typeof SERVICES[0]; i: number }) {
  const { ref, vis } = useReveal();
  const even = i % 2 === 0;
  return (
    <div ref={ref} style={{
      display: 'grid',
      gap: '3px',
      background: '#C4B9A8',
      opacity: vis ? 1 : 0,
      transform: vis ? 'none' : 'translateY(40px)',
      transition: 'all .9s cubic-bezier(.16,1,.3,1)',
    }} className="svc-block">
      {/* Image */}
      <div style={{ overflow: 'hidden', order: even ? 0 : 1 }}>
        <img src={s.img} style={{
          width: '100%', height: '100%', objectFit: 'cover',
          objectPosition: 'center', display: 'block',
          minHeight: 'clamp(260px,35vw,480px)',
          transition: 'transform .8s cubic-bezier(.25,.46,.45,.94)',
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
        />
      </div>
      {/* Text */}
      <div style={{
        background: even ? '#F0EDE6' : '#3D3426',
        padding: 'clamp(3rem,6vw,6rem) clamp(2rem,5vw,5rem)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        order: even ? 1 : 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1.5rem' }}>
          <span style={{ fontFamily: "'Jost',sans-serif", fontSize: '.5rem', fontWeight: 600, letterSpacing: '.25em', color: even ? 'rgba(122,106,82,.45)' : 'rgba(197,212,192,.3)', textTransform: 'uppercase' }}>{s.n}</span>
          <div style={{ flex: 1, height: '1px', background: even ? 'rgba(122,106,82,.15)' : 'rgba(197,212,192,.12)' }} />
        </div>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(2.2rem,4vw,4rem)', color: even ? '#2C2416' : '#F0EDE6', lineHeight: .9, letterSpacing: '-.025em', margin: '0 0 .4rem' }}>{s.title}</h2>
        <p style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: '.75rem', color: even ? '#8FA887' : '#8FA887', letterSpacing: '.1em', textTransform: 'uppercase', margin: '0 0 2rem' }}>{s.sub}</p>
        <p style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: '.88rem', color: even ? 'rgba(44,36,22,.65)' : 'rgba(197,212,192,.55)', lineHeight: 1.85, margin: '0 0 2rem' }}>{s.desc}</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem', display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
          {s.items.map(it => (
            <li key={it} style={{ display: 'flex', alignItems: 'center', gap: '.7rem', fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: '.82rem', color: even ? 'rgba(44,36,22,.7)' : 'rgba(197,212,192,.6)' }}>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#C5D4C0', flexShrink: 0 }} />
              {it}
            </li>
          ))}
        </ul>
        <button
          onClick={() => window.location.hash = '#contact'}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#8FA887'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#C5D4C0'; }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '.6rem', background: '#C5D4C0', color: '#080604', padding: '.85rem 1.8rem', fontFamily: "'Jost',sans-serif", fontSize: '.6rem', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', transition: 'background .3s', width: 'fit-content' }}>
          Offerte Aanvragen <ArrowRight size={11} />
        </button>
      </div>
      <style>{`.svc-block{grid-template-columns:1fr}@media(min-width:860px){.svc-block{grid-template-columns:1fr 1fr!important}}`}</style>
    </div>
  );
}

export default function ServicesPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={{ paddingTop: '80px', background: '#F0EDE6' }}>

      {/* HERO */}
      <div style={{ background: '#080604', padding: 'clamp(5rem,10vw,10rem) clamp(1.5rem,5vw,5rem) clamp(3rem,6vw,6rem)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <span style={{ fontFamily: "'Jost',sans-serif", fontSize: '.55rem', fontWeight: 500, letterSpacing: '.3em', textTransform: 'uppercase', color: '#C5D4C0', display: 'block', marginBottom: '2rem' }}>Onze Diensten</span>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(3.5rem,8vw,9rem)', color: '#F0EDE6', lineHeight: .88, letterSpacing: '-.04em', margin: '0 0 1.5rem' }}>
            Alles wat je<br /><em style={{ fontStyle: 'italic', color: '#C5D4C0' }}>merk nodig heeft.</em>
          </h1>
          <p style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: 'clamp(.85rem,1.5vw,1rem)', color: 'rgba(197,212,192,.55)', lineHeight: 1.85, maxWidth: '480px', margin: 0 }}>
            Van strategie tot uitvoering — wij bieden een volledig pakket aan diensten om jouw merk te bouwen, groeien en onthouden te worden.
          </p>
        </div>
        {/* decoratief */}
        <div style={{ position: 'absolute', right: '-5rem', top: '50%', transform: 'translateY(-50%)', fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(12rem,25vw,28rem)', fontWeight: 300, color: 'rgba(197,212,192,.03)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>06</div>
      </div>

      {/* SERVICES LIST */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', background: '#C4B9A8' }}>
        {SERVICES.map((s, i) => <ServiceBlock key={s.n} s={s} i={i} />)}
      </div>

      {/* CTA BOTTOM */}
      <div style={{ background: '#3D3426', padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,5rem)', textAlign: 'center' }}>
        <span style={{ fontFamily: "'Jost',sans-serif", fontSize: '.55rem', fontWeight: 500, letterSpacing: '.3em', textTransform: 'uppercase', color: '#8FA887', display: 'block', marginBottom: '1.5rem' }}>Klaar om te starten?</span>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(2.5rem,6vw,6rem)', color: '#F0EDE6', lineHeight: .9, letterSpacing: '-.03em', margin: '0 0 2.5rem' }}>
          Plan een gratis<br /><em style={{ color: '#C5D4C0' }}>strategiegesprek.</em>
        </h2>
        <button
          onClick={() => { window.location.href = '/contact'; }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#8FA887'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#C5D4C0'; }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '.7rem', background: '#C5D4C0', color: '#080604', padding: '1.1rem 2.5rem', fontFamily: "'Jost',sans-serif", fontSize: '.63rem', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', transition: 'background .3s' }}>
          Neem Contact Op <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
}