const input = document.getElementById('input');
const audioCtx = newAudioContent();
const gainNode = audioCtx.createGain();
const oscillator = audioCtx.createOscillator();
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);
oscillator.type = "sine";
function frequency(pitch) {

}
function handle() {
    frequency(input.value);
}