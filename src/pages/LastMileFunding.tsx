// src/pages/LastMileFunding.tsx
import { useState, useMemo } from 'react';
import LoanProductLayout from '../components/LoanProductLayout';
import {
  Flag,
  HardHat,
  Factory,
  FileSignature,
  TrendingUp,
  Calculator,
  ArrowRight,
} from 'lucide-react';

export default function LastMileFunding() {
  const [bridgeAmount, setBridgeAmount] = useState(5000000);
  const [totalTenureMonths, setTotalTenureMonths] = useState(18);
  const [moratoriumMonths, setMoratoriumMonths] = useState(6);
  const [interestRate, setInterestRate] = useState(15.0);

  const formatINR = (val: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);

  const { moratoriumMonthlyInterest, postMoratoriumEmi, totalInterestPayable, activeRepayMonths } =
    useMemo(() => {
      const r = interestRate / 12 / 100;
      const effectiveMoratorium = Math.min(moratoriumMonths, totalTenureMonths - 1);
      const repayMonths = Math.max(totalTenureMonths - effectiveMoratorium, 1);

      const monthlyIntOnly = Math.round(bridgeAmount * r);
      const emiAfterMoratorium =
        r === 0
          ? bridgeAmount / repayMonths
          : (bridgeAmount * r * Math.pow(1 + r, repayMonths)) /
            (Math.pow(1 + r, repayMonths) - 1);

      const totalInt =
        monthlyIntOnly * effectiveMoratorium + (emiAfterMoratorium * repayMonths - bridgeAmount);

      return {
        moratoriumMonthlyInterest: monthlyIntOnly,
        postMoratoriumEmi: Math.round(emiAfterMoratorium),
        totalInterestPayable: Math.round(totalInt),
        activeRepayMonths: repayMonths,
      };
    }, [bridgeAmount, totalTenureMonths, moratoriumMonths, interestRate]);

  const calculatorUI = (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-10 shadow-[0_16px_44px_rgba(10,25,47,0.05)]">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-100">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#0052cc]">
            <Calculator className="h-4 w-4" />
            Bridge Repayment Planner
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a192f] mt-1.5">
            Last-Mile Moratorium & EMI Calculator
          </h2>
        </div>
        <span className="rounded-full bg-blue-50 text-[#0052cc] border border-blue-200 px-4 py-1.5 text-xs font-bold">
          {moratoriumMonths}m Interest-Only + {activeRepayMonths}m Principal EMI
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex justify-between text-sm font-bold mb-2">
              <span className="text-slate-600">Last-Mile Gap Required</span>
              <span className="text-[#0a192f]">{formatINR(bridgeAmount)}</span>
            </div>
            <input
              type="range"
              min={1000000}
              max={100000000}
              step={500000}
              value={bridgeAmount}
              onChange={(e) => setBridgeAmount(Number(e.target.value))}
              className="w-full accent-[#0052cc] cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-slate-600">Moratorium</span>
                <span className="text-emerald-600">{moratoriumMonths}m</span>
              </div>
              <input
                type="range"
                min={0}
                max={12}
                step={1}
                value={moratoriumMonths}
                onChange={(e) => setMoratoriumMonths(Number(e.target.value))}
                className="w-full accent-[#0052cc] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-slate-600">Total Tenure</span>
                <span className="text-[#0052cc]">{totalTenureMonths}m</span>
              </div>
              <input
                type="range"
                min={6}
                max={36}
                step={3}
                value={totalTenureMonths}
                onChange={(e) => setTotalTenureMonths(Number(e.target.value))}
                className="w-full accent-[#0052cc] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-slate-600">Bridge Rate</span>
                <span className="text-[#0052cc]">{interestRate}%</span>
              </div>
              <input
                type="range"
                min={12.5}
                max={22}
                step={0.25}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-[#0052cc] cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 rounded-2xl bg-[#0a192f] text-white p-7 sm:p-8 space-y-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Monthly Outgo During Moratorium ({moratoriumMonths}m)
            </p>
            <p className="text-3xl sm:text-4xl font-extrabold mt-1">
              {formatINR(moratoriumMonthlyInterest)}
              <span className="text-xs font-normal text-slate-300"> / mo</span>
            </p>
          </div>
          <div className="border-t border-slate-700/80 pt-4 space-y-2.5 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-300">Post-Moratorium EMI ({activeRepayMonths}m)</span>
              <span className="font-bold text-white">{formatINR(postMoratoriumEmi)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Total Bridge Interest</span>
              <span className="font-semibold text-blue-300">{formatINR(totalInterestPayable)}</span>
            </div>
          </div>
          <a
            href="/apply?product=last-mile-funding"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0052cc] hover:bg-[#0065ff] py-3.5 text-sm font-bold text-white transition-colors"
          >
            <span>Request {formatINR(bridgeAmount)} Bridge</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <LoanProductLayout
      config={{
        breadcrumbLabel: 'Last-Mile Funding',
        badgeText: 'Project Completion & Bridge Capital • 3–7 Day Disbursal',
        badgeIcon: Flag,
        titlePrefix: 'Last-Mile',
        titleHighlight: 'Project Funding',
        subtitle: (
          <>
            Cross the finish line without stalling operations. Secure fast-track bridge capital
            from <strong className="text-[#0a192f]">₹10 Lakhs to ₹10 Crore</strong> to complete
            near-finished commercial projects, plant commissioning, or EPC contracts.
          </>
        ),
        heroMedia: {
          imageUrl:
            'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
          imageAlt: 'Site engineers reviewing final-stage commercial project completion',
          captionTitle: 'Bridge Final-Stage Execution to Unlock Project Handovers',
          captionSubtitle: 'Interest-only moratoriums until milestone revenue arrives',
        },
        applyHref: '/apply?product=last-mile-funding',
        glanceTag: 'Bridge Capital',
        glanceRows: [
          { label: 'Loan Amount', value: '₹10 Lakhs – ₹10 Crore+' },
          { label: 'Tenure', value: '3 – 36 Months' },
          { label: 'Moratorium', value: 'Up to 9m (Int-Only)', tone: 'green' },
          { label: 'Interest Rate', value: 'From 12.50% p.a.', tone: 'blue' },
          { label: 'Disbursal Speed', value: '3 – 7 Working Days', tone: 'green' },
        ],
        glanceNote: (
          <>
            <strong>Zero prepayment lock-in</strong>—close anytime once final milestone receivables
            or bank takeout funds arrive.
          </>
        ),
        eligibilitySubtitle:
          'Built for developers, EPC contractors, manufacturers, and infrastructure businesses near handover:',
        eligibilityChecks: [
          'Project or work order at least 65%–70% physically completed',
          'Clear visibility of final milestone receivables, sales, or takeout finance',
          'Business vintage of 2+ years with active GST & banking track record',
          'Valid project asset, contract receivables, or property collateral',
        ],
        usesHeading: 'Typical uses',
        usesSubtitle: 'Bridge the final funding gap to unlock trapped receivables and project revenue:',
        uses: [
          {
            title: 'Commercial & Real Estate Completion',
            desc: 'Finish interior fit-outs, MEP works, fire NOC, and OC milestones to unlock buyer handovers.',
            icon: HardHat,
          },
          {
            title: 'Plant Commissioning & Trial Run',
            desc: 'Bridge final utility connections and erection needed to start commercial production.',
            icon: Factory,
          },
          {
            title: 'EPC, Govt & PSU Contract Delivery',
            desc: 'Complete final 20% execution of infrastructure or solar tenders to release retention money.',
            icon: FileSignature,
          },
          {
            title: 'Pre-Takeout Bridge Liquidity',
            desc: 'Cover immediate vendor dues while awaiting disbursement of a sanctioned long-term bank loan.',
            icon: TrendingUp,
          },
        ],
        calculatorSlot: calculatorUI,
        documentsSubtitle: 'Select a category to inspect required project bridge documentation:',
        documents: [
          {
            category: 'KYC & Entity',
            items: 'PAN & Aadhaar of Promoters/Directors, Company PAN, Incorporation / Partnership Deed',
          },
          {
            category: 'Project Progress',
            items: 'Architect / Chartered Engineer (CE) Completion Certificate & Balance Cost Estimate',
          },
          {
            category: 'Work Orders',
            items: 'Confirmed Work Orders / Contracts, Buyer Receivables Ledger, Escrow Details',
          },
          {
            category: 'Banking & GST',
            items: 'Last 12 months Current / Escrow Account Statements & Last 12 months GSTR-3B',
          },
          {
            category: 'Financials & Assets',
            items: 'Last 2 years ITR & Audited Financials, Existing Sanction Letters & Title Deeds',
          },
        ],
        ratesSubtitle: 'Flexible bridge terms structured around your project handover timeline:',
        rates: [
          { label: 'Ticket Size', value: '₹10 Lakhs – ₹10 Crore+' },
          { label: 'Interest Rate', value: '12.50% – 22.00% p.a.', highlight: 'blue' },
          { label: 'Facility Tenure', value: '3 to 36 Months (With 3–9m Moratorium)' },
          { label: 'Security', value: 'Project Asset, Property, or Escrow Receivables' },
          { label: 'Processing Fee', value: '1.5% – 2.5% + GST' },
          { label: 'Prepayment / Takeout', value: 'Zero foreclosure fee on collection', highlight: 'green' },
        ],
        processSubtitle: 'Rapid technical appraisal and disbursal in 3 to 7 working days:',
        steps: [
          { step: '01', title: 'Project Gap Assessment', desc: 'Share completion status, balance cost, and incoming cashflow.' },
          { step: '02', title: 'Bridge Structure Design', desc: 'Structure interest-only moratorium or stepped EMIs.' },
          { step: '03', title: 'Digital Document Upload', desc: 'Submit CE progress report, work orders, and GST PDFs.' },
          { step: '04', title: 'Site Verification', desc: 'Rapid technical verification of project stage (48 hrs).' },
          { step: '05', title: 'Sanction & Escrow', desc: 'Review KFS and set up designated collection routing.' },
          { step: '06', title: 'Agreement Execution', desc: 'Complete digital agreements and security creation.' },
          { step: '07', title: 'Fast-Track Disbursal (3–7 Days)', desc: 'Funds released directly to finish execution.' },
        ],
        faqs: [
          {
            question: 'What is Last-Mile Funding and when should a business use it?',
            answer:
              'Short-to-medium-term bridge capital to complete the final 15%–30% stage of a project, commercial fit-out, or EPC order when final milestone payments are locked until completion.',
          },
          {
            question: 'Can I opt for an interest-only moratorium until project handover?',
            answer:
              'Yes. Most facilities offer a 3-to-9-month principal moratorium where you pay only monthly interest during completion and settle principal once receivables unlock.',
          },
          {
            question: 'What security or collateral is required for Last-Mile Funding?',
            answer:
              'Facilities are structured against the underlying project asset, commercial/residential property, or confirmed contract receivables backed by an escrow account.',
          },
          {
            question: 'Are there penalties if I close the loan early once milestone payments arrive?',
            answer:
              'No. Partner lenders allow zero-penalty prepayment or bullet closure as soon as your final project tranche or takeout loan is disbursed.',
          },
        ],
        callbackSubtitle:
          'Discuss your project stage and cash-flow gap with our structured-finance desk for a customized bridge sanction.',
        callbackSuccessTitle: 'Our structured project finance specialist will call you on',
      }}
    />
  );
}