const Command = require("./command");
const Discord = require("discord.js");
const ytdl = require("ytdl-core");
var config = require("../config.json");
const Prefix = config.Prefix;

module.exports = class Play extends Command {

  static match (message) {
    return message.content.startsWith(Prefix + "dubstep");
  }

  static action (message) {
    console.log("command:", "\x1b[36m", "dubstep", "\x1b[0m");
    
    let voiceChannel = message.member.voiceChannel;
    
    let videoURL = "https://www.youtube.com/watch?v=InTErMYwl5I";
    message.delete();

    if (voiceChannel == undefined) {
      console.log("Error: can't join channel undefined");
      message.reply("I can't join the channel");
    } else if (!voiceChannel.joinable) {
      console.log("Error: don't have the permission to join the channel");
      message.reply("I don't have the permission to join the channel");
    } else {
      voiceChannel
      .join()
      .then(function (connection) {
          var config = require("../config.json");
          console.log("volume: ", config.Volume);
          let stream = ytdl(videoURL.toString(), { quality: "lowest", filter: "audioonly", volume: config.Volume });
          stream.on("error", function () {
            message.reply("I can't read this video");
            connection.disconnect();
          });
          connection
            .playStream(stream)
            .on("end", function () {
              connection.disconnect();
          });

      });
      var playMessage = new Discord.RichEmbed()
        .setAuthor("Automated TrAyZeN", "https://cdn.discordapp.com/attachments/365898765296599042/367673462539550720/avatar.jpg")
        .setColor(0xffe900)
        .setTitle("Wub Wub Wub Wub Wub")
        .addField("Wub Wub Wub Wub", "Wub Wub Wub Wub Wub Wub Wub")
        .setThumbnail("https://pm1.narvii.com/6450/df662b1f5fae9b7d186725c43bff348dc3150557_128.jpg")
        .setFooter("requested by " + message.author.username, message.author.avatarURL)
        .setTimestamp()

      message.channel.send(playMessage);
      console.log("dubstep Wub Wub Wub Wub Wub");
    }
    
  }

}
