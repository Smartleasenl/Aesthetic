import { ArrowRight } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

const IMG = {
  shopifyBag:     '/images/imgi_1_6913753829bad145499fa973.jpg',
  portfolioMock:  '/images/imgi_2_690d00875c1881a6bfeeb56d.png',
  womanWindow:    '/images/imgi_3_6910d742b133d15c1ee8b05f.png',
  womanLaptop:    '/images/imgi_4_6910e2aed4e8026a1b652185.png',
  linen:          '/images/imgi_5_6910ea39d1ba958698daa8e8.png',
  brandDetail:    '/images/imgi_6_6910f37148a60028a9b8abfe.png',
  workspace:      '/images/imgi_7_6910fb1675ec1e391438b35f.png',
  foundersCouch:  '/images/imgi_10_69111394c3a1ea691a145f75.png',
  gizemSolo:      '/images/imgi_11_69111394d4d779cc917e287b.png',
  portfolioMock2: '/images/imgi_64_6910fbdf0d255178af45837a.png',
};

/* ──────────────────────────────────────────
   HERO
   ────────────────────────────────────────── */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>(0);

  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  useEffect(() => {
    const cv = canvasRef.current; if (!cv) return;
    const ctx = cv.getContext('2d'); if (!ctx) return;
    let fr = 0;
    const sz = () => { cv.width = innerWidth; cv.height = innerHeight; };
    sz(); addEventListener('resize', sz);
    const orbs = [
      { x:.15, y:.3,  r:320, sp:.00018, ph:0,   c:'197,212,192' },
      { x:.75, y:.6,  r:280, sp:.00022, ph:2.1, c:'61,52,38'    },
      { x:.5,  y:.85, r:240, sp:.00015, ph:4.4, c:'197,212,192' },
      { x:.9,  y:.2,  r:200, sp:.00025, ph:1.2, c:'61,52,38'    },
    ];
    const tick = () => {
      ctx.clearRect(0,0,cv.width,cv.height); fr++;
      orbs.forEach(o => {
        const bx = o.x*cv.width, by = o.y*cv.height;
        const x = bx + Math.sin(fr*o.sp+o.ph)*100;
        const y = by + Math.cos(fr*o.sp*.6+o.ph)*70;
        const g = ctx.createRadialGradient(x,y,0,x,y,o.r);
        g.addColorStop(0,`rgba(${o.c},.09)`);
        g.addColorStop(1,`rgba(${o.c},0)`);
        ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,o.r,0,Math.PI*2); ctx.fill();
      });
      raf.current=requestAnimationFrame(tick);
    };
    tick();
    return () => { removeEventListener('resize',sz); cancelAnimationFrame(raf.current); };
  }, []);

  return (
    <section style={{
      position:'relative', minHeight:'100svh', background:'#080604',
      display:'flex', flexDirection:'column', overflow:'hidden',
    }}>
      <canvas ref={canvasRef} style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}} />

      {/* grain overlay */}
      <div style={{position:'absolute',inset:0,pointerEvents:'none',opacity:.045,
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`}} />

      {/* sage accent line top */}
      <div style={{height:'1px',background:'linear-gradient(90deg,transparent,rgba(197,212,192,.5) 40%,rgba(197,212,192,.5) 60%,transparent)',position:'relative',zIndex:5}} />

      {/* ticker */}
      <div style={{overflow:'hidden',borderBottom:'1px solid rgba(197,212,192,.1)',position:'relative',zIndex:5}}>
        <div style={{display:'flex',gap:'3rem',padding:'.65rem 0',animation:'ticker 28s linear infinite',whiteSpace:'nowrap'}}>
          {Array(3).fill(['META ADS','✦','CONTENTCREATIE','✦','SOCIAL MEDIA','✦','BRAND STRATEGIE','✦','FOTOGRAFIE','✦','E-MAILFLOWS','✦']).flat().map((t,i) => (
            <span key={i} style={{fontFamily:"'Jost',sans-serif",fontSize:'.58rem',fontWeight:500,letterSpacing:'.22em',textTransform:'uppercase',color:t==='✦'?'rgba(197,212,192,.7)':'rgba(197,212,192,.28)',flexShrink:0}}>{t}</span>
          ))}
        </div>
      </div>

      {/* HERO BODY */}
      <div style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'flex-end',padding:'0 clamp(1.5rem,5vw,5rem) clamp(3rem,6vh,5rem)',position:'relative',zIndex:5}}>
        {/* overline */}
        <div style={{
          display:'flex',alignItems:'center',gap:'1rem',marginBottom:'2.5rem',
          opacity:loaded?1:0,transform:loaded?'none':'translateY(10px)',transition:'all .7s ease',
        }}>
          <div style={{width:'2.5rem',height:'1px',background:'#C5D4C0'}} />
          <span style={{fontFamily:"'Jost',sans-serif",fontSize:'.57rem',fontWeight:500,letterSpacing:'.28em',textTransform:'uppercase',color:'#C5D4C0'}}>Premium Marketing Agency — Est. 2024</span>
        </div>

        {/* HEADLINE */}
        <div style={{
          opacity:loaded?1:0,transform:loaded?'none':'translateY(50px)',
          transition:'all 1.3s cubic-bezier(.16,1,.3,1) .1s',
        }}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,lineHeight:.86,
            fontSize:'clamp(5.5rem,15vw,14.5rem)',letterSpacing:'-.035em',color:'#F0EDE6'}}>
            Wij maken
          </div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontStyle:'italic',lineHeight:.86,
            fontSize:'clamp(5.5rem,15vw,14.5rem)',letterSpacing:'-.035em',
            background:'linear-gradient(120deg,#C5D4C0 0%,#E8E3D8 40%,#8FA887 100%)',
            WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
            merken die
          </div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,lineHeight:.86,
            fontSize:'clamp(5.5rem,15vw,14.5rem)',letterSpacing:'-.035em',
            color:'rgba(240,237,230,.12)'}}>
            onthouden worden.
          </div>
        </div>

        {/* bottom row */}
        <div style={{
          display:'flex',flexWrap:'wrap',alignItems:'center',justifyContent:'space-between',
          gap:'2rem',marginTop:'clamp(2.5rem,5vh,4.5rem)',paddingTop:'2rem',
          borderTop:'1px solid rgba(197,212,192,.1)',
          opacity:loaded?1:0,transform:loaded?'none':'translateY(20px)',
          transition:'all .9s ease .5s',
        }}>
          <p style={{fontFamily:"'Jost',sans-serif",fontWeight:300,fontSize:'.9rem',
            color:'rgba(197,212,192,.5)',lineHeight:1.85,maxWidth:'380px',margin:0}}>
            Strategieën die ervoor zorgen dat je niet alleen gezien wordt, maar ook{' '}
            <span style={{color:'#C5D4C0',fontWeight:400}}>onthouden</span>.
          </p>
          <div style={{display:'flex',gap:'1rem',flexWrap:'wrap'}}>
            <button
              onClick={()=>document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='#8FA887'}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='#C5D4C0'}}
              style={{display:'flex',alignItems:'center',gap:'.7rem',background:'#C5D4C0',color:'#080604',
                padding:'1rem 2rem',fontFamily:"'Jost',sans-serif",fontSize:'.63rem',fontWeight:700,
                letterSpacing:'.2em',textTransform:'uppercase',border:'none',cursor:'pointer',
                transition:'background .3s ease'}}>
              Werken Met Ons <ArrowRight size={12} />
            </button>
            <button
              onClick={()=>document.getElementById('portfolio')?.scrollIntoView({behavior:'smooth'})}
              onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.color='#F0EDE6';el.style.borderColor='rgba(197,212,192,.5)'}}
              onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.color='rgba(197,212,192,.5)';el.style.borderColor='rgba(197,212,192,.18)'}}
              style={{display:'flex',alignItems:'center',gap:'.7rem',background:'transparent',
                color:'rgba(197,212,192,.5)',padding:'1rem 2rem',fontFamily:"'Jost',sans-serif",
                fontSize:'.63rem',fontWeight:500,letterSpacing:'.2em',textTransform:'uppercase',
                border:'1px solid rgba(197,212,192,.18)',cursor:'pointer',transition:'all .3s ease'}}>
              Portfolio
            </button>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div style={{
        borderTop:'1px solid rgba(197,212,192,.08)',display:'grid',
        gridTemplateColumns:'repeat(4,1fr)',position:'relative',zIndex:5,
        opacity:loaded?1:0,transition:'opacity 1s ease .8s',
      }}>
        {[['150+','Tevreden klanten'],['500+','Projecten'],['10M+','Bereik'],['98%','Tevredenheid']].map(([v,l],i) => (
          <div key={l} style={{textAlign:'center',padding:'1.6rem 1rem',
            borderRight:i<3?'1px solid rgba(197,212,192,.06)':'none'}}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:'clamp(1.8rem,3.5vw,2.8rem)',color:'#F0EDE6',lineHeight:1}}>{v}</div>
            <div style={{fontFamily:"'Jost',sans-serif",fontSize:'.52rem',letterSpacing:'.22em',color:'rgba(197,212,192,.3)',textTransform:'uppercase',marginTop:'.35rem'}}>{l}</div>
          </div>
        ))}
      </div>

      <style>{`@keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-33.33%)}}`}</style>
    </section>
  );
}

/* ──────────────────────────────────────────
   COLLAGE STRIP
   ────────────────────────────────────────── */
function CollageStrip() {
  return (
    <div style={{display:'grid',gridTemplateColumns:'1.2fr 1fr .8fr 1fr',height:'clamp(260px,36vw,500px)',gap:'2px',background:'#DDD8CF'}}>
      {[IMG.womanLaptop, IMG.foundersCouch, IMG.linen, IMG.portfolioMock2].map((src,i) => (
        <div key={i} style={{overflow:'hidden'}}>
          <img src={src} style={{
            width:'100%',height:'100%',objectFit:'cover',
            objectPosition:i===1?'top center':'center',
            transition:'transform .9s cubic-bezier(.25,.46,.45,.94)',display:'block',
          }}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform='scale(1.05)'}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform='scale(1)'}} />
        </div>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────
   STATEMENT
   ────────────────────────────────────────── */
function Statement() {
  return (
    <section style={{background:'#F0EDE6',padding:'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,5rem)'}}>
      <div style={{maxWidth:'1400px',margin:'0 auto',display:'grid',gap:'4rem',alignItems:'end'}} className="stmt-grid">
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:400,
          fontSize:'clamp(2.8rem,5.5vw,5.5rem)',color:'#2C2416',lineHeight:1.02,
          letterSpacing:'-.025em',margin:0}}>
          We begrijpen de kracht<br />van een sterk digitaal merk.<br />
          <em style={{color:'#8FA887',fontWeight:300}}>Jouw merk verdient meer.</em>
        </h2>
        <div style={{display:'flex',flexDirection:'column',gap:'2rem'}}>
          <p style={{fontFamily:"'Jost',sans-serif",fontWeight:300,fontSize:'.95rem',color:'#7A6A52',lineHeight:1.9,margin:0}}>
            Bij Aesthetic Social Haus ontwikkelen we op maat gemaakte strategieën die ervoor zorgen dat je niet alleen gezien wordt, maar ook onthouden. Onze belofte is simpel: gerichte strategie, hoogwaardige content en resultaten die voor zichzelf spreken.
          </p>
          <button
            onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.gap='1rem'}}
            onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.gap='.6rem'}}
            style={{display:'inline-flex',alignItems:'center',gap:'.6rem',fontFamily:"'Jost',sans-serif",
              fontSize:'.63rem',fontWeight:600,letterSpacing:'.2em',textTransform:'uppercase',
              color:'#3D3426',background:'none',border:'none',cursor:'pointer',padding:0,
              transition:'gap .3s ease',width:'fit-content'}}>
            Ontdek Meer <ArrowRight size={12} />
          </button>
        </div>
      </div>
      <style>{`@media(min-width:860px){.stmt-grid{grid-template-columns:1fr 1fr!important}}`}</style>
    </section>
  );
}

/* ──────────────────────────────────────────
   SERVICES
   ────────────────────────────────────────── */
function Services() {
  const [hov, setHov] = useState<number|null>(null);
  const list = [
    {n:'01',t:'Contentcreatie',  d:'Visuele content die stopt met scrollen en converteert.'},
    {n:'02',t:'Template Design', d:'On-brand templates voor een consistente en professionele feed.'},
    {n:'03',t:'Social Media',    d:'Volledig beheer van je kanalen — van strategie tot community.'},
    {n:'04',t:'Fotografie',      d:'Professionele brand shoots voor een authentieke uitstraling.'},
    {n:'05',t:'Meta Ads',        d:'Gerichte campagnes die meetbare leads en ROAS leveren.'},
    {n:'06',t:'E-mailflows',     d:'Geautomatiseerde flows die converteren terwijl jij slaapt.'},
  ];

  return (
    <section id="services" style={{background:'#0D0B08'}}>
      <div style={{maxWidth:'1400px',margin:'0 auto',padding:'clamp(4rem,7vw,7rem) clamp(1.5rem,5vw,5rem) 2rem'}}>
        <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-between',alignItems:'flex-end',gap:'2rem'}}>
          <div>
            <span style={{fontFamily:"'Jost',sans-serif",fontSize:'.58rem',fontWeight:500,letterSpacing:'.25em',textTransform:'uppercase',color:'#8FA887',display:'block',marginBottom:'1.2rem'}}>Wat Wij Doen</span>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,
              fontSize:'clamp(3rem,6vw,6.5rem)',color:'#F0EDE6',lineHeight:.9,
              letterSpacing:'-.03em',margin:0}}>
              Alles onder<br /><em>één dak.</em>
            </h2>
          </div>
          <p style={{fontFamily:"'Jost',sans-serif",fontWeight:300,fontSize:'.88rem',
            color:'rgba(197,212,192,.4)',lineHeight:1.85,maxWidth:'300px',margin:0}}>
            Van strategie tot uitvoering — wij zijn het verlengstuk van jouw merk.
          </p>
        </div>
      </div>
      <div style={{borderTop:'1px solid rgba(197,212,192,.07)'}}>
        {list.map((s,i) => (
          <div key={s.n}
            onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
            style={{borderBottom:'1px solid rgba(197,212,192,.07)',cursor:'pointer',
              background:hov===i?'rgba(197,212,192,.03)':'transparent',transition:'background .25s ease'}}>
            <div style={{maxWidth:'1400px',margin:'0 auto',
              padding:'clamp(1.2rem,2.5vh,1.8rem) clamp(1.5rem,5vw,5rem)',
              display:'grid',gridTemplateColumns:'3.5rem 1fr 2.5rem',alignItems:'center',gap:'1.5rem'}}>
              <span style={{fontFamily:"'Jost',sans-serif",fontSize:'.55rem',letterSpacing:'.18em',
                color:hov===i?'rgba(197,212,192,.45)':'rgba(197,212,192,.2)',fontWeight:500,transition:'color .25s ease'}}>{s.n}</span>
              <div style={{display:'flex',alignItems:'baseline',flexWrap:'wrap',gap:'.5rem 2.5rem'}}>
                <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:400,
                  fontSize:'clamp(1.6rem,2.8vw,2.6rem)',
                  color:hov===i?'#F0EDE6':'rgba(240,237,230,.7)',
                  margin:0,lineHeight:1,transition:'color .25s ease'}}>{s.t}</h3>
                <p style={{fontFamily:"'Jost',sans-serif",fontWeight:300,fontSize:'.83rem',
                  color:hov===i?'rgba(197,212,192,.55)':'rgba(197,212,192,.22)',
                  margin:0,lineHeight:1.6,transition:'color .25s ease'}}>{s.d}</p>
              </div>
              <div style={{
                width:'2rem',height:'2rem',border:'1px solid rgba(197,212,192,.15)',
                display:'flex',alignItems:'center',justifyContent:'center',
                transform:hov===i?'rotate(45deg)':'rotate(0)',transition:'transform .3s ease',flexShrink:0,
              }}>
                <span style={{color:'rgba(197,212,192,.4)',fontSize:'.75rem'}}>↗</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{height:'clamp(3rem,5vw,5rem)'}} />
    </section>
  );
}

/* ──────────────────────────────────────────
   FOUNDERS
   ────────────────────────────────────────── */
function Founders() {
  return (
    <section style={{display:'grid'}} className="founders-grid">
      {/* IMAGE */}
      <div style={{position:'relative',overflow:'hidden',minHeight:'clamp(480px,65vw,820px)'}}>
        <img src={IMG.foundersCouch} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top center',display:'block'}} />
        <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,.35) 0%,transparent 55%)'}} />
        <div style={{position:'absolute',top:'2rem',left:'2rem',
          background:'rgba(61,52,38,.88)',backdropFilter:'blur(12px)',
          padding:'.5rem 1.1rem',border:'1px solid rgba(197,212,192,.15)'}}>
          <span style={{fontFamily:"'Jost',sans-serif",fontSize:'.52rem',letterSpacing:'.25em',textTransform:'uppercase',color:'#C5D4C0',fontWeight:500}}>The Founders</span>
        </div>
        <div style={{position:'absolute',bottom:'2.5rem',right:'2.5rem',
          width:'clamp(90px,12vw,150px)',border:'3px solid #F0EDE6',overflow:'hidden',
          boxShadow:'0 16px 48px rgba(0,0,0,.35)'}}>
          <img src={IMG.gizemSolo} style={{width:'100%',aspectRatio:'3/4',objectFit:'cover',display:'block'}} />
        </div>
      </div>

      {/* TEXT */}
      <div style={{background:'#3D3426',
        padding:'clamp(3.5rem,7vw,8rem) clamp(2rem,6vw,7rem)',
        display:'flex',flexDirection:'column',justifyContent:'center'}}>
        <span style={{fontFamily:"'Jost',sans-serif",fontSize:'.58rem',fontWeight:500,
          letterSpacing:'.25em',textTransform:'uppercase',color:'#8FA887',display:'block',marginBottom:'2rem'}}>Meet The Team</span>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:400,
          fontSize:'clamp(3rem,5vw,5.5rem)',color:'#F0EDE6',lineHeight:.9,
          letterSpacing:'-.025em',margin:'0 0 .2em'}}>Baris</h2>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontStyle:'italic',
          fontSize:'clamp(3rem,5vw,5.5rem)',color:'#C5D4C0',lineHeight:.9,
          letterSpacing:'-.025em',margin:'0 0 2.5rem'}}>&amp; Gizem.</h2>
        <div style={{width:'2.5rem',height:'1px',background:'rgba(197,212,192,.25)',marginBottom:'2.5rem'}} />
        {[
          'Ik ben Baris, oprichter van Aesthetic Social Haus. Na jaren in de e-commerce wereld ontdekte ik dat veel bedrijven zich focussen op mooie content, maar de strategie erachter missen.',
          'Niet lang daarna sloot Gizem zich aan — mijn vrouw en het creatieve hart achter het merk. Met haar oog voor detail brengt ze onze ideeën tot leven.',
          'Samen bouwen we dagelijks aan merken die opvallen, onthouden worden en vertrouwen uitstralen.',
        ].map((t,i) => (
          <p key={i} style={{fontFamily:"'Jost',sans-serif",fontWeight:300,fontSize:'.88rem',
            color:'rgba(197,212,192,.58)',lineHeight:1.9,margin:'0 0 1rem'}}>{t}</p>
        ))}
        <button
          onClick={()=>document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}
          onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='#8FA887'}}
          onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='#C5D4C0'}}
          style={{display:'inline-flex',alignItems:'center',gap:'.7rem',background:'#C5D4C0',
            color:'#080604',padding:'.95rem 2rem',fontFamily:"'Jost',sans-serif",fontSize:'.63rem',
            fontWeight:700,letterSpacing:'.2em',textTransform:'uppercase',border:'none',
            cursor:'pointer',transition:'background .3s ease',width:'fit-content',marginTop:'1rem'}}>
          Werk Met Ons <ArrowRight size={12} />
        </button>
      </div>

      <style>{`
        .founders-grid{grid-template-columns:1fr}
        @media(min-width:860px){.founders-grid{grid-template-columns:1fr 1fr!important}}
      `}</style>
    </section>
  );
}

/* ──────────────────────────────────────────
   TESTIMONIAL
   ────────────────────────────────────────── */
function Testimonial() {
  return (
    <section style={{background:'#080604',padding:'clamp(6rem,12vw,12rem) clamp(1.5rem,5vw,5rem)',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',top:'-2rem',left:'clamp(1rem,4vw,4rem)',
        fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(12rem,22vw,22rem)',
        color:'rgba(197,212,192,.04)',lineHeight:1,pointerEvents:'none',userSelect:'none',fontWeight:300}}>"</div>
      <div style={{maxWidth:'860px',margin:'0 auto',textAlign:'center',position:'relative',zIndex:1}}>
        <div style={{display:'flex',justifyContent:'center',gap:'.4rem',marginBottom:'3rem'}}>
          {[...Array(5)].map((_,i) => <span key={i} style={{color:'#C5D4C0',fontSize:'.75rem'}}>★</span>)}
        </div>
        <blockquote style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontStyle:'italic',
          fontSize:'clamp(1.7rem,3.5vw,2.9rem)',color:'#F0EDE6',lineHeight:1.5,
          margin:'0 0 3.5rem',letterSpacing:'-.01em'}}>
          "Werken met Baris en het team van Aesthetic Social Haus heeft mijn bedrijf volledig veranderd. Social media is nu een echte groeistrategie. Ik kan ze aan iedereen aanbevelen die klaar is om zijn merk naar het volgende niveau te tillen."
        </blockquote>
        <div style={{width:'2.5rem',height:'1px',background:'rgba(197,212,192,.25)',margin:'0 auto 1.5rem'}} />
        <p style={{fontFamily:"'Jost',sans-serif",fontSize:'.62rem',letterSpacing:'.22em',color:'#8FA887',textTransform:'uppercase',margin:0}}>
          Lara van der Veen — Lara Beauty Clinic
        </p>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────
   PORTFOLIO
   ────────────────────────────────────────── */
function Portfolio() {
  const items = [
    {img:IMG.womanLaptop,    label:'Brand Strategie',   client:'Lifestyle Merk',  tall:true},
    {img:IMG.portfolioMock2, label:'Social Templates',  client:'E-commerce Brand',tall:false},
    {img:IMG.brandDetail,    label:'Content Creatie',   client:'Fashion Label',   tall:false},
    {img:IMG.workspace,      label:'Brand Identity',    client:'Beauty Clinic',   tall:true},
    {img:IMG.shopifyBag,     label:'Campagne Creatie',  client:'Online Retailer', tall:false},
    {img:IMG.womanWindow,    label:'Meta Ads Creative', client:'Salon & Spa',     tall:false},
  ];

  return (
    <section id="portfolio" style={{background:'#F0EDE6',paddingBottom:'clamp(4rem,8vw,8rem)'}}>
      <div style={{maxWidth:'1400px',margin:'0 auto',padding:'clamp(4rem,7vw,7rem) clamp(1.5rem,5vw,5rem) 2.5rem'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',flexWrap:'wrap',gap:'1.5rem'}}>
          <div>
            <span style={{fontFamily:"'Jost',sans-serif",fontSize:'.58rem',fontWeight:500,letterSpacing:'.25em',textTransform:'uppercase',color:'#8FA887',display:'block',marginBottom:'1rem'}}>Portfolio</span>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:400,
              fontSize:'clamp(2.8rem,5.5vw,5.5rem)',color:'#2C2416',lineHeight:.9,
              letterSpacing:'-.025em',margin:0}}>
              Uitgelichte<br /><em>Designs</em>
            </h2>
          </div>
          <button
            onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.gap='1rem'}}
            onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.gap='.5rem'}}
            style={{display:'inline-flex',alignItems:'center',gap:'.5rem',fontFamily:"'Jost',sans-serif",
              fontSize:'.63rem',fontWeight:500,letterSpacing:'.18em',textTransform:'uppercase',
              color:'#3D3426',background:'none',border:'none',cursor:'pointer',padding:0,transition:'gap .3s ease'}}>
            Bekijk Alles <ArrowRight size={12} />
          </button>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'3px',background:'#DDD8CF'}} className="port-grid">
        {items.map(({img,label,client,tall}) => (
          <div key={label}
            className={tall?'port-tall':'port-norm'}
            style={{position:'relative',overflow:'hidden',cursor:'pointer'}}>
            <img src={img} style={{
              width:'100%',height:'100%',objectFit:'cover',objectPosition:'center',display:'block',
              transition:'transform .7s cubic-bezier(.25,.46,.45,.94)',
            }}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform='scale(1.06)'}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform='scale(1)'}} />
            <div className="port-ov" style={{position:'absolute',inset:0,
              background:'linear-gradient(to top,rgba(13,11,8,.88) 0%,transparent 55%)',
              opacity:0,transition:'opacity .4s ease'}} />
            <div className="port-lb" style={{position:'absolute',bottom:0,left:0,right:0,padding:'1.5rem',
              opacity:0,transform:'translateY(6px)',transition:'all .4s ease'}}>
              <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'1.25rem',color:'#F0EDE6',fontWeight:400,margin:'0 0 .15rem'}}>{label}</p>
              <p style={{fontFamily:"'Jost',sans-serif",fontSize:'.55rem',letterSpacing:'.14em',color:'rgba(197,212,192,.65)',textTransform:'uppercase',margin:0}}>{client}</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .port-norm{aspect-ratio:4/5}
        .port-tall{grid-row:span 2;min-height:clamp(380px,55vw,680px)}
        .port-grid>.port-norm:hover .port-ov,.port-grid>.port-tall:hover .port-ov{opacity:1!important}
        .port-grid>.port-norm:hover .port-lb,.port-grid>.port-tall:hover .port-lb{opacity:1!important;transform:translateY(0)!important}
        @media(max-width:700px){.port-grid{grid-template-columns:1fr 1fr!important}.port-tall{grid-row:span 1;aspect-ratio:4/5;min-height:0}}
      `}</style>
    </section>
  );
}

