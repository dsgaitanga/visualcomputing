function setup() {
    createCanvas(600, 600);
    rectMode(CENTER);
    sliderX = 30;
    sliderY = 20;
}

function draw() {
    background(255);
    fill(255, 150);
    rect(30, 70, 10, 120, 5);
    noFill();
    translate(300, 300);
    for (let x = 420; x >= 40; x = x / 1.08) {
        rotate(radians(frameCount / 2));
        noStroke();
        fill(127,204,x, 80);
        rect(0, 0, x, x);
    }
}