var title, titles={}, colorchange, c, ctx, prevx=250, prevy=300, cx, cy, updateint, drawint, t1, t2, b, l, r, g, paused=true, won = false, decel=2,
sp={ //scoring puck
	x:250,
	y:450,
	xv:0,
	yv:0
},
intp={ //intermediate puck
	x:250,
	y:100,
	xv:0,
	yv:0
};
function dist (x1,y1,x2,y2) {return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2))};
function resetgame () {
	sp={x:250,y:450,xv:0,yv:0}
	intp={x:250,y:100,xv:0,yv:0};
	prevx=250;
	prevy=300;
	paused=false;
	won=false;
}
function update () {
	if (!paused && !won) {
		xv=cx-prevx;
		yv=cy-prevy;
		//Pucks Move
			intp.x+=intp.xv;
			intp.y+=intp.yv;
			sp.x+=sp.xv;
			sp.y+=sp.yv;
		//Deceleration
			intp.larger=Math.max(Math.abs(intp.xv),Math.abs(intp.yv));
			sp.larger=Math.max(Math.abs(sp.xv),Math.abs(sp.yv));
			if (intp.xv>=decel/intp.larger) {intp.xv-=decel/intp.larger;}
			else if (intp.xv<=-decel/intp.larger) {intp.xv+=decel/intp.larger}
			else {intp.xv=0}

			if (intp.yv>=decel/intp.larger) {intp.yv-=decel/intp.larger;}
			else if (intp.yv<=-decel/intp.larger) {intp.yv+=decel/intp.larger}
			else {intp.yv=0}

			if (sp.xv>=decel/sp.larger) {sp.xv-=decel/sp.larger;}
			else if (sp.xv<=-decel/sp.larger) {sp.xv+=decel/sp.larger}
			else {sp.xv=0}

			if (sp.yv>=decel/sp.larger) {sp.yv-=decel/sp.larger;}
			else if (sp.yv<=-decel/sp.larger) {sp.yv+=decel/sp.larger}
			else {sp.yv=0}
		//Collisions
			if (dist(cx,cy,intp.x,intp.y)<35) {
				intp.xv+=xv;
				intp.yv+=yv;
			}
			if (dist(intp.x,intp.y,sp.x,sp.y)<30) {
				sp.xv=[intp.xv, intp.xv = sp.xv][0];
				sp.yv=[intp.yv, intp.yv = sp.yv][0];
			}
		//Intp bouncing
			if (intp.x<=15) {
				intp.x = 30 - intp.x;
				intp.xv*=-1;
			}
			if (intp.x>=485) {
				intp.x = 970 - intp.x;
				intp.xv*=-1;
			}
			if (intp.y<=15) {
				intp.y = 30 - intp.y;
				intp.yv*=-1;
			}
			if (intp.y>=485) {
				intp.y = 970 - intp.y;
				intp.yv*=-1;
			}
		//Sp bouncing
			if (sp.x<=15) {
				sp.x = 30 - sp.x;
				sp.xv*=-1;
			}
			if (sp.x>=485) {
				sp.x = 970 - sp.x;
				sp.xv*=-1;
			}
			if (sp.y<=15) {
				if (sp.x>200&&sp.x<300) {won=true;}
				else {
					sp.y = 30 - sp.y;
					sp.yv*=-1;
				}
			}
			if (sp.y>=485) {
				sp.y = 970 - sp.y;
				sp.yv*=-1;
			}
		prevx=cx;
		prevy=cy;
	}
}
function draw () {
	//Clear
		ctx.fillStyle = '#AADDFF';
		ctx.fillRect(0,0,500,500);
	//Scoring Puck
		if (!won) {
			ctx.fillStyle = '#AA1111';
			ctx.beginPath();
			ctx.arc(sp.x,sp.y,15,0,2*Math.PI);
			ctx.fill();
		}
	//Intermediate Puck
		ctx.fillStyle = '#555555';
		ctx.beginPath();
		ctx.arc(intp.x,intp.y,15,0,2*Math.PI);
		ctx.fill();
	//Pusher if playing
		/*Big O - pusher */if(!won){
			ctx.fillStyle = '#339911';
			ctx.beginPath();
			if (paused) {ctx.arc(prevx,prevy,20,0,2*Math.PI);} else {ctx.arc(cx,cy,20,0,2*Math.PI);}
			ctx.fill();
		//Little O - pusher
			ctx.fillStyle = '#33FF11';
			ctx.beginPath();
			ctx.arc(cx,cy,16,0,2*Math.PI);
			ctx.fill();
	//Pusher if won
		/*Big O - pusher */}else{
			ctx.fillStyle = '#339911';
			ctx.beginPath();
			ctx.arc(prevx,prevy,20,0,2*Math.PI);
			ctx.fill();
		//Little O - pusher
			ctx.fillStyle = '#33FF11';
			ctx.beginPath();
			ctx.arc(prevx,prevy,16,0,2*Math.PI);
			ctx.fill();
		//Cursor
			ctx.fillStyle = '#000000';
			ctx.beginPath();
			ctx.arc(cx,cy,4,0,2*Math.PI);
			ctx.fill();
			ctx.fillStyle = '#00FF00';
			ctx.beginPath();
			ctx.arc(cx,cy,3,0,2*Math.PI);
			ctx.fill();}
	//Paused text
		if (paused&&!won) {
			ctx.fillStyle = '#660066'
			ctx.font = '50px Arial';
			ctx.fillText('Paused',160,200);
			ctx.font = '20px Arial';
			ctx.fillText('Line up green circles + click to resume',80,230);
		};
	//Win text + circle
		if (won) {
			ctx.fillStyle = '#660066';
			ctx.font = '50px Arial';
			ctx.fillText('You Win!',160,200);
			ctx.font = '20px Arial';
			ctx.fillText('Click in the black circle to restart',120,230);
			ctx.fillStyle = '#000000';
			ctx.beginPath();
			ctx.arc(250,300,10,0,2*Math.PI);
			ctx.stroke();
		};
}
window.onmousedown = function (e) {
	if (won&&dist(250,300,cx,cy)<10) {resetgame()}
	else if (!paused) {paused=true}
	else if (dist(prevx,prevy,cx,cy)<20) {paused=false};
};
window.onmousemove = function (e) {
	cx = e.clientX-c.offsetLeft;
	cy = e.clientY-c.offsetTop;
	if ((e.clientX-c.offsetLeft<-20) || (e.clientX-c.offsetLeft>520) || (e.clientY-c.offsetTop<-20) || (e.clientY-c.offsetTop>520)) {paused=true;}
	if (!won) {
		if (cx<20) {cx=20}
		if (cx>480) {cx=480}
		if (cy<20) {cy=20}
		if (cy>480) {cy=480}
		if (paused && dist(prevx,prevy,cx,cy)<10) {
			cx=prevx;
			cy=prevy;
		}
	}
};
window.onresize = function() {
	t1.style.left = (window.innerWidth/2-250)+'px';
	t2.style.right = (window.innerWidth/2-250)+'px';
	b.style.left = (window.innerWidth/2-250)+'px';
	l.style.left = (window.innerWidth/2-260)+'px';
	r.style.right = (window.innerWidth/2-260)+'px';
	g.style.left = (window.innerWidth/2-50)+'px';
};
window.onload = function() {
	title = document.getElementById('title');
	t1 = document.getElementById('top1');
	t2 = document.getElementById('top2');
	b = document.getElementById('bottom');
	l = document.getElementById('left');
	r = document.getElementById('right');
	g = document.getElementById('goal')
	c = document.getElementById('gamebox');
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
		var i = Math.floor(Math.random()*13);
		titles[i].style.color=['#FF0000','#00FF00','#0000FF','#FF00FF'][Math.floor(Math.random()*6)];
		window.setTimeout(function (i) {
			titles[i].style.color='#000000';
		}, 500, i);
	}, 50);
	updateint = window.setInterval(update, 20);
	drawint = window.setInterval(draw, 20);
	window.onresize();
};