const fs = require('fs');
// Load in a text file
let text = fs.readFileSync('day4_input.txt', 'utf8');
let a = text.split('\r\n');
let numbers = a[0].split(',').map(Number);
let boards = [];
for(let i = 1; i < a.length; i+=6) {
    let board = {numbers: [], picked: []};
    board.numbers.push(a[i].split(' ').filter(x => x !== '').map(Number));
    board.numbers.push(a[i+1].split(' ').filter(x => x !== '').map(Number));
    board.numbers.push(a[i+2].split(' ').filter(x => x !== '').map(Number));
    board.numbers.push(a[i+3].split(' ').filter(x => x !== '').map(Number));
    board.numbers.push(a[i+4].split(' ').filter(x => x !== '').map(Number));
    console.log(board);
    boards.push(board);
}

function boardsWin(board){
    let win = false;
    let picked = board.picked;
    for(let i = 0; i < board.numbers.length; i++){
        let row = board.numbers[i];
        let foundRow = row.filter(x => picked.includes(x));
        if(foundRow.length === 5){
            win = true;
        }
    }
    const transpose = m => m[0].map((x,i) => m.map(x => x[i]));
    let transposed = transpose(board.numbers);
    for(let i = 0; i < transposed.length; i++){
        let row = transposed[i];
        let foundRow = row.filter(x => picked.includes(x));
        if(foundRow.length === 5){
            win = true;
        }
    }
    return win;
}

function addupNumbers(board){
    let sum = 0;
    for(let i = 0; i < board.numbers.length; i++){
        let row = board.numbers[i].filter(x => !board.picked.includes(x));
        console.log('uncolled numbers: ', row);
        if(row.length > 0){
            sum += row.reduce((a,b) => a+b);
        }

    }
    return sum;
}

function boardContains(board, number){
    for(let i = 0; i < board.numbers.length; i++){
        let row = board.numbers[i];
        if(row.includes(number)){
            return true;
        }
    }
    return false;
}

let boardWon = null;
let finalScore = 0;
let winningBoards = [];
let winningIndexes = [];
for (let currentNumber of numbers) {

    console.log('drawing', currentNumber);
    for (let i=0; i < boards.length; i++) {
        if(!winningIndexes.includes(i)){
            let board = boards[i];
            if(boardContains(board, currentNumber)){
                board.picked.push(currentNumber);
                if(boardsWin(board)){
                    boardWon = board;
                    winningBoards.push([board, currentNumber]);
                    winningIndexes.push(i);
                }
            }
        }
       
    }
}
console.log('winning boards: ', winningBoards);
let firstWinner = winningBoards[0];
let lastWinner = winningBoards[winningBoards.length - 1];

if (firstWinner !== null) {
        
    let score = addupNumbers(firstWinner[0]);
    //let score = 0;
    console.log(`First BoardWon!!! ${firstWinner[1]} with score ${score}`, firstWinner[0]);
    finalScore = firstWinner[1] * score;
}
console.log(`First Winner score: ${finalScore}`);

if (lastWinner !== null) {
        
    let score = addupNumbers(lastWinner[0]);
    //let score = 0;
    console.log(`First BoardWon!!! ${lastWinner[1]} with score ${score}`, lastWinner[0]);
    finalScore = lastWinner[1] * score;
}
console.log(`Last Winner score: ${finalScore}`);