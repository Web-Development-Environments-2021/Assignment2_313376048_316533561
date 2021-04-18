var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var PackmanScore;
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

	/* Date Picker */
	$( function() {
		$( "#Bday" ).datepicker();
	} );

	function checkletters(value){
		return /[a-z]/.test(value) || /[a-z]/.test(value);
	}

	function checkdigit(value){
		return /[0-9]/.test(value);
	}

	// Validate User Full Name
	$('#usercheck').hide();	
	let usernameError = true;
	$('#allName').keyup(function () {
		validateUsername();
	});

	function validateUsername() {
		let usernameValue = $('#allName').val();
		if (usernameValue.length == '') {
		$('#usercheck').show();
			usernameError = false;
			return false;
		}
		else if(checkdigit(usernameValue)){
			$('#usercheck').show();
			$('#usercheck').html("**Full name must contain only letters");
			usernameError = false;
			return false;
		}else {
			$('#usercheck').hide();
		}
	}

	// Validate Email
	const email = document.getElementById('sign_upEmail');
	email.addEventListener('blur', ()=>{
	let regex =	/^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
	let s = email.value;
	if(regex.test(s)){
	email.classList.remove(
			'is-invalid');
	emailError = true;
	}
	else{
		email.classList.add(
			'is-invalid');
		emailError = false;
	}
	})

	// Validate Password
	$('#passcheck').hide();
	let passwordError = true;
	$('#pswdS').keyup(function () {
		validatePassword();
	});
	function validatePassword() {
	let passwrdValue =
		$('#pswdS').val();
	if (passwrdValue.length == '') {
		$('#passcheck').show();
		passwordError = false;
		return false;
	}
	if ((passwrdValue.length < 6)||
		(passwrdValue.length > 10)) {
		$('#passcheck').show();
		$('#passcheck').html
	("**length of your password must be between 6 and 10");
		$('#passcheck').css("color", "red");
		passwordError = false;
		return false;
	} 
	else if(!checkletters(passwrdValue)) {
		$('#passcheck').show();
		$('#passcheck').html
	("**your password must contain letters!");
		$('#passcheck').css("color", "red");
		passwordError = false;
		return false;
	}

	else if(!checkdigit(passwrdValue)) {
		$('#passcheck').show();
		$('#passcheck').html
	("**your password must contain digits!");
		$('#passcheck').css("color", "red");
		passwordError = false;
		return false;
	}

	else {
		$('#passcheck').hide();
	}
	}

	// Validate Confirm Password
	$('#conpasscheck').hide();
	let confirmPasswordError = true;
	$('#pswdSRepeat').keyup(function () {
	validateConfirmPasswrd();
	});
	function validateConfirmPasswrd() {
	let confirmPasswordValue =
		$('#pswdSRepeat').val();
	let passwrdValue =
		$('#pswdS').val();
	if (passwrdValue != confirmPasswordValue) {
		$('#conpasscheck').show();
		$('#conpasscheck').html(
			"**Password didn't Match");
		$('#conpasscheck').css(
			"color", "red");
		confirmPasswordError = false;
		return false;
	} else {
		$('#conpasscheck').hide();
	}
	}

	// Submitt button
	$('.signupbtn').click(function () {
		validateUsername();
		validatePassword();
		validateConfirmPasswrd();
		validateEmail();
		if ((usernameError == true) &&
			(passwordError == true) &&
			(confirmPasswordError == true) &&
			(emailError == true)) {
				new_user[0] = $("#user_name").val();
				new_user[1] = $("#pswdS").val();
				new_user[2] = $("#allName").val();
				new_user[3] = $("#sign_upEmail").val();
				new_user[4] = $("#Bday").val();
				users.push(new_user);
			return true;
		} else {
			return false;
		}
	});

	//Start()
});

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