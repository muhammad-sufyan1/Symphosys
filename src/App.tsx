import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { BookingModalProvider } from './contexts/BookingModalContext';
import { AmbientBackground } from './components/AmbientBackground';
import { SeoInternalLinks } from './components/SeoInternalLinks';
import { ClientReviewsSection } from './components/ClientReviewsSection';

const Home = lazy(() => import('./pages/Home').then((module) => ({ default: module.Home })));
const ServicePage = lazy(() => import('./pages/ServicePage'));
const About = lazy(() => import('./pages/About').then((module) => ({ default: module.About })));
const Contact = lazy(() => import('./pages/Contact').then((module) => ({ default: module.Contact })));
const Terms = lazy(() => import('./pages/Terms').then((module) => ({ default: module.Terms })));
const Privacy = lazy(() => import('./pages/Privacy').then((module) => ({ default: module.Privacy })));
const WorkPage = lazy(() => import('./pages/Work').then((module) => ({ default: module.WorkPage })));
const NotFound = lazy(() => import('./pages/NotFound').then((module) => ({ default: module.NotFound })));

function RouteFallback() {
  return (
    <div className="min-h-[40vh] px-6 md:px-12 py-20 flex items-center justify-center">
      <div className="w-full max-w-3xl h-32 rounded-3xl bg-surface border border-ink/10 animate-pulse" />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <BookingModalProvider>
        <div className="bg-bg min-h-screen text-ink font-sans selection:bg-accent selection:text-white overflow-x-clip w-full relative">
          <AmbientBackground />
          <div className="relative z-10">
            <Navbar />
            <main>
              <Suspense fallback={<RouteFallback />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services/:slug" element={<ServicePage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/work" element={<WorkPage />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/404" element={<NotFound />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <SeoInternalLinks />
            <ClientReviewsSection />
            <Footer />
            <CookieBanner />
            <Analytics />
          </div>
        </div>
      </BookingModalProvider>
    </Router>
  );
}
