var title, titles={}, colorchange, c, ctx, updateint, drawint, t1, t2, b, l, r, g, paused=true, won = 0, decel=999/1000, tau=2*Math.PI,
p = { //pusher
	x:250,
	y:250,
	p:{x:250,y:300},
	r:0,
	th:0
},
sp={ //scoring puck
	x:Math.random()*300+100,
	y:450,
	r:0,
	th:0,
	c:0
},
intp={ //intermediate puck
	x:Math.random()*300+100,
	y:100,
	r:0,
	th:0,
	c:0
};
function dist (a,b) {return Math.sqrt(Math.pow(a.x-b.x,2)+Math.pow(a.y-b.y,2))};
function ptor (o) {return {xv:Math.cos(o.th)*o.r,yv:Math.sin(o.th)*o.r}};
function rtop (o) {return {th:Math.atan2((o.yv),(o.xv)),r:Math.sqrt(Math.pow(o.xv,2)+Math.pow(o.yv,2))}}
function thto (a,b) {
	var th = Math.atan2((a.y-b.y),(a.x-b.x));
	if (a.x-b.x<0) {th+=Math.PI};
	return th;
};
function resetgame () {
	p = {x:250,y:300,p:{x:0,y:0},r:0,th:0};
	sp={x:Math.random()*300+100,y:450,r:0,th:0}
	intp={x:Math.random()*300+100,y:100,r:0,th:0};
	paused=false;
	won=false;
}
function update () {
	if (!paused && !won) {
		p.th = thto(p,p.p);
		p.r=dist(p,p.p);
		//Deceleration
			intp.r*=decel;
			sp.r*=decel;
		//Collisions
			if (dist(p,intp)<35 && !intp.c) {
				//Puck is still, paddle hits it = vhit
					vhit = ptor({th:thto(p,intp),r:2*(Math.cos(thto(p,intp)-p.th)*p.r)});
				//Paddle is still, puck bounces off = vbounce
					vbounce = ptor({th:Math.PI + 2*thto(p,intp) - intp.th,r:intp.r});
					vnew = {xv:vhit.xv+vbounce.xv,yv:vhit.yv+vbounce.yv};
					pnew = rtop(vnew);
					intp.th = pnew.th;
					intp.r = pnew.r;
					intp.c=true;
			} else if(dist(p,intp)>35) {intp.c=false}
			if (dist(intp,sp)<30 && !sp.c) {
				intp.r = [sp.r, sp.r=intp.r][0];
				intp.th= [Math.PI + 2*thto(sp,intp) - intp.th, sp.th = Math.PI + 2*thto(intp,sp) - sp.th][0];
				sp.c=true;
			} else if (dist(intp,sp)>30) {sp.c=false}
		//Pucks Move
			intp.x+=Math.cos(intp.th)*intp.r;
			intp.y+=Math.sin(intp.th)*intp.r;
			sp.x+=Math.cos(sp.th)*sp.r;
			sp.y+=Math.sin(sp.th)*sp.r;
		//Intp bouncing
			if (intp.x<=15) {
				intp.x = 30 - intp.x;
				intp.th= Math.PI-intp.th;
			}
			if (intp.x>=485) {
				intp.x = 970 - intp.x;
				intp.th= Math.PI-intp.th;
			}
			if (intp.y<=15) {
				if (intp.x>200&&intp.x<300) {won=2;}
				else {
					intp.y = 30 - intp.y;
					intp.th= tau-intp.th;
				}
			}
			if (intp.y>=485) {
				intp.y = 970 - intp.y;
				intp.th= tau-intp.th;
			}
		//Sp bouncing
			if (sp.x<=15) {
				sp.x = 30 - sp.x;
				sp.th= Math.PI-sp.th;
			}
			if (sp.x>=485) {
				sp.x = 970 - sp.x;
				sp.th= Math.PI-sp.th;
			}
			if (sp.y<=15) {
				if (sp.x>200&&sp.x<300) {won=1;}
				else {
					sp.y = 30 - sp.y;
					sp.th= tau - sp.th;
				}
			}
			if (sp.y>=485) {
				sp.y = 970 - sp.y;
				sp.th= tau - sp.th;
			}
		p.p.x=p.x;
		p.p.y=p.y;
	} else if (won) {
		//Collisions
			if (dist(p.p,intp)<35 && !intp.c && won==1) {
				intp.r = [p.r, p.r=intp.r][0];
				intp.th= [Math.PI + 2*thto(p.p,intp) - intp.th, p.th = Math.PI + 2*thto(intp,p.p) - p.th][0];
				intp.c=true;
			} else if(dist(p,intp)>35) {intp.c=false}
		//Pucks Move
			intp.x+=Math.cos(intp.th)*intp.r/10;
			intp.y+=Math.sin(intp.th)*intp.r/10;
			sp.x+=Math.cos(sp.th)*sp.r/10;
			sp.y+=Math.sin(sp.th)*sp.r/10;
			p.p.x+=Math.cos(p.th)*p.r/10;
			p.p.y+=Math.sin(p.th)*p.r/10;
		//P bouncing
			if (p.p.x<=20) {
				p.p.x = 40 - p.p.x;
				p.th= Math.PI-p.th;
			}
			if (p.p.x>=480) {
				p.p.x = 960 - p.p.x;
				p.th= Math.PI-p.th;
			}
			if (p.p.y<=20) {
				p.p.y = 40 - p.p.y;
				p.th= tau-p.th;
			}
			if (p.p.y>=480) {
				p.p.y = 960 - p.p.y;
				p.th= tau-p.th;
			}
		//Intp bouncing
			if (intp.x<=15) {
				intp.x = 30 - intp.x;
				intp.th= Math.PI-intp.th;
			}
			if (intp.x>=485) {
				intp.x = 970 - intp.x;
				intp.th= Math.PI-intp.th;
			}
			if (intp.y<=15) {
				intp.y = 30 - intp.y;
				intp.th= tau-intp.th;
			}
			if (intp.y>=485) {
				intp.y = 970 - intp.y;
				intp.th= tau-intp.th;
			}
		//Sp bouncing
			if (sp.x<=15) {
				sp.x = 30 - sp.x;
				sp.th= Math.PI-sp.th;
			}
			if (sp.x>=485) {
				sp.x = 970 - sp.x;
				sp.th= Math.PI-sp.th;
			}
			if (sp.y<=15) {
				sp.y = 30 - sp.y;
				sp.th= tau - sp.th;
			}
			if (sp.y>=485) {
				sp.y = 970 - sp.y;
				sp.th= tau - sp.th;
			}
	}
}
function draw () {
	//Clear
		ctx.fillStyle = '#AADDFF';
		ctx.fillRect(0,0,500,500);
	//Scoring Puck
		if (won!=1) {
			ctx.fillStyle = '#AA1111';
			ctx.beginPath();
			ctx.arc(sp.x,sp.y,15,0,tau);
			ctx.fill();
		}
	//Intermediate Puck
		if (won!=2) {
			ctx.fillStyle = '#555555';
			ctx.beginPath();
			ctx.arc(intp.x,intp.y,15,0,tau);
			ctx.fill();
		}
	//Pusher if playing
		/*Big O - pusher */if(!won){
			ctx.fillStyle = '#339911';
			ctx.beginPath();
			if (paused) {ctx.arc(p.p.x,p.p.y,20,0,tau);} else {ctx.arc(p.x,p.y,20,0,tau);}
			ctx.fill();
		//Little O - pusher
			ctx.fillStyle = '#33FF11';
			ctx.beginPath();
			ctx.arc(p.x,p.y,16,0,tau);
			ctx.fill();
		//Tiny O - pusher
			ctx.fillStyle = '#339911';
			ctx.beginPath();
			ctx.arc(p.x,p.y,5,0,tau);
			ctx.fill();
	//Pusher if won
		/*Big O - pusher */}else{
			ctx.fillStyle = '#339911';
			ctx.beginPath();
			ctx.arc(p.p.x,p.p.y,20,0,tau);
			ctx.fill();
		//Little O - pusher
			ctx.fillStyle = '#33FF11';
			ctx.beginPath();
			ctx.arc(p.p.x,p.p.y,16,0,tau);
			ctx.fill();
		//Tiny O - pusher
			ctx.fillStyle = '#339911';
			ctx.beginPath();
			ctx.arc(p.p.x,p.p.y,5,0,tau);
			ctx.fill();
		//Cursor
			ctx.fillStyle = '#000000';
			ctx.beginPath();
			ctx.arc(p.x,p.y,4,0,tau);
			ctx.fill();
			ctx.fillStyle = '#00FF00';
			ctx.beginPath();
			ctx.arc(p.x,p.y,3,0,tau);
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
		if (won==1) {
			ctx.fillStyle = '#660066';
			ctx.font = '50px Arial';
			ctx.fillText('You Win!',160,200);
			ctx.font = '20px Arial';
			ctx.fillText('Click in the black circle to restart',120,230);
			ctx.fillStyle = '#000000';
			ctx.beginPath();
			ctx.arc(250,300,10,0,tau);
			ctx.stroke();
		};
	//Lose text + circle
		if (won==2) {
			ctx.fillStyle = '#660066';
			ctx.font = '50px Arial';
			ctx.fillText('You Lose!',160,200);
			ctx.font = '20px Arial';
			ctx.fillText('Click in the black circle to restart',120,230);
			ctx.fillStyle = '#000000';
			ctx.beginPath();
			ctx.arc(250,300,10,0,tau);
			ctx.stroke();
		};
}
window.onmousedown = function (e) {
	if (won&&dist({x:250,y:300},p)<10) {resetgame()}
	else if (!paused) {paused=true}
	else if (dist(p.p,p)<20) {paused=false};
};
window.onmousemove = function (e) {
	p.x = e.clientX-c.offsetLeft;
	p.y = e.clientY-c.offsetTop;
	if ((e.clientX-c.offsetLeft<-20) || (e.clientX-c.offsetLeft>520) || (e.clientY-c.offsetTop<-20) || (e.clientY-c.offsetTop>520)) {paused=true;}
	if (!won) {
		if (p.x<20) {p.x=20}
		if (p.x>480) {p.x=480}
		if (p.y<20) {p.y=20}
		if (p.y>480) {p.y=480}
		if (paused && dist(p.p,p)<10) {
			p.x=p.p.x;
			p.y=p.p.y;
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