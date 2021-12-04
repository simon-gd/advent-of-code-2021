const fs = require('fs');
// Load in a text file
let text = fs.readFileSync('day1_input.txt', 'utf8');
// Split the text into an array of strings
let a = text.split('\n').map(x => parseInt(x));
// Loop through the array
let prev = Infinity;
let total = 0;
console.log("Length: " + a.length);
for (let i = 0; i < a.length - 2; i++) {
    // Convert the string to a number
    let number1 = a[i];
    let number2 = a[i+1];
    let number3 = a[i+2];
    let sum = number1 + number2 + number3;
    if(sum > prev) {
        total++;
        console.log(`Increasd: ${sum} >  ${prev}`);
    } else {
        console.log(`no change: ${sum} <=  ${prev}`);
    }
    prev = sum;
}
console.log(total);