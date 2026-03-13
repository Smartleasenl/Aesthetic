import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HomePage />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;