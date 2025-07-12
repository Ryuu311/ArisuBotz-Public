const TicTacToe = require("../lib/tictactoe");

async function tictactoe(m, RyuuBotz, text, prefix, command, replyReinzID, parseMention, gameObj) {
  gameObj = gameObj ? gameObj : {};
  
  if (Object.values(gameObj).find(room => room.id.startsWith('tictactoe') &&
    [room.game.playerX, room.game.playerO].includes(m.sender)))
    return replyReinzID(`Kamu masih dalam permainan.\n> *Ketik .delttc* untuk keluar permainan`);

  let room = Object.values(gameObj).find(room => room.state === 'WAITING' && (text ? room.name === text : true));

  if (room) {
    room.o = m.chat;
    room.game.playerO = m.sender;
    room.state = 'PLAYING';

    let arr = room.game.render().map(v => ({
      X: '❌',
      O: '⭕',
      1: '1️⃣',
      2: '2️⃣',
      3: '3️⃣',
      4: '4️⃣',
      5: '5️⃣',
      6: '6️⃣',
      7: '7️⃣',
      8: '8️⃣',
      9: '9️⃣',
    }[v]));

    let str = `room ID: ${room.id}

${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}

Menunggu @${room.game.currentTurn.split('@')[0]}
Ketik *surrender* untuk menyerah dan mengakui kekalahan`;

    if (room.x !== room.o) await RyuuBotz.sendText(room.x, str, m, { mentions: parseMention(str) });
    await RyuuBotz.sendText(room.o, str, m, { mentions: parseMention(str) });
  } else {
    room = {
      id: 'tictactoe-' + (+new Date),
      x: m.chat,
      o: '',
      game: new TicTacToe(m.sender, 'o'),
      state: 'WAITING'
    };
    if (text) room.name = text;
    replyReinzID(`Tag pasangan ttc\n> Contoh: .ttc @reinz` + (text ? `\n\n𝗧𝗘𝗞𝗦 𝗗𝗜 𝗔𝗧𝗔𝗦 𝗔𝗕𝗔𝗜𝗞𝗔𝗡 𝗦𝗔𝗝𝗔\n YANG DITAG WAJIB KETIK *${prefix}${command}* UNTUK BERMAIN` : ''));
    gameObj[room.id] = room;
  }

  return gameObj; // return gameObj baru
}

function delttc(m, RyuuBotz, replyReinzID, gameObj) {
  if (!gameObj || Object.keys(gameObj).length === 0) {
    replyReinzID('Session TicTacToe🎮 does not exist');
  } else {
    for (let id of Object.keys(gameObj)) {
      if (id.startsWith('tictactoe')) delete gameObj[id];
    }
    RyuuBotz.sendText(m.chat, `✅ TicTacToe session berhasil dihapus.`, m);
  }
  return gameObj;
}

module.exports = { tictactoe, delttc };