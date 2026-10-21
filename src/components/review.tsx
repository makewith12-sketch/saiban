import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';

export default function Reviews() {
  const reviews = [
    {
      type: "Home Loan",
      quote: "Two banks had already turned us down. Saiban found a lender who understood our income structure and got us a better rate than we expected.",
      amount: "₹62 L",
      approvedIn: "9 days",
      name: "Rahul Mehta",
      role: "Software engineer · Bangalore",
      avatar: "/api/placeholder/100/100"
    },
    {
      type: "Business Loan",
      quote: "They collected every document from my shop and explained the fine print in plain Hindi and English. I opened my second store in March.",
      amount: "₹18 L",
      approvedIn: "6 days",
      name: "Ananya Sharma",
      role: "Boutique owner · Bangalore",
      avatar: "/api/placeholder/100/100"
    },
    {
      type: "Personal Loan",
      quote: "Clear comparison, no pressure, no surprise charges. My advisor still checks in whenever rates drop.",
      amount: "₹8 L",
      approvedIn: "48 hrs",
      name: "Dr. Kavita Rao",
      role: "Dentist · Bangalore",
      avatar: "/api/placeholder/100/100"
    }
  ];

  return (
    <div className="bg-[#f8f9fc] py-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
          
          {/* Left: Titles */}
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex">
                <div className="w-2.5 h-2.5 bg-[#8ec843]"></div>
                <div className="w-2.5 h-2.5 bg-[#004aad]"></div>
              </div>
              <span className="text-[11px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                Success Stories
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-[3.25rem] leading-[1.1] font-bold text-[#0a192f] tracking-tight">
              Real people. Real<br />
              <span className="text-[#0052cc] font-serif italic font-normal">milestones.</span>
            </h2>
          </div>

          {/* Right: Stats */}
          <div className="flex items-center gap-8 pb-2">
            {/* Google Reviews */}
            <div>
              <div className="flex items-baseline gap-1.5 mb-1.5">
                <span className="text-4xl font-bold text-[#0a192f] tracking-tight">4.5</span>
                <span className="text-lg font-medium text-slate-400">/ 5</span>
              </div>
              <div className="flex gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={14} className="fill-[#f59e0b] text-[#f59e0b]" />
                ))}
              </div>
              <p className="text-xs text-slate-500 font-medium">Google reviews</p>
            </div>
            
            {/* Divider */}
            <div className="w-px h-14 bg-slate-200 mx-2"></div>

            {/* Recommendation */}
            <div>
              <div className="text-4xl font-bold text-[#0a192f] tracking-tight mb-3">
                96%
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Would recommend us
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div 
              key={index} 
              className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col h-full"
            >
              {/* Top Row: Quote Icon & Pill */}
              <div className="flex justify-between items-start mb-6">
                {/* Custom Quote SVG */}
                <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.2 0.399994V7.59999C10.2 13.6 7.4 16.8 2.6 18.8L0.6 15.6C4.2 13.6 5.4 11.2 5.4 8.79999H0.6V0.399994H10.2ZM23.4 0.399994V7.59999C23.4 13.6 20.6 16.8 15.8 18.8L13.8 15.6C17.4 13.6 18.6 11.2 18.6 8.79999H13.8V0.399994H23.4Z" fill="#8ec843"/>
                </svg>
                
                <span className="bg-[#f0f5ff] text-[#0052cc] text-[11px] font-bold px-3 py-1.5 rounded-full">
                  {review.type}
                </span>
              </div>

              {/* Quote Text */}
              <p className="text-[#334155] text-[15px] leading-relaxed flex-1 mb-8">
                {review.quote}
              </p>

              <div className="mt-auto">
                {/* Stats Row */}
                <div className="border-t border-slate-100 pt-5 pb-5 grid grid-cols-2">
                  <div>
                    <p className="text-[11px] text-slate-400 font-medium mb-1">Amount</p>
                    <p className="text-[15px] font-bold text-[#0a192f]">{review.amount}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-medium mb-1">Approved in</p>
                    <p className="text-[15px] font-bold text-[#0a192f]">{review.approvedIn}</p>
                  </div>
                </div>

                {/* User Profile */}
                <div className="border-t border-slate-100 pt-5 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-slate-200 overflow-hidden shrink-0">
                    <img 
                      src={review.avatar} 
                      alt={review.name}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <p className="text-[14px] font-bold text-[#0a192f] leading-none">{review.name}</p>
                      <CheckCircle2 size={14} className="text-[#8ec843]" strokeWidth={2.5} />
                    </div>
                    <p className="text-[12px] text-slate-500">{review.role}</p>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}