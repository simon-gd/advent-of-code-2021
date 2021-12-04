const fs = require('fs');
// Load in a text file
let text = fs.readFileSync('day3_input.txt', 'utf8');
let a = text.split('\r\n');
let bitCount = a[0].length;

let gammaRate = "";
let epsilonRate = "";
let oxogenRate = "";
let co2Rate = "";

let oxygenSearch = [...a];
let co2Search = [...a];
let foundOxygen = false;
let foundCo2 = false;
for (let b = 0; b < bitCount; b++) {

    let count0_o = 0;
    let count1_o = 0;
    if (!foundOxygen) {
        for (let i = 0; i < oxygenSearch.length; i++) {
            let bit = oxygenSearch[i].charAt(b);
            if (bit === '0') {
                count0_o++;
            } else if (bit === '1') {
                count1_o++;
            } else {
                console.error(`Error bad bit: ${bit}`);
            }
        }
        if (count0_o > count1_o) {
          oxygenSearch = oxygenSearch.filter(x => x.charAt(b) === '0');
        } else {
          oxygenSearch = oxygenSearch.filter(x => x.charAt(b) === '1');
        }
    }
    if (!foundCo2) {
        let count0_c = 0;
        let count1_c = 0;

        for (let i = 0; i < co2Search.length; i++) {
            let bit = co2Search[i].charAt(b);
            if (bit === '0') {
                count0_c++;
            } else if (bit === '1') {
                count1_c++;
            } else {
                console.error(`Error bad bit: ${bit}`);
            }
        }


        if (count0_c > count1_c) {
           co2Search = co2Search.filter(x => x.charAt(b) === '1');
           
        } else {
           co2Search = co2Search.filter(x => x.charAt(b) === '0');
        }
    }
    console.log(`Counts: ${oxygenSearch.length} ${co2Search.length}`);

    if (oxygenSearch.length === 1) {
        foundOxygen = true;
        console.log(`Found oxygen at ${b}`);
    }
    if (co2Search.length === 1) {
        foundCo2 = true;
        console.log(`Found co2 at ${b}`);
    }
}

console.log(oxygenSearch, co2Search);
// convert to decimal
let oxogen = parseInt(oxygenSearch[0], 2);
let co2 = parseInt(co2Search[0], 2);
//console.log(`oxogen: ${oxygenSearch[0]}, ${oxogen}`);
console.log(`co2: ${co2Search[0]}, ${co2}`);
let result = oxogen * co2;
console.log(`Result: ${result}`);