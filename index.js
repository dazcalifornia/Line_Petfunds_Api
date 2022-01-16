const express = require("express");
const Axios = require("axios");
const line = require("@line/bot-sdk");
const bodyParser = require("body-parser");
const moment = require("moment");
require("dotenv").config();
const app = express();

const DASH_YMD = "YYYY-MM-DD";

const port = process.env.msg_port;
const config = {
  channelSecret: process.env.ChannelSecret,
  channelAccessToken: process.env.AccessToken,
};

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.post("/msg_api", line.middleware(config), (req, res) => {
  console.log(req.body.events);
  Promise.all(req.body.events.map(HandleEvent)).then((result) =>
    res.json(result)
  );
});

const client = new line.Client(config);

const HandleEvent = (event) => {
  if (event.type === "message") {
    const message = event.message;
    const userMsg = message.text;
    if (message.type === "text") {
      EventMessage(userMsg, event);
    }
  }
  if (event.type !== "message" || event.message.type !== "text") {
    console.log("User didn't sent Message 🐯");
    return client.replyMessage(event.replyToken, {
      type: "text",
      text: "ตอนนี้บอท ซัพพอร์ต แค่ ตัวอักษรหรือข้อความเท่านั้น",
    });
  }
};

var org = [
  "We Care Pet Hospital",
  "SamSean Pet Hospital",
  "RE DOG Corporation",
  "Nawong Pet Hospital",
  "Kwam Wang Corporation",
];

