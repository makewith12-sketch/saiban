import { useState } from 'react';
import { ArrowRight, CheckCircle2, Search } from 'lucide-react';
import { InteriorPage, PageHero, ScopeNote, SectionHeading } from '../components/InteriorPage';

const guides = [
  {
    id: 'documents',
    category: 'Documentation',
    title: 'A practical funding document checklist',
    summary: 'Organize business, project and property records before a lender review.',
    intro: 'A clear set of business, project and property records can help explain a funding requirement. The lender confirms which documents it needs for the specific proposal.',
    sections: [
      { title: 'Business & MSME', bullets: ['Company or firm registration documents', 'Promoter/director KYC, PAN and Aadhaar', 'GST registration and returns', 'Last 6–12 months of bank statements', 'Last 2–3 years of audited financials and ITR', 'Existing loan letters and repayment record, if applicable'] },
      { title: 'Project finance', bullets: ['Detailed Project Report or project overview', 'Project cost and means of finance', 'Land or property documents', 'Approvals, licences and permissions', 'Financial projections and cash-flow estimates'] },
      { title: 'Mortgage finance', bullets: ['Property title and chain of agreements', 'Approved plan, OC or CC where applicable', 'Property tax receipts and ownership proof', 'Valuation or legal details, if available'] },
    ],
  },
  {
    id: 'process',
    category: 'How it works',
    title: 'What happens during funding facilitation?',
    summary: 'A walkthrough of the seven stages Saiban uses to facilitate funding discussions.',
    intro: 'Saiban helps clients prepare and present a proposal. The lending institution conducts its own appraisal and decides the outcome, terms and timing.',
    sections: [
      { title: 'Assess and prepare', bullets: ['Discuss the business, project, amount, timeline and available security', 'Review financial, project, banking and property information', 'Structure the proposal and organize supporting documents'] },
      { title: 'Align and coordinate', bullets: ['Identify suitable banks, NBFCs or private institutions', 'Facilitate submission and communication with the lender', 'Support responses to due-diligence questions'] },
      { title: 'Complete lender requirements', bullets: ['Review sanction terms if the lender approves', 'Coordinate remaining documentation', "Follow the lender's disbursal process"] },
    ],
  },
  {
    id: 'project',
    category: 'Project finance',
    title: 'What to organize for a project-finance discussion',
    summary: 'Clarify the project stage, capital requirement and supporting records.',
    intro: 'A clear first brief helps explain the project and the capital requirement. Organizing the points below can make the initial discussion more focused.',
    sections: [
      { title: 'Describe the mandate', bullets: ['Greenfield, brownfield, real estate, infrastructure, manufacturing or hospitality', 'Current stage, execution plan and expected funding timeline', 'Promoter profile and available security'] },
      { title: 'Set out project economics', bullets: ['Project cost and means of finance', 'Funding requirement and expected cash flows', 'Financial projections and project overview or DPR'] },
      { title: 'Gather supporting records', bullets: ['Land or property documents', 'Approvals, permissions and licences', 'Technical, legal and financial details already available'] },
    ],
  },
  {
    id: 'property',
    category: 'Property finance',
    title: 'Preparing a property-backed finance enquiry',
    summary: 'Bring the property, ownership and funding purpose into focus.',
    intro: 'Mortgage finance may be considered against residential, commercial and industrial property. Funding depends on valuation, borrower eligibility and the lender’s legal and credit review.',
    sections: [
      { title: 'Identify the property', bullets: ['Property type and full location', 'Ownership structure and title documents', 'Approved plan, OC or CC where applicable', 'Property tax receipts and available valuation details'] },
      { title: 'Explain the requirement', bullets: ['Purpose for raising funds', 'Approximate requirement and expected timing', 'Borrower or business profile and existing obligations'] },
      { title: 'Plan for review', bullets: ['The indicative mortgage range is ₹10 lakh–₹500 crore', 'Valuation and eligibility affect the lender’s assessment', 'The institution sets final security, rate, tenure and sanction'] },
    ],
  },
  {
    id: 'scope',
    category: 'Eligibility',
    title: 'Check sector fit before preparing a proposal',
    summary: 'Understand Saiban’s sector scope and restrictions before preparing a proposal.',
    intro: 'A sector being within Saiban’s stated scope does not guarantee funding. Each enquiry must meet the mandate requirements and the lending institution’s criteria.',
    sections: [
      { title: 'Areas within the stated scope', bullets: ['Real estate, construction and infrastructure', 'Industrial development and manufacturing', 'Business and corporate finance', 'Hospitality, restaurants and property-backed funding', 'Project debt advisory, syndication and last-mile funding'] },
      { title: 'Restrictions to check early', bullets: ['Gold-related businesses are not facilitated', 'Diamond-related businesses are not facilitated', 'Standalone wine shops are not facilitated', 'Licensed restaurants may be considered with valid licences and compliance'] },
      { title: 'Questions for a first discussion', bullets: ['Is this business or project within the current mandate?', 'Which licences or permissions are needed for the sector?', 'Which lender channel may be relevant for the requirement?'] },
    ],
  },
];

const GuideIcon = ({ id, size = 20 }: { id: string; size?: number }) => {
  switch (id) {
    case 'documents':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
      );
    case 'process':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    case 'project':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3h12" />
          <path d="M6 8h12" />
          <path d="m6 13 8.5 8" />
          <path d="M6 13h3" />
          <path d="M9 13c6.667 0 6.667-10 0-10" />
        </svg>
      );
    case 'property':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case 'scope':
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
  }
};

