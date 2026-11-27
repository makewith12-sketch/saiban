// src/pages/BusinessEligibilityCheck.tsx
import { useState, useMemo } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import {
  CheckCircle2,
  ShieldCheck,
  Calculator,
  ChevronDown,
  ArrowRight,
  Phone,
  Building2,
  RefreshCw,
  Cog,
  FileSpreadsheet,
  Network,
  AlertCircle,
  Lock,
} from 'lucide-react';

const FAQS = [
  {
    question: 'Does checking my business loan eligibility impact my CIBIL score?',
    answer:
      'No. Our interactive eligibility check uses soft underwriting rules and does not trigger a hard CIBIL inquiry. Your credit score remains 100% unaffected.',
  },
  {
    question: 'How do Indian banks and NBFCs calculate maximum loan eligibility?',
    answer:
      'Lenders combine three benchmarks: (1) Turnover Method (20%–25% of annual GST turnover); (2) DSCR/FOIR (ensuring total monthly EMIs stay within 50%–65% of net monthly cash surplus); and (3) Collateral LTV (up to 70% of property or 85%–90% of machinery/invoice value).',
  },
  {
    question: 'Which loan is best if I have strong GST turnover but no property collateral?',
    answer:
      'You can qualify for Unsecured Working Capital / Dropline OD (up to ₹75 Lakhs), B2B Invoice Discounting (up to 90% of corporate receivables), Supply Chain Finance, or Machinery Finance.',
  },
  {
    question: 'What is the minimum CIBIL score needed for MSME loan approval?',
    answer:
      'Unsecured working capital lines generally require 675+, while collateral-backed or invoice-backed facilities allow approvals starting from a 650+ CIBIL score.',
  },
];

