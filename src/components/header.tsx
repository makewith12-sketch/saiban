// src/components/header.tsx
import { useState, type ReactNode } from 'react';
import { Phone, Menu, X, Calculator } from 'lucide-react';

/** Custom Multi-Color Credit Score Gauge SVG */
function CreditGaugeIcon({ className = 'h-5 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 22" fill="none" className={className} aria-hidden="true">
      {/* Red Segment */}
      <path
        d="M4 18A14 14 0 0 1 9.5 6.8"
        stroke="#ef4444"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Amber/Yellow Segment */}
      <path
        d="M12.2 5.2A14 14 0 0 1 23.8 5.2"
        stroke="#f59e0b"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Green Segment */}
      <path
        d="M26.5 6.8A14 14 0 0 1 32 18"
        stroke="#10b981"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Needle pointing to Good/Green */}
      <circle cx="18" cy="18" r="2.5" fill="#0a192f" />
      <path
        d="M18 18L26.5 10.5"
        stroke="#0a192f"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface NavLinkItem {
  label: string;
  href: string;
  icon?: ReactNode;
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Serial-wise desktop navigation links with icons on CIBIL Score & EMI Calculator
  const desktopNavLinks: NavLinkItem[] = [
    { label: 'Home Loans', href: '/home-loans' },
    { label: 'Personal Loans', href: '/personal-loans' },
    { label: 'Business Loans', href: '/business-loans' },
    {
      label: 'CIBIL Score',
      href: '/cibil-score',
      icon: <CreditGaugeIcon className="h-4 w-6 shrink-0" />,
    },
    {
      label: 'EMI Calculator',
      href: 'http://localhost:5173/calculator',
      icon: (
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-blue-50 text-[#0052cc] group-hover:bg-[#0052cc] group-hover:text-white transition-colors">
          <Calculator className="h-3.5 w-3.5" />
        </span>
      ),
    },
    // { label: 'About', href: '/about' },
    // { label: 'Insights', href: '/insights' },
  ];

  // Mobile drawer links (CIBIL Score & EMI Calculator appear in the dedicated mobile bar below header)
  const mobileDrawerLinks = [
    { label: 'Home Loans', href: '/home-loans' },
    { label: 'Personal Loans', href: '/personal-loans' },
    { label: 'Business Loans', href: '/business-loans' },
    { label: 'About', href: '/about' },
    { label: 'Insights', href: '/insights' },
  ];

  const handleApplyClick = () => {
    setIsMobileMenuOpen(false);
    window.location.href = '/apply';
  };

  return (
    <>
      {/* Background Grid Style matching the design */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .header-grid {
          background-color: #fcfcfd;
          background-size: 32px 32px;
          background-image: 
            linear-gradient(to right, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.02) 1px, transparent 1px);
        }
      `,
        }}
      />

      <header className="relative w-full border-b border-slate-200/80 header-grid z-50 font-sans">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-[5.25rem] lg:h-[5.5rem] gap-3">
            {/* 1. Logo + SaibanCapital Brand Name */}
            <div className="flex-shrink-0 flex items-center">
              <a href="/" className="flex items-center gap-2.5 sm:gap-3 group">
                <img
                  src="/logo12.jpeg"
                  alt="SaibanCapital Logo"
                  className="h-9 sm:h-10 lg:h-11 w-auto object-contain rounded-md"
                />
                <span className="text-lg sm:text-xl lg:text-[21px] font-extrabold tracking-tight text-[#0a192f] group-hover:text-[#0052cc] transition-colors">
                  Saiban<span className="text-[#0052cc]">Capital</span>
                </span>
              </a>
            </div>

            {/* 2. Desktop Serial-Wise Navigation Links (With Icons for CIBIL & EMI Calculator) */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
              {desktopNavLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`group inline-flex items-center gap-1.5 text-[14px] font-semibold transition-colors whitespace-nowrap ${
                    link.icon
                      ? 'rounded-lg border border-blue-100 bg-white/90 px-2.5 py-1.5 text-[#0052cc] hover:border-[#0052cc] hover:bg-blue-50/60 shadow-2xs'
                      : 'text-[#0a192f] hover:text-[#0052cc]'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </a>
              ))}
            </nav>

            {/* 3. Desktop Actions (Phone & Apply Button) */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-5 shrink-0">
              <a
                href="tel:+918127727747"
                className="flex items-center gap-1.5 text-[#0a192f] hover:text-[#0052cc] font-semibold text-[14px] whitespace-nowrap transition-colors"
              >
                <Phone size={15} strokeWidth={2.5} className="text-[#0052cc]" />
                <span>+91 8127727747</span>
              </a>
              <button
                onClick={handleApplyClick}
                className="bg-[#0052cc] hover:bg-[#003d8f] text-white font-bold text-[14px] px-5 py-2.5 rounded-lg transition-colors shadow-[0_4px_14px_rgba(0,82,204,0.25)] whitespace-nowrap cursor-pointer"
              >
                Apply now
              </button>
            </div>

            {/* Mobile Hamburger Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Menu"
                className="text-[#0a192f] p-2 focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile-Only Quick-Access Strip (Matches Attached Reference Image) */}
        <div className="lg:hidden w-full bg-white border-t border-slate-100 shadow-[0_2px_10px_rgba(10,25,47,0.04)]">
          <div className="grid grid-cols-2 divide-x divide-slate-200 py-2.5 px-2">
            {/* Left: Free CIBIL Score */}
            <a
              href="/cibil-score"
              className="flex items-center justify-center gap-2 px-2 py-1 active:bg-blue-50/60 transition-colors"
            >
              <CreditGaugeIcon className="h-5 w-7 shrink-0" />
              <span className="text-[13px] font-extrabold text-[#0052cc] tracking-tight whitespace-nowrap">
                Free CIBIL Score
              </span>
            </a>

            {/* Right: EMI Calculator */}
            <a
              href="http://localhost:5173/calculator"
              className="flex items-center justify-center gap-2 px-2 py-1 active:bg-blue-50/60 transition-colors"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[#0052cc]">
                <Calculator className="h-3.5 w-3.5" />
              </span>
              <span className="text-[13px] font-extrabold text-[#0052cc] tracking-tight whitespace-nowrap">
                EMI Calculator
              </span>
            </a>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl py-4 px-4 flex flex-col gap-3 z-50">
            {mobileDrawerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[15px] font-semibold text-[#0a192f] hover:text-[#0052cc] py-2 border-b border-slate-50 last:border-0"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 mt-2 pt-3 border-t border-slate-100">
              <a
                href="tel:+918127727747"
                className="flex items-center gap-2 text-[#0a192f] font-semibold text-[15px]"
              >
                <Phone size={18} strokeWidth={2.5} className="text-[#0052cc]" />
                <span>+91 8127727747</span>
              </a>
              <button
                onClick={handleApplyClick}
                className="w-full bg-[#0052cc] text-white font-bold text-[15px] px-6 py-3 rounded-lg shadow-md"
              >
                Apply now
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}