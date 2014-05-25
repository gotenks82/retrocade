var playfield = {};
var movement;
var velocity = {};
var banana;
var initial_x = 20;
var initial_y = 240;
var gorilla1;
var gorilla2;
var s_width = 800;
var s_height = 480;
var n_buildings = 10;
var window_h = 30;
var window_l = 20;
var window_spacing = window_h*1.5;
var door_h = 40;
var door_l = 30;
var gorilla_width = 70;
var gorilla_height = 100;
var currentGorilla;
var stageObjects;
var buildings;
var windows;
var banana_pointer;
var explosion;
var games = 0;

var colors = ['CadetBlue', 'DarkGray', 'Coral', 'DarkOliveGreen', 'PaleTurquoise', 'PeachPuff', 'Khaki', 'AntiqueWhite'];

/** DOM Image objects */
var explosionObj;
var doorObj;
var windowObj;
var pointerObj;
var sunObj;
var skyObj;
var idle_gorilla;
var throwing_gorilla = new Array();
var win_gorilla;
var loser_gorilla;
var bananaObj;
var totalImages = 12;
var loadedImages = 0;
/** canvas layers*/
var stage;
var layer;
var bananaLayer;
var backgroundLayer;

function loadImages(){
	explosionObj = new Image();
	explosionObj.onload = imageLoaded;
	explosionObj.src = getImgPath('explosion.png');
	pointerObj = new Image();
	pointerObj.onload = imageLoaded;
	pointerObj.src = getImgPath('pointer.png');
	sunObj = new Image();
	sunObj.onload = imageLoaded;
	sunObj.src = getImgPath('sun.png');
	skyObj = new Image();
	skyObj.onload = imageLoaded;
	skyObj.src = getImgPath('sky_gradient.png');
	windowObj = new Image();
	windowObj.onload = imageLoaded;
	windowObj.src = getImgPath('Bay_Window.png');
	doorObj = new Image();
	doorObj.onload = imageLoaded;
	doorObj.src = getImgPath('Closet_Door.png');
	idle_gorilla = new Image();
	throwing_gorilla[0] = new Image();
	throwing_gorilla[1] = new Image();
	win_gorilla = new Image();
	loser_gorilla = new Image();
	idle_gorilla.onload = imageLoaded;
	throwing_gorilla[0] .onload = imageLoaded;
	throwing_gorilla[1].onload = imageLoaded;
	win_gorilla.onload = imageLoaded;
	loser_gorilla.onload = imageLoaded;
	idle_gorilla.src = getImgPath('idle.png');
	throwing_gorilla[0].src = getImgPath('throw1.png');
	throwing_gorilla[1].src = getImgPath('throw2.png');
	win_gorilla.src = getImgPath('win.png');
	loser_gorilla.src = getImgPath('loser.png');
	bananaObj = new Image();
	bananaObj.onload = imageLoaded;
	bananaObj.src = getImgPath('Banana.png');

	/*var width = 0;
	var	loading = setInterval(function () {
		width += 10;
		$('#progressBar').css('width',width+"%");
		if(width==100){
			clearInterval(loading);
			$('#loading').fadeOut();
			showControls(currentGorilla);
		}
	}, 300);*/
}

function imageLoaded(){
	loadedImages++;
	currentN = loadedImages;
	var new_width = Math.floor(currentN*100/totalImages);
	$('#progressBar').animate({ width: new_width+"%" },10,function() {
		if(new_width == 100){
			setup();
			setTimeout(function(){
			$('#loading').fadeOut().remove();
			
			},100);
		}
	});
	
}

function unbind(){

		$('#fire_c1').off();
		$('#fire_c2').off();
		$('.controller1_values').off();
		$('.controller2_values').off();
}

function clear(){
	banana = null;
	
}

