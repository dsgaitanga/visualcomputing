# Tercer Taller
## Coloring

### CMY and RGB Color models
El siguiente canva muestra cómo interpolar los datos de color a lo largo de un triángulo y cómo cambiar entre los modelos de color **rgba y cmya**. 

**Instrucciones de uso**
{{< hint info >}}
A medida que el ratón se desplaza dentro del lienzo, es posible observar la interpolación de los colores.
Presiona:
- **R:** Para aleatorizar el triángulo.
- **C:** Para cambiar entre los modelos de color rgba y cmya.
{{< /hint >}}

{{< details "Código Fuente" open=false >}}
```tpl
let colorShader;
let cmy;
let v1, v2, v3;
let color = 255;
function preload() {

  colorShader = readShader('/shaders/color.frag', { matrices: Tree.NONE, varyings: Tree.color4 });
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(600, 450, WEBGL);
  // https://p5js.org/reference/#/p5/shader
  shader(colorShader);
  randomizeTriangle();
}

function draw() {
  background(0);

  beginShape(TRIANGLES);
  fill(color);
  vertex(v1.x, v1.y);
  fill('blue');
  vertex(v2.x, v2.y);
  fill('purple');
  vertex(v3.x, v3.y);
  endShape();
}

function randomizeTriangle() {
  v1 = p5.Vector.random2D();
  v2 = p5.Vector.random2D();
  v3 = p5.Vector.random2D();
}

function keyPressed() {
  if (key == 'c') {
    cmy = !cmy;
    colorShader.setUniform('cmy', cmy);
  }
  if (key == 'r') {
    randomizeTriangle();
  }
}
function mouseMoved () {
  color = color + 2;
  if (color > 280) {
    color = 0;
  }
}
```
{{< /details >}}
{{< p5-iframe sketch="/visualcomputing/sketches/color.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="400" height="400" >}}


Para la implementación del tercer taller realizamos un conjunto de ejercicios que implementan conceptos de la matería como **Coloring** y **Shaders**. Dos de estos ejercicios están basados en la simulación de **La atracción de Mundo Aventura "Ikaro"** del taller 2.

{{< youtube NQMO0Ib_osg >}}

Añadido al ejercicio del taller 2, se implementaron funcionalidades de **Coloring** al mecanismo, en donde existen 4 opciones de uso:
- **Sin Texturas:** Usa un Material Normal de P5js y el fondo es blanco, es la opción predeterminada.
- **Multiplicar:** Usa el primer color del conjunto de ColorPicker para rellenar la atracción mecánica y el segundo color como fondo, sin embargo, hace un efecto de transparencia en donde los colores se vuelven más oscuros a medida que se sobreponen entre sí, así como las mismas partes de un objeto. Se realiza un efecto de **Adición**
- **Transparencia:** Similar a la opción anterior, se aplica un efecto de transparencia pero los colores se vuelven más claros a medida que se sobreponen entre sí, realizando un efecto de **Sustracción**
- **Promedio:** Los colores del conjunto de ColorPicker se promedian en sus tres canales (RGB) y se aplica el color resultante tanto en el fondo como en la atracción mecánica

**Instrucciones de uso**
{{< hint info >}}
Para interactuar con la simulación se hace uso del mouse, es posible rotar alrededor del mecanismo moviendo el mouse en el eje Y, también es posible hacer Zoom en el mecanismo moviendo el mouse en el eje X.

El selector de la parte inferior permite cambiar las opciones de Coloring, y el conjunto de ColorPicker permite cambiar los colores que están directamente relacionados a las 3 últimas opciones del ejercicio.
{{< /hint >}}

{{< details "Código Fuente" open=false >}}
```tpl
//OBJETOS
let silla;
let cube;
let pipe;
//Texturas
let tubo;
let led;
let metal;
let texturas=0;
//Variables de rotación y traslación generales
let trans1=0;
let rot1=0;
let speed=2.5;
//Variables de rotación carritos
let speeds=[];
let duration=[];
let rotations=[];
//Colores
let color1,color2;
//Selector
let sel;
function preload(){
    silla= loadModel('/visualcomputing/sketches/silla.obj');
    cube=loadModel('/visualcomputing/sketches/cube.obj');
    pipe=loadModel('/visualcomputing/sketches/pipe.obj');
    tubo=loadImage('/visualcomputing/sketches/tubo.jpg');
    led=loadImage('/visualcomputing/sketches/led.jpg');
    metal=loadImage('/visualcomputing/sketches/metal.jpg');
}

function setup(){
    sel = createSelect();
    sel.option('Sin Texturas');
    sel.option('Multiplicar');
    sel.option('Transparencia');
    sel.option('Promedio');
    sel.selected('Sin Texturas');
    sel.changed(mySelectEvent);
    color1 = createColorPicker('#26a1ed');
    color2 = createColorPicker('#f0c7ea');
    createCanvas(600,600,WEBGL);
    for(let x=0;x<6;x++){
        speeds[x]=[];
        duration[x]=[];
        rotations[x]=[];
        for(let y=0;y<2;y++){
            speeds[x][y]=random(-0.03,0.03);
            duration[x][y]=random(4,9);
            rotations[x][y]=0;
        }
    }
}
function draw(){
    background(color2.color());
    translate(0,0,map(mouseX,0,width+width/2,150,-width*3));
    rotateY(map(mouseY,0,height,0,2*PI));
    noStroke();
    if(texturas==1){
        blendMode(MULTIPLY);
        ambientLight(color1.color());
        directionalLight(255,255,255,0,0,-1);
    }
    else if(texturas==2){
        blendMode(LIGHTEST);
        ambientLight(color1.color());
        directionalLight(255,255,255,0,0,-1);
    }
    else if(texturas==3){
        blendMode(NORMAL);
        let R=(red(color1.color())+red(color2.color()))/2
        let G=(green(color1.color())+green(color2.color()))/2
        let B=(blue(color1.color())+blue(color2.color()))/2
        background(R,G,B);
        ambientLight(R,G,B);
        directionalLight(255,255,255,0,0,-1);
    }
    else{
        background(255);
        blendMode(NORMAL);
        normalMaterial();
    }

    let sec=millis()/1000;

    push(); //BASE
    rotateX(PI);
    scale(2);
    translate(0,-20,-10);
    if(texturas!=0){texture(metal);}
    model(pipe);
    pop();

    push();//ESFERAS QUE CONECTAN AL TUBO CENTRAL
    translate(0,-100,0);
    sphere(50);
    translate(0,-20,0);
    sphere(50);
    pop();
    //TUBO CENTRAL
    if(texturas!=0){texture(metal);}
    if(sec>0&&trans1<350){
        translate(0,-120-trans1,-350+trans1);
        rotateX(map(trans1,0,350,PI/2,0));
        trans1+=0.5;
    }
    else{
        translate(0,-470,0);
    }
    if(sec%50>=20&&sec%50<30){
        rotateY(map(sec%50,20,30,0,PI));
    }
    if(sec%50>=30&&sec%50<40){
        rotateY(PI);
    }
    if(sec%50>=40){
        rotateY(map(sec%50,40,50,PI,0));
    }
    cylinder(70,700);
    translate(0,-350,0);
    if(texturas!=0){texture(metal);}
    cylinder(80,200);
    rotateX(PI/2);
    if(texturas!=0){texture(metal);}
    torus(100,10);
    cylinder(50,500);
    translate(0,-350,0);

    push(); //Bola de pinchos
    rotateX(PI);
    scale(5);
    translate(0,-20,0);
    if(texturas!=0){texture(metal);}
    model(cube);
    pop();

    if(sec>2){

        rotateX(-PI/2);//Base de los brazos
        rotateZ(rot1);
        translate(0,0,150);
        if(texturas!=0){texture(metal);}
        torus(80,80);

        
        for(let x=0; x<6;x+=1){//BRAZOS
            push();
            rotateZ(PI/3*x);
            translate(400,0,0);
            if(texturas!=0){texture(metal);}
            box(550,100,100);
            translate(200,0,0);
            box(40,40,200);
                push();
                rotateX(-PI/2);
                model(pipe);
                translate(0,200,0);
                if(texturas!=0){texture(metal);}
                box(40,200,40);
                for(let i=0; i<2;i++){
                    push();
                    rotateZ(rotations[x][i]);
                    rotateX(-PI/2);
                    rotateY(-PI/2);
                    rotateX(PI/2);
                    rotateY(PI*i);
                    translate(0,0,10*i);
                    translate(0,-50,50);
                    if(texturas!=0){texture(metal);}
                    model(silla);
                    translate(50,0,0);
                    model(silla);
                    pop();
                }
                pop();
            pop();
        }
        if(rot1<speed){
            rot1+=0.01*sec;
        }
        else{
            rot1+=0.01*speed;
        }

    }
    for(let x=0;x<6;x++){
        for(let y=0;y<2;y++){
            duration[x][y]-=1;
            if(duration[x][y]==0){
                durations[x][y]=random(4,9);
                if(speeds[x][y]>0){
                    speeds[x][y]=random(-0.03,-0.02);
                }
                else{
                    speeds[x][y]=random(0.02,0.03);
                }
            }
            rotations[x][y]+=speeds[x][y];
        }
    }
    camera(0,0,(height/2) / tan(PI/6),0,-330,0,0,1,0);

}
function mySelectEvent() {
    switch(sel.value()){
        case 'Multiplicar':
            texturas=1;
            break;
        case 'Transparencia':
            texturas=2;
            break;
        case 'Promedio':
            texturas=3;
            break;
        default:
            texturas=0;
    }
}
```
{{< /details >}}
{{< p5-iframe sketch="/visualcomputing/sketches/taller3.js" width="630" height="680" >}}

## Recursos
-  https://www.models-resource.com/ (Modelos en .obj)
-  https://www.youtube.com/ (Videos de la atracción)
