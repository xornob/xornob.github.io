var c, ctx, items=[];

function vel (a, b, pol) {
  this.pol = (typeof pol === 'undefined') ? !!pol : false;
  if (this.pol) {
    this.r = a;
    this.th= b;
    this.xv=Math.cos(b)*a;
    this.yv=Math.sin(b)*a;
  }
  else {
    this.xv = a;
    this.yv = b;
    this.r = Math.sqrt(a*a+b*b);
    this.th= Math.atan(b/a);
  }
  this.pol = function() {
    return {r:this.r,th:this.th};
  };
  this.car = function() {
    return {xv:this.xv,yv:this.yv};
  };
  return this;
}

function puck (x, y, paddle) {
  this.x = x;
  this.y = y;
  this.xv= 0;
  this.yv= 0;
  this.r = 0;
  this.th= 0;
  this.paddle = (typeof paddle === 'undefined') ? !!paddle : false;
  if (paddle) {
    this.move = function() {
      var m = ctx.getMouse();
      this.xv = this.x;
    };
  };
}

function start (num) {
  col = ['#FF0000', '#FF7B00', '#FAFF00', '#2EFF00', '#00FFF6', '#6E00FF', '#FF00F2']
  num = Math.max(Math.min(num, 7), 2);
  for (var i = 0; i < num; i++) {
    items.push((i*(300/num) - 150), -30, !i);
  };
}

window.onresize = function() {
  ctx.width = window.innerWidth;
  ctx.height = window.innerHeight;
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  ctx.clear();
};

window.onload = function () {
  c = window.getElementById('canvas');
  ctx = c.getContext('2d');
  ctx.clear = function() {
    this.fillStyle='#fa0013';
    this.rect(10, 10, this.width-10,this.height-10);
    this.fill();
  };
  ctx.circle = function(x, y, r, c, b, bc) {
    this.
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
  start(3);
};