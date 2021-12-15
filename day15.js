const fs = require('fs');
let text = fs.readFileSync('day15.txt', 'utf8');

// Part 1
const grid = text.split('\r\n').map(x => x.split('').map(y => Number(y)));
console.log(grid);

//dijkstra solve graph starting at s
function solve(graph, s, end) {
    var solutions = {};
    solutions[s] = [];
    solutions[s].dist = 0;
    
    while(true) {
      var parent = null;
      var nearest = null;
      var dist = Infinity;
      
      //for each existing solution
      for(var n in solutions) {
        if(!solutions[n])
          continue
        var ndist = solutions[n].dist;
        var adj = graph[n];
        //for each of its adjacent nodes...
        for(var a in adj) {
          //without a solution already...
          if(solutions[a])
            continue;
          //choose nearest node with lowest *total* cost
          var d = adj[a] + ndist;
          if(d < dist) {
            //reference parent
            parent = solutions[n];
            nearest = a;
            dist = d;
          }
        }
      }
      
      //no more solutions
      if(dist === Infinity) { // || solutions[end] !== Infinity) {
          break;
      }
      
      //extend parent's solution path
      solutions[nearest] = parent.concat(nearest);
      //extend parent's cost
      solutions[nearest].dist = dist;
      console.log('solution', nearest, dist);
    }
    
    return solutions;
  }

  var graph = {};
  console.log('size', grid.length, grid[0].length);
  for(let x=0; x < grid.length; x++) {
    for(let y=0; y < grid[0].length; y++) {
        let node = `${x},${y}`;
        let neighbors = [];
        if(x > 0) {
            neighbors.push(`${x-1},${y}`);
        }
        if(x < grid.length-1) {
            neighbors.push(`${x+1},${y}`);
        } 
        if(y > 0) {
            neighbors.push(`${x},${y-1}`);
        }
        if(y < grid[0].length-1) {
            neighbors.push(`${x},${y+1}`);
        }
        graph[node] = {};
        for(let n of neighbors) {
            graph[node][n] = grid[y][x];
        }
    }
}
//console.log(graph);
let solutions = solve(graph, '0,0');
let solution = solutions[`${grid.length-1},${grid[0].length-1}`];
let endLoc =  grid[grid.length-1][grid[0].length-1];
let startLoc = grid[0][0];
let diff = endLoc - startLoc;
//console.log('Part 1:', solution);
console.log('risk', solution.dist + diff);

// Part 2
let newGrid = Array(grid.length * 5).fill(0).map(x => Array(grid[0].length * 5).fill(0));
// fill in the new grid with existing values
for(let x=0; x < grid.length; x++) {
    for(let y=0; y < grid[0].length; y++) {
        newGrid[x][y] = grid[x][y];
    }
}

for(let dy=0; dy < 5; dy++) {
    for(let dx=0; dx < 5; dx++) {
        for(let y=0; y < grid.length; y++) {
            for(let x=0; x < grid[0].length; x++) {
                if(dx === 0 && dy > 0) {
                    // copy values from the top
                    newGrid[y+dy*grid.length][x+dx*grid[0].length] = (newGrid[y+(dy-1)*grid.length][x+dx*grid[0].length] + 1);
                    if(newGrid[y+dy*grid.length][x+dx*grid[0].length] > 9) {
                        newGrid[y+dy*grid.length][x+dx*grid[0].length] = 1;
                    }
                } else if (dx > 0) {
                    newGrid[y+dy*grid.length][x+dx*grid[0].length] = (newGrid[y+dy*grid.length][x+(dx-1)*grid[0].length] + 1);
                    if(newGrid[y+dy*grid.length][x+dx*grid[0].length] > 9) {
                        newGrid[y+dy*grid.length][x+dx*grid[0].length] = 1;
                    }
                }
            }
        }
    }
}
var graph2 = {};
console.log('size', newGrid.length, newGrid[0].length);
for(let x=0; x < newGrid.length; x++) {
for(let y=0; y < newGrid[0].length; y++) {
    let node = `${x},${y}`;
    let neighbors = [];
    if(x > 0) {
        neighbors.push(`${x-1},${y}`);
    }
    if(x < newGrid.length-1) {
        neighbors.push(`${x+1},${y}`);
    } 
    if(y > 0) {
        neighbors.push(`${x},${y-1}`);
    }
    if(y < newGrid[0].length-1) {
        neighbors.push(`${x},${y+1}`);
    }
    graph2[node] = {};
    for(let n of neighbors) {
        graph2[node][n] = newGrid[y][x];
    }
}
}

let endLoc2 =  newGrid[newGrid.length-1][newGrid[0].length-1];
let startLoc2 = newGrid[0][0];
console.log('loc', endLoc2, startLoc2);
let diff2 = endLoc2 - startLoc2;

let solutions2 = solve(graph2, '0,0');
let solution2 = solutions2[`${newGrid.length-1},${newGrid[0].length-1}`];
//console.log('Part 2:', solution2);
console.log('risk 2', solution2.dist + diff2);


