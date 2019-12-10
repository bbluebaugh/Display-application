//@author bbluebaugh  @version 0.0.1
//This will be the start of a javascript application that hopefully will be a cool
//visualization of something
//if I make a change then I should be able to commit it to github
//above all worked so now to actually begin what I am here for.
//I am going to start with a Depth-first search maze generator, possibly will add on to it later.

var cols, rows;
var w = 40; //width/height of a cell is 40
var grid = [];

var current;//current cell being visited

var stack = []; //use an array as a stack in JS push and pop are both useable with a stack

function setup(){
  createCanvas(1800, 800);
  cols = floor(width/w);  //using floor function to ensure integer values for easy working
  rows = floor(height/w);
  frameRate(10);



for(var j = 0; j < rows; j++){
  for(var i = 0; i < cols; i++){
    var cell = new Cell(i, j);
    grid.push(cell);
  }
}

current = grid[0];//start at the top left cell

}

function draw(){
  background(51);
  for(var i = 0; i < grid.length; i++){
    grid[i].show();
  }

  current.visited = true;
  current.highlight();

  //steps to recursive backtracking algo
  //step 1
  var next = current.checkNeighbors();
  if(next){
    next.visited = true;

    //step 2
    stack.push(current);//push current cell to stack

    //step 3
    removeWalls(current, next);

    //step 4
    current = next;
  }else if(stack.length > 0){
    current = stack.pop();
  }else if(!next){
    sleep(2000);
    location.reload();
  }

}

function index(i, j){
  if(i < 0 || j < 0 || i > cols - 1 || j > rows - 1 ){
    return -1;
  }
  return i + j * cols;
}

//I will be row number and j will be row number
function Cell(i, j){
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];
  this.visited = false;

  this.checkNeighbors = function() {
    var neighbors = [];

    //var index = i + (j - 1) * cols;
    var top = grid[index(i, j - 1)];
    var right = grid[index(i + 1, j)];
    var bottom = grid[index(i, j + 1)];
    var left = grid[index(i - 1, j)];

    //if each of these position exist and has not been visited then push
    if(top && !top.visited){
      neighbors.push(top);
    }
    if(right && !right.visited){
      neighbors.push(right);
    }
    if(bottom && !bottom.visited){
      neighbors.push(bottom);
    }
    if(left && !left.visited){
      neighbors.push(left);
    }

    if(neighbors.length > 0){
      var r = floor(random(0, neighbors.length));
      return neighbors[r];
    }else{
      return undefined;
    }

  }

  this.highlight = function(){
    var x = this.i * w;
    var y = this.j * w;
    noStroke();
    fill(0, 255, 0, 200);
    rect(x, y, w, w);
  }

  this.show = function(){
    var x = this.i * w;
    var y = this.j * w;
    stroke(255);

    if(this.walls[0]){
      line(x, y, x + w, y);
    }
    if(this.walls[1]){
      line(x + w, y, x + w, y + w);
    }
    if(this.walls[2]){
      line(x + w, y + w, x, y + w);
    }
    if(this.walls[3]){
      line(x, y + w, x, y);
    }

    if(this.visited){
      noStroke();
      fill(255, 0, 255, 100);
      rect(x, y, w, w);
    }
    // noFill();
    // rect(x, y, w, w);
  }
}
//remove the walls by subtracting which two sides are being compared
function removeWalls(a, b){

  var x = a.i - b.i;
  if(x == 1){
    a.walls[3] = false;
    b.walls[1] = false;
  }else if(x == -1){
    a.walls[1] = false;
    b.walls[3] = false;
  }

  var y = a.j - b.j;
  if(y == 1){
    a.walls[0] = false;
    b.walls[2] = false;
  }else if(y == -1){
    a.walls[2] = false;
    b.walls[0] = false;
  }

}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);

  //sleep(5000);
  //location.reload();
}

function reloadPage(){
  location.reload();
}
