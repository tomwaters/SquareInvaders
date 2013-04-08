var cWidth = 640;
var cHeight = 480;

var pHeight = 20;
var pWidth = 20;
var p;
var e;
var keys = new Array();
var run;
var state = "intro";

$(document).ready(function() {
	run = window.setInterval(draw, 1000 / 60);
	var canvas = document.getElementById("c");
	canvas.width = cWidth;
	canvas.height = cHeight;
	
	$(document).keydown(keyDown);
	$(document).keyup(keyUp);
});

function init() {
	p = new player((cWidth / 2) - (pWidth / 2), cHeight - pHeight, 20, 20, 5);
	e = new enemies();
}

function keyDown(e) {
	keys[e.which] = true;
	if(state == "intro" && keys[32]) {
		state = "play";
		init();
	} else if(state == "gameover" && keys[32]) {
		state = "intro";
	} else if(state == "play") {
		if(keys[68] && p.x < cWidth - p.height)
			p.moveRight();
		 if(keys[65] && p.x > 0)
			p.moveLeft();
		if(keys[32]) {
			p.fire();
		}
	}
}

function keyUp(e) {
	delete keys[e.which];
}

function draw() {
	var canvas = document.getElementById("c");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	if(state == "intro") {
		ctx.fillStyle = "black";
		ctx.font = "50px Verdana";
		ctx.fillText("Square Invaders", 100, 200);
		ctx.font = "22px Verdana";
		ctx.fillText("A - Left, D - Right, Space - Fire", 130, 300);
		ctx.fillText("Press Space to Start", 190, 350);
	} else if(p.state == "dead" && p.deadFrames == 0) {
		state = "gameover"
		ctx.font = "50px Verdana";
		ctx.fillStyle = "red";
		ctx.fillText("Game Over!", (ctx.canvas.width / 2) - 150, ctx.canvas.height / 2);

		ctx.fillStyle = "black";	
		ctx.font = "22px Verdana";
		ctx.fillText("Press Space to Continue", 180, 350);
	} else if(state == "play") {
		p.draw(ctx);
		e.draw(ctx, p);
	}
}