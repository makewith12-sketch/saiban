import React from 'react';
import { Home, User, Briefcase, ArrowRight } from 'lucide-react';

export default function SubHero() {
  const cards = [
    {
      image: "/house.png",
      tag: "Most popular",
      icon: Home,
      iconBg: "bg-[#0052cc]",
      title: "Home Loan",
      desc: "Buy, build, renovate or transfer your existing loan to a lower rate.",
      stats: {
        rate: "8.35%*",
        tenure: "30 yrs",
        upto: "₹10 Cr"
      },
      linkText: "Explore home loans"
    },
    {
      image: "/family.png",
      tag: "Minimal paperwork",
      icon: User,
      iconBg: "bg-[#558b2f]",
      title: "Personal Loan",
      desc: "For weddings, education, travel or medical needs — collateral-free.",
      stats: {
        rate: "10.5%*",
        tenure: "7 yrs",
        upto: "₹40 L"
      },
      linkText: "Explore personal loans"
    },
    {
      image: "/worker.png",
      tag: "For MSMEs & founders",
      icon: Briefcase,
      iconBg: "bg-[#0a192f]",
      title: "Business Loan",
      desc: "Working capital, machinery, expansion or loan against property.",
      stats: {
        rate: "13.0%*",
        tenure: "10 yrs",
        upto: "₹5 Cr"
      },
      linkText: "Explore business loans"
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

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-slate-400 font-bold text-sm tracking-wider">
            <span className="uppercase">HDFC BANK</span>
            <div className="w-1.5 h-1.5 bg-slate-200 rounded-sm"></div>
            <span>ICICI Bank</span>
            <div className="w-1.5 h-1.5 bg-slate-200 rounded-sm"></div>
            <span className="uppercase">SBI</span>
            <div className="w-1.5 h-1.5 bg-slate-200 rounded-sm"></div>
            <span className="uppercase">AXIS BANK</span>
            <div className="w-1.5 h-1.5 bg-slate-200 rounded-sm"></div>
            <span className="lowercase text-[15px]">kotak</span>
            <div className="w-1.5 h-1.5 bg-slate-200 rounded-sm"></div>
            <span>Bajaj Finserv</span>
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
            {cards.map((card, index) => {
              const Icon = card.icon;
              return (
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
                    <Icon size={20} strokeWidth={2.5} />
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
                      <a href="#" className="inline-flex items-center gap-2 text-[#0052cc] font-bold text-[13px] hover:text-[#003d8f] transition-colors group-hover:gap-3 duration-300">
                        {card.linkText} <ArrowRight size={16} strokeWidth={2.5} />
                      </a>
                    </div>
                  </div>

                </div>
              );
            })}
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