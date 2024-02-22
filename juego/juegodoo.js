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
        balas.push(new Bala(this.x, this.y));
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
        function dibujar() {
            ctx_1.clearRect(0, 0, canvas.width, canvas.height);
            ctx_1.fillStyle = 'black';
            ctx_1.fillRect(0, 0, canvas.width, canvas.height);
            jesus.draw(ctx_1);
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
