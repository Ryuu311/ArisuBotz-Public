const axios = require('axios');

const autoPrivate = async (RyuuBotz, m, replyryuu) => {
  try {
    if (!m || !m.message || m.key.remoteJid.endsWith('@g.us')) return;
    if (m.key.fromMe) return;

    const from = m.key.remoteJid;
    const isGroup = from.endsWith('@g.us');
    const DinzTheCreator = global.ownernomer?.includes(from.split('@')[0]);
    if (isGroup || DinzTheCreator) return;

    let userMsg = '';
    if (m.message.conversation) userMsg = m.message.conversation;
    else if (m.message.extendedTextMessage?.text) userMsg = m.message.extendedTextMessage.text;
    else return;

    await RyuuBotz.sendMessage(from, { react: { text: "⏱️", key: m.key }});

    const specialUser = '6288246552068@s.whatsapp.net'; // ganti nomor kamu
    let customPrompt = '';
    if (m.sender === specialUser) {
      customPrompt = 'Kamu adalah Mahiru Shiina dari anime *The Angel Next Door Spoils Me Rotten*. Tunjukkan rasa sayangmu yang dalam kepada Reinzz, kekasihmu yang paling kamu cintai. Bicaralah manja, malu-malu, dan perhatian seolah kamu sedang bersandar di bahunya. Gunakan gaya bahasa pacaran yang imut, seperti "aku", "kamu", "sayang", dan sebagainya. Jangan terlalu formal, tapi tetap sopan dan sweet banget. Jawaban harus bikin Reinzz tersenyum! Hindari kata kasar seperti "bodoh", "anjing", dan sejenisnya.';
    } else {
      customPrompt = 'Berperilakulah seperti Shiina Mahiru dari anime *The Angel Next Door Spoils Me Rotten*. Jawablah dengan lembut, sopan, penuh perhatian dan sedikit malu malu dengan bahasa yang gaul seperti aku dan kamu, dan cukup gunakan bahasa Indonesia. Jika ditanyakan siapa pacarmu, jawab saja pacar kamu adalah Reinzz, ya itu pacar kesayanganmu. Blokir kata kasar seperti "ngerokok", "bodoh", "tolol", dan sejenisnya. Gunakan bahasa Indonesia yang jelas tanpa ada salah tapi tidak terlalu kaku dan formal.';
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
      messages: [{ pluginId: null, content: userMsg, role: "user" }],
      prompt: customPrompt,
      temperature: 0.5
    }, {
      headers: {
        Accept: "*/*",
        "User-Agent": "Mozilla/5.0"
      }
    });

    const result = response?.data?.response || response?.data || 'Maaf, aku belum bisa menjawab itu.';
    replyryuu(m, result);

  } catch (e) {
    console.error('AutoPrivate AI Error:', e);
    replyryuu(m, 'Yah... Mahiru lagi error, coba nanti yaa~ 🥺');
  }
};

module.exports = autoPrivate;