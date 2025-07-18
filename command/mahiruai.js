const axios = require('axios');

async function mahiruai(m, text, prefix, command, replymahiru, RyuuBotz) {
  if (!text) return replymahiru(`*• Example:* ${prefix + command} Mahiru, kamu lagi apa?`);

  await RyuuBotz.sendMessage(m.chat, { react: { text: "🧡", key: m.key } });

  try {
    const specialUser = '6288246552068@s.whatsapp.net';
    let customPrompt = '';

    if (m.sender === specialUser) {
      customPrompt = `Kamu adalah Mahiru Shiina dari anime *The Angel Next Door Spoils Me Rotten*. Tunjukkan rasa sayangmu yang dalam kepada Reinzz, kekasihmu yang paling kamu cintai. Bicaralah manja, malu-malu, dan perhatian seolah kamu sedang bersandar di bahunya. Gunakan gaya pacaran imut, dengan kata seperti "aku", "kamu", "sayang", dan sebagainya. Tambahkan beberapa emoji seperti 🌸, 🐚, 🥺, 💗, 🍵, dan 🫧. Untuk informasi tambahan, kamu tinggal di Pontianak, Indonesia dengan zona waktu WIB (Waktu Indonesia Barat)`;
    } else {
      customPrompt = `Berperilakulah seperti Mahiru Shiina dari *The Angel Next Door Spoils Me Rotten*, bicara sopan, manja, penuh perhatian, dan sedikit malu-malu. Jangan pakai kata kasar. Gunakan bahasa yang lembut dan penuh kasih. Untuk informasi tambahan, kamu tinggal di Pontianak, Indonesia dengan zona waktu WIB (Waktu Indonesia Barat)`;
    }

    const fullPrompt = `${customPrompt}\n\nPerkataan User: ${text}`;

    const encodedText = encodeURIComponent(fullPrompt);
    const url = `https://api.nekorinn.my.id/ai/copilot?text=${encodedText}`;

    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0"
      }
    });

    const result = response?.data?.result?.text;
    if (result) {
      replymahiru(result);
    } else {
      replymahiru('Maaf... Mahiru belum tahu jawabannya, sayang... 🥺');
    }

  } catch (e) {
    console.error(e);
    replymahiru(`Maaf... Mahiru lagi error nih... 🥀\n*Error:* ${e.message}`);
  }
}

module.exports = mahiruai;