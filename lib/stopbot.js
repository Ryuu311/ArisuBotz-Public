async function stopbot(RyuuBotz, m, nomor) {
    if (!nomor) nomor = m.sender.split('@')[0]

    const sessionId = 'jadibot-' + nomor
    const conn = global.conns.find(c => c.user?.id?.startsWith(nomor))

    if (conn) {
        await conn.logout()
        global.conns = global.conns.filter(c => c !== conn)
        await RyuuBotz.sendMessage(m.chat, { text: `🛑 Bot atas nama @${nomor} berhasil dihentikan.`, mentions: [`${nomor}@s.whatsapp.net`] })
    } else {
        await RyuuBotz.sendMessage(m.chat, { text: `❌ Tidak ditemukan bot aktif untuk nomor @${nomor}`, mentions: [`${nomor}@s.whatsapp.net`] })
    }
}

module.exports = { stopbot }