const EventMessage = (userMsg, event) => {
  //handle event from Function HandleEvent
  if (userMsg === "hello") {
    return client.replyMessage(event.replyToken, {
      type: "text",
      text: "This message reply from bot",
    });
  } else if (userMsg === "howto"||userMsg==="how to") {
    return client.replyMessage(event.replyToken, {
      type: "text",
      text: "💰 How to donate on random corporation?\nPlease give us detail about\n1. What you want to donate:\n- food\n- habitat\n-medical\n(please choose only 1 option)\n2. The amount of money\n____________________\nExample:\nI would like to donate for 2000฿ on medical.",
    });
  } else if (userMsg.match("donate")) {
    //code in this shit
    const SegmentMsg = userMsg.split(" ")
    // const money = SegmentMsg[1];
    // const items = SegmentMsg[2];

    for(let i=0;i<=SegmentMsg.length;i++){
      if(!isNaN(SegmentMsg[i])){
        var money = SegmentMsg[i]
        console.log(SegmentMsg[i])
      }
    }
    const date = moment().format(DASH_YMD);
    console.log(`${SegmentMsg},${date}`);


    if (SegmentMsg.includes("food")){
      let items = 'food'
      console.log("They gim u som FOOD!!!!")
    }else if(SegmentMsg.includes('habitat')){
      // let items = 'habitat'
      console.log("User Donate some Home for fuckin animal")
    }else if(SegmentMsg.includes("medical")){
      var items = "Medical"
      console.log("YOU HAVE BEEN CURED")
    }
    //reply part
    if(money < 500){
        const org1 =org[Math.floor(Math.random() * org.length)];
        return client.replyMessage(event.replyToken, {
            type: "flex",
            altText: "Tankyou For Donation <3~",
            contents: {
              type: "bubble",
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: "PetAIDonation",
                    weight: "bold",
                    color: "#1DB446",
                    size: "sm",
                  },
                  {
                    type: "text",
                    text: "Thank you~",
                    weight: "bold",
                    size: "xxl",
                    margin: "md",
                  },
                  {
                    type: "text",
                    text: "Thank you for donation!",
                    size: "xs",
                    color: "#aaaaaa",
                    wrap: true,
                  },
                  {
                    type: "separator",
                    margin: "xxl",
                  },
                  {
                    type: "box",
                    layout: "vertical",
                    margin: "xxl",
                    spacing: "sm",
                    contents: [
                      {
                        type: "box",
                        layout: "horizontal",
                        contents: [
                          {
                            type: "text",
                            text: "Type of Donation",
                            size: "sm",
                            color: "#555555",
                            flex: 0,
                          },
                          {
                            type: "text",
                            text: "Any",
                            size: "sm",
                            color: "#111111",
                            align: "end",
                          },
                        ],
                      },
                      {
                        type: "box",
                        layout: "horizontal",
                        contents: [
                          {
                            type: "text",
                            text: "Destination",
                            size: "sm",
                            color: "#555555",
                            flex: 0,
                          },
                          {
                            type: "text",
                            text: `${org1}`,
                            size: "sm",
                            color: "#111111",
                            align: "end",
                          },
                        ],
                      },
                      {
                        type: "box",
                        layout: "horizontal",
                        contents: [
                          {
                            type: "text",
                            text: "Amount",
                            size: "sm",
                            color: "#555555",
                            flex: 0,
                          },
                          {
                            type: "text",
                            text: `${money}baht`,
                            size: "sm",
                            color: "#111111",
                            align: "end",
                          },
                        ],
                      },
                      {
                        type: "box",
                        layout: "horizontal",
                        contents: [
                          {
                            type: "text",
                            text: "Date That Donate",
                            size: "sm",
                            color: "#555555",
                            flex: 0,
                          },
                          {
                            type: "text",
                            text: `${date}`,
                            size: "sm",
                            color: "#111111",
                            align: "end",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "separator",
                    margin: "xxl",
                  },
                  {
                    type: "box",
                    layout: "vertical",
                    margin: "xxl",
                    contents: [
                      {
                        type: "spacer",
                      },
                      {
                        type: "image",
                        url: "https://i.postimg.cc/XJpxMr7S/IMG-5611.jpg",
                        aspectMode: "cover",
                        size: "xl",
                      },
                      {
                        type: "text",
                        text: "You can scan this code for proceed your payment",
                        color: "#aaaaaa",
                        wrap: true,
                        margin: "xxl",
                        size: "xs",
                      },
                    ],
                  },
                  {
                    type: "separator",
                    margin: "xxl",
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    margin: "md",
                    contents: [
                      {
                        type: "text",
                        text: "PAYMENT ID",
                        size: "xs",
                        color: "#aaaaaa",
                        flex: 0,
                      },
                      {
                        type: "text",
                        text: "#PaymentId RestApi",
                        color: "#aaaaaa",
                        size: "xs",
                        align: "end",
                      },
                    ],
                  },
                ],
              },
              styles: {
                footer: {
                  separator: true,
                },
              },
            },
        });
    }else if(money < 1000){
        const org1 =org[Math.floor(Math.random() * org.length)];
        const org2 = org[Math.floor(Math.random() * org.length)];
        return client.replyMessage(event.replyToken, {
            type: "flex",
            altText: "Tankyou For Donation <3~",
            contents: {
              type: "bubble",
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: "PetAIDonation",
                    weight: "bold",
                    color: "#1DB446",
                    size: "sm",
                  },
                  {
                    type: "text",
                    text: "Thank you~",
                    weight: "bold",
                    size: "xxl",
                    margin: "md",
                  },
                  {
                    type: "text",
                    text: "Thank you for donation!",
                    size: "xs",
                    color: "#aaaaaa",
                    wrap: true,
                  },
                  {
                    type: "separator",
                    margin: "xxl",
                  },
                  {
                    type: "box",
                    layout: "vertical",
                    margin: "xxl",
                    spacing: "sm",
                    contents: [
                      {
                        type: "box",
                        layout: "horizontal",
                        contents: [
                          {
                            type: "text",
                            text: "Type of Donation",
                            size: "sm",
                            color: "#555555",
                            flex: 0,
                          },
                          {
                            type: "text",
                            text: "Any",
                            size: "sm",
                            color: "#111111",
                            align: "end",
                          },
                        ],
                      },
                      {
                        type: "box",
                        layout: "horizontal",
                        contents: [
                          {
                            type: "text",
                            text: "Destination",
                            size: "sm",
                            color: "#555555",
                            flex: 0,
                          },
                          {
                            type: "text",
                            text: `${org1}`,
                            size: "sm",
                            color: "#111111",
                            align: "end",
                          },
                        ],
                      },
                      {
                        "type": "box",
                        "layout": "horizontal",
                        "contents": [
                          {
                            "type": "text",
                            "text": " ‎ ‎ ‎ ‎ ",
                            "size": "sm",
                            "color": "#555555"
                          },
                          {
                            "type": "text",
                            "text": `${org2}`,
                            "size": "sm",
                            "color": "#111111",
                            "align": "end"
                          }
                        ]
                      },
                      {
                        type: "box",
                        layout: "horizontal",
                        contents: [
                          {
                            type: "text",
                            text: "Amount",
                            size: "sm",
                            color: "#555555",
                            flex: 0,
                          },
                          {
                            type: "text",
                            text: `${money}baht`,
                            size: "sm",
                            color: "#111111",
                            align: "end",
                          },
                        ],
                      },
                      {
                        type: "box",
                        layout: "horizontal",
                        contents: [
                          {
                            type: "text",
                            text: "Date That Donate",
                            size: "sm",
                            color: "#555555",
                            flex: 0,
                          },
                          {
                            type: "text",
                            text: `${date}`,
                            size: "sm",
                            color: "#111111",
                            align: "end",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "separator",
                    margin: "xxl",
                  },
                  {
                    type: "box",
                    layout: "vertical",
                    margin: "xxl",
                    contents: [
                      {
                        type: "spacer",
                      },
                      {
                        type: "image",
                        url: "https://i.postimg.cc/XJpxMr7S/IMG-5611.jpg",
                        aspectMode: "cover",
                        size: "xl",
                      },
                      {
                        type: "text",
                        text: "You can scan this code for proceed your payment",
                        color: "#aaaaaa",
                        wrap: true,
                        margin: "xxl",
                        size: "xs",
                      },
                    ],
                  },
                  {
                    type: "separator",
                    margin: "xxl",
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    margin: "md",
                    contents: [
                      {
                        type: "text",
                        text: "PAYMENT ID",
                        size: "xs",
                        color: "#aaaaaa",
                        flex: 0,
                      },
                      {
                        type: "text",
                        text: "#PaymentId RestApi",
                        color: "#aaaaaa",
                        size: "xs",
                        align: "end",
                      },
                    ],
                  },
                ],
              },
              styles: {
                footer: {
                  separator: true,
                },
              },
            },
        });
    }else if(money < 5000){
        const org1 =org[Math.floor(Math.random() * org.length)];
        const org2 = org[Math.floor(Math.random() * org.length)];
        const org3 =org[Math.floor(Math.random() * org.length)];
        return client.replyMessage(event.replyToken, {
            type: "flex",
            altText: "Tankyou For Donation <3~",
            contents: {
              type: "bubble",
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: "PetAIDonation",
                    weight: "bold",
                    color: "#1DB446",
                    size: "sm",
                  },
                  {
                    type: "text",
                    text: "Thank you~",
                    weight: "bold",
                    size: "xxl",
                    margin: "md",
                  },
                  {
                    type: "text",
                    text: "Thank you for donation!",
                    size: "xs",
                    color: "#aaaaaa",
                    wrap: true,
                  },
                  {
                    type: "separator",
                    margin: "xxl",
                  },
                  {
                    type: "box",
                    layout: "vertical",
                    margin: "xxl",
                    spacing: "sm",
                    contents: [
                      {
                        type: "box",
                        layout: "horizontal",
                        contents: [
                          {
                            type: "text",
                            text: "Type of Donation",
                            size: "sm",
                            color: "#555555",
                            flex: 0,
                          },
                          {
                            type: "text",
                            text: "Any",
                            size: "sm",
                            color: "#111111",
                            align: "end",
                          },
                        ],
                      },
                      {
                        type: "box",
                        layout: "horizontal",
                        contents: [
                          {
                            type: "text",
                            text: "Destination",
                            size: "sm",
                            color: "#555555",
                            flex: 0,
                          },
                          {
                            type: "text",
                            text: `${org1}`,
                            size: "sm",
                            color: "#111111",
                            align: "end",
                          },
                        ],
                      },
                      {
                        "type": "box",
                        "layout": "horizontal",
                        "contents": [
                          {
                            "type": "text",
                            "text": " ‎ ‎ ‎ ‎ ",
                            "size": "sm",
                            "color": "#555555"
                          },
                          {
                            "type": "text",
                            "text": `${org2}`,
                            "size": "sm",
                            "color": "#111111",
                            "align": "end"
                          }
                        ]
                      },
                      {
                        "type": "box",
                        "layout": "horizontal",
                        "contents": [
                          {
                            "type": "text",
                            "text": " ‎ ‎ ‎ ‎ ",
                            "size": "sm",
                            "color": "#555555"
                          },
                          {
                            "type": "text",
                            "text": `${org3}`,
                            "size": "sm",
                            "color": "#111111",
                            "align": "end"
                          }
                        ]
                      },
                      {
                        type: "box",
                        layout: "horizontal",
                        contents: [
                          {
                            type: "text",
                            text: "Amount",
                            size: "sm",
                            color: "#555555",
                            flex: 0,
                          },
                          {
                            type: "text",
                            text: `${money}baht`,
                            size: "sm",
                            color: "#111111",
                            align: "end",
                          },
                        ],
                      },
                      {
                        type: "box",
                        layout: "horizontal",
                        contents: [
                          {
                            type: "text",
                            text: "Date That Donate",
                            size: "sm",
                            color: "#555555",
                            flex: 0,
                          },
                          {
                            type: "text",
                            text: `${date}`,
                            size: "sm",
                            color: "#111111",
                            align: "end",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "separator",
                    margin: "xxl",
                  },
                  {
                    type: "box",
                    layout: "vertical",
                    margin: "xxl",
                    contents: [
                      {
                        type: "spacer",
                      },
                      {
                        type: "image",
                        url: "https://i.postimg.cc/XJpxMr7S/IMG-5611.jpg",
                        aspectMode: "cover",
                        size: "xl",
                      },
                      {
                        type: "text",
                        text: "You can scan this code for proceed your payment",
                        color: "#aaaaaa",
                        wrap: true,
                        margin: "xxl",
                        size: "xs",
                      },
                    ],
                  },
                  {
                    type: "separator",
                    margin: "xxl",
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    margin: "md",
                    contents: [
                      {
                        type: "text",
                        text: "PAYMENT ID",
                        size: "xs",
                        color: "#aaaaaa",
                        flex: 0,
                      },
                      {
                        type: "text",
                        text: "#PaymentId RestApi",
                        color: "#aaaaaa",
                        size: "xs",
                        align: "end",
                      },
                    ],
                  },
                ],
              },
              styles: {
                footer: {
                  separator: true,
                },
              },
            },
          });
    }else if(money < 10000){
        const org1 =org[Math.floor(Math.random() * org.length)];
        const org2 = org[Math.floor(Math.random() * org.length)];
        const org3 =org[Math.floor(Math.random() * org.length)];
        const org4 =org[Math.floor(Math.random() * org.length)];
        return client.replyMessage(event.replyToken, {
            type: "flex",
            altText: "Tankyou For Donation <3~",
            contents: {
              type: "bubble",
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: "PetAIDonation",
                    weight: "bold",
                    color: "#1DB446",
                    size: "sm",
                  },
                  {
                    type: "text",
                    text: "Thank you~",
                    weight: "bold",
                    size: "xxl",
                    margin: "md",
                  },
                  {
                    type: "text",
                    text: "Thank you for donation!",
                    size: "xs",
                    color: "#aaaaaa",
                    wrap: true,
                  },
                  {
                    type: "separator",
                    margin: "xxl",
                  },
                  {
                    type: "box",
                    layout: "vertical",
                    margin: "xxl",
                    spacing: "sm",
                    contents: [
                      {
                        type: "box",
                        layout: "horizontal",
                        contents: [
                          {
                            type: "text",
                            text: "Type of Donation",
                            size: "sm",
                            color: "#555555",
                            flex: 0,
                          },
                          {
                            type: "text",
                            text: "Any",
                            size: "sm",
                            color: "#111111",
                            align: "end",
                          },
                        ],
                      },
                      {
                        type: "box",
                        layout: "horizontal",
                        contents: [
                          {
                            type: "text",
                            text: "Destination",
                            size: "sm",
                            color: "#555555",
                            flex: 0,
                          },
                          {
                            type: "text",
                            text: `${org1}`,
                            size: "sm",
                            color: "#111111",
                            align: "end",
                          },
                        ],
                      },
                      {
                        "type": "box",
                        "layout": "horizontal",
                        "contents": [
                          {
                            "type": "text",
                            "text": " ‎ ‎ ‎ ‎ ",
                            "size": "sm",
                            "color": "#555555"
                          },
                          {
                            "type": "text",
                            "text": `${org2}`,
                            "size": "sm",
                            "color": "#111111",
                            "align": "end"
                          }
                        ]
                      },
                      {
                        "type": "box",
                        "layout": "horizontal",
                        "contents": [
                          {
                            "type": "text",
                            "text": " ‎ ‎ ‎ ‎ ",
                            "size": "sm",
                            "color": "#555555"
                          },
                          {
                            "type": "text",
                            "text": `${org3}`,
                            "size": "sm",
                            "color": "#111111",
                            "align": "end"
                          }
                        ]
                      },
                      {
                        "type": "box",
                        "layout": "horizontal",
                        "contents": [
                          {
                            "type": "text",
                            "text": " ‎ ‎ ‎ ‎ ",
                            "size": "sm",
                            "color": "#555555"
                          },
                          {
                            "type": "text",
                            "text": `${org4}`,
                            "size": "sm",
                            "color": "#111111",
                            "align": "end"
                          }
                        ]
                      },
                      {
                        type: "box",
                        layout: "horizontal",
                        contents: [
                          {
                            type: "text",
                            text: "Amount",
                            size: "sm",
                            color: "#555555",
                            flex: 0,
                          },
                          {
                            type: "text",
                            text: `${money}baht`,
                            size: "sm",
                            color: "#111111",
                            align: "end",
                          },
                        ],
                      },
                      {
                        type: "box",
                        layout: "horizontal",
                        contents: [
                          {
                            type: "text",
                            text: "Date That Donate",
                            size: "sm",
                            color: "#555555",
                            flex: 0,
                          },
                          {
                            type: "text",
                            text: `${date}`,
                            size: "sm",
                            color: "#111111",
                            align: "end",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "separator",
                    margin: "xxl",
                  },
                  {
                    type: "box",
                    layout: "vertical",
                    margin: "xxl",
                    contents: [
                      {
                        type: "spacer",
                      },
                      {
                        type: "image",
                        url: "https://i.postimg.cc/XJpxMr7S/IMG-5611.jpg",
                        aspectMode: "cover",
                        size: "xl",
                      },
                      {
                        type: "text",
                        text: "You can scan this code for proceed your payment",
                        color: "#aaaaaa",
                        wrap: true,
                        margin: "xxl",
                        size: "xs",
                      },
                    ],
                  },
                  {
                    type: "separator",
                    margin: "xxl",
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    margin: "md",
                    contents: [
                      {
                        type: "text",
                        text: "PAYMENT ID",
                        size: "xs",
                        color: "#aaaaaa",
                        flex: 0,
                      },
                      {
                        type: "text",
                        text: "#PaymentId RestApi",
                        color: "#aaaaaa",
                        size: "xs",
                        align: "end",
                      },
                    ],
                  },
                ],
              },
              styles: {
                footer: {
                  separator: true,
                },
              },
            },
        });
    }else{
        const org1 =org[Math.floor(Math.random() * org.length)];
        const org2 = org[Math.floor(Math.random() * org.length)];
        const org3 =org[Math.floor(Math.random() * org.length)];
        const org4 =org[Math.floor(Math.random() * org.length)];
        const org5 = org[Math.floor(Math.random() * org.length)];
        return client.replyMessage(event.replyToken, {
            type: "flex",
            altText: "Tankyou For Donation <3~",
            contents: {
              type: "bubble",
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: "PetAIDonation",
                    weight: "bold",
                    color: "#1DB446",
                    size: "sm",
                  },
                  {
                    type: "text",
                    text: "Thank you~",
                    weight: "bold",
                    size: "xxl",
                    margin: "md",
                  },
                  {
                    type: "text",
                    text: "Thank you for donation!",
                    size: "xs",
                    color: "#aaaaaa",
                    wrap: true,
                  },
                  {
                    type: "separator",
                    margin: "xxl",
                  },
                  {
                    type: "box",
                    layout: "vertical",
                    margin: "xxl",
                    spacing: "sm",
                    contents: [
                      {
                        type: "box",
                        layout: "horizontal",
                        contents: [
                          {
                            type: "text",
                            text: "Type of Donation",
                            size: "sm",
                            color: "#555555",
                            flex: 0,
                          },
                          {
                            type: "text",
                            text: "Any",
                            size: "sm",
                            color: "#111111",
                            align: "end",
                          },
                        ],
                      },
                      {
                        type: "box",
                        layout: "horizontal",
                        contents: [
                          {
                            type: "text",
                            text: "Destination",
                            size: "sm",
                            color: "#555555",
                            flex: 0,
                          },
                          {
                            type: "text",
                            text: `${org1}`,
                            size: "sm",
                            color: "#111111",
                            align: "end",
                          },
                        ],
                      },
                      {
                        "type": "box",
                        "layout": "horizontal",
                        "contents": [
                          {
                            "type": "text",
                            "text": " ‎ ‎ ‎ ‎ ",
                            "size": "sm",
                            "color": "#555555"
                          },
                          {
                            "type": "text",
                            "text": `${org2}`,
                            "size": "sm",
                            "color": "#111111",
                            "align": "end"
                          }
                        ]
                      },
                      {
                        "type": "box",
                        "layout": "horizontal",
                        "contents": [
                          {
                            "type": "text",
                            "text": " ‎ ‎ ‎ ‎ ",
                            "size": "sm",
                            "color": "#555555"
                          },
                          {
                            "type": "text",
                            "text": `${org3}`,
                            "size": "sm",
                            "color": "#111111",
                            "align": "end"
                          }
                        ]
                      },
                      {
                        "type": "box",
                        "layout": "horizontal",
                        "contents": [
                          {
                            "type": "text",
                            "text": " ‎ ‎ ‎ ‎ ",
                            "size": "sm",
                            "color": "#555555"
                          },
                          {
                            "type": "text",
                            "text": `${org4}`,
                            "size": "sm",
                            "color": "#111111",
                            "align": "end"
                          }
                        ]
                      },
                      {
                        "type": "box",
                        "layout": "horizontal",
                        "contents": [
                          {
                            "type": "text",
                            "text": " ‎ ‎ ‎ ‎ ",
                            "size": "sm",
                            "color": "#555555"
                          },
                          {
                            "type": "text",
                            "text": `${org5}`,
                            "size": "sm",
                            "color": "#111111",
                            "align": "end"
                          }
                        ]
                      },
                      
                      {
                        type: "box",
                        layout: "horizontal",
                        contents: [
                          {
                            type: "text",
                            text: "Amount",
                            size: "sm",
                            color: "#555555",
                            flex: 0,
                          },
                          {
                            type: "text",
                            text: `${money}baht`,
                            size: "sm",
                            color: "#111111",
                            align: "end",
                          },
                        ],
                      },
                      {
                        type: "box",
                        layout: "horizontal",
                        contents: [
                          {
                            type: "text",
                            text: "Date That Donate",
                            size: "sm",
                            color: "#555555",
                            flex: 0,
                          },
                          {
                            type: "text",
                            text: `${date}`,
                            size: "sm",
                            color: "#111111",
                            align: "end",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "separator",
                    margin: "xxl",
                  },
                  {
                    type: "box",
                    layout: "vertical",
                    margin: "xxl",
                    contents: [
                      {
                        type: "spacer",
                      },
                      {
                        type: "image",
                        url: "https://i.postimg.cc/XJpxMr7S/IMG-5611.jpg",
                        aspectMode: "cover",
                        size: "xl",
                      },
                      {
                        type: "text",
                        text: "You can scan this code for proceed your payment",
                        color: "#aaaaaa",
                        wrap: true,
                        margin: "xxl",
                        size: "xs",
                      },
                    ],
                  },
                  {
                    type: "separator",
                    margin: "xxl",
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    margin: "md",
                    contents: [
                      {
                        type: "text",
                        text: "PAYMENT ID",
                        size: "xs",
                        color: "#aaaaaa",
                        flex: 0,
                      },
                      {
                        type: "text",
                        text: "#PaymentId RestApi",
                        color: "#aaaaaa",
                        size: "xs",
                        align: "end",
                      },
                    ],
                  },
                ],
              },
              styles: {
                footer: {
                  separator: true,
                },
              },
            },
        });
    }
  }
};

app.listen(port);
console.log("🐳 Message_api BE Online with port " + port);
