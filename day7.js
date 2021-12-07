const fs = require('fs');
// Load in a text file
let text = fs.readFileSync('day7.txt', 'utf8');
let positions = text.split(',').map(x => parseInt(x));
let minP = Math.min(...positions);
let maxP = Math.max(...positions);
let minFuel = Infinity;
let minPosition = 0;
// part 1
for(let i = minP; i <= maxP; i++) {
    let fuel = 0;
    for(let j = 0; j < positions.length; j++) {
        fuel += Math.abs(positions[j] - i);
    }
    
    if(fuel < minFuel) {
        minFuel = fuel;
        minPosition = i;
        //console.log(i, fuel);
    }
}
console.log(minPosition, minFuel);
minFuel = Infinity;
minPosition = 0;
// part 2
for(let i = minP; i <= maxP; i++) {
    let fuel = 0;
    for(let j = 0; j < positions.length; j++) {
        let count = Math.abs(positions[j] - i);
        for(let k = 1; k <= count; k++) {
            fuel += k;
        }
    }
    
    if(fuel < minFuel) {
        minFuel = fuel;
        minPosition = i;
        //console.log(i, fuel);
    }
}
console.log(minPosition, minFuel);