const fs = require('fs');
let text = fs.readFileSync('day15.txt', 'utf8');

// Part 1
const grid = text.split('\r\n').map(x => x.split('').map(y => Number(y)));

{
    let visited = {};
    let queue = [[-1, -1, 0, 0]];
    let riskCount = Array(grid.length).fill(Infinity).map(x => Array(grid[0].length).fill(Infinity));
    while(queue.length > 0) {
        let [px, py, x, y] = queue.shift();
        let newRisk = (px > -1 && py > -1) ? riskCount[py][px] + grid[y][x] : 0;
        if(newRisk < riskCount[y][x]){
            riskCount[y][x] = newRisk;
            if (x < grid.length-1) queue.push([x, y, x+1, y]);
            if (y < grid.length-1) queue.push([x, y, x, y+1]);
        }
    }

    console.log('Part 1', riskCount[riskCount.length-1][riskCount[0].length-1]);
}

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

let visited = {};
let queue = []; 
queue.push([0, 0, 0]);
visited = {}
while(queue.length > 0) {
    let [x, y, r] = queue.shift(); 
    if(x === newGrid.length-1 && y === newGrid[0].length-1) {
        console.log("Part 2", r);
        break;
    }
    if(!visited[`${x},${y}`]) {
        let neighbors = [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]];
        for(let n of neighbors) {
            if(n[0] < 0 || n[0] >= newGrid.length || n[1] < 0 || n[1] >= newGrid[0].length || visited[`${n[0]},${n[1]}`]) {
                continue;
            }
            queue.push([n[0], n[1], r + newGrid[n[0]][n[1]]]);
        }
        // funny, only changes value by 1, but still I guess we need to make sure we prioritize the shortest paths
        queue.sort((a, b) => a[2] - b[2]);
    
    }
    visited[`${x},${y}`] = true;
}


