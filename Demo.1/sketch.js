let xcols = 20;
let ycols = 20;
let posArr = []
let noiseP = 0.1
let noiseF = 0.01

let mover1
let mover2

function setup() {
    createCanvas(400, 400);
    for (let x = 0; x< floor(width/xcols);x++){
        posArr.push([])
        for (let y = 0; y < height/ycols; y++) {
            posArr[x].push(createVector(cos(2*PI*noise(noiseP*x, noiseP*y)), sin(2*PI*noise(noiseP*x, noiseP*y))))

        }
    }
    mover1 = new Mover("RGB(255, 0, 0)")
    mover2 = new Mover("RGB(0, 0, 255)")
}


function draw() {
    //draw a line at every position of the array, just straight up
    //ideally make an array of vectors
    for (let x = 0; x< floor(width/xcols);x++){
        for (let y = 0; y < height/ycols; y++) {
            posArr[x][y] = (createVector(cos(4*PI*noise(noiseP*x, noiseP*y, frameCount*noiseF)), sin(4*PI*noise(noiseP*x, noiseP*y, frameCount*noiseF))))

        }
    }
    background(255);
    stroke(0);
    for (let i = 0 ; i < posArr.length; i++) {
        for (let j = 0; j < posArr[i].length; j++){
            strokeWeight(3)
            point(i*xcols + xcols/2, j*ycols + ycols/2)
            strokeWeight(1)
            line(i*xcols+ xcols/2, j*ycols+ycols/2, xcols/2 +i*xcols + 0.5*xcols*posArr[i][j].x, ycols/2 + j*ycols + 0.5*ycols*posArr[i][j].y)
        }
    }
    mover1.update();
    mover1.checkEdges();
    mover1.show();
    mover2.update();
    mover2.checkEdges();
    mover2.show();
}

// creating something that moves on this field

class Mover {
    constructor(color) {
        this.position = createVector(random(width), random(height));
        this.velocity = createVector(2, 2);
        this.color = color
    }
    update() {
        // find the closest square (I could also go just from the continuous noise function)
        // and at that velocity to the object
        this.position.add(posArr[floor(this.position.x/xcols)][floor(this.position.y/ycols)]);
    }
    show() {
        stroke(0);
        fill(this.color)
        circle(this.position.x, this.position.y, 48)
    }
    checkEdges() {
        if (this.position.x > width) {
            this.position.x = xcols/2;
        } else if (this.position.x < 0) {
            this.position.x = width-xcols/2;
        }

        if (this.position.y > height){
            this.position.y = ycols/2;
        } else if (this.position.y < 0) {
            this.position.y = height-ycols/2;
        }
    }
}
