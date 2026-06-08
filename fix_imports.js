import fs from 'fs';
import path from 'path';

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('import prisma from "@/lib/db";') || content.includes("import prisma from '@/lib/db';")) {
        content = content.replace(/import prisma from ["']@\/lib\/db["'];/g, 'import { db as prisma } from "@/lib/db";');
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Fixed: ${fullPath}`);
      }
    }
  }
}

replaceInDir(path.join(process.cwd(), 'app'));
replaceInDir(path.join(process.cwd(), 'lib'));
replaceInDir(path.join(process.cwd(), 'components'));
console.log('Prisma imports fixed.');
