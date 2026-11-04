import { useState, useId, useMemo } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Table as TableIcon,
  RefreshCw,
  Info
} from 'lucide-react';

type LoanPreset = {
  name: string;
  defaultAmount: number;
  minAmount: number;
  maxAmount: number;
  defaultMonths: number;
  minMonths: number;
  maxMonths: number;
  defaultRate: number;
  minRate: number;
  maxRate: number;
};

const PRESETS: Record<string, LoanPreset> = {
  business: {
    name: 'Business Loan',
    defaultAmount: 5000000,
    minAmount: 500000,
    maxAmount: 100000000,
    defaultMonths: 36,
    minMonths: 12,
    maxMonths: 84,
    defaultRate: 15.0,
    minRate: 10.5,
    maxRate: 24.0,
  },
  home: {
    name: 'Home Loan',
    defaultAmount: 7500000,
    minAmount: 1000000,
    maxAmount: 150000000,
    defaultMonths: 180,
    minMonths: 36,
    maxMonths: 360,
    defaultRate: 8.75,
    minRate: 8.0,
    maxRate: 14.0,
  },
  lap: {
    name: 'Loan Against Property',
    defaultAmount: 10000000,
    minAmount: 1000000,
    maxAmount: 200000000,
    defaultMonths: 120,
    minMonths: 24,
    maxMonths: 240,
    defaultRate: 10.25,
    minRate: 9.0,
    maxRate: 18.0,
  },
};

