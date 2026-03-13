import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import ServicesPage from './components/ServicesPage';
import AboutPage from './components/AboutPage';
import PortfolioPage from './components/PortfolioPage';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';

function AppContent() {
  const location = useLocation();
  return (
    <div className="min-h-screen">
      <Navigation />
      <Routes>
        <Route path="/"          element={<><HomePage /><Footer /></>} />
        <Route path="/services"  element={<><ServicesPage /><Footer /></>} />
        <Route path="/about"     element={<><AboutPage /><Footer /></>} />
        <Route path="/portfolio" element={<><PortfolioPage /><Footer /></>} />
        <Route path="/contact"   element={<><ContactPage /><Footer /></>} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}