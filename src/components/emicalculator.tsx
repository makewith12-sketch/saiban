import { useState, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';

export default function EMICalculator() {
  // State for interactive sliders
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [activeTab, setActiveTab] = useState('Home loan');

  // Constants for slider min/max
  const limits = {
    amount: { min: 500000, max: 20000000, step: 100000 },
    interest: { min: 7, max: 13, step: 0.01 },
    tenure: { min: 1, max: 30, step: 1 }
  };

  // Math Calculations
  const { emi, totalInterest, totalPayable, interestPercent } = useMemo(() => {
    const P = loanAmount;
    const R = (interestRate / 12) / 100;
    const N = tenure * 12;

    const exactEmi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const emiRounded = Math.round(exactEmi);
    
    // Using exact EMI for total calculation to match the image's specific output
    const exactTotalPayable = Math.round(exactEmi * N); 
    const exactTotalInterest = exactTotalPayable - P;

    const interestPct = Math.round((exactTotalInterest / exactTotalPayable) * 100);

    return {
      emi: emiRounded,
      totalInterest: exactTotalInterest,
      totalPayable: exactTotalPayable,
      interestPercent: interestPct
    };
  }, [loanAmount, interestRate, tenure]);

  // Formatters
  const formatCurrency = (val: number) => `₹${new Intl.NumberFormat('en-IN').format(val)}`;
  const getSliderPercent = (val: number, min: number, max: number) => ((val - min) / (max - min)) * 100;

  // Chart Properties
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (interestPercent / 100) * circumference;

  return (
    <div className="bg-white py-24 font-sans">
      {/* Custom Styles for Slider Thumbs */}
      <style dangerouslySetInnerHTML={{__html: `
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ffffff;
          border: 4px solid #0052cc;
          box-shadow: 0 2px 6px rgba(0, 82, 204, 0.4);
          cursor: pointer;
          margin-top: -8px; /* Center thumb on track */
        }
        input[type=range]::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ffffff;
          border: 4px solid #0052cc;
          box-shadow: 0 2px 6px rgba(0, 82, 204, 0.4);
          cursor: pointer;
        }
        input[type=range]::-webkit-slider-runnable-track {
          width: 100%;
          height: 4px;
          cursor: pointer;
          border-radius: 2px;
        }
        .grid-bg {
          background-size: 30px 30px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        }
      `}} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8">
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex">
                <div className="w-2.5 h-2.5 bg-[#8ec843]"></div>
                <div className="w-2.5 h-2.5 bg-[#0052cc]"></div>
              </div>
              <span className="text-[11px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                EMI Calculator
              </span>
            </div>
            {/* Title */}
            <h2 className="text-[3.25rem] leading-[1.05] font-bold text-[#0a192f] tracking-tight">
              Know your EMI <span className="text-[#0052cc] font-serif italic font-normal">before</span> you<br />apply.
            </h2>
          </div>
          
          {/* Subtitle text */}
          <p className="text-slate-500 text-[14px] leading-relaxed max-w-xs mb-2">
            Move the sliders to see what your monthly repayment could look like.
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="flex flex-col lg:flex-row rounded-[2rem] shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-slate-100 overflow-hidden bg-white">
          
          {/* Left Side: Inputs */}
          <div className="w-full lg:w-3/5 p-8 lg:p-12 pt-10">
            
            {/* Tabs */}
            <div className="inline-flex bg-[#f4f7fb] p-1.5 rounded-xl mb-12">
              {['Home loan', 'Personal loan', 'Business loan'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 rounded-lg text-[13px] font-bold transition-all duration-200 ${
                    activeTab === tab 
                      ? 'bg-white text-[#0052cc] shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Input Groups */}
            <div className="space-y-10">
              
              {/* Loan Amount */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <label className="text-[14px] font-bold text-[#0a192f]">Loan amount</label>
                  <span className="text-[1.35rem] font-bold text-[#0a192f] tracking-tight font-mono">
                    {formatCurrency(loanAmount)}
                  </span>
                </div>
                <input 
                  type="range" 
                  min={limits.amount.min} 
                  max={limits.amount.max} 
                  step={limits.amount.step}
                  value={loanAmount} 
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-1 appearance-none bg-transparent rounded-full relative z-10"
                  style={{
                    background: `linear-gradient(to right, #0052cc 0%, #0052cc ${getSliderPercent(loanAmount, limits.amount.min, limits.amount.max)}%, #e2e8f0 ${getSliderPercent(loanAmount, limits.amount.min, limits.amount.max)}%, #e2e8f0 100%)`
                  }}
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-medium mt-3">
                  <span>₹5 L</span>
                  <span>₹2 Cr</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <label className="text-[14px] font-bold text-[#0a192f]">Interest rate (p.a.)</label>
                  <span className="text-[1.35rem] font-bold text-[#0a192f] tracking-tight font-mono">
                    {interestRate.toFixed(2)}%
                  </span>
                </div>
                <input 
                  type="range" 
                  min={limits.interest.min} 
                  max={limits.interest.max} 
                  step={limits.interest.step}
                  value={interestRate} 
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-1 appearance-none bg-transparent rounded-full relative z-10"
                  style={{
                    background: `linear-gradient(to right, #0052cc 0%, #0052cc ${getSliderPercent(interestRate, limits.interest.min, limits.interest.max)}%, #e2e8f0 ${getSliderPercent(interestRate, limits.interest.min, limits.interest.max)}%, #e2e8f0 100%)`
                  }}
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-medium mt-3">
                  <span>7%</span>
                  <span>13%</span>
                </div>
              </div>

              {/* Tenure */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <label className="text-[14px] font-bold text-[#0a192f]">Tenure</label>
                  <span className="text-[1.35rem] font-bold text-[#0a192f] tracking-tight font-mono">
                    {tenure} years
                  </span>
                </div>
                <input 
                  type="range" 
                  min={limits.tenure.min} 
                  max={limits.tenure.max} 
                  step={limits.tenure.step}
                  value={tenure} 
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full h-1 appearance-none bg-transparent rounded-full relative z-10"
                  style={{
                    background: `linear-gradient(to right, #0052cc 0%, #0052cc ${getSliderPercent(tenure, limits.tenure.min, limits.tenure.max)}%, #e2e8f0 ${getSliderPercent(tenure, limits.tenure.min, limits.tenure.max)}%, #e2e8f0 100%)`
                  }}
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-medium mt-3">
                  <span>1 yr</span>
                  <span>30 yrs</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Side: Results & Chart */}
          <div className="w-full lg:w-2/5 bg-[#051120] text-white p-8 lg:p-12 relative overflow-hidden flex flex-col grid-bg">
            
            <p className="text-[11px] text-blue-300/80 font-bold tracking-[0.15em] uppercase mb-4 z-10">
              Your Monthly EMI
            </p>
            
            <div className="text-[3.25rem] font-bold text-white tracking-tight leading-none mb-12 font-mono z-10">
              {formatCurrency(emi)}
            </div>

            {/* Breakdown Section */}
            <div className="flex flex-col sm:flex-row items-center gap-8 mb-10 z-10">
              
              {/* Doughnut Chart */}
              <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background Circle (Principal - Blue) */}
                  <circle 
                    cx="50" cy="50" r={radius} 
                    fill="transparent" 
                    stroke="#0052cc" 
                    strokeWidth="12"
                  />
                  {/* Foreground Circle (Interest - Green) */}
                  <circle 
                    cx="50" cy="50" r={radius} 
                    fill="transparent" 
                    stroke="#8ec843" 
                    strokeWidth="12" 
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-in-out"
                  />
                </svg>
                {/* Center text */}
                <div className="absolute text-center flex flex-col items-center">
                  <span className="text-[14px] font-bold text-white leading-tight">{interestPercent}%</span>
                  <span className="text-[9px] text-blue-300 font-medium">interest</span>
                </div>
              </div>

              {/* Data Table */}
              <div className="flex-1 w-full space-y-4">
                
                <div className="flex justify-between items-center text-[12px]">
                  <div className="flex items-center gap-2 text-slate-300 font-medium">
                    <div className="w-2 h-2 bg-[#0052cc] rounded-[2px]"></div> Principal
                  </div>
                  <span className="font-bold text-white tracking-wide font-mono">{formatCurrency(loanAmount)}</span>
                </div>

                <div className="flex justify-between items-center text-[12px]">
                  <div className="flex items-center gap-2 text-slate-300 font-medium">
                    <div className="w-2 h-2 bg-[#8ec843] rounded-[2px]"></div> Total interest
                  </div>
                  <span className="font-bold text-white tracking-wide font-mono">{formatCurrency(totalInterest)}</span>
                </div>

                <div className="w-full h-px bg-slate-700/50 my-1"></div>

                <div className="flex justify-between items-center text-[13px]">
                  <span className="font-bold text-white">Total payable</span>
                  <span className="font-bold text-white tracking-wide font-mono">{formatCurrency(totalPayable)}</span>
                </div>

              </div>
            </div>

            {/* Action Button */}
            <div className="mt-auto z-10">
              <button className="w-full bg-white hover:bg-slate-100 text-[#0a192f] font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 text-[14px] transition-colors mb-4">
                Get offers at this EMI <ArrowRight size={16} strokeWidth={2.5} />
              </button>
              
              <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                Illustrative figures. Actual EMI depends on the lender's final terms.
              </p>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
}