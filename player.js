function player(x, y, width, height, maxShots) {
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.shots = new Array();
	this.maxShots = maxShots;
	this.shotLength = 10;
	this.pStep = 10;
	this.score = 0;
	this.state = "alive";
	this.deadFrames = 30;
}

player.prototype.draw = function(ctx) {
	if(this.state == "alive") {
		ctx.fillStyle = "green";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	
		ctx.beginPath();
		for(var i = this.shots.length - 1; i>-1; i = i - 1) {
			var value = this.shots[i];
			ctx.moveTo(value.x, value.y);
			ctx.lineTo(value.x, value.y - this.shotLength);
			ctx.stroke();
			if(value.y > 0)
				value.y = value.y - 4;
			else
				this.shots.splice(i, 1);
		}
	} else if(this.deadFrames > 0) {
		ctx.fillStyle = "red";
		ctx.fillRect(this.x, this.y, this.width, this.height);
		this.deadFrames = this.deadFrames - 1;
	} else {
		ctx.font = "50px Verdana";
		ctx.fillStyle = "red";
		ctx.fillText("Game Over!", (ctx.canvas.width / 2) - 150, ctx.canvas.height / 2);
	}
}

player.prototype.fire = function() {
	if(this.state == "alive") {
		var s = new Object();
		s.x = this.x + (this.width / 2);
		s.y = this.y - this.height;
		p.shots.push(s);
	}
}

player.prototype.moveLeft = function() {
	if(this.state == "alive") {
		this.x = this.x - p.pStep;
	}
}

player.prototype.moveRight = function() {
	if(this.state == "alive") {
		this.x = this.x + p.pStep;
	}
}