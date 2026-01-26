let noiseScale = 0.1
let noiseTime = 0.1
let noiseDist = 10
let colourSpeed=2

let points = []

function mouseDragged(){
    points.push([mouseX, mouseY])
}


function setup() {
     createCanvas(400, 400);
     background(255)
}

function draw(){
    background(255)
    stroke(0)
    strokeWeight(3)
    if (points.length> 2){for (let i = 0; i < points.length-1; i++){
        colorMode(HSB)
        stroke(colourSpeed * i % 360, 100, 100)
        line(points[i][0]+noiseDist*noise(i*noiseScale, frameCount*noiseTime), points[i][1]+noiseDist*noise(i*noiseScale, frameCount*noiseTime), points[i+1][0]+noiseDist*noise(i*noiseScale, frameCount*noiseTime), points[i+1][1]+noiseDist*noise(i*noiseScale, frameCount*noiseTime))
    }}

    //make it wiggle and change colour!!

}


