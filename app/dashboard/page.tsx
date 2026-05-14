// app/dashboard/page.tsx

import { cookies, headers } from 'next/headers'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function Dashboard(): Promise<React.ReactElement> {
  const cookieStore = await cookies()
  const user = cookieStore.get('user')?.value

  const headerList = await headers()

  // 🔥 Extract multiple headers
  const userAgent = headerList.get('user-agent') || 'Unknown'
  const language = headerList.get('accept-language') || 'Unknown'
  const host = headerList.get('host') || 'Unknown'
  const referer = headerList.get('referer') || 'Direct Visit'
  const authHeader = headerList.get('authorization') || 'No Auth Header'

  // ⚡ Detect device type (basic logic)
  const device = userAgent.includes('Mobile') ? 'Mobile 📱' : 'Desktop 💻'

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      
      {/* 🌌 Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba"
          alt="background"
          className="w-full h-full object-cover"
          width={100}
          height={100}
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Dashboard      
            </h1>
            <p className="text-gray-400 text-sm">
              Welcome back, {user}
            </p>
          </div>

          <a
            href="/api/logout"
            className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 backdrop-blur-lg hover:bg-white/20 transition"
          >
            Logout
          </a>
        </div>

        {/* 🧊 Header Info Card */}
        <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow mb-8">
          <h2 className="text-lg font-medium mb-4">Request Info</h2>

          <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-300">
            <p><strong>User Agent:</strong> {userAgent}</p>
            <p><strong>Device:</strong> {device}</p>
            <p><strong>Language:</strong> {language}</p>
            <p><strong>Host:</strong> {host}</p>
            <p><strong>Referer:</strong> {referer}</p>
            <p><strong>Authorization:</strong> {authHeader}</p>
          </div>
        </div>

        {/* 📊 Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
            <p className="text-sm text-gray-400">Projects</p>
            <h3 className="text-2xl font-semibold mt-1">12</h3>
          </div>

          <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
            <p className="text-sm text-gray-400">Active Sessions</p>
            <h3 className="text-2xl font-semibold mt-1">3</h3>
          </div>

          <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
            <p className="text-sm text-gray-400">Storage Used</p>
            <h3 className="text-2xl font-semibold mt-1">1.2 GB</h3>
          </div>

        </div>
      </div>
    </div>
  )
}