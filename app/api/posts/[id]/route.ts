// app/api/posts/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";

type Post = {
  id: number;
  name: string;
  age: number;
};

// ⚠️ Same fake DB (for demo)
let posts: Post[] = [
  { id: 1, name: "Amit", age: 20 },
  { id: 2, name: "Sumit", age: 20 },
];

// console.log("POSTS:", posts)
// ✅ GET single
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }, // 👈 params is Promise
) {
  const params = await context.params; // ✅ unwrap it

  const id = Number(params.id);

  //   console.log("PARAMS:", params)
  //   console.log("ID:", id)

  const post = posts.find((p) => p.id === id);

  //   console.log("POST:", post)

  return NextResponse.json({
    success: true,
    data: post ?? null,
  });
}

// ✅ UPDATE
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const params = await context.params;
  const id = Number(params.id);
  const body = await req.json();

  const index = posts.findIndex((p) => p.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  posts[index] = { ...posts[index], ...body };

  return NextResponse.json({
    success: true,
    message: "Updated successfully",
    data: posts[index],
  });
}

//✅ DELETE
export async function DELETE(req:NextRequest , context : {params :Promise<{id:string}>}) {
    const params = await context.params
    const id = Number(params.id)

    posts = posts.filter((p)=>p.id===id)

    return NextResponse.json({
        success: true,
        message : "Deleted Successfully.."

    })
    
}
