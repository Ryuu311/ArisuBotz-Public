async function listbot(RyuuBotz, m) {
    if (!global.conns || global.conns.length === 0) {
        return await RyuuBotz.sendMessage(m.chat, { text: '📭 Belum ada bot aktif saat ini.' })
    }

    let teks = '*🤖 Daftar Bot yang Aktif:*\n\n'
    for (const conn of global.conns) {
        const id = conn.user.id
        const name = conn.user.name || 'Tanpa Nama'
        teks += `• @${id.split('@')[0]} - ${name}\n`
    }

    await RyuuBotz.sendMessage(m.chat, {
        text: teks,
        mentions: global.conns.map(c => c.user.id)
    }, { quoted: m })
}

module.exports = { listbot }