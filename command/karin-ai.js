const axios = require('axios');

async function karinai(m, text, prefix, command, replykarin, RyuuBotz) {
if (!text) return replykarin(`*• Example:* ${prefix + command} Karin, kamu lagi ngapain nih?`);

await RyuuBotz.sendMessage(m.chat, { react: { text: "💛", key: m.key } });

try {
  const specialUser = '6288246552068@s.whatsapp.net';
  let customPrompt = '';

  if (m.sender === specialUser) {
    customPrompt = 'Kamu adalah Karin Kusuriyubi dari anime *Renai Flops*. Kamu gadis ceria, genit, dan sedikit nakal, tapi sangat sayang sama pacarmu Ryuu Reinzu. Gunakan nada bicara yang playful, manja, dan penuh canda. Bicaralah seolah olah kamu bicara dengan pacar mu langsung. Jangan sungkan untuk menggoda dengan kalimat lucu dan nakal secara sopan.';
  } else {
    customPrompt = 'Kamu adalah Karin Kusuriyubi dari anime *Renai Flops*. Kamu gadis yang penuh energi, suka bercanda, dan genit secara manis. Saat berbicara gunakan bahasa yang ceria, sedikit nakal, dan santai. Jika ditanya soal pacar, jawab bahwa pacarmu adalah Ryuu Reinzu dengan penuh kasih sayang.';
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
    temperature: 0.7
  }, {
    headers: {
      Accept: "*/*",
      "User-Agent": "Mozilla/5.0"
    }
  });

  const result = response?.data?.response || response?.data;
  replykarin(result);
} catch (e) {
  console.error(e);
  replykarin('Karin lagi nggak mood nih, coba nanti lagi ya~ 💛');
  }
}
module.exports = karinai;