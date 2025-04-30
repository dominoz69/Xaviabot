module.exports.config = {
    name: "remini",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Who's Deku",
    description: "Remini filter",
    commandCategory: "...",
    usages: "[reply to image or image url]",
    cooldowns: 1,
};
const axios = require("axios")
const fs = require("fs");
module.exports.run = async function({ api, event, args }) {
const { threadID, messageID } = event;
if (event.type == "message_reply"){
var t = event.messageReply.attachments[0].url
} else {
 var t = args.join(" ");
}
try {
api.sendMessage("Generating...", threadID, messageID);
    const r = await axios.get("https://free-api.ainz-sama101.repl.co/canvas/remini?", {
                params: {
                    url: encodeURI(t)
    }
});
const result = r.data.result.image_data;
    let ly = __dirname+"/cache/anime.png";
    let ly1 = (await axios.get(result, {
    responseType: "arraybuffer"
  })).data;
  fs.writeFileSync(ly, Buffer.from(ly1, "utf-8"));
    return api.sendMessage({attachment: fs.createReadStream(ly)}, threadID, () => fs.unlinkSync(ly), messageID)
  } catch (e){
        console.log(e.message);
          return api.sendMessage("Something went wrong.\n"+e.message, threadID, messageID)
   }
 }
