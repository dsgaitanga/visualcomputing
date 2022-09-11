# PrimerTaller

El primer taller consta de dos secciones, en la primera se tratará el tema de ilusiones visuales, apartado donde tenemos 3 ejemplos de ilusiones visuales; en la segunda se hará un procesamiento de imagen con múltiples filtros. 

Cada ejemplo mostrado estará dividido en:
- El Título del ejercicio
- Descripción breve del ejercicio
- Ejercicio implementado en p5.js
- Instrucciones de uso
- Código base del ejercicio para observar su funcionamiento

# Ilusiones Ópticas

## Líneas verticales de grosor variable
Se inscribe sobre el canvas una serie de líneas verticales que son más gruesas a medida que se acercan al centro, y también varían respecto a la distancia del mouse hasta el centro, debido a esto, cada vez que se hacen más gruesas las líneas se hace la ilusión de un agujero/circulo negro se hace cada vez más grande.

{{< p5-iframe sketch="/visualcomputing/sketches/1_1.js" width="520" height="325" >}}

{{< hint info >}}
Para su uso, se implementa el mouse, a medida que este se mueve por el canvas se varía la intensidad del grosor de las lineas, siendo más oscuras cuando se acerca al centro y viceversa
{{< /hint >}}


{{< details "Código Fuente" open >}}
```tpl
var pasos;
var peso;
var radio;
function setup(){
    createCanvas(500,300);
    pasos=5;
    peso=0;
    radio=5;
}
function draw(){
    background(255);
    radio=50*(1-norm(Math.sqrt(Math.pow(width/2-mouseX,2)+Math.pow(height/2-mouseY,2)), 0, height));
    for(var i=10; i<width;i+=10){
        for(var j=0;j<height;j+=pasos){
            strokeWeight(radio*(1-norm(Math.sqrt(Math.pow(width/2-i,2)+Math.pow(height/2-j,2)), 0, height)));
            line(i,j,i,j+pasos);
        }  
    }
    fill(255);
    rect(width-215,height-35,width,height);
    fill(0);
    textSize(25);
    textStyle(BOLD);
    text('Intensidad: '+ (radio | 0), width-190,height-10);
}
```
{{< /details >}}

## Patrón de muaré
 Se busca retratar el patrón de Muaré donde se forman patrones de interferencia a gran escala que se puede producir cuando un patrón de rayas opacas con espacios transparentes se superpone a otro patrón similar, como en este caso usando un patrón de círculos que se superponen produciendo un extraño efecto ondulante que distrae nuestra atención.

{{< p5-iframe sketch="/visualcomputing/sketches/1_2.js" width="520" height="525" >}}

{{< hint info >}}
Para ajustar la velocidad y dirección del movimiento del circulo rojo, se usa el deslizador inferior.
{{< /hint >}}

{{< details "Código Fuente" open >}}
```tpl
let x=0
let slider;
function setup() {
  createCanvas(500, 500);
  rectMode(CENTER)
  slider = createSlider(-4, 4, 0, 0.0001);
  slider.position((width/2)-40, height);
  
}

function draw() {
 background(40);
 for(let i=0;i<500;i+=10){
 stroke('purple')
 strokeWeight(3)
 ellipse(x,250,i-500,i-500)
 
 noFill()
 stroke('blue')
 strokeWeight(3)
 ellipse(width/2,height/2,i,i)
 } 
 let s = slider.value()
 if(x>width){
   
   x=0
 }if(x<0){
   x=width
 }
  else{
   x=x+s
 }
}
```
{{< /details >}}

## Cuadrados con velocidad de rotación fija
 Se crea un loop de cuadros donde la velocidad se hace cada vez más rápido de afuera hacia adentro, dando la sensación de la ilusión óptica donde se forman varios patrones de movimiento y formas, e incluso también dando la sensación de que se desacelera en un determinado momento.

{{< p5-iframe sketch="/visualcomputing/sketches/1_3.js" width="620" height="625" >}}

