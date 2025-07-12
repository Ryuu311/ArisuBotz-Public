const { getBuffer } = require('../lib/myfunc'); // sesuaikan path jika beda

module.exports = {
  async confess({ m, text, reply, RyuuBotz, prefix, command, pushname }) {
    RyuuBotz.menfes = RyuuBotz.menfes ?? {};

    const session = Object.values(RyuuBotz.menfes).find(v => v.state === 'CHATTING' && [v.a, v.b].includes(m.sender));
    if (session) {
      const target = session.a === m.sender ? session.b : session.a;
      await RyuuBotz.sendMessage(target, {
        text: `📩 Pesan baru dari @${m.sender.split('@')[0]}:\n\n${m.text}`,
        mentions: [m.sender],
      });
      return reply("Pesan diteruskan.");
    }

    const roof = Object.values(RyuuBotz.menfes).find(menpes => [menpes.a, menpes.b].includes(m.sender));
    if (roof) return reply("Kamu masih berada dalam sesi menfess");
    if (m.isGroup) return reply("Fitur hanya tersedia di private chat!");
    if (!text) return reply(`Kirim perintah ${prefix + command} nama|nomor|pesan\n\nContoh:\n${prefix + command} ${pushname}|628xxx|Menfess nih`);
    if (!text.includes('|')) return reply("Format salah! Gunakan format: nama|nomor|pesan");

    let [namaNya, nomorNya, pesanNya] = text.split('|');
    nomorNya = nomorNya.replace(/^0/, '62');
    if (isNaN(nomorNya)) return reply("Nomor tidak valid! Pastikan hanya menggunakan angka.");

    const id = m.sender;
    RyuuBotz.menfes[id] = {
      id,
      a: m.sender,
      b: `${nomorNya}@s.whatsapp.net`,
      state: 'WAITING',
    };

    const caption = `Hi ada menfess nih buat kamu\n\nDari: ${namaNya}\nPesan: ${pesanNya}\n\nKetik:\n${prefix}balasmenfess -- Untuk menerima menfess\n${prefix}tolakmenfess -- Untuk menolak menfess\n\n_Pesan ini dikirim oleh bot._`;
    const tod = await getBuffer('https://telegra.ph/file/c8fdfc8426f5f60b48cca.jpg');
    await RyuuBotz.sendMessage(`${nomorNya}@s.whatsapp.net`, { image: tod, caption });
    reply("Pesan berhasil dikirim ke nomor tujuan. Semoga dibalas ya!");
  },

  async balasmenfess({ m, reply, RyuuBotz, prefix }) {
    RyuuBotz.menfes = RyuuBotz.menfes ?? {};
    const roof = Object.values(RyuuBotz.menfes).find(menpes => [menpes.a, menpes.b].includes(m.sender));
    if (!roof) return reply("Belum ada sesi menfess");

    const room = Object.values(RyuuBotz.menfes).find(room => [room.a, room.b].includes(m.sender) && room.state === 'WAITING');
    if (!room) return reply("Tidak ada sesi menfess yang sedang menunggu");

    const other = [room.a, room.b].find(user => user !== m.sender);
    room.b = m.sender;
    room.state = 'CHATTING';
    RyuuBotz.menfes[room.id] = { ...room };

    await RyuuBotz.sendMessage(other, {
      text: `_@${m.sender.split("@")[0]} telah menerima menfess kamu, sekarang kamu bisa chat lewat bot ini._\n\n*NOTE:* Ketik ${prefix}stopmenfess untuk berhenti.`,
      mentions: [m.sender],
    });
    reply("Menfess diterima, sekarang kamu bisa chat!");
  },

  async tolakmenfess({ m, reply, RyuuBotz }) {
    RyuuBotz.menfes = RyuuBotz.menfes ?? {};
    const roof = Object.values(RyuuBotz.menfes).find(menpes => [menpes.a, menpes.b].includes(m.sender));
    if (!roof) return reply("Belum ada sesi menfess");

    const other = [roof.a, roof.b].find(user => user !== m.sender);
    await RyuuBotz.sendMessage(other, {
      text: `_Maaf, @${m.sender.split("@")[0]} menolak menfess kamu._`,
      mentions: [m.sender],
    });
    delete RyuuBotz.menfes[roof.id];
    reply("Menfess berhasil ditolak.");
  },

  async stopmenfess({ m, reply, RyuuBotz }) {
    RyuuBotz.menfes = RyuuBotz.menfes ?? {};
    const find = Object.values(RyuuBotz.menfes).find(menpes => [menpes.a, menpes.b].includes(m.sender));
    if (!find) return reply("Belum ada sesi menfess");

    const to = find.a === m.sender ? find.b : find.a;
    await RyuuBotz.sendMessage(to, {
      text: "_Sesi menfess ini telah dihentikan._",
      mentions: [m.sender],
    });
    delete RyuuBotz.menfes[find.id];
    reply("Sesi menfess dihentikan.");
  }
};