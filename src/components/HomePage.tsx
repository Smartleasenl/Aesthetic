import { ArrowRight } from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';

/* ─── IMAGES ─── */
const IMG = {
  shopifyBag:    '/images/imgi_1_6913753829bad145499fa973.jpg',
  womanWindow:   '/images/imgi_3_6910d742b133d15c1ee8b05f.png',
  womanLaptop:   '/images/imgi_4_6910e2aed4e8026a1b652185.png',
  linen:         '/images/imgi_5_6910ea39d1ba958698daa8e8.png',
  brandDetail:   '/images/imgi_6_6910f37148a60028a9b8abfe.png',
  workspace:     '/images/imgi_7_6910fb1675ec1e391438b35f.png',
  foundersCouch: '/images/imgi_10_69111394c3a1ea691a145f75.png',
  gizemSolo:     '/images/imgi_11_69111394d4d779cc917e287b.png',
  portMock2:     '/images/imgi_64_6910fbdf0d255178af45837a.png',
};

/* ─── CUSTOM CURSOR ─── */
function Cursor() {
  const dot   = useRef<HTMLDivElement>(null);
  const ring  = useRef<HTMLDivElement>(null);
  const pos   = useRef({ x: 0, y: 0 });
  const ring_ = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dot.current) {
        dot.current.style.transform = `translate(${e.clientX - 4}px,${e.clientY - 4}px)`;
      }
    };
    window.addEventListener('mousemove', move);
    let af: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      ring_.current.x = lerp(ring_.current.x, pos.current.x, 0.12);
      ring_.current.y = lerp(ring_.current.y, pos.current.y, 0.12);
      if (ring.current) {
        ring.current.style.transform = `translate(${ring_.current.x - 20}px,${ring_.current.y - 20}px)`;
      }
      af = requestAnimationFrame(tick);
    };
    tick();
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(af); };
  }, []);

  return (
    <>
      <div ref={dot} style={{
        position:'fixed',top:0,left:0,width:8,height:8,borderRadius:'50%',
        background:'#C5D4C0',pointerEvents:'none',zIndex:9999,
        mixBlendMode:'difference',willChange:'transform',
      }} />
      <div ref={ring} style={{
        position:'fixed',top:0,left:0,width:40,height:40,borderRadius:'50%',
        border:'1px solid rgba(197,212,192,.5)',pointerEvents:'none',zIndex:9998,
        willChange:'transform',
      }} />
    </>
  );
}

