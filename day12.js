const fs = require('fs');
let text = fs.readFileSync('day12a.txt', 'utf8');
let lines = text.split('\r\n');
console.log(lines);

function isLower(c) { return c.toLowerCase() === c; }
function isEnd(c) { return c === 'end'; }
function isStart(c) { return c === 'start'; }

let edges = lines.map(x => x.split("-"));
// Add revere edges
edges = edges.concat(edges.map(x => [x[1], x[0]]));
console.log('edges', edges);

function walk(node, visited) {
    if (isEnd(node)) return 1;
    if (isLower(node) && visited.includes(node)) return 0;

    let nextEdges = edges.filter(x => x[0] === node);
    let nextNodes = nextEdges.map(x => x[1]);
    //console.log(node, 'nextNodes', nextNodes);
    let total = 0;
    for(let next of nextNodes) {
        total += walk(next, [...visited, node]);
    }
    return total; 
}
let count = walk('start', []);
console.log('count', count); 

// Part 2

function walk2(node, visited, markDirty) {
    if (isEnd(node)) return 1;
    if (isLower(node) && visited.includes(node)) {
        if (!markDirty && !isStart(node)) {
            markDirty = true;
        } else {
            return 0;
        }
    } 

    let nextEdges = edges.filter(x => x[0] === node);
    let nextNodes = nextEdges.map(x => x[1]);
    //console.log(node, 'nextNodes', nextNodes);
    let total = 0;
    for(let next of nextNodes) {
        total += walk2(next, [...visited, node], markDirty);
    }
    return total; 
}
let count2 = walk2('start', [], false);
console.log('Part 2 count', count2);
