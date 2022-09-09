let img;
//Botones
let filtrar;
//Variables de la matriz-mascara
let matriz= [[0,0,0],
            [0,1,0],
            [0,0,0]];
let M1;
let M2;
let M3;
let M4;
let M5;
let M6;
let M7;
let M8;
let M9;
function preload() {
  img = loadImage("/visualcomputing/sketches/minimagen.jpg");
}

function setup() {
  createCanvas(500, 356);
  background(255);
  M1 = createInput('0');
  M1.position(400,20);
  M1.size(20,20);
  M2 = createInput('0');
  M2.position(430,20);
  M2.size(20,20);
  M3 = createInput('0');
  M3.position(460,20);
  M3.size(20,20);
  M4 = createInput('0');
  M4.position(400,50);
  M4.size(20,20);
  M5 = createInput('1');
  M5.position(430,50);
  M5.size(20,20);
  M6 = createInput('0');
  M6.position(460,50);
  M6.size(20,20);
  M7 = createInput('0');
  M7.position(400,80);
  M7.size(20,20);
  M8 = createInput('0');
  M8.position(430,80);
  M8.size(20,20);
  M9 = createInput('0');
  M9.position(460,80);
  M9.size(20,20);
  filtrar = createButton('Aplicar filtro');
  filtrar.position(400, 120);
  filtrar.mousePressed(filtrado);
  noLoop();
}

function draw() {
    image(img, 0, 0);
    newImg = createImage(img.width,img.height);
    newImg.loadPixels();
    for (let x = 1; x < 600 - 1; x++) {
      for (let y = 1; y < 1068 - 1; y++) {
        let sumaR=0;
        let sumaG=0;
        let sumaB=0;
        for (kx = -1; kx <= 1; kx++) {
          for (ky = -1; ky <= 1; ky++) {
            let posx= x+kx;
            let posy=y+ky;
            let pxR= red(img.get(posx, posy));
            let pxG= green(img.get(posx, posy));
            let pxB= blue(img.get(posx, posy));
            sumaR += matriz[kx+1][ky+1] * pxR;
            sumaG += matriz[kx+1][ky+1] * pxG;
            sumaB += matriz[kx+1][ky+1] * pxB;
          }
        }
        newImg.set(x, y, color(sumaR,sumaG,sumaB));
      }
    }
    newImg.updatePixels(); 
    image(newImg,img.width,0);
}
function filtrado() {
  matriz = [[float(M1), float(M2), float(M3)],
            [float(M4), float(M5), float(M6)],
            [float(M7), float(M8), float(M9)],];
  //matriz=[[-1,-2,-1],[0,0,0],[1,2,1]];
  redraw();
}