// src/components/footer.tsx
import React from 'react';

const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" {...props}>
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
  </svg>
);

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Youtube = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" {...props}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
    <polygon points="10 15 15 12 10 9" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#091525] text-slate-300 font-sans relative overflow-hidden pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Newsletter Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pb-12 border-b border-[#1a2737]">
          <div className="mb-6 lg:mb-0">
            <h2 className="text-[2.5rem] leading-tight font-bold text-white tracking-tight">
              Rate updates & money tips,
            </h2>
            <p className="text-[2.5rem] leading-tight font-serif italic text-[#8ec843]">
              once a month.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full sm:w-[320px] bg-transparent border border-[#2a3747] rounded-md px-5 py-3.5 text-white focus:outline-none focus:border-slate-400 placeholder-slate-500 text-sm"
            />
            <button className="bg-white text-slate-900 font-semibold px-8 py-3.5 rounded-md hover:bg-slate-100 transition-colors text-sm">
              Subscribe
            </button>
          </div>
        </div>

        {/* Main Links Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 py-16 border-b border-[#1a2737]">
          
          {/* Brand & Description */}
          <div className="lg:col-span-4 lg:pr-12">
            <div className="flex items-center gap-4 mb-6">
              <a href="/">
                <img 
                  src="/logo12.jpeg" 
                  alt="Saiban Capital Solutions Logo" 
                  className="w-11 h-11 object-contain rounded-xl shadow-sm border border-slate-800"
                />
              </a>
              <div>
                <h3 className="text-[1.35rem] font-bold text-white tracking-wide leading-none mb-1.5">
                  SAIBAN
                </h3>
                <p className="text-[0.55rem] tracking-[0.25em] text-slate-400 font-semibold uppercase">
                  Capital Solutions
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-400/90 leading-relaxed mb-8">
              Independent loan advisory helping families and businesses borrow better — home, personal and business loans from trusted lenders.
            </p>
            <div className="flex gap-3">
              {[Linkedin, Instagram, Facebook, Youtube].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-9 h-9 rounded border border-[#2a3747] flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-all"
                >
                  <Icon width={16} height={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Loans Column */}
          <div className="lg:col-span-2">
            <h4 className="text-[0.65rem] font-semibold text-slate-500 tracking-[0.15em] uppercase mb-6">
              LOANS
            </h4>
            <ul className="space-y-3.5 text-[0.9rem] text-[#c0cbd8]">
              <li><a href="#" className="hover:text-white transition">Home Loan</a></li>
              <li><a href="#" className="hover:text-white transition">Personal Loan</a></li>
              <li><a href="/apply" className="hover:text-white transition">Business Loan</a></li>
              <li><a href="#" className="hover:text-white transition">Loan Against Property</a></li>
              <li><a href="#" className="hover:text-white transition">Balance Transfer</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-2">
            <h4 className="text-[0.65rem] font-semibold text-slate-500 tracking-[0.15em] uppercase mb-6">
              COMPANY
            </h4>
            <ul className="space-y-3.5 text-[0.9rem] text-[#c0cbd8]">
              <li><a href="#" className="hover:text-white transition">About us</a></li>
              <li><a href="#" className="hover:text-white transition">Our partners</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
              <li><a href="/contact" className="hover:text-white transition font-semibold text-white">
        Contact
      </a></li>
            </ul>
          </div>

          {/* Resources Column with EMI Calculator link */}
          <div className="lg:col-span-2">
            <h4 className="text-[0.65rem] font-semibold text-slate-500 tracking-[0.15em] uppercase mb-6">
              RESOURCES
            </h4>
            <ul className="space-y-3.5 text-[0.9rem] text-[#c0cbd8]">
              <li>
                <a href="/calculator" className="hover:text-white transition font-semibold text-white">
                  EMI calculator
                </a>
              </li>
              <li><a href="#" className="hover:text-white transition">Eligibility check</a></li>
              <li><a href="#" className="hover:text-white transition">Knowledge centre</a></li>
              <li><a href="#" className="hover:text-white transition">FAQs</a></li>
            </ul>
          </div>

          {/* Head Office Column */}
          <div className="lg:col-span-2">
            <h4 className="text-[0.65rem] font-semibold text-slate-500 tracking-[0.15em] uppercase mb-6">
              HEAD OFFICE
            </h4>
            <ul className="space-y-3.5 text-[0.9rem] text-[#c0cbd8]">
              <li>[Office address line 1]</li>
              <li>Bangalore, Karnataka – 560001</li>
              <li className="pt-2">+91 91011 25757</li>
              <li>[hello@saibancapital.in]</li>
            </ul>
          </div>

        </div>

        {/* Legal & Copyright Section */}
        <div className="pt-8 pb-32">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-xs text-[#8c9bab] mb-6">
            <p>© 2026 Saiban Capital Solutions. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">Privacy policy</a>
              <a href="#" className="hover:text-white transition">Terms of use</a>
              <a href="#" className="hover:text-white transition">Grievance redressal</a>
            </div>
          </div>
          <p className="text-[0.7rem] text-[#6b7b8f] leading-relaxed max-w-[85%]">
            Saiban Capital Solutions is a loan facilitation and advisory service. Loans are sanctioned at the sole discretion of partner banks and NBFCs, subject to their credit policies. Rates shown are indicative.
          </p>
        </div>

      </div>

      {/* Background Watermark */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none flex justify-center translate-y-[32%] z-0">
        <span className="text-[22vw] font-bold text-white opacity-[0.02] leading-none whitespace-nowrap select-none">
          SAIBAN
        </span>
      </div>
    </footer>
  );
}