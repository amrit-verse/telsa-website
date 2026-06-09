import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const existingSuperAdmin = await prisma.user.findFirst({
    where: { role: "SUPER_ADMIN" }
  });

  if (existingSuperAdmin) {
    console.log("SUPER_ADMIN already exists:", existingSuperAdmin.email);
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash("admin123", salt);

  const superAdmin = await prisma.user.create({
    data: {
      name: "Super Administrator",
      email: "admin@telsa.org",
      passwordHash,
      role: "SUPER_ADMIN",
    }
  });

  console.log("Created SUPER_ADMIN:", superAdmin.email);
}

main().catch(console.error).finally(() => prisma.$disconnect());
