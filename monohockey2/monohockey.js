var c, ctx, items=[], num;
window.gstate = -1;

function dist (a, b) {return Math.sqrt(Math.pow(a.x-b.x,2)+Math.pow(a.y-b.y,2));}
function trimto (l, i, m) {return Math.min(Math.max(l, i),m);}
function outside (l, i, m) {return trimto(l,i,m)!==i;}
function thto (a, b) {return (new vel(b.x-a.x, b.y-a.y, false)).th + (Math.PI * (a.x>b.x));}

function vel (a, b, pol) {
  this.pol = (typeof pol === 'undefined') ? false : !!pol;
  if (this.pol) {
    this.r = a;
    this.th= b;
    this.x=Math.cos(b)*a;
    this.y=Math.sin(b)*a;
  }
  else {
    this.x= a;
    this.y= b;
    this.r = Math.sqrt(a*a+b*b);
    this.th= Math.atan(b/a) || 0;
  }
  this.copy = function() {
    return new vel(this.x, this.y);
  };
  this.flipx = function() {
    return new vel(-this.x, this.y);
  };
  this.flipy = function() {
    return new vel(this.x, -this.y);
  };
  this.add = function(o) {
    var n = new vel(this.x+o.x,this.y+o.y);
    this.x = n.x;
    this.y = n.y;
    this.r = n.r;
    this.th= n.th;
    return n;
  };
  this.xr = function(n) {
    return new vel(this.r*n, this.th, true);
  };
  this.setr = function(n) {
    return new vel(n, this.th, true);
  };
  this.addth = function(n) {
    return new vel(this.r, this.th+n, true)
  };
  this.vmg = function(th) {
    var vmg = this.addth(-th).x;
    return vmg > 0 ? vmg : -vmg;
  };
}

function puck (x, y, paddle, n, color) {
  this.x = x;
  this.y = y;
  this.v = new vel(0, 0);
  this.paddle = !!paddle;
  if (paddle) {
    this.x = 255;
    this.y = 255;
    this.pause = function() {
      if (!window.gstate) {
        window.gstate=1;
      }
      else if ((window.gstate===-1 || window.gstate===1) && dist(this, ctx.getMouse()) < 10) {
        window.gstate=0;
      }
      else {
        window.gstate=1;
      }
    };
    this.update = function() {
      var m = ctx.getMouse();
      m = {x:trimto(18, m.x, 482),y:trimto(18, m.y, 482)};
      this.v = new vel(m.x-this.x,m.y-this.y);
      this.x = m.x;
      this.y = m.y;
      if (dist(this,items[1])<34) {
        if (!items[1].col) {
          var t = this.v.copy(), o = items[1].v.copy(), th = thto(this,items[1]);
          if (o.r===0) {
            items[1].v = new vel (t.vmg(th), th, true);
          }
          else if (t.r===0) {
            items[1].v = new vel (o.r, 2*th + Math.PI - o.th, true);
          }

          items[1].col = true;
        }
      } else (items[1].col = false)
    };
    this.draw = function() {
      ctx.circle(this.x, this.y, 16, '#FFFFFF', 4, '#000000');
      if (!window.gstate || dist(this, ctx.getMouse()) < 10) {
        ctx.circle(this.x, this.y, 3, '#000000');
      }
      else {
        var m = ctx.getMouse();
        ctx.circle(trimto(20, m.x, 480), trimto(20, m.y, 480), 15, '#FFFFFF', 2, '#000000');
        ctx.circle(trimto(20, m.x, 480), trimto(20, m.y, 480), 3, '#000000');
      }
    };
  } else {
    this.c = color;
    this.col = false;
    this.n = n;
    this.update = function () {
      //Collide
        if (items.length > this.n + 1) {
          if (dist(this, items[this.n+1]) < 32) {
            if (!items[this.n+1].col) {
              var t = this.v.copy(), o = items[this.n+1].v.copy(), th = thto(this, items[this.n+1]);

              // This is still
              if (o.r!==0) {
                ov = o.vmg(th+Math.PI);
                this.v = new vel (ov, th+Math.PI, true);
                items[this.n+1].v = new vel (ov-Math.abs(o.r), 2*th - o.th, true);
              } else {
                this.v = new vel (0, 0);
                items[this.n+1].v = new vel (0, 0);
              }

              // Other is still
              if (t.r!==0) {
                tv = t.vmg(th);
                this.v.add(new vel (tv-Math.abs(t.r), 2*th - t.th, true));
                items[this.n+1].v.add(new vel (tv, th, true));
              }

              items[this.n+1].col = true;
            }
          } else items[this.n+1].col = false;
        }
      //Move
        this.x += this.v.x;
        this.y += this.v.y;
      //Bounce
        if (this.x<16) {
          this.v = this.v.flipx();
          this.x = 32 - this.x;
          ctx.circle(this.x, this.y, 50, this.c);
        }
        else if (this.x>484) {
          this.v = this.v.flipx();
          this.x = 968 - this.x;
          ctx.circle(this.x, this.y, 50, this.c);
        }
        if (this.y<16) {
          this.v = this.v.flipy();
          this.y = 32 - this.y;
          ctx.circle(this.x, this.y, 50, this.c);
        }
        else if (this.y>484) {
          this.v = this.v.flipy();
          this.y = 968 - this.y;
          ctx.circle(this.x, this.y, 50, this.c);
        }
    };
    this.draw = function() {
      ctx.circle(this.x, this.y, 16, this.c);
    };
  }
}

