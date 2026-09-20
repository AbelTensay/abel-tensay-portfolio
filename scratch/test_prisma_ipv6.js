const { PrismaClient } = require('@prisma/client');

const url = "postgresql://postgres:82481%40Amj@[2a05:d018:5b7:f200:d31f:c2c6:dc24:580b]:5432/postgres";

const prisma = new PrismaClient({
  datasources: { db: { url } }
});

async function run() {
  try {
    console.log('Connecting with Prisma to [2a05:d018:5b7:f200:d31f:c2c6:dc24:580b]...');
    await prisma.$connect();
    console.log('SUCCESS! Prisma connected to Supabase DB!');
    const users = await prisma.user.findMany();
    console.log('Users in DB:', users);
    await prisma.$disconnect();
  } catch (err) {
    console.log('Prisma error:', err);
    await prisma.$disconnect();
  }
}

run();
