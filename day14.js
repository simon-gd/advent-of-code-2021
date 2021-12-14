const fs = require('fs');
let text = fs.readFileSync('day14.txt', 'utf8');
let template = 'OKSBBKHFBPVNOBKHBPCO';
let lines = text.split('\r\n').map(x => x.split(' -> '));
//console.log(lines);
/*
let template = 'NNCB'

let insertions = `CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;
let lines = insertions.split('\n').map(x => x.split(' -> '));
*/
console.log(lines);


let stepsPart1 = 10;
let stepsPart2 = 40;

let result = template;
for(let step=0; step < stepsPart1; step++) {
    let new_templated = "";
    for(let i=0; i < result.length-1; i++) {
        let pattern = result.substr(i, 2);
        let op = lines.find(x => x[0] === pattern);
        if(op) {
            new_templated += op[0][0] + op[1];
            if(i > result.length-3) {
                new_templated += op[0][1];
            }
        } else {
            new_templated += pattern;
        }
    }
    result = new_templated;
    console.log(step+1, result.length);
}

function countLetters(template) {
    let letters = {};
    for(let i=0; i < template.length; i++) {
        let letter = template[i];
        if(!letters[letter]) {
            letters[letter] = 1;
        } else {
            letters[letter]++;
        }
    }
    return letters;
}

let letters = countLetters(result);
const minLetter = Object.keys(letters).reduce((a, b) => letters[a] < letters[b] ? a : b);
const maxLetter = Object.keys(letters).reduce((a, b) => letters[a] > letters[b] ? a : b);
console.log("Part 1", letters, 'difference', letters[maxLetter] - letters[minLetter]);

// Part 2
let pairOccurances = {};
// initialize
for(let i=0; i < template.length-1; i++) {
    let pattern = template.substr(i, 2);
    if(!pairOccurances[pattern]) {
        pairOccurances[pattern] = 1;
    } else {
        pairOccurances[pattern]++;
    }
}
console.log('P2: Pair Occurances', pairOccurances);
function countLetters2(pairMap) {
    let letters = {};
    for(let pair in pairMap) {
        let a = pair.split('');

        let c = pairMap[pair];
        //console.log('countLetters2', a, c);
        if(!letters[a[0]]) {
            letters[a[0]] = c;
        } else {
            letters[a[0]] += c;
        }
        if(!letters[a[1]]) {
            letters[a[1]] = c;
        } else {
            letters[a[1]] += c;
        }
    }
    return letters;
}
for(let step=0; step < stepsPart2; step++) {
    //let new_templated = "";
    let newOccurances = {};
    for(let pattern in pairOccurances) {
        let count = pairOccurances[pattern];
        //if(count <= 0) {
        //    continue;
        //}
        let op = lines.find(x => x[0] === pattern);
        if(op) {
            //pairOccurances[pattern] -= count; // remove occurances since we are splitting them
            let new_template = op[0][0] + op[1];
           
            if(newOccurances[new_template])    {
                newOccurances[new_template] += count;
            } else {
                newOccurances[new_template] = count;
            }

            let new_template2 =  op[1] + op[0][1];
            if(newOccurances[new_template2] )    {
                newOccurances[new_template2] += count;
            } else {
                newOccurances[new_template2] = count;
            }
           
        }
    }
    pairOccurances = newOccurances;
    //console.log(step+1, pairOccurances);
}
console.log(pairOccurances);
let letters2 = countLetters2(pairOccurances);
for(let letter in letters2) {
    letters2[letter] = Math.floor(letters2[letter] / 2);
    //console.log(letter, letters2[letter]);
}
let firstLetter = template[0];
let lastLetter = template[template.length-1];
letters2[firstLetter]++;
letters2[lastLetter]++;

const minLetter2 = Object.keys(letters2).reduce((a, b) => letters2[a] < letters2[b] ? a : b);
const maxLetter2 = Object.keys(letters2).reduce((a, b) => letters2[a] > letters2[b] ? a : b);
console.log('Part 2', 'min', minLetter2, 'max', maxLetter2);
console.log("Part 2", letters2, 'difference', letters2[maxLetter2] - letters2[minLetter2]);
// 4607749009682 is too low so just add 1?
