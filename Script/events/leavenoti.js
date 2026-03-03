‎module.exports.config = {
‎  name: "leave",
‎  eventType: ["log:unsubscribe"],
‎  version: "1.0.0",
‎  credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
‎  description: "Thông báo bot hoặc người rời khỏi nhóm",
‎  dependencies: {
‎    "fs-extra": "",
‎    "path": ""
‎  }
‎};
‎
‎module.exports.run = async function({ api, event, Users, Threads }) {
‎  if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
‎
‎  const { createReadStream, existsSync, mkdirSync } = global.nodemodule["fs-extra"];
‎  const { join } = global.nodemodule["path"];
‎  const { threadID } = event;
‎
‎  const data = global.data.threadData.get(parseInt(threadID)) || (await Threads.getData(threadID)).data;
‎  const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
‎
‎  const type = (event.author == event.logMessageData.leftParticipantFbId)
‎    ? " তোর সাহস কম না  গ্রুপের এডমিনের পারমিশন ছাড়া তুই লিভ  নিস😡😠🤬 \n✦─────꯭─⃝‌‌SUMON BOT────✦"
‎    : "সম্মানিত মেম্বার,
‎
‎🫵🫵🫵
‎
‎💔 আসলে আপনাকে কিক দিতে খুব কষ্ট হচ্ছে, কিন্তু কিছু করার নেই... 😔
‎আপনি যখন সময় পাবেন, ফ্রী হবেন, যখন মনে হবে আপনি সময় দিতে পারবেন, তখন আমাদের এডমিন পারসনকে নক দিয়ে গ্রুপে এড হবেন।😊\⚠️ নোট:
‎- আপনার অবদান আমাদের কাছে অনেক গুরুত্বপূর্ণ ছিল 🙏
‎- আশা করি ভবিষ্যতে আবার একসাথে দেখা হবে 🌈
‎- গ্রুপের নিয়ম-কানুন মেনে চলার জন্য ধন্যবাদ 👍
‎- আপনার জন্য সবসময় ভালোবাসা রইলো ❤️
‎
‎আশা করি বুঝতে পেরেছেন 😊
‎
‎আপনার অপেক্ষায় রইলাম... ⌛
‎
‎ধন্যবাদ,😘🥰 \n✦─────꯭─⃝‌‌SUMON BOT────✦";
‎
‎  const path = join(__dirname, "Shahadat", "leaveGif");
‎  const gifPath = join(path, `leave1.gif`);
‎
‎  if (!existsSync(path)) mkdirSync(path, { recursive: true });
‎
‎  let msg = (typeof data.customLeave == "undefined")
‎    ? "ইস {name} {type} "
‎    : data.customLeave;
‎
‎  msg = msg.replace(/\{name}/g, name).replace(/\{type}/g, type);
‎
‎  const formPush = existsSync(gifPath)
‎    ? { body: msg, attachment: createReadStream(gifPath) }
‎    : { body: msg };
‎
‎  return api.sendMessage(formPush, threadID);
‎};
‎
