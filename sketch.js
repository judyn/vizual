var song;
var v1 = 0;
var v2 = 0;
var v3 = 0;
var vizType = 0;
analyzer = new p5.Amplitude();
analyzer.setInput(song);
fft = new p5.FFT();
var rms = analyzer.getLevel();
var osc;
var spectrum = fft.analyze();
var bgColor = 255;
var slider;
var rSlider, gSlider, bSlider;
var r = rSlider.value();
var g = gSlider.value();
var b = bSlider.value();

function preload() {
	song = loadSound('Chrome Sparks - All There Is (Feat. Steffaloo).mp3');
}

var canvas;

function setup() {
	background(bgColor);
	canvas = createCanvas(windowWidth - 20, windowHeight - 20);
	canvas.parent('easel');


	colorMode(HSB, 100);
	frameRate(60);

	//analyzer bars
	analyzer = new p5.Amplitude();
	analyzer.setInput(song);
	fft = new p5.FFT();

	//waveform oscillator
	osc = new p5.SinOsc(); // set frequency and type
	osc.amp(.5);
	smooth();

	rSlider = createSlider(0, 255, 100);
	rSlider.position(windowWidth / 2 +50, 20);
	gSlider = createSlider(0, 255, 0);
	gSlider.position(windowWidth / 2 + 50, 50);
	bSlider = createSlider(0, 255, 255);
	bSlider.position(windowWidth / 2 + 50, 80);
	

}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function mediaControls() {

	var playBtn = document.getElementById("btn-play");

	playBtn.onclick = function () {
		if (song.isPlaying()) {
			song.pause();
			$(".media-controls").removeClass("active");

		} else {

			song.play();
			$(".media-controls").addClass("active");

		}

	}
}

function analyzerBars() {

	var spectrum = fft.analyze();
	var rms = analyzer.getLevel();

	for (var i = 0; i < spectrum.length / 20; i++) {
		fill(spectrum[rms] / 2, spectrum[rms] / 10, 0);
		var x = map(i, 0, spectrum.length / 25, 0, width);
		var h = map(spectrum[i], 0, 255, 0, height / 2);
		rect(x, height, spectrum.length / 25, -h);

	}
	fill(spectrum);
	noStroke();


}

function draw() {

	if (vizType == 0) {
		background(bgColor);
		analyzerBars();
	} else if (vizType == 1) {
		background(bgColor);
		waveFormCanvas();
	} else if (vizType == 2) {
		background(bgColor);
		circleCanvas();
	} else if (vizType == 3) {
		colorBoard();
	} else {

	}

	mediaControls();

	v1++;
	if (v1 > 100) {
		v1 = 0;
	}
	v2++;
	if (v2 > 100) {
		v2 = 0;
	}
	v3++;
	if (v3 > 100) {
		v3 = 0;
	}

	// Get the average (root mean square) amplitude
	rms = analyzer.getLevel();

	// Draw shapes with size based on volume
	/*ellipse(width/2,height/2,100+rms*400, 100+rms*400);
    rect(width/3,height/3,100+rms*400, 100+rms*400);
    triangle(30+rms, 75+rms, 58+rms*400, 20+rms*400, 86+rms*400, 75+rms*400);
*/

	ellipse(mouseX, mouseY, 20 + rms * 400, 20 + rms * 400);
	noStroke();
	fill(r, g, b);

}


function keyTyped() {
	if (key === 'd') {
		bgColor = 0;

	}

	if (key === 'f') {

		bgColor = 255;
	}

	if (key === 'h') {
		colorMode(HSB, 100);
	}
	
	if (key === 'c') {
		clear();
		
	}
	
}


function waveFormCanvas() {

	var spectrum = fft.analyze();

	var waveform = fft.waveform(); // analyze the waveform
	beginShape();
	stroke(spectrum);
	strokeWeight(4);
	noFill();

	for (var i = 0; i < waveform.length; i++) {
		var x = map(i, 0, waveform.length / 5 * PI, 0, width);
		var y = map(waveform[i], -1, 1, height, 0);
		vertex(x, y);
	}
	endShape();
	smooth();

	// change oscillator frequency based on amplitude
	/*	var freq = map(rms, 0, width, 40, 500);
		osc.freq(freq);

		var amp = map(rms, 0, height, 1, .01);
		osc.amp(amp);*/

}


function colorBoard() {

	colorMode(RGB,255);
	var r = rSlider.value();
	var g = gSlider.value();
	var b = bSlider.value();
	fill(r, g, b);
	

}


function drawCubes() {

	var rms = analyzer.getLevel();
	box(200 * rms, 200 * rms, 200 * rms);
}

function cubesCanvas() {


	orbitControl();

	for (var i = 0; i < 5; i++) {
		push();
		rotateZ(frameCount * 0.01);
		rotateX(frameCount * 0.01);
		rotateY(frameCount * 0.01);
		drawCubes();
		pop();
		translate(250, 0, 0);

	}
	push();
	translate(0, 250, 0);
	pop();
	for (var i = 0; i < 5; i++) {
		push();
		rotateZ(frameCount * 0.01);
		rotateX(frameCount * 0.01);
		rotateY(frameCount * 0.01);
		drawCubes();
		pop();
		translate(250, 0, 0);

	}

}


function circleCanvas() {

	ellipse(width / 2, height / 2, 100 + rms * 400, 100 + rms * 400);
	ellipse(width / 2, height / 2, 200 + rms * 500, 200 + rms * 500);
	ellipse(width / 2, height / 2, 300 + rms * 600, 300 + rms * 600);
	ellipse(width / 2, height / 2, 400 + rms * 700, 400 + rms * 700);
	ellipse(width / 2, height / 2, 500 + rms * 800, 500 + rms * 800);
	smooth();

}

function squareCanvas() {

	rectMode(CENTER)
	push();
	translate(250, 0, 0);
	rotate(frameCount / 100.0);
	rect(width / 2, height / 2, 100 + rms * 400, 100 + rms * 400);

	noStroke()
	pop();
	push();
	translate(250, 0, 0);
	rotate(frameCount / 200.0);
	rect(width / 3, height / 3, 100 + rms * 400, 100 + rms * 400);
	noStroke()
	pop();
	push();
	translate(250, 0, 0);
	rotate(frameCount / 300.0);
	rect(width / 4, height / 4, 100 + rms * 400, 100 + rms * 400);
	noStroke()
	pop();
	push();
	translate(250, 0, 0);
	rotate(frameCount / 50.0);
	rect(width / 5, height / 5, 100 + rms * 400, 100 + rms * 400);
	noStroke()
	pop();
	push();
	translate(250, 0, 0);
	rotate(frameCount / 400.0);
	rect(width / 6, height / 6, 100 + rms * 400, 100 + rms * 400);
	noStroke()
	pop();

}