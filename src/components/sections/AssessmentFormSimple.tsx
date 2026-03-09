'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Building2, 
  PoundSterling,
  Phone, 
  Mail, 
  User,
  CheckCircle,
  Send
} from 'lucide-react'
import { Button } from '@/components/Button'
import { trackEvent } from '@/components/Analytics'

interface AssessmentFormData {
  numberOfRooms: string
  currentMonthlyIncome: string
  hasLicense: string
  name: string
  email: string
  phone: string
}

export function AssessmentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<AssessmentFormData>({
    numberOfRooms: '',
    currentMonthlyIncome: '',
    hasLicense: '',
    name: '',
    email: '',
    phone: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'assessment',
          ...formData,
        }),
      })

      if (response.ok) {
        trackEvent('assessment_form_submitted', { 
          rooms: formData.numberOfRooms,
          hasLicense: formData.hasLicense,
        })
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error('Assessment submission failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section id="assessment" className="py-20 md:py-28 bg-accent">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy-900 mb-4">
              Thank You!
            </h2>
            <p className="text-charcoal-600 mb-6">
              We&apos;ve received your details. A member of our team will be in touch within 24 hours to discuss your property and how we might be able to help.
            </p>
            <p className="text-sm text-charcoal-500">
              Check your email for a confirmation.
            </p>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="assessment" className="py-20 md:py-28 bg-accent">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="section-heading">
            Get Your Free <span className="text-gold-600">Assessment</span>
          </h2>
          <p className="section-subheading mx-auto">
            Tell us about your current situation and we&apos;ll get back to you to discuss how we can help.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Property Details */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-navy-900 border-b border-gray-100 pb-2">
                Your Current Situation
              </h3>

              <div>
                <label htmlFor="numberOfRooms" className="block text-sm font-medium text-charcoal-700 mb-2">
                  <span className="flex items-center space-x-2">
                    <Building2 className="w-4 h-4" />
                    <span>Number of Rooms</span>
                  </span>
                </label>
                <select
                  id="numberOfRooms"
                  required
                  value={formData.numberOfRooms}
                  onChange={(e) => setFormData({ ...formData, numberOfRooms: e.target.value })}
                  className="input-field"
                >
                  <option value="">Select...</option>
                  <option value="1-2">1-2 Rooms</option>
                  <option value="3">3 Rooms</option>
                  <option value="4">4 Rooms</option>
                  <option value="5">5 Rooms</option>
                  <option value="6">6 Rooms</option>
                  <option value="7">7 Rooms</option>
                  <option value="8+">8+ Rooms</option>
                </select>
              </div>

              <div>
                <label htmlFor="currentMonthlyIncome" className="block text-sm font-medium text-charcoal-700 mb-2">
                  <span className="flex items-center space-x-2">
                    <PoundSterling className="w-4 h-4" />
                    <span>Current Monthly Income (approximate)</span>
                  </span>
                </label>
                <input
                  type="text"
                  id="currentMonthlyIncome"
                  required
                  value={formData.currentMonthlyIncome}
                  onChange={(e) => setFormData({ ...formData, currentMonthlyIncome: e.target.value })}
                  className="input-field"
                  placeholder="e.g. £2,000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-3">
                  Is the property licensed as an HMO?
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['Yes', 'No', 'Not Sure'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setFormData({ ...formData, hasLicense: option })}
                      className={`p-3 text-sm rounded-lg border-2 transition-all ${
                        formData.hasLicense === option
                          ? 'border-gold-500 bg-gold-50 text-navy-900'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-6 pt-6 border-t border-gray-100">
              <h3 className="text-lg font-semibold text-navy-900">
                Your Contact Details
              </h3>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-charcoal-700 mb-2">
                  <span className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Your Name</span>
                  </span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  placeholder="John Smith"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-charcoal-700 mb-2">
                    <span className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-charcoal-700 mb-2">
                    <span className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>Phone</span>
                    </span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input-field"
                    placeholder="07XXX XXXXXX"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
                icon={<Send className="w-5 h-5" />}
                className="w-full"
              >
                Submit
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
