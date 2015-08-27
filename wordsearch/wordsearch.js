var size = {x:20,y:20}, grid = {}, ss = {x:-1,y:-1}, sel = false, sh = [], wordcount=0, giveupletters=[], givenup=false, gottenwords={},
container, word, drow, noletter, counts, total, remaining, giveup, wordgetter, xgetter, ygetter;

function getletterdiv (o) {return container[o.x][o.y];}

function getletterchar (o) {return grid[o.x][o.y];}

function c (a,b) {return {'x':a,'y':b}}

function clearhighlight () {
	while (sh.length) {
		var z = getletterdiv(sh.shift());
		z.style.backgroundColor=z.iw;
	}
}

function highlight () {
	for (var i = 0; i < sh.length; i++) {
		getletterdiv(sh[i]).style.backgroundColor='red';
	}
}

function startselect (x,y) {
	if (givenup) return;
	sel=true;
	getletterdiv(c(x,y)).style.backgroundColor='red';
	ss = c(x,y);
	sh = [ss];
}

function selection (x,y) {
	var bx=Math.max(x,ss.x);
	var sx=Math.min(x,ss.x);
	var by=Math.max(y,ss.y);
	var sy=Math.min(y,ss.y);
	clearhighlight();
	if (bx==sx) {
		for (var i = sy; i <= by; i++) {
			sh.push(c(bx,i));
		}
	}
	else if (by==sy) {
		for (var i = sx; i <= bx; i++) {
			sh.push(c(i,by));
		}
	}
	else if ((y-ss.y)===(x-ss.x)) {
		for (var i = 0; i <= bx-sx; i++) {
			sh.push(c(sx+i,sy+i))
		};
	}
	else if ((y-ss.y)===(ss.x-x)) {
		for (var i = 0; i <= bx-sx; i++) {
			sh.push(c(sx+i,by-i))
		};
	}
	else sh = [ss];
	highlight();
}

function stopselect () {
	sel=false;
	var s = '';
	for (var i = 0; i < sh.length; i++) {
		s+=getletterchar(sh[i]);
	};
	if ((s===word || s===drow) && gottenwords[''+sh[0].x+sh[0].y+sh[word.length-1].x+sh[word.length-1].y]!=='lol') {
		for (var i = 0; i < sh.length; i++) {
			getletterdiv(sh[i]).iw='#69f';
		};
		gottenwords[''+sh[0].x+sh[0].y+sh[word.length-1].x+sh[word.length-1].y]='lol';
		wordcount -= 1;
		remaining.innerHTML = wordcount;
		if (wordcount===0) {
			counts.innerHTML='You got all '+total.innerHTML+' occurences of "'+word+'"<br>Refresh to try again';
			givenup=true;
			document.body.removeChild(giveup);
		};
	};
	clearhighlight();
}

