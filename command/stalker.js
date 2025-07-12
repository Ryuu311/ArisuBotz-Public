const axios = require('axios');
const { default: fetch } = require('node-fetch');
const npmstalk = require('../scrape/npmstalk');
const igstalk = require('../RyuuID');

module.exports = {
  async mlstalk({ text, reply, prefix, command }) {
    if (!text) {
      return reply(`Contoh penggunaan:\n${prefix + command} id|zona id\n\nEx:\n${prefix + command} 157228049|2241`);
    }

    async function getMLData(id, zoneId) {
      try {
        const response = await axios.post(
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
        );
        return response.data.data.gameDetail;
      } catch (err) {
        return null;
      }
    }

    const [id, zone] = text.split('|');
    const data = await getMLData(id, zone);

    if (!data) return reply("User tidak ditemukan");

    const result = `*MOBILE LEGENDS STALK*

*ID:* ${id}
*ZONA ID:* ${zone}
*Username:* ${data.userName || "Kosong"}`;

    reply(result);
  },

  async npmstalk({ q, replyReinzID, prefix, command }) {
    if (!q) return replyReinzID(`Contoh ${prefix + command} xeonapi`);

    const data = await npmstalk.npmstalk(q);

    const result = `*/ Npm Stalker \\*

*Name:* ${data.name}
*Latest Version:* ${data.versionLatest}
*Published Version:* ${data.versionPublish}
*Last Update Version:* ${data.versionUpdate}
*Latest Dependencies:* ${data.latestDependencies}
*Published Dependencies:* ${data.publishDependencies}
*First Publish:* ${data.publishTime}
*Latest Publish:* ${data.latestPublishTime}`;

    replyReinzID(result);
  }
};