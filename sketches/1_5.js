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