const { PrismaClient } = require('@prisma/client');

const passes = [
  '82481@Amj',
  '82481@Amj@Web',
  '82481@amj',
  '82481Amj',
];

async function run() {
  for (const p of passes) {
    const enc = encodeURIComponent(p);
    const url = `postgresql://postgres.btkhclyqckaxazecmxsk:${enc}@aws-1-eu-west-1.pooler.supabase.com:5432/postgres`;
    const prisma = new PrismaClient({ datasources: { db: { url } } });
    try {
      await prisma.$connect();
      console.log(`SUCCESS! Password is: "${p}"`);
      await prisma.$disconnect();
      return;
    } catch (err) {
      console.log(`Failed for "${p}":`, err.message.split('\n')[0]);
      await prisma.$disconnect();
    }
  }
}

run();
