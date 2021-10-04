

let poem =
`From that landscape I am now missing.`

let cnv, lines, linesString, howMany, markov, txt1, txt2, x = 40, y = 40;
var linesGenerated = ["click   »   to (re)generate"];
let transplanted, rooted, growing, rhizome;
let poetryLoop, toggleAudio, audioStatus;
let backward, forward, counter = 0, showing = 0;

let myFont, fontDone;

function fontLoaded(){
    fontDone = true;
}

function preload(){

  soundFormats(`mp3`);
  poetryLoop = loadSound(`assets/sound/transplanted.mp3`);
  //HTML5 audio element would have: controls autoplay muted

  //poetryLoop = createAudio('assets/sound/transplanted.mp3');
  //poetryLoop.autoplay();
  poetryLoop.setVolume(0.1);

  myFont = loadFont("assets/fonts/PoppinsLatin-Medium.otf", fontLoaded);

  //txt1 = loadStrings('txt/transplanted.txt');
  //txt2 = loadStrings('txt/rooted.txt');

  transplanted = loadStrings('txt/transplanted.txt');
  rooted = loadStrings('txt/rooted.txt');
  growing = loadStrings('txt/growing.txt');
  rhizome = loadStrings('txt/rhizome.txt');


}

function setup(){

  if(poetryLoop.isLoaded()){
    //every time you call play() it will start playing the same
    //audio again.
    //poetryLoop.play();
    poetryLoop.setLoop(true);
    //poetryLoop.pause();
  }

  cnv = createCanvas(500, 200);
  cnv.style(`z-index`,`0`);
  background(20);

  toggleAudio = createButton(`&#128264`);
  toggleAudio.id(`toggleAudio`);
  $(`#toggleAudio`).css(`font-size`,`25px`);
  $(`#toggleAudio`).css(`text-align`,`center`);
  $(`#toggleAudio`).css(`border`,`none`);
  $(`#toggleAudio`).css(`background`,`rgb(23, 230, 200)`);
  $(`#toggleAudio`).css(`z-index`,`1000`);
  $(`#toggleAudio`).css(`left`,`230px`);
  $(`#toggleAudio`).css(`top`,`130px`);
  $(`#toggleAudio`).css(`width`,`45px`);
  $(`#toggleAudio`).css(`height`,`45px`);
  $(`#toggleAudio`).css(`border-radius`,`50px`);
  $(`#toggleAudio`).css(`position`,`fixed`);
  $(`#toggleAudio`).css(`cursor`,`pointer`);
  toggleAudio.mousePressed(muteUnmute);

  backward = createButton(`&#x00AB`);
  backward.style(`left`,`30px`);
  backward.attribute(`disabled`, `true`);

  backward.style(`cursor`,`pointer`);
  backward.style(`top`,`130px`);
  backward.style(`font-size`,`25px`);
  backward.style(`text-align`,`center`);
  backward.style(`border`,`none`);
  backward.style(`background`,`rgb(23, 230, 200)`);
  backward.style(`z-index`,`1000`);
  backward.style(`width`,`45px`);
  backward.style(`height`,`45px`);
  backward.style(`border-radius`,`50px`);
  backward.style(`position`,`fixed`);
  backward.mousePressed(drawOlderText);

  forward = createButton(`&#x00BB`);
  forward.style(`left`, (cnv.size().width - 60).toString().concat(`px`) );
  forward.mousePressed(generateNext);

  forward.style(`top`,`130px`);
  forward.style(`cursor`,`pointer`);
  forward.style(`font-size`,`25px`);
  forward.style(`text-align`,`center`);
  forward.style(`border`,`none`);
  forward.style(`background`,`rgb(23, 230, 200)`);
  forward.style(`z-index`,`1000`);
  forward.style(`z-index`,`1000`);
  forward.style(`width`,`45px`);
  forward.style(`height`,`45px`);
  forward.style(`border-radius`,`50px`);
  forward.style(`position`,`fixed`);


  console.log("Width of canvas minus 30: " );
  console.log( (cnv.size().width - 30) );

  console.log("Width of canvas minus 30 as string: " );
  console.log( (cnv.size().width - 30).toString() );


  if(fontDone){
      textFont(myFont);
  }

    textSize(16);
    textLeading(25);
    textAlign(CENTER);

    //lines = ["click   »   to (re)generate"];

    markov = RiTa.markov(2, true);

    // load text into the model
    markov.addText(transplanted.join(' '));
    markov.addText(rooted.join(' '));
    //markov.addText(growing.join(' '));
    //markov.addText(rhizome.join(' '));

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
      lines = markov.generate(1); //markov returns an OBJECT!!!

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
