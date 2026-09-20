const { PrismaClient } = require('@prisma/client');

const dbUrl = "postgresql://postgres.btkhclyqckaxazecmxsk:82481%40Amj@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true";
const directUrl = "postgresql://postgres.btkhclyqckaxazecmxsk:82481%40Amj@aws-1-eu-west-1.pooler.supabase.com:5432/postgres";

async function test(url, label) {
  console.log(`Testing ${label}...`);
  const prisma = new PrismaClient({ datasources: { db: { url } } });
  try {
    await prisma.$connect();
    console.log(`SUCCESS [${label}]! Connected to Supabase DB!`);
    await prisma.$disconnect();
    return true;
  } catch (err) {
    console.log(`FAILED [${label}]:`, err.message);
    await prisma.$disconnect();
    return false;
  }
}

async function run() {
  await test(directUrl, 'DIRECT_URL (port 5432)');
  await test(dbUrl, 'DATABASE_URL (port 6543)');
}

run();
