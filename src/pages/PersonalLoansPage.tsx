import { ArrowRight, Briefcase, CheckCircle2, CircleHelp, Handshake, Home, ShieldCheck, Wallet } from 'lucide-react';
import { FAQAccordion, InteriorPage, PageHero, PrimaryLink, ScopeNote, SectionHeading } from '../components/InteriorPage';

export default function PersonalLoansPage() {
  return (
    <InteriorPage>
      <PageHero
        eyebrow="Personal loan enquiries"
        title={<>A clear first step<br /><span className="text-[#0052cc]">for your enquiry.</span></>}
        description="Personal loans are not included in Saiban's published funding services. Contact the team first to ask whether it can guide your request or direct you to an appropriate institution."
        image="/family.png"
        imageAlt="Family spending time together"
        imageLabel="A clear first conversation"
      >
        <PrimaryLink href="/contact">Ask about availability</PrimaryLink>
      </PageHero>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_.82fr] lg:items-center">
            <div>
              <SectionHeading eyebrow="Confirm availability first" title="Know whether your request fits before sharing documents." description="Saiban focuses on funding facilitation for businesses, developers, entrepreneurs and project promoters through banks, NBFCs and private institutions." />
              <p className="max-w-2xl text-sm leading-7 text-slate-500">The published services do not specify a personal-loan product, rate, amount, eligibility rule or approval timeline. Contact the team to confirm whether it can guide your enquiry. If another institution is involved, that lender will explain its requirements and terms.</p>
            </div>
            <div className="rounded-3xl bg-[#0a192f] p-7 text-white shadow-xl sm:p-9">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-[#a9d56c]"><CircleHelp size={23} /></span>
              <div className="mt-6 text-[10px] font-extrabold uppercase tracking-[.18em] text-[#a9d56c]">Services currently described</div>
              <h2 className="mt-2 text-2xl font-extrabold">What is listed</h2>
              <ul className="mt-5 space-y-3 text-sm text-slate-200">{['Business and working-capital funding', 'Project and real-estate finance', 'Mortgage and property-backed funding'].map((item) => <li key={item} className="flex items-start gap-3"><ShieldCheck size={17} className="mt-0.5 shrink-0 text-[#a9d56c]" />{item}</li>)}</ul>
              <div className="my-6 h-px bg-white/15" />
              <p className="text-xs leading-6 text-slate-300">Personal-loan products and terms are not specified in the published services. Confirm availability before sharing documents.</p>
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <article className="rounded-2xl border border-slate-200 p-6"><Wallet className="text-[#0052cc]" size={23} /><h3 className="mt-4 text-base font-extrabold text-[#0a192f]">If this is personal borrowing</h3><p className="mt-2 text-xs leading-6 text-slate-500">Describe the purpose and ask whether a personal-loan enquiry is currently within Saiban's scope.</p></article>
            <article className="rounded-2xl border border-slate-200 p-6"><Handshake className="text-[#558b2f]" size={23} /><h3 className="mt-4 text-base font-extrabold text-[#0a192f]">If this is for a business</h3><p className="mt-2 text-xs leading-6 text-slate-500">Explore working capital, expansion, equipment or cash-flow support on the Business Loans page.</p><a href="/business-loans" className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#0052cc]">Business funding <ArrowRight size={14} /></a></article>
            <article className="rounded-2xl border border-slate-200 p-6"><ShieldCheck className="text-[#558b2f]" size={23} /><h3 className="mt-4 text-base font-extrabold text-[#0a192f]">Share details carefully</h3><p className="mt-2 text-xs leading-6 text-slate-500">Start with a short enquiry. Wait for a verified, secure document channel before sending financial records.</p></article>
          </div>
          <div className="mt-8"><ScopeNote tone="amber"><div><strong className="block text-sm">No personal-loan offer is made on this page.</strong><span>If a lender option is available, the lender sets the eligibility, interest rate, amount, tenure and approval terms.</span></div></ScopeNote></div>
        </div>
      </section>

      <section className="interior-grid bg-[#f8f9fc] py-14 md:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="A simple availability check" title="Get a clear answer before you apply." description="Use a short conversation to confirm whether Saiban can guide your personal-loan enquiry. No personal-loan application or offer is made on this page." />
          <div className="grid gap-4 md:grid-cols-3">{[
            ['Describe the request', 'Briefly explain the purpose, approximate amount and location. Do not send identity or account documents in an initial message.'],
            ['Confirm availability', 'Ask whether Saiban can guide a personal-loan enquiry or point you toward an appropriate institution.'],
            ['Agree on next steps', 'If a relevant option is available, confirm the lender, its requirements and a suitable way to share records.'],
          ].map(([title, text], index) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-50 text-xs font-extrabold text-[#0052cc]">0{index + 1}</span><h3 className="mt-4 text-sm font-extrabold text-[#0a192f]">{title}</h3><p className="mt-2 text-xs leading-6 text-slate-500">{text}</p></article>)}</div>
          <div className="mt-12 grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
            <div><SectionHeading eyebrow="Related pages" title="If your need is connected to a business or property" description="Saiban's published services include these funding areas, subject to lender assessment." /><div className="space-y-3"><a href="/business-loans" className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 text-xs font-bold text-[#0a192f] transition hover:border-[#0052cc]"><span className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-50 text-[#0052cc]"><Briefcase size={17} /></span>Business capital</span><ArrowRight size={15} className="text-[#0052cc]" /></a><a href="/home-loans" className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 text-xs font-bold text-[#0a192f] transition hover:border-[#0052cc]"><span className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-lg bg-[#f4faef] text-[#558b2f]"><Home size={17} /></span>Residential property funding</span><ArrowRight size={15} className="text-[#0052cc]" /></a></div></div>
            <div><SectionHeading eyebrow="Common questions" title="Personal-loan FAQs" /><FAQAccordion items={[
              { question: 'Are personal loans part of Saiban’s published services?', answer: 'Personal loans are not specified in the published services. Saiban focuses on project finance, business capital, mortgage and property-backed funding, construction, infrastructure and related advisory work.' },
              { question: 'Can I use this page to submit an application?', answer: 'No. This page is for confirming current availability. Contact Saiban first and follow the instructions for any supported enquiry.' },
              { question: 'What should I include in a first enquiry?', answer: 'A brief description of the purpose, location and approximate amount is enough to start. Avoid sending account numbers, identity documents or bank statements in an initial message.' },
            ]} /></div>
          </div>
          <div className="mt-7 flex items-start gap-2 text-[10px] leading-5 text-slate-400"><CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[#6a9d32]" />If a lender product is available, all terms and decisions remain with that institution.</div>
        </div>
      </section>
    </InteriorPage>
  );
}
