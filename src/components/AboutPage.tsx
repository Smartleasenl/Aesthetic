import { ArrowRight } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

const IMG = {
  womanLaptop: '/images/imgi_4_6910e2aed4e8026a1b652185.png',
  womanWindow: '/images/imgi_3_6910d742b133d15c1ee8b05f.png',
  linen:       '/images/imgi_5_6910ea39d1ba958698daa8e8.png',
  brandDetail: '/images/imgi_6_6910f37148a60028a9b8abfe.png',
  workspace:   '/images/imgi_7_6910fb1675ec1e391438b35f.png',
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

const VALUES = [
  { n: '01', title: 'Strategie eerst', body: 'Wij beginnen altijd met het begrijpen van jouw merk, doelgroep en doelen. Geen template-aanpak — elke strategie is uniek.' },
  { n: '02', title: 'Kwaliteit boven kwantiteit', body: 'Liever tien posts die écht werken dan dertig die scrollen. Wij kiezen altijd voor impact boven volume.' },
  { n: '03', title: 'Transparantie', body: 'Geen verborgen kosten, geen vage rapporten. Je weet altijd wat we doen, waarom en wat het oplevert.' },
  { n: '04', title: 'Resultaatgericht', body: 'Metrics die er toe doen: bereik, engagement, leads en omzet. Wij meten alles en optimaliseren continu.' },
];

const STATS = [
  { n: '150+', label: 'Tevreden klanten' },
  { n: '500+', label: 'Projecten afgerond' },
  { n: '10M+', label: 'Bereik gegenereerd' },
  { n: '98%',  label: 'Klanttevredenheid' },
];

export default function AboutPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const hero = useReveal();
  const vals = useReveal();
  const team = useReveal();

  return (
    <div style={{ paddingTop: '80px', background: '#F0EDE6' }}>

      {/* HERO */}
      <div style={{ background: '#080604', padding: 'clamp(5rem,10vw,10rem) clamp(1.5rem,5vw,5rem) clamp(3rem,6vw,6rem)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <span style={{ fontFamily: "'Jost',sans-serif", fontSize: '.55rem', fontWeight: 500, letterSpacing: '.3em', textTransform: 'uppercase', color: '#C5D4C0', display: 'block', marginBottom: '2rem' }}>Over Ons</span>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(3.5rem,8vw,9rem)', color: '#F0EDE6', lineHeight: .88, letterSpacing: '-.04em', margin: '0 0 1.5rem' }}>
            Het verhaal<br /><em style={{ fontStyle: 'italic', color: '#C5D4C0' }}>achter het merk.</em>
          </h1>
        </div>
        <div style={{ position: 'absolute', right: '-3rem', top: '50%', transform: 'translateY(-50%)', fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(14rem,28vw,32rem)', fontWeight: 300, color: 'rgba(197,212,192,.03)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>A</div>
      </div>

      {/* STATS BAR */}
      <div style={{ background: '#3D3426', borderBottom: '1px solid rgba(197,212,192,.08)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(2rem,4vw,4rem) clamp(1.5rem,5vw,5rem)', display: 'grid', gap: '2px' }} className="stats-grid">
          {STATS.map(s => (
            <div key={s.n} style={{ padding: '1.5rem 2rem', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(2rem,4vw,3.5rem)', color: '#F0EDE6', lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontFamily: "'Jost',sans-serif", fontSize: '.5rem', fontWeight: 500, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(197,212,192,.4)', marginTop: '.4rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* VERHAAL — Baris */}
      <div ref={hero.ref} style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,5rem)' }}>
        <div style={{ display: 'grid', gap: 'clamp(3rem,6vw,7rem)', alignItems: 'center' }} className="about-grid">
          <div style={{ overflow: 'hidden', borderRadius: 0 }}>
            <img src={IMG.womanLaptop} style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', objectPosition: 'top center', display: 'block', transform: hero.vis ? 'scale(1)' : 'scale(1.06)', transition: 'transform 1.4s cubic-bezier(.16,1,.3,1)' }} />
          </div>
          <div style={{ opacity: hero.vis ? 1 : 0, transform: hero.vis ? 'none' : 'translateX(30px)', transition: 'all 1s cubic-bezier(.16,1,.3,1) .2s' }}>
            <span style={{ fontFamily: "'Jost',sans-serif", fontSize: '.55rem', fontWeight: 500, letterSpacing: '.25em', textTransform: 'uppercase', color: '#8FA887', display: 'block', marginBottom: '1.5rem' }}>Oprichter</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(2.5rem,5vw,5rem)', color: '#2C2416', lineHeight: .9, letterSpacing: '-.025em', margin: '0 0 2rem' }}>Baris.</h2>
            <div style={{ width: '2rem', height: '1px', background: 'rgba(122,106,82,.2)', marginBottom: '2rem' }} />
            {[
              'Ik ben Baris, oprichter van Aesthetic Social Haus. Na jaren werkzaam te zijn geweest in de e-commerce wereld, zag ik een duidelijk patroon: veel bedrijven investeren in mooie content, maar missen de strategische laag erachter.',
              'Dat frustreerde me. Want met de juiste aanpak — een heldere positionering, consistente uitstraling en gerichte advertenties — kan elk merk opvallen en groeien.',
              'Aesthetic Social Haus is ontstaan uit die overtuiging. Wij werken niet met templates of one-size-fits-all oplossingen. Elk merk dat we begeleiden krijgt een aanpak die bij hem past.',
            ].map((t, i) => (
              <p key={i} style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: '.9rem', color: 'rgba(44,36,22,.65)', lineHeight: 1.9, margin: '0 0 1.1rem' }}>{t}</p>
            ))}
          </div>
        </div>
      </div>

      {/* VERHAAL — Gizem */}
      <div style={{ background: '#3D3426' }}>
        <div ref={team.ref} style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,5rem)' }}>
          <div style={{ display: 'grid', gap: 'clamp(3rem,6vw,7rem)', alignItems: 'center' }} className="about-grid-rev">
            <div style={{ opacity: team.vis ? 1 : 0, transform: team.vis ? 'none' : 'translateX(-30px)', transition: 'all 1s cubic-bezier(.16,1,.3,1) .1s' }}>
              <span style={{ fontFamily: "'Jost',sans-serif", fontSize: '.55rem', fontWeight: 500, letterSpacing: '.25em', textTransform: 'uppercase', color: '#8FA887', display: 'block', marginBottom: '1.5rem' }}>Creatief Directeur</span>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(2.5rem,5vw,5rem)', color: '#F0EDE6', lineHeight: .9, letterSpacing: '-.025em', margin: '0 0 2rem' }}>Gizem.</h2>
              <div style={{ width: '2rem', height: '1px', background: 'rgba(197,212,192,.18)', marginBottom: '2rem' }} />
              {[
                'Ik ben Gizem, creatief directeur en de visuele kracht achter Aesthetic Social Haus. Mijn achtergrond in design en branding helpt ons om strategische ideeën te vertalen naar beelden die blijven hangen.',
                'Voor mij draait alles om authenticiteit. Merken die hun eigen verhaal vertellen, op een manier die visueel klopt — dat is wat mensen onthoudt en vertrouwen wekt.',
                'Samen met Baris vormen we een duo waarbij strategie en creativiteit hand in hand gaan. Dat is precies wat onze klanten nodig hebben.',
              ].map((t, i) => (
                <p key={i} style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: '.9rem', color: 'rgba(197,212,192,.52)', lineHeight: 1.9, margin: '0 0 1.1rem' }}>{t}</p>
              ))}
            </div>
            <div style={{ overflow: 'hidden', transform: team.vis ? 'scale(1)' : 'scale(1.06)', transition: 'transform 1.4s cubic-bezier(.16,1,.3,1) .2s' }}>
              <img src={IMG.womanWindow} style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
            </div>
          </div>
        </div>
      </div>

      {/* WAARDEN */}
      <div ref={vals.ref} style={{ background: '#F0EDE6', padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,5rem)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ marginBottom: 'clamp(3rem,5vw,5rem)', opacity: vals.vis ? 1 : 0, transform: vals.vis ? 'none' : 'translateY(20px)', transition: 'all .8s ease' }}>
            <span style={{ fontFamily: "'Jost',sans-serif", fontSize: '.55rem', fontWeight: 500, letterSpacing: '.3em', textTransform: 'uppercase', color: '#8FA887', display: 'block', marginBottom: '1rem' }}>Onze Waarden</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(2.5rem,5vw,5rem)', color: '#2C2416', lineHeight: .9, letterSpacing: '-.025em', margin: 0 }}>Waar wij voor staan.</h2>
          </div>
          <div style={{ display: 'grid', gap: '2px', background: '#C4B9A8' }} className="vals-grid">
            {VALUES.map((v, i) => (
              <div key={v.n} style={{ background: '#F0EDE6', padding: 'clamp(2.5rem,4vw,4rem)', opacity: vals.vis ? 1 : 0, transform: vals.vis ? 'none' : 'translateY(30px)', transition: `all .8s cubic-bezier(.16,1,.3,1) ${i * .1}s` }}>
                <span style={{ fontFamily: "'Jost',sans-serif", fontSize: '.48rem', fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(122,106,82,.3)', display: 'block', marginBottom: '1.5rem' }}>{v.n}</span>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 'clamp(1.5rem,2.5vw,2.2rem)', color: '#2C2416', lineHeight: 1, margin: '0 0 1rem' }}>{v.title}</h3>
                <p style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: '.85rem', color: 'rgba(44,36,22,.6)', lineHeight: 1.8, margin: 0 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: '#080604', padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,5rem)', textAlign: 'center' }}>
        <span style={{ fontFamily: "'Jost',sans-serif", fontSize: '.55rem', fontWeight: 500, letterSpacing: '.3em', textTransform: 'uppercase', color: '#8FA887', display: 'block', marginBottom: '1.5rem' }}>Werken met ons?</span>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(2.5rem,6vw,6rem)', color: '#F0EDE6', lineHeight: .9, letterSpacing: '-.03em', margin: '0 0 2.5rem' }}>
          Laten we kennismaken.
        </h2>
        <button
          onClick={() => { window.location.href = '/contact'; }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#8FA887'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#C5D4C0'; }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '.7rem', background: '#C5D4C0', color: '#080604', padding: '1.1rem 2.5rem', fontFamily: "'Jost',sans-serif", fontSize: '.63rem', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', transition: 'background .3s' }}>
          Plan een Gesprek <ArrowRight size={12} />
        </button>
      </div>

      <style>{`
        .stats-grid { grid-template-columns: repeat(2,1fr); }
        @media(min-width:700px) { .stats-grid { grid-template-columns: repeat(4,1fr) !important; } }
        .about-grid, .about-grid-rev { grid-template-columns: 1fr; }
        @media(min-width:860px) {
          .about-grid { grid-template-columns: 1fr 1.2fr !important; }
          .about-grid-rev { grid-template-columns: 1.2fr 1fr !important; }
        }
        .vals-grid { grid-template-columns: 1fr; }
        @media(min-width:600px) { .vals-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </div>
  );
}