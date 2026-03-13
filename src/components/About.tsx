import { Heart, Award, Users, Lightbulb } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block bg-rose-100 text-rose-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              THE FOUNDERS
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Meet Baris <span className="text-rose-500">&</span> Gizem
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">Ik ben Baris</strong>, oprichter van Aesthetic Social Haus. Na jaren actief te zijn geweest in de e-commerce wereld, ontdekte ik dat veel bedrijven zich focussen op mooie content, maar de <span className="text-rose-500 font-semibold">strategie erachter missen</span>.
              </p>

              <p>
                Begin dit jaar besloot ik mijn ervaring te bundelen in een agency die meer doet dan zichtbaarheid creëren. Ik wilde merken helpen groeien met richting, rust en een duidelijke visie.
              </p>

              <p>
                Niet lang daarna sloot <strong className="text-gray-900">Gizem</strong> zich aan, mijn vrouw en creatieve hart achter het merk. Met haar oog voor detail en gevoel voor esthetiek brengt ze onze ideeën tot leven.
              </p>

              <p className="text-gray-900 font-medium">
                Samen bouwen we dagelijks aan merken die opvallen, onthouden worden en vertrouwen uitstralen.
              </p>

              <p className="text-rose-600 font-semibold italic">
                Voor ons is social media geen losse reeks posts, maar een middel om echte connectie te creëren en bedrijven te laten groeien met stijl en strategie.
              </p>
            </div>

            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-8 bg-rose-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-rose-600 transition-all hover:scale-105"
            >
              Werken Met Ons
            </button>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                alt="Baris & Gizem"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
            </div>

            <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-rose-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">150+</div>
                  <div className="text-sm text-gray-600">Happy Clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mt-24">
          {[
            {
              icon: Award,
              title: 'Excellence',
              description: 'Premium kwaliteit in elk project',
            },
            {
              icon: Users,
              title: 'Partnership',
              description: 'Persoonlijke aandacht en support',
            },
            {
              icon: Lightbulb,
              title: 'Innovation',
              description: 'Vooruitstrevende strategieën',
            },
            {
              icon: Heart,
              title: 'Passion',
              description: 'Gedreven door resultaat en groei',
            },
          ].map((value, index) => {
            const Icon = value.icon;
            return (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
