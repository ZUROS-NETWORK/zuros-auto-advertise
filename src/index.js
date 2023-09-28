const { spawn } = require('child_process');

const comandos = {
    proceso1: 'echo "Proceso 1"',
    proceso2: 'echo "Proceso 2"',
    proceso3: 'echo "Proceso 3"',
};

const procesos = {};

function ejecutarProcesos(comandos) {

    for (const nombreProceso in comandos) {

        const comando = comandos[nombreProceso];
        const childProcess = spawn(comando, {
            shell: true, // Habilita el uso de la shell (Bash)
        });

        procesos[nombreProceso] = childProcess; // Almacena una referencia al proceso en el objeto

        childProcess.stdout.on('data', (data) => {
            console.log(`${nombreProceso}: ${data.toString()}`);
        });

        childProcess.stderr.on('data', (data) => {
            console.error(`Error en ${nombreProceso}: ${data.toString()}`);
        });

        childProcess.on('error', (error) => {
            console.error(`Error al ejecutar ${nombreProceso}: ${error.message}`);
        });

        childProcess.on('exit', (code, signal) => {
            console.log(`${nombreProceso} finalizado con código ${code} y señal ${signal}`);
        });
    }
}
function cerrarProceso(BotName) {

    procesos[BotName].kill();
}

ejecutarProcesos(comandos);