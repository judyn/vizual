var song;
analyzer = new p5.Amplitude();
analyzer.setInput(song);
fft = new p5.FFT();
var rms = analyzer.getLevel();

function preload() {
	song = loadSound('Chrome Sparks - All There Is (Feat. Steffaloo).mp3');
}


function setup() {

	createCanvas(windowWidth, windowHeight, WEBGL);
	colorMode(HSB, 100);
	analyzer = new p5.Amplitude();
	analyzer.setInput(song);
	fft = new p5.FFT();
	var rms = analyzer.getLevel();

}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}


function mousePressed() {
	if (song.isPlaying()) { // .isPlaying() returns a boolean
		song.pause();


	} else {
		song.play(); // playback will resume from the pause position
	}

	ellipse(mouseX, mouseY, 20 + rms * 400, 20 + rms * 400);

}


function drawCubes() {
	var rms = analyzer.getLevel();
	box(200 * rms, 200 * rms, 200 * rms);

}



function draw() {

	background(255);
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