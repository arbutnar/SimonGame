var buttonColours = ["red", "blue", "green", "yellow"];
var	gamePattern = [];
var userClickedPattern = [];
var	level = 0;
var started = false;

document.addEventListener("keydown", function(event) {
	if (started == false)
	{
		nextSequence();
		started = true;
	}
});

for(var i = 0; i < 4; i++) {
	document.querySelectorAll(".btn")[i].addEventListener("click", function() {
		var userChosenColour = this.id;
		playSound(userChosenColour);
		animatePress(userChosenColour);
		userClickedPattern.push(userChosenColour);
		console.log(userClickedPattern);
		if (userChosenColour !== gamePattern[userClickedPattern.length - 1]) {
			playSound("wrong");
			document.querySelector("body").classList.toggle("game-over");
			setTimeout(function() {
				document.querySelector("body").classList.toggle("game-over");
			}, 200);
			document.querySelector("h1").textContent = "Game Over, Press Any Key to Restart";
			startOver();
		}
		if (userClickedPattern.length === gamePattern.length && started == true) {
			setTimeout(function() {
				nextSequence();
			}, 500);
			userClickedPattern = [];
		}
	});
}

function playSound(name) {
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

function animatePress(currentColor) {
	var currentButton = document.querySelector("." + currentColor);
	currentButton.classList.toggle("pressed");
	setTimeout(function() {
		currentButton.classList.toggle("pressed");
	}, 100);
}
		
function nextSequence() {
	var randomChosenColour = buttonColours[Math.floor(Math.random() * 4)];
	gamePattern.push(randomChosenColour);
	var randomChosenBotton = document.querySelector("." + randomChosenColour);
	randomChosenBotton.classList.toggle("fade");
	setTimeout(function() {
		randomChosenBotton.classList.toggle("fade");
	}, 200);
	playSound(randomChosenColour);
	document.querySelector("#level-title").textContent = "Level " + ++level;
}

function startOver() {
	level = 0;
	gamePattern = [];
	userClickedPattern = [];
	started = false;
}