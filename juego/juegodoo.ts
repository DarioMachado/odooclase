class Angel {
    vida: Number = 3;
    velocidad: Number = 3;
    img: HTMLImageElement;
    x: number;
    y: number;
    imagenCargada: boolean = false;
    
    constructor(imgSrc: string, x: number, y: number){
        this.img = new Image();
        this.img.src = imgSrc;
        this.img.onload = () => { // Set up onload event handler
            this.imagenCargada = true; // Set isImageLoaded to true when the image is loaded
        };
        this.x = x;
        this.y = y;
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (this.imagenCargada) { // Check if the image has finished loading
            ctx.drawImage(this.img, this.x, this.y);
        } else {
            requestAnimationFrame(() => { // Try again in the next frame
                this.draw(ctx);
            });}
    }

    disparar(balas: Bala[]) {
        balas.push(new Bala(this.x+20, this.y));
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

class Bala {
    x: number;
    y: number;
    speed: number = 5;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    move() {
        this.y -= this.speed; 
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, 2, 5); 
    }
}

var jesus: Angel = new Angel("juego/jesus.png", 5, 5);

const canvas: HTMLCanvasElement | null = document.getElementById("juegodoo") as HTMLCanvasElement;

const anchuraCanvas = canvas.width;
const alturaCanvas = canvas.height;


if(canvas){
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d") as CanvasRenderingContext2D;

    if(ctx){
        const canvasRect = canvas.getBoundingClientRect(); // Get canvas position relative to the viewport

       

        // Event listener for mouse movement
        canvas.addEventListener('mousemove', (event) => {
            const mouseX = event.clientX - canvasRect.left;
            const mouseY = event.clientY - canvasRect.top;
            
            //40 es la altura y la anchura d ela imagen de jesus
            jesus.x = clamp(mouseX, 0, canvas.width - 40); 
            jesus.y = clamp(mouseY, 0, canvas.height - 40);
        });

        const balas: Bala[] = [];
        canvas.addEventListener('click', () => {
            jesus.disparar(balas);
        });
    
        function dibujar(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
    
            jesus.draw(ctx);

            balas.forEach(bullet => {
                bullet.move();
                bullet.draw(ctx);
            });
    
    
            requestAnimationFrame(dibujar);
        }
    
        dibujar();
        
        
    }else{
        console.log("error con ctx");
    }

}else{
    console.log("error con canvas");
}


function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

