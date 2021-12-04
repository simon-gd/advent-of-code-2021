const fs = require('fs');
// Load in a text file
let text = fs.readFileSync('day3_input.txt', 'utf8');
let a = text.split('\n');
let bitCount = a[0].length-1;

let gammaRate = "";
let epsilonRate = "";
for(let b=0; b < bitCount; b++){
  let count0 = 0;
  let count1 = 0;
  for(let i=0; i < a.length; i++){
    let bit = a[i].charAt(b);
    if(bit === '0'){
        count0++;
    } else if (bit === '1'){
        count1++;
    } else {
        console.error(`Error bad bit: ${bit}`);
    }
  }
  if(count0 > count1){
    gammaRate += '0';
    epsilonRate += '1';
  } else if (count0 < count1){
    gammaRate += '1';
    epsilonRate += '0';
  } else {
    console.error("Error: bit " + b + " is a tie");
  } 
}
// convert to decimal
let gamma = parseInt(gammaRate, 2);
let epsilon = parseInt(epsilonRate, 2);
console.log(`gammaRate: ${gammaRate}, ${gamma}`);
console.log(`epsilonRate: ${epsilonRate}, ${epsilon}`);
let result = gamma * epsilon;
console.log(`Result: ${result}`);