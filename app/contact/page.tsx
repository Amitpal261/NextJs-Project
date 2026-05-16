// app/contact/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useState, FormEvent } from 'react'

// export const metadata = {
//   title: 'Contact',
//   description: 'Contact us',
// }

export default function Page(): React.ReactElement {
  const [role, setRole] = useState<'manager' | 'employee'>('employee')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const redirect = useRouter()
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const res= await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role, name, email, message }),
    })
    
    setName('')
    setEmail('')
    setMessage('')
    alert('Message sent 🚀')

    const data = await res.json()

    if(data.success){
      redirect.push("/search")
    }
  }

  return (
    <div className="pt-10 min-h-screen relative flex items-center justify-center text-white pb-10">

      {/* 🌌 Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop')",
        }}
      />

      {/* 🌑 Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* 💎 Glass Card */}
      <div className="relative z-10 w-full max-w-2xl p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">

        {/* Title */}
        <h1 className="text-4xl font-semibold mb-2 tracking-tight">
          Contact Us
        </h1>
        <p className="text-gray-400 mb-8">
          Wed love to hear from you. Send us a message.
        </p>

        {/* Role Switch */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setRole('manager')}
            className={`px-6 py-2 rounded-xl transition ${
              role === 'manager'
                ? 'bg-white text-black'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            Manager
          </button>

          <button
            onClick={() => setRole('employee')}
            className={`px-6 py-2 rounded-xl transition ${
              role === 'employee'
                ? 'bg-white text-black'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            Employee
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
          />

          <textarea
            placeholder="Your Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
          />

          <button
            
            type="submit"
            className="w-full py-3 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition active:scale-[0.98]"
          >
            Send Message
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-400 mt-6 text-center">
          We typically respond within 24 hours
        </p>
      </div>
    </div>
  )
}