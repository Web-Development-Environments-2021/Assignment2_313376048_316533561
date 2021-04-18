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
var users = [['k','k','k','k@gmail.com',23,12,1994]];

var keyArrowUp ;
var keyArrowDown ;
var keyArrowLeft ;
var keyArrowRight ;
var users_dict = { 'k' : 'k', 'kkk' : 'kkk'} // {username : password}


var pacShape;;
var monShape;;

var monster_color;
var time_elapsed;
let dirction;
var dirctions_dict = { 1: [-0.35, 1.35, 17], 2: [-1.35, 0.35, 17], 3: [-0.85, 0.85, 0], 4: [0.15, 1.85, 0] }
var currentUser;
let ate =false;
let failCounter = 0;
let was_food = false;
let pssibleDirections = [1,2,3,4];




$(document).ready(function() {
	//window.onload = function() {
	var canvas = document.getElementById('canvas'),
	context = canvas.getContext("2d");

	// Event handler to resize the canvas when the document view is changed
	window.addEventListener('resize', resizeCanvas, false);

	function resizeCanvas() {
	  canvas.width = window.innerWidth;
	  canvas.height = window.innerHeight;
  
	  // Redraw everything after resizing the window
	  drawStuff(); 
	}
	resizeCanvas();

	function drawStuff() {
		context.font = '20px serif';
		context.fillStyle = "white";
		context.fillText('Welcome to Packmen Game', 600, 80);
		context.fillText('if you like the game tell to our HW checkers.', 600, 110);
		context.fillText("If you don't like the keep it secret, your opinion is not matter to us", 600, 140);		
		context.fontcolor="white";
	}

	function validateEmail($email) {
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  		return regex.test($email);
	}

	var value = $("#password_reg").val();

	$.validator.addMethod("checklower", function(value) {
	return /[a-z]/.test(value);
	});
	$.validator.addMethod("checkupper", function(value) {
	return /[A-Z]/.test(value);
	});
	$.validator.addMethod("checkdigit", function(value) {
	return /[0-9]/.test(value);
	});
	$.validator.addMethod("pwcheck", function(value) {
	return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) && /[a-z]/.test(value) && /\d/.test(value) && /[A-Z]/.test(value);
	});

	$('#sign_up').validate({
		rules: {
			pswdS: {
			minlength: 6,
			maxlength: 30,
			required: true,
			//pwcheck: true,
			checklower: true,
			checkupper: true,
			checkdigit: true
			},
			pswdSRepeat: {
			equalTo: "#psw",
			},
		},
		messages: {
			pswdS: {
			pwcheck: "Password is not strong enough",
			checklower: "Need atleast 1 lowercase alphabet",
			checkupper: "Need atleast 1 uppercase alphabet",
			checkdigit: "Need atleast 1 digit"
			}
		},
		//   highlight: function(element) {
		//     var id_attr = "#" + $(element).attr("id") + "1";
		//     $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
		//     $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');
		//     $('.form-group').css('margin-bottom', '5px');
		//     $('.form').css('padding', '30px 40px');
		//     $('.tab-group').css('margin', '0 0 25px 0');
		//     $('.help-block').css('display', '');
		//   },
		//   unhighlight: function(element) {
		//     var id_attr = "#" + $(element).attr("id") + "1";
		//     $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
		//     $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');
		//     $('#confirmPassword').attr('disabled', false);
		//   },
		errorElement: 'span',
		errorClass: 'validate_cus',
		errorPlacement: function(error, element) {
			x = element.length;
			if (element.length) {
			error.insertAfter(element);
			} else {
			error.insertAfter(element);
			}
		}

	});


	/*validate LOGIN */
	$("#log_in").on("submit", (e)=>{
		let uname = $("#u_name");
		let passW = $("#pswdL");
		for (let key =0; key<users.length; key++) {
			if (users[key][0]==uname.val()) {
				if(users[key][1]==passW.val()){
					return true;
				}
				else{
					alert("wrong password!");
					return false;
				}				
			}
			else{
				alert("no such user name!");
				return false;
			}	
		}
	})

	/*validate SIGNUP */
	$("#sign_up").on("submit", (e)=>{
		let sign_upEmail = $("#sign_upEmail").val();
		let pswdS = $("#pswdS").val();
		let pswdSRepeat = $("#pswdSRepeat").val();	

		let signupStatus=0;
		if(!validateEmail(sign_upEmail)){
			signupStatus=0;
			alert("Hello! I am an alert box!!1");
			return false;
		}
		// if(validate(pswdS)){
		// 	signupStatus=0;
		// 	alert("Hello! I am an alert box!!2");
		// 	return false;
		// }
		// else if(!validate(pswdSRepeat)){
		// 	signupStatus=0;
		// 	alert("Hello! I am an alert box!!3");
		// 	return false;
		// }
		if(!validate()){
			signupStatus=0;
			alert("Hello! I am an alert box!!2");
			return false;
		}
		else if(!pswdSRepeat != pswdS){
			signupStatus=0;
			alert("Hello! I am an alert box!!4");
			return false;
		}
		else{ /* password is correct and ok */
			signupStatus=1;
			alert("Hello! I am an alert box!!5");
			let new_user = [sign_upEmail,pswdS]
			users.push(new_user)
			return true;
		}

	})

	//Start()
});

