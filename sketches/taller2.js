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
    texture(fondo);
    sphere(4000-mouseX);

    let sec=millis()/1000;

    push(); //BASE
    rotateX(PI);
    scale(2);
    translate(0,-20,-10);
    texture(tubo);
    model(pipe);
    pop();

    push();//ESFERAS QUE CONECTAN AL TUBO CENTRAL
    translate(0,-100,0);
    sphere(50);
    translate(0,-20,0);
    sphere(50);
    pop();
    //TUBO CENTRAL
    texture(metal_azul);
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
    texture(metal_rojo);
    cylinder(80,200);
    rotateX(PI/2);
    texture(metal);
    torus(100,10);
    cylinder(50,500);
    translate(0,-350,0);

    push(); //Bola de pinchos
    rotateX(PI);
    scale(5);
    translate(0,-20,0);
    texture(metal_rojo);
    model(cube);
    pop();

    if(sec>2){

        rotateX(-PI/2);//Base de los brazos
        rotateZ(rot1);
        translate(0,0,150);
        texture(led);
        torus(80,80);

        
        for(let x=0; x<6;x+=1){//BRAZOS
            push();
            rotateZ(PI/3*x);
            translate(400,0,0);
            texture(metal_azul);
            box(550,100,100);
            translate(200,0,0);
            box(40,40,200);
                push();
                rotateX(-PI/2);
                model(pipe);
                translate(0,200,0);
                texture(metal_rojo);
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
                    texture(metal);
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