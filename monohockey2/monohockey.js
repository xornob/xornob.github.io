var item = {
  paddle = {
    x = 0,
    y = 0,
    xv= 0,
    yv= 0,
    r = 0,
    th= 0},
  pucks = [],
};

function start (num=3) {
  col = ['#FF0000', '#FF7B00', '#FAFF00', '#2EFF00', '#00FFF6', '#6E00FF', '#FF00F2']
  num = Math.max(Math.min(num, 9), 2);
  for (var i = 0; i < num; i++) {
    item.pucks.push({x = (i*(300/num) - 150),y = -30,xv= 0,yv= 0,r = 0,th= 0,col=''});
  };
}

window.onload = function () {

};