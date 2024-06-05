import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import dotenv from "dotenv";

const botSender = () => {
  dotenv.config();
  const bot = new Telegraf(process.env.BOT_TOKEN);
  bot.start((ctx) => ctx.reply("Дратути!"));
  // bot.on(message("WTF"), (ctx) =>
  //   ctx.sendSticker(CAACAgUAAxkBAAEL8gNmITgFuLgVlf8vGUpuqV_0sc8dXAACkwMAAukKyAPkNw0xOZ05JjQE)
  // );
  bot.hears("стикер", (ctx) => {
    ctx.reply("Кто-то сказал стикер?");
    ctx.sendSticker("CAACAgUAAxkBAAEL8gNmITgFuLgVlf8vGUpuqV_0sc8dXAACkwMAAukKyAPkNw0xOZ05JjQE");
  });

  async function send() {
    // bot.telegram.sendMessage("-1002026632636", "test");
    // bot.telegram.sendMessage("753426251", "test");
    bot.telegram.sendMessage("-1001979618368", "test message from Iozh bot");
  }

  send();

  bot.launch().then();
};

botSender();

// bot.on("message", async (ctx) => {
//   ctx.sendMessage("Ntsn");

// });
