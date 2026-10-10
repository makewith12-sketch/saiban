import React, { useState, useMemo } from 'react';
import { 
  Home, 
  Briefcase, 
  CreditCard, 
  Landmark, 
  PiggyBank, 
  ChevronRight, 
  ChevronDown, 
  CheckCircle2, 
  Percent, 
  ArrowRight, 
  Smartphone, 
  ShieldCheck, 
  Clock, 
  FileCheck2, 
  Sparkles, 
  Search, 
  MapPin, 
  Users, 
  QrCode, 
  Menu, 
  X, 
  TrendingDown,
  TrendingUp, 
  Check, 
  Award, 
} from 'lucide-react';

// ========================================== //
// SECTION: TYPES & INTERFACES                //
// ========================================== //

interface BankPartner {
  name: string;
  tag: string;
  badgeColor: string;
  symbol: string;
}

interface ProductData {
  id: string;
  title: string;
  category: string;
  badge: string;
  badgeStyle: string;
  icon: React.ElementType;
  interest: string;
  tenure: string;
  maxAmount: string;
  desc: string;
  features: string[];
}

interface FaqItem {
  category: string;
  q: string;
  a: string;
}

interface FormData {
  name: string;
  mobile: string;
  email: string;
  city: string;
  amount: string;
  employment: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct: string;
}

interface ComponentProps {
  onOpenModal: (productName?: string) => void;
}

// ========================================== //
// SECTION: DATA CONSTANTS                    //
// ========================================== //

