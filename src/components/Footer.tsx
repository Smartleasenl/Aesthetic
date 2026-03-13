import { Instagram, Facebook, Linkedin, Youtube, ArrowRight } from 'lucide-react';

const go = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function Footer() {
  return (
    <footer style={{ background: '#080604', borderTop: '1px solid rgba(197,212,192,.07)' }}>

      {/* SCROLLING TICKER */}
      <div
        style={{ borderBottom: '1px solid rgba(197,212,192,.07)', overflow: 'hidden', cursor: 'pointer' }}
        onClick={() => go('contact')}
      >
        <div style={{
          display: 'flex', whiteSpace: 'nowrap',
          padding: '.9rem 0',
          animation: 'fticker 24s linear infinite',
        }}>
          {Array(8).fill(['WERKEN MET ONS', '✦', 'PLAN EEN GESPREK', '✦', 'TRANSFORMEER JE MERK', '✦']).flat().map((t, i) => (
            <span key={i} style={{
              fontFamily: "'Jost',sans-serif",
              fontSize: '.58rem',
              fontWeight: t === '✦' ? 300 : 600,
              letterSpacing: t === '✦' ? '.1em' : '.22em',
              textTransform: 'uppercase' as const,
              color: t === '✦' ? 'rgba(197,212,192,.2)' : 'rgba(197,212,192,.45)',
              marginRight: '2.5rem',
              flexShrink: 0,
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="foot-main" style={{
        maxWidth: '1400px', margin: '0 auto',
        padding: 'clamp(4rem,6vw,6rem) clamp(1.5rem,5vw,5rem)',
        display: 'grid', gap: 'clamp(3rem,5vw,5rem)',
      }}>

        {/* BRAND */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
          <div style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontWeight: 400,
            fontSize: 'clamp(1.4rem,2vw,1.9rem)',
            color: '#F0EDE6',
            letterSpacing: '.08em',
            textTransform: 'uppercase' as const,
            lineHeight: 1.05,
          }}>
            Aesthetic<br />Social Haus
          </div>

          <p style={{
            fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: '.82rem',
            color: 'rgba(197,212,192,.32)', lineHeight: 1.85,
            maxWidth: '220px', margin: 0,
          }}>
            Wij transformeren merken met strategie, creativiteit en meetbaar resultaat.
          </p>

          {/* SOCIAL ICONS */}
          <div style={{ display: 'flex', gap: '.55rem' }}>
            {[
              { Icon: Instagram, url: 'https://www.instagram.com/aestheticsocialhaus/' },
              { Icon: Facebook,  url: 'https://www.facebook.com/aestheticsocialhaus/'  },
              { Icon: Linkedin,  url: 'https://www.linkedin.com/company/aestheticsocialhaus' },
              { Icon: Youtube,   url: 'https://www.youtube.com/@aestheticsocialhaus'   },
            ].map(({ Icon, url }, i) => (
              <a key={i} href={url} target="_blank" rel="noreferrer"
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'rgba(197,212,192,.4)';
                  el.style.color = '#C5D4C0';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'rgba(197,212,192,.1)';
                  el.style.color = 'rgba(197,212,192,.28)';
                }}
                style={{
                  width: '2.1rem', height: '2.1rem',
                  border: '1px solid rgba(197,212,192,.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(197,212,192,.28)',
                  textDecoration: 'none',
                  transition: 'all .3s ease',
                }}>
                <Icon size={13} />
              </a>
            ))}
          </div>
        </div>

        {/* DIENSTEN */}
        <div>
          <p style={{
            fontFamily: "'Jost',sans-serif", fontSize: '.5rem', fontWeight: 600,
            letterSpacing: '.25em', textTransform: 'uppercase' as const,
            color: 'rgba(197,212,192,.25)', marginBottom: '1.6rem', marginTop: 0,
          }}>Diensten</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
            {['Meta Ads', 'Contentcreatie', 'Social Media Management', 'Brand Strategie', 'Template Design', 'Fotografie', 'E-mailflows'].map(s => (
              <li key={s}>
                <a href="#services"
                  onClick={e => { e.preventDefault(); go('services'); }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#C5D4C0'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(197,212,192,.35)'; }}
                  style={{
                    fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: '.83rem',
                    color: 'rgba(197,212,192,.35)', textDecoration: 'none',
                    transition: 'color .25s',
                  }}>{s}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* LINKS */}
        <div>
          <p style={{
            fontFamily: "'Jost',sans-serif", fontSize: '.5rem', fontWeight: 600,
            letterSpacing: '.25em', textTransform: 'uppercase' as const,
            color: 'rgba(197,212,192,.25)', marginBottom: '1.6rem', marginTop: 0,
          }}>Links</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
            {[
              { label: 'Home',      id: 'home'      },
              { label: 'Over Ons',  id: 'about'     },
              { label: 'Services',  id: 'services'  },
              { label: 'Portfolio', id: 'portfolio' },
              { label: 'Contact',   id: 'contact'   },
            ].map(({ label, id }) => (
              <li key={id}>
                <a href={`#${id}`}
                  onClick={e => { e.preventDefault(); go(id); }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#C5D4C0'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(197,212,192,.35)'; }}
                  style={{
                    fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: '.83rem',
                    color: 'rgba(197,212,192,.35)', textDecoration: 'none',
                    transition: 'color .25s',
                  }}>{label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <p style={{
              fontFamily: "'Jost',sans-serif", fontSize: '.5rem', fontWeight: 600,
              letterSpacing: '.25em', textTransform: 'uppercase' as const,
              color: 'rgba(197,212,192,.25)', marginBottom: '1.6rem', marginTop: 0,
            }}>Contact</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
              <a href="mailto:info@aestheticsocialhaus.nl"
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#C5D4C0'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(197,212,192,.35)'; }}
                style={{
                  fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: '.83rem',
                  color: 'rgba(197,212,192,.35)', textDecoration: 'none', transition: 'color .25s',
                }}>info@aestheticsocialhaus.nl</a>
              <a href="tel:+31641299424"
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#C5D4C0'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(197,212,192,.35)'; }}
                style={{
                  fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: '.83rem',
                  color: 'rgba(197,212,192,.35)', textDecoration: 'none', transition: 'color .25s',
                }}>+316 412 994 24</a>
              <span style={{
                fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: '.83rem',
                color: 'rgba(197,212,192,.2)',
              }}>Nederland</span>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => go('contact')}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#8FA887'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#C5D4C0'; }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '.6rem',
              background: '#C5D4C0', color: '#080604',
              padding: '.85rem 1.6rem',
              fontFamily: "'Jost',sans-serif", fontSize: '.6rem', fontWeight: 700,
              letterSpacing: '.2em', textTransform: 'uppercase' as const,
              border: 'none', cursor: 'pointer',
              transition: 'background .3s ease', width: 'fit-content',
            }}>
            Plan Gesprek <ArrowRight size={11} />
          </button>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div style={{
        borderTop: '1px solid rgba(197,212,192,.06)',
        maxWidth: '1400px', margin: '0 auto',
        padding: '1.4rem clamp(1.5rem,5vw,5rem)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '1rem',
      }}>
        <span style={{
          fontFamily: "'Jost',sans-serif", fontSize: '.55rem', fontWeight: 300,
          letterSpacing: '.12em', color: 'rgba(197,212,192,.2)',
        }}>
          © {new Date().getFullYear()} Aesthetic Social Haus. All rights reserved.
        </span>
        <span style={{
          fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontStyle: 'italic',
          fontSize: '.85rem', color: 'rgba(197,212,192,.18)',
        }}>
          Transformeer je merk.
        </span>
      </div>

      <style>{`
        .foot-main { grid-template-columns: 1fr; }
        @media(min-width: 600px)  { .foot-main { grid-template-columns: 1fr 1fr !important; } }
        @media(min-width: 1024px) { .foot-main { grid-template-columns: 1.2fr 1fr 1fr 1.2fr !important; } }
        @keyframes fticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-12.5%); }
        }
      `}</style>
    </footer>
  );
}