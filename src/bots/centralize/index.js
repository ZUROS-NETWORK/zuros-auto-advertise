const { Token, ChannelsId } = require('./config/config.json');
const { Client } = require('discord.js-selfbot-v13');
const client = new Client({
    checkUpdate: false,
});
const { inviter } = require('./services/inviter');
const { reply } = require('./services/reply');

function tryInviter() {
    const retryFn = () => {
        try {
            inviter({ ChannelsId, client });
        } catch (error) {
            console.error('Error en la función inviter:', error);

            console.log(`Reintentando en 30 segundos...`);
            setTimeout(retryFn, 30000);
        }
    };
    retryFn();
}
function tryReply() {
    const retryFn = () => {
        try {
            reply({ client });
        } catch (error) {
            console.error('Error en la función reply:', error);
            console.log(`Error en la función reply Reintentando en 30 segundos...`);
            setTimeout(retryFn, 30000);
        }
    };
    retryFn();
}


client.on('ready', () => {
    console.log(`Bot ${client.user.tag} está en línea.`);
    tryInviter();
    tryReply();
});

client.on('disconnect', (event) => {
    console.error('El bot se ha desconectado de Internet:', event);
    setTimeout(() => {
        console.log('Intentando reconectar...');
        client.login(Token).catch(error => {
            console.error('Error al intentar reconectar:', error);
        });
    }, 30000);
});

client.login(Token)
    .catch(error => {
        console.error('Error al iniciar sesión:', error);
    });