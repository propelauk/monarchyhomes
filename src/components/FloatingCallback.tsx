'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, X, Send } from 'lucide-react'
import { Button } from './Button'
import { trackEvent } from './Analytics'

interface CallbackFormData {
  name: string
  phone: string
  message: string
}

export function FloatingCallback() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<CallbackFormData>({
    name: '',
    phone: '',
    message: '',
  })

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
        trackEvent('callback_request_submitted', { source: 'floating_button' })
        setIsSubmitted(true)
        setFormData({ name: '', phone: '', message: '' })
        setTimeout(() => {
          setIsOpen(false)
          setIsSubmitted(false)
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
      {/* Floating Button */}
      <motion.button
        onClick={() => {
          setIsOpen(true)
          trackEvent('floating_callback_opened')
        }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-4 text-navy-900 bg-gold-500 rounded-full shadow-2xl hover:bg-gold-400 transition-colors duration-300 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        aria-label="Request Callback"
      >
        <Phone className="w-5 h-5" />
        <span className="font-semibold hidden sm:inline">Request Callback</span>
        
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
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-navy-900/60 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed bottom-24 right-6 z-50 w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-navy-900 px-6 py-4 flex items-center justify-between">
                <h3 className="text-white font-semibold text-lg">Request a Callback</h3>
                <button
                  onClick={() => setIsOpen(false)}
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
                    <p className="text-charcoal-600">We&apos;ll call you back within 24 hours.</p>
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
                      <label htmlFor="callback-message" className="block text-sm font-medium text-charcoal-700 mb-1">
                        Brief Message (Optional)
                      </label>
                      <textarea
                        id="callback-message"
                        rows={2}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="input-field resize-none"
                        placeholder="Tell us about your HMO..."
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
                      Request Callback
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
