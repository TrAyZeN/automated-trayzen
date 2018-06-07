const Command = require("./command");
const Discord = require("discord.js");
const config = require("../config.json");
const Prefix = config.Prefix;

module.exports = class volume extends Command {

  static match (message) {
    return message.content.startsWith(Prefix + "roll");
  }

  static action (message) {
    console.log("command:", "\x1b[36m", "roll", "\x1b[0m");

    var roll = Math.floor(Math.random()*100);

    message.delete();

    var rollMessage = new Discord.RichEmbed()
      .setAuthor("Automated TrAyZeN", "https://cdn.discordapp.com/attachments/365898765296599042/367673462539550720/avatar.jpg")
      .setColor(0x8e1f8e)
      .setTitle("King Dice is rolling the dice...")
      .addField("You rolled", roll)
      .setThumbnail("https://vignette.wikia.nocookie.net/cuphead/images/9/99/KingDiceIcon.png/revision/latest?cb=20171014020058")
      .setFooter("requested by " + message.author.username, message.author.avatarURL)
      .setTimestamp()

    message.channel.send(rollMessage);
    console.log("roll");

  }

}
