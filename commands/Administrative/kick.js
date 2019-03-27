const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {
let kicked = message.mentions.members.first()
let reason = ''
let guildID = message.guild.id

for (i = 1; i < args.length; i++){
    reason += args[i] + " "
}

if(!reason){
    reason = "no reason given"
}

if(!args[0]){
    return message.channel.send("You have to specify the user you would like to kick.")
}else if(!kicked){
    kicked = bot.guilds.get(guildID).members.find(member => member.user.username.toLowerCase().includes(args[0]))
}

if (!kicked) return  message.channel.send("Check your spelling!") 
if(!message.member.hasPermission('KICK_MEMBERS') && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("You don't have permissions to complete this task!")

message.guild.kick(kicked.user, {reason: reason}).then(kicked.send({embed:{
    description: `⛔ You were kicked from ${message.guild} for ${reason}`,
    color: 0xe22b29
}})).catch(console.error)

message.channel.send({embed:{
    description: `You have successfully kicked ${kicked}|${kicked.user.discriminator}`,
    color: 0xe22b29
}}).catch(console.error)

}

module.exports.help = {
    name: "kick",
    description: "Kicks user mentioned!"
}