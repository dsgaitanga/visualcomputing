let easycam;
let uvShader;

function preload() {
  // Define geometry in world space (i.e., matrices: Tree.pmvMatrix).
  // The projection and modelview matrices may be emitted separately
  // (i.e., matrices: Tree.pMatrix | Tree.mvMatrix), which actually
  // leads to the same gl_Position result.
  // Interpolate only texture coordinates (i.e., varyings: Tree.texcoords2).
  // see: https://github.com/VisualComputing/p5.treegl#handling
  uvShader = readShader('/shaders/uv.frag', { matrices: Tree.pmvMatrix, varyings: Tree.texcoords2 });
}

function setup() {
  createCanvas(600, 450, WEBGL);
  textureMode(NORMAL);
  // use custom shader
  shader(uvShader);
  console.log(Tree.pmvMatrix);
}

function draw() {
  background(200);
  orbitControl();
  axes();
  push();
  noStroke();
  // world-space quad (i.e., p5 world space definition: https://shorturl.at/dhCK2)
  beginShape(TRIANGLES);
  vertex(30, 75);
  vertex(40, 20);
  vertex(50, 75);
  endShape();
  pop();
}

function mouseWheel(event) {
  //comment to enable page scrolling
  return false;
}