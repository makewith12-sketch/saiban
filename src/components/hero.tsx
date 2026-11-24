import {
  ArrowRightIcon,
  CalculatorIcon,
  ShieldCheckIcon,
  ReceiptPercentIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import { CheckIcon, StarIcon } from '@heroicons/react/24/solid';

const trustedAvatars = [
  {
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80',
    alt: 'Verified borrower portrait',
  },
  {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&q=80',
    alt: 'Business owner portrait',
  },
  {
    src: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=128&q=80',
    alt: 'Homeowner client portrait',
  },
  {
    src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=128&q=80',
    alt: 'Entrepreneur client portrait',
  },
];

export default function Hero() {
  return (
    <section className="relative bg-[#fcfcfd] pt-10 pb-20 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-32 font-sans overflow-x-clip">
      {/* Background Grid */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hero-grid {
          background-size: 48px 48px;
          background-image: 
            linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
        }
      `,
        }}
      />
      <div className="absolute inset-0 hero-grid pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Content */}
          <div className="lg:col-span-6 max-w-xl mx-auto lg:mx-0">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2.5 sm:gap-3 bg-white border border-slate-200 rounded-full p-1.5 pr-3.5 sm:pr-4 mb-6 sm:mb-8 shadow-sm max-w-full">
              <span className="bg-[#f4faef] text-[#558b2f] text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide shrink-0">
                NEW
              </span>
              <span className="text-[11px] sm:text-[12px] text-slate-600 font-medium truncate">
                Doorstep document pickup across India.
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-[2.45rem] sm:text-[3.25rem] lg:text-[3.85rem] xl:text-[4rem] leading-[1.07] font-bold text-[#0a192f] tracking-tight mb-5 sm:mb-6">
              Borrow with clarity.
              <br />
              Grow with{' '}
              <span className="text-[#0052cc] font-serif  font-normal tracking-normal block sm:inline">
                confidence.
              </span>
            </h1>

            {/* Description */}
            <p className="text-[15px] sm:text-[16px] text-slate-500 leading-relaxed mb-8 sm:mb-10 max-w-lg">
              Saiban Capital compares offers from leading banks and NBFCs, handles the paperwork for
              you, and stays with you until the money reaches your account.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 mb-10 sm:mb-12">
              <a
                href="/apply"
                className="w-full sm:w-auto bg-[#0052cc] hover:bg-[#003d8f] text-white font-semibold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 text-[14px] transition-colors shadow-lg shadow-blue-900/10"
              >
                Check your eligibility <ArrowRightIcon className="w-4 h-4 stroke-[2.25]" />
              </a>

              <a
                href="/calculator"
                className="w-full sm:w-auto bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-[#0a192f] font-semibold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 text-[14px] transition-colors shadow-sm"
              >
                <CalculatorIcon className="w-4 h-4 text-slate-500 stroke-[2]" /> Calculate EMI
              </a>
            </div>

            {/* Trust Features Grid */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-y-4 gap-x-4 border-b border-slate-200 pb-7 mb-7">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <ShieldCheckIcon className="w-4 h-4 text-[#0052cc] stroke-[2.25]" />
                </div>
                <span className="text-[12px] font-bold text-[#0a192f] leading-snug">
                  RBI-regulated lenders only
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#f4faef] flex items-center justify-center shrink-0">
                  <ReceiptPercentIcon className="w-4 h-4 text-[#558b2f] stroke-[2.25]" />
                </div>
                <span className="text-[12px] font-bold text-[#0a192f] leading-snug">
                  No hidden charges
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <LockClosedIcon className="w-4 h-4 text-[#0052cc] stroke-[2.25]" />
                </div>
                <span className="text-[12px] font-bold text-[#0a192f] leading-snug">
                  Your data stays private
                </span>
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
              <div className="flex -space-x-2.5 shrink-0">
                {trustedAvatars.map((avatar) => (
                  <img
                    key={avatar.src}
                    className="w-9 h-9 rounded-full border-2 border-white object-cover object-top bg-slate-200 shadow-xs"
                    src={avatar.src}
                    alt={avatar.alt}
                    loading="lazy"
                  />
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} className="w-3 h-3 text-[#f59e0b]" />
                  ))}
                </div>
                <p className="text-[11px] sm:text-[12px] text-slate-500">
                  Trusted by <span className="font-bold text-[#0a192f]">9,000+</span> families &amp;
                  businesses
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Visuals & Responsive Floating Cards */}
          <div className="lg:col-span-6 relative w-full max-w-xl mx-auto lg:max-w-none lg:h-[640px] flex flex-col sm:block sm:h-[580px] lg:flex lg:justify-end">
            {/* Main Portrait Image */}
            <div className="w-full sm:w-[86%] sm:ml-auto lg:w-[84%] h-[380px] sm:h-full rounded-[2rem] sm:rounded-[2.5rem] bg-slate-200 overflow-hidden shadow-xl">
              <img
                src="/hero.png"
                alt="Confident professional woman"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Floating Card 1: Top Pill */}
            <div className="hidden sm:flex absolute top-5 right-4 xl:-right-4 bg-white/95 backdrop-blur-xs rounded-full shadow-[0_8px_20px_rgb(0,0,0,0.06)] border border-slate-100 px-4 py-2 items-center gap-2 z-20">
              <div className="w-2 h-2 rounded-full bg-[#558b2f] shrink-0" />
              <span className="text-[11px] font-bold text-[#0a192f] whitespace-nowrap">
                Home loan sanctioned · ₹48.5 L
              </span>
            </div>

            {/* Mobile Stack Wrapper for Cards (<640px) vs Floating Overlay (>=640px) */}
            <div className="grid grid-cols-1 gap-3 -mt-12 px-3 sm:p-0 sm:mt-0 sm:contents relative z-20">
              {/* Floating Card 2: Loan Sanctioned */}
              <div className="sm:absolute sm:top-20 lg:top-28 sm:left-0 xl:-left-8 bg-white rounded-[1.25rem] shadow-[0_15px_40px_rgb(0,0,0,0.08)] border border-slate-100 p-4 sm:p-5 w-full sm:w-[265px] lg:w-[275px] z-20">
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <div className="flex gap-2.5 sm:gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#f4faef] text-[#558b2f] flex items-center justify-center shrink-0">
                      <CheckIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-[#0a192f] leading-tight">
                        Loan sanctioned
                      </p>
                      <p className="text-[10px] text-slate-400">Home Loan · Example</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium pt-0.5">just now</span>
                </div>

                <div className="text-[1.55rem] sm:text-[1.75rem] font-bold text-[#0a192f] mb-3 sm:mb-4">
                  ₹48,50,000
                </div>

                <div className="border-t border-dashed border-slate-200 pt-2.5 sm:pt-3 flex justify-between text-[11px] text-slate-500 font-medium">
                  <span>Tenure 20 yrs</span>
                  <span>EMI ₹42,089</span>
                </div>
              </div>

              {/* Floating Card 3: Application Status (Stepper) */}
              <div className="sm:absolute sm:bottom-6 lg:bottom-10 sm:left-2 xl:-left-4 bg-white rounded-[1.25rem] shadow-[0_15px_40px_rgb(0,0,0,0.08)] border border-slate-100 p-4 sm:p-5 w-full sm:w-[285px] lg:w-[300px] z-20">
                <div className="flex justify-between items-end mb-5 sm:mb-6">
                  <p className="text-[12px] font-bold text-[#0a192f]">Application status</p>
                  <p className="text-[10px] text-slate-400 font-mono">#SC-20418</p>
                </div>

                {/* Stepper Line */}
                <div className="relative flex justify-between items-center px-2">
                  <div className="absolute top-2.5 left-4 right-4 h-0.5 bg-slate-100 -z-10" />
                  <div className="absolute top-2.5 left-4 right-1/2 h-0.5 bg-[#8ec843] -z-10" />

                  {/* Step 1 */}
                  <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#8ec843] text-white flex items-center justify-center border-2 border-white shadow-sm">
                      <CheckIcon className="w-3 h-3" />
                    </div>
                    <span className="text-[9px] font-medium text-slate-500">Applied</span>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#8ec843] text-white flex items-center justify-center border-2 border-white shadow-sm">
                      <CheckIcon className="w-3 h-3" />
                    </div>
                    <span className="text-[9px] font-medium text-slate-500">Docs</span>
                  </div>

                  {/* Step 3 (Current) */}
                  <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                    <div className="w-5 h-5 rounded-full border-2 border-[#0052cc] bg-white flex items-center justify-center shadow-sm">
                      <div className="w-1.5 h-1.5 bg-[#0052cc] rounded-full" />
                    </div>
                    <span className="text-[9px] font-bold text-[#0052cc]">Verifying</span>
                  </div>

                  {/* Step 4 */}
                  <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                    <div className="w-5 h-5 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center" />
                    <span className="text-[9px] font-medium text-slate-400">Sanction</span>
                  </div>
                </div>
              </div>

              {/* Floating Card 4: Rates Chart */}
              <div className="sm:absolute sm:top-[48%] lg:top-[50%] sm:right-2 xl:-right-6 bg-[#0a192f] rounded-[1.25rem] shadow-[0_20px_40px_rgb(0,0,0,0.15)] border border-slate-700/50 p-4 sm:p-5 w-full sm:w-[195px] lg:w-[200px] z-20">
                <div className="flex justify-between items-center mb-2.5 sm:mb-3">
                  <p className="text-[10px] text-slate-400 font-medium">Home loan rates</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#8ec843]" />
                    <span className="text-[9px] text-slate-300">Live</span>
                  </div>
                </div>

                <div className="flex items-end gap-1 mb-4 sm:mb-6">
                  <span className="text-[11px] text-slate-400 mb-1">from</span>
                  <span className="text-[1.6rem] sm:text-[1.75rem] font-bold text-white leading-none">
                    8.35%
                  </span>
                </div>

                {/* Mini Bar Chart */}
                <div className="flex items-end gap-1.5 h-8 mb-3 sm:mb-4">
                  <div className="w-full bg-slate-600 rounded-sm h-[40%]" />
                  <div className="w-full bg-slate-600 rounded-sm h-[60%]" />
                  <div className="w-full bg-slate-600 rounded-sm h-[50%]" />
                  <div className="w-full bg-slate-600 rounded-sm h-[80%]" />
                  <div className="w-full bg-[#8ec843] rounded-sm h-[100%] shadow-[0_0_10px_rgba(142,200,67,0.3)]" />
                </div>

                <p className="text-[8px] text-slate-400 text-center border-t border-slate-700 pt-2.5 sm:pt-3">
                  Best offer across 30+ lenders*
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}