import { ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const stats = [
    {
      value: "9,000+",
      label: "Customers funded",
      color: "text-white"
    },
    {
      value: "₹3 Cr+",
      label: "Total disbursed",
      color: "text-white"
    },
    {
      value: "30+",
      label: "Banks & NBFC partners",
      color: "text-white"
    },
    {
      value: "4.5/5",
      label: "Average customer rating",
      color: "text-[#8ec843]"
    }
  ];

  const steps = [
    {
      num: "01",
      title: "Tell us what you need",
      desc: "A two-minute form or a call. No impact on your credit score.",
      time: "~ 2 minutes",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0052cc]">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M8 9h8" />
          <path d="M8 13h6" />
        </svg>
      )
    },
    {
      num: "02",
      title: "Compare real offers",
      desc: "We shortlist the lenders most likely to approve you, at the best terms.",
      time: "Same day",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0052cc]">
          <line x1="3" y1="22" x2="21" y2="22" />
          <line x1="6" y1="18" x2="6" y2="11" />
          <line x1="10" y1="18" x2="10" y2="11" />
          <line x1="14" y1="18" x2="14" y2="11" />
          <line x1="18" y1="18" x2="18" y2="11" />
          <polygon points="12 2 20 7 4 7" />
        </svg>
      )
    },
    {
      num: "03",
      title: "Share documents",
      desc: "Upload online or we collect from your doorstep. We check everything.",
      time: "1–2 days",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0052cc]">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="m9 15 2 2 4-4" />
        </svg>
      )
    },
    {
      num: "04",
      title: "Sanction & disbursal",
      desc: "Sign the agreement and the funds land in your account.",
      time: "Lender timelines apply",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0052cc]">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )
    }
  ];

  return (
    <div className="font-sans">
      {/* Background Grid Style for the top section */}
      <style dangerouslySetInnerHTML={{__html: `
        .dark-grid-bg {
          background-color: #05101f;
          background-size: 32px 32px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        }
      `}} />

      {/* 1. Stats Section (Dark) */}
      <section className="dark-grid-bg py-20 relative border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Colored Top Bar */}
          <div className="flex w-full h-[3px] mb-14 overflow-hidden rounded-full">
            <div className="w-[45%] bg-[#8ec843]"></div>
            <div className="w-[55%] bg-[#0052cc]"></div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#1e2e46]">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`py-6 sm:py-0 ${index !== 0 ? 'md:pl-10' : ''} ${index === 1 || index === 3 ? 'sm:pl-10' : ''}`}
              >
                <div className={`text-[3.25rem] leading-none font-bold tracking-tight mb-3 font-sans ${stat.color}`}>
                  {stat.value}
                </div>
                <p className="text-[13px] text-[#6b7b8f] font-medium tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 2. How it works Section (Light) */}
      <section className="bg-white py-24 flex flex-col items-center">
        
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex">
            <div className="w-2 h-2 bg-[#8ec843]"></div>
            <div className="w-2 h-2 bg-[#0052cc]"></div>
          </div>
          <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
            How it works
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-[3.25rem] leading-[1.05] font-bold text-[#0a192f] text-center tracking-tight mb-20">
          From first call to funds, in<br />
          <span className="text-[#0052cc] font-serif italic font-normal">four calm steps.</span>
        </h2>

        {/* Steps Diagram */}
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-0">
          
          {/* Dashed Connecting Line (Desktop only) */}
          <div className="hidden md:block absolute top-[2.25rem] left-[12.5%] right-[12.5%] border-t-2 border-dashed border-slate-200 -z-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center relative">
                
                {/* Icon Card */}
                <div className="w-[4.5rem] h-[4.5rem] bg-white border-2 border-slate-100 rounded-[1.25rem] flex items-center justify-center relative shadow-[0_2px_10px_rgb(0,0,0,0.02)] mb-6 z-10">
                  {step.icon}
                  
                  {/* Number Badge */}
                  <div className="absolute -top-2.5 -right-2.5 bg-[#428120] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-[4px] shadow-sm z-20 border border-white">
                    {step.num}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-[16px] font-bold text-[#0a192f] text-center mb-2.5">
                  {step.title}
                </h3>
                
                <p className="text-[13px] text-slate-500 text-center leading-relaxed max-w-[220px] mb-4">
                  {step.desc}
                </p>
                
                {/* Time Tag */}
                <div className="text-[11px] font-bold text-[#558b2f] tracking-wide mt-auto">
                  {step.time}
                </div>
                
              </div>
            ))}
          </div>

        </div>

        {/* Call to Action Button */}
        <a 
          href="/apply"
          className="mt-20 bg-[#0052cc] hover:bg-[#003d8f] text-white font-semibold px-8 py-3.5 rounded-lg flex items-center justify-center gap-2 text-[15px] transition-colors shadow-lg shadow-blue-900/20"
        >
          Start your application <ArrowRight size={18} strokeWidth={2.5} />
        </a>

      </section>
    </div>
  );
}