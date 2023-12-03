
var butColor = ['red','blue','green','yellow'];

var gamePattern = [];
var userClickPattern = [];

var level =0;
var started = false;

$(document).on("keypress", function(){
    if (!started) {

// The h1 title starts out saying "Press A Key to Start", 
//when the game has started, change this to say "Level 0".
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
      }
    });

    $(".btn").click(function(){
        userClickPattern.push(this.id);
        animatedPress(this.id);
        playSound(this.id);
        checkAnswer(userClickPattern.length -1);
    });
    
    function checkAnswer(currentLevel){
        if(gamePattern[currentLevel] === userClickPattern[currentLevel]){
            if (userClickPattern.length === gamePattern.length){
                setTimeout(function () {
                  nextSequence();
                }, 1000);
              }
        }else{
                playSound("wrong");
                $("body").addClass("game-over");
                $("h1").text("Game Over, Press Any Key to Restart");
                setTimeout( function(){
                $("body").removeClass("game-over");
                    },250);
                startOver();
            }
        }
    
function nextSequence(){
    userClickPattern=[];
    level++;
    $("h1").text("Level "+ level);
    var randomNumber = Math.floor(Math.random()*4);
    var nextColor = butColor[randomNumber];
    gamePattern.push(nextColor);
    $("#"+nextColor).fadeIn(100).fadeOut(150).fadeIn(150);
    playSound(nextColor);
}


function animatedPress(color){
    $("#"+color).addClass("pressed");
    setTimeout( function(){
        $("#"+color).removeClass("pressed");
            },150);
}
function playSound(name){
    var song = new Audio("./sounds/"+name+".mp3");
    song.play(); 
}
///////////managaing start of game


function startOver(){
    level =0;
    started= false;
    gamePattern =[];
}
