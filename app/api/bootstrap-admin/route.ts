import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const bootstrapSecret = process.env.BOOTSTRAP_SECRET;

    if (!bootstrapSecret) {
      return NextResponse.json({ error: "Server misconfiguration: BOOTSTRAP_SECRET not set" }, { status: 500 });
    }

    if (token !== bootstrapSecret) {
      return NextResponse.json({ error: "Forbidden: Invalid token" }, { status: 403 });
    }

    // Check if SUPER_ADMIN already exists
    const existingSuperAdmin = await db.user.findFirst({
      where: { role: "SUPER_ADMIN" }
    });

    if (existingSuperAdmin) {
      return NextResponse.json({ error: "Forbidden: A SUPER_ADMIN already exists." }, { status: 403 });
    }

    // Parse the request body for email and password
    const body = await request.json().catch(() => null);
    if (!body || !body.email || !body.password) {
      return NextResponse.json({ error: "Bad Request: Missing email or password" }, { status: 400 });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(body.password, salt);

    // Create the SUPER_ADMIN
    const superAdmin = await db.user.create({
      data: {
        name: "Super Administrator",
        email: body.email,
        passwordHash,
        role: "SUPER_ADMIN",
      }
    });

    return NextResponse.json({
      success: true,
      message: "SUPER_ADMIN created successfully.",
      user: {
        id: superAdmin.id,
        email: superAdmin.email,
        role: superAdmin.role
      }
    }, { status: 201 });

  } catch (error) {
    console.error("Bootstrap Admin Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
