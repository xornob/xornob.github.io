function next () {
  document.getElementById('all').innerHTML = "<a href='index.html'><div id='banner'></div></a><div id='places'></div>"+document.getElementById('all').innerHTML;
  var banner = document.getElementById('banner');
  var places = document.getElementById('places');
  banner.onmouseover = function() {this.style.background = "#8AD7D2";};
  banner.onmouseout = function() {this.style.background = "#58C6BF";};
  banner.innerHTML = "<img id='tlogo' src='http://xornob.github.io/transparent.png' height=100 /><div id='name'>CJ Dvorak</div><div id='portfolio'>- Portfolio</div><div id='home'>HOME</div>";
  if (placelist='null') {
    document.getElementById('all').removeChild(document.getElementById('places'));
  } else {
    for (x=0;x<placelist.length;x++){
      var link = document.createElement('a');
      var ndiv = document.createElement('div');
      link.href = placelist[x][1]+'.html';
      ndiv.innerHTML = placelist[x][0];
      ndiv.style.width=((998/placelist.length)-2)+'px';
      ndiv.onmouseover = lightup;
      ndiv.onmouseout = lightdown;
      ndiv.className = 'placeToGo';
      link.appendChild(ndiv);
      places.appendChild(link);
    }
  }
}
window.onload = function () {
  var thing = document.createElement('script');
  thing.type="text/javascript";
  thing.src="places.js"
  thing.onreadystatechange = next;
  thing.onload = next;
  head.appendChild(thing);
}