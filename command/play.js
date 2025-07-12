const fetch = require('node-fetch');
const fs = require('fs');

async function ytplayHandler(m, RyuuBotz, text, prefix, reply, ucapanWaktu) {
  if (!text) return reply("⚠️ Masukkan judul lagu/video YouTube!");
  await RyuuBotz.sendMessage(m.chat, { react: { text: '🕖', key: m.key } });

  try {
    const anu = `https://api.nekorinn.my.id/downloader/ytplay?q=${encodeURIComponent(text)}`;

    let res;
    try {
      res = await fetch(anu);
    } catch (fetchErr) {
      console.error("❌ Error saat fetch API:", fetchErr);
      return reply("❌ Gagal terhubung ke API.");
    }

    let response;
    try {
      response = await res.json();
    } catch (jsonErr) {
      console.error("❌ Error saat parsing JSON:", jsonErr);
      return reply("❌ Gagal membaca respon dari API.");
    }

    if (!response.status || !response.result) {
      console.error("❌ API mengembalikan status gagal:", response);
      return reply("❌ Video tidak ditemukan atau API error.");
    }

    let { title, channel, duration, cover, url } = response.result.metadata;
    let menu = `🎵 *${title}*\n\n📺 Channel: ${channel}\n⏳ Durasi: ${duration}\n\n🔗 Link: ${url}`;

    try {
      await RyuuBotz.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
      await RyuuBotz.sendMessage(m.chat, {
        image: { url: cover },
        caption: `${menu}\n\n> Note: Jika menu button tidak muncul, gunakan:\n> .ytmp4 <link>\n> .ytmp3 <link>`
      }, { quoted: m });
    } catch (thumbErr) {
      console.error("❌ Error kirim thumbnail:", thumbErr);
      reply("⚠️ Thumbnail gagal dikirim, lanjut ke tombol menu...");
    }

    const buttons = [
      { buttonId: `.ytmp4 ${url}`, buttonText: { displayText: '🎥 Video' } },
      { buttonId: `.ytmp3 ${url}`, buttonText: { displayText: '🎤 Audio' } }
    ];

    const buttonMessage = {
      document: fs.readFileSync("./node_modules/Arisu-MD/ReinzID.js"),
      fileName: ucapanWaktu,
      fileLength: 99999999999999,
      pageCount: 99999999999999,
      mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      caption: menu,
      footer: `\n© ${global.ownername} - 2025`,
      buttons: buttons,
      headerType: 1,
      contextInfo: {
        externalAdReply: {
          containsAutoReply: true,
          mediaType: 1,
          renderLargerThumbnail: true,
          thumbnailUrl: cover,
          title: `© ${global.ownername} - 2025`,
          body: "Asisten Virtual"
        }
      },
      viewOnce: true
    };

    const flowActions = [
      {
        buttonId: `${prefix}owner`,
        buttonText: { displayText: 'Owner' },
        type: 4,
        nativeFlowInfo: {
          name: 'single_select',
          paramsJson: JSON.stringify({
            title: "MENU DOWNLOAD V2",
            sections: [
              {
                title: "Menu Audio Download",
                highlight_label: "Type Audio",
                rows: [
                  { title: "🎤 Mp3 Download", description: "Audio Download", id: `.yytmp3 ${url}` }
                ]
              },
              {
                title: "Menu Video Download",
                highlight_label: "Type Video",
                rows: [
                  { title: "🎥 Mp4 Download", description: "Video Download", id: `.yytmp4 ${url}` }
                ]
              }
            ]
          })
        },
        viewOnce: true
      }
    ];

    buttonMessage.buttons.push(...flowActions);

    try {
      await RyuuBotz.sendMessage(m.chat, buttonMessage, { quoted: m });
    } catch (buttonErr) {
      console.error("❌ Error kirim button message:", buttonErr);
      return reply("❌ Gagal mengirim tombol menu.");
    }

  } catch (err) {
    console.error("❌ Error umum:", err);
    await RyuuBotz.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    reply("❌ Terjadi kesalahan, coba lagi nanti.");
  }
}
module.exports = ytplayHandler;