function openDialog() { 
	document.getElementById("myDialog").showModal(); 
} 

function closeDialog() { 
	document.getElementById("myDialog").close(); 
}


function Start() {
	//document.getElementById("whiteBG");
	// var canvas = document.getElementById('canvas'),
	// context = canvas.getContext("2d");
	// context.fillStyle = "white";
	// context.fillRect(0, 0, window.width, window.height);
	board = new Array();
	score = 0;
	pac_color = "yellow";
	monster_color = "red";
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (i == 0 && j == 0) {
				board[i][j] = 3;
				monShape = new Shape(i,j);
				continue;
			}
			if (
				(i == 2 && j == 3) ||
				(i == 2 && j == 4) ||
				(i == 4 && j == 6) ||
				(i == 8 && j == 3) ||
				(i == 8 && j == 2) ||
				(i == 7 && j == 2) ||
				(i == 4 && j == 7) ||
				(i == 6 && j == 8) ||
				(i == 6 && j == 8) ||
				(i == 1 && j == 8) ||
				(i == 2 && j == 8) ||
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 7 && j == 8) ||
				(i == 9 && j == 8)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					pacShape = new Shape(i,j);
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
		function (e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function (e) {
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
	if (keysDown[38]) {//up
		return 1;
	}
	if (keysDown[40]) {//down
		return 2;
	}
	if (keysDown[37]) {//left
		return 3;
	}
	if (keysDown[39]) {//right
		return 4;
	}
	else {
		return 0;
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
				context.arc(center.x, center.y, 30, dirctions_dict[dirction][0] * Math.PI, dirctions_dict[dirction][1] * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; 
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "blue"; //color - packman eye
				context.fill();
			} else if (board[i][j] == 1) {//food
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "#000";
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color - pills
				context.fill();
			} else if (board[i][j] == 4) {//wall
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; 
				context.fill();
			}
			else if (board[i][j] == 3) {//monster
				temp = GetKeyPressed();
				if (dirction == null && temp == 0) {
					dirction = 1;
				}
				if (temp != 0) {
					dirction = temp;
				}
				context.beginPath();
				context.arc(center.x, center.y, 30, dirctions_dict[dirction][0] * Math.PI, dirctions_dict[dirction][1] * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = monster_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5 - dirctions_dict[dirction][2], center.y - 15 + dirctions_dict[dirction][2], 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			}
		}
	}
	scoreAndTime()
}
class User {
	constructor(username, passward, score) {
		this.username = username;
		this.passward = passward;
		this.score = score;
	}
}
class Shape {
	constructor(i, j) {
		this.i = i;
		this.j = j;
	}
}
class monsterShape extends Shape {
	constructor(i, j) {
		super(i,j);
		this.visited = board;
	}
}
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
function PositionMove(dirction, Shape){
	if (dirction == 1) {
		if (Shape.j > 0 && board[Shape.i][Shape.j - 1] != 4) {
			Shape.j--;
			return true;
		}
	}
	if (dirction == 2) {
		if (Shape.j < 9 && board[Shape.i][Shape.j + 1] != 4) {
			Shape.j++;
			return true;
		}
	}
	if (dirction == 3) {
		if (Shape.i > 0 && board[Shape.i - 1][Shape.j] != 4) {
			Shape.i--;
			return true;
		}
	}
	if (dirction == 4) {
		if (Shape.i < 9 && board[Shape.i + 1][Shape.j] != 4) {
			Shape.i++;
			return true;
		}
	}
	else{
		return false;
	}
}
function sleep(milliseconds) {
	const date = Date.now();
	let currentDate = null;
	do {
	  currentDate = Date.now();
	} while (currentDate - date < milliseconds);
  }
function monsterWaze(monShape, pacShape, helpAlpha=0){
	// m = (monShape.i-pacShape.i)/(monShape.j-pacShape.j);
	// m = Math.abs(monShape.i-pacShape.i)/Math.abs(monShape.j-pacShape.j);
	alpha =(180*Math.atan2((monShape.j-pacShape.j),(monShape.i-pacShape.i))/Math.PI);
	// alpha =(180*Math.atan(m)/Math.PI);
	if (alpha<=0){
		alpha = 360 + alpha;
	}

	if(alpha >= 315 || alpha < 45){//RIGHT
		return 4;
	}
	if(alpha >= 45 && alpha < 135){//DOWN
		return 2;
	}
	if(alpha >= 135 && alpha < 225){//left
		return 3;
	}
	if(alpha >= 225 &&   alpha < 315){//UP
		return 1;
	}
}

function UpdatePosition() {
	let helpAlpha = 0;
	oldPacShape = new Shape(pacShape.i,pacShape.j)
	oldMonShape = new Shape(monShape.i,monShape.j)

	let x = GetKeyPressed();
	PositionMove(x,pacShape);
	// let monX = getRandomInt(1,5);
	let monX = monsterWaze(pacShape,oldMonShape);
	let mooved = PositionMove(monX,monShape);

	while(!mooved){
		pssibleDirections.splice(monX-1,monX-1);
		monX = pssibleDirections[Math.floor(Math.random() * pssibleDirections.length)];	
		mooved = PositionMove(monX,monShape);
	}
	pssibleDirections = [1,2,3,4];

	helpAlpha = 0;
	if (board[pacShape.i][pacShape.j] == 1) {
		score++;
		ate = true;
	}

	if (board[monShape.i][monShape.j] == 2) {
		score= Math.max(score-10, 0);
		let revers;//back direction
		if (monX%2==0){
			revers = monX-1;
		}
		else{
			revers = monX+1;
		}
		PositionMove(revers,monShape);
		failCounter++;
		if(failCounter<6){
			monShape.i = 0;			
			monShape.j = 0;				
		}
	}
	if (board[pacShape.i][pacShape.j] == 3) {
		score= Math.max(score-10, 0);
		let revers;//back direction
		if (x%2==0){
			revers = x-1;
		}
		else{
			revers = x+1;
		}
		PositionMove(revers,pacShape);
		failCounter++;
		if(failCounter<6){
			monShape.i = 0;			
			monShape.j = 0;			
		}
	}

	board[oldPacShape.i][oldPacShape.j] = 0;
	if(was_food){
		board[oldMonShape.i][oldMonShape.j] = 1;
		was_food =false;
	}
	else{
		board[oldMonShape.i][oldMonShape.j] = 0;
	}
	if(board[monShape.i][monShape.j]==1){
		was_food = true;
	}
	board[pacShape.i][pacShape.j] = 2;
	board[monShape.i][monShape.j] = 3;
	


	
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		currentUser.score = score;
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}







// Defining a function to display error message
// function printError(elemId, hintMsg) {
//     document.getElementById(elemId).innerHTML = hintMsg;
// }

// // Defining a function to validate form 
// function validateForm() {
//     // Retrieving the values of form elements 
//     var name = document.contactForm.name.value;
//     var email = document.contactForm.email.value;
//     var mobile = document.contactForm.mobile.value;
//     var country = document.contactForm.country.value;
//     var gender = document.contactForm.gender.value;
//     var hobbies = [];
//     var checkboxes = document.getElementsByName("hobbies[]");
//     for(var i=0; i < checkboxes.length; i++) {
//         if(checkboxes[i].checked) {
//             // Populate hobbies array with selected values
//             hobbies.push(checkboxes[i].value);
//         }
//     }
    
// 	// Defining error variables with a default value
//     var nameErr = emailErr = mobileErr = countryErr = genderErr = true;
    
//     // Validate name
//     if(name == "") {
//         printError("nameErr", "Please enter your name");
//     } else {
//         var regex = /^[a-zA-Z\s]+$/;                
//         if(regex.test(name) === false) {
//             printError("nameErr", "Please enter a valid name");
//         } else {
//             printError("nameErr", "");
//             nameErr = false;
//         }
//     }
    
//     // Validate email address
//     if(email == "") {
//         printError("emailErr", "Please enter your email address");
//     } else {
//         // Regular expression for basic email validation
//         var regex = /^\S+@\S+\.\S+$/;
//         if(regex.test(email) === false) {
//             printError("emailErr", "Please enter a valid email address");
//         } else{
//             printError("emailErr", "");
//             emailErr = false;
//         }
//     }
    
//     // Validate mobile number
//     if(mobile == "") {
//         printError("mobileErr", "Please enter your mobile number");
//     } else {
//         var regex = /^[1-9]\d{9}$/;
//         if(regex.test(mobile) === false) {
//             printError("mobileErr", "Please enter a valid 10 digit mobile number");
//         } else{
//             printError("mobileErr", "");
//             mobileErr = false;
//         }
//     }
    
//     // Validate country
//     if(country == "Select") {
//         printError("countryErr", "Please select your country");
//     } else {
//         printError("countryErr", "");
//         countryErr = false;
//     }
    
//     // Validate gender
//     if(gender == "") {
//         printError("genderErr", "Please select your gender");
//     } else {
//         printError("genderErr", "");
//         genderErr = false;
//     }
    
//     // Prevent the form from being submitted if there are any errors
//     if((nameErr || emailErr || mobileErr || countryErr || genderErr) == true) {
//        return false;
//     } else {
//         // Creating a string from input data for preview
//         var dataPreview = "You've entered the following details: \n" +
//                           "Full Name: " + name + "\n" +
//                           "Email Address: " + email + "\n" +
//                           "Mobile Number: " + mobile + "\n" +
//                           "Country: " + country + "\n" +
//                           "Gender: " + gender + "\n";
//         if(hobbies.length) {
//             dataPreview += "Hobbies: " + hobbies.join(", ");
//         }
//         // Display input data in a dialog box before submitting the form
//         alert(dataPreview);
// 		Start();
//     }
// };
