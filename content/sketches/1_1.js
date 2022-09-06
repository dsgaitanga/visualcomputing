var pasos;
var peso;
var radio;
function setup(){
    createCanvas(500,300);
    pasos=5;
    peso=0;
    radio=5;
}
function draw(){
    background(255);
    radio=50*(1-norm(Math.sqrt(Math.pow(width/2-mouseX,2)+Math.pow(height/2-mouseY,2)), 0, height));
    for(var i=10; i<width;i+=10){
        for(var j=0;j<height;j+=pasos){
            //strokeWeight();
            strokeWeight(radio*(1-norm(Math.sqrt(Math.pow(width/2-i,2)+Math.pow(height/2-j,2)), 0, height)));
            line(i,j,i,j+pasos);
        }  
    }
    fill(255);
    rect(width-215,height-35,width,height);
    fill(0);
    textSize(25);
    textStyle(BOLD);
    text('Intensidad: '+ (radio | 0), width-190,height-10);
}