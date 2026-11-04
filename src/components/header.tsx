// src/components/header.tsx
import { useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home Loans", href: "/" },
    { label: "Personal Loans", href: "/" },
    { label: "Business Loans", href: "/apply" },
    { label: "EMI Calculator", href: "/calculator" },
    { label: "About", href: "/#about" },
    { label: "Insights", href: "/#insights" }
  ];

  const handleApplyClick = () => {
    setIsMobileMenuOpen(false);
    window.location.href = '/apply';
  };

  return (
    <>
      {/* Background Grid Style matching the design */}
      <style dangerouslySetInnerHTML={{__html: `
        .header-grid {
          background-color: #fcfcfd;
          background-size: 32px 32px;
          background-image: 
            linear-gradient(to right, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.02) 1px, transparent 1px);
        }
      `}} />

      <header className="relative w-full border-b border-slate-100 header-grid z-50 font-sans">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-[5.5rem]">
            
            {/* 1. Logo Section */}
            <div className="flex-shrink-0 flex items-center">
              <a href="/">
                <img 
                  src="/logo12.jpeg" 
                  alt="Saiban Capital Solutions" 
                  className="h-10 lg:h-12 w-auto object-contain"
                />
              </a>
            </div>

            {/* 2. Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.href} 
                  className="text-[14.5px] font-semibold text-[#0a192f] hover:text-[#0052cc] transition-colors whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* 3. Desktop Actions (Contact & Button) */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              <div className="flex items-center gap-2 text-[#0a192f] font-semibold text-[14.5px]">
                <Phone size={16} strokeWidth={2.5} className="text-[#0a192f]" />
                <span>+91 91011 25757</span>
              </div>
              <button 
                onClick={handleApplyClick}
                className="bg-[#0052cc] hover:bg-[#003d8f] text-white font-bold text-[14.5px] px-6 py-2.5 rounded-lg transition-colors shadow-[0_4px_14px_rgba(0,82,204,0.25)] cursor-pointer"
              >
                Apply now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-[#0a192f] p-2 focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-[5.5rem] left-0 w-full bg-white border-b border-slate-100 shadow-lg py-4 px-4 flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[15px] font-semibold text-[#0a192f] hover:text-[#0052cc] py-2 border-b border-slate-50 last:border-0"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-4 mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-[#0a192f] font-semibold text-[15px]">
                <Phone size={18} strokeWidth={2.5} />
                <span>+91 91011 25757</span>
              </div>
              <button 
                onClick={handleApplyClick}
                className="w-full bg-[#0052cc] text-white font-bold text-[15px] px-6 py-3 rounded-lg shadow-md"
              >
                Apply now
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}