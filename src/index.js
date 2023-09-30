const { BotAdminToken, LogChannelId, CommandChannelId } = require('./config.json');

const { Client, Events, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});
const { RunBots, stopBot, RunningBots, BotList } = require('./services/botmanager');
client.once(Events.ClientReady, c => {
    console.log(`El bot ${c.user.tag} se ha reiniciado.`);
    const logs = client.channels.cache.get(LogChannelId)
    logs.send('# :warning:  El bot se ha reiniciado.')
    RunBots({ logs, BotList });

});
client.on('messageCreate', async (msg) => {
    const CommandChannel = client.channels.cache.get(CommandChannelId)
    const args = msg.content.split(' ');
    const command = args[0].toLowerCase()
    const botName = args.slice(1).join(' ');

    if (msg.author.bot) return;
    if (!CommandChannel) return;
    if (command == 'stop') {
        msg.reply(await stopBot(botName))

    }
    if (command == 'start') {

    }

    if (command == 'list') {
        let lsit = '>>> ##  Lista de bots:\n';
        BotList.forEach(bot => {
            lsit += `- **${bot}**\n`;
        });
        msg.reply(lsit)
    }


});

client.login(BotAdminToken);
