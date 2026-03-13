import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

/* ─── IMAGE MAP ─── */
const IMG = {
  shopifyBag:     '/images/imgi_1_6913753829bad145499fa973.jpg',
  portfolioMock:  '/images/imgi_2_690d00875c1881a6bfeeb56d.png',
  womanWindow:    '/images/imgi_3_6910d742b133d15c1ee8b05f.png',
  womanLaptop:    '/images/imgi_4_6910e2aed4e8026a1b652185.png',
  linen:          '/images/imgi_5_6910ea39d1ba958698daa8e8.png',
  brandDetail:    '/images/imgi_6_6910f37148a60028a9b8abfe.png',
  workspace:      '/images/imgi_7_6910fb1675ec1e391438b35f.png',
  portfolioWork:  '/images/imgi_8_69111394d1ba95e216dff6de.png',
  content1:       '/images/imgi_9_6911139475ec1e409f3bbdf0.png',
  foundersCouch:  '/images/imgi_10_69111394c3a1ea691a145f75.png',
  gizemSolo:      '/images/imgi_11_69111394d4d779cc917e287b.png',
  portfolioMock2: '/images/imgi_64_6910fbdf0d255178af45837a.png',
  linen2:         '/images/imgi_35_6910ea39d1ba958698daa8e8.png',
  womanLaptop2:   '/images/imgi_32_6910e2aed4e8026a1b652185.png',
  womanWindow2:   '/images/imgi_27_6910d742b133d15c1ee8b05f.png',
  brandDetail2:   '/images/imgi_39_6910f37148a60028a9b8abfe.png',
  portfolioMock3: '/images/imgi_23_690d00875c1881a6bfeeb56d.png',
  workspace2:     '/images/imgi_43_6910fb1675ec1e391438b35f.png',
};

const TICKER = ['META ADS','✦','CONTENTCREATIE','✦','SOCIAL MEDIA MANAGEMENT','✦','BRAND STRATEGIE','✦','FOTOGRAFIE','✦','E-MAILFLOWS','✦'];
const MEDIA  = ['VOGUE', 'ELLE', 'BAZAAR', 'JAN'];

/* ════════════════════════════════════════════
   HERO  — full-bleed dark cinematic
   ════════════════════════════════════════════ */
