var mouse
let xcols = 20;
let ycols = 20;
let posArr = []

var mover1
var mover2


function setup() {
    createCanvas(400, 400);
    for (let x = 0; x< floor(width/xcols);x++){
        posArr.push([])
        for (let y = 0; y < height/ycols; y++) {
            posArr[x].push(createVector(0, 0))

        }
    }
    mover1 = new Mover("RGB(255, 0, 0)", 0.2)
    mover2 = new Mover("RGB(0, 0, 255)", 1)
}

function draw() {
    
    for (let x = 0; x< floor(width/xcols);x++){
        for (let y = 0; y < height/ycols; y++) {
            posArr[x][y] =  createVector((-x*xcols + mouseX), (-y*ycols +mouseY))
                posArr[x][y].normalize()
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
    mover1.update()
    mover1.checkEdges()
    mover1.show()
    mover2.update()
    mover2.checkEdges()
    mover2.show()

}


class Mover {
    constructor(color, charge) {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.mult(random(2))
        this.acceleration = createVector(0, 0)
        this.color = color
        this.topSpeed = 5;
        this.charge = charge
    }
    update() {
        // find the closest square (I could also go just from the continuous noise function)
        // and at that velocity to the object
        mouse = createVector(mouseX, mouseY);
        let dir = p5.Vector.sub(mouse, this.position);
        let veclength = dir.mag()
        dir.normalize()
        if (veclength > 5){
            dir.mult(1/(veclength**3))
        } else {
            dir.mult(1/125)
        }


        this.acceleration = dir.mult(this.charge);


        this.velocity.add(this.acceleration)
        this.velocity.limit(this.topSpeed)
        this.position.add(this.velocity)
    }
    show() {
        stroke(0);
        fill(this.color)
        circle(this.position.x, this.position.y, 48)
    }
    checkEdges() {
        if (this.position.x > width) {
            this.position.x = 0
        } else if (this.position.x < 0) {
            this.position.x = width
        }

        if (this.position.y > height){
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = height
        }
    }
}