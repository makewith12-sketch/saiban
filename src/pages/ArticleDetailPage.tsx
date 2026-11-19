import { useEffect, useState } from 'react';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ClockIcon,
  CalendarDaysIcon,
  ShareIcon,
  CheckIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';
import { InteriorPage, ScopeNote } from '../components/InteriorPage';
import {
  fetchArticleBySlug,
  fetchPublishedArticles,
  type ArticleRecord,
} from '../lib/articlesStore';

function renderFormattedBody(content: string) {
  const blocks = content.split('\n\n').filter((b) => b.trim().length > 0);

  return blocks.map((block, index) => {
    const trimmed = block.trim();

    if (trimmed.startsWith('## ')) {
      return (
        <h2
          key={index}
          className="mt-8 sm:mt-10 mb-3 sm:mb-4 text-lg sm:text-2xl font-extrabold tracking-tight text-[#0a192f]"
        >
          {trimmed.replace(/^##\s+/, '')}
        </h2>
      );
    }

    const lines = trimmed.split('\n');
    const isBulletList = lines.every((l) => l.trim().startsWith('* ') || l.trim().startsWith('- '));

    if (isBulletList) {
      return (
        <ul key={index} className="my-4 sm:my-5 space-y-2.5 sm:space-y-3 pl-0.5">
          {lines.map((line, i) => {
            const clean = line.replace(/^[\*\-]\s+/, '');
            const boldMatch = clean.match(/^\*\*(.+?):\*\*\s*(.*)$/);
            return (
              <li
                key={i}
                className="flex items-start gap-2.5 sm:gap-3 text-sm sm:text-[15.5px] leading-relaxed sm:leading-7 text-slate-600"
              >
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0052cc]" />
                <span className="min-w-0 break-words">
                  {boldMatch ? (
                    <>
                      <strong className="font-bold text-[#0a192f]">{boldMatch[1]}:</strong>{' '}
                      {boldMatch[2]}
                    </>
                  ) : (
                    clean
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      );
    }

    return (
      <p
        key={index}
        className="my-4 text-sm sm:text-[15.5px] leading-[1.8] sm:leading-[1.85] text-slate-600 break-words"
      >
        {trimmed}
      </p>
    );
  });
}

export default function ArticleDetailPage({ slug }: { slug: string }) {
  const [article, setArticle] = useState<ArticleRecord | null>(null);
  const [related, setRelated] = useState<ArticleRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);

    Promise.all([fetchArticleBySlug(slug), fetchPublishedArticles()]).then(
      ([foundArticle, allArticles]) => {
        if (!active) return;
        setArticle(foundArticle);
        setRelated(allArticles.filter((a) => a.slug !== slug).slice(0, 3));
        setLoading(false);
      }
    );

    return () => {
      active = false;
    };
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <InteriorPage>
        <div className="mx-auto max-w-4xl px-4 py-16 sm:py-24 sm:px-6 lg:px-8 animate-pulse">
          <div className="h-4 w-36 rounded bg-slate-200 mb-6" />
          <div className="h-10 sm:h-12 w-4/5 rounded bg-slate-200 mb-4" />
          <div className="h-5 w-2/3 rounded bg-slate-200 mb-8" />
          <div className="aspect-[16/9] w-full rounded-2xl sm:rounded-3xl bg-slate-200" />
        </div>
      </InteriorPage>
    );
  }

  if (!article) {
    return (
      <InteriorPage>
        <div className="mx-auto max-w-2xl px-4 py-20 sm:py-28 text-center sm:px-6">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-[#0052cc]">
            <BookOpenIcon className="h-7 w-7" />
          </span>
          <h1 className="mt-6 text-xl sm:text-2xl font-extrabold text-[#0a192f]">
            Article not found
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            The article may have been moved or unpublished. Return to the Knowledge Centre on the
            home page.
          </p>
          <a
            href="/#articles"
            className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#0052cc] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#003d8f]"
          >
            <ArrowLeftIcon className="h-4 w-4" /> Back to Knowledge Centre
          </a>
        </div>
      </InteriorPage>
    );
  }

  const formattedDate = new Date(article.created_at).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <InteriorPage>
      <article className="bg-white pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-14 overflow-x-clip">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Top Action Bar */}
          <div className="mb-6 sm:mb-8 flex items-center justify-between gap-3">
            <a
              href="/#articles"
              className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-[#0a192f] shadow-2xs transition hover:border-[#0052cc] hover:text-[#0052cc]"
            >
              <ArrowLeftIcon className="h-3.5 w-3.5 stroke-[2.25]" />
              <span>Back to articles</span>
            </a>

            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              {copied ? (
                <>
                  <CheckIcon className="h-3.5 w-3.5 text-[#558b2f]" />
                  <span>Link copied</span>
                </>
              ) : (
                <>
                  <ShareIcon className="h-3.5 w-3.5" />
                  <span>Share guide</span>
                </>
              )}
            </button>
          </div>

          {/* Category & Meta */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-[11px] sm:text-xs">
            <span className="rounded-full bg-blue-50 px-3 py-1 font-extrabold uppercase tracking-wider text-[#0052cc]">
              {article.category}
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium text-slate-500">
              <ClockIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400" />
              {article.read_time}
            </span>
            <span className="text-slate-300">•</span>
            <span className="inline-flex items-center gap-1.5 font-medium text-slate-500">
              <CalendarDaysIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400" />
              {formattedDate}
            </span>
          </div>

          {/* Title & Excerpt */}
          <h1 className="mt-4 sm:mt-5 text-[1.75rem] sm:text-4xl lg:text-[2.75rem] font-extrabold leading-[1.16] tracking-tight text-[#0a192f] break-words">
            {article.title}
          </h1>
          <p className="mt-3.5 sm:mt-4 text-sm sm:text-lg leading-relaxed text-slate-500">
            {article.excerpt}
          </p>

          {/* Author Strip */}
          <div className="mt-6 sm:mt-7 flex items-center gap-3.5 border-y border-slate-100 py-3.5 sm:py-4">
            <div className="grid h-9 w-9 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-full bg-[#0a192f] text-xs font-extrabold text-[#a9d56c]">
              {article.author_name
                .split(' ')
                .slice(0, 2)
                .map((n) => n[0])
                .join('')}
            </div>
            <div className="min-w-0">
              <div className="truncate text-xs font-extrabold text-[#0a192f]">
                {article.author_name}
              </div>
              <div className="truncate text-[11px] text-slate-500">{article.author_role}</div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="my-7 sm:my-9 aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-100 shadow-sm">
            <img
              src={article.cover_image}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Article Body */}
          <div className="max-w-none">{renderFormattedBody(article.content)}</div>

          {/* Regulatory Note */}
          <div className="mt-10 sm:mt-12">
            <ScopeNote>
              <div>
                <strong className="block text-xs sm:text-sm">
                  Educational &amp; advisory note
                </strong>
                <span>
                  This guide is published for informational clarity. Final credit appraisal,
                  interest rates, sanction terms, and disbursal conditions are determined by the
                  respective lending institution.
                </span>
              </div>
            </ScopeNote>
          </div>

          {/* Consultation Banner */}
          <div className="mt-8 sm:mt-10 flex flex-col items-stretch sm:items-center justify-between gap-5 rounded-2xl sm:rounded-3xl bg-[#0a192f] p-6 sm:p-9 text-white sm:flex-row">
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#a9d56c]">
                Need structured guidance?
              </div>
              <h2 className="mt-1.5 text-lg sm:text-2xl font-extrabold">
                Discuss your funding requirement with Saiban
              </h2>
              <p className="mt-1 text-xs leading-6 text-slate-300">
                Get clarity on lender fit, documentation readiness, and proposal structuring.
              </p>
            </div>
            <a
              href="/apply"
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0052cc] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#003d8f]"
            >
              Start an enquiry <ArrowRightIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </article>

      {/* Related Guides */}
      {related.length > 0 && (
        <section className="border-t border-slate-200 bg-[#f8f9fc] py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#558b2f]">
                  Continue reading
                </div>
                <h2 className="mt-1 text-xl sm:text-2xl font-extrabold text-[#0a192f]">
                  More from the Knowledge Centre
                </h2>
              </div>
              <a
                href="/#articles"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0052cc] hover:underline"
              >
                All home articles <ArrowRightIcon className="h-4 w-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
              {related.map((item) => (
                <a
                  key={item.id}
                  href={`/insights/${item.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <img
                      src={item.cover_image}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="font-bold text-[#0052cc]">{item.category}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-400">{item.read_time}</span>
                    </div>
                    <h3 className="mt-2 text-base font-extrabold leading-snug text-[#0a192f] group-hover:text-[#0052cc]">
                      {item.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
                      {item.excerpt}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </InteriorPage>
  );
}