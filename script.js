const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const cw = canvas.width;
const ch = canvas.height;

c.globalAlpha = 0.8;

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function newColor() {
	let r = Math.floor(Math.random() * 255)
	let g = Math.floor(Math.random() * 255)
	let b = Math.floor(Math.random() * 255)
	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

let objects = [];

function cube(x, y, width, height, dx, dy) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.dx = dx;
	this.dy = dy;
	this.color;
	
	this.draw = function() {
		c.fillStyle = this.color;
		c.beginPath()
		c.rect(this.x, this.y, this.width, this.height);
		c.fill()
		c.closePath()
	};

	this.update = function() {
		this.width += this.dx;
		this.height += this.dy;

		this.x += this.dx;
		this.y += this.dy;
		
		if (this.x <= 0 || this.x <= 0 - this.width|| this.x + this.width >= cw || this.width <= -cw + this.x) {
			this.dx = -this.dx;
			this.color = newColor()
		}
		
		if (this.y <= 0 || this.y <= 0 - this.height|| this.y + this.height >= ch || this.height <= -ch + this.y) {
			this.dy = -this.dy;
			this.color = newColor()
		}
		
		this.draw()
	}
}
for (let i=0; i < 20; i++) {
	objects.push(new cube(Math.random() * cw , Math.random() * ch, Math.random() * 50, Math.random() * 50, Math.random() * 5, Math.random() * 5))
}

function render() {
	c.clearRect(0, 0, cw, ch)
	for (i = 0; i < objects.length; i++) {
		objects[i].update()
	}
	requestAnimationFrame(render)
}

requestAnimationFrame(render)