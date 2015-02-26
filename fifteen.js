function fastmode () {
	this.off =function () {
		window.on=false;
		this.style.background = "#FF0000";
		for (var i = puzz.length - 1; i >= 0; i--)
			puzz[i].onmouseover = lightup;
	}
	this.on = function  () {
		window.on=true;
		this.style.background = "#00FF00";
		for (var i = puzz.length - 1; i >= 0; i--)
			puzz[i].onmouseover = trymove;
	}
	if (window.on) {this.off();}
	else{this.on();};
}
function checksolved () {
	var check = true;
	for (var i = 0; i < puzz.length; i++) {
		var p = i+1;
		var x = 100*((p%4)-1);
		if (p%4==0) {x = 300;};
		var y = 100*(Math.floor((p-1)/4));
		if (!((x==puzz[i].offsetLeft)&&(y==puzz[i].offsetTop))) {
			check=false;
		};
	};
	if (check == true) {
		for (var i = 0; i < puzz.length; i++) {
			var backx = -100*(((i+1)%4)-1);
			var backy = -100*(Math.floor(i/4));
			puzz[i].style.background="url('solved.jpg')";
			puzz[i].style.backgroundPosition = ((backx-5) + "px " + (backy-5) + "px");
			puzz[i].style.border = "solid transparent 5px";
			puzz[i].style.color = 'transparent';
		}
		blank.style.background="url('solved.jpg')";
		blank.style.backgroundPosition='100px 100px';
		window.solved=true;
		document.getElementById('epona').load();
		document.getElementById('epona').play();
		document.getElementById('fast').off();
	} else {
		if (window.solved) {
			for (var i = 0; i < puzz.length; i++) {
				var backx = -100*(((i+1)%4)-1);
				var backy = -100*(Math.floor(i/4));
				puzz[i].style.background="url('background.jpg')";
				puzz[i].style.backgroundPosition = ((backx-5) + "px " + (backy-5) + "px");
				puzz[i].style.border = "solid white 5px";
				puzz[i].style.color = 'white';
			}
			blank.style.background='#00FF00';
			window.solved=false;
			document.getElementById('epona').pause();
		}
	}
}
function start () {
	document.body.innerHTML='<a href="other.html"><h2>BACK</h2></a><h1>Fifteen Puzzle</h1><div id="puzzlearea"><img id="view" src="background.jpg" /><div id="blank"></div></div><div class="buttons"><div id="options" class="button">MORE OPTIONS</div></div>';
	for (x=0;x<15;x++){
		var piece = document.createElement('div');
		piece.className='puzzlepiece';
		document.getElementById('puzzlearea').appendChild(piece);
	}
	var title = document.createElement('title');
	title.innerHTML = 'FIFTEEN PUZZLE';
	document.getElementsByTagName('head')[0].appendChild(title);
	var linka  = document.createElement('link');
	linka.href = 'all.css';
	linka.type = 'text/css';
	linka.rel  = 'stylesheet';
	document.getElementsByTagName('head')[0].appendChild(linka);
	var linkb  = document.createElement('link');
	linkb.href = 'fifteen.css';
	linkb.type = 'text/css';
	linkb.rel  = 'stylesheet';
	document.getElementsByTagName('head')[0].appendChild(linkb);
	var song = document.createElement('audio');
	song.src = 'epona.mp3';
	song.id = 'epona';
	document.getElementsByTagName('head')[0].appendChild(song);
	song.load();
	var move = document.createElement('audio');
	move.src = 'move.wav';
	move.id = 'move';
	document.getElementsByTagName('head')[0].appendChild(move);
	move.load();
	window.on = false;
	window.solved = false;
	window.numbers = 'none';
	window.puzz = document.getElementsByClassName('puzzlepiece');
	window.integral = 0;
	window.integralcode = [76,69,84,32,77,69,32,87,73,78];
	window.blank = document.getElementById('blank');
	document.getElementById('options').onclick = options;
	blank.style.position = "absolute";
	blank.style.left = "300px";
	blank.style.top = "300px";
	for (var i = puzz.length - 1; i >= 0; i--) {puzz[i].style.styleFloat="left";}
	for (var i = puzz.length - 1; i >= 0; i--) {
		var p = i + 1;
		puzz[i].number = p;
		puzz[i].onmouseover = lightup;
		puzz[i].onclick = trymove;
		puzz[i].onmouseout = lightdown;
		var x = -100*((p%4)-1);
		var y = -100*(Math.floor(i/4));
		puzz[i].style.background="url('background.jpg')";
		puzz[i].style.backgroundPosition = ((x-5) + "px " + (y-5) + "px");
		puzz[i].style.position = "absolute";
		x+=200;
		if (x!=300) {x=200-x;}
		puzz[i].style.left = ((x)+"px");
		puzz[i].style.top = ((-y)+"px");
	};
	document.getElementById('view').style.display="inline-block";
	window.setTimeout(startnoview,1500);
	shuffle();
	checksolved();
}
function options () {
	document.getElementsByClassName('buttons')[0].innerHTML='<div id="hide" class="button">LESS OPTIONS</div><div id="fast" class="button">CLICK-FREE MODE</div><div id="viewer" class="button">VIEW SOLVED</div><div id="shuffle" class="button">SHUFFLE</div><div id="nums" class="button">NO NUMBERS</div>';
	document.getElementById('fast').onclick = fastmode;
	document.getElementById('viewer').onmousedown = view;
	document.getElementById('viewer').onmouseup = noview;
	document.getElementById('viewer').onmouseout = noview;
	document.getElementById('shuffle').onclick = shufflestart;
	document.getElementById('nums').onclick = numberchange;
	document.getElementById('hide').onclick = hide;
}
function hide () {
	document.getElementsByClassName('buttons')[0].innerHTML='<div id="options" class="button">MORE OPTIONS</div>';
	document.getElementById('options').onclick = options;
}
function numberchange () {
	this.none = function () {
		window.numbers='none';
		this.style.background='#FF0000';
		this.innerHTML='NO NUMBERS';
		for (var i = puzz.length - 1; i >= 0; i--) {
			puzz[i].innerHTML='';}
	}
	this.hover = function () {
		window.numbers='hover';
		this.style.background='#0000FF';
		this.innerHTML='HOVER FOR NUMBERS';
	}
	this.always = function () {
		window.numbers='always';
		this.style.background='#00FF00';
		this.innerHTML='ALL NUMBERS';
		for (var i = puzz.length - 1; i >= 0; i--) {
			puzz[i].innerHTML=puzz[i].number;}
	}
	if (window.numbers=='always') {this.none();}
	else if (window.numbers=='none') {this.hover();}
	else {this.always()};
}
function startnoview () {document.getElementById('view').style.display="none";}
function noview () {
	document.getElementById('view').style.display="none";
	this.style.background = "#FF0000";
	this.innerHTML='VIEW SOLVED';
}
function view () {
	if (!window.solved) {
		document.getElementById('view').style.display="inline-block";
		this.style.background = "#00FF00";
	} else {this.innerHTML='ALREADY SOLVED';}
}
function shufflestart () {
	document.getElementById('shuffle').style.background="#00FF00";
	document.getElementById('shuffle').onclick = none;
	window.setTimeout(shuffle,500)
}
function shuffle () {
	for (var i = 0; i < 10000; i++) {shufflemove(puzz[Math.floor(Math.random()*15)]);};
	document.getElementById('epona').pause();
	checksolved();
	document.getElementById('move').load();
	document.getElementById('move').play();
	window.setTimeout(shufflerestore,500);
}
function shufflerestore () {
	document.getElementById('shuffle').onclick = shufflestart;
	document.getElementById('shuffle').style.background="#FF0000";
}
function none () {return;}
function shufflemove (obj) {
	if (((blank.offsetTop == obj.offsetTop)&&(100 == Math.abs(blank.offsetLeft - obj.offsetLeft)))||((blank.offsetLeft == obj.offsetLeft)&&(100 == Math.abs(blank.offsetTop - obj.offsetTop))))
	{
		var blankx = blank.offsetLeft;
		var blanky = blank.offsetTop;
		var thisx = obj.offsetLeft;
		var thisy = obj.offsetTop;
		blank.style.left = (thisx+"px");
		blank.style.top = (thisy+"px");
		obj.style.left = (blankx+"px");
		obj.style.top = (blanky+"px");
	}
}
function trymove () {
	if (((blank.offsetTop == this.offsetTop)&&(100 == Math.abs(blank.offsetLeft - this.offsetLeft)))||((blank.offsetLeft == this.offsetLeft)&&(100 == Math.abs(blank.offsetTop - this.offsetTop))))
	{
		var blankx = blank.offsetLeft;
		var blanky = blank.offsetTop;
		var thisx = this.offsetLeft;
		var thisy = this.offsetTop;
		blank.style.left = (thisx+"px");
		blank.style.top = (thisy+"px");
		this.style.left = (blankx+"px");
		this.style.top = (blanky+"px");
		document.getElementById('move').load();
		document.getElementById('move').play();
		checksolved();
	}
}
function lightup () {
	if(window.numbers=='hover'){this.innerHTML=this.number}
	if (((blank.offsetTop == this.offsetTop)&&(100 == Math.abs(blank.offsetLeft - this.offsetLeft)))||((blank.offsetLeft == this.offsetLeft)&&(100 == Math.abs(blank.offsetTop - this.offsetTop))))
	{
		this.style.border = "solid red 5px";
		this.style.color = "red";
	} else if (window.solved) {
		this.style.border = 'solid white 5px';
		this.style.color = 'white';
	}
}
function lightdown () {
	if(window.numbers=='hover'){this.innerHTML='';}
	if(window.solved){
		this.style.border = "solid transparent 5px";
		this.style.color = "transparent";
	} else {
		this.style.border = "solid white 5px";
		this.style.color = "white";	}
}
document.onkeydown = function(e) {
	var key = window.event || e;
	if (key.keyCode==integralcode[integral]&&!solved) {
		integral+=1;
	} else {
		integral=0;
	};
	if (integral==10) {
		for (var i = 0; i < puzz.length; i++) {
			var x = 100*(i%4);
			var y = 100*(Math.floor(i/4));
			if (y==300){x+=100;}
			puzz[i].style.left=x+'px';
			puzz[i].style.top=y+'px';
		};
		blank.style.left='0px';
		blank.style.top='300px';
		checksolved();
	};
};
window.onload = start;
