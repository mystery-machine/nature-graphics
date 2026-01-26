let treeInstances = []

function setup(){
    createCanvas(400, 400)
    background(255)
    colorMode(HSB)
    tree1 = new Tree(200, 200)
    tree1.grow()
    print(tree1.branches)
}

function mouseClicked() {
    treeInstances.push(new Tree(mouseX, mouseY))
    treeInstances[treeInstances.length-1].grow()
}

function draw(){
    tree1.show()
    for (i in treeInstances){
        treeInstances[i].show()
    }
}


class Tree {
    constructor(posx, posy) {
        this.posx = posx;
        this.posy = posy;
        this.scale = posy/height;
        this.height=random(40,80)*posy/height;
        this.color = color(126+random(50),  75 - 75*(height - posy)/height, 38 + 31*(height - posy)/height)
        this.branchDepth = random(4, 8)
        this.branches = [ [[100, posx, posy-this.height]]]
        this.frames  = 0
        this.growSpeed = 20
    }

    grow() {
       // generate the branch array capturing the whole structure of the tree
       
       
       for (let i =0; i < this.branchDepth; i++) {
            let newBranch = growBranches(this.branches[i], this.height, i+1)
            this.branches.push(newBranch)

       }
    }
    show() {
        // count the frames and generate the lines of the tree frame by frame
        this.frames += 1
        stroke(this.color)
        if (this.frames < this.branchDepth*this.growSpeed) {
            // identify which level of growing we're at
            let curDepth = floor(this.frames /this.growSpeed )
            print(curDepth)
            if (curDepth == 0) {
                strokeWeight(this.scale*(this.branches[0][0][0]**0.5))
                line(this.posx, this.posy, this.branches[0][0][1],  this.posy + (this.frames/this.growSpeed)*(this.branches[0][0][2]- this.posy))
            } else {
                strokeWeight(this.scale*(this.branches[0][0][0]**0.5))
                line(this.posx, this.posy, this.branches[0][0][1],  this.branches[0][0][2])
                for (let i = 1; i < curDepth; i++) {
                // grow every completed branch 
                    for (let j = 0; j < this.branches[i].length; j++){
                    let parentBranch = floor(j/2);
                    strokeWeight(this.scale*(this.branches[i][j][0]**0.5))
                    line(this.branches[i-1][parentBranch][1],this.branches[i-1][parentBranch][2],this.branches[i][j][1], this.branches[i][j][2])
                    }
                }
                // grow the last, partially completed ones
                for (let j = 0; j < this.branches[curDepth].length; j++){
                    let parentBranch = floor(j/2);
                    strokeWeight(this.scale*(this.branches[curDepth][j][0]**0.5));
                    line(this.branches[curDepth-1][parentBranch][1],this.branches[curDepth-1][parentBranch][2],this.branches[curDepth-1][parentBranch][1]  - ((this.frames- curDepth*this.growSpeed)/this.growSpeed)*(this.branches[curDepth-1][parentBranch][1] - this.branches[curDepth][j][1]), this.branches[curDepth-1][parentBranch][2]  - ((this.frames- curDepth*this.growSpeed)/this.growSpeed)*(this.branches[curDepth-1][parentBranch][2] - this.branches[curDepth][j][2]))
                }
            }
        } //else {
            // growing the tree normally
            //strokeWeight(this.scale*(this.branches[0][0][0]**0.5))
              //  line(this.posx, this.posy, this.branches[0][0][1],  this.branches[0][0][2])
            //for (let i =1; i < this.branchDepth; i++) {
            //for (let j = 0; j < this.branches[i].length; j++){
              //  let parentBranch = floor(j/2);
              //  strokeWeight(this.scale*(this.branches[i][j][0]**0.5))
              //  line(this.branches[i-1][parentBranch][1],this.branches[i-1][parentBranch][2], this.branches[i][j][1], this.branches[i][j][2])
           // }
       //}
        //}
    }
   
}

function growBranches(tree, treeHeight, treeDepth){
    // this function takes a binary tree array and grows it some more
    //array has the form [depth = 1, [[30, x, y], [70, x, y]]
    // depth says how deep it is, the weight tells you how thick that branch is (and the next one must be divided further.)
    let branchLength = treeHeight /(treeDepth)
    //now, take each current leaf, and divide it further
    //can at some point make this random
    let newTree = []
    print(tree)
    for (var i in tree) {
        let split = floor(tree[i][0]*random(0, 1));
        let newx = floor(tree[i][1] - branchLength*Math.sin(random(0, PI/2)))
        let newy = floor(tree[i][2] - branchLength*Math.cos(random(0, PI/2)))
        newTree.push([split, newx, newy])
        newx = floor(tree[i][1] +branchLength*Math.sin(random(0, PI/2)))
        newy = floor(tree[i][2] - branchLength*Math.cos(random(0, PI/2)))
        newTree.push([tree[i][0] - split, newx, newy])
    }
    return newTree
}

