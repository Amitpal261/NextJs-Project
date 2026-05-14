// app/api/login/route.ts

import { NextRequest, NextResponse } from 'next/server'

type LoginBody = {
  username: string
  passowrd : string
}

export async function POST(req: NextRequest) {
  const body: LoginBody = await req.json()

  const res = NextResponse.json({ message: 'Login success' })

  res.cookies.set('user', body.username, {
    httpOnly: true,
    path: '/',
  })

  return res
}