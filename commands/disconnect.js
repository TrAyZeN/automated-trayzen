const Command = require("./command");
const config = require("../config.json");
const Prefix = config.Prefix;

module.exports = class Disconnect extends Command {

  static match (message) {
    return message.content.startsWith(Prefix + "disconnect");
  }

  static action (message) {
    console.log("command:", "\x1b[36m", "disconnect", "\x1b[0m");
    
    let voiceChannel = message.member.voiceChannel;
    message.delete();

    if (voiceChannel == undefined) {
      console.log("voiceChannel = undefined");
      message.reply("I have already left the channel");
    } else {
      voiceChannel.leave();
      message.channel.send("See you later");
      console.log("disconnected");
    }
    
  }
}
