import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Briefcase,
  Building2,
  Calculator,
  CalendarCheck2,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Cog,
  Cpu,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  Gauge,
  HeartPulse,
  HelpCircle,
  IndianRupee,
  Landmark,
  Layers,
  Lock,
  PhoneCall,
  PieChart,
  Receipt,
  Scale,
  ShieldCheck,
  Star,
  Store,
  TrendingUp,
  Wallet,
  Zap,
} from 'lucide-react';
import { InteriorPage } from '../components/InteriorPage';

// --- Directional Scroll Reveal ---
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
      { threshold: 0.1, rootMargin: '0px 0px -25px 0px' }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const hiddenClass = {
    up: 'opacity-0 translate-y-8',
    left: 'opacity-0 -translate-x-8',
    right: 'opacity-0 translate-x-8',
    scale: 'opacity-0 scale-95',
  }[direction];

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out transform ${
        visible ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : hiddenClass
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
}> = ({ children, speed = -30, className = '' }) => {
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

const formatINR = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.round(amount));

// --- Interactive 3D Isometric Enterprise Capital Sculpture (Daylight + Real Human Portrait + 3D Depth Layers) ---
const Interactive3DBusinessSculpture: React.FC<{
  facilityAmount: number;
  monthlyEmi: number;
  tenureMonths: number;
  roi: number;
}> = ({ facilityAmount, monthlyEmi, tenureMonths, roi }) => {
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

  return (
    <div
      ref={stageRef}
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      className="relative w-full h-[500px] sm:h-[550px] rounded-[36px] bg-gradient-to-br from-[#eef4ff] via-[#f9fbff] to-[#f1f9eb] border border-blue-200/80 shadow-[0_32px_80px_-32px_rgba(10,25,47,0.22)] overflow-hidden select-none cursor-grab active:cursor-grabbing flex items-center justify-center p-6"
    >
      {/* Dynamic Cursor Radial Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(420px circle at ${tilt.gx}% ${tilt.gy}%, rgba(0, 82, 204, 0.16), rgba(142, 200, 67, 0.14) 45%, transparent 75%)`,
        }}
      />

      {/* 3D Floating Isometric Spheres / Orbs */}
      <div
        className="pointer-events-none absolute -top-10 -right-10 h-56 w-56 rounded-full bg-gradient-to-br from-[#0052cc]/25 to-sky-300/30 blur-2xl transition-transform duration-300"
        style={{ transform: `translate(${tilt.ry * -1.2}px, ${tilt.rx * 1.2}px)` }}
      />
      <div
        className="pointer-events-none absolute -bottom-14 -left-10 h-60 w-60 rounded-full bg-gradient-to-tr from-[#8ec843]/35 to-emerald-200/30 blur-2xl transition-transform duration-300"
        style={{ transform: `translate(${tilt.ry * 1.3}px, ${tilt.rx * -1.3}px)` }}
      />

      {/* Decorative 3D Isometric Cube SVG Illustration in Corner */}
      <svg
        viewBox="0 0 120 120"
        className="pointer-events-none absolute top-6 right-6 w-20 h-20 opacity-85 drop-shadow-md"
        style={{ transform: `translate(${tilt.ry * 0.7}px, ${tilt.rx * -0.7}px)` }}
      >
        <defs>
          <linearGradient id="cubeTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8ec843" />
            <stop offset="100%" stopColor="#a3e635" />
          </linearGradient>
          <linearGradient id="cubeLeft" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0052cc" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          <linearGradient id="cubeRight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a192f" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
        </defs>
        <polygon points="60,12 104,36 60,60 16,36" fill="url(#cubeTop)" />
        <polygon points="16,36 60,60 60,108 16,84" fill="url(#cubeLeft)" />
        <polygon points="104,36 60,60 60,108 104,84" fill="url(#cubeRight)" />
      </svg>

      {/* Subtle Matrix Dot Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            'radial-gradient(#93c5fd 1.1px, transparent 1.1px), radial-gradient(#cbd5e1 1.1px, transparent 1.1px)',
          backgroundSize: '28px 28px',
          backgroundPosition: '0 0, 14px 14px',
        }}
      />

      {/* 3D Interactive Card Stack */}
      <div
        className="relative z-10 w-full max-w-[380px] transition-transform duration-200 ease-out"
        style={{
          transform: `perspective(1150px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Back 3D Card Layer: Corporate OD & Term Credit Pass */}
        <div
          className="absolute -top-7 -right-5 w-64 h-40 rounded-3xl bg-gradient-to-br from-[#0052cc] to-[#0284c7] p-5 text-white shadow-xl opacity-95"
          style={{ transform: 'translateZ(-30px) rotate(6deg)' }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-100">
              MSME Growth Line
            </span>
            <Zap className="h-4 w-4 text-[#8ec843]" />
          </div>
          <p className="mt-6 font-mono text-xs tracking-widest text-sky-100">
            GSTN • UDYAM VERIFIED
          </p>
        </div>

        {/* Center Main 3D Glass Card */}
        <div
          className="relative rounded-[30px] bg-white/95 backdrop-blur-xl border border-white p-6 sm:p-7 shadow-[0_28px_55px_-15px_rgba(10,25,47,0.22)]"
          style={{ transform: 'translateZ(26px)' }}
        >
          {/* Real Human Founder Portrait Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&q=85"
                  alt="Indian MSME business founder"
                  className="h-12 w-12 rounded-2xl object-cover ring-2 ring-blue-100"
                />
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#8ec843] ring-2 ring-white">
                  <BadgeCheck className="h-3 w-3 text-[#0a192f]" />
                </span>
              </div>
              <div>
                <p className="text-xs font-extrabold text-[#0a192f]">Pre-Qualified MSME Line</p>
                <p className="text-[11px] font-semibold text-emerald-600">
                  Zero Equity Dilution · Fast Sanction
                </p>
              </div>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-extrabold text-[#0052cc]">
              {tenureMonths} Mo
            </span>
          </div>

          {/* Active Sanction Amount */}
          <div className="my-5">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Selected Capital Line
              </p>
              <span className="text-xs font-extrabold text-[#558b2f] bg-[#f4faef] px-2.5 py-0.5 rounded-lg">
                {roi.toFixed(2)}% p.a.*
              </span>
            </div>
            <p className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0a192f]">
              {formatINR(facilityAmount)}
            </p>

            {/* 3D-Styled Cashflow Growth Bar Illustration */}
            <div className="mt-4 rounded-2xl bg-slate-50 border border-slate-100 p-3">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 mb-2">
                <span>Working Capital Velocity</span>
                <span className="text-[#0052cc]">+38% Output Capacity</span>
              </div>
              <div className="flex items-end gap-2 h-9">
                {[34, 48, 42, 65, 78, 95].map((barH, idx) => (
                  <div
                    key={idx}
                    className="flex-1 rounded-t-md transition-all duration-300"
                    style={{
                      height: `${barH}%`,
                      background:
                        idx >= 4
                          ? 'linear-gradient(180deg, #8ec843 0%, #558b2f 100%)'
                          : 'linear-gradient(180deg, #38bdf8 0%, #0052cc 100%)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Dark Navy Monthly Outflow Strip */}
          <div className="rounded-2xl bg-[#0a192f] p-4 text-white flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-sky-300 font-semibold">
                Estimated Monthly Outflow
              </p>
              <p className="text-xl font-extrabold mt-0.5">
                {formatINR(monthlyEmi)}
                <span className="text-xs font-normal text-slate-300">/mo</span>
              </p>
            </div>
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#8ec843] to-emerald-400 text-[#0a192f] flex items-center justify-center shadow-lg">
              <IndianRupee className="h-5 w-5 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* Floating 3D Pill Bottom-Left */}
        <div
          className="absolute -bottom-6 -left-5 flex items-center gap-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-emerald-200 px-4 py-3 shadow-xl"
          style={{ transform: 'translateZ(54px)' }}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 to-amber-500 text-[#0a192f] font-extrabold shadow-inner">
            ₹
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Collateral Status
            </p>
            <p className="text-xs font-extrabold text-[#0a192f]">Up to ₹75L Unsecured*</p>
          </div>
        </div>

        {/* Floating 3D Badge Top-Left */}
        <div
          className="absolute -top-5 -left-4 flex items-center gap-2 rounded-full bg-[#0a192f] text-white px-3.5 py-2 shadow-xl border border-white/15"
          style={{ transform: 'translateZ(48px)' }}
        >
          <ShieldCheck className="h-4 w-4 text-[#8ec843]" />
          <span className="text-[11px] font-bold">48-Hr Digital Sanction*</span>
        </div>
      </div>
    </div>
  );
};

export default function BusinessLoansPage() {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Interactive Business Capital State
  const [facilityAmount, setFacilityAmount] = useState<number>(2500000); // ₹25,00,000
  const [tenureMonths, setTenureMonths] = useState<number>(36);
  const [roi, setRoi] = useState<number>(13.5);

  // Active Facility & Founder Story State
  const [activeFacility, setActiveFacility] = useState<string>('term');
  const [activeFounderIdx, setActiveFounderIdx] = useState<number>(0);

  // Overdraft Utilization Simulator State
  const [odUtilizationPct, setOdUtilizationPct] = useState<number>(55);

  // DSCR & GST Eligibility Simulator State
  const [monthlyGstTurnover, setMonthlyGstTurnover] = useState<number>(1200000); // ₹12L/mo
  const [netProfitMarginPct, setNetProfitMarginPct] = useState<number>(14);
  const [existingBusinessEmi, setExistingBusinessEmi] = useState<number>(35000);

  // Entity Type & Sector State
  const [entityType, setEntityType] = useState<'proprietorship' | 'company'>('proprietorship');
  const [selectedSector, setSelectedSector] = useState<string>('manufacturing');

  // FAQ & Callback State
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [callbackPhone, setCallbackPhone] = useState<string>('');
  const [callbackBooked, setCallbackBooked] = useState<boolean>(false);

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

  // EMI & Amortization Calculations
  const monthlyRate = roi / 12 / 100;
  const monthlyEmi =
    monthlyRate === 0
      ? facilityAmount / tenureMonths
      : (facilityAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
        (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  const totalOutflow = monthlyEmi * tenureMonths;
  const totalInterest = totalOutflow - facilityAmount;

  // Overdraft vs Term Loan Annual Comparison
  const annualTermInterestAvg = totalInterest / (tenureMonths / 12);
  const utilizedOdCapital = (facilityAmount * odUtilizationPct) / 100;
  const annualOdInterest = utilizedOdCapital * (roi / 100);
  const annualOdSavings = Math.max(0, annualTermInterestAvg - annualOdInterest);

  // Year-by-year Amortization Schedule
  const yearlyAmortization = useMemo(() => {
    let balance = facilityAmount;
    const rows: { year: number; principal: number; interest: number; closing: number }[] = [];
    const totalYears = Math.ceil(tenureMonths / 12);
    for (let yr = 1; yr <= totalYears; yr++) {
      let yrP = 0;
      let yrI = 0;
      const months = yr === totalYears && tenureMonths % 12 !== 0 ? tenureMonths % 12 : 12;
      for (let m = 0; m < months; m++) {
        if (balance <= 0) break;
        const intM = balance * monthlyRate;
        const prinM = Math.min(balance, monthlyEmi - intM);
        yrI += intM;
        yrP += prinM;
        balance = Math.max(0, balance - prinM);
      }
      rows.push({ year: yr, principal: yrP, interest: yrI, closing: balance });
    }
    return rows;
  }, [facilityAmount, tenureMonths, monthlyRate, monthlyEmi]);

  // DSCR & GST Surrogate Cap
  const estimatedMonthlyCashProfit = (monthlyGstTurnover * netProfitMarginPct) / 100;
  const totalProposedDebtService = existingBusinessEmi + monthlyEmi;
  const dscrRatio =
    totalProposedDebtService > 0 ? estimatedMonthlyCashProfit / totalProposedDebtService : 2.5;
  const indicativeTurnoverLimit = Math.min(7500000, Math.round(monthlyGstTurnover * 12 * 0.22));

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
      caption: 'Raghav & Meera expanded their Bengaluru design & packaging studio without pledging property.',
      highlights: [
        'Underwritten on GST turnover & current account banking cash flows',
        'No property, machinery, or fixed deposit collateral required',
        'Ideal for inventory stocking, hiring & multi-city branch expansion',
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
      caption: 'Warehouse & wholesale distributors draw credit during peak festive dispatch and park surplus daily.',
      highlights: [
        'Dropline & revolving overdraft lines linked directly to current account',
        'Draw capital during peak seasonal cycles and sweep surplus back anytime',
        'Interest calculated strictly on daily utilized end-of-day balance',
      ],
    },
    {
      id: 'machinery',
      title: 'Equipment & Machinery Finance',
      tag: 'Up to 85% Invoice Funding*',
      limit: '₹5 L – ₹3 Cr*',
      tenure: '24 – 84 Months',
      rate: 'From 11.25% p.a.*',
      turnaround: '3–4 Working Days*',
      icon: Cog,
      image:
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=85',
      caption: 'Precision manufacturing units commission new CNC & robotics lines while preserving working reserves.',
      highlights: [
        'Finance CNC machines, medical diagnostics, printing & solar plant gear',
        'Funded equipment acts as primary security—no extra real estate needed',
        'Flexible 3–6 month moratorium aligned with installation & commissioning',
      ],
    },
    {
      id: 'invoice',
      title: 'GST & B2B Invoice Discounting',
      tag: 'Unlock Receivables in 24 Hrs',
      limit: '₹2 L – ₹1 Cr*',
      tenure: '30 – 120 Days Cycle',
      rate: 'From 11.50% p.a.*',
      turnaround: '24–48 Hours*',
      icon: Receipt,
      image:
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1400&q=85',
      caption: 'B2B suppliers unlock 60-day corporate receivables within 24 hours to pay vendors on time.',
      highlights: [
        'Convert unpaid B2B GST invoices into immediate vendor liquidity',
        'Bridge 60–90 day corporate credit cycles without straining reserves',
        'Automated GSTN & e-way bill verification for rapid tranche release',
      ],
    },
  ];

  const currentFacility = facilities.find((f) => f.id === activeFacility) || facilities[0];

  const founderStories = [
    {
      founder: 'Rajeshwari Menon',
      role: 'Managing Partner · Precision Auto Components, Chennai',
      facility: '₹42 Lakh Machinery + Term Loan',
      metric: '+38% Output Capacity',
      quote:
        'We commissioned two high-speed CNC units without pledging family real estate. GST-based underwriting closed in 72 hours.',
      photo:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=85',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
    {
      founder: 'Harshvardhan Joshi',
      role: 'Director · MedPlus Pharma Distributors, Ahmedabad',
      facility: '₹65 Lakh Working Capital OD',
      metric: 'Zero Idle Interest',
      quote:
        'With a dropline overdraft, we only pay interest during peak monsoon stock-ups and sweep daily collections straight back.',
      photo:
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=85',
      avatar:
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    },
    {
      founder: 'Tanvi Sethi',
      role: 'Co-Founder · Roast & Co. Cloud Kitchens, Delhi NCR',
      facility: '₹18 Lakh Expansion Loan',
      metric: '3 New Outlets Opened',
      quote:
        'Comparing private bank and NBFC term sheets side by side shaved 1.75% off our ROI and eliminated foreclosure lock-in.',
      photo:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=85',
      avatar:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    },
  ];

  const activeFounder = founderStories[activeFounderIdx] || founderStories[0];

  const sectors = [
    {
      id: 'manufacturing',
      name: 'Manufacturing & CNC',
      icon: Cog,
      tag: 'Plant & CapEx',
      surrogate: 'GST + Electricity & Machinery Invoice Surrogate',
      typicalTicket: '₹15 L – ₹2.5 Cr',
      note: 'High approval appetite for precision engineering, packaging, plastics, and textile units with 2+ years vintage.',
    },
    {
      id: 'retail',
      name: 'Retail & Wholesale',
      icon: Store,
      tag: 'Stock & POS',
      surrogate: 'POS Swipe + Current Account Credit Summation',
      typicalTicket: '₹5 L – ₹75 L',
      note: 'Seasonal festival stocking lines and dropline overdrafts tailored to distributor and FMCG margins.',
    },
    {
      id: 'healthcare',
      name: 'Healthcare & Clinics',
      icon: HeartPulse,
      tag: 'Diagnostics',
      surrogate: 'Professional Degree + Equipment Hypothecation',
      typicalTicket: '₹10 L – ₹3 Cr',
      note: 'Specialized doctor & diagnostic center programs covering MRI, CT, dental chairs, and clinic fit-outs.',
    },
    {
      id: 'ecommerce',
      name: 'E-Commerce & D2C',
      icon: Layers,
      tag: 'Inventory',
      surrogate: 'Marketplace Payouts + GSTN Cashflow Trail',
      typicalTicket: '₹3 L – ₹60 L',
      note: 'Fast working capital cycles to fund inventory batches ahead of marketplace sale events.',
    },
    {
      id: 'it',
      name: 'IT, SaaS & Consulting',
      icon: Cpu,
      tag: 'Talent & Ops',
      surrogate: 'Export Remittance (FIRC) + B2B Contract Surrogate',
      typicalTicket: '₹5 L – ₹1 Cr',
      note: 'Asset-light underwriting designed for agencies and software firms scaling delivery teams.',
    },
    {
      id: 'logistics',
      name: 'Logistics & Supply Chain',
      icon: TrendingUp,
      tag: 'Working Cap',
      surrogate: 'E-Way Bill Volume + Anchor Client Receivables',
      typicalTicket: '₹8 L – ₹1.5 Cr',
      note: 'Bridge fuel, toll, and fleet maintenance outlays while awaiting 45–60 day enterprise freight settlements.',
    },
  ];

  const activeSectorObj = sectors.find((s) => s.id === selectedSector) || sectors[0];

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
      q: 'What is DSCR and why do banks look at it for MSME loans?',
      a: 'Debt Service Coverage Ratio (DSCR) measures your monthly operating cash profit divided by total monthly loan EMIs. A DSCR above 1.25x signals healthy repayment comfort and unlocks sharper interest rates.',
    },
    {
      q: 'Are business loan interest payments tax-deductible?',
      a: 'Interest paid on business loans and working capital facilities is generally treated as a deductible business expense under the Income Tax Act. Consult your Chartered Accountant for exact treatment.',
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

        {/* Scroll-Synced Top Progress Ribbon */}
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-200/50 pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-[#0052cc] via-sky-400 to-[#8ec843] transition-[width] duration-75"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* ==================== 1. DAYLIGHT EDITORIAL HERO + 3D INTERACTIVE CAPITAL STAGE ==================== */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#f3f7ff] via-[#fcfcfd] to-white pt-10 pb-20 sm:pt-16 sm:pb-28 border-b border-slate-200/70">
          <ScrollParallax speed={-42} className="pointer-events-none absolute -top-28 left-1/4">
            <div className="h-96 w-96 rounded-full bg-blue-100/75 blur-3xl" />
          </ScrollParallax>
          <ScrollParallax speed={34} className="pointer-events-none absolute top-20 right-0">
            <div className="h-80 w-80 rounded-full bg-lime-100/65 blur-3xl" />
          </ScrollParallax>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              {/* Left 6 Cols: Editorial Copy + Real Founder Avatars + Dual CTA */}
              <Reveal direction="left" className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2.5 rounded-full border border-blue-200/80 bg-white px-3.5 py-1.5 shadow-sm">
                  <span className="flex h-2 w-2 rounded-full bg-[#8ec843]" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0052cc]">
                    Business Loans · ₹3 Lakh to ₹5 Crore*
                  </span>
                </div>

                <h1 className="text-[2.6rem] sm:text-[3.4rem] lg:text-[4rem] font-bold leading-[1.05] tracking-tight text-[#0a192f]">
                  Growth capital for{' '}
                  <span className="font-serif font-normal italic text-[#0052cc]">
                    ambitious founders
                  </span>
                  —without equity dilution.
                </h1>

                <p className="max-w-xl text-[15px] sm:text-[16px] leading-relaxed text-slate-600">
                  Compare collateral-free term loans, working capital overdrafts, and machinery
                  finance across 25+ Indian banks &amp; NBFCs—underwritten on your GST and banking
                  cash flows.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
                  <a
                    href="/apply"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0052cc] hover:bg-[#003d8f] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-blue-900/15 transition"
                  >
                    <span>Check Business Offers</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#capital-studio"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 px-6 py-4 text-sm font-bold text-[#0a192f] shadow-sm transition"
                  >
                    <Calculator className="h-4 w-4 text-[#0052cc]" />
                    <span>Simulate EMI &amp; OD</span>
                  </a>
                </div>

                {/* Real Human Founder Social Proof Strip */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <div className="flex -space-x-3">
                    {[
                      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=140&q=80',
                      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=140&q=80',
                      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=140&q=80',
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=140&q=80',
                    ].map((src, idx) => (
                      <img
                        key={idx}
                        src={src}
                        alt="Verified Indian MSME founder"
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
                      Trusted by 18,000+ MSME founders, manufacturers &amp; retailers
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Right 6 Cols: Interactive 3D Isometric Enterprise Capital Sculpture */}
              <Reveal direction="right" delay={100} className="lg:col-span-6">
                <ScrollParallax speed={-22}>
                  <Interactive3DBusinessSculpture
                    facilityAmount={facilityAmount}
                    monthlyEmi={monthlyEmi}
                    tenureMonths={tenureMonths}
                    roi={roi}
                  />
                </ScrollParallax>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ==================== 2. REAL-HUMAN PHOTOGRAPHIC CREDIT FACILITIES STAGE ==================== */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#0052cc]">
                    4 Purpose-Built Credit Lines
                  </span>
                  <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#0a192f]">
                    Engineered around{' '}
                    <span className="font-serif font-normal italic text-[#0052cc]">
                      how your business operates
                    </span>
                  </h2>
                </div>

                {/* Interactive Facility Tabs */}
                <div className="flex flex-wrap gap-2">
                  {facilities.map((item) => {
                    const Icon = item.icon;
                    const active = item.id === activeFacility;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveFacility(item.id)}
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold transition ${
                          active
                            ? 'bg-[#0a192f] text-white shadow-md'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200/75'
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5 text-[#8ec843]" />
                        <span>{item.title.replace('Unsecured Business ', '')}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            <Reveal delay={80} direction="scale">
              <div className="grid grid-cols-1 lg:grid-cols-12 rounded-[32px] overflow-hidden border border-slate-200/90 bg-[#f8fafc] shadow-xl shadow-slate-900/5">
                {/* Left 7 Cols: Real Human Workplace Photography + Glass Overlay */}
                <div className="relative min-h-[350px] sm:min-h-[430px] lg:col-span-7 overflow-hidden">
                  <img
                    src={currentFacility.image}
                    alt={currentFacility.title}
                    className="absolute inset-0 h-full w-full object-cover transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07172d]/90 via-[#07172d]/25 to-transparent" />

                  <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-9 text-white">
                    <span className="w-fit rounded-full bg-[#8ec843] px-3.5 py-1 text-xs font-extrabold text-[#0a192f]">
                      {currentFacility.tag}
                    </span>

                    <div className="space-y-4">
                      <div className="max-w-lg rounded-2xl border border-white/20 bg-white/15 p-4 backdrop-blur-md">
                        <p className="text-xs sm:text-sm font-medium leading-relaxed text-white">
                          {currentFacility.caption}
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-2.5 max-w-lg">
                        <div className="rounded-xl bg-[#0a192f]/80 border border-white/15 px-3.5 py-2.5 backdrop-blur-md">
                          <span className="block text-[10px] text-sky-300">Facility Limit</span>
                          <span className="text-xs sm:text-sm font-extrabold">
                            {currentFacility.limit}
                          </span>
                        </div>
                        <div className="rounded-xl bg-[#0a192f]/80 border border-white/15 px-3.5 py-2.5 backdrop-blur-md">
                          <span className="block text-[10px] text-sky-300">Indicative ROI</span>
                          <span className="text-xs sm:text-sm font-extrabold">
                            {currentFacility.rate}
                          </span>
                        </div>
                        <div className="rounded-xl bg-[#0a192f]/80 border border-white/15 px-3.5 py-2.5 backdrop-blur-md">
                          <span className="block text-[10px] text-sky-300">Turnaround</span>
                          <span className="text-xs sm:text-sm font-extrabold">
                            {currentFacility.turnaround}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right 5 Cols: Structured Spec Sheet & Apply CTA */}
                <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between bg-white">
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                      <span>ENTERPRISE CREDIT LINE</span>
                      <span className="text-[#558b2f]">{currentFacility.tenure}</span>
                    </div>
                    <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-[#0a192f]">
                      {currentFacility.title}
                    </h3>

                    <div className="mt-5 rounded-2xl bg-[#f4f8ff] border border-blue-100 p-4">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#0052cc]">
                        Sanction Band
                      </p>
                      <p className="mt-1 text-2xl font-extrabold text-[#0a192f]">
                        {currentFacility.limit}
                      </p>
                    </div>

                    <ul className="mt-6 space-y-3">
                      {currentFacility.highlights.map((perk) => (
                        <li
                          key={perk}
                          className="flex items-start gap-2.5 text-sm font-medium text-slate-700"
                        >
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#558b2f] mt-0.5" />
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
                      <span>Check Eligibility</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3.5 text-sm font-bold text-[#0a192f] hover:bg-slate-50 transition"
                    >
                      MSME Desk
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ==================== 3. INTERACTIVE TREASURY STUDIO: TERM LOAN EMI VS OVERDRAFT SAVINGS ==================== */}
        <section
          id="capital-studio"
          className="py-20 lg:py-28 bg-[#f4f8ff] border-y border-blue-100/80"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="max-w-2xl mb-12">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#0052cc]">
                  Live Treasury Workbench
                </span>
                <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#0a192f]">
                  Slide to model your{' '}
                  <span className="font-serif font-normal italic text-[#0052cc]">
                    EMI &amp; Overdraft savings
                  </span>
                </h2>
                <p className="mt-3 text-sm sm:text-base text-slate-600">
                  Adjust capital limit, tenure, and daily overdraft utilization—the 3D vault card
                  above updates simultaneously.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left 7 Cols: Sliders + Annual Amortization Schedule */}
              <Reveal direction="left" className="lg:col-span-7 flex flex-col gap-6">
                <div className="rounded-[28px] bg-white border border-blue-100 p-6 sm:p-8 shadow-sm space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="bl-amount" className="text-sm font-bold text-slate-700">
                        Sanctioned Capital Limit
                      </label>
                      <span className="rounded-xl bg-blue-50 px-3.5 py-1.5 text-base font-extrabold text-[#0052cc]">
                        {formatINR(facilityAmount)}
                      </span>
                    </div>
                    <input
                      id="bl-amount"
                      type="range"
                      min={300000}
                      max={10000000}
                      step={100000}
                      value={facilityAmount}
                      onChange={(e) => setFacilityAmount(Number(e.target.value))}
                      className="w-full h-2.5 rounded-lg bg-slate-200 accent-[#0052cc] cursor-pointer"
                    />
                    <div className="mt-1.5 flex justify-between text-[11px] font-medium text-slate-400">
                      <span>₹3 Lakh</span>
                      <span>₹50 Lakh</span>
                      <span>₹1 Crore</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label htmlFor="bl-tenure" className="text-xs font-bold text-slate-700">
                          Repayment Tenure
                        </label>
                        <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-extrabold text-[#0a192f]">
                          {tenureMonths} Months
                        </span>
                      </div>
                      <input
                        id="bl-tenure"
                        type="range"
                        min={12}
                        max={60}
                        step={6}
                        value={tenureMonths}
                        onChange={(e) => setTenureMonths(Number(e.target.value))}
                        className="w-full h-2.5 rounded-lg bg-slate-200 accent-[#0052cc] cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label htmlFor="bl-roi" className="text-xs font-bold text-slate-700">
                          Indicative ROI (p.a.)
                        </label>
                        <span className="rounded-lg bg-[#f4faef] px-3 py-1 text-xs font-extrabold text-[#558b2f]">
                          {roi.toFixed(2)}%
                        </span>
                      </div>
                      <input
                        id="bl-roi"
                        type="range"
                        min={10.75}
                        max={19}
                        step={0.25}
                        value={roi}
                        onChange={(e) => setRoi(Number(e.target.value))}
                        className="w-full h-2.5 rounded-lg bg-slate-200 accent-[#558b2f] cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="bl-od" className="text-xs font-bold text-slate-700">
                        Average Daily OD Utilization (If choosing Working Capital OD)
                      </label>
                      <span className="rounded-lg bg-[#f4faef] px-2.5 py-1 text-xs font-extrabold text-[#558b2f]">
                        {odUtilizationPct}% ({formatINR(utilizedOdCapital)})
                      </span>
                    </div>
                    <input
                      id="bl-od"
                      type="range"
                      min={20}
                      max={100}
                      step={5}
                      value={odUtilizationPct}
                      onChange={(e) => setOdUtilizationPct(Number(e.target.value))}
                      className="w-full h-2 rounded-lg bg-slate-200 accent-[#558b2f] cursor-pointer"
                    />
                  </div>
                </div>

                {/* Year-by-Year Amortization Table */}
                <div className="rounded-[26px] bg-white border border-blue-100 overflow-hidden shadow-sm">
                  <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#0a192f]">
                      Annual Term Loan Amortization Schedule
                    </span>
                    <span className="text-xs font-bold text-[#0052cc]">
                      {Math.ceil(tenureMonths / 12)} Years
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-slate-100 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                          <th className="py-2.5 px-5">Year</th>
                          <th className="py-2.5 px-5">Principal</th>
                          <th className="py-2.5 px-5">Interest</th>
                          <th className="py-2.5 px-5 text-right">Closing Balance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {yearlyAmortization.map((row) => (
                          <tr key={row.year} className="hover:bg-blue-50/40">
                            <td className="py-2.5 px-5 font-extrabold text-[#0a192f]">
                              Year 0{row.year}
                            </td>
                            <td className="py-2.5 px-5 font-semibold text-[#0052cc]">
                              {formatINR(row.principal)}
                            </td>
                            <td className="py-2.5 px-5 text-slate-600">
                              {formatINR(row.interest)}
                            </td>
                            <td className="py-2.5 px-5 text-right font-extrabold text-[#0a192f]">
                              {formatINR(row.closing)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Reveal>

              {/* Right 5 Cols: Dark Navy Output & OD Efficiency Card */}
              <Reveal direction="right" delay={100} className="lg:col-span-5 flex">
                <div className="w-full rounded-[28px] bg-[#0a192f] p-7 sm:p-9 text-white flex flex-col justify-between shadow-xl">
                  <div className="space-y-6">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold text-[#8ec843]">
                      <PieChart className="h-3.5 w-3.5" /> Fixed vs. Revolving Structure
                    </span>

                    <div>
                      <p className="text-xs uppercase tracking-wider text-sky-300">
                        Term Loan Monthly EMI
                      </p>
                      <p className="mt-1 text-4xl sm:text-5xl font-extrabold tracking-tight">
                        {formatINR(monthlyEmi)}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 rounded-2xl bg-white/[0.07] p-4 border border-white/10">
                      <div>
                        <p className="text-[11px] text-slate-300">Sanctioned Limit</p>
                        <p className="mt-0.5 text-base font-bold text-white">
                          {formatINR(facilityAmount)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] text-slate-300">Total Term Interest</p>
                        <p className="mt-0.5 text-base font-bold text-[#8ec843]">
                          {formatINR(totalInterest)}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-emerald-400/25 bg-emerald-400/10 p-4 space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-emerald-200">
                          OD Interest @ {odUtilizationPct}% Daily Usage
                        </span>
                        <span className="text-white">{formatINR(annualOdInterest)}/yr</span>
                      </div>
                      <p className="text-xs text-sky-100 leading-relaxed">
                        Sweeping daily customer collections into an Overdraft saves roughly{' '}
                        <span className="font-extrabold text-[#8ec843]">
                          {formatINR(annualOdSavings)}/year
                        </span>{' '}
                        vs. paying interest on 100% drawn term capital.
                      </p>
                    </div>
                  </div>

                  <a
                    href="/apply"
                    className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#8ec843] hover:opacity-95 px-6 py-4 text-sm font-extrabold text-[#0a192f] transition"
                  >
                    <span>Lock This Facility Quote</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ==================== 4. 4-STEP DIGITAL SANCTION JOURNEY WITH REAL FOUNDER PHOTOGRAPHY ==================== */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <Reveal direction="left" className="lg:col-span-5">
                <ScrollParallax speed={-20}>
                  <div className="relative rounded-[32px] overflow-hidden h-[450px] shadow-2xl shadow-blue-950/10">
                    <img
                      src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85"
                      alt="Business partners reviewing digital loan approval in office"
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-transparent to-transparent" />

                    <div className="animate-float-slow absolute bottom-6 left-6 right-6 rounded-2xl bg-white/95 backdrop-blur-md p-5 shadow-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#0052cc]">
                            Account Aggregator &amp; GSTN
                          </span>
                          <p className="text-base font-extrabold text-[#0a192f] mt-0.5">
                            Sanctioned in 48 hours*
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
                    Paperless MSME Workflow
                  </span>
                  <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#0a192f]">
                    Four steps from{' '}
                    <span className="font-serif font-normal italic text-[#0052cc]">
                      GST fetch to current-account credit
                    </span>
                  </h2>
                </Reveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    {
                      num: '01',
                      title: 'Configure Facility & Limit',
                      desc: 'Select Term Loan, Overdraft, or Machinery Finance from ₹3L to ₹5 Cr*.',
                      icon: Calculator,
                    },
                    {
                      num: '02',
                      title: 'Digital GST & Bank Fetch',
                      desc: 'Share 12-month bank PDFs or consent via RBI Account Aggregator securely.',
                      icon: FileCheck2,
                    },
                    {
                      num: '03',
                      title: 'Compare 25+ Lender Offers',
                      desc: 'Evaluate sanction limits, ROI, and foreclosure terms side by side.',
                      icon: Building2,
                    },
                    {
                      num: '04',
                      title: 'e-Sign & Direct Disbursal',
                      desc: 'Complete digital e-Mandate & e-Stamp for direct current account credit.',
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

        {/* ==================== 5. INTERACTIVE DSCR & GST SURROGATE ANALYZER ==================== */}
        <section className="py-20 lg:py-24 bg-[#f8fafc] border-y border-slate-200/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <Reveal direction="left" className="lg:col-span-6 space-y-6">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#0052cc]">
                  Underwriting Readiness Check
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0a192f]">
                  Preview your live{' '}
                  <span className="font-serif font-normal italic text-[#0052cc]">
                    DSCR &amp; GST credit cap
                  </span>
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Lenders measure Debt Service Coverage Ratio (DSCR) and annual GST turnover to
                  size unsecured business limits. Slide your monthly metrics below.
                </p>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-5 shadow-sm">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span className="text-slate-700">Monthly GST Turnover</span>
                      <span className="font-extrabold text-[#0052cc]">
                        {formatINR(monthlyGstTurnover)} / mo
                      </span>
                    </div>
                    <input
                      type="range"
                      min={200000}
                      max={10000000}
                      step={100000}
                      value={monthlyGstTurnover}
                      onChange={(e) => setMonthlyGstTurnover(Number(e.target.value))}
                      className="w-full h-2 rounded-lg bg-slate-200 accent-[#0052cc] cursor-pointer"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1.5">
                        <span className="text-slate-700">Operating Margin</span>
                        <span className="font-extrabold text-[#558b2f]">{netProfitMarginPct}%</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={35}
                        step={1}
                        value={netProfitMarginPct}
                        onChange={(e) => setNetProfitMarginPct(Number(e.target.value))}
                        className="w-full h-2 rounded-lg bg-slate-200 accent-[#558b2f] cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1.5">
                        <span className="text-slate-700">Existing Monthly EMIs</span>
                        <span className="font-extrabold text-[#0a192f]">
                          {formatINR(existingBusinessEmi)}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={400000}
                        step={5000}
                        value={existingBusinessEmi}
                        onChange={(e) => setExistingBusinessEmi(Number(e.target.value))}
                        className="w-full h-2 rounded-lg bg-slate-200 accent-[#0a192f] cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal direction="right" delay={100} className="lg:col-span-6">
                <div className="rounded-[32px] border border-blue-100 bg-gradient-to-br from-[#f4f8ff] via-white to-[#f4faef] p-7 sm:p-10 shadow-lg shadow-slate-900/5 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Calculated DSCR Score
                      </p>
                      <div className="mt-1 flex flex-wrap items-baseline gap-3">
                        <span className="text-4xl sm:text-5xl font-extrabold text-[#0a192f]">
                          {dscrRatio.toFixed(2)}x
                        </span>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-extrabold ${
                            dscrRatio >= 1.25
                              ? 'bg-[#f4faef] text-[#558b2f]'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {dscrRatio >= 1.25
                            ? 'Prime Bank Benchmark (≥1.25x)'
                            : 'Longer Tenure Recommended'}
                        </span>
                      </div>
                    </div>
                    <Gauge className="h-10 w-10 text-[#0052cc]" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-white border border-slate-200/80 p-5">
                      <p className="text-xs font-semibold text-slate-500">
                        Indicative Unsecured Cap (GST Surrogate)
                      </p>
                      <p className="mt-1 text-2xl font-extrabold text-[#0052cc]">
                        {formatINR(indicativeTurnoverLimit)}*
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white border border-slate-200/80 p-5">
                      <p className="text-xs font-semibold text-slate-500">
                        Est. Monthly Cash Surplus
                      </p>
                      <p className="mt-1 text-2xl font-extrabold text-[#558b2f]">
                        {formatINR(estimatedMonthlyCashProfit)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <p className="text-xs text-slate-500 max-w-xs">
                      *Subject to 12-month GSTR-3B consistency and current account banking health.
                    </p>
                    <a
                      href="/apply"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#0052cc] px-5 py-3 text-xs font-extrabold text-white hover:bg-[#003d8f] transition"
                    >
                      Verify Exact Limit <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ==================== 6. ENTITY ELIGIBILITY & GST/ITR CHECKLIST (DARK NAVY CONTRAST BAND) ==================== */}
        <section className="py-20 lg:py-24 bg-[#0a192f] text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#8ec843]">
                    Entity Qualification
                  </span>
                  <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
                    Eligibility &amp;{' '}
                    <span className="font-serif font-normal italic text-sky-300">
                      GST / ITR checklist
                    </span>
                  </h2>
                </div>

                <div className="inline-flex rounded-2xl bg-white/10 p-1.5 w-fit backdrop-blur-md">
                  <button
                    type="button"
                    onClick={() => setEntityType('proprietorship')}
                    className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${
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
                    className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                      entityType === 'company'
                        ? 'bg-[#8ec843] text-[#0a192f]'
                        : 'text-sky-100 hover:text-white'
                    }`}
                  >
                    Pvt Ltd / LLP Company
                  </button>
                </div>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
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
                ).map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <Reveal key={stat.label} delay={idx * 70}>
                      <div className="h-full rounded-2xl border border-white/15 bg-white/[0.06] p-5">
                        <Icon className="h-5 w-5 text-[#8ec843] mb-3" />
                        <p className="text-[11px] text-sky-200">{stat.label}</p>
                        <p className="mt-1 text-lg sm:text-xl font-extrabold">{stat.val}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>

              <Reveal direction="right" delay={110} className="lg:col-span-7">
                <div className="h-full rounded-[26px] border border-white/15 bg-white/[0.05] p-6 sm:p-8 flex flex-col justify-between">
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
                      Account Aggregator (AA) digital bank statement fetch supported.
                    </span>
                    <a
                      href="/apply"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#8ec843] px-5 py-2.5 text-xs font-extrabold text-[#0a192f] hover:opacity-95"
                    >
                      Upload &amp; Check Offers <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ==================== 7. REAL FOUNDER IMPACT SHOWCASE + SECTOR MATRIX ==================== */}
        <section className="py-20 lg:py-28 bg-white border-b border-slate-200/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
            {/* Part A: Interactive Real-Human Founder Spotlight */}
            <div>
              <Reveal>
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#558b2f]">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span>4.9/5 MSME Founder Rating</span>
                    </div>
                    <h2 className="mt-1.5 text-3xl sm:text-4xl font-bold tracking-tight text-[#0a192f]">
                      Real founders scaling{' '}
                      <span className="font-serif font-normal italic text-[#0052cc]">
                        across India
                      </span>
                    </h2>
                  </div>

                  {/* Founder Selector Avatars */}
                  <div className="flex flex-wrap gap-2.5">
                    {founderStories.map((story, idx) => (
                      <button
                        key={story.founder}
                        type="button"
                        onClick={() => setActiveFounderIdx(idx)}
                        className={`inline-flex items-center gap-2.5 rounded-full pr-4 pl-1.5 py-1.5 text-xs font-bold transition ${
                          activeFounderIdx === idx
                            ? 'bg-[#0a192f] text-white shadow-md'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                        }`}
                      >
                        <img
                          src={story.avatar}
                          alt={story.founder}
                          className="h-7 w-7 rounded-full object-cover"
                        />
                        <span>{story.founder}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal direction="scale">
                <div className="grid grid-cols-1 lg:grid-cols-12 rounded-[32px] overflow-hidden border border-slate-200 bg-[#f8fafc] shadow-lg">
                  <div className="relative min-h-[320px] sm:min-h-[390px] lg:col-span-6">
                    <img
                      src={activeFounder.photo}
                      alt={activeFounder.founder}
                      className="absolute inset-0 h-full w-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071529]/85 via-transparent to-transparent" />
                    <div className="absolute top-5 left-5 flex gap-2">
                      <span className="rounded-full bg-[#8ec843] px-3.5 py-1 text-xs font-extrabold text-[#0a192f]">
                        {activeFounder.metric}
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-6 p-7 sm:p-11 bg-white flex flex-col justify-between">
                    <div>
                      <span className="inline-block rounded-lg bg-blue-50 px-3 py-1 text-xs font-extrabold text-[#0052cc]">
                        {activeFounder.facility}
                      </span>
                      <blockquote className="mt-5 text-xl sm:text-2xl font-bold leading-snug text-[#0a192f]">
                        &ldquo;{activeFounder.quote}&rdquo;
                      </blockquote>
                    </div>

                    <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <p className="text-base font-extrabold text-[#0a192f]">
                          {activeFounder.founder}
                        </p>
                        <p className="text-xs text-slate-500">{activeFounder.role}</p>
                      </div>
                      <BadgeCheck className="h-6 w-6 text-[#558b2f]" />
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Part B: Interactive 6-Sector Underwriting Matrix */}
            <div>
              <Reveal>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#0052cc]">
                      Sector-Specific Underwriting
                    </span>
                    <h3 className="mt-1.5 text-2xl sm:text-3xl font-bold tracking-tight text-[#0a192f]">
                      Click your industry to view surrogate programs
                    </h3>
                  </div>
                </div>
              </Reveal>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                {sectors.map((sector) => {
                  const Icon = sector.icon;
                  const isSelected = sector.id === selectedSector;
                  return (
                    <button
                      key={sector.id}
                      type="button"
                      onClick={() => setSelectedSector(sector.id)}
                      className={`group rounded-2xl border p-5 text-center transition-all ${
                        isSelected
                          ? 'border-[#0052cc] bg-[#0a192f] text-white shadow-lg -translate-y-1'
                          : 'border-slate-200 bg-[#fcfcfd] text-[#0a192f] hover:border-[#0052cc] hover:shadow-md'
                      }`}
                    >
                      <div
                        className={`mx-auto flex h-12 w-12 items-center justify-center rounded-2xl transition ${
                          isSelected
                            ? 'bg-[#8ec843] text-[#0a192f]'
                            : 'bg-blue-50 text-[#0052cc] group-hover:bg-[#0052cc] group-hover:text-white'
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <h4 className="mt-3.5 text-sm font-bold">{sector.name}</h4>
                      <span
                        className={`mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          isSelected
                            ? 'bg-white/15 text-sky-200'
                            : 'bg-[#f4faef] text-[#558b2f]'
                        }`}
                      >
                        {sector.tag}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="rounded-[24px] border border-blue-200/80 bg-[#f4f8ff] p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-extrabold text-[#0052cc]">
                      {activeSectorObj.name}
                    </span>
                    <span className="text-xs font-bold text-[#558b2f]">
                      Surrogate: {activeSectorObj.surrogate}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                    {activeSectorObj.note}
                  </p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Typical Ticket
                    </p>
                    <p className="text-lg font-extrabold text-[#0a192f]">
                      {activeSectorObj.typicalTicket}
                    </p>
                  </div>
                  <a
                    href="/apply"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0052cc] px-5 py-3 text-xs font-extrabold text-white hover:bg-[#003d8f] transition"
                  >
                    Match Offers <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 8. RBI MSME GUARDRAILS + FAQS + PRIORITY MSME DESK CALLBACK ==================== */}
        <section className="py-20 lg:py-24 bg-[#f4f8ff]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
              {/* Left 5 Cols: RBI MSME Fair-Practice Guardrails */}
              <Reveal direction="left" className="lg:col-span-5">
                <div className="rounded-[30px] bg-[#0a192f] p-7 sm:p-9 text-white space-y-6 shadow-xl">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-[#8ec843]">
                    <Scale className="h-3.5 w-3.5" /> RBI MSME Transparency
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                    3 clauses we benchmark on every{' '}
                    <span className="font-serif font-normal italic text-sky-300">
                      sanction letter
                    </span>
                  </h2>
                  <div className="space-y-4">
                    {[
                      {
                        title: 'All-In APR & Annual Renewal Fees',
                        desc: 'We surface upfront processing fees, OD annual renewal charges, and stamp duty before you sign.',
                        icon: FileText,
                      },
                      {
                        title: 'Zero-Penalty Own-Funds Foreclosure',
                        desc: 'Under RBI rules, floating-rate term loans to individual/MSE borrowers carry nil foreclosure penalties.',
                        icon: ShieldCheck,
                      },
                      {
                        title: 'CGTMSE Collateral-Free Coverage',
                        desc: 'Eligible micro & small enterprises can access government-backed credit guarantees without property security.',
                        icon: Landmark,
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

              {/* Right 7 Cols: Interactive FAQs */}
              <div className="lg:col-span-7 space-y-3.5">
                <Reveal>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#0052cc]">
                    Founder Q&amp;A
                  </span>
                  <h3 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-[#0a192f] mb-5">
                    Business Loan FAQs
                  </h3>
                </Reveal>

                {faqs.map((item, idx) => {
                  const open = openFaq === idx;
                  return (
                    <Reveal key={item.q} delay={idx * 60}>
                      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setOpenFaq(open ? null : idx)}
                          aria-expanded={open}
                          className="flex w-full items-center justify-between gap-4 px-6 py-4.5 text-left"
                        >
                          <span className="flex items-center gap-3 text-sm sm:text-base font-bold text-[#0a192f]">
                            <HelpCircle className="h-4 w-4 text-[#0052cc] shrink-0" />
                            <span>{item.q}</span>
                          </span>
                          <ChevronDown
                            className={`h-5 w-5 shrink-0 text-[#0052cc] transition-transform ${
                              open ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {open && (
                          <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                            <p className="pt-3.5">{item.a}</p>
                          </div>
                        )}
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>

            {/* Bottom Enterprise Quote Lock & MSME Desk Callback */}
            <Reveal direction="scale">
              <div className="rounded-[32px] bg-gradient-to-r from-[#0a192f] via-[#103767] to-[#0052cc] p-8 sm:p-11 text-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
                <div className="lg:col-span-7 space-y-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold text-[#8ec843]">
                    <CalendarCheck2 className="h-3.5 w-3.5" /> Configured Capital Quote
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold">
                    Unlock {formatINR(facilityAmount)} growth capital for{' '}
                    <span className="font-serif font-normal italic text-[#8ec843]">
                      your business today.
                    </span>
                  </h3>
                  <p className="text-xs sm:text-sm text-sky-100">
                    Estimated EMI {formatINR(monthlyEmi)}/mo · Unsecured Term Loans · Working
                    Capital OD · Machinery Finance
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <a
                      href="/apply"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#8ec843] px-6 py-3.5 text-sm font-extrabold text-[#0a192f] hover:opacity-95"
                    >
                      Apply Now <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white hover:bg-white/20"
                    >
                      <PhoneCall className="h-4 w-4" /> MSME Advisor
                    </a>
                  </div>
                </div>

                {/* Priority MSME Desk Callback Form */}
                <div className="lg:col-span-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-6">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-[#8ec843]">
                    Priority MSME Credit Desk
                  </p>
                  <p className="mt-1 text-xs text-sky-100">
                    Get a side-by-side bank &amp; NBFC term sheet on WhatsApp or call.
                  </p>

                  {callbackBooked ? (
                    <div className="mt-4 rounded-xl bg-[#8ec843]/20 border border-[#8ec843]/40 p-4 flex items-center gap-2.5 text-xs font-bold text-white">
                      <CheckCircle2 className="h-4 w-4 text-[#8ec843] shrink-0" />
                      <span>Booked! An MSME specialist will reach out to {callbackPhone}.</span>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (callbackPhone.trim().length >= 10) setCallbackBooked(true);
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
                        className="flex-1 rounded-xl border border-white/25 bg-white px-4 py-3 text-sm font-medium text-[#0a192f] focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="rounded-xl bg-[#8ec843] px-5 py-3 text-xs font-extrabold text-[#0a192f] hover:opacity-95 transition whitespace-nowrap"
                      >
                        Get Term Sheet
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </Reveal>

            <p className="mt-6 text-[11px] text-slate-400 leading-relaxed">
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