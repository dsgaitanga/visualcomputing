let x=0
let slider;
function setup() {
  createCanvas(500, 500);
  rectMode(CENTER)
  slider = createSlider(-4, 4, 0, 0.0001);
  slider.position((width/2)-40, height);
  
}

function draw() {
 background(40);
 for(let i=0;i<500;i+=10){
 stroke('purple')
 strokeWeight(3)
 ellipse(x,250,i-500,i-500)
 
 noFill()
 stroke('blue')
 strokeWeight(3)
 ellipse(width/2,height/2,i,i)
 } 
 let s = slider.value()
 if(x>width){
   
   x=0
 }if(x<0){
   x=width
 }
  else{
   x=x+s
 }
}