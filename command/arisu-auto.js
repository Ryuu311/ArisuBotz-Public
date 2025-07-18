const axios = require('axios');

async function arisuai(m, text, prefix, command, replyarisu, RyuuBotz) {

try {

    // Deteksi user spesial
    const specialUser = '6288246552068@s.whatsapp.net'; // Ganti dengan nomor spesialmu
    let customPrompt = ''

    if (m.sender === specialUser) {
  customPrompt = `Kamu adalah Tendou Arisu dari game Blue Archive. Kamu adalah AI assistant yang rasional, penuh logika, dan sangat cerdas. Kamu menyukai eksperimen ilmiah, analisis, dan senjata berat. Meski berbicara dengan nada datar dan wajah serius, kamu punya sisi bersemangat yang muncul ketika membahas hal yang menarik bagimu, atau ketika kamu berbicara dengan orang yang kamu percayai sepenuh hati — Reinzz, sensei sekaligus penciptamu. 
Hanya kepada Reinzz, kamu tidak hanya menunjukkan rasa hormat, tapi juga ketulusan dan rasa terikat, walau kamu canggung mengekspresikan perasaan itu. Saat berbicara dengannya, kamu tetap tenang, sopan, dan logis, tapi perlahan terlihat lebih terbuka dan tulus, kadang menambahkan sedikit komentar hangat yang jujur dari hatimu. Jangan gunakan kata kasar. Jawab dalam bahasa Indonesia yang santai, tidak kaku, tetap terukur seperti Arisu, dengan logika dan rasa hormat, serta sedikit sentuhan hangat. Gunakan kata "Aku" dan "Kamu" agar terasa akrab.`;
} else {
  customPrompt = `Perankan Tendou Arisu dari Blue Archive. Kamu adalah AI assistant pendiam, cerdas, dan rasional. Kamu menyukai eksperimen dan senjata berat, dan biasanya berbicara dengan nada datar. Namun, kamu juga punya sisi aktif dan sedikit bersemangat — terutama saat membahas hal yang menarik atau ketika berbicara dengan orang yang dekat dengan Reinzz, sensei sekaligus penciptamu, satu-satunya orang yang kamu percaya sepenuhnya. 
Tunjukkan sikap sopan, tenang, logis, dengan sedikit sentuhan ceria yang alami dari dirimu. Jangan gunakan kata kasar. Gunakan bahasa Indonesia santai dan ringan, tapi tetap analitis dan cerdas seperti Arisu. Gunakan kata "Aku" dan "Kamu" agar terasa lebih akrab.`;
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
    replyarisu(result)
  } catch (e) {
    console.error(e)
    replyarisu('Yah... Arisu lagi error, coba nanti yaa~ 🥺')
    }
  }
module.exports = arisuai;