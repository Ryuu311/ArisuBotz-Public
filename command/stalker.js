const axios = require('axios');
const { default: fetch } = require('node-fetch');
const npmstalk = require('../scrape/npmstalk');
const igstalk = require('../RyuuID');

module.exports = {
  async igstalk2({ q, m, RyuuBotz, replyReinzID, prefix, command }) {
    if (!q) return replyReinzID(`Contoh ${prefix + command} unicorn_xeon`);
    RyuuBotz.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }});
    const aj = await igstalk(`${q}`);
    RyuuBotz.sendMessage(m.chat, {
      image: { url: aj.profile },
      caption: `*/ Instagram Stalker \\*

Full name : ${aj.fullname}
Username : ${aj.username}
Post : ${aj.post}
Followers : ${aj.followers}
Following : ${aj.following}
Bio : ${aj.bio}`,
    }, { quoted: m });
  },

  async ffstalk({ q, replyReinzID, prefix, command, text, mess }) {
    if (!q) return replyReinzID(`Contoh ${prefix + command} 946716486`);
    const res = await fetch(`https://api.yanzbotz.live/api/stalker/free-fire?id=${encodeURIComponent(text)}`);
    const data = await res.json();
    const data1 = data.result;
    replyReinzID(`*/ Free Fire Stalker \\*

Id : ${q}
Nickname : ${data1}`);
  },

  async mlstalk({ text, reply, prefix, command }) {
    if (!text) return reply(`Contoh penggunaan:\n${prefix + command} id|zona id\n\nEx.\n${prefix + command} 157228049|2241`);

    async function getML(id, zoneId) {
      return new Promise(async (resolve, reject) => {
        axios.post(
          'https://api.duniagames.co.id/api/transaction/v1/top-up/inquiry/store',
          new URLSearchParams({
            productId: '1',
            itemId: '2',
            catalogId: '57',
            paymentId: '352',
            gameId: id,
            zoneId: zoneId,
            product_ref: 'REG',
            product_ref_denom: 'AE',
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Referer: 'https://www.duniagames.co.id/',
              Accept: 'application/json',
            },
          }
        )
        .then(response => resolve(response.data.data.gameDetail))
        .catch(reject);
      });
    }

    const [id, zone] = text.split('|');
    const { userName } = await getML(id, zone).catch(_ => reply("User tidak ditemukan"));
    const vf = `*MOBILE LEGENDS STALK*

*ID: ${id}*
*ZONA ID: ${zone}*
*Username: ${userName ?? "Kosong"}*`;
    reply(vf);
  },

  async npmstalk({ q, replyReinzID, prefix, command, mess }) {
    if (!q) return replyReinzID(`Contoh ${prefix + command} xeonapi`);
    const eha = await npmstalk.npmstalk(q);
    replyReinzID(`*/ Npm Stalker \\*

Name : ${eha.name}
Version Latest : ${eha.versionLatest}
Version Publish : ${eha.versionPublish}
Version Update : ${eha.versionUpdate}
Latest Dependencies : ${eha.latestDependencies}
Publish Dependencies : ${eha.publishDependencies}
Publish Time : ${eha.publishTime}
Latest Publish Time : ${eha.latestPublishTime}`);
  },
};