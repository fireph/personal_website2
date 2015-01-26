window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

var previousFrameTime = Date.now();

function addClass(ele, cName) {
    ele.className += " "+cName;
}

function removeClass(ele, cName) {
    ele.className = ele.className.replace(" "+cName, "");
    while (ele.className.indexOf(cName) > -1) {
        ele.className = ele.className.replace(cName, "");
    }
}

var animationEnabled = true;

var openStatus = {};

function close(name) {
    removeClass(document.getElementById(name), "show");
    openStatus[name] = false;
}

function closeAll() {
    var divs = document.getElementsByClassName('content');
    for (var i = 0; i < divs.length; i++) {
        close(divs[i].id);
    }
}

function toggle(name) {
    if (!openStatus[name] && !animationEnabled) {
        closeAll();
        addClass(document.getElementById(name), "show");
        openStatus[name] = true;
    } else {
        close(name);
    }
}

var rotations = {
    x: 25,
    y: 15,
    z: -10
};

var speed = 0.5;

function rotate(delta) {
    if (animationEnabled) {
        rotations.x += (Math.random()/5+1)*speed * (60*delta);
        rotations.x = rotations.x % 360;
        rotations.y += (Math.random()/5+1)*speed * (60*delta);
        rotations.y = rotations.y % 360;
        rotations.z += (Math.random()/5+1)*speed * (60*delta);
        rotations.z = rotations.z % 360;
        document.getElementById("cube-1").style.transform="rotateX("+rotations.x+"deg) rotateY("+rotations.y+"deg) rotateZ("+rotations.z+"deg)";
    }
}

function render(delta) {
    rotate(delta);
}

(function animloop(){
  requestAnimFrame(animloop);
  var now = Date.now();
  var delta = (now - previousFrameTime)/1000;
  if (delta > 1/10) { delta = 1/60; }
  render(delta);
  previousFrameTime = now;
})();

function fold() {
    if (!animationEnabled) {
        var classes = ['front', 'back', 'left', 'right', 'top', 'bottom'];
        for (var i = 0; i < classes.length; i++) {
            var divs = document.getElementsByClassName(classes[i]);
            for (var j = 0; j < divs.length; j++) {
                removeClass(divs[j], "unfold");
            }
        }
        removeClass(document.getElementById('cube-1'), "open");
        closeAll();
        removeClass(document.getElementById('close-button'), "show");
        setTimeout(function() {
            animationEnabled = true;
            removeClass(document.getElementById('cube-1'), "transitions");
        }, 2000);
    }
}

function unfold() {
    if (animationEnabled) {
        animationEnabled = false;
        rotations.x = 0;
        rotations.y = 0;
        rotations.z = 0;
        addClass(document.getElementById("cube-1"), "open");
        addClass(document.getElementById("cube-1"), "transitions");
        document.getElementById("cube-1").style.transform="rotateX(0deg) rotateY(0deg) rotateZ(0deg)";
        var classes = ['front', 'back', 'left', 'right', 'top', 'bottom'];
        for (var i = 0; i < classes.length; i++) {
            var divs = document.getElementsByClassName(classes[i]);
            for (var j = 0; j < divs.length; j++) {
                addClass(divs[j], "unfold");
            }
        }
        addClass(document.getElementById('close-button'), "show");
    }
}

function goToLink(link) {
    if (!animationEnabled) {
        window.open(link, '_blank');
    }
}
