import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Home } from './pages/Home';
import ServicePage from './pages/ServicePage';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { WorkPage } from './pages/Work';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { BookingModalProvider } from './contexts/BookingModalContext';
import { AmbientBackground } from './components/AmbientBackground';
import { ConsultationCtaBox } from './components/ConsultationCtaBox';

export default function App() {
  return (
    <Router>
      <BookingModalProvider>
        <div className="bg-bg min-h-screen text-ink font-sans selection:bg-accent selection:text-white overflow-x-clip w-full relative">
          <AmbientBackground />
          <div className="relative z-10">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services/:slug" element={<ServicePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/work" element={<WorkPage />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
              </Routes>
            </main>
            <ConsultationCtaBox />
            <Footer />
            <CookieBanner />
            <Analytics />
          </div>
        </div>
      </BookingModalProvider>
    </Router>
  );
}
