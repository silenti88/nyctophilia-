const Discord = require("discord.js")

module.exports = client => {
        // Runs when bot goes online
        console.log(`Logged in as ${client.user.username}!`)
        client.user.setActivity(`Prefix is "/" !`,{type:"PLAYING"})
}