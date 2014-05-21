var mines = {};
var minefield = {};
var colors = ["#0100fe","#017f01","#fe0000","#010080","#810102","#008081","#000000","#808080"];
var rows = 0;
var cols = 0;
var mineCount = 0;
var flags = 0;
var shownCells = 0;
var leftrightclick = false;
var timer;
var time = 0;
var started = false;
var key_cell = function(i,j){
  // some cool hashing
  return i+ "-" + j; // just an example
};

function placeMines(x,y,n){
	//mines = new Array(x);
	rows = x;
	cols = y;
	mineCount = n;
	flags = mineCount;
	//minefield = new Array(x);
	for(var i = 0; i < x; i++){
		//mines[i] = new Array(y);
		//minefield[i] = new Array(y);
		for(var j = 0; j < y; j++){
			if(Math.random() > (1 - (mineCount/(x*y))) && n>0){
				mines[key_cell(i,j)] = -1;
				n--;
			}else{
				if(mines[key_cell(i,j)] == undefined) mines[key_cell(i,j)] = 0;
			}
		}		
    }
	while(n>0){
		for(var i = 0; i < x; i++){
			for(var j = 0; j < y; j++){
				if(Math.random() > (1 - (mineCount/(x*y))) && n>0 && mines[key_cell(i,j)] == 0){
					mines[key_cell(i,j)] = -1;
					n--;
				}
			}		
		}
	}
	for(var i = 0; i < x; i++){
        for(var j = 0; j < y; j++){
			if(mines[key_cell(i,j)] == 0){
				var count = 0
				if(mines[key_cell(i-1,j)]!= undefined && mines[key_cell(i-1,j)] == -1) count++;
				if(mines[key_cell(i-1,j-1)]!= undefined && mines[key_cell(i-1,j-1)] == -1) count++;
				if(mines[key_cell(i-1,j+1)]!= undefined && mines[key_cell(i-1,j+1)] == -1) count++;
				if(mines[key_cell(i,j-1)]!= undefined && mines[key_cell(i,j-1)] == -1) count++;
				if(mines[key_cell(i,j+1)]!= undefined && mines[key_cell(i,j+1)] == -1) count++;
				if(mines[key_cell(i+1,j)]!= undefined && mines[key_cell(i+1,j)] == -1) count++;
				if(mines[key_cell(i+1,j-1)]!= undefined && mines[key_cell(i+1,j-1)] == -1) count++;
				if(mines[key_cell(i+1,j+1)]!= undefined && mines[key_cell(i+1,j+1)] == -1) count++;
				mines[key_cell(i,j)] = count;
			}
        }
    }
}

function createMinefield(x,y,n){
	var parent = $("#minefield");
	
	placeMines(x,y,n);
	tbl  = document.createElement('table');
	for(var i = 0; i < x; i++){
        var tr = tbl.insertRow(-1);
        for(var j = 0; j < y; j++){
            minefield[key_cell(i,j)] = $(tr.insertCell(-1));
			minefield[key_cell(i,j)].addClass("hiddenCell");
			minefield[key_cell(i,j)].attr('data-x', i);
			minefield[key_cell(i,j)].attr('data-y', j);
        }
    }
    parent.prepend(tbl);
	parent.css('width',parent.find('table').css('width'));
}

function clickCell(jCell){
	if(!started){
		$('#time').text(time).fadeIn();
		$('#flag_number').text(flags).fadeIn();
		timer = setInterval(function () {
			time++
			$('#time').text(time);			
		}, 1000);
		started = true;
	}
	if(jCell.hasClass("hiddenCell") && !jCell.hasClass("flaggedCell")){
		result = mines[key_cell(jCell.data('x'),jCell.data('y'))];
		switch(result) {
		case 0:
			explore(jCell);
			break;
		case -1:
			explode(jCell);
			break;
		default	:
			showCell(jCell,result);
		}
		showCell(jCell,result);
	}
	if(shownCells == (rows*cols - mineCount)) endGame();
}

