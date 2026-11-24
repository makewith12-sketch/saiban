// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Header from './components/header.tsx'
import Hero from './components/hero.tsx'
import SubHero from './components/subhero.tsx'
import WhySaiban from './components/whysaiban.tsx'
import HowItWorks from './components/howitworks.tsx'
import Partners from './components/partners.tsx'
import EMICalculator from './components/emicalculator.tsx'
import Reviews from './components/review.tsx'
import Articles from './components/articles.tsx'
import FAQs from './components/faqs.tsx'
import ContactForm from './components/contactform.tsx'
import Footer from './components/footer.tsx'
import FloatingContactActions from './components/FloatingContactActions.tsx'

import ApplyPage from './pages/ApplyPage.tsx'
import CalculatorPage from './pages/CalculatorPage.tsx'
import ContactPage from './pages/ContactPage.tsx'
import HomeLoansPage from './pages/HomeLoansPage.tsx'
import PersonalLoansPage from './pages/PersonalLoansPage.tsx'
import BusinessLoansPage from './pages/BusinessLoansPage.tsx'
import AboutPage from './pages/AboutPage.tsx'
import InsightsPage from './pages/InsightsPage.tsx'
import AdminLogin from './pages/AdminLogin.tsx'
import AdminDashboard from './pages/AdminDashboard.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import ArticleDetailPage from './pages/ArticleDetailPage.tsx'
import CibilScorePage from './pages/CibilScorePage.tsx'
const pathname = window.location.pathname;
const articleMatch = pathname.match(/^\/insights\/([^/]+)\/?$/);
const isAdminRoute = pathname.startsWith('/admin');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {pathname === '/home-loans' ? (
      <HomeLoansPage />
    ) : pathname === '/personal-loans' ? (
      <PersonalLoansPage />
    ) : pathname === '/business-loans' ? (
      <BusinessLoansPage />
    ) : pathname === '/about' ? (
      <AboutPage />
    ) : articleMatch ? (
      <ArticleDetailPage slug={decodeURIComponent(articleMatch[1])} />
    ) : pathname === '/insights' ? (
      <InsightsPage />
    ) : pathname === '/apply' ? (
      <ApplyPage />
    ) : pathname === '/calculator' ? (
      <CalculatorPage />
    ) : pathname === '/contact' ? (
      <ContactPage />
    ) : pathname === '/admin/login' ? (
      <AdminLogin />
    ) : pathname === '/admin' ? (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ) : pathname === '/cibil-score' ? (
      <CibilScorePage />
    ) : (
      <>
        <Header />
        <Hero />
        <SubHero />
        <WhySaiban />
        <HowItWorks />
        <Partners />
        <EMICalculator />
        <Reviews />
        <Articles />
        <FAQs />
        <ContactForm />
        <Footer />
      </>
    )}

    {/* Global Floating Call & WhatsApp Buttons (Bottom-Right Corner) */}
    {!isAdminRoute && <FloatingContactActions phoneNumber="+918127727747" />}
  </StrictMode>,
)