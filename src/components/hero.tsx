import { 
  ArrowRight, 
  Calculator, 
  ShieldCheck, 
  Percent, 
  Lock, 
  Check,
  Star
} from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-[#fcfcfd] pt-12 pb-24 lg:pt-20 lg:pb-32 font-sans overflow-hidden">
      
      {/* Background Grid */}
      <style dangerouslySetInnerHTML={{__html: `
        .hero-grid {
          background-size: 48px 48px;
          background-image: 
            linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
        }
      `}} />
      <div className="absolute inset-0 hero-grid pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Left Column: Content */}
          <div className="max-w-xl">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-full p-1.5 pr-4 mb-8 shadow-sm">
              <span className="bg-[#f4faef] text-[#558b2f] text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide">
                NEW
              </span>
              <span className="text-[12px] text-slate-600 font-medium">
                Doorstep document pickup across India.
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-[3.5rem] lg:text-[4rem] leading-[1.05] font-bold text-[#0a192f] tracking-tight mb-6">
              Borrow with clarity.<br />
              Grow with<br />
              <span className="text-[#0052cc] font-serif italic font-normal tracking-normal">confidence.</span>
            </h1>

            {/* Description */}
            <p className="text-[16px] text-slate-500 leading-relaxed mb-10 max-w-[90%]">
              Saiban Capital compares offers from leading banks and NBFCs, handles the paperwork for you, and stays with you until the money reaches your account.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
              <button className="w-full sm:w-auto bg-[#0052cc] hover:bg-[#003d8f] text-white font-semibold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 text-[14px] transition-colors shadow-lg shadow-blue-900/10">
                Check your eligibility <ArrowRight size={18} strokeWidth={2.5} />
              </button>
              
              <button className="w-full sm:w-auto bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-[#0a192f] font-semibold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 text-[14px] transition-colors shadow-sm">
                <Calculator size={18} strokeWidth={2.5} className="text-slate-500" /> Calculate EMI
              </button>
            </div>

            {/* Trust Features Grid */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 border-b border-slate-200 pb-8 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <ShieldCheck size={16} className="text-[#0052cc]" strokeWidth={2.5} />
                </div>
                <span className="text-[12px] font-bold text-[#0a192f]">RBI-regulated lenders only</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#f4faef] flex items-center justify-center shrink-0">
                  <Percent size={14} className="text-[#558b2f]" strokeWidth={3} />
                </div>
                <span className="text-[12px] font-bold text-[#0a192f]">No hidden charges</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <Lock size={16} className="text-[#0052cc]" strokeWidth={2.5} />
                </div>
                <span className="text-[12px] font-bold text-[#0a192f]">Your data stays private</span>
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <img className="w-8 h-8 rounded-full border-2 border-white object-cover bg-slate-200" src="/api/placeholder/32/32" alt="User" />
                <img className="w-8 h-8 rounded-full border-2 border-white object-cover bg-slate-200" src="/api/placeholder/32/32" alt="User" />
                <img className="w-8 h-8 rounded-full border-2 border-white object-cover bg-slate-200" src="/api/placeholder/32/32" alt="User" />
              </div>
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={10} className="fill-[#f59e0b] text-[#f59e0b]" />
                  ))}
                </div>
                <p className="text-[11px] text-slate-500">
                  Trusted by <span className="font-bold text-[#0a192f]">9,000+</span> families & businesses
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Visuals & Floating Cards */}
          <div className="relative w-full lg:h-[650px] flex justify-end">
            
            {/* Main Portrait Image */}
            <div className="w-full sm:w-[85%] h-[500px] lg:h-full rounded-[2.5rem] bg-slate-200 overflow-hidden shadow-xl">
              <img 
                src="/hero.png" 
                alt="Confident professional woman" 
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Floating Card 1: Top Pill */}
            <div className="absolute top-6 right-6 lg:right-[-20px] bg-white rounded-full shadow-[0_8px_20px_rgb(0,0,0,0.06)] border border-slate-100 px-4 py-2 flex items-center gap-2 z-20 hidden sm:flex">
              <div className="w-2 h-2 rounded-full bg-[#558b2f]"></div>
              <span className="text-[11px] font-bold text-[#0a192f]">Home loan sanctioned · ₹48.5 L</span>
            </div>

            {/* Floating Card 2: Loan Sanctioned */}
            <div className="absolute top-24 lg:top-32 left-0 lg:-left-12 bg-white rounded-[1.25rem] shadow-[0_15px_40px_rgb(0,0,0,0.08)] border border-slate-100 p-5 w-[280px] z-20">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f4faef] text-[#558b2f] flex items-center justify-center shrink-0">
                    <Check size={16} strokeWidth={3} />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-[#0a192f] leading-tight">Loan sanctioned</p>
                    <p className="text-[10px] text-slate-400">Home Loan · Example</p>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 font-medium pt-0.5">just now</span>
              </div>
              
              <div className="text-[1.75rem] font-bold text-[#0a192f] mb-4">
                ₹48,50,000
              </div>
              
              <div className="border-t border-dashed border-slate-200 pt-3 flex justify-between text-[11px] text-slate-500 font-medium">
                <span>Tenure 20 yrs</span>
                <span>EMI ₹42,089</span>
              </div>
            </div>

            {/* Floating Card 3: Application Status (Stepper) */}
            <div className="absolute bottom-16 lg:bottom-12 left-4 lg:-left-6 bg-white rounded-[1.25rem] shadow-[0_15px_40px_rgb(0,0,0,0.08)] border border-slate-100 p-5 w-[300px] z-20">
              <div className="flex justify-between items-end mb-6">
                <p className="text-[12px] font-bold text-[#0a192f]">Application status</p>
                <p className="text-[10px] text-slate-400 font-mono">#SC-20418</p>
              </div>
              
              {/* Stepper Line */}
              <div className="relative flex justify-between items-center px-2">
                <div className="absolute top-2.5 left-4 right-4 h-0.5 bg-slate-100 -z-10"></div>
                <div className="absolute top-2.5 left-4 right-1/2 h-0.5 bg-[#8ec843] -z-10"></div>
                
                {/* Step 1 */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#8ec843] text-white flex items-center justify-center border-2 border-white shadow-sm">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-[9px] font-medium text-slate-500">Applied</span>
                </div>
                
                {/* Step 2 */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#8ec843] text-white flex items-center justify-center border-2 border-white shadow-sm">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-[9px] font-medium text-slate-500">Docs</span>
                </div>
                
                {/* Step 3 (Current) */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-5 h-5 rounded-full border-2 border-[#0052cc] bg-white flex items-center justify-center shadow-sm">
                    <div className="w-1.5 h-1.5 bg-[#0052cc] rounded-full"></div>
                  </div>
                  <span className="text-[9px] font-bold text-[#0052cc]">Verifying</span>
                </div>
                
                {/* Step 4 */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-5 h-5 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center"></div>
                  <span className="text-[9px] font-medium text-slate-400">Sanction</span>
                </div>
              </div>
            </div>

            {/* Floating Card 4: Rates Chart */}
            <div className="absolute top-[45%] lg:top-[50%] right-[-10px] lg:right-[-30px] bg-[#0a192f] rounded-[1.25rem] shadow-[0_20px_40px_rgb(0,0,0,0.15)] border border-slate-700/50 p-5 w-[200px] z-20">
              <div className="flex justify-between items-center mb-3">
                <p className="text-[10px] text-slate-400 font-medium">Home loan rates</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#8ec843]"></div>
                  <span className="text-[9px] text-slate-300">Live</span>
                </div>
              </div>
              
              <div className="flex items-end gap-1 mb-6">
                <span className="text-[11px] text-slate-400 mb-1">from</span>
                <span className="text-[1.75rem] font-bold text-white leading-none">8.35%</span>
              </div>
              
              {/* Mini Bar Chart */}
              <div className="flex items-end gap-1.5 h-8 mb-4">
                <div className="w-full bg-slate-600 rounded-sm h-[40%]"></div>
                <div className="w-full bg-slate-600 rounded-sm h-[60%]"></div>
                <div className="w-full bg-slate-600 rounded-sm h-[50%]"></div>
                <div className="w-full bg-slate-600 rounded-sm h-[80%]"></div>
                <div className="w-full bg-[#8ec843] rounded-sm h-[100%] shadow-[0_0_10px_rgba(142,200,67,0.3)]"></div>
              </div>
              
              <p className="text-[8px] text-slate-400 text-center border-t border-slate-700 pt-3">
                Best offer across 30+ lenders*
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}