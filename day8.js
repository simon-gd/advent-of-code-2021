const fs = require('fs');
// Load in a text file
let text = fs.readFileSync('day8.txt', 'utf8');
// Split the text into an array of strings
let lines = text.split('\r\n');
//console.log(lines);
let io = lines.map(x => x.split(' | '));
let inputs =  io.map(x => x[0].split(' '));
let outputs = io.map(x => x[1].split(' '));

// Part 1
let ones = outputs.map(x => x.reduce((a, b) => a + (b.length === 2 ? 1 : 0), 0)).reduce((a, b) => a + b);
let fours = outputs.map(x => x.reduce((a, b) => a + (b.length === 4 ? 1 : 0), 0)).reduce((a, b) => a + b);
let sevens = outputs.map(x => x.reduce((a, b) => a + (b.length === 3 ? 1 : 0), 0)).reduce((a, b) => a + b);
let eights = outputs.map(x => x.reduce((a, b) => a + (b.length === 7 ? 1 : 0), 0)).reduce((a, b) => a + b);
console.log(ones + fours + sevens + eights, ones, fours, sevens, eights);

// Part 2
function countLetters(str) {
    let letters = {};
    for (let i = 0; i < str.length; i++) {
        if (letters[str[i]]) {
            letters[str[i]] += 1;
        } else {
            letters[str[i]] = 1;
        }
    }
    return letters;
}

function mapStringToNumber(num, map){
    let str = '';
    for (let i = 0; i < num.length; i++) {
        str += map[num[i]];
    }
    if(str.length === 2){
        return 1;
    } else if(str.length === 4){
        return 4;
    } else if(str.length === 3){
        return 7;
    } else if(str.length === 7){
        return 8;
    } else if(str.length === 5){
        // 2 3 or 5
        if(str.includes('a') && str.includes('c') && str.includes('d') && str.includes('e') && str.includes('g')){
            return 2;
        }
        else if(str.includes('a') && str.includes('c') && str.includes('d') && str.includes('f') && str.includes('g')){
            return 3;
        }
        else if(str.includes('a') && str.includes('b') && str.includes('d') && str.includes('f') && str.includes('g')){
            return 5;
        }
    } else if (str.length === 6){
        // 9 6 or 0
        if(str.includes('a')  && str.includes('b') &&  str.includes('c') && str.includes('d') && str.includes('f') && str.includes('g')){
            return 9;
        }
        else if(str.includes('a')  && str.includes('b') &&  str.includes('d') && str.includes('e') && str.includes('f') && str.includes('g')){
            return 6;
        }
        else if(str.includes('a') && str.includes('b') && str.includes('c') && str.includes('e') && str.includes('f') && str.includes('g')){
            return 0;
        }
    }
    return str;
}


let nums = []
for(let i = 0; i < inputs.length; i++) {
    let one = inputs[i].find(x => x.length === 2);
    let four = inputs[i].find(x => x.length === 4);
    let seven = inputs[i].find(x => x.length === 3);
    let eight = inputs[i].find(x => x.length === 7);
    let d235   = inputs[i].filter(x => x.length === 5);
    let d960   = inputs[i].filter(x => x.length === 6);
    let d235counts = countLetters(d235.join(''));
    let d960counts = countLetters(d960.join(''));
    // first lets find 'f' it happens 3 times in each of d960 and in one
    let f = d960counts[one[0]] === 3 ? one[0] : d960counts[one[1]] === 3 ? one[1] : null;
    let c = f == one[0] ? one[1] : one[0];
    let a = seven.replace(c, '').replace(f, '');
    let bd = four.replace(c, '').replace(f, '');
    let b = (d235counts[bd[0]] === 1) ? bd[0] : (d235counts[bd[1]] === 1) ? bd[1] : null;
    let d = b == bd[0] ? bd[1] : bd[0];
    let eg = eight.replace(a, '').replace(c, '').replace(f, '').replace(b, '').replace(d, '');
    let g = d235counts[eg[0]] === 3 ? eg[0] : d235counts[eg[1]] === 3 ? eg[1] : null;
    let e = g == eg[0] ? eg[1] : eg[0];
    let map = {};
    map[a] = 'a';
    map[b] = 'b';
    map[c] = 'c';
    map[d] = 'd';
    map[e] = 'e';
    map[f] = 'f';
    map[g] = 'g';
    let numsO = outputs[i].map(x => mapStringToNumber(x, map));
    nums.push(Number(numsO.join('')));
    console.log('map:', map, outputs[i], numsO);
}
console.log(nums);
console.log("total", nums.reduce((a, b) => a + b));