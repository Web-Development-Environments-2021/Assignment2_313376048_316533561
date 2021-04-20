var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var PackmanScore;

var keyArrowUp ;
var keyArrowDown ;
var keyArrowLeft ;
var keyArrowRight ;
var users_dict = { 'k' : 'k'} // {username : password}

$(document).ready(function() {
	// var canvas = document.getElementById('canvas'),
	context = canvas.getContext("2d");
	//Start();


	// validate signup form on keyup and submit
	$("#LOGIN").validate({
		rules: {
			usernameLogin: {
				required: true,
			},
			passwordLogin: {
				required: true,
				verfieUser: true
			},			
		},
		messages: {			
			usernameLogin: {
				required: "Please enter a username",
			},
			passwordLogin: {
				required: "Please provide a password",
				verfieUser: "User name not exist or incorrect password"
			},
		},
		submitHandler: function() {
			document.getElementById("usernameLogin").value = null;
			document.getElementById("passwordLogin").value = null;
			switchDives('Configuration_div');
		}
	});


	// validate signup form on keyup and submit
	$("#SIGNUP").validate({
		rules: {
			firstname: {
				required: true,
				lettersonly: true
			},
			lastname: {
				required: true,
				lettersonly: true
			},
			username: {
				required: true,
				minlength: 2
			},
			password: {
				required: true,
				strongPassword: true,
				minlength: 6
			},
			confirm_password: {
				required: true,
				minlength: 6,
				equalTo: "#password"
			},
			email: {
				required: true,
				email: true
			},
		},
		messages: {
			firstname: {
				required: "Please enter your firstname",
				lettersonly: "Please Enter letters only"
			},
			lastname: {
				required: "Please enter your lastname",
				lettersonly: "Please Enter letters only"
			},
			
			username: {
				required: "Please enter a username",
				minlength: "Your username must consist of at least 2 characters"
			},
			password: {
				required: "Please provide a password",
				strongPassword: "Password must contain letters and digits",
				minlength: "Your password must be at least 6 characters long"
			},
			confirm_password: {
				required: "Please provide a password",
				minlength: "Your password must be at least 6 characters long",
				equalTo: "Please enter the same password as above"
			},
			email: "Please enter a valid email address",
		},
		submitHandler: function() {
			addUser();
		}
	});
});

$(function(){

	//Password must contain at least 6 digit and contain one number and one char.
	$.validator.addMethod('strongPassword', function (value, element) {		
		return this.optional(element) || /\d/.test(value) && /[a-z]/i.test(value);
	});


	//check if username already exists
	$.validator.addMethod('validateUsername', function (value, element) {
		// let usernameValue = $('#allName').val();
		// if (usernameValue.length == '') {
		// 	$('#usercheck').show();
		// 	usernameError = false;
		// 	return false;
		// }
		// else if (checkdigit(usernameValue)) {
		// 	$('#usercheck').show();
		// 	$('#usercheck').html("**Full name must contain only letters");
		// 	usernameError = false;
		// 	return false;
		// } else {
		// 	$('#usercheck').hide();
		// 	usernameError = true;
		// 	return true;
		// }
		return false;	

		//return !isUserExists(value);
	});

	//Login

	//check if password match user
	$.validator.addMethod('verfieUser', function () {

		var user = document.getElementById("usernameLogin").value;
		var inputPassword = document.getElementById("passwordLogin").value;
		var userPassword = users_dict[user];
		if(inputPassword === userPassword){
			// document.getElementById("usernameLogin").value = null;
			// document.getElementById("passwordLogin").value = null;
			return true;
		}
		
		return false;
		
	});
})

function checkletters(value) {
	return /[a-z]/.test(value) || /[a-z]/.test(value);
}

function checkdigit(value) {
	return /[0-9]/.test(value);
}

function addUser(){
	var user = document.getElementById("username").value;
	var inputPassword = document.getElementById("password").value;
	users_dict[user]=inputPassword;
	// empty the input form buffer
	document.getElementById("firstname").value = null;
	document.getElementById("lastname").value = null;
	document.getElementById("username").value = null;
	document.getElementById("password").value = null;
	document.getElementById("confirm_password").value = null;
	document.getElementById("email").value = null;

	switchDives('LOGIN');
}

function canlogin(){
	var user = document.getElementById("usernameLogin").value;
	var inputPassword = document.getElementById("passwordLogin").value;
	var userPassword = users_dict[user];
	if(inputPassword === userPassword){
		// document.getElementById("usernameLogin").value = null;
		// document.getElementById("passwordLogin").value = null;
		switchDives('Configuration_div');
	}
	else{
		//alert("User name not exist or incorrect password");
		return false;
	}
}

// function uniCharCode(event) {
// 	var char = event.which || event.keyCode;
// 	document.getElementById("demo").innerHTML = "The Unicode CHARACTER code is: " + char;
// }


