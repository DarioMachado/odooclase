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
    function Demonio(x, y, speed, imgSrc) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.img = new Image();
        this.img.src = imgSrc; // Load enemy image
        this.direction = -1; // Start by moving left
    }
    Demonio.prototype.update = function () {
        // Move downwards by 5 units
        this.y += 0.1;
        // Change direction when reaching the edge of the canvas
        if (this.x <= 0 || this.x >= canvas.width - 40) {
            this.direction *= -1; // Change direction
        }
        // Move horizontally based on direction and speed
        this.x += this.speed * this.direction;
    };
    Demonio.prototype.draw = function (ctx) {
        this.update();
        var width = 40;
        var height = 40;
        ctx.drawImage(this.img, this.x, this.y, width, height);
    };
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
var demonios = [];
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
            demonios.forEach(function (demonio) {
                demonio.update(); // Update demon position
                demonio.draw(ctx_1); // Draw demon
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
setInterval(addDemonio, 2000);
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
    var fontSize = 15; // Font size for the score
    var fontFamily = "Pixelade"; // Font family for the score
    // Calculate the X position based on the canvas width and margin
    var scoreX = canvas.width - margin;
    var scoreY = margin + fontSize;
    ctx.font = "".concat(fontSize, "px ").concat(fontFamily);
    ctx.fillStyle = "white";
    ctx.textAlign = "right"; // Align text to the right
    ctx.fillText("Puntos: ".concat(score), scoreX, scoreY);
}
function addDemonio() {
    var lista = [
        { nombre: "El diablo", velocidad: 0.5, ruta: "juego/eldiablo.png" },
        { nombre: "YHVH", velocidad: 2.5, ruta: "juego/yhvh.png" }
    ];
    var randomIndex = Math.floor(Math.random() * lista.length);
    var _a = lista[randomIndex], velocidad = _a.velocidad, ruta = _a.ruta;
    var x = (Math.random() * anchuraCanvas) - 20;
    var demon = new Demonio(x, 40, velocidad, ruta);
    demonios.push(demon);
}
