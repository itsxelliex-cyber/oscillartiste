var amplitude = 40;
var interval = null;
const input = document.getElementById('input');
const audioCtx = new AudioContext();
const gainNode = audioCtx.createGain();
const oscillator= audioCtx.createOscillator();
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = ctx.canvas.width;
var height = ctx.canvas.height;
oscillator.start();
gainNode.gain.value = 0;
audioCtx.resume();
gainNode.gain.value = 0;
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);
oscillator.type = "sine";
notenames = new Map();
notenames.set("C",261.6);
notenames.set("D",293.7);
notenames.set("E",329.6);
notenames.set("F",349.2);
notenames.set("G",392.0);
notenames.set("A",440.0);
notenames.set("B",493.9);


function frequency(pitch) {
    freq = pitch / 10000;
gainNode.gain.setValueAtTime(0.8,audioCtx.currentTime);
oscillator.frequency.setValueAtTime(pitch,audioCtx.currentTime);
gainNode.gain.setValueAtTime(0,audioCtx.currentTime + 1);

}
function handle() {
    var usernotes = String(input.value);
        var usernotes = String(input.value).toUpperCase();
        var freq = notenames.get(usernotes);
        if (freq) {
            frequency(freq);
        }

        drawWave();
}
var counter = 0;
function drawWave() {
    ctx.clearRect(0, 0, width, height);
    x = 0;
    y = height / 2;
    ctx.moveTo(x, y);
    ctx.beginPath();
    counter = 0;
    interval = setInterval(line, 20);
    if (counter > 50) {
        clearInterval(interval);
    }
}
function line() {
    y = height / 2 + (amplitude * Math.sin(x * 2 *
         Math.PI * freq));
    ctx.lineTo(x, y);
    ctx.stroke();
    x = x + 1;
    //increase counter by 1 to show how long interval has been run
    counter++;
}

