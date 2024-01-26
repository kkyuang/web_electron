//상수
canvasWidth = 640
canvasHeight = 480
xmin = -12
xmax = 12
ymin = -9
ymax = 9
zmin = -9
zmax = 9

//원을 그리는 코드
function drawCircle(cvs) {
    var ctx = cvs.getContext("2d");

    var centerX = cvs.width / 2;
    var centerY = cvs.height / 2;
    var radius = 10;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.stroke();
}

function cvtct(x, y, z) {
    var canvasX = (((x- (z/Math.SQRT2)) - xmin) / (xmax - xmin)) * canvasWidth ;
    var canvasY = canvasHeight - (((y - (z/Math.SQRT2)) - ymin) / (ymax - ymin)) * canvasHeight;
  
    return { x: canvasX, y: canvasY };
}

function cvtctVector3(v3) {
    var canvasX = (((v3.x - (v3.z/Math.SQRT2)) - xmin) / (xmax - xmin)) * canvasWidth ;
    var canvasY = canvasHeight - (((v3.y - (v3.z/Math.SQRT2)) - ymin) / (ymax - ymin)) * canvasHeight;
  
    return { x: canvasX, y: canvasY };
}


function fundermentalDrawing(cvs){
    var ctx = cvs.getContext("2d");

    //x축 그리기
    ctx.beginPath()
    ctx.moveTo(cvtct(xmax, 0, 0).x, cvtct(xmax, 0, 0).y)
    ctx.lineTo(cvtct(xmin, 0, 0).x, cvtct(xmin, 0, 0).y)
    ctx.stroke()

    //y축 그리기
    ctx.beginPath()
    ctx.moveTo(cvtct(0, ymax, 0).x, cvtct(0, ymax, 0).y)
    ctx.lineTo(cvtct(0, ymin, 0).x, cvtct(0, ymin, 0).y)
    ctx.stroke()

    
}

function atan3(x){
   return  x * (1.1164565493- x * (0.4377777778 + x * -0.0924888788))
}


//화살표 그리기
function arrowDrawing(ctx, sx, sy, ex, ey, color) {
    if (ctx != null) {
      var aWidth = 2;
      var aLength = 5;
      var dx = ex - sx;
      var dy = ey - sy;
      var angle = Math.atan2(dy, dx);
      var length = Math.sqrt(dx * dx + dy * dy);

      //두점 선긋기
      ctx.translate(sx, sy);
      ctx.rotate(angle);
      ctx.fillStyle = color;
      ctx.beginPath();

      //화살표 모양 만들기
      ctx.moveTo(length - aLength, -aWidth);
      ctx.lineTo(length, 0);
      ctx.lineTo(length - aLength, aWidth);

      ctx.fill();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
  }

//해당 위치의 전기장에 해당하는 화살표 보여주기
function dpArrow(pos, E, cvs){
    var ctx = cvs.getContext("2d");
    position = cvtct(pos.x, pos.y, pos.z)
    var centerX = pos.x
    var centerY = pos.y

    var startpos = cvtct(centerX - 0.5*E.x, centerY - 0.5*E.y, 0)
    var endpos = cvtct(centerX + 0.5*E.x, centerY + 0.5*E.y, 0)

    //위치에 화살표 그리기
    arrowDrawing(ctx, startpos.x, startpos.y, endpos.x, endpos.y, 'red')
    
    //위치에 선 긋기
    ctx.beginPath()
    ctx.strokeStyle = "red";
    ctx.moveTo(startpos.x, startpos.y)
    ctx.lineTo(endpos.x, endpos.y)
    ctx.stroke()
}


//해당 위치의 전위에 따라 색 보여주기 (전위가 높을수록 흰색)
function drawPotential(pos, V, dx, cvs){
    var ctx = cvs.getContext("2d");
    position = cvtct(pos.x, pos.y, pos.z)
    var centerX = pos.x
    var centerY = pos.y

    var startpos = cvtct(centerX - 0.5*dx, centerY - 0.5*dx, 0)
    var endpos = cvtct(centerX + 0.5*dx, centerY + 0.5*dx, 0)
    
    //위치에 선 긋기
    ctx.beginPath()
    var k = 100
    ctx.fillStyle = "rgb(" + (128 + V*k) + "," +  (128 + V*k) + "," + (128 + V*k) +")";
    ctx.fillRect(startpos.x, startpos.y, endpos.x - startpos.x, endpos.y - startpos.y);
    ctx.fill()
}

//전하 그리는 코드
function drawCharge(pos, cvs) {
    var ctx = cvs.getContext("2d");

    var centerX = pos.x;
    var centerY = pos.y;
    var radius = 10;

    ctx.beginPath();
    ctx.arc(cvtct(centerX, centerY, 0).x, cvtct(centerX, centerY, 0).y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.stroke();
}