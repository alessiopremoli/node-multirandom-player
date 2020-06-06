const prepareProcess = (channel, channels, fileName) => {

    let fileString = '';
    let channelString = '"[0:a][1:a][2:a][3:a][4:a][5:a][6:a][7:a]amerge=inputs=8[aout]"';

    channels.forEach(c => {
        fileString += `-i raw/${channel === c ? fileName : 'silence.wav'} `;
    });

    return `ffmpeg ${fileString}-filter_complex ${channelString} -map "[aout]" processed/${channel}/$${fileName}`
}

module.exports = {
    prepareProcess
}


// ffmpeg -i theList_Louder_1.wav -i theList_Louder_2.wav -i theList_Louder_3.wav -i theList_Louder_4.wav -filter_complex "[0:a][1:a][2:a][3:a]amerge=inputs=4[aout]" -map "[aout]" theList_Loud.wav

