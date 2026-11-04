// src/pages/ContactPage.tsx
import React, { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { supabase } from '../lib/supabase';
import { Phone, Mail, MapPin, Send, CheckCircle2, Loader2, Clock } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError(null);

    try {
      const { error } = await supabase.from('contact_queries').insert([
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        },
      ]);

      if (error) {
        throw error;
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Supabase contact submission error:', err);
      setSubmitError(err.message || 'Failed to submit your message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfd] font-sans text-slate-800">
      <Header />

      <main className="flex-1 py-14 md:py-20">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          
          <div className="mb-12 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-semibold text-[#0052cc]">
              Always Here to Help
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0a192f]">
              Let&apos;s talk about your <br />
              <span className="text-[#0052cc]">borrowing needs.</span>
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Have questions regarding loan eligibility, documentation, or interest rates? Our advisors are ready to assist.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-slate-200/50 p-6 sm:p-10 lg:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* LEFT COLUMN */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Get in touch with us
                    </span>
                    <span className="h-0.5 w-8 bg-[#0052cc]"></span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a192f] tracking-tight">
                    Ask for your query
                  </h2>
                </div>

                <div className="space-y-6 divide-y divide-slate-100">
                  <div className="flex items-start gap-4 pt-4 first:pt-0">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0052cc] text-white shadow-md shadow-blue-500/20">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0a192f]">Call Us</h4>
                      <a href="tel:+919101125757" className="text-sm font-medium text-slate-600 hover:text-[#0052cc] transition">
                        +91 91011 25757
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 pt-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0052cc] text-white shadow-md shadow-blue-500/20">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0a192f]">Write Email</h4>
                      <a href="mailto:hello@saibancapital.in" className="text-sm font-medium text-slate-600 hover:text-[#0052cc] transition">
                        hello@saibancapital.in
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 pt-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0052cc] text-white shadow-md shadow-blue-500/20">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0a192f]">Visit Office</h4>
                      <p className="text-sm text-slate-600 leading-relaxed mt-0.5">
                        Bangalore, Karnataka – 560001
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 flex items-center gap-3 text-xs text-slate-600">
                  <Clock className="h-4 w-4 text-[#0052cc] shrink-0" />
                  <span>Business hours: Monday to Saturday, 9:30 AM – 6:30 PM IST</span>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl bg-white lg:p-4">
                  <h3 className="text-2xl font-bold tracking-tight text-[#0a192f] mb-6">
                    Contact Form
                  </h3>

                  {submitError && (
                    <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                      {submitError}
                    </div>
                  )}

                  {submitted ? (
                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-8 text-center my-6">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-3">
                        <CheckCircle2 className="h-7 w-7" />
                      </div>
                      <h4 className="text-lg font-bold text-[#0a192f]">Query Submitted!</h4>
                      <p className="text-xs text-slate-600 mt-2 max-w-sm mx-auto">
                        Thank you for reaching out. An advisory specialist will review your request and contact you shortly.
                      </p>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
                        }}
                        className="mt-6 rounded-xl bg-[#0052cc] px-5 py-2 text-xs font-semibold text-white hover:bg-[#003d8f] transition"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <input
                            type="text"
                            name="firstName"
                            required
                            placeholder="First Name*"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0052cc] focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            name="lastName"
                            required
                            placeholder="Last Name*"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0052cc] focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <input
                            type="email"
                            name="email"
                            required
                            placeholder="Email*"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0052cc] focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition"
                          />
                        </div>
                        <div>
                          <input
                            type="tel"
                            name="phone"
                            required
                            placeholder="Phone Number*"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0052cc] focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition"
                          />
                        </div>
                      </div>

                      <div>
                        <textarea
                          name="message"
                          rows={4}
                          required
                          placeholder="Message"
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0052cc] focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition"
                        />
                      </div>

                      <div>
                        <button
                          type="submit"
                          disabled={loading}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0052cc] hover:bg-[#003d8f] px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition active:scale-[0.98] disabled:opacity-70 cursor-pointer"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Sending to Supabase...</span>
                            </>
                          ) : (
                            <>
                              <span>Submit</span>
                              <Send className="h-4 w-4" />
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
        </div>
      </main>

      <Footer />
    </div>
  );
}