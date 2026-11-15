import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';

type Section = 'loan_applications' | 'contact_queries';
type DbRow = Record<string, unknown>;

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<Section>('loan_applications');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [applications, setApplications] = useState<DbRow[]>([]);
  const [queries, setQueries] = useState<DbRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRow, setSelectedRow] = useState<DbRow | null>(null);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);

    const [appsRes, queriesRes] = await Promise.all([
      supabase
        .from('loan_applications')
        .select('*')
        .order('created_at', { ascending: false }),
      supabase
        .from('contact_queries')
        .select('*')
        .order('created_at', { ascending: false }),
    ]);

    // Fallback if table doesn't have a created_at column
    if (appsRes.error?.code === '42703') {
      const retryApps = await supabase.from('loan_applications').select('*');
      if (retryApps.error) setError(retryApps.error.message);
      else setApplications(retryApps.data ?? []);
    } else if (appsRes.error) {
      setError(appsRes.error.message);
    } else {
      setApplications(appsRes.data ?? []);
    }

    if (queriesRes.error?.code === '42703') {
      const retryQueries = await supabase.from('contact_queries').select('*');
      if (retryQueries.error) setError(retryQueries.error.message);
      else setQueries(retryQueries.data ?? []);
    } else if (queriesRes.error) {
      setError(queriesRes.error.message);
    } else {
      setQueries(queriesRes.data ?? []);
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
    if (!row.id) return;
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
    // Put id last or omit from primary table view if plenty of other fields exist
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

  const navItems: { id: Section; label: string; count: number }[] = [
    {
      id: 'loan_applications',
      label: 'Loan Applications',
      count: applications.length,
    },
    {
      id: 'contact_queries',
      label: 'Contact Queries',
      count: queries.length,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Mobile Top Header */}
      <div className="lg:hidden flex items-center justify-between bg-white border-b px-4 py-3 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            className="p-2 rounded-lg border text-gray-700 hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="font-bold text-gray-900">Saiban Admin</span>
        </div>
        <button
          onClick={handleLogout}
          className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          Sign Out
        </button>
      </div>

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Side Navbar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r flex flex-col justify-between transform transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          <div className="h-16 px-6 flex items-center justify-between border-b">
            <span className="text-lg font-bold tracking-tight text-gray-900">Saiban Admin</span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
          </div>

          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setSearchTerm('');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {item.count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t hidden lg:block">
          <button
            onClick={handleLogout}
            className="w-full py-2.5 px-4 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Section Header & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {activeSection === 'loan_applications'
                  ? 'Loan Applications'
                  : 'Contact Queries'}
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Showing {filteredRows.length} of {currentRows.length} total records
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <input
                type="text"
                placeholder="Search records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3.5 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 w-full sm:w-64"
              />
              <button
                onClick={fetchAllData}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium bg-white border rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                {loading ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
              Error loading data: {error}
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="bg-white rounded-xl border p-12 text-center text-sm text-gray-500">
              Fetching records from Supabase...
            </div>
          ) : filteredRows.length === 0 ? (
            <div className="bg-white rounded-xl border p-12 text-center text-sm text-gray-500">
              No records found.
            </div>
          ) : (
            <>
              {/* Desktop / Tablet Data Table */}
              <div className="hidden md:block bg-white rounded-xl border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        {columns.map((col) => (
                          <th key={col} className="py-3.5 px-4 whitespace-nowrap">
                            {formatHeader(col)}
                          </th>
                        ))}
                        <th className="py-3.5 px-4 text-right whitespace-nowrap">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                      {filteredRows.map((row, idx) => (
                        <tr
                          key={String(row.id ?? idx)}
                          className="hover:bg-gray-50/80 transition-colors"
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
                          <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-2">
                            <button
                              onClick={() => setSelectedRow(row)}
                              className="px-2.5 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                            >
                              View
                            </button>
                            {row.id !== undefined && (
                              <button
                                onClick={() => handleDelete(row)}
                                className="px-2.5 py-1 text-xs font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100"
                              >
                                Delete
                              </button>
                            )}
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
                    className="bg-white rounded-xl border p-4 shadow-sm space-y-3"
                  >
                    <div className="space-y-2">
                      {columns.slice(0, 5).map((col) => (
                        <div key={col} className="flex justify-between gap-4 text-sm">
                          <span className="text-gray-500 font-medium shrink-0">
                            {formatHeader(col)}:
                          </span>
                          <span className="text-gray-900 text-right truncate">
                            {formatCellValue(col, row[col])}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedRow(row)}
                        className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg"
                      >
                        Full Details
                      </button>
                      {row.id !== undefined && (
                        <button
                          onClick={() => handleDelete(row)}
                          className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Record Detail Modal */}
      {selectedRow && (
        <div
          onClick={() => setSelectedRow(null)}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-xl"
          >
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Record Details</h2>
              <button
                onClick={() => setSelectedRow(null)}
                className="text-gray-400 hover:text-gray-700 text-lg"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              {Object.entries(selectedRow).map(([key, value]) => (
                <div key={key} className="border-b border-gray-100 pb-3 last:border-b-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {formatHeader(key)}
                  </p>
                  <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap break-words">
                    {formatCellValue(key, value)}
                  </p>
                </div>
              ))}
            </div>

            <div className="px-6 py-3 bg-gray-50 border-t rounded-b-2xl flex justify-end">
              <button
                onClick={() => setSelectedRow(null)}
                className="px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800"
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