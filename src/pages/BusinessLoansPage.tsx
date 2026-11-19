import { useState } from 'react';
import { ArrowRight, BriefcaseBusiness, Building2, CheckCircle2, CircleHelp, FileText, Landmark, Wrench } from 'lucide-react';
import { FAQAccordion, InteriorPage, MetricCard, PageHero, PrimaryLink, ScopeNote, SectionHeading, SecondaryLink } from '../components/InteriorPage';

const businessNeeds = [
  { id: 'working-capital', icon: BriefcaseBusiness, title: 'Working capital', text: 'Support for inventory, receivables and day-to-day business liquidity.', prepare: ['Recent bank statements', 'Receivables and payables position', 'Use of funds and repayment source'] },
  { id: 'expansion', icon: Building2, title: 'Business expansion', text: 'Funding discussions for new branches, added capacity and wider market reach.', prepare: ['Expansion plan and milestones', 'Project cost and means of finance', 'Financial statements and projections'] },
  { id: 'equipment', icon: Wrench, title: 'Equipment & machinery', text: 'Capital for productive assets, plant machinery and commercial equipment.', prepare: ['Supplier quotations or pro-forma invoices', 'Installation and commissioning plan', 'Business cash flow after purchase'] },
  { id: 'cash-flow', icon: Landmark, title: 'Cash-flow support', text: 'A structured look at operational cash-flow cycles and working-capital needs.', prepare: ['Monthly cash-flow estimate', 'Existing borrowing details', 'Purpose and requested facility structure'] },
];

