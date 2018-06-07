const Command = require("./command");
const config = require("../config.json");
const Prefix = config.Prefix;

module.exports = class Ping extends Command {

  static match (message) {
    return message.content.startsWith(Prefix + "example");
  }

  static action (message) {
    console.log("command:", "\x1b[36m", "example", "\x1b[0m");
    
    message.reply("Bro that was only an example command, why did you typed this?");
    console.log("An idiot just called the example command");
  }

}
