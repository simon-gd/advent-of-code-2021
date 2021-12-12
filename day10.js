const fs = require('fs');
let text = fs.readFileSync('day10.txt', 'utf8');
let lines = text.split('\r\n');
let illigalChars = [];
function isOpen(char) {
    if (char === '(' || char === '[' || char === '{' || char === '<') {
        return true;
    }
    return false;
}
function isClose(char) {
    if (char === ')' || char === ']' || char === '}' || char === '>') {
        return true;
    }
    return false;
}
function isMatching (open, close) {
    if (open === '(' && close === ')') {
        return true;
    }
    else if (open === '[' && close === ']') {
        return true;
    } else if(open === '{' && close === '}') {
        return true;
    } else if(open === '<' && close === '>') {
        return true;
    }
    return false;
}
for(let line of lines){
    let queue = [];
    for(let char of line){
        if(isOpen(char)){
            queue.push(char);
        } else {
            // is close char
            if(queue.length === 0){
                console.error('queue.length === 0', char);
                illigalChars.push(char);
                break;
            } else {
                let open = queue.pop();
                if(!isMatching(open, char)){
                    illigalChars.push(char);
                    break;
                }
            }
        }
    }
}
// calculate score
let score = 0;
for(let char of illigalChars){
    if(char === ')'){
        score += 3;
    } else if(char === ']'){
        score += 57;
    }else if(char === '}'){
        score += 1197;
    }else if(char === '>'){
        score += 25137;
    }
}
console.log('score', score);

// Part 2
function getMatchingChar(open){
    if(open === '('){
        return ')';
    } else if(open === '['){
        return ']';
    } else if(open === '{'){
        return '}';
    } else if(open === '<'){
        return '>';
    }
}

let scores = [];
for(let line of lines){
    let queue = [];
    let valid = true;
    for(let char of line){
        if(isOpen(char)){
            queue.push(char);
        } else {
            let open = queue.pop();
            if(!isMatching(open, char)){
                valid = false;
                break;
            }
        }
    }
    if(valid){
        let score = 0;
        let completionStrings = [];
        while(queue.length > 0){
            let open = queue.pop();
            let matchingChar = getMatchingChar(open);
            completionStrings.push(matchingChar);
        }
        for(let char of completionStrings){
            score *= 5;
            if(char === ')'){
                score += 1;
            } else if(char === ']'){
                score += 2;
            }else if(char === '}'){
                score += 3;
            }else if(char === '>'){
                score += 4;
            }
        }
        scores.push(score);
    }
}
scores = scores.sort((a, b) => { return a - b; });
console.log('score part 2', scores[(scores.length-1)  / 2]); 
