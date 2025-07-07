const { makeWASocket, useMultiFileAuthState, makeCacheableSignalKeyStore, DisconnectReason } = require('@whiskeysockets/baileys')
const Pino = require('pino')
const NodeCache = require("node-cache")
const { Boom } = require('@hapi/boom')

global.conns = global.conns || []

async function jadibot(RyuuBotz, m, nomor) {
    const sessionId = 'jadibot-' + nomor
    const path = './session-bot/' + sessionId

    const { state, saveCreds } = await useMultiFileAuthState(path)
    const msgRetryCounterCache = new NodeCache()

    const conn = makeWASocket({
        logger: Pino({ level: 'silent' }),
        printQRInTerminal: false,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: 'silent' })),
        },
        browser: ['RyuuBotz', 'Chrome', '1.0.0'],
        patchMessageBeforeSending: (message) => {
            if (message.buttonsMessage || message.templateMessage || message.listMessage) {
                message = {
                    viewOnceMessage: {
                        message: {
                            messageContextInfo: { deviceListMetadataVersion: 2, deviceListMetadata: {} },
                            ...message,
                        },
                    },
                }
            }
            return message
        },
        getMessage: async () => ({
            conversation: 'RyuuBotz aktif!',
        }),
        msgRetryCounterCache
    })

    if (!conn.authState.creds.registered) {
        const code = await conn.requestPairingCode(nomor, "RyuuBotz")
        await RyuuBotz.sendMessage(m.chat, { text: `📲 Kode pairing untuk *${nomor}*:\n\n` + code })
    }

    conn.ev.on('creds.update', saveCreds)

    conn.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'open') {
            global.conns.push(conn)
            await RyuuBotz.sendMessage(m.chat, { text: `✅ Bot berhasil terhubung sebagai *${conn.user.name}* (@${conn.user.id.split('@')[0]})` })
        } else if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output?.statusCode
            if (reason !== DisconnectReason.loggedOut) {
                console.log(`🔁 Reconnect bot: ${sessionId}`)
                jadibot(RyuuBotz, m, nomor)
            }
        }
    })

    conn.ev.on('messages.upsert', async ({ messages }) => {
        let msg = messages[0]
        if (!msg.message || msg.key.fromMe) return
        const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text
        if (text?.toLowerCase() === 'halo') {
            await conn.sendMessage(msg.key.remoteJid, { text: 'Hai juga 👋' }, { quoted: msg })
        }
    })

    return conn
}

module.exports = { jadibot }