const { Client } = require('pg');

const client = new Client({
  host: '2a05:d018:5b7:f200:d31f:c2c6:dc24:580b',
  port: 5432,
  user: 'postgres',
  password: '82481@Amj',
  database: 'postgres',
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    console.log('Connecting to Supabase raw IPv6 address...');
    await client.connect();
    console.log('SUCCESS! Connected to Supabase DB!');
    const res = await client.query('SELECT NOW()');
    console.log('Query result:', res.rows[0]);
    await client.end();
  } catch (err) {
    console.log('Connection error:', err.message);
  }
}

run();
