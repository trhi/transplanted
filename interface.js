var mitae = [], miksi = [], miten = [], missae = [], rihmasto = [], juuret = [], kaipuu = [], keywords = [], structure = [];
var infinity;
var counter = 0;
var instructions;
var prompts = [ //ended up not using these
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

  infoButton = createButton('i');
  infoButton.addClass('infobutton');


  //infinityButton: infinite musing by Transplanted
  infinityButton = createButton('∞');
  infinityButton.id("select-infinity");
  infinityButton.mouseOver( () => {
    if (language == 'en'){
      $("#infinity-button-info-en").show();
    }
    if (language == 'fi'){
      $("#infinity-button-info-fi").show();
    }
  }).mouseOut( () => {
    if (language == 'en'){
      $("#infinity-button-info-en").hide();
    }
    if (language == 'fi'){
      $("#infinity-button-info-fi").hide();
    }
  });

  infinity = false;
  infinityButton.mousePressed( () => {

    if(!infinity){
      //infinityButton.innerText = '8';
      //document.getElementById(select-infinity).textContent = '8';
      //infinityButton.html('8');

      infinityButton.style("background: #ff1e8c");
      infinityButton.style('filter', 'drop-shadow(0 0 0.5rem #ff1e8c');
      infinity = true;
      listener.stop();

      //disable heartButton:
      heartButton.mousePressed( () => console.log("disbaled heartButton") );

      if(infinity){
        museAboutBeingTransplanted("infinity");
      }

    }else{
    //turn off infinityButton
      infinityButton.style("background: white");
      infinityButton.style("filter: none");
      infinity = false;
      //console.log("infinity is false");
      $('#audio').empty();
      $("#answers").stop(true, true).empty().hide();

      //enable heartButton:
      heartButton.mousePressed( () => listenToMyHeart() )
      .mouseReleased( () => stopAndClear() )
      .mouseMoved( () => stopAndClear() )
      .mouseOut( () => stopAndClear() );
    }

  });

  //finnishButton: speak to Transplanted in Finnish and no transcript visible
  finnishButton = createButton('fi');
  finnishButton.id('select-finnish');
  finnishButton.style("background: #1e8cff");
  finnishButton.style('filter', 'drop-shadow(0 0 0.5rem #1e8cff');
  finnishButton.mouseOver( () => {
    $("#finnish-button-info").show();
  }).mouseOut( () => {
    $("#finnish-button-info").hide();
  });

  finnishButton.mousePressed( () => {
    listener.stop();
    $("#answers").stop(true, true).empty().hide();

    //if(listener.lang="en-US")
    if(language == 'en'){
      $("#answers").stop(true, true).empty().hide();
      language = 'fi';
      //listener.lang="fi-FI";
      //subtitles=false;
      finnishButton.style("background: #1e8cff");
      finnishButton.style('filter', 'drop-shadow(0 0 0.5rem #1e8cff');
      englishButton.style('filter', 'none');
      englishButton.style("background: white");
    }
  });

  //englishButton: (or rather englishButton?) speak to Transplanted in English, and translated transcript visible
  englishButton = createButton('en');
  englishButton.id('select-english');
  englishButton.mouseOver( () => {
    $("#subtitles-button-info").show();

  }).mouseOut( () => {
    $("#subtitles-button-info").hide();
  });

  englishButton.mousePressed( () => {
    listener.stop();
    $("#answers").stop(true, true).empty().hide();
    if(language == 'fi'){
    //if(listener.lang=="fi-FI"){
      language = 'en';
      //listener.lang="en-US";
      //subtitles = true;
      englishButton.style("background: #FFD500");
      englishButton.style('filter', 'drop-shadow(0 0 0.5rem #FFD500');
      finnishButton.style('filter', 'none');
      finnishButton.style("background: white");
    }
  });


  infoButton.mouseOver( () => {
    //if(!subtitles){
    if(language == 'fi'){
      $("#instructions-fi").show();
    //} else if (subtitles){
    } else if (language == 'en'){
      $("#instructions-en").show();
    }
    })
  .mouseOut( () => {
    //if(!subtitles){
    $('#instructions-fi').hide();
  //} else if (subtitles){
    $("#instructions-en").hide();
  //}
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
  heartButton.attribute('src', 'assets/images/h-ear-t.png')
  listener.stop();
}

function listenToMyHeart() {
  //$("#answers").stop(true, true).empty().hide();
  $("#answers").empty();
  $("#questions").show();
  $("#questions").text('');
  $("#questions").css('opacity', '1');
  $("#questions").text('" 🎤  "'); // 🗣️  🎤
  heartButton.attribute('src', 'assets/images/h-ear-t.gif');
  /*
  if(!subtitles){
    listener.lang = 'fi-FI';
  } else if (subtitles){ //if subtitles is set to en, then change listener language to en
    listener.lang = 'en-US';
  }
  */

  listener.start();
}

function museAboutBeingTransplanted(whatTheyAskedUs){

  $("#answers").stop(true, true).empty().hide();
  //stopAndClear();
  //$("#answers").stop();
  //$("#answers").stop(true, true).empty().show();
  //$("#answers").show();

  //identify any keywords spoken:
  //if(!subtitles){
  if(language == 'fi'){
  keywords = whatTheyAskedUs.match(/miksi|mitä|miten|missä|tänne|tääl|tässä|siellä|paikka|järv|metsä|rihmasto|juur|kasv|maas|muut|elämä|kaip|kaiv|tunn|tunt|viih|ihmi/ig);
//} else if (subtitles){
} else if (language == 'en'){
  keywords = whatTheyAskedUs.match(/why|what|how|where|here|there|place|lake|forest|rhizome|root|grow|ground|move|life|miss|feel|familiar|enjoy|human/ig);
}

  var structure = [];
  if( whatTheyAskedUs.match(/infinity/ig) ){
    //if its in infinity mode: create a new structure by making a HUUUUUGE array:
    for(let inf = 0; inf < 88; inf++){
      let randomCategory = random(structures[0]);
      structure.push( randomCategory );
    }
    keywords = ['infinity'];
  } else {
    //select structure from the preconceived ones:
    structure = random(structures);
  }

  //selects some thoughts to playback based on these keywords:
  var selections = selectThoughts(keywords, structure);
  $("#questions").fadeOut( 2000 );
  play(selections);

}

function selectThoughts(keywords, structure){

  //console.log("this is the chosen structure:", structure);

  //for the first element, find concordance with keywords
  //for the following ones, choose random ones
  var l, j, k, selections = [], matches = [];
  for(l=0; l < structure.length; l++){
    //if I pass it keywords=null and structure = [], then it will do: selections.push(random(i)) == random interjection..
    if(l==0){ //choose the first random musing so that it matches a keyword in the users speech
      if(keywords == null || keywords[0] == 'infinity'){
        //if the system doesn't recognise any keywords,
        //just choose an interjection (a small response, a musing... but no huge response):
        //OR if its in inifity mode: just push a random element
        selections.push(random(i));
        if(keywords == null){
          l=1000; //so that it breaks out of the for loop after selecting just one interjection, in case the person spoke nonsense
        }
      } else { //find all the sentences where a keyword occurs
          for(j=0; j<structure[l].length; j++){
            for(k=0; k<keywords.length; k++){
              //if(!subtitles){
                if(language == 'fi'){
                if(structure[l][j].text.includes(keywords[k]) ){
                //this is pushing ALL the matches!!!!
                matches.push(structure[l][j]);
              }
            //} else if (subtitles){
            } else if (language == 'en'){
                if(structure[l][j].subtitleEN.includes(keywords[k]) ){
                //this is pushing ALL the matches!!!!
                matches.push(structure[l][j]);
              }
            }
            }
          }
          if(matches.length === 0){ //if there isn't any match:
            //what if there isn't a match? -> then we just don't add an element that matches?
            //if there IS NO MATCH in this group of either (a, i, q), we just add a random element from this group??
            //result: no concordance between what the user says and what the system responds..
            selections.push(random(structure[l]));
          } else { //select a random sentence from the matches:
            //console.log("These are the matches that I found: ", matches);
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
  //$("#answers").stop(true, true).empty().hide(); //perhaps this
  $("#answers").hide();
  var loading = 0;
  var playing = 0;

  function playNext(){
    audios[playing].play();
    //if(subtitles){
    if(language == 'en'){
      $("#answers").show();
      $("#answers").append("<span>" + audios[playing].getAttribute('subtitleEN') + "</span>", "<br>");

      if(infinity){
        //once 8 lines are displayed, remove the first one:
        if($("#answers").children().length == 18 ){
          $("#answers").children().slice(0, 2).remove();
        }
      }

      if(!infinity){
        $("#answers").fadeOut( 40000 , () => $("#answers").hide() );
      }
    }
  }

  var audios = $.map(selections, function(thought){
    //map=iterate through all the selections and create an audio element for each
    //with event handlers that control when to move onto playing the next audio
    loading++;

    //set infinity button text content to 8 while the audio files are loading:
    if(loading == 1){
      infinityButton.html('⧖'); //⧖ ⧖ ⧖ ⏱  ◴◵◶ ◷◶◵◴ &#x23f3
    }

    var audio = $( "<audio></audio>", {
      src: thoughts.path+thought.filename,
      txt: thought.text,
      subtitleEN: thought.subtitleEN,
      preload: 'auto',
      on: {
        canplaythrough: function(event){
          //console.log("loading is:", loading);
          // 88 -> 1
          loading--;
          if(loading === 0){
            playNext();
            infinityButton.html('∞');
          }
        },//close canplaythrough:
        ended: function(event){
          playing++;
          if(playing<audios.length){
            playNext();
          } else {
            //$("#answers").stop(true, true).empty().hide();
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
