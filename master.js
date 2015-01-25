window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

var animationEnabled = true;

var rotations = {
    x: 25,
    y: 15,
    z: -10
}

var speed = 1;

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
        var divs = document.getElementById("cube-1").children;
        for (var i = 0; i < divs.length; i++) {
            console.log(divs[i].className)
            divs[i].className = divs[i].className.replace("unfold", "");
        }
        document.getElementById('about-content').className = document.getElementById('about-content').className.replace(" show", "");
        document.getElementById('myprojects-content').className = document.getElementById('myprojects-content').className.replace(" show", "");
        document.getElementById('close-button').className = document.getElementById('close-button').className.replace(" show", "");
        setTimeout(function() {
            animationEnabled = true;
        }, 2000);
    }
}

function unfold() {
    if (animationEnabled) {
        animationEnabled = false;
        rotations.x = 0;
        rotations.y = 0;
        rotations.z = 0;
        document.getElementById("cube-1").style.transform="rotateX(0deg) rotateY(0deg) rotateZ(0deg)";
        var divs = document.getElementById("cube-1").children;
        for (var i = 0; i < divs.length; i++) {
            divs[i].className += " unfold";
        }
        // document.getElementById('content').className += " show";
        document.getElementById('close-button').className += " show";
    }
}

var aboutOpen = false;
var myProjectsOpen = false;

function openAbout() {
    if (!aboutOpen) {
        if (myProjectsOpen) { openMyProjects(); }
        document.getElementById('about-content').className += " show";
        aboutOpen = true;
    } else {
        document.getElementById('about-content').className = document.getElementById('about-content').className.replace(" show", "");
        aboutOpen = false;
    }
}

function openMyProjects() {
    if (!myProjectsOpen) {
        if (aboutOpen) { openAbout(); }
        document.getElementById('myprojects-content').className += " show";
        myProjectsOpen = true;
    } else {
        document.getElementById('myprojects-content').className = document.getElementById('myprojects-content').className.replace(" show", "");
        myProjectsOpen = false;
    }
}

function goToLink(link) {
    if (!animationEnabled) {
        window.open(link, '_blank');
    }
}
