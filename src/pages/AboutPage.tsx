import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { FAQAccordion, InteriorPage, PageHero, PrimaryLink, ScopeNote, SectionHeading } from '../components/InteriorPage';

const steps = [
  ['Initial consultation & requirement assessment', 'Understand the business or project, funding purpose, amount, timing and available security.'],
  ['Preliminary feasibility & document review', 'Review relevant financial, project, banking and property information.'],
  ['Financial structuring & proposal preparation', 'Organize the project summary, financial presentation and supporting records.'],
  ['Lender shortlisting & alignment', 'Identify banks, NBFCs or private institutions that may fit the requirement.'],
  ['Proposal submission & coordination', 'Facilitate submission and coordinate communication with the lending institution.'],
  ['Due diligence & query support', 'Help respond to lender questions and coordinate legal, technical or financial review.'],
  ['Sanction & disbursal coordination', 'If approved, help coordinate sanction documentation and the institution’s disbursal steps.'],
];

const StrengthIcon = ({ type, size = 21 }: { type: string; size?: number }) => {
  switch (type) {
    case 'experience':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
        </svg>
      );
    case 'channels':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="22" x2="21" y2="22" />
          <line x1="6" y1="18" x2="6" y2="11" />
          <line x1="10" y1="18" x2="10" y2="11" />
          <line x1="14" y1="18" x2="14" y2="11" />
          <line x1="18" y1="18" x2="18" y2="11" />
          <polygon points="12 2 20 7 4 7" />
        </svg>
      );
    case 'expertise':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M9 22v-4h6v4" />
          <path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
        </svg>
      );
    case 'proposals':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="m9 15 2 2 4-4" />
        </svg>
      );
    case 'guidance':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m11 17 2 2a1 1 0 1 0 3-3" />
          <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
          <path d="m21 3 1 11h-2" />
          <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
          <path d="M3 4h8" />
        </svg>
      );
    case 'approach':
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
  }
};

const strengths = [
  { iconType: 'experience', title: '25 years of experience', text: 'Financial consultancy and funding facilitation across India.' },
  { iconType: 'channels', title: 'Funding channels', text: 'Scheduled banks, NBFCs and private funding institutions.' },
  { iconType: 'expertise', title: 'Broad funding expertise', text: 'Project finance, business capital, mortgage, construction and infrastructure funding.' },
  { iconType: 'proposals', title: 'Structured proposals', text: 'Documentation and proposal preparation aligned to lender review.' },
  { iconType: 'guidance', title: 'Tailored guidance', text: 'Funding discussions shaped around each business, project and financing need.' },
  { iconType: 'approach', title: 'Professional approach', text: 'Confidentiality, transparency and clear communication throughout.' },
];

const sectors = ['Real estate & construction', 'Infrastructure & industrial development', 'Business & corporate finance', 'Hospitality & restaurants', 'Property-backed funding'];

