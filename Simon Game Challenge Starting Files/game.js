//Global Variables----------------------------------------------------

let started = false;
let level = 0;
let userClickedPattern = [];
let gamePattern = [];
let buttonColours = ["red","blue","green","yellow"];

//Event Handlers-----------------------------------------------------

$(".btn").on("click",function(event){
    let userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length);
})

$(document).on("keypress",function(){
    if(started == false){
        nextSequence();
        started = true;
    }
})

//Functions----------------------------------------------------------

function nextSequence(){
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    level+=1;
    $("h1").text("Level "+level);
}

function playSound(name){
    let audioObj = new Audio("sounds/"+name+".mp3");
    audioObj.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    window.setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel-1] == userClickedPattern[currentLevel-1]){
        console.log("correct");
        if(currentLevel == level){
            window.setTimeout(nextSequence,1000);
        }
    }
    else{
        console.log("wrong");
        let audioObj = new Audio("sounds/wrong.mp3");
        audioObj.play();
        $("body").addClass("game-over");
        window.setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

//----------------------------------------------------------------------