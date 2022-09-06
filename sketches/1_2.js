let x=0
function setup() {
  createCanvas(500, 500);
  rectMode(CENTER)
  
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
 if(x>width){
   
   x=0
 }else{
   x=x+2
 }
}