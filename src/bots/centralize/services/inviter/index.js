let minutes;
let msgCount = MinMsgSend[1];
const { advertising } = require('../../config/messages.json')
const { ChannelsId, TimeToSendMsg, MinMsgSend } = require('../../config/config.json');
async function inviter({ client }) {
    const channelJava = await client.channels.cache.get(ChannelsId[0])
    const channelBedrock = await client.channels.cache.get(ChannelsId[1])
    client.on('message', async message => {



        if (message.channel.id !== channelJava.id) return;
        if (message.author.id == client.user.id) return;
        if (msgCount) {
            msgCount--
            console.log(`${msgCount}`)
        }


        if (minutes || msgCount) return

        msgCount = randomNum(MinMsgSend[1], MinMsgSend[2])
        minutes = 2
        await message.channel.sendTyping();

        await new Promise(resolve => setTimeout(resolve, 9000));
        await channelJava.send(await advertising[randomNum(0, advertising.length - 1)])

        timer(randomNum(TimeToSendMsg[1], TimeToSendMsg[2]))
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