const BANK_PARTNERS: BankPartner[] = [
  { name: 'HDFC Bank', tag: 'Preferred Partner', badgeColor: 'bg-blue-50 text-blue-700 border-blue-200', symbol: 'HDFC' },
  { name: 'State Bank of India', tag: 'Lowest Rates', badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200', symbol: 'SBI' },
  { name: 'ICICI Bank', tag: 'Instant Approvals', badgeColor: 'bg-orange-50 text-orange-700 border-orange-200', symbol: 'ICICI' },
  { name: 'Axis Bank', tag: 'Pre-Approved Offers', badgeColor: 'bg-rose-50 text-rose-700 border-rose-200', symbol: 'AXIS' },
  { name: 'Kotak Mahindra', tag: 'Minimal KYC', badgeColor: 'bg-red-50 text-red-700 border-red-200', symbol: 'KMB' },
  { name: 'Bank of Baroda', tag: 'Zero Processing', badgeColor: 'bg-amber-50 text-amber-700 border-amber-200', symbol: 'BOB' },
  { name: 'Bajaj Finserv', tag: 'Instant Disbursal', badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200', symbol: 'BAJAJ' },
  { name: 'Tata Capital', tag: 'Flexible Tenure', badgeColor: 'bg-sky-50 text-sky-700 border-sky-200', symbol: 'TATA' },
  { name: 'Standard Chartered', tag: 'Global Privilege', badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200', symbol: 'STAN' },
  { name: 'IDFC FIRST', tag: 'No Pre-Closure Fee', badgeColor: 'bg-rose-50 text-rose-700 border-rose-200', symbol: 'IDFC' },
  { name: 'PNB Housing', tag: 'Subsidized Schemes', badgeColor: 'bg-purple-50 text-purple-700 border-purple-200', symbol: 'PNB' },
  { name: 'IndusInd Bank', tag: '100% Digital Flow', badgeColor: 'bg-teal-50 text-teal-700 border-teal-200', symbol: 'INDUS' },
  { name: 'Federal Bank', tag: 'Fast-Track Sanction', badgeColor: 'bg-blue-50 text-blue-700 border-blue-200', symbol: 'FED' },
  { name: 'L&T Finance', tag: 'MSME Specialists', badgeColor: 'bg-yellow-50 text-yellow-800 border-yellow-200', symbol: 'L&T' },
  { name: 'Piramal Finance', tag: 'High Eligibility', badgeColor: 'bg-blue-50 text-blue-700 border-blue-200', symbol: 'PIR' },
  { name: 'Aditya Birla Capital', tag: 'Top-Up Facility', badgeColor: 'bg-red-50 text-red-700 border-red-200', symbol: 'ABC' }
];

const PRODUCTS_DATA: ProductData[] = [
  {
    id: 'home-loan',
    title: 'Home Loans',
    category: 'Secured',
    badge: 'Trending Low Rates',
    badgeStyle: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: Home, /* [CHANGE ICON HERE] */
    interest: 'From 8.35% p.a.',
    tenure: 'Up to 30 Years',
    maxAmount: 'Up to ₹15 Crores',
    desc: 'Lowest interest rates for new property purchases, resale apartments, self-construction or plot loans with subsidy support.',
    features: ['Zero prepayment penalty', 'Doorstep legal verification', '30-year amortization']
  },
  {
    id: 'personal-loan',
    title: 'Personal Loans',
    category: 'Unsecured',
    badge: '10-Min Sanctions',
    badgeStyle: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: CreditCard, /* [CHANGE ICON HERE] */
    interest: 'From 10.49% p.a.',
    tenure: '1 to 5 Years',
    maxAmount: 'Up to ₹40 Lakhs',
    desc: 'Collateral-free liquidity for medical contingencies, wedding plans, international vacations, or credit consolidation.',
    features: ['Paperless DigiLocker KYC', 'Funds in bank under 24 hrs', 'Flexible pre-closure']
  },
  {
    id: 'balance-transfer',
    title: 'Balance Transfer',
    category: 'Secured / Unsecured',
    badge: 'Save ₹4.5L+ on EMI',
    badgeStyle: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: TrendingDown, /* [CHANGE ICON HERE] */
    interest: 'From 8.25% p.a.',
    tenure: 'Remaining Tenure',
    maxAmount: '100% Outstanding',
    desc: 'Migrate your existing high-cost loan to premier lending banks with flat processing fee waivers and massive top-up limits.',
    features: ['Flat 0% processing offers', 'Additional top-up cash', 'Immediate EMI deduction']
  },
  {
    id: 'business-loan',
    title: 'Business Loans',
    category: 'Enterprise',
    badge: 'Collateral-Free MSME',
    badgeStyle: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    icon: Briefcase, /* [CHANGE ICON HERE] */
    interest: 'From 11.25% p.a.',
    tenure: 'Up to 7 Years',
    maxAmount: 'Up to ₹1.5 Crores',
    desc: 'Working capital, machinery acquisition, inventory scaling, and corporate expansions assessed quickly through GST filings.',
    features: ['Sanctions in 48 hours', 'Overdraft facilities', 'No collateral for up to ₹50L']
  },
  {
    id: 'lap',
    title: 'Loan Against Property',
    category: 'Secured',
    badge: 'High Value Equity',
    badgeStyle: 'bg-violet-50 text-violet-700 border-violet-200',
    icon: Landmark, /* [CHANGE ICON HERE] */
    interest: 'From 8.85% p.a.',
    tenure: 'Up to 20 Years',
    maxAmount: 'Up to ₹25 Crores',
    desc: 'Monetize residential, industrial, or commercial real estate equity at significantly lower interest than conventional personal loans.',
    features: ['Up to 75% market value LTV', 'Prolonged payback period', 'Retain full asset ownership']
  },
  {
    id: 'credit-card',
    title: 'Lifetime Free Cards',
    category: 'Cards',
    badge: 'Zero Annual Fee',
    badgeStyle: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: PiggyBank, /* [CHANGE ICON HERE] */
    interest: 'Up to 50 Days Free',
    tenure: 'Revolving Credit',
    maxAmount: 'Credit Limit: ₹10L',
    desc: 'Exclusive co-branded premium credit cards packed with airport lounge passes, fuel surcharge refunds, and accelerated reward miles.',
    features: ['Instant digital activation', 'Airport lounge benefits', '10X cashback categories']
  }
];

const FAQS_LIST: FaqItem[] = [
  {
    category: 'General',
    q: 'Does evaluating loan options through this portal lower my credit score?',
    a: 'Not at all! Checking your preliminary rates and loan eligibility triggers a soft credit inquiry which does not deduct points from your CIBIL score. A formal hard inquiry is placed only when you elect to submit your final application to a specific banking lender.'
  },
  {
    category: 'General',
    q: 'Are your advisory and comparison services free for borrowers?',
    a: 'Yes, our platform is 100% free of charge for borrowers. We never charge consultation or facilitation fees. We receive institutional partnerships remuneration directly from our 50+ banking associates.'
  },
  {
    category: 'Home Loan',
    q: 'How much interest can I save by transferring my existing home loan?',
    a: 'Even a 0.50% reduction in interest rates on a ₹50,00,000 home loan across a 20-year horizon can save you upwards of ₹3,50,000 to ₹4,80,000 in aggregate interest payments. Use our interactive EMI comparison calculator to simulate your exact monthly surplus.'
  },
  {
    category: 'Personal Loan',
    q: 'How fast can a pre-approved personal loan be disbursed?',
    a: 'For salaried professionals with clean documentation and pre-approved offers, funds can be disbursed in as fast as 2 to 6 hours directly into their salary bank accounts through instant digital e-mandate and DigiLocker validation.'
  },
  {
    category: 'Documents',
    q: 'What basic documents are required for digital loan processing?',
    a: 'Typically, salaried applicants need their PAN Card, Aadhaar Card, last 3 months salary slips, and last 6 months banking statements. Self-employed borrowers require 2 years ITR, GST filings, and business banking statements.'
  }
];

// ========================================== //
// SECTION: GLOBAL MODAL (QUICK APPLY)        //
// ========================================== //

function QuickApplyModal({ isOpen, onClose, selectedProduct }: ModalProps) {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: '',
    email: '',
    city: 'Mumbai',
    amount: '25,00,000',
    employment: 'Salaried'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          {/* [CHANGE ICON HERE] */}
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              {/* [CHANGE ICON HERE] */}
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Application Received!</h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              Our Senior Loan Advisor has received your preference for <span className="font-semibold text-emerald-700">{selectedProduct || 'Loan Services'}</span> and will call you with verified rates within 15 minutes.
            </p>
            <div className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-medium">
              Ref ID: SCS-{Math.floor(100000 + Math.random() * 900000)}
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 mb-2">
                {/* [CHANGE ICON HERE] */}
                <Sparkles className="w-3.5 h-3.5" /> Instant Sanction Desk
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Apply for {selectedProduct || 'Quick Loan'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Zero impact on credit score • Instant best quote comparison across 50+ lenders
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Legal Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 text-slate-500 text-xs font-medium">
                      +91
                    </span>
                    <input 
                      type="tel" 
                      required
                      maxLength={10}
                      placeholder="98765 43210"
                      value={formData.mobile}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, mobile: e.target.value})}
                      className="w-full px-3 py-2.5 rounded-r-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Required Amount (₹)</label>
                  <input 
                    type="text" 
                    required
                    placeholder="25,00,000"
                    value={formData.amount}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, amount: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Employment Type</label>
                  <select 
                    value={formData.employment}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({...formData, employment: e.target.value})}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
                  >
                    <option value="Salaried">Salaried Employee</option>
                    <option value="SelfEmployed">Self Employed Professional</option>
                    <option value="Business">Business Owner</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
                  <select 
                    value={formData.city}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({...formData, city: e.target.value})}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
                  >
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Pune">Pune</option>
                    <option value="Chennai">Chennai</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>Submit & Fetch Lowest Rates</span>
                  {/* [CHANGE ICON HERE] */}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-400">
                🔒 256-Bit SSL Encrypted. We never share your data without explicit authorization.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// ========================================== //
// SECTION: NAVBAR HEADER                     //
// ========================================== //

