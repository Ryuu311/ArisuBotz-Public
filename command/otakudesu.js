const fetch = require('node-fetch');

async function otakudesu(m, RyuuBotz) {
  try {
    await RyuuBotz.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

    const res = await fetch(`https://zenzxz.dpdns.org/anime/otakudesu`);
    const json = await res.json();

    if (!json.status || !json.result) {
      await RyuuBotz.sendMessage(m.chat, { text: '❌ *Gagal mengambil data anime!*', quoted: m });
      return;
    }

    const list = json.result.slice(0, 10);
    let teks = `🎌 *Otakudesu - Anime Terbaru*\n\n`;
    for (const anime of list) {
      teks += `✨ *Anime Baru!* ✨\n`;
      teks += `🎬 *Judul:* *${anime.title}*\n`;
      teks += `🗓️ *Rilis: _${anime.published}_*\n`;
      teks += `🔗 *Tonton: ${anime.url}*\n`;
      teks += `*━━━━━━━━━━━━━━━━━━━━*\n`;
    }

    await RyuuBotz.sendMessage(m.chat, {
      text: teks.trim(),
      contextInfo: {
        externalAdReply: {
          title: '✨ Info by Otakudesu',
          body: 'Anime Sub Indo Terbaru!',
          mediaType: 1,
          thumbnailUrl: 'https://files.cloudkuimages.guru/images/iG0w3HTX.jpg',
          sourceUrl: 'https://otakudesu.cloud/',
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });
  } catch (e) {
    await RyuuBotz.sendMessage(m.chat, {
      text: typeof e === 'string' ? e : '🚫 *Terjadi kesalahan saat memproses permintaan.*',
      quoted: m
    });
  } finally {
    await RyuuBotz.sendMessage(m.chat, { react: { text: '', key: m.key } });
  }
}
module.exports = otakudesu;