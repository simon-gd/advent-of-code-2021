const fs = require('fs');
let text = fs.readFileSync('day6.txt', 'utf8');
let ages = text.split(',').map(x => parseInt(x));
let counts = {
    '0': ages.filter(x => x === 0).length,
    '1': ages.filter(x => x === 1).length,
    '2': ages.filter(x => x === 2).length,
    '3': ages.filter(x => x === 3).length,
    '4': ages.filter(x => x === 4).length,
    '5': ages.filter(x => x === 5).length,
    '6': ages.filter(x => x === 6).length,
    '7': ages.filter(x => x === 7).length,
    '8': ages.filter(x => x === 8).length,
};

function update(arr) {
    let newCounts = {
        '0': 0,
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        '7': 0,
        '8': 0,
    }
    for (let i = 0; i <= 8; i++) {
        if (i === 0) {
            newCounts[8] += counts[i];
            newCounts[6] += counts[i];
            newCounts[0] = 0;
        } else {
            newCounts[i - 1] += counts[i];
        }
    }
    return newCounts;
}

// part 1 version
for (let day = 0; day < 256; day++) {
    //ages = update(ages);
    counts = update(counts);
    console.log('ages len', counts);

    let total = 0;
    for (let i = 0; i <= 8; i++) {
        //console.log(day, 'ages',i, ages[i].length);
        total += counts[i];
    }
    console.log(day, total);
}