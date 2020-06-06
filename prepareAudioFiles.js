if (process.env.ENV !== 'prod') {
    require('dotenv').config()
}

const { spawn, exec } = require('child_process');
const fs = require('fs');
const processUtils = require('./processUtils.js')

// const ls = exec('ls -l', function (error, stdout, stderr) {
//   if (error) {
//     console.log(error.stack);
//     console.log('Error code: '+error.code);
//     console.log('Signal received: '+error.signal);
//   }
//   console.log('Child Process STDOUT: '+stdout);
//   console.log('Child Process STDERR: '+stderr);
// });

// ls.on('exit', function (code) {
//   console.log('Child process exited with exit code '+code);
// });

let channels = Array.from(new Array(+process.env.CHANNELS), (x, i) => i);
let folderFiles = fs.readdirSync('./raw');

folderFiles = folderFiles.filter(f => f !== 'silence.wav');

channels.forEach(c => {
    folderFiles.forEach(f => {
        processToRun = processUtils.prepareProcess(c, channels, f);
	console.log(f, c);
        exec(processToRun,(error, stdout, stderr) => {
		if (error) {
        		console.log(`error: ${error.message}`);
		        return;
		 }
		if (stderr) {
	        	console.log(`stderr: ${stderr}`);
		        return;
		 }
		 console.log(`stdout: ${stdout}`);
	} );
	//console.log(processToRun);
    })
});

console.log('process finished');
