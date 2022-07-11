function makeArray(column,row){
  let firstArray = new Array(column);
  for(let i=0;i<firstArray.length;i++){
      firstArray[i] = new Array(row);
  }
  return firstArray;
}

let grid;
let row;
let column;
let resolution = 10;

function setup() {
  createCanvas(500,500);
  column = width / resolution;
  row = height / resolution;
  
  grid = makeArray(column,row);

  for(let i = 0; i< column; i++){
    for(let j = 0; j < row; j++){
        grid[i][j] = floor(random(2));
      }
    }
}

function draw() {

  
  background(0);
    for(let i = 0; i< column; i++){
        for(let j = 0; j < row; j++){
            
            let x = i * resolution;
            let y = j * resolution;
            

            if(grid[i][j] === 1){
                fill(255);
                //stroke(255);
                rect(x,y,resolution,resolution);
            }
         }
    }

    let newGrid = makeArray(column,row);
    

    for(let i=0; i< column; i++){
      for(let j=0; j< row; j++){
        let state = grid[i][j];
        
          let sum = 0;
          let neighbours = countNeighbours(grid,i,j);

          if(state === 0 && neighbours === 3){
            newGrid[i][j] = 1;
          }
          else if( state === 1 && (neighbours < 2 || neighbours > 3)){
            newGrid[i][j] = 0;
          }
          else{
            newGrid[i][j] = state;
          }
        }
    }
    grid = newGrid;

}

function countNeighbours(grid,x,y){
  let sum = 0;
  for(let i= -1; i<2; i++){
    for(let j= -1; j<2; j++){

      let cols = (x+i+column) % column;
      let rows = (y+j+row) % row;

      sum += grid[rows][cols];
    }
  }
  sum -= grid[x][y];
  return sum;
}




