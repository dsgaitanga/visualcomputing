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