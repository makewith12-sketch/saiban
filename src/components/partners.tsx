import { ArrowRight } from 'lucide-react';

export default function Partners() {
  const partnersData = [
    {
      id: "HD",
      name: "HDFC Bank",
      products: "Home · Personal · Business",
      type: "Bank",
      color: "bg-[#0052cc]"
    },
    {
      id: "IC",
      name: "ICICI Bank",
      products: "Home · Personal · LAP",
      type: "Bank",
      color: "bg-[#0a192f]"
    },
    {
      id: "SB",
      name: "State Bank of India",
      products: "Home · Personal",
      type: "Bank",
      color: "bg-[#0052cc]"
    },
    {
      id: "AX",
      name: "Axis Bank",
      products: "Home · Business · LAP",
      type: "Bank",
      color: "bg-[#0a192f]"
    },
    {
      id: "KM",
      name: "Kotak Mahindra",
      products: "Home · Personal",
      type: "Bank",
      color: "bg-[#0052cc]"
    },
    {
      id: "BF",
      name: "Bajaj Finserv",
      products: "Personal · Business",
      type: "NBFC",
      color: "bg-[#428120]"
    },
    {
      id: "IF",
      name: "IDFC FIRST Bank",
      products: "Personal · Business",
      type: "Bank",
      color: "bg-[#0a192f]"
    },
    {
      id: "TC",
      name: "Tata Capital",
      products: "Home · Personal · Business",
      type: "NBFC",
      color: "bg-[#428120]"
    }
  ];

  return (
    <div className="bg-[#f8f9fc] py-24 font-sans">
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
                Lending Partners
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-[3.5rem] leading-[1.05] font-bold text-[#0a192f] tracking-tight">
              The right lender for <span className="text-[#0052cc] font-serif italic font-normal">your</span><br />profile.
            </h2>
          </div>
          
          {/* Action Button */}
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-[14px] font-bold text-[#0a192f] hover:bg-slate-50 transition-colors shadow-sm mb-2">
            View all partners <ArrowRight size={18} className="text-[#0a192f]" strokeWidth={2.5} />
          </button>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {partnersData.map((partner, index) => (
            <div 
              key={index}
              className="bg-white rounded-[1.5rem] p-7 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex flex-col group cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1"
            >
              
              {/* Card Top: Icon & Badge */}
              <div className="flex justify-between items-start mb-8">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-[14px] tracking-wide ${partner.color}`}>
                  {partner.id}
                </div>
                <span className="bg-[#f4faef] text-[#558b2f] text-[10px] font-bold px-3 py-1.5 rounded-full">
                  {partner.type}
                </span>
              </div>

              {/* Card Middle: Content */}
              <div className="flex-1">
                <h3 className="text-[17px] font-bold text-[#0a192f] mb-1.5">
                  {partner.name}
                </h3>
                <p className="text-[12px] text-slate-400 font-medium mb-6">
                  {partner.products}
                </p>
              </div>

              {/* Card Bottom: Divider & Footer */}
              <div className="mt-auto">
                <div className="w-full h-px bg-slate-100 mb-5"></div>
                <p className="text-[12px] text-slate-400 font-medium flex items-center group-hover:text-[#0052cc] transition-colors">
                  Compare offer
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}