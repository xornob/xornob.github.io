var title, titles={}, colorchange, c, ctx, prevx, prevy, cx, cy, updateint, drawint,t1,t2,b,l,r;
function update () {
	prevx=cx;
	prevy=cy;
}
function draw () {
	ctx.fillStyle = '#AADDFF';
	ctx.fillRect(0,0,500,500);
	ctx.fillStyle = '#00CCFF';
	ctx.beginPath();
	ctx.arc(cx,cy,16,0,2*Math.PI);
	ctx.fill();
}
document.onmousemove = function (e) {
	cx = e.clientX-c.offsetLeft;
	if (cx<15) {cx=15};
	if (cx>485) {cx=485};
	cy = e.clientY-c.offsetTop;
	if (cy<15) {cy=15};
	if (cy>485) {cy=485};
};
window.onload = function() {
	title = document.getElementById('title');
	t1 = document.getElementById('top1');
	t2 = document.getElementById('top2');
	b = document.getElementById('bottom');
	l = document.getElementById('left');
	r = document.getElementById('right');
	c = document.getElementById('gamebox');
	t1.style.top='-10px';
	ctx = c.getContext('2d');
	var titletext='AirMonoHockey';
	for (var i = 0; i < titletext.length; i++) {
		titles[i] = document.createElement('span');
		titles[i].innerHTML = titletext[i];
		if (2<i&&i<7) {
			if (i==3) {
				var sub = document.createElement('sub');
				title.appendChild(sub);
			};
			sub.appendChild(titles[i]);
		} else {
			title.appendChild(titles[i]);
		}
	};
	colorchange = window.setInterval( function () {
		var i = Math.floor(Math.random()*14);
		titles[i].style.color=['#FF0000','#00FF00','#0000FF','#FF00FF'][Math.floor(Math.random()*6)];
		window.setTimeout(function (i) {
			titles[i].style.color='#000000';
		}, 500, i);
	}, 50);
	updateint = window.setInterval(update, 20);
	drawint = window.setInterval(draw, 20);
};
