import { useEffect, useMemo, useState } from 'react';
import {
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  BookOpenIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { supabase } from '../lib/supabase';
import { fetchAllArticlesAdmin } from '../lib/articlesStore';
import AdminArticlesManager from '../components/AdminArticlesManager';

type Section = 'loan_applications' | 'contact_queries' | 'articles';
type DbRow = Record<string, unknown>;

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<Section>('loan_applications');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [applications, setApplications] = useState<DbRow[]>([]);
  const [queries, setQueries] = useState<DbRow[]>([]);
  const [articlesCount, setArticlesCount] = useState<number>(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRow, setSelectedRow] = useState<DbRow | null>(null);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);

    const [appsRes, queriesRes, articlesRes] = await Promise.allSettled([
      supabase
        .from('loan_applications')
        .select('*')
        .order('created_at', { ascending: false }),
      supabase
        .from('contact_queries')
        .select('*')
        .order('created_at', { ascending: false }),
      fetchAllArticlesAdmin(),
    ]);

    if (appsRes.status === 'fulfilled') {
      const res = appsRes.value;
      if (res.error?.code === '42703') {
        const retryApps = await supabase.from('loan_applications').select('*');
        if (retryApps.error) setError(retryApps.error.message);
        else setApplications(retryApps.data ?? []);
      } else if (res.error) {
        setError(res.error.message);
      } else {
        setApplications(res.data ?? []);
      }
    }

    if (queriesRes.status === 'fulfilled') {
      const res = queriesRes.value;
      if (res.error?.code === '42703') {
        const retryQueries = await supabase.from('contact_queries').select('*');
        if (retryQueries.error) setError(retryQueries.error.message);
        else setQueries(retryQueries.data ?? []);
      } else if (res.error) {
        setError(res.error.message);
      } else {
        setQueries(res.data ?? []);
      }
    }

    if (articlesRes.status === 'fulfilled') {
      setArticlesCount(articlesRes.value.length);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/admin/login';
  };

  const handleDelete = async (row: DbRow) => {
    if (!row.id || activeSection === 'articles') return;
    const confirmed = window.confirm('Delete this record permanently?');
    if (!confirmed) return;

    const { error: deleteError } = await supabase
      .from(activeSection)
      .delete()
      .eq('id', row.id);

    if (deleteError) {
      alert(`Failed to delete: ${deleteError.message}`);
      return;
    }

    if (activeSection === 'loan_applications') {
      setApplications((prev) => prev.filter((item) => item.id !== row.id));
    } else {
      setQueries((prev) => prev.filter((item) => item.id !== row.id));
    }
    if (selectedRow?.id === row.id) setSelectedRow(null);
  };

  const currentRows = activeSection === 'loan_applications' ? applications : queries;

  const filteredRows = useMemo(() => {
    if (!searchTerm.trim()) return currentRows;
    const lower = searchTerm.toLowerCase();
    return currentRows.filter((row) =>
      Object.values(row).some((val) =>
        String(val ?? '')
          .toLowerCase()
          .includes(lower)
      )
    );
  }, [currentRows, searchTerm]);

  const columns = useMemo(() => {
    if (currentRows.length === 0) return [];
    const keys = Object.keys(currentRows[0]);
    return keys.filter((k) => k !== 'id');
  }, [currentRows]);

  const formatHeader = (key: string) =>
    key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());

  const formatCellValue = (key: string, value: unknown) => {
    if (value === null || value === undefined || value === '') return '—';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (
      (key.includes('created_at') || key.includes('updated_at') || key.includes('date')) &&
      typeof value === 'string'
    ) {
      const parsed = new Date(value);
      if (!isNaN(parsed.getTime())) {
        return parsed.toLocaleString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
      }
    }
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  };

  const navItems: {
    id: Section;
    label: string;
    count: number;
    icon: typeof DocumentTextIcon;
  }[] = [
    {
      id: 'loan_applications',
      label: 'Loan Applications',
      count: applications.length,
      icon: DocumentTextIcon,
    },
    {
      id: 'contact_queries',
      label: 'Contact Queries',
      count: queries.length,
      icon: ChatBubbleLeftRightIcon,
    },
    {
      id: 'articles',
      label: 'Articles & Guides',
      count: articlesCount,
      icon: BookOpenIcon,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fc] flex flex-col lg:flex-row font-sans">
      {/* Mobile Top Header */}
      <header className="lg:hidden flex items-center justify-between bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            className="p-2 rounded-xl border border-slate-200 text-[#0a192f] hover:bg-slate-50"
          >
            <Bars3Icon className="w-5 h-5" />
          </button>
          <div>
            <span className="font-extrabold text-sm text-[#0a192f] block leading-tight">
              Saiban Admin
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0052cc]">
              {navItems.find((n) => n.id === activeSection)?.label}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200"
        >
          <ArrowRightOnRectangleIcon className="w-4 h-4" />
          Sign Out
        </button>
      </header>

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Side Navbar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-68 bg-white border-r border-slate-200 flex flex-col justify-between transform transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="flex">
                <span className="w-2.5 h-2.5 bg-[#8ec843]" />
                <span className="w-2.5 h-2.5 bg-[#0052cc]" />
              </div>
              <span className="text-base font-extrabold tracking-tight text-[#0a192f]">
                Saiban Admin
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close menu"
              className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="px-4 pt-5 pb-2">
            <p className="px-3 text-[10px] font-extrabold uppercase tracking-[.16em] text-slate-400">
              Management
            </p>
          </div>

          <nav className="px-4 space-y-1.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveSection(item.id);
                    setSearchTerm('');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#0a192f] text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-[#0a192f]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-[#a9d56c]' : 'text-slate-400'
                      }`}
                    />
                    {item.label}
                  </span>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-extrabold ${
                      isActive
                        ? 'bg-white/15 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-100 space-y-2">
          <a
            href="/"
            className="w-full flex items-center justify-center py-2 px-4 text-xs font-bold text-[#0052cc] bg-blue-50/70 rounded-xl hover:bg-blue-50 transition-colors"
          >
            View Live Website →
          </a>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
          >
            <ArrowRightOnRectangleIcon className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {activeSection === 'articles' ? (
            <AdminArticlesManager />
          ) : (
            <>
              {/* Section Header & Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#0052cc]">
                    Submissions
                  </span>
                  <h1 className="mt-1 text-2xl font-extrabold text-[#0a192f]">
                    {activeSection === 'loan_applications'
                      ? 'Loan Applications'
                      : 'Contact Queries'}
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Showing {filteredRows.length} of {currentRows.length} total records
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="relative">
                    <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search records..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 pr-3.5 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0052cc] w-full sm:w-64"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={fetchAllData}
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold bg-white border border-slate-200 rounded-xl text-[#0a192f] hover:bg-slate-50 disabled:opacity-50"
                  >
                    <ArrowPathIcon className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                    {loading ? 'Refreshing...' : 'Refresh'}
                  </button>
                </div>
              </div>

              {/* Error Banner */}
              {error && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs font-medium text-rose-700">
                  Error loading data: {error}
                </div>
              )}

              {/* Loading State */}
              {loading ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-500">
                  Fetching records from Supabase...
                </div>
              ) : filteredRows.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-500">
                  No records found.
                </div>
              ) : (
                <>
                  {/* Desktop / Tablet Data Table */}
                  <div className="hidden md:block bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                            {columns.map((col) => (
                              <th key={col} className="py-3.5 px-4 whitespace-nowrap">
                                {formatHeader(col)}
                              </th>
                            ))}
                            <th className="py-3.5 px-4 text-right whitespace-nowrap">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                          {filteredRows.map((row, idx) => (
                            <tr
                              key={String(row.id ?? idx)}
                              className="hover:bg-slate-50/80 transition-colors"
                            >
                              {columns.map((col) => (
                                <td
                                  key={col}
                                  className="py-3.5 px-4 max-w-xs truncate"
                                  title={formatCellValue(col, row[col])}
                                >
                                  {formatCellValue(col, row[col])}
                                </td>
                              ))}
                              <td className="py-3.5 px-4 text-right whitespace-nowrap">
                                <div className="inline-flex items-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => setSelectedRow(row)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-[#0a192f] bg-slate-100 rounded-lg hover:bg-slate-200"
                                  >
                                    <EyeIcon className="w-3.5 h-3.5" />
                                    View
                                  </button>
                                  {row.id !== undefined && (
                                    <button
                                      type="button"
                                      onClick={() => handleDelete(row)}
                                      className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100"
                                    >
                                      <TrashIcon className="w-3.5 h-3.5" />
                                      Delete
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Mobile Card Stack */}
                  <div className="grid grid-cols-1 gap-4 md:hidden">
                    {filteredRows.map((row, idx) => (
                      <div
                        key={String(row.id ?? idx)}
                        className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3"
                      >
                        <div className="space-y-2">
                          {columns.slice(0, 5).map((col) => (
                            <div key={col} className="flex justify-between gap-4 text-xs">
                              <span className="text-slate-500 font-semibold shrink-0">
                                {formatHeader(col)}:
                              </span>
                              <span className="text-[#0a192f] font-medium text-right truncate">
                                {formatCellValue(col, row[col])}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedRow(row)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-[#0a192f] bg-slate-100 rounded-lg"
                          >
                            <EyeIcon className="w-3.5 h-3.5" />
                            Full Details
                          </button>
                          {row.id !== undefined && (
                            <button
                              type="button"
                              onClick={() => handleDelete(row)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-rose-600 bg-rose-50 rounded-lg"
                            >
                              <TrashIcon className="w-3.5 h-3.5" />
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </main>

      {/* Record Detail Modal */}
      {selectedRow && (
        <div
          onClick={() => setSelectedRow(null)}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl"
          >
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-extrabold text-[#0a192f]">Record Details</h2>
              <button
                type="button"
                onClick={() => setSelectedRow(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              {Object.entries(selectedRow).map(([key, value]) => (
                <div key={key} className="border-b border-slate-100 pb-3 last:border-b-0">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    {formatHeader(key)}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-[#0a192f] whitespace-pre-wrap break-words">
                    {formatCellValue(key, value)}
                  </p>
                </div>
              ))}
            </div>

            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 rounded-b-3xl flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedRow(null)}
                className="px-4 py-2 text-xs font-bold bg-[#0a192f] text-white rounded-xl hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}