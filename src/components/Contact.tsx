// Tailwind custom colors required in tailwind.config.js:
// colors: { lapis: '#1a3a5c', gold: '#d4a843', pomegranate: '#a83232', ivory: '#faf6f0', charcoal: '#1a1a2e' }

import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useToast } from './ui/Toast';
import { SectionDivider } from './About';

const GOOGLE_MAPS_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2686.9!2d-122.3148!3d47.6616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490148b0a0d1fa3%3A0x7e82a60e5e8e05b!2s405%20NE%2045th%20St%2C%20Seattle%2C%20WA%2098105!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus';

export default function Contact() {
  const { addToast } = useToast();
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    // Simulate submission
    setTimeout(() => {
      addToast('Message sent! We will get back to you soon.', 'success');
      setForm({ name: '', email: '', message: '' });
      setSending(false);
    }, 800);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      id="contact"
      className="relative py-20 sm:py-28 bg-[#faf6f0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          ref={sectionRef}
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-['Playfair_Display',serif] text-4xl sm:text-5xl font-bold text-[#1a1a2e]">
            Visit Us
          </h2>
          <SectionDivider />
          <p className="text-[#1a3a5c]/60 text-sm uppercase tracking-[0.25em] font-medium">
            We'd Love to Hear From You
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Left: contact info + form */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-8'
            }`}
          >
            {/* Contact details */}
            <div className="space-y-6 mb-10">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#1a3a5c]/5 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#d4a843]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-[#1a1a2e] text-sm uppercase tracking-wider">
                    Address
                  </p>
                  <p className="text-[#1a1a2e]/70 mt-1">
                    405 NE 45th St<br />Seattle, WA 98105
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#1a3a5c]/5 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#d4a843]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-[#1a1a2e] text-sm uppercase tracking-wider">
                    Phone
                  </p>
                  <a
                    href="tel:+12064660566"
                    className="text-[#1a1a2e]/70 mt-1 block hover:text-[#d4a843] transition-colors"
                  >
                    (206) 466-0566
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#1a3a5c]/5 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#d4a843]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-[#1a1a2e] text-sm uppercase tracking-wider">
                    Hours
                  </p>
                  <p className="text-[#1a1a2e]/70 mt-1">
                    10:00 AM – 8:00 PM
                  </p>
                  <p className="text-[#1a1a2e]/50 text-sm">
                    Open 7 days a week
                  </p>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-['Playfair_Display',serif] text-xl font-bold text-[#1a1a2e] mb-2">
                Send Us a Message
              </h3>

              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold text-[#1a1a2e]/60 uppercase tracking-wider mb-1.5">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl border border-[#1a3a5c]/15 bg-white text-[#1a1a2e] placeholder:text-[#1a1a2e]/30 focus:outline-none focus:ring-2 focus:ring-[#d4a843]/40 focus:border-[#d4a843] transition-all text-sm"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-semibold text-[#1a1a2e]/60 uppercase tracking-wider mb-1.5">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-[#1a3a5c]/15 bg-white text-[#1a1a2e] placeholder:text-[#1a1a2e]/30 focus:outline-none focus:ring-2 focus:ring-[#d4a843]/40 focus:border-[#d4a843] transition-all text-sm"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-[#1a1a2e]/60 uppercase tracking-wider mb-1.5">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 rounded-xl border border-[#1a3a5c]/15 bg-white text-[#1a1a2e] placeholder:text-[#1a1a2e]/30 focus:outline-none focus:ring-2 focus:ring-[#d4a843]/40 focus:border-[#d4a843] transition-all text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="
                  w-full py-3.5 rounded-xl
                  bg-[#1a3a5c] text-white
                  font-semibold text-sm uppercase tracking-wider
                  transition-all duration-300
                  hover:bg-[#d4a843] hover:text-[#1a1a2e]
                  disabled:opacity-50 disabled:cursor-not-allowed
                  active:scale-[0.98]
                "
              >
                {sending ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Right: Google Maps */}
          <div
            className={`transition-all duration-700 delay-400 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="rounded-2xl overflow-hidden shadow-xl shadow-[#1a3a5c]/10 border border-[#1a3a5c]/10 h-full min-h-[400px] lg:min-h-[600px]">
              <iframe
                src={GOOGLE_MAPS_EMBED}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Caravan Restaurant location on Google Maps"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