/* ─── SCROLL REVEAL HOOK ─── */
function useReveal(threshold = 0.15) {
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

/* ─── MAGNETIC BUTTON ─── */
function MagBtn({ children, onClick, dark }: { children: React.ReactNode; onClick?: () => void; dark?: boolean }) {
  const btn = useRef<HTMLButtonElement>(null);
  const onM = (e: React.MouseEvent) => {
    const el = btn.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.35;
    const y = (e.clientY - r.top  - r.height/ 2) * 0.35;
    el.style.transform = `translate(${x}px,${y}px)`;
  };
  const onL = () => { if (btn.current) btn.current.style.transform = 'translate(0,0)'; };

  return (
    <button ref={btn} onClick={onClick} onMouseMove={onM} onMouseLeave={onL}
      style={{
        display:'inline-flex',alignItems:'center',gap:'.75rem',
        background: dark ? '#C5D4C0' : 'transparent',
        color: dark ? '#080604' : '#C5D4C0',
        padding:'1rem 2.2rem',
        border: dark ? 'none' : '1px solid rgba(197,212,192,.3)',
        fontFamily:"'Jost',sans-serif",fontSize:'.63rem',fontWeight:700,
        letterSpacing:'.2em',textTransform:'uppercase',cursor:'pointer',
        transition:'background .3s ease, transform .6s cubic-bezier(.23,1,.32,1)',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        el.style.background = dark ? '#8FA887' : 'rgba(197,212,192,.08)';
      }}
      onMouseLeave_extra={() => {}}
    >
      {children}
    </button>
  );
}

/* ══════════════════════════════════════════
   HERO — immersive, full viewport, animated
   ══════════════════════════════════════════ */
function Hero() {
  const [tick, setTick] = useState(0);
  const [phase, setPhase] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>(0);

  useEffect(() => {
    const ts = [80,200,700,1300,1900].map((d,i) => setTimeout(() => setPhase(i+1), d));
    return () => ts.forEach(clearTimeout);
  }, []);

  /* canvas orbs */
  useEffect(() => {
    const cv = canvasRef.current; if (!cv) return;
    const ctx = cv.getContext('2d'); if (!ctx) return;
    let fr = 0;
    const sz = () => { cv.width = innerWidth; cv.height = innerHeight; };
    sz(); addEventListener('resize', sz);
    const orbs = [
      {x:.1, y:.25, r:380, sp:.00015, ph:0,   c:'197,212,192'},
      {x:.8, y:.55, r:300, sp:.00020, ph:2.0, c:'61,52,38'   },
      {x:.45,y:.8,  r:260, sp:.00012, ph:4.3, c:'197,212,192'},
      {x:.88,y:.15, r:220, sp:.00024, ph:1.1, c:'61,52,38'   },
      {x:.3, y:.5,  r:180, sp:.00018, ph:3.5, c:'240,237,230'},
    ];
    const draw = () => {
      ctx.clearRect(0,0,cv.width,cv.height); fr++;
      orbs.forEach(o => {
        const bx=o.x*cv.width, by=o.y*cv.height;
        const x=bx+Math.sin(fr*o.sp+o.ph)*120, y=by+Math.cos(fr*o.sp*.65+o.ph)*80;
        const g=ctx.createRadialGradient(x,y,0,x,y,o.r);
        g.addColorStop(0,`rgba(${o.c},.08)`); g.addColorStop(1,`rgba(${o.c},0)`);
        ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,o.r,0,Math.PI*2); ctx.fill();
      });
      raf.current=requestAnimationFrame(draw);
    };
    draw();
    return () => { removeEventListener('resize',sz); cancelAnimationFrame(raf.current); };
  }, []);

  /* number counter */
  useEffect(() => {
    if (phase < 4) return;
    let n = 0;
    const t = setInterval(() => { n += 3; setTick(Math.min(n, 150)); if (n >= 150) clearInterval(t); }, 18);
    return () => clearInterval(t);
  }, [phase]);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const anim = (p: number, delay = 0): React.CSSProperties => ({
    opacity: phase >= p ? 1 : 0,
    transform: phase >= p ? 'none' : 'translateY(40px)',
    transition: `opacity .9s ease ${delay}s, transform 1.1s cubic-bezier(.16,1,.3,1) ${delay}s`,
  });

  return (
    <section style={{ position:'relative', minHeight:'100svh', background:'#080604', display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }} />

      {/* grain */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', opacity:.04,
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* top line */}
      <div style={{ height:'1px', background:'linear-gradient(90deg,transparent,rgba(197,212,192,.45) 30%,rgba(197,212,192,.45) 70%,transparent)', position:'relative', zIndex:5 }} />

      {/* TICKER */}
      <div style={{ overflow:'hidden', borderBottom:'1px solid rgba(197,212,192,.08)', position:'relative', zIndex:5, ...anim(1) }}>
        <div style={{ display:'flex', gap:'3.5rem', padding:'.6rem 0', whiteSpace:'nowrap', animation:'ticker 32s linear infinite' }}>
          {Array(4).fill(['META ADS','✦','CONTENTCREATIE','✦','SOCIAL MEDIA','✦','BRAND STRATEGIE','✦','FOTOGRAFIE','✦','E-MAILFLOWS','✦']).flat().map((t,i) => (
            <span key={i} style={{ fontFamily:"'Jost',sans-serif", fontSize:'.56rem', fontWeight:500, letterSpacing:'.24em', textTransform:'uppercase', color:t==='✦'?'rgba(197,212,192,.6)':'rgba(197,212,192,.22)', flexShrink:0 }}>{t}</span>
          ))}
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'0 clamp(1.5rem,5vw,5rem) clamp(2.5rem,5vh,4rem)', position:'relative', zIndex:5 }}>

        {/* overline */}
        <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'2.5rem', ...anim(2) }}>
          <div style={{ width:'2.5rem', height:'1px', background:'#C5D4C0' }} />
          <span style={{ fontFamily:"'Jost',sans-serif", fontSize:'.55rem', fontWeight:500, letterSpacing:'.3em', textTransform:'uppercase', color:'#C5D4C0' }}>Premium Social Media Agency — Est. 2024</span>
        </div>

        {/* MEGA TYPE */}
        <div style={{ lineHeight:.84, ...anim(2,.1) }}>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:'clamp(5rem,14.5vw,14rem)', letterSpacing:'-.04em', color:'#F0EDE6' }}>
            Wij maken
          </div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontStyle:'italic', fontSize:'clamp(5rem,14.5vw,14rem)', letterSpacing:'-.04em', background:'linear-gradient(125deg,#C5D4C0 0%,#F0EDE6 38%,#8FA887 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
            merken die
          </div>
          <div style={{ display:'flex', alignItems:'flex-end', gap:'clamp(1rem,3vw,3rem)', flexWrap:'wrap' }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:'clamp(5rem,14.5vw,14rem)', letterSpacing:'-.04em', color:'rgba(240,237,230,.11)' }}>
              onthouden worden.
            </div>
            {/* animated counter pill — tucked beside last word */}
            <div style={{ ...anim(4), marginBottom:'clamp(.8rem,1.5vw,1.5rem)', flexShrink:0 }}>
              <div style={{ border:'1px solid rgba(197,212,192,.2)', padding:'.5rem 1.2rem', display:'inline-flex', alignItems:'baseline', gap:'.4rem' }}>
                <span style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:'clamp(1.4rem,2.5vw,2.2rem)', color:'#C5D4C0' }}>{tick}+</span>
                <span style={{ fontFamily:"'Jost',sans-serif", fontSize:'.5rem', letterSpacing:'.2em', color:'rgba(197,212,192,.4)', textTransform:'uppercase' }}>tevreden klanten</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'center', gap:'2rem', marginTop:'3rem', paddingTop:'2rem', borderTop:'1px solid rgba(197,212,192,.08)', ...anim(3,.1) }}>
          <p style={{ fontFamily:"'Jost',sans-serif", fontWeight:300, fontSize:'.9rem', color:'rgba(197,212,192,.45)', lineHeight:1.9, maxWidth:'360px', margin:0 }}>
            Strategieën die ervoor zorgen dat je niet alleen gezien wordt, maar ook{' '}
            <em style={{ fontStyle:'normal', color:'rgba(197,212,192,.85)', fontWeight:400 }}>onthouden</em>.
          </p>
          <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
            <button onClick={() => go('contact')}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='#8FA887'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='#C5D4C0'; }}
              style={{ display:'inline-flex', alignItems:'center', gap:'.7rem', background:'#C5D4C0', color:'#080604', padding:'1rem 2.2rem', fontFamily:"'Jost',sans-serif", fontSize:'.63rem', fontWeight:700, letterSpacing:'.2em', textTransform:'uppercase', border:'none', cursor:'pointer', transition:'background .3s ease' }}>
              Werken Met Ons <ArrowRight size={12} />
            </button>
            <button onClick={() => go('portfolio')}
              onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor='rgba(197,212,192,.5)'; el.style.color='#F0EDE6'; }}
              onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor='rgba(197,212,192,.18)'; el.style.color='rgba(197,212,192,.5)'; }}
              style={{ display:'inline-flex', alignItems:'center', gap:'.7rem', background:'transparent', color:'rgba(197,212,192,.5)', padding:'1rem 2.2rem', fontFamily:"'Jost',sans-serif", fontSize:'.63rem', fontWeight:500, letterSpacing:'.2em', textTransform:'uppercase', border:'1px solid rgba(197,212,192,.18)', cursor:'pointer', transition:'all .3s ease' }}>
              Portfolio
            </button>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div style={{ borderTop:'1px solid rgba(197,212,192,.07)', display:'grid', gridTemplateColumns:'repeat(4,1fr)', position:'relative', zIndex:5, ...anim(4,.2) }}>
        {[['150+','Klanten'],['500+','Projecten'],['10M+','Bereik'],['98%','Tevredenheid']].map(([v,l],i) => (
          <div key={l} style={{ textAlign:'center', padding:'1.5rem .5rem', borderRight: i<3?'1px solid rgba(197,212,192,.06)':'none' }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:'clamp(1.6rem,3vw,2.6rem)', color:'#F0EDE6', lineHeight:1 }}>{v}</div>
            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:'.5rem', letterSpacing:'.22em', color:'rgba(197,212,192,.28)', textTransform:'uppercase', marginTop:'.3rem' }}>{l}</div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-25%)}}
      `}</style>
    </section>
  );
}

/* ══════════════════════════════════════════
   IMAGE REEL  — full-bleed 4-panel collage
   ══════════════════════════════════════════ */
function ImageReel() {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'1.3fr 1fr .7fr .9fr', height:'clamp(240px,35vw,480px)', gap:'2px', background:'#C4B9A8' }}>
      {[
        { src: IMG.womanLaptop,   pos: 'top center' },
        { src: IMG.foundersCouch, pos: 'top center' },
        { src: IMG.linen,         pos: 'center'     },
        { src: IMG.portMock2,     pos: 'center'     },
      ].map(({ src, pos }, i) => (
        <div key={i} style={{ overflow:'hidden', position:'relative' }}>
          <img src={src} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:pos, display:'block', transition:'transform 1s cubic-bezier(.25,.46,.45,.94)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.06)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }} />
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════
   STATEMENT — reveal on scroll
   ══════════════════════════════════════════ */
function Statement() {
  const { ref, vis } = useReveal();
  return (
    <section ref={ref} style={{ background:'#F0EDE6', padding:'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,5rem)' }}>
      <div style={{ maxWidth:'1400px', margin:'0 auto' }}>

        {/* BIG TEXT LEFT + BODY RIGHT */}
        <div style={{ display:'grid', gap:'clamp(3rem,6vw,6rem)', alignItems:'end' }} className="stmt-grid">
          <div style={{ opacity: vis?1:0, transform: vis?'none':'translateY(50px)', transition:'all 1.1s cubic-bezier(.16,1,.3,1)' }}>
            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:'.58rem', fontWeight:500, letterSpacing:'.25em', textTransform:'uppercase', color:'#8FA887', marginBottom:'2rem' }}>Aesthetic Social Haus</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:400, fontSize:'clamp(2.8rem,5.5vw,5.5rem)', color:'#2C2416', lineHeight:1, letterSpacing:'-.025em', margin:0 }}>
              We begrijpen de kracht<br />van een sterk<br />digitaal merk.<br />
              <em style={{ color:'#8FA887', fontWeight:300 }}>Jouw merk verdient meer.</em>
            </h2>
          </div>
          <div style={{ opacity: vis?1:0, transform: vis?'none':'translateY(30px)', transition:'all 1.1s cubic-bezier(.16,1,.3,1) .2s', display:'flex', flexDirection:'column', gap:'2rem' }}>
            <p style={{ fontFamily:"'Jost',sans-serif", fontWeight:300, fontSize:'.95rem', color:'#7A6A52', lineHeight:1.9, margin:0 }}>
              Bij Aesthetic Social Haus ontwikkelen we op maat gemaakte strategieën die ervoor zorgen dat je niet alleen gezien wordt, maar ook onthouden. Onze belofte is simpel: gerichte strategie, hoogwaardige content en resultaten die voor zichzelf spreken.
            </p>
            {/* SERVICES MINI LIST */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'.6rem' }}>
              {['Meta Ads','Contentcreatie','Social Media','Fotografie','Template Design','E-mailflows'].map(s => (
                <div key={s} style={{ display:'flex', alignItems:'center', gap:'.6rem', fontFamily:"'Jost',sans-serif", fontSize:'.75rem', fontWeight:300, color:'#7A6A52' }}>
                  <div style={{ width:'4px', height:'4px', borderRadius:'50%', background:'#C5D4C0', flexShrink:0 }} />
                  {s}
                </div>
              ))}
            </div>
            <button
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.gap = '1.1rem'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.gap = '.6rem'; }}
              style={{ display:'inline-flex', alignItems:'center', gap:'.6rem', fontFamily:"'Jost',sans-serif", fontSize:'.63rem', fontWeight:600, letterSpacing:'.2em', textTransform:'uppercase', color:'#3D3426', background:'none', border:'none', cursor:'pointer', padding:0, transition:'gap .35s ease', width:'fit-content' }}>
              Ontdek Meer <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>
      <style>{`@media(min-width:860px){.stmt-grid{grid-template-columns:1fr 1fr!important}}`}</style>
    </section>
  );
}

/* ══════════════════════════════════════════
   SERVICES — dark accordion rows with images
   ══════════════════════════════════════════ */
const SVC_DATA = [
  { n:'01', t:'Contentcreatie',  d:'Visuele content die stopt met scrollen en converteert naar klanten.',      img: IMG.brandDetail  },
  { n:'02', t:'Template Design', d:'On-brand Canva templates voor een consistente en professionele feed.',      img: IMG.portMock2    },
  { n:'03', t:'Social Media',    d:'Volledig kanaalbe­heer — van strategie tot community management.',          img: IMG.workspace    },
  { n:'04', t:'Fotografie',      d:'Professionele brand shoots voor een authentieke en premium uitstraling.',   img: IMG.womanWindow  },
  { n:'05', t:'Meta Ads',        d:'Gerichte campagnes die meetbare leads genereren en ROAS leveren.',          img: IMG.shopifyBag   },
  { n:'06', t:'E-mailflows',     d:'Geautomatiseerde e-mail sequences die converteren terwijl jij slaapt.',     img: IMG.linen        },
];

function Services() {
  const [hov, setHov] = useState<number | null>(null);
  const [imgPos, setImgPos] = useState({ x: 0, y: 0 });
  const { ref, vis } = useReveal();

  const onMove = useCallback((e: React.MouseEvent) => {
    setImgPos({ x: e.clientX + 20, y: e.clientY - 80 });
  }, []);

  return (
    <section id="services" ref={ref} style={{ background:'#0D0B08', position:'relative' }}>

      {/* floating image on hover */}
      {hov !== null && (
        <div style={{
          position:'fixed', left: imgPos.x, top: imgPos.y,
          width:220, height:280, pointerEvents:'none', zIndex:100,
          opacity: hov !== null ? 1 : 0, transition:'opacity .3s ease',
          boxShadow:'0 30px 80px rgba(0,0,0,.6)',
          overflow:'hidden',
        }}>
          <img src={SVC_DATA[hov].img} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }} />
        </div>
      )}

      {/* HEADER */}
      <div style={{ maxWidth:'1400px', margin:'0 auto', padding:'clamp(4rem,7vw,7rem) clamp(1.5rem,5vw,5rem) 2.5rem' }}>
        <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'flex-end', gap:'2rem', opacity:vis?1:0, transform:vis?'none':'translateY(40px)', transition:'all 1s ease' }}>
          <div>
            <span style={{ fontFamily:"'Jost',sans-serif", fontSize:'.58rem', fontWeight:500, letterSpacing:'.25em', textTransform:'uppercase', color:'#8FA887', display:'block', marginBottom:'1.2rem' }}>Wat Wij Doen</span>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:'clamp(3rem,6vw,6.5rem)', color:'#F0EDE6', lineHeight:.88, letterSpacing:'-.03em', margin:0 }}>
              Alles onder<br /><em>één dak.</em>
            </h2>
          </div>
          <p style={{ fontFamily:"'Jost',sans-serif", fontWeight:300, fontSize:'.88rem', color:'rgba(197,212,192,.35)', lineHeight:1.85, maxWidth:'280px', margin:0 }}>
            Van strategie tot uitvoering — wij zijn het verlengstuk van jouw merk.
          </p>
        </div>
      </div>

      <div style={{ borderTop:'1px solid rgba(197,212,192,.06)' }} onMouseMove={onMove}>
        {SVC_DATA.map((s, i) => (
          <div key={s.n}
            onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
            style={{ borderBottom:'1px solid rgba(197,212,192,.06)', cursor:'none', background: hov===i?'rgba(197,212,192,.025)':'transparent', transition:'background .2s ease' }}>
            <div style={{ maxWidth:'1400px', margin:'0 auto', padding:'clamp(1rem,2.2vh,1.6rem) clamp(1.5rem,5vw,5rem)', display:'grid', gridTemplateColumns:'3rem 1fr auto', alignItems:'center', gap:'1.5rem' }}>
              <span style={{ fontFamily:"'Jost',sans-serif", fontSize:'.52rem', letterSpacing:'.18em', color: hov===i?'rgba(197,212,192,.5)':'rgba(197,212,192,.18)', fontWeight:500, transition:'color .2s' }}>{s.n}</span>
              <div style={{ display:'flex', alignItems:'baseline', flexWrap:'wrap', gap:'.4rem 3rem' }}>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:400, fontSize:'clamp(1.5rem,2.6vw,2.5rem)', color: hov===i?'#F0EDE6':'rgba(240,237,230,.65)', margin:0, lineHeight:1, transition:'color .2s ease' }}>{s.t}</h3>
                <p style={{ fontFamily:"'Jost',sans-serif", fontWeight:300, fontSize:'.82rem', color: hov===i?'rgba(197,212,192,.5)':'rgba(197,212,192,.18)', margin:0, lineHeight:1.6, transition:'color .2s ease' }}>{s.d}</p>
              </div>
              <div style={{ width:'1.8rem', height:'1.8rem', border:'1px solid rgba(197,212,192,.12)', display:'flex', alignItems:'center', justifyContent:'center', transform: hov===i?'rotate(45deg)':'rotate(0)', transition:'transform .35s ease', flexShrink:0 }}>
                <span style={{ color:'rgba(197,212,192,.35)', fontSize:'.65rem', lineHeight:1 }}>↗</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ height:'clamp(3rem,5vw,5rem)' }} />
    </section>
  );
}

/* ══════════════════════════════════════════
   FOUNDERS  — dramatic 50/50 split
   ══════════════════════════════════════════ */
function Founders() {
  const { ref, vis } = useReveal();
  return (
    <section ref={ref} style={{ display:'grid' }} className="found-grid">
      {/* IMAGE SIDE */}
      <div style={{ position:'relative', overflow:'hidden', minHeight:'clamp(500px,60vw,800px)' }}>
        <img src={IMG.foundersCouch} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center', display:'block', transform: vis?'scale(1)':'scale(1.08)', transition:'transform 1.4s cubic-bezier(.16,1,.3,1)' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,.4) 0%,transparent 60%)' }} />
        {/* badge */}
        <div style={{ position:'absolute', top:'2rem', left:'2rem', background:'rgba(61,52,38,.88)', backdropFilter:'blur(16px)', padding:'.5rem 1.1rem', border:'1px solid rgba(197,212,192,.15)' }}>
          <span style={{ fontFamily:"'Jost',sans-serif", fontSize:'.5rem', letterSpacing:'.25em', textTransform:'uppercase', color:'#C5D4C0', fontWeight:500 }}>The Founders</span>
        </div>
        {/* floating portrait */}
        <div style={{ position:'absolute', bottom:'2.5rem', right:'2.5rem', width:'clamp(80px,11vw,140px)', border:'3px solid #F0EDE6', overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,.4)', opacity: vis?1:0, transform: vis?'translateY(0)':'translateY(20px)', transition:'all 1s ease .4s' }}>
          <img src={IMG.gizemSolo} style={{ width:'100%', aspectRatio:'3/4', objectFit:'cover', display:'block' }} />
        </div>
      </div>

      {/* TEXT SIDE */}
      <div style={{ background:'#3D3426', padding:'clamp(4rem,7vw,8rem) clamp(2.5rem,6vw,7rem)', display:'flex', flexDirection:'column', justifyContent:'center', opacity: vis?1:0, transform: vis?'none':'translateX(40px)', transition:'all 1.1s cubic-bezier(.16,1,.3,1) .15s' }}>
        <span style={{ fontFamily:"'Jost',sans-serif", fontSize:'.58rem', fontWeight:500, letterSpacing:'.25em', textTransform:'uppercase', color:'#8FA887', display:'block', marginBottom:'2rem' }}>Meet The Team</span>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:400, fontSize:'clamp(3rem,5vw,5.5rem)', color:'#F0EDE6', lineHeight:.88, letterSpacing:'-.025em', margin:'0 0 .15em' }}>Baris</h2>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontStyle:'italic', fontSize:'clamp(3rem,5vw,5.5rem)', color:'#C5D4C0', lineHeight:.88, letterSpacing:'-.025em', margin:'0 0 2.5rem' }}>&amp; Gizem.</h2>
        <div style={{ width:'2.5rem', height:'1px', background:'rgba(197,212,192,.2)', marginBottom:'2.5rem' }} />
        {[
          'Ik ben Baris, oprichter van Aesthetic Social Haus. Na jaren in de e-commerce wereld ontdekte ik dat veel bedrijven zich focussen op mooie content, maar de strategie erachter missen.',
          'Niet lang daarna sloot Gizem zich aan — mijn vrouw en het creatieve hart achter het merk. Met haar oog voor detail brengt ze onze ideeën tot leven.',
          'Samen bouwen we dagelijks aan merken die opvallen, onthouden worden en vertrouwen uitstralen.',
        ].map((t,i) => (
          <p key={i} style={{ fontFamily:"'Jost',sans-serif", fontWeight:300, fontSize:'.88rem', color:'rgba(197,212,192,.55)', lineHeight:1.9, margin:'0 0 1rem' }}>{t}</p>
        ))}
        <button
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior:'smooth' })}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='#8FA887'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='#C5D4C0'; }}
          style={{ display:'inline-flex', alignItems:'center', gap:'.7rem', background:'#C5D4C0', color:'#080604', padding:'1rem 2rem', fontFamily:"'Jost',sans-serif", fontSize:'.63rem', fontWeight:700, letterSpacing:'.2em', textTransform:'uppercase', border:'none', cursor:'pointer', transition:'background .3s ease', width:'fit-content', marginTop:'1.5rem' }}>
          Werk Met Ons <ArrowRight size={12} />
        </button>
      </div>

      <style>{`.found-grid{grid-template-columns:1fr}@media(min-width:860px){.found-grid{grid-template-columns:1fr 1fr!important}}`}</style>
    </section>
  );
}

/* ══════════════════════════════════════════
   TESTIMONIAL
   ══════════════════════════════════════════ */
function Testimonial() {
  const { ref, vis } = useReveal();
  return (
    <section ref={ref} style={{ background:'#080604', padding:'clamp(6rem,11vw,11rem) clamp(1.5rem,5vw,5rem)', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:'-1rem', left:'clamp(1rem,4vw,4rem)', fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(10rem,20vw,20rem)', color:'rgba(197,212,192,.03)', lineHeight:1, pointerEvents:'none', userSelect:'none', fontWeight:300 }}>"</div>
      <div style={{ maxWidth:'820px', margin:'0 auto', textAlign:'center', position:'relative', zIndex:1, opacity: vis?1:0, transform: vis?'none':'translateY(40px)', transition:'all 1.1s ease' }}>
        <div style={{ display:'flex', justifyContent:'center', gap:'.3rem', marginBottom:'2.5rem' }}>
          {[...Array(5)].map((_,i) => <span key={i} style={{ color:'#C5D4C0', fontSize:'.7rem' }}>★</span>)}
        </div>
        <blockquote style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontStyle:'italic', fontSize:'clamp(1.65rem,3.2vw,2.7rem)', color:'#F0EDE6', lineHeight:1.52, margin:'0 0 3rem', letterSpacing:'-.01em' }}>
          "Werken met Baris en het team van Aesthetic Social Haus heeft mijn bedrijf volledig veranderd. Social media is nu een echte groeistrategie. Ik kan ze aan iedereen aanbevelen die klaar is om zijn merk naar het volgende niveau te tillen."
        </blockquote>
        <div style={{ width:'2rem', height:'1px', background:'rgba(197,212,192,.2)', margin:'0 auto 1.5rem' }} />
        <p style={{ fontFamily:"'Jost',sans-serif", fontSize:'.6rem', letterSpacing:'.22em', color:'#8FA887', textTransform:'uppercase', margin:0 }}>Lara van der Veen — Lara Beauty Clinic</p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   PORTFOLIO  — staggered reveal grid
   ══════════════════════════════════════════ */
const PORT = [
  { img: IMG.womanLaptop,  label:'Brand Strategie',   client:'Lifestyle Merk',  tall:true  },
  { img: IMG.portMock2,    label:'Social Templates',  client:'E-commerce Brand',tall:false },
  { img: IMG.brandDetail,  label:'Content Creatie',   client:'Fashion Label',   tall:false },
  { img: IMG.workspace,    label:'Brand Identity',    client:'Beauty Clinic',   tall:true  },
  { img: IMG.shopifyBag,   label:'Campagne Creatie',  client:'Online Retailer', tall:false },
  { img: IMG.womanWindow,  label:'Meta Ads Creative', client:'Salon & Spa',     tall:false },
];

function Portfolio() {
  const { ref, vis } = useReveal(.1);
  return (
    <section id="portfolio" ref={ref} style={{ background:'#F0EDE6', paddingBottom:'clamp(4rem,8vw,8rem)' }}>
      <div style={{ maxWidth:'1400px', margin:'0 auto', padding:'clamp(4rem,7vw,7rem) clamp(1.5rem,5vw,5rem) 2.5rem' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:'1.5rem', opacity:vis?1:0, transform:vis?'none':'translateY(30px)', transition:'all 1s ease' }}>
          <div>
            <span style={{ fontFamily:"'Jost',sans-serif", fontSize:'.58rem', fontWeight:500, letterSpacing:'.25em', textTransform:'uppercase', color:'#8FA887', display:'block', marginBottom:'1rem' }}>Portfolio</span>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:400, fontSize:'clamp(2.8rem,5.5vw,5.5rem)', color:'#2C2416', lineHeight:.88, letterSpacing:'-.025em', margin:0 }}>
              Uitgelichte<br /><em>Designs</em>
            </h2>
          </div>
          <button
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.gap='1rem'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.gap='.5rem'; }}
            style={{ display:'inline-flex', alignItems:'center', gap:'.5rem', fontFamily:"'Jost',sans-serif", fontSize:'.63rem', fontWeight:500, letterSpacing:'.18em', textTransform:'uppercase', color:'#3D3426', background:'none', border:'none', cursor:'pointer', padding:0, transition:'gap .3s ease' }}>
            Bekijk Alles <ArrowRight size={12} />
          </button>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'3px', background:'#DDD8CF' }} className="port-grid">
        {PORT.map(({ img, label, client, tall }, i) => (
          <div key={label}
            className={tall ? 'p-tall' : 'p-norm'}
            style={{ position:'relative', overflow:'hidden', cursor:'pointer', opacity: vis?1:0, transform: vis?'none':'translateY(30px)', transition:`opacity .8s ease ${i*.08}s, transform .9s cubic-bezier(.16,1,.3,1) ${i*.08}s` }}>
            <img src={img} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center', display:'block', transition:'transform .8s cubic-bezier(.25,.46,.45,.94)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='scale(1.07)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform='scale(1)'; }} />
            <div className="p-ov" style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(13,11,8,.9) 0%,transparent 55%)', opacity:0, transition:'opacity .4s ease' }} />
            <div className="p-lb" style={{ position:'absolute', bottom:0, left:0, right:0, padding:'1.5rem', opacity:0, transform:'translateY(8px)', transition:'all .4s ease' }}>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.2rem', color:'#F0EDE6', fontWeight:400, margin:'0 0 .15rem' }}>{label}</p>
              <p style={{ fontFamily:"'Jost',sans-serif", fontSize:'.52rem', letterSpacing:'.14em', color:'rgba(197,212,192,.6)', textTransform:'uppercase', margin:0 }}>{client}</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .p-norm{aspect-ratio:4/5}
        .p-tall{grid-row:span 2;min-height:clamp(360px,52vw,660px)}
        .port-grid>.p-norm:hover .p-ov,.port-grid>.p-tall:hover .p-ov{opacity:1!important}
        .port-grid>.p-norm:hover .p-lb,.port-grid>.p-tall:hover .p-lb{opacity:1!important;transform:translateY(0)!important}
        @media(max-width:680px){.port-grid{grid-template-columns:1fr 1fr!important}.p-tall{grid-row:span 1;aspect-ratio:4/5;min-height:0}}
      `}</style>
    </section>
  );
}