function setup(){
	games++;
	unbind();
	clear();
	velocity = {};
	if (stage == null) stage = new Kinetic.Stage({
        container: 'playfield',
        width: s_width,
        height: s_height
    });
	stage.destroyChildren()
	backgroundLayer = new Kinetic.Layer();
	layer = new Kinetic.Layer();
	bananaLayer = new Kinetic.Layer();
	stage.add(backgroundLayer);
	stage.add(layer);
	stage.add(bananaLayer);
	stageObjects = new Array();
	drawBackground();
	placeBuildings();
	placeGorillas();
	explosion = new Kinetic.Sprite({
	x: 0,
	y: 0,
	width: 64,
	heigth: 64,
	offsetX: 32,
	offsetY: 32,
	image: explosionObj,
	animation: 'explode',
	animations: {
	  explode: [
		// x, y, width, height (16 frames)
		0,0, 64, 64,
		64,0, 64, 64,
		128,0, 64, 64,
		192,0, 64, 64,
		0,64, 64, 64,
		64,64, 64, 64,
		128,64, 64, 64,
		192,64, 64, 64,
		0,128, 64, 64,
		64,128, 64, 64,
		128,128, 64, 64,
		192,128, 64, 64,
		0,192, 64, 64,
		64,192, 64, 64,
		128,192, 64, 64,
		192,192, 64, 64
	  ],          
	},
		frameRate: 16,
		frameIndex: 0
	});

	banana_pointer = new Kinetic.Image({
	  x: -100,
	  y: 18,
	  image: pointerObj,
	  width: 18,
	  height: 36,
	  offsetX: 9,
	  offsetY: 18
	});
	bananaLayer.add(banana_pointer);
	if (games%2 == 1) { 
		currentGorilla = gorilla1
	}else{
		currentGorilla = gorilla2;
	}
	showControls(currentGorilla);
}




function drawBackground(){
	//var imageObj = new Image();
	var sky;
	//imageObj.onload = function() {
		sky = new Kinetic.Image({
		x: 0,
		y: 0,
		image: skyObj,
		width: s_width,
		height: s_height,	
		});
		// add the shape to the layer
		backgroundLayer.add(sky);
		backgroundLayer.draw();
	//layer.draw();
	//};
	//imageObj.src = './img/sky_gradient.png';

	var sun;
		sun = new Kinetic.Image({
		x: s_width/2,
		y: 40,
		height: 80,
		width: 80,
		offsetX: 40,
		offsetY: 40,
		image: sunObj,
		});
		backgroundLayer.add(sun);
		backgroundLayer.draw();
}



function getRandomColor() {
	return colors[Math.floor(Math.random() * colors.length)];
}

function placeBuildings(){
	buildings = new Array();
	windows = new Array();
	spacing = s_width / n_buildings;
	for( var i = 0; i < n_buildings; i++){
		var b_height = Math.random()*(s_height*0.7) + door_h*1.2;
		var building = new Kinetic.Rect({
			x: i*spacing,
			y: s_height - b_height,
			width: spacing,
			height: b_height,
			fill: getRandomColor(),
			stroke: 'black',
			strokeWidth: 1
		});
		buildings[i] = building;
		layer.add(building);
		//addWindows(building);
	}
	layer.draw();
	
	//windowObj = new Image();
	//var window;
	//windowObj.onload = function() {
		addWindows();
	//};
	//windowObj.src = './img/Bay_Window.png';
	
	//doorObj = new Image();
	//var door;
	//doorObj.onload = function() {
		addDoors();
	//};
	//doorObj.src = './img/Closet_Door.png';
}

function addDoors(){
	for (var i=0; i<buildings.length; i++){
		addDoor(buildings[i]);
	}
}
function addWindows(){
	for (var i=0; i<buildings.length; i++){
		addWindow(buildings[i],i);
	}
}
function addDoor(building){
	layer.add(new Kinetic.Image({
		x: building.x() + building.width()/2,
		y: s_height - door_h/2,
		height: door_h,
		width: door_l,
		offsetX: door_l/2,
		offsetY: door_h/2,
		image: doorObj
		}));
	layer.draw();
}

function addWindow(building,k){
	windows[k] = new Array();
	var n_window_rows = Math.floor((building.height() - door_h)/window_spacing);
	for (var i=0; i<n_window_rows; i++){
		windows[k][i] = new Array();
		//left window
		var window_left = new Kinetic.Image({
		x: building.x() + (building.width()/4),
		y: (s_height - building.height()) + i*window_spacing + window_spacing/2,
		height: window_h,
		width: window_l,
		offsetX: window_l/2,
		offsetY: window_h/2,
		image: windowObj
		})
		bananaLayer.add(window_left);
		windows[k][i][0] = window_left;
		
		//right window
		var window_right = new Kinetic.Image({
		x: building.x() + (3*building.width()/4),
		y: (s_height - building.height()) + i*window_spacing + window_spacing/2,
		height: window_h,
		width: window_l,
		offsetX: window_l/2,
		offsetY: window_h/2,
		image: windowObj
		})
		bananaLayer.add(window_right);
		windows[k][i][1] = window_right;
	}
	bananaLayer.draw();
}

