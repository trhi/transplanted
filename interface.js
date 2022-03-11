var mitae = [], miksi = [], miten = [], missae = [], rihmasto = [], juuret = [], kaipuu = [], keywords = [], structure = [];
var counter = 0;
var instructions;
var prompts = [
      'mitä kaipaan ? ',
      'voiko ihminen juurtua ? ',
      'miksi olen täällä ? ',
      'miten ihminen juurtuu ? ',
      'mitä kaipuu on ? ',
      'miksi viihdyn täällä niin hyvin ? ',
      'miksi muutin pois ? ',
      'missä elämä on ? ',
      'miksi olen tässä ? ',
      'missä on juuret ? ',
      'miksi kaivata paikaan, jossa ei ole ? ',
      'olenko rihmasto ? ',
      'missä on minun paikka ? ',
      'miksi olen täällä ? '
    ];

function doInterface(){

  canvas = createCanvas(windowWidth, windowWidth);
  canvas.style('display', 'block');
  canvas.id('canvas');
  background("transparent");

  //instructions = $('#instructions');

  infoButton = createButton('i');
  infoButton.addClass('infobutton');
  //infoButton.mouseOver( () => heartButton.attribute('src', 'assets/images/h-ear-t-info.png') )
  //.mouseOut( () => heartButton.attribute('src', 'assets/images/h-ear-t.png') );

  infoButton.mouseOver( () => {
    $("#instructions").show();
    })
  .mouseOut( () => {
    $('#instructions').hide();
    });

  heartButton = createImg('assets/images/h-ear-t.png');
  heartButton.parent('heartDIV');
  heartButton.style("visibility: visible");
  heartButton.addClass('h-ear-tButton');
  heartButton.mousePressed( () => listenToMyHeart() )
  .mouseReleased( () => stopAndClear() )
  .mouseMoved( () => stopAndClear() )
  .mouseOut( () => stopAndClear() );
}

function stopAndClear(){
  $("#questions").css('opacity', '0.3');
  //heartButton.attribute('src', 'assets/images/heart-broken.jpg')
  heartButton.attribute('src', 'assets/images/h-ear-t.png')
  listener.stop();
}

function listenToMyHeart() {
  $("#questions").show();
  $("#questions").text('');
  $("#questions").css('opacity', '1');
  $("#questions").text('" 🎤  "'); // 🗣️  🎤
  heartButton.attribute('src', 'assets/images/h-ear-t.gif');
  listener.start();
}

function museAboutBeingTransplanted(whatTheyAskedUs){

  //stopAndClear();

  //identify any keywords spoken:
  keywords = whatTheyAskedUs.match(/miksi|mitä|miten|missä|tänne|tääl|tässä|siellä|paikka|järv|metsä|rihmasto|juur|kasv|maas|muut|elämä|kaip|kaiv|tunn|tunt|viih|ihmi/ig);
  console.log("these are the keywords I heard: ", keywords);

  //selects some thoughts to playback based on these keywords:
  var selections = selectThoughts(keywords);
  console.log("These are my selections:", selections);
  //then playback the selections:
  //return play(selections); //if I had play returning a deferred that would re-enable the button once resolved
  //which would undoubtedly be the better way to do this!
  play(selections);
  $("#questions").fadeOut( 2000 );

}

function selectThoughts(keywords){

  let structure = random(structures);
  console.log("this is the chosen structure:", structure);

  //for the first element, find concordance with keywords
  //for the following ones, choose random ones
  var l, j, k, selections = [], matches = [];
  for(l=0; l < structure.length; l++){
    if(l==0){ //choose the first random musing so that it matches a keyword in the users speech
      if(keywords == null){
        //if the system doesn't recognise any keywords,
        //just choose an interjection (a small response, a musing... but no huge response):
        selections.push(random(i));
        l=1000; //so that it breaks out of the for loop after selecting the interjection
      } else { //find all the sentences where a keyword occurs
          for(j=0; j<structure[l].length; j++){
            for(k=0; k<keywords.length; k++){
              if(structure[l][j].text.includes(keywords[k]) ){
                //this is pushing ALL the matches!!!!
                matches.push(structure[l][j]);
              }
            }
          }
          if(matches.length === 0){ //if there isn't any match:
            //what if there isn't a match? -> then we just don't add an element that matches?
            //if there IS NO MATCH in this group of either (a, i, q), we just add a random element from this group??
            //result: no concordance between what the user says and what the system responds..
            selections.push(random(structure[l]));
          } else { //select a random sentence from the matches:
            console.log("These are the matches that I found: ", matches);
            selections.push(random(matches));
          }
      }

    } else {
      //after selecting the first sentence as one that concords with what the
      //person says, then just select random ones according to the chosen structure:
      selections.push(random(structure[l]));
    }
  }

  return selections;
}

function play(selections){ //this is not going to return a deferred, because our button is always going to be enabled...
  var audioDiv = $('#audio');
  audioDiv.empty();
  //var deferred = $.Deferred();
  var loading = 0;
  var playing = 0;

  function playNext(){
    audios[playing].play();
  }

  var audios = $.map(selections, function(thought){
    //map=iterate through all the selections and create an audio element for each
    //with event handlers that control when to move onto playing the next audio
    loading++;
    var audio = $( "<audio></audio>", {
      src: thoughts.path+thought.filename,
      preload: 'auto',
      on: {
        canplaythrough: function(event){
          loading--;
          if(loading === 0){
            playNext();
          }
        },//close canplaythrough:
        ended: function(event){
          playing++;
          if(playing<audios.length){
            playNext();
          } else {
            //deferred.resolve(); //this would now be used to reactivate the input button
          }
        }//close ended:
      }//close on:
    });//close var audio
    audioDiv.append(audio);
    return audio[0];
  });//close map

}//close play

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
