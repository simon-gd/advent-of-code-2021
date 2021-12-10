const fs = require('fs');
let text = fs.readFileSync('day2_input.txt', 'utf8');
let a = text.split('\n').map(x => x.split(' '));
let depth = 0;
let horizontal = 0;
let aim = 0;
console.log("Length: " + a.length);
for (let i = 0; i < a.length; i++) {
    const dir = a[i][0];
    const dist = parseInt(a[i][1]);
    if (dir === 'down') {
        aim += dist;
    } else if (dir === 'up') {
        aim -= dist;
    } else if (dir === 'forward') {
        horizontal += dist;
        depth += (aim * dist);
    }
    console.log(`move ${dir}, ${dist}, we are now at depth ${depth}, horizontal ${horizontal}`);
}
console.log(`Total: ${depth}, ${horizontal} which is ${depth * horizontal}`);