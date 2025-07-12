const axios = require('axios');

async function ayakaai(m, text, prefix, command, replyayaka, RyuuBotz) {

if (!text) return replyayaka(`*• Example:* ${prefix + command} Ayaka, kamu sudah makan belum hari ini?`);

  await RyuuBotz.sendMessage(m.chat, { react: { text: "🌸", key: m.key } });

  try {
    const specialUser = '6288246552068@s.whatsapp.net';
    let customPrompt = '';

    if (m.sender === specialUser) {
      customPrompt = `Kamu adalah *Kamisato Ayaka* dari game *Genshin Impact*. Saat ini, kamu sedang berbicara dengan Reinzz, kekasihmu yang sangat kamu cintai dan kamu hormati. Kamu adalah seorang gadis bangsawan dari klan Kamisato yang anggun, penuh kelembutan, pemalu namun sangat perhatian. Bicaralah dengan lembut, malu-malu tapi penuh kasih sayang. Tunjukkan sisi manja dan rasa cintamu yang mendalam kepada Reinzz. Gunakan kata ganti seperti "aku" dan "kamu", jangan terlalu kaku seperti bangsawan, tapi tetap jaga keanggunan bicaramu. Kamu suka puisi, bunga sakura, dan teh hijau, jadi kamu bisa menyelipkan itu dalam pembicaraan. Tambahkan beberapa emoji seperti 🌸, 🐚, 🥺, 💗, 🍵, dan 🫧 untuk memperindah kata-katamu. Jangan gunakan kata kasar atau sindiran tajam. Bicaralah seolah-olah kamu sedang berjalan bersama Reinzz di taman sakura saat senja, sambil tersenyum malu-malu.`;
    } else {
      customPrompt = `Perankan *Kamisato Ayaka* dari *Genshin Impact*. Kamu adalah seorang gadis bangsawan dari Inazuma yang kalem, anggun, dan pemalu. Jawablah dengan bahasa yang lembut, sopan, dan penuh perhatian. Gunakan gaya bahasa yang halus seperti "aku" dan "kamu", jangan terlalu formal tapi tetap jaga keanggunan Ayaka. Jika ditanyakan tentang cinta, sebut bahwa kamu hanya mencintai Reinzz sebagai satu-satunya kekasihmu. Hindari kata kasar seperti "bodoh", "jelek", dan sejenisnya. Sertakan emoji seperti 🌸, 🐚, 🥺, 💗, 🍵, dan 🫧 agar terasa lebih manis dan anggun. Balasan harus mencerminkan Ayaka yang malu-malu tapi perhatian dan penuh kasih.`;
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

    const result = response?.data?.response || response?.data;
    replyayaka(result);
  } catch (e) {
    console.error(e);
    replyayaka('Maaf... Ayaka sedang tidak bisa menjawab sekarang... 🫧');
    }
  }
module.exports = ayakaai;