import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Briefcase,
  Building2,
  Calculator,
  Check,
  ChevronDown,
  Clock,
  Cog,
  FileSpreadsheet,
  IndianRupee,
  Layers,
  PhoneCall,
  Receipt,
  ShieldCheck,
  Star,
  Store,
  TrendingUp,
  HeartPulse,
} from 'lucide-react';
import { InteriorPage } from '../components/InteriorPage';

// --- Scroll Reveal Wrapper ---
interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
};

const formatINR = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.round(amount));

export default function BusinessLoansPage() {
  // Interactive Hero Facility & Cash-Flow Calculator State
  const [facilityAmount, setFacilityAmount] = useState<number>(2500000); // ₹25,00,000
  const [tenureMonths, setTenureMonths] = useState<number>(36);
  const [roi, setRoi] = useState<number>(13.5);

  // Interactive Business Facility Selector
  const [activeFacility, setActiveFacility] = useState<string>('term');

  // Business Entity Toggle (Proprietorship/SME vs Pvt Ltd/LLP)
  const [entityType, setEntityType] = useState<'proprietorship' | 'company'>('proprietorship');

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Live Monthly Outflow Calculation
  const monthlyRate = roi / 12 / 100;
  const monthlyEmi =
    monthlyRate === 0
      ? facilityAmount / tenureMonths
      : (facilityAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
        (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  const totalOutflow = monthlyEmi * tenureMonths;
  const totalInterest = totalOutflow - facilityAmount;

  const facilities = [
    {
      id: 'term',
      title: 'Unsecured Business Term Loan',
      tag: 'Zero Collateral · Up to ₹75 L*',
      limit: '₹3 L – ₹75 L',
      tenure: '12 – 60 Months',
      rate: 'From 12.50% p.a.*',
      turnaround: '48–72 Hours*',
      icon: Briefcase,
      image:
        'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=85',
      highlights: [
        'Underwritten on GST turnover & banking cash flows',
        'No property, machinery, or FD collateral required',
        'Ideal for inventory stocking, hiring & branch expansion',
      ],
    },
    {
      id: 'working-capital',
      title: 'Working Capital OD / Cash Credit',
      tag: 'Pay Interest Only on Used Limit',
      limit: '₹5 L – ₹5 Cr*',
      tenure: '12-Mo Annual Renewal',
      rate: 'From 10.75% p.a.*',
      turnaround: '3–5 Working Days*',
      icon: BarChart3,
      image:
        'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1400&q=85',
      highlights: [
        'Dropline & revolving overdraft lines linked to current account',
        'Draw funds during peak seasonal cycles, repay anytime',
        'Interest charged strictly on daily utilized balance',
      ],
    },
    {
      id: 'machinery',
      title: 'Equipment & Machinery Finance',
      tag: 'Up to 85% Asset Funding*',
      limit: '₹5 L – ₹3 Cr*',
      tenure: '24 – 84 Months',
      rate: 'From 11.25% p.a.*',
      turnaround: '3–4 Working Days*',
      icon: Cog,
      image:
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=85',
      highlights: [
        'Finance CNC machines, medical diagnostics, printing & plant gear',
        'Equipment itself acts as primary security—no extra property needed',
        'Flexible moratorium window aligned with installation & commissioning',
      ],
    },
    {
      id: 'invoice',
      title: 'GST & Invoice Discounting',
      tag: 'Unlock B2B Receivables Fast',
      limit: '₹2 L – ₹1 Cr*',
      tenure: '30 – 120 Days Cycle',
      rate: 'From 11.50% p.a.*',
      turnaround: '24–48 Hours*',
      icon: Receipt,
      image:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=85',
      highlights: [
        'Convert unpaid B2B GST invoices into immediate cash flow',
        'Keep vendor payments on schedule without straining reserves',
        'Digital GSTN & e-way bill verification for rapid sanction',
      ],
    },
  ];

  const currentFacility = facilities.find((f) => f.id === activeFacility) || facilities[0];

  const founderStories = [
    {
      founder: 'Rajeshwari Menon',
      business: 'Precision Auto Components · Chennai',
      facility: '₹42 Lakh Machinery + Term Loan',
      metric: '+38% Output Capacity',
      quote:
        'Financed two new CNC units without pledging family property. GST-based underwriting closed in 3 days.',
      photo:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    },
    {
      founder: 'Harshvardhan Joshi',
      business: 'MedPlus Pharma Distributors · Ahmedabad',
      facility: '₹65 Lakh Working Capital OD',
      metric: 'Zero Idle Interest',
      quote:
        'With a dropline overdraft, we only pay interest during peak monsoon stock-ups and park surplus cash right back.',
      photo:
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    },
    {
      founder: 'Tanvi Sethi',
      business: 'Roast & Co. Cloud Kitchens · Delhi NCR',
      facility: '₹18 Lakh Expansion Loan',
      metric: '3 New Outlets Opened',
      quote:
        'Comparing NBFC and private bank offers side by side saved us 1.75% on ROI and eliminated foreclosure lock-in.',
      photo:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const faqs = [
    {
      q: 'Can I get a business loan without pledging property or collateral?',
      a: 'Yes. Unsecured business term loans up to ₹75 Lakh* are assessed purely on your business vintage, GST returns, current account banking turnover, and ITR financials—with zero property or FD collateral.',
    },
    {
      q: 'What is the difference between a Business Term Loan and an Overdraft (OD)?',
      a: 'A Term Loan disburses a lump sum repaid via fixed monthly EMIs over 12–60 months. An Overdraft (OD) gives you a sanctioned credit limit where you pay interest only on the exact amount utilized each day.',
    },
    {
      q: 'How much business vintage is required to apply?',
      a: 'Most banks and NBFCs require a minimum business continuity of 2 to 3 years with active GST filings and regular current-account banking transactions.',
    },
    {
      q: 'Are business loan interest payments tax-deductible?',
      a: 'Interest paid on business loans and working capital facilities is generally treated as a deductible business expense under the Income Tax Act. Consult your Chartered Accountant for exact treatment.',
    },
  ];

  return (
    <InteriorPage>
      <div className="min-h-screen bg-[#fcfcfd] text-[#0a192f] font-sans antialiased selection:bg-[#0052cc] selection:text-white">
        {/* ==================== 1. ARCHITECTURAL SPLIT-GRID HERO + INTERACTIVE WORKING CAPITAL PLANNER ==================== */}
        <section className="relative overflow-hidden bg-[#f8fafd] border-b border-slate-200/80 pt-10 pb-16 sm:pt-14 sm:pb-24">
          {/* Subtle Architectural Grid Lines */}
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              backgroundSize: '56px 56px',
              backgroundImage:
                'linear-gradient(to right, rgba(10, 25, 47, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(10, 25, 47, 0.03) 1px, transparent 1px)',
            }}
          />
          <div className="pointer-events-none absolute -top-28 right-0 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              {/* Left 6 Cols: Enterprise Visual Story + Industrial Photo Card */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3.5 py-1.5 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-[#0052cc]" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#0052cc]">
                    MSME &amp; Enterprise Business Finance
                  </span>
                </div>

                <h1 className="text-[2.5rem] sm:text-[3.4rem] lg:text-[3.9rem] font-bold leading-[1.05] tracking-tight text-[#0a192f]">
                  Fuel business growth{' '}
                  <span className="font-serif font-normal italic text-[#0052cc]">
                    without dilution
                  </span>{' '}
                  or delays.
                </h1>

                {/* Visual Photo Banner Embedded Directly in Hero Left */}
                <div className="relative h-48 sm:h-56 overflow-hidden rounded-[24px] shadow-lg border border-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=85"
                    alt="Indian business founders reviewing expansion and cash-flow plans"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f]/85 via-[#0a192f]/45 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6 text-white">
                    <span className="w-fit rounded-full bg-[#8ec843] px-3 py-1 text-[10px] font-extrabold text-[#0a192f]">
                      GST &amp; BANKING-SURROGATE UNDERWRITING
                    </span>
                    <div className="grid grid-cols-3 gap-3 max-w-md">
                      <div>
                        <p className="text-xl sm:text-2xl font-extrabold">₹75 L*</p>
                        <p className="text-[11px] text-sky-200">Unsecured Limit</p>
                      </div>
                      <div>
                        <p className="text-xl sm:text-2xl font-extrabold">10.75%*</p>
                        <p className="text-[11px] text-sky-200">OD / Secured ROI</p>
                      </div>
                      <div>
                        <p className="text-xl sm:text-2xl font-extrabold">48 Hrs*</p>
                        <p className="text-[11px] text-sky-200">Digital Sanction</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="flex flex-wrap items-center gap-3.5 pt-1">
                  <a
                    href="/apply"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0052cc] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/15 transition hover:bg-[#003d8f]"
                  >
                    <span>Check Business Eligibility</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-[#0a192f] transition hover:bg-slate-50"
                  >
                    <PhoneCall className="h-4 w-4 text-[#0052cc]" />
                    <span>Speak to MSME Desk</span>
                  </a>
                </div>
              </div>

              {/* Right 6 Cols: Interactive Business Loan & Working Capital Simulator */}
              <div className="lg:col-span-6">
                <div className="rounded-[28px] border border-slate-200 bg-white p-6 sm:p-8 shadow-[0_28px_65px_-32px_rgba(10,25,47,0.2)]">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0a192f] text-[#8ec843]">
                        <Calculator className="h-5 w-5" />
                      </span>
                      <div>
                        <h2 className="text-base font-bold text-[#0a192f]">
                          Business Cash-Flow Estimator
                        </h2>
                        <p className="text-[11px] text-slate-500">
                          Model your expansion loan or equipment EMI
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold text-[#0052cc]">
                      25+ Banks &amp; NBFCs
                    </span>
                  </div>

                  {/* Sliders */}
                  <div className="mt-5 space-y-5">
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1.5">
                        <span className="text-slate-600">Capital Requirement</span>
                        <span className="text-base font-extrabold text-[#0052cc]">
                          {formatINR(facilityAmount)}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={300000}
                        max={10000000}
                        step={100000}
                        value={facilityAmount}
                        onChange={(e) => setFacilityAmount(Number(e.target.value))}
                        aria-label="Business capital requirement"
                        className="w-full accent-[#0052cc] cursor-pointer h-2 rounded-lg bg-slate-200"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                        <span>₹3 Lakh</span>
                        <span>₹50 Lakh</span>
                        <span>₹1 Crore</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1.5">
                          <span className="text-slate-600">Tenure</span>
                          <span className="font-extrabold text-[#0a192f]">
                            {tenureMonths} Months
                          </span>
                        </div>
                        <input
                          type="range"
                          min={12}
                          max={60}
                          step={6}
                          value={tenureMonths}
                          onChange={(e) => setTenureMonths(Number(e.target.value))}
                          aria-label="Business loan tenure"
                          className="w-full accent-[#0052cc] cursor-pointer h-2 rounded-lg bg-slate-200"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1.5">
                          <span className="text-slate-600">Indicative ROI</span>
                          <span className="font-extrabold text-[#558b2f]">{roi.toFixed(2)}%</span>
                        </div>
                        <input
                          type="range"
                          min={10.75}
                          max={19}
                          step={0.25}
                          value={roi}
                          onChange={(e) => setRoi(Number(e.target.value))}
                          aria-label="Business loan interest rate"
                          className="w-full accent-[#558b2f] cursor-pointer h-2 rounded-lg bg-slate-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Output Summary Panel */}
                  <div className="mt-6 rounded-2xl bg-gradient-to-br from-[#0a192f] via-[#103767] to-[#0052cc] p-5 text-white">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/15 pb-4">
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-sky-200 font-bold">
                          Estimated Monthly EMI
                        </p>
                        <p className="mt-1 text-3xl font-extrabold tracking-tight">
                          {formatINR(monthlyEmi)}
                          <span className="text-xs font-normal text-sky-200"> / mo</span>
                        </p>
                      </div>
                      <a
                        href="/apply"
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#8ec843] px-4 py-3 text-xs font-extrabold text-[#0a192f] transition hover:opacity-95"
                      >
                        Request Quotes <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </div>

                    <div className="mt-3.5 grid grid-cols-2 gap-3 text-xs">
                      <div className="rounded-xl bg-white/10 px-3.5 py-2">
                        <span className="block text-[10px] text-sky-200">Sanctioned Capital</span>
                        <span className="font-bold">{formatINR(facilityAmount)}</span>
                      </div>
                      <div className="rounded-xl bg-white/10 px-3.5 py-2">
                        <span className="block text-[10px] text-sky-200">Total Interest Cost</span>
                        <span className="font-bold text-[#8ec843]">{formatINR(totalInterest)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 2. INTERACTIVE 4-FACILITY VISUAL STAGE ==================== */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0052cc]">
                  Tailored Credit Structures
                </span>
                <h2 className="mt-1.5 text-3xl sm:text-4xl font-bold tracking-tight text-[#0a192f]">
                  Pick the right{' '}
                  <span className="font-serif font-normal italic text-[#0052cc]">
                    growth facility
                  </span>
                </h2>
              </div>

              {/* Facility Switcher Pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'term', label: 'Unsecured Term Loan' },
                  { id: 'working-capital', label: 'Working Capital OD' },
                  { id: 'machinery', label: 'Machinery Finance' },
                  { id: 'invoice', label: 'Invoice Discounting' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveFacility(tab.id)}
                    className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                      activeFacility === tab.id
                        ? 'bg-[#0a192f] text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Facility Split Photo + Spec Card */}
            <ScrollReveal>
              <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-[#fcfcfd] grid grid-cols-1 lg:grid-cols-12 shadow-sm">
                {/* Left 6 Cols: Full-Height Context Photo */}
                <div className="relative min-h-[280px] lg:min-h-[380px] lg:col-span-6">
                  <img
                    src={currentFacility.image}
                    alt={currentFacility.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/90 via-[#0a192f]/30 to-transparent" />
                  <div className="absolute top-5 left-5">
                    <span className="rounded-full bg-[#8ec843] px-3.5 py-1 text-[11px] font-extrabold text-[#0a192f]">
                      {currentFacility.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2.5 text-white">
                    <div className="rounded-xl bg-white/15 p-3 backdrop-blur-md border border-white/15">
                      <span className="block text-[10px] text-sky-200">Ticket Size</span>
                      <span className="text-sm font-extrabold">{currentFacility.limit}</span>
                    </div>
                    <div className="rounded-xl bg-white/15 p-3 backdrop-blur-md border border-white/15">
                      <span className="block text-[10px] text-sky-200">Indicative ROI</span>
                      <span className="text-sm font-extrabold">{currentFacility.rate}</span>
                    </div>
                    <div className="rounded-xl bg-white/15 p-3 backdrop-blur-md border border-white/15">
                      <span className="block text-[10px] text-sky-200">Turnaround</span>
                      <span className="text-sm font-extrabold">{currentFacility.turnaround}</span>
                    </div>
                  </div>
                </div>

                {/* Right 6 Cols: Crisp Key Points & CTA */}
                <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0052cc]">
                        <currentFacility.icon className="h-5 w-5" />
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        Tenure: {currentFacility.tenure}
                      </span>
                    </div>

                    <h3 className="mt-4 text-2xl sm:text-3xl font-bold text-[#0a192f]">
                      {currentFacility.title}
                    </h3>

                    <ul className="mt-6 space-y-3.5">
                      {currentFacility.highlights.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-[14px] font-medium text-slate-700"
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f4faef] text-[#558b2f]">
                            <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-3">
                    <a
                      href="/apply"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#0052cc] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#003d8f]"
                    >
                      Apply for This Facility <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#0052cc] hover:underline"
                    >
                      Compare lender terms &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ==================== 3. VISUAL UNSECURED VS SECURED / OD MATRIX ==================== */}
        <section className="py-16 lg:py-20 bg-[#f4f8ff] border-y border-blue-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0052cc]">
                Side-by-Side Comparison
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0a192f]">
                Choose how you want to{' '}
                <span className="font-serif font-normal italic text-[#0052cc]">
                  structure capital
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Collateral-Free Term Loan',
                  badge: 'FASTEST SANCTION',
                  limit: 'Up to ₹75 Lakh*',
                  rate: '12.50% – 17.50%*',
                  security: 'Zero property or FD required',
                  bestFor: 'Immediate inventory, marketing & expansion',
                  highlight: true,
                },
                {
                  title: 'Dropline / Revolving OD',
                  badge: 'MOST FLEXIBLE',
                  limit: '₹5 Lakh – ₹5 Cr*',
                  rate: '10.75% – 14.50%*',
                  security: 'Property, FD, or CGTMSE cover',
                  bestFor: 'Managing seasonal receivable cycles',
                  highlight: false,
                },
                {
                  title: 'Machinery / Equipment Loan',
                  badge: 'ASSET-BACKED',
                  limit: 'Up to 85% Invoice*',
                  rate: '11.25% – 14.00%*',
                  security: 'Hypothecation of funded machine',
                  bestFor: 'Manufacturing, healthcare & printing upgrades',
                  highlight: false,
                },
              ].map((plan) => (
                <div
                  key={plan.title}
                  className={`rounded-[24px] p-7 flex flex-col justify-between transition ${
                    plan.highlight
                      ? 'bg-[#0a192f] text-white shadow-xl ring-2 ring-[#0052cc]'
                      : 'bg-white text-[#0a192f] border border-slate-200'
                  }`}
                >
                  <div>
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-[10px] font-extrabold ${
                        plan.highlight
                          ? 'bg-[#8ec843] text-[#0a192f]'
                          : 'bg-blue-50 text-[#0052cc]'
                      }`}
                    >
                      {plan.badge}
                    </span>
                    <h3 className="mt-4 text-xl font-bold">{plan.title}</h3>
                    <p
                      className={`mt-2 text-2xl font-extrabold ${
                        plan.highlight ? 'text-sky-300' : 'text-[#0052cc]'
                      }`}
                    >
                      {plan.limit}
                    </p>

                    <div
                      className={`mt-5 space-y-3 pt-5 border-t text-xs ${
                        plan.highlight
                          ? 'border-white/15 text-slate-200'
                          : 'border-slate-100 text-slate-600'
                      }`}
                    >
                      <div className="flex justify-between">
                        <span className="opacity-75">Indicative ROI:</span>
                        <span className="font-bold">{plan.rate}</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="opacity-75 shrink-0">Collateral:</span>
                        <span className="font-bold text-right">{plan.security}</span>
                      </div>
                      <div className="pt-2">
                        <span className="block opacity-75 mb-1">Ideal For:</span>
                        <span className="font-semibold">{plan.bestFor}</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href="/apply"
                    className={`mt-7 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-extrabold transition ${
                      plan.highlight
                        ? 'bg-[#8ec843] text-[#0a192f] hover:opacity-95'
                        : 'bg-[#0052cc] text-white hover:bg-[#003d8f]'
                    }`}
                  >
                    Compare Offers <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 4. VISUAL SECTOR GRID (6 INDUSTRIES WE FUND) ==================== */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0052cc]">
                  Sector-Specific Underwriting
                </span>
                <h2 className="mt-1.5 text-3xl sm:text-4xl font-bold tracking-tight text-[#0a192f]">
                  Built for Indian{' '}
                  <span className="font-serif font-normal italic text-[#0052cc]">
                    SMEs &amp; enterprises
                  </span>
                </h2>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                GST · Current Account · ITR-based programs
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: 'Manufacturing', icon: Cog, tag: 'Plant & CNC' },
                { name: 'Retail & Wholesale', icon: Store, tag: 'Stock & POS' },
                { name: 'Healthcare & Clinics', icon: HeartPulse, tag: 'Diagnostics' },
                { name: 'E-Commerce & D2C', icon: Layers, tag: 'Inventory' },
                { name: 'IT & Consulting', icon: Building2, tag: 'Expansion' },
                { name: 'Logistics & Fleet', icon: TrendingUp, tag: 'Working Cap' },
              ].map((sector) => {
                const Icon = sector.icon;
                return (
                  <div
                    key={sector.name}
                    className="group rounded-2xl border border-slate-200 bg-[#fcfcfd] p-5 text-center hover:border-[#0052cc] hover:shadow-md transition"
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#0052cc] group-hover:bg-[#0052cc] group-hover:text-white transition">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-sm font-bold text-[#0a192f]">{sector.name}</h3>
                    <span className="mt-1 inline-block rounded-full bg-[#f4faef] px-2.5 py-0.5 text-[10px] font-bold text-[#558b2f]">
                      {sector.tag}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================== 5. INTERACTIVE ENTITY ELIGIBILITY & CHECKLIST SWITCHER ==================== */}
        <section className="py-16 lg:py-24 bg-[#0a192f] text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#8ec843]">
                  Entity Readiness
                </span>
                <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
                  Eligibility &amp;{' '}
                  <span className="font-serif font-normal italic text-sky-300">
                    GST / ITR checklist
                  </span>
                </h2>
              </div>

              <div className="inline-flex rounded-xl bg-white/10 p-1 w-fit backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => setEntityType('proprietorship')}
                  className={`rounded-lg px-4 py-2.5 text-xs font-bold transition ${
                    entityType === 'proprietorship'
                      ? 'bg-[#8ec843] text-[#0a192f]'
                      : 'text-sky-100 hover:text-white'
                  }`}
                >
                  Proprietorship / Partnership
                </button>
                <button
                  type="button"
                  onClick={() => setEntityType('company')}
                  className={`rounded-lg px-4 py-2.5 text-xs font-bold transition ${
                    entityType === 'company'
                      ? 'bg-[#8ec843] text-[#0a192f]'
                      : 'text-sky-100 hover:text-white'
                  }`}
                >
                  Pvt Ltd / LLP Company
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left 5 Cols: 4 Benchmark Tiles */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                {(entityType === 'proprietorship'
                  ? [
                      { label: 'Business Vintage', val: '2+ Years', icon: Clock },
                      { label: 'Annual Turnover', val: '₹15 Lakh+', icon: IndianRupee },
                      { label: 'GST Filing', val: 'Active 12 Mo', icon: FileSpreadsheet },
                      { label: 'Promoter CIBIL', val: '700+ Score', icon: BadgeCheck },
                    ]
                  : [
                      { label: 'Incorporation Age', val: '2+ Years', icon: Clock },
                      { label: 'Annual Turnover', val: '₹40 Lakh+', icon: IndianRupee },
                      { label: 'Audited Financials', val: 'Last 2 Yrs', icon: FileSpreadsheet },
                      { label: 'Director CIBIL', val: '725+ Score', icon: BadgeCheck },
                    ]
                ).map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-white/15 bg-white/[0.06] p-5"
                    >
                      <Icon className="h-5 w-5 text-[#8ec843] mb-3" />
                      <p className="text-[11px] text-sky-200">{stat.label}</p>
                      <p className="mt-1 text-lg sm:text-xl font-extrabold">{stat.val}</p>
                    </div>
                  );
                })}
              </div>

              {/* Right 7 Cols: Document Pills */}
              <div className="lg:col-span-7 rounded-[24px] border border-white/15 bg-white/[0.05] p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-[#8ec843]" />
                    <span>
                      {entityType === 'proprietorship'
                        ? 'Required Documents — Proprietorship / Firm'
                        : 'Required Documents — Pvt Ltd / LLP'}
                    </span>
                  </h3>
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(entityType === 'proprietorship'
                      ? [
                          'Proprietor PAN & Aadhaar KYC',
                          'GST Registration & Udyam Certificate',
                          'Last 12 Months Current Account Statement',
                          'Last 2 Years ITR with Computation',
                        ]
                      : [
                          'Company PAN, COI, MOA & AOA / LLP Deed',
                          'Directors’ KYC & Shareholding Pattern',
                          'Last 12 Months GST Returns (GSTR-3B)',
                          '2 Years Audited Balance Sheet & P&L',
                        ]
                    ).map((doc) => (
                      <div
                        key={doc}
                        className="flex items-start gap-2.5 rounded-xl bg-white/10 p-3.5 text-xs font-medium text-sky-100"
                      >
                        <Check className="h-4 w-4 shrink-0 text-[#8ec843] mt-0.5" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-sky-200">
                    Digital PDF bank statements &amp; GST fetch supported.
                  </span>
                  <a
                    href="/apply"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#8ec843] px-5 py-2.5 text-xs font-extrabold text-[#0a192f] hover:opacity-95"
                  >
                    Upload &amp; Check Offers <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 6. FOUNDER IMPACT PHOTO CARDS ==================== */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#558b2f]">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span>4.9/5 MSME Founder Rating</span>
                </div>
                <h2 className="mt-1.5 text-3xl sm:text-4xl font-bold tracking-tight text-[#0a192f]">
                  Businesses scaling{' '}
                  <span className="font-serif font-normal italic text-[#0052cc]">with us</span>
                </h2>
              </div>
              <a
                href="/apply"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0052cc] hover:underline"
              >
                Explore funding options <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {founderStories.map((story) => (
                <article
                  key={story.founder}
                  className="group relative h-[380px] overflow-hidden rounded-[26px] shadow-md"
                >
                  <img
                    src={story.photo}
                    alt={story.founder}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07172d] via-[#0a192f]/60 to-transparent" />

                  <div className="relative z-10 flex h-full flex-col justify-between p-6 text-white">
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full bg-[#8ec843] px-3 py-1 text-[10px] font-extrabold text-[#0a192f]">
                        {story.metric}
                      </span>
                      <span className="rounded-full bg-black/45 px-3 py-1 text-[10px] font-bold backdrop-blur-md">
                        {story.facility}
                      </span>
                    </div>

                    <div>
                      <p className="text-sm font-medium leading-relaxed text-white/95">
                        &ldquo;{story.quote}&rdquo;
                      </p>
                      <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold">{story.founder}</p>
                          <p className="text-xs text-sky-200">{story.business}</p>
                        </div>
                        <BadgeCheck className="h-5 w-5 text-[#8ec843]" />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 7. COMPACT FAQs & ENTERPRISE CTA ==================== */}
        <section className="py-16 lg:py-20 bg-[#f8f9fc] border-t border-slate-200/80">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-[#0a192f] mb-8">
              Business Loan FAQs
            </h2>

            <div className="space-y-3">
              {faqs.map((item, idx) => {
                const open = openFaq === idx;
                return (
                  <div
                    key={item.q}
                    className="rounded-2xl border border-slate-200 bg-white overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? null : idx)}
                      aria-expanded={open}
                      className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                    >
                      <span className="text-sm sm:text-base font-bold text-[#0a192f]">{item.q}</span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-[#0052cc] transition-transform ${
                          open ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {open && (
                      <div className="px-6 pb-4 text-sm text-slate-500 leading-relaxed">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom CTA Banner */}
            <div className="mt-12 rounded-[28px] bg-gradient-to-r from-[#0a192f] via-[#103767] to-[#0052cc] p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold">
                  Unlock growth capital for{' '}
                  <span className="font-serif font-normal italic text-[#8ec843]">
                    your business today.
                  </span>
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-sky-100">
                  Unsecured Term Loans · Working Capital OD · Machinery Finance
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <a
                  href="/apply"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#8ec843] px-5 py-3 text-sm font-extrabold text-[#0a192f] hover:opacity-95"
                >
                  Apply Now <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/20"
                >
                  MSME Advisor
                </a>
              </div>
            </div>

            <p className="mt-5 text-[11px] text-slate-400 leading-relaxed">
              *All interest rates, sanctioned limits (up to ₹75 Lakh unsecured / ₹5 Cr secured), and
              48-hour sanction timelines are indicative and subject to lender credit, GST, and
              banking assessment.
            </p>
          </div>
        </section>
      </div>
    </InteriorPage>
  );
}