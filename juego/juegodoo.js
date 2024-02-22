var Angel = /** @class */ (function () {
    function Angel(imgSrc, x, y) {
        var _this = this;
        this.vida = 3;
        this.velocidad = 3;
        this.imagenCargada = false;
        this.img = new Image();
        this.img.src = imgSrc;
        this.img.onload = function () {
            _this.imagenCargada = true; // Set isImageLoaded to true when the image is loaded
        };
        this.x = x;
        this.y = y;
    }
    Angel.prototype.draw = function (ctx) {
        var _this = this;
        if (this.imagenCargada) { // Check if the image has finished loading
            ctx.drawImage(this.img, this.x, this.y);
        }
        else {
            requestAnimationFrame(function () {
                _this.draw(ctx);
            });
        }
    };
    Angel.prototype.disparar = function (balas) {
        balas.push(new Bala(this.x + 20, this.y));
    };
    return Angel;
}());
var Demonio = /** @class */ (function () {
    function Demonio(rutaImg, x, y) {
        this.vida = 1;
        this.rutaImg = rutaImg;
        this.x = x;
        this.y = y;
    }
    return Demonio;
}());
var Bala = /** @class */ (function () {
    function Bala(x, y) {
        this.speed = 5;
        this.x = x;
        this.y = y;
    }
    Bala.prototype.move = function () {
        this.y -= this.speed;
    };
    Bala.prototype.draw = function (ctx) {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, 2, 5);
    };
    return Bala;
}());
var jesus = new Angel("juego/jesus.png", 5, 5);
var canvas = document.getElementById("juegodoo");
var anchuraCanvas = canvas.width;
var alturaCanvas = canvas.height;
var cruz = new Image();
cruz.src = "juego/lacruz.png";
if (canvas) {
    var ctx_1 = canvas.getContext("2d");
    if (ctx_1) {
        var canvasRect_1 = canvas.getBoundingClientRect(); // Get canvas position relative to the viewport
        // Event listener for mouse movement
        canvas.addEventListener('mousemove', function (event) {
            var mouseX = event.clientX - canvasRect_1.left;
            var mouseY = event.clientY - canvasRect_1.top;
            //40 es la altura y la anchura d ela imagen de jesus
            jesus.x = clamp(mouseX, 0, canvas.width - 40);
            jesus.y = clamp(mouseY, 0, canvas.height - 40);
        });
        var balas_1 = [];
        canvas.addEventListener('click', function () {
            jesus.disparar(balas_1);
        });
        function dibujar() {
            ctx_1.clearRect(0, 0, canvas.width, canvas.height);
            ctx_1.fillStyle = 'black';
            ctx_1.fillRect(0, 0, canvas.width, canvas.height);
            jesus.draw(ctx_1);
            balas_1.forEach(function (bullet) {
                bullet.move();
                bullet.draw(ctx_1);
            });
            drawHealthCrosses(ctx_1, jesus.vida);
            drawScore(ctx_1);
            requestAnimationFrame(dibujar);
        }
        dibujar();
    }
    else {
        console.log("error con ctx");
    }
}
else {
    console.log("error con canvas");
}
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
function drawHealthCrosses(ctx, health) {
    var margin = 10; // Margin from the top-left corner
    var crossSize = 20; // Size of each cross image
    var spacing = 5; // Spacing between crosses
    for (var i = 0; i < health; i++) {
        var crossX = margin + (crossSize + spacing) * i; // Adjusted position for left side
        var crossY = margin;
        ctx.drawImage(cruz, crossX, crossY, crossSize, crossSize);
    }
}
var score = 0;
function drawScore(ctx) {
    var margin = 10; // Margin from the top-right corner
    var fontSize = 20; // Font size for the score
    var fontFamily = "Arial"; // Font family for the score
    // Calculate the X position based on the canvas width and margin
    var scoreX = canvas.width - margin;
    // Calculate the Y position based on the margin
    var scoreY = margin + fontSize;
    ctx.font = "".concat(fontSize, "px ").concat(fontFamily);
    ctx.fillStyle = "white";
    ctx.textAlign = "right"; // Align text to the right
    ctx.fillText("Score: ".concat(score), scoreX, scoreY);
}
