var isDown;
var start;
var end;
var canvas2 = document.getElementById("drawing1");
var make = canvas2.getContext("2d");
make.lineWidth = "2";
make.strokeStyle = "red";
var lastWidth = 0;
var lastHeight = 0;

var _canvas2;
var img = new Image;
img.width = canvas2.width;
img.height = canvas2.height;


$("#drawing1").mousedown(function(e) {
    isDown = true;
    start = getMousePosition1(canvas2, e);
    end = getMousePosition1(canvas2, e);
    lastWidth = 0;
    lastHeight = 0;
    e.preventDefault();
});

$("#drawing1").mouseup(function() {
    isDown = false;
});

$("#drawing1").mousemove(function(e) {
    if (!isDown) return;
    var end = getMousePosition1(canvas2, e);
    var h = end.y - start.y;
    var w = end.x - start.x;
    make.clearRect(start.x-5, start.y-5, lastWidth + 6, lastHeight + 6);
    make.beginPath();
    make.rect(start.x, start.y, w, h);
    lastWidth = w;
    lastHeight = h;
    make.stroke();
    make.closePath();

    saveState2(canvas2);
});

    /* document.getElementById('clear1').addEventListener('click', function() {
    make.clear1Rect(0,0,canvas2.width,canvas2.height);
}, false); */
$("#clear1").on("click", function(){
    make.clearRect(0,0,canvas2.width,canvas2.height);
});


function getMousePosition1(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: Math.floor(evt.clientX - rect.left),
        y: Math.floor(evt.clientY - rect.top)
    };
}

// $("#download1").on("click", function(){
//     var image = canvas2.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.


//     window.location.href=image; // it will save locally
// });
function download1(){
    var download1 = document.getElementById("download1");
    var image = canvas2.toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
    download1.setAttribute("href", image);

}

function saveState2(c) {
  _canvas2 = c.toDataURL();
  //copy the data into some variable
}

function restore1() {
  //load the data from the variable and apply to canvas
  make.clearRect(0, 0, canvas2.width, canvas2.height);
  img.onload = function() {
    make.drawImage(img, 0, 0);
}
img.src = _canvas2;
}

// document.getElementById('inp').onchange = function(e) {
//   var img = new Image();
//   img.onload = make1;
//   img.onerror = failed;
//   img.src = URL.createObjectURL(this.files[0]);
// };
// function make1() {
//   // canvas2.width = this.width;
//   // canvas2.height = this.height;
//   canvas2.style.background = make.makeImage(this, 0,0, canvas2.width, canvas2.height);
// }
// function failed() {
//   console.error("The provided file couldn't be loaded as an Image media");
// }

// MAKE 2 GRIDS -   
//ONE WITH DEFAULT IMAGE ON BACKGROUND & DO FUNCTIONS ON IT - clear1,restore1,download1
//SECOND WITH TAKE IMAGE FROM USER USING FILE INPUT & DO FUNCITONS ON IT - clear1,restore1,download1,FILE BROWSE                   