function Navbar({ onOpenModal }: ComponentProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<string>('Mumbai');

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo - Using Custom logo12.jpeg file */}
          <div className="flex items-center gap-3 cursor-pointer">
            {/* [CHANGE ICON HERE] Replace the src with your uploaded image name */}
            <img 
              src="/logo12.jpeg" 
              alt="Saiban Capital Solutions Logo" 
              className="w-11 h-11 object-contain rounded-xl shadow-sm border border-slate-100" 
            />
            {/* REDUCED FONT SIZES & APPLIED BRAND COLORS HERE */}
            <div className="hidden sm:block">
              <span className="text-lg font-black tracking-tight uppercase">
                <span className="text-[#4B9303]">SAIBAN</span>
                <span className="text-[#024CA3]">CAPITAL</span>
              </span>
              <span className="block text-[9px] tracking-widest uppercase font-extrabold text-[#024CA3] -mt-0.5">
                Solutions
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#hero-section" className="hover:text-emerald-600 transition-colors flex items-center gap-1 text-slate-900">
              Loans 
              {/* [CHANGE ICON HERE] */}
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </a>
            <a href="#products-section" className="hover:text-emerald-600 transition-colors">Products</a>
            <a href="#calculator-section" className="hover:text-emerald-600 transition-colors">EMI Calculator</a>
            <a href="#how-it-works" className="hover:text-emerald-600 transition-colors">How It Works</a>
            <a href="#partners-section" className="hover:text-emerald-600 transition-colors">50+ Banks</a>
            <a href="#faq-section" className="hover:text-emerald-600 transition-colors">FAQ</a>
          </nav>

          {/* City Selector and CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100/80 border border-slate-200 text-xs font-medium text-slate-700">
              {/* [CHANGE ICON HERE] */}
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <select 
                aria-label="City Selector"
                value={selectedCity} 
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCity(e.target.value)}
                className="bg-transparent border-none text-slate-800 font-semibold focus:outline-none cursor-pointer pr-1"
              >
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi NCR">Delhi NCR</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
                <option value="Chennai">Chennai</option>
              </select>
            </div>

            <button 
              onClick={() => onOpenModal('Free Credit Health')}
              className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-emerald-700 transition-colors"
            >
              Check Credit Score
            </button>

            <button 
              onClick={() => onOpenModal('Pre-Approved Loan')}
              className="px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/20 transition duration-150 flex items-center gap-1.5"
            >
              <span>Instant Eligibility</span>
              {/* [CHANGE ICON HERE] */}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
              aria-label="Open navigation menu"
            >
              {/* [CHANGE ICON HERE] */}
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-5 flex flex-col gap-4 text-sm font-semibold text-slate-700 animate-fadeIn">
          <a href="#hero-section" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-600 py-1">Loans Overview</a>
          <a href="#products-section" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-600 py-1">Financial Products</a>
          <a href="#calculator-section" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-600 py-1">Loan EMI Calculator</a>
          <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-600 py-1">4-Step Journey</a>
          <a href="#partners-section" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-600 py-1">Bank Partners</a>
          <a href="#faq-section" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-600 py-1">Help & FAQs</a>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenModal('Quick Loan Approval'); }}
              className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs"
            >
              Check Instant Eligibility (100% Free)
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

// ========================================== //
// SECTION: HERO / MAIN LANDING AREA          //
// ========================================== //

