window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

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

var aboutOpen = false;
var myProjectsOpen = false;

function closeAbout() {
    removeClass(document.getElementById('about-content'), "show");
    aboutOpen = false;
}

function toggleAbout() {
    if (!aboutOpen && !animationEnabled) {
        closeMyProjects();
        addClass(document.getElementById('about-content'), "show");
        aboutOpen = true;
    } else {
        closeAbout();
    }
}

function closeMyProjects() {
    removeClass(document.getElementById('myprojects-content'), "show");
    myProjectsOpen = false;
}

function toggleMyProjects() {
    if (!myProjectsOpen && !animationEnabled) {
        closeAbout();
        addClass(document.getElementById('myprojects-content'), "show");
        myProjectsOpen = true;
    } else {
        closeMyProjects();
    }
}

var rotations = {
    x: 25,
    y: 15,
    z: -10
}

var speed = 0.5;

function rotate() {
    if (animationEnabled) {
        rotations.x += (Math.random()/5+1)*speed;
        rotations.x = rotations.x % 360;
        rotations.y += (Math.random()/5+1)*speed;
        rotations.y = rotations.y % 360;
        rotations.z += (Math.random()/5+1)*speed;
        rotations.z = rotations.z % 360;
        document.getElementById("cube-1").style.transform="rotateX("+rotations.x+"deg) rotateY("+rotations.y+"deg) rotateZ("+rotations.z+"deg)";
    }
}

function render() {
    rotate();
}

(function animloop(){
  requestAnimFrame(animloop);
  render();
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
        closeAbout();
        closeMyProjects();
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
