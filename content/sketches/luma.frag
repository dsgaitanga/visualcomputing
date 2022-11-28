precision mediump float;

// uniforms are defined and sent by the sketch
uniform bool grey_scale;
uniform sampler2D texture;

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;

float modI(float a,float b) {
    float m=a-floor((a+0.5)/b)*b;
    return floor(m+0.5);
}

vec3 hsv(vec3 c)
{           
    float rValor = c.r;
    float gValor = c.g;
    float bValor = c.b;

    float maximo = max(max(rValor, gValor), bValor);
    float minimo = min(max(rValor, gValor), bValor);

    float h = 0.0;
    if(maximo == rValor){
        h = 60.0 * modI((gValor - bValor)/(maximo - minimo), 6.0);
    }else if (maximo == gValor){
        h = 60.0 * (((bValor - rValor) / (maximo - minimo)) + 2.0);
    }else{
        h = 60.0 * (((rValor - gValor) / (maximo - minimo)) + 4.0);
    }

    float s = 0.0;
    if(maximo != 0.0){
        s = (maximo - minimo) / maximo;
    }else{
        s = 0.0;
    }

    float v = maximo;

    return vec3(h, s, v);

}

void main() {
  // texture2D(texture, texcoords2) samples texture at texcoords2 
  // and returns the normalized texel color
  vec4 texel = texture2D(texture, texcoords2);
  gl_FragColor = grey_scale ? vec4((vec3(hsv(texel.rgb))), 1.0) : texel;
}