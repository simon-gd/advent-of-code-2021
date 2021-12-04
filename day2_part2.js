const fs = require('fs');
// Load in a text file
let text = fs.readFileSync('day2_input.txt', 'utf8');
// Split the text into an array of strings
let a = text.split('\n').map(x => x.split(' '));
// Loop through the array
let depth = 0;
let horizontal = 0;
let aim = 0;
console.log("Length: " + a.length);
for (let i = 0; i < a.length; i++) {
    const dir = a[i][0];
    const dist = parseInt(a[i][1]);
    if (dir === 'down') {
        //depth += dist;
        aim += dist;
    } else if (dir === 'up') {
        //depth -= dist;
        aim -= dist;
    } else if (dir === 'forward') {
        horizontal += dist;
        depth += (aim * dist);
    }
    
    console.log(`move ${dir}, ${dist}, we are now at depth ${depth}, horizontal ${horizontal}`);
}
console.log(`Total: ${depth}, ${horizontal} which is ${depth * horizontal}`);
//console.log(total);
