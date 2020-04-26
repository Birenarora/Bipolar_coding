var isDown;
var start;
var end;
var canvas1 = document.getElementById("drawing");
var draw = canvas1.getContext("2d");
draw.lineWidth = "2";
draw.strokeStyle = "blue";
var lastWidth = 0;
var lastHeight = 0;

var _canvas1;
var img = new Image;
img.width = canvas1.width;
img.height = canvas1.height;


$("#drawing").mousedown(function(e) {
    isDown = true;
    start = getMousePosition(canvas1, e);
    end = getMousePosition(canvas1, e);
    lastWidth = 0;
    lastHeight = 0;
    e.preventDefault();
});

$("#drawing").mouseup(function() {
    isDown = false;
});

$("#drawing").mousemove(function(e) {
    if (!isDown) return;
    var end = getMousePosition(canvas1, e);
    var h = end.y - start.y;
    var w = end.x - start.x;
    draw.clearRect(start.x-5, start.y-5, lastWidth + 6, lastHeight + 6);
    draw.beginPath();
    draw.rect(start.x, start.y, w, h);
    lastWidth = w;
    lastHeight = h;
    draw.stroke();
    draw.closePath();

    saveState1(canvas1);
});

    /* document.getElementById('clear').addEventListener('click', function() {
    draw.clearRect(0,0,canvas1.width,canvas1.height);
}, false); */
$("#clear").on("click", function(){
    draw.clearRect(0,0,canvas1.width,canvas1.height);
});


function getMousePosition(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: Math.floor(evt.clientX - rect.left),
        y: Math.floor(evt.clientY - rect.top)
    };
}

// $("#download").on("click", function(){
//     var image = canvas1.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.


//     window.location.href=image; // it will save locally
// });
function download(){
    var download = document.getElementById("download");
    var image = canvas1.toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);

}

function saveState1(c) {
  _canvas1 = c.toDataURL();
  //copy the data into some variable
}

function restore() {
  //load the data from the variable and apply to canvas
  draw.clearRect(0, 0, canvas1.width, canvas1.height);
  img.onload = function() {
    draw.drawImage(img, 0, 0);
}
img.src = _canvas1;
}

document.getElementById('inp1').onchange = function(e) {
  var img = new Image();
  img.onload = draw1;
  img.onerror = failed;
  img.src = URL.createObjectURL(this.files[0]);
};
function draw1() {
  // canvas1.width = this.width;
  // canvas1.height = this.height;
  canvas1.style.background = draw.drawImage(this, 0,0, canvas1.width, canvas1.height);
}
function failed() {
  console.error("The provided file couldn't be loaded as an Image media");
}

$('#inp').on('click', function(){
        img = new Image();
    
    img.onload = function(){
        draw.drawImage(img, 0, 0, canvas1.width, canvas1.height);
        $("span").text("Loaded.");
    };
    img.src = "1.jpg";
    $("span").text("Loading...");
});

// MAKE 2 GRIDS -   
//ONE WITH DEFAULT IMAGE ON BACKGROUND & DO FUNCTIONS ON IT - CLEAR,RESTORE,DOWNLOAD
//SECOND WITH TAKE IMAGE FROM USER USING FILE INPUT & DO FUNCITONS ON IT - CLEAR,RESTORE,DOWNLOAD,FILE BROWSE                   