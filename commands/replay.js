const Command = require("./command");
const Discord = require("discord.js");
const ytdl = require("ytdl-core");
var config = require("../config.json");
const Prefix = config.Prefix;

module.exports = class Replay extends Command {

  static match (message) {
    return message.content.startsWith(Prefix + "replay");
  }

  static action (message) {
    console.log("command:", "\x1b[36m", "replay", "\x1b[0m");

    message.delete();
    let voiceChannel = message.member.voiceChannel;

    delete require.cache[require.resolve("../config.json")]
    config = require("../config.json");
    var videoURL = config.PreviousVideoURL;

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
          let stream = ytdl(videoURL, { quality:"lowest", filter: "audioonly", volume: config.Volume });
          stream.on("error", function (err) {
            console.log(err);
            message.reply("I can't read this video");
            connection.disconnect();
          })
          connection
            .playStream(stream)
            .on("end", function () {
              connection.disconnect();
          })
      });
      var videoID = ytdl.getURLVideoID(videoURL);
        ytdl.getInfo(videoID, function (err, info) {
        if (err) throw err;
  
        var h = parseInt(info.length_seconds/3600);
        var m = parseInt((info.length_seconds-h*3600)/60);
        var s = info.length_seconds - h*3600 - m*60;
  
        var playMessage = new Discord.RichEmbed()
          .setAuthor("Automated TrAyZeN", "https://cdn.discordapp.com/attachments/365898765296599042/367673462539550720/avatar.jpg")
          .setColor(0xee0f0f)
          .setTitle("Playing music")
          .addField("Now playing " + info.title, "Duration time " + h + "h " + m + "m " + s + "s")
          .setThumbnail("http://www.icone-png.com/png/16/15623.png")
          .setURL(videoURL)
          .setFooter("requested by " + message.author.username, message.author.avatarURL)
          .setTimestamp()
  
        message.channel.send(playMessage);
        console.log("replay");
      })
    }   

  }

}
