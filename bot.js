const config = require("./botconfig.json");
const Discord = require("discord.js");
const superagent = require("superagent")
const ytdl = require("ytdl-core")
const bot = new Discord.Client({disableEveryone: true});
const fcjson = require("./store.json")
const tzjson = require("./tz.json")
const fs = require("fs")

bot.on("ready", async () => {
  console.log(`${bot.user.username} | Logged in`);
  let activity = [`,help | fixing the music bugs (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧`, ",help | CRABRAVE"];
  let result = Math.floor((Math.random() * activity.length));
  bot.user.setActivity(activity[result]);

  bot.on("error", (e) => console.error(e));
  bot.on("warn", (e) => console.warn(e));
  //bot.on("debug", (e) => console.info(e));
});

bot.on("message", async message => {
  if(message.author.bot) return;


if(!fcjson[message.author.id]){
  fcjson[message.author.id] = {
    fc: "FC-0000-0000-0000"
 }
}
if(!tzjson[message.author.id]){
  tzjson[message.author.id] = {
    tz: "Not Set"
 }
}

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

//-------------------------------------------------------------------------------------------------------------------Image Commands

  if(cmd === `${prefix}doggo`){

    let {body} = await superagent
    .get('https://random.dog/woof.json?filter=mp4,webm')

    let dogembed = new Discord.RichEmbed()
    .setColor("config.red")
    .addField(`Doggo 🐶`, `Requested by ${message.author.username} ^-^`)
    .setImage(body.url);


    message.channel.send(dogembed);
    console.log("Doggo Generated")


  }


  if(cmd === `${prefix}cat`){

    let {body} = await superagent
    .get('http:\/\/aws.random.cat\/meow')

    let cdogembed = new Discord.RichEmbed()

.addField(`Cat 🐱`, `Requested by ${message.author.username} ^-^`)
.setColor("config.red")
.setImage(body.file);

    message.channel.send(cdogembed);
    console.log("Cat Generated")


  } else
  if(cmd === `${prefix}clean`){

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
  if(!args[0]) return message.channel.send("no");
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Cleaned ${args[0]} messages.`).then(msg => msg.delete(5000));
 })
}
  if(cmd === `${prefix}profile`){

      let icon = message.author.avatarURL;
      if(!fcjson[message.author.id]){
        fcjson[message.user.id] = {
            fc: "FC-0000-0000-0000"
        }
    }

    if(!tzjson[message.author.id]){
      tzjson[message.user.id] = {
          tz: "Not Set"
          }
      }
      let pembed = new Discord.RichEmbed()
      .setDescription(`${message.author.username}'s profile`)
      .setColor(config.green)
      .setThumbnail(icon)
      .addField("Timezone", tzjson[message.author.id].tz)
      .addField("Switch Friendcode", fcjson[message.author.id].fc)
      .addField("Joined This Server", message.member.joinedAt)

      message.channel.send(pembed);


  }

if(cmd === `${prefix}fc`){

  let icon = message.author.avatarURL;
  if(!fcjson[message.author.id]){
    fcjson[message.user.id] = {
        fc: "FC-0000-0000-0000"
    }
}

if(!tzjson[message.author.id]){
  tzjson[message.user.id] = {
      tz: "Not Set"
      }
  }
  let pembed = new Discord.RichEmbed()
  .setColor(config.green)
  .setThumbnail(icon)
  .addField("Timezone", tzjson[message.author.id].tz)
  .addField("Switch Friendcode", fcjson[message.author.id].fc)

  message.channel.send(pembed);

}

if(cmd === `${prefix}setfc`){
message.delete()
let args = message.content.slice(prefix.length).trim().split(' ');
let command = args.shift().toLowerCase();
      let fcthing = args.join(' ');
if(!args[0]) return message.reply("You can't leave an empty field!")
fcjson[message.author.id] = {
                   fc: fcthing}
                   fs.writeFile("./store.json", JSON.stringify(fcjson), (err) => {
                               if (err) console.log(err)
                           })
}

if(cmd === `${prefix}settz`){
  mesage.delete()
  let args = message.content.slice(prefix.length).trim().split(' ');
  let command = args.shift().toLowerCase();
        let fcthing = args.join(' ');
  if(!args[0]) return message.reply("You can't leave an empty field!")
   tzjson[message.author.id] = {
                     tz: fcthing}
                     fs.writeFile("./tz.json", JSON.stringify(tzjson), (err) => {
                                 if (err) console.log(err)
                             })
}

if(cmd === `${prefix}guilds`){
        if(message.author.id === "229192101387173888") {
            let guildembed = new Discord.RichEmbed()
            .addField("Guilds", `${bot.guilds.map(g => g.name).join("\n")}`)
            .setFooter(`Requested by ${message.author.tag}!`, message.author.displayAvatarURL);
            message.channel.send(await(guildembed));
        }return
    }




//-----------------------------------------------------------------------------------------------------Fun Commands

  if(cmd === `${prefix}8ball`){

    if(!args[0]) message.reply("Please provide a question...");
    if(!args[0]) return
    let replies = ["Yes.", "No.", "Possibly...","..." , "I don't know..."];

    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(0).join(" ");

    let ballembed = new Discord.RichEmbed()
    .setTitle("Result")
    .setColor("#58efe0")
    .addField("Question", question)
    .addField("Answer", replies[result]);

    message.channel.send(ballembed)
    console.log(replies[result]);



  } else

  if(cmd === `${prefix}crab`){
message.delete()
  message.channel.send(await("<a:crab1:554342218069049364> <a:crab2:554342218421239819> <a:crab3:554342220258476042> <a:crab4:554342228731101204> <a:crab5:554342229813100577>\n<a:crab6:554342220208013354> <a:crab7:554342228932427776> <a:crab8:554342229649522688> <a:crab9:554342229762637839> <a:crab10:554342229905375271>\n<a:crab11:554342229162852372> <a:crab12:554342229313978384> <a:crab13:554342229410447362> <a:crab14:554342229418835989> <a:crab15:554342229712306206>\n<a:crab16:554342230069084170> <a:crab17:554342229439938562> <a:crab18:554342231008608266> <a:crab19:554342230018490408> <a:crab20:554342230857351211>\n<a:crab21:554342230157033473> <a:crab22:554342230400303139> <a:crab23:554342230194651156> <a:crab24:554342231323181056> <a:crab25:554342230161227788>"))
}



  if(cmd === `${prefix}coinflip`){

    let coinflipembed = new Discord.RichEmbed()
    .setColor("#15f153")
     .setThumbnail("https://zippy.gfycat.com/ImmaterialCandidBooby.gif")
    .addField("Result", `**${Math.floor(Math.random() * 2) == 0 ? "Heads" : "Tails"}**`);

      message.channel.send(coinflipembed)

  } else

  if(cmd === `${prefix}say`){

    if(!args[0]) return message.delete()
    const sayMessage = args.join(" ");
console.log(args.join(" "));
    message.delete().catch(O_o=>{});
    message.channel.send(sayMessage);


  }

  if(cmd === `${prefix}play`) {
        ;
   if (!message.member.voiceChannel) return message.channel.send("What's the point? You are not in a voice channel.");
    //  if (message.guild.me.voiceChannel) return message.channel.send("Someone else is using this bot!");
      if (!args[0]) return message.channel.send("Sorry but I'm gonna need a url for that.");

      let validate = await ytdl.validateURL(args[0]);

      if (!validate) return message.channel.send('404 URL not found?');

      let info = await ytdl.getInfo(args[0]);

      let connection = await message.member.voiceChannel.join();
      let dispatcher = await connection.playStream(ytdl(args[0], {
          filter: 'audioonly',
          highWaterMark: 1<<50
      }));

      let playembed = new Discord.RichEmbed()
      .setTitle("Now playing")
      .setDescription(`${info.title}`)
      .setImage(info.thumbnail_url.replace("default.jpg", "hqdefault.jpg"))

      message.channel.send(playembed);

   //  new Promise((_, reject) => reject(new Error('woops'))).
  // Prints "caught woops"
// catch(error => { console.log('caught', error.message); });

    }

    if(cmd === `${prefix}stop`){
        if(message.member.voiceChannel){
            if(message.guild.voiceConnection){
            message.member.voiceChannel.leave()
            message.reply("Disconnected!")
            .then(m => m.delete(5000));
            } else return message.reply("...? Not playing anything!")
            .then(m => m.delete(5000));
        }
        else {
            message.reply("I'm not even in your VC!")
            .then(m => m.delete(5000));
        }

  } else //----------------------------------------------------------------------------------------------------Other

  if(cmd === `${prefix}help`){

    const embed = new Discord.RichEmbed()
                .setTitle("Help <:JellyBlobIcon:554068185935249420>")
                .setAuthor("", "")
                .setColor("#58efe0")
                .setDescription("")
                .setFooter("Ver 1.2", "")
                .setImage("")
                .setThumbnail("https://cdn.discordapp.com/avatars/475977377680457738/e65add1ac1d55525ffd31b90642fd6c7.webp?size=2048")
                .setTimestamp()
                .addField("Fun", "\n,Say | Force the bot to say anything.\n,Coinflip | Flip a coin!\n,Doggo | dogs!\n,Cat | cats!\n,8ball | Get a random answer to a random question!\n ,crab | \n MY JELLYFISH \n ------------------ \n HAS A COLD")
                .addField("Responses", "\nuwu, owo, TwT or ping \n(must start with , [to prevent the bot replying too much])\n")
                .addField("Utility", "\n,pfp | This will get your profile picture.\n ,profile | Shows a user's profile \n ,fc | Short Profile")
                  .addField("Music |BETA|", "\n,play | Submit a URL and the bot will play it in the VC.\n ,stop |Stop the current music")



                message.channel.send({embed});

  } else

  if(cmd === `${prefix}ping`){

    const m = await message.channel.send("Ping!");
    m.edit(`Pong!  ${m.createdTimestamp - message.createdTimestamp}ms.`);


  } else

              if(cmd === `${prefix}pfp`){

                const embed = new Discord.RichEmbed()
                            .setTitle(`${message.author.username}'s Avatar`)
                            .setColor("#58efe0")
                            .setImage(message.author.avatarURL)




                            message.channel.send({embed});

              } else
                            if(cmd === `${prefix}plans`){
const embed = new Discord.RichEmbed()
.setColor("#58efe0")
.addField("Next Changes","Making fallbacks to embeds in case the bot lacks✓")
.addField("Later","Making a JSON database to store information like game stats etc. \n Purge command \n more picture commands (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧")

message.channel.send({embed});
                            }
                                if(cmd === `${prefix}leaveserver`){
                                  message.delete()
                                if(message.author.id !=='229192101387173888')
                                    return message.channel.send(`**»** ${message.author}, you don't have permission to do that!`);
                            message.guild.leave();

                          }
if(cmd === `${prefix}guildnumber`){
  message.channel.send(`${bot.guilds.size}`)
                        }

              if(cmd === `${prefix}050831|activity`){
                message.delete()
                if(!args[0]) return message.delete()
                        let entry = args.slice(0).join(" ");

                        bot.user.setActivity(entry);
                        message.channel.send("Activity Changed!")

}

if(cmd === `${prefix}terminateprocess`){
bot.destroy()



              } //---------------------------------------------------------------------------------------------------------------verify
              if(cmd === `${prefix}activity`){
                message.reply("Please enter the code before the command: \n EXAMPLE: ,??????|activity")
} else //---------------------------------------------------------------------------------------------Responses
if(message.content.startsWith("ping")) {
  message.channel.send("pong");
} else

if(cmd === `uwu`){
  if(args[0]) return;
 message.channel.send(await("uwu"))         .then(m => m.delete(30000));
    console.log("uwu");

  } else
  if(message.content.startsWith(",owo")) {
    message.channel.send("owo");
} else
if(message.content.startsWith(",TwT")) {
  message.channel.send("TwT");
}

                        });


bot.login(config.token);