{{< hint info >}}
El deslizador inferior ajusta la velocidad en que rotan los cuadrados.
{{< /hint >}}

{{< details "Código Fuente" open >}}
```tpl
let slider;

function setup() {
    createCanvas(600, 600);
    rectMode(CENTER);
    sliderX = 30;
    sliderY = 20;
  slider = createSlider(2, 8, 2, 1);
  slider.position((width/2)-40, height);

}

function draw() {
    background(255);
    fill(255, 150);
    rect(30, 70, 10, 120, 5);
    noFill();
    translate(300, 300);
     let s = slider.value()
     if(s==0){
       s=0.2
     }
    for (let x = 420; x >= 40; x = x / 1.08) {
        rotate(radians(frameCount /s));
        noStroke();
        fill(127,204,x, 80);
        rect(0, 0, x, x);
    }
}
```
{{< /details >}}

# Procesamiento de imagen

Se crea un canvas con las dimensiones de la imagen y se le aplica un filtro a la imagen en base a una matriz de convolución según la entrada del teclado. Las opciones posibles son: 
## Filtro de Sobreexposición
  Resalta los bordes de la imagen con lineas claras.
  Hace uso de la siguiente matriz:

  {{< katex >}} \begin{bmatrix} -1 & -1 & -1\\ -1 & 9 & -1\\ -1 & -1 & -1 \end{bmatrix} {{< /katex >}}
 ## Filtro de Bordes
  Captura los bordes de la imagen y los resalta con lineas blancas, cuyo grosor depende del contraste entre los colores del borde. Todo el resto de la imagen permanece en negro.
  Hace uso de la siguiente matriz:

  {{< katex >}} \begin{bmatrix} -1 & -1 & -1\\ -1 & 8 & -1\\ -1 & -1 & -1 \end{bmatrix} {{< /katex >}}
 ## Filtro de Bordes vertical
  Repasa la imagen de arriba hacia abajo y captura los bordes encontrados en este eje. El resto de la imagen permanece en negro.
  Hace uso de la siguiente matriz:

  {{< katex >}} \begin{bmatrix} 1 & 2 & 1\\ 0 & 0 & 0\\ -1 & 2 & -1 \end{bmatrix} {{< /katex >}}
 ## Filtro de Bordes horizontal
  Repasa la imagen de derecha a izquierda y captura los bordes encontrados en este eje. El resto de la imagen permanece en negro.
  Hace uso de la siguiente matriz:

  {{< katex >}} \begin{bmatrix} -5 & 4 & 0\\ 0 & 2 & 0\\ 0 & -1 & 0 \end{bmatrix} {{< /katex >}}
 ## Filtro Afilado
  Aquellos pixeles con vecinos distintos se potencian.
  Hace uso de la siguiente matriz:

  {{< katex >}} \begin{bmatrix} -2 & -1 & 0\\ -1 & 1 & 1\\ 0 & 1 & 2 \end{bmatrix} {{< /katex >}}
 ## Filtro de Desenfoque
  Hace que la imagen sea borrosa con un proceso Gaussiano.
  Usa de la siguiente matriz:

  {{< katex >}} \begin{bmatrix} 1/9 & 1/9 & 1/9\\ 1/9 & 1/9 & 1/9\\ 1/9 & 1/9 & 1/9 \end{bmatrix} {{< /katex >}}



{{< p5-iframe sketch="/visualcomputing/sketches/1_4.js" width="620" height="560" >}}

{{< hint info >}}
Los filtros se aplican según la tecla que ingrese el usuario
- 1 aplica el filtro de Sobreexposición
- 2 aplica el filtro de Detección de bordes uniforme
- 3 aplica el filtro de Detección de bordes vertical
- 4 aplica el filtro de Detección de bordes horizontal
- 5 aplica el filtro de Afilado
- 6 aplica el filtro de desenfoque gaussiano
{{< /hint >}}


