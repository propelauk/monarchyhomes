'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, CheckCircle, Mail, User, Phone, Scale } from 'lucide-react'
import { Button } from '@/components/Button'
import { trackEvent } from '@/components/Analytics'

interface LeadFormData {
  name: string
  email: string
  phone: string
}

export function LeadMagnetSection() {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    phone: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          resource: 'renters-rights-act',
        }),
      })

      if (response.ok) {
        trackEvent('lead_magnet_download', { resource: 'renters-rights-act' })
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error('Download request failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const keyTopics = [
    'What the Renters Rights Act means',
    'Key changes for landlords',
    'New tenant protections',
    'Eviction process changes',
    'Rent increase rules',
    'Compliance requirements',
  ]

  return (
    <section id="resources" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-navy-900 to-navy-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 md:p-12 lg:p-16"
            >
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-gold-500/20 rounded-full px-4 py-2 mb-6">
                <Scale className="w-4 h-4 text-gold-500" />
                <span className="text-gold-500 text-sm font-medium">Free Guide</span>
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
                The Renters Rights Act Explained
              </h2>

              <p className="text-gray-400 mb-8">
                Stay ahead of the changes. Download our comprehensive guide to understand how the new Renters Rights Act affects you as a landlord.
              </p>

              {/* Key Topics Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {keyTopics.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-gold-500 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              {/* Trust Text */}
              <p className="text-sm text-gray-500">
                Updated for 2026 legislation
              </p>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 md:p-12 lg:p-16"
            >
              {isSubmitted ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-navy-900 mb-4">
                      Check Your Email!
                    </h3>
                    <p className="text-charcoal-600 mb-6">
                      We&apos;ve sent your download link to your inbox. Click the link in the email to access your free guide on the Renters Rights Act.
                    </p>
                    <Button
                      variant="secondary"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Download Another Resource
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-semibold text-navy-900 mb-6">
                    Get Your Free Guide
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="lead-name" className="block text-sm font-medium text-charcoal-700 mb-2">
                        <span className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>Full Name</span>
                        </span>
                      </label>
                      <input
                        type="text"
                        id="lead-name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="input-field"
                        placeholder="John Smith"
                      />
                    </div>

                    <div>
                      <label htmlFor="lead-email" className="block text-sm font-medium text-charcoal-700 mb-2">
                        <span className="flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>Email Address</span>
                        </span>
                      </label>
                      <input
                        type="email"
                        id="lead-email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input-field"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="lead-phone" className="block text-sm font-medium text-charcoal-700 mb-2">
                        <span className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>Phone Number</span>
                        </span>
                      </label>
                      <input
                        type="tel"
                        id="lead-phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="input-field"
                        placeholder="07XXX XXXXXX"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      isLoading={isSubmitting}
                      icon={<Mail className="w-5 h-5" />}
                      className="w-full"
                    >
                      Send Me The Guide
                    </Button>

                    <p className="text-xs text-charcoal-500 text-center">
                      By submitting, you agree to receive occasional emails about property management. Unsubscribe anytime.
                    </p>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
