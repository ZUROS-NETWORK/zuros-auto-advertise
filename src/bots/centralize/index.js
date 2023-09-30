const { Token, ChannelsId } = require('./config/config.json')
const { Client } = require('discord.js-selfbot-v13');
const client = new Client({
    checkUpdate: false,
})
const { inviter } = require('./services/inviter')
const { reply } = require('./services/reply')
client.on('ready', () => {

    console.log(`Bot ${client.user.tag} está en línea.`);
    inviter({ ChannelsId, client })
    reply({ client })

});

client.login(Token);


