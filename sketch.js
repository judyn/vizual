var song;
var v1 = 0;
var v2 = 0;
var v3 = 0;

function preload(){
	song = loadSound('Chrome Sparks - All There Is (Feat. Steffaloo).mp3');
}


function setup(){
	
  createCanvas(windowWidth, windowHeight);

	colorMode(HSB, 100);
    frameRate(30);
	analyzer = new p5.Amplitude();
	analyzer.setInput(song);
	fft = new p5.FFT();
	
/*	reverb = new p5.Reverb();
	reverb.process(song, 4, 0.2);*/
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function mousePressed() {
   if ( song.isPlaying() ) { // .isPlaying() returns a boolean
    song.pause();
    
  
  } else {
 
		textAlign(CENTER);
		text("Pause",width/2, height/2);
        song.play(); // playback will resume from the pause position
  }
  
ellipse(mouseX,mouseY,20+rms*400, 20+rms*400);

}

function waveForm(){
  
     var spectrum = fft.analyze(); 
     var rms = analyzer.getLevel();
    
    for (var i = 0; i < spectrum.length/20; i++) {
    fill(spectrum[rms]/2, spectrum[rms]/10, 0);
    var x = map(i, 0, spectrum.length/25, 0, width);
    var h = map(spectrum[i], 0, 255, 0, height/2);
    rect(x, height, spectrum.length/25, -h);
   
    }
    fill(spectrum);
    
}

function draw() {
  background(255);
 
    v1++;
  if(v1 > 100){
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
      
  // Get the average (root mean square) amplitude
  var rms = analyzer.getLevel();

  // Draw an ellipse with size based on volume
  ellipse(width/2,height/2,100+rms*400, 100+rms*400);
  /*rect(width/2,height/2,100+rms*400, 100+rms*400);*/
  ellipse(mouseX,mouseY,20+rms*400, 20+rms*400);
  noStroke();
    
   /*for (var i = 0; i< spectrum.length; i++){
    var x = map(i, 0, spectrum.length, 0, width);
    var h = -height + map(spectrum[i], 0, width+5, height, 0);
    ellipse(x, height/2, width/2 / spectrum.length, h );
    rect(x, height/2, width/2 / spectrum.length, h );
   
  }*/
  
    waveForm();
  
}




