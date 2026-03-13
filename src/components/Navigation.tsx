import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Home',      path: '/'          },
  { label: 'Services',  path: '/services'  },
  { label: 'About',     path: '/about'     },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Contact',   path: '/contact'   },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled]       = useState(false);
  const [isMobileMenuOpen, setMobileMenu] = useState(false);
  const navigate  = useNavigate();
  const location  = useLocation();

  useEffect(() => {
    const fn = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Sluit menu bij route-change
  useEffect(() => { setMobileMenu(false); }, [location.pathname]);

  const go = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: '#F0EDE6', borderBottom: '1px solid #DDD8CF',
      transition: 'all .3s',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: isScrolled ? '.9rem clamp(1.5rem,5vw,5rem)' : '1.1rem clamp(1.5rem,5vw,5rem)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* LOGO */}
        <button onClick={() => go('/')} style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1rem,1.5vw,1.1rem)', letterSpacing: '.08em', color: '#2C2416', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', lineHeight: 1.1, textTransform: 'uppercase', fontWeight: 400 }}>
          Aesthetic<br /><span style={{ fontWeight: 300 }}>Social Haus</span>
        </button>

        {/* DESKTOP */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="nav-desktop">
          {NAV_ITEMS.map(({ label, path }) => (
            <button key={path} onClick={() => go(path)}
              style={{
                fontFamily: "'Jost',sans-serif", fontSize: '.55rem', fontWeight: 500,
                letterSpacing: '.18em', textTransform: 'uppercase',
                color: isActive(path) ? '#2C2416' : '#7A6A52',
                background: 'none', border: 'none', cursor: 'pointer',
                borderBottom: isActive(path) ? '1px solid #2C2416' : '1px solid transparent',
                paddingBottom: '2px', transition: 'all .2s',
              }}
              onMouseEnter={e => { if (!isActive(path)) (e.currentTarget as HTMLElement).style.color = '#2C2416'; }}
              onMouseLeave={e => { if (!isActive(path)) (e.currentTarget as HTMLElement).style.color = '#7A6A52'; }}
            >{label}</button>
          ))}
          <button onClick={() => go('/contact')}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#2C2416'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#3D3426'; }}
            style={{ background: '#3D3426', color: '#F0EDE6', padding: '.6rem 1.4rem', fontFamily: "'Jost',sans-serif", fontSize: '.55rem', fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', transition: 'background .2s' }}>
            Werken Met Ons
          </button>
        </div>

        {/* HAMBURGER */}
        <button onClick={() => setMobileMenu(o => !o)}
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: '#2C2416', padding: '.3rem' }}
          className="nav-hamburger">
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div style={{ borderTop: '1px solid #DDD8CF', background: '#F0EDE6' }}>
          <div style={{ padding: '1.5rem clamp(1.5rem,5vw,5rem)', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {NAV_ITEMS.map(({ label, path }) => (
              <button key={path} onClick={() => go(path)}
                style={{ textAlign: 'left', fontFamily: "'Jost',sans-serif", fontSize: '.6rem', fontWeight: 500, letterSpacing: '.18em', textTransform: 'uppercase', color: isActive(path) ? '#2C2416' : '#7A6A52', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                {label}
              </button>
            ))}
            <button onClick={() => go('/contact')}
              style={{ background: '#3D3426', color: '#F0EDE6', padding: '.8rem 1.4rem', fontFamily: "'Jost',sans-serif", fontSize: '.6rem', fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', marginTop: '.5rem', width: 'fit-content' }}>
              Werken Met Ons
            </button>
          </div>
        </div>
      )}

      <style>{`
        .nav-desktop { display: flex !important; }
        .nav-hamburger { display: none !important; }
        @media(max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}