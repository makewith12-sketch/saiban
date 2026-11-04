// src/pages/ApplyPage.tsx
import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Header from '../components/header';
import Footer from '../components/footer';
import { supabase } from '../lib/supabase';
import {
  Building2,
  ShieldCheck,
  Home,
  CheckCircle2,
  FileDown,
  ArrowRight,
  Loader2,
  Lock,
  Sparkles
} from 'lucide-react';

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    loanAmount: '',
    whatsappNumber: '',
    loanTenor: '',
    purposeOfLoan: '',
    collateralType: '',
    collateralValue: '',
    email: '',
    discoverySource: 'Google',
    agreedToTerms: false,
  });

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
    if (token) {
      setCaptchaError(false);
    }
  };

  const handleCaptchaExpired = () => {
    setCaptchaToken(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!formData.agreedToTerms) {
      alert('Please agree to the Terms and Conditions.');
      return;
    }

    if (!captchaToken) {
      setCaptchaError(true);
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from('loan_applications').insert([
        {
          company_name: formData.companyName,
          loan_amount: Number(formData.loanAmount),
          whatsapp_number: formData.whatsappNumber,
          loan_tenor: Number(formData.loanTenor),
          purpose_of_loan: formData.purposeOfLoan,
          collateral_type: formData.collateralType,
          collateral_value: Number(formData.collateralValue),
          email: formData.email,
          discovery_source: formData.discoverySource,
        },
      ]);

      if (error) {
        throw error;
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Supabase error:', err);
      setSubmitError(err.message || 'Something went wrong while submitting your application.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfd] font-sans text-slate-800">
      <style dangerouslySetInnerHTML={{__html: `
        .apply-grid-bg {
          background-size: 32px 32px;
          background-image: 
            linear-gradient(to right, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.02) 1px, transparent 1px);
        }
      `}} />

      <Header />

      <main className="flex-1 py-12 md:py-20 apply-grid-bg">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          
          <div className="mb-12 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-semibold text-[#0052cc] border border-blue-100">
              <Sparkles className="h-3.5 w-3.5 text-[#0052cc]" />
              Institutional Underwriting
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0a192f]">
              Borrow with clarity. <br />
              <span className="text-[#0052cc]">Grow with confidence.</span>
            </h1>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              Direct institutional financing with transparent collateral assessment, optimal terms, and dedicated relationship managers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* LEFT COLUMN: Criteria */}
            <div className="lg:col-span-5 space-y-5">
              <div className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md hover:border-blue-100 transition duration-200">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0052cc] group-hover:bg-[#0052cc] group-hover:text-white transition duration-200">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0a192f]">Positive Cash flow business</h3>
                    <p className="mt-0.5 text-xs italic text-[#0052cc] font-medium">Business income must repay the loan</p>
                    <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>Stable monthly revenue</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>Clear banking track record</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>EMI affordability</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>Regular GST & ITR filings</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md hover:border-blue-100 transition duration-200">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition duration-200">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0a192f]">Trustworthy Borrower</h3>
                    <p className="mt-0.5 text-xs italic text-indigo-600 font-medium">Integrity is non-negotiable</p>
                    <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>Market Reputation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>Personal networth</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>Good credit history</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>Transparent documentation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md hover:border-blue-100 transition duration-200">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition duration-200">
                    <Home className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0a192f]">Strong Collateral (2-3x)</h3>
                    <p className="mt-0.5 text-xs italic text-emerald-600 font-medium">Weak collateral = No Deal</p>
                    <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>Prime real estate</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>Clear title property</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>Mortgageable - Commercial/ Industrial / Residential</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-[#0a192f] p-4 text-white shadow-sm">
                <Lock className="h-5 w-5 text-blue-400 shrink-0" />
                <p className="text-xs text-slate-300">
                  Bank-grade 256-bit encryption. Your financial data is securely assessed solely for underwriting.
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-xl shadow-slate-200/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-[#0a192f]">
                      Apply for Business Loan
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Direct submission to credit assessment team.
                    </p>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => window.open('#', '_blank')}
                    className="inline-flex items-center gap-2 self-start sm:self-auto rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0052cc] border border-blue-200/60 px-3.5 py-2 text-xs font-semibold shadow-sm transition active:scale-95"
                  >
                    <FileDown className="h-3.5 w-3.5" />
                    <span>Business Loan Requirements</span>
                  </button>
                </div>

                {submitError && (
                  <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                    {submitError}
                  </div>
                )}

                {submitted ? (
                  <div className="my-10 text-center py-8">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
                      <CheckCircle2 className="h-7 w-7" />
                    </div>
                    <h4 className="text-lg font-bold text-[#0a192f]">Application Submitted Successfully!</h4>
                    <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto">
                      Thank you. Your details are saved securely. A loan officer will review your requirements and reach out within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setCaptchaToken(null);
                        recaptchaRef.current?.reset();
                      }}
                      className="mt-6 rounded-xl bg-[#0052cc] px-6 py-2.5 text-xs font-semibold text-white hover:bg-[#003d8f] transition shadow-[0_4px_14px_rgba(0,82,204,0.25)]"
                    >
                      Submit Another Application
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          name="companyName"
                          required
                          placeholder="Company Name"
                          value={formData.companyName}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0052cc] focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition"
                        />
                      </div>

                      <div>
                        <input
                          type="number"
                          name="loanAmount"
                          required
                          placeholder="Loan Amount (₹)"
                          value={formData.loanAmount}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0052cc] focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition"
                        />
                      </div>

                      <div>
                        <input
                          type="tel"
                          name="whatsappNumber"
                          required
                          placeholder="Whatsapp Number"
                          value={formData.whatsappNumber}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0052cc] focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition"
                        />
                      </div>

                      <div>
                        <input
                          type="number"
                          name="loanTenor"
                          required
                          placeholder="Loan Tenor (Months)"
                          value={formData.loanTenor}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0052cc] focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition"
                        />
                      </div>

                      <div>
                        <select
                          name="purposeOfLoan"
                          required
                          value={formData.purposeOfLoan}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 focus:border-[#0052cc] focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition"
                        >
                          <option value="">Purpose Of Loan</option>
                          <option value="Working Capital">Working Capital</option>
                          <option value="Business Expansion">Business Expansion</option>
                          <option value="Machinery Purchase">Machinery Purchase</option>
                          <option value="Debt Consolidation">Debt Consolidation</option>
                        </select>
                      </div>

                      <div>
                        <select
                          name="collateralType"
                          required
                          value={formData.collateralType}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 focus:border-[#0052cc] focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition"
                        >
                          <option value="">Type Of Collateral</option>
                          <option value="Commercial Property">Commercial Property</option>
                          <option value="Industrial Land">Industrial Land</option>
                          <option value="Residential Property">Residential Property</option>
                          <option value="Plant & Machinery">Plant & Machinery</option>
                        </select>
                      </div>

                      <div>
                        <input
                          type="number"
                          name="collateralValue"
                          required
                          placeholder="Value of Collateral (in Rs.)"
                          value={formData.collateralValue}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0052cc] focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition"
                        />
                      </div>

                      <div>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="Email ID"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0052cc] focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                        How did you get to know about us?
                      </label>
                      <select
                        name="discoverySource"
                        value={formData.discoverySource}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 focus:border-[#0052cc] focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition"
                      >
                        <option value="Google">Google</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="DSA Channel">DSA / Channel Partner</option>
                        <option value="Referral">Business Referral</option>
                      </select>
                    </div>

                    <div className="flex items-start gap-2.5 pt-1">
                      <input
                        id="terms"
                        name="agreedToTerms"
                        type="checkbox"
                        checked={formData.agreedToTerms}
                        onChange={handleChange}
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#0052cc] focus:ring-[#0052cc]"
                      />
                      <label htmlFor="terms" className="text-xs text-slate-600 leading-snug">
                        I have read and agree to the{' '}
                        <a href="#terms" className="text-[#0052cc] underline font-medium hover:text-[#003d8f]">
                          Terms and Conditions
                        </a>
                      </label>
                    </div>

                    {/* Google reCAPTCHA */}
                    <div className="pt-2">
                      <div className="overflow-hidden rounded-xl w-fit">
                        <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey={
                            import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
                            "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                          }
                          onChange={handleCaptchaChange}
                          onExpired={handleCaptchaExpired}
                        />
                      </div>
                      {captchaError && (
                        <p className="mt-1.5 text-xs text-rose-600 font-medium">
                          Please complete the CAPTCHA to verify you are human.
                        </p>
                      )}
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0052cc] hover:bg-[#003d8f] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(0,82,204,0.25)] transition active:scale-[0.98] disabled:opacity-70 cursor-pointer"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Submitting to Portal...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Application</span>
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}