function uniKeyCode(lbl, event) {
	// var key = evevnt.keyCode      colud be we will need this line later in the game
	if(lbl === 'up_btn'){
		keyArrowUp = event.key;
		document.getElementById("up_btn").innerHTML = keyArrowUp;
	}
	else if(lbl === 'down_btn'){
		keyArrowDown = event.key;
		document.getElementById("down_btn").innerHTML = keyArrowDown;
	}
	else if(lbl === 'left_btn'){
		keyArrowLeft = event.key;
		document.getElementById("left_btn").innerHTML = keyArrowLeft;
	
	}
	else if(lbl === 'right_btn'){
		keyArrowRight = event.key;
		document.getElementById("right_btn").innerHTML = keyArrowRight;
	}	
}



function pressX(){
	document.getElementById('LOGIN').style.display='none';
	document.getElementById('SIGNUP').style.display='none';
	document.getElementById('Configuration_div').style.display='none';
	$('#centerSignUp').show();
	$('#centerLogIn').show();
}

function switchDives(Div_id){
	
	$('#WelcomePage').hide();
	$('#SIGNUP').hide();
	$('#LOGIN').hide();
	$('#centerSignUp').hide();
	$('#centerLogIn').hide();
	$('#game').hide();
	$('#Configuration_div').hide();
	$('#about').hide();
	$('#config').hide();


	$('#' + Div_id).show();

	if(Div_id === 'game'){
		Start();
		DrawSettings();		
	}
	// else if(Div_id === 'Random_game'){
	// 	$('#game').show();
	// 	//$('#settings').show();

	// 	//setRandomData();
	// 	Start();
	// 	DrawSettings();
	// }
}

// function setRandomData(){
// 	setkeysForGame();
// 	setBallsNmber();
// 	setPointsColor();
// 	//setTotalTime();
// 	// setNumberOfMonsters();
// }


// function setkeysForGame(){
// 	keyArrowUp = "ArrowUp";
// 	keyArrowDown = "ArrowDown";
// 	keyArrowLeft = "ArrowLeft";
// 	keyArrowRight = "ArrowRight";
// }

// function setBallsNmber(){
// 	document.getElementById("myRange").value = Math.floor(Math.random() * 90) + 50;
// }

// function getRandomColor() {
// 	var letters = '0123456789ABCDEF';
// 	var color = '#';
// 	for (var i = 0; i < 6; i++) {
// 	  color += letters[Math.floor(Math.random() * 16)];
// 	}
// 	return color;
//   }

// function setPointsColor(){
// 	 document.getElementById("five_point_color_id").value = getRandomColor();
// 	 document.getElementById("fifteen_point_color_id").value = getRandomColor();
// 	 document.getElementById("twenty_five_point_color_id").value = getRandomColor();
// }


// function setTotalTime(){
// 	document.getElementById("TotalTime").value = Math.floor(Math.random() * 360) + 60;
// }

// function setNumberOfMonsters(){
// 	var index = Math.floor(Math.random() * 4) + 1;  // returns a random integer from 1 to 4
// 	document.getElementsByName('monster')[index] = index;
// }



function DrawSettings(){
	$('#config').show();
	document.getElementById("config").innerHTML =
	"<br />" + " To go up press: " + keyArrowUp  + 
	"<br />" + " To go down press: "+  keyArrowDown  + 
	"<br />" + " To go left press: " + keyArrowLeft  + 
	"<br />" + " To go right press: " + keyArrowRight +
	"<br />" + " number of balls: " + document.getElementById("myRange").value +
	"<br />" + " 5 point food color: " + document.getElementById("five_point_color_id").value +
	"<br />" + " 15 point food color: " + document.getElementById("fifteen_point_color_id").value +
	"<br />" + " 25 point food color: " + document.getElementById("twenty_five_point_color_id").value +
	"<br />" + " total time: " +  document.getElementById("TotalTime").value +
	"<br />" + " number of monsters: " + displayRadioValue(); 

}

function displayRadioValue() {
	var ele = document.getElementsByName('monster');
	  
	for(i = 0; i < ele.length; i++) {
		if(ele[i].checked)
		return ele[i].value;
	}
}


function openDialog() { 
	document.getElementById("myDialog").showModal(); 
} 

function closeDialog() { 
	document.getElementById("myDialog").close(); 
}


function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[38]) {
		return 1;
	}
	if (keysDown[40]) {
		return 2;
	}
	if (keysDown[37]) {
		return 3;
	}
	if (keysDown[39]) {
		return 4;
	}
}

function DrawWelcomePage(){
	return true;	
}

function scoreAndTime(){
	// Score
	context.fillStyle = "rgb(0, 0, 0)";
	context.font = "24px Helvetica";
	context.textBaseline = "top";
	context.textAlign = "left";	
	context.fillText("Score: " + PackmanScore + " Time left :" +  time_elapsed/1000 , 5, 5);
}

function Draw() {
	canvas.width = canvas.width; //clean board
	//lblScore.value = score;
	//lblTime.value = time_elapsed;
	
	for (var i =0; i < 10; i++) {
		for (var j = 1; j < 11; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			
			if ((board[i][j] == 2)) {
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "blue"; //color - packman eye
				context.fill();
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "#000";
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color - pills
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
	scoreAndTime()
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}