import React, { useState, useEffect, useRef } from 'react';
import {
  Home,
  ShieldCheck,
  Calculator,
  ArrowRight,
  ChevronDown,
  Star,
  CheckCircle2,
  Building2,
  Percent,
  Clock,
  FileText,
  Sparkles,
  PhoneCall,
  TrendingUp,
  ClipboardCheck,
  MapPin,
  Wallet,
  KeyRound,
  MoveUpRight,
  BadgeCheck,
  House,
} from 'lucide-react';
import { InteriorPage } from '../components/InteriorPage';

// --- Scroll Reveal Wrapper Component ---
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
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// --- Interactive Hero Illustration with Cursor Parallax & Spotlight (Daylight Version) ---
const InteractiveHouseIllustration: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, rawX: 250, rawY: 250 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const rawX = e.clientX - rect.left;
    const rawY = e.clientY - rect.top;
    // Normalized coordinates from -1 to 1
    const normX = (rawX / rect.width - 0.5) * 2;
    const normY = (rawY / rect.height - 0.5) * 2;
    setMousePos({ x: normX, y: normY, rawX, rawY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0, rawX: 250, rawY: 250 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[440px] sm:h-[500px] rounded-3xl bg-gradient-to-br from-sky-100 via-[#eef6ff] to-amber-50/90 p-6 sm:p-8 overflow-hidden shadow-2xl shadow-blue-900/10 border border-blue-200/80 select-none cursor-crosshair group"
    >
      {/* Warm Sunbeam & Dynamic Cursor Glow Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0.45,
          background: `radial-gradient(420px circle at ${mousePos.rawX}px ${mousePos.rawY}px, rgba(251, 191, 36, 0.25), transparent 70%)`,
        }}
      />

      {/* Subtle Daylight Architectural Grid Background */}
      <div
        className="absolute inset-0 opacity-35 transition-transform duration-300 ease-out"
        style={{
          backgroundImage:
            'radial-gradient(#60a5fa 1px, transparent 1px), radial-gradient(#93c5fd 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          backgroundPosition: '0 0, 14px 14px',
          transform: `translate(${mousePos.x * -8}px, ${mousePos.y * -8}px)`,
        }}
      />

      {/* Daylight Sun & Floating Parallax Decorative Rings */}
      <div
        className="absolute top-8 right-10 w-24 h-24 rounded-full bg-gradient-to-br from-amber-200 via-yellow-200 to-amber-300/60 blur-md transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePos.x * 16}px, ${mousePos.y * 16}px)`,
        }}
      />
      <div
        className="absolute top-10 right-12 w-36 h-36 rounded-full border border-sky-400/30 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePos.x * 18}px, ${mousePos.y * 18}px)`,
        }}
      />
      <div
        className="absolute bottom-12 left-10 w-28 h-28 rounded-full bg-emerald-400/20 blur-xl transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePos.x * -22}px, ${mousePos.y * -22}px)`,
        }}
      />

      {/* Main 3D-Tilt House Architectural Vector (Daylight Palette) */}
      <div
        className="relative z-10 w-full h-full flex items-center justify-center transition-transform duration-200 ease-out"
        style={{
          transform: `perspective(1000px) rotateY(${mousePos.x * 8}deg) rotateX(${
            mousePos.y * -8
          }deg)`,
        }}
      >
        <svg
          viewBox="0 0 420 340"
          className="w-full max-w-[380px] drop-shadow-[0_24px_32px_rgba(15,53,104,0.18)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="roofGradDay" x1="60" y1="60" x2="360" y2="170" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0052cc" />
            </linearGradient>
            <linearGradient id="wallGradDay" x1="95" y1="150" x2="325" y2="295" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f1f5f9" />
            </linearGradient>
            <linearGradient id="windowDay" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#bae6fd" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
            <linearGradient id="lawnGradDay" x1="40" y1="295" x2="380" y2="295" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Soft Daylight Clouds */}
          <path
            d="M72 86C72 79.3726 77.3726 74 84 74C86.2 74 88.26 74.59 90.04 75.63C92.42 70.53 97.59 67 103.6 67C111.88 67 118.6 73.72 118.6 82C118.6 82.41 118.58 82.82 118.55 83.22C122.25 84.56 124.9 88.1 124.9 92.25C124.9 97.55 120.6 101.85 115.3 101.85H82.5C76.7 101.85 72 97.15 72 91.35V86Z"
            fill="#ffffff"
            fillOpacity="0.85"
          />
          <path
            d="M312 104C312 99.03 316.03 95 321 95C322.65 95 324.2 95.44 325.53 96.22C327.31 92.4 331.19 89.75 335.7 89.75C341.91 89.75 346.95 94.79 346.95 101C346.95 101.31 346.94 101.61 346.91 101.91C349.69 102.92 351.68 105.57 351.68 108.69C351.68 112.66 348.45 115.89 344.48 115.89H319.88C315.53 115.89 312 112.36 312 108.01V104Z"
            fill="#ffffff"
            fillOpacity="0.8"
          />

          {/* Ground Horizon Lawn Line */}
          <rect x="30" y="294" width="360" height="4" rx="2" fill="url(#lawnGradDay)" />

          {/* Chimney */}
          <path
            d="M275 82H303V135H275V82Z"
            fill="#e2e8f0"
            stroke="#94a3b8"
            strokeWidth="2"
          />

          {/* Main House Body */}
          <rect
            x="95"
            y="148"
            width="230"
            height="146"
            rx="8"
            fill="url(#wallGradDay)"
            stroke="#cbd5e1"
            strokeWidth="2.5"
          />

          {/* Left Extension Wing */}
          <rect
            x="65"
            y="185"
            width="55"
            height="109"
            rx="6"
            fill="#f8fafc"
            stroke="#cbd5e1"
            strokeWidth="2"
          />

          {/* Modern Pitched Roof */}
          <path
            d="M48 188L108 138M80 156L210 56L340 156"
            stroke="url(#roofGradDay)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M95 152L210 64L325 152H95Z"
            fill="#eff6ff"
            stroke="#60a5fa"
            strokeWidth="1.5"
            strokeOpacity="0.7"
          />

          {/* Attic Circular Window */}
          <circle
            cx="210"
            cy="115"
            r="16"
            fill="url(#windowDay)"
            stroke="#0052cc"
            strokeWidth="2.5"
          />
          <path d="M210 99V131M194 115H226" stroke="#ffffff" strokeWidth="2" />

          {/* Bright Blue Front Door */}
          <rect
            x="188"
            y="214"
            width="44"
            height="80"
            rx="6"
            fill="#0052cc"
            stroke="#0284c7"
            strokeWidth="2"
          />
          <circle cx="223" cy="256" r="3" fill="#fde047" />

          {/* Left Panoramic Sunlit Window */}
          <rect
            x="118"
            y="182"
            width="48"
            height="44"
            rx="6"
            fill="url(#windowDay)"
            stroke="#0284c7"
            strokeWidth="2"
          />
          <path d="M142 182V226M118 204H166" stroke="#ffffff" strokeWidth="2" />

          {/* Right Panoramic Sunlit Window */}
          <rect
            x="254"
            y="182"
            width="48"
            height="44"
            rx="6"
            fill="url(#windowDay)"
            stroke="#0284c7"
            strokeWidth="2"
          />
          <path d="M278 182V226M254 204H302" stroke="#ffffff" strokeWidth="2" />

          {/* Side Wing Window */}
          <rect
            x="80"
            y="210"
            width="24"
            height="36"
            rx="4"
            fill="#bae6fd"
            stroke="#0284c7"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Floating Parallax Glassmorphic Card 1: Interest Rate (Daylight) */}
      <div
        className="absolute top-6 left-6 z-20 flex items-center gap-3 rounded-2xl bg-white/85 backdrop-blur-md border border-blue-100 px-4 py-3 text-[#0a192f] shadow-lg shadow-blue-900/10 transition-transform duration-200 ease-out"
        style={{
          transform: `translate(${mousePos.x * 24}px, ${mousePos.y * 24}px)`,
        }}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
          <Percent className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[11px] font-medium text-slate-500">Starting ROI</p>
          <p className="text-sm font-bold text-[#0a192f]">8.35% p.a.*</p>
        </div>
      </div>

      {/* Floating Parallax Glassmorphic Card 2: Fast Sanction (Daylight) */}
      <div
        className="absolute bottom-6 right-6 z-20 flex items-center gap-3 rounded-2xl bg-white/85 backdrop-blur-md border border-blue-100 px-4 py-3 text-[#0a192f] shadow-lg shadow-blue-900/10 transition-transform duration-200 ease-out"
        style={{
          transform: `translate(${mousePos.x * -26}px, ${mousePos.y * -26}px)`,
        }}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0052cc] border border-blue-100">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[11px] font-medium text-slate-500">Digital Sanction</p>
          <p className="text-sm font-bold text-[#0a192f]">48-Hour Approval</p>
        </div>
      </div>

      {/* Floating Daylight Orbit Accents */}
      <div className="pointer-events-none absolute right-[18%] top-[17%] z-20 h-3 w-3 rounded-full bg-amber-400 shadow-[0_0_20px_6px_rgba(251,191,36,.45)] soft-pulse" />
      <div className="pointer-events-none absolute left-[18%] bottom-[22%] z-20 h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_18px_5px_rgba(16,185,129,.35)] soft-pulse" />
      <div className="pointer-events-none absolute right-8 top-1/2 z-20 h-20 w-20 rounded-full border border-sky-400/30 float-slow" />
      <div className="pointer-events-none absolute left-1/2 top-5 z-20 h-2 w-2 rounded-full bg-[#0052cc]/60 orbit-dot" />
    </div>
  );
};

