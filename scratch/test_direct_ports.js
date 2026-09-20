const net = require('net');

const user = 'postgres.btkhclyqckaxazecmxsk';

function buildStartupPacket(username) {
  const params = [
    'user', username,
    'database', 'postgres',
    ''
  ];
  let length = 4 + 4;
  for (const p of params) {
    if (p) length += Buffer.byteLength(p) + 1;
  }
  length += 1;

  const buf = Buffer.alloc(length);
  buf.writeInt32BE(length, 0);
  buf.writeInt32BE(196608, 4);

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

async function test(host, port, u) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(3000);
    socket.on('connect', () => {
      socket.write(buildStartupPacket(u));
    });
    socket.on('data', (data) => {
      const res = data.toString('utf8').replace(/\r?\n|\r/g, ' ');
      socket.destroy();
      resolve({ host, port, u, res });
    });
    socket.on('error', (err) => {
      resolve({ host, port, u, res: `ERR: ${err.message}` });
    });
    socket.on('timeout', () => {
      socket.destroy();
      resolve({ host, port, u, res: 'TIMEOUT' });
    });
    socket.connect(port, host);
  });
}

async function run() {
  const tests = [
    ['aws-0-eu-west-1.pooler.supabase.com', 6543, 'postgres.btkhclyqckaxazecmxsk'],
    ['aws-0-eu-west-1.pooler.supabase.com', 5432, 'postgres.btkhclyqckaxazecmxsk'],
    ['aws-0-eu-west-1.pooler.supabase.com', 6543, 'postgres'],
    ['aws-0-eu-west-1.pooler.supabase.com', 5432, 'postgres'],
    ['db.btkhclyqckaxazecmxsk.supabase.co', 5432, 'postgres'],
    ['db.btkhclyqckaxazecmxsk.supabase.co', 6543, 'postgres'],
    ['db.btkhclyqckaxazecmxsk.supabase.co', 5432, 'postgres.btkhclyqckaxazecmxsk'],
    ['db.btkhclyqckaxazecmxsk.supabase.co', 6543, 'postgres.btkhclyqckaxazecmxsk'],
  ];

  for (const t of tests) {
    const r = await test(t[0], t[1], t[2]);
    console.log(`${r.host}:${r.port} [${r.u}] => ${r.res.substring(0, 120)}`);
  }
}

run();
