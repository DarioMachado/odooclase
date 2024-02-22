class Angel {
    vida: Number = 3;
    velocidad: Number = 3;
    rutaImg: String;
    x: Number;
    y: Number;
    
    constructor(rutaImg: String, x: Number, y: Number){
        this.rutaImg = rutaImg;
        this.x = x;
        this.y = y;
    }
}

class Demonio{
    vida: Number = 1;
    rutaImg: String;
    x: Number;
    y: Number;
    constructor(rutaImg: String, x: Number, y: Number){
        this.rutaImg = rutaImg;
        this.x = x;
        this.y = y;
    }
}

var jesucristo: Angel = new Angel("aaa", 5, 5);

const canvas: HTMLCanvasElement | null = document.getElementById("juegodoo") as HTMLCanvasElement;

if(canvas){
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d") as CanvasRenderingContext2D;

    if(ctx){

        
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;


        let direccion: number = 1;
        let y: number = 50;

        function dibujar(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.beginPath();
            ctx.moveTo(50,y);
            ctx.lineTo(200,y);
            ctx.stroke();
            y+=direccion;

            if(y<=3 || y >= 250){
                direccion *= -1;
            }
            requestAnimationFrame(dibujar);
        }
        dibujar();
    }else{
        console.log("error con ctx");
    }

}else{
    console.log("error con canvas");
}

console.log(jesucristo.velocidad);

