import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Footer from './components/footer.tsx'
import ContactForm from './components/contactForm.tsx'
import FAQs from './components/faqs.tsx'
import Reviews from './components/review.tsx'
import Articles from './components/articles.tsx'
import EMICalculator from './components/emicalculator.tsx'
import Partners from './components/partners.tsx'
import HowItWorks from './components/howitworks.tsx'
import WhySaiban from './components/whysaiban.tsx'
import SubHero from './components/subhero.tsx'
import Hero from './components/hero.tsx'
import Header from './components/header.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
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
  </StrictMode>,
)
