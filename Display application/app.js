//@author bbluebaugh  @version 0.0.1
//This will be the start of a javascript application that hopefully will be a cool
//visualization of something
//if I make a change then I should be able to commit it to github
//above all worked so now to actually begin what I am here for.
//I am going to start with a Depth-first search maze generator, possibly will add on to it later.

var cols, rows;
var w = 40; //width/height of a cell is 40
var grid = [];

function setup(){
  createCanvas(400, 400);
  cols = floor(width/w);  //using floor function to ensure integer values for easy working
  rows = floor(height/w);

for(var j = 0; j < rows; j++){
  for(var i = 0; i < cols; i++){
    var cell = new Cell(i, j);
    grid.push(cell);
  }
}

}

function draw(){
  background(51);
  for(var i = 0; i < grid.length; i++){
    grid[i].show();
  }

}

//I will be row number and j will be row number
function Cell(i, j){
  this.i = i;
  this.j = j;

  this.show = function(){
    var x = this.i * w;
    var y = this.j * w;
    stroke(255);
    noFill();
    rect(x, y, w, w);
    }

}