export default function CalculatorPage() {
  const [selectedPreset, setSelectedPreset] = useState<string>('business');
  const preset = PRESETS[selectedPreset];

  const [loanAmount, setLoanAmount] = useState<number>(preset.defaultAmount);
  const [loanMonths, setLoanMonths] = useState<number>(preset.defaultMonths);
  const [interestRate, setInterestRate] = useState<number>(preset.defaultRate);
  const [showAmortization, setShowAmortization] = useState<boolean>(false);

  const amountSliderId = useId();
  const monthsSliderId = useId();
  const rateSliderId = useId();

  // Switch preset handlers
  const handlePresetSelect = (key: string) => {
    setSelectedPreset(key);
    const p = PRESETS[key];
    setLoanAmount(p.defaultAmount);
    setLoanMonths(p.defaultMonths);
    setInterestRate(p.defaultRate);
  };

  // Standard Reducing Balance EMI Formula
  const { emi, totalAmountPayable, totalInterest, principalRatio, interestRatio } = useMemo(() => {
    const monthlyRate = interestRate / 12 / 100;
    const computedEmi =
      monthlyRate === 0
        ? loanAmount / loanMonths
        : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanMonths)) /
          (Math.pow(1 + monthlyRate, loanMonths) - 1);

    const totalPayable = computedEmi * loanMonths;
    const totalInt = Math.max(0, totalPayable - loanAmount);
    const pRatio = totalPayable > 0 ? (loanAmount / totalPayable) * 100 : 0;
    const iRatio = totalPayable > 0 ? (totalInt / totalPayable) * 100 : 0;

    return {
      emi: computedEmi,
      totalAmountPayable: totalPayable,
      totalInterest: totalInt,
      principalRatio: pRatio,
      interestRatio: iRatio,
    };
  }, [loanAmount, loanMonths, interestRate]);

  // Year-by-year Amortization Calculation
  const amortizationSchedule = useMemo(() => {
    const monthlyRate = interestRate / 12 / 100;
    let balance = loanAmount;
    const schedule = [];
    const totalYears = Math.ceil(loanMonths / 12);

    for (let year = 1; year <= totalYears; year++) {
      let yearlyPrincipal = 0;
      let yearlyInterest = 0;
      const monthsInThisYear = Math.min(12, loanMonths - (year - 1) * 12);

      for (let m = 0; m < monthsInThisYear; m++) {
        if (balance <= 0) break;
        const interestForMonth = balance * monthlyRate;
        const principalForMonth = emi - interestForMonth;
        yearlyInterest += interestForMonth;
        yearlyPrincipal += principalForMonth;
        balance = Math.max(0, balance - principalForMonth);
      }

      schedule.push({
        year,
        yearlyPrincipal,
        yearlyInterest,
        totalPaid: yearlyPrincipal + yearlyInterest,
        balance,
      });
    }

    return schedule;
  }, [loanAmount, loanMonths, interestRate, emi]);

  const formatINR = (val: number) => {
    return `₹${Math.round(val).toLocaleString('en-IN')}`;
  };

  const handleApplyClick = () => {
    window.location.href = `/apply?amount=${loanAmount}&tenor=${loanMonths}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfd] font-sans text-slate-800">
      {/* Background Grid Style matching Header */}
      <style dangerouslySetInnerHTML={{__html: `
        .calc-grid {
          background-size: 32px 32px;
          background-image: 
            linear-gradient(to right, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.02) 1px, transparent 1px);
        }
      `}} />

      <Header />

      <main className="flex-1 py-12 md:py-20 calc-grid">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          
          {/* Header Tagline & Presets */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-semibold text-[#0052cc] border border-blue-100">
                <Sparkles className="h-3.5 w-3.5" />
                Financial Planning Intelligence
              </span>
              <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0a192f]">
                Calculate with precision. <br />
                <span className="text-[#0052cc]">Borrow with total clarity.</span>
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Simulate monthly EMIs, interest load, and repayment timeline in real-time under transparent institutional rates.
              </p>
            </div>

            {/* Loan Category Selector Pills */}
            <div className="flex items-center gap-2 p-1.5 bg-white border border-slate-200/90 rounded-2xl shadow-sm self-start md:self-auto">
              {Object.keys(PRESETS).map((key) => (
                <button
                  key={key}
                  onClick={() => handlePresetSelect(key)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedPreset === key
                      ? 'bg-[#0052cc] text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-600 hover:text-[#0052cc] hover:bg-slate-50'
                  }`}
                >
                  {PRESETS[key].name}
                </button>
              ))}
            </div>
          </div>

          {/* Calculator Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Input Sliders & Number Controls */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/40 p-6 sm:p-10 space-y-8">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-bold text-[#0a192f]">Loan Parameters</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Slide or type directly into values</p>
                </div>
                <button
                  onClick={() => handlePresetSelect(selectedPreset)}
                  className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-[#0052cc] transition"
                  title="Reset to defaults"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Reset</span>
                </button>
              </div>

              {/* 1. Loan Amount */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label htmlFor={amountSliderId} className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Loan Amount
                  </label>
                  <div className="flex items-center gap-1 border border-slate-200 bg-slate-50 rounded-xl px-3 py-1.5 focus-within:border-[#0052cc] focus-within:bg-white transition">
                    <span className="text-xs font-bold text-slate-400">₹</span>
                    <input
                      type="number"
                      value={loanAmount}
                      min={preset.minAmount}
                      max={preset.maxAmount}
                      step={50000}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-28 text-right font-extrabold text-sm text-[#0052cc] bg-transparent focus:outline-none"
                    />
                  </div>
                </div>

                <input
                  id={amountSliderId}
                  type="range"
                  min={preset.minAmount}
                  max={preset.maxAmount}
                  step={50000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#0052cc]"
                />

                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>{formatINR(preset.minAmount)}</span>
                  <span className="text-[#0052cc] font-semibold">{formatINR(loanAmount)}</span>
                  <span>{formatINR(preset.maxAmount)}</span>
                </div>
              </div>

              {/* 2. Loan Tenure (Months + Year conversion) */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <label htmlFor={monthsSliderId} className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Tenure
                    </label>
                    <span className="ml-2 text-[11px] text-slate-400 font-medium">
                      ({(loanMonths / 12).toFixed(1)} Years)
                    </span>
                  </div>
                  <div className="flex items-center gap-1 border border-slate-200 bg-slate-50 rounded-xl px-3 py-1.5 focus-within:border-[#0052cc] focus-within:bg-white transition">
                    <input
                      type="number"
                      value={loanMonths}
                      min={preset.minMonths}
                      max={preset.maxMonths}
                      step={1}
                      onChange={(e) => setLoanMonths(Number(e.target.value))}
                      className="w-16 text-right font-extrabold text-sm text-[#0052cc] bg-transparent focus:outline-none"
                    />
                    <span className="text-xs font-bold text-slate-400">Mo</span>
                  </div>
                </div>

                <input
                  id={monthsSliderId}
                  type="range"
                  min={preset.minMonths}
                  max={preset.maxMonths}
                  step={1}
                  value={loanMonths}
                  onChange={(e) => setLoanMonths(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#0052cc]"
                />

                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>{preset.minMonths} Mo</span>
                  <span className="text-[#0052cc] font-semibold">{loanMonths} Months</span>
                  <span>{preset.maxMonths} Mo</span>
                </div>
              </div>

              {/* 3. Interest Rate */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label htmlFor={rateSliderId} className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Annual Interest Rate (p.a.)
                  </label>
                  <div className="flex items-center gap-1 border border-slate-200 bg-slate-50 rounded-xl px-3 py-1.5 focus-within:border-[#0052cc] focus-within:bg-white transition">
                    <input
                      type="number"
                      value={interestRate}
                      min={preset.minRate}
                      max={preset.maxRate}
                      step={0.1}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-16 text-right font-extrabold text-sm text-[#0052cc] bg-transparent focus:outline-none"
                    />
                    <span className="text-xs font-bold text-slate-400">%</span>
                  </div>
                </div>

                <input
                  id={rateSliderId}
                  type="range"
                  min={preset.minRate}
                  max={preset.maxRate}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#0052cc]"
                />

                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>{preset.minRate}%</span>
                  <span className="text-[#0052cc] font-semibold">{interestRate}%</span>
                  <span>{preset.maxRate}%</span>
                </div>
              </div>

              {/* Proportional Split Visual Bar */}
              <div className="pt-2">
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-slate-600 flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#0052cc]"></span>
                    Principal ({principalRatio.toFixed(1)}%)
                  </span>
                  <span className="text-slate-600 flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#8ec843]"></span>
                    Interest ({interestRatio.toFixed(1)}%)
                  </span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${principalRatio}%` }}
                    className="bg-[#0052cc] transition-all duration-300"
                  />
                  <div
                    style={{ width: `${interestRatio}%` }}
                    className="bg-[#8ec843] transition-all duration-300"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                <ShieldCheck className="h-4 w-4 text-[#0052cc] shrink-0" />
                <span>Monthly reducing balance calculation. No prepayment penalty options available.</span>
              </div>

            </div>

            {/* RIGHT COLUMN: Output Card with Saiban Dark Theme */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl bg-[#091525] text-white shadow-2xl p-7 sm:p-9 relative overflow-hidden">
                
                {/* Subtle Glow Background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#8ec843]">
                    Estimated Repayment
                  </span>
                  <p className="text-xs text-slate-400 mt-1">Based on current partner lending benchmarks</p>

                  {/* Primary Large EMI Display */}
                  <div className="my-6 pb-6 border-b border-slate-800">
                    <span className="text-xs uppercase font-semibold text-slate-400 block">
                      Monthly EMI
                    </span>
                    <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
                      {formatINR(emi)}
                    </div>
                  </div>

                  {/* Breakdown Metrics */}
                  <div className="space-y-4 pb-6 border-b border-slate-800 text-sm">
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Principal Amount</span>
                      <span className="font-bold text-white">{formatINR(loanAmount)}</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-300">
                      <span>Total Interest</span>
                      <span className="font-bold text-[#8ec843]">{formatINR(totalInterest)}</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-300">
                      <span>Total Amount Payable</span>
                      <span className="font-bold text-white text-base">{formatINR(totalAmountPayable)}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={handleApplyClick}
                    className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-[#0052cc] hover:bg-[#003d8f] text-white font-bold py-4 text-sm shadow-[0_4px_14px_rgba(0,82,204,0.35)] transition active:scale-[0.98] cursor-pointer"
                  >
                    <span>Apply With These Terms</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <p className="text-[11px] text-slate-500 text-center mt-4 leading-relaxed">
                    *Indicative quote. Exact loan limits and APR depend on financial verification and collateral appraisal.
                  </p>
                </div>
              </div>

              {/* Quick Info Box */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 flex items-start gap-3 shadow-sm">
                <Info className="h-5 w-5 text-[#0052cc] shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600 leading-relaxed">
                  Looking for higher limits? Saiban structures customized credit facilities including LAP and structured business financing up to ₹20+ Crores.
                </p>
              </div>

            </div>

          </div>

          {/* LOWER SECTION: Interactive Amortization Schedule */}
          <div className="mt-12 bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/30 overflow-hidden">
            <button
              onClick={() => setShowAmortization(!showAmortization)}
              className="w-full px-6 sm:px-10 py-5 flex items-center justify-between text-left hover:bg-slate-50/70 transition"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-blue-50 text-[#0052cc] flex items-center justify-center">
                  <TableIcon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0a192f]">
                    Annual Repayment & Amortization Schedule
                  </h3>
                  <p className="text-xs text-slate-500">
                    View year-wise breakdown of principal amortization and remaining balance
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0052cc]">
                <span>{showAmortization ? 'Hide Details' : 'View Schedule'}</span>
                {showAmortization ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </button>

            {showAmortization && (
              <div className="px-6 sm:px-10 pb-8 overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[11px]">
                      <th className="py-3 font-semibold">Year</th>
                      <th className="py-3 font-semibold">Principal Paid</th>
                      <th className="py-3 font-semibold">Interest Paid</th>
                      <th className="py-3 font-semibold">Total Installment</th>
                      <th className="py-3 font-semibold text-right">Balance Outstanding</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {amortizationSchedule.map((row) => (
                      <tr key={row.year} className="hover:bg-slate-50/80 transition">
                        <td className="py-3.5 font-bold text-[#0a192f]">Year {row.year}</td>
                        <td className="py-3.5 text-[#0052cc]">{formatINR(row.yearlyPrincipal)}</td>
                        <td className="py-3.5 text-slate-600">{formatINR(row.yearlyInterest)}</td>
                        <td className="py-3.5 font-semibold text-[#0a192f]">{formatINR(row.totalPaid)}</td>
                        <td className="py-3.5 text-right font-semibold text-slate-900">{formatINR(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}