function frame () {
  if (window.isbig && !window.gstate) {
    for (var i = 0; i < items.length; i++) {
      items[i].update();
    };
  }
  if (window.isbig) {
    ctx.clear();
    for (var i = items.length - 1; i >= 0; i--) {
      items[i].draw();
    };
  }
}

function start (n) {
  col = ['puck', '#FF0000', '#FF7B00', '#FAFF00', '#2EFF00', '#00FFF6', '#6E00FF', '#FF00F2'];
  num = trimto(1, n, 6)+1;
  for (var i = 0; i < num; i++) {
    items.push(new puck(i*(300/num) + 100, 300 + ((i*2)%5)*25, !i, i, col[i]));
  };
  c.onmousedown = function() { items[0].pause(); };
  window.frametime = window.setInterval(frame, 30);
}

window.onresize = function() {
  c.style.left = (window.innerWidth/2-257)+'px';
  c.style.top = (window.innerHeight/2-257)+'px';
  if (window.innerWidth > 600 && window.innerHeight > 600) {
    window.isbig = true;
  } else {
    window.isbig = false;
    ctx.font="30px Verdana";
    ctx.fillText('Your window is too small', 10, 50);
  }
};

window.onload = function () {
  c = document.getElementById('canvas');
  ctx = c.getContext('2d');
  if (window.innerWidth > 600 || window.innerHeight > 600) {
    window.isbig = true;
  } else {
    window.isbig = false;
    ctx.font='30px Verdana';
    ctx.fillText('Your window is too small', 10, 50);
    return false;
  }
  ctx.clear = function() {
    this.globalAlpha = .1;
    this.fillStyle = '#FFFFFF';
    this.fillRect(0, 0, 510, 510);
    this.globalAlpha = 1;
    this.fillStyle='#C2F0F0';
    this.fillRect(5, 5, 500, 500);
  };
  ctx.circle = function(x, y, r, c, b, bc) {
    this.beginPath();
    this.arc(x+5, y+5, r, 0, 2*Math.PI);
    this.fillStyle = c;
    this.fill();
    if (b) {
      this.lineWidth = b;
      this.strokeStyle = bc;
      this.stroke();
    }
  };
  ctx.getMouse = function() {return {x:this.mx,y:this.my};};
  window.onmousemove = function(e) {
    ctx.mx = e.clientX - c.offsetLeft - 5;
    ctx.my = e.clientY - c.offsetTop - 5;
  };
  window.onresize();
};