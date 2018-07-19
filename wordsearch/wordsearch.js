var cheating = false, size = {x:20,y:20}, word, drow, grid = {}, wordcount=0, giveupletters=[], givenup=false, gottenwords={}, elem={}, noletter, settingErrors = []
selection = {
	head:{x:-1,y:-1},
	list:[],
	exists:false
};
const DEFAULT = {
	SIZE:{x:20,y:20},
	WORD:"fish",
	ALLOWEDCHARS:" !\"#$%&'()*+,-./0123456789:;<=>?@[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",
	SETTINGINFO:"Enter the settings to use for the word search"
};

function cheat () {cheating=true;}

function c (a,b) {return {'x':a,'y':b}}

function divGet (o) {
	return ((((elem.container[o.x])||{})[o.y])||noletter);
}

function charGet (o) {
	return ((((grid[o.x])||{})[o.y])||'-');
}

function highlightRemove () {
	while (selection.list.length) {
		var z = divGet(selection.list.shift());
		z.style.backgroundColor=z.unselectedColor;
	}
}

function highlightAdd () {
	for (var i = 0; i < selection.list.length; i++) {
		divGet(selection.list[i]).style.backgroundColor='red';
	}
}

function selectionBegin (x,y) {
	if (givenup) return;
	selection.exists=true;
	divGet(c(x,y)).style.backgroundColor='red';
	selection.head = c(x,y);
	selection.list = [selection.head];
}

function selectionUpdate (x,y) {
	var bx=Math.max(x,selection.head.x);
	var sx=Math.min(x,selection.head.x);
	var by=Math.max(y,selection.head.y);
	var sy=Math.min(y,selection.head.y);
	highlightRemove();
	if (bx==sx) {
		for (var i = sy; i <= by; i++) {
			selection.list.push(c(bx,i));
		}
	}
	else if (by==sy) {
		for (var i = sx; i <= bx; i++) {
			selection.list.push(c(i,by));
		}
	}
	else if ((y-selection.head.y)===(x-selection.head.x)) {
		for (var i = 0; i <= bx-sx; i++) {
			selection.list.push(c(sx+i,sy+i))
		};
	}
	else if ((y-selection.head.y)===(selection.head.x-x)) {
		for (var i = 0; i <= bx-sx; i++) {
			selection.list.push(c(sx+i,by-i))
		};
	}
	else selection.list = [selection.head];
	highlightAdd();
}

function selectionStop () {
	if (selection.list.length == word.length) {
		var s = '';
		for (var i = 0; i < selection.list.length; i++) {
			s+=charGet(selection.list[i]);
		};
		if ((s===word || s===drow) && !gottenwords[''+selection.list[0].x+selection.list[0].y+selection.list[word.length-1].x+selection.list[word.length-1].y]) {
			for (var i = 0; i < selection.list.length; i++) {
				divGet(selection.list[i]).unselectedColor='#69f';
			};
			gottenwords[''+selection.list[0].x+selection.list[0].y+selection.list[word.length-1].x+selection.list[word.length-1].y]=true;
			wordcount -= 1;
			elem.remaining.set(wordcount);
			if (wordcount===0) {
				elem.complete.set('You got all '+total.innerHTML+' occurences of "'+word+'"<br>Refresh to try again');
				elem.complete.style.display='';
				givenup=true;
				elem.giveup.style.display='none';
			};
		};
	}
	selection.exists=false;
	highlightRemove();
}

