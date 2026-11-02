import { useState } from 'react';
import { Plus, X, Phone, ArrowRight } from 'lucide-react';

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqData = [
    {
      num: "01",
      question: "Does Saiban charge for its advisory?",
      answer: "Eligibility checks and offer comparison are free. Any applicable fee is shared in writing before you proceed — never deducted without your consent."
    },
    {
      num: "02",
      question: "Will checking my eligibility affect my credit score?",
      answer: "No, our initial eligibility checks are soft inquiries and will not impact your credit score. Hard inquiries are only performed when you officially submit a loan application to a specific lender."
    },
    {
      num: "03",
      question: "What documents will I need?",
      answer: "Generally, you will need proof of identity (PAN/Aadhar), address proof, 6 months of bank statements, and income proof (salary slips or ITR). Specific requirements vary by loan type."
    },
    {
      num: "04",
      question: "How long does approval take?",
      answer: "Personal loans can be approved within 24-48 hours. Home and business loans typically take 5-7 working days depending on the lender's verification process."
    },
    {
      num: "05",
      question: "Can I transfer my existing loan to a lower rate?",
      answer: "Yes, we specialize in balance transfers. Our advisors can help you calculate the net savings after considering any prepayment penalties and processing fees to ensure it's the right move."
    },
    {
      num: "06",
      question: "Is my personal information safe?",
      answer: "Absolutely. We use bank-level 256-bit encryption for all data transfers. Your information is never sold to third parties and is only shared with lenders you explicitly approve."
    }
  ];

  return (
    <div className="font-sans">
      {/* Top Section: FAQ Accordion */}
      <section className="bg-[#f8f9fc] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-20">
            
            {/* Left Column: Title and Contact Card */}
            <div className="lg:col-span-5 pt-2">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex">
                  <div className="w-2.5 h-2.5 bg-green-500"></div>
                  <div className="w-2.5 h-2.5 bg-blue-700"></div>
                </div>
                <span className="text-[11px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                  FAQ
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-[3.25rem] leading-[1.05] font-bold text-[#0a192f] mb-6 tracking-tight">
                Questions, <span className="text-[#0052cc] font-serif italic font-normal">answered</span><br />
                plainly.
              </h2>

              <p className="text-slate-500 text-[15px] leading-relaxed max-w-sm mb-10">
                Can't find what you're looking for? An advisor will call you back within a working day.
              </p>

              {/* Advisor Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-3 flex items-center justify-between max-w-sm">
                <div className="flex items-center gap-4 pl-2">
                  <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm shrink-0">
                    <img 
                      src="/api/placeholder/100/100" 
                      alt="Advisor" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0a192f]">Talk to an advisor</p>
                    <p className="text-xs text-slate-500 mt-0.5">Mon–Sat, 10am – 7pm</p>
                  </div>
                </div>
                <button className="w-11 h-11 bg-[#004aad] hover:bg-[#003d8f] text-white rounded-xl flex items-center justify-center transition-colors shrink-0 shadow-md shadow-blue-900/10">
                  <Phone size={18} fill="currentColor" />
                </button>
              </div>
            </div>

            {/* Right Column: Accordion */}
            <div className="lg:col-span-7 border-t border-slate-200/80">
              {faqData.map((faq, index) => (
                <div 
                  key={index} 
                  className="py-6 border-b border-slate-200/80"
                >
                  <div 
                    className="flex items-start justify-between cursor-pointer group"
                    onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  >
                    <div className="flex gap-6 sm:gap-8 w-full pr-6">
                      <span className="text-slate-400 text-[13px] font-semibold pt-1 shrink-0">
                        {faq.num}
                      </span>
                      <div className="flex-1">
                        <h3 className="text-[#0a192f] font-bold text-[17px] group-hover:text-[#0052cc] transition-colors">
                          {faq.question}
                        </h3>
                        {openIndex === index && (
                          <p className="mt-4 text-slate-500 text-[14px] leading-relaxed max-w-2xl animate-in slide-in-from-top-2 fade-in duration-200">
                            {faq.answer}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Toggle Icon */}
                    <button 
                      className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                        openIndex === index 
                          ? 'bg-[#004aad] text-white shadow-md' 
                          : 'bg-white border border-slate-200 text-slate-500 group-hover:border-slate-300'
                      }`}
                      aria-label="Toggle question"
                    >
                      {openIndex === index ? <X size={16} strokeWidth={2.5} /> : <Plus size={16} strokeWidth={2.5} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Bottom Section: Call to Action (CTA) */}
      <section className="relative bg-[#091525] overflow-hidden py-28 border-t-[8px] border-white">
        
        {/* Background Image Setup */}
        <div className="absolute inset-0 z-0 flex justify-end pointer-events-none">
          <div className="w-full lg:w-3/4 h-full relative">
            {/* Gradient mask to blend image seamlessly into the dark background on the left */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#091525] via-[#091525]/90 to-transparent z-10"></div>
            {/* Darken gradient from bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#091525]/80 via-transparent to-transparent z-10"></div>
            <img 
              src="/api/placeholder/1600/900" 
              alt="Happy family" 
              className="w-full h-full object-cover opacity-50 mix-blend-luminosity"
            />
          </div>
        </div>

        {/* CTA Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex">
                <div className="w-2.5 h-2.5 bg-[#8ec843]"></div>
                <div className="w-2.5 h-2.5 bg-slate-300"></div>
              </div>
              <span className="text-[11px] font-bold tracking-[0.2em] text-slate-400 uppercase">
                Ready when you are
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-[3.5rem] leading-[1.05] font-bold text-white mb-8 tracking-tight">
              Your next chapter<br />
              deserves the <span className="text-[#8ec843] font-serif italic font-normal">right loan.</span>
            </h2>

            <p className="text-slate-300 text-[15px] leading-relaxed mb-10 max-w-md">
              Get a free eligibility check and personalised offers from top lenders — without affecting your credit score.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button className="w-full sm:w-auto bg-white hover:bg-slate-100 text-[#0a192f] font-bold px-7 py-3.5 rounded-lg flex items-center justify-center gap-3 text-[14px] transition-colors shadow-lg">
                Check eligibility — it's free <ArrowRight size={18} strokeWidth={2.5} />
              </button>
              
              <button className="w-full sm:w-auto bg-transparent border border-slate-500 hover:border-slate-300 hover:bg-white/5 text-white font-bold px-7 py-3.5 rounded-lg flex items-center justify-center gap-3 text-[14px] transition-colors">
                <Phone size={16} strokeWidth={2.5} /> Speak to an advisor
              </button>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}