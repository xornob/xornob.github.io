function lightup () {
    this.style.background = "#8AD7D2";
}
function lightdown () {
    this.style.background = "#11ADA3";
}
window.onload = function () {
  var banner = document.getElementById('banner');
  var places = document.getElementById('places');
  banner.onmouseover = lightup;
  banner.onmouseout = lightdown;
  banner.innerHTML = "<div id='name'>CJ Dvorak</div><div id='portfolio'>- Portfolio</div><div id='home'>HOME</div>";
  var placelist = [['Home','index'],['Khan Academy','academy'],['App inventor','inventor']];
  for (x=0;x<placelist.length;x++){
    var link = document.createElement('a');
    places.appendChild(link);
    link.href = placelist[x][1]+'.html';
    var ndiv = document.createElement('div');
    link.appendChild(ndiv);
    ndiv.innerHTML = placelist[x][0];
    ndiv.style.width=((998/placelist.length)-2)+'px';
    // ndiv.className = 'placeToGo';
  }
}