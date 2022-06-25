var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var isAnyKeyPressed = false;
var level = 0;
var isGameOver = false;
var infinityWar = new Audio("sounds/infinity_war.mp3");

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);//flash effect on button
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level "+level);
}

function playSound(chosenColour){
    // var audio = new Audio("sounds/"+chosenColour+".mp3");
    // audio.play();
    switch (chosenColour) {
        case "red":
            var audio = new Audio("sounds/ironman.mp3");
            audio.play();
            break;
        case "blue":
            var audio = new Audio("sounds/cap_shield.mp3");
            audio.play();
            break;
        case "green":
            var audio = new Audio("sounds/deadpool.mp3");
            audio.play();
            break;
        case "yellow":
            var audio = new Audio("sounds/thor.mp3");
            audio.play();
            break;
        case "wrong":
            setTimeout(function(){
                infinityWar.play();
            },1000);
            break;
    }
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function animateGameOver(){
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },900);
}
//because of autoplay is not allowed i have wrapped it inside event Listener
// $(document).on("keypress",function(){
//     animateButton(randomChosenColour);
// });

$(".btn").on("click",function(event){
    if(isAnyKeyPressed === true && isGameOver === false){
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);

        if(userClickedPattern[userClickedPattern.length-1]!==gamePattern[userClickedPattern.length-1]){
            isGameOver = true;
            gamePattern=[];
            userClickedPattern=[];
            isAnyKeyPressed=false;
            level=0;
            isGameOver=false;
            $("#level-title").text("Game Over, Press Any Key to Restart");
            animateGameOver();
            $(".btn").fadeOut(4000);
            // console.log("Game Over");
        }else{
            if(gamePattern.length===userClickedPattern.length){
                userClickedPattern = [];
                setTimeout(function(){
                    nextSequence();
                },1000);
            }
        }
    }
    // console.log(userClickedPattern);
});

var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
var ev = mobile ? 'touchstart' : 'keypress';

$(document).on(ev,function(){
    if(isAnyKeyPressed === false){
        infinityWar.pause();
        $(".btn").fadeIn();
        nextSequence();
        isAnyKeyPressed=true;
    }
});