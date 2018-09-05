"use strict";

const gamePieces = document.getElementsByClassName("gamePiece");

for (let i = 0; i < gamePieces.length; i++) {
    dragElement(gamePieces[i]);
}

function dragElement(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    element.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

if (navigator.serviceWorker.controller) {
    console.log("[SW Installer] Active service worker found, no need to register");
} else {
    //Register the ServiceWorker
    navigator.serviceWorker.register("sw.js", {
        scope: "./"
    }).then(function(reg) {
        console.log("[SW Installer] Service worker has been registered for scope: "+ reg.scope);
    });
}