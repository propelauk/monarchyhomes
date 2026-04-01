'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MessageCircle } from 'lucide-react'
import { Button } from '@/components/Button'
import { trackEvent } from '@/components/Analytics'
import { SITE_CONFIG } from '@/lib/constants'

export function CTASection() {
  const handleContact = () => {
    trackEvent('cta_click', { location: 'cta_section', cta: 'contact' })
  }

  return (
    <section id="contact" className="py-20 md:py-28 bg-navy-900 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Icon */}
          <div className="w-16 h-16 bg-gold-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-8 h-8 text-navy-900" />
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-6">
            Get In Touch With Us
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            Have questions about property management? We&apos;re here to help. Reach out by phone or email and we&apos;ll get back to you promptly.
          </p>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10">
            <a 
              href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
              onClick={handleContact}
              className="flex items-center space-x-3 text-white hover:text-gold-500 transition-colors"
            >
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-lg font-medium">{SITE_CONFIG.phone}</span>
            </a>
            <a 
              href={`mailto:${SITE_CONFIG.email}`}
              onClick={handleContact}
              className="flex items-center space-x-3 text-white hover:text-gold-500 transition-colors"
            >
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-lg font-medium">{SITE_CONFIG.email}</span>
            </a>
          </div>

          {/* CTA Button */}
          <Button
            href="/contact"
            variant="primary"
            size="lg"
            onClick={handleContact}
          >
            Send Us a Message
          </Button>

          {/* Trust Text */}
          <p className="mt-8 text-sm text-gray-500">
            Response within 24 hours • No obligation
          </p>
        </motion.div>
      </div>
    </section>
  )
}