function Hero() {
  const [p, setP] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>(0);

  useEffect(() => {
    const tt = [100,600,1100,1700].map((d,i) => setTimeout(() => setP(i+1), d));
    return () => tt.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const cv = canvasRef.current; if (!cv) return;
    const ctx = cv.getContext('2d'); if (!ctx) return;
    let fr = 0;
    const sz = () => { cv.width = innerWidth; cv.height = innerHeight; };
    sz(); addEventListener('resize', sz);
    const orbs = Array.from({length:7}, (_,i) => ({
      x: Math.random()*innerWidth, y: Math.random()*innerHeight,
      r: 150+Math.random()*280, sp: 0.00025+Math.random()*0.0004,
      ph: Math.random()*Math.PI*2, col: i%3===0?'197,212,192':i%3===1?'61,52,38':'240,237,230',
    }));
    const tick = () => {
      ctx.clearRect(0,0,cv.width,cv.height); fr++;
      orbs.forEach(o => {
        const x = o.x+Math.sin(fr*o.sp+o.ph)*140, y = o.y+Math.cos(fr*o.sp*.7+o.ph)*90;
        const g = ctx.createRadialGradient(x,y,0,x,y,o.r);
        g.addColorStop(0,`rgba(${o.col},0.11)`); g.addColorStop(1,`rgba(${o.col},0)`);
        ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,o.r,0,Math.PI*2); ctx.fill();
      });
      raf.current = requestAnimationFrame(tick);
    };
    tick();
    return () => { removeEventListener('resize',sz); cancelAnimationFrame(raf.current); };
  }, []);

  const go = (id:string) => document.getElementById(id)?.scrollIntoView({behavior:'smooth'});

  return (
    <section id="home" style={{background:'#080604',minHeight:'100svh',position:'relative',display:'flex',flexDirection:'column',overflow:'hidden'}}>
      <canvas ref={canvasRef} style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}} />

      {/* grain */}
      <div style={{position:'absolute',inset:0,pointerEvents:'none',
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        opacity:0.05}} />

      {/* top sage line */}
      <div style={{height:'1px',background:'linear-gradient(90deg,transparent,#C5D4C0 30%,#C5D4C0 70%,transparent)',position:'relative',zIndex:10}} />

      {/* ticker */}
      <div style={{borderBottom:'1px solid rgba(197,212,192,0.12)',overflow:'hidden',position:'relative',zIndex:10}}>
        <div style={{display:'flex',gap:'2.5rem',padding:'0.7rem 0',whiteSpace:'nowrap',animation:'ticker 30s linear infinite'}}>
          {[...TICKER,...TICKER,...TICKER].map((t,i)=>(
            <span key={i} style={{fontFamily:"'Jost',sans-serif",fontSize:'0.6rem',fontWeight:500,letterSpacing:'0.22em',textTransform:'uppercase',color:t==='✦'?'#C5D4C0':'rgba(197,212,192,0.35)',flexShrink:0}}>{t}</span>
          ))}
        </div>
      </div>

      {/* MAIN HERO CONTENT */}
      <div style={{flex:1,display:'flex',alignItems:'center',position:'relative',zIndex:10,padding:'4rem 2rem 2rem'}}>
        <div style={{maxWidth:'1400px',margin:'0 auto',width:'100%',display:'grid',gridTemplateColumns:'1fr',gap:'3rem'}}>

          {/* overline */}
          <div style={{display:'flex',alignItems:'center',gap:'1rem',
            opacity:p>=1?1:0,transform:p>=1?'none':'translateY(12px)',transition:'all .6s ease'}}>
            <div style={{width:'3rem',height:'1px',background:'#C5D4C0'}} />
            <span style={{fontFamily:"'Jost',sans-serif",fontSize:'0.58rem',fontWeight:500,letterSpacing:'0.28em',textTransform:'uppercase',color:'#C5D4C0'}}>Premium Marketing Agency — Est. 2024</span>
          </div>

          {/* MEGA HEADLINE */}
          <div style={{opacity:p>=2?1:0,transition:'all 1.2s ease',transform:p>=2?'none':'translateY(40px)'}}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,
              fontSize:'clamp(5rem,14vw,13rem)',lineHeight:.88,letterSpacing:'-0.03em',color:'#F0EDE6',
              marginBottom:'0.05em'}}>
              Wij maken
            </div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontStyle:'italic',
              fontSize:'clamp(5rem,14vw,13rem)',lineHeight:.88,letterSpacing:'-0.03em',
              background:'linear-gradient(125deg,#C5D4C0 0%,#F0EDE6 35%,#8FA887 65%,#C5D4C0 100%)',
              WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
              merken die
            </div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,
              fontSize:'clamp(5rem,14vw,13rem)',lineHeight:.88,letterSpacing:'-0.03em',color:'rgba(240,237,230,0.25)'}}>
              onthouden worden.
            </div>
          </div>

          {/* bottom row */}
          <div style={{display:'flex',flexDirection:'column',gap:'2rem',
            opacity:p>=3?1:0,transform:p>=3?'none':'translateY(20px)',transition:'all .9s ease .1s'}}>

            <div style={{display:'grid',gridTemplateColumns:'1fr',gap:'2rem'}} className="hero-bottom-grid">
              <p style={{fontFamily:"'Jost',sans-serif",fontWeight:300,fontSize:'1rem',color:'rgba(197,212,192,0.55)',lineHeight:1.85,maxWidth:'380px'}}>
                Strategieën die ervoor zorgen dat je niet alleen gezien wordt, maar ook{' '}
                <em style={{fontStyle:'normal',color:'#C5D4C0',fontWeight:400}}>onthouden</em>.
              </p>

              <div style={{display:'flex',gap:'1rem',flexWrap:'wrap',alignItems:'center'}}>
                <button onClick={()=>go('contact')}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='#8FA887'}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='#C5D4C0'}}
                  style={{display:'flex',alignItems:'center',gap:'0.75rem',background:'#C5D4C0',color:'#080604',
                    padding:'1.1rem 2.2rem',fontFamily:"'Jost',sans-serif",fontSize:'0.65rem',fontWeight:700,
                    letterSpacing:'0.2em',textTransform:'uppercase',border:'none',cursor:'pointer',
                    transition:'background .3s ease'}}>
                  Werken Met Ons <ArrowRight size={13} />
                </button>
                <button onClick={()=>go('portfolio')}
                  onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor='#C5D4C0';el.style.color='#F0EDE6'}}
                  onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor='rgba(197,212,192,0.2)';el.style.color='rgba(197,212,192,0.6)'}}
                  style={{display:'flex',alignItems:'center',gap:'0.75rem',background:'transparent',
                    color:'rgba(197,212,192,0.6)',padding:'1.1rem 2.2rem',fontFamily:"'Jost',sans-serif",
                    fontSize:'0.65rem',fontWeight:500,letterSpacing:'0.2em',textTransform:'uppercase',
                    border:'1px solid rgba(197,212,192,0.2)',cursor:'pointer',transition:'all .3s ease'}}>
                  Bekijk Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div style={{borderTop:'1px solid rgba(197,212,192,0.1)',position:'relative',zIndex:10,
        opacity:p>=4?1:0,transform:p>=4?'none':'translateY(12px)',transition:'all 1s ease .3s'}}>
        <div style={{maxWidth:'1400px',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(4,1fr)'}}>
          {[['150+','Happy Clients'],['500+','Projects Done'],['10M+','Reach Generated'],['98%','Satisfaction']].map(([v,l],i)=>(
            <div key={l} style={{textAlign:'center',padding:'1.8rem 1rem',borderRight:i<3?'1px solid rgba(197,212,192,0.08)':'none'}}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:'clamp(2rem,4vw,3rem)',color:'#F0EDE6',lineHeight:1}}>{v}</div>
              <div style={{fontFamily:"'Jost',sans-serif",fontSize:'0.55rem',letterSpacing:'0.22em',color:'rgba(197,212,192,0.35)',textTransform:'uppercase',marginTop:'0.4rem'}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-33.33%)}}
        @media(min-width:768px){.hero-bottom-grid{grid-template-columns:1fr auto!important;align-items:center}}
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════
   INTRO STRIP  — bold statement + image collage
   ════════════════════════════════════════════ */
function IntroStrip() {
  return (
    <section style={{background:'#F0EDE6',padding:'0'}}>
      {/* full-bleed image collage */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 2fr 1fr',height:'clamp(320px,45vw,600px)',gap:'3px',background:'#DDD8CF'}}>
        <div style={{overflow:'hidden',position:'relative'}}>
          <img src={IMG.shopifyBag} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center',transition:'transform .8s ease'}}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform='scale(1.06)'}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform='scale(1)'}} />
        </div>
        <div style={{overflow:'hidden',position:'relative'}}>
          <img src={IMG.womanLaptop} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top',transition:'transform .8s ease'}}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform='scale(1.04)'}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform='scale(1)'}} />
          {/* overlay text */}
          <div style={{position:'absolute',bottom:'2.5rem',left:'2.5rem',right:'2.5rem'}}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(1.5rem,3vw,2.8rem)',color:'#F0EDE6',fontWeight:300,lineHeight:1.15,
              textShadow:'0 2px 40px rgba(0,0,0,0.5)'}}>
              Wij begrijpen de kracht<br />van een sterk digitaal merk.
            </div>
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'3px'}}>
          <div style={{flex:1,overflow:'hidden'}}>
            <img src={IMG.linen} style={{width:'100%',height:'100%',objectFit:'cover',transition:'transform .8s ease'}}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform='scale(1.08)'}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform='scale(1)'}} />
          </div>
          <div style={{flex:1,overflow:'hidden'}}>
            <img src={IMG.brandDetail} style={{width:'100%',height:'100%',objectFit:'cover',transition:'transform .8s ease'}}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform='scale(1.08)'}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform='scale(1)'}} />
          </div>
        </div>
      </div>

      {/* statement row */}
      <div style={{maxWidth:'1400px',margin:'0 auto',padding:'5rem 2rem',display:'flex',flexDirection:'column',gap:'2rem'}} className="intro-row">
        <div style={{fontFamily:"'Jost',sans-serif",fontSize:'0.6rem',fontWeight:500,letterSpacing:'0.25em',textTransform:'uppercase',color:'#8FA887'}}>
          Aesthetic Social Haus
        </div>
        <div style={{display:'grid',gap:'3rem'}} className="intro-grid">
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:400,fontSize:'clamp(2.5rem,5vw,4.5rem)',color:'#2C2416',lineHeight:1.05,margin:0}}>
            We begrijpen de kracht<br />van een sterk digitaal merk.<br />
            <em style={{color:'#7A6A52'}}>Jouw merk verdient meer.</em>
          </h2>
          <div>
            <p style={{fontFamily:"'Jost',sans-serif",fontWeight:300,fontSize:'1rem',color:'#7A6A52',lineHeight:1.9,maxWidth:'440px',marginBottom:'2rem'}}>
              Bij Aesthetic Social Haus ontwikkelen we op maat gemaakte strategieën die ervoor zorgen dat je niet alleen gezien wordt, maar ook onthouden. Onze belofte is simpel: gerichte strategie, hoogwaardige content en resultaten die voor zichzelf spreken.
            </p>
            <button style={{display:'inline-flex',alignItems:'center',gap:'0.6rem',fontFamily:"'Jost',sans-serif",fontSize:'0.65rem',fontWeight:500,letterSpacing:'0.18em',textTransform:'uppercase',color:'#3D3426',background:'none',border:'none',cursor:'pointer',padding:0}}
              className="link-btn">
              Ontdek Meer <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @media(min-width:900px){.intro-grid{grid-template-columns:1fr 1fr!important}}
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════
   SERVICES  — full dark, big grid
   ════════════════════════════════════════════ */
