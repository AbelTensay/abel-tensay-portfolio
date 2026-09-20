const { PrismaClient } = require('@prisma/client');

const projectRef = 'btkhclyqckaxazecmxsk';
const pass = encodeURIComponent('82481@Amj');

const regions = [
  'us-east-1',
  'us-west-1',
  'us-west-2',
  'eu-central-1',
  'eu-west-1',
  'eu-west-2',
  'eu-west-3',
  'ap-southeast-1',
  'ap-southeast-2',
  'ap-northeast-1',
  'ap-south-1',
  'ca-central-1',
  'sa-east-1'
];

async function run() {
  for (const r of regions) {
    const url = `postgresql://postgres.${projectRef}:${pass}@aws-0-${r}.pooler.supabase.com:6543/postgres?pgbouncer=true&connect_timeout=3`;
    const client = new PrismaClient({ datasources: { db: { url } } });
    try {
      await client.$connect();
      console.log(`FOUND REGION: aws-0-${r}.pooler.supabase.com`);
      await client.$disconnect();
      return;
    } catch (err) {
      if (err.message.includes('password authentication failed')) {
        console.log(`FOUND REGION (Password mismatch): aws-0-${r}.pooler.supabase.com`);
        await client.$disconnect();
        return;
      } else if (!err.message.includes('ENOTFOUND')) {
        console.log(`Region aws-0-${r}: ${err.message.split('\n')[0]}`);
      } else {
        console.log(`Region aws-0-${r}: tenant not found`);
      }
    } finally {
      await client.$disconnect();
    }
  }
}

run();
