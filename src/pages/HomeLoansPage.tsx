import { useState, type ComponentType, type SVGProps } from 'react';
import {
  HomeModernIcon,
  BuildingOffice2Icon,
  BuildingLibraryIcon,
  DocumentCheckIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import {
  FAQAccordion,
  InteriorPage,
  MetricCard,
  PageHero,
  PrimaryLink,
  ScopeNote,
  SectionHeading,
  SecondaryLink,
} from '../components/InteriorPage';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

/** Industry-standard custom duotone fintech SVGs (Saiban bespoke geometric marks) */
function SaibanResidentialKeyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5.5v-5.5a2.5 2.5 0 0 0-5 0V21H4a1 1 0 0 1-1-1v-9.5Z"
        className="fill-current/15 stroke-current"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="1.5" className="fill-current" />
    </svg>
  );
}

function SaibanTowerFinanceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16M14 10h5a1 1 0 0 1 1 1v10M2 21h20"
        className="fill-current/15 stroke-current"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 8h3M7.5 11.5h3M7.5 15h3M16.5 13.5h1M16.5 17h1"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SaibanMortgageVaultIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 2.75L3 7v2h18V7l-9-4.25Z"
        className="fill-current/20 stroke-current"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M5 9v9M9.5 9v9M14.5 9v9M19 9v9M3 18h18M2 21h20"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface PropertyRoute {
  id: string;
  icon: IconComponent;
  title: string;
  label: string;
  detail: string;
  items: string[];
}

const propertyRoutes: PropertyRoute[] = [
  {
    id: 'purchase',
    icon: HomeModernIcon,
    title: 'Buying a home',
    label: 'Individual purchase',
    detail:
      'Published services do not specify a standard loan for an individual home purchase. Contact Saiban to ask whether a suitable lender option is available.',
    items: [
      'Share the property location',
      'Clarify purchase stage and timing',
      'Ask which lender products are currently available',
    ],
  },
  {
    id: 'development',
    icon: BuildingOffice2Icon,
    title: 'Developing homes',
    label: 'Project finance',
    detail:
      'Residential towers, townships, housing societies and mixed-use development projects appear in the project-finance scope.',
    items: [
      'Project overview or DPR',
      'Project cost and means of finance',
      'Approvals, land papers and projected cash flows',
    ],
  },
  {
    id: 'mortgage',
    icon: BuildingLibraryIcon,
    title: 'Using property as security',
    label: 'Mortgage finance',
    detail:
      'Residential property-backed funding is listed under mortgage finance, subject to valuation, borrower eligibility and lender assessment.',
    items: [
      'Property title and ownership proof',
      'Approved plan and property tax details',
      'Approximate requirement and funding purpose',
    ],
  },
];

