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

import ApplyPage from './pages/ApplyPage.tsx'
import CalculatorPage from './pages/CalculatorPage.tsx'
import ContactPage from './pages/ContactPage.tsx'

const pathname = window.location.pathname;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {pathname === '/apply' ? (
      <ApplyPage />
    ) : pathname === '/calculator' ? (
      <CalculatorPage />
    ) : pathname === '/contact' ? (
      <ContactPage />
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
  </StrictMode>,
)