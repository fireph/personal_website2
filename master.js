function addDocumentClass(className) {
  document.documentElement.classList.add(className);
}
var avif = new Image();
avif.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=";
avif.onload = function () {
  addDocumentClass("avif");
};
avif.onerror = function () {
 check_webp_feature(function (isSupported) {
  if (isSupported) {
   return addDocumentClass("webp");
  }
  return addDocumentClass("fallback");
 });
};
function check_webp_feature(callback) {
  var img = new Image();
  img.onload = function () {
    var result = img.width > 0 && img.height > 0;
    callback(result);
  };
  img.onerror = function () {
    callback(false);
  };
  img.src = "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==";
}

window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

var previousFrameTime = Date.now();

function printResume() {
  var newWindow = window.open();
  var innerHtml = document.getElementById("resume-container").innerHTML;
  newWindow.document.write(
    innerHtml + "<style>table.resume{font-size:0.65em;}</style>"
  );

  newWindow.document.close(); // necessary for IE >= 10
  newWindow.focus(); // necessary for IE >= 10

  newWindow.print();
  newWindow.onafterprint = function() {
    newWindow.close();
  }
}

function addClass(ele, cName) {
  ele.className += " " + cName;
}

function removeClass(ele, cName) {
  ele.className = ele.className.replace(" " + cName, "");
  while (ele.className.indexOf(cName) > -1) {
    ele.className = ele.className.replace(cName, "");
  }
}

function setTransformOnVendors(div, transform) {
  div.style.webkitTransform = transform;
  div.style.MozTransform = transform;
  div.style.msTransform = transform;
  div.style.OTransform = transform;
  div.style.transform = transform;
}

var animationEnabledTime = Date.now();
var animationEnabled = true;
var cubeSideClickable = false;

var openStatus = {};

function close(name) {
  removeClass(document.getElementById(name), "show");
  removeClass(document.getElementById("fading-overlay"), "show");
  openStatus[name] = false;
}

function closeAll() {
  var divs = document.getElementsByClassName("content");
  for (var i = 0; i < divs.length; i++) {
    close(divs[i].id);
  }
}

function setState(name, state) {
  if (state && cubeSideClickable) {
    closeAll();
    addClass(document.getElementById(name), "show");
    addClass(document.getElementById("fading-overlay"), "show");
    if (typeof ga === "function") {
      ga("set", "page", name);
      ga("send", "pageview");
    }
  } else {
    close(name);
  }
}

var rotations = {
  x: 25,
  y: 15,
  z: -10,
};

var speed = 0.5;

var modifier;
var deltaAnimation;
var easingTime = 1000;

function easingSin(delta, duration) {
  return (Math.sin(-Math.PI / 2 + (delta / duration) * Math.PI) + 1) / 2;
}

function rotate(delta) {
  if (animationEnabled) {
    deltaAnimation = Date.now() - animationEnabledTime;
    modifier = 1.0;
    if (deltaAnimation <= easingTime) {
      modifier = easingSin(deltaAnimation, easingTime);
    }
    rotations.x += (Math.random() / 5 + 1) * speed * modifier * (60 * delta);
    rotations.x = rotations.x % 360;
    rotations.y += (Math.random() / 5 + 1) * speed * modifier * (60 * delta);
    rotations.y = rotations.y % 360;
    rotations.z += (Math.random() / 5 + 1) * speed * modifier * (60 * delta);
    rotations.z = rotations.z % 360;
    setTransformOnVendors(
      document.getElementById("cube-1"),
      "rotateX(" +
        rotations.x +
        "deg) rotateY(" +
        rotations.y +
        "deg) rotateZ(" +
        rotations.z +
        "deg)"
    );
  }
}

function render(delta) {
  rotate(delta);
}

(function animloop() {
  requestAnimFrame(animloop);
  var now = Date.now();
  var delta = (now - previousFrameTime) / 1000;
  if (delta > 1 / 10) {
    delta = 1 / 60;
  }
  render(delta);
  previousFrameTime = now;
})();

function foldToPlace(place) {
  if (!animationEnabled) {
    var classes = ["front", "back", "left", "right", "top", "bottom"];
    for (var i = 0; i < classes.length; i++) {
      var divs = document.getElementsByClassName(classes[i]);
      for (var j = 0; j < divs.length; j++) {
        removeClass(divs[j], "unfold");
      }
    }
    removeClass(document.getElementById("cube-1"), "open");
    closeAll();
    removeClass(document.getElementById("close-button"), "show");

    addClass(document.getElementById("cube-1"), "corner");

    if (place == "right") {
      setTransformOnVendors(
        document.getElementById("cube-1"),
        "rotateX(0deg) rotateY(-90deg) rotateZ(0deg)"
      );
    } else if (place == "left") {
      setTransformOnVendors(
        document.getElementById("cube-1"),
        "rotateX(0deg) rotateY(90deg) rotateZ(0deg)"
      );
    } else if (place == "top") {
      setTransformOnVendors(
        document.getElementById("cube-1"),
        "rotateX(90deg) rotateY(0deg) rotateZ(0deg)"
      );
    } else if (place == "bottom") {
      setTransformOnVendors(
        document.getElementById("cube-1"),
        "rotateX(-90deg) rotateY(0deg) rotateZ(0deg)"
      );
    } else if (place == "back") {
      setTransformOnVendors(
        document.getElementById("cube-1"),
        "rotateX(0deg) rotateY(180deg) rotateZ(0deg)"
      );
    }
  }
}

