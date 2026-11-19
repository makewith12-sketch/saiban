import { useState, type ComponentType, type SVGProps } from 'react';
import {
  ArrowRightIcon,
  TrophyIcon,
  BuildingLibraryIcon,
  BuildingOffice2Icon,
  DocumentCheckIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  MagnifyingGlassCircleIcon,
  PresentationChartLineIcon,
  ScaleIcon,
  PaperAirplaneIcon,
  ClipboardDocumentCheckIcon,
  BanknotesIcon,
  WrenchScrewdriverIcon,
  BriefcaseIcon,
  BuildingStorefrontIcon,
  HomeModernIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import {
  FAQAccordion,
  InteriorPage,
  PageHero,
  PrimaryLink,
  ScopeNote,
  SectionHeading,
} from '../components/InteriorPage';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

interface WorkflowStep {
  title: string;
  description: string;
  icon: IconComponent;
}

const steps: WorkflowStep[] = [
  {
    title: 'Initial consultation & requirement assessment',
    description:
      'Understand the business or project, funding purpose, amount, timing and available security.',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    title: 'Preliminary feasibility & document review',
    description: 'Review relevant financial, project, banking and property information.',
    icon: MagnifyingGlassCircleIcon,
  },
  {
    title: 'Financial structuring & proposal preparation',
    description: 'Organize the project summary, financial presentation and supporting records.',
    icon: PresentationChartLineIcon,
  },
  {
    title: 'Lender shortlisting & alignment',
    description: 'Identify banks, NBFCs or private institutions that may fit the requirement.',
    icon: ScaleIcon,
  },
  {
    title: 'Proposal submission & coordination',
    description: 'Facilitate submission and coordinate communication with the lending institution.',
    icon: PaperAirplaneIcon,
  },
  {
    title: 'Due diligence & query support',
    description:
      'Help respond to lender questions and coordinate legal, technical or financial review.',
    icon: ClipboardDocumentCheckIcon,
  },
  {
    title: 'Sanction & disbursal coordination',
    description:
      'If approved, help coordinate sanction documentation and the institution’s disbursal steps.',
    icon: BanknotesIcon,
  },
];

interface StrengthItem {
  icon: IconComponent;
  title: string;
  text: string;
}

const strengths: StrengthItem[] = [
  {
    icon: TrophyIcon,
    title: '25 years of experience',
    text: 'Financial consultancy and funding facilitation across India.',
  },
  {
    icon: BuildingLibraryIcon,
    title: 'Funding channels',
    text: 'Scheduled banks, NBFCs and private funding institutions.',
  },
  {
    icon: BuildingOffice2Icon,
    title: 'Broad funding expertise',
    text: 'Project finance, business capital, mortgage, construction and infrastructure funding.',
  },
  {
    icon: DocumentCheckIcon,
    title: 'Structured proposals',
    text: 'Documentation and proposal preparation aligned to lender review.',
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: 'Tailored guidance',
    text: 'Funding discussions shaped around each business, project and financing need.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Professional approach',
    text: 'Confidentiality, transparency and clear communication throughout.',
  },
];

interface SectorItem {
  name: string;
  icon: IconComponent;
}

const sectors: SectorItem[] = [
  { name: 'Real estate & construction', icon: BuildingOffice2Icon },
  { name: 'Infrastructure & industrial development', icon: WrenchScrewdriverIcon },
  { name: 'Business & corporate finance', icon: BriefcaseIcon },
  { name: 'Hospitality & restaurants', icon: BuildingStorefrontIcon },
  { name: 'Property-backed funding', icon: HomeModernIcon },
];

export default function AboutPage() {
  const [activeStep, setActiveStep] = useState(0);
  const ActiveStepIcon = steps[activeStep].icon;

  return (
    <InteriorPage>
      <PageHero
        eyebrow="About Saiban Capital Solutions"
        title={
          <>
            Guidance for the
            <br />
            <span className="text-[#0052cc]">funding journey.</span>
          </>
        }
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
            <div>
              <SectionHeading
                eyebrow="Company overview"
                title="Structured support, shaped around your funding need."
                description="Saiban helps clients assess requirements, prepare financial proposals, organize documentation and coordinate discussions with banks, NBFCs and private financial institutions."
              />
              <p className="max-w-2xl text-sm leading-7 text-slate-500">
                With 25 years of experience in financial consultancy and funding facilitation,
                Saiban works with businesses, developers, entrepreneurs and project promoters across
                India. Its services also include construction finance, infrastructure funding, debt
                advisory and syndication, and last-mile or special-situation funding.
              </p>
            </div>
            <div className="rounded-3xl bg-[#0a192f] p-7 text-white shadow-xl sm:p-9">
              <div className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#a9d56c]">
                Executive leadership
              </div>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
                Salauddin Ahamad Shaikh
              </h2>
              <p className="mt-1 text-sm font-semibold text-blue-200">CEO & Managing Director</p>
              <p className="mt-5 border-t border-white/15 pt-5 text-xs leading-6 text-slate-300">
                The team supports project-finance advisory, business and working-capital
                requirements, real-estate and construction funding, mortgage finance and lender
                coordination.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {strengths.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:shadow-md"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-[#0052cc]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-sm font-extrabold text-[#0a192f]">{title}</h3>
                <p className="mt-2 text-xs leading-6 text-slate-500">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="interior-grid bg-[#f8f9fc] py-14 md:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Seven-step workflow"
            title="From the first conversation to lender coordination."
            description="Select a step to see how Saiban helps prepare and present a funding proposal. Timing varies with documentation, due diligence and each institution's process."
          />
          <div className="grid gap-7 lg:grid-cols-[.8fr_1.2fr]">
            <div className="space-y-2">
              {steps.map(({ title }, index) => (
                <button
                  key={title}
                  type="button"
                  aria-pressed={activeStep === index}
                  onClick={() => setActiveStep(index)}
                  className={`flex w-full items-center gap-4 rounded-xl border px-4 py-4 text-left transition ${
                    activeStep === index
                      ? 'border-[#0052cc] bg-white shadow-sm'
                      : 'border-transparent bg-white/65 hover:border-slate-200'
                  }`}
                >
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg text-xs font-extrabold ${
                      activeStep === index
                        ? 'bg-[#0052cc] text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`text-xs font-bold ${
                      activeStep === index ? 'text-[#0a192f]' : 'text-slate-600'
                    }`}
                  >
                    {title}
                  </span>
                  <ArrowRightIcon
                    className={`ml-auto h-4 w-4 shrink-0 ${
                      activeStep === index ? 'text-[#0052cc]' : 'text-slate-300'
                    }`}
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>

            <div className="flex min-h-[300px] flex-col justify-center rounded-3xl bg-white p-7 shadow-[0_12px_40px_rgba(10,25,47,.07)] sm:p-10">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#f4faef] text-[#558b2f]">
                <ActiveStepIcon className="h-7 w-7" aria-hidden="true" />
              </span>
              <span className="mt-7 text-[10px] font-extrabold uppercase tracking-[.18em] text-[#558b2f]">
                Step {String(activeStep + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-[#0a192f]">
                {steps[activeStep].title}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500">
                {steps[activeStep].description}
              </p>
              <p className="mt-6 border-t border-slate-100 pt-5 text-[11px] leading-5 text-slate-400">
                A lender independently decides whether to approve a proposal and on what terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Sector coverage & eligibility"
            title="A defined scope for responsible coordination."
            description="Saiban facilitates funding discussions across these commercial, industrial, hospitality and development sectors, subject to eligibility review."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {sectors.map(({ name, icon: SectorIcon }, index) => (
              <div key={name} className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold tracking-[.15em] text-[#8ec843]">
                    0{index + 1}
                  </span>
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-50 text-[#0052cc]">
                    <SectorIcon className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-3 text-xs font-bold leading-5 text-[#0a192f]">{name}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 grid gap-5 lg:grid-cols-2">
            <ScopeNote tone="amber">
              <div>
                <strong className="block text-sm">Restricted categories</strong>
                <span>
                  Saiban does not facilitate funding for gold-related businesses, diamond-related
                  businesses or standalone wine shops.
                </span>
              </div>
            </ScopeNote>
            <ScopeNote>
              <div>
                <strong className="block text-sm">Hospitality exception</strong>
                <span>
                  Licensed restaurants may be considered subject to valid regulatory licences, local
                  compliance and lender policy.
                </span>
              </div>
            </ScopeNote>
          </div>
          <a
            href="/insights"
            className="mt-8 inline-flex items-center gap-2 text-xs font-bold text-[#0052cc]"
          >
            Read funding preparation guides
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="interior-grid bg-[#f8f9fc] py-14 md:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="A clear role at every stage"
            title="What Saiban coordinates—and what the lender decides."
            description="Saiban provides consultancy, proposal preparation and funding facilitation. The lending institution independently appraises each request and sets its final terms."
          />
          <div className="grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[#0052cc]">
                Saiban supports
              </div>
              <ul className="mt-5 space-y-3">
                {[
                  'Understanding the funding requirement and project context',
                  'Reviewing the available business, project and property records',
                  'Structuring a proposal and aligning a relevant lender discussion',
                  'Coordinating communication and due-diligence queries',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-xs leading-6 text-slate-600">
                    <CheckCircleIcon
                      className="mt-1 h-4 w-4 shrink-0 text-[#6a9d32]"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl bg-[#0a192f] p-6 text-white shadow-lg sm:p-8">
              <div className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[#a9d56c]">
                The institution decides
              </div>
              <ul className="mt-5 space-y-3">
                {[
                  'Whether to accept and approve the proposal',
                  'Credit eligibility, sanctioned amount and interest rate',
                  'Security, tenure, fees and final sanction conditions',
                  'Legal, technical and financial due diligence requirements',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-xs leading-6 text-slate-200">
                    <BuildingLibraryIcon
                      className="mt-1 h-4 w-4 shrink-0 text-[#a9d56c]"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-white/15 pt-5 text-[11px] leading-5 text-slate-300">
                This distinction helps set clear expectations before a proposal is shared.
              </p>
            </article>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Frequently asked"
                title="About Saiban Capital Solutions"
                description="A few practical details about the company and how funding facilitation works."
              />
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#0052cc]"
              >
                Speak with the team
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <FAQAccordion
              items={[
                {
                  question: 'Is Saiban a bank or lending institution?',
                  answer:
                    'No. Saiban Capital Solutions is a financial consultancy and funding facilitation firm. Banks, NBFCs and private institutions provide the lending channels.',
                },
                {
                  question: 'Does Saiban guarantee loan approval?',
                  answer:
                    'No. A lending institution independently assesses each case and decides whether to approve it, along with the amount and conditions.',
                },
                {
                  question: 'Which sectors does Saiban work with?',
                  answer:
                    'Its stated sectors include real estate and construction, infrastructure and industrial development, business and corporate finance, hospitality and restaurants, and property-backed funding. Exclusions and lender policies also apply.',
                },
                {
                  question: 'What should I share at the start?',
                  answer:
                    'Begin with a brief description of the business or project, funding purpose, approximate requirement and location. Share sensitive records only through a verified channel and when requested.',
                },
              ]}
            />
          </div>
        </div>
      </section>
    </InteriorPage>
  );
}