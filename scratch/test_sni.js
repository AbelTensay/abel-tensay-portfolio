const net = require('net');
const tls = require('tls');

function testSNI(user) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(4000);

    socket.on('connect', () => {
      const sslReq = Buffer.alloc(8);
      sslReq.writeInt32BE(8, 0);
      sslReq.writeInt32BE(80877103, 4);
      socket.write(sslReq);
    });

    let sslDone = false;
    socket.on('data', (data) => {
      if (!sslDone && data.toString() === 'S') {
        sslDone = true;
        const tlsSocket = tls.connect({
          socket: socket,
          servername: 'db.btkhclyqckaxazecmxsk.supabase.co', // SNI HOSTNAME!
          rejectUnauthorized: false
        }, () => {
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
          resolve({ user, response: str });
          tlsSocket.destroy();
        });

        tlsSocket.on('error', (err) => resolve({ user, response: `TLS ERR: ${err.message}` }));
      }
    });

    socket.on('error', (err) => resolve({ user, response: `ERR: ${err.message}` }));
    socket.on('timeout', () => { socket.destroy(); resolve({ user, response: 'TIMEOUT' }); });

    socket.connect(6543, 'aws-0-eu-west-1.pooler.supabase.com');
  });
}

async function run() {
  console.log('Testing with SNI servername = db.btkhclyqckaxazecmxsk.supabase.co ...');
  console.log('User: postgres =>', await testSNI('postgres'));
  console.log('User: postgres.btkhclyqckaxazecmxsk =>', await testSNI('postgres.btkhclyqckaxazecmxsk'));
}

run();
