const Command = require("./command");
const Discord = require("discord.js");
const config = require("../config.json");
const Prefix = config.Prefix;

module.exports = class Help extends Command {

  static match (message) {
    return message.content.startsWith(Prefix + "help");
  }

  static action (message) {
    console.log("command:", "\x1b[36m", "help", "\x1b[0m");
    
    var member = message.author;
    const helpMessage = new Discord.RichEmbed()
      .setTitle("__**Help on commands**__")
      .setAuthor("Automated TrAyZeN", "https://cdn.discordapp.com/attachments/365898765296599042/367673462539550720/avatar.jpg")
      .setColor(3447003)
      .addField(Prefix + "example", "*description of the command* ```" + Prefix + "example <args>```")
      .addField(Prefix + "play", "*play a youtube video* ```" + Prefix + "play <youtube-link>```")
      .addField(Prefix + "replay", "*replay the last video played* ```" + Prefix + "replay```")
      .addField(Prefix + "volume", "*change the volume* ```" + Prefix + "volume <volume-to-set>```")
      .addField(Prefix + "dubstep", "*play some dubstep music* ```" + Prefix + "dubstep```")
      .addField(Prefix + "roll", "*roll a number between 0 and 100* ```" + Prefix + "roll```")
      .addField(Prefix + "poll", "*make a poll* ```" + Prefix + "poll <question-to-ask>```")
      .addField(Prefix + "disconnect", "*disconnect the bot from a voice channel* ```" + Prefix + "disconnect```")
      .setThumbnail("https://housing.umn.edu/sites/housing.umn.edu/files/help.png")
      .setFooter("requested by " + message.author.username, message.author.avatarURL)
      .setTimestamp()

    message.channel.send(helpMessage);
    message.delete();

    console.log("help needed");
  }

}
