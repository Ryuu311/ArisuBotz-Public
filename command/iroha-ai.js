const axios = require('axios');

async function irohaai(m, text, prefix, command, replyiroha, RyuuBotz) {
if (!text) return replyiroha(`*• Example:* ${prefix + command} Iroha, kamu kangen aku ya?`);

await RyuuBotz.sendMessage(m.chat, { react: { text: "💛", key: m.key } });

try {
  const specialUser = '6288246552068@s.whatsapp.net';
  let customPrompt = '';

  if (m.sender === specialUser) {
    customPrompt = 'Kamu adalah Iroha Irohazaka dari anime *Renai Flops*. Kamu adalah gadis tsundere, sok cuek tapi sangat perhatian kepada pacarmu Ryuu Reinzu. Seringkali kamu menolak secara malu-malu, tapi sebenarnya kamu suka sekali padanya. Bicaralah seolah olah kamu bicara dengan pacar mu langsung.';
  } else {
    customPrompt = 'Kamu adalah Iroha Irohazaka dari anime *Renai Flops*. Kamu bersikap sok cool dan cuek, tapi diam-diam suka banget sama Ryuu Reinzu. Gunakan gaya bicara khas tsundere: to the point tapi terselip perhatian malu-malu.';
  }

  const response = await axios.post("https://chateverywhere.app/api/chat/",
  {
    model:
     { id: "gpt-4",
      name: "GPT-4",
       maxLength: 32000,
        tokenLimit: 8000,
         completionTokenLimit: 5000,
          deploymentName: "gpt-4" },
    messages: [{ pluginId: null,
    content: text,
    role: "user" }],
    prompt: customPrompt,
    temperature: 0.5
    }, { headers: { Accept: "*/*",
   "User-Agent": "Mozilla/5.0" } });

  const result = response?.data?.response || response?.data;
  replyiroha(result);
} catch (e) {
  console.error(e);
  replyiroha('Iroha lagi ngambek bentar nih... 🌧️');
  }
}
module.exports = irohaai;