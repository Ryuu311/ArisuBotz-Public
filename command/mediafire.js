const { fetch } = require("undici");
const { lookup } = require("mime-types");
const cheerio = require("cheerio");

async function parseMediafire(url) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(url);
            const html = await response.text();
            const $ = cheerio.load(html);

            const type = $(".dl-btn-cont").find(".icon").attr("class").split("archive")[1].trim();
            const filename = $(".dl-btn-label").attr("title");
            const size = $('.download_link .input').text().trim().match(/\((.*?)\)/)[1];
            const ext = filename.split(".").pop();
            const mimetype = lookup(ext.toLowerCase()) || "application/" + ext.toLowerCase();
            const download = $(".input").attr("href");

            resolve({ filename, type, size, ext, mimetype, download });
        } catch (e) {
            reject({ msg: "Gagal mengambil data dari link tersebut" });
        }
    });
}

module.exports = {
    async mediafire5({ text, m, prefix, command, RyuuBotz, reply }) {
        if (!text) return reply(`*Contoh :* ${prefix + command} *[mediafire url]*`);

        const mediafireRegex = /^(https?:\/\/)?(www\.)?mediafire\.com\/.+$/i;
        if (!mediafireRegex.test(text)) {
            return reply(`*Contoh :* ${prefix + command} *[mediafire url]*`);
        }

        RyuuBotz.sendMessage(m.chat, {
            react: { text: "⏱️", key: m.key },
        });

        try {
            const result = await parseMediafire(text);

            const caption = `*乂 MEDIAFIRE - DOWNLOADER*

◦ File Name : ${result.filename}
◦ Type      : ${result.type}
◦ Size      : ${result.size}`;

            await RyuuBotz.sendFile(m.chat, result.download, result.filename, caption, m, false, {
                mimetype: result.mimetype,
                fileName: result.filename,
            });
        } catch (e) {
            reply(e.msg || "Terjadi kesalahan saat mengambil data.");
        }
    }
};