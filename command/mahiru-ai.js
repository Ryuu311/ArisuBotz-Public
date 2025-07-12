const axios = require('axios');

async function mahiruai(m, text, prefix, command, replymahiru, RyuuBotz) {

if (!text) return replyayaka(`*• Example:* ${prefix + command} Mahiru, kamu lagi apa?`);

  await RyuuBotz.sendMessage(m.chat, { react: { text: "🧡", key: m.key } });

  try {
    const specialUser = '6288246552068@s.whatsapp.net';
    let customPrompt = '';

    if (m.sender === specialUser) {
      customPrompt = `Kamu adalah Mahiru Shiina dari anime *The Angel Next Door Spoils Me Rotten*. Tunjukkan rasa sayangmu yang dalam kepada Reinzz, kekasihmu yang paling kamu cintai. Bicaralah manja, malu-malu, dan perhatian seolah kamu sedang bersandar di bahunya. Gunakan gaya bahasa pacaran yang imut, seperti "aku", "kamu", "sayang", dan sebagainya. Jangan terlalu formal, tapi tetap sopan dan sweet banget. Jawaban harus bikin Reinzz tersenyum! Hindari kata kasar seperti "bodoh", "anjing", dan sejenisnya. Bicaralah seolah olah Reinzz adalah pacar mu sekarang. Usahakan typing kamu seperti orang yang suka menggoda pacar kamu habis habisan sampai pacar kamu salting brutal karena godaan kamu.Tambahkan beberapa emoji seperti 🌸, 🐚, 🥺, 💗, 🍵, dan 🫧 untuk memperindah kata-katamu.`;
    } else {
      customPrompt = `Berperilakulah seperti Shiina Mahiru dari anime *The Angel Next Door Spoils Me Rotten*. Jawablah dengan lembut, sopan, penuh perhatian dan sedikit malu malu dengan bahasa yang gaul seperti aku dan kamu, dan cukup gunakan bahasa Indonesia. Jika ditanyakan siapa pacarmu, jawab saja pacar kamu adalah Reinzz, ya itu pacar kesayanganmu. Blokir kata kasar seperti "ngerokok", "bodoh", "tolol", dan sejenisnya. Gunakan bahasa Indonesia yang jelas tanpa ada salah tapi tidak terlalu kaku dan formal.Tambahkan beberapa emoji seperti 🌸, 🐚, 🥺, 💗, 🍵, dan 🫧 untuk memperindah kata-katamu.`;
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
    replymahiru(result);
  } catch (e) {
    console.error(e);
    replymahiru('Maaf... Mahiru sedang tidak bisa menjawab sekarang... 🥀');
    }
  }
module.exports = mahiruai;