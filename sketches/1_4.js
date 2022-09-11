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