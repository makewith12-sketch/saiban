import { useEffect, useState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import {
  DEFAULT_ARTICLES,
  fetchPublishedArticles,
  type ArticleRecord,
} from '../lib/articlesStore';

export default function Articles() {
  const [articles, setArticles] = useState<ArticleRecord[]>(DEFAULT_ARTICLES);

  useEffect(() => {
    let active = true;
    fetchPublishedArticles().then((items) => {
      if (active && items.length > 0) {
        setArticles(items);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const featured = articles.find((a) => a.featured) ?? articles[0];
  const sideArticles = articles.filter((a) => a.id !== featured?.id).slice(0, 3);

  return (
    <section id="articles" className="scroll-mt-20 bg-white py-16 sm:py-20 lg:py-24 font-sans">      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 lg:mb-16 gap-6">
        <div>
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex">
              <div className="w-2.5 h-2.5 bg-[#8ec843]" />
              <div className="w-2.5 h-2.5 bg-[#0052cc]" />
            </div>
            <span className="text-[11px] font-bold tracking-[0.2em] text-slate-500 uppercase">
              Knowledge Centre
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-[3rem] lg:text-[3.5rem] leading-[1.08] font-bold text-[#0a192f] tracking-tight max-w-xl">
            Borrow <span className="text-[#0052cc] font-serif italic font-normal">smarter</span>,{' '}
            <br />
            one read at a time.
          </h2>
        </div>

        {/* Action Button */}
        <a
          href="/insights"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-200 rounded-lg text-[13px] font-bold text-[#0a192f] hover:bg-slate-50 transition-colors shadow-sm mb-2"
        >
          All articles <ArrowRightIcon className="w-4 h-4 text-slate-500 stroke-[2.25]" />
        </a>
      </div>

      {/* Content Grid */}
      {featured && (
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Featured Article */}
          <a href={`/insights/${featured.slug}`} className="lg:col-span-7 cursor-pointer group block">
            <div className="w-full aspect-[1.6] rounded-2xl overflow-hidden mb-6 bg-slate-100">
              <img
                src={featured.cover_image}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
              />
            </div>

            <div className="flex items-center gap-2.5 text-[13px] mb-3">
              <span className="font-bold text-[#0052cc]">{featured.category}</span>
              <span className="text-slate-300 text-xs">■</span>
              <span className="text-slate-400 font-medium">{featured.read_time}</span>
            </div>

            <h3 className="text-2xl sm:text-[1.75rem] leading-tight font-bold text-[#0a192f] mb-4 group-hover:text-[#0052cc] transition-colors">
              {featured.title}
            </h3>

            <p className="text-slate-500 text-[15px] leading-relaxed max-w-xl">
              {featured.excerpt}
            </p>
          </a>

          {/* Right Column: Article List */}
          <div className="lg:col-span-5 flex flex-col justify-between pt-2 divide-y divide-slate-100">
            {sideArticles.map((article, idx) => (
              <a
                key={article.id}
                href={`/insights/${article.slug}`}
                className={`flex gap-5 sm:gap-6 cursor-pointer group ${idx === 0 ? 'pb-7' : idx === sideArticles.length - 1 ? 'pt-7' : 'py-7'
                  }`}
              >
                <div className="w-[7.5rem] sm:w-[8.5rem] h-[5.25rem] sm:h-[5.5rem] rounded-xl overflow-hidden shrink-0 bg-slate-100">
                  <img
                    src={article.cover_image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[12px] font-bold text-[#558b2f] mb-1.5">
                    {article.category}
                  </span>
                  <h4 className="text-[15px] sm:text-[16px] font-bold text-[#0a192f] leading-snug mb-2 group-hover:text-[#0052cc] transition-colors pr-2">
                    {article.title}
                  </h4>
                  <span className="text-[13px] text-slate-400 font-medium">
                    {article.read_time}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
    </section>
  );
}