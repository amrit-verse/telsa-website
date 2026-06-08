import { db as prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const expectedSecret = process.env.BOOTSTRAP_SECRET;

    if (!expectedSecret) {
      return NextResponse.json(
        { error: "Bootstrap is disabled. Set BOOTSTRAP_SECRET in environment." },
        { status: 403 }
      );
    }

    if (authHeader !== `Bearer ${expectedSecret}`) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Missing email, password, or name in request body." },
        { status: 400 }
      );
    }

    // Check if any admin already exists
    const existingAdmin = await prisma.user.findFirst({
      where: { role: "SUPER_ADMIN" },
    });

    if (existingAdmin) {
      return NextResponse.json(
        { error: "A SUPER_ADMIN already exists. Bootstrap cannot be run again." },
        { status: 409 }
      );
    }

    // Check if the requested email is already taken
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email is already registered." },
        { status: 409 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newAdmin = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
        role: "SUPER_ADMIN",
      },
    });

    return NextResponse.json({
      success: true,
      message: "SUPER_ADMIN created successfully.",
      user: {
        id: newAdmin.id,
        email: newAdmin.email,
        role: newAdmin.role,
      },
    });
  } catch (error) {
    console.error("Bootstrap error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during bootstrap." },
      { status: 500 }
    );
  }
}
