window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

var x1=0,y1=0,z1=0;
var x2=0,y2=0,z2=0;

var speed = 0.5;

function render() {
	x1 += speed*Math.random();
	y1 += speed*Math.random();
	z2 += speed*Math.random();
	x2 += speed*Math.random();
	y2 += speed*Math.random();
	z2 += speed*Math.random();
	document.getElementById("pyramid-1").style.transform="rotateX("+x1+"deg) rotateY("+y1+"deg) rotateZ("+z1+"deg)";
	document.getElementById("pyramid-2").style.transform="rotateX("+x2+"deg) rotateY("+y2+"deg) rotateZ("+z2+"deg)";
}

(function animloop(){
  requestAnimFrame(animloop);
  render();
})();