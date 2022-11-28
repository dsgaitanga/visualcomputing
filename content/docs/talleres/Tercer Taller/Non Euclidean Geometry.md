## Texturing #
A texture is an image (i.e., either a bitmap or a procedural texture) mapped onto the surface of a shape usually specified in a triangle by triangle basis.

### UV Visualization #
The texture is defined in the so called uv space which itself may be displayed in a variaty of ways such as the one below:

{{< p5-iframe sketch="/VisualComputing2022_2/sketches/Taller3/Texturing/uv.js" lib1="/VisualComputing2022_2/sketches/libraries/p5.treegl.js" width="500" height="500" >}}

{{< details "uv.js" >}}
```js
let uvShader;
function preload() {
  // Define geometry directly in clip space (i.e., matrices: Tree.NONE).
  // Interpolate only texture coordinates (i.e., varyings: Tree.texcoords2).
  // see: https://github.com/VisualComputing/p5.treegl#handling
  uvShader = readShader('/VisualComputing2022_2/sketches/Taller3/Texturing/uv.frag',
                        { matrices: Tree.NONE, varyings: Tree.texcoords2 });
}
function setup() {
  // shaders require WEBGL mode to work
  createCanvas(300, 300, WEBGL);
  noStroke();
  // see: https://p5js.org/reference/#/p5/shader
  shader(uvShader);
  // https://p5js.org/reference/#/p5/textureMode
  // best and simplest is to just always used NORMAL
  textureMode(NORMAL);
}
function draw() {
  background(0);
  /*
  clip-space quad shape, i.e., both x and y vertex coordinates ∈ [-1..1]
  since textureMode is NORMAL, texture coordinates ∈ [-1..1]
  see: https://p5js.org/reference/#/p5/beginShape
       https://p5js.org/reference/#/p5/vertex
        y                  v
        |                  |
  (-1,1)|     (1,1)        (0,1)     (1,1)
  *_____|_____*            *__________*   
  |     |     |            |          |        
  |_____|_____|__x         | texture  |        
  |     |     |            |  space   |
  *_____|_____*            *__________*___ u
  (-1,-1)    (1,-1)       (0,0)    (1,0) 
  */
  beginShape();
  vertex(-1, -1, 0, 0, 0);
  vertex( 1, -1, 0, 1, 0);
  vertex( 1,  1, 0, 1, 1);
  vertex(-1,  1, 0, 0, 1);
  endShape();
  // ✨ it's worth noting (not mentioned in the p5 api docs though)
  // that quad (https://p5js.org/reference/#/p5/quad) also adds the
  // texture coords to each of its vertices. Hence:
  // quad(-1, -1, 1, -1, 1, 1, -1, 1);
  // produce the same results as the above beginShape / endShape
}
```
{{< /details >}}
{{< details "uv.frag" >}}
```js
precision mediump float;
// the texture coordinates varying was defined in 
// the vertex shader by treegl readShader()
// open your console and & see!
varying vec2 texcoords2;
void main() {
  // glsl swizzling is both handy and elegant
  // see: https://www.khronos.org/opengl/wiki/Data_Type_(GLSL)#Swizzling
  gl_FragColor = vec4(texcoords2.xy, 0.0, 1.0);
}
```
{{< /details >}}

### 3D #
3D real-time interaction requires view and projection matrices to compute the vertex clip-space projection within the vertex shader. For instance, we can render the previous uv visualization in world space or use it as a screen filter while navigating a 3D scene.

