module.exports = async function simulatingCommand(m, { RyuuBotz, args, isBotAdmins, isAdmins, reply, mess, replyryuu }) {
  if (!m.isGroup) return reply(mess.only.group)
  if (!isBotAdmins) return replyryuu(`Bot harus menjadi admin untuk menggunakan fitur ini.`)
  if (!isAdmins) return replyryuu(`Kamu harus menjadi admin untuk menggunakan fitur ini.`)

  const keyword = args[0]?.toLowerCase()
  if (!keyword || !['add', 'out'].includes(keyword))
    return replyryuu(`Gunakan format:\n.simulating add\n.simulating out`)

  const fakeUser = m.sender // Pengirim sebagai target simulasi

  if (keyword === 'add') {
    RyuuBotz.ev.emit('group-participants.update', {
      id: m.chat,
      participants: [fakeUser],
      action: 'add',
    })
    replyryuu(`Simulasi pengguna masuk berhasil.`)
  } else if (keyword === 'out') {
    RyuuBotz.ev.emit('group-participants.update', {
      id: m.chat,
      participants: [fakeUser],
      action: 'remove',
    })
    replyryuu(`Simulasi pengguna keluar berhasil.`)
  }
}