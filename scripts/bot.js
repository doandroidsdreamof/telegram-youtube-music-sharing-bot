const http = require('http');
const fetch = require('node-fetch');
const { ALL } = require('dns');
const TelegramBot = require('node-telegram-bot-api');
const { url } = require('inspector');
require('dotenv').config();
const express = require("express");




const env = process.env.NODE_ENV || 'development';


// Your screet API keys.
const YOUTUBEKEY = process.env.YOUTUBE_KEY;
const BOTKEY = process.env.BOT_KEY;

console.log(YOUTUBEKEY)
const bot = new TelegramBot(BOTKEY, { polling: true });



bot.on('message', (msg) => {
  /* for test in this way we can check message input from users.
    const chatId = msg.chat.id;
    const message = msg.text.trim().toLowerCase();
    console.log("here =>", JSON.stringify(msg))*/
}
);


bot.on('polling_error', (error) => {
  console.log("error for bot.js => ", error.code);  // => 'EFATAL'
});


// this way we can assign bot command
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Hi there! " + msg.from.first_name);
});

const pullData = async () => {
  const channelId = 'UU7eKF0lPY8LNwfczq9UFlxg';
  try {
    //Youtube 
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${channelId}&maxResults=50&key=${YOUTUBEKEY}`);
    const lastUploads = await response.json();
    shareMusic(lastUploads)

  } catch (err) {
    console.error(err);
  }

}
const shareMusic = async (data) => {
  const title = await data.items.map(get => get.snippet.channelTitle).splice(0, 1)
  const id = await data.items.map(get => get.id).splice(0, 1)
  const videoId = await data.items.map(get => get.snippet.resourceId.videoId)
  // you can add any another youtube channel
  var url = await `https://www.youtube.com/watch?v=${videoId.splice(0, 1)}`;
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const message = msg.text.trim().toLowerCase();
    switch (message) {
      case "albüm":
        bot.sendMessage(chatId, url);
        break;
      case "son albüm":
        bot.sendMessage(chatId, url);
        break;
      case "last album":
        bot.sendMessage(chatId, url);
        break;
      case "album":
        bot.sendMessage(chatId, url);
        break;
      case "bir önceki albüm":
        bot.sendMessage(chatId, `https://www.youtube.com/watch?v=${videoId.splice(0, 1)}`)
        break;
    }
  });

}

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const message = msg.text.trim().toLowerCase();
  switch (message) {
    case "bye":
      bot.sendMessage(chatId, "Good bye " + msg.from.first_name);
      break;
    case "hi":
      bot.sendMessage(chatId, "Hi there" + " " + msg.from.first_name);
      break;
    case "good morning":
      bot.sendMessage(chatId, "Have a nice day " + msg.from.first_name);
      break;
  }


})



pullData()


