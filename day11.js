const fs = require('fs');
let text = fs.readFileSync('day11.txt', 'utf8');
let lines = text.split('\r\n');

let grid = lines.map(line => line.split('').map(c => Number(c)));
let totalFlashes = 0;

function getNeighbors(x, y) {
    let neighbors = [];
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            if (i === x && j === y) {
                continue;
            }
            if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length) {
                continue;
            }
            neighbors.push([j, i]);
        }
    }
    return neighbors;
}

let allEqualStep = 0;
let flashQueue = [];
for(let step = 0; step < 10000; step++) {
  let flashedThisStep = {};
  for(let y = 0; y < grid.length; y++) {
    for(let x = 0; x < grid[y].length; x++) {
      if(!flashedThisStep[`${y},${x}`]) {  
        grid[y][x]++;
      }
      if(grid[y][x] > 9) {
        flashQueue.push([y, x]);
        while(flashQueue.length > 0) {
          let [y1, x1] = flashQueue.pop();
          if(flashedThisStep[`${y1},${x1}`]) {
            continue;
          }
          
          totalFlashes++;
          flashedThisStep[`${y1},${x1}`] = true;
          let neighbors = getNeighbors(x1, y1);
          for(let i = 0; i < neighbors.length; i++) {
            if(!flashedThisStep[`${neighbors[i][0]},${neighbors[i][1]}`]) {
                grid[neighbors[i][0]][neighbors[i][1]]++;
            }
            if(grid[neighbors[i][0]][neighbors[i][1]] > 9) {
                flashQueue.push(neighbors[i]);
            }
          }
          grid[y1][x1] = 0;

        }
      }
      
    }
  }
  console.log(step, totalFlashes);
  console.log(grid.map(line => line.join('')).join('\n'));
  console.log("-------------------");

  let sum = 0;
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      sum += grid[i][j];
    }
  }
  if(sum == 0) {
    allEqualStep = step+1;
    break;
  }
}

console.log('totalFlashes',totalFlashes);
console.log('allEqualStep',allEqualStep);
