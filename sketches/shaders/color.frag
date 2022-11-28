// welcome to your first ever shader :)
// in glsl it is mandatory to define a precision!
precision mediump float;

// define color model: rgb (default) or cmy (its complementary)
uniform bool cmy;

// interpolated color is emitted from the vertex shader
// where the variable is defined in the same exact way
// see your console!
varying vec4 color4;

void main() {
  // Observe:
  // 1. All colors are normalized thus vec3(1.0, 1.0, 1.0) gives white
  // which is the same as vec3(1.0)
  // see: https://www.khronos.org/opengl/wiki/Data_Type_(GLSL)#Vector_constructors
  // 2. Use always the decimal digit as in vec3(1.0). Doing it otherwise
  // could lead to errors.
  // 3. color4.rgb builds a vec3 with the first three components of color4
  // (which is a vec4) this is refer to as 'swizzling'
  // see: https://www.khronos.org/opengl/wiki/Data_Type_(GLSL)#Swizzling
  gl_FragColor = cmy ? vec4((vec3(1.0) - color4.rgb), color4.a) : color4;
}