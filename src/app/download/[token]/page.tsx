'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Download, CheckCircle, XCircle, Clock, FileText, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/Button'

interface DownloadData {
  success: boolean
  resource?: {
    title: string
    filename: string
    description: string
  }
  name?: string
  error?: string
  expired?: boolean
}

export default function DownloadPage() {
  const params = useParams()
  const token = params.token as string
  
  const [downloadData, setDownloadData] = useState<DownloadData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDownloading, setIsDownloading] = useState(false)
  const [hasDownloaded, setHasDownloaded] = useState(false)

  useEffect(() => {
    async function verifyToken() {
      try {
        const response = await fetch(`/api/download/verify?token=${token}`)
        const data = await response.json()
        setDownloadData(data)
      } catch (error) {
        console.error('Error verifying download:', error)
        setDownloadData({ success: false, error: 'Unable to verify download' })
      } finally {
        setIsLoading(false)
      }
    }

    if (token) {
      verifyToken()
    }
  }, [token])

  const handleDownload = async () => {
    setIsDownloading(true)
    
    try {
      // Mark as downloaded
      await fetch(`/api/download/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      
      // Trigger download
      const link = document.createElement('a')
      link.href = `/${encodeURIComponent(downloadData?.resource?.filename || '')}`
      link.download = downloadData?.resource?.filename || 'download.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      setHasDownloaded(true)
    } catch (error) {
      console.error('Download error:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-navy-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-charcoal-600">Verifying your download...</p>
        </div>
      </div>
    )
  }

  if (!downloadData?.success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            {downloadData?.expired ? (
              <Clock className="w-10 h-10 text-red-600" />
            ) : (
              <XCircle className="w-10 h-10 text-red-600" />
            )}
          </div>
          
          <h1 className="text-2xl font-serif font-bold text-navy-900 mb-4">
            {downloadData?.expired ? 'Link Expired' : 'Invalid Download Link'}
          </h1>
          
          <p className="text-charcoal-600 mb-8">
            {downloadData?.expired 
              ? 'This download link has expired. Please request a new one.'
              : 'This download link is not valid. Please check your email for the correct link.'}
          </p>
          
          <div className="space-y-3">
            <Link href="/#resources">
              <Button variant="primary" className="w-full">
                Request New Download
              </Button>
            </Link>
            <Link href="/">
              <Button variant="secondary" icon={<ArrowLeft className="w-4 h-4" />} className="w-full">
                Back to Homepage
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-900 to-navy-800 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="Monarchy Homes"
              width={48}
              height={48}
              className="w-12 h-12"
            />
            <div>
              <span className="text-2xl font-serif font-bold text-white">Monarchy Homes</span>
              <p className="text-xs text-gold-500">Reliability & Trust</p>
            </div>
          </Link>
        </div>

        {/* Download Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gold-500 px-8 py-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <FileText className="w-7 h-7 text-navy-900" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-navy-900">
                  {downloadData.resource?.title}
                </h1>
                <p className="text-navy-800 text-sm">
                  {downloadData.resource?.description}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {hasDownloaded ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-navy-900 mb-2">
                  Download Complete!
                </h2>
                <p className="text-charcoal-600 mb-6">
                  Thank you, {downloadData.name}. Your download should start automatically.
                </p>
                <div className="space-y-3">
                  <Button
                    variant="secondary"
                    onClick={handleDownload}
                    className="w-full"
                  >
                    Download Again
                  </Button>
                  <Link href="/">
                    <Button variant="outline" className="w-full">
                      Visit Our Website
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-charcoal-600 mb-6">
                  Hi <span className="font-semibold text-navy-900">{downloadData.name}</span>, your download is ready!
                </p>
                
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleDownload}
                  isLoading={isDownloading}
                  icon={<Download className="w-5 h-5" />}
                  className="w-full mb-6"
                >
                  Download Now
                </Button>

                <p className="text-sm text-charcoal-500">
                  PDF format • Free guide for landlords
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
            <p className="text-xs text-center text-charcoal-500">
              Questions? Call us on{' '}
              <a href="tel:01452452308" className="text-navy-900 font-medium hover:underline">
                01452 452308
              </a>
            </p>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <Link href="/" className="text-gold-500 hover:text-gold-400 text-sm font-medium">
            ← Back to Monarchy Homes
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
