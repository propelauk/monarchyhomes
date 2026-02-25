'use client'

import { useState } from 'react'
import { 
  User, 
  Bell, 
  Mail, 
  Shield, 
  Palette, 
  Save,
  Loader2,
  Check
} from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@monarchyhomes.com',
    phone: '01452 452308',
  })
  
  const [notifications, setNotifications] = useState({
    newLead: true,
    leadStatusChange: true,
    dailyDigest: false,
    weeklyReport: true,
  })
  
  const [email, setEmail] = useState({
    fromName: 'Monarchy Homes',
    fromEmail: 'hello@monarchyhomes.com',
    replyTo: 'hello@monarchyhomes.com',
    signature: 'Best regards,\nThe Monarchy Homes Team',
  })

  const handleSave = async () => {
    setSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="max-w-4xl">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="border-b flex">
          {[
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'email', label: 'Email Settings', icon: Mail },
            { id: 'security', label: 'Security', icon: Shield },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-[#0D1B2A] border-b-2 border-[#FFC857]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-[#0D1B2A] rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-medium">A</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Profile Picture</h3>
                  <button className="text-sm text-[#FFC857] hover:underline">Change photo</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFC857] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFC857] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFC857] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <p className="text-gray-500 mb-4">Configure when you receive notifications</p>
              
              {[
                { key: 'newLead', label: 'New Lead Submitted', description: 'Get notified when a new lead comes in' },
                { key: 'leadStatusChange', label: 'Lead Status Changes', description: 'When a lead moves to a new stage' },
                { key: 'dailyDigest', label: 'Daily Digest', description: 'Summary of daily activity at 9am' },
                { key: 'weeklyReport', label: 'Weekly Report', description: 'Performance report every Monday' },
              ].map((item) => (
                <label 
                  key={item.key}
                  className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-[#FFC857]"
                >
                  <input
                    type="checkbox"
                    checked={notifications[item.key as keyof typeof notifications]}
                    onChange={(e) => setNotifications(prev => ({ ...prev, [item.key]: e.target.checked }))}
                    className="mt-1 w-5 h-5 rounded border-gray-300 text-[#FFC857] focus:ring-[#FFC857]"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{item.label}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </label>
              ))}
            </div>
          )}

          {/* Email Settings Tab */}
          {activeTab === 'email' && (
            <div className="space-y-4">
              <p className="text-gray-500 mb-4">Configure how outgoing emails appear</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">From Name</label>
                  <input
                    type="text"
                    value={email.fromName}
                    onChange={(e) => setEmail(prev => ({ ...prev, fromName: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFC857] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">From Email</label>
                  <input
                    type="email"
                    value={email.fromEmail}
                    onChange={(e) => setEmail(prev => ({ ...prev, fromEmail: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFC857] focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reply-To</label>
                  <input
                    type="email"
                    value={email.replyTo}
                    onChange={(e) => setEmail(prev => ({ ...prev, replyTo: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFC857] focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Signature</label>
                  <textarea
                    value={email.signature}
                    onChange={(e) => setEmail(prev => ({ ...prev, signature: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFC857] focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Change Password</h4>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFC857] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFC857] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFC857] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t">
                <h4 className="font-medium text-gray-900 mb-3">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-500 mb-3">
                  Add an extra layer of security to your account
                </p>
                <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                  Enable 2FA
                </button>
              </div>

              <div className="pt-6 border-t">
                <h4 className="font-medium text-red-600 mb-3">Danger Zone</h4>
                <p className="text-sm text-gray-500 mb-3">
                  Permanently delete your admin account
                </p>
                <button className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50">
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="border-t p-6 flex items-center justify-end gap-4">
          {saved && (
            <span className="flex items-center gap-2 text-green-600">
              <Check className="w-5 h-5" />
              Settings saved
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 bg-[#0D1B2A] text-white rounded-lg font-medium hover:bg-[#1a2d42] disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
