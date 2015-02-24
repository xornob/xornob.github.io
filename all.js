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
  var placelist = [['Home','index'],['Khan Academy','academy.html'],['App inventor','inventor.html']];
  for (x=0;x<placelist.length;x++){
    var link = document.createElement('a');
    link.href = ''
    link.className='puzzlelink';
  }
}