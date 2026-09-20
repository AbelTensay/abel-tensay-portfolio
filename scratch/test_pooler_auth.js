const net = require('net');
const crypto = require('crypto');

// Postgres Authentication check
function checkAuth(host, port, user, password) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(4000);

    socket.on('connect', () => {
      // 1. SSLRequest packet
      const sslReq = Buffer.alloc(8);
      sslReq.writeInt32BE(8, 0);
      sslReq.writeInt32BE(80877103, 4); // SSL code
      socket.write(sslReq);
    });

    let sslDone = false;

    socket.on('data', (data) => {
      if (!sslDone) {
        sslDone = true;
        if (data.toString() === 'S') {
          // Upgrade to TLS
          const tls = require('tls');
          const tlsSocket = tls.connect({
            socket: socket,
            rejectUnauthorized: false
          }, () => {
            // Send startup packet over TLS
            const params = ['user', user, 'database', 'postgres', ''];
            let len = 8;
            for (const p of params) if (p) len += Buffer.byteLength(p) + 1;
            len += 1;
            const buf = Buffer.alloc(len);
            buf.writeInt32BE(len, 0);
            buf.writeInt32BE(196608, 4);
            let off = 8;
            for (let i = 0; i < params.length - 1; i += 2) {
              buf.write(params[i], off);
              off += Buffer.byteLength(params[i]) + 1;
              buf.write(params[i + 1], off);
              off += Buffer.byteLength(params[i + 1]) + 1;
            }
            buf.writeUInt8(0, off);
            tlsSocket.write(buf);
          });

          tlsSocket.on('data', (tData) => {
            const str = tData.toString('utf8');
            resolve({ host, port, user, response: str });
            tlsSocket.destroy();
          });

          tlsSocket.on('error', (err) => {
            resolve({ host, port, user, response: `TLS ERR: ${err.message}` });
          });
        } else {
          resolve({ host, port, user, response: 'SSL REJECTED' });
        }
      }
    });

    socket.on('error', (err) => resolve({ host, port, user, response: `ERR: ${err.message}` }));
    socket.on('timeout', () => { socket.destroy(); resolve({ host, port, user, response: 'TIMEOUT' }); });

    socket.connect(port, host);
  });
}

async function run() {
  const ref = 'btkhclyqckaxazecmxsk';
  const u1 = `postgres.${ref}`;
  const u2 = `postgres`;

  console.log('Testing Pooler SSL connections...');
  console.log('1.', await checkAuth('aws-0-eu-west-1.pooler.supabase.com', 6543, u1, '82481@Amj'));
  console.log('2.', await checkAuth('aws-0-eu-west-1.pooler.supabase.com', 5432, u1, '82481@Amj'));
  console.log('3.', await checkAuth('aws-0-eu-west-1.pooler.supabase.com', 6543, u2, '82481@Amj'));
  console.log('4.', await checkAuth('aws-0-eu-west-1.pooler.supabase.com', 5432, u2, '82481@Amj'));
}

run();
