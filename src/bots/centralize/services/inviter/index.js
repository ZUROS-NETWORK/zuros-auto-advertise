const { advertising } = require('../../config/messages.json')
const { ChannelsId, TimeToSendMsg, MinMsgSend, TypingSec } = require('../../config/config.json');

let msgCount = MinMsgSend.min;
let minutes;

async function inviter({ client }) {
    client.on('message', async message => {
        try {
            if (!ChannelsId.includes(message.channel.id)) return;
            if (message.author.id == client.user.id) return;
            if (msgCount) {
                msgCount--
            }
            console.log(
                `Mensajes retantes ${msgCount}\n` +
                `Minutos retantes ${minutes}`)
            if (minutes || msgCount) return
            msgCount = 8
            minutes = 2
            await message.channel.sendTyping();
            await new Promise(resolve => setTimeout(resolve, TypingSec));
            await message.channel.send(advertising[randomNum(0, advertising.length - 1)])
            msgCount = randomNum(MinMsgSend.min, MinMsgSend.max)
            timer(randomNum(TimeToSendMsg.min, TimeToSendMsg.max))
        } catch (error) {
            console.error('Error en la función inviter:', error);
        }
    });

}
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function timer(time) {
    const intervalSec = 1000;
    const defaultSec = randomNum(47, 60);
    minutes = time;
    let seconds = defaultSec;
    const interval = setInterval(function () {
        if (!minutes) {
            clearInterval(interval);
        }
        seconds--;
        if (seconds == -1) {
            seconds = defaultSec;
            minutes--;
            console.log("Min " + minutes);

        }

    }, intervalSec);
}

module.exports = { inviter }
