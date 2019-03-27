const Discord = require("discord.js"); 

module.exports.run = async (bot, message, args, invites) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return
    let deleted = message.mentions.members.first().user
    if(args[0]=== "all"){
        message.guild.fetchInvites()
        .then(async guildInvites => {
            await guildInvites.deleteAll()
            message.channel.send("All invite codes were deleted!")
            invites[message.guild.id] = guildInvites;
        });
    }else{
        message.guild.fetchInvites()
        .then(async guildInvites => {
            invite = await guildInvites.find(i => i.code === args[0])
            if(invite){
                invite.delete()
                message.channel.send(`The invite code "${invite.code} has been deleted!"`)
            }else{
                invite = await guildInvites.filter(i=>i.inviter === deleted)
                if(invite){
                    invite.deleteAll()
                    message.channel.send(`All the invites by ${deleted.username} has been deleted!`)
                }
                else{
                    invite = await guildInvites.find(i=>args.include(i.url))
                    if(invite){
                        invite.delete()
                        message.channel.send("The invite has been deleted.")
                    }else{
                        message.channel.send("That is not an invite or a user!")
                    }
                }
            }
            invites[message.guild.id] = guildInvites;
        });
    }   
} 

module.exports.help = {
   name: "delete",
   description: "deletes invites"
}