/* ──────────────────────────────────────────
   MEDIA LOGOS
   ────────────────────────────────────────── */
function MediaLogos() {
  return (
    <div style={{background:'#F0EDE6',borderTop:'1px solid #DDD8CF',padding:'2.5rem clamp(1.5rem,5vw,5rem)'}}>
      <div style={{maxWidth:'1400px',margin:'0 auto',display:'flex',alignItems:'center',
        justifyContent:'space-between',flexWrap:'wrap',gap:'1.5rem'}}>
        <p style={{fontFamily:"'Jost',sans-serif",fontSize:'.55rem',fontWeight:500,
          letterSpacing:'.28em',textTransform:'uppercase',color:'#C4B9A8',margin:0}}>
          Klanten Verschenen In
        </p>
        <div style={{display:'flex',alignItems:'center',gap:'clamp(2rem,4vw,4.5rem)',flexWrap:'wrap'}}>
          {['VOGUE','ELLE','BAZAAR','JAN'].map(m => (
            <span key={m}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color='#7A6A52'}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color='#C4B9A8'}}
              style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:600,
                fontSize:'clamp(1.3rem,2.5vw,2.2rem)',color:'#C4B9A8',
                letterSpacing:'.06em',transition:'color .3s ease',cursor:'default'}}>
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────
   CTA BANNER
   ────────────────────────────────────────── */
