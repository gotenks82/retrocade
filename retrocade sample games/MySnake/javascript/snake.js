var snake;
var speed = 0;
var playfield = {};
var width = 10;
var height = 10;
var up = 38;
var down = 40;
var left = 37;
var right = 39;
var ALIVE = 1;
var DEAD = 0;
var direction = right;
var movement;
var apple = {};
var key_cell = function(i,j){
  // some cool hashing
  return i+ "-" + j; // just an example
};

/*
37 - left

38 - up

39 - right

40 - down
*/
function prepareField(x,y){
	var parent = $("#playfield");
	tbl  = document.createElement('table');
	for(var i = 0; i < x; i++){
        var tr = tbl.insertRow(-1);
        for(var j = 0; j < y; j++){
            playfield[key_cell(i,j)] = $(tr.insertCell(-1));
        }
    }
    parent.prepend(tbl);
	parent.css('width',parent.find('table').css('width'));
}

function createSnake(n){
	snake = new Array();
	snake[0] = ({x: (height/2), y: 0 });
	for(var i=0; i<n-1; i++){
		grow();
	}
	placeApple()
}

function grow(){
	snake.push({x:'',y:''});
}

function placeApple(){
	var x;
	var y;
	var start = Date.now();
	var now;
	do{
		x = Math.floor(Math.random()*height);
		y = Math.floor(Math.random()*width);
		now = Date.now();
	}while(checkCollision(x,y) && (now - start) > 1000);
	
	apple.x = x;
	apple.y = y;
	if(playfield[key_cell(x,y)] == undefined){
		alert("x:"+x+",y:"+y);
	}
	playfield[key_cell(x,y)].removeClass().addClass("apple");
}

function checkCollision(x,y){
	for(var i=0; i<snake.length; i++){
		if(snake[i].x == x && snake[i].y == y) return true;
	}
	return false;
}

function move(){
	clearSnake();
	var temp_x, temp_y;
	var next_x;
	var next_y;
	var prev_x = snake[0].x;
	var prev_y = snake[0].y;
	for(var i=0; i<snake.length; i++){
		if(i==0){
			prev_x = snake[0].x;
			prev_y = snake[0].y;
			next_x = prev_x;
			next_y = prev_y;
			switch(direction){
				case up:
				if(snake[0].x == 0){
					next_x = height-1;
				}else{
					next_x = (prev_x - 1)%height
				};
				break;
				case down:
					next_x = (prev_x + 1)%height;
				break;
				case left:
				if(snake[0].y == 0){
					next_y = width-1;
				}else{
					next_y = (prev_y - 1)%width;
				};
				break;	
				case right:
					next_y = (prev_y + 1)%width;
				break;
			}
			if (checkCollision(next_x,next_y)){
				clearInterval(movement);
				renderSnake(DEAD);
				return;
			}
			snake[0].x = next_x;
			snake[0].y = next_y;
		}else{
			next_x = snake[i].x;
			next_y = snake[i].y;
			snake[i].x = prev_x;
			snake[i].y = prev_y;
			prev_x = next_x;
			prev_y = next_y;
		}
	}
	
	renderSnake(ALIVE);
	if(checkCollision(apple.x,apple.y)){
		grow();
		placeApple();
	}

}

function clearSnake(){
	for(var i=0; i<snake.length; i++){
		jCell = playfield[key_cell(snake[i].x,snake[i].y)];
		if(jCell != undefined){
			jCell.removeClass();
		}
	}
}

function renderSnake(state){
	for(var i=0; i<snake.length; i++){
		jCell = playfield[key_cell(snake[i].x,snake[i].y)];
		if(jCell != undefined){
			jCell.removeClass();
			switch(i){
				case 0:
				jCell.addClass("snakeHead");
				if(state == DEAD) jCell.addClass("dead");
				break;
				
				case (snake.length-1):
				jCell.addClass("snakeTail");
				if(state == DEAD) jCell.addClass("dead");
				break;
				
				default:
				jCell.addClass("snakeBody");
				if(state == DEAD) jCell.addClass("dead");
			}
		}
	}
}

function changeDirection(e){
	if(e.keyCode >= left && e.keyCode <= down) direction = e.keyCode;
}
snakegame = function(){
	//alert("snaaaake");
	prepareField(width,height);
	createSnake(5);
	$(document).keydown(function(e){
		changeDirection(e);
	});
	movement = setInterval(function () {
			move();			
	}, 500);
}
