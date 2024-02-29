class Angel {
    vida: number = 3;
    velocidad: Number = 3;
    img: HTMLImageElement;
    x: number;
    y: number;
    imagenCargada: boolean = false;
    
    constructor(imgSrc: string, x: number, y: number){
        this.img = new Image();
        this.img.src = imgSrc;
        this.img.onload = () => { 
            this.imagenCargada = true; 
        };
        this.x = x;
        this.y = y;
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (this.imagenCargada) { 
            ctx.drawImage(this.img, this.x, this.y);
        } else {
            requestAnimationFrame(() => {
                this.draw(ctx);
            });}
    }

    disparar(balas: Bala[]) {
        balas.push(new Bala(this.x+20, this.y));
    }

    muerte(){
        this.vida-=1;

    }
   
}

class Demonio {
    x: number;
    y: number;
    velocidadX: number;
    velocidadY: number;
    img: HTMLImageElement; 
    direction: number;

    constructor(x: number, y: number, velocidadX: number, velocidadY: number, imgSrc: string) {
        this.x = x;
        this.y = y;
        this.velocidadX = velocidadX;
        this.velocidadY = velocidadY;
        this.img = new Image();
        this.img.src = imgSrc; 
        this.direction = -1; 
    }

    update() {
        
        this.y += this.velocidadY;

        if (this.x <= 0 || this.x >= canvas.width - 40) {
            this.direction *= -1; //Esto cambia la dirección
        }

        this.x += this.velocidadX * this.direction;
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.update();
        const width = 40;
        const height = 40;
        ctx.drawImage(this.img, this.x, this.y, width, height);
        this.damageJesus(jesus, ctx);
    }

    collidesWithBullet(bullet: Bala): boolean {
        return (
            this.x < bullet.x + 2 &&
            this.x + 40 > bullet.x &&
            this.y < bullet.y + 5 &&
            this.y + 40 > bullet.y
        );
    }

    collidesWithJesus(jesus: Angel): boolean {
        return (
            this.x < jesus.x + 40 &&
            this.x + 40 > jesus.x &&
            this.y < jesus.y + 40 &&
            this.y + 40 > jesus.y
        );
    }


    damageJesus(jesus: Angel, ctx: CanvasRenderingContext2D) {
        
        if (this.collidesWithJesus(jesus)) {

            const indexToRemove = demonios.indexOf(this);
            if (indexToRemove !== -1) {
                demonios.splice(indexToRemove, 1);
            }
        
            jesus.muerte();
        }
    }
        
}