function Services() {
  const services = [
    {n:'01',t:'Contentcreatie',    d:'Visuele content die stopt met scrollen en converteert naar klanten.',       img:IMG.brandDetail},
    {n:'02',t:'Template Design',   d:'On-brand Canva templates voor een consistente en professionele feed.',       img:IMG.portfolioMock},
    {n:'03',t:'Social Media',      d:'Volledig beheer van je kanalen, van strategie tot posting en community.',    img:IMG.workspace},
    {n:'04',t:'Fotografie',        d:'Professionele brand shoots voor een authentieke en premium uitstraling.',    img:IMG.womanWindow},
    {n:'05',t:'Meta Ads',          d:'Gerichte campagnes die meetbare leads genereren en ROAS leveren.',           img:IMG.shopifyBag},
    {n:'06',t:'E-mailflows',       d:'Geautomatiseerde e-mail sequenties die converteren terwijl jij slaapt.',     img:IMG.linen},
  ];

  return (
    <section id="services" style={{background:'#100E0A'}}>
      {/* header */}
      <div style={{maxWidth:'1400px',margin:'0 auto',padding:'6rem 2rem 4rem',display:'flex',flexDirection:'column',gap:'1.5rem'}} className="svc-header">
        <span style={{fontFamily:"'Jost',sans-serif",fontSize:'0.6rem',fontWeight:500,letterSpacing:'0.25em',textTransform:'uppercase',color:'#8FA887'}}>Wat Wij Doen</span>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',gap:'2rem',flexWrap:'wrap'}}>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:'clamp(3rem,6vw,6rem)',color:'#F0EDE6',lineHeight:.95,margin:0,letterSpacing:'-0.02em'}}>
            Alles onder<br /><em>één dak.</em>
          </h2>
          <p style={{fontFamily:"'Jost',sans-serif",fontWeight:300,fontSize:'0.9rem',color:'rgba(197,212,192,0.5)',lineHeight:1.8,maxWidth:'320px',margin:0}}>
            Van strategie tot uitvoering — wij zijn het verlengstuk van jouw merk.
          </p>
        </div>
      </div>

      {/* divider */}
      <div style={{height:'1px',background:'rgba(197,212,192,0.08)',margin:'0 2rem'}} />

      {/* service rows */}
      {services.map((s,i) => (
        <div key={s.n}
          style={{borderBottom:'1px solid rgba(197,212,192,0.08)',transition:'background .3s ease',cursor:'pointer'}}
          onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='rgba(197,212,192,0.03)'}}
          onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='transparent'}}>
          <div style={{maxWidth:'1400px',margin:'0 auto',padding:'2rem 2rem',display:'grid',gridTemplateColumns:'4rem 1fr auto',alignItems:'center',gap:'2rem'}} className="svc-row">
            <span style={{fontFamily:"'Jost',sans-serif",fontSize:'0.6rem',letterSpacing:'0.2em',color:'rgba(197,212,192,0.3)',fontWeight:500}}>{s.n}</span>
            <div style={{display:'flex',alignItems:'center',gap:'3rem',flexWrap:'wrap'}}>
              <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:400,fontSize:'clamp(1.8rem,3vw,2.8rem)',color:'#F0EDE6',margin:0,lineHeight:1}}>{s.t}</h3>
              <p style={{fontFamily:"'Jost',sans-serif",fontWeight:300,fontSize:'0.85rem',color:'rgba(197,212,192,0.45)',lineHeight:1.7,maxWidth:'360px',margin:0}}>{s.d}</p>
            </div>
            <ArrowUpRight size={18} style={{color:'rgba(197,212,192,0.25)',flexShrink:0}} />
          </div>
        </div>
      ))}

      <div style={{padding:'3rem 2rem'}} />
    </section>
  );
}

