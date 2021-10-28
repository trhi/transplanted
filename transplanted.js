

let poem =
`From that landscape I am now missing.`

let cnv, lines, linesString, howMany, markov, txt1, txt2, x = 40, y = 40;
var linesGenerated = ["click   »   to (re)generate"];
let transplanted, rooted, growing, rhizome, miksi, vieraslaji;
let poetryLoop, toggleAudio, audioStatus;
let backward, forward, counter = 0, showing = 0;

let myFont, fontDone;

function fontLoaded(){
    fontDone = true;
}

function preload(){

  soundFormats(`mp3`);
  poetryLoop = loadSound(`assets/sound/transplanted.mp3`);
  poetryLoop.setVolume(0.1);

  myFont = loadFont("assets/fonts/PoppinsLatin-Medium.otf", fontLoaded);

  //txt1 = loadStrings('txt/transplanted.txt');
  //txt2 = loadStrings('txt/rooted.txt');

  transplanted = loadStrings('txt/en/transplanted.txt');
  rooted = loadStrings('txt/en/rooted.txt');
  growing = loadStrings('txt/en/growing.txt');
  rhizome = loadStrings('txt/en/rhizome.txt');
  miksi = loadStrings('txt/fi/miksi-olen-taalla.txt');
  vieraslaji = loadStrings('txt/fi/vieraslaji.txt');


}

function setup(){

  if(poetryLoop.isLoaded()){
    poetryLoop.setLoop(true); //dont' play(), because it will always start playing a new instance of this audio
  }

  cnv = createCanvas(500, 200);
  cnv.style(`z-index`,`0`);
  background(20);

  toggleAudio = createButton(`&#128264`);
  toggleAudio.id(`toggleAudio`);
  toggleAudio.class('button');
  toggleAudio.mousePressed(muteUnmute);

  backward = createButton(`&#x00AB`);
  backward.id(`backward`);
  backward.class('button');
  backward.attribute(`disabled`, `true`);
  backward.mousePressed(drawOlderText);

  forward = createButton(`&#x00BB`);
  forward.class('button');
  forward.id('forward');
  forward.style(`left`, (cnv.size().width - 60).toString().concat(`px`) );
  forward.mousePressed(generateNext);

  //console.log("Width of canvas minus 30: " );
  //console.log( (cnv.size().width - 30) );

  //console.log("Width of canvas minus 30 as string: " );
  //console.log( (cnv.size().width - 30).toString() );

  if(fontDone){
      textFont(myFont);
  }

    textSize(16);
    textLeading(25);
    textAlign(CENTER);

    //markov = RiTa.markov(2, true);
    markov = RiTa.markov(2, true);
    //this means: look for sequences of two words that follow eachother.
    //in other words, the model is not going to ever use certain words, unless they are followed or preceded by another word.


    // load text into the model
    markov.addText(miksi.join(' '));
    markov.addText(vieraslaji.join(' '));

    /*
    markov.addText(transplanted.join(' '));
    markov.addText(rooted.join(' '));
    markov.addText(growing.join(' '));
    markov.addText(rhizome.join(' '));
    */

    //console.log(markov);

    drawText(0);
}

function muteUnmute(){
  //what this is doing is that it is restarting the audio every time.
  //It almost seems as though it is making a new instance of poetryLoop everytime
  //

  console.log("entered function and poetryLoop.paused is: " + poetryLoop.isPaused());

  if ( poetryLoop.isPlaying() ) {
    poetryLoop.pause();
    //poetryLoop.muted;
    toggleAudio.html(`&#128264`); // audio on

  } else {
    poetryLoop.play();
    poetryLoop.muted = !poetryLoop.muted;
    toggleAudio.html(`&#128263`); // audio off
  }

}

function drawOlderText(){
  showing--;
  drawText(showing);
}

function drawText(index) {
  //clear();
  //background('black');
  background(20);
  //fill('white');
  fill(23, 230, 200);
  if(counter == 0 || showing == 0){
    backward.attribute(`disabled`, `true`);
  } else {
    backward.removeAttribute(`disabled`);
  }
  console.log("writing this onto screen:" + linesGenerated[index]);
  text(linesGenerated[index], x, y, 420, 420);
}

function generateNext() {
  if(showing == counter){
    //markov.generate({maxLengthMatch:3});
    //options.maxLength:
    //markov.generate({temperature:50});
    //markov.generate({startTokens:"kaipaan"});
    //markov.generate({maxLength:5});
    //markov.generate({seed:"kaipaan"});

      lines = markov.generate(1, {maxLength:6}); //markov returns an OBJECT!!!
      //this is the correct syntax for including options^^

      //console.log("Markov returned:" + lines[0]);
      //console.log("Markov returned:" + lines);

      linesGenerated.push(lines[0]);

      //if(linesGenerated.length = 1){ //stupidest bug in the world!!!!! I was setting linesGenerated.length to 1 XDDDDDDD
      if(linesGenerated.length == 2){
        backward.removeAttribute(`disabled`);
      }
      counter++;
      console.log("This is an array of lines generated: ");
      console.log(linesGenerated);
      console.log("Counter is: " + counter);

      x = y = 40;
  }
  showing++;
  drawText(showing);
}