function CTABanner() {
  return (
    <section style={{position:'relative',overflow:'hidden',minHeight:'clamp(480px,55vw,680px)',display:'flex',alignItems:'center'}}>
      <img src={IMG.womanWindow} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',objectPosition:'center 25%',display:'block'}} />
      <div style={{position:'absolute',inset:0,background:'linear-gradient(110deg,rgba(8,6,4,.93) 0%,rgba(44,36,22,.7) 60%,rgba(8,6,4,.35) 100%)'}} />
      <div style={{position:'relative',zIndex:1,padding:'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,5rem)',maxWidth:'1400px',margin:'0 auto',width:'100%'}}>
        <div style={{maxWidth:'650px'}}>
          <span style={{fontFamily:"'Jost',sans-serif",fontSize:'.58rem',fontWeight:500,
            letterSpacing:'.28em',textTransform:'uppercase',color:'#8FA887',display:'block',marginBottom:'2rem'}}>Vrijblijvend gesprek</span>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,
            fontSize:'clamp(3.2rem,8vw,7.5rem)',color:'#F0EDE6',lineHeight:.88,
            letterSpacing:'-.03em',margin:'0 0 2.5rem'}}>
            Klaar om je<br />merk te<br /><em style={{color:'#C5D4C0'}}>transformeren?</em>
          </h2>
          <p style={{fontFamily:"'Jost',sans-serif",fontWeight:300,fontSize:'.93rem',
            color:'rgba(197,212,192,.55)',lineHeight:1.85,maxWidth:'420px',margin:'0 0 3rem'}}>
            Wil je een opvallende online aanwezigheid creëren? Met onze expertise bouw je een krachtige strategie die zorgt voor groei op de lange termijn.
          </p>
          <button
            onClick={()=>document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='#8FA887'}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='#C5D4C0'}}
            style={{display:'inline-flex',alignItems:'center',gap:'.8rem',background:'#C5D4C0',
              color:'#080604',padding:'1.1rem 2.5rem',fontFamily:"'Jost',sans-serif",fontSize:'.7rem',
              fontWeight:700,letterSpacing:'.2em',textTransform:'uppercase',border:'none',
              cursor:'pointer',transition:'background .3s ease'}}>
            Werken Met Ons <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────
   EXPORT
   ────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <Hero />
      <CollageStrip />
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