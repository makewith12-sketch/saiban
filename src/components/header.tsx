// src/components/header.tsx
import { useState, useRef, useEffect, type ReactNode } from 'react';
import {
  Phone,
  Menu,
  X,
  Calculator,
  ChevronDown,
  ArrowRight,
  Building2,
  Briefcase,
  Cog,
  FileSpreadsheet,
  Network,
  Zap,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

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
  subtitle?: string;
  icon?: ReactNode;
}

interface NavLinkItem {
  label: string;
  href: string;
  icon?: ReactNode;
  badge?: string;
  dropdownItems?: SubMenuItem[];
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(118);

  const headerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Business Loans dropdown items (all exact routes & labels preserved)
  const businessLoanSubItems: SubMenuItem[] = [
    {
      label: 'Secured term loan',
      href: '/business-loans/secured-term-loan',
      subtitle: 'Long-term asset-backed growth capital',
      icon: <Building2 className="h-4 w-4" />,
    },
    {
      label: 'Working capital',
      href: '/business-loans/working-capital',
      subtitle: 'Manage daily operations & cash flow',
      icon: <Briefcase className="h-4 w-4" />,
    },
    {
      label: 'Machinery & equipment',
      href: '/business-loans/machinery-equipment',
      subtitle: 'Upgrade plants, tools & technology',
      icon: <Cog className="h-4 w-4" />,
    },
    {
      label: 'Invoice discounting',
      href: '/business-loans/invoice-discounting',
      subtitle: 'Unlock cash tied in unpaid invoices',
      icon: <FileSpreadsheet className="h-4 w-4" />,
    },
    {
      label: 'Supply chain finance',
      href: '/business-loans/supply-chain-finance',
      subtitle: 'Optimize vendor & dealer liquidity',
      icon: <Network className="h-4 w-4" />,
    },
    {
      label: 'Last-mile funding',
      href: '/business-loans/last-mile-funding',
      subtitle: 'Bridge urgent project completion gaps',
      icon: <Zap className="h-4 w-4" />,
    },
    {
      label: 'Eligibility check',
      href: '/business-loans/eligibility-check',
      subtitle: 'Instant pre-qualification assessment',
      icon: <CheckCircle2 className="h-4 w-4" />,
    },
  ];

  // Primary loan product links
  const primaryLoanLinks: NavLinkItem[] = [
    { label: 'Home Loans', href: '/home-loans' },
    { label: 'Personal Loans', href: '/personal-loans' },
    {
      label: 'Business Loans',
      href: '/business-loans',
      dropdownItems: businessLoanSubItems,
    },
  ];

  // Interactive financial tool links
  const utilityToolLinks: NavLinkItem[] = [
    {
      label: 'CIBIL Score',
      href: '/cibil-score',
      badge: 'Free',
      icon: <CreditGaugeIcon className="h-4 w-6 shrink-0" />,
    },
    {
      label: 'EMI Calculator',
      href: '/calculator',
      icon: (
        <span className="flex h-5.5 w-5.5 xl:h-6 xl:w-6 shrink-0 items-center justify-center rounded-lg bg-[#0052cc]/10 text-[#0052cc] group-hover:bg-[#0052cc] group-hover:text-white transition-colors duration-200">
          <Calculator className="h-3.5 w-3.5" />
        </span>
      ),
    },
  ];

  // Mobile & Tablet drawer links
  const mobileDrawerLinks: NavLinkItem[] = [
    { label: 'Home Loans', href: '/home-loans' },
    { label: 'Personal Loans', href: '/personal-loans' },
    {
      label: 'Business Loans',
      href: '/business-loans',
      dropdownItems: businessLoanSubItems,
    },
    { label: 'About', href: '/about' },
  ];

