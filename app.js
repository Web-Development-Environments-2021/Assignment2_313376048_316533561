var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var PackmanScore;
var t;

var keyArrowUp ;
var keyArrowDown ;
var keyArrowLeft ;
var keyArrowRight ;

$(document).ready(function() {
	// var canvas = document.getElementById('canvas'),
	context = canvas.getContext("2d");
	//Start();

	//LOGIN
	$("#LOGIN").validate({
		rules: {
			uname: {
				required: true,
			},
			pswdL: {
				required: true,
				validateUser: true
			}
		},
		messages: {
			uname: {
				required: "Please enter username."
			},
			pswdL: {
				required: "Please enter an password",
				validateUser: "Username or password is not valid."
			}
		},
		submitHandler: function () {

			login();

			//reset form details
			let form = $("#LOGIN");
			form[0].reset();
		},
	});

	//REGISTER
	$("#sign_up").validate({
		rules: {
			user_name: {
				required: true,
				validateUsername: true
			},
			pswdS: {
				required: true,
				strongPassword: true
			},
			allName: {
				required: true,
				lettersonly: true
			},
			sign_upEmail: {
				required: true,
				email: true
			},
			Bday: {
				required: true
			}
		},
		messages: {
			user_name: {
				required: "Please enter valid username address.",
				validateUsername: "Username already taken."
			},
			pswdS: {
				required: "Please enter an password",
				strongPassword: "password MUST contain at least one character and one number."
			},
			allName: {
				required: "Please enter a name.",
				lettersonly: "Full name can be only letters."
			},
			sign_upEmail: {
				required: "Please enter an email address.",
				email: "Please enter a valid email."
			},
			registration_birth_day_name: {
				required: "Please enter a birth day."
			}
		},
		submitHandler: function () {
			
			alert("fuck you2");

			//register();

			//reset form details
			// let form = $("#sign_up");
			// form[0].reset();
		},
	});
});

$(function(){

	//Password must contain at least 6 digit and contain one number and one char.
	$.validator.addMethod('strongPassword', function (value, element) {		
		//return this.optional(element) || value.length >= 6 && /\d/.test(value) && /[a-z]/i.test(value);
		alert("fuck you");
		return false;
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
	$.validator.addMethod('validateUser', function (password, element) {

		// let user_input_username = document.getElementById("uname").value;

		// let localstorage_password = localStorage.getItem(user_input_username);

		// if(localstorage_password === null) {
		// 	return false;
		// }
		// else if(localstorage_password === password) {
		// 	return true;
		// }

		return false;
	});
})

function checkletters(value) {
	return /[a-z]/.test(value) || /[a-z]/.test(value);
}

function checkdigit(value) {
	return /[0-9]/.test(value);
}

// function uniCharCode(event) {
// 	var char = event.which || event.keyCode;
// 	document.getElementById("demo").innerHTML = "The Unicode CHARACTER code is: " + char;
// }

function uniKeyCode(lbl, event) {

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

	$('#' + Div_id).show();

	if(Div_id === 'game'){
		Start();
	}

	// if(Div_id === 'WelcomePage'){
	// 	$('#centerSignUp').show();
	// 	$('#centerLogIn').show();
	// }

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