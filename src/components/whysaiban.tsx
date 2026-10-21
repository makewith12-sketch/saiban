import React from 'react';
import { 
  AlignLeft, 
  Clock, 
  LineChart, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';

export default function WhySaiban() {
  return (
    <div className="bg-[#f8f9fc] py-24 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Block 1: Why Saiban (Image Left, Text Right) */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
          
          {/* Left: Image with Floating Card */}
          <div className="relative order-2 lg:order-1 mt-12 lg:mt-0">
            {/* Main Image */}
            <div className="w-full aspect-[4/3] rounded-[2rem] overflow-hidden bg-slate-200">
              <img 
                src="/contactform.png" 
                alt="Saiban advisor in modern office" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-8 right-4 lg:-right-8 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 p-6 flex items-center gap-8 z-10">
              <div>
                <p className="text-[1.75rem] font-bold text-[#0052cc] leading-none mb-1 tracking-tight">30+</p>
                <p className="text-[11px] text-slate-500 font-medium">Lending partners</p>
              </div>
              <div className="w-px h-12 bg-slate-200"></div>
              <div>
                <p className="text-[1.75rem] font-bold text-[#428120] leading-none mb-1 tracking-tight">₹3 Cr+</p>
                <p className="text-[11px] text-slate-500 font-medium">Loans disbursed</p>
              </div>
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="order-1 lg:order-2 lg:pl-6">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex">
                <div className="w-2.5 h-2.5 bg-[#8ec843]"></div>
                <div className="w-2.5 h-2.5 bg-[#0052cc]"></div>
              </div>
              <span className="text-[11px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                Why Saiban
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-[3rem] leading-[1.05] font-bold text-[#0a192f] tracking-tight mb-6">
              An advisor in your<br />
              corner, <span className="text-[#0052cc] font-serif italic font-normal">not a sales desk.</span>
            </h2>

            <p className="text-[14.5px] text-slate-500 leading-relaxed mb-10 max-w-lg">
              Banks sell their own products. We work for you — comparing lenders side by side, negotiating on your behalf and explaining every clause before you sign.
            </p>

            {/* Custom List */}
            <ul className="space-y-4">
              {[
                "Unbiased comparison across banks and NBFCs",
                "A dedicated relationship manager from day one",
                "Doorstep document pickup and digital KYC",
                "Transparent fees, shared upfront in writing"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  {/* Custom Check Icon */}
                  <div className="mt-0.5 shrink-0 w-[18px] h-[18px] rounded bg-[#558b2f] flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="text-[14px] font-medium text-[#0a192f]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Block 2: How We're Different (Text Left, Image Right) */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Text & Grid */}
          <div className="pr-0 lg:pr-6">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex">
                <div className="w-2.5 h-2.5 bg-[#8ec843]"></div>
                <div className="w-2.5 h-2.5 bg-[#0052cc]"></div>
              </div>
              <span className="text-[11px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                How We're Different
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-[3rem] leading-[1.05] font-bold text-[#0a192f] tracking-tight mb-8">
              Built around the way you<br />
              <span className="text-[#0052cc] font-serif italic font-normal">actually</span> live and work.
            </h2>

            {/* Features Inner Grid */}
            <div className="grid grid-cols-2 border-t border-slate-200 mt-10">
              
              {/* Top Left */}
              <div className="border-b border-r border-slate-200 py-8 pr-8">
                <AlignLeft className="mb-4 text-[#0052cc]" size={22} strokeWidth={2} />
                <h4 className="font-bold text-[#0a192f] text-[15px] mb-2">Side-by-side offers</h4>
                <p className="text-slate-500 text-[13px] leading-relaxed">
                  Rates, fees and terms on one page — no guesswork.
                </p>
              </div>
              
              {/* Top Right */}
              <div className="border-b border-slate-200 py-8 pl-8">
                <Clock className="mb-4 text-[#558b2f]" size={22} strokeWidth={2} />
                <h4 className="font-bold text-[#0a192f] text-[15px] mb-2">Faster sanctions</h4>
                <p className="text-slate-500 text-[13px] leading-relaxed">
                  Files prepared right the first time, so lenders say yes sooner.
                </p>
              </div>
              
              {/* Bottom Left */}
              <div className="border-r border-slate-200 py-8 pr-8">
                <LineChart className="mb-4 text-[#558b2f]" size={22} strokeWidth={2} />
                <h4 className="font-bold text-[#0a192f] text-[15px] mb-2">Credit guidance</h4>
                <p className="text-slate-500 text-[13px] leading-relaxed">
                  Practical steps to improve your score before you apply.
                </p>
              </div>
              
              {/* Bottom Right */}
              <div className="py-8 pl-8">
                <MessageSquare className="mb-4 text-[#0052cc]" size={22} strokeWidth={2} />
                <h4 className="font-bold text-[#0a192f] text-[15px] mb-2">Support after disbursal</h4>
                <p className="text-slate-500 text-[13px] leading-relaxed">
                  Top-ups, balance transfers and prepayment advice, for life.
                </p>
              </div>

            </div>
          </div>

          {/* Right: Image with Floating Card */}
          <div className="relative mt-12 lg:mt-0">
            {/* Main Image */}
            <div className="w-full aspect-[4/3] rounded-[2rem] overflow-hidden bg-slate-200">
              <img 
                src="/verifiedadvisors.png" 
                alt="Verified advisor reviewing documents" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Badge */}
            <div className="absolute top-8 left-4 lg:-left-12 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 p-4 flex items-center gap-4 z-10 min-w-[240px]">
              <div className="w-10 h-10 rounded-full bg-[#f0f5ff] flex items-center justify-center shrink-0">
                <ShieldCheck size={20} className="text-[#0052cc]" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[14px] font-bold text-[#0a192f] leading-none mb-1">Verified advisors</p>
                <p className="text-[11px] text-slate-500 font-medium">Certified & background-checked</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}