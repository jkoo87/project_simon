let a = new Audio(["sound/51499__supadoh__sid-resbass-short-a-2.wav"]);
let b = new Audio(["sound/51532__supadoh__sid-resbass-short-f-3.wav"]);
let c = new Audio(["sound/51516__supadoh__sid-resbass-short-c3.wav"]);
let d = new Audio(["sound/51520__supadoh__sid-resbass-short-d-3.wav"]);
let e = new Audio(["sound/51527__supadoh__sid-resbass-short-e2.wav"]);
let f = new Audio(["sound/51531__supadoh__sid-resbass-short-f-2.wav"]);
let g = new Audio(["sound/51540__supadoh__sid-resbass-short-g-3.wav"]);
let h = new Audio(["sound/51511__supadoh__sid-resbass-short-c-2.wav"]);
let ii = new Audio(["sound/51528__supadoh__sid-resbass-short-e3.wav"]);
let j = new Audio(["sound/51514__supadoh__sid-resbass-short-c1.wav"]);
let k = new Audio(["sound/51507__supadoh__sid-resbass-short-b2.wav"]);
let l = new Audio(["sound/51504__supadoh__sid-resbass-short-a3.wav"]);

let backgroundMusic = [a,b,c,d,e,f,g,h,ii,j,k,l];
let gameOverMusic = [ii, l, a, e, j]


function pickRandomSong() {
    let randomMelody = backgroundMusic[Math.floor(Math.random() * backgroundMusic.length)];
    randomMelody.play();
  }

function pickRandomTextColor(tag) {
  var colorR = Math.floor((Math.random() * 256));
  var colorG = Math.floor((Math.random() * 256));
  var colorB = Math.floor((Math.random() * 256));
  $(tag).css("color", "rgb(" + colorR + "," + colorG + "," + colorB + ")");
}

function randomSong() {
  backgroundMusicInterval = setInterval(function(){
    pickRandomTextColor('h1')
    pickRandomSong();
  }, 150);
}
randomSong();


let startButton = $("#startButton");
let resetButton = $("#resetButton");

let gameButtons = $(".gameButtons");
let redButton = $("#red");
let yellowButton = $("#yellow");
let greenButton = $("#green");
let blueButton = $("#blue");


let redSound = new Audio(["sound/51521__supadoh__sid-resbass-short-d-4.wav"]);
let yellowSound = new Audio(["sound/51533__supadoh__sid-resbass-short-f-4.wav"]);
let greenSound = new Audio(["sound/51513__supadoh__sid-resbass-short-c-4.wav"]);
let blueSound = new Audio(["sound/51501__supadoh__sid-resbass-short-a-4.wav"]);

let game = {
  intervalID: null,
  round: 0,
  score: 0,
  color : [redButton, yellowButton, greenButton, blueButton],
  sound: [redSound, yellowSound, greenSound, blueSound],
  randomPattern: [],
  playerPattern: [],
  playerHighScore:[],
}



resetButton.hide();

startButton.on("click", changeFormStart);

function changeFormStart() {
  $(".line").removeClass("buttonsInitial").children().addClass("gameButtonsTransform");
  $(".livesTracker").css({"display": "flex", "justify-content": "space-around"});
  $("header").css({"margin": "0", "transition": "2s"});
  $("h2").text("").css({"background-color": "rgba(107, 107, 107, 0.2)"});
  $(".optionText").text("On your mark");
  clearInterval(backgroundMusicInterval);
  game.score = 0;
  game.randomPattern= [];
  game.playerPattern=[];
  startButton.hide();
  resetButton.hide();
  redSound.play();
  $("h2").text("").css({"background-color": "Red"});
    setTimeout(function(){
      $(".optionText").text("Get Set");
      $("h2").text("").css({"background-color": "Yellow"});
      redSound.play();
    }, 2000);
    setTimeout(function(){
      $(".optionText").text("Start!");
      $("h2").text("").css({"background-color": "Green"});
      redSound.play();
      greenSound.play();
      yellowSound.play();
      resetButton.show();
    }, 4000);
    setTimeout(function(){
      newGame();
    }, 5000);

}

function newGame() {
    let randomColor = game.color[Math.floor(Math.random() * game.color.length)];
    buttonLightSound(randomColor);
    game.randomPattern.push(randomColor);
   $("h2").text("level: "+game.randomPattern.length);
  }



gameButtons.click(function(){

  game.playerPattern.push($(this));
  $('.optionText').text(game.playerPattern.length)
  checkPlayerSequence();
});