function controllerAction(event){
	velocity.v = $(event.data.v).val();
	velocity.angle = $(event.data.angle).val();
	$(event.data.v).val("");
	$(event.data.angle).val("");
	if(validateVelocity(velocity)){
		throwBanana(currentGorilla);
	}else{
		alert("Parametri non numerici o fuori scala");
	}
}

function validateVelocity(velocity){
	return !(velocity.v == '' || velocity.angle == '' || isNaN(velocity.v) || velocity.v < 0 || velocity.v > 100 || isNaN(velocity.angle) || velocity.angle < 0 || velocity.angle > 90);
}

function nextTurn(){
	hideControls(currentGorilla);
	if(currentGorilla == gorilla1){
		currentGorilla = gorilla2;
	}else{
		currentGorilla = gorilla1;
	}
	showControls(currentGorilla);
}

function showControls(gorilla){
	var controller = $('.controller1');
	if(gorilla == gorilla2){
		controller = $('.controller2');
	}
	controller.fadeIn();
	controller.find('input').first().focus();
	
}

function hideControls(gorilla){
	if(gorilla == gorilla1){
		$('.controller1').fadeOut();
	}else{
		$('.controller2').fadeOut();
	}
}

function placeGorillas(){
		gorilla1 = new Kinetic.Image({
		  x: gorilla_width/2,
		  y: buildings[0].y() - gorilla_height/2 + 11,
		  image: idle_gorilla,
		  width: gorilla_width,
		  height: gorilla_height,
		  offsetX: gorilla_width/2,
		  offsetY: gorilla_height/2,
		  name: "Player 1"
		});
		
		gorilla2 = new Kinetic.Image({
		  x: s_width-(gorilla_width/2),
		  y: buildings[n_buildings-1].y() - gorilla_height/2 + 11,
		  image: idle_gorilla,
		  width: gorilla_width,
		  height: gorilla_height,
		  offsetX: gorilla_width/2,
		  offsetY: gorilla_height/2,
		  scaleX : -1,
		  name: "Player 2"
		});

		// add the shape to the layer
		layer.add(gorilla1);
		layer.add(gorilla2);
		layer.draw();

		$('#fire_c1').on("click",{ v: '#velo_c1', angle: '#angle_c1'}, controllerAction);
		$('#fire_c2').on("click",{ v: '#velo_c2', angle: '#angle_c2'}, controllerAction);
		$('.controller1_values').keypress(function(e){
			if (e.which == 13){
				$('#fire_c1').click();
			}
		});
		$('.controller2_values').keypress(function(e){
			if (e.which == 13){
				$('#fire_c2').click();
			}
		});
		currentGorilla = gorilla1;		
}

function checkCollisions(){
	return collidingObject = layer.getIntersection({x: banana.x(), y: banana.y()});
}


function placeBanana(gorilla){
	banana = new Kinetic.Image({
	  x: gorilla.x(),
	  y: gorilla.y()-gorilla.offsetY()-10,
	  image: bananaObj,
	  width: 40,
	  height: 40,
	  offsetX: 20,
	  offsetY: 20,
	 
	});
	bananaLayer.add(banana);
}

function animateThrowingGorilla(){
	//currentGorilla
	var gorilla = currentGorilla;
	gorilla.setImage(throwing_gorilla[0]);	
	layer.draw();
	setTimeout(function(){
	gorilla.setImage(throwing_gorilla[1]);	
	layer.draw();
	},100);
	setTimeout(function(){
	gorilla.setImage(idle_gorilla);	
	layer.draw();
	},1000);
}

function moveBanana(x,y){
	if(x<banana.x){
		banana.scaleX(-1);
		banana.rotate(-10);
	}else{
		banana.rotate(10);
	}
	banana.x(x);
	banana.y(y);
	if(y<0 && x >0 && x <s_width ){
		banana_pointer.x(x);
	}else{
		banana_pointer.x(-100);
	}
	bananaLayer.draw();
}

function createExplosion(x,y){
	explosion.x(x);
	explosion.y(y);
	layer.add(explosion);
	var frameCount =0;
	moveBanana(s_width*2,0);
	explosion.on('frameIndexChange', function(evt) {
          if (++frameCount > 15) {
            explosion.stop();
            frameCount = 0;
			explosion.remove();
			layer.draw();
          }
        });
	explosion.start();
}


