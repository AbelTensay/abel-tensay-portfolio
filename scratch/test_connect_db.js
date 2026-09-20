const tls = require('tls');

// Postgres SSL Startup sequence
function sendSSLAndStartup(host, port, user, password) {
  return new Promise((resolve) => {
    const socket = tls.connect(port, host, { rejectUnauthorized: false }, () => {
      // Postgres Startup Packet
      const params = [
        'user', user,
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

      socket.write(buf);
    });

    socket.on('data', (data) => {
      resolve({ host, port, user, response: data.toString('utf8').replace(/\r?\n|\r/g, ' ') });
      socket.destroy();
    });

    socket.on('error', (err) => {
      resolve({ host, port, user, response: `ERR: ${err.message}` });
    });

    socket.setTimeout(3000, () => {
      socket.destroy();
      resolve({ host, port, user, response: 'TIMEOUT' });
    });
  });
}

async function run() {
  const ref = 'btkhclyqckaxazecmxsk';
  const hosts = [
    'aws-0-eu-west-1.pooler.supabase.com',
    'aws-1-eu-west-1.pooler.supabase.com',
    'eu-west-1.pooler.supabase.com',
    `db.${ref}.supabase.co`
  ];

  for (const host of hosts) {
    for (const port of [6543, 5432]) {
      for (const u of [`postgres.${ref}`, 'postgres']) {
        const res = await sendSSLAndStartup(host, port, u, '82481@Amj');
        console.log(`${host}:${port} [${u}] => ${res.response.substring(0, 100)}`);
      }
    }
  }
}

run();
