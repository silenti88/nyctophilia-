const Discord = require("discord.js")
const config = require("../config.json")
const prefix = config.prefix
const fs = require ("fs");

module.exports = (client,message,invites) => {
    client.commands = new Discord.Collection();

    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(message.channel.type === "dm") return;
    
    let messageArray = message.content.split(" ");
    let cmd = messageArray.shift().slice(prefix.length);
    let args = messageArray;
    let cmdFile = ""

    try{
        fs.readdir("./commands", (err,folders)=>{
            folders.forEach((files,i) => {
                fs.readdir(`./commands/${files}`, (err,commands) => {
                    if(commands.includes(`${cmd}.js`)){
                        cmdFile = require(`../commands/${files}/${cmd}.js`)
                        if(cmd === "delete"){
                            cmdFile.run(client,message,args,invites)
                        }else{
                            cmdFile.run(client,message,args)
                        }
                    }
                })
            })
        })
    }catch (err){
        console.error();
    }
}