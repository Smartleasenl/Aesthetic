import { useEffect, useState } from 'react';
import { ExternalLink, Tag } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  client_name: string;
  category: string;
  image_url: string;
  featured: boolean;
}

const categories = ['All', 'Branding', 'Social Media', 'Meta Ads', 'Photography', 'Content'];

export default function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .order('order_position', { ascending: true });

      if (error) throw error;
      setPortfolioItems(data || []);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = selectedCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory);

  const mockItems = [
    {
      id: '1',
      title: 'Lara Beauty Clinic Rebranding',
      description: 'Complete brand transformation with social media strategy',
      client_name: 'Lara Beauty Clinic',
      category: 'Branding',
      image_url: 'https://images.pexels.com/photos/3738386/pexels-photo-3738386.jpeg',
      featured: true,
    },
    {
      id: '2',
      title: 'E-commerce Meta Ads Campaign',
      description: 'Generated 10x ROI with targeted Facebook & Instagram ads',
      client_name: 'Fashion Store',
      category: 'Meta Ads',
      image_url: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
      featured: true,
    },
    {
      id: '3',
      title: 'Lifestyle Brand Photography',
      description: 'Professional product and lifestyle photography series',
      client_name: 'Lifestyle Brand',
      category: 'Photography',
      image_url: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg',
      featured: false,
    },
    {
      id: '4',
      title: 'Social Media Content Strategy',
      description: 'Monthly content creation and community management',
      client_name: 'Wellness Center',
      category: 'Social Media',
      image_url: 'https://images.pexels.com/photos/6954174/pexels-photo-6954174.jpeg',
      featured: false,
    },
    {
      id: '5',
      title: 'Instagram Reels Campaign',
      description: 'Viral content strategy reaching 2M+ impressions',
      client_name: 'Food Brand',
      category: 'Content',
      image_url: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
      featured: false,
    },
    {
      id: '6',
      title: 'Brand Identity Design',
      description: 'Complete visual identity including logo and brand guidelines',
      client_name: 'Tech Startup',
      category: 'Branding',
      image_url: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg',
      featured: false,
    },
  ];

  const displayItems = portfolioItems.length > 0 ? filteredItems : mockItems;

  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Ons <span className="text-rose-500">Portfolio</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ontdek hoe we merken transformeren met strategie, creativiteit en resultaat
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayItems.map((item, index) => (
              <div
                key={item.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>

                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-3 py-1.5 rounded-full text-xs font-medium">
                      <Tag className="w-3 h-3" />
                      {item.category}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-300 text-sm mb-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-rose-400 text-sm font-medium">{item.client_name}</span>
                      <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-rose-500 transition-colors">
                        <ExternalLink className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold hover:border-rose-500 hover:text-rose-500 transition-all">
            Meer Projecten Bekijken
          </button>
        </div>
      </div>
    </section>
  );
}
