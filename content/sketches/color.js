let colorShader;
let cmy;
let v1, v2, v3;
let color = 255;
function preload() {

  colorShader = readShader('visualcomputing/sketches/shaders/color.frag', { matrices: Tree.NONE, varyings: Tree.color4 });
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(300, 300, WEBGL);
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