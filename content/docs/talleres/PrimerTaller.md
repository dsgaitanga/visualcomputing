# PrimerTaller

El primer taller consta de dos secciones, en la primera se tratará el tema de ilusiones visuales, apartado donde tenemos 3 ejemplos de ilusiones visuales; en la segunda se hará un procesamiento de imagen con múltiples filtros. 

Cada ejemplo mostrado estará dividido en:
- El Título del ejercicio
- Descripción breve del ejercicio
- Ejercicio implementado en p5.js
- Instrucciones de uso (para ejercicios interactivos)
- Código base del ejercicio para observar su funcionamiento

# Ilusiones Ópticas

## Líneas verticales de grosor variable
Se inscribe sobre el canvas una serie de líneas verticales que son más gruesas a medida que se acercan al centro, y también varían respecto a la distancia del mouse hasta el centro, debido a esto, cada vez que se hacen más gruesas las líneas se hace la ilusión de un agujero/circulo negro se hace cada vez más grande.

{{< p5-iframe sketch="/visualcomputing/sketches/1_1.js" width="520" height="325" >}}

Para su uso, se implementa el mouse, a medida que este se mueve por el canvas se varía la intensidad del grosor de las lineas, siendo más oscuras cuando se acerca al centro y viceversa

**Código fuente:**
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
            //strokeWeight();
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
## Patrón de muaré
 Se busca retratar el patrón de Muaré donde se forman patrones de interferencia a gran escala que se puede producir cuando un patrón de rayas opacas con espacios transparentes se superpone a otro patrón similar, como en este caso usando un patrón de círculos que se superponen produciendo un extraño efecto ondulante que distrae nuestra atención.

{{< p5-iframe sketch="/visualcomputing/sketches/1_2.js" width="520" height="525" >}}

**Código fuente:**
```tpl
let x=0
function setup() {
  createCanvas(500, 500);
  rectMode(CENTER)
  
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
 if(x>width){
   
   x=0
 }else{
   x=x+2
 }
}
```

## Cuadrados con velocidad de rotación fija
 Se crea un loop de cuadros donde la velocidad se hace cada vez más rápido de afuera hacia adentro, dando la sensación de la ilusión óptica donde se forman varios patrones de movimiento y formas, e incluso también dando la sensación de que se desacelera en un determinado momento.

{{< p5-iframe sketch="/visualcomputing/sketches/1_3.js" width="620" height="625" >}}

**Código fuente:**
```tpl
function setup() {
    createCanvas(600, 600);
    rectMode(CENTER);
    sliderX = 30;
    sliderY = 20;
}

function draw() {
    background(255);
    fill(255, 150);
    rect(30, 70, 10, 120, 5);
    noFill();
    translate(300, 300);
    for (let x = 420; x >= 40; x = x / 1.08) {
        rotate(radians(frameCount / 2));
        noStroke();
        fill(127,204,x, 80);
        rect(0, 0, x, x);
    }
}
```

# Procesamiento de imagen

Se crea un canvas con las dimensiones de la imagen y se le aplica un filtro a la imagen según la entrada del teclado. Las opciones posibles son: INVERT Establece cada píxel en su valor inverso. THRESHOLD, que convierte la imagen a pixeles blancos y negros dependiendo de si están arriba o abajo del umbral. GRAY, convierte cualquier color en la imagen a un equivalente en la escala de grises. DILATE, aumenta las áreas claras. ERODE, reduce las áreas claras. POSTERIZE, limita cada canal de la imagen a un número de colores especificado como parámetro. El parámetro puede definir entre 2 y 255 valores, pero los resultados más notorios se dan con valores bajos. BLUR, hace que la imagen sea borrosa con un proceso Gaussiano, siendo el parámetro el nivel de cuán borroso es el resultado, si no se usa ningún parámetro, el parámetro por defecto es 1, a mayores valores es más borroso el resultado.

{{< p5-iframe sketch="/visualcomputing/sketches/1_4.js" width="620" height="1095" >}}

Los filtros se aplican según la tecla que ingrese el usuario
- 1 aplica el filtro invertido
- 2 aplica el filtro Blanco y negro
- 3 aplica el filtro de escala de grises
- 4 aplica el filtro de dilatación
- 5 aplica el filtro de erosión
- 6 aplica el filtro de posterización con intensidad 2
- 7 aplica el filtro de posterización con intensidad 4
- 8 aplica el filtro de desenfoque con intensidad 3 
- 9 aplica el filtro de desenfoque con intensidad 12

**Código fuente:**
```tpl
let img;

function preload() {
  img = loadImage("/visualcomputing/sketches/imagen.jpg");
}

function setup() {
  createCanvas(600, 1068);
}

function draw() {
  image(img, 0, 0);
  
  if (key === "1") { 
    filter(INVERT);
    label("INVERT");
  } else if (key === "2") { 
    filter(THRESHOLD);
    label("THRESHOLD");
  } else if (key === "3") { 
    filter(GRAY);
    label("GRAY");
  } else if (key === "4") { 
    filter(DILATE);
    label("DILATE");
  } else if (key === "5") { 
    filter(ERODE);
    label("ERODE");
  } else if (key === "6") {
    filter(POSTERIZE, 2);
    label("POSTERIZE 2");
  } else if (key === "7") {
    filter(POSTERIZE, 4);
    label("POSTERIZE 4");
   } else if (key === "8") { 
    filter(BLUR, 3);
    label("BLUR 3");
  }  else if (key === "9") { 
    filter(BLUR, 12);
    label("BLUR 12");
  }
}

function label(s) {
  fill(0);
  rectMode(CENTER);
  rect(width/2, height - 20, 120, 20);
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(16);
  text(s, width/2, height - 20);
}
```