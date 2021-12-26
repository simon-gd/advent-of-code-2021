const fs = require('fs');
let text = fs.readFileSync('day25.txt', 'utf8');
let grid = text.split('\r\n').map(x => x.split(''));
//console.log(grid);
let height = grid.length;
let width = grid[0].length;
print(grid);
for(let step=0; step < 10000; step++){
    let newGrid = [];
    // move east facing cucumbers
    let stepCount = 0;
    for(let y=0; y < grid.length; y++){ 
        newGrid.push([...grid[y]]);
        for(let x=0; x < grid[y].length; x++){
            
            let nextPos = (x+1) % (width);
            if(grid[y][x] === '>' && grid[y][nextPos] === '.'){
                newGrid[y][nextPos] = '>';
                newGrid[y][x] = '.';
                stepCount++;
            } 
        }
        
    }
    grid = newGrid;
    newGrid = [];
    grid.forEach(row => {  newGrid.push([...row]); });
    for(let y=0; y < grid.length; y++){
       
        for(let x=0; x < grid[y].length; x++){
            let nextPos = (y+1) % (height);
            if(grid[y][x] === 'v' && grid[nextPos][x] === '.'){
                newGrid[nextPos][x] = 'v';
                newGrid[y][x] = '.';
                stepCount++;
            }
        }
        
    }
    grid = newGrid;
    console.log(step, stepCount, '-------------------');
    //print(grid);
    if(stepCount === 0){
        print(grid);
        console.log("Finished", step + 1);  
        break;
    }
    
}

function print(grid){
    let d = grid.map(x => x.join(''));
    d.map(x => console.log(x));
}

