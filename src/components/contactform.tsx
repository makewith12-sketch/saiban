import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Lock, 
  ArrowRight,
  ChevronDown
} from 'lucide-react';

export default function ContactForm() {
  return (
    <div className="bg-white min-h-screen font-sans text-slate-900 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Information */}
          <div className="pt-4">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex">
                <div className="w-2.5 h-2.5 bg-green-500"></div>
                <div className="w-2.5 h-2.5 bg-blue-700"></div>
              </div>
              <span className="text-[11px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                Get in touch
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-[3.5rem] leading-[1.05] font-bold text-[#0a192f] mb-6 tracking-tight">
              Let's find your <span className="text-[#0052cc] font-serif italic font-normal">best</span><br />
              <span className="text-[#0052cc] font-serif italic font-normal">offer.</span>
            </h1>

            <p className="text-slate-500 text-[15px] leading-relaxed max-w-md mb-10">
              Share a few details and a Saiban advisor will call you with options tailored to your profile.
            </p>

            {/* Contact List */}
            <div className="flex flex-col border-t border-slate-100">
              
              {/* Phone */}
              <div className="py-6 flex items-start gap-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Phone size={18} fill="currentColor" className="text-blue-100" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium mb-1">Call us</p>
                  <p className="font-bold text-[#0a192f] text-sm">+91 91011 25757</p>
                </div>
              </div>

              {/* Email */}
              <div className="py-6 flex items-start gap-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                  <Mail size={18} fill="currentColor" className="text-green-100" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium mb-1">Email</p>
                  <p className="font-bold text-[#0a192f] text-sm">[hello@saibancapital.in]</p>
                </div>
              </div>

              {/* Office */}
              <div className="py-6 flex items-start gap-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <MapPin size={18} fill="currentColor" className="text-blue-100" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium mb-1">Visit our office</p>
                  <p className="font-bold text-[#0a192f] text-sm leading-relaxed">
                    [Office address line 1]<br />
                    Bangalore, Karnataka – 560001
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="py-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                  <Clock size={18} fill="currentColor" className="text-green-100" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium mb-1">Office hours</p>
                  <p className="font-bold text-[#0a192f] text-sm">Mon – Sat · 10:00 am – 7:00 pm</p>
                </div>
              </div>

            </div>

            {/* Image with Badge */}
            <div className="relative mt-2 h-48 w-full rounded-[1.25rem] overflow-hidden bg-slate-200">
              <img 
                src="/contactform.png" 
                alt="Saiban representative at office desk" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm border border-slate-100/50">
                <div className="w-2 h-2 rounded-full bg-green-600"></div>
                <span className="text-[11px] font-bold text-[#0a192f]">Walk-ins welcome</span>
              </div>
            </div>
            
          </div>

          {/* Right Column: Form Card */}
          <div className="bg-white rounded-[2rem] shadow-[0_8px_40px_rgb(0,0,0,0.06)] p-8 lg:p-10 border border-slate-100">
            
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-[1.35rem] font-bold text-[#0a192f]">Request a callback</h2>
              <div className="flex items-center gap-1.5 text-xs font-bold text-green-700 bg-white mt-1">
                <Lock size={12} strokeWidth={2.5} />
                256-bit secure
              </div>
            </div>
            
            <p className="text-slate-500 text-[13px] mb-8">
              Takes under a minute. No spam, ever.
            </p>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full name */}
                <div>
                  <label className="block text-[13px] font-semibold text-slate-600 mb-2">Full name</label>
                  <input 
                    type="text" 
                    placeholder="Your name" 
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0052cc] focus:border-[#0052cc] outline-none transition-all text-sm placeholder:text-slate-400" 
                  />
                </div>
                {/* Mobile number */}
                <div>
                  <label className="block text-[13px] font-semibold text-slate-600 mb-2">Mobile number</label>
                  <input 
                    type="tel" 
                    placeholder="+91" 
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0052cc] focus:border-[#0052cc] outline-none transition-all text-sm placeholder:text-slate-400" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Email */}
                <div>
                  <label className="block text-[13px] font-semibold text-slate-600 mb-2">Email</label>
                  <input 
                    type="email" 
                    placeholder="you@example.com" 
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0052cc] focus:border-[#0052cc] outline-none transition-all text-sm placeholder:text-slate-400" 
                  />
                </div>
                {/* City */}
                <div>
                  <label className="block text-[13px] font-semibold text-slate-600 mb-2">City</label>
                  <input 
                    type="text" 
                    placeholder="Your city" 
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0052cc] focus:border-[#0052cc] outline-none transition-all text-sm placeholder:text-slate-400" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Loan type */}
                <div>
                  <label className="block text-[13px] font-semibold text-slate-600 mb-2">Loan type</label>
                  <div className="relative">
                    <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0052cc] focus:border-[#0052cc] outline-none transition-all text-sm appearance-none bg-white text-[#0a192f] font-medium">
                      <option>Home Loan</option>
                      <option>Personal Loan</option>
                      <option>Business Loan</option>
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
                  </div>
                </div>
                {/* Loan amount */}
                <div>
                  <label className="block text-[13px] font-semibold text-slate-600 mb-2">Loan amount</label>
                  <input 
                    type="text" 
                    placeholder="e.g. ₹25,00,000" 
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0052cc] focus:border-[#0052cc] outline-none transition-all text-sm placeholder:text-slate-400" 
                  />
                </div>
              </div>

              {/* Textarea */}
              <div>
                <label className="block text-[13px] font-semibold text-slate-600 mb-2">
                  Anything we should know? <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <textarea 
                  rows={3} 
                  placeholder="Monthly income, existing loans, preferred lender..." 
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0052cc] focus:border-[#0052cc] outline-none transition-all text-sm resize-none placeholder:text-slate-400"
                ></textarea>
              </div>

              {/* Checkbox */}
              <div className="flex items-start gap-3 pt-2 pb-2">
                <div className="flex items-center h-5 mt-0.5">
                  <input 
                    id="consent" 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-slate-300 text-[#004aad] focus:ring-[#004aad] cursor-pointer" 
                  />
                </div>
                <label htmlFor="consent" className="text-[12px] text-slate-500 leading-relaxed cursor-pointer">
                  I agree to be contacted by Saiban Capital Solutions by call, SMS or WhatsApp, and accept the privacy policy.
                </label>
              </div>

              {/* Submit Button */}
              <button 
                type="button" 
                className="w-full bg-[#004aad] hover:bg-[#003d8f] text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors text-[15px]"
              >
                Get my loan options <ArrowRight size={18} strokeWidth={2.5} />
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}