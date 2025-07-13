const fetch = require('node-fetch');

async function ytmp3(m, RyuuBotz, text, prefix, reply) {
  if (!text) return reply(`*Example:* ${prefix}ytmp3 https://youtube.com/watch?v=czQ2KID9plQ`);
  if (!text.includes('youtu')) return reply('Masukkan link YouTube yang valid!');
  await RyuuBotz.sendMessage(m.chat, { react: { text: '🕖', key: m.key } });

  try {
    const res = await fetch(`https://api.nekorinn.my.id/downloader/youtube?url=${encodeURIComponent(text)}&format=192&type=audio`);
    if (!res.ok) throw await res.text();
    const json = await res.json();

    if (!json.status || !json.result?.downloadUrl) return reply('Gagal mengambil audio.');

    const { title, cover, downloadUrl, format } = json.result;
    await RyuuBotz.sendMessage(m.chat, {
      image: { url: cover },
      caption: `🎧 *YouTube Audio Found!*\n🎵 *Title:* ${title}\n🎚️ *Bitrate:* ${format}kbps\n🔗 *Download:* ${downloadUrl}\n_Mengirim audio..._`
    }, { quoted: m });

    await RyuuBotz.sendMessage(m.chat, {
      audio: { url: downloadUrl },
      mimetype: "audio/mpeg",
      ptt: true,
      fileName: `${title}.mp3`
    }, { quoted: m });

  } catch (err) {
    console.log('YTMP3 Error:', err);
    reply(`❌ Error saat memproses audio:\n${err.message || err}`);
  }
}

async function ytmp4(m, RyuuBotz, text, prefix, reply) {
  if (!text) return reply(`*Example:* ${prefix}ytmp4 https://youtube.com/watch?v=czQ2KID9plQ`);
  if (!text.includes('youtu')) return reply('Masukkan link YouTube yang valid!');
  await RyuuBotz.sendMessage(m.chat, { react: { text: '🕖', key: m.key } });

  try {
    const res = await fetch(`https://api.nekorinn.my.id/downloader/youtube?url=${encodeURIComponent(text)}&format=480&type=video`);
    if (!res.ok) throw await res.text();
    const json = await res.json();

    if (!json.status || !json.result?.downloadUrl) return reply('Gagal mengambil video.');

    const { title, cover, downloadUrl, format } = json.result;
    await RyuuBotz.sendMessage(m.chat, {
      image: { url: cover },
      caption: `🎬 *YouTube Video Found!*\n📌 *Title:* ${title}\n📥 *Format:* ${format}p\n🔗 *Download:* ${downloadUrl}\n_Mengirim video..._`
    }, { quoted: m });

    await RyuuBotz.sendMessage(m.chat, {
      video: { url: downloadUrl },
      caption: `✅ *Berhasil mengunduh video!*\n🎬 ${title}`
    }, { quoted: m });

  } catch (err) {
    console.log('YTMP4 Error:', err);
    reply(`❌ Error saat memproses video:\n${err.message || err}`);
  }
}

async function yytmp4(m, RyuuBotz, text, prefix, reply) {
  if (!text) return reply(`*Example:* ${prefix}ytmp4 https://youtube.com/watch?v=...`);
  if (!text.includes('youtu')) return reply('Masukkan link YouTube yang valid!');
  await RyuuBotz.sendMessage(m.chat, { react: { text: '🕖', key: m.key } });

  try {
    const res = await fetch(`https://api.ditss.cloud/download/ytmp4?apikey=DitssGanteng&url=${encodeURIComponent(text)}`);
    if (!res.ok) throw await res.text();
    const json = await res.json();

    if (!json.status || !json.result?.link) return reply('Gagal mengambil video.');

    const { title, link, thumb } = json.result;
    const thumbnail = thumb || 'https://files.catbox.moe/m2xkzf.jpg';

    await RyuuBotz.sendMessage(m.chat, {
      video: { url: link },
      caption: `✅ *Berhasil mengunduh video!*\n🎬 ${title}`,
      contextInfo: {
        externalAdReply: {
          title,
          body: 'YouTube Video',
          thumbnailUrl: thumbnail,
          sourceUrl: text,
          mediaType: 2,
          renderLargerThumbnail: true,
        }
      }
    }, { quoted: m });

  } catch (err) {
    console.log('YYTMP4 Error:', err);
    reply(`❌ Error saat memproses video:\n${err.message || err}`);
  }
}

async function yytmp3(m, RyuuBotz, text, prefix, reply) {
  if (!text) return reply(`*Example:* ${prefix}ytmp3 https://youtube.com/watch?v=...`);
  if (!text.includes('youtu')) return reply('Masukkan link YouTube yang valid!');
  await RyuuBotz.sendMessage(m.chat, { react: { text: '🕖', key: m.key } });

  try {
    const res = await fetch(`https://api.ditss.cloud/download/ytmp3?apikey=DitssGanteng&url=${encodeURIComponent(text)}`);
    if (!res.ok) throw await res.text();
    const json = await res.json();

    if (!json.status || !json.result?.link) return reply('Gagal mengambil audio.');

    const { title, link, thumb } = json.result;
    const thumbnail = thumb || 'https://files.catbox.moe/m2xkzf.jpg';

    await RyuuBotz.sendMessage(m.chat, {
      audio: { url: link },
      mimetype: "audio/mp4",
      ptt: true,
      fileName: `${title}.mp3`,
      contextInfo: {
        externalAdReply: {
          title,
          body: 'YouTube Audio',
          thumbnailUrl: thumbnail,
          sourceUrl: text,
          mediaType: 1,
          renderLargerThumbnail: true,
        }
      }
    }, { quoted: m });

  } catch (err) {
    console.log('YYTMP3 Error:', err);
    reply(`❌ Error saat memproses audio:\n${err.message || err}`);
  }
}

module.exports = { ytmp3, ytmp4, yytmp3, yytmp4 };