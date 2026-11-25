import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building2,
  Calculator,
  CalendarCheck2,
  CheckCircle2,
  ChevronDown,
  Clock,
  CreditCard,
  FileCheck2,
  FileText,
  Gauge,
  GraduationCap,
  HeartHandshake,
  HelpCircle,
  IndianRupee,
  Info,
  Layers,
  Lock,
  Percent,
  PhoneCall,
  PieChart,
  Receipt,
  Scale,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingDown,
  UserCheck,
  Wallet,
  Zap,
} from 'lucide-react';
import { InteriorPage } from '../components/InteriorPage';

// --- Scroll Reveal Observer with Directional Motion ---
const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'scale';
  className?: string;
}> = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const hiddenTransform = {
    up: 'opacity-0 translate-y-9',
    left: 'opacity-0 -translate-x-8',
    right: 'opacity-0 translate-x-8',
    scale: 'opacity-0 scale-95',
  }[direction];

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out transform ${
        visible ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : hiddenTransform
      } ${className}`}
    >
      {children}
    </div>
  );
};

// --- Continuous Scroll Parallax Wrapper ---
const ScrollParallax: React.FC<{
  children: React.ReactNode;
  speed?: number;
  className?: string;
}> = ({ children, speed = -36, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const updatePosition = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportH = window.innerHeight || 1;
      const progress = (viewportH - rect.top) / (viewportH + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));
      setOffsetY((clamped - 0.5) * speed * 2);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updatePosition);
    };

    updatePosition();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [speed]);

  return (
    <div ref={containerRef} className={className}>
      <div
        style={{ transform: `translate3d(0, ${offsetY.toFixed(1)}px, 0)` }}
        className="transition-transform duration-150 ease-out will-change-transform"
      >
        {children}
      </div>
    </div>
  );
};

// --- Interactive 3D / 4D Parallax Floating Credit & Liquidity Sculpture ---
const Interactive3DCreditSculpture: React.FC<{
  amount: number;
  emi: number;
  tenure: number;
}> = ({ amount, emi, tenure }) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      rx: (0.5 - y) * 18,
      ry: (x - 0.5) * 20,
      gx: x * 100,
      gy: y * 100,
    });
  };

  const resetTilt = () => setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 });

  const formatINR = (val: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(Math.round(val));

  return (
    <div
      ref={stageRef}
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      className="relative w-full h-[460px] sm:h-[520px] rounded-[34px] bg-gradient-to-br from-[#eef4ff] via-[#f8faff] to-[#ecfdf5] border border-blue-200/70 shadow-[0_30px_80px_-35px_rgba(10,25,47,0.22)] overflow-hidden select-none cursor-grab active:cursor-grabbing flex items-center justify-center p-6"
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(380px circle at ${tilt.gx}% ${tilt.gy}%, rgba(0, 82, 204, 0.16), rgba(142, 200, 67, 0.12) 45%, transparent 75%)`,
        }}
      />

      <div
        className="pointer-events-none absolute -top-12 -right-12 h-52 w-52 rounded-full bg-gradient-to-br from-[#0052cc]/25 to-cyan-300/25 blur-2xl transition-transform duration-300"
        style={{ transform: `translate(${tilt.ry * -1.1}px, ${tilt.rx * 1.1}px)` }}
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-12 h-56 w-56 rounded-full bg-gradient-to-tr from-[#8ec843]/30 to-emerald-200/30 blur-2xl transition-transform duration-300"
        style={{ transform: `translate(${tilt.ry * 1.2}px, ${tilt.rx * -1.2}px)` }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            'radial-gradient(#93c5fd 1px, transparent 1px), radial-gradient(#cbd5e1 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          backgroundPosition: '0 0, 13px 13px',
        }}
      />

      <div
        className="relative z-10 w-full max-w-[360px] transition-transform duration-200 ease-out"
        style={{
          transform: `perspective(1100px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className="absolute -top-6 -right-4 w-64 h-40 rounded-3xl bg-gradient-to-br from-[#0052cc] to-[#0284c7] p-5 text-white shadow-xl opacity-90"
          style={{ transform: 'translateZ(-28px) rotate(6deg)' }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-sky-200">
              Instant Disbursal Pass
            </span>
            <Zap className="h-4 w-4 text-[#8ec843]" />
          </div>
          <p className="mt-6 font-mono text-xs tracking-widest text-sky-100">
            •••• •••• 24HR CREDIT
          </p>
        </div>

        <div
          className="relative rounded-[28px] bg-white/95 backdrop-blur-xl border border-white p-6 sm:p-7 shadow-[0_25px_50px_-15px_rgba(10,25,47,0.22)]"
          style={{ transform: 'translateZ(24px)' }}
        >
          <div className="flex items-center justify-between pb-5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=85"
                  alt="Verified applicant portrait"
                  className="h-12 w-12 rounded-2xl object-cover ring-2 ring-blue-100"
                />
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#8ec843] ring-2 ring-white">
                  <BadgeCheck className="h-3 w-3 text-[#0a192f]" />
                </span>
              </div>
              <div>
                <p className="text-xs font-bold text-[#0a192f]">Pre-Qualified Limit</p>
                <p className="text-[11px] font-medium text-emerald-600">Zero Collateral Required</p>
              </div>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold text-[#0052cc]">
              {tenure} Mo
            </span>
          </div>

          <div className="my-5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Selected Credit Line
            </p>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0a192f]">
                {formatINR(amount)}
              </span>
              <span className="text-xs font-bold text-[#558b2f] bg-[#f4faef] px-2.5 py-1 rounded-lg">
                10.50% p.a.*
              </span>
            </div>
          </div>

          <div className="rounded-2xl bg-[#0a192f] p-4 text-white flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-sky-300 font-semibold">
                Estimated Monthly EMI
              </p>
              <p className="text-xl font-extrabold mt-0.5">
                {formatINR(emi)}
                <span className="text-xs font-normal text-slate-300">/mo</span>
              </p>
            </div>
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#8ec843] to-emerald-400 text-[#0a192f] flex items-center justify-center shadow-lg">
              <IndianRupee className="h-5 w-5 stroke-[2.5]" />
            </div>
          </div>
        </div>

        <div
          className="absolute -bottom-7 -left-5 flex items-center gap-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-emerald-200 px-4 py-3 shadow-xl"
          style={{ transform: 'translateZ(52px)' }}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 to-amber-500 text-[#0a192f] font-extrabold shadow-inner">
            ₹
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              CIBIL Impact
            </p>
            <p className="text-xs font-extrabold text-[#0a192f]">Soft Check Only</p>
          </div>
        </div>

        <div
          className="absolute -top-5 -left-4 flex items-center gap-2 rounded-full bg-[#0a192f] text-white px-3.5 py-2 shadow-xl border border-white/15"
          style={{ transform: 'translateZ(46px)' }}
        >
          <ShieldCheck className="h-4 w-4 text-[#8ec843]" />
          <span className="text-[11px] font-bold">100% Paperless e-KYC</span>
        </div>
      </div>
    </div>
  );
};

export default function PersonalLoansPage() {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Interactive EMI & Credit Planner State (Preserved)
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [tenureMonths, setTenureMonths] = useState<number>(36);
  const [interestRate, setInterestRate] = useState<number>(10.75);

  // Interactive Real-Life Moment Selector (Preserved)
  const [activeMoment, setActiveMoment] = useState<string>('lifestyle');

  // Salaried vs Self-Employed Switcher (Preserved)
  const [profileTab, setProfileTab] = useState<'salaried' | 'self'>('salaried');

  // --- NEW ADDON STATES FOR SECTIONS 6–10 ---
  const [affordMode, setAffordMode] = useState<'balanced' | 'fastPayoff' | 'lowEmi'>('balanced');
  const [extraYearlyPrepay, setExtraYearlyPrepay] = useState<number>(50000);
  const [processingFeePct, setProcessingFeePct] = useState<number>(1.25);
  const [cibilScore, setCibilScore] = useState<number>(755);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(65000);
  const [lenderFilter, setLenderFilter] = useState<'all' | 'banks' | 'nbfcs'>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [callbackPhone, setCallbackPhone] = useState<string>('');
  const [callbackSubmitted, setCallbackSubmitted] = useState<boolean>(false);

  useEffect(() => {
    let raf = 0;
    const handleScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const maxScroll = doc.scrollHeight - doc.clientHeight;
        const pct = maxScroll > 0 ? Math.min(100, Math.max(0, (window.scrollY / maxScroll) * 100)) : 0;
        setScrollProgress(pct);
      });
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const applyStrategyPreset = (mode: 'balanced' | 'fastPayoff' | 'lowEmi') => {
    setAffordMode(mode);
    if (mode === 'fastPayoff') {
      setTenureMonths(24);
    } else if (mode === 'lowEmi') {
      setTenureMonths(60);
    } else {
      setTenureMonths(36);
    }
  };

  // EMI Calculation
  const r = interestRate / 12 / 100;
  const emi =
    r === 0
      ? loanAmount / tenureMonths
      : (loanAmount * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1);
  const totalPayable = emi * tenureMonths;
  const totalInterest = totalPayable - loanAmount;

  // --- NEW DERIVED CALCULATIONS FOR REDESIGNED SECTIONS ---
  // 1. Year-by-year Amortization Schedule
  const yearlySchedule = useMemo(() => {
    let balance = loanAmount;
    const rows: {
      year: number;
      principalPaid: number;
      interestPaid: number;
      closingBalance: number;
    }[] = [];

    const totalYears = Math.ceil(tenureMonths / 12);
    for (let yr = 1; yr <= totalYears; yr++) {
      let yrPrincipal = 0;
      let yrInterest = 0;
      const monthsInYear = yr === totalYears && tenureMonths % 12 !== 0 ? tenureMonths % 12 : 12;

      for (let m = 0; m < monthsInYear; m++) {
        if (balance <= 0) break;
        const interestForMonth = balance * r;
        const principalForMonth = Math.min(balance, emi - interestForMonth);
        yrInterest += interestForMonth;
        yrPrincipal += principalForMonth;
        balance = Math.max(0, balance - principalForMonth);
      }

      rows.push({
        year: yr,
        principalPaid: yrPrincipal,
        interestPaid: yrInterest,
        closingBalance: balance,
      });
    }
    return rows;
  }, [loanAmount, tenureMonths, r, emi]);

  // 2. Prepayment Impact Simulator
  const prepaySimulation = useMemo(() => {
    let balance = loanAmount;
    let monthsTaken = 0;
    let interestWithPrepay = 0;

    while (balance > 1 && monthsTaken < 360) {
      monthsTaken++;
      const interestForMonth = balance * r;
      const principalForMonth = Math.min(balance, emi - interestForMonth);
      interestWithPrepay += interestForMonth;
      balance = Math.max(0, balance - principalForMonth);

      if (monthsTaken % 12 === 0 && balance > 0 && extraYearlyPrepay > 0) {
        balance = Math.max(0, balance - extraYearlyPrepay);
      }
    }

    const monthsSaved = Math.max(0, tenureMonths - monthsTaken);
    const interestSaved = Math.max(0, totalInterest - interestWithPrepay);
    return { monthsTaken, monthsSaved, interestSaved };
  }, [loanAmount, tenureMonths, r, emi, extraYearlyPrepay, totalInterest]);

  // 3. All-In Fee & Net Disbursal Breakdown
  const processingFeeAmount = (loanAmount * processingFeePct) / 100;
  const gstOnFee = processingFeeAmount * 0.18;
  const stampDuty = Math.min(2500, Math.max(300, Math.round(loanAmount * 0.001)));
  const totalUpfrontDeductions = processingFeeAmount + gstOnFee + stampDuty;
  const netDisbursedAmount = Math.max(0, loanAmount - totalUpfrontDeductions);

  // 4. Live Approval Readiness Score
  const foirRatio = monthlyIncome > 0 ? Math.min(100, Math.round((emi / monthlyIncome) * 100)) : 50;
  const readinessScore = useMemo(() => {
    let score = 50;
    if (cibilScore >= 780) score += 30;
    else if (cibilScore >= 730) score += 22;
    else if (cibilScore >= 700) score += 14;
    else score += 4;

    if (foirRatio <= 30) score += 20;
    else if (foirRatio <= 45) score += 12;
    else if (foirRatio <= 55) score += 4;
    else score -= 10;

    return Math.max(25, Math.min(98, score));
  }, [cibilScore, foirRatio]);

  const formatINR = (val: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(Math.round(val));

  const lifeMoments = [
    {
      id: 'lifestyle',
      title: 'Home Upgrade & Tech',
      badge: 'Zero Downpayment',
      rate: '10.65% p.a.*',
      range: '₹75,000 – ₹15 Lakh',
      icon: Sparkles,
      photo:
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=85',
      caption: 'Rohan & Sneha upgraded their studio apartment without breaking their mutual fund SIPs.',
      perks: ['No merchant lock-in', 'Direct account credit', 'Flexible 12–60 month EMIs'],
    },
    {
      id: 'debt',
      title: 'Smart Debt Consolidation',
      badge: 'Save up to 60% APR*',
      rate: '10.75% p.a.*',
      range: '₹1.5 Lakh – ₹25 Lakh',
      icon: Layers,
      photo:
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=85',
      caption: 'Replace multiple 38% APR credit card balances with one predictable fixed monthly payment.',
      perks: ['Single due date', 'Boost credit utilization score', 'Zero foreclosure after 12 EMIs*'],
    },
    {
      id: 'wedding',
      title: 'Family Celebrations',
      badge: 'Keep FDs Untouched',
      rate: '10.50% p.a.*',
      range: '₹2 Lakh – ₹40 Lakh',
      icon: HeartHandshake,
      photo:
        'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=85',
      caption: 'Fund venue, travel, and family milestones smoothly with up to 7-year repayment comfort.',
      perks: ['Up to 84-month tenure', 'Co-applicant option', '24-hour digital sanction*'],
    },
    {
      id: 'upskill',
      title: 'Global Travel & Courses',
      badge: '100% Paperless',
      rate: '10.85% p.a.*',
      range: '₹50,000 – ₹18 Lakh',
      icon: GraduationCap,
      photo:
        'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85',
      caption: 'Invest in executive certifications, solo travel, or relocation deposits without pledging assets.',
      perks: ['Instant video KYC', 'No guarantor required', 'Part-prepay anytime*'],
    },
  ];

  const selectedMoment = lifeMoments.find((m) => m.id === activeMoment) || lifeMoments[0];

  const lenderMatrix = [
    {
      category: 'banks' as const,
      segment: 'Tier-1 Private Banks',
      rateRange: '10.50% – 13.75% p.a.',
      maxTicket: 'Up to ₹40 Lakh',
      turnaround: '24 – 48 Hours',
      prepayRule: 'Zero after 12 EMIs (own funds)*',
      idealFor: 'Salaried MNC/Corporate employees with 750+ CIBIL',
    },
    {
      category: 'banks' as const,
      segment: 'Public Sector & Salary-Account Banks',
      rateRange: '10.65% – 12.90% p.a.',
      maxTicket: 'Up to ₹25 Lakh',
      turnaround: '2 – 4 Working Days',
      prepayRule: 'Nil foreclosure charges on select schemes',
      idealFor: 'Existing salary account holders & government staff',
    },
    {
      category: 'nbfcs' as const,
      segment: 'Digital-First Prime NBFCs',
      rateRange: '11.99% – 16.50% p.a.',
      maxTicket: 'Up to ₹20 Lakh',
      turnaround: 'Under 6 Hours*',
      prepayRule: 'Part-payment allowed post 6 EMIs',
      idealFor: 'Fast urgent disbursals & modern app-based servicing',
    },
    {
      category: 'nbfcs' as const,
      segment: 'Self-Employed & MSME NBFCs',
      rateRange: '13.25% – 18.00% p.a.',
      maxTicket: 'Up to ₹30 Lakh',
      turnaround: '24 – 72 Hours',
      prepayRule: 'Flexible step-up / drop-line overdraft',
      idealFor: 'Consultants, doctors, CAs & business owners',
    },
  ];

  const visibleLenders = lenderMatrix.filter((item) =>
    lenderFilter === 'all' ? true : item.category === lenderFilter
  );

  const borrowerFaqs = [
    {
      q: 'Does checking my personal loan eligibility lower my CIBIL score?',
      a: 'No. Initial eligibility matching uses a soft credit bureau inquiry, which leaves zero footprint on your CIBIL or Experian score. A hard inquiry occurs only when you select a specific lender and submit your final loan application.',
    },
    {
      q: 'What is the RBI Key Fact Statement (KFS) and why should I check it?',
      a: 'Under RBI guidelines, every regulated bank and NBFC must share a standardized Key Fact Statement before loan execution. It clearly lists the Annual Percentage Rate (APR), total interest, processing fee, cooling-off window, and recovery agent details with zero hidden clauses.',
    },
    {
      q: 'Can I close my personal loan early or make part-prepayments?',
      a: 'Yes. Most partner lenders allow part-prepayment or full foreclosure after 6 to 12 paid EMIs. Several banks waive foreclosure fees completely if you close the loan using your own verified savings rather than a balance transfer.',
    },
    {
      q: 'How does a personal loan improve my credit mix and score?',
      a: 'Replacing high-utilization revolving credit card debt with a fixed-tenure installment loan reduces your credit utilization ratio below 30%—one of the fastest ways to strengthen your credit profile over 3 to 6 billing cycles.',
    },
  ];

  return (
    <InteriorPage>
      <div className="min-h-screen bg-[#fcfcfd] text-[#0a192f] font-sans antialiased selection:bg-[#0052cc] selection:text-white">
        <style>{`
          @keyframes floatSlow {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          .animate-float-slow {
            animation: floatSlow 5.5s ease-in-out infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-float-slow { animation: none !important; }
          }
        `}</style>

        {/* Top Scroll-Synced Reading & Progress Ribbon */}
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-200/50 pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-[#0052cc] via-sky-400 to-[#8ec843] transition-[width] duration-75"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* ==================== 1. EDITORIAL DAYLIGHT HERO + 3D/4D INTERACTIVE CREDIT VAULT (AS IS) ==================== */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#f4f8ff] via-[#fcfcfd] to-white pt-10 pb-20 sm:pt-16 sm:pb-28 border-b border-slate-200/70">
          <ScrollParallax speed={-45} className="pointer-events-none absolute -top-28 left-1/4">
            <div className="h-96 w-96 rounded-full bg-blue-100/75 blur-3xl" />
          </ScrollParallax>
          <ScrollParallax speed={35} className="pointer-events-none absolute top-20 right-0">
            <div className="h-80 w-80 rounded-full bg-lime-100/65 blur-3xl" />
          </ScrollParallax>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <Reveal direction="left" className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2.5 rounded-full border border-blue-200/80 bg-white px-3.5 py-1.5 shadow-sm">
                  <span className="flex h-2 w-2 rounded-full bg-[#8ec843]" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0052cc]">
                    Personal Loans · ₹50K to ₹40 Lakh
                  </span>
                </div>

                <h1 className="text-[2.6rem] sm:text-[3.4rem] lg:text-[4rem] font-bold leading-[1.06] tracking-tight text-[#0a192f]">
                  Flexible funds for{' '}
                  <span className="font-serif font-normal italic text-[#0052cc]">
                    real-life moments
                  </span>
                  —without touching your savings.
                </h1>

                <p className="max-w-xl text-[15px] sm:text-[16px] leading-relaxed text-slate-600">
                  Compare collateral-free personal loan offers from 25+ Indian banks and NBFCs in
                  minutes. Transparent fixed EMIs, 100% digital e-KYC, and fast bank disbursal.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
                  <a
                    href="/apply"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0052cc] hover:bg-[#003d8f] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-blue-900/15 transition"
                  >
                    <span>Check Instant Offer</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#emi-studio"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 px-6 py-4 text-sm font-bold text-[#0a192f] shadow-sm transition"
                  >
                    <Calculator className="h-4 w-4 text-[#0052cc]" />
                    <span>Customize EMI</span>
                  </a>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <div className="flex -space-x-3">
                    {[
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
                      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
                      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
                    ].map((src, idx) => (
                      <img
                        key={idx}
                        src={src}
                        alt="Happy borrower"
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                      />
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="ml-1 text-xs font-extrabold text-[#0a192f]">4.9/5</span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Trusted by 45,000+ salaried &amp; self-employed Indians
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal direction="right" delay={100} className="lg:col-span-6">
                <ScrollParallax speed={-24}>
                  <Interactive3DCreditSculpture
                    amount={loanAmount}
                    emi={emi}
                    tenure={tenureMonths}
                  />
                </ScrollParallax>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ==================== 2. REAL-LIFE PHOTOGRAPHIC STORY STAGE (AS IS) ==================== */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#0052cc]">
                    Zero End-Use Restrictions
                  </span>
                  <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#0a192f]">
                    Designed around{' '}
                    <span className="font-serif font-normal italic text-[#0052cc]">
                      how you actually live
                    </span>
                  </h2>
                </div>

                <div className="flex flex-wrap gap-2">
                  {lifeMoments.map((item) => {
                    const Icon = item.icon;
                    const active = item.id === activeMoment;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveMoment(item.id)}
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold transition ${
                          active
                            ? 'bg-[#0a192f] text-white shadow-md'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5 text-[#8ec843]" />
                        <span>{item.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            <Reveal delay={80} direction="scale">
              <div className="grid grid-cols-1 lg:grid-cols-12 rounded-[32px] overflow-hidden border border-slate-200/90 bg-[#f8fafc] shadow-xl shadow-slate-900/5">
                <div className="relative min-h-[340px] sm:min-h-[420px] lg:col-span-7 overflow-hidden">
                  <img
                    src={selectedMoment.photo}
                    alt={selectedMoment.title}
                    className="absolute inset-0 h-full w-full object-cover transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07172d]/85 via-[#07172d]/20 to-transparent" />

                  <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-9 text-white">
                    <span className="w-fit rounded-full bg-[#8ec843] px-3.5 py-1 text-xs font-extrabold text-[#0a192f]">
                      {selectedMoment.badge}
                    </span>

                    <div className="max-w-lg rounded-2xl border border-white/20 bg-white/15 p-4 sm:p-5 backdrop-blur-md">
                      <p className="text-xs sm:text-sm font-medium leading-relaxed text-white">
                        {selectedMoment.caption}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between bg-white">
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                      <span>PERSONAL CREDIT LINE</span>
                      <span className="text-[#558b2f]">{selectedMoment.rate}</span>
                    </div>
                    <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-[#0a192f]">
                      {selectedMoment.title}
                    </h3>

                    <div className="mt-5 rounded-2xl bg-[#f4f8ff] border border-blue-100 p-4">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#0052cc]">
                        Typical Borrowing Band
                      </p>
                      <p className="mt-1 text-2xl font-extrabold text-[#0a192f]">
                        {selectedMoment.range}
                      </p>
                    </div>

                    <ul className="mt-6 space-y-3">
                      {selectedMoment.perks.map((perk) => (
                        <li
                          key={perk}
                          className="flex items-center gap-2.5 text-sm font-medium text-slate-700"
                        >
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#558b2f]" />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-3">
                    <a
                      href="/apply"
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0052cc] hover:bg-[#003d8f] px-5 py-3.5 text-sm font-bold text-white transition"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3.5 text-sm font-bold text-[#0a192f] hover:bg-slate-50 transition"
                    >
                      Ask Advisor
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ==================== 3. INTERACTIVE EMI & CREDIT CARD SAVINGS STUDIO (AS IS) ==================== */}
        <section
          id="emi-studio"
          className="py-20 lg:py-28 bg-[#f4f8ff] border-y border-blue-100/80"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="max-w-2xl mb-12">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#0052cc]">
                  Live Repayment Studio
                </span>
                <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#0a192f]">
                  Slide to preview your{' '}
                  <span className="font-serif font-normal italic text-[#0052cc]">
                    exact monthly EMI
                  </span>
                </h2>
                <p className="mt-3 text-sm sm:text-base text-slate-600">
                  Adjust the sliders below—your numbers also update the 3D card preview in real
                  time.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <Reveal direction="left" className="lg:col-span-7 flex">
                <div className="w-full rounded-[28px] bg-white border border-blue-100 p-6 sm:p-9 shadow-sm flex flex-col justify-between space-y-7">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="pl-amount" className="text-sm font-bold text-slate-700">
                        Desired Loan Amount
                      </label>
                      <span className="rounded-xl bg-blue-50 px-3.5 py-1.5 text-base font-extrabold text-[#0052cc]">
                        {formatINR(loanAmount)}
                      </span>
                    </div>
                    <input
                      id="pl-amount"
                      type="range"
                      min={50000}
                      max={4000000}
                      step={25000}
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full h-2.5 rounded-lg bg-slate-200 accent-[#0052cc] cursor-pointer"
                    />
                    <div className="mt-1.5 flex justify-between text-[11px] font-medium text-slate-400">
                      <span>₹50,000</span>
                      <span>₹20 Lakh</span>
                      <span>₹40 Lakh</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="pl-tenure" className="text-sm font-bold text-slate-700">
                        Repayment Tenure
                      </label>
                      <span className="rounded-xl bg-slate-100 px-3.5 py-1.5 text-base font-extrabold text-[#0a192f]">
                        {tenureMonths} Months ({(tenureMonths / 12).toFixed(1)} Yrs)
                      </span>
                    </div>
                    <input
                      id="pl-tenure"
                      type="range"
                      min={12}
                      max={84}
                      step={6}
                      value={tenureMonths}
                      onChange={(e) => setTenureMonths(Number(e.target.value))}
                      className="w-full h-2.5 rounded-lg bg-slate-200 accent-[#0052cc] cursor-pointer"
                    />
                    <div className="mt-1.5 flex justify-between text-[11px] font-medium text-slate-400">
                      <span>12 Months</span>
                      <span>48 Months</span>
                      <span>84 Months</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="pl-rate" className="text-sm font-bold text-slate-700">
                        Indicative Interest Rate (p.a.)
                      </label>
                      <span className="rounded-xl bg-[#f4faef] px-3.5 py-1.5 text-base font-extrabold text-[#558b2f]">
                        {interestRate.toFixed(2)}%
                      </span>
                    </div>
                    <input
                      id="pl-rate"
                      type="range"
                      min={10.5}
                      max={20}
                      step={0.25}
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full h-2.5 rounded-lg bg-slate-200 accent-[#558b2f] cursor-pointer"
                    />
                    <div className="mt-1.5 flex justify-between text-[11px] font-medium text-slate-400">
                      <span>10.50% (Prime)</span>
                      <span>15.00%</span>
                      <span>20.00%</span>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal direction="right" delay={100} className="lg:col-span-5 flex">
                <div className="w-full rounded-[28px] bg-[#0a192f] p-7 sm:p-9 text-white flex flex-col justify-between shadow-xl">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold text-[#8ec843]">
                      <TrendingDown className="h-3.5 w-3.5" /> Fixed Monthly Schedule
                    </span>

                    <div className="mt-6">
                      <p className="text-xs uppercase tracking-wider text-sky-300">Monthly EMI</p>
                      <p className="mt-1 text-4xl sm:text-5xl font-extrabold tracking-tight">
                        {formatINR(emi)}
                      </p>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl bg-white/[0.07] p-4 border border-white/10">
                      <div>
                        <p className="text-[11px] text-slate-300">Principal Amount</p>
                        <p className="mt-0.5 text-base font-bold text-white">
                          {formatINR(loanAmount)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] text-slate-300">Total Interest</p>
                        <p className="mt-0.5 text-base font-bold text-[#8ec843]">
                          {formatINR(totalInterest)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3 pt-5 border-t border-white/10">
                      <p className="text-xs font-bold text-sky-200">
                        Why borrowers switch from Credit Card Rollovers:
                      </p>
                      <div>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-slate-300 flex items-center gap-1">
                            <CreditCard className="h-3.5 w-3.5 text-rose-400" /> Credit Card APR
                          </span>
                          <span className="font-bold text-rose-300">36% – 42% p.a.</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full w-[92%] rounded-full bg-rose-400" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-slate-300">Your Personal Loan APR</span>
                          <span className="font-bold text-[#8ec843]">{interestRate.toFixed(2)}% p.a.</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#8ec843] transition-all duration-300"
                            style={{ width: `${Math.min(60, Math.max(24, interestRate * 2.5))}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <a
                    href="/apply"
                    className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#8ec843] hover:opacity-95 px-6 py-4 text-sm font-extrabold text-[#0a192f] transition"
                  >
                    <span>Lock This EMI Plan</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ==================== 4. 4-STEP DIGITAL JOURNEY WITH REAL HUMAN PHOTOGRAPHY (AS IS) ==================== */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <Reveal direction="left" className="lg:col-span-5">
                <ScrollParallax speed={-20}>
                  <div className="relative rounded-[32px] overflow-hidden h-[440px] shadow-2xl shadow-blue-950/10">
                    <img
                      src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=85"
                      alt="Borrower completing mobile video KYC from cafe"
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-transparent to-transparent" />

                    <div className="animate-float-slow absolute bottom-6 left-6 right-6 rounded-2xl bg-white/95 backdrop-blur-md p-5 shadow-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#0052cc]">
                            100% Digital Flow
                          </span>
                          <p className="text-base font-extrabold text-[#0a192f] mt-0.5">
                            Sanctioned from your sofa
                          </p>
                        </div>
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0052cc] text-white">
                          <Lock className="h-5 w-5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollParallax>
              </Reveal>

              <div className="lg:col-span-7 space-y-6">
                <Reveal>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#0052cc]">
                    Frictionless Process
                  </span>
                  <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#0a192f]">
                    Four steps from{' '}
                    <span className="font-serif font-normal italic text-[#0052cc]">
                      eligibility to bank credit
                    </span>
                  </h2>
                </Reveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    {
                      num: '01',
                      title: 'Choose Amount & Tenure',
                      desc: 'Pick your exact requirement from ₹50K to ₹40L and preview fixed EMIs instantly.',
                      icon: Calculator,
                    },
                    {
                      num: '02',
                      title: 'Compare Matched Lenders',
                      desc: 'View tailored offers across 25+ banks & NBFCs via a soft credit pull.',
                      icon: Building2,
                    },
                    {
                      num: '03',
                      title: 'Complete e-KYC & e-Sign',
                      desc: 'Verify PAN, Aadhaar, and bank statements digitally—zero physical courier.',
                      icon: FileCheck2,
                    },
                    {
                      num: '04',
                      title: 'Direct Account Disbursal',
                      desc: 'Receive funds straight into your savings account within 24–48 hours*.',
                      icon: Wallet,
                    },
                  ].map((step, idx) => {
                    const Icon = step.icon;
                    return (
                      <Reveal key={step.num} delay={idx * 80}>
                        <div className="h-full rounded-2xl border border-slate-200/90 bg-[#fcfcfd] p-6 hover:border-blue-300 hover:bg-white hover:shadow-md transition">
                          <div className="flex items-center justify-between mb-4">
                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0052cc]">
                              <Icon className="h-5 w-5" />
                            </span>
                            <span className="font-mono text-xs font-extrabold text-slate-400">
                              STEP {step.num}
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-[#0a192f]">{step.title}</h3>
                          <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-500">
                            {step.desc}
                          </p>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 5. ELIGIBILITY & DOCUMENT CHECKLIST (SALARIED VS SELF-EMPLOYED) (AS IS) ==================== */}
        <section className="py-20 lg:py-24 bg-[#0a192f] text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#8ec843]">
                    Simple Qualification
                  </span>
                  <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
                    Check your{' '}
                    <span className="font-serif font-normal italic text-sky-300">
                      eligibility &amp; documents
                    </span>
                  </h2>
                </div>

                <div className="inline-flex rounded-2xl bg-white/10 p-1.5 w-fit">
                  <button
                    type="button"
                    onClick={() => setProfileTab('salaried')}
                    className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition ${
                      profileTab === 'salaried'
                        ? 'bg-[#8ec843] text-[#0a192f]'
                        : 'text-sky-100 hover:text-white'
                    }`}
                  >
                    <Briefcase className="h-3.5 w-3.5" /> Salaried Professionals
                  </button>
                  <button
                    type="button"
                    onClick={() => setProfileTab('self')}
                    className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition ${
                      profileTab === 'self'
                        ? 'bg-[#8ec843] text-[#0a192f]'
                        : 'text-sky-100 hover:text-white'
                    }`}
                  >
                    <UserCheck className="h-3.5 w-3.5" /> Self-Employed / Business
                  </button>
                </div>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 grid grid-cols-2 gap-4">
                {(profileTab === 'salaried'
                  ? [
                      { label: 'Age Bracket', val: '21 – 60 Years', icon: Clock },
                      { label: 'Min Net Salary', val: '₹20,000 / month', icon: IndianRupee },
                      { label: 'Work Continuity', val: '1+ Year Total', icon: Briefcase },
                      { label: 'Preferred CIBIL', val: '700+ Score', icon: Percent },
                    ]
                  : [
                      { label: 'Age Bracket', val: '23 – 65 Years', icon: Clock },
                      { label: 'Min Annual Income', val: '₹3.5 Lakh+ ITR', icon: IndianRupee },
                      { label: 'Business Vintage', val: '2+ Years Active', icon: Building2 },
                      { label: 'Preferred CIBIL', val: '700+ Score', icon: Percent },
                    ]
                ).map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <Reveal key={item.label} delay={idx * 70}>
                      <div className="h-full rounded-2xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-md">
                        <Icon className="h-6 w-6 text-[#8ec843] mb-4" />
                        <p className="text-xs text-sky-200">{item.label}</p>
                        <p className="mt-1 text-lg sm:text-xl font-extrabold">{item.val}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>

              <Reveal direction="right" delay={120} className="lg:col-span-5">
                <div className="h-full rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 to-white/[0.04] p-7">
                  <h3 className="text-lg font-bold text-white">
                    {profileTab === 'salaried'
                      ? 'Salaried Document Checklist'
                      : 'Self-Employed Document Checklist'}
                  </h3>
                  <p className="mt-1 text-xs text-sky-200">
                    100% digital upload—no physical photocopies needed
                  </p>

                  <ul className="mt-5 space-y-3">
                    {(profileTab === 'salaried'
                      ? [
                          'PAN Card & Aadhaar e-KYC verification',
                          'Last 3 months salary slips',
                          'Last 6 months primary salary bank statement',
                          'Form 16 (for higher loan amounts)',
                        ]
                      : [
                          'PAN Card & Aadhaar e-KYC verification',
                          'Last 2 years ITR with computation of income',
                          'GST registration / Shop & Establishment proof',
                          'Last 12 months operative bank statements',
                        ]
                    ).map((doc) => (
                      <li key={doc} className="flex items-start gap-2.5 text-sm text-slate-100">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#8ec843] mt-0.5" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ==================== 6. REDESIGNED: INTERACTIVE AMORTIZATION & YEARLY REPAYMENT SCHEDULE ==================== */}
        <section className="py-20 lg:py-28 bg-white border-b border-slate-200/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#0052cc]">
                    Amortization Intelligence
                  </span>
                  <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#0a192f]">
                    Watch your principal shrink{' '}
                    <span className="font-serif font-normal italic text-[#0052cc]">
                      year by year
                    </span>
                  </h2>
                </div>

                {/* Quick Strategy Switcher */}
                <div className="inline-flex flex-wrap rounded-2xl bg-[#f4f8ff] border border-blue-100 p-1.5">
                  {[
                    { id: 'fastPayoff', label: 'Fast Payoff (24m)' },
                    { id: 'balanced', label: 'Balanced (36m)' },
                    { id: 'lowEmi', label: 'Low EMI (60m)' },
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() =>
                        applyStrategyPreset(preset.id as 'balanced' | 'fastPayoff' | 'lowEmi')
                      }
                      className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                        affordMode === preset.id
                          ? 'bg-[#0052cc] text-white shadow-sm'
                          : 'text-slate-600 hover:text-[#0a192f]'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left: Visual Principal vs Interest Composition Card */}
              <Reveal direction="left" className="lg:col-span-5">
                <div className="rounded-[30px] border border-slate-200 bg-[#f8fafc] p-7 sm:p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0052cc]">
                      <PieChart className="h-4 w-4" /> Total Outflow Split
                    </span>
                    <span className="rounded-full bg-white border border-slate-200 px-3 py-1 text-xs font-bold text-[#0a192f]">
                      {tenureMonths} Months
                    </span>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Total Repayment (Principal + Interest)</p>
                    <p className="mt-1 text-3xl sm:text-4xl font-extrabold text-[#0a192f]">
                      {formatINR(totalPayable)}
                    </p>
                  </div>

                  {/* Stacked Visual Ratio Bar */}
                  <div className="space-y-2.5">
                    <div className="h-4 w-full rounded-full bg-slate-200 overflow-hidden flex">
                      <div
                        className="h-full bg-[#0052cc] transition-all duration-300"
                        style={{ width: `${(loanAmount / totalPayable) * 100}%` }}
                        title="Principal Share"
                      />
                      <div
                        className="h-full bg-[#8ec843] transition-all duration-300"
                        style={{ width: `${(totalInterest / totalPayable) * 100}%` }}
                        title="Interest Share"
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="flex items-center gap-1.5 text-[#0052cc]">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#0052cc]" />
                        Principal ({Math.round((loanAmount / totalPayable) * 100)}%)
                      </span>
                      <span className="flex items-center gap-1.5 text-[#558b2f]">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#8ec843]" />
                        Interest ({Math.round((totalInterest / totalPayable) * 100)}%)
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="rounded-2xl bg-white border border-slate-200/80 p-4">
                      <p className="text-[11px] font-semibold text-slate-400">Loan Principal</p>
                      <p className="mt-1 text-lg font-extrabold text-[#0a192f]">
                        {formatINR(loanAmount)}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white border border-slate-200/80 p-4">
                      <p className="text-[11px] font-semibold text-slate-400">Interest Cost</p>
                      <p className="mt-1 text-lg font-extrabold text-[#558b2f]">
                        {formatINR(totalInterest)}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Right: Year-by-Year Amortization Table */}
              <Reveal direction="right" delay={100} className="lg:col-span-7">
                <div className="rounded-[30px] border border-slate-200 bg-white overflow-hidden shadow-sm">
                  <div className="px-6 py-4 bg-[#f4f8ff] border-b border-blue-100 flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#0a192f]">
                      Annual Amortization Breakdown
                    </span>
                    <span className="text-xs font-semibold text-[#0052cc]">
                      EMI: {formatINR(emi)}/mo
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/60">
                          <th className="py-3.5 px-5">Year</th>
                          <th className="py-3.5 px-5">Principal Paid</th>
                          <th className="py-3.5 px-5">Interest Paid</th>
                          <th className="py-3.5 px-5 text-right">Closing Balance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                        {yearlySchedule.map((row) => (
                          <tr key={row.year} className="hover:bg-blue-50/40 transition">
                            <td className="py-3.5 px-5 font-extrabold text-[#0a192f]">
                              Year 0{row.year}
                            </td>
                            <td className="py-3.5 px-5 font-semibold text-[#0052cc]">
                              {formatINR(row.principalPaid)}
                            </td>
                            <td className="py-3.5 px-5 font-medium text-slate-600">
                              {formatINR(row.interestPaid)}
                            </td>
                            <td className="py-3.5 px-5 text-right font-extrabold text-[#0a192f]">
                              {formatINR(row.closingBalance)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ==================== 7. NEW ADDON: ALL-IN DISBURSAL & PREPAYMENT ACCELERATOR ==================== */}
        <section className="py-20 lg:py-24 bg-[#f4f8ff] border-b border-blue-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="max-w-2xl mb-12">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#0052cc]">
                  Zero Hidden Math
                </span>
                <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#0a192f]">
                  Net bank disbursal &amp;{' '}
                  <span className="font-serif font-normal italic text-[#0052cc]">
                    prepayment savings
                  </span>
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Card A: Net Bank Credit Breakdown */}
              <Reveal direction="left" className="lg:col-span-6 flex">
                <div className="w-full rounded-[30px] bg-white border border-blue-100 p-7 sm:p-9 shadow-sm flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-bold text-[#0052cc]">
                        <Receipt className="h-3.5 w-3.5" /> Upfront Fee Transparency
                      </span>
                      <span className="text-xs font-extrabold text-slate-500">
                        Fee: {processingFeePct.toFixed(2)}%
                      </span>
                    </div>

                    <div className="mb-5">
                      <div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5">
                        <label htmlFor="fee-slider">Adjust Lender Processing Fee (%)</label>
                        <span>{processingFeePct.toFixed(2)}% + GST</span>
                      </div>
                      <input
                        id="fee-slider"
                        type="range"
                        min={0.5}
                        max={2.5}
                        step={0.25}
                        value={processingFeePct}
                        onChange={(e) => setProcessingFeePct(Number(e.target.value))}
                        className="w-full h-2 rounded-lg bg-slate-200 accent-[#0052cc] cursor-pointer"
                      />
                    </div>

                    <div className="space-y-3 rounded-2xl bg-[#f8fafc] border border-slate-200/80 p-5 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Sanctioned Loan Amount</span>
                        <span className="font-bold text-[#0a192f]">{formatINR(loanAmount)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">
                          Less: Processing Fee ({processingFeePct.toFixed(2)}%)
                        </span>
                        <span className="font-semibold text-rose-600">
                          − {formatINR(processingFeeAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Less: 18% GST on Fee &amp; Stamp Duty</span>
                        <span className="font-semibold text-rose-600">
                          − {formatINR(gstOnFee + stampDuty)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-[#0a192f] p-5 text-white flex items-center justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-sky-300 font-bold">
                        Net Amount Credited to Bank
                      </p>
                      <p className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#8ec843]">
                        {formatINR(netDisbursedAmount)}
                      </p>
                    </div>
                    <Wallet className="h-8 w-8 text-sky-300 opacity-80" />
                  </div>
                </div>
              </Reveal>

              {/* Card B: Annual Bonus Prepayment Simulator */}
              <Reveal direction="right" delay={90} className="lg:col-span-6 flex">
                <div className="w-full rounded-[30px] bg-white border border-emerald-200/80 p-7 sm:p-9 shadow-sm flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center gap-2 rounded-full bg-[#f4faef] px-3.5 py-1 text-xs font-bold text-[#558b2f]">
                        <Sparkles className="h-3.5 w-3.5" /> Debt-Free Accelerator
                      </span>
                      <span className="text-xs font-extrabold text-[#0a192f]">
                        {formatINR(extraYearlyPrepay)}/yr
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#0a192f]">
                      What if you prepay a lump sum once every year?
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-500">
                      Slide your annual bonus prepayment to see how many EMIs and rupees you shave
                      off.
                    </p>

                    <div className="mt-5">
                      <input
                        type="range"
                        min={0}
                        max={250000}
                        step={10000}
                        value={extraYearlyPrepay}
                        onChange={(e) => setExtraYearlyPrepay(Number(e.target.value))}
                        className="w-full h-2.5 rounded-lg bg-slate-200 accent-[#558b2f] cursor-pointer"
                      />
                      <div className="mt-1.5 flex justify-between text-[11px] text-slate-400">
                        <span>₹0 (Regular EMI)</span>
                        <span>₹1.25 Lakh/yr</span>
                        <span>₹2.50 Lakh/yr</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 rounded-2xl bg-[#f4faef] border border-emerald-200 p-5">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#558b2f]">
                        Total Interest Saved
                      </p>
                      <p className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#0a192f]">
                        {formatINR(prepaySimulation.interestSaved)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#558b2f]">
                        Tenure Reduced By
                      </p>
                      <p className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#0052cc]">
                        {prepaySimulation.monthsSaved} Months
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ==================== 8. NEW ADDON: SOFT-PULL READINESS METER & LENDER COMPARISON TABLE ==================== */}
        <section className="py-20 lg:py-28 bg-white border-b border-slate-200/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#0052cc]">
                    Smart Lender Matching
                  </span>
                  <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#0a192f]">
                    Test your approval odds &amp;{' '}
                    <span className="font-serif font-normal italic text-[#0052cc]">
                      compare lender tracks
                    </span>
                  </h2>
                </div>

                {/* Filter Pills */}
                <div className="inline-flex rounded-2xl bg-slate-100 p-1.5 w-fit">
                  {[
                    { id: 'all', label: 'All Partners (25+)' },
                    { id: 'banks', label: 'Commercial Banks' },
                    { id: 'nbfcs', label: 'Agile NBFCs' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setLenderFilter(tab.id as 'all' | 'banks' | 'nbfcs')}
                      className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                        lenderFilter === tab.id
                          ? 'bg-[#0a192f] text-white shadow-sm'
                          : 'text-slate-600 hover:text-[#0a192f]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Interactive Approval Readiness Gauge Bar */}
            <Reveal delay={60}>
              <div className="mb-10 rounded-[28px] border border-blue-100 bg-gradient-to-r from-[#f4f8ff] via-white to-[#f4faef] p-6 sm:p-8 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-4 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-600">Your CIBIL Score</span>
                      <span className="text-[#0052cc] font-extrabold">{cibilScore}</span>
                    </div>
                    <input
                      type="range"
                      min={650}
                      max={850}
                      step={5}
                      value={cibilScore}
                      onChange={(e) => setCibilScore(Number(e.target.value))}
                      className="w-full h-2 rounded-lg bg-slate-200 accent-[#0052cc] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>650</span>
                      <span>750 (Prime)</span>
                      <span>850</span>
                    </div>
                  </div>

                  <div className="lg:col-span-4 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-600">Net Monthly Income</span>
                      <span className="text-[#0a192f] font-extrabold">
                        {formatINR(monthlyIncome)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={20000}
                      max={300000}
                      step={5000}
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                      className="w-full h-2 rounded-lg bg-slate-200 accent-[#558b2f] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>₹20K</span>
                      <span>₹1.5L</span>
                      <span>₹3.0L</span>
                    </div>
                  </div>

                  <div className="lg:col-span-4 rounded-2xl bg-[#0a192f] p-5 text-white flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-sky-300">
                        Approval Readiness · FOIR {foirRatio}%
                      </p>
                      <p className="mt-1 text-2xl font-extrabold text-[#8ec843]">
                        {readinessScore}%{' '}
                        <span className="text-xs font-semibold text-white">
                          {readinessScore >= 80
                            ? 'Strong Prime Fit'
                            : readinessScore >= 60
                              ? 'Good Match'
                              : 'Consider Longer Tenure'}
                        </span>
                      </p>
                    </div>
                    <Gauge className="h-9 w-9 text-[#8ec843]" />
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Structured Comparison Table */}
            <Reveal delay={110}>
              <div className="rounded-[28px] border border-slate-200 bg-white overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#f8fafc] border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                        <th className="py-4 px-6">Lender Category</th>
                        <th className="py-4 px-6">Indicative APR</th>
                        <th className="py-4 px-6">Max Ticket</th>
                        <th className="py-4 px-6">Disbursal Speed</th>
                        <th className="py-4 px-6">Prepayment Policy</th>
                        <th className="py-4 px-6 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                      {visibleLenders.map((row) => (
                        <tr key={row.segment} className="hover:bg-blue-50/40 transition">
                          <td className="py-4 px-6">
                            <p className="font-bold text-[#0a192f]">{row.segment}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{row.idealFor}</p>
                          </td>
                          <td className="py-4 px-6 font-extrabold text-[#0052cc] whitespace-nowrap">
                            {row.rateRange}
                          </td>
                          <td className="py-4 px-6 font-bold text-[#0a192f] whitespace-nowrap">
                            {row.maxTicket}
                          </td>
                          <td className="py-4 px-6 text-slate-600 whitespace-nowrap">
                            {row.turnaround}
                          </td>
                          <td className="py-4 px-6 text-slate-600">{row.prepayRule}</td>
                          <td className="py-4 px-6 text-right whitespace-nowrap">
                            <a
                              href="/apply"
                              className="inline-flex items-center gap-1 rounded-xl bg-blue-50 hover:bg-[#0052cc] text-[#0052cc] hover:text-white px-3.5 py-2 text-xs font-bold transition"
                            >
                              <span>Match</span>
                              <ArrowRight className="h-3.5 w-3.5" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ==================== 9. NEW ADDON: RBI KEY FACT STATEMENT DECODER & BORROWER FAQS ==================== */}
        <section className="py-20 lg:py-24 bg-[#f8fafc] border-b border-slate-200/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left 5 Cols: RBI Key Fact Statement (KFS) Guardrails */}
              <Reveal direction="left" className="lg:col-span-5">
                <div className="rounded-[30px] bg-[#0a192f] p-7 sm:p-9 text-white space-y-6 shadow-xl">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-[#8ec843]">
                    <Scale className="h-3.5 w-3.5" /> RBI Borrower Protections
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                    3 items we verify on every{' '}
                    <span className="font-serif font-normal italic text-sky-300">
                      Key Fact Statement
                    </span>
                  </h2>

                  <div className="space-y-4">
                    {[
                      {
                        title: 'All-In Annual Percentage Rate (APR)',
                        desc: 'Combines interest rate + processing fee + insurance (if opted) into a single true cost metric.',
                        icon: FileText,
                      },
                      {
                        title: 'Mandatory Cooling-Off Window',
                        desc: 'Exit the loan within the lender’s specified look-up period by paying proportionate APR without penalty.',
                        icon: ShieldCheck,
                      },
                      {
                        title: 'Zero Hidden Foreclosure Traps',
                        desc: 'Clear upfront disclosure of lock-in months and part-payment thresholds before e-Signing.',
                        icon: Info,
                      },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.title}
                          className="rounded-2xl bg-white/[0.06] border border-white/10 p-4 flex items-start gap-3.5"
                        >
                          <Icon className="h-5 w-5 text-[#8ec843] shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-bold text-white">{item.title}</p>
                            <p className="mt-1 text-xs leading-relaxed text-slate-300">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Reveal>

              {/* Right 7 Cols: Interactive Borrower FAQ Accordion */}
              <div className="lg:col-span-7 space-y-4">
                <Reveal>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#0052cc]">
                    Clear Answers
                  </span>
                  <h3 className="mt-1 text-2xl sm:text-3xl font-bold text-[#0a192f] mb-6">
                    Frequently asked borrower questions
                  </h3>
                </Reveal>

                {borrowerFaqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <Reveal key={faq.q} delay={index * 60}>
                      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition">
                        <button
                          type="button"
                          onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                          className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                        >
                          <span className="flex items-center gap-3 text-sm sm:text-base font-bold text-[#0a192f]">
                            <HelpCircle className="h-4 w-4 text-[#0052cc] shrink-0" />
                            <span>{faq.q}</span>
                          </span>
                          <ChevronDown
                            className={`h-5 w-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                              isOpen ? 'rotate-180 text-[#0052cc]' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-6 pt-0 text-xs sm:text-sm leading-relaxed text-slate-600 border-t border-slate-100">
                            <p className="pt-4">{faq.a}</p>
                          </div>
                        )}
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 10. REDESIGNED CLOSING: LIVE QUOTE LOCK & CALLBACK CONCIERGE ==================== */}
        <section className="py-16 lg:py-24 bg-[#f4f8ff]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Reveal direction="scale">
              <div className="rounded-[32px] border border-blue-200/80 bg-white p-8 sm:p-12 shadow-xl shadow-blue-950/5 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#f4faef] px-3.5 py-1 text-[11px] font-bold text-[#558b2f]">
                    <CalendarCheck2 className="h-3.5 w-3.5" /> Configured Quote Ready
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0a192f]">
                    Lock your {formatINR(loanAmount)} quote at{' '}
                    <span className="text-[#0052cc]">{formatINR(emi)}/mo</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
                    Proceed directly to our 3-minute digital match or request a priority callback
                    from a senior credit specialist—zero spam, zero obligation.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-3.5">
                    <a
                      href="/apply"
                      className="inline-flex items-center gap-2 rounded-2xl bg-[#0052cc] hover:bg-[#003d8f] px-7 py-4 text-sm font-bold text-white shadow-md transition"
                    >
                      <span>Check Instant Offers</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-[#f8fafc] hover:bg-slate-100 px-5 py-4 text-sm font-bold text-[#0a192f] transition"
                    >
                      <PhoneCall className="h-4 w-4 text-[#0052cc]" />
                      <span>Talk to Advisor</span>
                    </a>
                  </div>
                </div>

                {/* Quick Callback Mini-Card */}
                <div className="lg:col-span-5 rounded-2xl bg-[#f8fafc] border border-slate-200 p-6">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-[#0a192f]">
                    15-Minute Specialist Callback
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Share your mobile number to get a customized bank &amp; NBFC rate sheet.
                  </p>

                  {callbackSubmitted ? (
                    <div className="mt-4 rounded-xl bg-[#f4faef] border border-emerald-200 p-4 flex items-center gap-2.5 text-xs font-bold text-[#558b2f]">
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                      <span>Request received! A specialist will call {callbackPhone} shortly.</span>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (callbackPhone.trim().length >= 10) setCallbackSubmitted(true);
                      }}
                      className="mt-4 flex flex-col sm:flex-row gap-2.5"
                    >
                      <input
                        type="tel"
                        required
                        pattern="[0-9+\s-]{10,15}"
                        placeholder="+91 98765 43210"
                        value={callbackPhone}
                        onChange={(e) => setCallbackPhone(e.target.value)}
                        className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-[#0a192f] focus:border-[#0052cc] focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="rounded-xl bg-[#0a192f] hover:bg-[#162b4d] px-5 py-3 text-xs font-extrabold text-white transition whitespace-nowrap"
                      >
                        Request Call
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </Reveal>

            <p className="mt-6 text-[11px] leading-relaxed text-slate-400">
              *Indicative interest rates (starting 10.50% p.a.), maximum borrowing limits (up to ₹40
              Lakh), and 24–48 hour disbursal timelines are illustrative and subject to partner bank
              or NBFC credit, income, and KYC verification.
            </p>
          </div>
        </section>
      </div>
    </InteriorPage>
  );
}