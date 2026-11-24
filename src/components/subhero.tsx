import { ArrowRight } from 'lucide-react';

interface BankPartner {
  name: string;
  logoUrl: string;
  heightClass?: string;
}

export default function SubHero() {
  // Official public SVG & PNG logos from Wikimedia Commons
  const bankPartners: BankPartner[] = [
    {
      name: 'HDFC Bank',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg',
      heightClass: 'h-6 sm:h-7',
    },
    {
      name: 'ICICI Bank',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg',
      heightClass: 'h-6 sm:h-7',
    },
    {
      name: 'State Bank of India',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/SBI-logo.svg',
      heightClass: 'h-6 sm:h-7',
    },
    {
      name: 'Axis Bank',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Axis_Bank_logo.svg',
      heightClass: 'h-6 sm:h-7',
    },
    {
      name: 'Kotak Mahindra Bank',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/3/39/Kotak_Mahindra_Group_logo.svg',
      heightClass: 'h-7 sm:h-8',
    },
    {
      name: 'Bajaj Finserv',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Bajaj_Finserv_Logo.svg',
      heightClass: 'h-5 sm:h-6',
    },
    {
      name: 'Bank of Baroda',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/f/f2/BankOfBarodaLogo.svg',
      heightClass: 'h-6 sm:h-7',
    },
    {
      name: 'Punjab National Bank',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Punjab_National_Bank_new_logo.svg',
      heightClass: 'h-6 sm:h-7',
    },
  ];

  const cards = [
    {
      image: '/house.png',
      tag: 'Most popular',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      iconBg: 'bg-[#0052cc]',
      title: 'Home Loan',
      desc: 'Buy, build, renovate or transfer your existing loan to a lower rate.',
      stats: {
        rate: '8.35%*',
        tenure: '30 yrs',
        upto: '₹10 Cr',
      },
      linkText: 'Explore home loans',
      href: '/home-loans',
    },
    {
      image: '/family.png',
      tag: 'Minimal paperwork',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      iconBg: 'bg-[#558b2f]',
      title: 'Personal Loan',
      desc: 'For weddings, education, travel or medical needs — collateral-free.',
      stats: {
        rate: '10.5%*',
        tenure: '7 yrs',
        upto: '₹40 L',
      },
      linkText: 'Explore personal loans',
      href: '/personal-loans',
    },
    {
      image: '/worker.png',
      tag: 'For MSMEs & founders',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
      iconBg: 'bg-[#0a192f]',
      title: 'Business Loan',
      desc: 'Working capital, machinery, expansion or loan against property.',
      stats: {
        rate: '13.0%*',
        tenure: '10 yrs',
        upto: '₹5 Cr',
      },
      linkText: 'Explore business loans',
      href: '/business-loans',
    },
  ];

  const renderPartnerTrack = (trackKey: string, isClone = false) => (
    <div
      key={trackKey}
      aria-hidden={isClone}
      className="flex shrink-0 items-center gap-12 sm:gap-16 pr-12 sm:pr-16 animate-bank-marquee group-hover:[animation-play-state:paused]"
    >
      {bankPartners.map((bank) => (
        <div
          key={`${trackKey}-${bank.name}`}
          className="flex items-center gap-12 sm:gap-16 shrink-0"
        >
          <div
            className="flex items-center justify-center px-2 py-1 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            title={bank.name}
          >
            <img
              src={bank.logoUrl}
              alt={isClone ? '' : `${bank.name} logo`}
              loading="lazy"
              className={`${bank.heightClass || 'h-6'} w-auto max-w-[155px] object-contain select-none`}
            />
          </div>
          <span className="h-1.5 w-1.5 rounded-sm bg-slate-200 shrink-0" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white font-sans w-full overflow-hidden">
      {/* Seamless Infinite Marquee Keyframes */}
      <style>{`
        @keyframes bankMarqueeLoop {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-100%, 0, 0);
          }
        }
        .animate-bank-marquee {
          animation: bankMarqueeLoop 28s linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-bank-marquee {
            animation: none !important;
          }
        }
      `}</style>

      {/* Top Banner Section */}
      <div className="border-b border-slate-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px bg-slate-200 flex-1 max-w-[200px]"></div>
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest whitespace-nowrap">
              Working with India&apos;s most trusted banks &amp; NBFCs
            </span>
            <div className="h-px bg-slate-200 flex-1 max-w-[200px]"></div>
          </div>
        </div>

        {/* Full-bleed Seamless Infinite Logo Scroller */}
        <div className="relative w-full max-w-7xl mx-auto overflow-hidden group">
          {/* Left & Right Soft Edge Masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 sm:w-28 bg-gradient-to-r from-white via-white/90 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 sm:w-28 bg-gradient-to-l from-white via-white/90 to-transparent" />

          {/* Dual Identical Tracks for Zero-Seam Infinite Loop */}
          <div className="flex w-max items-center">
            {renderPartnerTrack('primary', false)}
            {renderPartnerTrack('clone', true)}
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16">
            <div className="lg:w-1/2">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex">
                  <div className="w-2.5 h-2.5 bg-[#8ec843]"></div>
                  <div className="w-2.5 h-2.5 bg-[#0052cc]"></div>
                </div>
                <span className="text-[11px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                  What we finance
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-[3.5rem] leading-[1.05] font-bold text-[#0a192f] tracking-tight">
                One partner for every
                <br />
                <span className="text-[#0052cc] font-serif italic font-normal">milestone</span>{' '}
                that matters.
              </h2>
            </div>

            <div className="lg:w-5/12 pt-4 lg:pt-0">
              <p className="text-slate-500 text-[14px] leading-relaxed">
                Whether it&apos;s your first home, a family need or the next stage of your business,
                we find the loan that fits — not the one that pays us most.
              </p>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {cards.map((card, index) => (
              <div
                key={index}
                className="border border-slate-200 rounded-[2rem] bg-white flex flex-col relative group hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image Area */}
                <div className="relative h-60 w-full p-2.5">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover rounded-[1.5rem]"
                  />
                  <div className="absolute top-6 left-6 bg-white/95 backdrop-blur px-3.5 py-1.5 rounded-full text-[11px] font-bold text-[#0a192f] shadow-sm">
                    {card.tag}
                  </div>
                </div>

                {/* Overlapping Icon Badge */}
                <div
                  className={`absolute top-[13.5rem] left-8 w-[3.25rem] h-[3.25rem] rounded-xl flex items-center justify-center text-white border-[4px] border-white shadow-sm ${card.iconBg}`}
                >
                  {card.icon}
                </div>

                {/* Card Content */}
                <div className="px-8 pt-12 pb-8 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-[#0a192f] mb-3">{card.title}</h3>
                  <p className="text-slate-500 text-[13px] leading-relaxed mb-8 min-h-[40px]">
                    {card.desc}
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-6 mb-6">
                    <div>
                      <p className="text-[10px] text-slate-400 font-medium mb-1.5">Rate from</p>
                      <p className="text-[14px] font-bold text-[#0a192f]">{card.stats.rate}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-medium mb-1.5">Tenure</p>
                      <p className="text-[14px] font-bold text-[#0a192f]">{card.stats.tenure}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-medium mb-1.5">Up to</p>
                      <p className="text-[14px] font-bold text-[#0a192f]">{card.stats.upto}</p>
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="mt-auto border-t border-slate-100 pt-6">
                    <a
                      href={card.href}
                      className="inline-flex items-center gap-2 text-[#0052cc] font-bold text-[13px] hover:text-[#003d8f] transition-colors group-hover:gap-3 duration-300"
                    >
                      {card.linkText} <ArrowRight size={16} strokeWidth={2.5} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <p className="text-[10px] text-slate-400 font-medium ml-2">
            *Indicative starting rates. Final rate, amount and tenure depend on the lender&apos;s
            policy and your credit profile.
          </p>
        </div>
      </div>
    </div>
  );
}