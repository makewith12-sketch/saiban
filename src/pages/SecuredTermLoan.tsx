// src/pages/SecuredTermLoan.tsx
import { useState, useMemo, type MouseEvent } from 'react';
import LoanProductLayout from '../components/LoanProductLayout';
import {
  ShieldCheck,
  Building2,
  Layers,
  Briefcase,
  TrendingUp,
  Calculator,
  ArrowRight,
  CheckCircle2,
  Award,
  SlidersHorizontal,
} from 'lucide-react';

/** 1. 4D Dimensional Isometric Collateral Cube & Multi-Axis Orbital Illustration */
function Collateral4DPrismIllustration({ className = 'w-32 h-32' }: { className?: string }) {
  return (
    <div className={`relative select-none ${className}`} aria-hidden="true">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes saiban4dHover {
              0%, 100% { transform: translateY(0px) rotateX(8deg) rotateY(-8deg); }
              50% { transform: translateY(-8px) rotateX(-5deg) rotateY(10deg); }
            }
            @keyframes saiban4dGyroA {
              0% { transform: rotate(-18deg) rotateZ(0deg); }
              100% { transform: rotate(-18deg) rotateZ(360deg); }
            }
            @keyframes saiban4dGyroB {
              0% { transform: rotate(24deg) rotateZ(360deg); }
              100% { transform: rotate(24deg) rotateZ(0deg); }
            }
            .saiban-4d-core {
              animation: saiban4dHover 5.8s ease-in-out infinite;
              transform-style: preserve-3d;
            }
            .saiban-4d-ring-a {
              animation: saiban4dGyroA 18s linear infinite;
              transform-origin: 75px 78px;
            }
            .saiban-4d-ring-b {
              animation: saiban4dGyroB 24s linear infinite;
              transform-origin: 75px 78px;
            }
          `,
        }}
      />
      <svg viewBox="0 0 150 150" fill="none" className="w-full h-full overflow-visible">
        <defs>
          <radialGradient id="saiban4dField" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0052cc" stopOpacity="0.28" />
            <stop offset="65%" stopColor="#38bdf8" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="prismRoof4d" x1="35" y1="30" x2="115" y2="72" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0052cc" />
          </linearGradient>
          <linearGradient id="prismLeft4d" x1="36" y1="54" x2="75" y2="118" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#dbeafe" />
          </linearGradient>
          <linearGradient id="prismRight4d" x1="75" y1="54" x2="114" y2="118" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#0a192f" />
          </linearGradient>
          <linearGradient id="gyroGradA" x1="15" y1="50" x2="135" y2="106" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0052cc" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#2684ff" />
          </linearGradient>
        </defs>

        <circle cx="75" cy="78" r="66" fill="url(#saiban4dField)" />

        <g className="saiban-4d-ring-a">
          <ellipse
            cx="75"
            cy="78"
            rx="64"
            ry="22"
            stroke="url(#gyroGradA)"
            strokeWidth="2.2"
            strokeDasharray="7 4"
          />
          <circle cx="139" cy="78" r="4.5" fill="#10b981" />
          <circle cx="11" cy="78" r="4" fill="#0052cc" />
        </g>

        <g className="saiban-4d-ring-b">
          <ellipse
            cx="75"
            cy="78"
            rx="56"
            ry="18"
            stroke="#38bdf8"
            strokeOpacity="0.45"
            strokeWidth="1.5"
          />
          <circle cx="75" cy="60" r="3.5" fill="#2684ff" />
        </g>

        <g className="saiban-4d-core">
          <ellipse cx="75" cy="127" rx="38" ry="10" fill="#0a192f" opacity="0.15" />
          <path d="M38 56L75 75V117L38 98V56Z" fill="url(#prismLeft4d)" />
          <path d="M112 56L75 75V117L112 98V56Z" fill="url(#prismRight4d)" />
          <path d="M75 33L116 54.5L75 76L34 54.5L75 33Z" fill="url(#prismRoof4d)" />
          <path d="M75 39L105 54.5L75 70L45 54.5L75 39Z" fill="#bae6fd" opacity="0.35" />

          <path d="M46 68L56 73V83L46 78V68Z" fill="#0052cc" opacity="0.88" />
          <path d="M60 75L69 79.5V89.5L60 85V75Z" fill="#2684ff" opacity="0.92" />
          <path d="M46 84L56 89V99L46 94V84Z" fill="#38bdf8" opacity="0.82" />
          <path d="M60 91L69 95.5V105.5L60 101V91Z" fill="#0052cc" opacity="0.72" />

          <path d="M82 79.5L91 75V85L82 89.5V79.5Z" fill="#38bdf8" opacity="0.7" />
          <path d="M95 73L104 68.5V78.5L95 83V73Z" fill="#60a5fa" opacity="0.58" />
          <path d="M82 95.5L91 91V101L82 105.5V95.5Z" fill="#10b981" opacity="0.9" />

          <rect x="93" y="24" width="31" height="31" rx="9" fill="#059669" />
          <rect x="90" y="21" width="31" height="31" rx="9" fill="#10b981" />
          <path
            d="M100 37L105 42L114 31"
            stroke="#ffffff"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
}

/** 2. 3D Extruded Isometric Capital Growth Pillars & Floating Rupee Coin */
function Liquidity3DStepsIllustration({ className = 'w-16 h-16' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="isoColA" x1="18" y1="62" x2="42" y2="102" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="isoColB" x1="48" y1="42" x2="72" y2="102" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0052cc" />
        </linearGradient>
        <linearGradient id="isoColC" x1="78" y1="22" x2="102" y2="102" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#0a192f" />
        </linearGradient>
      </defs>

      <ellipse cx="60" cy="106" rx="46" ry="9" fill="#cbd5e1" opacity="0.65" />

      <path d="M20 68L31 62L42 68V98L31 104L20 98V68Z" fill="url(#isoColA)" />
      <path d="M20 68L31 62L42 68L31 74L20 68Z" fill="#bfdbfe" />

      <path d="M49 50L60 44L71 50V98L60 104L49 98V50Z" fill="url(#isoColB)" />
      <path d="M49 50L60 44L71 50L60 56L49 50Z" fill="#bae6fd" />

      <path d="M78 30L89 24L100 30V98L89 104L78 98V30Z" fill="url(#isoColC)" />
      <path d="M78 30L89 24L100 30L89 36L78 30Z" fill="#60a5fa" />

      <circle cx="90" cy="14" r="10.5" fill="#b45309" />
      <circle cx="88" cy="13" r="9.5" fill="#fbbf24" />
      <text
        x="88"
        y="17"
        textAnchor="middle"
        fill="#78350f"
        fontSize="11"
        fontWeight="800"
        fontFamily="sans-serif"
      >
        ₹
      </text>
    </svg>
  );
}

/** 3. 3D Layered Security Shield Badge */
function ShieldKey3DIllustration({ className = 'w-11 h-11' }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="shield3dFaceEnh" x1="16" y1="12" x2="64" y2="68" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2684ff" />
          <stop offset="100%" stopColor="#0052cc" />
        </linearGradient>
      </defs>
      <path
        d="M43 13L67 22V41C67 55 56 65 43 70C30 65 19 55 19 41V22L43 13Z"
        fill="#1e3a8a"
      />
      <path
        d="M39 10L63 19V38C63 52 52 62 39 67C26 62 15 52 15 38V19L39 10Z"
        fill="url(#shield3dFaceEnh)"
      />
      <path
        d="M39 16L57 23V38C57 49 49 56 39 60C29 56 21 49 21 38V23L39 16Z"
        fill="#60a5fa"
        opacity="0.22"
      />
      <path
        d="M30 39L36 45L49 31"
        stroke="#34d399"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 4. 3D Isometric Title Deed & Valuation Caliper Illustration */
function TitleDeed3DIllustration({ className = 'w-20 h-20' }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 110" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="deedDoc3d" x1="22" y1="18" x2="82" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dbeafe" />
        </linearGradient>
        <linearGradient id="deedSeal3d" x1="60" y1="54" x2="94" y2="88" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0052cc" />
        </linearGradient>
      </defs>
      {/* Back Extruded Paper Layer */}
      <rect x="28" y="20" width="54" height="68" rx="12" fill="#93c5fd" />
      {/* Front Isometric Card */}
      <rect x="22" y="14" width="54" height="68" rx="12" fill="url(#deedDoc3d)" stroke="#bfdbfe" strokeWidth="1.5" />
      {/* Document Lines */}
      <rect x="32" y="27" width="26" height="5" rx="2.5" fill="#0052cc" />
      <rect x="32" y="38" width="34" height="4" rx="2" fill="#94a3b8" />
      <rect x="32" y="47" width="30" height="4" rx="2" fill="#cbd5e1" />
      <rect x="32" y="56" width="22" height="4" rx="2" fill="#cbd5e1" />
      {/* 3D Floating Valuation Seal */}
      <circle cx="77" cy="73" r="18" fill="#0a192f" />
      <circle cx="74" cy="70" r="18" fill="url(#deedSeal3d)" />
      <path
        d="M67 70L72 75L82 64"
        stroke="#ffffff"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 5. 3D Isometric Multi-Lender Network & Disbursal Vault Illustration */
function DisbursalVault3DIllustration({ className = 'w-20 h-20' }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 110" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="vaultCubeTop" x1="25" y1="22" x2="85" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#0052cc" />
        </linearGradient>
        <linearGradient id="vaultCubeRight" x1="55" y1="44" x2="88" y2="88" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#0a192f" />
        </linearGradient>
      </defs>
      {/* 3D Isometric Vault Box */}
      <path d="M24 44L55 60V92L24 76V44Z" fill="#e2e8f0" />
      <path d="M86 44L55 60V92L86 76V44Z" fill="url(#vaultCubeRight)" />
      <path d="M55 26L88 43L55 60L22 43L55 26Z" fill="url(#vaultCubeTop)" />
      {/* 3D Vault Dial on Left Face */}
      <circle cx="40" cy="67" r="8.5" fill="#0052cc" />
      <circle cx="40" cy="67" r="4" fill="#ffffff" />
      {/* Floating Emerald Speed Pill */}
      <rect x="58" y="16" width="38" height="20" rx="10" fill="#059669" />
      <rect x="56" y="14" width="38" height="20" rx="10" fill="#10b981" />
      <text
        x="75"
        y="27.5"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="10"
        fontWeight="800"
        fontFamily="sans-serif"
      >
        7 DAYS
      </text>
    </svg>
  );
}

const LOAN_PRESETS = [
  { label: '₹15 Lakhs', amount: 1500000, property: 2500000 },
  { label: '₹25 Lakhs', amount: 2500000, property: 4500000 },
  { label: '₹50 Lakhs', amount: 5000000, property: 8000000 },
  { label: '₹1 Crore', amount: 10000000, property: 16000000 },
];

export default function SecuredTermLoan() {
  const [loanAmount, setLoanAmount] = useState(2500000);
  const [interestRate, setInterestRate] = useState(13.5);
  const [tenureMonths, setTenureMonths] = useState(60);
  const [propertyValue, setPropertyValue] = useState(4500000);
  const [cardTilt, setCardTilt] = useState({ rotateX: 0, rotateY: 0 });

  const formatINR = (val: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);

  const {
    emi,
    totalInterest,
    totalPayable,
    maxEligibleByLtv,
    isLtvEligible,
    principalSharePct,
    currentLtvPct,
  } = useMemo(() => {
    const r = interestRate / 12 / 100;
    const calculatedEmi =
      r === 0
        ? loanAmount / tenureMonths
        : (loanAmount * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1);
    const totalAmt = calculatedEmi * tenureMonths;
    const maxLtv = Math.round(propertyValue * 0.7);
    const principalPct = totalAmt > 0 ? Math.min(100, Math.round((loanAmount / totalAmt) * 100)) : 100;
    const ltvRatio = propertyValue > 0 ? Math.round((loanAmount / propertyValue) * 100) : 0;

    return {
      emi: Math.round(calculatedEmi),
      totalInterest: Math.round(totalAmt - loanAmount),
      totalPayable: Math.round(totalAmt),
      maxEligibleByLtv: maxLtv,
      isLtvEligible: loanAmount <= maxLtv,
      principalSharePct: principalPct,
      currentLtvPct: ltvRatio,
    };
  }, [loanAmount, interestRate, tenureMonths, propertyValue]);

  const handle3DCardMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCardTilt({
      rotateX: Number((-y * 7).toFixed(2)),
      rotateY: Number((x * 7).toFixed(2)),
    });
  };

  const reset3DCardTilt = () => {
    setCardTilt({ rotateX: 0, rotateY: 0 });
  };

  const calculatorUI = (
    <div className="space-y-8">
      {/* Real Human-Clicked MSME Photography + Interactive 4D Dimensional Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Authentic Human-Clicked Commercial Operations Photo */}
        <div className="lg:col-span-7 relative overflow-hidden rounded-3xl border border-slate-200/90 bg-[#0a192f] min-h-[265px] sm:min-h-[295px] shadow-[0_14px_36px_rgba(10,25,47,0.08)] group">
          <img
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=85"
            alt="Business owners reviewing commercial expansion financials on site"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-85 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-[#0a192f]/45 to-transparent" />
          <div className="relative h-full flex flex-col justify-between p-6 sm:p-8 text-white">
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-3.5 py-1 text-xs font-bold">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>Real MSME Growth • 4,200+ Enterprises Funded</span>
            </div>
            <div className="max-w-lg mt-12">
              <p className="text-lg sm:text-xl font-extrabold leading-snug">
                Turn commercial or residential property equity into active business expansion.
              </p>
              <p className="text-xs sm:text-sm text-slate-200 mt-1.5">
                Retain 100% ownership & occupancy of your premises while unlocking up to 70% LTV at
                bank-grade interest rates.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Pointer-Tilt 4D Dimensional Collateral Prism Card */}
        <div
          onMouseMove={handle3DCardMove}
          onMouseLeave={reset3DCardTilt}
          style={{
            transform: `perspective(1000px) rotateX(${cardTilt.rotateX}deg) rotateY(${cardTilt.rotateY}deg)`,
          }}
          className="lg:col-span-5 rounded-3xl border border-blue-100 bg-gradient-to-br from-[#f8fbff] via-white to-blue-50/75 p-6 sm:p-8 flex flex-col justify-between shadow-[0_14px_36px_rgba(0,82,204,0.07)] transition-transform duration-200 ease-out will-change-transform"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-blue-100/80 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#0052cc]">
                <Award className="h-3.5 w-3.5" />
                Asset-Backed Advantage
              </span>
              <h3 className="text-xl font-extrabold text-[#0a192f] mt-2.5">
                Lower EMIs, Larger Ticket Sizes
              </h3>
            </div>
            <Collateral4DPrismIllustration className="w-28 h-28 sm:w-32 sm:h-32 shrink-0 -mt-3 -mr-3" />
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-blue-100/80">
            <div className="rounded-2xl bg-white p-3.5 border border-slate-100 shadow-2xs">
              <p className="text-[11px] font-bold uppercase text-slate-400">Interest Saved</p>
              <p className="text-base sm:text-lg font-extrabold text-emerald-600 mt-0.5">
                Up to 6.5% p.a.
              </p>
              <p className="text-[11px] text-slate-500">vs. unsecured loans</p>
            </div>
            <div className="rounded-2xl bg-white p-3.5 border border-slate-100 shadow-2xs">
              <p className="text-[11px] font-bold uppercase text-slate-400">Max LTV Unlock</p>
              <p className="text-base sm:text-lg font-extrabold text-[#0052cc] mt-0.5">
                Up to 75%
              </p>
              <p className="text-[11px] text-slate-500">of market valuation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional 3D Isometric Feature Strip (Title Valuation + 7-Day Disbursal Vault) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 flex items-center gap-5 shadow-[0_10px_28px_rgba(10,25,47,0.04)] hover:border-blue-200 transition-colors">
          <TitleDeed3DIllustration className="w-20 h-20 shrink-0" />
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0052cc]">
              48-Hour Legal & Technical Appraisal
            </span>
            <h4 className="text-lg font-extrabold text-[#0a192f] mt-0.5">
              Doorstep Property Valuation
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              Certified valuers assess residential, commercial, or industrial titles rapidly so
              your sanction never stalls.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 flex items-center gap-5 shadow-[0_10px_28px_rgba(10,25,47,0.04)] hover:border-blue-200 transition-colors">
          <DisbursalVault3DIllustration className="w-20 h-20 shrink-0" />
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-600">
              30+ RBI-Regulated Lenders
            </span>
            <h4 className="text-lg font-extrabold text-[#0a192f] mt-0.5">
              Direct Bank Account Disbursal
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              One digital file matched across top banks & NBFCs for the lowest rate and 7-day
              payout.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive EMI & LTV Calculator Card */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-10 shadow-[0_16px_44px_rgba(10,25,47,0.05)]">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-7 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <Liquidity3DStepsIllustration className="hidden sm:block w-16 h-16 shrink-0" />
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#0052cc]">
                <Calculator className="h-4 w-4" />
                Interactive Planner
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a192f] mt-1">
                Secured Loan EMI & LTV Calculator
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-4 py-1.5 text-xs font-bold ${
                isLtvEligible
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}
            >
              {isLtvEligible
                ? `LTV ${currentLtvPct}% • Within 70% Cap (${formatINR(maxEligibleByLtv)})`
                : `LTV ${currentLtvPct}% • Exceeds 70% Cap (${formatINR(maxEligibleByLtv)})`}
            </span>
            {!isLtvEligible && (
              <button
                type="button"
                onClick={() => setLoanAmount(Math.max(500000, maxEligibleByLtv))}
                className="rounded-full bg-[#0052cc] hover:bg-[#003d8f] px-3 py-1.5 text-xs font-bold text-white transition-colors cursor-pointer"
              >
                Adjust to {formatINR(maxEligibleByLtv)}
              </button>
            )}
          </div>
        </div>

        {/* Quick Ticket Presets */}
        <div className="flex flex-wrap items-center gap-2 mb-7">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 mr-1">
            <SlidersHorizontal className="h-3.5 w-3.5 text-[#0052cc]" />
            Quick Presets:
          </span>
          {LOAN_PRESETS.map((preset) => {
            const active = loanAmount === preset.amount;
            return (
              <button
                key={preset.label}
                type="button"
                onClick={() => {
                  setLoanAmount(preset.amount);
                  setPropertyValue(preset.property);
                }}
                className={`rounded-full px-3.5 py-1.5 text-xs font-bold border transition-all cursor-pointer ${
                  active
                    ? 'bg-[#0052cc] text-white border-[#0052cc] shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-[#0052cc] hover:text-[#0052cc]'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-slate-600">Estimated Collateral Value</span>
                <span className="text-[#0a192f]">{formatINR(propertyValue)}</span>
              </div>
              <input
                type="range"
                min={1000000}
                max={80000000}
                step={500000}
                value={propertyValue}
                onChange={(e) => setPropertyValue(Number(e.target.value))}
                className="w-full accent-[#0052cc] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-slate-600">Required Loan Amount</span>
                <span className="text-[#0052cc]">{formatINR(loanAmount)}</span>
              </div>
              <input
                type="range"
                min={500000}
                max={50000000}
                step={100000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full accent-[#0052cc] cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-slate-600">Interest Rate</span>
                  <span className="text-[#0052cc]">{interestRate}% p.a.</span>
                </div>
                <input
                  type="range"
                  min={10.5}
                  max={22}
                  step={0.25}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-[#0052cc] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-slate-600">Tenure</span>
                  <span className="text-[#0052cc]">
                    {tenureMonths} Months ({(tenureMonths / 12).toFixed(tenureMonths % 12 === 0 ? 0 : 1)} Yrs)
                  </span>
                </div>
                <input
                  type="range"
                  min={12}
                  max={120}
                  step={6}
                  value={tenureMonths}
                  onChange={(e) => setTenureMonths(Number(e.target.value))}
                  className="w-full accent-[#0052cc] cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl bg-[#0a192f] text-white p-7 sm:p-8 space-y-5 relative overflow-hidden shadow-[0_18px_40px_rgba(10,25,47,0.22)]">
            <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80"
                  alt="SaibanCapital Senior MSME Credit Advisor"
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-[#0052cc]"
                />
                <div>
                  <p className="text-xs font-bold text-white">Dedicated Credit Desk</p>
                  <p className="text-[11px] text-emerald-400 font-medium">
                    ● Custom LTV structuring available
                  </p>
                </div>
              </div>
              <ShieldKey3DIllustration className="w-11 h-11 shrink-0" />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-300">
                Estimated Monthly EMI
              </p>
              <p className="text-3xl sm:text-4xl font-extrabold mt-1 tracking-tight">
                {formatINR(emi)}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden flex">
                <div
                  className="h-full bg-[#2684ff] transition-all duration-300"
                  style={{ width: `${principalSharePct}%` }}
                />
                <div
                  className="h-full bg-emerald-400 transition-all duration-300"
                  style={{ width: `${100 - principalSharePct}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#2684ff]" />
                  Principal ({principalSharePct}%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Interest ({100 - principalSharePct}%)
                </span>
              </div>
            </div>

            <div className="border-t border-slate-700/80 pt-4 space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-300">Principal Amount</span>
                <span className="font-semibold">{formatINR(loanAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Total Interest</span>
                <span className="font-semibold text-emerald-300">{formatINR(totalInterest)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-700/80 pt-2.5">
                <span className="font-semibold">Total Repayment</span>
                <span className="font-bold">{formatINR(totalPayable)}</span>
              </div>
            </div>

            <a
              href="/apply?product=secured-term-loan"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#0052cc] hover:bg-[#0065ff] py-3.5 text-sm font-bold text-white transition-all shadow-[0_8px_20px_rgba(0,82,204,0.35)]"
            >
              <span>Apply for {formatINR(loanAmount)}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <LoanProductLayout
      config={{
        breadcrumbLabel: 'Secured Term Loan',
        badgeText: 'Collateral-Backed Growth Capital • 7-Day Disbursal',
        badgeIcon: ShieldCheck,
        titlePrefix: 'Secured Business',
        titleHighlight: 'Term Loans',
        subtitle: (
          <>
            Unlock high-value, lower-interest capital from{' '}
            <strong className="text-[#0a192f]">₹5 Lakhs to ₹5 Crore</strong> by leveraging your
            residential, commercial, or industrial property—with predictable EMIs and up to 10-year
            tenures.
          </>
        ),
        heroMedia: {
          imageUrl:
            'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85',
          imageAlt: 'Enterprise founders collaborating on commercial property expansion',
          captionTitle: 'Scale with Confidence Against Commercial & Residential Assets',
          captionSubtitle: 'Up to 75% property LTV • 48-hour credit sanction',
        },
        applyHref: '/apply?product=secured-term-loan',
        glanceTag: 'MSME Secured',
        glanceRows: [
          { label: 'Loan Amount', value: '₹5 Lakhs – ₹5 Crore' },
          { label: 'Tenure', value: '12 – 120 Months' },
          { label: 'Interest Rate', value: 'From 10.50% p.a.', tone: 'blue' },
          { label: 'Collateral', value: 'Property / Machinery / FD' },
          { label: 'Disbursal Speed', value: '7 Working Days', tone: 'green' },
        ],
        glanceNote: (
          <>
            Compare offers across <strong>30+ RBI-regulated Banks & NBFCs</strong> with zero impact
            on your CIBIL score during initial eligibility check.
          </>
        ),
        eligibilitySubtitle:
          'You qualify if your enterprise meets these four core MSME underwriting benchmarks:',
        eligibilityChecks: [
          'Business vintage of 2+ years',
          'Annual turnover of ₹15 Lakhs+',
          'Valid property or asset collateral',
          'CIBIL score of 650 or higher',
        ],
        usesHeading: 'Typical uses',
        usesSubtitle: 'Deploy structured term capital across high-ROI business milestones:',
        uses: [
          {
            title: 'Capacity & Plant Expansion',
            desc: 'Open new branches, warehouses, or scale manufacturing lines.',
            icon: Building2,
          },
          {
            title: 'Long-Term Working Capital',
            desc: 'Stabilize cash cycles without high-cost short-term debt.',
            icon: Layers,
          },
          {
            title: 'Equipment & Tech Upgrade',
            desc: 'Acquire commercial machinery, vehicles, or ERP infrastructure.',
            icon: Briefcase,
          },
          {
            title: 'High-Interest Debt Consolidation',
            desc: 'Refinance multiple unsecured loans into one lower-EMI facility.',
            icon: TrendingUp,
          },
        ],
        calculatorSlot: calculatorUI,
        documentsSubtitle: 'Switch tabs below to inspect the exact documents needed:',
        documents: [
          {
            category: 'KYC & Identity',
            items: 'PAN Card & Aadhaar of Applicant/Directors, Company PAN, Passport Photos',
          },
          {
            category: 'Business Proof',
            items: 'GST Certificate, Udyam MSME Registration, Partnership Deed / MOA & AOA',
          },
          {
            category: 'Banking & GST',
            items: 'Last 6–12 months primary current account statements & 1-year GSTR-3B',
          },
          {
            category: 'Financials & ITR',
            items: 'Last 2 years ITR with computation, Audited Balance Sheet & P&L',
          },
          {
            category: 'Collateral Papers',
            items: 'Registered Title/Sale Deed, Chain of Agreements, Latest Property Tax Receipt',
          },
        ],
        ratesSubtitle: 'Transparent pricing aligned with RBI Key Fact Statement (KFS) norms:',
        rates: [
          { label: 'Ticket Size', value: '₹5 Lakhs – ₹5 Crore' },
          { label: 'Interest Rate', value: '10.50% – 22.00% p.a.', highlight: 'blue' },
          { label: 'Repayment Tenure', value: '12 to 120 Months (1 – 10 Years)' },
          { label: 'Collateral Accepted', value: 'Residential / Commercial Property, Machinery, FD' },
          { label: 'Processing Fee', value: '1% – 2% of loan amount + GST' },
          { label: 'Foreclosure Charges', value: 'Nil on floating-rate MSE loans', highlight: 'green' },
        ],
        processSubtitle:
          'From digital application to bank disbursal in as little as 7 working days:',
        steps: [
          { step: '01', title: 'Quick Online Inquiry', desc: 'Share basic business & collateral details in 2 minutes.' },
          { step: '02', title: 'Advisor Consultation', desc: 'Specialist matches your profile across 30+ banks & NBFCs.' },
          { step: '03', title: 'Digital Document Upload', desc: 'Submit KYC, GST, bank statements & property copies securely.' },
          { step: '04', title: 'Credit Underwriting', desc: '48-hour financial appraisal based on turnover and DSCR.' },
          { step: '05', title: 'Legal & Valuation', desc: 'Certified valuer verifies collateral title & market value.' },
          { step: '06', title: 'Sanction & e-Sign', desc: 'Review transparent KFS and e-sign sanction letter.' },
          { step: '07', title: 'Direct Disbursal (7 Days)', desc: 'Funds credited directly to your business current account.' },
        ],
        faqs: [
          {
            question: 'What types of collateral are accepted for a Secured Term Loan?',
            answer:
              'We accept self-occupied or rented residential property, commercial shops/offices, industrial land or sheds, fixed deposits (FDs), and high-value plant & machinery.',
          },
          {
            question: 'How fast is the approval and disbursal process?',
            answer:
              'In-principle sanction is issued within 48 hours of document submission. Final disbursal takes 5 to 7 working days after property legal and technical valuation.',
          },
          {
            question: 'What is the maximum Loan-to-Value (LTV) ratio offered?',
            answer:
              'Up to 65%–75% of market value for residential/commercial property, and up to 80%–90% against Fixed Deposits.',
          },
          {
            question: 'Are there any prepayment or foreclosure charges?',
            answer:
              'Floating-rate term loans sanctioned to individual borrowers and MSEs carry zero foreclosure or part-prepayment charges per RBI guidelines.',
          },
          {
            question: 'Can I apply if my CIBIL score is between 650 and 700?',
            answer:
              'Yes. Tangible collateral combined with strong banking cash flows and GST turnover allows approvals starting from a 650+ CIBIL score.',
          },
        ],
        callbackSubtitle:
          'Speak with a SaibanCapital secured-lending specialist to check your property LTV and best bank/NBFC offer.',
        callbackSuccessTitle: 'Our MSME loan advisor will call you on',
      }}
    />
  );
}