function start () {
	word = wordgetter.value;
	counts.innerHTML='';
	if (!isNaN(xgetter.value) && !isNaN(ygetter.value) && xgetter.value && ygetter.value) {
		size.x = +xgetter.value;
		size.y = +ygetter.value;
	} else return;
	drow = word.split('').reverse().join('');
	document.body.removeChild(document.getElementById('toDelete'));
	for (var i = 0; i < size.x; i++) {
		grid[i]={};
		for (var j = 0; j < size.y; j++) {
			grid[i][j]=word.charAt(Math.random()*word.length);
		}
	}
	for (var x = 0, y = 0; y < size.y; x++) {
		if (y===0) {
			var temp = document.createElement('div');
			temp.className='col';
			temp.x=x;
			container.appendChild(temp);
			container[x]=temp;
		}
		var temp = document.createElement('div');
		temp.x=x;
		temp.y=y;
		temp.iw='transparent';
		temp.style.backgroundColor=temp.iw;
		temp.onmousedown = function () {startselect(this.x,this.y);};
		temp.onmouseenter = function () {
			if (sel) {
				selection(this.x,this.y);
			}
		};
		temp.onmouseup = function() {stopselect();};
		temp.className='letter';
		temp.innerHTML=grid[x][y];
		container[x].appendChild(temp);
		container[x][y]=temp;
		if (x==size.x-1) {x=-1;y++;}
	}
	for (var x = 0, y = 0; y < size.y - word.length; x++) { //Vertical
		var s = '';
		for (var i = 0; i < word.length; i++) {
			s+=getletterchar(c(x,y+i));
		};
		if (s===word||s===drow) {
			wordcount+=1;
			for (var i = 0; i < word.length; i++) {
				giveupletters.push(getletterdiv(c(x,y+i)));
			};
		}
		if (x==size.x-1) {x=-1;y++;}
	};
	for (var y = 0, x = 0; x < size.x-word.length; y++) { //Horizontal
		var s = '';
		for (var i = 0; i < word.length; i++) {
			s+=getletterchar(c(x+i,y));
		};
		if (s===word||s===drow) {
			wordcount+=1;
			for (var i = 0; i < word.length; i++) {
				giveupletters.push(getletterdiv(c(x+i,y)));
			};
		}
		if (y==size.y-1) {y=-1;x++;}
	};
	for (var y = 0, x = 0; x < size.x-word.length; y++) { // Diagonal \
		var s = '';
		for (var i = 0; i < word.length; i++) {
			s+=getletterchar(c(x+i,y+i));
		};
		if (s===word||s===drow) {
			wordcount+=1;
			for (var i = 0; i < word.length; i++) {
				giveupletters.push(getletterdiv(c(x+i,y+i)));
			};
		}
		if (y==size.y-(1+word.length)) {y=-1;x++;}
	};
	for (var x = 0, y = word.length; x < size.x-word.length; y++) { // Diagonal /
		var s = '';
		for (var i = 0; i < word.length; i++) {
			s+=getletterchar(c(x+i,y-i));
		};
		if (s===word||s===drow) {
			wordcount+=1;
			for (var i = 0; i < word.length; i++) {
				giveupletters.push(getletterdiv(c(x+i,y-i)));
			};
		}
		if (y==size.y-(1+word.length)) {y=word.length-1;x++;}
	};
	counts.innerHTML='There are <span id="remaining">'+wordcount+'</span>/<span id="total">'+wordcount+'</span> occurences of "'+word+'" remaining';
	total=document.getElementById('total');
	remaining=document.getElementById('remaining');
	giveup = document.createElement('button');
	giveup.innerHTML='Give Up';
	giveup.onmousedown = function () {
		this.innerHTML='Are you SURE?';
		this.onmousedown= function () {
			givenup=true;
			counts.innerHTML='YOU GAVE UP WHEN THERE WERE '+wordcount+'/'+total.innerHTML+' OCCURENCES REMAINING<br>Refresh to try again';
			for (var i = 0; i < giveupletters.length; i++) {
				if (giveupletters[i].iw==='transparent') giveupletters[i].style.backgroundColor='#f69';
			};
			document.body.removeChild(giveup);
		}
	}
	document.body.appendChild(giveup);
}

window.onload = function() {
	document.body.removeChild(document.getElementById('nojs'));
	document.getElementById('start').disabled=false;
	document.getElementById('start').onmousedown=start;
	container = document.getElementById('container');
	noletter = document.createElement('div');
	counts = document.getElementById('counts');
	wordgetter = document.getElementById('wordgetter');
	xgetter = document.getElementById('x');
	ygetter = document.getElementById('y');
	container[-1]={'-1':noletter};
	wordgetter.oninput=function() {
		var s='', o=this.value.split('');
		for (var i = 0; i < o.length; i++) {
			if (o[i].match(/[a-z]/i)) s+=o[i];
		};
		this.value=s.toLowerCase();
		document.getElementById('start').innerHTML='Start';
	};
	wordgetter.onchange=wordgetter.oninput;
	wordgetter.onpropertychange=wordgetter.oninput;
	xgetter.oninput = function() {
		var s='', o=this.value.split('');
		for (var i = 0; i < o.length; i++) {
			if (o[i].match(/[0-9]/i)) s+=o[i];
		};
		if (s==='') counts.innerHTML='The width can\'t be empty<br>';
		else if (+s===0) counts.innerHTML='The width can\'t be 0';
		else counts.innerHTML='Enter a word to use for the word search';
		this.value=s;
	};
	xgetter.onchange=xgetter.oninput;
	xgetter.onpropertychange=xgetter.oninput;
	ygetter.oninput = function() {
		var s='', o=this.value.split('');
		for (var i = 0; i < o.length; i++) {
			if (o[i].match(/[0-9]/i)) s+=o[i];
		};
		if (s==='') counts.innerHTML='The height can\'t be empty<br>';
		else if (+s===0) counts.innerHTML='The height can\'t be 0';
		else counts.innerHTML='Enter a word to use for the word search';
		this.value=s;
	};
	ygetter.onchange=ygetter.oninput;
	ygetter.onpropertychange=ygetter.oninput;
	document.body.onmouseup=function() {sel=false;clearhighlight();};;
};
