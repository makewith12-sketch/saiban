// src/pages/CibilScorePage.tsx
import React, { useState } from 'react';
import {
  ShieldCheck,
  ArrowRight,
  Calculator,
  AlertCircle,
  RefreshCw,
  BadgeCheck,
  CheckCircle2,
  ChevronDown,
  Clock,
  CreditCard,
  Gauge,
  Layers,
  Lock,
  Percent,
  Sparkles,
  Zap,
} from 'lucide-react';
import { InteriorPage } from '../components/InteriorPage';

const formatINR = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.round(amount));

export default function CibilScorePage() {
  // Soft Check Form State
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [pan, setPan] = useState('');
  const [employmentType, setEmploymentType] = useState<'salaried' | 'self-employed'>('salaried');
  const [consent, setConsent] = useState(true);
  const [formError, setFormError] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  const [reportResult, setReportResult] = useState<{
    score: number;
    band: string;
    badgeBg: string;
    badgeText: string;
    summary: string;
    unlocks: string[];
  } | null>(null);

  // Interactive Score-to-Savings Simulator State
  const [simulatedScore, setSimulatedScore] = useState<number>(775);
  const [loanCategory, setLoanCategory] = useState<'home' | 'personal' | 'business'>('home');

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  const handleCheckScore = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim()) {
      setFormError('Please enter your full name as printed on your PAN card.');
      return;
    }
    if (!panRegex.test(pan)) {
      setFormError('Enter a valid 10-character PAN (e.g., ABCDE1234F).');
      return;
    }
    if (mobile.length !== 10) {
      setFormError('Enter a valid 10-digit Indian mobile number.');
      return;
    }

    setIsChecking(true);
    setTimeout(() => {
      const seed = pan.charCodeAt(0) + pan.charCodeAt(4) + mobile.charCodeAt(9);
      const calculatedScore = 725 + (seed % 90); // Deterministic preview: 725 - 814

      let band = 'Good Standing';
      let badgeBg = 'bg-sky-500/20 border-sky-400/40';
      let badgeText = 'text-sky-300';
      let summary =
        'Your profile reflects steady repayment discipline. You qualify for competitive offers across leading banks and NBFCs.';
      let unlocks = [
        'Repo-linked Home Loans from 8.45% p.a.*',
        'Unsecured Personal Loans up to ₹25 Lakh*',
        'Standard processing fee waivers on select banks',
      ];

      if (calculatedScore >= 775) {
        band = 'Prime / Excellent';
        badgeBg = 'bg-[#8ec843]/20 border-[#8ec843]/40';
        badgeText = 'text-[#8ec843]';
        summary =
          'Top-tier credit profile! Banks classify 775+ borrowers in the lowest risk slab—unlocking lowest repo-linked rates and priority sanction.';
        unlocks = [
          'Lowest Home Loan ROI starting 8.35% p.a.*',
          'Express Personal Loans up to ₹40 Lakh @ 10.50%*',
          'Zero-collateral Business Term Loans up to ₹75 Lakh*',
        ];
      } else if (calculatedScore < 740) {
        band = 'Fair / Building';
        badgeBg = 'bg-amber-400/20 border-amber-400/40';
        badgeText = 'text-amber-300';
        summary =
          'Eligible for multiple NBFC and bank programs. Keeping credit card utilization under 30% for 60 days can lift your score past 765.';
        unlocks = [
          'NBFC & HFC Home Loan programs available',
          'Step-up Personal Loan limits with clean track',
          'Free advisor guidance to boost score by 30+ pts',
        ];
      }

      setReportResult({
        score: calculatedScore,
        band,
        badgeBg,
        badgeText,
        summary,
        unlocks,
      });
      setSimulatedScore(calculatedScore);
      setIsChecking(false);
    }, 800);
  };

  // Active Gauge Score (syncs with report result or interactive simulator)
  const activeScore = reportResult ? reportResult.score : simulatedScore;
  const clamped = Math.min(900, Math.max(300, activeScore));
  const needleAngle = ((clamped - 300) / 600) * 180 - 90;

  // Dynamic Rate & EMI Impact Based on Simulated Score
  const getRateForScore = (score: number, category: 'home' | 'personal' | 'business') => {
    if (category === 'home') {
      if (score >= 780) return { rate: 8.35, principal: 5000000, months: 240, tier: 'Prime Slab' };
      if (score >= 740) return { rate: 8.65, principal: 5000000, months: 240, tier: 'Standard Slab' };
      if (score >= 690) return { rate: 9.15, principal: 5000000, months: 240, tier: 'Mid Slab' };
      return { rate: 9.85, principal: 5000000, months: 240, tier: 'Sub-Prime Slab' };
    }
    if (category === 'personal') {
      if (score >= 780) return { rate: 10.5, principal: 800000, months: 48, tier: 'Prime Slab' };
      if (score >= 740) return { rate: 11.75, principal: 800000, months: 48, tier: 'Standard Slab' };
      if (score >= 690) return { rate: 14.25, principal: 800000, months: 48, tier: 'Mid Slab' };
      return { rate: 17.5, principal: 800000, months: 48, tier: 'Sub-Prime Slab' };
    }
    // Business
    if (score >= 780) return { rate: 12.5, principal: 2500000, months: 36, tier: 'Prime Slab' };
    if (score >= 740) return { rate: 13.75, principal: 2500000, months: 36, tier: 'Standard Slab' };
    if (score >= 690) return { rate: 15.5, principal: 2500000, months: 36, tier: 'Mid Slab' };
    return { rate: 18.0, principal: 2500000, months: 36, tier: 'Sub-Prime Slab' };
  };

  const calcEmi = (p: number, annualRate: number, n: number) => {
    const r = annualRate / 12 / 100;
    return (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  };

  const currentTier = getRateForScore(simulatedScore, loanCategory);
  const basePoorTier = getRateForScore(640, loanCategory);
  const currentEmi = calcEmi(currentTier.principal, currentTier.rate, currentTier.months);
  const highRateEmi = calcEmi(basePoorTier.principal, basePoorTier.rate, basePoorTier.months);
  const totalInterestSaved = Math.max(0, (highRateEmi - currentEmi) * currentTier.months);

  const pillars = [
    {
      weight: 35,
      title: 'On-Time Repayments',
      tag: 'Highest Impact',
      icon: Clock,
      tip: 'Zero missed EMIs or late credit card payments.',
    },
    {
      weight: 30,
      title: 'Credit Utilization',
      tag: 'Keep < 30%',
      icon: CreditCard,
      tip: 'Use less than 30% of your total card limit.',
    },
    {
      weight: 20,
      title: 'Credit Mix & Inquiries',
      tag: 'Balanced Portfolio',
      icon: Layers,
      tip: 'Avoid multiple back-to-back hard loan applications.',
    },
    {
      weight: 15,
      title: 'Account Vintage',
      tag: 'Longer = Better',
      icon: BadgeCheck,
      tip: 'Keep your oldest zero-fee credit card active.',
    },
  ];

  const faqs = [
    {
      q: 'Does checking my CIBIL score here reduce my credit score?',
      a: 'No. Checking your score on Saiban Capital is a "soft inquiry" which is visible only to you and has zero negative impact on your CIBIL or bureau score.',
    },
    {
      q: 'What CIBIL score is considered ideal for Home, Personal, and Business loans?',
      a: 'A score of 750 or above is widely considered prime by Indian banks—unlocking the lowest repo-linked home loan rates, higher unsecured personal loan limits, and faster sanction turnaround.',
    },
    {
      q: 'How quickly can I improve a low credit score?',
      a: 'Paying down high credit card balances below 30% utilization and clearing overdue amounts typically reflects in bureau updates within 30 to 60 days.',
    },
    {
      q: 'Can I still get a loan if my CIBIL score is between 650 and 720?',
      a: 'Yes. Several partner HFCs and NBFCs evaluate stable income, banking cash flows, and property collateral alongside credit scores to structure tailored approvals.',
    },
  ];

  return (
    <InteriorPage>
      <div className="min-h-screen bg-[#fcfcfd] text-[#0a192f] font-sans antialiased selection:bg-[#0052cc] selection:text-white">
        {/* ==================== 1. SPLIT HERO: SOFT-CHECK FORM + LIVE INTERACTIVE 300–900 SPEEDOMETER ==================== */}
        <section className="relative overflow-hidden bg-white pt-10 pb-16 sm:pt-14 sm:pb-24 border-b border-slate-200/80">
          <div className="pointer-events-none absolute -top-28 right-0 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-10 h-80 w-80 rounded-full bg-emerald-100/50 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-center">
              {/* Left 7 Cols: Form or Instant Score Report */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-[#f4faef] px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#558b2f]">
                  <ShieldCheck className="h-4 w-4" />
                  <span>100% Free · Zero CIBIL Impact Soft Check</span>
                </div>

                <h1 className="text-[2.45rem] sm:text-[3.3rem] lg:text-[3.75rem] font-bold tracking-tight text-[#0a192f] leading-[1.06]">
                  Know your{' '}
                  <span className="font-serif font-normal italic text-[#0052cc]">
                    credit power
                  </span>{' '}
                  before you apply.
                </h1>

                {/* 3 Crisp Visual Trust Badges */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-600">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5">
                    <Lock className="h-3.5 w-3.5 text-[#0052cc]" /> 256-Bit Encrypted
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5">
                    <Zap className="h-3.5 w-3.5 text-[#558b2f]" /> Instant Score Band
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5">
                    <Percent className="h-3.5 w-3.5 text-[#0052cc]" /> Rate Eligibility Preview
                  </span>
                </div>

                {!reportResult ? (
                  <form
                    onSubmit={handleCheckScore}
                    className="rounded-[26px] border border-slate-200 bg-[#f8fafd] p-6 sm:p-8 shadow-sm space-y-5"
                  >
                    {formError && (
                      <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-700">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span>{formError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          Full Name (As per PAN)
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Aarav Sharma"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-[#0a192f] focus:border-[#0052cc] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          PAN Card Number
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={10}
                          placeholder="ABCDE1234F"
                          value={pan}
                          onChange={(e) => setPan(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
                          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold uppercase tracking-wider text-[#0a192f] focus:border-[#0052cc] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          Mobile Number
                        </label>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          placeholder="10-digit mobile number"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-[#0a192f] focus:border-[#0052cc] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          Profile Type
                        </label>
                        <div className="grid grid-cols-2 gap-1.5 rounded-xl bg-slate-200/80 p-1">
                          {(['salaried', 'self-employed'] as const).map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setEmploymentType(type)}
                              className={`rounded-lg py-2.5 text-xs font-bold capitalize transition ${
                                employmentType === type
                                  ? 'bg-[#0052cc] text-white shadow-sm'
                                  : 'text-slate-600 hover:text-[#0a192f]'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <label className="flex items-start gap-2.5 text-xs text-slate-500 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        required
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#0052cc] focus:ring-[#0052cc]"
                      />
                      <span>
                        I authorize Saiban Capital Solutions to generate a soft credit readiness
                        summary and share eligible loan offers.
                      </span>
                    </label>

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <button
                        type="submit"
                        disabled={isChecking}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0052cc] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/15 transition hover:bg-[#003d8f] disabled:opacity-60 cursor-pointer"
                      >
                        {isChecking ? (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            <span>Analyzing Credit Profile...</span>
                          </>
                        ) : (
                          <>
                            <span>Get Free Credit Summary</span>
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>

                      <a
                        href="/calculator"
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-[#0a192f] hover:bg-slate-50 transition"
                      >
                        <Calculator className="h-4 w-4 text-[#0052cc]" />
                        <span>EMI Calculator</span>
                      </a>
                    </div>
                  </form>
                ) : (
                  /* Instant Visual Report Result Card */
                  <div className="rounded-[26px] border-2 border-[#0052cc] bg-gradient-to-br from-blue-50/70 via-white to-emerald-50/40 p-6 sm:p-8 space-y-5 shadow-md">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          Credit Readiness Report · {fullName} ({pan})
                        </p>
                        <div className="mt-1 flex items-center gap-3">
                          <span className="text-4xl font-extrabold text-[#0a192f]">
                            {reportResult.score}
                          </span>
                          <span className="rounded-full bg-[#f4faef] border border-emerald-200 px-3 py-1 text-xs font-extrabold text-[#558b2f]">
                            {reportResult.band}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setReportResult(null)}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-[#0052cc] hover:bg-slate-50"
                      >
                        Check another PAN
                      </button>
                    </div>

                    <p className="text-sm leading-relaxed text-slate-700">{reportResult.summary}</p>

                    {/* Unlocked Benefits Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {reportResult.unlocks.map((item) => (
                        <div
                          key={item}
                          className="rounded-xl border border-blue-100 bg-white p-3 text-xs font-semibold text-[#0a192f] flex items-start gap-2"
                        >
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#558b2f] mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <a
                        href="/apply"
                        className="inline-flex items-center gap-2 rounded-xl bg-[#0052cc] px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-[#003d8f] transition"
                      >
                        <span>Unlock Pre-Qualified Offers</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                      <a
                        href="/calculator"
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-[#0a192f] hover:border-[#0052cc] hover:text-[#0052cc] transition"
                      >
                        <Calculator className="h-4 w-4 text-[#0052cc]" />
                        <span>Calculate EMI</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Right 5 Cols: Live 3D Credit Speedometer Gauge */}
              <div className="lg:col-span-5">
                <div className="rounded-[30px] bg-gradient-to-br from-[#07172d] via-[#0a192f] to-[#103767] p-7 sm:p-9 text-white shadow-2xl border border-white/10">
                  <div className="flex items-center justify-between mb-5">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-sky-300">
                      <Gauge className="h-3.5 w-3.5" />
                      <span>Live CIBIL Gauge</span>
                    </span>
                    <span className="text-xs font-mono text-slate-400">300 – 900 Scale</span>
                  </div>

                  {/* Semi-Circular Speedometer SVG */}
                  <div className="relative mx-auto w-full max-w-[300px] pt-2 pb-3">
                    <svg viewBox="0 0 260 150" className="w-full overflow-visible">
                      {/* Poor (300-649) */}
                      <path
                        d="M 20 130 A 110 110 0 0 1 65 42"
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth="18"
                        strokeLinecap="round"
                      />
                      {/* Average (650-749) */}
                      <path
                        d="M 78 34 A 110 110 0 0 1 182 34"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="18"
                        strokeLinecap="round"
                      />
                      {/* Prime/Excellent (750-900) */}
                      <path
                        d="M 195 42 A 110 110 0 0 1 240 130"
                        fill="none"
                        stroke="#8ec843"
                        strokeWidth="18"
                        strokeLinecap="round"
                      />

                      {/* Animated Needle */}
                      <g
                        style={{
                          transform: `rotate(${needleAngle}deg)`,
                          transformOrigin: '130px 130px',
                          transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                      >
                        <polygon points="126,130 130,34 134,130" fill="#ffffff" />
                        <circle
                          cx="130"
                          cy="130"
                          r="10"
                          fill="#38bdf8"
                          stroke="#0a192f"
                          strokeWidth="3"
                        />
                      </g>
                    </svg>

                    <div className="text-center -mt-2">
                      <p className="text-5xl font-extrabold tracking-tight text-white">
                        {activeScore}
                      </p>
                      <p className="text-xs font-extrabold uppercase tracking-widest text-[#8ec843] mt-1.5">
                        {reportResult
                          ? reportResult.band
                          : activeScore >= 750
                          ? 'Prime Approval Zone'
                          : activeScore >= 680
                          ? 'Good Eligibility Zone'
                          : 'Needs Score Boost'}
                      </p>
                    </div>
                  </div>

                  {/* Score Band Legend */}
                  <div className="mt-6 grid grid-cols-3 gap-2 border-t border-white/10 pt-5 text-center text-xs">
                    <div className="rounded-xl bg-white/[0.06] p-2.5">
                      <span className="block font-extrabold text-rose-400">300–649</span>
                      <span className="text-[11px] text-slate-300">Needs Work</span>
                    </div>
                    <div className="rounded-xl bg-white/[0.06] p-2.5">
                      <span className="block font-extrabold text-amber-300">650–749</span>
                      <span className="text-[11px] text-slate-300">Fair / Good</span>
                    </div>
                    <div className="rounded-xl bg-white/[0.06] p-2.5 border border-[#8ec843]/30">
                      <span className="block font-extrabold text-[#8ec843]">750–900</span>
                      <span className="text-[11px] text-slate-200">Lowest ROI</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 2. INTERACTIVE SCORE-TO-INTEREST SAVINGS SIMULATOR ==================== */}
        <section className="py-16 lg:py-24 bg-[#f4f8ff] border-b border-blue-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[30px] border border-blue-100 bg-white p-6 sm:p-10 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-100">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0052cc]">
                    <Sparkles className="h-3.5 w-3.5" /> Interactive Score Impact
                  </span>
                  <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#0a192f]">
                    See how a higher CIBIL score{' '}
                    <span className="font-serif font-normal italic text-[#0052cc]">
                      slashes your loan interest
                    </span>
                  </h2>
                </div>

                {/* Loan Category Switcher */}
                <div className="inline-flex rounded-xl bg-slate-100 p-1 w-fit">
                  {[
                    { id: 'home', label: 'Home Loan (₹50L)' },
                    { id: 'personal', label: 'Personal Loan (₹8L)' },
                    { id: 'business', label: 'Business Loan (₹25L)' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setLoanCategory(tab.id as 'home' | 'personal' | 'business')}
                      className={`rounded-lg px-3.5 py-2 text-xs font-bold transition ${
                        loanCategory === tab.id
                          ? 'bg-[#0052cc] text-white shadow-sm'
                          : 'text-slate-600 hover:text-[#0a192f]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left 6 Cols: Score Slider */}
                <div className="lg:col-span-6 space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Drag to simulate CIBIL Score
                    </span>
                    <span className="rounded-xl bg-[#0a192f] px-3.5 py-1.5 text-lg font-extrabold text-[#8ec843]">
                      {simulatedScore}
                    </span>
                  </div>

                  <input
                    type="range"
                    min={600}
                    max={850}
                    step={5}
                    value={simulatedScore}
                    onChange={(e) => setSimulatedScore(Number(e.target.value))}
                    aria-label="Simulate CIBIL Score"
                    className="w-full accent-[#0052cc] cursor-pointer h-2.5 rounded-lg bg-slate-200"
                  />

                  <div className="flex justify-between text-[11px] font-bold text-slate-400">
                    <span>600 (Sub-Prime)</span>
                    <span>725 (Good)</span>
                    <span>780+ (Prime)</span>
                    <span>850 (Elite)</span>
                  </div>

                  {/* Quick Preset Buttons */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      { label: '640 Score', val: 640 },
                      { label: '720 Score', val: 720 },
                      { label: '760 Score', val: 760 },
                      { label: '800+ Prime', val: 805 },
                    ].map((preset) => (
                      <button
                        key={preset.val}
                        type="button"
                        onClick={() => setSimulatedScore(preset.val)}
                        className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition ${
                          simulatedScore === preset.val
                            ? 'border-[#0052cc] bg-blue-50 text-[#0052cc]'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right 6 Cols: Visual Savings Cards */}
                <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-[11px] font-bold text-slate-400">Indicative APR</p>
                    <p className="mt-1 text-2xl font-extrabold text-[#0052cc]">
                      {currentTier.rate.toFixed(2)}%
                    </p>
                    <span className="mt-2 inline-block rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-bold text-[#0052cc]">
                      {currentTier.tier}
                    </span>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-[11px] font-bold text-slate-400">Estimated EMI</p>
                    <p className="mt-1 text-2xl font-extrabold text-[#0a192f]">
                      {formatINR(currentEmi)}
                    </p>
                    <span className="mt-2 inline-block text-[11px] font-medium text-slate-500">
                      For {currentTier.months} months
                    </span>
                  </div>

                  <div className="rounded-2xl bg-[#0a192f] p-5 text-white">
                    <p className="text-[11px] font-bold text-sky-300">Interest Saved*</p>
                    <p className="mt-1 text-2xl font-extrabold text-[#8ec843]">
                      {formatINR(totalInterestSaved)}
                    </p>
                    <span className="mt-2 inline-block text-[10px] text-slate-300">
                      vs. 640 score slab
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 3. VISUAL 4-PILLAR WEIGHTAGE GRID ==================== */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0052cc]">
                  Behind the Algorithm
                </span>
                <h2 className="mt-1.5 text-3xl sm:text-4xl font-bold tracking-tight text-[#0a192f]">
                  4 pillars that shape{' '}
                  <span className="font-serif font-normal italic text-[#0052cc]">
                    your credit score
                  </span>
                </h2>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                Approximate bureau scoring weightage
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillars.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-[24px] border border-slate-200 bg-[#fcfcfd] p-6 flex flex-col justify-between hover:border-blue-300 hover:shadow-md transition"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0052cc]">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="rounded-full bg-[#f4faef] px-3 py-1 text-[11px] font-extrabold text-[#558b2f]">
                          {item.tag}
                        </span>
                      </div>

                      <div className="flex items-baseline justify-between">
                        <h3 className="text-base font-bold text-[#0a192f]">{item.title}</h3>
                        <span className="text-lg font-extrabold text-[#0052cc]">
                          {item.weight}%
                        </span>
                      </div>

                      {/* Graphical Weightage Progress Bar */}
                      <div className="mt-3 h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                        <div
                          style={{ width: `${item.weight * 2.4}%` }}
                          className="h-full rounded-full bg-gradient-to-r from-[#0052cc] to-[#8ec843]"
                        />
                      </div>

                      <p className="mt-4 text-xs leading-relaxed text-slate-500">{item.tip}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================== 4. 30–60–90 DAY SCORE BOOSTER ROADMAP ==================== */}
        <section className="py-16 lg:py-24 bg-[#0a192f] text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#8ec843]">
                  Actionable Playbook
                </span>
                <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
                  Boost your score in{' '}
                  <span className="font-serif font-normal italic text-sky-300">
                    30 · 60 · 90 days
                  </span>
                </h2>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[#8ec843] px-5 py-3 text-xs font-extrabold text-[#0a192f] w-fit hover:opacity-95"
              >
                Free Credit Consultation <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  phase: 'DAY 1 – 30',
                  title: 'Drop Card Utilization < 30%',
                  points: [
                    'Pay down revolving credit card balances before statement generation',
                    'Dispute any incorrect late-payment or closed-loan flags on your report',
                  ],
                },
                {
                  phase: 'DAY 31 – 60',
                  title: 'Pause Hard Loan Inquiries',
                  points: [
                    'Avoid submitting multiple parallel loan applications across banks',
                    'Enable e-NACH auto-debit so zero EMIs ever slip past due date',
                  ],
                },
                {
                  phase: 'DAY 61 – 90',
                  title: 'Consolidate & Unlock Prime ROI',
                  points: [
                    'Replace high-APR card debt with a single fixed-EMI personal loan',
                    'Re-check score to unlock lower repo-linked Home & Business rates',
                  ],
                },
              ].map((step) => (
                <div
                  key={step.phase}
                  className="rounded-[24px] border border-white/15 bg-white/[0.05] p-7 backdrop-blur-sm"
                >
                  <span className="inline-block rounded-full bg-[#0052cc] px-3 py-1 text-[10px] font-extrabold tracking-wider text-white">
                    {step.phase}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-white">{step.title}</h3>
                  <ul className="mt-4 space-y-3 text-xs text-slate-300">
                    {step.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#8ec843] mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 5. COMPACT FAQs & FINAL CTA ==================== */}
        <section className="py-16 lg:py-20 bg-[#f8f9fc]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight text-[#0a192f] mb-8">
              CIBIL &amp; Credit Score FAQs
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
                  Ready to match your score with{' '}
                  <span className="font-serif font-normal italic text-[#8ec843]">
                    the right lender?
                  </span>
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-sky-100">
                  Home Loans · Personal Loans · Business Capital across 25+ banks
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <a
                  href="/apply"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#8ec843] px-5 py-3 text-sm font-extrabold text-[#0a192f] hover:opacity-95"
                >
                  Explore Offers <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/20"
                >
                  Talk to Advisor
                </a>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-500">
              <AlertCircle className="h-4 w-4 shrink-0 text-[#0052cc] mt-0.5" />
              <p>
                *The score preview and interest-rate slabs shown on this page are illustrative
                educational estimates. Official bureau pulls and final interest rate sanctions are
                determined directly by the lending institution upon formal application.
              </p>
            </div>
          </div>
        </section>
      </div>
    </InteriorPage>
  );
}