import { ArrowRight, Mail, Phone, Instagram } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ naam:'', email:'', telefoon:'', bedrijf:'', bericht:'' });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const inputStyle: React.CSSProperties = {
    background:'rgba(197,212,192,.04)',
    border:'1px solid rgba(197,212,192,.12)',
    padding:'.85rem 1rem',
    fontFamily:"'Jost',sans-serif",
    fontSize:'.85rem',
    fontWeight:300,
    color:'#F0EDE6',
    outline:'none',
    width:'100%',
    boxSizing:'border-box',
    transition:'border-color .2s ease',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily:"'Jost',sans-serif",
    fontSize:'.55rem',
    fontWeight:500,
    letterSpacing:'.2em',
    textTransform:'uppercase',
    color:'rgba(197,212,192,.4)',
    display:'block',
    marginBottom:'.5rem',
  };

  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    { e.currentTarget.style.borderColor = 'rgba(197,212,192,.35)'; };
  const blur  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    { e.currentTarget.style.borderColor = 'rgba(197,212,192,.12)'; };

  return (
    <section id="contact" style={{ background:'#0D0B08', padding:'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,5rem)' }}>
      <div style={{ maxWidth:'1400px', margin:'0 auto', display:'grid', gap:'5rem', alignItems:'start' }} className="ct-grid">

        {/* LEFT */}
        <div style={{ display:'flex', flexDirection:'column', gap:'3rem' }}>
          <div>
            <span style={{ fontFamily:"'Jost',sans-serif", fontSize:'.58rem', fontWeight:500, letterSpacing:'.25em', textTransform:'uppercase', color:'#8FA887', display:'block', marginBottom:'1.5rem' }}>Contact</span>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:'clamp(2.5rem,5vw,5rem)', color:'#F0EDE6', lineHeight:.9, letterSpacing:'-.025em', margin:'0 0 2rem' }}>
              Laten we<br /><em style={{ color:'#C5D4C0' }}>praten.</em>
            </h2>
            <p style={{ fontFamily:"'Jost',sans-serif", fontWeight:300, fontSize:'.88rem', color:'rgba(197,212,192,.45)', lineHeight:1.85, maxWidth:'320px', margin:0 }}>
              Wil je een opvallende online aanwezigheid creëren? Plan een vrijblijvend gesprek en ontdek hoe wij jouw merk transformeren.
            </p>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            {[
              { icon:<Mail size={14}/>,      label:'Email',     val:'info@aestheticsocialhaus.nl' },
              { icon:<Phone size={14}/>,     label:'Telefoon',  val:'+31 6 412 994 24'            },
              { icon:<Instagram size={14}/>, label:'Instagram', val:'@aestheticsocialhaus'        },
            ].map(({ icon, label, val }) => (
              <div key={label} style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
                <div style={{ width:'2.2rem', height:'2.2rem', border:'1px solid rgba(197,212,192,.12)', display:'flex', alignItems:'center', justifyContent:'center', color:'rgba(197,212,192,.4)', flexShrink:0 }}>
                  {icon}
                </div>
                <div>
                  <div style={{ fontFamily:"'Jost',sans-serif", fontSize:'.5rem', letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(197,212,192,.28)', marginBottom:'.15rem' }}>{label}</div>
                  <div style={{ fontFamily:"'Jost',sans-serif", fontSize:'.83rem', fontWeight:300, color:'rgba(197,212,192,.6)' }}>{val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — FORM */}
        <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
          <div style={{ display:'grid', gap:'1.5rem' }} className="ct-row">
            <div>
              <label style={labelStyle}>Naam *</label>
              <input style={inputStyle} placeholder="Je volledige naam" value={form.naam} onChange={set('naam')} onFocus={focus} onBlur={blur} />
            </div>
            <div>
              <label style={labelStyle}>Email *</label>
              <input type="email" style={inputStyle} placeholder="je@email.nl" value={form.email} onChange={set('email')} onFocus={focus} onBlur={blur} />
            </div>
          </div>
          <div style={{ display:'grid', gap:'1.5rem' }} className="ct-row">
            <div>
              <label style={labelStyle}>Telefoon</label>
              <input style={inputStyle} placeholder="+31 6 ..." value={form.telefoon} onChange={set('telefoon')} onFocus={focus} onBlur={blur} />
            </div>
            <div>
              <label style={labelStyle}>Bedrijfsnaam</label>
              <input style={inputStyle} placeholder="Je bedrijf" value={form.bedrijf} onChange={set('bedrijf')} onFocus={focus} onBlur={blur} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Bericht</label>
            <textarea rows={5} style={{ ...inputStyle, resize:'vertical', lineHeight:1.7 }} placeholder="Vertel ons over jouw merk en doelen..." value={form.bericht} onChange={set('bericht')} onFocus={focus} onBlur={blur} />
          </div>

          <button
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='#8FA887'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='#C5D4C0'; }}
            style={{ display:'inline-flex', alignItems:'center', gap:'.75rem', background:'#C5D4C0', color:'#080604', padding:'1.1rem 2.5rem', fontFamily:"'Jost',sans-serif", fontSize:'.65rem', fontWeight:700, letterSpacing:'.2em', textTransform:'uppercase', border:'none', cursor:'pointer', transition:'background .3s ease', width:'fit-content' }}>
            Verstuur Bericht <ArrowRight size={13} />
          </button>
        </div>
      </div>

      <style>{`
        .ct-grid{grid-template-columns:1fr}
        @media(min-width:860px){.ct-grid{grid-template-columns:1fr 1.5fr!important}}
        .ct-row{grid-template-columns:1fr}
        @media(min-width:540px){.ct-row{grid-template-columns:1fr 1fr!important}}
        #contact input::placeholder,#contact textarea::placeholder{color:rgba(197,212,192,.2)}
      `}</style>
    </section>
  );
}