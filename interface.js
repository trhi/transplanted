function doInterface(){

  canvas = createCanvas(windowWidth, windowWidth);
  canvas.style('display', 'block');
  canvas.id('canvas');
  background("transparent");

  infoButton = createButton('i');
  infoButton.addClass('infobutton');


  //let heart = createButton(a);
  //heartButton = createImg('assets/images/heart-broken.jpg');
  heartButton = createImg('assets/images/h-EAR-t.png');
  heartButton.parent('heartDIV');
  heartButton.style("visibility: visible");
  //heartButton.addClass('heartButton');
  heartButton.addClass('h-ear-tButton');
  heartButton.mousePressed( () => listenToMyHeart() )
  .mouseReleased( () => {
    stopAndClear();
    //heartButton.attribute('src', 'assets/images/heart-broken.jpg')
  });
  heartButton.mouseOut( () => {
    stopAndClear();
    //heartButton.attribute('src', 'assets/images/heart-broken.jpg')
  });

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

function hideInfo(){
  this.style.visibility = "hidden";
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
