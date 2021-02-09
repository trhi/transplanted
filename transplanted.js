let poem =
`From that landscape I am now missing.`

let lines, markov, txt1, txt2, x = 40, y = 40;

let myFont, fontDone;

function fontLoaded(){
    fontDone = true;
}

function preload(){

  myFont = loadFont("assets/fonts/PoppinsLatin-Medium.otf", fontLoaded);

  txt1 = loadStrings('txt/transplanted.txt');
  txt2 = loadStrings('txt/rooted.txt');

}

function setup(){

  if(fontDone){
      textFont(myFont);
  }


let txt = `This is a two sentence example.
This is the second one.
Here is a further sentence.
And another one.
These are all the examples. `

let rm = RiTa.markov(2);
rm.addText(txt);
let sentences = rm.generate(5);

for (i = 0; i < sentences.length; i ++ ){
console.log(sentences[i]);
}

    createCanvas(500, 200);
    textFont('helvetica', 16);
    textLeading(25);
    textAlign(CENTER);

    lines = ["click to (re)generate"];

    // create a markov model w' n=4
    markov = RiTa.markov(3);

    // load text into the model
    markov.addText(txt1.join(' '));
    markov.addText(txt2.join(' '));

    drawText();
}

function drawText() {
  background(20);
  fill(23, 230, 200);
  text(lines.join(' '), x, y, 420, 420);
}

function mouseClicked() {
  lines = markov.generate(2);
  x = y = 40;
  drawText();
}
