  var listener, canvas, heartButton, speakingToMyHeart, infoButton, url, language, thoughts;
  var a = [], i = [], q = [], structures = [];
  let isSpeechRecognitionSupported = false;

function preload() {

  language = 'fi'; //or set this using a button when you support more languages

  //var isSpeechRecognitionSupported = false;
  try {
    //disable all of this if window doesn't have webkitSpeechRecognition or SpeechRecognition
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    listener = new SpeechRecognition;
    isSpeechRecognitionSupported = true;
  } catch (err) {
    console.log("Speech recognition is not supported");
    window.alert("Please view this work in Chrome");
  }

  if (isSpeechRecognitionSupported){

        window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        listener = new SpeechRecognition;
        listener.lang = 'fi-FI';
        listener.interimResults = true;
        listener.continuous = true;

        listener.onresult = (event) => {
          speakingToMyHeart = event.results[0][0].transcript;
          $("#questions").html('" <em>' + speakingToMyHeart.toLowerCase() + '<em> ? "');
          if(event.results[0].isFinal){
            //museAboutBeingTransplanted based on what the user spoke to the heart
            museAboutBeingTransplanted(speakingToMyHeart.toLowerCase());
            stopAndClear();
            //disable button while transplanted is responding? :
          }
        }


      url = 'assets/audio/' + language + '/' + 'thoughts.json';
      thoughts = loadJSON(url);

    }//end if(isSpeechRecognitionSupported)

}//end preload()

function setup(){
  a = thoughts.answers;
  i = thoughts.interjections;
  q = thoughts.questions;
  structures = [
    [q, a, a, i, a, q],
    [q, i, q],
    [q, i, a, a, i, q],
    [q, a, i],
    [q, q, i]
  ];
  if (isSpeechRecognitionSupported){
    doInterface();
  }
} //close setup

function draw(){
}
