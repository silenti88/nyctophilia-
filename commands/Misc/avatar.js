const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
     
    let image = message.mentions.members.first();
    if(!(args[0])){
        image = message.author.avatarURL
    }else if(!image){
        
        image = message.guild.members.find(member => member.user.username.toLowerCase().includes(args[0])).user.avatarURL
        if(!image){
            message.channel.send("I cannot find that user check capitilization!")
        }
    }
    uEmbed = new Discord.RichEmbed() 
        .setDescription(`Here is their profile picture`)
        .setImage(image)
        .setColor('#f2ff00')
    message.channel.send(uEmbed);
     
}
  
  module.exports.help = {
    name: "avatar",
    description: "gets the avatar of a user"
 }
 