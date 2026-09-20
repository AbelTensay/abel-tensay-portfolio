const net = require('net');

async function testFamily(family) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(3000);
    socket.on('connect', () => {
      console.log(`IPv${family} Connection SUCCESSFUL to db.btkhclyqckaxazecmxsk.supabase.co:5432`);
      socket.destroy();
      resolve(true);
    });
    socket.on('error', (err) => {
      console.log(`IPv${family} Connection FAILED: ${err.message}`);
      resolve(false);
    });
    socket.on('timeout', () => {
      console.log(`IPv${family} Connection TIMEOUT`);
      socket.destroy();
      resolve(false);
    });
    socket.connect({ host: 'db.btkhclyqckaxazecmxsk.supabase.co', port: 5432, family });
  });
}

async function run() {
  console.log('Testing IPv6...');
  await testFamily(6);
  console.log('Testing IPv4...');
  await testFamily(4);
}

run();
