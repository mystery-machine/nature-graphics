let xcols = 20;
let ycols = 20;
let posArr = []
let noiseP = 0.1
let noiseF = 0.01

function setup() {
    createCanvas(400, 400);
    for (let x = 0; x< floor(width/xcols);x++){
        posArr.push([])
        for (let y = 0; y < height/ycols; y++) {
            posArr[x].push(createVector(cos(2*PI*noise(noiseP*x, noiseP*y)), sin(2*PI*noise(noiseP*x, noiseP*y))))

        }
    }
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
            point(i*xcols, j*ycols)
            strokeWeight(1)
            line(i*xcols, j*ycols, i*xcols + 0.5*xcols*posArr[i][j].x, j*ycols + 0.5*ycols*posArr[i][j].y)
        }
    }
}

//more ideas for this: follow mouse, (acceleration towards))
// model as vector field and have something flow on it from some starting point
// sweep out coloured circles that slowly disappear?
// panels at the side to change settings