function explore(jCell){
	if(jCell.hasClass("hiddenCell")){
		showCell(jCell,0);
		var i = jCell.data('x');
		var j = jCell.data('y');
		var x = rows;
		var y = cols;
		if(mines[key_cell(i-1,j)]!= undefined && minefield[key_cell(i-1,j)].hasClass("hiddenCell")) mines[key_cell(i-1,j)] == 0 ? explore(minefield[key_cell(i-1,j)]) : showCell(minefield[key_cell(i-1,j)],mines[key_cell(i-1,j)]);
		if(mines[key_cell(i-1,j-1)]!= undefined && minefield[key_cell(i-1,j-1)].hasClass("hiddenCell")) mines[key_cell(i-1,j-1)] == 0 ? explore(minefield[key_cell(i-1,j-1)]) : showCell(minefield[key_cell(i-1,j-1)],mines[key_cell(i-1,j-1)]);
		if(mines[key_cell(i-1,j+1)]!= undefined && minefield[key_cell(i-1,j+1)].hasClass("hiddenCell")) mines[key_cell(i-1,j+1)] == 0 ? explore(minefield[key_cell(i-1,j+1)]) : showCell(minefield[key_cell(i-1,j+1)],mines[key_cell(i-1,j+1)]);
		if(mines[key_cell(i,j-1)]!= undefined && minefield[key_cell(i,j-1)].hasClass("hiddenCell")) mines[key_cell(i,j-1)] == 0 ? explore(minefield[key_cell(i,j-1)]) : showCell(minefield[key_cell(i,j-1)],mines[key_cell(i,j-1)]);
		if(mines[key_cell(i,j+1)]!= undefined && minefield[key_cell(i,j+1)].hasClass("hiddenCell")) mines[key_cell(i,j+1)] == 0 ? explore(minefield[key_cell(i,j+1)]) : showCell(minefield[key_cell(i,j+1)],mines[key_cell(i,j+1)]);
		if(mines[key_cell(i+1,j)]!= undefined && minefield[key_cell(i+1,j)].hasClass("hiddenCell")) mines[key_cell(i+1,j)] == 0 ? explore(minefield[key_cell(i+1,j)]) : showCell(minefield[key_cell(i+1,j)],mines[key_cell(i+1,j)]);
		if(mines[key_cell(i+1,j-1)]!= undefined && minefield[key_cell(i+1,j-1)].hasClass("hiddenCell")) mines[key_cell(i+1,j-1)] == 0 ? explore(minefield[key_cell(i+1,j-1)]) : showCell(minefield[key_cell(i+1,j-1)],mines[key_cell(i+1,j-1)]);
		if(mines[key_cell(i+1,j+1)]!= undefined && minefield[key_cell(i+1,j+1)].hasClass("hiddenCell")) mines[key_cell(i+1,j+1)] == 0 ? explore(minefield[key_cell(i+1,j+1)]) : showCell(minefield[key_cell(i+1,j+1)],mines[key_cell(i+1,j+1)]);
	}
}
function restart(){
	$('.gameover').remove();
	$('.gamewon').remove();
	$('#minefield').find('table').remove();
	createMinefield(10,10,10);
}

function explode(jCell){
	jCell.removeClass("hiddenCell");
	jCell.addClass("explodedMineCell");
	showAll();
	$("#minefield").append("<div class='gameover'> Gameover! </div>");
	$(".gameover").slideDown();	
}

function endGame(){
	showAll();
	$("#minefield").append("<div class='gamewon'> You Won! </div>");
	$(".gameover").slideDown();	
}

function showAll(){
	clearInterval(timer);
	for(var i = 0; i<rows; i++){
		for(var j = 0; j<cols; j++){
			showCell(minefield[key_cell(i,j)],mines[key_cell(i,j)]);
		}
	}
	
}

function showCell(jCell, result){
	if(jCell.hasClass("hiddenCell")){
		jCell.removeClass("hiddenCell");
		switch(result) {
		case 0:
			jCell.addClass("blankCell");
			shownCells++;
			break;
		case -1:
			jCell.addClass("mineCell");
			shownCells++;
			break;
		default	:
			jCell.addClass("numberCell");
			jCell.css("color",colors[(result-1)]);
			jCell.text(result);
			shownCells++;
		}
	}
}

function flagCell(jCell){
	if(!started){
		$('#time').text(time).fadeIn();
		$('#flag_number').text(flags).fadeIn();
		timer = setInterval(function () {
			time++
			$('#time').text(time);			
		}, 1000);
		started = true;
	}
	if(jCell.hasClass("hiddenCell") ){
		if(jCell.hasClass("flaggedCell")){
			flags++;
			jCell.toggleClass("flaggedCell");
		}else{
			if(flags >0) {
				jCell.toggleClass("flaggedCell");
				flags--;
			}
		}
		$('#flag_number').text(flags)
	}
}

