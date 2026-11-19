import { supabase } from './supabase';

export interface ArticleRecord {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  read_time: string;
  cover_image: string;
  author_name: string;
  author_role: string;
  featured: boolean;
  status: 'published' | 'draft';
  created_at: string;
  updated_at?: string;
}

export type ArticleInput = Omit<ArticleRecord, 'id' | 'created_at' | 'updated_at'>;

export const DEFAULT_ARTICLES: ArticleRecord[] = [
  {
    id: 'seed-1',
    slug: 'fixed-or-floating-choosing-the-right-home-loan-rate-in-2026',
    title: 'Fixed or floating? Choosing the right home loan rate in 2026',
    excerpt:
      'How repo-linked rates work, when a fixed rate makes sense, and what to ask your lender before you sign.',
    content: `Choosing between a fixed and a floating interest rate is one of the highest-impact decisions in any residential property or project finance mandate. Over a 15-to-20-year tenure, even a 45 bps spread alters total interest outgo significantly.

## 1. How Repo-Linked Floating Rates Work
Most scheduled commercial banks link retail and mortgage floating rates directly to the RBI Repo Rate (External Benchmark Lending Rate — EBLR). When the policy rate moves, your reset clause—typically quarterly—adjusts your EMI or residual tenure.

## 2. When a Fixed or Hybrid Rate Makes Sense
A pure fixed-rate facility locks your repayment schedule against upward rate cycles, making cash-flow forecasting predictable. However, fixed rates usually carry a 100–175 bps premium over floating benchmarks and may include prepayment restrictions.

## 3. Five Questions to Ask Before Signing
* **Reset Frequency:** Does the lender reset rates every quarter or semi-annually?
* **Spread Lock:** Is the bank's spread over the external benchmark fixed for the full tenure unless credit risk changes?
* **Part-Prepayment Terms:** Are partial prepayments from own sources penalty-free?
* **Conversion Option:** Can you switch from fixed to floating (or vice versa) later, and at what fee?
* **Sanction vs. Disbursal Rate:** Does the quoted rate apply on the sanction date or the actual tranche disbursal date?`,
    category: 'Home Loans',
    read_time: '8 min read',
    cover_image:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    author_name: 'Salauddin Ahamad Shaikh',
    author_role: 'CEO & Managing Director, Saiban Capital',
    featured: true,
    status: 'published',
    created_at: '2026-11-10T09:00:00.000Z',
  },
  {
    id: 'seed-2',
    slug: 'seven-habits-that-lift-your-cibil-score-in-six-months',
    title: 'Seven habits that lift your CIBIL score in six months',
    excerpt:
      'Practical credit-hygiene steps borrowers and business promoters use to strengthen underwriting readiness.',
    content: `Lenders evaluate repayment consistency, credit utilization, and enquiry velocity before pricing any facility. Improving a borderline bureau score takes disciplined execution across six billing cycles.

## Keep Utilization Under 30%
High revolving balances on credit cards or overdraft lines signal liquidity stress. Paying down balances before the statement generation date immediately lowers reported utilization.

## Eliminate Hard-Enquiry Clusters
Submitting applications to five lenders in the same week creates multiple hard pulls. Shortlist institutions carefully before authorizing bureau checks.

## Audit Your Bureau Report for Errors
Closed loans occasionally remain marked as active or overdue due to reporting delays. Raising a formal dispute with the bureau clears stale flags within 30 days.`,
    category: 'Credit Score',
    read_time: '5 min read',
    cover_image:
      'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=900&q=80',
    author_name: 'Saiban Credit Desk',
    author_role: 'Underwriting & Advisory',
    featured: false,
    status: 'published',
    created_at: '2026-11-04T09:00:00.000Z',
  },
  {
    id: 'seed-3',
    slug: 'complete-document-checklist-before-applying-for-funding',
    title: 'The complete document checklist before applying for funding',
    excerpt:
      'Organizing KYC, GST, banking, and property records upfront shortens credit appraisal cycles.',
    content: `Incomplete files are the single biggest cause of sanction delays. Preparing a clean, indexed dossier before approaching a bank or NBFC accelerates preliminary credit sign-off.

## Core Identity & Entity Records
* Certificate of Incorporation, Partnership Deed, or Udyam Registration
* Entity PAN, GST Registration Certificate, and latest 12 months of GSTR-3B filings
* Promoter KYC documents

## Banking & Financial Statements
* Last 12 months of operative current and CC/OD account statements in original PDF format
* Audited Balance Sheet, P&L, and ITR acknowledgments for the past 2–3 financial years
* Existing debt schedule detailing lender name, sanctioned limit, EMI, and balance tenure`,
    category: 'Documents',
    read_time: '4 min read',
    cover_image:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80',
    author_name: 'Saiban Documentation Team',
    author_role: 'Proposal Structuring',
    featured: false,
    status: 'published',
    created_at: '2026-10-28T09:00:00.000Z',
  },
  {
    id: 'seed-4',
    slug: 'working-capital-vs-term-loan-what-your-msme-really-needs',
    title: 'Working capital vs term loan: what your MSME really needs',
    excerpt:
      'Matching short-term liquidity facilities and long-term capex debt to your cash conversion cycle.',
    content: `Using short-term working capital to fund fixed machinery starves day-to-day operations, while taking a rigid term loan for seasonal inventory increases interest cost unnecessarily.

## When Working Capital Fits Best
Cash Credit (CC), Overdraft (OD), and invoice discounting facilities charge interest only on the utilized amount, making them ideal for raw material procurement, receivables cycles, and seasonal peaks.

## When a Term Loan Is Right
Equipment purchases, plant expansion, and commercial fit-outs generate returns over multiple years. A structured term loan aligns principal amortization with asset cash flows.`,
    category: 'Business',
    read_time: '6 min read',
    cover_image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
    author_name: 'Saiban Corporate Advisory',
    author_role: 'MSME & Project Finance',
    featured: false,
    status: 'published',
    created_at: '2026-10-19T09:00:00.000Z',
  },
];

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export async function fetchPublishedArticles(): Promise<ArticleRecord[]> {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return DEFAULT_ARTICLES;
    }
    return data as ArticleRecord[];
  } catch {
    return DEFAULT_ARTICLES;
  }
}

export async function fetchArticleBySlug(slug: string): Promise<ArticleRecord | null> {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (!error && data) {
      return data as ArticleRecord;
    }
  } catch {
    // Fallback to local seed articles
  }
  return DEFAULT_ARTICLES.find((a) => a.slug === slug) ?? null;
}

export async function fetchAllArticlesAdmin(): Promise<ArticleRecord[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data ?? []) as ArticleRecord[];
}

export async function createArticleAdmin(payload: ArticleInput): Promise<ArticleRecord> {
  const { data, error } = await supabase
    .from('articles')
    .insert([{ ...payload, slug: slugify(payload.slug || payload.title) }])
    .select()
    .single();

  if (error) throw error;
  return data as ArticleRecord;
}

export async function updateArticleAdmin(
  id: string,
  payload: Partial<ArticleInput>
): Promise<ArticleRecord> {
  const nextPayload = {
    ...payload,
    ...(payload.slug ? { slug: slugify(payload.slug) } : {}),
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('articles')
    .update(nextPayload)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as ArticleRecord;
}

export async function deleteArticleAdmin(id: string): Promise<void> {
  const { error } = await supabase.from('articles').delete().eq('id', id);
  if (error) throw error;
}