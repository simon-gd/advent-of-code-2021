const fs = require('fs');
let text = fs.readFileSync('day9.txt', 'utf8');
let lines = text.split('\r\n');
let width = lines[0].length;
let height = lines.length;
let grid = lines.map(line => line.split('').map(c => Number(c)));
console.log(width, height);
// Part 1
function getNeighbors(x, y) {
    let neighbors = [];
    let dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for(let d of dirs) {
        let nx = x + d[0];
        let ny = y + d[1];
        if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
        neighbors.push(grid[ny][nx]);
    }
    return neighbors;

}
let localMins = [];
for(let x=0; x < width; x++) {
  for(let y=0; y < height; y++) {
    let neighbors = getNeighbors(x, y);
    let minNeighbor = Math.min(...neighbors);
    if(grid[y][x] < minNeighbor) {
        localMins.push(grid[y][x]);
    }
  }
}
let totalRisk  = localMins.map(n => n+1).reduce((a,b) => a+b);
console.log('totalRisk', totalRisk);

// Part 2

function getNeighborPos(x, y) {
    let neighbors = [];
    let dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for(let d of dirs) {
        let nx = x + d[0];
        let ny = y + d[1];
        if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
        if(grid[ny][nx] < 9) {
            neighbors.push([nx, ny]);
        }
    }
    return neighbors;
}

function floodFill(x, y) {
    //console.log('visited' , visited);
    let queue = [[x, y]];
    let visited = {};
    while(queue.length > 0) {
        
        let [x1, y1] = queue.shift();
        //console.log('queue', queue.length);
        
        if(grid[y1][x1] < 9) {
            if (!visited[`${x1},${y1}`]) {
                visited[`${x1},${y1}`] = true;
            }
            
            let neighbors = getNeighborPos(x1, y1);
            for(let n of neighbors) {
                if(!visited[`${n[0]},${n[1]}`]) {
                    queue.push(n);
                    visited[`${n[0]},${n[1]}`] = true;
                }
            }
        }
    }
    return visited;
}

let minPts = [];
for(let x=0; x < width; x++) {
  for(let y=0; y < height; y++) {
    let neighbors = getNeighbors(x, y);
    let minNeighbor = Math.min(...neighbors);
    if(grid[y][x] < minNeighbor) {
        minPts.push([x, y])
    }
  }
}
let basinCount = []
for(let pt of minPts) {
    
    //console.log(pt[0], pt[1]);
    let visited = floodFill(pt[0], pt[1]);
    basinCount.push(Object.keys(visited).length);
    //console.log('visited', pt[0], pt[1], Object.keys(visited).length);
    
}
basinCount.sort((a,b) => b-a);
console.log('basinCount', basinCount[0] *basinCount[1] * basinCount[2], basinCount);