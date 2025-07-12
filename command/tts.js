const axios = require('axios')

async function tts2(m, { text, RyuuBotz, replyryuu }) {
if (!text.includes('|')) {  
    return replyryuu(`⌬┄┄┄┄┄┄┄┄┄┄┄┄┄┄⌬  
       *L I S T - K A R A K T E R*  
⌬┄┄┄┄┄┄┄┄┄┄┄┄┄┄⌬  
  
• *airi* - Airi 🩷  
• *akane* - Akane 🌸  
• *akari* - Akari 🧡  
• *ako* - Ako 💼  
• *aris* - Aris 🎯  
• *arona* - Arona 🤖  
• *aru* - Aru 💣  
• *asuna* - Asuna 📚  
• *atsuko* - Atsuko 🧃  
• *ayane* - Ayane 🦋  
• *azusa* - Azusa 🌙  
• *cherino* - Cherino ❄️  
• *chihiro* - Chihiro 🗂️  
• *chinatsu* - Chinatsu 💊  
• *chise* - Chise 🔥  
• *eimi* - Eimi 👓  
• *erica* - Erica 🎀  
• *fubuki* - Fubuki 🍃  
• *fuuka* - Fuuka 🧺  
• *hanae* - Hanae 💐  
• *hanako* - Hanako 🛏️  
• *hare* - Hare 🦊  
• *haruka* - Haruka 🥋  
• *haruna* - Haruna 🎯  
• *hasumi* - Hasumi 🔫  
• *hibiki* - Hibiki 🎧  
• *hihumi* - Hihumi 🔮  
• *himari* - Himari 🌼  
• *hina* - Hina 👑  
• *hinata* - Hinata 🐇  
• *hiyori* - Hiyori 🍭  
• *hoshino* - Hoshino ⭐  
• *iori* - Iori 💥  
• *iroha* - Iroha 🚀  
• *izumi* - Izumi 🍞  
• *izuna* - Izuna 🐺  
• *juri* - Juri 🧪  
• *kaede* - Kaede 🍁  
• *karin* - Karin 🎯  
• *kayoko* - Kayoko 🎭  
• *kazusa* - Kazusa 🥀  
• *kirino* - Kirino 🎀  
• *koharu* - Koharu ☀️  
• *kokona* - Kokona 🐤  
• *kotama* - Kotama 🎮  
• *kotori* - Kotori 🐦  
• *main* - Main 🎙️  
• *maki* - Maki 🔫  
• *mari* - Mari 🍰  
• *marina* - Marina ⚓  
• *mashiro* - Mashiro 🐱  
• *michiru* - Michiru 🎨  
• *midori* - Midori 🧩  
• *miku* - Miku 💙  
• *mimori* - Mimori 🧶  
• *misaki* - Misaki 💄  
• *miyako* - Miyako 🎀  
• *miyu* - Miyu 🦈  
• *moe* - Moe 💡  
• *momoi* - Momoi 🖥️  
• *momoka* - Momoka 🎤  
• *mutsuki* - Mutsuki 🎇  
• *NP0013* - NP0013 🤖  
• *natsu* - Natsu ☀️  
• *neru* - Neru 🏍️  
• *noa* - Noa 💻  
• *nodoka* - Nodoka 📖  
• *nonomi* - Nonomi 🍔  
• *pina* - Pina 🍬  
• *rin* - Rin 🌸  
• *saki* - Saki 🎵  
• *saori* - Saori 🔫  
• *saya* - Saya 💉  
• *sena* - Sena 🧃  
• *serika* - Serika 🎒  
• *serina* - Serina 💊  
• *shigure* - Shigure 🌧️  
• *shimiko* - Shimiko 🍓  
• *shiroko* - Shiroko 🚲  
• *shizuko* - Shizuko 📦  
• *shun* - Shun 🎓  
• *ShunBaby* - Shun (Baby ver.) 👶  
• *sora* - Sora ☁️  
• *sumire* - Sumire 🌸  
• *suzumi* - Suzumi 📚  
• *tomoe* - Tomoe 🎭  
• *tsubaki* - Tsubaki 🛡️  
• *tsurugi* - Tsurugi 🗡️  
• *ui* - Ui 🍓  
• *utaha* - Utaha 🖋️  
• *wakamo* - Wakamo 🐍  
• *yoshimi* - Yoshimi 🍡  
• *yuuka* - Yuuka 📏  
• *yuzu* - Yuzu 🍋  
• *zunko* - Zunko 🎶  
  
Gunakan format:  
*.ttsba teks|karakter*  
  
Contoh:  
*.ttsba halo dunia|shiroko*`);  
  }  
  
  let [teks, char, speed] = text.split('|').map(v => v.trim());  
  if (!teks || !char) return replyryuu(`❌ Format salah!\nContoh: .ttsba Halo|shiroko`);  
  speed = speed || '1';  
await RyuuBotz.sendMessage(m.chat, { react: { text: "⏱️", key: m.key } });  
  try {  
    const url = `https://api.nekorinn.my.id/tools/ttsba?text=${encodeURIComponent(teks)}&char=${encodeURIComponent(char)}&speed=${speed}`;  
    const response = await axios.get(url, { responseType: 'arraybuffer' });  
  
    await RyuuBotz.sendMessage(m.chat, {  
      audio: Buffer.from(response.data),  
      mimetype: 'audio/mpeg',  
      ptt: false  
    }, { quoted: m });  
  
  } catch (err) {  
    return replyryuu(`❌ Gagal memproses suara.\nPastikan karakter *${char}* tersedia dan coba lagi.`);  
  }  
 }

