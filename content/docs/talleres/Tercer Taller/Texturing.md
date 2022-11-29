## Texturing

### UV Visualization

El mapeo de texturas es un método para definir detalles de alta frecuencia, texturas superficiales o información de color en un gráfico generado por computadora o en un modelo 3D. La técnica original fue establecida por Edwin Catmull en 1974.

El mapeo de texturas originalmente se refería al mapeo difuso, un método que mapeaba píxeles de una textura a una superficie 3D ("envolviendo" la imagen alrededor del objeto). En las últimas décadas, el advenimiento del renderizado multipaso, multitexturización, mipmaps y mapeos más complejos como el mapeo de altura, el mapeo de relieve, el mapeo normal, el mapeo de desplazamiento, el mapeo de reflexión, el mapeo especular, el mapeo de oclusión y muchas otras variaciones de la técnica. (controlados por un sistema de materiales) han hecho posible simular casi fotorrealismo en tiempo real al reducir enormemente la cantidad de polígonos y cálculos de iluminación necesarios para construir una escena 3D realista y funcional.

La textura se define en "uv space", que a su vez se puede mostrar de varias formas como la que se muestra a continuación utilizando los colores azul y rojo. En el segundo ejemplo se usa una *shape* diferente, en este caso es una elipse:
{{< details "Código Fuente" close >}}
```js
// Código adaptado de la página https://visualcomputing.github.io/docs/shaders/texturing/
let uvShader;
function preload() {
  uvShader = readShader('/shaders/uv.frag', { matrices: Tree.NONE, varyings: Tree.texcoords2 });
}
function setup() {
  createCanvas(600, 450, WEBGL);
  noStroke();
  shader(uvShader);
  textureMode(NORMAL);
}
function draw() {
  background(0);
  quad(-1, -1, 1, -1, 1, 1, -1, 1);
}
```
{{< /details >}}
{{< p5-iframe sketch="/visualcomputing/sketches/uv.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="625" height="475">}}


{{< details "Código Fuente" close >}}
```js
let uvShader;
function preload() {
  uvShader = readShader('/shaders/uv.frag', { matrices: Tree.NONE, varyings: Tree.texcoords2 });
}
function setup() {
  createCanvas(600, 450, WEBGL);
  noStroke();
  shader(uvShader);
  textureMode(NORMAL);
}
function draw() {
  background(0);
  ellipse( -1,1,-1,1);
}
```
{{< /details >}}
{{< p5-iframe sketch="/visualcomputing/sketches/uv_ellipse.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="625" height="475">}}

### 3D Screen
{{< details "Código Fuente" close >}}
```js
// Código adaptado de la página https://visualcomputing.github.io/docs/shaders/texturing/
let easycam;
let uvShader;
let opacity;
function preload() {
  uvShader = readShader('/shaders/uv_alpha.frag', { matrices: Tree.pmvMatrix, varyings: Tree.texcoords2 });
}
function setup() {
  createCanvas(600, 450, WEBGL);
  let state = {
    distance: 250,
    center: [0, 0, 0],
    rotation: [0, 0, 0, 1],
  };
  easycam = createEasyCam();
  easycam.state_reset = state;
  easycam.setState(state, 2000);
  textureMode(NORMAL);
  opacity = createSlider(0, 1, 0.5, 0.01);
  opacity.position(10, 25);
  opacity.style('width', '280px');
}
function draw() {
  background(200);
  resetShader();
  axes();
  grid();
  translate(0, 30);
  fill(color(0, 50, 50, 200));
  rotateX(frameCount * 0.01);
  rotateZ(frameCount * 0.01);
  cone(40, 70);
  // use custom shader
  shader(uvShader);
  uvShader.setUniform('opacity', opacity.value());
  beginHUD();
  noStroke();
  quad(0, 0, width, 0, width, height, 0, height);
  endHUD();
}
function mouseWheel(event) {
  return false;
}
```
{{< /details >}}
{{< p5-iframe sketch="/visualcomputing/sketches/uv_screenfm.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" lib2="https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam@1.2.1/p5.easycam.js" width="625" height="475">}}



### Texture sampling
{{< details "Código Fuente" close >}}
```js
let greyShader;
let img;
let grey_scale;

function preload() {
  greyShader = readShader('/visualcomputing/sketches/grey.frag',
                        { varyings: Tree.texcoords2 });
  img = loadImage('/visualcomputing/sketches/grey.jpg');
}

function setup() {
  createCanvas(700, 500, WEBGL);
  noStroke();
  textureMode(NORMAL);
  shader(greyShader);
  grey_scale = createCheckbox('Grey', false);
  grey_scale.position(10, 10);
  grey_scale.style('color', 'white');
  grey_scale.input(() => greyShader.setUniform('grey_scale',
                                                grey_scale.checked()));
  greyShader.setUniform('texture', img);
}

function draw() {
  background(0);
  quad(-width / 2, -height / 2, width / 2, -height / 2,
        width / 2, height / 2, -width / 2, height / 2);
}
```
{{< /details >}}
{{< p5-iframe sketch="/visualcomputing/sketches/texture_grey.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js"  width="730" height="530">}}

En el modelo de "cono hexagonal" de HSV, el valor se define como el valor del componente más grande de un color. Esto coloca los tres colores primarios y también todos los "colores secundarios" (cian, amarillo y magenta) en un plano con el blanco, formando una pirámide hexagonal fuera del cubo RGB.

{{< details title="Ver código" open=false >}}
```js
let lumaShader;
let img;
let grey_scale;

function preload() {
  lumaShader = readShader('/visualcomputing/sketches/luma.frag', { varyings: Tree.texcoords2 });
  img = loadImage('/visualcomputing/sketches/color.jpeg');
}

function setup() {
  createCanvas(700, 500, WEBGL);
  noStroke();
  textureMode(NORMAL);
  shader(lumaShader);
  grey_scale = createCheckbox('HSV', false);
  grey_scale.position(10, 10);
  grey_scale.style('color', 'white');
  grey_scale.input(() => lumaShader.setUniform('grey_scale', grey_scale.checked()));
  lumaShader.setUniform('texture', img);
}

function draw() {
  background(0);
  quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);
}
```
{{< /details >}}
{{< p5-iframe sketch="/visualcomputing/sketches/lumaf.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="730" height="530">}}