function throwBanana(){
	//setVelocity();
	animateThrowingGorilla();
	hideControls(currentGorilla);
	if(banana == null) placeBanana(currentGorilla);
	if(currentGorilla == null) {
		start_x = initial_x;
		start_y = initial_y;
	}else{
		start_x = currentGorilla.x();
		start_y = currentGorilla.y()-currentGorilla.offsetY()-1;
	}
	if(currentGorilla == gorilla2) velocity.angle = 180 - velocity.angle;
	velocity.x =  velocity.v * Math.sin(velocity.angle * Math.PI / 180) / 5;
	velocity.y = velocity.v * Math.cos(velocity.angle * Math.PI / 180) / 5;
	var start = Date.now();
	movement = setInterval(function () {
		now = Date.now();
		elapsed = (now - start)/25.0;
		var banana_y = start_y - Math.round(elapsed*(velocity.x)) + Math.round(elapsed*elapsed*(0.1));
		var banana_x = start_x + Math.round(elapsed*(velocity.y));
		moveBanana(banana_x,banana_y);
		var hit = checkCollisions();
		if(hit){
			clearInterval(movement);
			createExplosion(banana_x,banana_y)
			if(hit == gorilla1 || hit == gorilla2){
				gameover(hit);
			}else{
				if(buildings.indexOf(hit)>-1) hitBuilding(buildings.indexOf(hit));
				nextTurn();
			}
		}else if(banana_x > s_width || banana_y > s_height || banana_x < 0) {
			clearInterval(movement);
			moveBanana(s_width*2,0);
			nextTurn();
		}
	}, 25);
}

function gameover(loser){
	var winner = loser == gorilla1 ? gorilla2 : gorilla1;
	winner.setImage(win_gorilla);
	loser.setImage(loser_gorilla);
	layer.draw();
	showWinner(winner);
}

function showWinner(winner){
	$('#results').prepend("<h1>"+winner.name()+" wins!</h1>").fadeIn().find('#replay').click(restart);
}

function restart(){
	$('#results').find("h1").remove();
	$('#results').hide();
	setup();
}

function hitBuilding(i){
	var building = buildings[i];
	if(windows[i].length>0){
		var window = windows[i].shift();
		window[0].destroy();
		window[1].destroy();
		bananaLayer.draw();
		var j = 0;
		var fallingGorilla = null;
		if(i==0) fallingGorilla = gorilla1;
		if(i==buildings.length-1) fallingGorilla = gorilla2;
		
		var collapse = setInterval(function(){
			building.height(building.height() - (window_spacing/10));
			building.y(building.y() + (window_spacing/10));
			if(fallingGorilla!=null){
					fallingGorilla.y(fallingGorilla.y() + (window_spacing/10));
			}
			layer.draw();
			j++;
			if(j==10){
				clearInterval(collapse);
			}
		},100);
	}
}

function setupPage(){
    var prepare = "<div id='container'><img src = '"+getImgPath("win.jpg")+"' class=\'loadingBackground\'><div id='loading'><div id='progressBarContainer'><div id='progressBar'></div></div></div><div id='results'><input type='button' id='replay' value='Play Again!'></div><div class='controller1'><table><tr><td colspan='2'>Player 1</td></tr><tr><td>Strengh (0-100)</td><td><input type='text' class='controller1_values' id='velo_c1' value ='' size = '4'></td></tr><tr><td>Angle (0-90)</td><td><input type='text' class='controller1_values' id='angle_c1' value ='' size = '4'></td></tr><tr><td colspan='2'><input type='button' id='fire_c1' value='Fire!'></td></tr></table></div><div class='controller2'><table><tr><td colspan='2'>Player 2</td></tr><tr><td>Strengh (0-100)</td><td><input type='text' class='controller2_values' id='velo_c2' value ='' size = '4'></td></tr><tr><td>Angle (0-90)</td><td><input type='text' class='controller2_values' id='angle_c2' value ='' size = '4'></td></tr><tr><td colspan='2'><input type='button' id='fire_c2' value='Fire!'></td></tr></table></div>"

    $('#playfield').before(prepare);
    $("#playfield").detach().appendTo('#container');
}

gorillasgame = function(){

    setupPage();
	loadImages();
	//placeGorillas();
	//placeBanana();

	
	
	//throwBanana(gorilla1);
}
