import React from 'react';
import { ArrowRight } from 'lucide-react';

interface PartnerItem {
  id: string;
  name: string;
  products: string;
  type: 'Bank' | 'NBFC';
  logoUrl?: string;
  logoClass?: string;
  logo?: React.ReactNode;
}

export default function Partners() {
  const partnersData: PartnerItem[] = [
    {
      id: 'HD',
      name: 'HDFC Bank',
      products: 'Home · Personal · Business',
      type: 'Bank',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg',
      logoClass: 'h-6 w-auto max-w-[118px]',
    },
    {
      id: 'IC',
      name: 'ICICI Bank',
      products: 'Home · Personal · LAP',
      type: 'Bank',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg',
      logoClass: 'h-6 w-auto max-w-[118px]',
    },
    {
      id: 'SB',
      name: 'State Bank of India',
      products: 'Home · Personal',
      type: 'Bank',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/SBI-logo.svg',
      logoClass: 'h-6 w-auto max-w-[112px]',
    },
    {
      id: 'AX',
      name: 'Axis Bank',
      products: 'Home · Business · LAP',
      type: 'Bank',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Axis_Bank_logo.svg',
      logoClass: 'h-6 w-auto max-w-[118px]',
    },
    {
      id: 'KM',
      name: 'Kotak Mahindra',
      products: 'Home · Personal',
      type: 'Bank',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/3/39/Kotak_Mahindra_Group_logo.svg',
      logoClass: 'h-7 w-auto max-w-[122px]',
    },
    {
      id: 'BF',
      name: 'Bajaj Finserv',
      products: 'Personal · Business',
      type: 'NBFC',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Bajaj_Finserv_Logo.svg',
      logoClass: 'h-5 w-auto max-w-[122px]',
    },
    {
      id: 'IF',
      name: 'IDFC FIRST Bank',
      products: 'Personal · Business',
      type: 'Bank',
      logo: (
        <div className="flex items-center gap-2 transition-transform duration-300 group-hover:scale-105">
          <svg viewBox="0 0 40 40" className="h-7 w-7 shrink-0" fill="none">
            <rect width="40" height="40" rx="6" fill="#9C1D26" />
            <rect x="9" y="10" width="22" height="4" rx="1" fill="white" />
            <rect x="9" y="18" width="16" height="4" rx="1" fill="white" />
            <rect x="9" y="26" width="9" height="4" rx="1" fill="white" />
          </svg>
          <div className="leading-none text-left">
            <span className="block text-[13px] font-black tracking-tight text-[#9C1D26]">
              IDFC FIRST
            </span>
            <span className="block text-[9px] font-bold tracking-widest text-slate-600 uppercase">
              Bank
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 'TC',
      name: 'Tata Capital',
      products: 'Home · Personal · Business',
      type: 'NBFC',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Tata_logo.svg',
      logoClass: 'h-6 w-auto max-w-[110px]',
    },
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
              The right lender for{' '}
              <span className="text-[#0052cc] font-serif italic font-normal">your</span>
              <br />
              profile.
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
          {partnersData.map((partner) => (
            <a
              key={partner.id}
              href="/contact"
              className="bg-white rounded-[1.5rem] p-7 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex flex-col group cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1"
            >
              {/* Card Top: Real Brand Logo & Type Badge */}
              <div className="flex justify-between items-center gap-3 mb-8">
                <div className="h-12 px-3.5 rounded-xl flex items-center justify-center bg-slate-50/90 border border-slate-100 overflow-hidden">
                  {partner.logo ? (
                    partner.logo
                  ) : (
                    <img
                      src={partner.logoUrl}
                      alt={`${partner.name} logo`}
                      loading="lazy"
                      className={`${partner.logoClass || 'h-6 w-auto'} object-contain transition-transform duration-300 group-hover:scale-105`}
                    />
                  )}
                </div>
                <span className="bg-[#f4faef] text-[#558b2f] text-[10px] font-bold px-3 py-1.5 rounded-full shrink-0">
                  {partner.type}
                </span>
              </div>

              {/* Card Middle: Content */}
              <div className="flex-1">
                <h3 className="text-[17px] font-bold text-[#0a192f] mb-1.5">{partner.name}</h3>
                <p className="text-[12px] text-slate-400 font-medium mb-6">{partner.products}</p>
              </div>

              {/* Card Bottom: Divider & Footer */}
              <div className="mt-auto">
                <div className="w-full h-px bg-slate-100 mb-5"></div>
                <p className="text-[12px] text-slate-400 font-medium flex items-center gap-1.5 group-hover:text-[#0052cc] transition-colors">
                  Compare offer
                  <ArrowRight
                    size={13}
                    className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                  />
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}