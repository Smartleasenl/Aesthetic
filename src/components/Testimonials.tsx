import { useEffect, useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Testimonial {
  id: string;
  client_name: string;
  company_name: string;
  position: string;
  testimonial: string;
  rating: number;
  image_url?: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const mockTestimonials = [
    {
      id: '1',
      client_name: 'Lara van der Veen',
      company_name: 'Lara Beauty Clinic',
      position: 'Founder & CEO',
      testimonial: 'Werken met Baris en het team van Aesthetic Social Haus heeft mijn bedrijf volledig veranderd. Voorheen voelde social media als iets dat "erbij hoorde", maar nu is het een krachtig onderdeel van mijn merk geworden. De strategie die zij hebben uitgewerkt sluit perfect aan bij mijn visie. Sinds de samenwerking is onze zichtbaarheid én klantenstroom enorm gegroeid.',
      rating: 5,
      image_url: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg',
    },
    {
      id: '2',
      client_name: 'Sarah de Jong',
      company_name: 'Fashion Forward',
      position: 'Marketing Director',
      testimonial: 'De Meta Ads campagnes die Aesthetic Social Haus voor ons heeft opgezet hebben onze ROI met 800% verhoogd. Hun data-driven aanpak en creativiteit maken het verschil. Ze begrijpen echt hoe je een merk laat groeien in de digitale wereld.',
      rating: 5,
      image_url: 'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg',
    },
    {
      id: '3',
      client_name: 'Michael Peters',
      company_name: 'Urban Lifestyle',
      position: 'Owner',
      testimonial: 'Het creatieve team heeft onze complete brand identity getransformeerd. Van logo tot social media templates, alles klopt. De aandacht voor detail en het begrip van onze doelgroep is ongeëvenaard. Absolute aanrader!',
      rating: 5,
      image_url: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg',
    },
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : mockTestimonials;

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length);
  };

  if (loading || displayTestimonials.length === 0) {
    return null;
  }

  const currentTestimonial = displayTestimonials[currentIndex];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg')] bg-cover bg-center"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">
            Kind <span className="text-rose-400">Words</span>
          </h2>
          <p className="text-xl text-gray-300">
            Wat onze klanten zeggen over de samenwerking
          </p>
        </div>

        <div className="relative">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-12">
            <Quote className="w-16 h-16 text-rose-400 mb-6" />

            <div className="mb-8">
              <div className="flex gap-1 mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-xl md:text-2xl text-white leading-relaxed mb-8 font-light">
                "{currentTestimonial.testimonial}"
              </p>

              <div className="flex items-center gap-4">
                {currentTestimonial.image_url && (
                  <img
                    src={currentTestimonial.image_url}
                    alt={currentTestimonial.client_name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-rose-400"
                  />
                )}
                <div>
                  <div className="text-white font-bold text-lg">{currentTestimonial.client_name}</div>
                  <div className="text-rose-400 text-sm">{currentTestimonial.position}</div>
                  <div className="text-gray-400 text-sm">{currentTestimonial.company_name}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <div className="flex gap-2">
                {displayTestimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex ? 'bg-rose-400 w-8' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 uppercase tracking-wider text-sm mb-6">Onze klanten zijn verschenen in</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            {['Forbes', 'TechCrunch', 'Vogue', 'Elle', 'Business Insider'].map((brand) => (
              <div key={brand} className="text-white font-bold text-xl">{brand}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
