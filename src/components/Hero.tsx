import { ArrowRight } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

const STATS = [
  { value: '150+', label: 'Happy Clients' },
  { value: '500+', label: 'Projects Done' },
  { value: '10M+', label: 'Reach Generated' },
  { value: '98%',  label: 'Client Satisfaction' },
];

const TICKER_ITEMS = [
  'META ADS', '✦', 'CONTENTCREATIE', '✦', 'SOCIAL MEDIA', '✦',
  'BRAND STRATEGIE', '✦', 'META ADS', '✦', 'CONTENTCREATIE', '✦',
  'SOCIAL MEDIA', '✦', 'BRAND STRATEGIE', '✦',
];

export default function Hero() {
  const [phase, setPhase] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  // Staggered entrance
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 600),
      setTimeout(() => setPhase(3), 1100),
      setTimeout(() => setPhase(4), 1600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Floating orb canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const orbs = Array.from({ length: 6 }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 180 + Math.random() * 220,
      speed: 0.0003 + Math.random() * 0.0004,
      phase: Math.random() * Math.PI * 2,
      color: i % 2 === 0 ? '197,212,192' : '61,52,38',
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      orbs.forEach((orb) => {
        const x = orb.x + Math.sin(frame * orb.speed + orb.phase) * 120;
        const y = orb.y + Math.cos(frame * orb.speed * 0.7 + orb.phase) * 80;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, orb.r);
        grad.addColorStop(0, `rgba(${orb.color},0.13)`);
        grad.addColorStop(1, `rgba(${orb.color},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: '#0D0B08' }}
    >
      {/* Animated orb canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.9 }}
      />

      {/* Film grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.04,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Cinematic scanline */}
      <div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(197,212,192,0.4), transparent)',
          animation: 'scanline 8s ease-in-out infinite',
        }}
      />

      {/* Top gradient line */}
      <div
        className="relative z-10 h-px w-full"
        style={{ background: 'linear-gradient(90deg, transparent, #C5D4C0, transparent)' }}
      />

      {/* Scrolling ticker */}
      <div
        className="relative z-10 border-b overflow-hidden"
        style={{ borderColor: 'rgba(197,212,192,0.15)' }}
      >
        <div
          className="flex gap-10 py-3 whitespace-nowrap"
          style={{ animation: 'ticker 25s linear infinite' }}
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className="text-[9px] tracking-[0.25em] font-medium shrink-0"
              style={{
                color: item === '✦' ? '#C5D4C0' : 'rgba(197,212,192,0.45)',
                fontFamily: "'Jost', sans-serif",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-24">

        {/* Overline badge */}
        <div
          className="flex items-center gap-3 mb-14 transition-all duration-700"
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? 'translateY(0)' : 'translateY(16px)',
          }}
        >
          <div className="h-px w-10" style={{ background: '#C5D4C0' }} />
          <span
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '0.6rem',
              fontWeight: 500,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#C5D4C0',
            }}
          >
            Premium Marketing Agency — Est. 2024
          </span>
          <div className="h-px w-10" style={{ background: '#C5D4C0' }} />
        </div>

        {/* Cinematic headline */}
        <div className="text-center max-w-6xl mx-auto mb-10">
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: 'clamp(4rem, 12vw, 11rem)',
              color: '#F0EDE6',
              letterSpacing: '-0.02em',
              lineHeight: 0.95,
              marginBottom: '0.1em',
              opacity: phase >= 2 ? 1 : 0,
              transform: phase >= 2 ? 'translateY(0)' : 'translateY(32px)',
              transition: 'all 1s ease',
            }}
          >
            Transformeer
          </h1>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(4rem, 12vw, 11rem)',
              letterSpacing: '-0.02em',
              lineHeight: 0.95,
              backgroundImage: 'linear-gradient(135deg, #C5D4C0 0%, #F0EDE6 45%, #8FA887 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              opacity: phase >= 2 ? 1 : 0,
              transform: phase >= 2 ? 'translateY(0)' : 'translateY(32px)',
              transition: 'all 1s ease 150ms',
            }}
          >
            Je Merk.
          </h1>
        </div>

        {/* Subtext + CTAs */}
        <div
          className="flex flex-col md:flex-row items-center gap-10 md:gap-14 mt-4"
          style={{
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.9s ease',
          }}
        >
          <p
            className="max-w-[280px] text-center md:text-left leading-loose"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 300,
              fontSize: '0.9rem',
              color: 'rgba(197,212,192,0.6)',
            }}
          >
            Strategieën die ervoor zorgen dat je niet alleen gezien wordt, maar ook{' '}
            <span style={{ color: '#C5D4C0', fontWeight: 400 }}>onthouden</span>.
          </p>

          <div className="h-12 w-px hidden md:block" style={{ background: 'rgba(197,212,192,0.2)' }} />

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => scrollTo('contact')}
              onMouseEnter={e => (e.currentTarget.style.background = '#8FA887')}
              onMouseLeave={e => (e.currentTarget.style.background = '#C5D4C0')}
              className="group flex items-center gap-3"
              style={{
                background: '#C5D4C0',
                color: '#0D0B08',
                padding: '1rem 2rem',
                fontFamily: "'Jost', sans-serif",
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.3s ease',
              }}
            >
              Werken Met Ons
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollTo('portfolio')}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#C5D4C0';
                e.currentTarget.style.color = '#F0EDE6';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(197,212,192,0.25)';
                e.currentTarget.style.color = '#C5D4C0';
              }}
              style={{
                background: 'transparent',
                color: '#C5D4C0',
                padding: '1rem 2rem',
                fontFamily: "'Jost', sans-serif",
                fontSize: '0.65rem',
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                border: '1px solid rgba(197,212,192,0.25)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              Bekijk Portfolio
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="mt-20 flex flex-col items-center gap-2"
          style={{
            opacity: phase >= 4 ? 0.45 : 0,
            transition: 'opacity 1s ease',
          }}
        >
          <div
            className="w-px"
            style={{
              height: '52px',
              background: 'linear-gradient(to bottom, transparent, #C5D4C0)',
              animation: 'breathe 2.5s ease-in-out infinite',
            }}
          />
          <span
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '0.55rem',
              letterSpacing: '0.3em',
              color: 'rgba(197,212,192,0.5)',
              textTransform: 'uppercase',
            }}
          >
            Scroll
          </span>
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div
        className="relative z-10 border-t"
        style={{
          borderColor: 'rgba(197,212,192,0.12)',
          opacity: phase >= 4 ? 1 : 0,
          transform: phase >= 4 ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 1s ease',
        }}
      >
        <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4">
          {STATS.map(({ value, label }, i) => (
            <div
              key={label}
              className="text-center py-4"
              style={{
                borderRight: i < 3 ? '1px solid rgba(197,212,192,0.1)' : 'none',
              }}
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                  color: '#F0EDE6',
                  lineHeight: 1,
                  marginBottom: '0.4rem',
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '0.58rem',
                  letterSpacing: '0.22em',
                  color: 'rgba(197,212,192,0.4)',
                  textTransform: 'uppercase',
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes scanline {
          0%   { top: -2%; opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { top: 105%; opacity: 0; }
        }
        @keyframes breathe {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50%      { opacity: 1;   transform: scaleY(1.15); }
        }
      `}</style>
    </section>
  );
}