import { ArrowRight } from 'lucide-react';

export default function Articles() {
  return (
    <div className="bg-white py-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex">
                <div className="w-2.5 h-2.5 bg-[#8ec843]"></div>
                <div className="w-2.5 h-2.5 bg-[#0052cc]"></div>
              </div>
              <span className="text-[11px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                Knowledge Centre
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-[3.5rem] leading-[1.05] font-bold text-[#0a192f] tracking-tight max-w-xl">
              Borrow <span className="text-[#0052cc] font-serif italic font-normal">smarter</span>, <br/>one read at a time.
            </h2>
          </div>
          
          {/* Action Button */}
          <button className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 rounded-lg text-[13px] font-bold text-[#0a192f] hover:bg-slate-50 transition-colors shadow-sm mb-2">
            All articles <ArrowRight size={16} className="text-slate-500" strokeWidth={2.5} />
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Featured Article */}
          <div className="lg:col-span-7 cursor-pointer group">
            <div className="w-full aspect-[1.6] rounded-2xl overflow-hidden mb-6 bg-slate-100">
              <img 
                src="/api/placeholder/800/500" 
                alt="Model house with keys on a wooden table" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" 
              />
            </div>
            
            <div className="flex items-center gap-2.5 text-[13px] mb-3">
              <span className="font-bold text-[#0052cc]">Home Loans</span>
              <span className="text-slate-300 text-xs">■</span>
              <span className="text-slate-400 font-medium">8 min read</span>
            </div>
            
            <h3 className="text-[1.75rem] leading-tight font-bold text-[#0a192f] mb-4 group-hover:text-[#0052cc] transition-colors">
              Fixed or floating? Choosing the right home<br />loan rate in 2026
            </h3>
            
            <p className="text-slate-500 text-[15px] leading-relaxed max-w-xl">
              How repo-linked rates work, when a fixed rate makes sense, and what to ask your lender before you sign.
            </p>
          </div>

          {/* Right Column: Article List */}
          <div className="lg:col-span-5 flex flex-col justify-between pt-2">
            
            {/* List Article 1 */}
            <div className="flex gap-6 pb-8 border-b border-slate-100 cursor-pointer group">
              <div className="w-[8.5rem] h-[5.5rem] rounded-xl overflow-hidden shrink-0 bg-slate-100">
                <img 
                  src="/api/placeholder/136/88" 
                  alt="Plant growing from coins" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[12px] font-bold text-[#8ec843] mb-1.5">Credit Score</span>
                <h4 className="text-[16px] font-bold text-[#0a192f] leading-snug mb-2 group-hover:text-[#0052cc] transition-colors pr-4">
                  Seven habits that lift your CIBIL score in six months
                </h4>
                <span className="text-[13px] text-slate-400 font-medium">5 min read</span>
              </div>
            </div>

            {/* List Article 2 */}
            <div className="flex gap-6 py-8 border-b border-slate-100 cursor-pointer group">
              <div className="w-[8.5rem] h-[5.5rem] rounded-xl overflow-hidden shrink-0 bg-slate-100">
                <img 
                  src="/api/placeholder/136/88" 
                  alt="Documents checklist" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[12px] font-bold text-[#8ec843] mb-1.5">Documents</span>
                <h4 className="text-[16px] font-bold text-[#0a192f] leading-snug mb-2 group-hover:text-[#0052cc] transition-colors pr-4">
                  The complete document checklist for a personal loan
                </h4>
                <span className="text-[13px] text-slate-400 font-medium">4 min read</span>
              </div>
            </div>

            {/* List Article 3 */}
            <div className="flex gap-6 pt-8 cursor-pointer group">
              <div className="w-[8.5rem] h-[5.5rem] rounded-xl overflow-hidden shrink-0 bg-slate-100">
                <img 
                  src="/api/placeholder/136/88" 
                  alt="Laptop showing charts" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[12px] font-bold text-[#8ec843] mb-1.5">Business</span>
                <h4 className="text-[16px] font-bold text-[#0a192f] leading-snug mb-2 group-hover:text-[#0052cc] transition-colors pr-4">
                  Working capital vs term loan: what your MSME really needs
                </h4>
                <span className="text-[13px] text-slate-400 font-medium">6 min read</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}