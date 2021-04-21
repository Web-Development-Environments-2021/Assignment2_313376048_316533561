var context;
var shape;
var board;
var score =0 ;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var intervalMon;

var keyArrowUp ;
var keyArrowDown ;
var keyArrowLeft ;
var keyArrowRight ;
var users_dict = { 'k' : 'k'} // {username : password}


var pacShape;
var monShape1;

var monster1_color;
var monster2_color;	
var monster3_color;	
var monster4_color;
var time_elapsed;
let dirction;
var dirctions_dict = { 1: [-0.35, 1.35, 17], 2: [-1.35, 0.35, 17], 3: [-0.85, 0.85, 0], 4: [0.15, 1.85, 0] }
var currentUser  = new Object();
let ate =false;
let failCounter = 0;
let was_food = false;
let pssibleDirections = [1,2,3,4]; //1=up 2= down 3= left 4 =right
let arrowsKeys = [-1, -1, -1, -1]; // up, down, left, right
let userLogedin;
let figuere_array = [];



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
			userLogedin = user;
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
	for (var i = 0; i < arrowsKeys.length; i++) {
		if(arrowsKeys[i] === event.keyCode){
			error.innerHTML = "<span style='color: red;'>"+
                        "You chose this key allready</span>"
			//document.getElementsById(lbl).error("You chose this key allready")
			//arrowsKeys[i]=null;
			return false;
		}
		else{
			error.innerHTML = "";
		}
	}
	if(lbl === 'up_btn'){
		keyArrowUp = event.key;
		document.getElementById("up_btn").innerHTML = keyArrowUp;
		arrowsKeys[0]= event.keyCode;
	}
	else if(lbl === 'down_btn'){
		keyArrowDown = event.key;
		document.getElementById("down_btn").innerHTML = keyArrowDown;
		arrowsKeys[1]= event.keyCode;
	}
	else if(lbl === 'left_btn'){
		keyArrowLeft = event.key;
		document.getElementById("left_btn").innerHTML = keyArrowLeft;
		arrowsKeys[2]= event.keyCode;
	
	}
	else if(lbl === 'right_btn'){
		keyArrowRight = event.key;
		document.getElementById("right_btn").innerHTML = keyArrowRight;
		arrowsKeys[3]= event.keyCode;
	}	
	

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
	$('#footer_left').hide();
	$('#LOGIN').hide();
	$('#centerSignUp').hide();
	$('#centerLogIn').hide();
	$('#game').hide();
	$('#configuration').hide();
	$('#about').hide();
	$('#config').hide();


	$('#' + Div_id).show();

	// if((Div_id === 'SIGNUP')||(Div_id === 'configuration')
	// 	||(Div_id === 'centerSignUp'))
	// $('#footer_center').hide();
	// $('#footer_right').show();

	if(!(Div_id === 'game')){
		$('#footer_center').show ();
		$('#footer_right').hide();
	}

	if(Div_id === 'game'){
		Start();
		DrawSettings();	
		$('#footer_center').hide();
		$('#footer_right').show();
	
	}
	else if(Div_id === 'Random_game'){
		$('#game').show();
		//$('#settings').show();

		setRandomData();
		// Start();
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
	arrowsKeys[0]= 38; // up
	arrowsKeys[1]= 40; // down
	arrowsKeys[2]= 39; // left
	arrowsKeys[3]= 37; // right
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
	// buttons
	document.getElementById("up_btn_display").value = keyArrowUp;
	document.getElementById("down_btn_display").value = keyArrowDown;
	document.getElementById("left_btn_display").value = keyArrowLeft;
	document.getElementById("right_btn_display").value = keyArrowRight;

	//balls
	document.getElementById("nBalls").value = document.getElementById("myRange").value;

	// points color per food
	document.getElementById("food_5").value = document.getElementById("five_point_color_id").value;
	document.getElementById("food_5").disabled = true;
	document.getElementById("food_15").value = document.getElementById("fifteen_point_color_id").value;
	document.getElementById("food_15").disabled = true;
	document.getElementById("food_25").value = document.getElementById("twenty_five_point_color_id").value;
	document.getElementById("food_25").disabled = true;

	// time
	document.getElementById("time_display").value = document.getElementById("TotalTime").value;

	// number of monsters
	document.getElementById("monster_display").value = displayRadioValue();

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


function Start(over = false) {
    document.getElementById("playerName").innerHTML = userLogedin;
    if (!over) {
        board = new Array();
        var cnt = 100;
        var food_remain = 50;
        var food1_remain = 0.6 * food_remain;
        var food2_remain = 0.3 * food_remain;
        var food3_remain = 0.1 * food_remain;
        start_time = new Date();
    }
    score = 0;
    pac_color = "yellow";
    monster1_color = "red";
    monster2_color = "white";
    monster3_color = "black";
    monster4_color = "gray";
    mon_color_array = [monster1_color, monster2_color, monster3_color, monster4_color];
	monsterNumber = displayRadioValue(); // get monster number from radio buttons
	monsterArray = [0,0,0,0];
	for( var i=0 ; i < monsterNumber; i++){
		monsterArray[i] = 1;
	}
	
    var pacman_remain = 1;
    for (var i = 0; i < 10; i++) {
        if (!over) {
            board[i] = new Array();
        }
        //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
        for (var j = 0; j < 10; j++) {
            if ((i == 0 && j == 0) && (monsterArray[0] == 1))  {
                if (over) {
                    oldMonShape1 = new Shape(monShape1.i, monShape1.j, monShape1.color, monShape1.number)
                    monShape1.i = i;
                    monShape1.j = j;
                    ClearAfterMonster(oldMonShape1, monShape1);
                } else {
                    monShape1 = new Shape(i, j, monster1_color, 3, 0, 0);
					board[i][j] = 3;
					figuere_array.push(monShape1);
                }
                
                continue;
            }
            if ((i == 0 && j == 9) && (monsterArray[1] == 1)) {
                if (over) {
                    oldMonShape2 = new Shape(monShape2.i, monShape2.j, monShape2.color, monShape2.number)
                    monShape2.i = i;
                    monShape2.j = j;
                    ClearAfterMonster(oldMonShape2, monShape2);
                } else {
                    monShape2 = new Shape(i, j, monster2_color, 5, 0, 9);
                    board[i][j] = 5;
					figuere_array.push(monShape2);
                }
                continue;
            }
            if ((i == 9 && j == 0) && (monsterArray[2] == 1)) {
                if (over) {
                    oldMonShape3 = new Shape(monShape3.i, monShape3.j, monShape3.color, monShape3.number)
                    monShape3.i = i;
                    monShape3.j = j;
                    ClearAfterMonster(oldMonShape3, monShape3);
                } else {
                    monShape3 = new Shape(i, j, monster3_color, 6, 9, 0);
                    board[i][j] = 6;
					figuere_array.push(monShape3);
                }
                continue;
            }
            if ((i == 9 && j == 9) && (monsterArray[3] == 1)) {
                if (over) {
                    oldMonShape4 = new Shape(monShape4.i, monShape4.j, monShape4.color, monShape4.number)
                    monShape4.i = i;
                    monShape4.j = j;
                    ClearAfterMonster(oldMonShape4, monShape4);
                } else {
                    monShape4 = new Shape(i, j, monster4_color, 7, 9, 9);
                    board[i][j] = 7;
					figuere_array.push(monShape4);
                }
                continue;
            }
            if (
                (i == 1 && j == 6) ||
                (i == 2 && j == 2) ||
                (i == 2 && j == 3) ||
                (i == 2 && j == 4) ||
                (i == 2 && j == 6) ||
                (i == 2 && j == 8) ||
                (i == 3 && j == 2) ||
                (i == 3 && j == 6) ||
                (i == 3 && j == 8) ||
                (i == 4 && j == 2) ||
                (i == 4 && j == 4) ||
                (i == 4 && j == 6) ||
                (i == 4 && j == 8) ||
                (i == 4 && j == 9) ||
                (i == 5 && j == 4) ||
                (i == 6 && j == 2) ||
                (i == 6 && j == 3) ||
                (i == 6 && j == 4) ||
                (i == 6 && j == 5) ||
                (i == 6 && j == 7) ||
                (i == 6 && j == 8) ||
                (i == 6 && j == 9) ||
                (i == 7 && j == 5) ||
                (i == 8 && j == 1) ||
                (i == 8 && j == 2) ||
                (i == 8 && j == 7) ||
                (i == 8 && j == 8) ||
                (i == 9 && j == 5)
            ) {
                board[i][j] = 4;
            } else {
                var randomNum = Math.random();
                if (randomNum <= (1.0 * food_remain) / cnt && !over) {
                    food_remain--;
                    if (randomNum <= (1.0 * food1_remain) / food_remain) {
                        food1_remain--;
                        board[i][j] = 1;
                    } else if (randomNum <= (1.0 * food2_remain) / food_remain) {
                        food2_remain--;
                        board[i][j] = 8;
                    } else if (randomNum <= (1.0 * food3_remain) / food_remain) {
                        food3_remain--;
                        board[i][j] = 9;
                    }
                } else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
                    pacShape = new Shape(i, j, pac_color, 2, i, j);
					figuere_array.push(pacShape);
                    pacman_remain--;
                    board[i][j] = 2;
                } else {
                    if (!over) {
                        board[i][j] = 0;
                    }
                }
                cnt--;
            }
        }
    }
    // figuere_array = [pacShape, monShape1, monShape2, monShape3, monShape4];
    if (!over) {
        while (food1_remain > 0) {
            var emptyCell = findRandomEmptyCell(board);
            board[emptyCell[0]][emptyCell[1]] = 1;
            food_remain--;
            food1_remain--;
        }
        while (food2_remain > 0) {
            var emptyCell = findRandomEmptyCell(board);
            board[emptyCell[0]][emptyCell[1]] = 8;
            food_remain--;
            food2_remain--;
        }
        while (food3_remain > 0) {
            var emptyCell = findRandomEmptyCell(board);
            board[emptyCell[0]][emptyCell[1]] = 9;
            food_remain--;
            food3_remain--;
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
        intervalMon = setInterval(UpdateMonPosition, 1000);
    }
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
    if (keysDown[arrowsKeys[0]]) { //up
        return 1;
    }
    if (keysDown[arrowsKeys[1]]) { //down
        return 2;
    }
    if (keysDown[arrowsKeys[2]]) { //left
        return 3;
    }
    if (keysDown[arrowsKeys[3]]) { //right
        return 4;
    } else {
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
            if (board[i][j] == 2) { //pacman
                DrawFiguere(center, pac_color)
            } else if (board[i][j] == 1) { //food1 = 5 points
                DrawFood(center, document.getElementById("food_5").value)
            } else if (board[i][j] == 8) { //food2 = 15 points
                DrawFood(center, document.getElementById("food_15").value)
            } else if (board[i][j] == 9) { //food3 = 25 points
                DrawFood(center, document.getElementById("food_25").value)
            } else if (board[i][j] == 4) { //wall
                context.beginPath();
                context.rect(center.x - 30, center.y - 30, 60, 60);
                context.fillStyle = "grey";
                context.fill(); 
            } else if ((board[i][j] == 3) && (monsterArray[0])) { //monster
                DrawFiguere(center, monster1_color)

            } else if ((board[i][j] == 5) && (monsterArray[1])) { //monster
                DrawFiguere(center, monster2_color)

            } else if ((board[i][j] == 6) && (monsterArray[2])) { //monster
                DrawFiguere(center, monster3_color)

            } else if ((board[i][j] == 7) && (monsterArray[3])) { //monster
                DrawFiguere(center, monster4_color)
            }
        }
    }
}

