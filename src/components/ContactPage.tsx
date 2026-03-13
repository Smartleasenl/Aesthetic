import { ArrowRight, Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ContactPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [form, setForm] = useState({ naam: '', email: '', telefoon: '', bedrijf: '', dienst: '', bericht: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async () => {
    setSending(true);
    await new Promise(r => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
  };

  const inp = (extra?: React.CSSProperties): React.CSSProperties => ({
    width: '100%', background: 'rgba(197,212,192,.04)', border: '1px solid rgba(197,212,192,.12)',
    padding: '1rem 1.2rem', fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: '.88rem',
    color: '#F0EDE6', outline: 'none', transition: 'border-color .25s', boxSizing: 'border-box',
    ...extra,
  });

  return (
    <div style={{ paddingTop: '80px', background: '#080604', minHeight: '100vh' }}>

      {/* HERO */}
      <div style={{ padding: 'clamp(5rem,10vw,10rem) clamp(1.5rem,5vw,5rem) clamp(3rem,5vw,5rem)', borderBottom: '1px solid rgba(197,212,192,.07)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <span style={{ fontFamily: "'Jost',sans-serif", fontSize: '.55rem', fontWeight: 500, letterSpacing: '.3em', textTransform: 'uppercase', color: '#C5D4C0', display: 'block', marginBottom: '2rem' }}>Contact</span>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(3.5rem,8vw,9rem)', color: '#F0EDE6', lineHeight: .88, letterSpacing: '-.04em', margin: '0 0 1.5rem' }}>
            Laten we<br /><em style={{ fontStyle: 'italic', color: '#C5D4C0' }}>kennismaken.</em>
          </h1>
          <p style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: 'clamp(.85rem,1.5vw,1rem)', color: 'rgba(197,212,192,.45)', lineHeight: 1.85, maxWidth: '420px', margin: 0 }}>
            Vertel ons over je merk en doelen. We nemen binnen 24 uur contact met je op voor een gratis strategiegesprek.
          </p>
        </div>
        <div style={{ position: 'absolute', right: '-3rem', top: '50%', transform: 'translateY(-50%)', fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(14rem,28vw,32rem)', fontWeight: 300, color: 'rgba(197,212,192,.025)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>C</div>
      </div>

      {/* MAIN — form + info */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(3rem,6vw,6rem) clamp(1.5rem,5vw,5rem)', display: 'grid', gap: 'clamp(3rem,6vw,7rem)' }} className="contact-main">

        {/* FORM */}
        <div>
          {sent ? (
            <div style={{ padding: '4rem 3rem', border: '1px solid rgba(197,212,192,.12)', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,4vw,3.5rem)', color: '#C5D4C0', fontWeight: 300, marginBottom: '1rem' }}>Bedankt!</div>
              <p style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: '.88rem', color: 'rgba(197,212,192,.5)', lineHeight: 1.8 }}>We hebben je bericht ontvangen en nemen binnen 24 uur contact met je op.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div style={{ display: 'grid', gap: '1.2rem' }} className="form-row">
                <div>
                  <label style={{ fontFamily: "'Jost',sans-serif", fontSize: '.5rem', fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(197,212,192,.3)', display: 'block', marginBottom: '.5rem' }}>Naam *</label>
                  <input name="naam" value={form.naam} onChange={handle} placeholder="Jouw naam"
                    onFocus={e => { e.target.style.borderColor = 'rgba(197,212,192,.35)'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(197,212,192,.12)'; }}
                    style={inp()} />
                </div>
                <div>
                  <label style={{ fontFamily: "'Jost',sans-serif", fontSize: '.5rem', fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(197,212,192,.3)', display: 'block', marginBottom: '.5rem' }}>E-mail *</label>
                  <input name="email" type="email" value={form.email} onChange={handle} placeholder="jouw@email.nl"
                    onFocus={e => { e.target.style.borderColor = 'rgba(197,212,192,.35)'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(197,212,192,.12)'; }}
                    style={inp()} />
                </div>
              </div>
              <div style={{ display: 'grid', gap: '1.2rem' }} className="form-row">
                <div>
                  <label style={{ fontFamily: "'Jost',sans-serif", fontSize: '.5rem', fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(197,212,192,.3)', display: 'block', marginBottom: '.5rem' }}>Telefoon</label>
                  <input name="telefoon" value={form.telefoon} onChange={handle} placeholder="+31 6 ..."
                    onFocus={e => { e.target.style.borderColor = 'rgba(197,212,192,.35)'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(197,212,192,.12)'; }}
                    style={inp()} />
                </div>
                <div>
                  <label style={{ fontFamily: "'Jost',sans-serif", fontSize: '.5rem', fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(197,212,192,.3)', display: 'block', marginBottom: '.5rem' }}>Bedrijfsnaam</label>
                  <input name="bedrijf" value={form.bedrijf} onChange={handle} placeholder="Jouw bedrijf"
                    onFocus={e => { e.target.style.borderColor = 'rgba(197,212,192,.35)'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(197,212,192,.12)'; }}
                    style={inp()} />
                </div>
              </div>
              <div>
                <label style={{ fontFamily: "'Jost',sans-serif", fontSize: '.5rem', fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(197,212,192,.3)', display: 'block', marginBottom: '.5rem' }}>Dienst</label>
                <select name="dienst" value={form.dienst} onChange={handle}
                  onFocus={e => { e.target.style.borderColor = 'rgba(197,212,192,.35)'; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(197,212,192,.12)'; }}
                  style={{ ...inp(), appearance: 'none' }}>
                  <option value="" style={{ background: '#080604' }}>Selecteer een dienst</option>
                  {['Meta Ads', 'Contentcreatie', 'Social Media Management', 'Brand Strategie', 'Template Design', 'Fotografie', 'Combinatie / Alles'].map(d => (
                    <option key={d} value={d} style={{ background: '#080604' }}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ fontFamily: "'Jost',sans-serif", fontSize: '.5rem', fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(197,212,192,.3)', display: 'block', marginBottom: '.5rem' }}>Bericht *</label>
                <textarea name="bericht" value={form.bericht} onChange={handle} rows={5} placeholder="Vertel ons over je merk, doelen en vragen..."
                  onFocus={e => { e.target.style.borderColor = 'rgba(197,212,192,.35)'; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(197,212,192,.12)'; }}
                  style={{ ...inp({ resize: 'vertical', minHeight: '140px' }) }} />
              </div>
              <button
                onClick={submit}
                disabled={sending || !form.naam || !form.email || !form.bericht}
                onMouseEnter={e => { if (!sending) (e.currentTarget as HTMLElement).style.background = '#8FA887'; }}
                onMouseLeave={e => { if (!sending) (e.currentTarget as HTMLElement).style.background = '#C5D4C0'; }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '.7rem', background: '#C5D4C0', color: '#080604', padding: '1.1rem 2.2rem', fontFamily: "'Jost',sans-serif", fontSize: '.63rem', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', border: 'none', cursor: sending ? 'wait' : 'pointer', transition: 'background .3s', width: 'fit-content', opacity: (!form.naam || !form.email || !form.bericht) ? .5 : 1 }}>
                {sending ? 'Verzenden...' : <>Verstuur Bericht <ArrowRight size={12} /></>}
              </button>
            </div>
          )}
        </div>

        {/* INFO */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          <div>
            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '.5rem', fontWeight: 600, letterSpacing: '.25em', textTransform: 'uppercase', color: 'rgba(197,212,192,.28)', marginBottom: '1.5rem', marginTop: 0 }}>Direct contact</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {[
                { Icon: Mail, label: 'info@aestheticsocialhaus.nl', href: 'mailto:info@aestheticsocialhaus.nl' },
                { Icon: Phone, label: '+316 412 994 24', href: 'tel:+31641299424' },
                { Icon: MapPin, label: 'Nederland', href: null },
              ].map(({ Icon, label, href }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '2.2rem', height: '2.2rem', border: '1px solid rgba(197,212,192,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(197,212,192,.3)', flexShrink: 0 }}>
                    <Icon size={13} />
                  </div>
                  {href ? (
                    <a href={href}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#C5D4C0'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(197,212,192,.45)'; }}
                      style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: '.85rem', color: 'rgba(197,212,192,.45)', textDecoration: 'none', transition: 'color .25s' }}>{label}</a>
                  ) : (
                    <span style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: '.85rem', color: 'rgba(197,212,192,.3)' }}>{label}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(197,212,192,.07)', paddingTop: '2.5rem' }}>
            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '.5rem', fontWeight: 600, letterSpacing: '.25em', textTransform: 'uppercase', color: 'rgba(197,212,192,.28)', marginBottom: '1.5rem', marginTop: 0 }}>Volg ons</p>
            <div style={{ display: 'flex', gap: '.55rem' }}>
              {[
                { Icon: Instagram, url: 'https://www.instagram.com/aestheticsocialhaus/' },
                { Icon: Facebook, url: 'https://www.facebook.com/aestheticsocialhaus/' },
                { Icon: Linkedin, url: 'https://www.linkedin.com/company/aestheticsocialhaus' },
              ].map(({ Icon, url }) => (
                <a key={url} href={url} target="_blank" rel="noreferrer"
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(197,212,192,.4)'; el.style.color = '#C5D4C0'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(197,212,192,.1)'; el.style.color = 'rgba(197,212,192,.28)'; }}
                  style={{ width: '2.2rem', height: '2.2rem', border: '1px solid rgba(197,212,192,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(197,212,192,.28)', textDecoration: 'none', transition: 'all .3s' }}>
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(197,212,192,.07)', paddingTop: '2.5rem' }}>
            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '.5rem', fontWeight: 600, letterSpacing: '.25em', textTransform: 'uppercase', color: 'rgba(197,212,192,.28)', marginBottom: '1.2rem', marginTop: 0 }}>Reactietijd</p>
            <p style={{ fontFamily: "'Jost',sans-serif", fontWeight: 300, fontSize: '.82rem', color: 'rgba(197,212,192,.38)', lineHeight: 1.75, margin: 0 }}>
              Wij reageren doorgaans binnen 24 uur op werkdagen. Voor dringende vragen bel je ons direct.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .contact-main { grid-template-columns: 1fr; }
        @media(min-width:900px) { .contact-main { grid-template-columns: 1.6fr 1fr !important; } }
        .form-row { grid-template-columns: 1fr; }
        @media(min-width:600px) { .form-row { grid-template-columns: 1fr 1fr !important; } }
        input::placeholder, textarea::placeholder { color: rgba(197,212,192,.2); }
        select option { background: #080604; color: #F0EDE6; }
      `}</style>
    </div>
  );
}