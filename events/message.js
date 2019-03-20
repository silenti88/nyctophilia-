const Discord = require("discord.js")
const config = require("../config.json")
const prefix = config.prefix

module.exports = (client,message) => {
    if(message.author.bot) return;
    if(message.content.startsWith(prefix)) return;
    if(message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.splice(1);

    let commandfile = client.commands.get(cmd.slice(prefix.length))
    if(commandfile) commandfile.run(client,message,args)
}