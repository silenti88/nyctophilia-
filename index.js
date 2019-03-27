const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json")
const token = config.token;
const fs = require ("fs");
client.commands = new Discord.Collection();
let invites = {}
require("./util/eventHandler")(client,invites)



function format(word, spaces){
    // Format strings
    let formated = word
    for(i = word.length-spaces; i < spaces; i++){
        formated += " "
    }
    return formated ;
}

function LoadCmds(){
    fs.readdir("./commands", (err, files) => {
        if (err) console.log(err);
        console.log("Loading Commands:");
        console.log("===============================");
        files.forEach((f, i) => {

            //   Goes through each folder and loads all the commands.
            if(fs.lstatSync("./commands/"+f).isDirectory()){
                let directory = f
                fs.readdir("./commands/"+directory, (err, files)=>{
                    let jsfile = files.filter(f => f.split(".").pop() === "js");

                    jsfile.forEach((f, i) => {

                        // The files created are shown in the terminal
                            let props = require(`./commands/`+directory+`/${f}`);

                            dirCommands = format(directory, 7);
                            dirCommands += `| ${f}`;
                            console.log(dirCommands);

                    });
                    console.log("===============================");
                });

            }else{

                let jsfile = files.filter(f => f.split(".").pop() === "js");

                jsfile.forEach((f, i) => {

                    // The files created are shown in the terminal
                        let props = require(`./commands/${f}`); 
                        console.log(`${f} loaded!`);
                });
            }
        });
    });
}
LoadCmds()
client.login(token)