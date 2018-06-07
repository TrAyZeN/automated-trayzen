const Command = require("./command");
const Discord = require("discord.js");
const config = require("../config.json");
const Prefix = config.Prefix;

module.exports = class volume extends Command {

  static match (message) {
    return message.content.startsWith(Prefix + "poll");
  }

  static action (message) {
    console.log("command:", "\x1b[36m", "poll", "\x1b[0m");
    
    let args = message.content.split(" ");
    args.shift();
    args = args.join(" ");
    var member = message.author;

    message.delete();

    const pollMessage = new Discord.RichEmbed()
      .setTitle(args)
      .setAuthor("Automated TrAyZeN", "https://cdn.discordapp.com/attachments/365898765296599042/367673462539550720/avatar.jpg")
      .setColor(0x09bc00)
      .setFooter("requested by " + message.author.username, message.author.avatarURL)
      .setTimestamp()

    message.channel.send(pollMessage)
      .then(function (message) {
        message.react("👍");
        message.react("👎");
      });

    console.log("poll requested");
  }

}
