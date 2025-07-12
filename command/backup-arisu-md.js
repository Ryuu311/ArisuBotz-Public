const fs = require('fs');
const AdmZip = require('adm-zip');
const path = require('path');

module.exports = async function backupArisuMD(m, { RyuuBotz, reply, isRyuuTheCreator, mess }) {
  if (!isRyuuTheCreator) return reply(mess.only.owner);

  try {
    const folderPath = './node_modules/Arisu-MD';
    const tanggal = new Date().toISOString().slice(0, 10);
    const backupName = `Arisu-MD_${tanggal}.zip`;

    if (!fs.existsSync(folderPath)) {
      return reply('❌ Folder ./node_modules/Arisu-MD tidak ditemukan.');
    }

    // Buat file ZIP
    const zip = new AdmZip();
    zip.addLocalFolder(folderPath);
    zip.writeZip(backupName);

    // Info ke grup kalau dijalankan dari grup
    if (m.isGroup) {
      await reply(`📦 *Backup sedang dibuat...*\n📤 File akan dikirim ke *private chat* kamu, sayang~`);
    } else {
      await reply(`📦 *Backup sedang dibuat...*`);
    }

    // Kirim file ke private chat (PM)
    const userJid = m.sender;

    await RyuuBotz.sendMessage(userJid, {
      document: fs.readFileSync(backupName),
      fileName: backupName,
      mimetype: 'application/zip',
      caption: `📁 *Backup Berhasil*\nFolder: node_modules/Arisu-MD\nTanggal: ${tanggal}`
    }, { quoted: m });

    // Hapus file zip setelah terkirim
    fs.unlinkSync(backupName);

  } catch (err) {
    console.error(err);
    reply('❌ Gagal membuat backup Arisu-MD: ' + err.message);
  }
}