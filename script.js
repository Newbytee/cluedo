"use strict";

const gamePieces = document.getElementsByClassName("gamePiece");

for (let i = 0; i < gamePieces.length; i++) {
    dragElement(gamePieces[i], i);
}

function dragElement(element, iterator) {
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
        localStorage.setItem("gamePieceTop" + iterator, element.style.top);
        localStorage.setItem("gamePieceLeft" + iterator, element.style.left);
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

for (let i = 0; i < gamePieces.length; i++) {
    if (localStorage.getItem("gamePieceTop" + i)) {
        gamePieces[i].style.top = localStorage.getItem("gamePieceTop" + i);
        gamePieces[i].style.left = localStorage.getItem("gamePieceLeft" + i);
    }
}

document.addEventListener("keydown", function(event) {
    console.log(event.code);
    if (event.code === "KeyR") {
        if (confirm("Are you sure you want to reset positions?")) {
            localStorage.clear();
            location.reload();
        }
    }
});