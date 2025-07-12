const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

async function getHtml(m, RyuuBotz, text, prefix, replyryuu) {
  if (!text) {
    return replyryuu(`Masukkan URL-nya!\nContoh: ${prefix}gethtml https://example.com`);
  }

  if (!/^https?:\/\//.test(text)) {
    return replyryuu('URL harus diawali dengan http:// atau https://');
  }

  await RyuuBotz.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

  try {
    const res = await fetch(text);
    if (!res.ok) {
      return replyryuu(`Gagal mengambil HTML: ${res.status} ${res.statusText}`);
    }

    const html = await res.text();

    if (html.length > 4000) {
      const filePath = path.join(__dirname, '../tmp', `source-${Date.now()}.html`);

      if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
      }

      fs.writeFileSync(filePath, html);

      await RyuuBotz.sendMessage(m.chat, {
        document: { url: filePath },
        mimetype: 'text/html',
        fileName: `source-${new Date().toISOString().slice(0,19).replace(/:/g, '-')}.html`
      }, { quoted: m });

      fs.unlinkSync(filePath);
    } else {
      replyryuu(html);
    }
  } catch (e) {
    console.error(e);
    replyryuu('Terjadi kesalahan saat mengambil HTML.');
  }
}
module.exports = getHtml;