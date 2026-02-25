'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, X, Send, Clock } from 'lucide-react'
import { Button } from './Button'
import { trackEvent } from './Analytics'
import { useCallback } from '@/context/CallbackContext'

interface CallbackFormData {
  name: string
  phone: string
  preferredTime: string
  message: string
}

const timeOptions = [
  { value: 'asap', label: 'As soon as possible' },
  { value: 'morning', label: 'Morning (9am - 12pm)' },
  { value: 'afternoon', label: 'Afternoon (12pm - 5pm)' },
  { value: 'evening', label: 'Evening (5pm - 8pm)' },
]

export function FloatingCallback() {
  const { isOpen, openCallback, closeCallback } = useCallback()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<CallbackFormData>({
    name: '',
    phone: '',
    preferredTime: 'asap',
    message: '',
  })

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: '',
          phone: '',
          preferredTime: 'asap',
          message: '',
        })
      }, 300)
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        trackEvent('callback_request_submitted', { 
          source: 'floating_button',
          preferredTime: formData.preferredTime 
        })
        setIsSubmitted(true)
        setTimeout(() => {
          closeCallback()
        }, 3000)
      }
    } catch (error) {
      console.error('Callback request failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Floating Button - Desktop Only */}
      <motion.button
        onClick={() => {
          openCallback()
          trackEvent('floating_callback_opened')
        }}
        className="fixed bottom-6 right-6 z-50 hidden lg:flex items-center gap-2 px-5 py-4 text-navy-900 bg-gold-500 rounded-full shadow-2xl hover:bg-gold-400 transition-colors duration-300 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        aria-label="Call Me Back"
      >
        <Phone className="w-5 h-5" />
        <span className="font-semibold">Call Me Back</span>
        
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-gold-500 animate-ping opacity-25" />
      </motion.button>

      {/* Callback Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCallback}
              className="fixed inset-0 bg-navy-900/60 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-x-4 bottom-20 sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:inset-x-auto z-50 w-auto sm:w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-navy-900 px-6 py-4 flex items-center justify-between">
                <h3 className="text-white font-semibold text-lg">Call Me Back</h3>
                <button
                  onClick={closeCallback}
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-navy-900 mb-2">Thank You!</h4>
                    <p className="text-charcoal-600">We&apos;ll call you back soon.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="callback-name" className="block text-sm font-medium text-charcoal-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="callback-name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="input-field"
                        placeholder="John Smith"
                      />
                    </div>

                    <div>
                      <label htmlFor="callback-phone" className="block text-sm font-medium text-charcoal-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="callback-phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="input-field"
                        placeholder="07XXX XXXXXX"
                      />
                    </div>

                    <div>
                      <label htmlFor="callback-time" className="block text-sm font-medium text-charcoal-700 mb-1">
                        <Clock className="w-4 h-4 inline mr-1" />
                        Best Time to Call
                      </label>
                      <select
                        id="callback-time"
                        required
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="input-field"
                      >
                        {timeOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="callback-message" className="block text-sm font-medium text-charcoal-700 mb-1">
                        Brief Message (Optional)
                      </label>
                      <textarea
                        id="callback-message"
                        rows={2}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="input-field resize-none"
                        placeholder="Tell us about your property..."
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      isLoading={isSubmitting}
                      icon={<Send className="w-4 h-4" />}
                      className="w-full"
                    >
                      Call Me Back
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
