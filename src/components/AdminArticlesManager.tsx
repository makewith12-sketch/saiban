import { useEffect, useState, type FormEvent } from 'react';
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  ArrowTopRightOnSquareIcon,
  StarIcon,
  XMarkIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import {
  createArticleAdmin,
  deleteArticleAdmin,
  fetchAllArticlesAdmin,
  slugify,
  updateArticleAdmin,
  type ArticleInput,
  type ArticleRecord,
} from '../lib/articlesStore';

const CATEGORIES = [
  'Home Loans',
  'Business',
  'Project Finance',
  'Mortgage',
  'Credit Score',
  'Documents',
];

const EMPTY_FORM: ArticleInput = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: 'Home Loans',
  read_time: '5 min read',
  cover_image:
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
  author_name: 'Saiban Editorial Desk',
  author_role: 'Credit & Structuring Team',
  featured: false,
  status: 'published',
};

export default function AdminArticlesManager() {
  const [articles, setArticles] = useState<ArticleRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');

  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ArticleInput>(EMPTY_FORM);

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const loadArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const rows = await fetchAllArticlesAdmin();
      setArticles(rows);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load articles. Ensure the Supabase `articles` table is created.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setEditorOpen(true);
  };

  const openEditModal = (article: ArticleRecord) => {
    setEditingId(article.id);
    setForm({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      read_time: article.read_time,
      cover_image: article.cover_image,
      author_name: article.author_name,
      author_role: article.author_role,
      featured: article.featured,
      status: article.status,
    });
    setEditorOpen(true);
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const payload: ArticleInput = {
        ...form,
        slug: slugify(form.slug || form.title),
      };

      if (editingId) {
        const updated = await updateArticleAdmin(editingId, payload);
        setArticles((prev) => prev.map((a) => (a.id === editingId ? updated : a)));
        notify('Article updated');
      } else {
        const created = await createArticleAdmin(payload);
        setArticles((prev) => [created, ...prev]);
        notify('Article published');
      }
      setEditorOpen(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save article.');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (article: ArticleRecord) => {
    const nextStatus = article.status === 'published' ? 'draft' : 'published';
    try {
      const updated = await updateArticleAdmin(article.id, { status: nextStatus });
      setArticles((prev) => prev.map((a) => (a.id === article.id ? updated : a)));
      notify(`Marked as ${nextStatus}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Status update failed');
    }
  };

  const handleToggleFeatured = async (article: ArticleRecord) => {
    try {
      const updated = await updateArticleAdmin(article.id, { featured: !article.featured });
      setArticles((prev) => prev.map((a) => (a.id === article.id ? updated : a)));
      notify(updated.featured ? 'Pinned as featured' : 'Removed from featured');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Featured update failed');
    }
  };

  const handleDelete = async (article: ArticleRecord) => {
    if (!window.confirm(`Delete "${article.title}" permanently?`)) return;
    try {
      await deleteArticleAdmin(article.id);
      setArticles((prev) => prev.filter((a) => a.id !== article.id));
      notify('Article deleted');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to delete article');
    }
  };

  const filtered = articles.filter((a) => {
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    const q = search.toLowerCase();
    const matchesQuery =
      !q ||
      a.title.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q);
    return matchesStatus && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#0052cc]">
            Knowledge Centre CMS
          </span>
          <h2 className="mt-1 text-2xl font-extrabold text-[#0a192f]">Articles &amp; Guides</h2>
          <p className="mt-1 text-xs text-slate-500">
            Create, edit, feature, or unpublish articles shown on the homepage and Insights portal.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0052cc] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#003d8f]"
        >
          <PlusIcon className="h-4 w-4 stroke-[2.25]" /> New article
        </button>
      </div>

      {/* Feedback Toast / Error */}
      {toast && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-bold text-emerald-800">
          <CheckCircleIcon className="h-4 w-4 text-emerald-600" />
          {toast}
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-medium text-rose-700">
          {error}
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, category, or summary..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-[#0a192f] outline-none focus:border-[#0052cc] focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-1.5">
          {(['all', 'published', 'draft'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setStatusFilter(tab)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold capitalize transition ${
                statusFilter === tab
                  ? 'bg-[#0a192f] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
        {loading ? (
          <div className="p-10 text-center text-xs text-slate-400">Loading articles...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-sm font-bold text-[#0a192f]">No articles found</p>
            <p className="mt-1 text-xs text-slate-500">
              Click &ldquo;New article&rdquo; to publish your first guide.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3.5">Article</th>
                  <th className="px-4 py-3.5">Category</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5 text-center">Featured</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((article) => (
                  <tr key={article.id} className="hover:bg-slate-50/80">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3.5">
                        <img
                          src={article.cover_image}
                          alt={article.title}
                          className="h-11 w-16 shrink-0 rounded-lg object-cover bg-slate-100"
                        />
                        <div className="min-w-0">
                          <div className="truncate font-bold text-[#0a192f] max-w-xs sm:max-w-md">
                            {article.title}
                          </div>
                          <div className="mt-0.5 text-[11px] text-slate-400">
                            {article.read_time} · /insights/{article.slug}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="rounded-md bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-[#0052cc]">
                        {article.category}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(article)}
                        className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition ${
                          article.status === 'published'
                            ? 'bg-[#f4faef] text-[#558b2f]'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {article.status === 'published' ? 'Published' : 'Draft'}
                      </button>
                    </td>

                    <td className="px-4 py-3.5 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleFeatured(article)}
                        title="Toggle featured article"
                        className="inline-flex rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-amber-500"
                      >
                        {article.featured ? (
                          <StarSolidIcon className="h-4 w-4 text-amber-500" />
                        ) : (
                          <StarIcon className="h-4 w-4" />
                        )}
                      </button>
                    </td>

                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <a
                          href={`/insights/${article.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          title="View live article"
                          className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-[#0052cc]"
                        >
                          <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                        </a>
                        <button
                          type="button"
                          onClick={() => openEditModal(article)}
                          title="Edit article"
                          className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-[#0052cc]"
                        >
                          <PencilSquareIcon className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(article)}
                          title="Delete article"
                          className="rounded-lg p-1.5 text-slate-500 hover:bg-rose-50 hover:text-rose-600"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {editorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[#0052cc]">
                  {editingId ? 'Edit article' : 'New article'}
                </span>
                <h3 className="text-lg font-extrabold text-[#0a192f]">
                  {editingId ? 'Update published guide' : 'Create Knowledge Centre guide'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditorOpen(false)}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-6 space-y-4 text-xs">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block font-bold text-[#0a192f]">Headline *</label>
                  <input
                    required
                    type="text"
                    value={form.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setForm((prev) => ({
                        ...prev,
                        title,
                        slug: editingId ? prev.slug : slugify(title),
                      }));
                    }}
                    placeholder="e.g., How lenders assess DSCR for project finance"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-[#0a192f] outline-none focus:border-[#0052cc]"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block font-bold text-[#0a192f]">URL Slug *</label>
                  <input
                    required
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 font-mono text-xs text-slate-700 outline-none focus:border-[#0052cc]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block font-bold text-[#0a192f]">Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-[#0a192f] outline-none focus:border-[#0052cc]"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block font-bold text-[#0a192f]">Read Time</label>
                    <input
                      type="text"
                      value={form.read_time}
                      onChange={(e) => setForm({ ...form, read_time: e.target.value })}
                      placeholder="6 min read"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-[#0a192f] outline-none focus:border-[#0052cc]"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block font-bold text-[#0a192f]">Cover Image URL *</label>
                  <input
                    required
                    type="url"
                    value={form.cover_image}
                    onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-[#0a192f] outline-none focus:border-[#0052cc]"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block font-bold text-[#0a192f]">Author Name</label>
                  <input
                    type="text"
                    value={form.author_name}
                    onChange={(e) => setForm({ ...form, author_name: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-[#0a192f] outline-none focus:border-[#0052cc]"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block font-bold text-[#0a192f]">Author Role</label>
                  <input
                    type="text"
                    value={form.author_role}
                    onChange={(e) => setForm({ ...form, author_role: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-[#0a192f] outline-none focus:border-[#0052cc]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block font-bold text-[#0a192f]">
                    Short Excerpt (Card Summary) *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={form.excerpt}
                    onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs leading-5 text-[#0a192f] outline-none focus:border-[#0052cc]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block font-bold text-[#0a192f]">
                    Full Article Body *{' '}
                    <span className="font-normal text-slate-400">
                      (Use <code>## Heading</code> for sections and <code>* Item</code> for bullets)
                    </span>
                  </label>
                  <textarea
                    required
                    rows={10}
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 font-mono text-xs leading-6 text-[#0a192f] outline-none focus:border-[#0052cc]"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-5">
                  <label className="inline-flex cursor-pointer items-center gap-2 font-bold text-[#0a192f]">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                      className="h-4 w-4 rounded border-slate-300 text-[#0052cc]"
                    />
                    Feature on homepage
                  </label>

                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value as 'published' | 'draft' })
                    }
                    className="rounded-lg border border-slate-200 px-2.5 py-1.5 font-bold text-[#0a192f]"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setEditorOpen(false)}
                    className="rounded-xl border border-slate-200 px-4 py-2.5 font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-xl bg-[#0052cc] px-5 py-2.5 font-bold text-white hover:bg-[#003d8f] disabled:opacity-60"
                  >
                    {saving ? 'Saving...' : editingId ? 'Save changes' : 'Publish article'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}