if (process.env.ENV !== 'prod') {
	require('dotenv').config()
}
const { spawn, exec } = require('child_process');
const fs = require('fs');
const processUtils = require('./processUtils.js');

let channels = Array.from(new Array(+process.env.CHANNELS), (x, i) => i);
let folderFiles = fs.readdirSync('./raw');

folderFiles = folderFiles.filter(f => f !== 'silence.wav');

channels.forEach(c => {
	folderFiles.forEach(f => {
		processToRun = processUtils.prepareProcess(c, channels, f);
		console.log(f, c);
		exec(processToRun, (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				return;
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				return;
			}
			console.log(`stdout: ${stdout}`);
		});
		//console.log(processToRun);
	})
});

console.log('process finished');
