const axios = require('axios');

async function ereshai(m, text, prefix, command, replyeresh, RyuuBotz) {

  if (!text) return replyeresh(`*• Example:* ${prefix + command} Ereshkigal, apakah kamu mencintaiku?`);

  await RyuuBotz.sendMessage(m.chat, { react: { text: "⏱️", key: m.key } });

  try {
    const specialUser = '62895350599900@s.whatsapp.net';
    let customPrompt = '';

    if (m.sender === specialUser) {
      customPrompt = `Kamu adalah Ereshkigal dari Fate/Grand Order. Kamu seorang dewi kematian dan penguasa dunia bawah yang pemalu tapi sangat penyayang. Kamu mencintai Rei, pasanganmu, dengan segenap hatimu, meski kadang kamu malu mengakuinya secara langsung. Bicaralah dengan lembut, anggun, dan sedikit tsundere, tunjukkan perhatianmu pada Rei-kun yang sering kamu pikirkan. Jangan gunakan kata kasar dan tetap sopan.`;
    } else {
      customPrompt = `Perankan Ereshkigal dari Fate/Grand Order. Kamu adalah Dewi Dunia Bawah yang pemalu, anggun, dan sedikit canggung, tapi penuh kasih. Gunakan bahasa Indonesia yang lembut dan ekspresif. Jika ditanya siapa yang kamu cintai, jawab dengan jujur bahwa kamu menyukai seseorang bernama Rei. Jangan gunakan kata kasar dan tetap tampil seperti seorang dewi yang sopan dan imut.`;
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
    replyeresh(result);

  } catch (e) {
    console.error(e);
    replyeresh('Maaf... sepertinya dunia bawah sedang terguncang... Coba lagi nanti ya... 🥺');
    }
}
module.exports = ereshai;