var mitae = [], miksi = [], miten = [], missae = [];
var counter = 0;

function doInterface(){

  canvas = createCanvas(windowWidth, windowWidth);
  canvas.style('display', 'block');
  canvas.id('canvas');
  background("transparent");

  infoButton = createButton('i');
  infoButton.addClass('infobutton');
  infoButton.mouseOver( () => heartButton.attribute('src', 'assets/images/h-ear-t-i.png') )
  .mouseOut( () => heartButton.attribute('src', 'assets/images/h-EAR-t.png') );

  sortAudiofiles();

  //let heart = createButton(a);
  //heartButton = createImg('assets/images/heart-broken.jpg');

  heartButton = createImg('assets/images/h-EAR-t.png');
  heartButton.parent('heartDIV');
  heartButton.style("visibility: visible");
  //heartButton.addClass('heartButton');
  heartButton.addClass('h-ear-tButton');
  heartButton.mousePressed( () => listenToMyHeart() )
  .mouseReleased( () => stopAndClear() )
  .mouseMoved( () => stopAndClear() )
  .mouseOut( () => stopAndClear() );

  //heartButton.attribute('src', 'assets/images/heart-broken.jpg')
  //heartButton.mouseReleased( () => heartButton.attribute('src', 'assets/images/heart-broken.jpg') );

  //canvas.parent('heartDIV');
  //heartButton.parent('heartDIV');
}

function stopAndClear(){
  $("#questions").css('opacity', '0.3');
  //heartButton.attribute('src', 'assets/images/heart-broken.jpg')
  heartButton.attribute('src', 'assets/images/h-EAR-t.png')
  listener.stop();
}

function listenToMyHeart() {
  $("#questions").text('');
  $("#questions").css('opacity', '1');
  //heartButton.attribute('src', 'assets/images/heart-beating.gif');
  heartButton.attribute('src', 'assets/images/h-EAR-t.gif');
  listener.start();

}

function  sortAudiofiles() {
  for( let i=0; i<thoughts.questions.length; i++){
    if( thoughts.questions[i].text.includes('miksi') ){
      miksi.push(thoughts.questions[i]);
    }
  }
  for( let i=0; i<thoughts.questions.length; i++){
    if( thoughts.questions[i].text.includes('mitä') ){
      mitae.push(thoughts.questions[i]);
    }
  }
  for( let i=0; i<thoughts.questions.length; i++){
    if( thoughts.questions[i].text.includes('miten') ){
      miten.push(thoughts.questions[i]);
    }
  }
  for( let i=0; i<thoughts.questions.length; i++){
    if( thoughts.questions[i].text.includes('missä') ){
      missae.push(thoughts.questions[i]);
    }
  }

  console.log("Found these:");
  console.log(miksi, mitae, miten);
}

//or a separate function to sort questions/interjections/answers according to words?

function whatDidTheyAskUs(whatTheyAskedUs){
  if ( whatTheyAskedUs.includes('miksi') || whatTheyAskedUs.includes('Miksi') ){
    console.log("I heard miksi");
    //if they asked miski, then let's echo that question back to them:

    let randomAudio = random(miksi).filename;
    let path = 'assets/audio/fi/' + randomAudio;
    let audio = createAudio( path );
    audio.addCue(2, next);
    audio.play();
    //audio.play();
  //  audio.onended(continue);
  }
  if ( whatTheyAskedUs.includes('mitä') || whatTheyAskedUs.includes('Mitä')){
    console.log("I heard mitä");
    let randomAudio = random(mitae).filename;
    let path = 'assets/audio/fi/' + randomAudio;
    let audio = createAudio( path );
    audio.addCue(2, next);
    audio.play();
    //audio.play();
  //  audio.onended(continue);

  }
  if ( whatTheyAskedUs.includes('miten') || whatTheyAskedUs.includes('Miten') ){
      console.log("I heard miten");
      let randomAudio = random(miten);
      let path = thoughts.path + randomAudio.filename;
      let audio = createAudio( path );
      audio.addCue(2, next);
      audio.play();
  //    audio.onended(continue);
  }
  /*
  if ( whatTheyAskedUs.includes('missä') || whatTheyAskedUs.includes('Missä') ){
      console.log("I heard missä");
      let randomAudio = random(missae);
      let path = thoughts.path + randomAudio.filename;
      let audio = createAudio( path );
      audio.addCue(2, next);
      audio.play();

  //    audio.onended(continue);
  }
  */

  if ( whatTheyAskedUs.includes('kaipaan') || whatTheyAskedUs.includes('Kaipaan') ){
      console.log("I heard kaipaan");
      //watch out that two matches dont start two sets of audio running
  }

  //first play back a question including the question word

  /*let randomInterjection = random(thoughts.interjections);
  let path = thoughts.path + randomInterjection.filename;
  let interjection = createAudio ( path );
  interjection.play();
  */

}


function next() {
  //then play back an interjection
  //then play back two observations
  //then echo the audio that the user asked

  let randomQuestion = random(thoughts.questions);
  let randomAnswer1 = random(thoughts.answers);
  let randomAnswer2 = random(thoughts.answers);
  let randomInterjection1 = random(thoughts.interjections);
  let randomInterjection2 = random(thoughts.interjections);
  let randomInterjection3 = random(thoughts.interjections);


  let randomNext = random([randomQuestion, randomAnswer1, randomAnswer2, randomInterjection1, randomInterjection2, randomInterjection3]);
  console.log("I chose:");
  console.log(randomNext);


  let path = thoughts.path + randomNext.filename;
  let nextAudio = createAudio ( path );
  if(counter < 5){
    nextAudio.addCue(3, next);
    nextAudio.play();
    counter++;
  }else{
    nextAudio.play();
    counter = 0;
  }

}


function hideInfo(){
  this.style.visibility = "hidden";
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
