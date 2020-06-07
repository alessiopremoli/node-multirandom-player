if (process.env.ENV !== 'prod') {
    require('dotenv').config()
}
const { spawn, exec } = require('child_process');

const baseUrl = './processed'
const MIN_VALUE = 1;
const MAX_VALUE = 100;

let channels = Array.from(new Array(+process.env.CHANNELS), (x, i) => i);

const launchCommand = c => {
    let commandToLaunch = command(c);
    
    console.log(`CHANNEL ${c} - ${commandToLaunch}`);

    exec(commandToLaunch, (e, stdout, stderr) => {
        if (e instanceof Error) {
            console.error(e);
            throw e;
        }
        stderr && console.err('stderr ', stderr);

        launchCommand(c);
    });
}

const command = c => {
    let audioFile = `${baseUrl}/${c}/${Math.floor(Math.random() * MAX_VALUE) + MIN_VALUE}.wav && sleep ${Math.floor(Math.random() * 7)}`;
    return `echo ${audioFile}`;
}

channels.forEach(c => launchCommand(c));