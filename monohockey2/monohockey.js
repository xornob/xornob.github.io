var c, ctx;

function puck (x, y, paddle) {
  this.x = x;
  this.y = y;
  this.xv= 0;
  this.yv= 0;
  this.r = 0;
  this.th= 0;
  this.paddle = typeof paddle !== 'undefined';
  if (paddle) {
    this.move = function() {
      var m = ctx.getMouse();
      this.xv = this.x
    };
  };
}

function start (num=3) {
  col = ['#FF0000', '#FF7B00', '#FAFF00', '#2EFF00', '#00FFF6', '#6E00FF', '#FF00F2']
  num = Math.max(Math.min(num, 9), 2);
  for (var i = 0; i < num; i++) {
    x = (i*(300/num) - 150),y = -30
  };
}

window.onresize = function() {
  alert('test');
  ctx.width = window.innerWidth;
  ctx.height = window.innerHeight;
  c.width = window.innerWidth;
  c.height = window.innerHeight;
};

window.onload = function () {
  c = window.getElementById('canvas');
  ctx = c.getContext('2d');
  // ctx.clear = function() {this.backgroundColor()};
  ctx.circle = function(x, y, r, c, b=false, bc=false) {
    this.fillStyle = c;
    this.beginPath();
    this.arc(x, y, r, 0,2*Math.PI);
    this.fill();
    if (b) {
      this.lineWidth = b;
      this.strokeStyle = bc;
      this.stroke();
    }
  };
  ctx.getMouse = function() {return {x:this.mx,y:this.my};};
  window.onmousemove = function(e) {
    ctx.mx = e.clientX;
    ctx.my = e.clientY;
  };
};