function start () {
	word = elem.wordin.value;
	if (!isNaN(elem.x.value) && !isNaN(elem.y.value) && elem.x.value && elem.y.value) {
		size.x = +elem.x.value;
		size.y = +elem.y.value;
	} else return;
	drow = word.split('').reverse().join('');
	elem.settings.style.display="none";
	for (var i = 0; i < size.x; i++) { //Generate Grid of Chars
		grid[i]={};
		for (var j = 0; j < size.y; j++) {
			grid[i][j]=word.charAt(Math.random()*word.length);
		}
	}
	switch (cheating?1:(Math.floor(Math.random()*4))) { //Force 1 occurrence of word
		case 0: //Vertical
			temp={x:(Math.floor(Math.random()*(size.x))),y:(Math.floor(Math.random()*(size.y-word.length))),word:(Math.random()<.5?word:drow)};
			for (i=0;i<word.length;i++) {
				grid[temp.x][temp.y+i]=temp.word.charAt(i);
			}
			break;
		case 1: //Horizontal
			temp=cheating?{x:0,y:0,word:word}:({x:(Math.floor(Math.random()*(size.x-word.length))),y:(Math.floor(Math.random()*(size.y))),word:(Math.random()<.5?word:drow)});
			for (i=0;i<word.length;i++) {
				grid[temp.x+i][temp.y]=temp.word.charAt(i);
			}
			break;
		case 2: //Diagonal \ 
			temp={x:(Math.floor(Math.random()*(size.x-word.length))),y:(Math.floor(Math.random()*(size.y-word.length))),word:(Math.random()<.5?word:drow)};
			for (i=0;i<word.length;i++) {
				grid[temp.x+i][temp.y+i]=temp.word.charAt(i);
			}
			break;
		case 3: //Diagonal /
			temp={x:(Math.floor(Math.random()*(size.x-word.length))),y:(Math.floor(Math.random()*(size.y-word.length))),word:(Math.random()<.5?word:drow)};
			for (i=0;i<word.length;i++) {
				grid[temp.x+word.length-(i+1)][temp.y+i]=temp.word.charAt(i);
			}
			break;
	}
	for (var x = 0; x < size.x; x++) { //Construct search HTML elements
		var temp = document.createElement('div');
		temp.className='col';
		temp.x=x;
		elem.container.appendChild(temp);
		elem.container[x]=temp;
		for (var y = 0; y < size.y; y++) {
			var temp = document.createElement('div');
			temp.x=x;
			temp.y=y;
			temp.unselectedColor='transparent';
			temp.style.backgroundColor=temp.unselectedColor;
			temp.onmousedown = function () {selectionBegin(this.x,this.y);};
			temp.onmouseenter = function () {
				if (selection.exists) {
					selectionUpdate(this.x,this.y);
				}
			};
			temp.onmouseup = function() {selectionStop();};
			temp.className='letter';
			temp.innerHTML=charGet(c(x,y));
			elem.container[x].appendChild(temp);
			elem.container[x][y]=temp;
		}
	}
	for (x = 0; x < size.x; x++) { //Finds Words Vertical
		for (y = 0; y < size.y; y++) {
			var s = '';
			for (var i = 0; i < word.length; i++) {
				s+=charGet(c(x,y+i));
			};
			if (s===word||s===drow) {
				wordcount+=1;
				gottenwords[""+x+y+x+(y+word.length)]=false;
				for (var i = 0; i < word.length; i++) {
					giveupletters.push(divGet(c(x,y+i)));
					if (cheating) divGet(c(x,y+i)).style.fontWeight = 600;
				};
			}
		};
	};
	for (x = 0; x < size.x; x++) { //Finds Words Horizontal
		for (y = 0; y < size.y; y++) {
			var s = '';
			for (var i = 0; i < word.length; i++) {
				s+=charGet(c(x+i,y));
			};
			if (s===word||s===drow) {
				wordcount+=1;
				gottenwords[""+x+y+(x+word.length)+y]=false;
				for (var i = 0; i < word.length; i++) {
					giveupletters.push(divGet(c(x+i,y)));
					if (cheating) divGet(c(x+i,y)).style.fontWeight = 600;
				};
			}
		};
	};
	for (x = 0; x < size.x; x++) { //Finds Words Diagonal \ 
		for (y = 0; y < size.y; y++) {
			var s = '';
			for (var i = 0; i < word.length; i++) {
				s+=charGet(c(x+i,y+i));
			};
			if (s===word||s===drow) {
				wordcount+=1;
				gottenwords[""+x+y+(x+word.length)+(y+word.length)]=false;
				for (var i = 0; i < word.length; i++) {
					giveupletters.push(divGet(c(x+i,y+i)));
					if (cheating) divGet(c(x+i,y+i)).style.fontWeight = 600;
				};
			}
		};
	};
	for (x = 0; x < size.x; x++) { //Finds Words Diagonal /
		for (y = 0; y < size.y; y++) {
			var s = '';
			for (var i = 0; i < word.length; i++) {
				s+=charGet(c(x+i,y-i));
			};
			if (s===word||s===drow) {
				wordcount+=1;
				for (var i = 0; i < word.length; i++) {
					giveupletters.push(divGet(c(x+i,y-i)));
					if (cheating) divGet(c(x+i,y-i)).style.fontWeight = 600;
				};
			}
		};
	};
	elem.remaining.set(elem.total.set(wordcount));
	elem.wordDisplay.set('"'+word+'"');
	elem.giveup.set('Give Up');
	elem.giveup.onmousedown = function () {
		this.innerHTML='Are you SURE?';
		this.onmousedown= function () {
			givenup=true;
			elem.givenup.set('YOU GAVE UP WHEN THERE WERE '+wordcount+'/'+total.innerHTML+' OCCURENCES REMAINING');
			elem.counts.style.display='none';
			elem.givenup.style.display='';
			for (var i = 0; i < giveupletters.length; i++) {
				if (giveupletters[i].unselectedColor==='transparent') giveupletters[i].style.backgroundColor='#f69';
			};
			elem.giveup.style.display='none';
		}
	}
	elem.searchInfo.style.display = "";
}

