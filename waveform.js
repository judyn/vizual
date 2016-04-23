var osc, fft;
var song;
analyzer = new p5.Amplitude();
analyzer.setInput(song);
fft = new p5.FFT();
var rms = analyzer.getLevel();

function preload() {
	song = loadSound('Chrome Sparks - All There Is (Feat. Steffaloo).mp3');
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	osc = new p5.SinOsc(); // set frequency and type
	osc.amp(.5);
	analyzer = new p5.Amplitude();
	analyzer.setInput(song);
	fft = new p5.FFT();
	var rms = analyzer.getLevel();
}

function mousePressed() {
	if (song.isPlaying()) { // .isPlaying() returns a boolean
		song.pause();


	} else {
		song.play(); // playback will resume from the pause position
	}

}

function draw() {
	background(255);

	var waveform = fft.waveform(); // analyze the waveform
	beginShape();
	strokeWeight(2);
	for (var i = 0; i < waveform.length; i++) {
		var x = map(i, 0, waveform.length, 0, width);
		var y = map(waveform[i], -1, 1, height, 0);
		vertex(x, y);
	}
	endShape();

	// change oscillator frequency based on mouseX
	var freq = map(rms, 0, width, 40, 500);
	osc.freq(freq);

	var amp = map(rms, 0, height, 1, .01);
	osc.amp(amp);
}