function checkPlayerSequence() {
  for (let i = 0; i < game.playerPattern.length; i++) {
    if($(game.playerPattern[i]).attr("id") != $(game.randomPattern[i]).attr("id")) {
      console.log(game.randomPattern[i]);
      console.log(game.playerPattern[i]);
      console.log("wrong");
      game.playerPattern = [];
      $('.optionText').text("-")
      livesLeft();
        setTimeout(function(){
          // displayPattern();
        }, 2000);
    }
    else if (i === game.playerPattern.length-1 && game.randomPattern.length === game.playerPattern.length) {
      console.log(game.randomPattern[i]);
      console.log(game.playerPattern[i]);
      console.log("right");
      game.playerPattern = [];
      $('.optionText').text("Awesome");
      correctAnswer("Great Job!");
      scoreBoard();
      game.playerPattern = [];
        setTimeout(function(){
          let randomColor = game.color[Math.floor(Math.random() * game.color.length)];
          game.randomPattern.push(randomColor);
          $("h2").text("Level: " +game.randomPattern.length);
          displayPattern();
        }, 2000);
    }
  }
}



function livesLeft() {
  if ($("#heart3").css("color") == "rgb(255, 0, 0)" && game.randomPattern.length >= 1) {
    $("#heart3").text("X").css({"color": "white", "margin-left": "10px", "transition":"3s"});
    wrongAnswer("Wrong, Try Again!");

  } else if ($("#heart2").css("color") == "rgb(255, 0, 0)" && game.randomPattern.length >= 1) {
    $("#heart2").text("X").css({"color": "white", "margin-left": "10px", "transition":"3s"});
    wrongAnswer("Careful! You only have one heart left!");

  } else if ($("#heart1").css("color") == "rgb(255, 0, 0)" && game.randomPattern.length >= 1) {
    $("#heart1").text("X").css({"color": "white", "transition":"3s"});
    changeFormReset();
  }
}


function correctAnswer(text) {
  $("h2").text(text).css({"background-color": "rgba(0, 153, 255, 0.7)"});
  setTimeout(function(){
    $("h2").text("").css({"background-color": "rgba(107, 107, 107, 0.2)"});
  }, 2000);
}

function wrongAnswer(text) {
  $("h2").text(text).css({"background-color": "rgba(255, 0, 0, 0.7)"});
  setTimeout(function(){
  $("h2").text("").css({"background-color": "rgba(107, 107, 107, 0.2)"});
  }, 2000);
}

function scoreBoard() {
  game.playerHighScore.push(game.randomPattern.length * 10 + game.score);
  $('.p1').text("Player Score: " + game.randomPattern.length * 10 + game.score )
  $('.p2').text("Highest Score: " + Math.max(...game.playerHighScore)*10)
}


function displayPattern() {
  if ($("#heart1").css("color") != "rgb(255, 255, 255)") {
    let i = 0;
    let interval = setInterval(function() {
      buttonLightSound(game.randomPattern[i]);

      i++;
      if (i >= game.randomPattern.length) {
        clearInterval(interval);
      }
    }, 1200);
  }
}



function buttonLightSound(randomColor) {
    switch (randomColor) {
    case redButton:
      game.sound[0].play();
      randomColor.css("background-color", "#D62828");
      setTimeout(function(){
        randomColor.css("background-color", "");
      }, 600);
      break;
    case yellowButton:
      game.sound[1].play();
      randomColor.css("background-color", "#FCF40C");
      setTimeout(function(){
      randomColor.css("background-color", "");
      }, 600);
      break;
    case greenButton:
      game.sound[2].play();
      randomColor.css("background-color", "#1B9211");
      setTimeout(function(){
        randomColor.css("background-color", "");
      }, 600);
        break;
    case blueButton:
      game.sound[3].play();
      randomColor.css("background-color", "#006EBC");
      setTimeout(function(){
        randomColor.css("background-color", "");
      }, 600);
        break;
  }
}






resetButton.on("click", changeFormReset);

function changeFormReset() {
  $(".gameButtonsTransform").removeClass("gameButtonsTransform").parent().addClass("buttonsInitial");
  $(".livesTracker").css("display", "none");
  $("header").css({"margin": "200px 0 0 0", "transition": "2s"});
  $(".optionText").text("Play again?");
  wrongAnswer("GAME OVER")
  $('.p1').text("Player Score: --")
  $(".redHearts").text(	"\u2764").css({"color": "red"});
  randomSong();
  startButton.show();
  resetButton.hide();
  game.randomPattern = [];
  game.playerSeries = [];
}



game.color[0].on("click", function(){
  return game.sound[0].play();
});
game.color[1].on("click", function(){
  return game.sound[1].play();
});
game.color[2].on("click", function(){
  return game.sound[2].play();
});
game.color[3].on("click", function(){
  return game.sound[3].play();
});
