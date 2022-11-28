## Procedural Texturing

El objetivo del texturizado procedimental es generar una textura de forma procedimental usando un algoritmo de tal manera que el resultado pueda ser mapeado en una forma como una textura. El texturizado procedimental requiere el uso de un objeto frame buffer que en p5.js se implementa como un objeto p5.Graphics.

El programa de abajo utiliza las  truchet tiles implementadas en el gran libro de shaders de Patricio Gonzales y Jen Lowe para mapear la textura resultante en el cilindro.
{{< details "Código Fuente" close >}}
```js
let pg;
let truchetShader;

function preload() {
  // shader adapted from here: https://thebookofshaders.com/09/
  truchetShader = readShader('/visualcomputing/sketches/truchet.frag',
                             { matrices: Tree.NONE, varyings: Tree.NONE });
}

function setup() {
  createCanvas(400, 400, WEBGL);
  // create frame buffer object to render the procedural texture
  pg = createGraphics(400, 400, WEBGL);
  textureMode(NORMAL);
  noStroke();
  pg.noStroke();
  pg.textureMode(NORMAL);
  // use truchetShader to render onto pg
  pg.shader(truchetShader);
  // emitResolution, see:
  // https://github.com/VisualComputing/p5.treegl#macros
  pg.emitResolution(truchetShader);
  // https://p5js.org/reference/#/p5.Shader/setUniform
  truchetShader.setUniform('u_zoom', 3);
  // pg clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  // set pg as texture
  texture(pg);
}

function draw() {
  background(33);
  orbitControl();
  cylinder(100, 200);
}

function mouseMoved() {
  // https://p5js.org/reference/#/p5.Shader/setUniform
  truchetShader.setUniform('u_zoom', int(map(mouseX, 0, width, 1, 30)));
  // pg clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
}
```
{{< /details >}}
{{< p5-iframe sketch="/visualcomputing/sketches/truchet_tiles.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" lib2="https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam@1.2.1/p5.easycam.js" width="425" height="425" >}}