function HeroSection({ onOpenModal }: ComponentProps) {
  const [activeTab, setActiveTab] = useState<string>('business');
  const [quickAmount, setQuickAmount] = useState<string>('45,00,000');
  const [mobileNum, setMobileNum] = useState<string>('');

  // 4 FEATURED LOAN CARDS - Rebuilt purely in code (HTML/Tailwind/Lucide) matching your reference images
  const loanCards = [
    { 
      id: 'home', 
      title: 'Home Loan',
      subtitle: 'Save ₹4.2L on Transfer',
      rate: '8.35%',
      icon: Home, /* [CHANGE ICON HERE] */
    },
    { 
      id: 'personal', 
      title: 'Personal Loan', 
      subtitle: 'Disbursal in 2 Hrs',
      rate: '10.49%',
      icon: CreditCard, /* [CHANGE ICON HERE] */
    },
    { 
      id: 'lap', 
      title: 'Against Property', 
      subtitle: 'Up to ₹15 Crores',
      rate: '8.85%',
      icon: Landmark, /* [CHANGE ICON HERE] */
    },
    { 
      id: 'business', 
      title: 'Business Loan', 
      subtitle: 'Zero Collateral Line',
      rate: '11.25%',
      icon: Briefcase, /* [CHANGE ICON HERE] */
    }
  ];

  return (
    <section id="hero-section" className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-8 pb-16 sm:pb-24 border-b border-slate-200/70 overflow-hidden">
      {/* Soft Ambient decorative background shapes */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-emerald-100/60 to-teal-50/40 blur-[110px] pointer-events-none rounded-full" />
      <div className="absolute -top-10 right-0 w-80 h-80 bg-blue-100/40 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Trust Pill */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200/90 text-slate-700 text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-700 font-bold">50+ Lending Institutions Connected</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500 font-normal">Over ₹25,000 Cr Disbursed</span>
          </div>
        </div>

        {/* Hero Headline */}
        <div className="text-center mt-6 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Approvals Just The Way <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
              You Choose.
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal">
            Saiban Capital's most transparent financial marketplace. Instant in-principle sanction letters, customized interest rates, and dedicated doorstep relationship managers.
          </p>
        </div>

        {/* 4 FEATURED HERO PRODUCT CARDS: Coded matching your uploaded design with simpler/normal fonts */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {loanCards.map((item) => {
            const isSelected = activeTab === item.id;
            const Icon = item.icon;
            
            return (
              <div
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`group relative rounded-[2rem] transition-all duration-300 cursor-pointer aspect-[2/1] sm:aspect-[1.8/1] w-full flex flex-col overflow-hidden p-5 bg-gradient-to-br from-white to-teal-50/40 ${
                  isSelected 
                    ? 'border-2 border-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.3)] z-10 scale-[1.02]' 
                    : 'border-2 border-teal-200/70 hover:border-teal-300 hover:shadow-[0_0_15px_rgba(45,212,191,0.15)]'
                }`}
              >
                {/* Background Blobs and Watermark Image (using Lucide icons scaled up) */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 text-teal-500/[0.07] transform rotate-[-15deg] group-hover:scale-110 group-hover:rotate-[-5deg] transition-all duration-500 z-0 pointer-events-none">
                  {/* [CHANGE ICON HERE] Watermark icon */}
                  <Icon className="w-full h-full" strokeWidth={1} />
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-300/10 rounded-full blur-2xl z-0 pointer-events-none" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-200/10 rounded-full blur-xl z-0 pointer-events-none" />

                {/* Top Bar: Icon & Rate */}
                <div className="flex justify-between items-start w-full relative z-10">
                  {/* Icon Squircle */}
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center border border-teal-100 shadow-sm group-hover:shadow text-teal-800 transition-all">
                    {/* [CHANGE ICON HERE] Main card top-left icon */}
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>

                  {/* Rate Pill */}
                  <div className="flex items-center bg-white/80 backdrop-blur-md border border-teal-100 rounded-full pr-3 pl-1 py-1 shadow-sm">
                    <div className="w-6 h-6 rounded-full bg-teal-50 flex items-center justify-center mr-1.5">
                      {/* [CHANGE ICON HERE] Trending rate arrow icon */}
                      <TrendingUp className="w-3.5 h-3.5 text-teal-700" strokeWidth={2.5} />
                    </div>
                    <span className="text-sm font-semibold text-teal-900 tracking-tight">{item.rate}</span>
                  </div>
                </div>

                {/* Bottom Text Layout (Simpler Font weights as requested) */}
                <div className="mt-auto relative z-10">
                  <h3 className="text-xl font-semibold text-slate-800 tracking-tight group-hover:text-teal-900 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm font-normal text-slate-500 mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Hero Working Box & Visual Status Card */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Form Box */}
          <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/40 relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-2">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Instant Quote Generator
                </h2>
                <p className="text-xs text-slate-500">
                  Enter basic requirements to compare live offers with zero credit mark
                </p>
              </div>
              <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                ⚡ 15-Minute Sanction
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-50/90 p-3.5 rounded-2xl border border-slate-200">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Required Loan</span>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-emerald-600 font-bold text-base">₹</span>
                  <input 
                    type="text" 
                    value={quickAmount}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuickAmount(e.target.value)}
                    className="bg-transparent text-slate-900 font-bold text-base w-full focus:outline-none"
                    placeholder="35,00,000"
                  />
                </div>
              </div>

              <div className="bg-slate-50/90 p-3.5 rounded-2xl border border-slate-200">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Mobile Number</span>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-slate-400 font-semibold text-sm">+91</span>
                  <input 
                    type="tel" 
                    maxLength={10}
                    value={mobileNum}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMobileNum(e.target.value)}
                    className="bg-transparent text-slate-900 font-bold text-sm w-full focus:outline-none"
                    placeholder="98765 43210"
                  />
                </div>
              </div>

              <div>
                <button 
                  onClick={() => onOpenModal(`Quick Quote for ${quickAmount}`)}
                  className="w-full h-full min-h-[58px] rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>Compare 50+ Banks</span>
                  {/* [CHANGE ICON HERE] */}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Micro Feature Proof Badges */}
            <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                  {/* [CHANGE ICON HERE] */}
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Zero CIBIL Drop</p>
                  <p className="text-[10px] text-slate-500">Soft Inquiry Protocol</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  {/* [CHANGE ICON HERE] */}
                  <Percent className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Zero Processing</p>
                  <p className="text-[10px] text-slate-500">Exclusive Vouchers</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                  {/* [CHANGE ICON HERE] */}
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Swift Sanction</p>
                  <p className="text-[10px] text-slate-500">Same Day In-Principle</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                  {/* [CHANGE ICON HERE] */}
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Doorstep RM</p>
                  <p className="text-[10px] text-slate-500">Free Expert Guidance</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Live Sanction Simulated Card */}
          <div className="lg:col-span-4 bg-gradient-to-br from-emerald-500/10 via-teal-50/50 to-white border border-emerald-200/90 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xl shadow-slate-200/40 relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-bold text-[10px] uppercase tracking-wider">
                  Live Sanction Pass
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> Real-time
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 mt-4 leading-snug">
                Pre-Approved Credit Limit Available
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Verified through banking partnership networks with preferential rate discounts.
              </p>
            </div>

            {/* Stylized White Financial Voucher Card */}
            <div className="my-5 p-4 rounded-2xl bg-white border border-slate-200 shadow-md">
              <div className="flex justify-between items-center text-xs text-slate-500">
                <span>Sanction Ceiling</span>
                <span className="font-mono font-bold text-emerald-600">PRE-APPROVED</span>
              </div>
              <div className="text-3xl font-black text-slate-900 font-mono mt-1">
                ₹ 50,00,000
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                <span className="flex items-center gap-1">
                  {/* [CHANGE ICON HERE] */}
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Rate @ 8.35%
                </span>
                <span className="font-semibold text-slate-800">Tenure: 240 Mo</span>
              </div>
            </div>

            <button 
              onClick={() => onOpenModal('Pre-Approved Sanction Voucher')}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <span>Download In-Principle Letter</span>
              {/* [CHANGE ICON HERE] */}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

// ========================================== //
// SECTION: PROMOTIONAL BANNER                //
// ========================================== //

function PromotionalRibbon({ onOpenModal }: ComponentProps) {
  return (
    <section className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 py-3.5 px-4 text-white shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
          <span className="px-2.5 py-0.5 rounded-md bg-white text-emerald-800 text-[11px] font-black uppercase tracking-wider shadow-xs">
            Exclusive Deal
          </span>
          <p className="text-xs sm:text-sm font-semibold text-white">
            Switch Home Loan to Lowest Rates: <span className="font-black underline decoration-white underline-offset-4">8.35% p.a.</span> + 0% Processing Fee + Up to ₹50L Top-up!
          </p>
        </div>
        
        <button 
          onClick={() => onOpenModal('Festival Home Loan Switch Offer')}
          className="inline-flex items-center gap-1.5 text-xs font-bold bg-white text-slate-900 px-4 py-1.5 rounded-full hover:bg-slate-100 transition-colors shadow-sm shrink-0"
        >
          <span>Claim Offer Now</span>
          {/* [CHANGE ICON HERE] */}
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
}

// ========================================== //
// SECTION: PRODUCTS GRID                     //
// ========================================== //

function KeyProductsSection({ onOpenModal }: ComponentProps) {
  const [filter, setFilter] = useState<string>('All');
  const categories = ['All', 'Secured', 'Unsecured', 'Enterprise', 'Cards'];

  const filteredProducts = useMemo(() => {
    if (filter === 'All') return PRODUCTS_DATA;
    return PRODUCTS_DATA.filter(p => p.category.includes(filter));
  }, [filter]);

  return (
    <section id="products-section" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
              Curated Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
              Popular Financial Products
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Select tailored lending options from over 50 leading private & PSU banks.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filter === cat 
                    ? 'bg-white text-emerald-700 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => {
            const Icon = prod.icon;
            return (
              <div
                key={prod.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {/* [CHANGE ICON HERE] Card main icon */}
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${prod.badgeStyle}`}>
                      {prod.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mt-5 group-hover:text-emerald-700 transition-colors">
                    {prod.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {prod.desc}
                  </p>

                  <div className="mt-5 p-3 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Interest Range</span>
                      <span className="font-bold text-slate-900 font-mono">{prod.interest}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Tenure Window</span>
                      <span className="font-semibold text-slate-800">{prod.tenure}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Ceiling Limit</span>
                      <span className="font-semibold text-emerald-700">{prod.maxAmount}</span>
                    </div>
                  </div>

                  <ul className="mt-5 space-y-2 text-xs text-slate-600">
                    {prod.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        {/* [CHANGE ICON HERE] Features checkmark icon */}
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 pt-4 border-t border-slate-100">
                  <button 
                    onClick={() => onOpenModal(prod.title)}
                    className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Check Eligibility & Apply</span>
                    {/* [CHANGE ICON HERE] */}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

// ========================================== //
// SECTION: SHOWCASE / STORYBOARDS            //
// ========================================== //

function FeatureShowcaseSection({ onOpenModal }: ComponentProps) {
  const storyboards = [
    {
      badge: 'HOMELOAN EXCELLENCE',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      title: 'Home Loans Built Around Your Convenience',
      desc: 'Whether purchasing a ready apartment, building on an independent plot, or opting for home renovation, find custom-tailored repayment options from 40+ lending institutions.',
      perks: [
        'Interest rates starting from 8.35% p.a.',
        'Subsidy and PMAY tax benefit guidance',
        'Doorstep legal and property appraisal assistance',
        'Part-prepayment with zero penalty charges'
      ],
      cardTitle: 'Sanction Estimator',
      amountDisplay: '₹75,00,000',
      rateDisplay: '8.35%',
      tenureDisplay: '30 Years',
      emiDisplay: '₹64,375 / mo',
      actionText: 'Calculate Home Loan Savings'
    },
    {
      badge: 'INSTANT LIQUIDITY',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      title: 'Express Personal Loans for Every Ambition',
      desc: 'No collateral, no tedious documentation. Meet urgent capital requirements with completely paperless digital verification and instant salary account transfers.',
      perks: [
        'Disbursal within 2 to 24 hours of approval',
        'Loan amounts from ₹50,000 up to ₹40,00,000',
        'Pre-approved offers based on monthly income',
        'Flexible payback periods from 12 to 60 months'
      ],
      cardTitle: 'Express Quick Sanction',
      amountDisplay: '₹12,00,000',
      rateDisplay: '10.49%',
      tenureDisplay: '4 Years',
      emiDisplay: '₹30,750 / mo',
      actionText: 'Unlock Personal Loan Offer'
    },
    {
      badge: 'BALANCE TRANSFER ENGINE',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      title: 'Save Big with Smart Balance Transfer & Top-Up',
      desc: 'Paying expensive interest rates on your running home or personal loans? Switch to our low-rate banking partners with zero processing fees and take an instant high-value top-up.',
      perks: [
        'Average interest savings of ₹4,50,000+',
        'Top-up capital up to ₹50 Lakhs for personal needs',
        'No hidden administrative charges or switch fees',
        'Dedicated end-to-end documentation manager'
      ],
      cardTitle: 'Savings Summary',
      amountDisplay: 'Save ₹4,82,000',
      rateDisplay: 'Reduced by 1.25%',
      tenureDisplay: 'New Tenure: 18 Yrs',
      emiDisplay: 'Saved ₹4,210 / mo',
      actionText: 'Switch Loan & Save'
    }
  ];

  return (
    <section className="py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
            Precision Matchmaking
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            Tailored Experiences for Every Need
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Experience complete transparency, algorithmic comparisons, and institutional advantages.
          </p>
        </div>

        {storyboards.map((story, index) => {
          const isEven = index % 2 === 0;
          return (
            <div 
              key={story.title}
              className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-16`}
            >
              {/* Text Side */}
              <div className="flex-1 space-y-5">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${story.badgeColor}`}>
                  {story.badge}
                </span>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  {story.title}
                </h3>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {story.desc}
                </p>

                <ul className="space-y-3 pt-2">
                  {story.perks.map((perk, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        {/* [CHANGE ICON HERE] Checkmark icon */}
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-3">
                  <button 
                    onClick={() => onOpenModal(story.title)}
                    className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2"
                  >
                    <span>{story.actionText}</span>
                    {/* [CHANGE ICON HERE] Button arrow icon */}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Graphical Preview Card Side */}
              <div className="flex-1 w-full">
                <div className="w-full bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-xl shadow-slate-200/50 relative">
                  
                  <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">{story.cardTitle}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-600">VERIFIED</span>
                  </div>

                  <div className="my-6">
                    <span className="text-xs text-slate-400 uppercase font-semibold">Featured Metric</span>
                    <div className="text-4xl sm:text-5xl font-black text-slate-900 font-mono mt-1 tracking-tight">
                      {story.amountDisplay}
                    </div>
                  </div>

                  {/* Micro stats grid */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <span className="text-[11px] text-slate-500 block">Interest Rate</span>
                      <span className="text-sm font-bold text-slate-900 font-mono">{story.rateDisplay}</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <span className="text-[11px] text-slate-500 block">Tenure Window</span>
                      <span className="text-sm font-bold text-slate-900 font-mono">{story.tenureDisplay}</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 col-span-2 flex items-center justify-between">
                      <span className="text-xs text-slate-500">Effective Estimate</span>
                      <span className="text-sm font-black text-emerald-700 font-mono">{story.emiDisplay}</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          );
        })}

      </div>
    </section>
  );
}

// ========================================== //
// SECTION: ROADMAP (HOW IT WORKS)            //
// ========================================== //

function LoanJourneyRoadmap({ onOpenModal }: ComponentProps) {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      num: '01',
      title: 'Compare & Select Option',
      summary: 'Explore 50+ lenders side-by-side with lowest interest rates.',
      details: 'Select your target amount and tenure. Our algorithmic engine maps your salary, employment stability, and geography against all major banking algorithms.',
      icon: Search, /* [CHANGE ICON HERE] */
      badge: 'Zero CIBIL Impact'
    },
    {
      num: '02',
      title: 'Digital Paperless KYC',
      summary: 'Effortless verification via DigiLocker and online bank statements.',
      details: 'Upload basic identification without printing paperwork or visiting physical branches. Instant e-KYC verifies your eligibility in minutes.',
      icon: ShieldCheck, /* [CHANGE ICON HERE] */
      badge: '100% Encrypted'
    },
    {
      num: '03',
      title: 'In-Principle Sanction',
      summary: 'Obtain an official sanction letter from your preferred bank.',
      details: 'Receive an institutional sanction letter specifying sanctioned amount, final interest rate, and repayment amortization schedule.',
      icon: FileCheck2, /* [CHANGE ICON HERE] */
      badge: 'Instant Letter'
    },
    {
      num: '04',
      title: 'Direct Bank Disbursal',
      summary: 'Funds deposited straight into your designated bank account.',
      details: 'Execute digital e-sign agreement and set up automated e-NACH mandate. Loan capital is credited securely directly into your account.',
      icon: Landmark, /* [CHANGE ICON HERE] */
      badge: 'Swift Disbursal'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
            Frictionless Flow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            Four Convenient Steps to Disbursal
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Say goodbye to endless paperwork and repetitive bank branch visits.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, index) => {
            const Icon = st.icon;
            const isCurrent = activeStep === index;
            return (
              <div
                key={st.num}
                onClick={() => setActiveStep(index)}
                className={`rounded-3xl p-6 border transition-all cursor-pointer flex flex-col justify-between ${
                  isCurrent 
                    ? 'bg-emerald-50/50 border-emerald-500 shadow-lg shadow-emerald-500/10' 
                    : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black font-mono text-emerald-600">
                      {st.num}
                    </span>
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${isCurrent ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      {/* [CHANGE ICON HERE] Roadmap step icon */}
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="inline-block mt-4 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {st.badge}
                  </span>

                  <h3 className="text-lg font-bold text-slate-900 mt-3">
                    {st.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {st.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                  <span className={isCurrent ? 'text-emerald-700' : 'text-slate-400'}>
                    {isCurrent ? 'Active Step' : 'Click to View'}
                  </span>
                  {/* [CHANGE ICON HERE] */}
                  <ChevronRight className={`w-4 h-4 transition-transform ${isCurrent ? 'rotate-90 text-emerald-600' : 'text-slate-400'}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Detail Viewer for selected step */}
        <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Step {steps[activeStep].num} Breakdown
            </span>
            <h4 className="text-lg font-bold text-slate-900">
              {steps[activeStep].title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              {steps[activeStep].details}
            </p>
          </div>

          <button 
            onClick={() => onOpenModal(`Step ${steps[activeStep].num}: ${steps[activeStep].title}`)}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 shadow-sm transition-colors flex items-center gap-1.5"
          >
            <span>Proceed with Step</span>
            {/* [CHANGE ICON HERE] */}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}

// ========================================== //
// SECTION: EMI CALCULATOR SUITE              //
// ========================================== //

function CalculatorSuiteSection({ onOpenModal }: ComponentProps) {
  const [calcType, setCalcType] = useState<string>('home');
  const [loanAmount, setLoanAmount] = useState<number>(4000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(20);

  const stats = useMemo(() => {
    const monthlyRate = interestRate / 12 / 100;
    const totalMonths = tenureYears * 12;
    
    // Standard EMI formula: [P x R x (1+R)^N]/[(1+R)^N-1]
    const emi = Math.round(
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
    );

    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - loanAmount;
    const principalPercent = Math.max(0, Math.min(100, Math.round((loanAmount / totalPayment) * 100)));
    const interestPercent = 100 - principalPercent;

    return {
      monthlyEmi: isNaN(emi) ? 0 : emi,
      totalPayment: isNaN(totalPayment) ? 0 : totalPayment,
      totalInterest: isNaN(totalInterest) ? 0 : totalInterest,
      principalPercent,
      interestPercent
    };
  }, [loanAmount, interestRate, tenureYears]);

  const setPreset = (type: string) => {
    setCalcType(type);
    if (type === 'home') {
      setLoanAmount(5000000);
      setInterestRate(8.35);
      setTenureYears(20);
    } else if (type === 'personal') {
      setLoanAmount(1000000);
      setInterestRate(10.75);
      setTenureYears(4);
    } else if (type === 'business') {
      setLoanAmount(2500000);
      setInterestRate(11.5);
      setTenureYears(5);
    }
  };

  return (
    <section id="calculator-section" className="py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
            Interactive Financial Engine
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            Calculate Loan EMI & Amortization
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Accurate reducing balance computations with detailed interest vs. principal distribution.
          </p>
        </div>

        {/* Presets Toggle */}
        <div className="flex justify-center mt-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <button
              onClick={() => setPreset('home')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${calcType === 'home' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Home Loan
            </button>
            <button
              onClick={() => setPreset('personal')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${calcType === 'personal' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Personal Loan
            </button>
            <button
              onClick={() => setPreset('business')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${calcType === 'business' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Business Loan
            </button>
          </div>
        </div>

        {/* Calculator Main Container */}
        <div className="mt-12 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/50 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Sliders Input Area */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Slider 1: Loan Amount */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Loan Amount</label>
                <div className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono font-bold text-sm">
                  ₹ {loanAmount.toLocaleString('en-IN')}
                </div>
              </div>
              <input 
                type="range"
                min="100000"
                max="20000000"
                step="50000"
                value={loanAmount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLoanAmount(Number(e.target.value))}
                className="w-full accent-emerald-600 bg-slate-200 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono font-semibold">
                <span>₹1 Lakh</span>
                <span>₹1 Crore</span>
                <span>₹2 Crore</span>
              </div>
            </div>

            {/* Slider 2: Interest Rate */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Interest Rate (p.a.)</label>
                <div className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono font-bold text-sm">
                  {interestRate}%
                </div>
              </div>
              <input 
                type="range"
                min="7.0"
                max="20.0"
                step="0.05"
                value={interestRate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInterestRate(Number(e.target.value))}
                className="w-full accent-emerald-600 bg-slate-200 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono font-semibold">
                <span>7.0%</span>
                <span>13.5%</span>
                <span>20.0%</span>
              </div>
            </div>

            {/* Slider 3: Loan Tenure */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Tenure (Years)</label>
                <div className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono font-bold text-sm">
                  {tenureYears} Years ({tenureYears * 12} Months)
                </div>
              </div>
              <input 
                type="range"
                min="1"
                max="30"
                step="1"
                value={tenureYears}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTenureYears(Number(e.target.value))}
                className="w-full accent-emerald-600 bg-slate-200 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono font-semibold">
                <span>1 Year</span>
                <span>15 Years</span>
                <span>30 Years</span>
              </div>
            </div>

          </div>

          {/* Result Card & Visual Breakdown */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg">
            <div>
              <span className="text-xs text-slate-500 uppercase font-semibold block">Monthly EMI Outflow</span>
              <div className="text-4xl font-black text-slate-900 font-mono mt-1">
                ₹ {stats.monthlyEmi.toLocaleString('en-IN')}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Computed per reducing balance methodology</p>
            </div>

            {/* Visual Bar Breakdown */}
            <div className="my-6 space-y-2">
              <div className="w-full h-3.5 bg-slate-200 rounded-full overflow-hidden flex">
                <div 
                  className="bg-emerald-600 h-full transition-all duration-300" 
                  style={{ width: `${stats.principalPercent}%` }}
                />
                <div 
                  className="bg-teal-400 h-full transition-all duration-300" 
                  style={{ width: `${stats.interestPercent}%` }}
                />
              </div>

              <div className="flex justify-between text-xs text-slate-600 pt-1 font-semibold">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <span>Principal ({stats.principalPercent}%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                  <span>Interest ({stats.interestPercent}%)</span>
                </div>
              </div>
            </div>

            {/* Financial Totals */}
            <div className="space-y-3 py-4 border-t border-b border-slate-200/80 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Principal Loan</span>
                <span className="font-mono font-bold text-slate-900">₹ {loanAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Interest Payable</span>
                <span className="font-mono font-bold text-teal-700">₹ {stats.totalInterest.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span className="text-slate-700">Overall Amount Payable</span>
                <span className="font-mono text-slate-900 text-sm">₹ {stats.totalPayment.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button 
              onClick={() => onOpenModal(`Calculated EMI Loan for ₹${loanAmount.toLocaleString('en-IN')}`)}
              className="mt-6 w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Apply for this EMI Rate</span>
              {/* [CHANGE ICON HERE] */}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

// ========================================== //
// SECTION: APP DOWNLOAD MOCKUP               //
// ========================================== //

function AppDownloadSection({ onOpenModal }: ComponentProps) {
  return (
    <section className="py-24 bg-white border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/40">
                {/* [CHANGE ICON HERE] */}
                <Smartphone className="w-3.5 h-3.5" /> Mobile Financial App
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                Borrow, Track, and Manage <br />
                <span className="text-emerald-400">Right From Your Pocket.</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Download the Saiban Capital application to receive push updates on your loan verification status, instant credit score refreshes, and special pre-approved banking invitations.
              </p>

              {/* Statistics */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-white font-mono">100+</p>
                  <p className="text-xs text-slate-400">Operating Cities</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">₹25,000 Cr</p>
                  <p className="text-xs text-slate-400">Total Disbursals</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-white font-mono">1.2M+</p>
                  <p className="text-xs text-slate-400">Happy Borrowers</p>
                </div>
              </div>

              {/* Download Buttons and QR */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button 
                  onClick={() => onOpenModal('App Store Download Link')}
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 transition-colors shadow-sm"
                >
                  <span className="text-2xl"></span>
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold text-slate-500">Download on</p>
                    <p className="text-xs font-extrabold leading-none">Apple Store</p>
                  </div>
                </button>

                <button 
                  onClick={() => onOpenModal('Play Store Download Link')}
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 transition-colors"
                >
                  <span className="text-2xl">▶</span>
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Get it on</p>
                    <p className="text-xs font-extrabold leading-none">Google Play</p>
                  </div>
                </button>

                <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-800/90 border border-slate-700">
                  {/* [CHANGE ICON HERE] */}
                  <QrCode className="w-8 h-8 text-emerald-400" />
                  <span className="text-[11px] text-slate-300 leading-tight">
                    Scan QR for <br />Instant Link
                  </span>
                </div>
              </div>
            </div>

            {/* Right Phone Mockup in Clean Light Simulation */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-64 sm:w-72 rounded-[40px] bg-slate-800 border-4 border-slate-700 p-3 shadow-2xl relative">
                {/* Speaker top bar */}
                <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto mb-3" />
                
                {/* Inner Screen Display (Light Theme inside Phone) */}
                <div className="rounded-[30px] bg-white p-4 text-slate-900 space-y-4 shadow-inner">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-extrabold text-emerald-700">Saiban App</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">Online</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
                    <p className="text-[10px] text-slate-500 font-semibold uppercase">Active Home Loan</p>
                    <p className="text-xl font-black font-mono text-slate-900">₹ 42,50,000</p>
                    <p className="text-[10px] text-emerald-700 font-bold mt-1">Next EMI: 5th of next month</p>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                      <span className="font-semibold text-slate-700">Sanction Letter</span>
                      <span className="text-emerald-700 text-[10px] font-black uppercase">Approved</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                      <span className="font-semibold text-slate-700">Bank Disbursal</span>
                      <span className="text-blue-700 text-[10px] font-black uppercase">In Progress</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-100 text-center">
                    <p className="text-[10px] text-slate-500">Your CIBIL Score</p>
                    <p className="text-2xl font-black text-emerald-700 font-mono">792</p>
                    <p className="text-[9px] font-bold text-slate-600">Excellent Credit Tier</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

// ========================================== //
// SECTION: FAQ ACCORDION                     //
// ========================================== //

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const [selectedCat, setSelectedCat] = useState<string>('All');

  const categories = ['All', 'General', 'Home Loan', 'Personal Loan', 'Documents'];

  const filteredFaqs = useMemo(() => {
    if (selectedCat === 'All') return FAQS_LIST;
    return FAQS_LIST.filter(f => f.category === selectedCat);
  }, [selectedCat]);

  return (
    <section id="faq-section" className="py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Transparent insights on interest rates, processing timelines, and credit score guidelines.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCat(c)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedCat === c 
                  ? 'bg-slate-900 text-white shadow-xs' 
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="mt-10 space-y-3">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={faq.q}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 text-slate-900 hover:text-emerald-700 transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base">{faq.q}</span>
                  {/* [CHANGE ICON HERE] */}
                  <ChevronDown className={`w-5 h-5 text-emerald-600 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

// ========================================== //
// SECTION: BANKING PARTNERS GRID             //
// ========================================== //

function BankingPartnersSection({ onOpenModal }: ComponentProps) {
  return (
    <section id="partners-section" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
            Institutional Tie-Ups
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
            Our 50+ Banking & NBFC Partners
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-2">
            Priority underwriting privileges, waived documentation fees, and preferential prime lending rates.
          </p>
        </div>

        {/* Bank Partner Grid in Clean Light Card Format */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {BANK_PARTNERS.map((bank, i) => (
            <div 
              key={i}
              onClick={() => onOpenModal(`Bank Partner: ${bank.name}`)}
              className="bg-slate-50 hover:bg-white border border-slate-200/90 hover:border-emerald-500 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xs font-black text-slate-800 shadow-xs group-hover:scale-105 transition-transform">
                {bank.symbol}
              </div>
              <span className="text-xs font-bold text-slate-900 mt-2 line-clamp-1">
                {bank.name}
              </span>
              <span className={`mt-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold border ${bank.badgeColor}`}>
                {bank.tag}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            {/* [CHANGE ICON HERE] */}
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Authorized Institutional DSA
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            {/* [CHANGE ICON HERE] */}
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> RBI Regulated Partner Entities
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            {/* [CHANGE ICON HERE] */}
            <Award className="w-4 h-4 text-emerald-600" /> 100% Zero Brokerage to Customer
          </span>
        </div>

      </div>
    </section>
  );
}

// ========================================== //
// SECTION: FOOTER                            //
// ========================================== //

function Footer({ onOpenModal }: ComponentProps) {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-slate-800">
          
          {/* Company branding */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              {/* [CHANGE ICON HERE] Updated image source to match logo file and removed invert/brightness filters to display natural JPEG colors */}
              <img 
                src="/logo12.jpeg" 
                alt="Saiban Capital Solutions Logo" 
                className="w-11 h-11 object-contain rounded-xl shadow-sm border border-slate-800"
              />
              <span className="text-lg font-black uppercase">
                <span className="text-[#4B9303]">SAIBAN</span>
                <span className="text-[#024CA3]">CAPITAL</span>
              </span>
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Saiban Capital Solutions is India's leading digital financial advisory and lending marketplace, empowering borrowers through unbiased algorithmic comparisons, lowest interest rates, and paperless digital sanctioning.
            </p>

            <div className="text-[11px] text-slate-400 space-y-1 pt-2">
              <p>Corporate HQ: Horizon Towers, Bandra Kurla Complex (BKC), Mumbai 400051</p>
              <p>Customer Support: support@saibancapital.in | Toll-Free: 1800-419-8900</p>
            </div>
          </div>

          {/* Loan Products */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Loan Portfolio</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onOpenModal('Home Loan')} className="hover:text-emerald-400 transition-colors">Home Loans</button></li>
              <li><button onClick={() => onOpenModal('Personal Loan')} className="hover:text-emerald-400 transition-colors">Personal Loans</button></li>
              <li><button onClick={() => onOpenModal('Loan Against Property')} className="hover:text-emerald-400 transition-colors">Loan Against Property</button></li>
              <li><button onClick={() => onOpenModal('Business Loan')} className="hover:text-emerald-400 transition-colors">Business & MSME Loans</button></li>
              <li><button onClick={() => onOpenModal('Home Loan Balance Transfer')} className="hover:text-emerald-400 transition-colors">Balance Transfer</button></li>
              <li><button onClick={() => onOpenModal('Commercial Purchase')} className="hover:text-emerald-400 transition-colors">Commercial Property Loan</button></li>
            </ul>
          </div>

          {/* Calculators links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Calculators</h4>
            <ul className="space-y-2">
              <li><a href="#calculator-section" className="hover:text-emerald-400 transition-colors">Home Loan EMI Calculator</a></li>
              <li><a href="#calculator-section" className="hover:text-emerald-400 transition-colors">Personal Loan EMI Calculator</a></li>
              <li><a href="#calculator-section" className="hover:text-emerald-400 transition-colors">Balance Transfer Savings</a></li>
              <li><a href="#calculator-section" className="hover:text-emerald-400 transition-colors">CIBIL Score Eligibility</a></li>
              <li><a href="#calculator-section" className="hover:text-emerald-400 transition-colors">Part-Prepayment Estimator</a></li>
            </ul>
          </div>

          {/* Legal and Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Legal & Compliance</h4>
            <ul className="space-y-2">
              <li><a href="#hero-section" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#hero-section" className="hover:text-emerald-400 transition-colors">Terms & Conditions</a></li>
              <li><a href="#hero-section" className="hover:text-emerald-400 transition-colors">Fair Practice Code</a></li>
              <li><a href="#hero-section" className="hover:text-emerald-400 transition-colors">Grievance Redressal Officer</a></li>
              <li><a href="#hero-section" className="hover:text-emerald-400 transition-colors">Data Security & Encryption</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Disclaimers */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Saiban Capital Solutions Private Limited. All rights reserved.</p>
          <p className="text-slate-500 text-center sm:text-right max-w-xl">
            Disclaimer: Interest rates and sanction criteria are governed exclusively by respective banking partners based on applicant credit profile and RBI guidelines.
          </p>
        </div>

      </div>
    </footer>
  );
}

// ========================================== //
// SECTION: MAIN APP WRAPPER                  //
// ========================================== //

export default function App() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<string>('Home Loan');

  const handleOpenModal = (productName: string = 'Personalized Loan') => {
    setSelectedProduct(productName);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      {/* GLOBAL MODAL FOR APPLICATION */}
      <QuickApplyModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        selectedProduct={selectedProduct} 
      />

      {/* 1. TOP NAVBAR */}
      <Navbar onOpenModal={handleOpenModal} />

      {/* 2. HERO SECTION */}
      <HeroSection onOpenModal={handleOpenModal} />

      {/* 3. PROMOTIONAL FESTIVAL BANNER */}
      <PromotionalRibbon onOpenModal={handleOpenModal} />

      {/* 4. KEY PRODUCTS CATEGORY GRID */}
      <KeyProductsSection onOpenModal={handleOpenModal} />

      {/* 5. ALTERNATING FEATURE STORYBOARDS */}
      <FeatureShowcaseSection onOpenModal={handleOpenModal} />

      {/* 6. FOUR CONVENIENT STEPS ROADMAP */}
      <LoanJourneyRoadmap onOpenModal={handleOpenModal} />

      {/* 7. INTERACTIVE LOAN EMI CALCULATOR */}
      <CalculatorSuiteSection onOpenModal={handleOpenModal} />

      {/* 8. SUPERAPP MOBILE DOWNLOAD */}
      <AppDownloadSection onOpenModal={handleOpenModal} />

      {/* 9. FREQUENTLY ASKED QUESTIONS */}
      <FaqSection />

      {/* 10. BANKING PARTNERS NETWORK */}
      <BankingPartnersSection onOpenModal={handleOpenModal} />

      {/* 11. ENTERPRISE FOOTER */}
      <Footer onOpenModal={handleOpenModal} />
    </div>
  );
}