/* ════════════════════════════════════════════
   FOUNDERS  — dramatic split
   ════════════════════════════════════════════ */
function Founders() {
  return (
    <section style={{background:'#F0EDE6',overflow:'hidden'}}>
      <div style={{display:'grid'}} className="founders-grid">

        {/* LEFT — huge image */}
        <div style={{position:'relative',minHeight:'clamp(500px,70vw,900px)',overflow:'hidden'}}>
          <img src={IMG.foundersCouch} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top'}} />
          {/* floating gizem solo */}
          <div style={{position:'absolute',bottom:'3rem',right:'3rem',width:'clamp(100px,14vw,180px)',
            border:'4px solid #F0EDE6',overflow:'hidden',boxShadow:'0 20px 60px rgba(0,0,0,0.3)'}}>
            <img src={IMG.gizemSolo} style={{width:'100%',aspectRatio:'3/4',objectFit:'cover'}} />
          </div>
          {/* label */}
          <div style={{position:'absolute',top:'2.5rem',left:'2.5rem',background:'rgba(61,52,38,0.85)',
            backdropFilter:'blur(8px)',padding:'0.6rem 1.2rem'}}>
            <span style={{fontFamily:"'Jost',sans-serif",fontSize:'0.55rem',letterSpacing:'0.25em',textTransform:'uppercase',color:'#C5D4C0',fontWeight:500}}>The Founder</span>
          </div>
        </div>

        {/* RIGHT — content */}
        <div style={{background:'#3D3426',padding:'clamp(3rem,6vw,7rem) clamp(2rem,5vw,6rem)',display:'flex',flexDirection:'column',justifyContent:'center'}}>
          <span style={{fontFamily:"'Jost',sans-serif",fontSize:'0.6rem',fontWeight:500,letterSpacing:'0.25em',textTransform:'uppercase',color:'#8FA887',marginBottom:'2rem',display:'block'}}>Meet The Team</span>

          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:400,fontSize:'clamp(3rem,5vw,5.5rem)',color:'#F0EDE6',lineHeight:.95,margin:'0 0 2.5rem',letterSpacing:'-0.02em'}}>
            Baris<br /><em style={{color:'#C5D4C0'}}>&amp; Gizem.</em>
          </h2>

          <div style={{width:'40px',height:'1px',background:'rgba(197,212,192,0.25)',marginBottom:'2.5rem'}} />

          <div style={{display:'flex',flexDirection:'column',gap:'1.2rem',marginBottom:'3rem'}}>
            {[
              'Ik ben Baris, oprichter van Aesthetic Social Haus. Na jaren in de e-commerce wereld ontdekte ik dat veel bedrijven zich focussen op mooie content, maar de strategie erachter missen.',
              'Niet lang daarna sloot Gizem zich aan — mijn vrouw en creatieve hart achter het merk. Met haar oog voor detail en gevoel voor esthetiek brengt ze onze ideeën tot leven.',
              'Samen bouwen we dagelijks aan merken die opvallen, onthouden worden en vertrouwen uitstralen.',
            ].map((t,i) => (
              <p key={i} style={{fontFamily:"'Jost',sans-serif",fontWeight:300,fontSize:'0.9rem',color:'rgba(197,212,192,0.6)',lineHeight:1.85,margin:0}}>{t}</p>
            ))}
          </div>

          <button style={{display:'inline-flex',alignItems:'center',gap:'0.75rem',background:'#C5D4C0',color:'#0D0B08',
            padding:'1rem 2rem',fontFamily:"'Jost',sans-serif",fontSize:'0.65rem',fontWeight:700,
            letterSpacing:'0.18em',textTransform:'uppercase',border:'none',cursor:'pointer',width:'fit-content',
            transition:'background .3s ease'}}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='#8FA887'}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='#C5D4C0'}}>
            Meer Over Ons <ArrowRight size={13} />
          </button>
        </div>
      </div>

      <style>{`
        .founders-grid{grid-template-columns:1fr}
        @media(min-width:900px){.founders-grid{grid-template-columns:1fr 1fr!important}}
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════
   TESTIMONIAL  — cinematic dark quote
   ════════════════════════════════════════════ */
function Testimonial() {
  return (
    <section style={{background:'#080604',padding:'clamp(5rem,10vw,10rem) 2rem',position:'relative',overflow:'hidden'}}>
      {/* bg image blur */}
      <div style={{position:'absolute',inset:0,pointerEvents:'none'}}>
        <img src={IMG.linen2} style={{width:'100%',height:'100%',objectFit:'cover',opacity:.06,filter:'blur(8px)'}} />
      </div>
      <div style={{position:'absolute',inset:0,background:'linear-gradient(135deg,rgba(8,6,4,.97) 40%,rgba(44,36,22,.85))',pointerEvents:'none'}} />

      <div style={{maxWidth:'900px',margin:'0 auto',textAlign:'center',position:'relative',zIndex:1}}>
        <div style={{display:'flex',justifyContent:'center',gap:'0.3rem',marginBottom:'3rem'}}>
          {[...Array(5)].map((_,i)=>(
            <span key={i} style={{color:'#C5D4C0',fontSize:'0.8rem'}}>✦</span>
          ))}
        </div>
        <blockquote style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontStyle:'italic',
          fontSize:'clamp(1.6rem,3.5vw,2.8rem)',color:'#F0EDE6',lineHeight:1.55,margin:'0 0 3.5rem',
          letterSpacing:'-0.01em'}}>
          "Werken met Baris en het team van Aesthetic Social Haus heeft mijn bedrijf volledig
          veranderd. Voorheen voelde social media als iets dat erbij hoorde. Nu is het een echte
          groeistrategie. Ik kan ze aan iedereen aanbevelen die klaar is om zijn merk naar het
          volgende niveau te tillen."
        </blockquote>
        <div style={{width:'40px',height:'1px',background:'rgba(197,212,192,0.3)',margin:'0 auto 1.5rem'}} />
        <p style={{fontFamily:"'Jost',sans-serif",fontSize:'0.65rem',letterSpacing:'0.22em',
          color:'#8FA887',textTransform:'uppercase',margin:0}}>
          Lara van der Veen — Lara Beauty Clinic
        </p>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   PORTFOLIO  — magazine editorial grid
   ════════════════════════════════════════════ */
function Portfolio() {
  const items = [
    {img:IMG.portfolioMock,  label:'Brand Identity',     client:'Beauty Clinic',    size:'tall'},
    {img:IMG.portfolioMock2, label:'Social Templates',   client:'E-commerce Brand', size:'normal'},
    {img:IMG.brandDetail,    label:'Content Creatie',    client:'Fashion Label',    size:'normal'},
    {img:IMG.workspace,      label:'Brand Strategie',    client:'Lifestyle Brand',  size:'tall'},
    {img:IMG.womanWindow,    label:'Campagne Fotografie',client:'Salon & Spa',      size:'normal'},
    {img:IMG.content1,       label:'Meta Ads Creative',  client:'Online Retailer',  size:'normal'},
  ];

  return (
    <section id="portfolio" style={{background:'#F0EDE6',padding:'clamp(4rem,8vw,8rem) 0'}}>
      <div style={{maxWidth:'1400px',margin:'0 auto',padding:'0 2rem'}}>

        {/* header */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'3rem',flexWrap:'wrap',gap:'1.5rem'}}>
          <div>
            <span style={{fontFamily:"'Jost',sans-serif",fontSize:'0.6rem',fontWeight:500,letterSpacing:'0.25em',textTransform:'uppercase',color:'#8FA887',display:'block',marginBottom:'1rem'}}>Portfolio</span>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:400,fontSize:'clamp(2.5rem,5vw,5rem)',color:'#2C2416',lineHeight:.95,margin:0,letterSpacing:'-0.02em'}}>
              Uitgelichte<br /><em>Designs</em>
            </h2>
          </div>
          <button style={{display:'inline-flex',alignItems:'center',gap:'0.6rem',fontFamily:"'Jost',sans-serif",fontSize:'0.65rem',fontWeight:500,letterSpacing:'0.18em',textTransform:'uppercase',color:'#3D3426',background:'none',border:'none',cursor:'pointer',padding:0}}>
            Bekijk Alles <ArrowRight size={12} />
          </button>
        </div>

        {/* EDITORIAL GRID */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'4px'}} className="portfolio-grid">
          {items.map(({img,label,client,size}) => (
            <div key={label}
              style={{position:'relative',overflow:'hidden',cursor:'pointer',
                gridRow: size==='tall'?'span 2':'span 1',
                aspectRatio: size==='tall'?'auto':'4/5'}}
              className={size==='tall'?'portfolio-tall':''}>
              <img src={img} style={{width:'100%',height:'100%',objectFit:'cover',
                transition:'transform .7s cubic-bezier(.25,.46,.45,.94)'}}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform='scale(1.06)'}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform='scale(1)'}} />
              {/* hover overlay */}
              <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(13,11,8,.9) 0%,transparent 50%)',
                opacity:0,transition:'opacity .4s ease'}}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.opacity='1'}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.opacity='0'}} />
              <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'1.8rem',
                transform:'translateY(8px)',opacity:0,transition:'all .4s ease'}}
                className="portfolio-label">
                <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'1.3rem',color:'#F0EDE6',fontWeight:400,margin:'0 0 0.2rem'}}>{label}</p>
                <p style={{fontFamily:"'Jost',sans-serif",fontSize:'0.58rem',letterSpacing:'0.15em',color:'rgba(197,212,192,0.65)',textTransform:'uppercase',margin:0}}>{client}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:768px){.portfolio-grid{grid-template-columns:1fr 1fr!important}}
        .portfolio-tall{min-height:clamp(400px,60vw,700px)}
        div:hover .portfolio-label{transform:translateY(0)!important;opacity:1!important}
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════
   MEDIA LOGOS
   ════════════════════════════════════════════ */
function MediaLogos() {
  return (
    <div style={{background:'#F0EDE6',borderTop:'1px solid #DDD8CF',padding:'3.5rem 2rem'}}>
      <div style={{maxWidth:'1400px',margin:'0 auto'}}>
        <p style={{fontFamily:"'Jost',sans-serif",fontSize:'0.55rem',fontWeight:500,letterSpacing:'0.3em',textTransform:'uppercase',color:'#C4B9A8',textAlign:'center',marginBottom:'2.5rem'}}>
          Onze Klanten Zijn Verschenen In
        </p>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'clamp(2rem,5vw,5rem)',flexWrap:'wrap'}}>
          {MEDIA.map(m=>(
            <span key={m} style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:600,
              fontSize:'clamp(1.4rem,3vw,2.4rem)',color:'#C4B9A8',letterSpacing:'0.08em',
              transition:'color .3s ease',cursor:'default'}}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color='#7A6A52'}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color='#C4B9A8'}}>{m}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   CTA BANNER  — full-bleed dramatic
   ════════════════════════════════════════════ */
function CTABanner() {
  const go = (id:string) => document.getElementById(id)?.scrollIntoView({behavior:'smooth'});
  return (
    <section style={{position:'relative',overflow:'hidden',minHeight:'clamp(500px,60vw,700px)',display:'flex',alignItems:'center'}}>
      {/* full-bleed bg image */}
      <div style={{position:'absolute',inset:0}}>
        <img src={IMG.womanWindow} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center 20%'}} />
        <div style={{position:'absolute',inset:0,background:'linear-gradient(135deg,rgba(13,11,8,.92) 0%,rgba(44,36,22,.75) 100%)'}} />
      </div>

      <div style={{position:'relative',zIndex:1,maxWidth:'1400px',margin:'0 auto',padding:'clamp(4rem,8vw,8rem) 2rem',width:'100%'}}>
        <div style={{maxWidth:'700px'}}>
          <span style={{fontFamily:"'Jost',sans-serif",fontSize:'0.6rem',fontWeight:500,letterSpacing:'0.3em',textTransform:'uppercase',color:'#8FA887',display:'block',marginBottom:'2rem'}}>
            Vrijblijvend gesprek
          </span>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,
            fontSize:'clamp(3rem,7vw,7rem)',color:'#F0EDE6',lineHeight:.9,letterSpacing:'-0.03em',
            margin:'0 0 2rem'}}>
            Klaar om je<br />social media te<br /><em style={{color:'#C5D4C0'}}>transformeren?</em>
          </h2>
          <p style={{fontFamily:"'Jost',sans-serif",fontWeight:300,fontSize:'1rem',color:'rgba(197,212,192,0.6)',lineHeight:1.85,maxWidth:'440px',marginBottom:'3rem'}}>
            Wil je een opvallende online aanwezigheid creëren? Met onze expertise bouw je een krachtige strategie die zorgt voor groei op de lange termijn.
          </p>
          <div style={{display:'flex',gap:'1rem',flexWrap:'wrap'}}>
            <button onClick={()=>go('contact')}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='#8FA887'}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='#C5D4C0'}}
              style={{display:'inline-flex',alignItems:'center',gap:'0.75rem',background:'#C5D4C0',color:'#080604',
                padding:'1.2rem 2.5rem',fontFamily:"'Jost',sans-serif",fontSize:'0.7rem',fontWeight:700,
                letterSpacing:'0.2em',textTransform:'uppercase',border:'none',cursor:'pointer',
                transition:'background .3s ease'}}>
              Werken Met Ons <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   EXPORT
   ════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroStrip />
      <Services />
      <Founders />
      <Testimonial />
      <Portfolio />
      <MediaLogos />
      <CTABanner />
    </>
  );
}