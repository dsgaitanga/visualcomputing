## Non-Euclidean geometry #

Se pueden implementar todo tipo de geometrías no euclidianas creando un enlace entre diferentes lugares del espacio 3D que comparten el mismo punto de vista:

{{< details "non_euclidean.js" >}}
```js
let easycam;
let edge = 80;

function preload() {
  // no varyings need to be emitted from the vertex shader
  texShader = readShader('/visualcomputing/sketches/non_euclidean.frag',
                         { varyings: Tree.NONE });
  fox = loadModel('/visualcomputing/sketches/fox.obj', true);
  cow = loadModel('/visualcomputing/sketches/cow.obj', true);
  armadillo = loadModel('/visualcomputing/sketches/armadillo.obj', true);
  horse = loadModel('/visualcomputing/sketches/horse.obj', true);
  bunny = loadModel('/visualcomputing/sketches/bunny.obj', true);
  teapot = loadModel('/visualcomputing/sketches/teapot.obj', true);
}

function setup() {
  createCanvas(500, 500, WEBGL);
  // no need to normalize the texture
  // textureMode(NORMAL);
  shader(texShader);
  // resolution will be used to sample the offscreen textures
  emitResolution(texShader);
  easycam = createEasyCam();
  foxTex = createGraphics(width, height, WEBGL);
  cowTex = createGraphics(width, height, WEBGL);
  armadilloTex = createGraphics(width, height, WEBGL);
  horseTex = createGraphics(width, height, WEBGL);
  bunnyTex = createGraphics(width, height, WEBGL);
  teapotTex = createGraphics(width, height, WEBGL);
}

function draw() {
  // 1. compute current main canvas camera params
  let position = treeLocation();
  let center = p5.Vector.add(position, treeDisplacement());
  let up = treeDisplacement(Tree.j);
  // in case the current camera projection params are needed check:
  // https://github.com/VisualComputing/p5.treegl#frustum-queries
  // 2. offscreen rendering
  // cow graphics
  cowTex.background(200);
  cowTex.reset();
  cowTex.camera(position.x, position.y, position.z,
                  center.x, center.y, center.z,
                  up.x, up.y, up.z);
  cowTex.push();
  cowTex.noStroke();
  cowTex.fill('white');
  // most models use positive y-coordinates
  cowTex.scale(1, -1);
  cowTex.scale(0.8);// only cow
  cowTex.model(cow);
  cowTex.pop();
  // fox graphics
  foxTex.background(200);
  foxTex.reset();
  foxTex.camera(position.x, position.y, position.z,
                   center.x, center.y, center.z,
                   up.x, up.y, up.z);
  foxTex.push();
  foxTex.noStroke();
  foxTex.fill('orange');
  foxTex.scale(1, -1);
  foxTex.model(fox);
  foxTex.pop();

  armadilloTex.background(200);
  armadilloTex.reset();
  armadilloTex.camera(position.x, position.y, position.z,
                  center.x, center.y, center.z,
                  up.x, up.y, up.z);
  armadilloTex.push();
  armadilloTex.noStroke();
  armadilloTex.fill('black');
  armadilloTex.scale(1, -1);
  armadilloTex.scale(0.8);// only armadillo
  armadilloTex.model(armadillo);
  armadilloTex.pop();

  horseTex.background(200);
  horseTex.reset();
  horseTex.camera(position.x, position.y, position.z,
                  center.x, center.y, center.z,
                  up.x, up.y, up.z);
  horseTex.push();
  horseTex.noStroke();
  horseTex.fill('red');
  horseTex.scale(1, -1);
  horseTex.scale(0.8);// only horse
  horseTex.model(horse);
  horseTex.pop();

  bunnyTex.background(200);
  bunnyTex.reset();
  bunnyTex.camera(position.x, position.y, position.z,
                  center.x, center.y, center.z,
                  up.x, up.y, up.z);
  bunnyTex.push();
  bunnyTex.noStroke();
  bunnyTex.fill('yellow');
  bunnyTex.scale(1, -1);
  bunnyTex.scale(0.8);// only bunny
  bunnyTex.model(bunny);
  bunnyTex.pop();

  teapotTex.background(200);
  teapotTex.reset();
  teapotTex.camera(position.x, position.y, position.z,
                  center.x, center.y, center.z,
                  up.x, up.y, up.z);
  teapotTex.push();
  teapotTex.noStroke();
  teapotTex.fill('green');
  teapotTex.scale(1, -1);
  teapotTex.scale(0.8);// only teapot
  teapotTex.model(teapot);
  teapotTex.pop();
  // 3. main canvas
  background(0);
  push();
  // front (+z)
  stroke('blue');
  strokeWeight(5);
  texShader.setUniform('texture', cowTex);
  beginShape();
  vertex(-edge, -edge, +edge);
  vertex(+edge, -edge, +edge);
  vertex(+edge, +edge, +edge);
  vertex(-edge, +edge, +edge);
  endShape(CLOSE);
  // right (+x)
  texShader.setUniform('texture', foxTex);
  beginShape();
  vertex(+edge, -edge, +edge);
  vertex(+edge, -edge, -edge);
  vertex(+edge, +edge, -edge);
  vertex(+edge, +edge, +edge);
  endShape(CLOSE);
  // back (-z)
  texShader.setUniform('texture', armadilloTex);
  beginShape();
  vertex(+edge, +edge, -edge);
  vertex(-edge, +edge, -edge);
  vertex(-edge, -edge, -edge);
  vertex(+edge, -edge, -edge);
  endShape(CLOSE);
  // left (-x)
  texShader.setUniform('texture', horseTex);
  beginShape();
  vertex(-edge, +edge, -edge);
  vertex(-edge, +edge, +edge);
  vertex(-edge, -edge, +edge);
  vertex(-edge, -edge, -edge);
  endShape(CLOSE);
  // up (+y)
  texShader.setUniform('texture', bunnyTex);
  beginShape();
  vertex(+edge, +edge, +edge);
  vertex(+edge, +edge, -edge);
  vertex(-edge, +edge, -edge);
  vertex(-edge, +edge, +edge);
  endShape(CLOSE);
  // down (-y)
  texShader.setUniform('texture', teapotTex);
  beginShape();
  vertex(-edge, -edge, -edge);
  vertex(-edge, -edge, +edge);
  vertex(+edge, -edge, +edge);
  vertex(+edge, -edge, -edge);
  endShape(CLOSE);
  pop();
}
```
{{< /details >}}
{{< p5-iframe sketch="/visualcomputing/sketches/non_euclidean.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" 
lib2="https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam@1.2.1/p5.easycam.js" width="500" height="500"  >}}