function forceExplore(jCell){
	if(jCell.hasClass("numberCell")){
		var i = jCell.data('x');
		var j = jCell.data('y');
		//count flags
		var flags = 0;
		if(mines[key_cell(i-1,j)]!= undefined && minefield[key_cell(i-1,j)].hasClass("flaggedCell")) flags++;
		if(mines[key_cell(i-1,j-1)]!= undefined && minefield[key_cell(i-1,j-1)].hasClass("flaggedCell")) flags++;
		if(mines[key_cell(i-1,j+1)]!= undefined && minefield[key_cell(i-1,j+1)].hasClass("flaggedCell")) flags++;
		if(mines[key_cell(i,j-1)]!= undefined && minefield[key_cell(i,j-1)].hasClass("flaggedCell")) flags++;
		if(mines[key_cell(i,j+1)]!= undefined && minefield[key_cell(i,j+1)].hasClass("flaggedCell")) flags++;
		if(mines[key_cell(i+1,j)]!= undefined && minefield[key_cell(i+1,j)].hasClass("flaggedCell")) flags++;
		if(mines[key_cell(i+1,j-1)]!= undefined && minefield[key_cell(i+1,j-1)].hasClass("flaggedCell")) flags++;
		if(mines[key_cell(i+1,j+1)]!= undefined && minefield[key_cell(i+1,j+1)].hasClass("flaggedCell")) flags++;
		if(flags != mines[key_cell(i,j)]){
			//alert("Numero di flag diverso da "+mines[key_cell(i,j)]);
			jCell.animate({opacity: 0.5}, 300 ).animate({opacity: 1}, 300 );
		}else{
			if(mines[key_cell(i-1,j)]!= undefined && !minefield[key_cell(i-1,j)].hasClass("flaggedCell") && minefield[key_cell(i-1,j)].hasClass("hiddenCell")) clickCell(minefield[key_cell(i-1,j)]);
			if(mines[key_cell(i-1,j-1)]!= undefined && !minefield[key_cell(i-1,j-1)].hasClass("flaggedCell") && minefield[key_cell(i-1,j-1)].hasClass("hiddenCell")) clickCell(minefield[key_cell(i-1,j-1)]);
			if(mines[key_cell(i-1,j+1)]!= undefined && !minefield[key_cell(i-1,j+1)].hasClass("flaggedCell") && minefield[key_cell(i-1,j+1)].hasClass("hiddenCell")) clickCell(minefield[key_cell(i-1,j+1)]);
			if(mines[key_cell(i,j-1)]!= undefined && !minefield[key_cell(i,j-1)].hasClass("flaggedCell") && minefield[key_cell(i,j-1)].hasClass("hiddenCell")) clickCell(minefield[key_cell(i,j-1)]);
			if(mines[key_cell(i,j+1)]!= undefined  && !minefield[key_cell(i,j+1)].hasClass("flaggedCell") && minefield[key_cell(i,j+1)].hasClass("hiddenCell")) clickCell(minefield[key_cell(i,j+1)]);
			if(mines[key_cell(i+1,j)]!= undefined && !minefield[key_cell(i+1,j)].hasClass("flaggedCell") && minefield[key_cell(i+1,j)].hasClass("hiddenCell")) clickCell(minefield[key_cell(i+1,j)]);
			if(mines[key_cell(i+1,j-1)]!= undefined && !minefield[key_cell(i+1,j-1)].hasClass("flaggedCell") && minefield[key_cell(i+1,j-1)].hasClass("hiddenCell")) clickCell(minefield[key_cell(i+1,j-1)]);
			if(mines[key_cell(i+1,j+1)]!= undefined && !minefield[key_cell(i+1,j+1)].hasClass("flaggedCell") && minefield[key_cell(i+1,j+1)].hasClass("hiddenCell")) clickCell(minefield[key_cell(i+1,j+1)]);	
		}
	}
}



minesweeper = function(){
$("#playfield").append("<div id='minefield'><table id='counters'><tr><td class='flags' id='flag_number'></td><td class='timer' id='time'></td></tr></table></div>");


createMinefield(10,10,20);

$("#minefield").find("td").on("mouseenter", function(){
	$(this).toggleClass("highlighted");
}).on("mouseleave",function(){
	$(this).toggleClass("highlighted");
}).on("click",function(e){
	if( e.which == 2 ) {
		e.preventDefault();
		//alert("middle button"); 
		forceExplore($(this));
	}else{
		clickCell($(this));
	}
}).bind("contextmenu",function(e){
   //alert('Context Menu event has fired!'); use to check flag
   flagCell($(this))
   return false;
}).on("dblclick",function(){
	forceExplore($(this)); //use to explore flagged numbers
}).on("mousedown",function(){
	if(leftrightclick) {
		forceExplore($(this));
	}else{
		leftrightclick = true;
	}
}).on("mouseup", function(){
	leftrightclick = false;
});
};