export default function BusinessEligibilityCheck() {
  const [businessVintage, setBusinessVintage] = useState(3);
  const [annualTurnover, setAnnualTurnover] = useState(15000000);
  const [monthlyExistingEmi, setMonthlyExistingEmi] = useState(45000);
  const [cibilScore, setCibilScore] = useState(725);
  const [collateralType, setCollateralType] = useState<
    'none' | 'property' | 'machinery' | 'b2b_invoices'
  >('none');
  const [collateralValue, setCollateralValue] = useState(5000000);

  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [reportUnlocked, setReportUnlocked] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const formatINR = (val: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);

  const assessment = useMemo(() => {
    const turnoverCap = Math.round(annualTurnover * 0.22);
    const estimatedMonthlyCashflow = (annualTurnover / 12) * 0.12;
    const maxAffordableMonthlyEmi = Math.max(
      estimatedMonthlyCashflow * 0.6 - monthlyExistingEmi,
      0
    );
    const dscrCap = Math.round(maxAffordableMonthlyEmi * 37);

    let ltvCap = 0;
    if (collateralType === 'property') ltvCap = Math.round(collateralValue * 0.7);
    if (collateralType === 'machinery') ltvCap = Math.round(collateralValue * 0.85);
    if (collateralType === 'b2b_invoices') ltvCap = Math.round(collateralValue * 0.85);

    const scoreMultiplier =
      cibilScore < 650 ? 0.45 : cibilScore < 685 ? 0.75 : cibilScore >= 750 ? 1.15 : 1.0;
    const vintageMultiplier = businessVintage < 1 ? 0.4 : businessVintage < 2 ? 0.75 : 1.0;

    const baseUnsecured = Math.min(Math.max(turnoverCap, dscrCap * 0.6), 7500000);
    const rawEligible =
      collateralType === 'none'
        ? baseUnsecured
        : Math.max(baseUnsecured, Math.min(ltvCap, Math.max(turnoverCap * 1.6, ltvCap * 0.9)));

    const finalEligible = Math.min(
      Math.max(Math.round((rawEligible * scoreMultiplier * vintageMultiplier) / 50000) * 50000, 200000),
      100000000
    );

    let approvalOdds = 'High (85%+ Match)';
    let badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    let roiBand = '11.25% – 15.50% p.a.';

    if (businessVintage < 1 || cibilScore < 650) {
      approvalOdds = 'Moderate (Needs Collateral)';
      badgeColor = 'bg-amber-50 text-amber-700 border-amber-200';
      roiBand = '15.50% – 21.00% p.a.';
    } else if (collateralType === 'property' && cibilScore >= 725) {
      approvalOdds = 'Very High (92%+ Match)';
      roiBand = '10.50% – 13.50% p.a.';
    } else if (collateralType === 'b2b_invoices') {
      approvalOdds = 'High (Anchor-Rated)';
      roiBand = '9.50% – 14.50% p.a.';
    }

    const matchedProducts = [
      {
        title: 'Working Capital (OD / CC)',
        href: '/business-loans/working-capital',
        applyHref: '/apply?product=working-capital',
        limit: formatINR(Math.min(finalEligible, 50000000)),
        rate: 'From 10.75% p.a.',
        tat: '3–5 Days',
        recommended: collateralType === 'none',
        icon: RefreshCw,
      },
      {
        title: 'Secured Term Loan',
        href: '/business-loans/secured-term-loan',
        applyHref: '/apply?product=secured-term-loan',
        limit: formatINR(
          collateralType === 'property'
            ? Math.min(Math.max(ltvCap, 500000), 50000000)
            : Math.min(finalEligible, 50000000)
        ),
        rate: 'From 10.50% p.a.',
        tat: '7 Days',
        recommended: collateralType === 'property',
        icon: Building2,
      },
      {
        title: 'Invoice Discounting',
        href: '/business-loans/invoice-discounting',
        applyHref: '/apply?product=invoice-discounting',
        limit: formatINR(
          collateralType === 'b2b_invoices'
            ? Math.min(Math.max(ltvCap, 200000), 50000000)
            : Math.min(finalEligible, 30000000)
        ),
        rate: 'From 9.50% p.a.',
        tat: '24–72 Hrs',
        recommended: collateralType === 'b2b_invoices',
        icon: FileSpreadsheet,
      },
      {
        title: 'Machinery & Equipment',
        href: '/business-loans/machinery-equipment',
        applyHref: '/apply?product=machinery-equipment',
        limit: formatINR(
          collateralType === 'machinery'
            ? Math.min(Math.max(ltvCap, 300000), 50000000)
            : Math.min(finalEligible, 50000000)
        ),
        rate: 'From 10.25% p.a.',
        tat: '4–6 Days',
        recommended: collateralType === 'machinery',
        icon: Cog,
      },
      {
        title: 'Supply Chain Finance',
        href: '/business-loans/supply-chain-finance',
        applyHref: '/apply?product=supply-chain-finance',
        limit: formatINR(Math.min(Math.round(annualTurnover * 0.25), 100000000)),
        rate: 'From 9.75% p.a.',
        tat: '24–48 Hrs',
        recommended: false,
        icon: Network,
      },
    ];

    return { finalEligible, approvalOdds, badgeColor, roiBand, matchedProducts };
  }, [
    businessVintage,
    annualTurnover,
    monthlyExistingEmi,
    cibilScore,
    collateralType,
    collateralValue,
  ]);

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim() || !applicantPhone.trim()) return;
    setReportUnlocked(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0a192f] font-sans antialiased">
      <Header />

      <main className="flex-1">
        {/* BAND 1: Hero + Interactive Eligibility Engine */}
        <section
          className="border-b border-slate-200/70 pt-10 pb-16 lg:pt-16 lg:pb-24"
          style={{
            backgroundColor: '#fcfcfd',
            backgroundSize: '36px 36px',
            backgroundImage:
              'linear-gradient(to right, rgba(10, 25, 47, 0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(10, 25, 47, 0.025) 1px, transparent 1px)',
          }}
        >
          <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
            <nav className="flex items-center gap-2.5 text-xs font-semibold text-slate-400 mb-8">
              <a href="/" className="hover:text-[#0052cc]">
                Home
              </a>
              <span>/</span>
              <a href="/business-loans" className="hover:text-[#0052cc]">
                Business Loans
              </a>
              <span>/</span>
              <span className="text-[#0052cc]">Eligibility Check</span>
            </nav>

            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-4 py-1.5 text-xs font-bold text-[#0052cc] mb-5">
                <ShieldCheck className="h-4 w-4" />
                <span>Zero CIBIL Impact • Instant Multi-Lender MSME Match</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-[#0a192f] leading-[1.1]">
                Business Loan <span className="text-[#0052cc]">Eligibility Check</span>
              </h1>
              <p className="mt-4 text-lg text-slate-600 leading-[1.7]">
                Adjust your turnover, vintage, CIBIL score, and collateral details below to
                calculate your maximum sanction limit across{' '}
                <strong className="text-[#0a192f]">30+ RBI-regulated Banks & NBFCs</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Inputs Card (7 cols) */}
              <div className="lg:col-span-7 rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-10 shadow-[0_16px_44px_rgba(10,25,47,0.05)] space-y-7">
                <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                  <div className="flex items-center gap-2.5">
                    <Calculator className="h-5 w-5 text-[#0052cc]" />
                    <h2 className="text-xl font-extrabold text-[#0a192f]">
                      1. Enter Your Business Profile
                    </h2>
                  </div>
                  <span className="text-xs font-semibold text-slate-400">Takes 30 seconds</span>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-slate-600">Business Vintage</span>
                    <span className="text-[#0052cc]">
                      {businessVintage === 10 ? '10+ Years' : `${businessVintage} Years`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    step={1}
                    value={businessVintage}
                    onChange={(e) => setBusinessVintage(Number(e.target.value))}
                    className="w-full accent-[#0052cc] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-slate-600">Annual GST / Gross Turnover</span>
                    <span className="text-[#0a192f]">{formatINR(annualTurnover)}</span>
                  </div>
                  <input
                    type="range"
                    min={1500000}
                    max={250000000}
                    step={500000}
                    value={annualTurnover}
                    onChange={(e) => setAnnualTurnover(Number(e.target.value))}
                    className="w-full accent-[#0052cc] cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between text-sm font-bold mb-2">
                      <span className="text-slate-600">Existing Monthly EMIs</span>
                      <span className="text-[#0a192f]">{formatINR(monthlyExistingEmi)}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={1000000}
                      step={5000}
                      value={monthlyExistingEmi}
                      onChange={(e) => setMonthlyExistingEmi(Number(e.target.value))}
                      className="w-full accent-[#0052cc] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm font-bold mb-2">
                      <span className="text-slate-600">Promoter CIBIL Score</span>
                      <span className="text-[#0052cc]">{cibilScore}</span>
                    </div>
                    <input
                      type="range"
                      min={600}
                      max={850}
                      step={5}
                      value={cibilScore}
                      onChange={(e) => setCibilScore(Number(e.target.value))}
                      className="w-full accent-[#0052cc] cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Collateral / Asset Available
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'none', label: 'No Collateral' },
                      { id: 'property', label: 'Property / FD' },
                      { id: 'machinery', label: 'New Machinery' },
                      { id: 'b2b_invoices', label: 'B2B Invoices' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setCollateralType(
                            opt.id as 'none' | 'property' | 'machinery' | 'b2b_invoices'
                          )
                        }
                        className={`rounded-xl border px-3.5 py-3 text-xs font-bold transition-all cursor-pointer ${
                          collateralType === opt.id
                            ? 'border-[#0052cc] bg-[#0052cc] text-white shadow-sm'
                            : 'border-slate-200 bg-slate-50/70 text-[#0a192f] hover:border-blue-300'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {collateralType !== 'none' && (
                  <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-5">
                    <div className="flex justify-between text-sm font-bold mb-2">
                      <span className="text-slate-700">
                        {collateralType === 'property'
                          ? 'Estimated Property / FD Value'
                          : collateralType === 'machinery'
                            ? 'Machine Proforma Invoice Cost'
                            : 'Unpaid B2B Corporate Invoices Value'}
                      </span>
                      <span className="text-[#0052cc]">{formatINR(collateralValue)}</span>
                    </div>
                    <input
                      type="range"
                      min={500000}
                      max={100000000}
                      step={500000}
                      value={collateralValue}
                      onChange={(e) => setCollateralValue(Number(e.target.value))}
                      className="w-full accent-[#0052cc] cursor-pointer"
                    />
                  </div>
                )}
              </div>

              {/* Live Result Card (5 cols) */}
              <div className="lg:col-span-5 lg:sticky lg:top-24">
                <div className="rounded-3xl bg-[#0a192f] text-white p-7 sm:p-9 shadow-[0_20px_50px_rgba(10,25,47,0.16)] space-y-6">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-300">
                      Sanction Limit
                    </span>
                    <span
                      className={`rounded-full border px-3 py-1 text-[11px] font-bold ${assessment.badgeColor}`}
                    >
                      {assessment.approvalOdds}
                    </span>
                  </div>

                  <div>
                    <p className="text-4xl sm:text-[42px] font-extrabold tracking-tight">
                      Up to {formatINR(assessment.finalEligible)}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 rounded-2xl bg-white/5 border border-white/10 p-4 text-xs">
                    <div>
                      <p className="text-slate-400">Interest Band</p>
                      <p className="font-bold text-emerald-400 mt-1 text-sm">
                        {assessment.roiBand}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-400">Matched Lenders</p>
                      <p className="font-bold text-white mt-1 text-sm">14+ Banks & NBFCs</p>
                    </div>
                  </div>

                  {cibilScore < 650 && (
                    <div className="flex items-start gap-2.5 rounded-xl bg-amber-500/15 border border-amber-400/30 p-3.5 text-xs text-amber-200 leading-relaxed">
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-amber-300" />
                      <span>
                        Adding property collateral or a co-applicant with 700+ CIBIL significantly
                        boosts approval odds below 650 CIBIL.
                      </span>
                    </div>
                  )}

                  {!reportUnlocked ? (
                    <form
                      onSubmit={handleUnlockSubmit}
                      className="pt-5 border-t border-slate-700/80 space-y-3.5"
                    >
                      <p className="text-xs font-bold text-blue-200 flex items-center gap-1.5">
                        <Lock className="h-3.5 w-3.5" />
                        Get exact lender-wise quotes on WhatsApp & Call:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Your Name *"
                          value={applicantName}
                          onChange={(e) => setApplicantName(e.target.value)}
                          className="rounded-xl bg-white/10 border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-400 focus:border-blue-400 focus:outline-none"
                        />
                        <input
                          type="tel"
                          required
                          placeholder="Mobile Number *"
                          value={applicantPhone}
                          onChange={(e) => setApplicantPhone(e.target.value)}
                          className="rounded-xl bg-white/10 border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-400 focus:border-blue-400 focus:outline-none"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Business / GST Legal Name (Optional)"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full rounded-xl bg-white/10 border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-400 focus:border-blue-400 focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0052cc] hover:bg-[#0065ff] py-3.5 text-sm font-bold text-white transition-colors cursor-pointer"
                      >
                        <span>Unlock Personalized Offers</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </form>
                  ) : (
                    <div className="pt-5 border-t border-slate-700/80 space-y-3.5">
                      <div className="rounded-xl bg-emerald-500/15 border border-emerald-400/30 p-3.5 text-xs text-emerald-200 flex items-center gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span>
                          Unlocked for <strong>{applicantName}</strong>! Matched lender offers
                          will be shared on {applicantPhone}.
                        </span>
                      </div>
                      <a
                        href="/apply"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0052cc] hover:bg-[#0065ff] py-3.5 text-sm font-bold text-white transition-colors"
                      >
                        <span>Proceed to Full Application</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-center gap-2 text-xs text-slate-400">
                    <Phone className="h-3.5 w-3.5 text-blue-400" />
                    <span>Instant Desk:</span>
                    <a href="tel:+918127727747" className="text-white font-bold hover:underline">
                      +91 8127727747
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BAND 2: Recommended Facilities (Spacious White Section) */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 space-y-20">
            <div>
              <div className="max-w-2xl mb-10">
                <span className="text-xs font-bold uppercase tracking-widest text-[#0052cc]">
                  Tailored Matches
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a192f] mt-2">
                  Recommended facilities for your profile
                </h2>
                <p className="text-base text-slate-600 mt-2">
                  Compare eligible business loan structures based on your live inputs above:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {assessment.matchedProducts.map((prod) => {
                  const Icon = prod.icon;
                  return (
                    <div
                      key={prod.title}
                      className={`rounded-2xl border bg-white p-7 flex flex-col justify-between transition-all ${
                        prod.recommended
                          ? 'border-[#0052cc] ring-2 ring-blue-100 shadow-[0_14px_36px_rgba(0,82,204,0.08)]'
                          : 'border-slate-200/90 hover:border-blue-200'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-5">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0052cc]">
                            <Icon className="h-5 w-5" />
                          </div>
                          {prod.recommended && (
                            <span className="rounded-full bg-[#0052cc] px-3 py-1 text-xs font-bold text-white">
                              Best Match
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-extrabold text-[#0a192f]">{prod.title}</h3>

                        <dl className="mt-4 space-y-2.5 text-sm border-t border-slate-100 pt-4">
                          <div className="flex justify-between">
                            <dt className="text-slate-500">Estimated Limit</dt>
                            <dd className="font-extrabold text-[#0a192f]">{prod.limit}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-slate-500">Interest Rate</dt>
                            <dd className="font-bold text-[#0052cc]">{prod.rate}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-slate-500">Disbursal Speed</dt>
                            <dd className="font-bold text-emerald-600">{prod.tat}</dd>
                          </div>
                        </dl>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                        <a
                          href={prod.applyHref}
                          className="flex-1 text-center rounded-xl bg-[#0052cc] hover:bg-[#003d8f] py-2.5 text-xs font-bold text-white transition-colors"
                        >
                          Apply Now
                        </a>
                        <a
                          href={prod.href}
                          className="rounded-xl border border-slate-200 hover:border-[#0052cc] px-4 py-2.5 text-xs font-bold text-[#0a192f] hover:text-[#0052cc] transition-colors"
                        >
                          Details
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* FAQs */}
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0052cc]">
                Underwriting Rules
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a192f] mt-2 mb-6">
                Eligibility & CIBIL FAQs
              </h2>
              <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white overflow-hidden">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={faq.question}>
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left hover:bg-slate-50/70 transition-colors cursor-pointer"
                      >
                        <span className="text-sm sm:text-base font-bold text-[#0a192f]">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 text-[#0052cc] transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}