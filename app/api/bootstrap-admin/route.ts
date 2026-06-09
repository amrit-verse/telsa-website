<<<<<<< HEAD
import { db as prisma } from "@/lib/db";
import { NextResponse } from "next/server";
=======
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
>>>>>>> fac743c (Final release candidate polish)
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
<<<<<<< HEAD
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
=======
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
>>>>>>> fac743c (Final release candidate polish)
    });

    return NextResponse.json({
      success: true,
      message: "SUPER_ADMIN created successfully.",
      user: {
<<<<<<< HEAD
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
=======
        id: superAdmin.id,
        email: superAdmin.email,
        role: superAdmin.role
      }
    }, { status: 201 });

  } catch (error) {
    console.error("Bootstrap Admin Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
>>>>>>> fac743c (Final release candidate polish)
  }
}