var foldTimeout = null;

function fold() {
  if (foldTimeout != null) {
    clearTimeout(foldTimeout);
    foldTimeout = null;
  }
  var classes = ["front", "back", "left", "right", "top", "bottom"];
  for (var i = 0; i < classes.length; i++) {
    var divs = document.getElementsByClassName(classes[i]);
    for (var j = 0; j < divs.length; j++) {
      removeClass(divs[j], "unfold");
    }
  }
  removeClass(document.getElementById("cube-1"), "open");
  closeAll();
  removeClass(document.getElementById("close-button"), "show");
  cubeSideClickable = false;
  foldTimeout = setTimeout(function () {
    if (!animationEnabled) {
      animationEnabledTime = Date.now();
    }
    animationEnabled = true;
    removeClass(document.getElementById("cube-1"), "transitions");
    foldTimeout = null;
  }, 2000);
}

function unfold() {
  if (foldTimeout != null) {
    clearTimeout(foldTimeout);
    foldTimeout = null;
  }
  animationEnabled = false;
  cubeSideClickable = true;
  rotations.x = Math.round(rotations.x / 360) * 360;
  rotations.y = Math.round(rotations.y / 360) * 360;
  rotations.z = Math.round(rotations.z / 360) * 360;
  addClass(document.getElementById("cube-1"), "open");
  addClass(document.getElementById("cube-1"), "transitions");
  setTransformOnVendors(
    document.getElementById("cube-1"),
    "rotateX(" +
      rotations.x +
      "deg) rotateY(" +
      rotations.y +
      "deg) rotateZ(" +
      rotations.z +
      "deg)"
  );
  var classes = ["front", "back", "left", "right", "top", "bottom"];
  for (var i = 0; i < classes.length; i++) {
    var divs = document.getElementsByClassName(classes[i]);
    for (var j = 0; j < divs.length; j++) {
      addClass(divs[j], "unfold");
    }
  }
  addClass(document.getElementById("close-button"), "show");
}

function goToLink(link) {
  if (cubeSideClickable) {
    window.open(link, "_blank");
  }
}

function getCurrentHash() {
  return window.location.hash.replace(/^#!\/(open\/)?/, "");
}

function getCubeState() {
  return window.location.hash.indexOf("open/") != -1;
}

function setCubeState(state) {
  if (state && !cubeSideClickable) {
    window.location.hash = "#!/open/";
  } else if (!state && cubeSideClickable) {
    window.location.hash = "#!/";
  }
}

function toggleHash(hash) {
  if (cubeSideClickable) {
    var oldHash = getCurrentHash();
    if (oldHash != hash) {
      window.location.hash = "#!/open/" + hash;
    } else {
      window.location.hash = "#!/open/";
    }
  }
}

function removeHash() {
  if (cubeSideClickable) {
    window.location.hash = "#!/open/";
  }
}

window.onhashchange = function () {
  if (getCubeState()) {
    var hash = getCurrentHash();
    unfold();
    if (hash == "") {
      closeAll();
    } else {
      setState(hash, true);
    }
  } else {
    closeAll();
    fold();
  }
};

window.onhashchange();

window.onkeyup = function (evt) {
  evt = evt || window.event;
  if (evt.keyCode == 27) {
    if (window.location.hash === "#!/open/") {
      setCubeState(false);
    } else {
      removeHash();
    }
  }
};

function toggleTheme() {
  if (state && !cubeSideClickable) {
    window.location.hash = "#!/open/";
  } else if (!state && cubeSideClickable) {
    window.location.hash = "#!/";
  }
}

function setTheme(themeName, removeThemeName) {
  localStorage.setItem("theme", themeName);
  document.documentElement.classList.remove(removeThemeName)
  document.documentElement.classList.add(themeName)
}

function toggleTheme() {
  if (localStorage.getItem("theme") === "theme-dark") {
    setTheme("theme-light", "theme-dark");
  } else {
    setTheme("theme-dark", "theme-light");
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  var inputToggle = document.getElementById("slider");
  if (localStorage.getItem("theme") === "theme-light") {
    setTheme("theme-light", "theme-dark");
    inputToggle.checked = true;
  } else {
    setTheme("theme-dark", "theme-light");
    inputToggle.checked = false;
  }
  setTimeout(function () {
    document.getElementsByTagName("BODY")[0].className = "animate";
  }, 1000);
});
