

const input = document.getElementById('input');

const recording_toggle = 
document.getElementById('record');

var timepernote = 0;
var length = 0;

var amplitude = 40;
var interval = null;
var reset = false;
const audioCtx = new AudioContext();
const gainNode = audioCtx.createGain();

// oscillator definitions
const oscillator= audioCtx.createOscillator();
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);
oscillator.type = "sine";

// canvas variables
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = ctx.canvas.width;
var height = ctx.canvas.height;

oscillator.start();
gainNode.gain.value = 0;
audioCtx.resume();
gainNode.gain.value = 0;


notenames = new Map();
notenames.set("C",261.6);
notenames.set("D",293.7);
notenames.set("E",329.6);
notenames.set("F",349.2);
notenames.set("G",392.0);
notenames.set("A",440.0);
notenames.set("B",493.9);

const color_picker = document.getElementById('color');
const vol_slider = document.getElementById('vol-slider');
const thickness_slider = document.getElementById('thickness-slider');

const root = document.documentElement;


function frequency(pitch) {
    freq = pitch / 10000;
gainNode.gain.setValueAtTime((vol_slider.value/100)*40,audioCtx.currentTime);
setting = setInterval(() => {gainNode.gain.value = (vol_slider.value/100)*40}, 1);
oscillator.frequency.setValueAtTime(pitch,audioCtx.currentTime);
setTimeout(() => { clearInterval(setting); gainNode.gain.value = 0; }, ((timepernote)-10));
}


function handle() {
    reset = true;
    var usernotes = String(input.value).toUpperCase();
    length = usernotes.length;
    timepernote = (6000 / length);
    var noteslist = [];

        for (i = 0; i < usernotes.length; i++) {
            noteslist.push(notenames.get(usernotes.charAt(i)));
        }
       let j = 0;
       repeat = setInterval(() => {
        if (j < noteslist.length) {
            frequency(parseInt(noteslist[j]));
            drawWave();
        j++
        } else {
            clearInterval(repeat)
        }
    }, timepernote);
}

var counter = 0;
function drawWave(freq) {
    clearInterval(interval);
    if (reset) {
    ctx.clearRect(0, 0, width, height);
    x = 0;
    y = height / 2;
    ctx.moveTo(x, y);
    ctx.beginPath();
    }
    counter = 0;
    interval = setInterval(line, 20);
    reset = false;
    }

   
function line() {
    y = height / 2 + vol_slider.value * Math.sin(x * ((2 *
         Math.PI * freq * thickness_slider.value * (0.5 * length))));
    ctx.strokeStyle = color_picker.value;
    ctx.thicknessStyle = thickness_slider.value;
    ctx.lineTo(x, y);
    ctx.stroke();
    x = x + 1;
    //increase counter by 1 to show how long interval has been run
    counter++;

    if(counter > (timepernote/20)) {
        clearInterval(interval);
    }
}

//js media recording api
var blob, recorder = null;
var chunks =[];
function startRecording() {
   
    const canvasStream = canvas.captureStream(20);
    const audioDestination = audioCtx.createMediaStreamDestination(); 
    gainNode.connect(audioDestination);

    const combinedStream = new MediaStream();
    chunks = [];

    canvasStream.getVideoTracks().forEach(track => combinedStream.addTrack(track));

    audioDestination.stream.getAudioTracks().forEach(track => combinedStream.addTrack(track));

    recorder = new MediaRecorder(combinedStream, { mimeType: 'video/webm' });
    recorder.ondataavailable = e => {
 if (e.data.size > 0) {
   chunks.push(e.data);
 };

recorder.onstop = () => {
   const blob = new Blob(chunks, { type: 'video/webm' });
   const url = URL.createObjectURL(blob);
   const a = document.createElement('a');
   a.href = url;
   a.download = 'recording.webm';
   a.click();
   URL.revokeObjectURL(url);
};
recorder.start();

    }

var is_recording = false;
function toggle() {
    is_recording = !is_recording;
    if(is_recording) {
        recording_toggle.innerHTML = "Stop recording";
        startRecording();
    } else {
        recording_toggle.innerHTML = "Start recording";
        recorder.stop();
    }
}



    }


