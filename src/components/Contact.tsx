import { useState } from 'react';
import { ArrowRight, Mail, Phone, Instagram } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ naam:'', email:'', telefoon:'', bedrijf:'', bericht:'' });
  const [hov, setHov] = useState<string|null>(null);

  const field = (label:string, key:keyof typeof form, type='text', placeholder='') => (
    <div style={{display:'flex',flexDirection:'column',gap:'.5rem'}}>
      <label style={{fontFamily:"'Jost',sans-serif",fontSize:'.57rem',fontWeight:500,
        letterSpacing:'.2em',textTransform:'uppercase',color:'#8FA887'}}>
        {label}
      </label>
      {key==='bericht' ? (
        <textarea
          rows={4}
          placeholder={placeholder}
          value={form[key]}
          onChange={e=>setForm(f=>({...f,[key]:e.target.value}))}
          style={{background:'rgba(197,212,192,.05)',border:'1px solid rgba(197,212,192,.15)',
            padding:'.85rem 1rem',fontFamily:"'Jost',sans-serif",fontSize:'.85rem',fontWeight:300,
            color:'#F0EDE6',outline:'none',resize:'vertical',
            transition:'border-color .2s ease',lineHeight:1.7}}
          onFocus={e=>{e.currentTarget.style.borderColor='rgba(197,212,192,.4)'}}
          onBlur={e=>{e.currentTarget.style.borderColor='rgba(197,212,192,.15)'}}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={form[key]}
          onChange={e=>setForm(f=>({...f,[key]:e.target.value}))}
          style={{background:'rgba(197,212,192,.05)',border:'1px solid rgba(197,212,192,.15)',
            padding:'.85rem 1rem',fontFamily:"'Jost',sans-serif",fontSize:'.85rem',fontWeight:300,
            color:'#F0EDE6',outline:'none',transition:'border-color .2s ease'}}
          onFocus={e=>{e.currentTarget.style.borderColor='rgba(197,212,192,.4)'}}
          onBlur={e=>{e.currentTarget.style.borderColor='rgba(197,212,192,.15)'}}
        />
      )}
    </div>
  );

  return (
    <section id="contact" style={{background:'#0D0B08',padding:'clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,5rem)'}}>
      <div style={{maxWidth:'1400px',margin:'0 auto',display:'grid',gap:'5rem'}} className="contact-grid">

        {/* LEFT — info */}
        <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',gap:'3rem'}}>
          <div>
            <span style={{fontFamily:"'Jost',sans-serif",fontSize:'.58rem',fontWeight:500,
              letterSpacing:'.25em',textTransform:'uppercase',color:'#8FA887',display:'block',marginBottom:'1.5rem'}}>Contact</span>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,
              fontSize:'clamp(2.5rem,5vw,5rem)',color:'#F0EDE6',lineHeight:.92,
              letterSpacing:'-.025em',margin:'0 0 2rem'}}>
              Laten we<br /><em style={{color:'#C5D4C0'}}>praten.</em>
            </h2>
            <p style={{fontFamily:"'Jost',sans-serif",fontWeight:300,fontSize:'.9rem',
              color:'rgba(197,212,192,.5)',lineHeight:1.85,maxWidth:'340px',margin:0}}>
              Wil je een opvallende online aanwezigheid creëren voor jouw bedrijf? Plan een vrijblijvend gesprek en ontdek hoe wij jouw merk kunnen transformeren.
            </p>
          </div>

          <div style={{display:'flex',flexDirection:'column',gap:'1.2rem'}}>
            {[
              {icon:<Mail size={15}/>, label:'Email', val:'info@aestheticsocialhaus.nl'},
              {icon:<Phone size={15}/>, label:'Telefoon', val:'+31 6 412 994 24'},
              {icon:<Instagram size={15}/>, label:'Instagram', val:'@aestheticsocialhaus'},
            ].map(({icon,label,val}) => (
              <div key={label} style={{display:'flex',alignItems:'center',gap:'1rem'}}>
                <div style={{width:'2.5rem',height:'2.5rem',border:'1px solid rgba(197,212,192,.15)',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  color:'rgba(197,212,192,.5)',flexShrink:0}}>
                  {icon}
                </div>
                <div>
                  <div style={{fontFamily:"'Jost',sans-serif",fontSize:'.55rem',letterSpacing:'.18em',
                    textTransform:'uppercase',color:'rgba(197,212,192,.35)',marginBottom:'.2rem'}}>{label}</div>
                  <div style={{fontFamily:"'Jost',sans-serif",fontSize:'.85rem',fontWeight:300,
                    color:'rgba(197,212,192,.7)'}}>{val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — form */}
        <div style={{display:'flex',flexDirection:'column',gap:'1.5rem'}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.5rem'}} className="form-row">
            {field('Naam *','naam','text','Je volledige naam')}
            {field('Email *','email','email','je@email.nl')}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.5rem'}} className="form-row">
            {field('Telefoon','telefoon','tel','+31 6 ...')}
            {field('Bedrijfsnaam','bedrijf','text','Je bedrijf')}
          </div>
          {field('Bericht','bericht','text','Vertel ons over jouw merk en doelen...')}

          <button
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='#8FA887'}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='#C5D4C0'}}
            style={{display:'inline-flex',alignItems:'center',gap:'.75rem',background:'#C5D4C0',
              color:'#080604',padding:'1.1rem 2.5rem',fontFamily:"'Jost',sans-serif",fontSize:'.68rem',
              fontWeight:700,letterSpacing:'.2em',textTransform:'uppercase',border:'none',
              cursor:'pointer',transition:'background .3s ease',width:'fit-content',marginTop:'.5rem'}}>
            Verstuur Bericht <ArrowRight size={13} />
          </button>
        </div>
      </div>

      <style>{`
        .contact-grid{grid-template-columns:1fr}
        @media(min-width:860px){.contact-grid{grid-template-columns:1fr 1.4fr!important}}
        @media(max-width:560px){.form-row{grid-template-columns:1fr!important}}
        #contact input::placeholder,#contact textarea::placeholder{color:rgba(197,212,192,.25)}
      `}</style>
    </section>
  );
}