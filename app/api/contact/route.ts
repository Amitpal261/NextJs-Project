// // app/api/contact/route.ts

import { NextRequest, NextResponse } from "next/server";

type ContactBody = {
  role: "manager" | "employee";
  name: string;
  email: string;
  message: string;
};

const contacts: ContactBody[] = [];
export async function POST(req: NextRequest) {
  try {
    const body: ContactBody = await req.json();
    const { role, name, email, message } = body;

    if (!role || !name || !email || !message) {
      return NextResponse.json(
        {
          message: "All fields are required",
        },
        { status: 400 },
      );
    }

    contacts.push(body);

    return NextResponse.json(
      {
        success: true,
        message: "Data saved Successfully",
        data: body,
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      {
        error: "Invalid Request Body",
      },
      { status: 500 },
    );
  }
}


export async function GET() {
    return NextResponse.json({
        success : true, 
        count : contacts.length,
        data : contacts
    })   
}