  // Dynamically measure header height so mobile/tablet drawer aligns beneath the floating card
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.getBoundingClientRect().height);
      }
    };

    updateHeaderHeight();
    const observer = new ResizeObserver(updateHeaderHeight);
    if (headerRef.current) {
      observer.observe(headerRef.current);
    }
    window.addEventListener('resize', updateHeaderHeight, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, [isScrolled]);

  // Auto-close mobile drawer if viewport expands past lg (1024px)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsMobileMenuOpen(false);
      }
    };
    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 18);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile/tablet drawer is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close desktop dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleApplyClick = () => {
    setIsMobileMenuOpen(false);
    window.location.href = '/apply';
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 left-0 right-0 z-50 w-full font-sans transition-all duration-300 pt-2.5 px-3 sm:pt-3 sm:px-4 ${
          isScrolled ? 'lg:pt-2.5 xl:pt-3 lg:px-4 xl:px-6' : 'lg:pt-0 lg:px-0'
        }`}
      >
        {/* Main Header Shell: Always Floating Card on Mobile/Tablet (<1024px), Dynamic on Desktop */}
        <div
          className={`mx-auto transition-all duration-300 overflow-hidden lg:overflow-visible rounded-2xl sm:rounded-[20px] bg-white/95 backdrop-blur-xl border border-slate-300/90 ring-1 ring-white/80 shadow-[0_10px_28px_-6px_rgba(10,25,47,0.14),0_2px_6px_-1px_rgba(10,25,47,0.06)] ${
            isScrolled
              ? 'max-w-[1400px] lg:bg-white/92 lg:border-slate-200/85 lg:rounded-2xl lg:shadow-[0_12px_36px_-8px_rgba(10,25,47,0.12)]'
              : 'max-w-full lg:max-w-full lg:rounded-none lg:border-x-0 lg:border-t-0 lg:border-b lg:border-slate-200/75 lg:ring-0 lg:shadow-none'
          }`}
        >
          {/* Top royal-blue gradient hairline */}
          <div
            className={`h-[3px] lg:h-[2.5px] w-full bg-gradient-to-r from-[#0a192f] via-[#0052cc] to-[#38bdf8] transition-opacity duration-300 ${
              isScrolled ? 'lg:opacity-0' : 'opacity-100'
            }`}
          />

          <div className="max-w-[1440px] mx-auto px-3 sm:px-5 md:px-6 lg:px-5 xl:px-8">
            <div
              className={`flex items-center justify-between gap-2 sm:gap-3 lg:gap-2 xl:gap-4 transition-all duration-300 ${
                isScrolled
                  ? 'h-[3.6rem] sm:h-[3.85rem] lg:h-[4.15rem] xl:h-[4.35rem]'
                  : 'h-[3.85rem] sm:h-[4.25rem] lg:h-[4.75rem] xl:h-[5rem]'
              }`}
            >
              {/* 1. Brand Identity */}
              <div className="flex items-center shrink-0 min-w-0">
                <a
                  href="/"
                  className="group flex items-center gap-2 sm:gap-2.5 xl:gap-3 focus:outline-none"
                >
                  <div className="relative overflow-hidden rounded-xl border border-slate-200/90 shadow-xs bg-white p-0.5 transition-transform duration-300 group-hover:scale-[1.04] shrink-0">
                    <img
                      src="/logo12.jpeg"
                      alt="SaibanCapital Logo"
                      className={`w-auto object-contain rounded-lg transition-all duration-300 ${
                        isScrolled
                          ? 'h-7.5 sm:h-8 lg:h-8 xl:h-8.5'
                          : 'h-8 sm:h-9 lg:h-9 xl:h-10'
                      }`}
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span
                      className={`font-extrabold tracking-tight text-[#0a192f] leading-none truncate transition-all duration-300 ${
                        isScrolled
                          ? 'text-[16px] sm:text-[18px] lg:text-[17px] xl:text-[19px]'
                          : 'text-[16.5px] sm:text-[19px] lg:text-[18.5px] xl:text-[21px]'
                      }`}
                    >
                      Saiban<span className="text-[#0052cc]">Capital</span>
                    </span>
                    <span className="hidden min-[380px]:inline-block lg:hidden xl:inline-block text-[9px] sm:text-[9.5px] xl:text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 mt-0.5">
                      Smart Lending
                    </span>
                  </div>
                </a>
              </div>

              {/* 2. Desktop Navigation (lg: 1024px+ fluidly scaled to 2xl) */}
              <div
                className="hidden lg:flex items-center gap-2 xl:gap-4"
                ref={dropdownRef}
              >
                {/* Core Loan Products Pill Container */}
                <nav
                  aria-label="Primary Loan Products"
                  className="flex items-center gap-0.5 xl:gap-1 rounded-full bg-slate-100/85 p-1 border border-slate-200/60"
                >
                  {primaryLoanLinks.map((link) =>
                    link.dropdownItems ? (
                      <div
                        key={link.label}
                        className="relative"
                        onMouseEnter={() => setOpenDropdown(link.label)}
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        <div
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 xl:px-3.5 py-1.5 text-[12.5px] xl:text-[13.5px] font-semibold transition-all duration-200 ${
                            openDropdown === link.label
                              ? 'bg-white text-[#0052cc] shadow-sm ring-1 ring-slate-200/70'
                              : 'text-[#0a192f] hover:bg-white/70 hover:text-[#0052cc]'
                          }`}
                        >
                          <a href={link.href} className="whitespace-nowrap">
                            {link.label}
                          </a>
                          <button
                            type="button"
                            onClick={() =>
                              setOpenDropdown(
                                openDropdown === link.label ? null : link.label
                              )
                            }
                            aria-label={`Toggle ${link.label} menu`}
                            aria-expanded={openDropdown === link.label}
                            className="p-0.5 text-current cursor-pointer focus:outline-none"
                          >
                            <ChevronDown
                              size={14}
                              strokeWidth={2.5}
                              className={`transition-transform duration-200 ${
                                openDropdown === link.label
                                  ? 'rotate-180 text-[#0052cc]'
                                  : 'text-slate-500'
                              }`}
                            />
                          </button>
                        </div>

                        {/* Viewport-Safe 2-Column Rich Mega-Dropdown */}
                        <div
                          className={`absolute lg:left-0 xl:left-1/2 xl:-translate-x-1/2 top-full pt-3 w-[480px] xl:w-[540px] max-w-[calc(100vw-2rem)] z-50 transition-all duration-200 origin-top ${
                            openDropdown === link.label
                              ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                              : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                          }`}
                        >
                          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_20px_50px_-12px_rgba(10,25,47,0.18)] overflow-hidden">
                            <div className="flex items-center justify-between px-4 xl:px-5 py-2.5 xl:py-3 bg-slate-50/90 border-b border-slate-100">
                              <span className="text-[11px] xl:text-[11.5px] font-bold uppercase tracking-wider text-slate-500">
                                Business Financing Solutions
                              </span>
                              <a
                                href={link.href}
                                onClick={() => setOpenDropdown(null)}
                                className="inline-flex items-center gap-1 text-[12px] font-bold text-[#0052cc] hover:underline"
                              >
                                <span>Explore all</span>
                                <ArrowRight size={12} />
                              </a>
                            </div>

                            <div className="grid grid-cols-2 gap-1.5 p-2.5 xl:p-3">
                              {link.dropdownItems.map((subItem) => (
                                <a
                                  key={subItem.label}
                                  href={subItem.href}
                                  onClick={() => setOpenDropdown(null)}
                                  className="group/item flex items-start gap-2.5 xl:gap-3 p-2 xl:p-2.5 rounded-xl hover:bg-blue-50/70 transition-all duration-150"
                                >
                                  <span className="mt-0.5 flex h-7.5 w-7.5 xl:h-8 xl:w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 group-hover/item:bg-[#0052cc] group-hover/item:text-white transition-colors">
                                    {subItem.icon}
                                  </span>
                                  <div className="flex flex-col min-w-0">
                                    <span className="text-[13px] xl:text-[13.5px] font-bold text-[#0a192f] group-hover/item:text-[#0052cc] transition-colors flex items-center gap-1">
                                      <span className="truncate">{subItem.label}</span>
                                      <ArrowRight
                                        size={12}
                                        className="shrink-0 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all"
                                      />
                                    </span>
                                    {subItem.subtitle && (
                                      <span className="text-[11px] xl:text-[11.5px] text-slate-500 line-clamp-1 mt-0.5">
                                        {subItem.subtitle}
                                      </span>
                                    )}
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <a
                        key={link.label}
                        href={link.href}
                        className="rounded-full px-2.5 xl:px-3.5 py-1.5 text-[12.5px] xl:text-[13.5px] font-semibold text-[#0a192f] hover:bg-white hover:text-[#0052cc] hover:shadow-sm transition-all duration-200 whitespace-nowrap"
                      >
                        {link.label}
                      </a>
                    )
                  )}
                </nav>

                {/* Vertical Divider */}
                <div className="h-5 w-px bg-slate-200 shrink-0" aria-hidden="true" />

                {/* Utility Tools (CIBIL Score & EMI Calculator) */}
                <div className="flex items-center gap-1.5 xl:gap-2">
                  {utilityToolLinks.map((tool) => (
                    <a
                      key={tool.label}
                      href={tool.href}
                      className="group relative inline-flex items-center gap-1.5 xl:gap-2 rounded-full border border-slate-200/90 bg-white px-2.5 xl:px-3 py-1.5 text-[12px] xl:text-[13px] font-bold text-[#0a192f] hover:border-[#0052cc]/40 hover:bg-blue-50/50 hover:text-[#0052cc] shadow-[0_1px_4px_rgba(10,25,47,0.04)] transition-all duration-200 whitespace-nowrap"
                    >
                      {tool.icon}
                      <span>{tool.label}</span>
                      {tool.badge && (
                        <span className="hidden xl:inline-block rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-emerald-700 leading-none">
                          {tool.badge}
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              </div>

              {/* 3. Desktop Right Actions (Support Phone + Primary CTA) */}
              <div className="hidden lg:flex items-center gap-2 xl:gap-3.5 shrink-0">
                <a
                  href="tel:+918127727747"
                  className="group flex items-center gap-2 rounded-full p-1.5 xl:px-3 xl:py-1.5 text-[#0a192f] hover:bg-slate-100/80 transition-colors"
                  title="Call Advisor: +91 8127727747"
                  aria-label="Call +91 8127727747"
                >
                  <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-[#0052cc] group-hover:bg-[#0052cc] group-hover:text-white transition-colors shrink-0">
                    <Phone size={14} strokeWidth={2.5} />
                    <span className="absolute top-0 right-0 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                  </span>
                  <div className="hidden 2xl:flex flex-col text-left leading-tight">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Advisor Desk
                    </span>
                    <span className="text-[13.5px] font-bold text-[#0a192f] group-hover:text-[#0052cc] transition-colors">
                      +91 8127727747
                    </span>
                  </div>
                  <span className="hidden xl:inline 2xl:hidden text-[13px] font-bold whitespace-nowrap">
                    +91 8127727747
                  </span>
                </a>

                <button
                  onClick={handleApplyClick}
                  className="group inline-flex items-center gap-1.5 xl:gap-2 bg-gradient-to-r from-[#0052cc] to-[#0065ff] hover:from-[#003d8f] hover:to-[#0052cc] active:scale-[0.98] text-white font-bold text-[12.5px] xl:text-[13.5px] px-3.5 xl:px-5 py-2 xl:py-2.5 rounded-full transition-all duration-200 shadow-[0_6px_18px_-3px_rgba(0,82,204,0.38)] hover:shadow-[0_8px_22px_-3px_rgba(0,82,204,0.5)] whitespace-nowrap cursor-pointer"
                >
                  <span>Apply now</span>
                  <span className="flex h-4.5 w-4.5 xl:h-5 xl:w-5 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover:translate-x-0.5">
                    <ArrowRight size={11.5} strokeWidth={2.75} />
                  </span>
                </button>
              </div>

              {/* 4. Mobile & Tablet Right Controls (< 1024px) */}
              <div className="lg:hidden flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                {/* Tablet Direct Call Pill (visible md to lg) */}
                <a
                  href="tel:+918127727747"
                  className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[12.5px] font-bold text-[#0a192f] hover:border-[#0052cc]/40 hover:text-[#0052cc] transition-colors"
                >
                  <Phone size={13.5} strokeWidth={2.5} className="text-[#0052cc]" />
                  <span>+91 8127727747</span>
                </a>

                <button
                  onClick={handleApplyClick}
                  className="inline-flex items-center gap-1 bg-gradient-to-r from-[#0052cc] to-[#0065ff] active:from-[#003d8f] active:to-[#0052cc] text-white font-bold text-[12px] sm:text-[13px] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-[0_4px_12px_rgba(0,82,204,0.3)] transition-all whitespace-nowrap cursor-pointer"
                >
                  <span className="max-[350px]:hidden">Apply now</span>
                  <span className="hidden max-[350px]:inline">Apply</span>
                  <ArrowRight size={13} strokeWidth={2.5} />
                </button>

                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle Menu"
                  aria-expanded={isMobileMenuOpen}
                  className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border transition-all cursor-pointer active:scale-95 ${
                    isMobileMenuOpen
                      ? 'border-[#0052cc] bg-[#0052cc] text-white shadow-sm'
                      : 'border-slate-300/90 bg-slate-50 text-[#0a192f] hover:border-[#0052cc]/50 hover:text-[#0052cc]'
                  }`}
                >
                  {isMobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile & Tablet Integrated Quick-Access Strip (< 1024px) */}
          <div className="lg:hidden w-full bg-slate-50/95 border-t border-slate-200/90">
            <div className="max-w-3xl mx-auto grid grid-cols-2 divide-x divide-slate-200 py-1.5 px-1 sm:px-4">
              {/* Left: Free CIBIL Score */}
              <a
                href="/cibil-score"
                className="flex items-center justify-center gap-1.5 sm:gap-2 px-1.5 sm:px-3 py-1 rounded-xl active:bg-blue-100/70 hover:bg-blue-50/70 transition-colors min-w-0"
              >
                <CreditGaugeIcon className="h-4 w-6 sm:h-4.5 sm:w-6.5 shrink-0" />
                <span className="text-[12px] sm:text-[13px] font-extrabold text-[#0a192f] tracking-tight truncate">
                  Free <span className="text-[#0052cc]">CIBIL Score</span>
                </span>
              </a>

              {/* Right: EMI Calculator */}
              <a
                href="http://localhost:5173/calculator"
                className="flex items-center justify-center gap-1.5 sm:gap-2 px-1.5 sm:px-3 py-1 rounded-xl active:bg-blue-100/70 hover:bg-blue-50/70 transition-colors min-w-0"
              >
                <span className="flex h-5 w-5 sm:h-5.5 sm:w-5.5 shrink-0 items-center justify-center rounded-md bg-[#0052cc]/12 text-[#0052cc]">
                  <Calculator className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </span>
                <span className="text-[12px] sm:text-[13px] font-extrabold text-[#0a192f] tracking-tight truncate">
                  EMI <span className="text-[#0052cc]">Calculator</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Backdrop */}
      <div
        className={`lg:hidden fixed inset-0 bg-[#0a192f]/45 backdrop-blur-xs transition-opacity duration-300 z-40 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile & Tablet Floating Menu Drawer (Matches Floating Header Card) */}
      <div
        style={{
          top: `${headerHeight + 8}px`,
          maxHeight: isMobileMenuOpen ? `calc(100dvh - ${headerHeight + 20}px)` : '0px',
        }}
        className={`lg:hidden fixed left-3 right-3 sm:left-4 sm:right-4 bg-white/98 backdrop-blur-xl border border-slate-300/90 ring-1 ring-white/80 shadow-[0_20px_48px_-10px_rgba(10,25,47,0.22)] px-4 sm:px-6 flex flex-col gap-1.5 z-50 overflow-y-auto transition-all duration-300 ease-out origin-top rounded-2xl sm:rounded-[20px] ${
          isMobileMenuOpen
            ? 'py-4 sm:py-5 opacity-100 translate-y-0 pb-[calc(1.25rem+env(safe-area-inset-bottom))]'
            : 'py-0 opacity-0 -translate-y-2 pointer-events-none overflow-hidden border-transparent shadow-none'
        }`}
      >
        <div className="max-w-2xl w-full mx-auto flex flex-col gap-1.5">
          <div className="flex items-center justify-between px-2 pb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Menu
            </span>
            <span className="text-[11px] font-semibold text-[#0052cc]">
              SaibanCapital
            </span>
          </div>

          {mobileDrawerLinks.map((link) =>
            link.dropdownItems ? (
              <div
                key={link.label}
                className="rounded-2xl bg-slate-50 border border-slate-200/90 px-3 sm:px-4 py-1 my-1"
              >
                <div className="flex items-center justify-between py-2">
                  <a
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-[15px] sm:text-[16px] font-bold text-[#0a192f] hover:text-[#0052cc]"
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
                    className="flex h-8.5 w-8.5 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-[#0052cc]/40 hover:text-[#0052cc] transition-colors cursor-pointer"
                  >
                    <ChevronDown
                      size={17}
                      className={`transition-transform duration-200 ${
                        openMobileSubmenu === link.label ? 'rotate-180 text-[#0052cc]' : ''
                      }`}
                    />
                  </button>
                </div>

                {openMobileSubmenu === link.label && (
                  <div className="pb-3 pt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-1.5 border-t border-slate-200/80">
                    {link.dropdownItems.map((subItem) => (
                      <a
                        key={subItem.label}
                        href={subItem.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-2.5 py-2.5 px-3 rounded-xl bg-white hover:bg-blue-50/70 text-[13.5px] sm:text-[14px] font-semibold text-slate-800 hover:text-[#0052cc] border border-slate-200/70 transition-all"
                      >
                        <span className="text-[#0052cc] shrink-0">{subItem.icon}</span>
                        <span className="truncate">{subItem.label}</span>
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
                className="flex items-center justify-between px-3.5 sm:px-4 py-3 rounded-xl text-[15px] sm:text-[16px] font-bold text-[#0a192f] hover:bg-slate-50 hover:text-[#0052cc] border border-transparent hover:border-slate-200/70 transition-all"
              >
                <span>{link.label}</span>
                <ArrowRight size={15} className="text-slate-400" />
              </a>
            )
          )}

          {/* Bottom Mobile/Tablet Support & CTA Grid */}
          <div className="mt-2.5 pt-3.5 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <a
              href="tel:+918127727747"
              className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border border-slate-300/90 bg-slate-50 text-[#0a192f] font-bold text-[14px] sm:text-[14.5px] active:bg-slate-100 transition-colors"
            >
              <Phone size={16} strokeWidth={2.5} className="text-[#0052cc]" />
              <span>+91 8127727747</span>
            </a>
            <button
              onClick={handleApplyClick}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#0052cc] to-[#0065ff] active:opacity-95 text-white font-bold text-[14.5px] sm:text-[15px] px-6 py-3 rounded-xl shadow-[0_8px_20px_-4px_rgba(0,82,204,0.4)] cursor-pointer"
            >
              <Sparkles size={16} />
              <span>Apply now</span>
              <ArrowRight size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}