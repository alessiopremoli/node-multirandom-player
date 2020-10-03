# Node Multirandom Player
A very basic node.js multichannel player for Raspberry PI that reads and plays random audio files from a folder.

- prepareAudioFiles.js (npm run prep) uses `ffmpeg` to generate 8-channel audio files from a well named set of mono audio files
- playAudioFiles.js (npm run play) uses `aplay` to play back random files from the folder ./processed
