  let a = "💔";
  var listener, canvas, heartButton, speakingToMyHeart, infoButton, url, language, thoughts;

function preload() {

  // Nothing besides load calls (loadImage, loadJSON, loadFont, loadStrings, etc.) should be inside the preload function

  language = 'fi'; //or set this using a button when you support more languages

  var isSpeechRecognitionSupported = false;
  try {
    //disable all of this if window doesn't have webkitSpeechRecognition or SpeechRecognition
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    listener = new SpeechRecognition;
    isSpeechRecognitionSupported = true;
  } catch (err) {
    console.log("Speech recognition is not supported");
  }

  if (isSpeechRecognitionSupported){
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    listener = new SpeechRecognition;
    listener.lang = 'fi-FI';
    /*
    if(lang == "en"){ // listener expects to hear english
      listener.lang = 'en-US';
    }
    if(lang == "pt"){ // listener expects to hear portuguese
      listener.lang = 'pt-PT';
    } else { // if lang is not either of these, defaults to english:
      listener.lang = 'en-US';
    }
    */
    listener.interimResults = true;
    listener.continuous = true;

    listener.onresult = (event) => {
      speakingToMyHeart = event.results[0][0].transcript;
      console.log(speakingToMyHeart);
      $("#questions").html('" <em>' + speakingToMyHeart + '<em>? "');
      //console.log(" *** *** " + speechToText);
      if(event.results[0].isFinal){
        whatDidTheyAskUs(speakingToMyHeart);
      }
      //speakFromMyHeart(speakingToMyHeart);
      //once the user has once pressed continuously, change the instructions behind this button:
      //$('#speak').tooltipster('content', 'then observe what happens').tooltipster('show');
    }
  }

  url = 'assets/audio/' + language + '/' + 'thoughts.json';
  thoughts = loadJSON(url);
  //$.get(url, (e) => console.log(e));

}

function setup(){

  doInterface();



/*
    heartButton.mousePressed( () => {
      $("#speak-out-text").text("");
      $("#speak-out-div").show();
      speakButtonPressed();
    }).mouseReleased( () => {
      stopAndClear();
      heartButton.attribute('src', 'assets/images/heart-broken.jpg');
    });

    heartButton.mouseOut( () => {
      stopAndClear();
    });

    function stopAndClear(){
      listener.stop();
      $("#speak-out-div").hide();
    }

    function speakButtonPressed(){
      /*if(lang == "pt"){
      sqvamtqf.pause();
      sqvamtqf.currentTime = 0;
    } else {*/

    /*
    iywstc.pause();
    iywstc.currentTime = 0;
    //}
    listener.start();
  }

  listener.onresult = (event) => {
    speechToText = event.results[0][0].transcript;
    $("#speak-out-text").text('"' + speechToText + '"');
    //console.log(" *** *** " + speechToText);
    detectSelection(speechToText);
    //once the user has once pressed continuously, change the instructions behind this button:
    //$('#speak').tooltipster('content', 'then observe what happens').tooltipster('show');
  }
*/



} //close setup

//onmouseover="hover(this);" onmouseout="unhover(this);

//functions need to be outside of setup, otherwise I cannot access them:



function draw(){
  //clear();

  //textSize(200);
 //textAlign(CENTER, CENTER);
//text(a, windowWidth/2, windowHeight/2);
}
