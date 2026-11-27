// src/pages/MachineryEquipment.tsx
import { useState, useMemo } from 'react';
import LoanProductLayout from '../components/LoanProductLayout';
import {
  Cog,
  Factory,
  Stethoscope,
  HardHat,
  Cpu,
  Calculator,
  ArrowRight,
} from 'lucide-react';

export default function MachineryEquipment() {
  const [machineCost, setMachineCost] = useState(3000000);
  const [ltvPercent, setLtvPercent] = useState(85);
  const [interestRate, setInterestRate] = useState(12.5);
  const [tenureMonths, setTenureMonths] = useState(60);

  const formatINR = (val: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);

  const { loanAmount, downPayment, emi, totalInterest, totalPayable } = useMemo(() => {
    const funded = Math.round((machineCost * ltvPercent) / 100);
    const margin = machineCost - funded;
    const r = interestRate / 12 / 100;
    const calculatedEmi =
      r === 0
        ? funded / tenureMonths
        : (funded * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1);
    const totalAmt = calculatedEmi * tenureMonths;
    return {
      loanAmount: funded,
      downPayment: margin,
      emi: Math.round(calculatedEmi),
      totalInterest: Math.round(totalAmt - funded),
      totalPayable: Math.round(totalAmt),
    };
  }, [machineCost, ltvPercent, interestRate, tenureMonths]);

  const calculatorUI = (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-10 shadow-[0_16px_44px_rgba(10,25,47,0.05)]">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-100">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#0052cc]">
            <Calculator className="h-4 w-4" />
            Asset Finance Planner
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a192f] mt-1.5">
            Machinery Funding & EMI Calculator
          </h2>
        </div>
        <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-1.5 text-xs font-bold">
          {ltvPercent}% Funded • {100 - ltvPercent}% Margin Money
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex justify-between text-sm font-bold mb-2">
              <span className="text-slate-600">Machine Invoice Value</span>
              <span className="text-[#0a192f]">{formatINR(machineCost)}</span>
            </div>
            <input
              type="range"
              min={350000}
              max={60000000}
              step={50000}
              value={machineCost}
              onChange={(e) => setMachineCost(Number(e.target.value))}
              className="w-full accent-[#0052cc] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-sm font-bold mb-2">
              <span className="text-slate-600">Loan-to-Value (LTV) Funding</span>
              <span className="text-[#0052cc]">{ltvPercent}% of Invoice</span>
            </div>
            <input
              type="range"
              min={60}
              max={90}
              step={5}
              value={ltvPercent}
              onChange={(e) => setLtvPercent(Number(e.target.value))}
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
                min={10.25}
                max={19.5}
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
                max={84}
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
              <span className="text-slate-300">Sanctioned Loan ({ltvPercent}%)</span>
              <span className="font-bold text-emerald-400">{formatINR(loanAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Your Margin Money</span>
              <span className="font-semibold">{formatINR(downPayment)}</span>
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
            href="/apply?product=machinery-equipment"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0052cc] hover:bg-[#0065ff] py-3.5 text-sm font-bold text-white transition-colors"
          >
            <span>Finance {formatINR(loanAmount)}</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <LoanProductLayout
      config={{
        breadcrumbLabel: 'Machinery & Equipment',
        badgeText: 'Up to 90% Invoice Funding • Zero Extra Property Collateral',
        badgeIcon: Cog,
        titlePrefix: 'Machinery &',
        titleHighlight: 'Equipment Finance',
        subtitle: (
          <>
            Upgrade production capacity or set up diagnostic and commercial units with loans from{' '}
            <strong className="text-[#0a192f]">₹3 Lakhs to ₹5 Crore</strong>. The financed machine
            acts as primary security—preserving your cash and real estate.
          </>
        ),
        heroMedia: {
          imageUrl:
            'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
          imageAlt: 'Engineer operating modern precision industrial machinery',
          captionTitle: 'Modernize Production Lines & Diagnostic Centers',
          captionSubtitle: 'Direct OEM/dealer disbursal • Financed asset acts as security',
        },
        applyHref: '/apply?product=machinery-equipment',
        glanceTag: 'Asset-Backed',
        glanceRows: [
          { label: 'Loan Amount', value: '₹3 Lakhs – ₹5 Crore' },
          { label: 'Invoice Funding', value: 'Up to 85% – 90%', tone: 'green' },
          { label: 'Tenure', value: '12 – 84 Months' },
          { label: 'Interest Rate', value: 'From 10.25% p.a.', tone: 'blue' },
          { label: 'Disbursal Speed', value: '4 – 6 Working Days', tone: 'green' },
        ],
        glanceNote: (
          <>
            <strong>Zero extra property collateral</strong>—only the financed machinery is
            hypothecated to the lender.
          </>
        ),
        eligibilitySubtitle:
          'Built for manufacturers, hospitals, contractors, printers, and growing MSMEs:',
        eligibilityChecks: [
          'Business vintage of 2+ years (Manufacturing / Healthcare / Services)',
          'Annual turnover of ₹25 Lakhs+ with positive cash flows',
          'Valid Proforma Invoice from an OEM or authorized dealer',
          'CIBIL score of 675+ (No recent loan/EMI defaults)',
        ],
        usesHeading: 'Machinery & assets covered',
        usesSubtitle: 'Finance new or select pre-owned equipment across industrial and commercial sectors:',
        uses: [
          {
            title: 'CNC, VMC & Industrial Plant',
            desc: 'Lathes, laser cutters, injection molding, packaging, textile, and food-processing lines.',
            icon: Factory,
          },
          {
            title: 'Medical & Diagnostic Equipment',
            desc: 'MRI/CT scanners, ultrasound, dental chairs, pathology analyzers, and ICU setups.',
            icon: Stethoscope,
          },
          {
            title: 'Construction & Earthmoving',
            desc: 'Excavators, backhoe loaders, cranes, concrete mixers, and road-building equipment.',
            icon: HardHat,
          },
          {
            title: 'Printing, IT & Solar Assets',
            desc: 'Commercial printers, servers, cold-storage units, and rooftop solar plants.',
            icon: Cpu,
          },
        ],
        calculatorSlot: calculatorUI,
        documentsSubtitle: 'Select a category to inspect required equipment finance paperwork:',
        documents: [
          {
            category: 'KYC & Entity',
            items: 'PAN & Aadhaar of Promoter/Directors, Company PAN, Incorporation / Partnership Deed',
          },
          {
            category: 'GST & Licenses',
            items: 'GST Certificate, Udyam MSME Registration, Factory / Drug / Trade License',
          },
          {
            category: 'Proforma Invoice',
            items: 'Quotation from OEM or Authorized Dealer with technical specs & GST breakup',
          },
          {
            category: 'Banking & GST',
            items: 'Last 12 months Current Account Bank Statements & Last 12 months GSTR-3B',
          },
          {
            category: 'Financials & ITR',
            items: 'Last 2 years ITR with Computation, Audited Balance Sheet & P&L',
          },
        ],
        ratesSubtitle: 'Competitive equipment finance terms across banks, SIDBI programs, and NBFCs:',
        rates: [
          { label: 'Loan Amount', value: '₹3 Lakhs – ₹5 Crore' },
          { label: 'Funding Ratio (LTV)', value: 'Up to 85% – 90% of Invoice Value', highlight: 'green' },
          { label: 'Interest Rate', value: '10.25% – 19.50% p.a.', highlight: 'blue' },
          { label: 'Repayment Tenure', value: '12 to 84 Months (1 – 7 Years)' },
          { label: 'Security', value: 'Hypothecation of Financed Machinery' },
          { label: 'Processing Fee', value: '1% – 2% of loan amount + GST' },
        ],
        processSubtitle: 'From Proforma Invoice upload to direct OEM payment in 4 to 6 working days:',
        steps: [
          { step: '01', title: 'Upload Proforma Invoice', desc: 'Share machine quotation and basic business details.' },
          { step: '02', title: 'Lender & LTV Matching', desc: 'Matched with equipment financiers offering up to 90% funding.' },
          { step: '03', title: 'Financial Upload', desc: 'Submit 12-month bank statements, GST returns, and 2-year ITR.' },
          { step: '04', title: 'Technical & Vendor Check', desc: 'Lender verifies OEM credentials within 48 hours.' },
          { step: '05', title: 'Sanction & Margin', desc: 'Review KFS and pay your 10%–20% margin money to dealer.' },
          { step: '06', title: 'Hypothecation & e-Sign', desc: 'Complete digital agreement and asset hypothecation.' },
          { step: '07', title: 'Direct OEM Disbursal (4–6 Days)', desc: 'Funds transferred to vendor for immediate dispatch.' },
        ],
        faqs: [
          {
            question: 'Do I need to pledge property collateral for a Machinery & Equipment Loan?',
            answer:
              'No additional property collateral is required in most cases. The purchased machine itself is hypothecated as primary security.',
          },
          {
            question: 'What percentage of the machine invoice value is funded?',
            answer:
              'Lenders fund up to 80%–90% of the basic machine invoice value, while you contribute 10%–20% as margin money.',
          },
          {
            question: 'Can I get financing for imported or refurbished/used machinery?',
            answer:
              'Yes. Both indigenous and imported machinery are eligible, as well as pre-owned machines up to 5–7 years old with a Chartered Engineer valuation.',
          },
          {
            question: 'How is the loan amount disbursed?',
            answer:
              'Once your margin money contribution is verified, the lender disburses the sanctioned loan directly to the OEM or authorized dealer.',
          },
        ],
        callbackSubtitle:
          'Share your machinery requirement—our equipment finance desk will structure maximum LTV and lowest ROI.',
        callbackSuccessTitle: 'Our equipment finance specialist will call you on',
      }}
    />
  );
}