import { Heart, Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="text-2xl font-bold mb-4">
              AESTHETIC
              <span className="text-rose-400"> SOCIAL HAUS</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Wij transformeren merken met strategie, creativiteit en resultaat. Gerichte aanpak, hoogwaardige content en meetbare groei.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, url: 'https://www.instagram.com/aestheticsocialhaus/' },
                { Icon: Facebook, url: 'https://www.facebook.com/aestheticsocialhaus/' },
                { Icon: Linkedin, url: 'https://www.linkedin.com/company/aestheticsocialhaus' },
                { Icon: Youtube, url: 'https://www.youtube.com/@aestheticsocialhaus' },
              ].map(({ Icon, url }, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-rose-500 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Diensten</h3>
            <ul className="space-y-3 text-gray-400">
              {['Meta Ads', 'Contentcreatie', 'Social Media Management', 'Brand Strategie', 'Template Design', 'Fotografie'].map((service) => (
                <li key={service}>
                  <a href="#services" className="hover:text-rose-400 transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Links</h3>
            <ul className="space-y-3 text-gray-400">
              {[
                { label: 'Home', href: '#home' },
                { label: 'Over Ons', href: '#about' },
                { label: 'Portfolio', href: '#portfolio' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(link.href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-rose-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="mailto:info@aestheticsocialhaus.nl" className="hover:text-rose-400 transition-colors">
                  info@aestheticsocialhaus.nl
                </a>
              </li>
              <li>
                <a href="tel:+31641299424" className="hover:text-rose-400 transition-colors">
                  +316 412 994 24
                </a>
              </li>
              <li>Nederland</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              Copyright {currentYear}. All rights reserved
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
              <span>by Aesthetic Social Haus</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
