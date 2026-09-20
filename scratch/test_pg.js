const net = require('net');

const user = 'postgres.btkhclyqckaxazecmxsk';
const regions = [
  'us-east-1',
  'us-west-1',
  'eu-central-1',
  'eu-west-1',
  'eu-west-2',
  'ap-southeast-1',
  'ap-southeast-2',
  'ap-south-1',
  'ca-central-1',
  'sa-east-1'
];

function buildStartupPacket(username) {
  const params = [
    'user', username,
    'database', 'postgres',
    ''
  ];
  let length = 4 + 4; // length + protocol version (3.0 = 196608)
  for (const p of params) {
    if (p) length += Buffer.byteLength(p) + 1;
  }
  length += 1; // trailing null

  const buf = Buffer.alloc(length);
  buf.writeInt32BE(length, 0);
  buf.writeInt32BE(196608, 4); // Protocol 3.0

  let offset = 8;
  for (let i = 0; i < params.length - 1; i += 2) {
    buf.write(params[i], offset);
    offset += Buffer.byteLength(params[i]) + 1;
    buf.write(params[i + 1], offset);
    offset += Buffer.byteLength(params[i + 1]) + 1;
  }
  buf.writeUInt8(0, offset);
  return buf;
}

async function testPooler(region) {
  const host = `aws-0-${region}.pooler.supabase.com`;
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(2500);

    socket.on('connect', () => {
      socket.write(buildStartupPacket(user));
    });

    socket.on('data', (data) => {
      const response = data.toString('utf8');
      socket.destroy();
      resolve({ region, host, response });
    });

    socket.on('error', (err) => {
      resolve({ region, host, response: `ERR: ${err.message}` });
    });

    socket.on('timeout', () => {
      socket.destroy();
      resolve({ region, host, response: 'TIMEOUT' });
    });

    socket.connect(6543, host);
  });
}

async function run() {
  console.log('Searching for tenant region across Supabase clusters...');
  const packet = buildStartupPacket(user);
  for (const r of regions) {
    const res = await testPooler(r);
    console.log(`[${r}] ${res.response.substring(0, 100).replace(/\r?\n|\r/g, ' ')}`);
  }
}

run();