export default function AboutPage() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <InteriorPage>
      <PageHero
        eyebrow="About Saiban Capital Solutions"
        title={<>Guidance for the<br /><span className="text-[#0052cc]">funding journey.</span></>}
        description="Saiban Capital Solutions Pvt. Ltd. is a financial consultancy and funding facilitation firm supporting businesses, developers, entrepreneurs and project promoters across India."
        image="/verifiedadvisors.png"
        imageAlt="Financial consultant reviewing business information"
        imageLabel="25 years of industry experience"
      >
        <PrimaryLink href="/contact">Connect with our team</PrimaryLink>
      </PageHero>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <div><SectionHeading eyebrow="Company overview" title="Structured support, shaped around your funding need." description="Saiban helps clients assess requirements, prepare financial proposals, organize documentation and coordinate discussions with banks, NBFCs and private financial institutions." /><p className="max-w-2xl text-sm leading-7 text-slate-500">With 25 years of experience in financial consultancy and funding facilitation, Saiban works with businesses, developers, entrepreneurs and project promoters across India. Its services also include construction finance, infrastructure funding, debt advisory and syndication, and last-mile or special-situation funding.</p></div>
            <div className="rounded-3xl bg-[#0a192f] p-7 text-white shadow-xl sm:p-9"><div className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#a9d56c]">Executive leadership</div><h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">Salauddin Ahamad Shaikh</h2><p className="mt-1 text-sm font-semibold text-blue-200">CEO & Managing Director</p><p className="mt-5 border-t border-white/15 pt-5 text-xs leading-6 text-slate-300">The team supports project-finance advisory, business and working-capital requirements, real-estate and construction funding, mortgage finance and lender coordination.</p></div>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{strengths.map(({ iconType, title, text }) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:shadow-md"><span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-[#0052cc]"><StrengthIcon type={iconType} size={21} /></span><h3 className="mt-4 text-sm font-extrabold text-[#0a192f]">{title}</h3><p className="mt-2 text-xs leading-6 text-slate-500">{text}</p></article>)}</div>
        </div>
      </section>

      <section className="interior-grid bg-[#f8f9fc] py-14 md:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Seven-step workflow" title="From the first conversation to lender coordination." description="Select a step to see how Saiban helps prepare and present a funding proposal. Timing varies with documentation, due diligence and each institution's process." />
          <div className="grid gap-7 lg:grid-cols-[.8fr_1.2fr]">
            <div className="space-y-2">{steps.map(([title], index) => <button key={title} type="button" aria-pressed={activeStep === index} onClick={() => setActiveStep(index)} className={`flex w-full items-center gap-4 rounded-xl border px-4 py-4 text-left transition ${activeStep === index ? 'border-[#0052cc] bg-white shadow-sm' : 'border-transparent bg-white/65 hover:border-slate-200'}`}><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg text-xs font-extrabold ${activeStep === index ? 'bg-[#0052cc] text-white' : 'bg-slate-100 text-slate-500'}`}>{String(index + 1).padStart(2, '0')}</span><span className={`text-xs font-bold ${activeStep === index ? 'text-[#0a192f]' : 'text-slate-600'}`}>{title}</span><ArrowRight size={15} className={`ml-auto shrink-0 ${activeStep === index ? 'text-[#0052cc]' : 'text-slate-300'}`} /></button>)}</div>
            <div className="flex min-h-[300px] flex-col justify-center rounded-3xl bg-white p-7 shadow-[0_12px_40px_rgba(10,25,47,.07)] sm:p-10"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#f4faef] text-[#558b2f]"><CheckCircle2 size={25} /></span><span className="mt-7 text-[10px] font-extrabold uppercase tracking-[.18em] text-[#558b2f]">Step {String(activeStep + 1).padStart(2, '0')}</span><h3 className="mt-2 text-2xl font-extrabold tracking-tight text-[#0a192f]">{steps[activeStep][0]}</h3><p className="mt-3 max-w-xl text-sm leading-7 text-slate-500">{steps[activeStep][1]}</p><p className="mt-6 border-t border-slate-100 pt-5 text-[11px] leading-5 text-slate-400">A lender independently decides whether to approve a proposal and on what terms.</p></div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Sector coverage & eligibility" title="A defined scope for responsible coordination." description="Saiban facilitates funding discussions across these commercial, industrial, hospitality and development sectors, subject to eligibility review." />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{sectors.map((sector, index) => <div key={sector} className="rounded-xl border border-slate-200 p-4"><span className="text-[10px] font-extrabold tracking-[.15em] text-[#8ec843]">0{index + 1}</span><p className="mt-3 text-xs font-bold leading-5 text-[#0a192f]">{sector}</p></div>)}</div>
          <div className="mt-7 grid gap-5 lg:grid-cols-2">
            <ScopeNote tone="amber"><div><strong className="block text-sm">Restricted categories</strong><span>Saiban does not facilitate funding for gold-related businesses, diamond-related businesses or standalone wine shops.</span></div></ScopeNote>
            <ScopeNote><div><strong className="block text-sm">Hospitality exception</strong><span>Licensed restaurants may be considered subject to valid regulatory licences, local compliance and lender policy.</span></div></ScopeNote>
          </div>
          <a href="/insights" className="mt-8 inline-flex items-center gap-2 text-xs font-bold text-[#0052cc]">Read funding preparation guides <ArrowRight size={15} /></a>
        </div>
      </section>

      <section className="interior-grid bg-[#f8f9fc] py-14 md:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="A clear role at every stage" title="What Saiban coordinates—and what the lender decides." description="Saiban provides consultancy, proposal preparation and funding facilitation. The lending institution independently appraises each request and sets its final terms." />
          <div className="grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><div className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[#0052cc]">Saiban supports</div><ul className="mt-5 space-y-3">{['Understanding the funding requirement and project context', 'Reviewing the available business, project and property records', 'Structuring a proposal and aligning a relevant lender discussion', 'Coordinating communication and due-diligence queries'].map((item) => <li key={item} className="flex items-start gap-3 text-xs leading-6 text-slate-600"><CheckCircle2 size={16} className="mt-1 shrink-0 text-[#6a9d32]" />{item}</li>)}</ul></article>
            <article className="rounded-2xl bg-[#0a192f] p-6 text-white shadow-lg sm:p-8"><div className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[#a9d56c]">The institution decides</div><ul className="mt-5 space-y-3">{['Whether to accept and approve the proposal', 'Credit eligibility, sanctioned amount and interest rate', 'Security, tenure, fees and final sanction conditions', 'Legal, technical and financial due diligence requirements'].map((item) => <li key={item} className="flex items-start gap-3 text-xs leading-6 text-slate-200"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 shrink-0 text-[#a9d56c]"><line x1="3" y1="22" x2="21" y2="22" /><line x1="6" y1="18" x2="6" y2="11" /><line x1="10" y1="18" x2="10" y2="11" /><line x1="14" y1="18" x2="14" y2="11" /><line x1="18" y1="18" x2="18" y2="11" /><polygon points="12 2 20 7 4 7" /></svg>{item}</li>)}</ul><p className="mt-6 border-t border-white/15 pt-5 text-[11px] leading-5 text-slate-300">This distinction helps set clear expectations before a proposal is shared.</p></article>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
            <div><SectionHeading eyebrow="Frequently asked" title="About Saiban Capital Solutions" description="A few practical details about the company and how funding facilitation works." /><a href="/contact" className="inline-flex items-center gap-2 text-xs font-bold text-[#0052cc]">Speak with the team <ArrowRight size={15} /></a></div>
            <FAQAccordion items={[
              { question: 'Is Saiban a bank or lending institution?', answer: 'No. Saiban Capital Solutions is a financial consultancy and funding facilitation firm. Banks, NBFCs and private institutions provide the lending channels.' },
              { question: 'Does Saiban guarantee loan approval?', answer: 'No. A lending institution independently assesses each case and decides whether to approve it, along with the amount and conditions.' },
              { question: 'Which sectors does Saiban work with?', answer: 'Its stated sectors include real estate and construction, infrastructure and industrial development, business and corporate finance, hospitality and restaurants, and property-backed funding. Exclusions and lender policies also apply.' },
              { question: 'What should I share at the start?', answer: 'Begin with a brief description of the business or project, funding purpose, approximate requirement and location. Share sensitive records only through a verified channel and when requested.' },
            ]} />
          </div>
        </div>
      </section>
    </InteriorPage>
  );
}