export default function InsightsPage() {
  const [selectedId, setSelectedId] = useState(guides[0].id);
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');
  const categories = ['All', ...new Set(guides.map((guide) => guide.category))];
  const filteredGuides = guides.filter((guide) => {
    const matchesCategory = activeCategory === 'All' || guide.category === activeCategory;
    const searchText = `${guide.title} ${guide.summary} ${guide.category}`.toLowerCase();
    return matchesCategory && searchText.includes(query.trim().toLowerCase());
  });
  const selectedGuide = filteredGuides.find((guide) => guide.id === selectedId) ?? filteredGuides[0] ?? null;

  return (
    <InteriorPage>
      <PageHero
        eyebrow="Insights & funding guides"
        title={<>Better prepared for<br /><span className="text-[#0052cc]">the next discussion.</span></>}
        description="Straightforward guides to the funding process, documents and service scope. Use them to prepare for a conversation with Saiban or a lending institution."
        image="/contactform.png"
        imageAlt="Consultant reviewing business information at a desk"
        imageLabel="Funding readiness starts with clarity"
      />

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Knowledge centre" title="Choose a guide to explore" description="Use these practical notes to prepare for a funding discussion. They do not replace credit, legal or financial advice from qualified professionals." />
          <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-[#fcfcfd] p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
            <label className="flex min-h-11 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 text-slate-400 focus-within:border-[#0052cc] focus-within:ring-2 focus-within:ring-blue-100"><Search size={17} className="shrink-0 text-[#0052cc]" /><span className="sr-only">Search funding guides</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search documents, property, sectors…" className="w-full border-0 bg-transparent text-xs text-[#0a192f] outline-none placeholder:text-slate-400" /></label>
            <div className="flex flex-wrap gap-2" aria-label="Filter guides by topic">{categories.map((category) => <button key={category} type="button" aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)} className={`rounded-full border px-3 py-2 text-[10px] font-bold transition ${activeCategory === category ? 'border-[#0052cc] bg-[#0052cc] text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-[#0052cc] hover:text-[#0052cc]'}`}>{category}</button>)}</div>
          </div>
          <div className="grid gap-7 lg:grid-cols-[.78fr_1.22fr]">
            <div className="space-y-3" role="tablist" aria-label="Funding guides">{filteredGuides.map((guide) => {
              const active = guide.id === selectedGuide?.id;
              return <button key={guide.id} role="tab" aria-selected={active} type="button" onClick={() => setSelectedId(guide.id)} className={`w-full rounded-2xl border p-5 text-left transition ${active ? 'border-[#0052cc] bg-blue-50/70 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'}`}>
                <div className="flex items-start gap-4"><span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${active ? 'bg-[#0052cc] text-white' : 'bg-slate-100 text-slate-600'}`}><GuideIcon id={guide.id} size={20} /></span><span className="min-w-0 flex-1"><span className="text-[9px] font-extrabold uppercase tracking-[.15em] text-[#558b2f]">{guide.category}</span><strong className="mt-1 block text-sm leading-5 text-[#0a192f]">{guide.title}</strong><span className="mt-1 block text-[11px] leading-5 text-slate-500">{guide.summary}</span></span><ArrowRight size={16} className={`mt-1 shrink-0 ${active ? 'text-[#0052cc]' : 'text-slate-300'}`} /></div>
              </button>;
            })}</div>

            {selectedGuide ? <article role="tabpanel" className="rounded-3xl border border-slate-200 bg-[#fcfcfd] p-6 sm:p-9">
              <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#f4faef] text-[#558b2f]"><GuideIcon id={selectedGuide.id} size={20} /></span><span className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[#558b2f]">{selectedGuide.category}</span></div>
              <h2 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-[#0a192f] sm:text-3xl">{selectedGuide.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-500">{selectedGuide.intro}</p>
              <div className="mt-7 space-y-6">{selectedGuide.sections.map((section) => <section key={section.title}><h3 className="text-sm font-extrabold text-[#0a192f]">{section.title}</h3><ul className="mt-3 grid gap-2 sm:grid-cols-2">{section.bullets.map((bullet) => <li key={bullet} className="flex items-start gap-2.5 rounded-lg bg-white p-3 text-[11px] leading-5 text-slate-600"><CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[#6a9d32]" />{bullet}</li>)}</ul></section>)}</div>
              <div className="mt-7"><ScopeNote tone="amber"><div><strong className="block text-sm">Lender requirements can differ.</strong><span>Final eligibility, documentation, interest rate, sanction amount and timeline are decided by the institution after its own review.</span></div></ScopeNote></div>
              <a href="/contact" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-[#0052cc]">Discuss a funding requirement <ArrowRight size={15} /></a>
            </article> : <div className="grid min-h-[340px] place-items-center rounded-3xl border border-dashed border-slate-300 bg-[#fcfcfd] p-8 text-center"><div><span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-[#0052cc]"><Search size={21} /></span><h2 className="mt-4 text-lg font-extrabold text-[#0a192f]">No guides found</h2><p className="mt-2 max-w-sm text-xs leading-6 text-slate-500">Try another search term or choose a different topic.</p><button type="button" onClick={() => { setQuery(''); setActiveCategory('All'); }} className="mt-4 text-xs font-bold text-[#0052cc]">Clear filters</button></div></div>}
          </div>
        </div>
      </section>
    </InteriorPage>
  );
}