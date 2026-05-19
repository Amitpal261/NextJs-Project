

import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import { NextRequest, NextResponse } from "next/server";

// ✅ GET all posts
export async function GET() {
  try {
    await connectDB();
    
    const posts = await Post.find();
    
    return NextResponse.json({
      success: true,
      data: posts,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// ✅ CREATE post
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    const body = await req.json();
    
    const newPost = await Post.create({
      name: body.name,
      age: body.age,
    });

    return NextResponse.json({
      success: true,
      message: "Post created",
      data: newPost,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}






























    // // app/api/posts/route.ts
    
    // import { NextRequest, NextResponse } from 'next/server'
    
    // type Post = {
    //   id: number
    //   name: string
    //   age: number
    // }
    
    // // 🔥 Fake DB
    // const posts: Post[] = [
    //   { id: 1, name: 'Amit', age: 20 },
    //   { id: 2, name: 'Sumit', age: 20 },
    // ]
    
    // export async function GET() {
    //   return NextResponse.json({
    //     success: true,
    //     data: posts,
    //   })
    // }
    
    // export async function POST(req: NextRequest) {
    //   const body = await req.json()
    
    //   const newPost: Post = {
    //     id: Date.now(),
    //     name: body.name,
    //     age: body.age,
    //   }
    
    //   posts.push(newPost)
    
    //   return NextResponse.json({
    //     success: true,
    //     message: 'Post created',
    //     data: newPost,
    //   })
    // }