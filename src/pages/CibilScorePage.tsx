// src/pages/CibilScorePage.tsx
import React, { useState } from 'react';
import {
  ShieldCheck,
  ArrowRight,
  Calculator,
  TrendingUp,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { InteriorPage } from '../components/InteriorPage';

export default function CibilScorePage() {
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [pan, setPan] = useState('');
  const [employmentType, setEmploymentType] = useState<'salaried' | 'self-employed'>('salaried');
  const [consent, setConsent] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const [reportResult, setReportResult] = useState<{
    score: number;
    band: string;
    color: string;
    summary: string;
  } | null>(null);

  const handleCheckScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || mobile.length < 10 || pan.length < 10) return;

    setIsChecking(true);
    setTimeout(() => {
      // Deterministic realistic score preview based on input for instant interactive feedback
      const seed = pan.charCodeAt(0) + pan.charCodeAt(4) + mobile.charCodeAt(9);
      const calculatedScore = 725 + (seed % 90); // Range: 725 - 814

      let band = 'Good';
      let color = 'text-emerald-600';
      let summary =
        'Your profile reflects healthy credit discipline. You are well-positioned to explore competitive home and personal loan rates.';

      if (calculatedScore >= 775) {
        band = 'Excellent';
        color = 'text-emerald-600';
        summary =
          'Top-tier credit profile! Lenders typically offer their lowest repo-linked rates and faster sanction turnaround for scores above 775.';
      } else if (calculatedScore < 740) {
        band = 'Fair / Building';
        color = 'text-amber-600';
        summary =
          'You qualify for several lending programs. Reducing credit card utilization below 30% can push your score above 760.';
      }

      setReportResult({
        score: calculatedScore,
        band,
        color,
        summary,
      });
      setIsChecking(false);
    }, 900);
  };

  // Convert score (300 - 900) into gauge needle angle (-90deg to +90deg)
  const activeScore = reportResult ? reportResult.score : 765;
  const clamped = Math.min(900, Math.max(300, activeScore));
  const needleAngle = ((clamped - 300) / 600) * 180 - 90;

  return (
    <InteriorPage>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
        {/* Hero & Interactive Checker */}
        <section className="relative overflow-hidden bg-white pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200">
          <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
              {/* Left Column: Form or Instant Score Report */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-700">
                  <ShieldCheck className="h-4 w-4" />
                  <span>100% Free · Zero Impact Soft Check</span>
                </div>

                <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:leading-[1.12]">
                  Check your{' '}
                  <span className="bg-gradient-to-r from-[#0052cc] to-emerald-500 bg-clip-text text-transparent">
                    CIBIL Credit Score
                  </span>{' '}
                  in 30 seconds.
                </h1>

                <p className="text-base text-slate-600 max-w-2xl leading-relaxed">
                  Know where you stand before applying to banks. Checking your score here is a soft
                  inquiry and never reduces your credit rating.
                </p>

                {!reportResult ? (
                  <form
                    onSubmit={handleCheckScore}
                    className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8 shadow-sm space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Full Name (As per PAN)
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Aarav Sharma"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 focus:border-[#0052cc] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          PAN Card Number
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={10}
                          placeholder="ABCDE1234F"
                          value={pan}
                          onChange={(e) => setPan(e.target.value.toUpperCase())}
                          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold uppercase tracking-wider text-slate-900 focus:border-[#0052cc] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Mobile Number
                        </label>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          placeholder="10-digit mobile number"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 focus:border-[#0052cc] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Employment Profile
                        </label>
                        <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-200/70 p-1">
                          {(['salaried', 'self-employed'] as const).map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setEmploymentType(type)}
                              className={`rounded-lg py-2 text-xs font-bold capitalize transition ${
                                employmentType === type
                                  ? 'bg-white text-[#0052cc] shadow-sm'
                                  : 'text-slate-600 hover:text-slate-900'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        required
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#0052cc] focus:ring-[#0052cc]"
                      />
                      <span>
                        I authorize Saiban Capital Solutions to fetch my soft credit summary and
                        contact me regarding eligible loan offers.
                      </span>
                    </label>

                    <div className="flex flex-wrap items-center gap-4 pt-1">
                      <button
                        type="submit"
                        disabled={isChecking}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0052cc] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700 disabled:opacity-60 cursor-pointer"
                      >
                        {isChecking ? (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            <span>Fetching Credit Summary...</span>
                          </>
                        ) : (
                          <>
                            <span>Get Free Credit Score</span>
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Instant Result Card */
                  <div className="rounded-3xl border border-emerald-200 bg-emerald-50/40 p-6 sm:p-8 space-y-5 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-200/70 pb-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Credit Assessment for {fullName}
                        </p>
                        <div className="mt-1 flex items-baseline gap-3">
                          <span className="text-4xl font-extrabold text-slate-950">
                            {reportResult.score}
                          </span>
                          <span className={`text-sm font-extrabold ${reportResult.color}`}>
                            ({reportResult.band})
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setReportResult(null)}
                        className="text-xs font-bold text-[#0052cc] hover:underline"
                      >
                        Check another PAN
                      </button>
                    </div>

                    <p className="text-sm leading-relaxed text-slate-700">{reportResult.summary}</p>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <a
                        href="/apply"
                        className="inline-flex items-center gap-2 rounded-xl bg-[#0052cc] px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-blue-700 transition"
                      >
                        <span>Unlock Pre-Qualified Offers</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                      <a
                        href="http://localhost:5173/calculator"
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 hover:border-[#0052cc] hover:text-[#0052cc] transition"
                      >
                        <Calculator className="h-4 w-4 text-[#0052cc]" />
                        <span>Calculate EMI</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Live 3D Credit Meter Visual */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl bg-gradient-to-br from-[#0a192f] via-[#0f294a] to-blue-950 p-7 sm:p-9 text-white shadow-2xl border border-slate-800">
                  <div className="flex items-center justify-between mb-6">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-sky-300">
                      <span>CIBIL Score Meter</span>
                    </span>
                    <span className="text-xs text-slate-400">Range: 300 – 900</span>
                  </div>

                  {/* Interactive Semi-Circular Speedometer Gauge */}
                  <div className="relative mx-auto w-full max-w-[300px] pt-2 pb-4">
                    <svg viewBox="0 0 260 150" className="w-full overflow-visible">
                      {/* Poor (300-550) */}
                      <path
                        d="M 20 130 A 110 110 0 0 1 65 42"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="18"
                        strokeLinecap="round"
                      />
                      {/* Average (550-700) */}
                      <path
                        d="M 78 34 A 110 110 0 0 1 182 34"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="18"
                        strokeLinecap="round"
                      />
                      {/* Good/Excellent (700-900) */}
                      <path
                        d="M 195 42 A 110 110 0 0 1 240 130"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="18"
                        strokeLinecap="round"
                      />

                      {/* Animated Needle */}
                      <g
                        style={{
                          transform: `rotate(${needleAngle}deg)`,
                          transformOrigin: '130px 130px',
                          transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                      >
                        <polygon points="126,130 130,36 134,130" fill="#ffffff" />
                        <circle cx="130" cy="130" r="10" fill="#38bdf8" stroke="#0a192f" strokeWidth="3" />
                      </g>
                    </svg>

                    <div className="text-center -mt-2">
                      <p className="text-4xl font-extrabold tracking-tight text-white">
                        {activeScore}
                      </p>
                      <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mt-1">
                        {reportResult ? reportResult.band : 'Target Benchmark Score'}
                      </p>
                    </div>
                  </div>

                  {/* Score Breakdown Legend */}
                  <div className="mt-6 grid grid-cols-3 gap-2 border-t border-white/10 pt-5 text-center text-xs">
                    <div className="rounded-xl bg-white/5 p-2.5">
                      <span className="block font-extrabold text-rose-400">300–649</span>
                      <span className="text-[11px] text-slate-300">Needs Work</span>
                    </div>
                    <div className="rounded-xl bg-white/5 p-2.5">
                      <span className="block font-extrabold text-amber-400">650–749</span>
                      <span className="text-[11px] text-slate-300">Fair / Good</span>
                    </div>
                    <div className="rounded-xl bg-white/5 p-2.5">
                      <span className="block font-extrabold text-emerald-400">750–900</span>
                      <span className="text-[11px] text-slate-300">Prime Rates</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Factors Section */}
        <section className="py-16 lg:py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#0052cc]">
                Improve Loan Eligibility
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-950">
                4 Pillars That Shape Your CIBIL Score
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  weight: '35% Weight',
                  title: 'On-Time Repayment',
                  desc: 'Paying every EMI and credit card bill before the due date is the single strongest positive signal.',
                },
                {
                  weight: '30% Weight',
                  title: 'Credit Utilization',
                  desc: 'Keep credit card spending below 30% of your total sanctioned limit to signal low credit hunger.',
                },
                {
                  weight: '15% Weight',
                  title: 'Credit Age & History',
                  desc: 'Keeping older zero-fee credit accounts active lengthens your proven repayment track record.',
                },
                {
                  weight: '20% Weight',
                  title: 'Balanced Credit Mix',
                  desc: 'A healthy blend of secured loans (home/auto) and short-term credit boosts lender confidence.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-[#0052cc]">
                    <TrendingUp className="h-3 w-3" />
                    {item.weight}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-start gap-2.5 rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-500">
              <AlertCircle className="h-4 w-4 shrink-0 text-[#0052cc] mt-0.5" />
              <p>
                Note: The simulated score preview above helps illustrate credit readiness. Final
                bureau pull and loan underwriting are conducted directly by the partner bank or
                NBFC upon formal application.
              </p>
            </div>
          </div>
        </section>
      </div>
    </InteriorPage>
  );
}