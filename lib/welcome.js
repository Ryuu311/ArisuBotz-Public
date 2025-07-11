const fs = require('fs');
const canvafy = require("canvafy");
const { getRandom, smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, delay, sleep } = require('./myfunc');
const { isSetWelcome, getTextSetWelcome } = require('./setwelcome');
const { isSetLeft, getTextSetLeft } = require('./setleft');
const moment = require('moment-timezone');
const { proto, jidDecode, jidNormalizedUser, generateForwardMessageContent, generateWAMessageFromContent, downloadContentFromMessage } = require('@whiskeysockets/baileys');
let set_welcome_db = JSON.parse(fs.readFileSync('./node_modules/Arisu-MD/database/set_welcome.json'));
let set_left_db = JSON.parse(fs.readFileSync('./node_modules/Arisu-MD/database/set_left.json'));
let setting = JSON.parse(fs.readFileSync('./node_modules/Arisu-MD/config.json'));
const welcome2 = setting.auto_welcomeMsg;
const leave2 = setting.auto_leaveMsg;

module.exports.welcome = async (iswel, isleft, RyuuBotz, anu) => {
  try {
  const metadata = await RyuuBotz.groupMetadata(anu.id);
    const participants = anu.participants;
    const groupName = metadata.subject;
    const groupDesc = metadata.desc;
    const axios = require('axios');
    const { WelcomeLeave } = require('canvafy');
  const bgURL = 'https://files.catbox.moe/m2xkzf.jpg'
    for (let num of participants) {
      try {
        ppuser = await RyuuBotz.profilePictureUrl(num, 'image');
      } catch {
        ppuser = 'https://files.catbox.moe/4m7yxt.jpg';
      }

      try {
        ppgroup = await RyuuBotz.profilePictureUrl(anu.id, 'image');
      } catch {
        ppgroup = 'https://files.catbox.moe/q8hprm.jpg';
      }
const avatarBuffer = (await axios.get(ppuser, { responseType: 'arraybuffer' })).data;
    const bgBuffer = (await axios.get(bgURL, { responseType: 'arraybuffer' })).data;

    const welcomeCard = new WelcomeLeave()
      .setAvatar(avatarBuffer)
      .setBackground("image", bgBuffer)
      .setTitle("Welcome!!")
      .setDescription(`Selamat datang di grup ${groupName}`)
      .setOverlayOpacity(0.5);
      
      const OutCard = new WelcomeLeave()
      .setAvatar(avatarBuffer)
      .setBackground("image", bgBuffer)
      .setTitle(`Bye Bye`)
      .setDescription(`Selamat tinggal, sampai jumpa`)
      .setOverlayOpacity(0.5);

    const buffer = await welcomeCard.build();
    const bufferout = await OutCard.build();
    
      if (anu.action === 'add' && (iswel || setting.auto_welcomeMsg)) {
  let groupIcon
  try {
    groupIcon = await RyuuBotz.profilePictureUrl(anu.id, 'image')
  } catch (e) {
    groupIcon = 'https://files.catbox.moe/q8hprm.jpg' // fallback icon
  }

  if (isSetWelcome(anu.id, set_welcome_db)) {
    const get_teks_welcome = await getTextSetWelcome(anu.id, set_welcome_db)
    const replace_pesan = get_teks_welcome.replace(/@user/gi, `@${num.split('@')[0]}`)
    const full_pesan = replace_pesan
      .replace(/@group/gi, groupName)
      .replace(/@desc/gi, groupDesc)

    RyuuBotz.sendMessage(anu.id, {
      text: full_pesan,
      contextInfo: {
        mentionedJid: [num],
        externalAdReply: {
          title: `Selamat datang di ${groupName}`,
          body: `Ahlan wa Sahlan, semoga betah ya 🤗`,
          mediaType: 1,
          previewType: "PHOTO",
          thumbnail: buffer,
          sourceUrl: "https://chat.whatsapp.com/",
          renderLargerThumbnail: true
        },
      },
    })
  } else {
    RyuuBotz.sendMessage(anu.id, {
      text: `*Ahlan WA Sahlan kepada ${num.split("@")[0]} di *${groupName}* *_Salam Ukhuwah, Semoga Istiqomah_* 🤗 jangan lupa aktif mengikuti *kegiatan* dan *Kajian* yang sudah ada 📚 
ꔛ⌑ *Budayakan* ⌑ꔛ
1. Baca deskripsi grup
2. Patuhi peraturan yang ada
3. Ijin ketika ingin meninggalkan grup

\`\`\`Semoga Bermanfaat\`\`\``,
      contextInfo: {
        mentionedJid: [num],
        externalAdReply: {
          title: `Selamat datang di ${groupName}`,
          body: `Baca deskripsi dan peraturan grup ya 🌱`,
          mediaType: 1,
          thumbnail: buffer,
          sourceUrl: "https://chat.whatsapp.com/",
          renderLargerThumbnail: true
        },
      },
    })
  }
} else if (anu.action === 'remove' && (isleft || setting.auto_leaveMsg)) {
        if (isSetLeft(anu.id, set_left_db)) {
          const get_teks_left = await getTextSetLeft(anu.id, set_left_db);
          const replace_pesan = get_teks_left.replace(/@user/gi, `@${num.split('@')[0]}`);
          const full_pesan = replace_pesan.replace(/@group/gi, groupName).replace(/@desc/gi, groupDesc);

          RyuuBotz.sendMessage(anu.id, {
            text: full_pesan,
            contextInfo: {
              mentionedJid: [num],
              externalAdReply: {
                title: `Bye bye`,
                body: `Selamat tinggal`,
                mediaType: 1,
                thumbnail: bufferout,
                sourceUrl: "https://chat.whatsapp.com/",
                renderLargerThumbnail: true
              },
            },
          });
        } else {
          RyuuBotz.sendMessage(anu.id, {
            text: `*Selamat Jalan* kepada ${num.split("@")[0]} dari grup tercinta kami \`${groupName}\` *kita do'akan semoga ilmu dari grup ini bermanfaat bagi beliau* 🤲🏻

✧ Kepada seluruh Member tercinta jangan Lupa *IJIN* ketika ingin keluar yah 🤗

© *Admin @${groupName}*`,
            contextInfo: {
              mentionedJid: [num],
              externalAdReply: {
                title: `Bye bye`,
                body: `Sampai jumpa di lain waktu`,
                mediaType: 1,
                thumbnail: bufferout,
                sourceUrl: "https://chat.whatsapp.com/",
                renderLargerThumbnail: true
              },
            },
          });
        }
      }
    }
  } catch (err) {
    console.error('[GROUP UPDATE ERROR]', err);
    RyuuBotz.sendMessage(anu.id, {
      text: `⚠️ Terjadi kesalahan saat memproses perubahan peserta.\n\n*Error:* ${err.message || err}`,
      contextInfo: {
        externalAdReply: {
          title: "Group Handler Error",
          body: "Laporkan ke developer jika ini terus terjadi.",
          thumbnailUrl: "https://files.catbox.moe/m2xkzf.jpg",
          mediaType: 1,
          previewType: "PHOTO",
          sourceUrl: "https://wa.me/6288246552068",
          renderLargerThumbnail: true
        }
      }
    });
  }
}