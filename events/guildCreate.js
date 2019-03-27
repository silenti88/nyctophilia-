const Discord = require("discord.js"); 
const config = require("../config.json")
const fs = require("fs")

module.exports = async (guild) => {
    const guildID = guild.id
    const value = {guildID : false}
    await Object.assign(config.lockdown,value)

    fs.writeFile("config.json", JSON.stringify(config), (err)=>{
        console.error
    })
    guild.owner.send("Thank you for inviting me! Please DM my owner if you have any questions!")
} 