let treeInstances = []

function setup(){
    createCanvas(400, 400)
    background(255)
    colorMode(HSB)
    tree1 = new Tree(200, 200)
    tree1.show()
}

function mouseClicked() {
    treeInstances.push(new Tree(mouseX, mouseY))
    print(treeInstances)
    treeInstances[treeInstances.length-1].show()
}

function draw(){
    
}


class Tree {
    constructor(posx, posy) {
        this.posx = posx;
        this.posy = posy;
        this.scale = posy/height;
        this.height=random(40,80)*posy/height;
        this.color = color(126+random(50),  75 - 75*(height - posy)/height, 38 + 31*(height - posy)/height)
        this.branchDepth = random(4, 8)
        this.branches = [0, [[100, posx, posy-this.height]]]
    }

    show() {
       // just draw lines for now, coming out at random angles, for the tree
       
       stroke(this.color)
       strokeWeight(this.scale*(this.branches[1][0][0]**0.5))
       line(this.posx, this.posy, this.branches[1][0][1], this.branches[1][0][2])
       print(this.branches)
       for (let i =0; i < this.branchDepth; i++) {
            let newBranch = growBranches(this.branches, this.height)
            for (let j = 0; j < newBranch[1].length; j++){
                let parentBranch = floor(j/2);
                strokeWeight(this.scale*(newBranch[1][j][0]**0.5))
                line(this.branches[1][parentBranch][1],this.branches[1][parentBranch][2], newBranch[1][j][1], newBranch[1][j][2])
            }
            this.branches = newBranch
       }
    }
   
}

function growBranches(tree, treeHeight){
    // this function takes a binary tree array and grows it some more
    //array has the form [depth = 1, [[30, x, y], [70, x, y]]
    // depth says how deep it is, the weight tells you how thick that branch is (and the next one must be divided further.)
    let treeDepth = tree[0] +1
    let branchLength = treeHeight /(treeDepth)
    //now, take each current leaf, and divide it further
    //can at some point make this random
    let newTree = [treeDepth, []]
    print(tree)
    for (var i in tree[1]) {
        let split = floor(tree[1][i][0]*random(0, 1));
        let newx = floor(tree[1][i][1] - branchLength*Math.sin(random(0, PI/2)))
        let newy = floor(tree[1][i][2] - branchLength*Math.cos(random(0, PI/2)))
        newTree[1].push([split, newx, newy])
        newx = floor(tree[1][i][1] +branchLength*Math.sin(random(0, PI/2)))
        newy = floor(tree[1][i][2] - branchLength*Math.cos(random(0, PI/2)))
        newTree[1].push([tree[1][i][0] - split, newx, newy])
    }
    return newTree
}

