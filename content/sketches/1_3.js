let slider;

function setup() {
    createCanvas(600, 600);
    rectMode(CENTER);
    sliderX = 30;
    sliderY = 20;
  slider = createSlider(2, 8, 2, 1);
  slider.position((width/2)-40, height);

}

function draw() {
    background(255);
    fill(255, 150);
    rect(30, 70, 10, 120, 5);
    noFill();
    translate(300, 300);
     let s = slider.value()
     if(s==0){
       s=0.2
     }
    for (let x = 420; x >= 40; x = x / 1.08) {
        rotate(radians(frameCount /s));
        noStroke();
        fill(127,204,x, 80);
        rect(0, 0, x, x);
    }
}