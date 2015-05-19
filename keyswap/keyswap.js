//COPYRIGHT CJ DVORAK 2015
//Reuse and modification allowed with credit
var playing = 0;
var words = ["a","able","about","above","accept","across","act","actually","add","admit","afraid","after","afternoon","again","against","age","ago","agree","ah","ahead","air","all","allow","almost","alone","along","already","alright","also","although","always","am","amaze","an","and","anger","angry","animal","annoy","another","answer","any","anymore","anyone","anything","anyway","apartment","apparently","appear","approach","are","area","arm","around","arrive","as","ask","asleep","at","attack","attempt","attention","aunt","avoid","away","baby","back","bad","bag","ball","band","bar","barely","bathroom","be","beat","beautiful","became","because","become","bed","bedroom","been","before","began","begin","behind","believe","bell","beside","besides","best","better","between","big","bit","bite","black","blink","block","blonde","blood","blue","blush","body","book","bore","both","bother","bottle","bottom","box","boy","boyfriend","brain","break","breakfast","breath","breathe","bright","bring","broke","broken","brother","brought","brown","brush","build","burn","burst","bus","business","busy","but","buy","by","call","calm","came","can","car","card","care","carefully","carry","case","cat","catch","caught","cause","cell","chair","chance","change","chase","check","cheek","chest","child","children","chuckle","city","class","clean","clear","climb","close","clothes","coffee","cold","college","color","come","comment","complete","completely","computer","concern","confuse","consider","continue","control","conversation","cool","corner","couch","could","counter","couple","course","cover","crack","crazy","cross","crowd","cry","cup","cut","cute","dad","damn","dance","dark","date","daughter","day","dead","deal","dear","death","decide","deep","definitely","desk","did","die","different","dinner","direction","disappear","do","doctor","does","dog","done","door","doubt","down","drag","draw","dream","dress","drink","drive","drop","drove","dry","during","each","ear","early","easily","easy","eat","edge","either","else","empty","end","enjoy","enough","enter","entire","escape","especially","even","evening","eventually","ever","every","everyone","everything","exactly","except","excite","exclaim","excuse","expect","explain","expression","eye","eyebrow","face","fact","fall","family","far","fast","father","fault","favorite","fear","feel","feet","fell","felt","few","field","fight","figure","fill","finally","find","fine","finger","finish","fire","first","fit","five","fix","flash","flip","floor","fly","focus","follow","food","foot","for","force","forget","form","forward","found","four","free","friend","from","front","frown","full","fun","funny","further","game","gasp","gave","gaze","gently","get","giggle","girl","girlfriend","give","given","glad","glance","glare","glass","go","God","gone","gonna","good","got","gotten","grab","great","green","greet","grey","grin","grip","groan","ground","group","grow","guard","guess","gun","guy","had","hair","half","hall","hallway","hand","handle","hang","happen","happy","hard","has","hate","have","he","head","hear","heard","heart","heavy","held","hell","hello","help","her","here","herself","hey","hi","hide","high","him","himself","his","hit","hold","home","hope","horse","hospital","hot","hour","house","how","however","hug","huge","huh","human","hundred","hung","hurry","hurt","ice","idea","if","ignore","imagine","immediately","important","in","inside","instead","interest","interrupt","into","is","it","its","jacket","jeans","jerk","job","join","joke","jump","just","keep","kept","key","kick","kid","kill","kind","kiss","kitchen","knee","knew","knock","know","known","lady","land","large","last","late","laugh","lay","lead","lean","learn","least","leave","led","left","leg","less","let","letter","lie","life","lift","light","like","line","lip","listen","little","live","lock","locker","long","look","lose","lost","lot","loud","love","low","lunch","mad","made","make","man","manage","many","mark","marry","match","matter","may","maybe","me","mean","meant","meet","memory","men","mention","met","middle","might","mind","mine","minute","mirror","miss","mom","moment","money","month","mood","more","morning","most","mother","mouth","move","movie","much","mum","mumble","music","must","mutter","my","myself","name","near","nearly","neck","need","nervous","never","new","next","nice","night","no","nod","noise","none","normal","nose","not","note","nothing","notice","now","number","obviously","of","off","offer","office","often","oh","okay","old","on","once","one","only","onto","open","or","order","other","our","out","outside","over","own","pack","pain","paint","pair","pants","paper","parents","park","part","party","pass","past","pause","pay","people","perfect","perhaps","person","phone","pick","picture","piece","pink","piss","place","plan","play","please","pocket","point","police","pop","position","possible","power","practically","present","press","pretend","pretty","probably","problem","promise","pull","punch","push","put","question","quick","quickly","quiet","quietly","quite","race","rain","raise","ran","rang","rather","reach","read","ready","real","realize","really","reason","recognize","red","relationship","relax","remain","remember","remind","repeat","reply","respond","rest","return","ride","right","ring","road","rock","roll","room","rose","round","rub","run","rush","sad","safe","said","same","sat","save","saw","say","scare","school","scream","search","seat","second","see","seem","seen","self","send","sense","sent","serious","seriously","set","settle","seven","several","shadow","shake","share","she","shift","shirt","shock","shoe","shook","shop","short","shot","should","shoulder","shout","shove","show","shower","shrug","shut","sick","side","sigh","sight","sign","silence","silent","simply","since","single","sir","sister","sit","situation","six","skin","sky","slam","sleep","slightly","slip","slow","slowly","small","smell","smile","smirk","smoke","snap","so","soft","softly","some","somehow","someone","something","sometimes","somewhere","son","song","soon","sorry","sort","sound","space","speak","spend","spent","spoke","spot","stair","stand","star","stare","start","state","stay","step","stick","still","stomach","stood","stop","store","story","straight","strange","street","strong","struggle","stuck","student","study","stuff","stupid","such","suck","sudden","suddenly","suggest","summer","sun","suppose","sure","surprise","surround","sweet","table","take","taken","talk","tall","teacher","team","tear","teeth","tell","ten","than","thank","that","the","their","them","themselves","then","there","these","they","thick","thing","think","third","this","those","though","thought","three","threw","throat","through","throw","tie","tight","time","tiny","tire","to","today","together","told","tomorrow","tone","tongue","tonight","too","took","top","totally","touch","toward","town","track","trail","train","tree","trip","trouble","trust","truth","try","turn","TV","twenty","two","type","uncle","under","understand","until","up","upon","us","use","usual","usually","very","visit","voice","wait","wake","walk","wall","want","warm","warn","was","watch","water","wave","way","we","wear","week","weird","well","went","were","wet","what","whatever","when","where","whether","which","while","whisper","white","who","whole","why","wide","wife","will","wind","window","wipe","wish","with","within","without","woke","woman","women","wonder","wood","word","wore","work","world","worry","worse","would","wow","wrap","write","wrong","yeah","year","yell","yes","yet","you","young","your","yourself"]
var len=words.length,a,paused,gameh,gamed,gamen,swapholder,swapped,swap1,swap2,swapchance=.01,isswapped=false,swapped1,swapped2,loop,speed = 1.9,keys = {},score= 0;
function keyswap () {
	document.title='KeySwap';
	document.getElementById('title').innerHTML='KeySwap';
	if (!playing) {
		gamed.innerHTML='Press any key to ';
	}
	if (playing==2) {
		gamed.innerHTML = 'Refresh to re';
		gamen.innerHTML = 'try. Score:'+score;
	};
}
function seykwap () {
	document.title='SeyKwap';
	document.getElementById('title').innerHTML='SeyKwap';
	if (!playing) {
		gamed.innerHTML='Prekk any sey to ';
	}
	if (playing==2) {
		gamed.innerHTML = 'Erfersh to er';
		gamen.innerHTML = 'tey. Scoer:'+score;		
	};
	window.setTimeout(keyswap,1000);
}
function checkleave (e) {
	window.d=gamed.innerHTML;
	window.n=gamen.innerHTML;
	gamed.innerHTML=gamed.innerHTML.replace(/([A-z])/g,'X');
	gamen.innerHTML=gamen.innerHTML.replace(/([A-z])/g,'X');
	paused=true;
	var confirmationMessage = "Sometimes pressing <backspace> leaves the page. This is here to protect you!";
	(e || window.event).returnValue = confirmationMessage;
	return confirmationMessage;
}
function stopgame () {
	window.removeEventListener('beforeunload',checkleave);
	window.clearInterval(loop);
	playing=2;
	gamed.innerHTML = 'Refresh to re';
	gamen.innerHTML = 'try. Score:'+score;
	gameh.style.fontSize=(window.innerWidth/17)+'px';
	gameh.style.textAlign='center'
	gameh.style.left ='-100px';
	gameh.style.right='-100px';
}
function swapback () {
	keys[swapped1]=String.fromCharCode(swapped1);
	keys[swapped2]=String.fromCharCode(swapped2);
	swapholder.style.display='none';
	isswapped=false;
}
function swap () {
	swapped1 = Math.floor(Math.random()*26)+65;
	swapped2 = Math.floor(Math.random()*26)+65;
	while (swapped2==swapped1) {swapped2 = Math.floor(Math.random()*26)+65;};
	keys[swapped1]=String.fromCharCode(swapped2);
	keys[swapped2]=String.fromCharCode(swapped1);
	swap1.innerHTML=keys[swapped1];
	swap2.innerHTML=keys[swapped2];
	swapholder.style.display='block';
	window.setTimeout(swapback,Math.random()*2000+3000);
	isswapped=true;
}
function frame () {
	if (!paused) {
		var t = (new Date()).getTime();
		gameh.style.left=(gameh.getBoundingClientRect().left-Math.floor(speed*(t-window.old)/10))+'px';
		speed+=0.0005;
		if (gamen.getBoundingClientRect().right>-5) {
			gamen.innerHTML+=' '+words[Math.floor(Math.random()*len)];
		};
		if (gameh.getBoundingClientRect().left<-300) {
			gameh.style.left=(gameh.getBoundingClientRect().left+(window.innerWidth/9.5))+'px';
			gamed.innerHTML='.'+gamed.innerHTML.substr(4);
		};
		if (gamen.getBoundingClientRect().left<0) {stopgame();}
		if (' '==gamen.innerHTML.charAt(0)) {
			gamed.innerHTML+=' ';
			gamen.innerHTML=gamen.innerHTML.substr(1);
		};
		if (!isswapped&&Math.random()<swapchance) {swap();};
		window.old = t;
	} else {
		gamed.innerHTML=window.d;
		gamen.innerHTML=window.n;
		paused=false;
		window.old = (new Date()).getTime();
	};

};
window.onresize = function() {
	a.style.left=(window.innerWidth/2-70)+'px';
	gameh.style.fontSize=(window.innerWidth/17)+'px';
	swapholder.style.left=(window.innerWidth/2-300)+'px';
	if (!playing) {gameh.style.left=(window.innerWidth/6)+'px';}
};
window.onload = function() {
	paused=false;
	a = document.getElementsByTagName('a')[0];
	a.style.top='10px';
	for (var i = 65; i < 91; i++) {
		keys[i]=String.fromCharCode(i);
	};
	window.setInterval(seykwap,5000);
	swapholder = document.getElementById('swap');
	gameh = document.getElementById('gameh');
	gamed = document.getElementById('gamed');
	gamen = document.getElementById('gamen');
	swap1 = document.getElementById('swap1');
	swap2 = document.getElementById('swap2');
	swapholder.style.top='300px'
	swapholder.style.display='none';
	gameh.style.left=(window.innerWidth/6)+'px';
	window.onresize();
	frame();
};
document.onkeydown=function(e) {
	var key = (window.event || e).keyCode;
	if(!playing) {
		window.addEventListener("beforeunload",checkleave);
		playing=1;
		loop = window.setInterval(frame,20);
		gamed.innerHTML='Press any key to ';
		if (key==66) {
			gamed.innerHTML+='b';
			gamen.innerHTML=gamen.innerHTML.substr(1);
			score+=1;
		};
		window.old=(new Date()).getTime()
	} else if (playing==1&&keys[key]==gamen.innerHTML.charAt(0).toUpperCase()) {
		gamed.innerHTML+=gamen.innerHTML.charAt(0);
		gamen.innerHTML=gamen.innerHTML.substr(1);
		score+=1;
	} else if (playing==1&&key==27) {
		window.d=gamed.innerHTML;
		window.n=gamen.innerHTML;
		gamed.innerHTML=gamed.innerHTML.replace(/([A-z])/g,'X');
		gamen.innerHTML=gamen.innerHTML.replace(/([A-z])/g,'X');
		paused=true;
		alert('Game Paused. Ok or <space> to resume.');
	};
};