class Bala {
    x: number;
    y: number;
    speed: number = 3;

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

const demonios: Demonio[] = [];

const canvas: HTMLCanvasElement | null = document.getElementById("juegodoo") as HTMLCanvasElement;

const anchuraCanvas = canvas.width;
const alturaCanvas = canvas.height;

const cruz = new Image();
cruz.src = "juego/lacruz.png";


if(canvas){
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d") as CanvasRenderingContext2D;
    var animar;
    if(ctx){
        const canvasRect = canvas.getBoundingClientRect(); // Get canvas position relative to the viewport

        canvas.addEventListener('mousemove', (event) => {
            const mouseX = event.clientX - canvasRect.left;
            const mouseY = event.clientY - canvasRect.top;

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

            balas.forEach((bullet, bulletIndex)=> {
                bullet.move();
                bullet.draw(ctx);

                const demoniosAMatar: number[] = [];


                demonios.forEach((demonio, indice) => {
                    if (demonio.collidesWithBullet(bullet)) {
                        demoniosAMatar.push(indice);
                        balas.splice(bulletIndex, 1);
                    }
                });

                demoniosAMatar.forEach(index => {
                    demonios.splice(index, 1);
                    score += 10;
                });


                if (bullet.y < 0) {
                    balas.splice(bulletIndex, 1);
                }
            });

            demonios.forEach(demonio => {
                demonio.update(); 
                demonio.draw(ctx); 
            });
            drawHealthCrosses(ctx, jesus.vida);
            drawScore(ctx);
            
            if(jesus.vida < 3){
                ctx.fillStyle = "white";
                ctx.font = "20px Arial";
                ctx.textAlign = "center";
                ctx.fillText("JESÚS HA RESUCITADO", canvas.width / 2, canvas.height / 2 - 20);
                if(jesus.vida < 2){
                    ctx.fillText("JESÚS ES REY", canvas.width / 2, canvas.height / 2 + 20);
                    if(jesus.vida < 1){
                       return acabar(ctx);
                    }
                }

            }

           
            
         animar = requestAnimationFrame(dibujar);
        }
    
        dibujar();
        
        
    }else{
        console.log("error con ctx");
    }

}else{
    console.log("error con canvas");
}
var intervalo = setInterval(addDemonio, 500);

function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

function drawHealthCrosses(ctx: CanvasRenderingContext2D, health: number) {
    const margin = 10; 
    const crossSize = 20; 
    const spacing = 5; 

    for (let i = 0; i < health; i++) {
        const crossX = margin + (crossSize + spacing) * i; 
        const crossY = margin;

        ctx.drawImage(cruz, crossX, crossY, crossSize, crossSize);
    }
}

var score: number = 0;

function drawScore(ctx: CanvasRenderingContext2D) {
    const margin = 10; 
    const fontSize = 15; 
    const fontFamily = "Pixelade"; 

    
    const scoreX = canvas.width - margin;
    const scoreY = margin + fontSize;

    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = "white";
    ctx.textAlign = "right"; 
    ctx.fillText(`Puntos: ${score}`, scoreX, scoreY);
}

function addDemonio(){
    const lista = [
        {nombre: "El diablo", velocidadX: 0.5, velocidadY: 0.3, ruta: "juego/eldiablo.png"},
        {nombre: "YHVH", velocidadX: 2, velocidadY: 0.2, ruta: "juego/yhvh.png"},
        {nombre: "Meteorito", velocidadX: 0.2, velocidadY: 1.3, ruta: "juego/meteorito.png"},
        {nombre: "ATU", velocidadX:0.5, velocidadY:0.5, ruta: "juego/atu.png"}
        
    ];

    const randomIndex = Math.floor(Math.random() * lista.length);
    const { velocidadX, velocidadY, ruta } = lista[randomIndex];

  
    const x = Math.max(0, Math.min(canvas.width - 50, Math.random() * canvas.width));



    const demon = new Demonio(x, 40, velocidadX, velocidadY, ruta);
    demonios.push(demon);
}


function acabar(ctx: CanvasRenderingContext2D){

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    clearInterval(intervalo);
    ctx = null;

	const contenedor = document.getElementById('contenedor');
	
	contenedor.style.position = 'fixed';
	contenedor.style.top = '50px';
	contenedor.style.left = '0';
	contenedor.style.width = '100%';
	contenedor.style.display = 'flex';
	contenedor.style.flexDirection = 'column';
	contenedor.style.alignItems = 'center';
	
	contenedor.removeChild(canvas);

	
    const message = document.createElement('div');
    message.textContent = 'JESÚS VOLVERÁ. INSERTA TU NOMBRE';
	message.style.marginBottom = '10px';
    contenedor.appendChild(message);

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Tu nombre';
	nameInput.style.marginBottom = '10px';
    contenedor.appendChild(nameInput); 
    
  
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Enviar';
    contenedor.appendChild(submitButton); 
    
   
    submitButton.addEventListener('click', function() {
        var name = nameInput.value; 
        var puntos = score; 
        const fechaDeHoy = new Date();
		contenedor.removeChild(nameInput);
        contenedor.removeChild(submitButton);
		
        const fechaFormateada = fechaDeHoy.toISOString().slice(0, 10);

        console.log('Fecha de hoy:', fechaFormateada);
    
        fetch('http://localhost:8069/exorcismo/insertar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                date: fechaFormateada,
                score: puntos
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.success) {
				message.textContent= "Datos insertados correctamente."
            } else {
                message.textContent= " "
            }
        })
        .catch(error => {
            console.error('Error:', error);
            message.textContent= " "
        });
        });

}