"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react";
import { BRAND_CONFIG } from "../data/products";
import { useToast } from "../context/ToastContext";

export default function ContactPage() {
  const { success } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    success("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-charcoal text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-body text-white/60 max-w-lg mx-auto"
          >
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-display text-2xl text-charcoal mb-6">Contact Information</h2>
              <div className="space-y-4">
                <a href={`mailto:${BRAND_CONFIG.email}`} className="flex items-center gap-4 text-charcoal/70 hover:text-charcoal transition-colors">
                  <div className="w-12 h-12 bg-warm-beige/10 flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-body text-sm text-charcoal/50">Email</p>
                    <p className="font-body">{BRAND_CONFIG.email}</p>
                  </div>
                </a>

                <a href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-charcoal/70 hover:text-charcoal transition-colors">
                  <div className="w-12 h-12 bg-warm-beige/10 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-body text-sm text-charcoal/50">WhatsApp</p>
                    <p className="font-body">+{BRAND_CONFIG.whatsappNumber}</p>
                  </div>
                </a>

                <a href={BRAND_CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-charcoal/70 hover:text-charcoal transition-colors">
                  <div className="w-12 h-12 bg-warm-beige/10 flex items-center justify-center">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-body text-sm text-charcoal/50">Instagram</p>
                    <p className="font-body">{BRAND_CONFIG.instagram}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 text-charcoal/70">
                  <div className="w-12 h-12 bg-warm-beige/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-body text-sm text-charcoal/50">Location</p>
                    <p className="font-body">Pakistan</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-warm-beige/10 p-6">
              <h3 className="font-display text-lg mb-2">Business Inquiries</h3>
              <p className="font-body text-sm text-charcoal/60">
                For wholesale, collaborations, or press inquiries, please email us at{' '}
                <a href={`mailto:${BRAND_CONFIG.email}`} className="text-charcoal underline">
                  {BRAND_CONFIG.email}
                </a>
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="font-display text-2xl text-charcoal mb-6">Send us a Message</h2>

            {submitted ? (
              <div className="bg-green-50 p-8 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-xl text-charcoal mb-2">Message Sent!</h3>
                <p className="font-body text-charcoal/60 mb-4">We'll get back to you within 24 hours.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 border border-charcoal text-charcoal font-body text-sm uppercase tracking-wider hover:bg-charcoal hover:text-white transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-body text-sm text-charcoal/50 uppercase tracking-wider mb-2">Name</label>
                    <input
                      type="text" required value={formData.name} onChange={e => setFormData(p => ({...p, name: e.target.value}))}
                      className="w-full px-4 py-3 border border-warm-beige/30 font-body text-sm focus:outline-none focus:border-charcoal"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-sm text-charcoal/50 uppercase tracking-wider mb-2">Email</label>
                    <input
                      type="email" required value={formData.email} onChange={e => setFormData(p => ({...p, email: e.target.value}))}
                      className="w-full px-4 py-3 border border-warm-beige/30 font-body text-sm focus:outline-none focus:border-charcoal"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-body text-sm text-charcoal/50 uppercase tracking-wider mb-2">Subject</label>
                  <input
                    type="text" required value={formData.subject} onChange={e => setFormData(p => ({...p, subject: e.target.value}))}
                    className="w-full px-4 py-3 border border-warm-beige/30 font-body text-sm focus:outline-none focus:border-charcoal"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block font-body text-sm text-charcoal/50 uppercase tracking-wider mb-2">Message</label>
                  <textarea
                    required rows={5} value={formData.message} onChange={e => setFormData(p => ({...p, message: e.target.value}))}
                    className="w-full px-4 py-3 border border-warm-beige/30 font-body text-sm focus:outline-none focus:border-charcoal resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-charcoal text-white font-body text-sm uppercase tracking-widest hover:bg-charcoal/90 transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* FAQ */}
        <section className="mt-24">
          <h2 className="font-display text-3xl text-charcoal text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: "How long does delivery take?", a: "Standard delivery takes 3-5 business days within Pakistan. Express delivery is available for 1-2 business days." },
              { q: "What is your exchange policy?", a: "We offer a 14-day exchange policy for unworn, unwashed items with original tags. Contact us via WhatsApp to initiate an exchange." },
              { q: "Do you offer Cash on Delivery?", a: "Yes! Cash on Delivery is available across Pakistan for all orders." },
              { q: "How do I track my order?", a: "Once your order is shipped, you'll receive a tracking number via email/SMS. You can also contact us on WhatsApp for order updates." },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-warm-beige/20 p-6"
              >
                <h3 className="font-display text-lg text-charcoal mb-2">{faq.q}</h3>
                <p className="font-body text-sm text-charcoal/60">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}