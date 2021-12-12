const fs = require('fs');
let text = fs.readFileSync('day5_input.txt', 'utf8');
let line = text.split('\r\n');
let grid = {};
let doPart2 = true;
for (let i = 0; i < line.length; i++) {
    let pts = line[i].split(' -> ');
    let pt1 = pts[0].split(',').map(x => parseInt(x));
    let pt2 = pts[1].split(',').map(x => parseInt(x));
    // if x are equal
    if (pt1[0] === pt2[0]) {
        let x = pt1[0];
        for (let y = Math.min(pt1[1], pt2[1]); y <= Math.max(pt1[1], pt2[1]); y++) {
            if (!grid[x + ',' + y]) {
                grid[x + ',' + y] = 1;
            } else {
                grid[x + ',' + y]++;
            }
        }
    } else if (pt1[0] === pt2[0] && pt1[1] === pt2[1]) {
        let x = pt1[0];
        let y = pt1[1];
        if (!grid[x + ',' + y]) {
            grid[x + ',' + y] = 1;
        } else {
            grid[x + ',' + y]++;
        }
    } else if (pt1[1] === pt2[1]) {
        let y = pt1[1];
        for (let x = Math.min(pt1[0], pt2[0]); x <= Math.max(pt1[0], pt2[0]); x++) {
            if (!grid[x + ',' + y]) {
                grid[x + ',' + y] = 1;
            } else {
                grid[x + ',' + y]++;
            }
        }
    } else {
        if (!doPart2) {
            continue;
        }
        // Part 2
        // points are on a diagonal
        let x1 = pt1[0];
        let y1 = pt1[1];
        let x2 = pt2[0];
        let y2 = pt2[1];
        let xDiff = x1 < x2 ? 1 : -1;
        let yDiff = y1 < y2 ? 1 : -1;
        while (x1 !== x2 && y1 !== y2) {
            if (!grid[x1 + ',' + y1]) {
                grid[x1 + ',' + y1] = 1;
            } else {
                grid[x1 + ',' + y1]++;
            }
            x1 += xDiff;
            y1 += yDiff;
        }
        // make sure we got the end points
        if (!grid[x2 + ',' + y2]) {
            grid[x2 + ',' + y2] = 1;
        } else {
            grid[x2 + ',' + y2]++;
        }
    }
}
let count = 0;
for (let key in grid) {
    if (grid[key] > 1) {
        count++;
    }
}
console.log('overlaps: ', count);