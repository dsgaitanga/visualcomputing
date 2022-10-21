# SegundoTaller

Para la implementación del segúndo taller decidimos usar como base **La atracción de Mundo Aventura "Ikaro".** La complejidad de su implementación radica en la gran cantidad de movimientos que realiza, para lo cual se deben hacer traslaciones y rotaciones anidadas, lo que lo convierte en un proyecto interesante a simular. 

{{< youtube NQMO0Ib_osg >}}

## Funcionamiento

El mecanismo de esta atracción funciona de la siguiente forma:
-  El brazo principal sube la rueda cuando la atracción inicia, de forma que pasa de 0 a 90 grados respecto a los ejes X,Y en los primeros segundos.
-  La rueda comienza a rotar en la dirección de las manecillas del reloj, desde una velocidad 0 a una velocidad máxima en los primeros 10 segundos aproximadamente.
-  En cada uno de los 6 brazos que se conectan con la rueda, se encuentran dos parejas de asientos, los cuales rotan bajo su propio eje a velocidades variables entre si.
-  El brazo principal también gira bajo su propio eje cada 30 segundos, rota hasta 180 grados en dirección inversa a las manecillas del reloj durante 10 segundos, permanece 10 segundos en esa posición y durante los siguientes 10 segundos vuelve a su posición inicial rotando 180 grados en dirección de las manecillas del reloj.

Para su modelamiento se aplicó una serie sucesiva de traslaciones y rotaciones a todos los componentes del mecanismo de manera anidada. No se usó ninguna referencia para el modelado de la atracción, solo los videos e imágenes obtenidas del mismo.

{{< p5-iframe sketch="/visualcomputing/sketches/taller2.js" width="630" height="650" >}}

## Instrucciones de uso
{{< hint info >}}
Para interactuar con la simulación se hace uso del mouse, es posible rotar alrededor del mecanismo moviendo el mouse en el eje Y, también es posible hacer Zoom en el mecanismo moviendo el mouse en el eje X.

De igual manera, es posible usar el checkbox ubicado en la parte inferior del canvas para aplicar las texturas.
{{< /hint >}}


{{< details "Código Fuente" open >}}
```tpl
//OBJETOS
let silla;
let cube;
let pipe;
//Texturas
let tubo;
let led;
let metal;
let metal_rojo;
let metal_azul;
let texturas=0;
//Variables de rotación y traslación generales
let trans1=0;
let rot1=0;
let speed=2.5;
//Variables de rotación carritos
let speeds=[];
let duration=[];
let rotations=[];
//FONDO
let fondo;
function preload(){
    silla= loadModel('/visualcomputing/sketches/silla.obj');
    cube=loadModel('/visualcomputing/sketches/cube.obj');
    pipe=loadModel('/visualcomputing/sketches/pipe.obj');
    tubo=loadImage('/visualcomputing/sketches/tubo.jpg');
    led=loadImage('/visualcomputing/sketches/led.jpg');
    metal=loadImage('/visualcomputing/sketches/metal.jpg');
    metal_rojo=loadImage('/visualcomputing/sketches/metal_rojo.jpg');
    metal_azul=loadImage('/visualcomputing/sketches/metal_azul.jpg');
    fondo=loadImage('/visualcomputing/sketches/FONDO.jpg');
}

function setup(){
    checkbox = createCheckbox('Texturas', false);
    checkbox.changed(myCheckedEvent);
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
    background(80);
    
    translate(0,0,map(mouseX,0,width+width/2,150,-width*3));
    rotateY(map(mouseY,0,height,0,2*PI));
    noStroke();
    normalMaterial();
    if(texturas==1){
        texture(fondo);
        sphere(4000-mouseX);
    }
    

    let sec=millis()/1000;

    push(); //BASE
    rotateX(PI);
    scale(2);
    translate(0,-20,-10);
    if(texturas==1){texture(tubo);}
    model(pipe);
    pop();

    push();//ESFERAS QUE CONECTAN AL TUBO CENTRAL
    translate(0,-100,0);
    sphere(50);
    translate(0,-20,0);
    sphere(50);
    pop();
    //TUBO CENTRAL
    if(texturas==1){texture(metal_azul);}
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
    if(texturas==1){texture(metal_rojo);}
    cylinder(80,200);
    rotateX(PI/2);
    if(texturas==1){texture(metal);}
    torus(100,10);
    cylinder(50,500);
    translate(0,-350,0);

    push(); //Bola de pinchos
    rotateX(PI);
    scale(5);
    translate(0,-20,0);
    if(texturas==1){texture(metal_rojo);}
    model(cube);
    pop();

    if(sec>2){

        rotateX(-PI/2);//Base de los brazos
        rotateZ(rot1);
        translate(0,0,150);
        if(texturas==1){texture(led);}
        torus(80,80);

        
        for(let x=0; x<6;x+=1){//BRAZOS
            push();
            rotateZ(PI/3*x);
            translate(400,0,0);
            if(texturas==1){texture(metal_azul);}
            box(550,100,100);
            translate(200,0,0);
            box(40,40,200);
                push();
                rotateX(-PI/2);
                model(pipe);
                translate(0,200,0);
                if(texturas==1){texture(metal_rojo);}
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
                    if(texturas==1){texture(metal);}
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
function myCheckedEvent() {
    if (checkbox.checked()) {
      texturas=1;
    } else {
      texturas=0;
    }
  }
```
{{< /details >}}

## Recursos
-  https://www.models-resource.com/ (Modelos en .obj)
-  https://www.youtube.com/ (Videos de la atracción)
