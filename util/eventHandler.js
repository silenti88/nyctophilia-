const reqEvent = (event) => require(`../events/${event}`)

module.exports = client => {
    client.on("ready", function() {reqEvent("ready")(client)});
    client.on("reconnecting", () => reqEvent("reconnecting")(client));
    client.on("disconnect", () => reqEvent("disconnect")(client)) 
    client.on("error",() => reqEvent("error")(client))
}