function DrawFood(center, color) {
    context.beginPath();
    context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
    context.fillStyle = color;
    context.fill();
}

function DrawFiguere(center, color) {
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
    context.fillStyle = color; //color
    context.fill();
    context.beginPath();
    context.arc(center.x + 5 - dirctions_dict[dirction][2], center.y - 15 + dirctions_dict[dirction][2], 5, 0, 2 * Math.PI); // circle
    context.fillStyle = "black"; //color
    context.fill();
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function PositionMove(dirction, Shape) {
    if (dirction == 1) { //up
        if (Shape.j > 0 && board[Shape.i][Shape.j - 1] != 4) {
            Shape.j--;
            return true;
        }
    }
    if (dirction == 2) { //down
        if (Shape.j < 9 && board[Shape.i][Shape.j + 1] != 4) {
            Shape.j++;
            return true;
        }
    }
    if (dirction == 3) { //right
        if (Shape.i > 0 && board[Shape.i - 1][Shape.j] != 4) {
            Shape.i--;
            return true;
        }
    }
    if (dirction == 4) { //left
        if (Shape.i < 9 && board[Shape.i + 1][Shape.j] != 4) {
            Shape.i++;
            return true;
        }
    } else {
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

function monsterWaze(monShape, pacShape) {
    // m = (monShape.i-pacShape.i)/(monShape.j-pacShape.j);
    // m = Math.abs(monShape.i-pacShape.i)/Math.abs(monShape.j-pacShape.j);
    alpha = (180 * Math.atan2((monShape.j - pacShape.j), (monShape.i - pacShape.i)) / Math.PI);
    // alpha =(180*Math.atan(m)/Math.PI);
    if (alpha <= 0) {
        alpha = 360 + alpha;
    }

    if (alpha >= 315 || alpha < 45) { //RIGHT
        return 4;
    }
    if (alpha >= 45 && alpha < 135) { //DOWN
        return 2;
    }
    if (alpha >= 135 && alpha < 225) { //left
        return 3;
    }
    if (alpha >= 225 && alpha < 315) { //UP
        return 1;
    }
}

function MoveBack(shape, X) {
    let revers; //back direction
    if (X % 2 == 0) {
        revers = X - 1;
    } else {
        revers = X + 1;
    }
    PositionMove(revers, shape);
}

function HandleCollision(shape, x) {
    for (k = 0; k < figuere_array.length; k++) {
        s = figuere_array[k];
        if (shape !== s) {
            if (board[shape.i][shape.j] == s.number) {
                if (s.number == 2 || shape.number == 2) {
                    if (failCounter < 6) {
                        Start(true);
                    }
                    failCounter++;
                    score = Math.max(score - 10, 0);
                } else {
                    MoveBack(shape, x);
                }
            }
        }
    }
}

function ClearAfterMonster(oldMonShape, monShape) {
    if (monShape.hover_food > 0) {
        board[oldMonShape.i][oldMonShape.j] = monShape.hover_food;
        monShape.hover_food = 0;
    } else {
        board[oldMonShape.i][oldMonShape.j] = 0;
    }
    if (board[monShape.i][monShape.j] == 1 || board[monShape.i][monShape.j] == 8 || board[monShape.i][monShape.j] == 9) {
        monShape.hover_food = board[monShape.i][monShape.j];
    }
    board[monShape.i][monShape.j] = monShape.number;
}

function MoveMonster(oldPacShape, oldMonShape, monShape) {
    let monX = monsterWaze(oldPacShape, oldMonShape);
    let moved = PositionMove(monX, monShape);
    ClearAfterMonster(oldMonShape, monShape);
    while (!moved) {
        pssibleDirections.splice(monX - 1, monX - 1);
        monX = pssibleDirections[Math.floor(Math.random() * pssibleDirections.length)];
        moved = PositionMove(monX, monShape);
        ClearAfterMonster(oldMonShape, monShape);
    }
    pssibleDirections = [1, 2, 3, 4];
    HandleCollision(monShape, monX);
}

function UpdateMonPosition() {
	if (monsterArray[0]) { //monster
		oldMonShape1 = new Shape(monShape1.i, monShape1.j, monShape1.color, monShape1.number);
   		MoveMonster(oldPacShape, oldMonShape1, monShape1);
	}

	if (monsterArray[1]) { //monster
		oldMonShape2 = new Shape(monShape2.i, monShape2.j, monShape2.color, monShape2.number);
    	MoveMonster(oldPacShape, oldMonShape2, monShape2);
	}

	if (monsterArray[2]) { //monster
		oldMonShape3 = new Shape(monShape3.i, monShape3.j, monShape3.color, monShape3.number);
    	MoveMonster(oldPacShape, oldMonShape3, monShape3);
	}

	if (monsterArray[3]) { //monster
		oldMonShape4 = new Shape(monShape4.i, monShape4.j, monShape4.color, monShape4.number);
    	MoveMonster(oldPacShape, oldMonShape4, monShape4);
	}
}

function UpdatePosition() {
    oldPacShape = new Shape(pacShape.i, pacShape.j)
    let x = GetKeyPressed();
    PositionMove(x, pacShape);
    HandleCollision(pacShape, x);
    board[oldPacShape.i][oldPacShape.j] = 0;
    if (board[pacShape.i][pacShape.j] == 1) {
        score += 5;
    } else if (board[pacShape.i][pacShape.j] == 8) {
        score += 15;
    } else if (board[pacShape.i][pacShape.j] == 9) {
        score += 25;
    }
    board[pacShape.i][pacShape.j] = 2;
    var currentTime = new Date();
    time_elapsed = (currentTime - start_time) / 1000;
    if (score >= 20 && time_elapsed <= 10) {
        pac_color = "green";
    }
    if (failCounter > 5 || time_elapsed > document.getElementById("TotalTime").value) {
        currentUser.score = score;
        window.clearInterval(interval);
        window.clearInterval(intervalMon);
        alert("Game completed");
    } else {
        Draw();
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
    constructor(i, j, color, number, start_i, start_j, hover_food = 0) {
        this.i = i;
        this.j = j;
        this.color = color;
        this.number = number;
        this.start_i = start_i;
        this.start_j = start_j;
        this.hover_food = hover_food;
    }
}