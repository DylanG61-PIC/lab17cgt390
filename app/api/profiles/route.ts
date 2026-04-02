import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { name, title, email, bio, image_url } = body;

    if (!name || !title || !email || !bio || !image_url) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const created = await prisma.profile.create({
      data: { name, title, email, bio, image_url },
    });

    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2002") {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create profile" }, { status: 500 });
  }
};

export const GET = async (request: NextRequest) => {
  try {
    const profiles = await prisma.profile.findMany();
    return NextResponse.json({ data: profiles }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch profiles" }, { status: 500 });
  }
};