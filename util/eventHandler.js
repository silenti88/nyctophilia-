const reqEvent = (event) => require(`../events/${event}`)



module.exports = (client,invites) => {
    /**
     * Neat way of running the events that are triggered 
    */
    client.on("ready", async function() {reqEvent("ready")(client,invites)});
    client.on("reconnecting", async () => reqEvent("reconnecting")(client));
    client.on("disconnect", async () => reqEvent("disconnect")(client));
    client.on("error",async () => reqEvent("error")(client));
    client.on("message", async message => reqEvent("message")(client,message,invites));
    client.on("guildMemberAdd", async member => reqEvent("guildMemberAdd")(client,member,invites));
    client.on("guildCreate", async guild => reqEvent("guildCreate")(guild))

}