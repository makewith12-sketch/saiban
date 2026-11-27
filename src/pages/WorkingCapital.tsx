// src/pages/WorkingCapital.tsx
import { useState, useMemo } from 'react';
import LoanProductLayout from '../components/LoanProductLayout';
import {
  RefreshCw,
  BadgePercent,
  PackageCheck,
  CalendarClock,
  Calculator,
  ArrowRight,
} from 'lucide-react';

export default function WorkingCapital() {
  const [annualTurnover, setAnnualTurnover] = useState(12000000);
  const [utilizationPct, setUtilizationPct] = useState(60);
  const [interestRate, setInterestRate] = useState(14.0);

  const formatINR = (val: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);

  const { eligibleLimit, utilizedAmount, monthlyInterestOnly, savingsVsFullLoan } = useMemo(() => {
    const cappedLimit = Math.min(Math.max(Math.round(annualTurnover * 0.2), 300000), 50000000);
    const utilized = Math.round((cappedLimit * utilizationPct) / 100);
    const monthlyRate = interestRate / 12 / 100;
    const interestUtilized = Math.round(utilized * monthlyRate);
    const interestFull = Math.round(cappedLimit * monthlyRate);
    return {
      eligibleLimit: cappedLimit,
      utilizedAmount: utilized,
      monthlyInterestOnly: interestUtilized,
      savingsVsFullLoan: Math.max(interestFull - interestUtilized, 0),
    };
  }, [annualTurnover, utilizationPct, interestRate]);

  const calculatorUI = (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-10 shadow-[0_16px_44px_rgba(10,25,47,0.05)]">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-100">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#0052cc]">
            <Calculator className="h-4 w-4" />
            Turnover Method Estimator
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a192f] mt-1.5">
            Working Capital Limit & Usage Calculator
          </h2>
        </div>
        <span className="rounded-full bg-blue-50 text-[#0052cc] border border-blue-200 px-4 py-1.5 text-xs font-bold">
          {eligibleLimit <= 7500000
            ? 'Eligible for Collateral-Free Limit'
            : 'Collateral / CGTMSE Hybrid'}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex justify-between text-sm font-bold mb-2">
              <span className="text-slate-600">Annual GST Turnover</span>
              <span className="text-[#0a192f]">{formatINR(annualTurnover)}</span>
            </div>
            <input
              type="range"
              min={2000000}
              max={250000000}
              step={500000}
              value={annualTurnover}
              onChange={(e) => setAnnualTurnover(Number(e.target.value))}
              className="w-full accent-[#0052cc] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-sm font-bold mb-2">
              <span className="text-slate-600">Average Limit Utilization</span>
              <span className="text-[#0052cc]">
                {utilizationPct}% ({formatINR(utilizedAmount)})
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              step={5}
              value={utilizationPct}
              onChange={(e) => setUtilizationPct(Number(e.target.value))}
              className="w-full accent-[#0052cc] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-sm font-bold mb-2">
              <span className="text-slate-600">Interest Rate (% p.a.)</span>
              <span className="text-[#0052cc]">{interestRate}%</span>
            </div>
            <input
              type="range"
              min={10.75}
              max={21}
              step={0.25}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-[#0052cc] cursor-pointer"
            />
          </div>
        </div>

        <div className="lg:col-span-5 rounded-2xl bg-[#0a192f] text-white p-7 sm:p-8 space-y-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-300">
              Estimated Sanction Limit (20% Turnover)
            </p>
            <p className="text-3xl sm:text-4xl font-extrabold mt-1">{formatINR(eligibleLimit)}</p>
          </div>
          <div className="border-t border-slate-700/80 pt-4 space-y-2.5 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-300">Monthly Interest (Used)</span>
              <span className="font-bold text-emerald-400">
                {formatINR(monthlyInterestOnly)} / mo
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Monthly Interest Saved</span>
              <span className="font-semibold text-blue-300">
                {formatINR(savingsVsFullLoan)} / mo
              </span>
            </div>
          </div>
          <a
            href="/apply?product=working-capital"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0052cc] hover:bg-[#0065ff] py-3.5 text-sm font-bold text-white transition-colors"
          >
            <span>Unlock {formatINR(eligibleLimit)} Limit</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <LoanProductLayout
      config={{
        breadcrumbLabel: 'Working Capital',
        badgeText: 'Revolving OD / CC & Liquidity • Pay Only On Usage',
        badgeIcon: RefreshCw,
        titlePrefix: 'Business',
        titleHighlight: 'Working Capital',
        subtitle: (
          <>
            Smooth out daily cash cycles with revolving Overdraft (OD), Cash Credit (CC), and
            Dropline OD lines from <strong className="text-[#0a192f]">₹3 Lakhs to ₹5 Crore</strong>—with{' '}
            <strong className="text-[#0a192f]">collateral-free options up to ₹75 Lakhs</strong>.
          </>
        ),
        heroMedia: {
          imageUrl:
            'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
          imageAlt: 'Retail and wholesale business owner managing daily cash flow',
          captionTitle: 'Seamless Daily Liquidity for Traders, Distributors & MSMEs',
          captionSubtitle: 'Pay interest strictly on daily utilized Overdraft balance',
        },
        applyHref: '/apply?product=working-capital',
        glanceTag: 'Flexi OD / CC',
        glanceRows: [
          { label: 'Credit Limit', value: '₹3 Lakhs – ₹5 Crore' },
          { label: 'Facility Type', value: 'OD / CC / Dropline OD' },
          { label: 'Interest Rate', value: 'From 10.75% p.a.', tone: 'blue' },
          { label: 'Collateral', value: 'Unsecured up to ₹75L' },
          { label: 'Activation TAT', value: '3 – 5 Working Days', tone: 'green' },
        ],
        glanceNote: (
          <>
            <strong>Zero interest on unutilized funds</strong>—draw and deposit surplus cash anytime
            via net banking or UPI.
          </>
        ),
        eligibilitySubtitle:
          'Ideal for traders, manufacturers, distributors, and service businesses meeting these criteria:',
        eligibilityChecks: [
          'Business operational for 1.5+ years',
          'Annual GST turnover of ₹20 Lakhs+',
          'Active current account with regular credits',
          'CIBIL score of 675+ (Clean repayment track)',
        ],
        usesHeading: 'Facilities & typical uses',
        usesSubtitle: 'Tailored liquidity lines matched to your cash conversion cycle:',
        uses: [
          {
            title: 'Cash Credit (CC) & Overdraft',
            desc: 'Revolving credit line linked to your current account—pay interest strictly on daily usage.',
            icon: RefreshCw,
          },
          {
            title: 'Dropline Overdraft (DOD)',
            desc: 'Multi-year flexi limit with zero monthly stock statement hassle and automatic limit step-down.',
            icon: BadgePercent,
          },
          {
            title: 'Inventory & Raw Material Stocking',
            desc: 'Bulk-buy raw materials at cash discounts before peak seasonal demand surges.',
            icon: PackageCheck,
          },
          {
            title: 'Receivable & Payroll Bridge',
            desc: 'Cover 30–90 day B2B buyer credit cycles, GST payouts, and vendor salaries smoothly.',
            icon: CalendarClock,
          },
        ],
        calculatorSlot: calculatorUI,
        documentsSubtitle: 'Select a category to view required digital documents:',
        documents: [
          {
            category: 'KYC & Entity Proof',
            items: 'PAN & Aadhaar of Proprietor/Partners/Directors, Entity PAN, Incorporation Certificate',
          },
          {
            category: 'GST & Udyam',
            items: 'GST Registration Certificate, Udyam Registration, Trade / Shop & Establishment License',
          },
          {
            category: 'Banking & GST',
            items: 'Last 12 months Current Account Statements (PDF) & Last 12 months GSTR-1 / GSTR-3B',
          },
          {
            category: 'Financials & ITR',
            items: 'Last 2 years ITR with Computation, Balance Sheet, P&L & Existing Loan Letters',
          },
          {
            category: 'Collateral (>₹75L)',
            items: 'Property Title Deed or FD Receipt (Not required for Unsecured Working Capital)',
          },
        ],
        ratesSubtitle: 'Transparent working capital terms with zero hidden charges:',
        rates: [
          { label: 'Limit / Ticket Size', value: '₹3 Lakhs – ₹5 Crore (Unsecured up to ₹75L)' },
          { label: 'Interest Rate', value: '10.75% – 21.00% p.a. (On utilized balance)', highlight: 'blue' },
          { label: 'Facility Tenure', value: '12 Months Auto-Renewable CC/OD • 60m DOD' },
          { label: 'Collateral Requirement', value: 'Nil up to ₹75L; Property / FD / CGTMSE above' },
          { label: 'Processing Fee', value: '1% – 2% of sanctioned limit + GST' },
          { label: 'Daily Sweep-In / Deposit', value: 'Zero prepayment or deposit charges', highlight: 'green' },
        ],
        processSubtitle: 'From GST turnover evaluation to active credit limit in 3 to 5 working days:',
        steps: [
          { step: '01', title: 'Turnover & Limit Check', desc: 'Enter annual GST turnover and banking details in 2 minutes.' },
          { step: '02', title: 'Facility Structuring', desc: 'Choose between Unsecured WC Term Loan, Flexi OD, or CC Limit.' },
          { step: '03', title: 'Digital Bank & GST Fetch', desc: 'Upload 12-month bank PDFs & GST returns via secure portal.' },
          { step: '04', title: 'Cashflow Appraisal', desc: 'Underwriting based on Average Bank Balance (ABB) & GST trend.' },
          { step: '05', title: 'Multi-Lender Offer Match', desc: 'Compare sanctioned limits & ROI across 30+ lenders.' },
          { step: '06', title: 'Digital Agreement & e-NACH', desc: 'Complete e-KYC, e-Stamping, and KFS review online.' },
          { step: '07', title: 'Limit Activation (3–5 Days)', desc: 'Overdraft limit activated or funds credited to your account.' },
        ],
        faqs: [
          {
            question: 'How does interest work in an Overdraft (OD) or Cash Credit (CC) limit?',
            answer:
              'Interest is charged strictly on the daily utilized balance. If you have a ₹30 Lakh limit and use ₹10 Lakhs for 15 days, you pay interest only on ₹10 Lakhs for those 15 days.',
          },
          {
            question: 'Can I get a Working Capital loan without property collateral?',
            answer:
              'Yes. For limits between ₹3 Lakhs and ₹75 Lakhs, partner NBFCs and banks offer unsecured Working Capital and Dropline ODs based on 12-month GST returns and banking credits.',
          },
          {
            question: 'What is the difference between Cash Credit (CC) and Dropline Overdraft (DOD)?',
            answer:
              'CC is renewed annually against stock and book debts with monthly stock statements, whereas Dropline OD is a multi-year revolving limit (up to 5 years) with zero monthly stock statements.',
          },
          {
            question: 'How is my eligible Working Capital limit calculated?',
            answer:
              'Lenders apply the Turnover Method for MSMEs—sanctioning up to 20%–25% of annual GST turnover, adjusted for existing working capital limits.',
          },
          {
            question: 'Are there charges when I deposit surplus cash back into my OD account?',
            answer:
              'Zero deposit or part-repayment charges. Sweep daily sales collections into your OD account anytime to reduce daily interest.',
          },
        ],
        callbackSubtitle:
          'Connect with a SaibanCapital working-capital advisor to compare OD/CC limits based on your GST & banking credits.',
        callbackSuccessTitle: 'Our working capital specialist will call you on',
      }}
    />
  );
}