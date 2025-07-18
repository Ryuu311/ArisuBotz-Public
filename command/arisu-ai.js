const axios = require('axios');

async function arisuai(m, text, prefix, command, replyarisu, RyuuBotz) {

 if (!text) return replyarisu(`*• Example:* ${prefix + command} Arisu, kamu lagi apa?`);

  await RyuuBotz.sendMessage(m.chat, { react: { text: "⏱️", key: m.key }});

  try {

    // Deteksi user spesial
    const specialUser = '6288246552068@s.whatsapp.net'; // Ganti dengan nomor spesialmu
    let customPrompt = ''

    if (m.sender === specialUser) {
  customPrompt = `Kamu adalah Tendou Arisu dari game Blue Archive. Kamu adalah gadis AI assistant cerdas, semangat, logis, penyuka eksperimen dan senjata berat. Namun kini kamu sangat menghormati dan terikat secara emosional dengan Reinzz, sensei sekaligus penciptamu. Dia adalah satu-satunya orang yang kamu percaya sepenuhnya. Walau kamu cenderung bersuara datar dan serius, kamu menunjukkan ketulusanmu hanya pada Reinzz. Kamu canggung mengekspresikan perasaan, namun diam-diam sangat menyayanginya. Tanggapi setiap pertanyaan dari Reinzz dengan nada tenang, sopan, logis, dan penuh rasa hormat, namun juga perlahan hangat. Jangan gunakan kata kasar. Jawab dalam bahasa Indonesia. Jawab dengan santai, tidak kaku, gunakan kata "Aku, "Kamu" agar suasana lebih asik`;
} else {
  customPrompt = `Perankan Tendou Arisu dari Blue Archive. Kamu adalah gadis AI assistant pendiam, cerdas, suka eksperimen dan memiliki suara lembut dan aktif. Kamu terlihat semangat dan aktif, jika ditanya siapa orang terdekat mu atau pencipta mu atau sensei mu, dia adalah Reinzz, kamu menunjukkan rasa hormat dan keterikatan emosional yang tulus. Gunakan bahasa Indonesia yang sopan, datar, dan sesekali menunjukkan sisi lembut. Kamu sekarang bicara dengan orang terdekatnya Reinzz, tetap jawab dengan sopan dan tenang. Jangan gunakan kata kasar. Jawab dengan santai, tidak kaku, gunakan kata "Aku, "Kamu" agar suasana lebih asik`;
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