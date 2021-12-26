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

// Part 1
{
    let counts = {};
    //bbox = {minx : -Infinity, maxx : Infinity, miny : -Infinity, maxy : Infinity, minz : -Infinity, maxz : Infinity};
    for(let op of ops){
        if (op.x[0] < -50 || op.x[1] > 50 || op.y[0] < -50 || op.y[1] > 50 || op.z[0] < -50 || op.z[1] > 50){
            continue;
        }
        for(let x = op.x[0]; x <= op.x[1]; x++){
            for(let y = op.y[0]; y <= op.y[1]; y++){
                for(let z = op.z[0]; z <= op.z[1]; z++){
                    
                    let key = `${x},${y},${z}`;
                    if(op.op === 'on'){
                        counts[key] = 1;
                    }else if(op.op === 'off'){
                        delete counts[key];
                    }
                }
            }
        }
    }
    let total = Object.keys(counts).length;
    console.log('Part 1',total);
}

