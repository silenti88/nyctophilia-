const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!(args[0] >= 1)){
        return message.channel.send("You have to enter the amount of messages you want to delete");
    }
    if(args[0] >= 100){
        return message.channel.send("You have to select **less** than 100 messages to delete")
    }
    if(message.guild.me.hasPermission('MANAGE_MESSAGES')){
        let toDelete = Number(args[0]) + 1
        message.channel.bulkDelete(toDelete, true)
        message.react("✅")
    }else{
        message.channel.send("I do not have permission");
    }
}

module.exports.help = {
    name: "purge",
    description: "purges messages"
}