async function tts3(m, { text, RyuuBotz, reply }) {  
  if (!text) return reply(`⌬┄┄┄┄┄┄┄┄┄┄┄┄┄┄⌬  
       *L I S T - M O D E L*  
⌬┄┄┄┄┄┄┄┄┄┄┄┄┄┄⌬  
  
• *miku* - Hatsune Miku 🌀  
• *nahida* - Nahida (Exclusive) 🌿  
• *nami* - Nami dari One Piece 🌊  
• *ana* - Ana (Suara wanita umum) 🎙️  
• *optimus_prime* - Optimus Prime 🤖  
• *goku* - Goku (Dragon Ball) 🟠  
• *taylor_swift* - Taylor Swift 🎤  
• *elon_musk* - Elon Musk 🧠  
• *mickey_mouse* - Mickey Mouse 🐭  
• *kendrick_lamar* - Kendrick Lamar 🎶  
• *angela_adkinsh* - Angela Adkinsh 👩‍💼  
• *eminem* - Eminem 🎧  
  
Gunakan format:  
*.tts3 teks|model*  
  
Contoh:  
*.tts3 halo dunia|miku*`)  
  
  let [isi, model] = text.split('|').map(v => v.trim().toLowerCase())  
  
  const models = {  
    miku:            { voice_id: "67aee909-5d4b-11ee-a861-00163e2ac61b", voice_name: "Hatsune Miku" },  
    nahida:          { voice_id: "67ae0979-5d4b-11ee-a861-00163e2ac61b", voice_name: "Nahida" },  
    nami:            { voice_id: "67ad95a0-5d4b-11ee-a861-00163e2ac61b", voice_name: "Nami" },  
    ana:             { voice_id: "f2ec72cc-110c-11ef-811c-00163e0255ec", voice_name: "Ana" },  
    optimus_prime:   { voice_id: "67ae0f40-5d4b-11ee-a861-00163e2ac61b", voice_name: "Optimus Prime" },  
    goku:            { voice_id: "67aed50c-5d4b-11ee-a861-00163e2ac61b", voice_name: "Goku" },  
    taylor_swift:    { voice_id: "67ae4751-5d4b-11ee-a861-00163e2ac61b", voice_name: "Taylor Swift" },  
    elon_musk:       { voice_id: "67ada61f-5d4b-11ee-a861-00163e2ac61b", voice_name: "Elon Musk" },  
    mickey_mouse:    { voice_id: "67ae7d37-5d4b-11ee-a861-00163e2ac61b", voice_name: "Mickey Mouse" },  
    kendrick_lamar:  { voice_id: "67add638-5d4b-11ee-a861-00163e2ac61b", voice_name: "Kendrick Lamar" },  
    angela_adkinsh:  { voice_id: "d23f2adb-5d1b-11ee-a861-00163e2ac61b", voice_name: "Angela Adkinsh" },  
    eminem:          { voice_id: "c82964b9-d093-11ee-bfb7-e86f38d7ec1a", voice_name: "Eminem" }  
  }  
  
  if (!isi || !model || !models[model]) return reply(`❌ Pastikan format benar: .tts3 teks|model\n\nModel tersedia:\n` + Object.keys(models).join(', '))  
  
  let { voice_id, voice_name } = models[model]  
  let userAgents = [  
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",  
    "Mozilla/5.0 (Macintosh; Intel Mac OS X)",  
    "Mozilla/5.0 (Linux; Android 8.0.0)"  
  ]  
  
  function getRandomIp() {  
    return Array.from({ length: 4 }).map(() => Math.floor(Math.random() * 256)).join('.')  
  }  
  
  let proses = await reply('_⏳ Sedang membuat suara..._')  
  
  try {  
    let headers = {  
      'Content-Type': 'application/json',  
      'Accept': '*/*',  
      'X-Forwarded-For': getRandomIp(),  
      'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)]  
    }  
  
    let payload = {  
      raw_text: isi,  
      url: "https://filme.imyfone.com/text-to-speech/anime-text-to-speech/",  
      product_id: "200054",  
      convert_data: [{  
        voice_id,  
        speed: "1",  
        volume: "50",  
        text: isi,  
        pos: 0  
      }]  
    }  
  
    const endpoint = 'https://voxbox-tts-api.imyfone.com/pc/v1/voice/tts'  
    const res = await axios.post(endpoint, payload, { headers })  
    const result = res.data?.data?.convert_result?.[0]?.oss_url  
  
    if (!result) throw 'Gagal mendapatkan suara. Coba lagi nanti.'  
  
    await RyuuBotz.sendMessage(m.chat, {  
      audio: { url: result },  
      mimetype: 'audio/mpeg',  
      ptt: true  
    }, { quoted: m })  
  
  } catch (e) {  
    reply(`❌ Error: ${e.message || e}`)  
  } finally {  
    if (proses?.key) await RyuuBotz.sendMessage(m.chat, { delete: proses.key })  
  }  
}

module.exports = {
  tts2,
  ttsba: tts2, // alias
  'tts-blue-archive': tts2,
  tts3
}