function newSearch () {
	for (var x = 0; x < size.x; x++) {
		elem.container.removeChild(elem.container[x]);
	}	
	elem.searchInfo.style.display='none';
	elem.counts.style.display='';
	elem.giveup.style.display='';
	elem.complete.style.display='none';
	elem.givenup.style.display='none';
	elem.settings.style.display='';
	wordcount=0;
	giveupletters=[];
	givenup=false;
	gottenwords={};
}

function authSettings() {
	return;
}

window.onload = function() {
	document.body.removeChild(document.getElementById('nojs'));
	elem.start = document.getElementById('start');
	elem.start.disabled=false;
	elem.start.onmousedown=start;
	elem.container = document.getElementById('container');
	elem.noletter = document.createElement('div');
	elem.counts = document.getElementById('counts');
	elem.wordin = document.getElementById('wordin');
	elem.x = document.getElementById('x');
	elem.y = document.getElementById('y');
	elem.total=document.getElementById('total');
	elem.remaining = document.getElementById('remaining');
	elem.wordDisplay = document.getElementById('wordDisplay');
	elem.complete = document.getElementById('complete');
	elem.giveup = document.getElementById('giveup');
	elem.searchInfo = document.getElementById('searchInfo');
	elem.settingInfo = document.getElementById('settingInfo');
	elem.settings = document.getElementById('settings');
	elem.restart = document.getElementById('restart');
	elem.givenup = document.getElementById('givenup');
	elem.restart.onmousedown = newSearch;
	elem.givenup.set = elem.wordin.set = elem.x.set = elem.y.set = elem.total.set = elem.remaining.set = elem.wordDisplay.set = elem.complete.set = elem.giveup.set = elem.searchInfo.set = elem.settingInfo.set = function(s) {return this.innerHTML = this.value = s;};
	elem.wordin.oninput=function() {
		var s='', o=this.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").split('');
		for (var i = 0; i < o.length; i++) {
			if (DEFAULT.ALLOWEDCHARS.includes(o[i])) s+=o[i];
		};
		this.value=s;
		authSettings();
	};
	elem.wordin.onchange=elem.wordin.oninput;
	elem.wordin.onpropertychange=elem.wordin.oninput;
	elem.x.onpropertychange=elem.x.onchange=elem.x.oninput = function() {
		var s='', o=this.value.split('');
		for (var i = 0; i < o.length; i++) {
			if (o[i].match(/[0-9]/i)) s+=o[i];
		};
		this.value=s;
		authSettings();
	};
	elem.y.onpropertychange=elem.y.onchange=elem.y.oninput = function() {
		var s='', o=this.value.split('');
		for (var i = 0; i < o.length; i++) {
			if (o[i].match(/[0-9]/i)) s+=o[i];
		};
		this.value=s;
		authSettings();
	};
	document.body.onmouseup=function() {selection.exists=false;highlightRemove();};;
};
