// src/pages/SupplyChainFinance.tsx
import { useState, useMemo } from 'react';
import LoanProductLayout from '../components/LoanProductLayout';
import {
  Network,
  Store,
  Truck,
  FileCheck2,
  RefreshCcw,
  Calculator,
  ArrowRight,
} from 'lucide-react';

export default function SupplyChainFinance() {
  const [trancheAmount, setTrancheAmount] = useState(2000000);
  const [creditDays, setCreditDays] = useState(45);
  const [interestRate, setInterestRate] = useState(12.5);
  const [cashDiscountPct, setCashDiscountPct] = useState(2.0);

  const formatINR = (val: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);

  const { interestCost, cashDiscountEarned, netBenefit, totalRepayableOnDue } = useMemo(() => {
    const cost = Math.round(trancheAmount * (interestRate / 100) * (creditDays / 365));
    const discountSaved = Math.round((trancheAmount * cashDiscountPct) / 100);
    return {
      interestCost: cost,
      cashDiscountEarned: discountSaved,
      netBenefit: discountSaved - cost,
      totalRepayableOnDue: trancheAmount + cost,
    };
  }, [trancheAmount, creditDays, interestRate, cashDiscountPct]);

  const calculatorUI = (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-10 shadow-[0_16px_44px_rgba(10,25,47,0.05)]">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-100">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#0052cc]">
            <Calculator className="h-4 w-4" />
            Dealer & Vendor ROI Planner
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a192f] mt-1.5">
            SCF Tranche Cost & Cash Discount Calculator
          </h2>
        </div>
        <span
          className={`rounded-full px-4 py-1.5 text-xs font-bold ${
            netBenefit >= 0
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-blue-50 text-[#0052cc] border border-blue-200'
          }`}
        >
          {netBenefit >= 0
            ? `Net Gain: +${formatINR(netBenefit)} via Cash Discount`
            : `${creditDays}-Day Liquidity Bridge`}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex justify-between text-sm font-bold mb-2">
              <span className="text-slate-600">PO / Invoice Tranche Value</span>
              <span className="text-[#0a192f]">{formatINR(trancheAmount)}</span>
            </div>
            <input
              type="range"
              min={200000}
              max={50000000}
              step={100000}
              value={trancheAmount}
              onChange={(e) => setTrancheAmount(Number(e.target.value))}
              className="w-full accent-[#0052cc] cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-slate-600">Credit Days</span>
                <span className="text-[#0052cc]">{creditDays}d</span>
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
                <span className="text-slate-600">SCF Rate</span>
                <span className="text-[#0052cc]">{interestRate}%</span>
              </div>
              <input
                type="range"
                min={9.75}
                max={18}
                step={0.25}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-[#0052cc] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-slate-600">OEM Discount</span>
                <span className="text-emerald-600">{cashDiscountPct}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={5}
                step={0.5}
                value={cashDiscountPct}
                onChange={(e) => setCashDiscountPct(Number(e.target.value))}
                className="w-full accent-[#0052cc] cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 rounded-2xl bg-[#0a192f] text-white p-7 sm:p-8 space-y-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-300">
              Interest Cost for {creditDays} Days
            </p>
            <p className="text-3xl sm:text-4xl font-extrabold mt-1">{formatINR(interestCost)}</p>
          </div>
          <div className="border-t border-slate-700/80 pt-4 space-y-2.5 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-300">OEM Cash Discount Saved</span>
              <span className="font-semibold text-emerald-400">
                + {formatINR(cashDiscountEarned)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Net Margin Gain</span>
              <span className="font-bold text-emerald-400">
                {netBenefit >= 0 ? `+ ${formatINR(netBenefit)}` : formatINR(netBenefit)}
              </span>
            </div>
            <div className="flex justify-between border-t border-slate-700/80 pt-2.5">
              <span className="font-semibold">Due on Day {creditDays}</span>
              <span className="font-bold">{formatINR(totalRepayableOnDue)}</span>
            </div>
          </div>
          <a
            href="/apply?product=supply-chain-finance"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0052cc] hover:bg-[#0065ff] py-3.5 text-sm font-bold text-white transition-colors"
          >
            <span>Apply for SCF Limit</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <LoanProductLayout
      config={{
        breadcrumbLabel: 'Supply Chain Finance',
        badgeText: 'Dealer & Vendor Ecosystem Credit • Zero Property Collateral',
        badgeIcon: Network,
        titlePrefix: 'Supply Chain',
        titleHighlight: 'Finance',
        subtitle: (
          <>
            Empower your dealership or vendor operations with revolving credit lines from{' '}
            <strong className="text-[#0a192f]">₹5 Lakhs to ₹10 Crore</strong>. Pay OEMs upfront to
            capture early-payment cash discounts, or unlock instant liquidity on corporate POs.
          </>
        ),
        heroMedia: {
          imageUrl:
            'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
          imageAlt: 'Warehouse logistics and supply chain distribution operations',
          captionTitle: 'Keep Your Dealer & Vendor Network Moving Without Stock-Outs',
          captionSubtitle: 'Capture up to 3.5% OEM cash discounts with 24-hour drawdowns',
        },
        applyHref: '/apply?product=supply-chain-finance',
        glanceTag: 'Anchor-Backed',
        glanceRows: [
          { label: 'Revolving Limit', value: '₹5 Lakhs – ₹10 Crore' },
          { label: 'Program Type', value: 'Dealer / Vendor / PO' },
          { label: 'Tranche Tenure', value: '30 – 120 Days' },
          { label: 'Interest Rate', value: 'From 9.75% p.a.', tone: 'blue' },
          { label: 'Tranche Disbursal', value: 'Within 24 Hours', tone: 'green' },
        ],
        glanceNote: (
          <>
            <strong>Zero property collateral</strong>—unlock cash discounts up to 3.5% from OEMs by
            paying upfront.
          </>
        ),
        eligibilitySubtitle:
          'Tailored for authorized dealers, distributors, OEM suppliers, and corporate Anchors:',
        eligibilityChecks: [
          'Authorized dealer/distributor OR approved vendor to a reputed Anchor',
          'Minimum 12+ months of active trading relationship with the Anchor',
          'Business vintage of 2+ years with active GST registration',
          'Annual turnover of ₹40 Lakhs+ & CIBIL score of 675+',
        ],
        usesHeading: 'Supply chain programs',
        usesSubtitle: 'End-to-end working capital across procurement, distribution, and collections:',
        uses: [
          {
            title: 'Dealer & Channel Financing',
            desc: 'Instant inventory funding for authorized dealers—pay OEMs upfront and repay in 30–90 days.',
            icon: Store,
          },
          {
            title: 'Vendor & Supplier Financing',
            desc: 'Early payment against approved POs and invoices raised to large corporate buyers.',
            icon: Truck,
          },
          {
            title: 'Purchase Order (PO) Finance',
            desc: 'Pre-shipment working capital to procure raw materials and execute confirmed Tier-1 orders.',
            icon: FileCheck2,
          },
          {
            title: 'Anchor-Led Ecosystem Programs',
            desc: 'Custom digital credit lines for corporate Anchors empowering 50 to 5,000+ channel partners.',
            icon: RefreshCcw,
          },
        ],
        calculatorSlot: calculatorUI,
        documentsSubtitle: 'Select a category to inspect required SCF onboarding documents:',
        documents: [
          {
            category: 'KYC & Entity',
            items: 'PAN & Aadhaar of Promoter/Directors, Company PAN, Incorporation / Partnership Deed',
          },
          {
            category: 'Anchor Proof',
            items: 'Dealership Certificate OR Vendor Empanelment Letter & 12-Month Anchor Ledger',
          },
          {
            category: 'GST & Udyam',
            items: 'GST Certificate, Udyam MSME Registration, Last 12 months GSTR-1 & GSTR-3B',
          },
          {
            category: 'Banking & ITR',
            items: 'Last 12 months Current Account Statements (PDF) & Latest 2 years ITR / Financials',
          },
          {
            category: 'Drawdown Docs',
            items: 'Anchor-approved Purchase Order (PO), GST Tax Invoice, and e-Way Bill',
          },
        ],
        ratesSubtitle: 'Competitive anchor-backed pricing with zero prepayment or lock-in charges:',
        rates: [
          { label: 'Revolving Limit', value: '₹5 Lakhs – ₹10 Crore+' },
          { label: 'Interest Rate', value: '9.75% – 18.00% p.a. (Daily utilized)', highlight: 'blue' },
          { label: 'Tranche Tenure', value: '30 to 120 Days per drawdown' },
          { label: 'Collateral Security', value: 'Zero property collateral (Anchor ledger backed)' },
          { label: 'Setup / Renewal Fee', value: '0.75% – 1.50% + GST' },
          { label: 'Early Repayment', value: 'Zero foreclosure charges', highlight: 'green' },
        ],
        processSubtitle: 'From Anchor ledger onboarding to same-day invoice/PO settlement:',
        steps: [
          { step: '01', title: 'Anchor Profiling', desc: 'Share your GSTIN and details of your OEM / corporate Anchor.' },
          { step: '02', title: 'Ledger Assessment', desc: 'Lenders review 12-month Anchor volume and banking credits.' },
          { step: '03', title: 'Digital KYC & GST', desc: 'Complete paperless verification and upload financials.' },
          { step: '04', title: 'Limit Sanction', desc: 'Receive a 12-month renewable SCF credit limit within 72 hours.' },
          { step: '05', title: 'Anchor Mapping', desc: 'Digital agreement sign-off and Anchor ledger mapping.' },
          { step: '06', title: 'Tranche Drawdown (24 Hrs)', desc: 'Raise a drawdown request against any PO/invoice.' },
          { step: '07', title: 'Auto-Replenishing Cycle', desc: 'Repay upon stock sale—limit restores immediately.' },
        ],
        faqs: [
          {
            question: 'What is Supply Chain Finance (SCF) and who can apply?',
            answer:
              'SCF provides dedicated revolving working capital to Authorized Dealers/Distributors buying from OEMs and Vendors supplying to large corporate buyers.',
          },
          {
            question: 'How does Dealer / Channel Financing help distributors?',
            answer:
              'The lender pays your OEM upfront on Day 1 so you capture 1.5%–3.5% cash discounts, while you get 30–90 days to sell stock and repay.',
          },
          {
            question: 'Do I need property collateral for a Supply Chain Finance limit?',
            answer:
              'No property collateral is required. Limits are underwritten on your 12-to-24-month ledger relationship with the Anchor corporate and GST filings.',
          },
          {
            question: 'Can corporate Anchors onboard their entire dealer or vendor network?',
            answer:
              'Yes. SaibanCapital structures multi-lender Dealer & Vendor Finance programs for mid-to-large corporate Anchors.',
          },
        ],
        callbackSubtitle:
          'Whether you are a dealer, vendor, or corporate Anchor, our SCF desk will structure a revolving limit for your supply chain.',
        callbackSuccessTitle: 'Our Supply Chain Finance specialist will call you on',
      }}
    />
  );
}