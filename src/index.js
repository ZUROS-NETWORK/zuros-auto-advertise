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

client.once(Events.ClientReady, async (c) => {
    try {
        console.log(`El bot ${c.user.tag} se ha reiniciado.`);
        const logs = client.channels.cache.get(LogChannelId);
        logs.send('# :warning:  El bot se ha reiniciado.');
        await RunBots({ logs, BotList });
    } catch (error) {
        console.error('Error al reiniciar el bot:', error);
        const logs = client.channels.cache.get(LogChannelId);
        logs.send('# :warning:Error al reiniciar el bot:', error);
        await RunBots({ logs, BotList });
    }
});

client.on('messageCreate', async (msg) => {
    try {
        const CommandChannel = client.channels.cache.get(CommandChannelId);
        if (!CommandChannel) {
            console.error('No se pudo encontrar el canal de comandos (CommandChannelId)');
            return;
        }
        const args = msg.content.split(' ');
        const command = args[0].toLowerCase();
        const botName = args.slice(1).join(' ');

        if (msg.author.bot) return;
        if (command == 'stop') {
            msg.reply(await stopBot(botName));
        }
        if (command == 'start') {
            // SUS
        }
        if (command == 'list') {
            let list = '>>> ##  Lista de bots:\n';
            BotList.forEach((bot) => {
                list += `- **${bot}**\n`;
            });
            msg.reply(list);
        }
    } catch (error) {
        console.error('Error al procesar un mensaje:', error);
    }
});

client.login(BotAdminToken)
    .catch(error => {
        console.error('Error al iniciar sesión del bot:', error);
    });
