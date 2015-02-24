function lightup () {
    this.style.background = "#8AD7D2";
}
function lightdown () {
    this.style.background = "#11ADA3";
}
window.onload = function () {
  var banner = document.getElementById('banner');
  banner.onmouseover = lightup;
  banner.onmouseout = lightdown;
  banner.innerHTML = "<div id='name'>CJ Dvorak</div><div id='portfolio'>- Portfolio</div><div id='home'>HOME</div>";
}