// --- Customer Testimonials Data (South Asian / Indian Names & Faces) ---
interface Testimonial {
  name: string;
  city: string;
  loanType: string;
  rating: number;
  review: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Aarav Sharma',
    city: 'Bengaluru, Karnataka',
    loanType: 'Ready-to-Move Apartment Loan',
    rating: 5,
    review:
      'Transparent interest breakdown and zero hidden charges. My ₹85 Lakh home loan was sanctioned in just two working days without endless branch visits.',
    avatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
  },
  {
    name: 'Priya Nair',
    city: 'Kochi, Kerala',
    loanType: 'Home Loan Balance Transfer',
    rating: 5,
    review:
      'Switching my existing housing loan saved me nearly ₹4,800 every month on EMIs. The advisor handled all foreclosure paperwork seamlessly.',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
  },
  {
    name: 'Rohan Deshmukh',
    city: 'Pune, Maharashtra',
    loanType: 'Under-Construction Flat Loan',
    rating: 5,
    review:
      'Stage-wise builder disbursement was super smooth. Whenever a demand letter arrived, funds were released within 24 hours.',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  },
  {
    name: 'Ananya Verma',
    city: 'Lucknow, Uttar Pradesh',
    loanType: 'Plot + Construction Finance',
    rating: 5,
    review:
      'Finding a single lender for both land purchase and house construction was tough until I spoke to the team here. Truly stress-free guidance.',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
  },
  {
    name: 'Vikramaditya Singh',
    city: 'Jaipur, Rajasthan',
    loanType: 'Self-Employed Home Loan',
    rating: 5,
    review:
      'As a business owner, getting maximum eligibility based on GST and ITR filings used to be a hurdle. They matched me with the exact right bank.',
    avatar:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
  },
  {
    name: 'Meera Krishnan',
    city: 'Chennai, Tamil Nadu',
    loanType: 'Home Extension & Renovation',
    rating: 5,
    review:
      'Doorstep KYC and clear legal verification made expanding our family home effortless. Highly recommend checking your EMI here first.',
    avatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
  },
];

// --- FAQ Data ---
const faqs = [
  {
    question: 'What is the maximum home loan amount and tenure I can opt for?',
    answer:
      'Your eligible loan amount and tenure depend on income, existing obligations, credit profile, age, property valuation, and the lender’s policies. Some lenders may offer long repayment tenures and funding up to a defined share of the property value; the exact offer is assessed individually.',
  },
  {
    question: 'Can I switch my ongoing home loan from another bank to lower my EMI?',
    answer:
      'Yes. With a Home Loan Balance Transfer, you can move your outstanding principal to a partner lender offering a lower repo-linked interest rate, along with an optional top-up loan for interiors or personal needs.',
  },
  {
    question: 'What documents are required for salaried vs. self-employed applicants?',
    answer:
      'Salaried applicants generally need KYC (PAN, Aadhaar), last 3 months salary slips, 6 months bank statements, and Form 16. Self-employed individuals need KYC, last 2–3 years ITR with computation, business proof, and 12 months bank statements.',
  },
  {
    question: 'Are there any prepayment or foreclosure charges on floating-rate home loans?',
    answer:
      'Prepayment rules depend on the loan type, borrower category, lender, and applicable RBI directions. Ask the lender to confirm the current terms in writing, especially if the facility is fixed-rate or has a hybrid structure.',
  },
  {
    question: 'How do I check my exact monthly EMI before applying?',
    answer:
      'You can use our interactive EMI Calculator to test different loan amounts, interest rates, and tenures instantly before submitting your formal application.',
  },
];

