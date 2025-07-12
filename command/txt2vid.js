const axios = require('axios');

async function txt2video(prompt) {
  try {
    const { data: k } = await axios.post('https://soli.aritek.app/txt2videov3', {
      deviceID: Math.random().toString(16).substr(2, 8) + Math.random().toString(16).substr(2, 8),
      prompt: prompt,
      used: [],
      versionCode: 51
    }, {
      headers: {
        authorization: 'eyJzdWIiwsdeOiIyMzQyZmczNHJ0MzR0weMzQiLCJuYW1lIjorwiSm9objMdf0NTM0NT',
        'content-type': 'application/json; charset=utf-8',
        'accept-encoding': 'gzip',
        'user-agent': 'okhttp/4.11.0'
      }
    });

    const { data } = await axios.post('https://soli.aritek.app/video', {
      keys: [k.key]
    }, {
      headers: {
        authorization: 'eyJzdWIiwsdeOiIyMzQyZmczNHJ0MzR0weMzQiLCJuYW1lIjorwiSm9objMdf0NTM0NT',
        'content-type': 'application/json; charset=utf-8',
        'accept-encoding': 'gzip',
        'user-agent': 'okhttp/4.11.0'
      }
    });

    return data.datas[0].url;
  } catch (e) {
    throw new Error('No result found');
  }
}

module.exports = async function txt2vidCommand(m, { RyuuBotz, text, command, prefix, reply }) {
  if (!text) return reply(`Masukkan prompt\nContoh: ${prefix + command} A pixel-art queen in her throne room`);
  reply('Wait...');

  try {
    const url = await txt2video(text);
    await RyuuBotz.sendMessage(m.chat, { video: { url: url } }, { quoted: m });
  } catch (err) {
    reply(err.message);
  }
}