const Command = require("./command");
var config = require("../config.json");
const Prefix = config.Prefix;
const fs = require("fs");

module.exports = class volume extends Command {

  static match (message) {
    return message.content.startsWith(Prefix + "volume");
  }

  static action (message) {
    console.log("command:", "\x1b[36m", "volume", "\x1b[0m");

    let args = message.content.split(" ");

    message.delete();
    if (args.length > 1) {
      try {
        var volume = args[1]/100;

        var config = require("../config.json");
        config.Volume = volume;

        fs.readFile('./config.json', 'utf-8', function(err, data) {
      	  if (err) throw err;

      	  var config = JSON.parse(data);
          config.Volume = volume;

          fs.writeFile('./config.json', JSON.stringify(config), 'utf-8', function(err) {
            if (err) throw err;
          })
        })
      }
      catch (error) {
        console.log(error);
        message.reply("type a number as an argument of volume please");
      }
      message.channel.send(":loud_sound: The volume has been set to **" + parseInt(config.Volume * 100) + "**");
      console.log("volume has been set to " + parseInt(config.Volume * 100));
    }
    else {
      var config = require("../config.json");
      console.log("volume = " + parseInt(config.Volume * 100));
      message.channel.send(":loud_sound: The volume is **" + parseInt(config.Volume * 100) + "**");
    }

  }

}
