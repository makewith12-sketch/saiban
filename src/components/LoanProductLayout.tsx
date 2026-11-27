// src/components/LoanProductLayout.tsx
import { useState, type ReactNode } from 'react';
import Header from './header';
import Footer from './footer';
import {
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Phone,
  Landmark,
  FileText,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';

export interface ProductUseItem {
  title: string;
  desc: string;
  icon: LucideIcon;
}

export interface ProductDocumentItem {
  category: string;
  items: string;
}

export interface ProductRateRow {
  label: string;
  value: string;
  highlight?: 'blue' | 'green' | 'default';
}

export interface ProductStepItem {
  step: string;
  title: string;
  desc: string;
}

export interface ProductFAQItem {
  question: string;
  answer: string;
}

export interface GlanceRow {
  label: string;
  value: string;
  tone?: 'default' | 'blue' | 'green';
}

export interface HeroMediaConfig {
  imageUrl: string;
  imageAlt: string;
  captionTitle: string;
  captionSubtitle: string;
}

export interface LoanProductPageConfig {
  breadcrumbLabel: string;
  badgeText: string;
  badgeIcon: LucideIcon;
  titlePrefix: string;
  titleHighlight: string;
  subtitle: ReactNode;
  heroMedia: HeroMediaConfig;
  applyHref: string;
  glanceTag: string;
  glanceRows: GlanceRow[];
  glanceNote: ReactNode;
  eligibilitySubtitle: string;
  eligibilityChecks: string[];
  usesHeading: string;
  usesSubtitle: string;
  uses: ProductUseItem[];
  calculatorSlot: ReactNode;
  documentsSubtitle: string;
  documents: ProductDocumentItem[];
  ratesSubtitle: string;
  rates: ProductRateRow[];
  processSubtitle: string;
  steps: ProductStepItem[];
  faqs: ProductFAQItem[];
  callbackSubtitle: string;
  callbackSuccessTitle: string;
}

export default function LoanProductLayout({ config }: { config: LoanProductPageConfig }) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeDocTab, setActiveDocTab] = useState<number>(0);
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [consent, setConsent] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const BadgeIcon = config.badgeIcon;

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackName.trim() || !callbackPhone.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0a192f] font-sans antialiased">
      <Header />

      <main className="flex-1">
        {/* BAND 1: Balanced Hero + Real Business Photo + At-a-Glance Card */}
        <section
          className="border-b border-slate-200/80 pt-7 pb-11 lg:pt-10 lg:pb-14"
          style={{
            backgroundColor: '#fcfcfd',
            backgroundSize: '32px 32px',
            backgroundImage:
              'linear-gradient(to right, rgba(10, 25, 47, 0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(10, 25, 47, 0.025) 1px, transparent 1px)',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-5">
              <a href="/" className="hover:text-[#0052cc] transition-colors">
                Home
              </a>
              <span>/</span>
              <a href="/business-loans" className="hover:text-[#0052cc] transition-colors">
                Business Loans
              </a>
              <span>/</span>
              <span className="text-[#0052cc]">{config.breadcrumbLabel}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left Hero Copy + Real Human Business Photo (7 cols) */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-bold text-[#0052cc]">
                  <BadgeIcon className="h-3.5 w-3.5" />
                  <span>{config.badgeText}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#0a192f] leading-[1.12]">
                  {config.titlePrefix}{' '}
                  <span className="text-[#0052cc]">{config.titleHighlight}</span>
                </h1>

                <p className="text-base sm:text-[17px] text-slate-600 leading-relaxed max-w-2xl">
                  {config.subtitle}
                </p>

                {/* Primary Hero CTAs */}
                <div className="pt-1 flex flex-wrap items-center gap-3">
                  <a
                    href={config.applyHref}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0052cc] hover:bg-[#003d8f] px-6 py-3 text-sm font-bold text-white transition-all shadow-[0_6px_18px_rgba(0,82,204,0.22)]"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#calculator"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white hover:border-[#0052cc] px-5 py-3 text-sm font-bold text-[#0a192f] hover:text-[#0052cc] transition-colors"
                  >
                    <span>Calculate EMI & Limit</span>
                  </a>
                </div>

                {/* Human-Clicked Real Business Photograph Card */}
                <div className="pt-2">
                  <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100 shadow-[0_10px_28px_rgba(10,25,47,0.06)]">
                    <img
                      src={config.heroMedia.imageUrl}
                      alt={config.heroMedia.imageAlt}
                      loading="eager"
                      className="w-full h-52 sm:h-60 object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/80 via-[#0a192f]/20 to-transparent" />
                    <div className="absolute bottom-3.5 left-4 right-4 flex flex-wrap items-center justify-between gap-2 text-white">
                      <div>
                        <p className="text-xs sm:text-sm font-extrabold tracking-tight">
                          {config.heroMedia.captionTitle}
                        </p>
                        <p className="text-[11px] sm:text-xs text-slate-200">
                          {config.heroMedia.captionSubtitle}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 text-[11px] font-bold text-white">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
                        30+ RBI Lenders
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sub-Nav Links */}
                <div className="pt-2 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-slate-500">
                  {[
                    { label: 'Eligibility', href: '#eligibility' },
                    { label: 'Use Cases', href: '#uses' },
                    { label: 'Calculator', href: '#calculator' },
                    { label: 'Documents & Rates', href: '#documents-rates' },
                    { label: '7-Step Process', href: '#process' },
                    { label: 'FAQs', href: '#faqs' },
                  ].map((nav) => (
                    <a
                      key={nav.label}
                      href={nav.href}
                      className="hover:text-[#0052cc] transition-colors"
                    >
                      {nav.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Right "At a Glance" Card (5 cols) */}
              <div className="lg:col-span-5 lg:sticky lg:top-24">
                <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-[0_12px_32px_rgba(10,25,47,0.06)]">
                  <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                    <span className="text-base font-extrabold text-[#0a192f]">At a glance</span>
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-[#0052cc]">
                      {config.glanceTag}
                    </span>
                  </div>

                  <dl className="divide-y divide-slate-100 my-1.5">
                    {config.glanceRows.map((row) => (
                      <div key={row.label} className="py-2.5 flex items-center justify-between gap-4">
                        <dt className="text-xs sm:text-sm text-slate-500 font-medium">{row.label}</dt>
                        <dd
                          className={`text-xs sm:text-sm font-extrabold text-right ${
                            row.tone === 'blue'
                              ? 'text-[#0052cc]'
                              : row.tone === 'green'
                                ? 'text-emerald-600'
                                : 'text-[#0a192f]'
                          }`}
                        >
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-3 rounded-xl bg-slate-50 px-3.5 py-2.5 text-xs text-slate-600 leading-relaxed">
                    {config.glanceNote}
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <a
                      href={config.applyHref}
                      className="flex items-center justify-center gap-1.5 rounded-xl bg-[#0052cc] hover:bg-[#003d8f] py-2.5 px-3 text-xs sm:text-sm font-bold text-white transition-colors"
                    >
                      <span>Start Application</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href="/business-loans/eligibility-check"
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-blue-50/50 hover:border-[#0052cc] py-2.5 px-3 text-xs sm:text-sm font-bold text-[#0a192f] hover:text-[#0052cc] transition-colors"
                    >
                      <Landmark className="h-3.5 w-3.5 text-[#0052cc]" />
                      <span>Check Eligibility</span>
                    </a>
                  </div>

                  <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-500">
                    <Phone className="h-3.5 w-3.5 text-[#0052cc]" />
                    <span>Advisor Desk:</span>
                    <a href="tel:+918127727747" className="text-[#0052cc] font-bold hover:underline">
                      +91 8127727747
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BAND 2: Eligibility + Use Cases */}
        <section className="py-10 lg:py-14 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Eligibility Criteria */}
            <div id="eligibility" className="scroll-mt-20">
              <div className="max-w-2xl mb-5">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#0052cc]">
                  Qualification Criteria
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0a192f] mt-1">
                  Is it right for you?
                </h2>
                <p className="text-sm sm:text-[15px] text-slate-600 mt-1">
                  {config.eligibilitySubtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {config.eligibilityChecks.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3.5 rounded-xl border border-slate-200/80 bg-[#fcfcfd] p-4"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0052cc]">
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                    <span className="text-sm sm:text-[15px] font-bold text-[#0a192f] leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Use Cases */}
            <div id="uses" className="scroll-mt-20">
              <div className="max-w-2xl mb-5">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#0052cc]">
                  Capital Deployment
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0a192f] mt-1">
                  {config.usesHeading}
                </h2>
                <p className="text-sm sm:text-[15px] text-slate-600 mt-1">
                  {config.usesSubtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {config.uses.map((use) => {
                  const Icon = use.icon;
                  return (
                    <div
                      key={use.title}
                      className="flex items-start gap-4 rounded-xl border border-slate-200/80 bg-white p-5 hover:border-blue-200 hover:shadow-[0_8px_24px_rgba(10,25,47,0.04)] transition-all"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0052cc]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold text-[#0a192f] mb-1">
                          {use.title}
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{use.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* BAND 3: Interactive Calculator */}
        <section
          id="calculator"
          className="scroll-mt-16 py-10 lg:py-14 bg-slate-50/80 border-y border-slate-200/70"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{config.calculatorSlot}</div>
        </section>

        {/* BAND 4: Side-by-Side Documents & Rates */}
        <section id="documents-rates" className="scroll-mt-16 py-10 lg:py-14 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left 6 Cols: Interactive Document Checklist Tabs */}
              <div className="lg:col-span-6 space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#0052cc]">
                    Paperless Onboarding
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#0a192f] mt-1">
                    Documents to prepare
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">{config.documentsSubtitle}</p>
                </div>

                {/* Category Pill Selector */}
                <div className="flex flex-wrap gap-1.5">
                  {config.documents.map((doc, idx) => (
                    <button
                      key={doc.category}
                      type="button"
                      onClick={() => setActiveDocTab(idx)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                        activeDocTab === idx
                          ? 'bg-[#0052cc] text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-[#0052cc]'
                      }`}
                    >
                      {doc.category}
                    </button>
                  ))}
                </div>

                {/* Active Category Card */}
                {config.documents[activeDocTab] && (
                  <div className="rounded-xl border border-slate-200 bg-[#fcfcfd] p-5 space-y-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#0052cc]">
                        <FileText className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-[11px] font-semibold text-slate-400">
                          Checklist {activeDocTab + 1} of {config.documents.length}
                        </p>
                        <h3 className="text-base font-extrabold text-[#0a192f]">
                          {config.documents[activeDocTab].category}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed pt-2.5 border-t border-slate-200/70">
                      {config.documents[activeDocTab].items}
                    </p>
                  </div>
                )}
              </div>

              {/* Right 6 Cols: Rates & Fees Card */}
              <div className="lg:col-span-6 space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#0052cc]">
                    Transparent Pricing
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#0a192f] mt-1">
                    Rates & fees
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">{config.ratesSubtitle}</p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white divide-y divide-slate-100 overflow-hidden shadow-2xs">
                  {config.rates.map((row) => (
                    <div
                      key={row.label}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-4 py-3"
                    >
                      <span className="text-xs sm:text-sm font-medium text-slate-500">
                        {row.label}
                      </span>
                      <span
                        className={`text-xs sm:text-sm font-extrabold sm:text-right ${
                          row.highlight === 'blue'
                            ? 'text-[#0052cc]'
                            : row.highlight === 'green'
                              ? 'text-emerald-600'
                              : 'text-[#0a192f]'
                        }`}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BAND 5: 7-Step Process */}
        <section
          id="process"
          className="scroll-mt-16 py-10 lg:py-14 bg-slate-50/80 border-y border-slate-200/70"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-7">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#0052cc]">
                How It Works
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0a192f] mt-1">
                Your 7 steps, step-by-step
              </h2>
              <p className="text-sm sm:text-[15px] text-slate-600 mt-1">
                {config.processSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {config.steps.map((item) => (
                <div
                  key={item.step}
                  className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-2xs"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#0052cc] text-xs font-extrabold text-white">
                      {item.step}
                    </span>
                    <h3 className="text-sm font-extrabold text-[#0a192f] leading-snug">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BAND 6: FAQs + Human Advisor Callback Card */}
        <section id="faqs" className="scroll-mt-16 py-10 lg:py-14 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* FAQs (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#0052cc]">
                    Clear Answers
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#0a192f] mt-1">
                    Your questions
                  </h2>
                </div>

                <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white overflow-hidden">
                  {config.faqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div key={faq.question}>
                        <button
                          type="button"
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          className="flex w-full items-center justify-between gap-4 px-5 py-3.5 text-left hover:bg-slate-50/70 transition-colors cursor-pointer"
                        >
                          <span className="text-sm sm:text-[15px] font-bold text-[#0a192f]">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 shrink-0 text-[#0052cc] transition-transform duration-200 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Human Advisor Callback Card (5 cols) */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-slate-200 bg-[#fcfcfd] p-6 shadow-[0_10px_28px_rgba(10,25,47,0.04)]">
                  {/* Real Human Advisor Header */}
                  <div className="flex items-center gap-3.5 pb-4 mb-4 border-b border-slate-200/70">
                    <div className="relative shrink-0">
                      <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
                        alt="SaibanCapital MSME Credit Advisor"
                        className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                      <span
                        title="Online now"
                        className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#0052cc]">
                        Dedicated MSME Desk • Live
                      </span>
                      <h2 className="text-lg font-extrabold text-[#0a192f] leading-tight">
                        Request a callback
                      </h2>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                    {config.callbackSubtitle}
                  </p>

                  {submitted ? (
                    <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-xs sm:text-sm font-semibold text-emerald-800 flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        Thank you, {callbackName}! {config.callbackSuccessTitle} {callbackPhone}{' '}
                        within 2 working hours.
                      </span>
                    </div>
                  ) : (
                    <form onSubmit={handleCallbackSubmit} className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rajesh Sharma"
                          value={callbackName}
                          onChange={(e) => setCallbackName(e.target.value)}
                          className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm focus:border-[#0052cc] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={callbackPhone}
                          onChange={(e) => setCallbackPhone(e.target.value)}
                          className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm focus:border-[#0052cc] focus:outline-none"
                        />
                      </div>

                      <label className="flex items-start gap-2 text-xs text-slate-500 cursor-pointer pt-0.5">
                        <input
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                          className="mt-0.5 accent-[#0052cc]"
                          required
                        />
                        <span>
                          I authorize SaibanCapital and its RBI-registered lending partners to
                          contact me via call, SMS, or WhatsApp regarding my loan inquiry.
                        </span>
                      </label>

                      <button
                        type="submit"
                        className="w-full rounded-xl bg-[#0052cc] hover:bg-[#003d8f] py-3 text-sm font-bold text-white transition-colors shadow-2xs cursor-pointer"
                      >
                        Request a callback
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}