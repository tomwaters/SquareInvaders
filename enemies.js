function enemies() {
	this.w = 20;
	this.h = 20;
	this.s = 2;
	this.init();
}

enemies.prototype.init = function() {
	this.e = new Array();
	this.y = this.h + 4;
	this.dir = "r";
	this.pauseFrames = 30;
	
	this.numEs = 10;
	for(var i=0; i<this.numEs; i++) {
		var newE = new enemy(i*(this.w + 5), 0, this.w, this.h);
		this.e.push(newE);
	}
}

enemies.prototype.draw = function(ctx, player) {
	if(this.y >= ctx.canvas.height - this.h) {
		player.state = "dead";
	} else if(this.e.length == 0) {
		if(this.pauseFrames == 0) {
			this.init();
			this.s = this.s + 2;
		} else {
			this.pauseFrames = this.pauseFrames - 1;
		}
	} else {
		for(var i=this.e.length - 1; i>-1; i--) {
			this.e[i].draw(ctx, player, this.y);
			
			if(this.e[i].deadFrames == 0) {
				this.e.splice(i, 1);
			} else if(this.dir == "r") {
				this.e[i].x = this.e[i].x + this.s;
			} else {
				this.e[i].x = this.e[i].x - this.s;
			}		
		}

		var last = this.e[this.e.length - 1];
		if(last.x + last.width > ctx.canvas.width) {
			this.dir = "l";
			this.y = this.y + this.h;
		} else if (this.e[0].x <= 0) {
			this.dir = "r";
			this.y = this.y + this.h;
		}
	}
}

function enemy(x, y, width, height) {
	this.width = width;
	this.height = height;
	this.x = x;
	this.state = "alive";
	this.deadFrames = 30;
}

enemy.prototype.draw = function(ctx, player, y) {
	for(var i = player.shots.length - 1; i>-1; i = i - 1) {
		if((player.shots[i].y - player.shotLength < y + this.height) && 
			(player.shots[i].x >= this.x) && (player.shots[i].x <= this.x + this.width) && 
			(this.state == "alive")) {
				this.state = "dead";
				player.shots.splice(i, 1);
				player.score = player.score + 10;
			}
	};
	
	if(this.state == "alive") {
		ctx.fillStyle = "blue";
		ctx.fillRect(this.x, y, this.width, this.height);
	} else if(this.deadFrames > 0){
		this.deadFrames = this.deadFrames - 1;
		ctx.fillStyle = "red";
		ctx.fillRect(this.x, y, this.width, this.height);
	} 
}