{{< details "Código Fuente" open >}}
```tpl
let img;
let matriz;
function preload() {
  img = loadImage("/visualcomputing/sketches/minimagen.jpg");
}

function setup() {
  createCanvas(img.width*2, img.height);
}

function draw() {
    image(img, 0, 0);
    if (key === "1") { 
      filtrado([[-1, -1, -1 ], [ -1,  9, -1 ], [-1, -1, -1 ]])
    } else if (key === "2") { 
      filtrado([[-1, -1, -1],[-1, 8, -1],[-1, -1, -1]])
    } else if (key === "3") { 
      filtrado([[1, 2, 1],[0, 0, 0],[-1, -2, -1]])
    } else if (key === "4") { 
      filtrado([[-5, 4, 0],[0, 2, 0],[0, -1, 0]])
    } else if (key === "5") { 
      filtrado([[-2, -1, 0],[-1, 1, 1],[0, 1, 2]])
    }  else if (key === "6") {
      filtrado([[1/9, 1/9, 1/9],[1/9, 1/9, 1/9],[1/9, 1/9, 1/9]])
    } 
}
function filtrado(m) {
  matriz = m; 
  newImg = createImage(img.width,img.height);
  newImg.loadPixels();
  for (let x = 1; x < img.width - 1; x++) {
    for (let y = 1; y < img.height - 1; y++) {
      let suma=0;
      let suma2=0;
      let suma3=0;
      for (kx = -1; kx <= 1; kx++) {
        for (ky = -1; ky <= 1; ky++) {
          let posx= x+kx;
          let posy=y+ky;
          let pos = (y + ky)*img.width + (x + kx);
          let px= red(img.get(posx, posy));
          let px2=green(img.get(posx, posy));
          let px3=blue(img.get(posx, posy));
          suma += matriz[ky+1][kx+1] * px;
          suma2 += matriz[ky+1][kx+1] * px2;
          suma3 += matriz[ky+1][kx+1] * px3;
        }
      }
      newImg.set(x, y, color(suma,suma2,suma3));
    }
  }
  newImg.updatePixels(); 
  image(newImg,img.width,0);
}
```
{{< /details >}}


## Histograma de los canales RGB
 En este histograma se dibuja la imagen de fondo y por encima se describen los histogramas para cada canal de color, en donde el eje X es el valor de ese canal (0 a 255) y en el eje Y el número de ocurrencias de ese valor en la imagen.

{{< p5-iframe sketch="/visualcomputing/sketches/1_5.js" width="620" height="920" >}}

{{< details "Código Fuente" open >}}
```tpl
let img;
let R=[];
let G=[];
let B=[];
function preload() {
  img = loadImage("/visualcomputing/sketches/imagen.jpg");
  for(var i=0; i<256;i++){
    R[i]=0;
    G[i]=0;
    B[i]=0;
  }
}

function setup() {
  createCanvas(600, 850);
  background(255); 
  noLoop();
}

function draw() {
  image(img, 0, 0);
  loadPixels();
  for(var x=0;x<img.width;x++){
    for(var y=0; y<img.height;y++){
        var px= (x+y*img.width)*4;
        R[pixels[px+0]]+=1;
        G[pixels[px+1]]+=1;
        B[pixels[px+2]]+=1;
    }
  }
  fill(255,255,255,150);
  noStroke();
  rect(50,height/4,255,-150);
  rect(50,height/4*2,255,-150);
  rect(50,height/4*3,255,-150);
  for(var i=0; i<256;i++){
    stroke(255,0,0);
    line(50+i,height/4,50+i,height/4-norm(R[i],0,100));
    stroke(0,255,0);
    line(50+i,height/4*2,50+i,height/4*2-norm(G[i],0,100));
    stroke(0,0,255);
    line(50+i,height/4*3,50+i,height/4*3-norm(B[i],0,100));
  }
  fill(0);
  noStroke();
  textSize(35);
  textStyle(BOLD);
  text(' Canal Rojo', 305, height/4);
  text(' Canal Verde', 305, height/4*2);
  text(' Canal Azul', 305, height/4*3);
}
```
{{< /details >}}


