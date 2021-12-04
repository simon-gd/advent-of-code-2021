const fs = require('fs');
// Load in a text file
let text = fs.readFileSync('day1_input.txt', 'utf8');
// Split the text into an array of strings
let a = text.split('\n').map(x => parseInt(x));;
// Loop through the array
let prev = Infinity;
let total = 0;
console.log("Length: " + a.length);
for (let i = 0; i < a.length; i++) {
    // Convert the string to a number
    let number = a[i];
    if(number > prev) {
        total++;
    }
    prev = number;
}
console.log(total);
