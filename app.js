var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;

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
let pssibleDirections = [1,2,3,4]; //1=up 2= down 3= left 4 =right
let arrowsKeys = [];




$(document).ready(function() {
	context = canvas.getContext("2d");
	context.fillStyle = "pink"
	context.fillRect(0, 0, canvas.width, canvas.height);
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
			switchDives('configuration');
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
				minlength: 2,
				usernameisExist: true,
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
				minlength: "Your username must consist of at least 2 characters",
				usernameisExist: "These user Name is allready exist please choose other user Name"

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
			email: {
				email:"Please enter a valid email address"
			},
		},
		submitHandler: function() {
			addUser();
		}
	});


	// validate signup form on keyup and submit
	$("#configuration").validate({
		rules: {
			inputup_btn: {
				required: true,
				notEqual : '#inputdown_btn',
				notEqual : '#inputleft_btn',
				notEqual : '#inputright_btn',
			},
			inputdown_btn: {
				required: true,
				notEqual : '#inputup_btn',
				notEqual : '#inputleft_btn',
				notEqual : '#inputright_btn',
			},
			inputleft_btn: {
				required: true,
				notEqual : '#inputup_btn',
				notEqual : '#inputdown_btn',
				notEqual : '#inputright_btn',
			},
			inputright_btn: {
				required: true,
				notEqual : '#inputup_btn',
				notEqual : '#inputdown_btn',
				notEqual : '#inputleft_btn',				
			},			
		},
		messages: {
			inputup_btn: {
				required: "Please chosse key",
				notEqual: "You chose this key allready"				
			},			
			inputdown_btn: {
				required: "Please chosse key",
				notEqual: "You chose this key allready"			
			},
			inputleft_btn: {
				required: "Please chosse key",
				notEqual: "You chose this key allready"
			},
			inputright_btn: {
				required: "Please chosse key",
				notEqual: "You chose this key allready"
			},
		},
		submitHandler: function() {
			switchDives('game');
		}
	});
});

$(function(){

	// //check if key all ready choosen
	// $.validator.addMethod('keysHasChosse', function () {		
	// 	if(keyArrowUp ===  keyArrowDown)

	// 	keyArrowUp = "ArrowUp";
	// 	keyArrowDown = "ArrowDown";
	// 	keyArrowLeft = "ArrowLeft";
	// 	keyArrowRight = "ArrowRight";
	// });

	$.validator.addMethod("notEqual", function(value, param) {
		return value != $(param).val();
	});

	//Password must contain at least 6 digit, number ,char.
	$.validator.addMethod('strongPassword', function (value, element) {		
		return this.optional(element) || /\d/.test(value) && /[a-z]/i.test(value);
	});


	//check if username already exists
	$.validator.addMethod('usernameisExist', function (value, element) {
		for(var  usernameKey in users_dict){
			if(usernameKey === value)
			return false;	
		}
		return true;	
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
		switchDives('configuration');
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
	var error = document.getElementById(lbl)
	for (var i = 0; i < 4; i++) {
		if(arrowsKeys[i] === event.keyCode){
			error.innerHTML = "<span style='color: red;'>"+
                        "You chose this key allready</span>"
			//document.getElementsById(lbl).error("You chose this key allready")
			//arrowsKeys[i]=null;
			return false;
		}
	}
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
	arrowsKeys.push(event.keyCode)

}

function pressX(){
	document.getElementById('LOGIN').style.display='none';
	document.getElementById('SIGNUP').style.display='none';
	document.getElementById('configuration').style.display='none';
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
	$('#configuration').hide();
	$('#about').hide();
	$('#config').hide();


	$('#' + Div_id).show();

	if(Div_id === 'game'){
		Start();
		DrawSettings();		
	}
	else if(Div_id === 'Random_game'){
		$('#game').show();
		//$('#settings').show();

		setRandomData();
		Start();
		DrawSettings();
	}
}

function setRandomData(){
	setkeysForGame();
	setBallsNmber();
	setPointsColor();
	setTotalTime();
	setNumberOfMonsters();
}


function setkeysForGame(){
	keyArrowUp = "ArrowUp";
	keyArrowDown = "ArrowDown";
	keyArrowLeft = "ArrowLeft";
	keyArrowRight = "ArrowRight";
}

function setBallsNmber(){
	document.getElementById("myRange").value = Math.floor(Math.random() * 90) + 50;
}

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
	  color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
  }

function setPointsColor(){
	 document.getElementById("five_point_color_id").value = getRandomColor();
	 document.getElementById("fifteen_point_color_id").value = getRandomColor();
	 document.getElementById("twenty_five_point_color_id").value = getRandomColor();
}


function setTotalTime(){
	document.getElementById("TotalTime").value = Math.floor(Math.random() * 360) + 60;
}

function setNumberOfMonsters(){
	
	var index = Math.floor(Math.random() * 4) + 1;  // returns a random integer from 1 to 4
	
	document.getElementsByName('monster')[index-1].value = index;
	document.getElementsByName('monster')[index-1].checked = true;
}



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

function Draw() {
	canvas.width = canvas.width; //clean board
	context.fillStyle = "pink"
	context.fillRect(0, 0, canvas.width, canvas.height);
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {//pacman
				let temp = GetKeyPressed();
				if (dirction == null && temp == 0) {
					dirction = 1;
				}
				if (temp != 0) {
					dirction = temp;
				}
				context.beginPath();
				context.arc(center.x, center.y, 30, dirctions_dict[dirction][0] * Math.PI, dirctions_dict[dirction][1] * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; 
				context.fill();
				context.beginPath();
				context.arc(center.x + 5 - dirctions_dict[dirction][2], center.y - 15 + dirctions_dict[dirction][2], 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; 
				context.fill();
			} else if (board[i][j] == 1) {//food
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; 
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