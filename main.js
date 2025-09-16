const input = document.getElementById('input');
const audioCtx = new AudioContext();
const gainNode = audioCtx.createGain();
const oscillator= audioCtx.createOscillator();
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
}