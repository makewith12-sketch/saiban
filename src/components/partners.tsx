import { ArrowRight } from 'lucide-react';

export default function Partners() {
  const partnersData = [
    {
      id: "HD",
      name: "HDFC Bank",
      products: "Home · Personal · Business",
      type: "Bank",
      logo: (
        <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none">
          <rect width="36" height="36" rx="4" fill="#004C8F" />
          <path d="M6 6H15V15H6V6ZM21 6H30V15H21V6ZM6 21H15V30H6V21ZM21 21H30V30H21V21Z" fill="#ED232A" />
          <rect x="13" y="13" width="10" height="10" fill="white" />
          <rect x="15.5" y="15.5" width="5" height="5" fill="#004C8F" />
        </svg>
      )
    },
    {
      id: "IC",
      name: "ICICI Bank",
      products: "Home · Personal · LAP",
      type: "Bank",
      logo: (
        <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none">
          <circle cx="18" cy="18" r="16" fill="#F37E20" />
          <path
            d="M19.5 9.5C15.5 9.5 13 12 13 15.5C13 18.2 15.2 19.5 18.2 20.5C20.8 21.3 22 22.3 22 24C22 25.8 20.2 27 17.8 27C15.6 27 14 26 13.2 24.5"
            stroke="white"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <circle cx="21.5" cy="11.5" r="2" fill="#9E1B32" />
        </svg>
      )
    },
    {
      id: "SB",
      name: "State Bank of India",
      products: "Home · Personal",
      type: "Bank",
      logo: (
        <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none">
          <circle cx="18" cy="18" r="15" fill="#280071" />
          <circle cx="18" cy="16" r="4.5" fill="white" />
          <rect x="16.3" y="19" width="3.4" height="14" fill="white" />
        </svg>
      )
    },
    {
      id: "AX",
      name: "Axis Bank",
      products: "Home · Business · LAP",
      type: "Bank",
      logo: (
        <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none">
          <path d="M18 5L6 29H12.5L18 17.5L23.5 29H30L18 5Z" fill="#97144D" />
          <path d="M15.2 23.2H20.8L18 17.5L15.2 23.2Z" fill="#97144D" />
        </svg>
      )
    },
    {
      id: "KM",
      name: "Kotak Mahindra",
      products: "Home · Personal",
      type: "Bank",
      logo: (
        <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none">
          <rect x="3" y="3" width="30" height="30" rx="8" fill="#ED1C24" />
          <path
            d="M11 19.5C11 15.5 14 13 17.5 13C20.5 13 22 15 22 17.5C22 20 20 22 17.5 22C15 22 13.5 20.2 13.5 18C13.5 16.2 14.8 15 16.5 15C18 15 19 16 19 17.5"
            stroke="#003366"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M25 16.5C25 20.5 22 23 18.5 23C15.5 23 14 21 14 18.5"
            stroke="white"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </svg>
      )
    },
    {
      id: "BF",
      name: "Bajaj Finserv",
      products: "Personal · Business",
      type: "NBFC",
      logo: (
        <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none">
          <rect x="3" y="3" width="30" height="30" rx="6" fill="#0066B3" />
          <path
            d="M12 10H20.5C23 10 24.5 11.3 24.5 13.3C24.5 14.8 23.5 16 22 16.5C23.8 17 25 18.3 25 20.2C25 22.6 23.2 24 20.2 24H12V10ZM15.5 15.3H19.5C20.6 15.3 21.3 14.7 21.3 13.8C21.3 12.9 20.6 12.4 19.5 12.4H15.5V15.3ZM15.5 21.4H19.8C21 21.4 21.7 20.8 21.7 19.8C21.7 18.8 20.9 18.2 19.7 18.2H15.5V21.4Z"
            fill="white"
          />
        </svg>
      )
    },
    {
      id: "IF",
      name: "IDFC FIRST Bank",
      products: "Personal · Business",
      type: "Bank",
      logo: (
        <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none">
          <rect x="3" y="3" width="30" height="30" rx="6" fill="#9C1D26" />
          <rect x="10" y="10" width="16" height="3.2" rx="1" fill="white" />
          <rect x="10" y="15.5" width="12" height="3.2" rx="1" fill="white" />
          <rect x="10" y="21" width="7" height="5" rx="1" fill="white" />
        </svg>
      )
    },
    {
      id: "TC",
      name: "Tata Capital",
      products: "Home · Personal · Business",
      type: "NBFC",
      logo: (
        <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none">
          <ellipse cx="18" cy="18" rx="14" ry="10.5" stroke="#005BAA" strokeWidth="2.8" />
          <path d="M9.5 14H26.5" stroke="#005BAA" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M18 14V25.5" stroke="#005BAA" strokeWidth="2.8" strokeLinecap="round" />
        </svg>
      )
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
          <a 
            href="/contact"
            className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-[14px] font-bold text-[#0a192f] hover:bg-slate-50 transition-colors shadow-sm mb-2"
          >
            View all partners <ArrowRight size={18} className="text-[#0a192f]" strokeWidth={2.5} />
          </a>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {partnersData.map((partner, index) => (
            <a 
              key={index}
              href="/contact"
              className="bg-white rounded-[1.5rem] p-7 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex flex-col group cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1"
            >
              
              {/* Card Top: Icon & Badge */}
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-50 border border-slate-100">
                  {partner.logo}
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

            </a>
          ))}
        </div>

      </div>
    </div>
  );
}