import { BarChart3, Camera, Megaphone, Palette, Mail, Zap, TrendingUp, Target } from 'lucide-react';
import { useState } from 'react';

const services = [
  {
    icon: Megaphone,
    title: 'Meta Ads',
    description: 'Data-driven advertentiecampagnes die conversies maximaliseren en ROI verhogen.',
    features: ['Facebook Ads', 'Instagram Ads', 'Audience Targeting', 'A/B Testing'],
  },
  {
    icon: Camera,
    title: 'Contentcreatie',
    description: 'Visueel aantrekkelijke content die jouw merk laat stralen en opvalt in de feed.',
    features: ['Video Content', 'Fotografie', 'Graphic Design', 'Storytelling'],
  },
  {
    icon: BarChart3,
    title: 'Social Media Management',
    description: 'Volledige social media strategie en uitvoering voor consistente groei.',
    features: ['Content Planning', 'Community Management', 'Analytics', 'Engagement'],
  },
  {
    icon: Palette,
    title: 'Brand Strategie',
    description: 'Ontwikkel een unieke merkidentiteit die resoneert met jouw doelgroep.',
    features: ['Brand Identity', 'Visual Guidelines', 'Tone of Voice', 'Positioning'],
  },
  {
    icon: Target,
    title: 'Template Design',
    description: 'Professionele templates die tijd besparen en consistentie waarborgen.',
    features: ['Social Templates', 'Story Templates', 'Post Designs', 'Brand Assets'],
  },
  {
    icon: Mail,
    title: 'E-mailflows',
    description: 'Geautomatiseerde e-mailcampagnes die klanten binden en conversies stimuleren.',
    features: ['Welcome Series', 'Nurture Flows', 'Newsletter', 'Automation'],
  },
  {
    icon: Zap,
    title: 'Automatiseringen',
    description: 'Slimme tools die werk uit handen nemen en efficiëntie vergroten.',
    features: ['Workflow Automation', 'Scheduling', 'Reporting', 'Integration'],
  },
  {
    icon: TrendingUp,
    title: 'Fotografie',
    description: 'Professionele fotografie die jouw producten en diensten perfect in beeld brengt.',
    features: ['Product Fotografie', 'Brand Shoots', 'Lifestyle Content', 'Editing'],
  },
];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Wat Wij <span className="text-rose-500">Doen</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Volledige Marketing & Strategie voor bedrijven die willen groeien met stijl en resultaat
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="relative z-10">
                  <div
                    className={`w-14 h-14 rounded-xl bg-rose-100 flex items-center justify-center mb-4 transition-all duration-300 ${
                      hoveredIndex === index ? 'bg-rose-500 scale-110 rotate-6' : ''
                    }`}
                  >
                    <Icon
                      className={`w-7 h-7 transition-colors ${
                        hoveredIndex === index ? 'text-white' : 'text-rose-500'
                      }`}
                    />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-rose-500 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-xs text-gray-500 flex items-center gap-2">
                        <div className="w-1 h-1 bg-rose-400 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
