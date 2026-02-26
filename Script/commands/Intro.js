const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");
const moment = require("moment-timezone");

module.exports.config = {
 name: "intro",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "🔰Rahat Islam🔰",
 description: "Show  Info",
 commandCategory: "info",
 usages: "info",
 cooldowns: 2
};

module.exports.run = async function({ api, event }) {
 const time = moment().tz("Asia/Dhaka").format("DD/MM/YYYY hh:mm:ss A");

 const callback = () => api.sendMessage({
 body: `
┏━━━━━━━━━━━━━━━━┓
┃ 🌟𝐎𝐖𝐍𝐄𝐑 𝐈𝐍𝐅𝐎🌟
┣━━━━━━━━━━━━━━━━┫
┃👤𝐍𝐀𝐌𝐄      :মোঃসুমন ইসলাম
┃🚹𝐆𝐄𝐍𝐃𝐄𝐑    :ছেলে
┃🎂𝐀𝐆𝐄       :১৮+
┃🕌𝐑𝐄𝐋𝐈𝐆𝐈𝐎𝐍 : ইসলাম
┃🏫𝐄𝐃𝐔𝐂𝐀𝐓𝐈𝐎𝐍 :সুন্দরগঞ্জ.গাইবান্ধা
┃🏡𝐀𝐃𝐃𝐑𝐄𝐒𝐒 :গাইবান্ধা,রংপুর
┣━━━━━━━━━━━━━━━━┫
┃𝐓𝐈𝐊𝐓𝐎𝐊 :চালাই না
┃📢𝐓𝐄𝐋𝐄𝐆𝐑𝐀𝐌 :দিবো না🥴🤪
┃🌐𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 :প্র্ঁতি্ঁষ্ঠা্ঁতা্ঁ সু্ঁম্ঁন্ঁ
┣━━━━━━━━━━━━━━━━┫
┃🕒𝐔𝐏𝐃𝐀𝐓𝐄𝐃 𝐓𝐈𝐌𝐄 :${time}
┗━━━━━━━━━━━━━━━━┛`,
 attachment: fs.createReadStream(__dirname + "/cache/owner.jpg")
 }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/owner.jpg"));

 return request("https://i.imgur.com/FJI61jS.jpeg")
 .pipe(fs.createWriteStream(__dirname + '/cache/owner.jpg'))
 .on('close', () => callback());
};
