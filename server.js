const http = require("http");
const express = require("express");
const app = express();

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const Discord = require("discord.js");
const { prefix } = require("./config.json");
const token = process.env.TOKEN;

const client = new Discord.Client();

client.once("ready", () => {
  console.log("Ready!");
  client.user.setPresence({
    status: "online",
    activity: {
      name: 'use "sans help" for help',
      type: "PLAYING"
    }
  });
});

client.login(token);

client.on("message", async message => {
  if (message.content.startsWith(prefix)) {
    console.log("command sent");
    // do something

    if (
      message.member.voice.channel &&
      message.content.toLowerCase().contains("play")
    ) {
      var connection = await message.member.voice.channel.join();

      var dispatcher = connection.play("audio.mp3");

      dispatcher.on("start", () => {
        console.log("audio is now playing!");
        connection.play(
          "https://cdn.glitch.com/dbb9f570-9735-4542-ac26-1069d41fa06a%2FLive%20and%20Learn%20bass%20boosted.mp3?v=1586489175629",
          { volume: 0.5 }
        );
      });

      dispatcher.on("finish", () => {
        console.log("audio has finished playing!");
      });

      dispatcher.on("error", console.error);
    }

    if (message.content.toLowerCase().includes("leave")) {
      dispatcher.destroy();
      connection.disconnect();
    }
  }

  if (message.content.toLowerCase().includes("sans car")) {
    const sanscar = new Discord.MessageAttachment(
      "https://cdn.glitch.com/dbb9f570-9735-4542-ac26-1069d41fa06a%2Fsanscar.jpg?v=1584324797279"
    );

    message.channel.send(sanscar);
  }

  if (
    message.content.toLowerCase().includes("bring me the girl") ||
    message.content.toLowerCase().includes("kylo ren")
  ) {
    const bringMeTheGirl = new Discord.MessageAttachment(
      "https://cdn.glitch.com/dbb9f570-9735-4542-ac26-1069d41fa06a%2Fbring%20me%20the%20girl.jpg?v=1584327058499"
    );

    message.channel.send(bringMeTheGirl);
  }
});
