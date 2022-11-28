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