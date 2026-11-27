// src/pages/SecuredTermLoan.tsx
import { useState, useMemo } from 'react';
import LoanProductLayout from '../components/LoanProductLayout';
import {
  ShieldCheck,
  Building2,
  Layers,
  Briefcase,
  TrendingUp,
  Calculator,
  ArrowRight,
} from 'lucide-react';

export default function SecuredTermLoan() {
  const [loanAmount, setLoanAmount] = useState(2500000);
  const [interestRate, setInterestRate] = useState(13.5);
  const [tenureMonths, setTenureMonths] = useState(60);
  const [propertyValue, setPropertyValue] = useState(4500000);

  const formatINR = (val: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);

  const { emi, totalInterest, totalPayable, maxEligibleByLtv, isLtvEligible } = useMemo(() => {
    const r = interestRate / 12 / 100;
    const calculatedEmi =
      r === 0
        ? loanAmount / tenureMonths
        : (loanAmount * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1);
    const totalAmt = calculatedEmi * tenureMonths;
    const maxLtv = Math.round(propertyValue * 0.7);
    return {
      emi: Math.round(calculatedEmi),
      totalInterest: Math.round(totalAmt - loanAmount),
      totalPayable: Math.round(totalAmt),
      maxEligibleByLtv: maxLtv,
      isLtvEligible: loanAmount <= maxLtv,
    };
  }, [loanAmount, interestRate, tenureMonths, propertyValue]);

  const calculatorUI = (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-10 shadow-[0_16px_44px_rgba(10,25,47,0.05)]">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-100">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#0052cc]">
            <Calculator className="h-4 w-4" />
            Interactive Planner
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a192f] mt-1.5">
            Secured Loan EMI & LTV Calculator
          </h2>
        </div>
        <span
          className={`rounded-full px-4 py-1.5 text-xs font-bold ${
            isLtvEligible
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-amber-50 text-amber-700 border border-amber-200'
          }`}
        >
          {isLtvEligible
            ? `Within 70% LTV Cap (${formatINR(maxEligibleByLtv)})`
            : `Exceeds 70% LTV Cap (${formatINR(maxEligibleByLtv)})`}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex justify-between text-sm font-bold mb-2">
              <span className="text-slate-600">Estimated Collateral Value</span>
              <span className="text-[#0a192f]">{formatINR(propertyValue)}</span>
            </div>
            <input
              type="range"
              min={1000000}
              max={80000000}
              step={500000}
              value={propertyValue}
              onChange={(e) => setPropertyValue(Number(e.target.value))}
              className="w-full accent-[#0052cc] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-sm font-bold mb-2">
              <span className="text-slate-600">Required Loan Amount</span>
              <span className="text-[#0052cc]">{formatINR(loanAmount)}</span>
            </div>
            <input
              type="range"
              min={500000}
              max={50000000}
              step={100000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full accent-[#0052cc] cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-slate-600">Interest Rate</span>
                <span className="text-[#0052cc]">{interestRate}% p.a.</span>
              </div>
              <input
                type="range"
                min={10.5}
                max={22}
                step={0.25}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-[#0052cc] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-slate-600">Tenure</span>
                <span className="text-[#0052cc]">{tenureMonths} Months</span>
              </div>
              <input
                type="range"
                min={12}
                max={120}
                step={6}
                value={tenureMonths}
                onChange={(e) => setTenureMonths(Number(e.target.value))}
                className="w-full accent-[#0052cc] cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 rounded-2xl bg-[#0a192f] text-white p-7 sm:p-8 space-y-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-300">
              Estimated Monthly EMI
            </p>
            <p className="text-3xl sm:text-4xl font-extrabold mt-1">{formatINR(emi)}</p>
          </div>
          <div className="border-t border-slate-700/80 pt-4 space-y-2.5 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-300">Principal Amount</span>
              <span className="font-semibold">{formatINR(loanAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Total Interest</span>
              <span className="font-semibold text-blue-300">{formatINR(totalInterest)}</span>
            </div>
            <div className="flex justify-between border-t border-slate-700/80 pt-2.5">
              <span className="font-semibold">Total Repayment</span>
              <span className="font-bold">{formatINR(totalPayable)}</span>
            </div>
          </div>
          <a
            href="/apply?product=secured-term-loan"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0052cc] hover:bg-[#0065ff] py-3.5 text-sm font-bold text-white transition-colors"
          >
            <span>Apply for {formatINR(loanAmount)}</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <LoanProductLayout
      config={{
        breadcrumbLabel: 'Secured Term Loan',
        badgeText: 'Collateral-Backed Growth Capital • 7-Day Disbursal',
        badgeIcon: ShieldCheck,
        titlePrefix: 'Secured Business',
        titleHighlight: 'Term Loans',
        subtitle: (
          <>
            Unlock high-value, lower-interest capital from{' '}
            <strong className="text-[#0a192f]">₹5 Lakhs to ₹5 Crore</strong> by leveraging your
            residential, commercial, or industrial property—with predictable EMIs and up to 10-year
            tenures.
          </>
        ),
        heroMedia: {
          imageUrl:
            'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
          imageAlt: 'Business owners reviewing commercial property expansion plans',
          captionTitle: 'Scale with Confidence Against Commercial & Residential Assets',
          captionSubtitle: 'Up to 75% property LTV • 48-hour credit sanction',
        },
        applyHref: '/apply?product=secured-term-loan',
        glanceTag: 'MSME Secured',
        glanceRows: [
          { label: 'Loan Amount', value: '₹5 Lakhs – ₹5 Crore' },
          { label: 'Tenure', value: '12 – 120 Months' },
          { label: 'Interest Rate', value: 'From 10.50% p.a.', tone: 'blue' },
          { label: 'Collateral', value: 'Property / Machinery / FD' },
          { label: 'Disbursal Speed', value: '7 Working Days', tone: 'green' },
        ],
        glanceNote: (
          <>
            Compare offers across <strong>30+ RBI-regulated Banks & NBFCs</strong> with zero impact
            on your CIBIL score during initial eligibility check.
          </>
        ),
        eligibilitySubtitle:
          'You qualify if your enterprise meets these four core MSME underwriting benchmarks:',
        eligibilityChecks: [
          'Business vintage of 2+ years',
          'Annual turnover of ₹15 Lakhs+',
          'Valid property or asset collateral',
          'CIBIL score of 650 or higher',
        ],
        usesHeading: 'Typical uses',
        usesSubtitle: 'Deploy structured term capital across high-ROI business milestones:',
        uses: [
          {
            title: 'Capacity & Plant Expansion',
            desc: 'Open new branches, warehouses, or scale manufacturing lines.',
            icon: Building2,
          },
          {
            title: 'Long-Term Working Capital',
            desc: 'Stabilize cash cycles without high-cost short-term debt.',
            icon: Layers,
          },
          {
            title: 'Equipment & Tech Upgrade',
            desc: 'Acquire commercial machinery, vehicles, or ERP infrastructure.',
            icon: Briefcase,
          },
          {
            title: 'High-Interest Debt Consolidation',
            desc: 'Refinance multiple unsecured loans into one lower-EMI facility.',
            icon: TrendingUp,
          },
        ],
        calculatorSlot: calculatorUI,
        documentsSubtitle: 'Switch tabs below to inspect the exact documents needed:',
        documents: [
          {
            category: 'KYC & Identity',
            items: 'PAN Card & Aadhaar of Applicant/Directors, Company PAN, Passport Photos',
          },
          {
            category: 'Business Proof',
            items: 'GST Certificate, Udyam MSME Registration, Partnership Deed / MOA & AOA',
          },
          {
            category: 'Banking & GST',
            items: 'Last 6–12 months primary current account statements & 1-year GSTR-3B',
          },
          {
            category: 'Financials & ITR',
            items: 'Last 2 years ITR with computation, Audited Balance Sheet & P&L',
          },
          {
            category: 'Collateral Papers',
            items: 'Registered Title/Sale Deed, Chain of Agreements, Latest Property Tax Receipt',
          },
        ],
        ratesSubtitle: 'Transparent pricing aligned with RBI Key Fact Statement (KFS) norms:',
        rates: [
          { label: 'Ticket Size', value: '₹5 Lakhs – ₹5 Crore' },
          { label: 'Interest Rate', value: '10.50% – 22.00% p.a.', highlight: 'blue' },
          { label: 'Repayment Tenure', value: '12 to 120 Months (1 – 10 Years)' },
          { label: 'Collateral Accepted', value: 'Residential / Commercial Property, Machinery, FD' },
          { label: 'Processing Fee', value: '1% – 2% of loan amount + GST' },
          { label: 'Foreclosure Charges', value: 'Nil on floating-rate MSE loans', highlight: 'green' },
        ],
        processSubtitle:
          'From digital application to bank disbursal in as little as 7 working days:',
        steps: [
          { step: '01', title: 'Quick Online Inquiry', desc: 'Share basic business & collateral details in 2 minutes.' },
          { step: '02', title: 'Advisor Consultation', desc: 'Specialist matches your profile across 30+ banks & NBFCs.' },
          { step: '03', title: 'Digital Document Upload', desc: 'Submit KYC, GST, bank statements & property copies securely.' },
          { step: '04', title: 'Credit Underwriting', desc: '48-hour financial appraisal based on turnover and DSCR.' },
          { step: '05', title: 'Legal & Valuation', desc: 'Certified valuer verifies collateral title & market value.' },
          { step: '06', title: 'Sanction & e-Sign', desc: 'Review transparent KFS and e-sign sanction letter.' },
          { step: '07', title: 'Direct Disbursal (7 Days)', desc: 'Funds credited directly to your business current account.' },
        ],
        faqs: [
          {
            question: 'What types of collateral are accepted for a Secured Term Loan?',
            answer:
              'We accept self-occupied or rented residential property, commercial shops/offices, industrial land or sheds, fixed deposits (FDs), and high-value plant & machinery.',
          },
          {
            question: 'How fast is the approval and disbursal process?',
            answer:
              'In-principle sanction is issued within 48 hours of document submission. Final disbursal takes 5 to 7 working days after property legal and technical valuation.',
          },
          {
            question: 'What is the maximum Loan-to-Value (LTV) ratio offered?',
            answer:
              'Up to 65%–75% of market value for residential/commercial property, and up to 80%–90% against Fixed Deposits.',
          },
          {
            question: 'Are there any prepayment or foreclosure charges?',
            answer:
              'Floating-rate term loans sanctioned to individual borrowers and MSEs carry zero foreclosure or part-prepayment charges per RBI guidelines.',
          },
          {
            question: 'Can I apply if my CIBIL score is between 650 and 700?',
            answer:
              'Yes. Tangible collateral combined with strong banking cash flows and GST turnover allows approvals starting from a 650+ CIBIL score.',
          },
        ],
        callbackSubtitle:
          'Speak with a SaibanCapital secured-lending specialist to check your property LTV and best bank/NBFC offer.',
        callbackSuccessTitle: 'Our MSME loan advisor will call you on',
      }}
    />
  );
}