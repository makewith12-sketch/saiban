import { useState } from 'react';
import { Building2, CheckCircle2, FileCheck2, Home, Landmark, ShieldCheck } from 'lucide-react';
import { FAQAccordion, InteriorPage, MetricCard, PageHero, PrimaryLink, ScopeNote, SectionHeading, SecondaryLink } from '../components/InteriorPage';

const propertyRoutes = [
  { id: 'purchase', icon: Home, title: 'Buying a home', label: 'Individual purchase', detail: 'Published services do not specify a standard loan for an individual home purchase. Contact Saiban to ask whether a suitable lender option is available.', items: ['Share the property location', 'Clarify purchase stage and timing', 'Ask which lender products are currently available'] },
  { id: 'development', icon: Building2, title: 'Developing homes', label: 'Project finance', detail: 'Residential towers, townships, housing societies and mixed-use development projects appear in the project-finance scope.', items: ['Project overview or DPR', 'Project cost and means of finance', 'Approvals, land papers and projected cash flows'] },
  { id: 'mortgage', icon: Landmark, title: 'Using property as security', label: 'Mortgage finance', detail: 'Residential property-backed funding is listed under mortgage finance, subject to valuation, borrower eligibility and lender assessment.', items: ['Property title and ownership proof', 'Approved plan and property tax details', 'Approximate requirement and funding purpose'] },
];

