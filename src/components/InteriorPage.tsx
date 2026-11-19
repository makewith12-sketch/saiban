import { useState, type ReactNode } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';
import Header from './header';
import Footer from './footer';

export function InteriorPage({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfd] font-sans text-slate-800">
      <style dangerouslySetInnerHTML={{ __html: `
        .interior-grid {
          background-size: 32px 32px;
          background-image:
            linear-gradient(to right, rgba(0, 0, 0, 0.018) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.018) 1px, transparent 1px);
        }
      ` }} />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  imageLabel,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  image: string;
  imageAlt: string;
  imageLabel: string;
  children?: ReactNode;
}) {
  return (
    <section className="interior-grid relative overflow-hidden border-b border-slate-100 bg-[#f8f9fc]">
      <div className="absolute -right-24 -top-40 h-[26rem] w-[26rem] rounded-full border border-slate-200/70" aria-hidden="true" />
      <div className="absolute -right-10 -top-24 h-[21rem] w-[21rem] rounded-full border border-[#8ec843]/20" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[1400px] items-center gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-2 lg:px-8 lg:py-[4.5rem]">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-3">
            <span className="flex gap-1"><i className="h-2 w-2 bg-[#8ec843]" /><i className="h-2 w-2 bg-[#0052cc]" /></span>
            <span className="text-[10px] font-extrabold uppercase tracking-[.2em] text-slate-500">{eyebrow}</span>
          </div>
          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-[#0a192f] sm:text-5xl lg:text-[3.6rem]">{title}</h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-500 sm:text-[15px]">{description}</p>
          {children && <div className="mt-7 flex flex-wrap gap-3">{children}</div>}
        </div>
        <div className="relative mx-auto w-full max-w-[560px] lg:ml-auto">
          <div className="absolute -bottom-4 -left-4 right-5 top-4 rounded-[1.6rem] border border-[#0052cc]/20" aria-hidden="true" />
          <div className="relative h-[265px] overflow-hidden rounded-[1.4rem] bg-slate-200 shadow-[0_18px_60px_rgba(10,25,47,.18)] sm:h-[330px]">
            <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#081a31]/75 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white sm:bottom-7 sm:left-7 sm:right-7">
              <div><span className="text-[9px] font-bold uppercase tracking-[.18em] text-[#c3df8c]">Saiban Capital Solutions</span><p className="mt-1 text-lg font-bold tracking-tight sm:text-xl">{imageLabel}</p></div>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur"><ArrowRight size={18} /></span>
            </div>
          </div>
          <div className="absolute -left-3 top-7 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-lg sm:-left-5 sm:top-10">
            <div className="flex items-center gap-2 text-[11px] font-bold text-[#0a192f]"><CheckCircle2 size={15} className="text-[#6a9d32]" /> Structured guidance</div>
            <p className="mt-1 pl-[23px] text-[9px] text-slate-400">A considered first step</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: ReactNode; description?: string }) {
  return (
    <div className="mb-9 max-w-3xl">
      <div className="mb-3 inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.2em] text-[#0052cc]"><span className="h-2 w-2 bg-[#8ec843]" />{eyebrow}</div>
      <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#0a192f] sm:text-4xl">{title}</h2>
      {description && <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">{description}</p>}
    </div>
  );
}

export function ScopeNote({ children, tone = 'blue' }: { children: ReactNode; tone?: 'blue' | 'amber' }) {
  const toneClass = tone === 'amber' ? 'border-amber-200 bg-amber-50 text-amber-900' : 'border-blue-100 bg-blue-50 text-blue-900';
  return <div className={`flex items-start gap-3 rounded-xl border p-4 text-xs leading-6 ${toneClass}`}><CheckCircle2 size={17} className="mt-1 shrink-0" />{children}</div>;
}

export function MetricCard({ eyebrow, value, label }: { eyebrow: string; value: string; label: string }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><div className="text-[9px] font-extrabold uppercase tracking-[.16em] text-[#0052cc]">{eyebrow}</div><div className="mt-3 text-2xl font-extrabold tracking-tight text-[#0a192f] sm:text-3xl">{value}</div><p className="mt-2 text-[11px] leading-5 text-slate-500">{label}</p></div>;
}

export function PrimaryLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#0052cc] px-5 py-3 text-xs font-bold text-white shadow-md shadow-blue-900/10 transition hover:bg-[#003d8f]">{children}<ArrowRight size={15} /></a>;
}

export function SecondaryLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-[#0a192f] transition hover:border-[#0052cc] hover:text-[#0052cc]">{children}</a>;
}

export function FAQAccordion({ items }: { items: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {items.map((item, index) => {
        const open = openIndex === index;
        const questionId = `faq-question-${index}`;
        const answerId = `faq-answer-${index}`;
        return (
          <div key={item.question} className="border-b border-slate-100 last:border-b-0">
            <button id={questionId} type="button" aria-expanded={open} aria-controls={answerId} onClick={() => setOpenIndex(open ? null : index)} className="flex w-full items-center justify-between gap-5 px-5 py-4 text-left sm:px-6">
              <span className="text-xs font-bold leading-5 text-[#0a192f] sm:text-sm">{item.question}</span>
              <ChevronDown size={17} className={`shrink-0 text-[#0052cc] transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && <div id={answerId} role="region" aria-labelledby={questionId} className="px-5 pb-5 text-xs leading-6 text-slate-500 sm:px-6">{item.answer}</div>}
          </div>
        );
      })}
    </div>
  );
}
