const fs = require('fs');
let text = fs.readFileSync('day22-i.txt', 'utf8');
let lines = text.split('\r\n').map(x => x.split(' '));
let ops = lines.map(x => {
    let op = {};
    op.op = x[0];
    op.x = (x[1].split(',')[0]).split('..').map((z,i) => i == 0 ? parseInt(z.split('=')[1]) : parseInt(z));
    op.y = (x[1].split(',')[1]).split('..').map((z,i) => i == 0 ? parseInt(z.split('=')[1]) : parseInt(z));
    op.z = (x[1].split(',')[2]).split('..').map((z,i) => i == 0 ? parseInt(z.split('=')[1]) : parseInt(z));
    return op;
});

console.log(ops.length);

let xSet = new Set();
let ySet = new Set();
let zSet = new Set();
for(let op of ops){
    xSet.add(op.x[0]);
    xSet.add(op.x[1]+1);
    ySet.add(op.y[0]);
    ySet.add(op.y[1]+1);
    zSet.add(op.z[0]);
    zSet.add(op.z[1]+1);
}
xSet = [...xSet].sort((a,b) => a-b);
ySet = [...ySet].sort((a,b) => a-b);
zSet = [...zSet].sort((a,b) => a-b);
// index all the points
let xPoints = {};
let yPoints = {};
let zPoints = {};
xSet.forEach((x,i) => { xPoints[x] = i; });
ySet.forEach((y,i) => { yPoints[y] = i; });
zSet.forEach((z,i) => { zPoints[z] = i; });

let xSize = xSet.length;
let ySize = ySet.length;
let zSize = zSet.length;
console.log('xSize',xSize);
console.log('ySize',ySize);
console.log('zSize',zSize);

let grid = new Uint8Array(xSize * ySize * zSize);
grid.fill(0);

function to1D( x, y, z ) {
    return x * ySize * zSize + y * zSize + z;
}

for(let op of ops){
    for(let x = xPoints[op.x[0]]; x < xPoints[op.x[1]+1]; x++){
        for(let y = yPoints[op.y[0]]; y < yPoints[op.y[1]+1]; y++){
            for(let z = zPoints[op.z[0]]; z < zPoints[op.z[1]+1]; z++){
                grid[to1D(x,y,z)] = op.op === 'on';
            }
        }
    }
}
let total  = 0;
for(let x=0; x < xSize; x++){
    for(let y=0; y < ySize; y++){
        for(let z=0; z < zSize; z++){
            if(grid[to1D(x,y,z)] === 1){
                total += (xSet[x + 1] - xSet[x]) * (ySet[y + 1] - ySet[y]) * (zSet[z + 1] - zSet[z]);
            }
        }
    }
}
console.log('total',total);
