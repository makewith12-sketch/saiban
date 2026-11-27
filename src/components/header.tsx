// src/components/header.tsx
import { useState, useRef, useEffect, type ReactNode } from 'react';
import { Phone, Menu, X, Calculator, ChevronDown, ArrowRight } from 'lucide-react';

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

interface SubMenuItem {
  label: string;
  href: string;
}

interface NavLinkItem {
  label: string;
  href: string;
  icon?: ReactNode;
  dropdownItems?: SubMenuItem[];
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Business Loans dropdown items (exact initial items)
  const businessLoanSubItems: SubMenuItem[] = [
    { label: 'Secured term loan', href: '/business-loans/secured-term-loan' },
    { label: 'Working capital', href: '/business-loans/working-capital' },
    { label: 'Machinery & equipment', href: '/business-loans/machinery-equipment' },
    { label: 'Invoice discounting', href: '/business-loans/invoice-discounting' },
    { label: 'Supply chain finance', href: '/business-loans/supply-chain-finance' },
    { label: 'Last-mile funding', href: '/business-loans/last-mile-funding' },
    { label: 'Eligibility check', href: '/business-loans/eligibility-check' },
  ];

  // Serial-wise desktop navigation links (exact initial items)
  const desktopNavLinks: NavLinkItem[] = [
    { label: 'Home Loans', href: '/home-loans' },
    { label: 'Personal Loans', href: '/personal-loans' },
    {
      label: 'Business Loans',
      href: '/business-loans',
      dropdownItems: businessLoanSubItems,
    },
    {
      label: 'CIBIL Score',
      href: '/cibil-score',
      icon: <CreditGaugeIcon className="h-4 w-6 shrink-0" />,
    },
    {
      label: 'EMI Calculator',
      href: 'http://localhost:5173/calculator',
      icon: (
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[#0052cc] group-hover:bg-[#0052cc] group-hover:text-white transition-colors">
          <Calculator className="h-3.5 w-3.5" />
        </span>
      ),
    },
  ];

  // Mobile drawer links (exact initial items)
  const mobileDrawerLinks: NavLinkItem[] = [
    { label: 'Home Loans', href: '/home-loans' },
    { label: 'Personal Loans', href: '/personal-loans' },
    {
      label: 'Business Loans',
      href: '/business-loans',
      dropdownItems: businessLoanSubItems,
    },
    { label: 'About', href: '/about' },
    // { label: 'Insights', href: '/insights' },
  ];

  // Scroll listener for dynamic sticky header compression & glass effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 14);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleApplyClick = () => {
    setIsMobileMenuOpen(false);
    window.location.href = '/apply';
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .header-grid {
          background-color: #fcfcfd;
          background-size: 32px 32px;
          background-image: 
            linear-gradient(to right, rgba(0, 82, 204, 0.028) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 82, 204, 0.028) 1px, transparent 1px);
        }
        .header-grid-scrolled {
          background-color: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          background-size: 32px 32px;
          background-image: 
            linear-gradient(to right, rgba(0, 82, 204, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 82, 204, 0.02) 1px, transparent 1px);
        }
      `,
        }}
      />

      <header
        className={`sticky top-0 left-0 right-0 w-full z-50 font-sans transition-all duration-300 ${
          isScrolled
            ? 'header-grid-scrolled border-b border-slate-200/90 shadow-[0_8px_28px_-6px_rgba(10,25,47,0.1)]'
            : 'header-grid border-b border-slate-200/80'
        }`}
      >
        {/* Top signature royal-blue accent hairline */}
        <div className="h-[2.5px] w-full bg-gradient-to-r from-[#0a192f] via-[#0052cc] to-[#2684ff]" />

        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <div
            className={`flex items-center justify-between gap-3 transition-all duration-300 ${
              isScrolled ? 'h-[4rem] lg:h-[4.4rem]' : 'h-[4.85rem] lg:h-[5.4rem]'
            }`}
          >
            {/* 1. Logo + SaibanCapital Brand Name */}
            <div className="flex-shrink-0 flex items-center">
              <a href="/" className="flex items-center gap-2.5 sm:gap-3 group">
                <img
                  src="/logo12.jpeg"
                  alt="SaibanCapital Logo"
                  className={`w-auto object-contain rounded-lg ring-1 ring-slate-200/80 transition-all duration-300 group-hover:scale-[1.03] ${
                    isScrolled ? 'h-8 sm:h-9' : 'h-9 sm:h-10 lg:h-11'
                  }`}
                />
                <span
                  className={`font-extrabold tracking-tight text-[#0a192f] group-hover:text-[#0052cc] transition-all duration-300 ${
                    isScrolled
                      ? 'text-[17px] sm:text-[19px] lg:text-[20px]'
                      : 'text-lg sm:text-xl lg:text-[21px]'
                  }`}
                >
                  Saiban<span className="text-[#0052cc]">Capital</span>
                </span>
              </a>
            </div>

            {/* 2. Desktop Serial-Wise Navigation Links */}
            <nav className="hidden lg:flex items-center gap-2 xl:gap-4" ref={dropdownRef}>
              {desktopNavLinks.map((link) =>
                link.dropdownItems ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <div
                      className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 transition-colors ${
                        openDropdown === link.label
                          ? 'bg-blue-50/80 text-[#0052cc]'
                          : 'hover:bg-slate-100/70'
                      }`}
                    >
                      <a
                        href={link.href}
                        className={`text-[14px] font-semibold transition-colors whitespace-nowrap ${
                          openDropdown === link.label
                            ? 'text-[#0052cc]'
                            : 'text-[#0a192f] hover:text-[#0052cc]'
                        }`}
                      >
                        {link.label}
                      </a>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenDropdown(openDropdown === link.label ? null : link.label)
                        }
                        aria-label={`Toggle ${link.label} menu`}
                        aria-expanded={openDropdown === link.label}
                        className="p-0.5 text-current cursor-pointer"
                      >
                        <ChevronDown
                          size={15}
                          strokeWidth={2.5}
                          className={`transition-transform duration-200 ${
                            openDropdown === link.label ? 'rotate-180 text-[#0052cc]' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {/* Clean Animated Dropdown Card */}
                    <div
                      className={`absolute left-0 top-full pt-2 w-64 z-50 transition-all duration-200 origin-top-left ${
                        openDropdown === link.label
                          ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 scale-95 -translate-y-1.5 pointer-events-none'
                      }`}
                    >
                      <div className="bg-white rounded-xl border border-slate-200/90 shadow-[0_14px_34px_rgba(10,25,47,0.12)] p-2 flex flex-col gap-0.5">
                        {link.dropdownItems.map((subItem) => (
                          <a
                            key={subItem.label}
                            href={subItem.href}
                            onClick={() => setOpenDropdown(null)}
                            className="group/item flex items-center justify-between px-3.5 py-2.5 rounded-lg text-[14px] font-medium text-[#1e293b] hover:bg-blue-50/80 hover:text-[#0052cc] transition-colors"
                          >
                            <span>{subItem.label}</span>
                            <ArrowRight
                              size={13}
                              className="text-[#0052cc] opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200"
                            />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`group inline-flex items-center gap-1.5 text-[14px] font-semibold transition-all duration-200 whitespace-nowrap ${
                      link.icon
                        ? 'rounded-full border border-blue-200/80 bg-white px-3 py-1.5 text-[#0052cc] hover:border-[#0052cc] hover:bg-blue-50/70 hover:-translate-y-0.5 shadow-[0_2px_8px_rgba(0,82,204,0.06)]'
                        : 'rounded-lg px-2.5 py-1.5 text-[#0a192f] hover:bg-slate-100/70 hover:text-[#0052cc]'
                    }`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </a>
                )
              )}
            </nav>

            {/* 3. Desktop Actions (Phone & Apply Button) */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-5 shrink-0">
              <a
                href="tel:+918127727747"
                className="group flex items-center gap-2 text-[#0a192f] hover:text-[#0052cc] font-semibold text-[14px] whitespace-nowrap transition-colors"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-[#0052cc] group-hover:bg-[#0052cc] group-hover:text-white transition-colors">
                  <Phone size={13.5} strokeWidth={2.5} />
                </span>
                <span>+91 8127727747</span>
              </a>
              <button
                onClick={handleApplyClick}
                className="group inline-flex items-center gap-1.5 bg-[#0052cc] hover:bg-[#003d8f] active:scale-[0.98] text-white font-bold text-[14px] px-5 py-2.5 rounded-xl transition-all duration-200 shadow-[0_4px_14px_rgba(0,82,204,0.26)] hover:shadow-[0_6px_20px_rgba(0,82,204,0.36)] whitespace-nowrap cursor-pointer"
              >
                <span>Apply now</span>
                <ArrowRight
                  size={15}
                  strokeWidth={2.5}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </button>
            </div>

            {/* Mobile Right Controls */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={handleApplyClick}
                className="bg-[#0052cc] active:bg-[#003d8f] text-white font-bold text-[12.5px] px-3 py-1.5 rounded-lg shadow-[0_2px_10px_rgba(0,82,204,0.24)] transition-all"
              >
                Apply now
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Menu"
                aria-expanded={isMobileMenuOpen}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200/80 bg-white text-[#0a192f] hover:text-[#0052cc] active:scale-95 transition-all"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile-Only Sticky Quick-Access Strip */}
        <div
          className={`lg:hidden w-full bg-white/95 border-t border-slate-100 transition-shadow duration-300 ${
            isScrolled ? 'shadow-[0_4px_12px_rgba(10,25,47,0.06)]' : ''
          }`}
        >
          <div className="grid grid-cols-2 divide-x divide-slate-200/80 py-2 px-2">
            {/* Left: Free CIBIL Score */}
            <a
              href="/cibil-score"
              className="flex items-center justify-center gap-2 px-2 py-1 rounded-md active:bg-blue-50/70 transition-colors"
            >
              <CreditGaugeIcon className="h-4.5 w-6.5 shrink-0" />
              <span className="text-[12.5px] font-extrabold text-[#0052cc] tracking-tight whitespace-nowrap">
                Free CIBIL Score
              </span>
            </a>

            {/* Right: EMI Calculator */}
            <a
              href="http://localhost:5173/calculator"
              className="flex items-center justify-center gap-2 px-2 py-1 rounded-md active:bg-blue-50/70 transition-colors"
            >
              <span className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[#0052cc]">
                <Calculator className="h-3.5 w-3.5" />
              </span>
              <span className="text-[12.5px] font-extrabold text-[#0052cc] tracking-tight whitespace-nowrap">
                EMI Calculator
              </span>
            </a>
          </div>
        </div>

        {/* Mobile Menu Backdrop */}
        <div
          className={`lg:hidden fixed inset-0 top-full bg-[#0a192f]/35 backdrop-blur-[2px] transition-opacity duration-300 z-40 ${
            isMobileMenuOpen
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Mobile Menu Drawer */}
        <div
          className={`lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-2xl px-4 flex flex-col gap-1 z-50 overflow-y-auto transition-all duration-300 ease-out origin-top ${
            isMobileMenuOpen
              ? 'max-h-[calc(100dvh-7rem)] py-4 opacity-100 translate-y-0'
              : 'max-h-0 py-0 opacity-0 -translate-y-2 pointer-events-none overflow-hidden'
          }`}
        >
          {mobileDrawerLinks.map((link) =>
            link.dropdownItems ? (
              <div key={link.label} className="border-b border-slate-100 py-1">
                <div className="flex items-center justify-between py-1.5">
                  <a
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-[15px] font-semibold text-[#0a192f] hover:text-[#0052cc]"
                  >
                    {link.label}
                  </a>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenMobileSubmenu(
                        openMobileSubmenu === link.label ? null : link.label
                      )
                    }
                    aria-label={`Expand ${link.label}`}
                    className="p-1.5 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-[#0052cc] transition-colors"
                  >
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-200 ${
                        openMobileSubmenu === link.label ? 'rotate-180 text-[#0052cc]' : ''
                      }`}
                    />
                  </button>
                </div>

                {openMobileSubmenu === link.label && (
                  <div className="pl-3 pb-2 pt-1 flex flex-col gap-1 border-l-2 border-[#0052cc]/30 ml-1">
                    {link.dropdownItems.map((subItem) => (
                      <a
                        key={subItem.label}
                        href={subItem.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="py-2 px-2.5 rounded-lg text-[14px] font-medium text-slate-700 hover:bg-blue-50/70 hover:text-[#0052cc] transition-colors"
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[15px] font-semibold text-[#0a192f] hover:text-[#0052cc] py-2.5 border-b border-slate-100 last:border-0 transition-colors"
              >
                {link.label}
              </a>
            )
          )}

          <div className="flex flex-col gap-2.5 mt-3 pt-3 border-t border-slate-100">
            <a
              href="tel:+918127727747"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-[#0a192f] font-semibold text-[14.5px]"
            >
              <Phone size={16} strokeWidth={2.5} className="text-[#0052cc]" />
              <span>+91 8127727747</span>
            </a>
            <button
              onClick={handleApplyClick}
              className="w-full flex items-center justify-center gap-1.5 bg-[#0052cc] active:bg-[#003d8f] text-white font-bold text-[15px] px-6 py-3 rounded-xl shadow-md"
            >
              <span>Apply now</span>
              <ArrowRight size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}