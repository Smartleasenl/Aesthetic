import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = ['home', 'services', 'about', 'portfolio', 'contact'];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F0EDE6] border-b border-[#DDD8CF] py-4'
          : 'bg-[#F0EDE6] border-b border-[#DDD8CF] py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => scrollToSection('home')}
          className="font-serif text-lg tracking-[0.08em] text-[#2C2416] leading-tight text-left"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          AESTHETIC<br />
          <span className="font-light">SOCIAL HAUS</span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-[10px] font-sans font-medium uppercase tracking-[0.18em] text-[#7A6A52] hover:text-[#2C2416] transition-colors duration-200"
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('contact')}
            className="bg-[#3D3426] text-[#F0EDE6] px-6 py-2.5 text-[10px] font-sans font-medium uppercase tracking-[0.15em] hover:bg-[#2C2416] transition-colors duration-200"
          >
            Werken Met Ons
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-[#2C2416]"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#F0EDE6] border-t border-[#DDD8CF]">
          <div className="flex flex-col px-6 py-6 gap-5">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-left text-[10px] font-sans font-medium uppercase tracking-[0.18em] text-[#7A6A52] hover:text-[#2C2416] transition-colors"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-[#3D3426] text-[#F0EDE6] px-6 py-3 text-[10px] font-sans font-medium uppercase tracking-[0.15em] hover:bg-[#2C2416] transition-colors mt-2"
            >
              Werken Met Ons
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}