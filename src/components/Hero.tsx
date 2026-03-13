import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

const STATS = [
  { value: '150+', label: 'Happy Clients' },
  { value: '500+', label: 'Projects Done' },
  { value: '10M+', label: 'Reach Generated' },
  { value: '98%',  label: 'Client Satisfaction' },
];

const SERVICES = ['META ADS', 'CONTENTCREATIE', 'SOCIAL MEDIA MANAGEMENT', 'BRAND STRATEGIE'];

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col bg-ash-cream overflow-hidden"
    >
      {/* Subtiele sage accent balk bovenaan */}
      <div className="h-1 w-full bg-ash-sage" />

      {/* Services ticker */}
      <div className="border-b border-ash-light">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-center gap-10 md:gap-16">
          {SERVICES.map((s) => (
            <span
              key={s}
              className="text-[10px] tracking-[0.18em] text-ash-mid font-sans font-medium hidden sm:inline"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Hero inhoud */}
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 border border-ash-light rounded-full px-5 py-2 mb-10 transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-ash-sage-dark inline-block" />
            <span className="text-xs tracking-[0.2em] text-ash-mid font-sans uppercase">
              Premium Marketing Agency
            </span>
          </div>

          {/* Heading */}
          <h1
            className={`font-serif text-5xl md:text-7xl lg:text-8xl text-ash-dark mb-6 leading-none transition-all duration-1000 delay-100 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Transformeer Je
            <br />
            <span className="italic text-ash-brown">Social Media</span>
          </h1>

          {/* Divider */}
          <div
            className={`w-16 h-px bg-ash-light mx-auto mb-8 transition-all duration-700 delay-200 ${
              visible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            }`}
          />

          {/* Subtekst */}
          <p
            className={`font-sans font-light text-lg md:text-xl text-ash-mid max-w-2xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-200 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Wij ontwikkelen op maat gemaakte strategieën die ervoor zorgen dat je niet alleen
            gezien wordt, maar ook{' '}
            <em className="not-italic font-medium text-ash-dark">onthouden</em>.
          </p>

          {/* CTA buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-300 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <button
              onClick={() => scrollTo('contact')}
              className="group flex items-center gap-2 bg-ash-brown text-ash-cream px-8 py-4 text-sm tracking-[0.12em] uppercase font-sans font-medium hover:bg-ash-dark transition-colors duration-300"
            >
              Werken Met Ons
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button
              onClick={() => scrollTo('portfolio')}
              className="border border-ash-light text-ash-brown px-8 py-4 text-sm tracking-[0.12em] uppercase font-sans font-medium hover:border-ash-brown hover:bg-ash-brown hover:text-ash-cream transition-all duration-300"
            >
              Bekijk Portfolio
            </button>
          </div>
        </div>
      </div>

      {/* Stats balk */}
      <div
        className={`border-t border-ash-light transition-all duration-1000 delay-500 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <div className="font-serif text-4xl text-ash-dark mb-1">{value}</div>
              <div className="font-sans text-[10px] tracking-[0.18em] text-ash-mid uppercase">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}