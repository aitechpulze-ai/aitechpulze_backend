import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import AcademicHub from './pages/AcademicHub';
import About from './pages/About';
import Pricing from './pages/Pricing';
import GetQuote from './pages/GetQuote';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Solutions from './pages/Solutions';
import Industries from './pages/Industries';
import Technologies from './pages/Technologies';
import Careers from './pages/Careers';
import Team from './pages/Team';
import Maintenance from './pages/Maintenance';
import { PrivacyPolicy, Terms, RefundPolicy } from './pages/Legal';

// Internship Portal
import Internships from './pages/Internships';
import VerifyCertificate from './pages/VerifyCertificate';
import PortalLogin from './pages/portal/PortalLogin';
import AdminDashboard from './pages/portal/AdminDashboard';
import MentorDashboard from './pages/portal/MentorDashboard';
import StudentDashboard from './pages/portal/StudentDashboard';
import LiveChat from './components/LiveChat';


function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Check if current path is a portal route (no Navbar/Footer for clean dashboard)
function PortalLayout({ children }) {
  return <>{children}</>;
}

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  const location = useLocation();
  const isPortalRoute = location.pathname.startsWith('/portal');

  return (
    <>
      <ScrollToTop />
      {!isPortalRoute && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/get-quote" element={<GetQuote />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/technologies" element={<Technologies />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/team" element={<Team />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />

        {/* Internship & Portal Routes */}
        <Route path="/internships" element={<Internships />} />
        <Route path="/verify" element={<VerifyCertificate />} />
        <Route path="/portal/admin" element={<PortalLogin role="admin" />} />
        <Route path="/portal/mentor" element={<PortalLogin role="mentor" />} />
        <Route path="/portal/student" element={<PortalLogin role="student" />} />
        <Route path="/portal/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/portal/mentor/dashboard" element={<MentorDashboard />} />
        <Route path="/portal/student/dashboard" element={<StudentDashboard />} />

        {/* Legacy redirects */}
        <Route path="/blog/:slug" element={<Navigate to="/blog" replace />} />
        <Route path="/academic-hub" element={<AcademicHub />} />
        <Route path="/internship" element={<Navigate to="/internships" replace />} />
        <Route path="/genai" element={<Navigate to="/solutions" replace />} />
        <Route path="/projects" element={<Navigate to="/portfolio" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isPortalRoute && <Footer />}
      {!isPortalRoute && <LiveChat />}
    </>
  );
}
