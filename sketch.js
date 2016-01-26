var song;
var v1 = 0;
var v2 = 0;
var v3 = 0;

function preload(){
	song = loadSound('Chrome Sparks - All There Is (Feat. Steffaloo).mp3');
}

function playButton(){
		createCanvas(1000,1000);
}

function setup(){
	playButton();
	background(0, 255,0);
	colorMode(HSB, 100);
	
	analyzer = new p5.Amplitude();
	analyzer.setInput(song);
	fft = new p5.FFT();
	
/*	reverb = new p5.Reverb();
	reverb.process(song, 4, 0.2);*/
}

function ball(){
  translate(mouseX,mouseY,10);
  fill(v1,v2,v3);
  sphere(100);
  
  }

function mousePressed() {
   if ( song.isPlaying() ) { // .isPlaying() returns a boolean
    song.pause();
    
    background(0, 255, 0);
  } else {
 
  	background(255, 0, 255);
		textAlign(CENTER);
		text('Pause',width/2, height/2);
    song.play(); // playback will resume from the pause position
  }
  
}

function draw() {
  background(255);
  var spectrum = fft.analyze(); 
    v1++;
  if(v1 > 360){
  v1 = 0;
  }
  v2++;
  if(v2 > 100){
  v2 = 0;
  }
  v3++;
  if(v3 > 100){
  v3 = 0;
  }
  
  ball();

  // Get the average (root mean square) amplitude
  var rms = analyzer.getLevel();

  // Draw an ellipse with size based on volume
  ellipse(width/2,height/2,100+rms*400, 100+rms*400);

  stroke(30);
  fill(v1,v2,v3);
  
   for (var i = 0; i< spectrum.length; i++){
    var x = map(i, 0, spectrum.length, 0, width);
    var h = -height + map(spectrum[i], 0, width+5, height, 0);
    ellipse(x, height/2, width/2 / spectrum.length, h );
    rect(x, height/2, 40 / spectrum.length, h );
  }
  

}

function ball(){
  translate(mouseX,mouseY,10);
  fill(v1,v2,v3);
  sphere(100);
  
  }






