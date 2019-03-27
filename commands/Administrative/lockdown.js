const Discord = require("discord.js"); 
const config = require("../../config.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) return;


    if(config.lockdown[message.guild.id]){
        config.lockdown[message.guild.id] = false;
        message.channel.send("The server is no longer under lockdown!")
    }else{
        config.lockdown[message.guild.id] = true;
        message.channel.send("The server is now under lockdown!")
    }
    
    fs.writeFile("config.json", JSON.stringify(config), 'utf8', () => {
        console.error();
    })
} 

module.exports.help = {
   name: "lockdown",
   description: "Closes server"
}