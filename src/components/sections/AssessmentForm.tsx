'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Building2, 
  MapPin, 
  Users, 
  Phone, 
  Mail, 
  User,
  CheckCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react'
import { Button } from '@/components/Button'
import { trackEvent } from '@/components/Analytics'

interface AssessmentFormData {
  // Step 1 - Property Details
  propertyAddress: string
  postcode: string
  numberOfRooms: string
  propertyType: string
  
  // Step 2 - Current Situation
  currentOccupancy: string
  hasLicense: string
  currentManagement: string
  mainChallenges: string[]
  
  // Step 3 - Contact Details
  name: string
  email: string
  phone: string
  preferredContact: string
}

const propertyTypes = [
  'Detached House',
  'Semi-Detached House',
  'Terraced House',
  'Flat/Apartment',
  'Converted Property',
]

const challenges = [
  'Void periods / Empty rooms',
  'Rent collection issues',
  'Tenant quality concerns',
  'Compliance uncertainty',
  'Maintenance management',
  'Licensing confusion',
]

export function AssessmentForm() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<AssessmentFormData>({
    propertyAddress: '',
    postcode: '',
    numberOfRooms: '',
    propertyType: '',
    currentOccupancy: '',
    hasLicense: '',
    currentManagement: '',
    mainChallenges: [],
    name: '',
    email: '',
    phone: '',
    preferredContact: 'phone',
  })

  const totalSteps = 3

  const handleChallengeToggle = (challenge: string) => {
    setFormData(prev => ({
      ...prev,
      mainChallenges: prev.mainChallenges.includes(challenge)
        ? prev.mainChallenges.filter(c => c !== challenge)
        : [...prev.mainChallenges, challenge],
    }))
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
      trackEvent('assessment_form_step', { step: step + 1 })
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

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
              Assessment Request Received!
            </h2>
            <p className="text-charcoal-600 mb-6">
              Thank you for submitting your property details. One of our specialists will contact you within 24 hours to discuss your property and how we can help maximise your income.
            </p>
            <p className="text-sm text-charcoal-500">
              Check your email for a confirmation with next steps.
            </p>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="assessment" className="py-20 md:py-28 bg-accent">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="section-heading">
            Get Your Free <span className="text-gold-600">Property Income Assessment</span>
          </h2>
          <p className="section-subheading mx-auto">
            Tell us about your HMO or single let and we&apos;ll show you how to maximise your rental income while staying fully compliant.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-charcoal-600">
              Step {step} of {totalSteps}
            </span>
            <span className="text-sm text-charcoal-500">
              {step === 1 && 'Property Details'}
              {step === 2 && 'Current Situation'}
              {step === 3 && 'Your Details'}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gold-500 transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
        >
          <form onSubmit={handleSubmit}>
            {/* Step 1: Property Details */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="propertyAddress" className="block text-sm font-medium text-charcoal-700 mb-2">
                    <span className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>Property Address</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    id="propertyAddress"
                    required
                    value={formData.propertyAddress}
                    onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                    className="input-field"
                    placeholder="123 High Street, Cheltenham"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="postcode" className="block text-sm font-medium text-charcoal-700 mb-2">
                      Postcode
                    </label>
                    <input
                      type="text"
                      id="postcode"
                      required
                      value={formData.postcode}
                      onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                      className="input-field"
                      placeholder="GL50 1AA"
                    />
                  </div>

                  <div>
                    <label htmlFor="numberOfRooms" className="block text-sm font-medium text-charcoal-700 mb-2">
                      <span className="flex items-center space-x-2">
                        <Building2 className="w-4 h-4" />
                        <span>Number of Lettable Rooms</span>
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
                      <option value="3">3 Rooms</option>
                      <option value="4">4 Rooms</option>
                      <option value="5">5 Rooms</option>
                      <option value="6">6 Rooms</option>
                      <option value="7">7 Rooms</option>
                      <option value="8+">8+ Rooms</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-3">
                    Property Type
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {propertyTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, propertyType: type })}
                        className={`p-3 text-sm rounded-lg border-2 transition-all ${
                          formData.propertyType === type
                            ? 'border-gold-500 bg-gold-50 text-navy-900'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Current Situation */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="currentOccupancy" className="block text-sm font-medium text-charcoal-700 mb-2">
                    <span className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>Current Occupancy</span>
                    </span>
                  </label>
                  <select
                    id="currentOccupancy"
                    required
                    value={formData.currentOccupancy}
                    onChange={(e) => setFormData({ ...formData, currentOccupancy: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Select...</option>
                    <option value="100%">Fully Occupied (100%)</option>
                    <option value="75-99%">Mostly Occupied (75-99%)</option>
                    <option value="50-74%">Partially Occupied (50-74%)</option>
                    <option value="under50%">Under 50% Occupied</option>
                    <option value="empty">Currently Empty</option>
                    <option value="notyet">Not Yet Converted to HMO</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-3">
                    Does the property have an HMO License?
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

                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-3">
                    Current Management
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {['Self-Managed', 'Agent Managed', 'Looking to Start'].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setFormData({ ...formData, currentManagement: option })}
                        className={`p-3 text-sm rounded-lg border-2 transition-all ${
                          formData.currentManagement === option
                            ? 'border-gold-500 bg-gold-50 text-navy-900'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-3">
                    Main Challenges (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {challenges.map((challenge) => (
                      <button
                        key={challenge}
                        type="button"
                        onClick={() => handleChallengeToggle(challenge)}
                        className={`p-3 text-sm rounded-lg border-2 text-left transition-all flex items-center space-x-2 ${
                          formData.mainChallenges.includes(challenge)
                            ? 'border-gold-500 bg-gold-50 text-navy-900'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <CheckCircle className={`w-4 h-4 flex-shrink-0 ${
                          formData.mainChallenges.includes(challenge) ? 'text-gold-500' : 'text-gray-300'
                        }`} />
                        <span>{challenge}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Contact Details */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-charcoal-700 mb-2">
                    <span className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>Your Full Name</span>
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
                        <span>Email Address</span>
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
                        <span>Phone Number</span>
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

                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-3">
                    Preferred Contact Method
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['phone', 'email'].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setFormData({ ...formData, preferredContact: method })}
                        className={`p-3 text-sm rounded-lg border-2 transition-all capitalize flex items-center justify-center space-x-2 ${
                          formData.preferredContact === method
                            ? 'border-gold-500 bg-gold-50 text-navy-900'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {method === 'phone' ? <Phone className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                        <span>{method}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  icon={<ArrowLeft className="w-4 h-4" />}
                >
                  Back
                </Button>
              ) : (
                <div />
              )}

              {step < totalSteps ? (
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleNext}
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  icon={<CheckCircle className="w-5 h-5" />}
                >
                  Submit Assessment Request
                </Button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