export default function HomeLoansPage() {
  const [selectedRoute, setSelectedRoute] = useState(propertyRoutes[0].id);
  const activeRoute =
    propertyRoutes.find((route) => route.id === selectedRoute) ?? propertyRoutes[0];

  return (
    <InteriorPage>
      <PageHero
        eyebrow="Residential development · property finance"
        title={
          <>
            Funding for residential
            <br />
            <span className="text-[#0052cc]">projects and property.</span>
          </>
        }
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
            <SectionHeading
              eyebrow="Choose your funding route"
              title="What are you looking to finance?"
              description="Select the option closest to your need to see relevant information and preparation points."
            />
            <div
              className="grid gap-3 md:grid-cols-3"
              role="tablist"
              aria-label="Residential property funding routes"
            >
              {propertyRoutes.map(({ id, icon: Icon, title, label }) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={selectedRoute === id}
                  onClick={() => setSelectedRoute(id)}
                  className={`flex items-center gap-3 rounded-xl border p-4 text-left transition sm:p-5 ${
                    selectedRoute === id
                      ? 'border-[#0052cc] bg-blue-50/70 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${
                      selectedRoute === id
                        ? 'bg-[#0052cc] text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[9px] font-extrabold uppercase tracking-[.14em] text-[#558b2f]">
                      {label}
                    </span>
                    <strong className="mt-1 block text-xs text-[#0a192f]">{title}</strong>
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-3 grid gap-5 rounded-2xl border border-slate-200 bg-[#fcfcfd] p-5 sm:p-7 md:grid-cols-[.9fr_1.1fr] md:items-center">
              <div>
                <span className="text-[9px] font-extrabold uppercase tracking-[.16em] text-[#0052cc]">
                  {activeRoute.label}
                </span>
                <h3 className="mt-2 text-lg font-extrabold text-[#0a192f]">{activeRoute.title}</h3>
                <p className="mt-2 text-xs leading-6 text-slate-500">{activeRoute.detail}</p>
              </div>
              <ul className="grid gap-2 sm:grid-cols-3">
                {activeRoute.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 rounded-lg bg-white p-3 text-[10px] leading-5 text-slate-600"
                  >
                    <CheckCircleIcon
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#6a9d32]"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_.9fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Two distinct funding needs"
                title="Project funding and property-backed finance serve different purposes."
                description="Project finance supports development activity. Mortgage finance uses eligible property as security. The purpose, borrower, asset and lender assessment determine how a request may be considered."
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <MetricCard
                  eyebrow="Residential development"
                  value="₹25 lakh – ₹5,000 crore"
                  label="Indicative project finance range. It is not an offer or eligibility limit."
                />
                <MetricCard
                  eyebrow="Mortgage finance"
                  value="₹10 lakh – ₹500 crore"
                  label="Indicative range for property-backed finance, subject to valuation and borrower eligibility."
                />
              </div>
            </div>
            <ScopeNote tone="amber">
              <div>
                <strong className="block text-sm">
                  Individual home-purchase terms are not specified.
                </strong>
                <span>
                  Saiban&apos;s published services describe residential project finance and mortgage
                  funding against property. They do not set out standard rates, eligibility, tenure
                  or terms for an individual buying a home. Contact the team to confirm whether a
                  suitable option is available.
                </span>
              </div>
            </ScopeNote>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-[#fcfcfd] p-6 sm:p-8">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-[#0052cc]">
                <SaibanTowerFinanceIcon className="h-6 w-6" />
              </span>
              <div className="mt-5 text-[10px] font-extrabold uppercase tracking-[.16em] text-[#0052cc]">
                Real estate project finance
              </div>
              <h3 className="mt-2 text-xl font-extrabold text-[#0a192f]">
                For developers and project promoters
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Funding facilitation for residential townships, towers, housing societies and
                mixed-use developments, subject to viability, promoter profile and lender criteria.
              </p>
              <ul className="mt-5 space-y-3 text-xs text-slate-600">
                {[
                  'Greenfield and brownfield development',
                  'Project cost, means of finance and cash flows',
                  'Land papers, approvals and permissions',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <DocumentCheckIcon
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#6a9d32]"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-[#fcfcfd] p-6 sm:p-8">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#f4faef] text-[#558b2f]">
                <SaibanResidentialKeyIcon className="h-6 w-6" />
              </span>
              <div className="mt-5 text-[10px] font-extrabold uppercase tracking-[.16em] text-[#558b2f]">
                Residential property mortgage
              </div>
              <h3 className="mt-2 text-xl font-extrabold text-[#0a192f]">
                For property-backed requirements
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Residential property may be considered under mortgage finance. The indicative range
                depends on property valuation, borrower eligibility and the lender&apos;s review.
              </p>
              <ul className="mt-5 space-y-3 text-xs text-slate-600">
                {[
                  'Property title and chain of agreements',
                  'Approved plan, OC or CC where applicable',
                  'Ownership proof, property tax and valuation details',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <DocumentCheckIcon
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#6a9d32]"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <div className="mt-8">
            <ScopeNote>
              <div>
                <strong className="block text-sm">All figures are indicative.</strong>
                <span>
                  Final sanction amount, interest rate, tenure, security and disbursal are set by
                  the respective lending institution after due diligence.
                </span>
              </div>
            </ScopeNote>
          </div>
        </div>
      </section>

      <section className="interior-grid bg-[#f8f9fc] py-14 md:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-4 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
          <div>
            <SectionHeading
              eyebrow="A good first conversation"
              title="Bring the purpose into focus."
              description="Before sending documents, clarify which property route you have in mind and what the capital would support."
            />
            <ol className="space-y-4">
              {[
                'Identify whether this is a purchase, development or property-backed request.',
                'Share the property type, location, project stage and approximate requirement.',
                'Confirm the current lender pathway and a secure document channel.',
              ].map((item, index) => (
                <li key={item} className="flex gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#0052cc] text-[10px] font-extrabold text-white">
                    {index + 1}
                  </span>
                  <span className="pt-1 text-xs leading-5 text-slate-600">{item}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <SectionHeading eyebrow="Common questions" title="Home and property finance FAQs" />
            <FAQAccordion
              items={[
                {
                  question: 'Can an individual ask about financing a home purchase?',
                  answer:
                    'Yes. Contact Saiban to confirm whether a suitable option is available. Published services describe residential project finance and mortgage funding against residential property, but do not specify standard home-purchase terms.',
                },
                {
                  question: 'What is the difference between project finance and a property mortgage?',
                  answer:
                    'Project finance is described for development mandates such as residential townships and towers. Mortgage finance is property-backed and assessed against the property and borrower. The lender decides the appropriate structure.',
                },
                {
                  question: 'Are the funding ranges guaranteed?',
                  answer:
                    'No. They are indicative ranges only. The lending institution decides eligibility, amount, interest rate, tenure, security and disbursal after its review.',
                },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="bg-[#f8f9fc] py-12 md:py-16">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-[#0052cc] shadow-sm">
              <SaibanMortgageVaultIcon className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-[#0a192f]">
                Not sure which route matches your need?
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Tell us whether you are buying, developing or raising funds against property.
              </p>
            </div>
          </div>
          <a
            href="/contact"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#0052cc] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#003d8f]"
          >
            <ShieldCheckIcon className="h-4 w-4" aria-hidden="true" />
            Ask Saiban
            <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </section>
    </InteriorPage>
  );
}