### World
{{< p5-iframe sketch="/VisualComputing2022_2/sketches/Taller3/Texturing/uv_world.js" lib1="/VisualComputing2022_2/sketches/libraries/p5.treegl.js" width="500" height="500" >}}
{{< details "uv_world.js" >}}
```js
let easycam;
let uvShader;
function preload() {
  // Define geometry in world space (i.e., matrices: Tree.pmvMatrix).
  // The projection and modelview matrices may be emitted separately
  // (i.e., matrices: Tree.pMatrix | Tree.mvMatrix), which actually
  // leads to the same gl_Position result.
  // Interpolate only texture coordinates (i.e., varyings: Tree.texcoords2).
  // see: https://github.com/VisualComputing/p5.treegl#handling
  uvShader = readShader('/VisualComputing2022_2/sketches/Taller3/Texturing/uv.frag',
                  { matrices: Tree.pmvMatrix, varyings: Tree.texcoords2 });
}
function setup() {
  createCanvas(300, 300, WEBGL);
  textureMode(NORMAL);
  // use custom shader
  shader(uvShader);
}
function draw() {
  background(200);
  orbitControl();
  axes();
  push();
  noStroke();
  // world-space quad
  // (i.e., p5 world space definition: https://t.ly/GeYP)
  quad(-width / 2, -height / 2, width / 2, -height / 2,
        width / 2, height / 2, -width / 2, height / 2);
  pop();
}
function mouseWheel(event) {
  //comment to enable page scrolling
  return false;
}
```
{{< /details >}}
### Screen
{{< p5-iframe sketch="/VisualComputing2022_2/sketches/Taller3/Texturing/uv_screen.js"
lib1="/VisualComputing2022_2/sketches/libraries/p5.treegl.js" lib2="/VisualComputing2022_2/sketches/libraries/p5.easycam.js"
width="500" height="500" >}}
{{< details "uv_screen.js" >}}
```js
let easycam;
let uvShader;
let opacity;
function preload() {
  // Define geometry in world space (i.e., matrices: Tree.pmvMatrix).
  // The projection and modelview matrices may be emitted separately
  // (i.e., matrices: Tree.pMatrix | Tree.mvMatrix), which actually
  // leads to the same gl_Position result.
  // Interpolate only texture coordinates (i.e., varyings: Tree.texcoords2).
  // see: https://github.com/VisualComputing/p5.treegl#handling
  uvShader = readShader('/VisualComputing2022_2/sketches/Taller3/Texturing/uv_alpha.frag',
              { matrices: Tree.pmvMatrix, varyings: Tree.texcoords2 });
}
function setup() {
  createCanvas(300, 300, WEBGL);
  // easycam stuff
  let state = {
    distance: 250,           // scalar
    center: [0, 0, 0],       // vector
    rotation: [0, 0, 0, 1],  // quaternion
  };
  easycam = createEasyCam();
  easycam.state_reset = state;   // state to use on reset (double-click/tap)
  easycam.setState(state, 2000); // now animate to that state
  textureMode(NORMAL);
  opacity = createSlider(0, 1, 0.5, 0.01);
  opacity.position(10, 25);
  opacity.style('width', '280px');
}
function draw() {
  background(200);
  // reset shader so that the default shader is used to render the 3D scene
  resetShader();
  // world space scene
  axes();
  grid();
  translate(0, -70);
  rotateY(0.5);
  fill(color(255, 0, 255, 125));
  box(30, 50);
  translate(70, 70);
  fill(color(0, 255, 255, 125));
  sphere(30, 50);
  // use custom shader
  shader(uvShader);
  // https://p5js.org/reference/#/p5.Shader/setUniform
  uvShader.setUniform('opacity', opacity.value());
  // screen-space quad (i.e., x ∈ [0..width] and y ∈ [0..height])
  // see: https://github.com/VisualComputing/p5.treegl#heads-up-display
  beginHUD();
  noStroke();
  quad(0, 0, width, 0, width, height, 0, height);
  endHUD();
}
function mouseWheel(event) {
  //comment to enable page scrolling
  return false;
}
```
{{< /details >}}
{{< details "uv_alpha.frag" >}}
```js
precision mediump float;
varying vec2 texcoords2;
varying vec4 color4;
// uniform is sent by the sketch
uniform float opacity;
void main() {
  gl_FragColor = vec4(texcoords2.xy, 0.0, opacity);
}
```
{{< /details >}}
## Texture mapping #
Texture mapping by hardware can easily be implemented by vanilla p5 texture and textureMode functions alone (no custom shader needed at all). For example, both commands are used to texturize a triangle pruducing a similar result to that obtained by software:

{{< p5-iframe sketch="/VisualComputing2022_2/sketches/Taller3/Texturing/video_cube.js" lib1="/VisualComputing2022_2/sketches/libraries/p5.treegl.js" 
lib1="/VisualComputing2022_2/sketches/libraries/p5.treegl.js" lib2="/VisualComputing2022_2/sketches/libraries/p5.easycam.js"
width="500" height="500" >}}

## Texture sampling #
Sampling a texture at given texcoords2 coordinates (defined as a vec2 in [0..1]) always requires issuing a call to glsl texture2D within your custom shader. It’s needed for example to compute a lightness visualization of a given source image (video), while speeding its visualization up (compared to performing the same computation by software):

{{< p5-iframe sketch="/VisualComputing2022_2/sketches/Taller3/Texturing/luma.js" lib1="/VisualComputing2022_2/sketches/libraries/p5.treegl.js" width="725" height="525" >}}
{{< details "luma.js" >}}
```js
let lumaShader;
let img;
let grey_scale;
function preload() {
  lumaShader = readShader('/VisualComputing2022_2/sketches/Taller3/Texturing/luma.frag',
                        { varyings: Tree.texcoords2 });
  // image source: https://t.ly/Dz8W
  img = loadImage('/VisualComputing2022_2/sketches/Taller3/Texturing/fire_breath.jpg');
}
function setup() {
  createCanvas(700, 500, WEBGL);
  noStroke();
  textureMode(NORMAL);
  shader(lumaShader);
  grey_scale = createCheckbox('luma', false);
  grey_scale.position(10, 10);
  grey_scale.style('color', 'white');
  grey_scale.input(() => lumaShader.setUniform('grey_scale',
                                                grey_scale.checked()));
  lumaShader.setUniform('texture', img);
}
function draw() {
  background(0);
  quad(-width / 2, -height / 2, width / 2, -height / 2,
        width / 2, height / 2, -width / 2, height / 2);
}
```
{{< /details >}}
{{< details "luma.frag" >}}
```js
precision mediump float;
// uniforms are defined and sent by the sketch
uniform bool grey_scale;
uniform sampler2D texture;
// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;
// returns luma of given texel
float luma(vec3 texel) {
  return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}
void main() {
  // texture2D(texture, texcoords2) samples texture at texcoords2 
  // and returns the normalized texel color
  vec4 texel = texture2D(texture, texcoords2);
  gl_FragColor = grey_scale ? vec4((vec3(luma(texel.rgb))), 1.0) : texel;
}
```
{{< /details >}}