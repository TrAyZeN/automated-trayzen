const Command = require("./command");
const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const search = require("youtube-search");
var config = require("../config.json");
const Prefix = config.Prefix;
const fs = require("fs");

module.exports = class Play extends Command {

  static match (message) {
    return message.content.startsWith(Prefix + "play");
  }

  static action (message) {
    console.log("command:", "\x1b[36m", "play", "\x1b[0m");

    let args = message.content.split(" ");
    message.delete();
    args.shift();
    args = args.join(" ");

    let voiceChannel = message.member.voiceChannel;
    var videoURL;
    var videoID;
    var ytURLregex = new RegExp("http(s?)://((www|m(?=\.youtube\.com/watch))\.youtube\.com/(watch|embed/|v/)|youtu.be/)");

    if (args.match(ytURLregex)) {
      args = args.split(" ");
      var videoURL = args[0];
      var videoID = ytdl.getURLVideoID(videoURL);
      playVideo();
    } else {
      message.channel.send(":mag: Searching for **" + args + "**");
      var opts = {
        maxResults: 1,
        key: "put-your-google-api-key",
        type: "video",
        order: "viewCount"
      };

      search(args.toString(), opts, function(err, results) {
        if(err) return console.log(err);
        videoURL = results[0].link.toString();
        videoID = results[0].id.toString();
        playVideo();
      })
    }

    function playVideo() {
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
            savePreviousVideoURL();
            config = require("../config.json");
            let stream = ytdl(String(videoURL), { quality: "lowest", filter: "audioonly", volume: config.Volume });
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
          })
        sendPlayMessage();
      }
    }

    function sendPlayMessage() {
      ytdl.getInfo(String(videoID), function (err, info) {
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
        console.log("title: " + info.title + "\nurl: " + videoURL);
      })
    }

    function savePreviousVideoURL() {
      fs.readFile('./config.json', 'utf-8', function(err, data) {
      	if (err) throw err;

      	config = JSON.parse(data);
      	config.PreviousVideoURL = videoURL;

      	fs.writeFile('./config.json', JSON.stringify(config), 'utf-8', function(err) {
      		if (err) throw err;
      	})
      })
    }

  }

}
