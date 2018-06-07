const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
const Prefix = config.Prefix;
const Play = require("./commands/play");
const Help = require("./commands/help");
const Replay = require("./commands/replay");
const Volume = require("./commands/volume");
const Disconnect = require("./commands/disconnect");
const Roll = require("./commands/roll");
const Dubstep = require("./commands/dubstep");
const Poll = require("./commands/poll");
const Example = require("./commands/example")


bot.on("ready", function() {
  console.log("\x1b[92m", "----------------------------------- READY -----------------------------------", "\x1b[0m")
  bot.user.setAvatar("./avatar.jpg").then(() => console.log("avatar:", "\x1b[95m", "working", "\x1b[0m")).catch(console.error);
  bot.user.setActivity("to build oneself | " + Prefix + "help", {type: "PLAYING"}).then(() => console.log("game: ", "\x1b[95m", "working", "\x1b[0m")).catch(console.error);
});

bot.on("guildMemberAdd", function(member) {
  member.createDM().then(function(channel) {
    return channel.send("Welcome " + member.displayName);
  }).catch(console.error);
});

bot.on("message", function(message) {
  let commandUsed =
  Play.parse(message) ||
  Help.parse(message) ||
  Disconnect.parse(message) ||
  Replay.parse(message) ||
  Volume.parse(message) ||
  Roll.parse(message) ||
  Dubstep.parse(message) ||
  Poll.parse(message) ||
  Example.parse(message)
});

bot.login("put-your-bot-token-here");