export default function HomeLoansPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeLoanTab, setActiveLoanTab] = useState<'purchase' | 'transfer' | 'construction'>(
    'purchase'
  );

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  const loanPrograms = {
    purchase: {
      badge: 'New Home Purchase',
      title: 'Buy Your Dream Flat, Villa, or Resale Home',
      description:
        'Get up to 90% LTV funding on RERA-approved projects and verified resale properties with repo-linked floating rates and zero hidden processing surprises.',
      highlights: [
        'Sanction letter valid for up to 6 months before property finalization',
        'Joint applicant option with spouse or parents to boost eligibility',
        'Dedicated legal & technical property verification support',
      ],
      rate: '8.35% p.a.',
      tenure: 'Up to 30 Years',
    },
    transfer: {
      badge: 'Balance Transfer + Top-Up',
      title: 'Refinance Existing Loan & Cut Monthly EMIs',
      description:
        'Paying a high interest rate with your current lender? Transfer your unpaid balance seamlessly and unlock additional top-up funds at home loan rates.',
      highlights: [
        'Instant savings calculation on remaining tenure',
        'Minimal documentation with existing loan track record',
        'Additional top-up up to ₹50 Lakh for renovation or personal goals',
      ],
      rate: '8.40% p.a.',
      tenure: 'Up to 25 Years',
    },
    construction: {
      badge: 'Plot & Self-Construction',
      title: 'Build Your Custom Home From the Ground Up',
      description:
        'Tailored tranche-based disbursements aligned with your architect’s construction milestones—pay interest only on the amount disbursed during construction.',
      highlights: [
        'Covers residential plot purchase + house construction',
        'Flexible stage-wise release upon engineer inspection',
        'Tax benefits under Section 80C and Section 24(b) post-completion',
      ],
      rate: '8.50% p.a.',
      tenure: 'Up to 30 Years',
    },
  };

  const currentProgram = loanPrograms[activeLoanTab];

  return (
    <InteriorPage>
      <div className="loan-page relative min-h-screen overflow-hidden bg-[#fcfcfd] text-[#0a192f] font-sans antialiased selection:bg-[#0052cc] selection:text-white">
        {/* Custom Keyframes for Infinite Seamless Marquee */}
        <style>{`
          @keyframes marqueeScroll {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-infinite-marquee {
            display: flex;
            width: max-content;
            animation: marqueeScroll 38s linear infinite;
          }
          .animate-infinite-marquee:hover {
            animation-play-state: paused;
          }
          @keyframes floatY {
            0%, 100% { transform: translate3d(0, 0, 0) rotate(-1deg); }
            50% { transform: translate3d(0, -13px, 0) rotate(1deg); }
          }
          @keyframes floatSlow {
            0%, 100% { transform: translate3d(0, 0, 0); }
            50% { transform: translate3d(0, -9px, 0); }
          }
          @keyframes orbit {
            from { transform: rotate(0deg) translateX(8px) rotate(0deg); }
            to { transform: rotate(360deg) translateX(8px) rotate(-360deg); }
          }
          @keyframes softPulse {
            0%, 100% { opacity: .45; transform: scale(.96); }
            50% { opacity: .9; transform: scale(1.04); }
          }
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          .float-y { animation: floatY 6s ease-in-out infinite; }
          .float-slow { animation: floatSlow 7s ease-in-out infinite; }
          .orbit-dot { animation: orbit 12s linear infinite; transform-origin: center; }
          .soft-pulse { animation: softPulse 4s ease-in-out infinite; }
          .glass-card { background: rgba(255,255,255,.78); backdrop-filter: blur(18px); }
          .depth-card { transform-style: preserve-3d; transition: transform .45s cubic-bezier(.2,.8,.2,1), box-shadow .45s; }
          .depth-card:hover { transform: perspective(1000px) rotateX(3deg) rotateY(-4deg) translateY(-7px); box-shadow: 0 28px 60px -28px rgba(15, 53, 104, .32); }
          .shine-line { background: linear-gradient(90deg, transparent, rgba(255,255,255,.85), transparent); background-size: 200% 100%; animation: shimmer 4s linear infinite; }
          .loan-page section { position: relative; isolation: isolate; }
          .loan-page section::after { content: ""; position: absolute; top: 0; left: max(1.5rem, calc((100% - 80rem) / 2)); width: 4.5rem; height: 2px; border-radius: 9999px; background: linear-gradient(90deg, #0052cc, #38bdf8, transparent); opacity: .42; pointer-events: none; }
          .loan-page section::before { content: ""; position: absolute; z-index: -1; pointer-events: none; width: 26rem; height: 26rem; border-radius: 9999px; top: -10rem; right: -10rem; background: radial-gradient(circle, rgba(96,165,250,.11), transparent 68%); }
          .loan-page section:nth-of-type(3n) { background-image: linear-gradient(135deg, rgba(239,246,255,.72), rgba(255,255,255,.94)); }
          .loan-page section:nth-of-type(4n) { background-image: linear-gradient(135deg, rgba(255,255,255,.96), rgba(240,249,255,.78)); }
          .loan-page article, .loan-page .loan-panel { box-shadow: 0 12px 35px -28px rgba(15, 43, 83, .35); }
          .loan-page a, .loan-page button { -webkit-tap-highlight-color: transparent; }
          .loan-page a:focus-visible, .loan-page button:focus-visible { outline: 3px solid rgba(14,165,233,.55); outline-offset: 3px; }
          .loan-page .section-kicker { display: inline-flex; align-items: center; gap: .5rem; border: 1px solid rgba(191,219,254,.9); background: rgba(255,255,255,.8); border-radius: 9999px; padding: .45rem .8rem; box-shadow: 0 5px 18px -14px rgba(0,82,204,.4); }
          .loan-page .premium-card { border: 1px solid rgba(219,234,254,.95); background: linear-gradient(145deg, rgba(255,255,255,.98), rgba(248,251,255,.94)); box-shadow: 0 18px 45px -34px rgba(15,53,104,.4); transition: transform .3s ease, box-shadow .3s ease, border-color .3s ease; }
          .loan-page .premium-card:hover { transform: translateY(-5px); border-color: rgba(96,165,250,.65); box-shadow: 0 24px 50px -30px rgba(15,53,104,.35); }
          @media (max-width: 640px) {
            .loan-page section::after { left: 1rem; }
            .depth-card:hover, .loan-page .premium-card:hover { transform: none; }
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-infinite-marquee, .float-y, .float-slow, .orbit-dot, .soft-pulse, .shine-line { animation: none !important; }
            html { scroll-behavior: auto; }
            .depth-card { transition: none; }
          }
        `}</style>

        {/* ==================== 1. HERO SECTION ==================== */}
        <section className="relative overflow-hidden bg-[#fcfcfd] pt-10 pb-20 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-32 border-b border-blue-100/80">
          {/* Soft Background Ambient Accents */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl" />
          <div className="pointer-events-none absolute top-1/2 right-0 h-80 w-80 rounded-full bg-sky-100/50 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-[38%] h-72 w-72 rounded-full bg-cyan-100/60 blur-3xl" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundSize: '48px 48px',
              backgroundImage:
                'linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)',
            }}
          />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              {/* Left Copy & CTAs */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2.5 bg-white border border-slate-200 rounded-full p-1.5 pr-4 shadow-sm">
                  <span className="bg-[#f4faef] text-[#558b2f] text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide">
                    HOME LOANS
                  </span>
                  <span className="text-[11px] sm:text-[12px] text-slate-600 font-medium">
                    Tailored Indian housing finance
                  </span>
                </div>

                <h1 className="text-[2.45rem] sm:text-[3.25rem] lg:text-[3.85rem] xl:text-[4rem] leading-[1.07] font-bold text-[#0a192f] tracking-tight">
                  Unlock the keys to your{' '}
                  <span className="text-[#0052cc] font-serif font-normal tracking-normal block sm:inline">
                    dream home
                  </span>{' '}
                  with clarity.
                </h1>

                <p className="max-w-lg text-[15px] sm:text-[16px] leading-relaxed text-slate-500">
                  Explore home-finance options with clear comparisons, practical eligibility guidance,
                  and support through documentation, lender review, and disbursal.
                </p>

                {/* Primary Action Links */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-2">
                  <a
                    href="/apply"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#0052cc] hover:bg-[#003d8f] px-6 py-3.5 text-[14px] font-semibold text-white shadow-lg shadow-blue-900/10 transition-colors"
                  >
                    <span>Apply for Home Loan</span>
                    <ArrowRight className="h-4 w-4 stroke-[2.25]" />
                  </a>

                  <a
                    href="/calculator"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 px-6 py-3.5 text-[14px] font-semibold text-[#0a192f] shadow-sm transition-colors"
                  >
                    <Calculator className="h-4 w-4 text-slate-500 stroke-[2]" />
                    <span>Calculate EMI</span>
                  </a>
                </div>

                {/* Trust Strip */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 max-w-lg">
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-[#0a192f] tracking-tight">8.35%</p>
                    <p className="text-[12px] text-slate-500 font-medium">Indicative rates p.a.*</p>
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-[#0a192f] tracking-tight">Up to 90%</p>
                    <p className="text-[12px] text-slate-500 font-medium">Potential funding*</p>
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-[#0a192f] tracking-tight">30 Yrs</p>
                    <p className="text-[12px] text-slate-500 font-medium">Flexible tenure</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-[12px] font-bold text-[#0a192f]">
                  <span className="inline-flex items-center gap-1.5"><BadgeCheck className="h-4 w-4 text-[#558b2f]" /> Guided documentation</span>
                  <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-[#0052cc]" /> Secure application journey</span>
                </div>
              </div>

              {/* Right Interactive Cursor Illustration */}
              <div className="lg:col-span-6">
                <InteractiveHouseIllustration />
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 2. VISUAL HOME INSPIRATION STRIP ==================== */}
        <section className="relative overflow-hidden bg-[#f4f8ff] py-14 lg:py-20">
          <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-9 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-[#0052cc] shadow-sm">
                  <Sparkles className="h-3.5 w-3.5" /> Your next chapter starts here
                </span>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0a192f] sm:text-4xl leading-[1.12]">
                  A home is more than a property.
                  <span className="block text-[#0052cc] font-serif font-normal tracking-normal mt-0.5">
                    It is a future taking shape.
                  </span>
                </h2>
              </div>
              <p className="max-w-md text-[15px] leading-relaxed text-slate-500">
                From finding the right space to planning a comfortable repayment journey, get clear guidance at every step.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-12">
              <article className="depth-card relative min-h-[300px] overflow-hidden rounded-[28px] bg-slate-900 lg:col-span-7">
                <img
                  src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1400&q=85"
                  alt="Warm sunlit family living space with cozy wooden accents and indoor plants"
                  className="absolute inset-0 h-full w-full object-cover opacity-85"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/35 to-transparent" />
                <div className="relative z-10 flex h-full min-h-[300px] max-w-lg flex-col justify-between p-7 text-white sm:p-9">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold backdrop-blur-md">
                    <House className="h-4 w-4 text-cyan-300" /> Made for your milestones
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-cyan-200">Find your place</p>
                    <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl leading-tight">
                      The right home.
                      <br />
                      A clearer way to{' '}
                      <span className="font-serif font-normal text-sky-300">finance it.</span>
                    </h3>
                    <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-slate-200">Explore purchase, construction and balance-transfer possibilities with guided support.</p>
                  </div>
                </div>
                <div className="shine-line absolute inset-x-0 top-0 h-px" />
              </article>

              <div className="grid gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
                <article className="depth-card relative flex min-h-[145px] items-center gap-5 overflow-hidden rounded-[26px] border border-blue-100 bg-white p-5 shadow-sm">
                  <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full bg-blue-50" />
                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white shadow-lg shadow-blue-500/20 float-y">
                    <Wallet className="h-7 w-7" />
                  </div>
                  <div className="relative">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#0052cc]">Plan smart</p>
                    <h3 className="mt-1 text-lg font-bold tracking-tight text-[#0a192f]">Know your monthly EMI</h3>
                    <p className="mt-1 text-[14px] text-slate-500">Estimate before you apply.</p>
                    <a href="/calculator" className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#0052cc]">Open calculator <MoveUpRight className="h-3.5 w-3.5" /></a>
                  </div>
                </article>
                <article className="depth-card relative flex min-h-[145px] items-center gap-5 overflow-hidden rounded-[26px] border border-emerald-100 bg-white p-5 shadow-sm">
                  <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full bg-emerald-50" />
                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-300 text-white shadow-lg shadow-emerald-500/20 float-y" style={{ animationDelay: '1s' }}>
                    <KeyRound className="h-7 w-7" />
                  </div>
                  <div className="relative">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#558b2f]">Move forward</p>
                    <h3 className="mt-1 text-lg font-bold tracking-tight text-[#0a192f]">Get application-ready</h3>
                    <p className="mt-1 text-[14px] text-slate-500">Understand the documents you may need.</p>
                    <a href="/apply" className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#558b2f]">Start your journey <MoveUpRight className="h-3.5 w-3.5" /></a>
                  </div>
                </article>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 text-[12px] font-bold text-[#0a192f] shadow-sm backdrop-blur">
              <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-[#0052cc]" /> Guidance across key Indian cities</span>
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#558b2f]" /> Document-led process</span>
              <span className="inline-flex items-center gap-2"><Sparkles className="h-4 w-4 text-amber-500" /> Personalised loan discovery</span>
            </div>
          </div>
        </section>

        {/* ==================== 3. CONTENT SECTION BELOW HERO ==================== */}
        <section className="relative py-20 lg:py-28 bg-[#f6f9ff]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto text-center mb-14">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0052cc]">
                  Why Homebuyers Choose Us
                </span>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0a192f] sm:text-4xl leading-[1.12]">
                  Built around speed,{' '}
                  <span className="text-[#0052cc] font-serif font-normal tracking-normal">
                    transparency,
                  </span>{' '}
                  and zero guesswork
                </h2>
                <p className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-slate-500">
                  Whether you are buying your first apartment or refinancing an existing mortgage,
                  our advisory desk matches your profile with top public and private banks.
                </p>
              </div>
            </ScrollReveal>

            {/* Visual proof-point banner */}
            <ScrollReveal delay={80}>
              <div className="relative mb-10 grid overflow-hidden rounded-[28px] border border-blue-100 bg-white shadow-[0_24px_70px_-45px_rgba(15,53,104,.4)] lg:grid-cols-12">
                <div className="relative min-h-[220px] overflow-hidden lg:col-span-5">
                  <img
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1100&q=85"
                    alt="Hand holding house keys in front of a newly bought residential home"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#07172d]/65 via-slate-900/15 to-transparent" />
                  <div className="absolute bottom-5 left-5 rounded-2xl border border-white/30 bg-white/15 px-4 py-3 text-white backdrop-blur-xl">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-sky-100">A clearer home journey</p>
                    <p className="mt-1 text-lg font-bold tracking-tight">From search to keys</p>
                  </div>
                </div>
                <div className="relative flex flex-col justify-center p-7 sm:p-9 lg:col-span-7">
                  <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full bg-blue-100/70 blur-2xl" />
                  <p className="relative text-[11px] font-bold uppercase tracking-wider text-[#0052cc]">Your plans, one guided path</p>
                  <h3 className="relative mt-2 max-w-xl text-2xl font-bold tracking-tight text-[#0a192f] sm:text-3xl leading-[1.15]">
                    Less paperwork confusion. More{' '}
                    <span className="text-[#0052cc] font-serif font-normal tracking-normal">
                      confidence
                    </span>{' '}
                    at every step.
                  </h3>
                  <div className="relative mt-7 grid grid-cols-3 gap-3">
                    {[
                      { n: '01', label: 'Explore', icon: Home },
                      { n: '02', label: 'Compare', icon: Calculator },
                      { n: '03', label: 'Move in', icon: KeyRound },
                    ].map((step) => {
                      const StepIcon = step.icon;
                      return (
                        <div key={step.n} className="rounded-2xl border border-blue-100 bg-blue-50/70 p-3 sm:p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-mono font-bold text-[#0052cc]">{step.n}</span>
                            <StepIcon className="h-4 w-4 text-[#0052cc]" />
                          </div>
                          <p className="mt-3 text-xs font-bold text-[#0a192f] sm:text-sm">{step.label}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* 4 Feature Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Clock,
                  title: '48-Hour Sanction',
                  desc: 'Pre-approved digital offers matched to your income & CIBIL score before you even finalize the flat.',
                },
                {
                  icon: Percent,
                  title: 'Zero Hidden Fees',
                  desc: 'Upfront clarity on processing charges, legal valuation fees, and zero prepayment penalties on floating loans.',
                },
                {
                  icon: Building2,
                  title: '25+ Lending Partners',
                  desc: 'Compare offers across leading Indian banks and HFCs in one place without hurting your credit score.',
                },
                {
                  icon: FileText,
                  title: 'Doorstep Assistance',
                  desc: 'From property title verification to builder NOC coordination, a dedicated manager handles the legwork.',
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <ScrollReveal key={item.title} delay={index * 100}>
                    <div className="h-full premium-card rounded-[22px] p-6 transition-all duration-300">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#0052cc]">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-bold tracking-tight text-[#0a192f]">{item.title}</h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-slate-500">{item.desc}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================== 4. INFINITE CUSTOMER FEEDBACKS WITH STARS ==================== */}
        <section className="py-20 lg:py-24 bg-white border-y border-blue-100/70 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#558b2f]">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span>4.9/5 Average Homeowner Rating</span>
                  </div>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0a192f] sm:text-4xl leading-[1.12]">
                    Trusted by{' '}
                    <span className="text-[#0052cc] font-serif font-normal tracking-normal">
                      families
                    </span>{' '}
                    across India
                  </h2>
                </div>
                <p className="text-[14px] sm:text-[15px] leading-relaxed text-slate-500 max-w-md">
                  Real stories from Indian homeowners who financed, transferred, or built their homes
                  with our lending guidance.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mx-auto mb-10 grid max-w-7xl grid-cols-2 gap-3 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
            {[
              { value: '01', label: 'One guided journey', icon: Home },
              { value: '02', label: 'Compare loan paths', icon: Calculator },
              { value: '03', label: 'Prepare documents', icon: ClipboardCheck },
              { value: '04', label: 'Plan your next move', icon: KeyRound },
            ].map((item) => {
              const TrustIcon = item.icon;
              return (
                <div key={item.value} className="group flex items-center gap-3 rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/70 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#0052cc] shadow-sm ring-1 ring-blue-100 transition group-hover:bg-[#0052cc] group-hover:text-white">
                    <TrustIcon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[10px] font-mono font-bold tracking-wider text-[#0052cc]">{item.value}</span>
                    <span className="mt-0.5 block text-xs font-bold text-[#0a192f] sm:text-sm">{item.label}</span>
                  </span>
                </div>
              );
            })}
          </div>

          {/* Infinite Seamless Marquee Track */}
          <div className="relative w-full">
            {/* Left & Right Edge Fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent" />

            <div className="animate-infinite-marquee gap-6 px-3">
              {[...testimonials, ...testimonials].map((item, index) => (
                <article
                  key={`${item.name}-${index}`}
                  className="w-[330px] sm:w-[380px] shrink-0 rounded-[22px] border border-blue-100 bg-white/90 p-6 shadow-[0_15px_40px_-30px_rgba(15,53,104,.45)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
                >
                  {/* 5-Star Rating Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1" aria-label={`${item.rating} out of 5 stars`}>
                      {Array.from({ length: item.rating }).map((_, starIdx) => (
                        <Star
                          key={starIdx}
                          className="h-4 w-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-[#0052cc]">
                      {item.loanType}
                    </span>
                  </div>

                  {/* Quote */}
                  <p className="text-[14px] leading-relaxed text-slate-600 mb-6">
                    &ldquo;{item.review}&rdquo;
                  </p>

                  {/* Customer Profile */}
                  <div className="flex items-center gap-3.5 pt-4 border-t border-slate-200/70">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      loading="lazy"
                      className="h-11 w-11 rounded-full object-cover ring-2 ring-white shadow-sm"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-[#0a192f]">{item.name}</h4>
                      <p className="text-xs text-slate-500">{item.city}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 5. SECOND CONTENT SECTION (LOAN SOLUTIONS & JOURNEY) ==================== */}
        <section className="py-16 lg:py-24 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
            {/* Interactive Loan Solution Switcher */}
            <ScrollReveal>
              <div className="loan-panel rounded-[30px] border border-blue-100/80 bg-white/95 p-6 sm:p-10 shadow-[0_25px_70px_-48px_rgba(15,53,104,.45)]">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-100">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#0052cc]">
                      Home Loan Solutions
                    </span>
                    <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-[#0a192f]">
                      Choose the right{' '}
                      <span className="text-[#0052cc] font-serif font-normal tracking-normal">
                        housing finance
                      </span>{' '}
                      plan
                    </h2>
                  </div>

                  {/* Filter Tabs */}
                  <div className="inline-flex flex-wrap gap-2 rounded-xl bg-slate-100 p-1.5">
                    {[
                      { id: 'purchase', label: 'New Home Purchase' },
                      { id: 'transfer', label: 'Balance Transfer' },
                      { id: 'construction', label: 'Plot & Construction' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() =>
                          setActiveLoanTab(tab.id as 'purchase' | 'transfer' | 'construction')
                        }
                        className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                          activeLoanTab === tab.id
                            ? 'bg-[#0052cc] text-white shadow-sm'
                            : 'text-slate-600 hover:text-[#0a192f]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Tab Details */}
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-5">
                    <span className="inline-block rounded-full bg-[#f4faef] border border-emerald-200 px-3 py-1 text-[11px] font-bold text-[#558b2f]">
                      {currentProgram.badge}
                    </span>
                    <h3 className="text-2xl font-bold tracking-tight text-[#0a192f]">
                      {currentProgram.title}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-slate-500">
                      {currentProgram.description}
                    </p>

                    <ul className="space-y-3 pt-2">
                      {currentProgram.highlights.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-[14px] text-slate-700">
                          <CheckCircle2 className="h-5 w-5 shrink-0 text-[#558b2f] mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap items-center gap-4 pt-4">
                      <a
                        href="/apply"
                        className="inline-flex items-center gap-2 rounded-xl bg-[#0052cc] hover:bg-[#003d8f] px-5 py-3 text-[14px] font-semibold text-white transition-colors"
                      >
                        <span>Start Application</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                      <a
                        href="/calculator"
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-[14px] font-semibold text-[#0a192f] transition-colors hover:border-slate-300 hover:bg-slate-50"
                      >
                        <Calculator className="h-4 w-4 text-slate-500" />
                        <span>Check Monthly EMI</span>
                      </a>
                    </div>
                  </div>

                  {/* Key Metrics Highlight Box */}
                  <div className="lg:col-span-5">
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a192f] via-[#103767] to-blue-950 p-7 text-white space-y-6">
                      <div className="pointer-events-none absolute -right-12 -top-14 h-44 w-44 rounded-full border border-sky-300/20" />
                      <div className="pointer-events-none absolute -right-5 -top-7 h-28 w-28 rounded-full border border-sky-300/15" />
                      <div className="relative mb-1 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-sky-200">Your home finance snapshot</p>
                          <p className="mt-1 text-sm font-bold">Plan with more clarity</p>
                        </div>
                        <div className="float-y flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 shadow-lg shadow-sky-900/40">
                          <House className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-b border-white/10 pb-5">
                        <div>
                          <p className="text-xs uppercase tracking-wider text-sky-300">
                            Indicative Interest Rate
                          </p>
                          <p className="mt-1 text-3xl font-bold tracking-tight">{currentProgram.rate}</p>
                        </div>
                        <TrendingUp className="h-9 w-9 text-emerald-400" />
                      </div>

                      <div className="flex items-center justify-between border-b border-white/10 pb-5">
                        <div>
                          <p className="text-xs uppercase tracking-wider text-sky-300">
                            Repayment Window
                          </p>
                          <p className="mt-1 text-2xl font-bold tracking-tight">{currentProgram.tenure}</p>
                        </div>
                        <Clock className="h-8 w-8 text-sky-400" />
                      </div>

                      <div className="pt-1">
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Need custom eligibility structuring for NRI income, self-employed ITRs, or
                          co-applicants?
                        </p>
                        <a
                          href="/contact"
                          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300 hover:text-white transition"
                        >
                          <PhoneCall className="h-4 w-4" />
                          <span>Speak with a Loan Advisor &rarr;</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* 3-Step Process Strip */}
            <ScrollReveal delay={100}>
              <div>
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0052cc]">
                    Simple 3-Step Process
                  </span>
                  <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#0a192f]">
                    From EMI planning to{' '}
                    <span className="text-[#0052cc] font-serif font-normal tracking-normal">
                      property disbursal
                    </span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      step: '01',
                      title: 'Plan Your EMI & Eligibility',
                      desc: 'Use our EMI calculator to align your loan amount and tenure comfortably with your monthly budget.',
                      linkText: 'Open EMI Calculator',
                      href: '/calculator',
                    },
                    {
                      step: '02',
                      title: 'Submit Digital Application',
                      desc: 'Fill out a quick online form and upload basic KYC & income proofs for instant bank matching.',
                      linkText: 'Apply Online Now',
                      href: '/apply',
                    },
                    {
                      step: '03',
                      title: 'Legal Check & Disbursal',
                      desc: 'Our team coordinates property valuation and sanction formalities so funds reach on time.',
                      linkText: 'Talk to an Expert',
                      href: '/contact',
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="premium-card rounded-[22px] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-400 text-sm font-mono font-bold text-white shadow-lg shadow-blue-500/20">
                            {item.step}
                          </span>
                          <span className="text-4xl font-mono font-bold tracking-tighter text-blue-100">{item.step}</span>
                        </div>
                        <h3 className="mt-4 text-lg font-bold tracking-tight text-[#0a192f]">{item.title}</h3>
                        <p className="mt-2 text-[14px] leading-relaxed text-slate-500">{item.desc}</p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-slate-100">
                        <a
                          href={item.href}
                          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0052cc] hover:text-[#003d8f]"
                        >
                          <span>{item.linkText}</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ==================== 6. ELIGIBILITY & PLANNING ==================== */}
        <section className="relative overflow-hidden bg-white py-16 lg:py-24">
          <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="mx-auto mb-12 max-w-3xl text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0052cc]">
                  Plan with confidence
                </span>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0a192f] sm:text-4xl leading-[1.12]">
                  Understand your home loan{' '}
                  <span className="text-[#0052cc] font-serif font-normal tracking-normal">
                    readiness
                  </span>
                </h2>
                <p className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-slate-500">
                  Lenders assess more than your salary. A clear view of your income, existing
                  obligations, credit history, and property documents can help you prepare before applying.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={70}>
              <div className="mb-9 grid overflow-hidden rounded-[26px] border border-blue-100 bg-white shadow-[0_22px_60px_-42px_rgba(15,53,104,.38)] md:grid-cols-12">
                <div className="relative min-h-[190px] overflow-hidden md:col-span-4">
                  <img
                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=85"
                    alt="Person reviewing home loan budget, notes, and financial paperwork at a desk"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/75 via-slate-900/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 rounded-xl border border-white/25 bg-white/15 px-3 py-2 text-white backdrop-blur-md">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-sky-100">Prepare before applying</p>
                    <p className="text-sm font-bold tracking-tight">Know your profile</p>
                  </div>
                </div>
                <div className="grid gap-4 p-5 sm:grid-cols-3 md:col-span-8 md:p-7">
                  {[
                    { label: 'Income', desc: 'Monthly cash flow', icon: Wallet },
                    { label: 'Credit', desc: 'Repayment history', icon: BadgeCheck },
                    { label: 'Property', desc: 'Legal & valuation', icon: Building2 },
                  ].map((metric) => {
                    const MetricIcon = metric.icon;
                    return (
                      <div key={metric.label} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-[#0052cc]"><MetricIcon className="h-5 w-5" /></span>
                        <span><span className="block text-sm font-bold text-[#0a192f]">{metric.label}</span><span className="mt-1 block text-xs text-slate-500">{metric.desc}</span></span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {[
                { number: '01', title: 'Monthly income', desc: 'Your take-home income and its consistency help determine a comfortable repayment amount.' },
                { number: '02', title: 'Existing obligations', desc: 'EMIs, credit-card dues, and other commitments affect the amount available for a new EMI.' },
                { number: '03', title: 'Credit profile', desc: 'Your repayment history and credit score can influence lender assessment and offered terms.' },
                { number: '04', title: 'Property profile', desc: 'Location, legal title, valuation, and project approvals are considered during property review.' },
              ].map((item, index) => (
                <ScrollReveal key={item.number} delay={index * 70}>
                  <article className="group h-full premium-card rounded-[22px] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-lg">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-sm font-mono font-bold text-[#0052cc]">
                      {item.number}
                    </span>
                    <h3 className="mt-5 text-lg font-bold tracking-tight text-[#0a192f]">{item.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-slate-500">{item.desc}</p>
                  </article>
                </ScrollReveal>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-2xl border border-blue-100 bg-blue-50/70 p-6 sm:flex-row sm:items-center sm:p-8">
              <div>
                <p className="text-xs font-bold text-[#0052cc]">Not sure what you may qualify for?</p>
                <h3 className="mt-1 text-xl font-bold tracking-tight text-[#0a192f]">Start with an eligibility conversation.</h3>
                <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-slate-500">
                  Share your broad requirements with an advisor to understand the next steps. Final eligibility,
                  rates, and loan terms are decided by the lending institution.
                </p>
              </div>
              <a href="/contact" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#0052cc] hover:bg-[#003d8f] px-5 py-3 text-[14px] font-semibold text-white shadow-lg shadow-blue-900/10 transition-colors">
                Check eligibility <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ==================== 7. PROPERTY TYPES ==================== */}
        <section className="bg-slate-50 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div className="max-w-2xl">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0052cc]">Finance for different needs</span>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0a192f] sm:text-4xl leading-[1.12]">
                    What are you looking to{' '}
                    <span className="text-[#0052cc] font-serif font-normal tracking-normal">
                      finance?
                    </span>
                  </h2>
                </div>
                <p className="max-w-md text-[14px] sm:text-[15px] leading-relaxed text-slate-500">
                  Explore common home-finance requirements. Availability and property conditions vary by lender.
                </p>
              </div>
            </ScrollReveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Building2, title: 'Ready-to-move home', desc: 'For an apartment, independent house, or resale property that is ready for possession.' },
                { icon: Home, title: 'Under-construction property', desc: 'For eligible projects with milestone-based disbursement as construction progresses.' },
                { icon: TrendingUp, title: 'Plot purchase + construction', desc: 'Explore financing options for a residential plot and the construction planned on it.' },
                { icon: Percent, title: 'Balance transfer', desc: 'Review whether moving an existing home loan could improve your overall repayment cost.' },
                { icon: Sparkles, title: 'Home improvement', desc: 'Explore funding for eligible renovation, extension, or upgrade requirements.' },
                { icon: ShieldCheck, title: 'Top-up requirement', desc: 'Some lenders may offer additional finance to eligible existing home-loan customers.' },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <ScrollReveal key={item.title} delay={index * 60}>
                    <article className="group relative flex h-full gap-4 overflow-hidden premium-card rounded-[22px] p-6 transition-all hover:-translate-y-1">
                      <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-blue-50/80 transition-transform duration-500 group-hover:scale-125" />
                      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0052cc] to-sky-400 text-white shadow-lg shadow-blue-500/20 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#0a192f]">{item.title}</h3>
                        <p className="mt-2 text-[14px] leading-relaxed text-slate-500">{item.desc}</p>
                      </div>
                    </article>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================== 8. DOCUMENT CHECKLIST ==================== */}
        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
            <ScrollReveal className="lg:col-span-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0052cc]">Get application-ready</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0a192f] sm:text-4xl leading-[1.12]">
                Keep your documents within{' '}
                <span className="text-[#0052cc] font-serif font-normal tracking-normal">
                  reach.
                </span>
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-500">
                Requirements differ across lenders and applicant profiles. This starter checklist can help
                you organise commonly requested documents before beginning an application.
              </p>
              <div className="mt-7 mb-5 flex items-center gap-3 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-white p-4">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-blue-100">
                  <FileText className="h-7 w-7 text-[#0052cc]" />
                  <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full border-2 border-white bg-[#8ec843]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0a192f]">Your document checklist</p>
                  <p className="mt-1 text-xs text-slate-500">Keep essential details organised before you begin.</p>
                  <div className="mt-2 flex gap-1"><span className="h-1.5 w-10 rounded-full bg-[#0052cc]" /><span className="h-1.5 w-7 rounded-full bg-sky-300" /><span className="h-1.5 w-5 rounded-full bg-blue-100" /></div>
                </div>
              </div>
              <div className="mt-7 rounded-2xl bg-[#0a192f] p-6 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-sky-300">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold">Property documents may be requested separately</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-300">Sale agreement, title chain, approved plan, allotment letter, or builder documents, as applicable.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
              {[
                { title: 'For salaried applicants', docs: ['PAN and identity/address proof', 'Recent salary slips', 'Recent bank statements', 'Form 16 or income-tax documents', 'Employment details'] },
                { title: 'For self-employed applicants', docs: ['PAN and identity/address proof', 'Recent income-tax returns', 'Business registration or proof', 'Business and personal bank statements', 'Financial statements, where required'] },
              ].map((group, index) => (
                <ScrollReveal key={group.title} delay={index * 100}>
                  <div className="h-full premium-card rounded-[22px] p-6">
                    <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-[#0052cc]">
                        <ClipboardCheck className="h-5 w-5" />
                      </div>
                      <h3 className="font-bold text-[#0a192f]">{group.title}</h3>
                    </div>
                    <ul className="mt-5 space-y-3">
                      {group.docs.map((doc) => (
                        <li key={doc} className="flex items-start gap-2.5 text-[14px] text-slate-600">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#558b2f]" />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 9. COST TRANSPARENCY ==================== */}
        <section className="bg-slate-50 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="grid lg:grid-cols-5">
                  <div className="bg-gradient-to-br from-[#0a192f] to-[#123d70] p-8 text-white sm:p-10 lg:col-span-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sky-300">Know the full picture</span>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight leading-[1.12]">
                      Look beyond the{' '}
                      <span className="font-serif font-normal text-sky-300">
                        interest rate.
                      </span>
                    </h2>
                    <p className="mt-4 text-[14px] leading-relaxed text-blue-100">
                      Compare the total cost of borrowing—not just the advertised rate—before choosing a lender.
                    </p>
                    <div className="mt-6 rounded-2xl border border-white/15 bg-white/[0.07] p-4 backdrop-blur-sm">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-sky-200">Think in total cost</span>
                        <Wallet className="h-4 w-4 text-cyan-300" />
                      </div>
                      <div className="space-y-2.5">
                        <div><div className="mb-1 flex justify-between text-[11px] text-blue-100"><span>Interest</span><span>Compare</span></div><div className="h-2 overflow-hidden rounded-full bg-white/15"><div className="h-full w-[78%] rounded-full bg-sky-300" /></div></div>
                        <div><div className="mb-1 flex justify-between text-[11px] text-blue-100"><span>Fees & charges</span><span>Review</span></div><div className="h-2 overflow-hidden rounded-full bg-white/15"><div className="h-full w-[38%] rounded-full bg-[#8ec843]" /></div></div>
                        <div><div className="mb-1 flex justify-between text-[11px] text-blue-100"><span>Prepayment terms</span><span>Check</span></div><div className="h-2 overflow-hidden rounded-full bg-white/15"><div className="h-full w-[55%] rounded-full bg-amber-300" /></div></div>
                      </div>
                      <p className="mt-3 text-[10px] leading-relaxed text-blue-200">Illustrative comparison categories — not actual cost percentages.</p>
                    </div>
                    <a href="/calculator" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-[14px] font-semibold text-[#0a192f] transition hover:bg-blue-50">
                      Estimate your EMI <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                  <div className="grid gap-6 p-8 sm:grid-cols-2 sm:p-10 lg:col-span-3">
                    {[
                      { title: 'Processing fee', desc: 'A lender may charge a processing or application fee, sometimes with applicable taxes.' },
                      { title: 'Legal & valuation', desc: 'Property checks and valuation may involve separate charges depending on the lender.' },
                      { title: 'Insurance options', desc: 'Understand whether any insurance is optional, required, or bundled with an offer.' },
                      { title: 'Prepayment conditions', desc: 'Check the applicable rules for part-payments, foreclosure, and fixed or floating rates.' },
                    ].map((item) => (
                      <div key={item.title} className="flex gap-3">
                        <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0052cc]">
                          <CheckCircle2 className="h-4 w-4" />
                        </span>
                        <div>
                          <h3 className="font-bold text-[#0a192f]">{item.title}</h3>
                          <p className="mt-1 text-[14px] leading-relaxed text-slate-500">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-slate-500">
                *All rates, funding percentages, fees, tenure, and approval timelines shown on this page are indicative examples only.
                Actual terms, eligibility, charges, and approval decisions are determined by the respective lender and may change
                based on applicant and property assessment. No loan approval or rate is guaranteed.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ==================== 10. FAQs SECTION ==================== */}
        <section className="py-16 lg:py-24 bg-white border-t border-slate-200/80">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0052cc]">
                  Got Questions?
                </span>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0a192f] sm:text-4xl leading-[1.12]">
                  Frequently Asked{' '}
                  <span className="text-[#0052cc] font-serif font-normal tracking-normal">
                    Questions
                  </span>
                </h2>
                <p className="mt-3 text-[15px] text-slate-500">
                  Everything you need to know about home loan eligibility, interest rates, and
                  documentation.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={60}>
              <div className="mb-8 flex flex-col items-center justify-between gap-5 overflow-hidden rounded-[24px] border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-cyan-50 p-5 sm:flex-row sm:p-6">
                <div className="flex items-center gap-4">
                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0052cc] to-sky-400 text-white shadow-lg shadow-blue-500/20">
                    <PhoneCall className="h-7 w-7" />
                    <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full border-2 border-white bg-[#8ec843]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#0052cc]">Need a human answer?</p>
                    <h3 className="mt-1 text-lg font-bold tracking-tight text-[#0a192f]">A home-loan specialist can help clarify your next step.</h3>
                    <p className="mt-1 text-xs text-slate-500">Ask about documents, lender terms, or the application process.</p>
                  </div>
                </div>
                <a href="/contact" className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-[#0a192f] shadow-sm transition hover:border-slate-300 hover:bg-slate-50">
                  Talk to an advisor <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </ScrollReveal>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <ScrollReveal key={faq.question} delay={idx * 60}>
                    <div
                      className={`rounded-2xl border transition-all ${
                        isOpen
                          ? 'border-[#0052cc]/40 bg-gradient-to-r from-blue-50/90 to-white shadow-md shadow-blue-900/5'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                      >
                        <span className="text-[15px] sm:text-base font-bold text-[#0a192f]">{faq.question}</span>
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-[#0052cc] transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      <div
                        className={`grid transition-all duration-300 ease-in-out ${
                          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="px-6 pb-5 text-[14px] leading-relaxed text-slate-500">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            {/* Bottom Contact & Apply Banner */}
            <ScrollReveal delay={150}>
              <div className="mt-16 relative overflow-hidden rounded-[30px] bg-gradient-to-br from-[#07172d] via-[#103767] to-[#0063df] p-8 sm:p-11 text-white shadow-[0_30px_70px_-35px_rgba(0,82,204,.55)] ring-1 ring-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <h3 className="text-2xl font-bold tracking-tight">
                    Still have questions about{' '}
                    <span className="font-serif font-normal text-sky-300">
                      your case?
                    </span>
                  </h3>
                  <p className="text-[14px] text-blue-100 max-w-xl">
                    Connect directly with a housing loan specialist for a free eligibility review or
                    jump straight into your online application.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-[14px] font-semibold text-[#0a192f] shadow-sm transition hover:bg-blue-50"
                  >
                    <PhoneCall className="h-4 w-4 text-[#0052cc]" />
                    <span>Contact Us</span>
                  </a>
                  <a
                    href="/apply"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#8ec843] px-5 py-3 text-[14px] font-semibold text-[#0a192f] shadow-sm transition hover:opacity-95"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </InteriorPage>
  );
}