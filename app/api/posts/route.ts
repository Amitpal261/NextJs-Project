// app/api/posts/route.ts

import { NextRequest, NextResponse } from 'next/server'

type Post = {
  id: number
  name: string
  age: number
}

// 🔥 Fake DB
const posts: Post[] = [
  { id: 1, name: 'Amit', age: 20 },
  { id: 2, name: 'Sumit', age: 20 },
]

export async function GET() {
  return NextResponse.json({
    success: true,
    data: posts,
  })
}

export async function POST(req: NextRequest) {
  const body = await req.json()

  const newPost: Post = {
    id: Date.now(),
    name: body.name,
    age: body.age,
  }

  posts.push(newPost)

  return NextResponse.json({
    success: true,
    message: 'Post created',
    data: newPost,
  })
}