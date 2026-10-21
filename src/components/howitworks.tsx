import React from 'react';
import { 
  MessageSquareText, 
  ListFilter, 
  FileText, 
  CreditCard, 
  ArrowRight 
} from 'lucide-react';

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
      icon: MessageSquareText
    },
    {
      num: "02",
      title: "Compare real offers",
      desc: "We shortlist the lenders most likely to approve you, at the best terms.",
      time: "Same day",
      icon: ListFilter
    },
    {
      num: "03",
      title: "Share documents",
      desc: "Upload online or we collect from your doorstep. We check everything.",
      time: "1–2 days",
      icon: FileText
    },
    {
      num: "04",
      title: "Sanction & disbursal",
      desc: "Sign the agreement and the funds land in your account.",
      time: "Lender timelines apply",
      icon: CreditCard
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
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex flex-col items-center relative">
                  
                  {/* Icon Card */}
                  <div className="w-[4.5rem] h-[4.5rem] bg-white border-2 border-slate-100 rounded-[1.25rem] flex items-center justify-center relative shadow-[0_2px_10px_rgb(0,0,0,0.02)] mb-6 z-10">
                    <Icon size={22} className="text-[#0052cc]" strokeWidth={2} />
                    
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
              );
            })}
          </div>

        </div>

        {/* Call to Action Button */}
        <button className="mt-20 bg-[#0052cc] hover:bg-[#003d8f] text-white font-semibold px-8 py-3.5 rounded-lg flex items-center justify-center gap-2 text-[15px] transition-colors shadow-lg shadow-blue-900/20">
          Start your application <ArrowRight size={18} strokeWidth={2.5} />
        </button>

      </section>
    </div>
  );
}