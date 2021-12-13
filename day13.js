const fs = require('fs');
let text = fs.readFileSync('day13.txt', 'utf8');
dots = text.split('\r\n').map(x => x.split(',').map(y => parseInt(y)));
let text2 = fs.readFileSync('day13_fold.txt', 'utf8');
folds = text2.split('\r\n').map(x => x.split(' ')[2]).map(y => y.split('=')).map(z => [z[0] == 'y' ? 1 : 0, parseInt(z[1])]);

console.log(dots);
console.log(folds);

function fold(dots, folds) {
    for(let fold of folds) {
        let [axis, value] = fold;
        if(axis == 0) {
            // x-axis
            for(let dot of dots) {
                if(dot[0] > value) {
                    let dist = dot[0] - value;
                    dot[0] = value - dist;
                }
            }
        } else {
            // y-axis
            for(let dot of dots) {
                if(dot[1] > value) {
                    let dist = dot[1] - value;
                    dot[1] = value - dist;
                }
            }
        }
    }
}

function count_dots(dots) {
    let grid = {};
    let count = 0;
    for(let dot of dots) {
        let key = dot[0] + ',' + dot[1];
        if(!grid[key]) {
            grid[key] = true;
            count++;
        }
    }
    return count;
}

// Part 1
fold(dots, [folds[0]]);
console.log('Part 1 Count', count_dots(dots));

// Part 2
fold(dots, folds);

let maxX = dots.reduce((a, b) => a[0] > b[0] ? a : b)[0];
let maxY = dots.reduce((a, b) => a[1] > b[1] ? a : b)[1];

let grid = new Array(maxY);
for(let y = 0; y <= maxY; y++) {
    grid[y] = new Array(maxX);
    grid[y].fill('.');
    for(let x = 0; x <= maxX; x++) {
        grid[y][x] = dots.find(dot => dot[1] === y && dot[0] === x) ? '#' : '.';
    }
}

let foldedPage = grid.map(x => x.join('')).join('\n');
console.log('Folded');
console.log(foldedPage);
fs.writeFileSync('day13_output.txt', foldedPage, 'utf8');