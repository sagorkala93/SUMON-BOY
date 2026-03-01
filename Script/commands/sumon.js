‎module.exports.config = {
‎name: "voice",
‎version: "1.0.0",
‎hasPermssion: 0,
‎credits: "SHAHADAT SAHU",
‎description: "Emoji দিলে কিউট মেয়ের ভয়েস পাঠাবে 😍",
‎commandCategory: "noprefix",
‎usages: "😘🥰😍",
‎cooldowns: 0
‎};
‎
‎const axios = require("axios");
‎const fs = require("fs");
‎const path = require("path");
‎
‎const emojiAudioMap = {
‎"@বি্ঁ'ষা্ঁ'ক্ত্ঁ না্ঁ'গ্ঁ'রা্ঁ'জ্ঁ": "বস কে ডাকেন কেন সে এখন বেস্ত আছে আমাকে বলো😊😒",
‎"@প্র্ঁ'তি্ঁ'ষ্ঠা্ঁ'তা্ঁ সু্ঁ'ম্ঁ'ন্ঁ": "মেনশন দিছেন কেন পাগল বট বা বেবি বলে আমাকে বলতে পারো🥰🤨",
‎"@বি্ঁ'ষা্ঁ'ক্ত্ঁ না্ঁ'গ্ঁ'রা্ঁ'জ্ঁ কলে আসেন": "আমার বস কে এতো কলে ডাকেন কেন🤨",
‎"Call up": "সবাই চিপায় থাকলে তো কল আপ হবে",
‎"Sumon": "সুমন বস কে একটা বউ খুজে দাও",
‎"Sumon vai": "ভাই না ডাকে তোর খালাতো বোনের লগে প্রেম করে দে😑🐸",
‎"👀": "তোমার চোখ দুটা তো সুন্দর😆😁" };
‎
‎module.exports.handleEvent = async ({ api, event }) => {
‎const { threadID, messageID, body } = event;
‎if (!body || body.length > 2) return;
‎
‎const emoji = body.trim();
‎const audioUrl = emojiAudioMap[emoji];
‎if (!audioUrl) return;
‎
‎const cacheDir = path.join(__dirname, 'cache');
‎if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);
‎
‎const filePath = path.join(cacheDir, `${encodeURIComponent(emoji)}.mp3`);
‎
‎try {
‎const response = await axios({
‎method: 'GET',
‎url: audioUrl,
‎responseType: 'stream'
‎});
‎
‎const writer = fs.createWriteStream(filePath);
‎response.data.pipe(writer);
‎
‎writer.on('finish', () => {
‎api.sendMessage({
‎attachment: fs.createReadStream(filePath)
‎}, threadID, () => {
‎fs.unlink(filePath, (err) => {
‎if (err) console.error("Error deleting file:", err);
‎});
‎}, messageID);
‎});
‎
‎writer.on('error', (err) => {
‎console.error("Error writing file:", err);
‎api.sendMessage("ইমুজি দিয়ে লাভ নাই\nযাও মুড়ি খাও জান😘", threadID, messageID);
‎});
‎
‎} catch (error) {
‎console.error("Error downloading audio:", error);
‎api.sendMessage("ইমুজি দিয়ে লাভ নাই\nযাও মুড়ি খাও জান😘", threadID, messageID);
‎}
‎};
‎
‎module.exports.run = () => {};
‎