/* ══════════════════════════════════════════
   MEDIA LOGOS — horizontal with dividers
   ══════════════════════════════════════════ */
function MediaLogos() {
  const { ref, vis } = useReveal();
  return (
    <div ref={ref} style={{ background:'#F0EDE6', borderTop:'1px solid #DDD8CF', padding:'2.5rem clamp(1.5rem,5vw,5rem)', opacity: vis?1:0, transition:'opacity 1s ease' }}>
      <div style={{ maxWidth:'1400px', margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1.5rem' }}>
        <p style={{ fontFamily:"'Jost',sans-serif", fontSize:'.52rem', fontWeight:500, letterSpacing:'.28em', textTransform:'uppercase', color:'#C4B9A8', margin:0 }}>Klanten Verschenen In</p>
        <div style={{ display:'flex', alignItems:'center', gap:'clamp(2rem,4vw,4rem)', flexWrap:'wrap' }}>
          {['VOGUE','ELLE','BAZAAR','JAN'].map(m => (
            <span key={m}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color='#7A6A52'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color='#C4B9A8'; }}
              style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:'clamp(1.2rem,2.2vw,2rem)', color:'#C4B9A8', letterSpacing:'.06em', transition:'color .3s ease', cursor:'default' }}>
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   CTA BANNER — full photo, left text
   ══════════════════════════════════════════ */
function CTABanner() {
  const { ref, vis } = useReveal();
  return (
    <section ref={ref} style={{ position:'relative', overflow:'hidden', minHeight:'clamp(460px,52vw,660px)', display:'flex', alignItems:'center' }}>
      <img src={IMG.womanWindow} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 25%', display:'block', transform: vis?'scale(1)':'scale(1.06)', transition:'transform 1.6s cubic-bezier(.16,1,.3,1)' }} />
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(115deg,rgba(8,6,4,.92) 0%,rgba(44,36,22,.68) 55%,rgba(8,6,4,.3) 100%)' }} />
      <div style={{ position:'relative', zIndex:1, padding:'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,5rem)', maxWidth:'1400px', margin:'0 auto', width:'100%' }}>
        <div style={{ maxWidth:'620px', opacity: vis?1:0, transform: vis?'none':'translateY(40px)', transition:'all 1.1s ease .1s' }}>
          <span style={{ fontFamily:"'Jost',sans-serif", fontSize:'.55rem', fontWeight:500, letterSpacing:'.3em', textTransform:'uppercase', color:'#8FA887', display:'block', marginBottom:'2rem' }}>Vrijblijvend gesprek</span>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:'clamp(3rem,7.5vw,7rem)', color:'#F0EDE6', lineHeight:.88, letterSpacing:'-.03em', margin:'0 0 2.5rem' }}>
            Klaar om je<br />merk te<br /><em style={{ color:'#C5D4C0' }}>transformeren?</em>
          </h2>
          <p style={{ fontFamily:"'Jost',sans-serif", fontWeight:300, fontSize:'.9rem', color:'rgba(197,212,192,.5)', lineHeight:1.85, maxWidth:'400px', margin:'0 0 3rem' }}>
            Wil je een opvallende online aanwezigheid creëren? Met onze expertise bouw je een krachtige strategie die zorgt voor groei op de lange termijn.
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior:'smooth' })}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='#8FA887'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='#C5D4C0'; }}
            style={{ display:'inline-flex', alignItems:'center', gap:'.8rem', background:'#C5D4C0', color:'#080604', padding:'1.1rem 2.5rem', fontFamily:"'Jost',sans-serif", fontSize:'.68rem', fontWeight:700, letterSpacing:'.2em', textTransform:'uppercase', border:'none', cursor:'pointer', transition:'background .3s ease' }}>
            Werken Met Ons <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   EXPORT
   ══════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <Cursor />
      <Hero />
      <ImageReel />
      <Statement />
      <Services />
      <Founders />
      <Testimonial />
      <Portfolio />
      <MediaLogos />
      <CTABanner />
    </>
  );
}