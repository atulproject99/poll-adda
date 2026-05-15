import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Navbar from './components/landing/Navbar'
import Hero from './components/landing/Hero'
import Features from './components/landing/Features'
import Pricing from './components/landing/Pricing'
import Footer from './components/landing/Footer'
import ShaderBackground from './components/landing/ShaderBackground'
import DashboardLayout from './layout/dashboard/DashboardLayout'
import DashboardHome from './pages/dashboard/DashboardHome'
import CreatePoll from './pages/dashboard/CreatePoll'
import MyPolls from './pages/dashboard/MyPolls'
import PublishedPolls from './pages/dashboard/PublishedPolls'
import AnalyticsList from './pages/dashboard/AnalyticsList'
import PublicPoll from './pages/public/PublicPoll'
import Analytics from './pages/dashboard/Analytics'
import Results from './pages/public/Results'
import Settings from './pages/dashboard/Settings'
import { Toaster } from 'sonner'

function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </>
  )
}

function App() {
  const location = useLocation();

  useEffect(() => {
    const handleReveal = () => {
      const reveals = document.querySelectorAll('[data-reveal]');
      reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 100; // Adjusted for better responsiveness
        
        if (revealTop < windowHeight - revealPoint) {
          reveal.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleReveal);
    // Slight delay to ensure DOM is ready after route change
    const timeoutId = setTimeout(handleReveal, 100);
    
    return () => {
      window.removeEventListener('scroll', handleReveal);
      clearTimeout(timeoutId);
    };
  }, [location.pathname]); // Re-run on route change

  return (
    <div className="app-wrapper">
      <ShaderBackground />
      <Toaster richColors position="top-right" />
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="create" element={<CreatePoll />} />
          <Route path="polls" element={<MyPolls />} />
          <Route path="analytics" element={<AnalyticsList />} />
          <Route path="analytics/:id" element={<Analytics />} />
          <Route path="published" element={<PublishedPolls />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="/poll/:id" element={<PublicPoll />} />
        <Route path="/results/:id" element={<Results />} />
      </Routes>
    </div>
  )
}

export default App
