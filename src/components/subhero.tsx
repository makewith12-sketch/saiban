import { ArrowRight } from 'lucide-react';

export default function SubHero() {
  const bankPartners = [
    {
      name: "HDFC BANK",
      className: "uppercase",
      logo: (
        <svg viewBox="0 0 36 36" className="w-5 h-5 shrink-0" fill="none">
          <rect width="36" height="36" rx="4" fill="#004C8F" />
          <path d="M6 6H15V15H6V6ZM21 6H30V15H21V6ZM6 21H15V30H6V21ZM21 21H30V30H21V21Z" fill="#ED232A" />
          <rect x="13" y="13" width="10" height="10" fill="white" />
          <rect x="15.5" y="15.5" width="5" height="5" fill="#004C8F" />
        </svg>
      )
    },
    {
      name: "ICICI Bank",
      className: "",
      logo: (
        <svg viewBox="0 0 36 36" className="w-5 h-5 shrink-0" fill="none">
          <circle cx="18" cy="18" r="16" fill="#F37E20" />
          <path
            d="M19.5 9.5C15.5 9.5 13 12 13 15.5C13 18.2 15.2 19.5 18.2 20.5C20.8 21.3 22 22.3 22 24C22 25.8 20.2 27 17.8 27C15.6 27 14 26 13.2 24.5"
            stroke="white"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <circle cx="21.5" cy="11.5" r="2" fill="#9E1B32" />
        </svg>
      )
    },
    {
      name: "SBI",
      className: "uppercase",
      logo: (
        <svg viewBox="0 0 36 36" className="w-5 h-5 shrink-0" fill="none">
          <circle cx="18" cy="18" r="15" fill="#280071" />
          <circle cx="18" cy="16" r="4.5" fill="white" />
          <rect x="16.3" y="19" width="3.4" height="14" fill="white" />
        </svg>
      )
    },
    {
      name: "AXIS BANK",
      className: "uppercase",
      logo: (
        <svg viewBox="0 0 36 36" className="w-5 h-5 shrink-0" fill="none">
          <path d="M18 5L6 29H12.5L18 17.5L23.5 29H30L18 5Z" fill="#97144D" />
          <path d="M15.2 23.2H20.8L18 17.5L15.2 23.2Z" fill="#97144D" />
        </svg>
      )
    },
    {
      name: "kotak",
      className: "lowercase text-[15px]",
      logo: (
        <svg viewBox="0 0 36 36" className="w-5 h-5 shrink-0" fill="none">
          <rect x="3" y="3" width="30" height="30" rx="8" fill="#ED1C24" />
          <path
            d="M11 19.5C11 15.5 14 13 17.5 13C20.5 13 22 15 22 17.5C22 20 20 22 17.5 22C15 22 13.5 20.2 13.5 18C13.5 16.2 14.8 15 16.5 15C18 15 19 16 19 17.5"
            stroke="#003366"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M25 16.5C25 20.5 22 23 18.5 23C15.5 23 14 21 14 18.5"
            stroke="white"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </svg>
      )
    },
    {
      name: "Bajaj Finserv",
      className: "",
      logo: (
        <svg viewBox="0 0 36 36" className="w-5 h-5 shrink-0" fill="none">
          <rect x="3" y="3" width="30" height="30" rx="6" fill="#0066B3" />
          <path
            d="M12 10H20.5C23 10 24.5 11.3 24.5 13.3C24.5 14.8 23.5 16 22 16.5C23.8 17 25 18.3 25 20.2C25 22.6 23.2 24 20.2 24H12V10ZM15.5 15.3H19.5C20.6 15.3 21.3 14.7 21.3 13.8C21.3 12.9 20.6 12.4 19.5 12.4H15.5V15.3ZM15.5 21.4H19.8C21 21.4 21.7 20.8 21.7 19.8C21.7 18.8 20.9 18.2 19.7 18.2H15.5V21.4Z"
            fill="white"
          />
        </svg>
      )
    }
  ];

  const cards = [
    {
      image: "/house.png",
      tag: "Most popular",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      iconBg: "bg-[#0052cc]",
      title: "Home Loan",
      desc: "Buy, build, renovate or transfer your existing loan to a lower rate.",
      stats: {
        rate: "8.35%*",
        tenure: "30 yrs",
        upto: "₹10 Cr"
      },
      linkText: "Explore home loans",
      href: "/home-loans"
    },
    {
      image: "/family.png",
      tag: "Minimal paperwork",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      iconBg: "bg-[#558b2f]",
      title: "Personal Loan",
      desc: "For weddings, education, travel or medical needs — collateral-free.",
      stats: {
        rate: "10.5%*",
        tenure: "7 yrs",
        upto: "₹40 L"
      },
      linkText: "Explore personal loans",
      href: "/personal-loans"
    },
    {
      image: "/worker.png",
      tag: "For MSMEs & founders",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
      iconBg: "bg-[#0a192f]",
      title: "Business Loan",
      desc: "Working capital, machinery, expansion or loan against property.",
      stats: {
        rate: "13.0%*",
        tenure: "10 yrs",
        upto: "₹5 Cr"
      },
      linkText: "Explore business loans",
      href: "/business-loans"
    }
  ];

  return (
    <div className="bg-white font-sans w-full overflow-hidden">
      
      {/* Top Banner Section */}
      <div className="border-b border-slate-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px bg-slate-200 flex-1 max-w-[200px]"></div>
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest whitespace-nowrap">
              Working with India's most trusted banks & NBFCs
            </span>
            <div className="h-px bg-slate-200 flex-1 max-w-[200px]"></div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 text-slate-500 font-bold text-sm tracking-wider">
            {bankPartners.map((bank, index) => (
              <div key={bank.name} className="flex items-center gap-8 md:gap-12">
                <div className="flex items-center gap-2.5">
                  {bank.logo}
                  <span className={bank.className}>{bank.name}</span>
                </div>
                {index < bankPartners.length - 1 && (
                  <div className="w-1.5 h-1.5 bg-slate-200 rounded-sm"></div>
                )}
              </div>
            ))}
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
                One partner for every<br />
                <span className="text-[#0052cc] font-serif italic font-normal">milestone</span> that matters.
              </h2>
            </div>
            
            <div className="lg:w-5/12 pt-4 lg:pt-0">
              <p className="text-slate-500 text-[14px] leading-relaxed">
                Whether it's your first home, a family need or the next stage of your business, we find the loan that fits — not the one that pays us most.
              </p>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {cards.map((card, index) => (
              <div key={index} className="border border-slate-200 rounded-[2rem] bg-white flex flex-col relative group hover:shadow-lg transition-shadow duration-300">
                
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
                <div className={`absolute top-[13.5rem] left-8 w-[3.25rem] h-[3.25rem] rounded-xl flex items-center justify-center text-white border-[4px] border-white shadow-sm ${card.iconBg}`}>
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
                    <a href={card.href} className="inline-flex items-center gap-2 text-[#0052cc] font-bold text-[13px] hover:text-[#003d8f] transition-colors group-hover:gap-3 duration-300">
                      {card.linkText} <ArrowRight size={16} strokeWidth={2.5} />
                    </a>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Footer Note */}
          <p className="text-[10px] text-slate-400 font-medium ml-2">
            *Indicative starting rates. Final rate, amount and tenure depend on the lender's policy and your credit profile.
          </p>

        </div>
      </div>
    </div>
  );
}