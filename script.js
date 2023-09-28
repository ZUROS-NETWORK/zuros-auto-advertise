function getRandomMessage() {
    const messages = [
        'Hello, world!',
        'Node.js is awesome!',
        'Random message here!',
        'Coding is fun!',
        'OpenAI is cool!',
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
}

function printRandomMessages() {
    const endTime = Date.now() + 60 * 1000; // Ejecutar durante 1 minuto (60 segundos * 1000 ms/segundo)

    function printMessage() {
        if (Date.now() < endTime) {
            const message = getRandomMessage();
            console.log(message);
            setTimeout(printMessage, 1000); // Esperar 1 segundo antes de imprimir el siguiente mensaje
        } else {
            console.log('Fin del script.');
        }
    }

    printMessage();
}

printRandomMessages();
