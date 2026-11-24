import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Calculator,
  Check,
  ChevronDown,
  Clock,
  CreditCard,
  HeartPulse,
  IndianRupee,
  Layers,
  Percent,
  PhoneCall,
  Plane,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingDown,
  Wallet,
  Zap,
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

export default function PersonalLoansPage() {
  // Interactive Hero Live EMI State
  const [loanAmount, setLoanAmount] = useState<number>(600000);
  const [tenureMonths, setTenureMonths] = useState<number>(36);
  const [interestRate, setInterestRate] = useState<number>(10.75);

  // Interactive Goal Visual Stage
  const [selectedGoal, setSelectedGoal] = useState<string>('consolidation');

  // Salaried vs Self-Employed Visual Switch
  const [applicantType, setApplicantType] = useState<'salaried' | 'self-employed'>('salaried');

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Live EMI Calculation
  const monthlyRate = interestRate / 12 / 100;
  const emi =
    monthlyRate === 0
      ? loanAmount / tenureMonths
      : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
        (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  const totalPayable = emi * tenureMonths;
  const totalInterest = totalPayable - loanAmount;
  const principalPct = Math.round((loanAmount / totalPayable) * 100);

  const visualGoals = [
    {
      id: 'consolidation',
      label: 'Debt Consolidation',
      tag: 'Cut APR up to 60%*',
      limit: '₹1.5L – ₹25L',
      tenure: '12–60 Mo',
      rate: '10.75%*',
      icon: Layers,
      image:
        'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1400&q=85',
      bullets: ['1 single monthly EMI', 'Clear high-APR cards', 'Zero collateral'],
    },
    {
      id: 'wedding',
      label: 'Wedding & Family',
      tag: 'Keep FDs Untouched',
      limit: '₹3L – ₹40L',
      tenure: '12–84 Mo',
      rate: '10.65%*',
      icon: Sparkles,
      image:
        'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1400&q=85',
      bullets: ['Up to 7-year tenure', 'Zero end-use limits', '24-hr digital KYC'],
    },
    {
      id: 'medical',
      label: 'Medical Care',
      tag: 'Express Disbursal*',
      limit: '₹50K – ₹15L',
      tenure: '12–48 Mo',
      rate: '10.50%*',
      icon: HeartPulse,
      image:
        'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=85',
      bullets: ['Same-day review*', 'Direct bank credit', 'Easy part-prepay'],
    },
    {
      id: 'travel',
      label: 'Travel & Upskilling',
      tag: '100% Paperless',
      limit: '₹1L – ₹20L',
      tenure: '12–60 Mo',
      rate: '10.85%*',
      icon: Plane,
      image:
        'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=85',
      bullets: ['Global courses & trips', 'No guarantor needed', 'Instant sanction'],
    },
  ];

  const activeGoal = visualGoals.find((g) => g.id === selectedGoal) || visualGoals[0];

  const visualReviews = [
    {
      name: 'Siddharth Malhotra',
      city: 'Gurugram',
      amount: '₹8.5 Lakh',
      purpose: 'Debt Consolidation',
      quote: 'Merged 3 credit cards into one EMI. Saved ₹11,400 every month.',
      photo:
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Nandini Iyer',
      city: 'Bengaluru',
      amount: '₹14 Lakh',
      purpose: 'Family Wedding',
      quote: 'Video KYC took 10 minutes—funds landed the very next morning.',
      photo:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Karan Kulkarni',
      city: 'Mumbai',
      amount: '₹4.5 Lakh',
      purpose: 'Medical Care',
      quote: 'Zero collateral and zero branch visits when my family needed it most.',
      photo:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const faqs = [
    {
      q: 'Is any collateral or security required?',
      a: 'No. Personal loans are 100% unsecured—approved purely on your income, credit score, and repayment profile.',
    },
    {
      q: 'How fast is disbursal after KYC?',
      a: 'Pre-qualified digital applications are typically sanctioned within hours and credited in 24–48 working hours*.',
    },
    {
      q: 'What loan amount and tenure can I choose?',
      a: 'Borrow from ₹50,000 up to ₹40 Lakh with flexible fixed-EMI tenures from 12 to 84 months.',
    },
    {
      q: 'Can I prepay or foreclose my loan early?',
      a: 'Yes—most lenders allow part-prepayment or foreclosure after a 6–12 EMI lock-in period.',
    },
  ];

  return (
    <InteriorPage>
      <div className="min-h-screen bg-[#fcfcfd] text-[#0a192f] font-sans antialiased selection:bg-[#0052cc] selection:text-white">
        {/* ==================== 1. VISUAL-FIRST FULL-BLEED CINEMATIC HERO + GLASS EMI SIMULATOR ==================== */}
        <section className="relative overflow-hidden bg-[#07172d] text-white">
          {/* Background Lifestyle Photography + Gradient Overlay */}
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1800&q=85"
            alt="People smiling and planning personal finances together"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07172d] via-[#0a192f]/90 to-[#0a192f]/65" />
          <div className="pointer-events-none absolute -top-24 right-10 h-96 w-96 rounded-full bg-[#0052cc]/35 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-10 h-80 w-80 rounded-full bg-[#8ec843]/20 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              {/* Left 6 Cols: Crisp Visual Headline & Stat Badges */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-[#8ec843]" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-sky-200">
                    100% Collateral-Free Personal Loans
                  </span>
                </div>

                <h1 className="text-[2.6rem] sm:text-[3.5rem] lg:text-[4.1rem] font-bold leading-[1.04] tracking-tight">
                  Instant credit for{' '}
                  <span className="font-serif font-normal italic text-[#8ec843]">
                    what matters
                  </span>{' '}
                  right now.
                </h1>

                {/* 3 High-Contrast Visual Stat Tiles (Zero Paragraph Clutter) */}
                <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg">
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md">
                    <Percent className="h-4 w-4 text-[#8ec843] mb-1.5" />
                    <p className="text-xl sm:text-2xl font-extrabold">10.50%*</p>
                    <p className="text-[11px] text-sky-200">Starting APR</p>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md">
                    <IndianRupee className="h-4 w-4 text-sky-300 mb-1.5" />
                    <p className="text-xl sm:text-2xl font-extrabold">₹40 L</p>
                    <p className="text-[11px] text-sky-200">Max Limit*</p>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md">
                    <Zap className="h-4 w-4 text-amber-300 mb-1.5" />
                    <p className="text-xl sm:text-2xl font-extrabold">24 Hrs*</p>
                    <p className="text-[11px] text-sky-200">Fast Credit</p>
                  </div>
                </div>

                {/* Primary CTAs */}
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <a
                    href="/apply"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#8ec843] px-6 py-3.5 text-sm font-extrabold text-[#0a192f] shadow-lg shadow-lime-500/20 transition hover:opacity-95"
                  >
                    <span>Check Instant Offer</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
                  >
                    <PhoneCall className="h-4 w-4 text-sky-300" />
                    <span>Talk to Expert</span>
                  </a>
                </div>

                {/* Trust Strip */}
                <div className="flex flex-wrap items-center gap-5 pt-2 text-xs font-semibold text-sky-100">
                  <span className="inline-flex items-center gap-1.5">
                    <BadgeCheck className="h-4 w-4 text-[#8ec843]" /> 25+ Partner Banks &amp; NBFCs
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-sky-300" /> Zero Soft-Pull CIBIL Impact
                  </span>
                </div>
              </div>

              {/* Right 6 Cols: Interactive Frosted-Glass Live EMI & Donut Visualizer */}
              <div className="lg:col-span-6">
                <div className="rounded-[28px] border border-white/20 bg-white/95 p-6 sm:p-8 text-[#0a192f] shadow-2xl backdrop-blur-xl">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0052cc] text-white">
                        <Calculator className="h-5 w-5" />
                      </span>
                      <div>
                        <h2 className="text-base font-bold">Interactive EMI Preview</h2>
                        <p className="text-[11px] text-slate-500">Slide to customize your plan</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[#f4faef] px-3 py-1 text-[11px] font-bold text-[#558b2f]">
                      100% Unsecured
                    </span>
                  </div>

                  {/* Sliders */}
                  <div className="mt-5 space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1.5">
                        <span className="text-slate-600">Loan Amount</span>
                        <span className="text-sm font-extrabold text-[#0052cc]">
                          {formatINR(loanAmount)}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={50000}
                        max={4000000}
                        step={25000}
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        aria-label="Loan Amount"
                        className="w-full accent-[#0052cc] cursor-pointer h-2 rounded-lg bg-slate-200"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1.5">
                          <span className="text-slate-600">Tenure</span>
                          <span className="text-[#0a192f] font-extrabold">
                            {tenureMonths} Months
                          </span>
                        </div>
                        <input
                          type="range"
                          min={12}
                          max={84}
                          step={6}
                          value={tenureMonths}
                          onChange={(e) => setTenureMonths(Number(e.target.value))}
                          aria-label="Tenure in months"
                          className="w-full accent-[#0052cc] cursor-pointer h-2 rounded-lg bg-slate-200"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1.5">
                          <span className="text-slate-600">Interest p.a.</span>
                          <span className="text-[#558b2f] font-extrabold">
                            {interestRate.toFixed(2)}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min={10.5}
                          max={20}
                          step={0.25}
                          value={interestRate}
                          onChange={(e) => setInterestRate(Number(e.target.value))}
                          aria-label="Interest rate"
                          className="w-full accent-[#558b2f] cursor-pointer h-2 rounded-lg bg-slate-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Visual Donut + EMI Summary Box */}
                  <div className="mt-6 rounded-2xl bg-[#0a192f] p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-5">
                    <div className="flex items-center gap-4">
                      {/* Conic Gradient Donut Ring */}
                      <div
                        className="relative h-20 w-20 shrink-0 rounded-full flex items-center justify-center"
                        style={{
                          background: `conic-gradient(#38bdf8 0% ${principalPct}%, #8ec843 ${principalPct}% 100%)`,
                        }}
                      >
                        <div className="h-14 w-14 rounded-full bg-[#0a192f] flex flex-col items-center justify-center">
                          <span className="text-[10px] text-sky-300 font-bold">
                            {principalPct}%
                          </span>
                          <span className="text-[9px] text-slate-400">Principal</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-sky-300 font-bold">
                          Monthly EMI
                        </p>
                        <p className="text-3xl font-extrabold tracking-tight">
                          {formatINR(emi)}
                          <span className="text-xs font-normal text-slate-300">/mo</span>
                        </p>
                        <div className="mt-1.5 flex items-center gap-3 text-[11px]">
                          <span className="inline-flex items-center gap-1 text-sky-200">
                            <span className="h-2 w-2 rounded-full bg-[#38bdf8]" /> Principal
                          </span>
                          <span className="inline-flex items-center gap-1 text-lime-200">
                            <span className="h-2 w-2 rounded-full bg-[#8ec843]" /> Interest{' '}
                            {formatINR(totalInterest)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <a
                      href="/apply"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#0052cc] hover:bg-[#003d8f] px-4 py-3 text-xs font-bold text-white transition shrink-0"
                    >
                      Get This Loan <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 2. VISUAL BENTO PHOTO MOSAIC (4 REAL-LIFE USE CASES) ==================== */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0052cc]">
                  Zero End-Use Restrictions
                </span>
                <h2 className="mt-1.5 text-3xl sm:text-4xl font-bold tracking-tight text-[#0a192f]">
                  One loan,{' '}
                  <span className="font-serif font-normal italic text-[#0052cc]">
                    endless possibilities
                  </span>
                </h2>
              </div>

              {/* Interactive Visual Pill Tabs */}
              <div className="flex flex-wrap gap-2">
                {visualGoals.map((goal) => {
                  const Icon = goal.icon;
                  const active = goal.id === selectedGoal;
                  return (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => setSelectedGoal(goal.id)}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition ${
                        active
                          ? 'bg-[#0052cc] text-white shadow-md shadow-blue-900/15'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{goal.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Large Cinema Photo Stage for Selected Goal + 4 Thumbnail Cards */}
            <ScrollReveal>
              <div className="relative overflow-hidden rounded-[32px] bg-[#0a192f] min-h-[380px] sm:min-h-[430px] shadow-xl">
                <img
                  src={activeGoal.image}
                  alt={activeGoal.label}
                  className="absolute inset-0 h-full w-full object-cover opacity-75 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07172d] via-[#0a192f]/50 to-transparent" />

                <div className="relative z-10 flex h-full min-h-[380px] sm:min-h-[430px] flex-col justify-between p-6 sm:p-10 text-white">
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="rounded-full bg-[#8ec843] px-3.5 py-1 text-xs font-extrabold text-[#0a192f]">
                      {activeGoal.tag}
                    </span>
                    <div className="flex gap-2">
                      <span className="rounded-xl bg-black/45 px-3.5 py-1.5 text-xs font-bold backdrop-blur-md border border-white/15">
                        Limit: {activeGoal.limit}
                      </span>
                      <span className="rounded-xl bg-black/45 px-3.5 py-1.5 text-xs font-bold backdrop-blur-md border border-white/15">
                        APR: {activeGoal.rate}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Visual Overlay Bar */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
                    <div className="lg:col-span-7">
                      <h3 className="text-3xl sm:text-4xl font-bold tracking-tight">
                        {activeGoal.label}
                      </h3>
                      <div className="mt-4 flex flex-wrap gap-2.5">
                        {activeGoal.bullets.map((b) => (
                          <span
                            key={b}
                            className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold backdrop-blur-md border border-white/15"
                          >
                            <Check className="h-3.5 w-3.5 text-[#8ec843]" /> {b}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-5 flex lg:justify-end">
                      <a
                        href="/apply"
                        className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-extrabold text-[#0a192f] shadow-lg transition hover:bg-blue-50"
                      >
                        Apply for {activeGoal.label} <ArrowRight className="h-4 w-4 text-[#0052cc]" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* 4-Card Visual Photo Strip Below */}
            <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {visualGoals.map((g) => {
                const Icon = g.icon;
                const isSelected = g.id === selectedGoal;
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setSelectedGoal(g.id)}
                    className={`group relative h-36 overflow-hidden rounded-2xl text-left transition-all ${
                      isSelected ? 'ring-4 ring-[#0052cc]' : 'opacity-85 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={g.image}
                      alt={g.label}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent" />
                    <div className="relative z-10 flex h-full flex-col justify-between p-4 text-white">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 backdrop-blur-md">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-bold leading-tight">{g.label}</p>
                        <p className="text-[11px] text-sky-300 font-semibold">{g.limit}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================== 3. VISUAL APR COMPARISON GRAPHIC (CARD VS PERSONAL LOAN) ==================== */}
        <section className="py-16 lg:py-20 bg-[#f4f8ff] border-y border-blue-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="rounded-[30px] bg-white border border-blue-100 p-6 sm:p-10 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-5 space-y-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0052cc]">
                      <TrendingDown className="h-3.5 w-3.5" /> Visual Interest Comparison
                    </span>
                    <h2 className="text-3xl font-bold tracking-tight text-[#0a192f]">
                      Cut interest cost by{' '}
                      <span className="font-serif font-normal italic text-[#0052cc]">
                        nearly 3x
                      </span>
                    </h2>
                    <p className="text-sm text-slate-500">
                      See how a structured personal loan compares against revolving credit card
                      interest.
                    </p>
                  </div>

                  {/* Graphical Horizontal Comparison Bars */}
                  <div className="lg:col-span-7 space-y-5">
                    <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200/80">
                      <div className="flex justify-between text-xs font-bold mb-2">
                        <span className="flex items-center gap-2 text-slate-600">
                          <CreditCard className="h-4 w-4 text-rose-500" /> Credit Card Rollover APR
                        </span>
                        <span className="text-rose-600 font-extrabold">36% – 42% p.a.</span>
                      </div>
                      <div className="h-4 w-full rounded-full bg-slate-200 overflow-hidden">
                        <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-amber-500 to-rose-500" />
                      </div>
                    </div>

                    <div className="rounded-2xl bg-blue-50/70 p-5 border-2 border-[#0052cc]">
                      <div className="flex justify-between text-xs font-bold mb-2">
                        <span className="flex items-center gap-2 text-[#0a192f]">
                          <ShieldCheck className="h-4 w-4 text-[#0052cc]" /> Personal Loan Fixed APR
                        </span>
                        <span className="text-[#558b2f] font-extrabold">From 10.50% p.a.*</span>
                      </div>
                      <div className="h-4 w-full rounded-full bg-blue-100 overflow-hidden">
                        <div className="h-full w-[28%] rounded-full bg-gradient-to-r from-[#0052cc] to-[#8ec843]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ==================== 4. VISUAL 4-STEP DIGITAL TIMELINE + PHOTO ==================== */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left 5 Cols: Lifestyle Portrait Card */}
              <div className="lg:col-span-5">
                <div className="relative overflow-hidden rounded-[30px] h-[420px] shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1000&q=85"
                    alt="Person completing quick digital loan verification on phone"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-white/15 p-5 text-white backdrop-blur-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-[#8ec843]">
                          Zero Branch Visits
                        </p>
                        <p className="mt-0.5 text-xl font-bold">100% Video &amp; e-KYC</p>
                      </div>
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#8ec843] text-[#0a192f]">
                        <Zap className="h-6 w-6" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 7 Cols: 2x2 Visual Icon Step Grid */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0052cc]">
                    How It Works
                  </span>
                  <h2 className="mt-1.5 text-3xl sm:text-4xl font-bold tracking-tight text-[#0a192f]">
                    4 steps to{' '}
                    <span className="font-serif font-normal italic text-[#0052cc]">
                      instant funds
                    </span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      step: '01',
                      title: 'Pick Amount & EMI',
                      tag: '30 Seconds',
                      icon: Calculator,
                    },
                    {
                      step: '02',
                      title: 'Compare 25+ Lenders',
                      tag: 'Soft Credit Check',
                      icon: Building2,
                    },
                    {
                      step: '03',
                      title: 'Upload Digital KYC',
                      tag: 'Paperless',
                      icon: ShieldCheck,
                    },
                    {
                      step: '04',
                      title: 'Receive Bank Credit',
                      tag: '24–48 Hours*',
                      icon: Wallet,
                    },
                  ].map((s) => {
                    const Icon = s.icon;
                    return (
                      <div
                        key={s.step}
                        className="rounded-2xl border border-slate-200 bg-[#fcfcfd] p-5 flex items-center gap-4 hover:border-blue-300 transition"
                      >
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#0052cc] relative">
                          <Icon className="h-6 w-6" />
                          <span className="absolute -top-2 -left-2 rounded-lg bg-[#0a192f] px-2 py-0.5 text-[10px] font-mono font-bold text-white">
                            {s.step}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#558b2f]">
                            {s.tag}
                          </span>
                          <h3 className="text-base font-bold text-[#0a192f]">{s.title}</h3>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 5. VISUAL ELIGIBILITY & CHECKLIST MATRIX ==================== */}
        <section className="py-16 lg:py-24 bg-[#0a192f] text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#8ec843]">
                  Quick Qualification Check
                </span>
                <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
                  Are you{' '}
                  <span className="font-serif font-normal italic text-sky-300">eligible?</span>
                </h2>
              </div>

              <div className="inline-flex rounded-xl bg-white/10 p-1 w-fit backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => setApplicantType('salaried')}
                  className={`rounded-lg px-5 py-2.5 text-xs font-bold transition ${
                    applicantType === 'salaried'
                      ? 'bg-[#8ec843] text-[#0a192f]'
                      : 'text-sky-100 hover:text-white'
                  }`}
                >
                  Salaried
                </button>
                <button
                  type="button"
                  onClick={() => setApplicantType('self-employed')}
                  className={`rounded-lg px-5 py-2.5 text-xs font-bold transition ${
                    applicantType === 'self-employed'
                      ? 'bg-[#8ec843] text-[#0a192f]'
                      : 'text-sky-100 hover:text-white'
                  }`}
                >
                  Self-Employed
                </button>
              </div>
            </div>

            {/* 4 Visual Metric Tiles */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {(applicantType === 'salaried'
                ? [
                    { label: 'Age', value: '21 – 60 Yrs', icon: Clock },
                    { label: 'Min Income', value: '₹20,000 / mo', icon: IndianRupee },
                    { label: 'Experience', value: '1+ Year', icon: BadgeCheck },
                    { label: 'Documents', value: 'PAN + 3 Mo Payslip', icon: ShieldCheck },
                  ]
                : [
                    { label: 'Age', value: '23 – 65 Yrs', icon: Clock },
                    { label: 'Annual ITR', value: '₹3.5 Lakh+', icon: IndianRupee },
                    { label: 'Business Vintage', value: '2+ Years', icon: Building2 },
                    { label: 'Documents', value: 'PAN + 2 Yr ITR', icon: ShieldCheck },
                  ]
              ).map((box) => {
                const Icon = box.icon;
                return (
                  <div
                    key={box.label}
                    className="rounded-2xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-md"
                  >
                    <Icon className="h-6 w-6 text-[#8ec843] mb-4" />
                    <p className="text-xs text-sky-200">{box.label}</p>
                    <p className="mt-1 text-xl sm:text-2xl font-extrabold">{box.value}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================== 6. VISUAL BORROWER PORTRAIT CARDS ==================== */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#558b2f]">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span>4.9/5 Borrower Rating</span>
                </div>
                <h2 className="mt-1.5 text-3xl sm:text-4xl font-bold tracking-tight text-[#0a192f]">
                  Funded across{' '}
                  <span className="font-serif font-normal italic text-[#0052cc]">India</span>
                </h2>
              </div>
              <a
                href="/apply"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0052cc] hover:underline"
              >
                Check your eligibility <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {visualReviews.map((r) => (
                <article
                  key={r.name}
                  className="group relative h-[360px] overflow-hidden rounded-[26px] shadow-md"
                >
                  <img
                    src={r.photo}
                    alt={r.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07172d] via-[#0a192f]/55 to-transparent" />

                  <div className="relative z-10 flex h-full flex-col justify-between p-6 text-white">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-[#8ec843] px-3 py-1 text-[11px] font-extrabold text-[#0a192f]">
                        {r.amount} · {r.purpose}
                      </span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium leading-relaxed text-white/95">
                        &ldquo;{r.quote}&rdquo;
                      </p>
                      <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold">{r.name}</p>
                          <p className="text-xs text-sky-200">{r.city}</p>
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

        {/* ==================== 7. COMPACT FAQs & FINAL CTA ==================== */}
        <section className="py-16 lg:py-20 bg-[#f8f9fc] border-t border-slate-200/80">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-[#0a192f] mb-8">
              Quick FAQs
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
                  Ready to check your{' '}
                  <span className="font-serif font-normal italic text-[#8ec843]">
                    personal loan offer?
                  </span>
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-sky-100">
                  Zero collateral · 25+ Banks &amp; NBFCs · Fast digital disbursal*
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
                  Contact
                </a>
              </div>
            </div>

            <p className="mt-5 text-[11px] text-slate-400 leading-relaxed">
              *Indicative rates (from 10.50% p.a.), limits (up to ₹40 Lakh), and 24–48 hour
              disbursal timelines are subject to lender credit &amp; KYC verification.
            </p>
          </div>
        </section>
      </div>
    </InteriorPage>
  );
}