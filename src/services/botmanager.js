
const { spawn } = require('child_process');
const { NodeMode } = require('../config.json');
const fs = require('fs');

const RunningBots = {};
const BotList = new Map();

const commandFolders = fs.readdirSync('./src/bots');
for (const folder of commandFolders) {
    const BotStart = `${NodeMode} ./src/bots/${folder}/index.js`;
    BotList.set(folder, BotStart);
}

async function RunBots({ logs, BotList }) {
    for (const [BotName, command] of BotList.entries()) {
        const childProcess = spawn(command, {
            shell: true,
        });

        RunningBots[BotName] = childProcess;

        childProcess.stdout.on('data', (data) => {
            const message = `\n${BotName}: ${data.toString()}`;
            console.log(message);
            if (logs) {
                logs.send(message);
            }
        });

        childProcess.stderr.on('data', (data) => {
            const errorMessage = `Error en ${BotName}: ${data.toString()}`;
            console.error(errorMessage);
            if (logs) {
                logs.send(`\n:exclamation: ${errorMessage}`);
            }
        });

        childProcess.on('error', (error) => {
            const errorMessage = `Error al ejecutar ${BotName}: ${error.message}`;
            console.error(errorMessage);
            if (logs) {
                logs.send(`\n:exclamation: :warning: ${errorMessage}`);
            }
        });

        childProcess.on('exit', (code, signal) => {
            const exitMessage = `${BotName} finalizado con código ${code} y señal ${signal}`;
            console.log(exitMessage);
            if (logs) {
                logs.send(`\n:100::warning: ${exitMessage}`);
            }
        });
    }
}

async function stopBot(BotName) {

    if (RunningBots[BotName]) {
        RunningBots[BotName].kill();
        delete RunningBots[BotName];
        return `:white_check_mark:  Se detuvo el bot ${BotName}.`
    } else {
        console.error(`El bot ${BotName} no está en ejecución.`);
        return `\n:exclamation: El bot ${BotName} no está en ejecución.`
    }
}
module.exports = { RunBots, stopBot, RunningBots, BotList };

