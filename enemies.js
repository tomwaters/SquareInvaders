function enemy(x, y, width, height) {
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.dir = "r";
	this.state = "alive";
	this.deadFrames = 30;
}

enemy.prototype.draw = function(ctx, player) {
	for(var i = player.shots.length - 1; i>-1; i = i - 1) {
		if((player.shots[i].y - player.shotLength < this.y + this.height) && 
			(player.shots[i].x >= this.x) && (player.shots[i].x <= this.x + this.width) && 
			(this.state == "alive")) {
				this.state = "dead";
				player.shots.splice(i, 1);
				player.score = player.score + 10;
			}
	};
	
	if(this.state == "alive") {
		ctx.fillStyle = "blue";
		ctx.fillRect(this.x, this.y, this.width, this.height);
		this.move(ctx);
	} else if(this.deadFrames > 0){
		this.deadFrames = this.deadFrames - 1;
		ctx.fillStyle = "red";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

enemy.prototype.move = function(ctx) {
	if(this.x + this.width > ctx.canvas.width) {
		this.dir = "l";
	} else if (this.x == 0) {
		this.dir = "r";
	}
	
	if(this.dir == "r") {
		this.x = this.x + 2;
	} else {
		this.x = this.x - 2;
	}
	
}