export default function HomeLoansPage() {
  const [selectedRoute, setSelectedRoute] = useState(propertyRoutes[0].id);
  const activeRoute = propertyRoutes.find((route) => route.id === selectedRoute) ?? propertyRoutes[0];

  return (
    <InteriorPage>
      <PageHero
        eyebrow="Residential development · property finance"
        title={<>Funding for residential<br /><span className="text-[#0052cc]">projects and property.</span></>}
        description="Saiban helps developers and project promoters structure residential project funding and coordinate discussions for property-backed finance. If you are buying a home for personal use, contact the team to confirm what options may be available."
        image="/house.png"
        imageAlt="Modern residential property"
        imageLabel="Residential property funding"
      >
        <PrimaryLink href="/contact">Discuss your requirement</PrimaryLink>
        <SecondaryLink href="/calculator">Estimate an EMI</SecondaryLink>
      </PageHero>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <SectionHeading eyebrow="Choose your funding route" title="What are you looking to finance?" description="Select the option closest to your need to see relevant information and preparation points." />
            <div className="grid gap-3 md:grid-cols-3" role="tablist" aria-label="Residential property funding routes">{propertyRoutes.map(({ id, icon: Icon, title, label }) => <button key={id} type="button" role="tab" aria-selected={selectedRoute === id} onClick={() => setSelectedRoute(id)} className={`flex items-center gap-3 rounded-xl border p-4 text-left transition sm:p-5 ${selectedRoute === id ? 'border-[#0052cc] bg-blue-50/70 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'}`}><span className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${selectedRoute === id ? 'bg-[#0052cc] text-white' : 'bg-slate-100 text-slate-500'}`}><Icon size={19} /></span><span><span className="block text-[9px] font-extrabold uppercase tracking-[.14em] text-[#558b2f]">{label}</span><strong className="mt-1 block text-xs text-[#0a192f]">{title}</strong></span></button>)}</div>
            <div className="mt-3 grid gap-5 rounded-2xl border border-slate-200 bg-[#fcfcfd] p-5 sm:p-7 md:grid-cols-[.9fr_1.1fr] md:items-center"><div><span className="text-[9px] font-extrabold uppercase tracking-[.16em] text-[#0052cc]">{activeRoute.label}</span><h3 className="mt-2 text-lg font-extrabold text-[#0a192f]">{activeRoute.title}</h3><p className="mt-2 text-xs leading-6 text-slate-500">{activeRoute.detail}</p></div><ul className="grid gap-2 sm:grid-cols-3">{activeRoute.items.map((item) => <li key={item} className="flex items-start gap-2 rounded-lg bg-white p-3 text-[10px] leading-5 text-slate-600"><CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[#6a9d32]" />{item}</li>)}</ul></div>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_.9fr] lg:items-start">
            <div>
              <SectionHeading eyebrow="Two distinct funding needs" title="Project funding and property-backed finance serve different purposes." description="Project finance supports development activity. Mortgage finance uses eligible property as security. The purpose, borrower, asset and lender assessment determine how a request may be considered." />
              <div className="grid gap-4 sm:grid-cols-2">
                <MetricCard eyebrow="Residential development" value="₹25 lakh – ₹5,000 crore" label="Indicative project finance range. It is not an offer or eligibility limit." />
                <MetricCard eyebrow="Mortgage finance" value="₹10 lakh – ₹500 crore" label="Indicative range for property-backed finance, subject to valuation and borrower eligibility." />
              </div>
            </div>
            <ScopeNote tone="amber"><div><strong className="block text-sm">Individual home-purchase terms are not specified.</strong><span>Saiban's published services describe residential project finance and mortgage funding against property. They do not set out standard rates, eligibility, tenure or terms for an individual buying a home. Contact the team to confirm whether a suitable option is available.</span></div></ScopeNote>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-[#fcfcfd] p-6 sm:p-8">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-[#0052cc]"><Building2 size={23} /></span>
              <div className="mt-5 text-[10px] font-extrabold uppercase tracking-[.16em] text-[#0052cc]">Real estate project finance</div>
              <h3 className="mt-2 text-xl font-extrabold text-[#0a192f]">For developers and project promoters</h3>
              <p className="mt-3 text-sm leading-6 text-slate-500">Funding facilitation for residential townships, towers, housing societies and mixed-use developments, subject to viability, promoter profile and lender criteria.</p>
              <ul className="mt-5 space-y-3 text-xs text-slate-600">{['Greenfield and brownfield development', 'Project cost, means of finance and cash flows', 'Land papers, approvals and permissions'].map((item) => <li key={item} className="flex items-start gap-2"><FileCheck2 size={15} className="mt-0.5 shrink-0 text-[#6a9d32]" />{item}</li>)}</ul>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-[#fcfcfd] p-6 sm:p-8">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#f4faef] text-[#558b2f]"><Home size={23} /></span>
              <div className="mt-5 text-[10px] font-extrabold uppercase tracking-[.16em] text-[#558b2f]">Residential property mortgage</div>
              <h3 className="mt-2 text-xl font-extrabold text-[#0a192f]">For property-backed requirements</h3>
              <p className="mt-3 text-sm leading-6 text-slate-500">Residential property may be considered under mortgage finance. The indicative range depends on property valuation, borrower eligibility and the lender's review.</p>
              <ul className="mt-5 space-y-3 text-xs text-slate-600">{['Property title and chain of agreements', 'Approved plan, OC or CC where applicable', 'Ownership proof, property tax and valuation details'].map((item) => <li key={item} className="flex items-start gap-2"><FileCheck2 size={15} className="mt-0.5 shrink-0 text-[#6a9d32]" />{item}</li>)}</ul>
            </article>
          </div>

          <div className="mt-8"><ScopeNote><div><strong className="block text-sm">All figures are indicative.</strong><span>Final sanction amount, interest rate, tenure, security and disbursal are set by the respective lending institution after due diligence.</span></div></ScopeNote></div>
        </div>
      </section>

      <section className="interior-grid bg-[#f8f9fc] py-14 md:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-4 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
          <div><SectionHeading eyebrow="A good first conversation" title="Bring the purpose into focus." description="Before sending documents, clarify which property route you have in mind and what the capital would support." /><ol className="space-y-4">{['Identify whether this is a purchase, development or property-backed request.', 'Share the property type, location, project stage and approximate requirement.', 'Confirm the current lender pathway and a secure document channel.'].map((item, index) => <li key={item} className="flex gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#0052cc] text-[10px] font-extrabold text-white">{index + 1}</span><span className="pt-1 text-xs leading-5 text-slate-600">{item}</span></li>)}</ol></div>
          <div><SectionHeading eyebrow="Common questions" title="Home and property finance FAQs" /><FAQAccordion items={[
            { question: 'Can an individual ask about financing a home purchase?', answer: 'Yes. Contact Saiban to confirm whether a suitable option is available. Published services describe residential project finance and mortgage funding against residential property, but do not specify standard home-purchase terms.' },
            { question: 'What is the difference between project finance and a property mortgage?', answer: 'Project finance is described for development mandates such as residential townships and towers. Mortgage finance is property-backed and assessed against the property and borrower. The lender decides the appropriate structure.' },
            { question: 'Are the funding ranges guaranteed?', answer: 'No. They are indicative ranges only. The lending institution decides eligibility, amount, interest rate, tenure, security and disbursal after its review.' },
          ]} /></div>
        </div>
      </section>

      <section className="bg-[#f8f9fc] py-12 md:py-16">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-start gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-[#0052cc] shadow-sm"><Landmark size={21} /></span><div><h2 className="text-xl font-extrabold text-[#0a192f]">Not sure which route matches your need?</h2><p className="mt-1 text-sm text-slate-500">Tell us whether you are buying, developing or raising funds against property.</p></div></div>
          <a href="/contact" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#0052cc] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#003d8f]"><ShieldCheck size={16} /> Ask Saiban <span aria-hidden="true">→</span></a>
        </div>
      </section>
    </InteriorPage>
  );
}
