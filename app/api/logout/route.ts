// app/api/logout/route.ts

import { NextResponse } from 'next/server'

export async function GET() {
  const res = NextResponse.json({ message: 'Logged out' })

  res.cookies.set('user', '', { maxAge: 0 })

  return res
}