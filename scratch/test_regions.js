const net = require('net');

const projectRef = 'btkhclyqckaxazecmxsk';
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

async function checkRegion(region) {
  const host = `aws-0-${region}.pooler.supabase.com`;
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(2000);
    socket.on('connect', () => {
      socket.destroy();
      resolve({ region, host, status: 'OPEN' });
    });
    socket.on('error', (err) => {
      resolve({ region, host, status: err.message });
    });
    socket.on('timeout', () => {
      socket.destroy();
      resolve({ region, host, status: 'TIMEOUT' });
    });
    socket.connect(6543, host);
  });
}

async function run() {
  console.log('Testing connection to pooler regions...');
  for (const r of regions) {
    const res = await checkRegion(r);
    console.log(`${res.host}: ${res.status}`);
  }
}

run();
