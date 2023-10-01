const fs = require('fs');
const path = require('path');
const { Private } = require('../../config/messages.json');
const { TypingSec } = require('../../config/config.json');
const userIDsFilePath = path.join(__dirname, '../../config/userIDs.json');

let userIDs = [];
try {
    userIDs = require(userIDsFilePath);
} catch (error) {
    fs.writeFileSync(userIDsFilePath, '[]', 'utf-8');
}

async function reply({ client }) {

    client.on('message', async message => {
        try {
        if (message.channel.type === 'DM' && !userIDs.includes(message.author.id)) {
            console.log('Mensaje enviado al DM:', message.content);
            userIDs.push(message.author.id);
            fs.writeFileSync(userIDsFilePath, JSON.stringify(userIDs), 'utf-8');
            await new Promise(resolve => setTimeout(resolve, 60000));
            await message.channel.sendTyping();
            await new Promise(resolve => setTimeout(resolve, TypingSec));
            await message.reply(await Private[randomNum(0, Private.length - 1)]);

            }
        } catch (error) {
            console.error('Error en la función reply:', error);
        }
    });

}


function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = { reply };
