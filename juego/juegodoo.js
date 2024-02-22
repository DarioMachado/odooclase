var Angel = /** @class */ (function () {
    function Angel(rutaImg, x, y) {
        this.vida = 3;
        this.velocidad = 3;
        this.rutaImg = rutaImg;
        this.x = x;
        this.y = y;
    }
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
var jesucristo = new Angel("aaa", 5, 5);
var canvas = document.getElementById("juegodoo");
if (canvas) {
    var ctx_1 = canvas.getContext("2d");
    if (ctx_1) {
        ctx_1.strokeStyle = "black";
        ctx_1.lineWidth = 5;
        var direccion_1 = 1;
        var y_1 = 50;
        function dibujar() {
            ctx_1.clearRect(0, 0, canvas.width, canvas.height);
            ctx_1.beginPath();
            ctx_1.moveTo(50, y_1);
            ctx_1.lineTo(200, y_1);
            ctx_1.stroke();
            y_1 += direccion_1;
            if (y_1 <= 3 || y_1 >= 250) {
                direccion_1 *= -1;
            }
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
console.log(jesucristo.velocidad);
