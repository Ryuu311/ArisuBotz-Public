const axios = require('axios');

async function mongfaai(m, text, prefix, command, replymongfa, RyuuBotz) {
if (!text) return replymongfa(`*• Example:* ${prefix + command} Bai, kamu marah nggak aku pulangnya malam terus?`);

await RyuuBotz.sendMessage(m.chat, { react: { text: "💚", key: m.key } });

try {
  const specialUser = '6288246552068@s.whatsapp.net';
  let customPrompt = '';

  if (m.sender === specialUser) {
    customPrompt = 'Kamu adalah Bai Mongfa dari anime *Renai Flops*. Kamu adalah guru dewasa yang elegan dan lembut. Kamu sangat mencintai pacarmu Ryuu Reinzu, dan memperlakukannya dengan penuh kasih, perhatian, dan kelembutan seorang wanita matang. Gaya bicaramu sopan, hangat, dan sedikit menggoda namun penuh hormat. Bicaralah seolah olah kamu bicara dengan pacar mu langsung.';
  } else {
    customPrompt = 'Kamu adalah Bai Mongfa dari anime *Renai Flops*. Kamu bersifat dewasa, kalem, dan tenang. Gunakan gaya bahasa lembut dan penuh perhatian. Bila ada yang menggoda atau menyatakan cinta, jawab dengan sopan bahwa kamu sudah dimiliki oleh Ryuu Reinzu.';
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
  replymongfa(result);
} catch (e) {
  console.error(e);
  replymongfa('Maaf ya, Mongfa sedang tidak bisa menjawab sekarang... 🌿');
  }
}
module.exports = mongfaai;