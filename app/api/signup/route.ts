import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    connectDB();
    const { username, email, password } = await req.json();
    if (!username || !email || !password) {
      return NextResponse.json({
        message: "All fields are required!",
        status: 404,
      });
    }
    if (await User.findOne({ email })) {
      return NextResponse.json({
        message: "User already exists!",
        status: 400,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    return NextResponse.json(
      {
        success: true,
        message: "User created",
      },
      { status: 201 },
    );
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
