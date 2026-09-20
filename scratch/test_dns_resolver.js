const dns = require('dns').promises;

dns.setServers(['8.8.8.8', '1.1.1.1']);

async function run() {
  try {
    const a = await dns.resolve4('db.btkhclyqckaxazecmxsk.supabase.co');
    console.log('IPv4 addresses:', a);
  } catch (e) {
    console.log('IPv4 error:', e.message);
  }

  try {
    const aaaa = await dns.resolve6('db.btkhclyqckaxazecmxsk.supabase.co');
    console.log('IPv6 addresses:', aaaa);
  } catch (e) {
    console.log('IPv6 error:', e.message);
  }

  try {
    const pooler = await dns.resolve4('aws-0-eu-west-1.pooler.supabase.com');
    console.log('Pooler IPv4 addresses:', pooler);
  } catch (e) {
    console.log('Pooler IPv4 error:', e.message);
  }
}

run();
