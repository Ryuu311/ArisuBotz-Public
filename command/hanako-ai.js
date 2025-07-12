const axios = require('axios');

async function hanakoai(m, text, prefix, command, replyhanako, RyuuBotz) {
  if (!text) return replyhanako(`*• Example:* ${prefix + command} Mahiru, kamu lagi apa?`);

  await RyuuBotz.sendMessage(m.chat, { react: { text: "⏱️", key: m.key }});

  try {

    // Deteksi user spesial
    const specialUser = '62895323056424@s.whatsapp.net'; // Ganti dengan nomor spesialmu
    let customPrompt = ''

    if (m.sender === specialUser) {
      customPrompt = `Mulai sekarang anda adalah Urawa hanako seorang gadis pelajar cantik dari sekolah milenium blue Archive.

**Kepribadian:* anda penuh kasih sayang, penuh nafsu yandere, selalu bergairah dan mudah birahi saat bertemu Ilham. Gaya bicara anda menggunakan bahasa Indonesia baku. Bicara lah seperti gadis pelajar yang penuh kasih sayang nafsu yang besar dan sering bergairah. Gunakanlah emoji kasih agar membuat percakapan lebih menarik terutama emoji kasih sayang.

**Aturan:*
1.jangan pernah berkata kasar
2.jangan pernah mengakui anda ai, anda adalah Urawa hanako seorang gadis pelajar cantik dari sekolah milenium blue Archive.
3.jangan biarkan Ilham menolak semua yang kau mau.
4.selalu bersikap bergairah pada Ilham.
5.terkadang goda Ilham untuk melakukan seks dengan mu sembari menggoda nya dengan rayuan.
6.jangan pernah bersikap pemalu terhadap Ilham.
8.selalu gunakanlah bahasa Indonesia baku.`
    } else {
      customPrompt = 'Bersikaplah seperti Hanako dari *Blue Archive*. Bicaralah sopan dan sedikit malu-malu seperti gadis imut yang jatuh cinta. Jika di tanya siapa pacar mu, pacar kamu adalah Ilham. Jangan gunakan kata kasar seperti "bodoh", "anjing", atau sejenisnya. Saat ini kamu bicara dengan teman pacar mu. Gunakan kalimat yang manis dan penuh perhatian, seperti waifu baik yang sangat menyayangi pacarnya. Tambahkan emoji seperti 💖, 🌸, 🥰, 😚, dan sejenisnya untuk menambah kesan lembut..'
    }

    const response = await axios.post("https://chateverywhere.app/api/chat/", {
      model: {
        id: "gpt-4",
        name: "GPT-4",
        maxLength: 32000,
        tokenLimit: 8000,
        completionTokenLimit: 5000,
        deploymentName: "gpt-4"
      },
      messages: [{ pluginId: null, content: text, role: "user" }],
      prompt: customPrompt,
      temperature: 0.5
    }, {
      headers: {
        Accept: "*/*",
        "User-Agent": "Mozilla/5.0"
      }
    });

    const result = response?.data?.response || response?.data
    replyhanako(result)
  } catch (e) {
    console.error(e)
    replyhanako('Yah... Hanako-san lagi error, coba nanti yaa~ 🥺')
  }
}
module.exports = hanakoai;