export default function BusinessLoansPage() {
  const [selectedNeedId, setSelectedNeedId] = useState(businessNeeds[0].id);
  const selectedNeed = businessNeeds.find((need) => need.id === selectedNeedId) ?? businessNeeds[0];

  return (
    <InteriorPage>
      <PageHero
        eyebrow="Business capital · working capital"
        title={<>Funding for business<br /><span className="text-[#0052cc]">operations and growth.</span></>}
        description="Saiban helps businesses assess their capital needs, prepare a clear funding proposal and coordinate discussions with banks, NBFCs and private institutions."
        image="/worker.png"
        imageAlt="Small business owner working with equipment"
        imageLabel="Capital for business growth"
      >
        <PrimaryLink href="/apply">Start an enquiry</PrimaryLink>
        <SecondaryLink href="/calculator">Calculate a sample EMI</SecondaryLink>
      </PageHero>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.25fr] lg:items-center">
            <div><SectionHeading eyebrow="Business capital" title="Start with the purpose behind the request." description="Funding discussions can cover working capital, expansion, equipment, operating cash flow and SME or MSME growth. Lender review may consider how long the business has operated, its banking profile, financial statements and repayment capacity." /></div>
            <div className="grid gap-4 sm:grid-cols-2"><MetricCard eyebrow="Indicative range" value="₹1 lakh – ₹10 crore" label="Indicative business capital range. The lender determines eligibility and any sanctioned amount." /><div className="rounded-2xl border border-slate-200 bg-[#f8f9fc] p-5 sm:p-6"><div className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[#558b2f]">Funding channels</div><h3 className="mt-3 text-lg font-extrabold text-[#0a192f]">Matched to the mandate</h3><p className="mt-2 text-xs leading-6 text-slate-500">Saiban can coordinate discussions with scheduled banks, NBFCs and private funding institutions, depending on the requirement.</p></div></div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Business funding needs">{businessNeeds.map(({ id, icon: Icon, title, text }) => <button key={id} type="button" aria-pressed={selectedNeedId === id} onClick={() => setSelectedNeedId(id)} className={`rounded-2xl border p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md ${selectedNeedId === id ? 'border-[#0052cc] bg-blue-50/60' : 'border-slate-200 bg-white'}`}><span className={`grid h-11 w-11 place-items-center rounded-xl ${selectedNeedId === id ? 'bg-[#0052cc] text-white' : 'bg-blue-50 text-[#0052cc]'}`}><Icon size={21} /></span><h3 className="mt-4 text-sm font-extrabold text-[#0a192f]">{title}</h3><p className="mt-2 text-xs leading-6 text-slate-500">{text}</p><span className="mt-4 inline-flex items-center gap-1 text-[10px] font-bold text-[#0052cc]">See preparation points <ArrowRight size={13} /></span></button>)}</div>
          <div className="mt-4 grid gap-5 rounded-2xl border border-slate-200 bg-[#fcfcfd] p-5 sm:p-7 md:grid-cols-[.8fr_1.2fr] md:items-center"><div><div className="text-[9px] font-extrabold uppercase tracking-[.16em] text-[#558b2f]">For {selectedNeed.title.toLowerCase()}</div><h3 className="mt-2 text-lg font-extrabold text-[#0a192f]">Build a clear first brief</h3><p className="mt-2 text-xs leading-6 text-slate-500">These are useful discussion points, not a fixed lender checklist. The institution may request additional information after reviewing the proposal.</p></div><ul className="grid gap-2 sm:grid-cols-3">{selectedNeed.prepare.map((item) => <li key={item} className="flex items-start gap-2 rounded-lg bg-white p-3 text-[10px] leading-5 text-slate-600"><CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[#6a9d32]" />{item}</li>)}</ul></div>
        </div>
      </section>

      <section className="interior-grid bg-[#f8f9fc] py-14 md:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Getting ready" title="A useful first document set" description="The lender confirms the final checklist. These records can help explain a business, its finances and the purpose of the funding request." />
          <div className="grid gap-5 md:grid-cols-3">
            <DocumentGroup title="Business identity" items={['Company or firm registration documents', 'Promoter or director KYC, PAN and Aadhaar', 'GST registration and returns']} />
            <DocumentGroup title="Financial profile" items={['Bank statements for the last 6–12 months', 'Audited financial statements and ITR for the last 2–3 years', 'Existing loan details and repayment record, where applicable']} />
            <DocumentGroup title="Project information" items={['Project overview or Detailed Project Report', 'Project cost and sources of funding', 'Approvals, permissions, projections and cash-flow estimates']} />
          </div>
          <div className="mt-7"><ScopeNote><div><strong className="block text-sm">Every proposal is subject to appraisal.</strong><span>Loan approvals, interest rates, credit limits, security, tenure and disbursal terms are determined by the respective financial institution after due diligence.</span></div></ScopeNote></div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-4 sm:px-6 lg:grid-cols-[.7fr_1.3fr] lg:px-8">
          <div className="rounded-3xl bg-[#0a192f] p-7 text-white sm:p-9"><span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-[#a9d56c]"><CircleHelp size={21} /></span><div className="mt-6 text-[10px] font-extrabold uppercase tracking-[.18em] text-[#a9d56c]">Before you proceed</div><h2 className="mt-2 text-2xl font-extrabold">Know who decides the terms.</h2><p className="mt-3 text-xs leading-6 text-slate-300">Saiban facilitates funding discussions and proposal preparation. A bank, NBFC or private institution independently evaluates the case and decides whether to lend and on what terms.</p><a href="/about" className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-white">How the process works <ArrowRight size={14} /></a></div>
          <div><SectionHeading eyebrow="Business funding questions" title="A few useful answers before you start" /><FAQAccordion items={[
            { question: 'What does the indicative ₹1 lakh–₹10 crore range mean?', answer: 'It is a range shown for business capital, not an offer or promise of eligibility. The lender assesses the business and decides whether to approve funding and on what terms.' },
            { question: 'Which records are useful for a first review?', answer: 'Business registration, promoter KYC, GST records, bank statements, audited financials, ITR, project information and existing loan details may be relevant. The lender confirms its checklist for the request.' },
            { question: 'Does an enquiry guarantee approval or a particular rate?', answer: 'No. Saiban provides facilitation and advisory support. Credit appraisal, approval, interest rate, security, tenure and disbursal remain with the lending institution.' },
            { question: 'How long does the process take?', answer: 'There is no fixed timeline. Timing depends on document readiness, due diligence, lender queries and each institution’s process.' },
          ]} /></div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div><div className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#0052cc]">Next step</div><h2 className="mt-2 text-2xl font-extrabold text-[#0a192f]">Talk through the purpose and the numbers.</h2><p className="mt-2 max-w-2xl text-sm text-slate-500">A first discussion can help clarify which documents and funding channels may be relevant. The lender makes the final credit decision and sets all terms.</p></div>
          <a href="/apply" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#0052cc] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#003d8f]">Business funding enquiry <ArrowRight size={15} /></a>
        </div>
      </section>
    </InteriorPage>
  );
}

function DocumentGroup({ title, items }: { title: string; items: string[] }) {
  return <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#f4faef] text-[#558b2f]"><FileText size={20} /></span><h3 className="mt-4 text-base font-extrabold text-[#0a192f]">{title}</h3><ul className="mt-4 space-y-3">{items.map((item) => <li key={item} className="flex items-start gap-2.5 text-xs leading-5 text-slate-500"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#6a9d32]" />{item}</li>)}</ul></article>;
}
