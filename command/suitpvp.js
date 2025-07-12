let games = {}

function handleSuitCommand(m, { RyuuBotz, text, replyReinzID, owner, prefix }) {
  games = games || {}
  let poin = 10
  let poin_lose = 10
  let timeout = 60000

  if (Object.values(games).find(roof => roof.id.startsWith('suit') && [roof.p, roof.p2].includes(m.sender))) {
    return replyReinzID(`Complete your previous game`)
  }

  if (m.mentionedJid[0] === m.sender) return replyReinzID(`Can't play with myself !`)
  if (!m.mentionedJid[0]) {
    return replyReinzID(`_Who do you want to challenge?_\nTag the person..\n\nContoh : .suit @${owner[1]}`, m.chat, { mentions: [owner[1] + '@s.whatsapp.net'] })
  }

  if (Object.values(games).find(roof => roof.id.startsWith('suit') && [roof.p, roof.p2].includes(m.mentionedJid[0]))) {
    return replyReinzID(`Orang yang Anda tantang sedang bermain dengan orang lain :(`)
  }

  let id = 'suit_' + new Date() * 1
  let caption = `_*SUIT PvP*_\n\n@${m.sender.split`@`[0]} *Challenged* @${m.mentionedJid[0].split`@`[0]} *to play suit*\n\n*Hi* @${m.mentionedJid[0].split`@`[0]} *Silahkan ketik accept untuk menerima atau ketik reject untuk menolak*`

  games[id] = {
    chat: RyuuBotz.sendText(m.chat, caption, m, { mentions: [m.sender, m.mentionedJid[0]] }),
    id, p: m.sender, p2: m.mentionedJid[0],
    status: 'wait',
    waktu: setTimeout(() => {
      if (games[id]) {
        RyuuBotz.sendText(m.chat, `_𝙒𝘼𝙆𝙏𝙐 𝙎𝙐𝙄𝙏 𝙃𝘼𝘽𝙄𝙎_`, m)
        delete games[id]
      }
    }, timeout),
    poin, poin_lose, timeout
  }
}

function handleSuitAnswer(m, { RyuuBotz, replyReinzID, botNumber }) {
  if (!games) return
  let roof = Object.values(games).find(r => r.id && r.status && [r.p, r.p2].includes(m.sender))
  if (!roof) return

  let win = ''
  let tie = false

  // Accept/Reject Logic
  if (m.sender === roof.p2 && /^acc(ept)?|accept|yes|okay?|reject|no|later|nop(e)?$/i.test(m.text) && m.isGroup && roof.status === 'wait') {
    if (/^reject|no|later|n|nop(e)?$/i.test(m.text)) {
      RyuuBotz.sendTextWithMentions(m.chat, `@${roof.p2.split`@`[0]} rejected the suit, the suit is canceled`, m)
      delete games[roof.id]
      return
    }

    roof.status = 'play'
    roof.asal = m.chat
    clearTimeout(roof.waktu)

    RyuuBotz.sendText(m.chat, `Jas telah dikirim ke obrolan\n\n@${roof.p.split`@`[0]}\nand\n@${roof.p2.split`@`[0]}\n\nSilahkan pilih suit di chat masing-masing\nclick https://wa.me/${botNumber.split`@`[0]}`, m, { mentions: [roof.p, roof.p2] })
    if (!roof.pilih) RyuuBotz.sendText(roof.p, `Silahkan pilih \n\nBatu\nKertas\nGunting`, m)
    if (!roof.pilih2) RyuuBotz.sendText(roof.p2, `Silahkan pilih \n\nBatu\nKertas\nGunting`, m)

    roof.waktu_milih = setTimeout(() => {
      if (!roof.pilih && !roof.pilih2) RyuuBotz.sendText(m.chat, `Kedua Pemain Tidak Ingin Bermain,\nSuit Dibatalkan`)
      else if (!roof.pilih || !roof.pilih2) {
        win = !roof.pilih ? roof.p2 : roof.p
        RyuuBotz.sendTextWithMentions(m.chat, `@${(roof.pilih ? roof.p2 : roof.p).split`@`[0]} Tidak Memilih Suit, Game Over!`, m)
      }
      delete games[roof.id]
    }, roof.timeout)

    return
  }

  // Suit Choice Handling
  let jwb = m.sender === roof.p
  let jwb2 = m.sender === roof.p2
  const reg = /^(gunting|batu|kertas)/i

  if (jwb && reg.test(m.text) && !roof.pilih && !m.isGroup) {
    roof.pilih = reg.exec(m.text.toLowerCase())[0]
    roof.text = m.text
    replyReinzID(`Kamu telah memilih ${m.text} ${!roof.pilih2 ? `\n\n Menunggu lawan untuk memilih` : ''}`)
    if (!roof.pilih2) RyuuBotz.sendText(roof.p2, '_Lawan telah memilih\nSekarang giliranmu_', 0)
  }

  if (jwb2 && reg.test(m.text) && !roof.pilih2 && !m.isGroup) {
    roof.pilih2 = reg.exec(m.text.toLowerCase())[0]
    roof.text2 = m.text
    replyReinzID(`_Kamu telah memilih ${m.text} ${!roof.pilih ? `\n\n Menunggu lawan untuk memilih_` : ''}`)
    if (!roof.pilih) RyuuBotz.sendText(roof.p, '_Lawan telah memilih\nSekarang giliranmu_', 0)
  }

  if (roof.pilih && roof.pilih2) {
    clearTimeout(roof.waktu_milih)
    const stage = roof.pilih
    const stage2 = roof.pilih2

    if (stage === stage2) tie = true
    else if (
      (stage === 'batu' && stage2 === 'gunting') ||
      (stage === 'gunting' && stage2 === 'kertas') ||
      (stage === 'kertas' && stage2 === 'batu')
    ) win = roof.p
    else win = roof.p2

    RyuuBotz.sendText(roof.asal, `_*Hasil Suit*_${tie ? '\nSERIES' : ''}

@${roof.p.split`@`[0]} (${roof.text}) ${tie ? '' : roof.p === win ? ` Win` : ` Lost`}
@${roof.p2.split`@`[0]} (${roof.text2}) ${tie ? '' : roof.p2 === win ? ` Win` : ` Lost`}
`.trim(), m, { mentions: [roof.p, roof.p2] })

    delete games[roof.id]
  }
}

module.exports = {
  handleSuitCommand,
  handleSuitAnswer,
}