System.register([],(function(e,t){"use strict";return{execute:function(){function e(e){document.documentElement.classList.add(e)}var t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=",t.onload=function(){e("avif")},t.onerror=function(){var t,n;t=t=>e(t?"webp":"fallback"),(n=new Image).onload=function(){var e=n.width>0&&n.height>0;t(e)},n.onerror=function(){t(!1)},n.src="data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA=="};const n=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)};var o=Date.now();function A(e,t){null!==e&&(e.className+=" "+t)}function a(e,t){if(null!==e)for(e.className=e.className.replace(" "+t,"");e.className.indexOf(t)>-1;)e.className=e.className.replace(t,"")}function i(e,t){null!==e&&(e.style.webkitTransform=t,e.style.MozTransform=t,e.style.msTransform=t,e.style.OTransform=t,e.style.transform=t)}window.printResume=()=>{var e=window.open(),t=document.getElementById("resume-container")?.innerHTML;e&&t?(e.document.write(t+"<style>table.resume{font-size:0.65em;}</style>"),e.document.close(),e.focus(),e.print(),e.onafterprint=function(){e?.close()}):console.error("error printing resume")};let m=Date.now(),l=!0,c=!1;function d(e){a(document.getElementById(e),"show"),a(document.getElementById("fading-overlay"),"show")}function r(){for(var e=document.getElementsByClassName("content"),t=0;t<e.length;t++)d(e[t].id)}var s,u,h={x:25,y:15,z:-10};function w(e){l&&(u=Date.now()-m,s=1,u<=1e3&&(s=function(e,t){return(Math.sin(-Math.PI/2+e/t*Math.PI)+1)/2}(u,1e3)),h.x+=.5*(Math.random()/5+1)*s*(60*e),h.x=h.x%360,h.y+=.5*(Math.random()/5+1)*s*(60*e),h.y=h.y%360,h.z+=.5*(Math.random()/5+1)*s*(60*e),h.z=h.z%360,i(document.getElementById("cube-1"),"rotateX("+h.x+"deg) rotateY("+h.y+"deg) rotateZ("+h.z+"deg)"))}!function e(){n(e);var t=Date.now(),A=(t-o)/1e3;A>.1&&(A=1/60),function(e){w(e)}(A),o=t}();var g=null;function f(){return window.location.hash.replace(/^#!\/(open\/)?/,"")}function B(e,t){localStorage.setItem("theme",e),document.documentElement.classList.remove(t),document.documentElement.classList.add(e)}window.goToLink=e=>{c&&window.open(e,"_blank")},window.setCubeState=e=>{e&&!c?window.location.hash="#!/open/":!e&&c&&(window.location.hash="#!/")},window.toggleHash=e=>{if(c){var t=f();window.location.hash=t!=e?"#!/open/"+e:"#!/open/"}},window.removeHash=()=>{c&&(window.location.hash="#!/open/")},window.onhashchange=function(){if(-1!=window.location.hash.indexOf("open/")){var e=f();!function(){null!=g&&(clearTimeout(g),g=null),l=!1,c=!0,h.x=360*Math.round(h.x/360),h.y=360*Math.round(h.y/360),h.z=360*Math.round(h.z/360),A(document.getElementById("cube-1"),"open"),A(document.getElementById("cube-1"),"transitions"),i(document.getElementById("cube-1"),"rotateX("+h.x+"deg) rotateY("+h.y+"deg) rotateZ("+h.z+"deg)");for(var e=["front","back","left","right","top","bottom"],t=0;t<e.length;t++)for(var n=document.getElementsByClassName(e[t]),o=0;o<n.length;o++)A(n[o],"unfold");A(document.getElementById("close-button"),"show")}(),""==e?r():(t=e,c?(r(),A(document.getElementById(t),"show"),A(document.getElementById("fading-overlay"),"show"),"function"==typeof ga&&(ga("set","page",t),ga("send","pageview"))):d(t))}else r(),function(){null!=g&&(clearTimeout(g),g=null);for(var e=["front","back","left","right","top","bottom"],t=0;t<e.length;t++)for(var n=document.getElementsByClassName(e[t]),o=0;o<n.length;o++)a(n[o],"unfold");a(document.getElementById("cube-1"),"open"),r(),a(document.getElementById("close-button"),"show"),c=!1,g=setTimeout((function(){l||(m=Date.now()),l=!0,a(document.getElementById("cube-1"),"transitions"),g=null}),2e3)}();var t},window.onhashchange(new HashChangeEvent("hashchange")),window.onkeyup=function(e){27==(e=e||window.event).keyCode&&("#!/open/"===window.location.hash?window.setCubeState(!1):window.removeHash())},window.toggleTheme=()=>{"theme-dark"===localStorage.getItem("theme")?B("theme-light","theme-dark"):B("theme-dark","theme-light")},document.addEventListener("DOMContentLoaded",(function(){const e=document.getElementById("slider");"theme-light"===localStorage.getItem("theme")?(B("theme-light","theme-dark"),e.checked=!0):(B("theme-dark","theme-light"),e.checked=!1),setTimeout((function(){document.getElementsByTagName("BODY")[0].className="animate"}),1e3)}))}}}));
