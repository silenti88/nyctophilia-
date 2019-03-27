const Discord = require("discord.js"); 
const config =  require("../config.json")
const fs = require("fs");
let invite = " "

module.exports = async (client,member,invites) => {
    let lockdown = config.lockdown[member.guild.id]
    const existing = invites[member.guild.id]
    //let reason = " nothing"

    if(lockdown){
        const message = new Discord.RichEmbed()
        .setTitle("You have been kicked!")
        .setDescription("This server is currently under lockdown due to raids, you will recieve a DM with the invite once the raid is over.")
        .setFooter(client.user.username,client.user.avatarURL)
        .setColor(0x48cc92)
        await member.send(message)
        await member.kick().catch(console.error);

        fs.writeFile("../config.json", JSON.stringify(config), (err)=>{
            console.log(err)
        });
    }

    if(!member.guild.me.hasPermission("MANAGE_GUILD")) return
    
    const date = new Date()
    const RegisteredDate = new Date(member.user.createdTimestamp)
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October", //This server is currently under lockdown due to raids, you will recieve a DM with the invite once the raid is over.
        "November", "December"
    ]
    let joinedDay = date.getDate()
    let joinedMonth = date.getMonth()
    let joinedYear = date.getFullYear()
    let registeredDay = RegisteredDate.getDate()
    let registeredMonth = RegisteredDate.getMonth()
    let registeredYear = RegisteredDate.getFullYear()

    let defaultC = ""
    //let myId = member.guild.members.get("316671807052578827");
    if(member.guild.id === "514333379483664394"){
        defaultC = member.guild.channels.get("535987916678103041");//
    }else{
        defaultC = member.guild.systemChannel
    }

    let collectInvites = async () => {
        await member.guild.fetchInvites()
        .then(guildInvites => {
                invites[member.guild.id] = guildInvites;
                if(existing.get(invites[member.guild.id].code)){
                    invite = guildInvites.find(i => existing.get(i.code).uses < i.uses);
                }else{
                    invite = guildInvites.find(i=> i.createdTimestamp >= ( Date.now()/1000))
                }
        })
    }
    await collectInvites();
    const inviter = client.users.get(invite.inviter.id)
    defaultC.send(`**User info**\n✅ __Joined At:__ ${monthNames[joinedMonth]} `+joinedDay+`, ${joinedYear}\n✅ __Registered:__ ${monthNames[registeredMonth]} `+registeredDay+`, ${registeredYear}\nInvited by: ${inviter.tag}`)
    .catch(console.error())
   

    
} 