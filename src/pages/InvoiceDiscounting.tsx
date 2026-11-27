// src/pages/InvoiceDiscounting.tsx
import { useState, useMemo } from 'react';
import LoanProductLayout from '../components/LoanProductLayout';
import {
  FileSpreadsheet,
  Zap,
  Building,
  ReceiptIndianRupee,
  Repeat,
  Calculator,
  ArrowRight,
} from 'lucide-react';

export default function InvoiceDiscounting() {
  const [invoiceAmount, setInvoiceAmount] = useState(1500000);
  const [advancePct, setAdvancePct] = useState(85);
  const [creditDays, setCreditDays] = useState(60);
  const [annualRate, setAnnualRate] = useState(13.5);

  const formatINR = (val: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);

  const { upfrontDisbursal, discountFee, balanceOnMaturity, effectiveMonthlyCostPct } = useMemo(() => {
    const advance = Math.round((invoiceAmount * advancePct) / 100);
    const fee = Math.round(advance * (annualRate / 100) * (creditDays / 365));
    const marginBalance = Math.max(invoiceAmount - advance - fee, 0);
    return {
      upfrontDisbursal: advance,
      discountFee: fee,
      balanceOnMaturity: marginBalance,
      effectiveMonthlyCostPct: (annualRate / 12).toFixed(2),
    };
  }, [invoiceAmount, advancePct, creditDays, annualRate]);

  const calculatorUI = (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-10 shadow-[0_16px_44px_rgba(10,25,47,0.05)]">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-100">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#0052cc]">
            <Calculator className="h-4 w-4" />
            Receivables Cashflow Simulator
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a192f] mt-1.5">
            Invoice Advance & Discount Fee Calculator
          </h2>
        </div>
        <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-1.5 text-xs font-bold">
          ~{effectiveMonthlyCostPct}% per month cost
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex justify-between text-sm font-bold mb-2">
              <span className="text-slate-600">Unpaid GST Invoice Value</span>
              <span className="text-[#0a192f]">{formatINR(invoiceAmount)}</span>
            </div>
            <input
              type="range"
              min={200000}
              max={30000000}
              step={100000}
              value={invoiceAmount}
              onChange={(e) => setInvoiceAmount(Number(e.target.value))}
              className="w-full accent-[#0052cc] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-sm font-bold mb-2">
              <span className="text-slate-600">Upfront Advance Ratio</span>
              <span className="text-[#0052cc]">{advancePct}% Immediate</span>
            </div>
            <input
              type="range"
              min={70}
              max={90}
              step={5}
              value={advancePct}
              onChange={(e) => setAdvancePct(Number(e.target.value))}
              className="w-full accent-[#0052cc] cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-slate-600">Credit Period</span>
                <span className="text-[#0052cc]">{creditDays} Days</span>
              </div>
              <input
                type="range"
                min={15}
                max={120}
                step={15}
                value={creditDays}
                onChange={(e) => setCreditDays(Number(e.target.value))}
                className="w-full accent-[#0052cc] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-slate-600">Discount Rate</span>
                <span className="text-[#0052cc]">{annualRate}% p.a.</span>
              </div>
              <input
                type="range"
                min={9.5}
                max={20}
                step={0.25}
                value={annualRate}
                onChange={(e) => setAnnualRate(Number(e.target.value))}
                className="w-full accent-[#0052cc] cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 rounded-2xl bg-[#0a192f] text-white p-7 sm:p-8 space-y-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-300">
              Upfront Cash in 24–72 Hrs ({advancePct}%)
            </p>
            <p className="text-3xl sm:text-4xl font-extrabold mt-1">
              {formatINR(upfrontDisbursal)}
            </p>
          </div>
          <div className="border-t border-slate-700/80 pt-4 space-y-2.5 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-300">Discounting Cost ({creditDays}d)</span>
              <span className="font-semibold text-amber-300">- {formatINR(discountFee)}</span>
            </div>
            <div className="flex justify-between border-t border-slate-700/80 pt-2.5">
              <span className="font-semibold">Balance Released on Due Date</span>
              <span className="font-bold text-emerald-400">{formatINR(balanceOnMaturity)}</span>
            </div>
          </div>
          <a
            href="/apply?product=invoice-discounting"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0052cc] hover:bg-[#0065ff] py-3.5 text-sm font-bold text-white transition-colors"
          >
            <span>Discount Your Invoice</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <LoanProductLayout
      config={{
        breadcrumbLabel: 'Invoice Discounting',
        badgeText: 'Instant Cash on B2B Invoices • Disbursal in 24–72 Hours',
        badgeIcon: FileSpreadsheet,
        titlePrefix: 'B2B',
        titleHighlight: 'Invoice Discounting',
        subtitle: (
          <>
            Stop waiting 30 to 90 days for corporate buyers to clear bills. Unlock up to{' '}
            <strong className="text-[#0a192f]">85%–90% of your unpaid GST invoice value</strong>{' '}
            within 24–72 hours—with limits from{' '}
            <strong className="text-[#0a192f]">₹2 Lakhs to ₹5 Crore</strong> and zero property
            collateral.
          </>
        ),
        heroMedia: {
          imageUrl:
            'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80',
          imageAlt: 'B2B founders reviewing corporate invoices and cash flow',
          captionTitle: 'Unlock Cash Tied Up in 30–90 Day Corporate Receivables',
          captionSubtitle: 'Up to 90% invoice advance within 24–72 hours',
        },
        applyHref: '/apply?product=invoice-discounting',
        glanceTag: 'Zero Collateral',
        glanceRows: [
          { label: 'Facility Limit', value: '₹2 Lakhs – ₹5 Crore' },
          { label: 'Upfront Advance', value: 'Up to 85% – 90%', tone: 'green' },
          { label: 'Credit Period', value: '15 – 120 Days' },
          { label: 'Discount Rate', value: 'From 9.50% p.a.', tone: 'blue' },
          { label: 'Disbursal Speed', value: '24 – 72 Hours', tone: 'green' },
        ],
        glanceNote: (
          <>
            <strong>Approved on your buyer’s strength</strong>—unlock working capital without
            pledging real estate.
          </>
        ),
        eligibilitySubtitle:
          'Built for B2B vendors, manufacturers, staffing agencies, logistics firms, and enterprise suppliers:',
        eligibilityChecks: [
          'B2B business vintage of 1+ year with active GST registration',
          'Unpaid GST invoices raised to creditworthy corporates / PSUs',
          'Minimum annual B2B turnover of ₹30 Lakhs+',
          'Invoice credit tenure between 15 and 120 days',
        ],
        usesHeading: 'Why discount your invoices?',
        usesSubtitle: 'Turn accounts receivable into immediate working liquidity without fixed-EMI debt:',
        uses: [
          {
            title: 'Instant Cash on 30–90 Day Invoices',
            desc: 'Convert locked B2B receivables into liquid cash within 24–72 hours.',
            icon: Zap,
          },
          {
            title: 'Accept Bigger Enterprise Orders',
            desc: 'Fulfill large POs from Tier-1 corporates and OEMs without cash strain.',
            icon: Building,
          },
          {
            title: 'Early-Payment Vendor Discounts',
            desc: 'Pay raw material suppliers upfront to negotiate 2%–4% cash discounts.',
            icon: ReceiptIndianRupee,
          },
          {
            title: 'Zero-Collateral Revolving Limit',
            desc: 'As older invoices settle, your discounting limit automatically replenishes.',
            icon: Repeat,
          },
        ],
        calculatorSlot: calculatorUI,
        documentsSubtitle: 'Select a category to inspect required B2B invoice documents:',
        documents: [
          {
            category: 'KYC & Entity',
            items: 'PAN & Aadhaar of Promoter/Directors, Company PAN, Incorporation / Partnership Deed',
          },
          {
            category: 'GST & Udyam',
            items: 'GST Certificate, Udyam MSME Registration, Last 12 months GSTR-1 & GSTR-3B',
          },
          {
            category: 'Invoice & Delivery',
            items: 'GST Tax Invoice (with IRN/e-Invoice), Purchase Order (PO), and e-Way Bill / LR',
          },
          {
            category: 'Banking & ITR',
            items: 'Last 12 months Current Account Statements (PDF) & Latest 2 years ITR / Financials',
          },
          {
            category: 'Buyer Ledger',
            items: 'Top 5–10 B2B buyer list with past 6-month payment realization history',
          },
        ],
        ratesSubtitle: 'Transparent discounting pricing based on anchor buyer rating and invoice tenure:',
        rates: [
          { label: 'Facility Limit', value: '₹2 Lakhs – ₹5 Crore (Revolving)' },
          { label: 'Advance Percentage', value: 'Up to 80% – 90% of Invoice Value', highlight: 'green' },
          { label: 'Discounting Rate', value: '9.50% – 18.00% p.a.', highlight: 'blue' },
          { label: 'Invoice Tenure', value: '15 to 120 Days' },
          { label: 'Collateral Required', value: 'Nil (Backed by verified GST receivables)' },
          { label: 'Platform / Setup Fee', value: '0.50% – 1.50% + GST' },
        ],
        processSubtitle: 'From invoice upload to cash in your bank account within 24 to 72 hours:',
        steps: [
          { step: '01', title: 'Submit Buyer & GST', desc: 'Share your GSTIN and list of corporate buyers in 2 minutes.' },
          { step: '02', title: 'Buyer Limit Assessment', desc: 'Lenders evaluate anchor buyers’ rating and assign a revolving limit.' },
          { step: '03', title: 'Upload Unpaid Invoices', desc: 'Submit GST invoice, Purchase Order, and e-Way Bill.' },
          { step: '04', title: 'GSTN & IRN Validation', desc: 'Automated invoice verification via GSTN.' },
          { step: '05', title: 'Sanction & Fee Sign-Off', desc: 'Review exact discount rate and net disbursal breakup.' },
          { step: '06', title: 'Upfront Disbursal (24–72 Hrs)', desc: 'Receive 80%–90% of invoice value in your bank account.' },
          { step: '07', title: 'Due Date Settlement', desc: 'Buyer pays on due date; balance margin is released to you.' },
        ],
        faqs: [
          {
            question: 'How does Invoice Discounting work for Indian B2B businesses?',
            answer:
              'Upload a GST B2B invoice raised to a creditworthy corporate buyer, receive 80%–90% upfront within 24–72 hours, and collect the remaining balance (minus discount fee) when your buyer pays on the due date.',
          },
          {
            question: 'Do I need property collateral or a high personal CIBIL score?',
            answer:
              'No property collateral is required. Underwriting focuses primarily on the creditworthiness of your corporate buyer alongside your GST e-invoice history.',
          },
          {
            question: 'What is the difference between Confidential Invoice Discounting and TReDS?',
            answer:
              'Confidential Invoice Discounting preserves your direct customer relationship via a virtual collection account, while RBI-regulated TReDS involves direct online acceptance by large corporate buyers for ultra-low rates.',
          },
          {
            question: 'What happens if my buyer delays payment beyond the invoice due date?',
            answer:
              'Most facilities include a 7-to-15-day grace period, after which standard interest applies only for the overdue days until settlement.',
          },
        ],
        callbackSubtitle:
          'Share your top B2B corporate buyers—our receivables finance desk will check instant buyer limits and discount rates.',
        callbackSuccessTitle: 'Our invoice discounting advisor will call you on',
      }}
    />
  );
}