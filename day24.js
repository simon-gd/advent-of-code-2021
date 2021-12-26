const fs = require('fs');
let text = fs.readFileSync('day24.txt', 'utf8');
let input = text.split('\r\n').map(x =>x.split(' ').map(y => !isNaN(parseInt(y)) ? parseInt(y) : y));
console.log(input);
/*

1
if w != z.peek() + 14:
    z.push(w + 14)
2
if w != z.peek() + 14:
    z.push(w + 2)
3
if w != z.peek() + 14:
  z.push(w + 1)
4
if w != z.peek() + 12:
  z.push(w + 13)
5
if w != z.peek() + 15:
  z.push(w + 5)

6
if w != z.pop() -12:
  z.push(w + 5)

7
if w != z.pop() -12:
  z.push(w + 5)

8
if w != z.peek() + 12:
  z.push(w + 9)
9
if w != z.pop() - 7:
  z.push(w + 3)
10
if w != z.peek() + 13:
  z.push(w + 13)
11
if w != z.pop() - 8:
  z.push(w + 2)
12
if w != z.pop() - 5:
  z.push(w + 1)
13
if w != z.pop() - 10:
  z.push(w + 11)
14
if w != z.pop() - 7:
  z.push(w + 8)
--------------------------

1
z.push(A + 14)

//2 z.push(B + 2)

// 3 z.push(C + 1)

//4 z.push(D + 13)

//5 z.push(E + 5)

//6 if F != z.pop() -12:
//    z.push(F + 5)

//7 if G != z.pop() -12:
//  z.push(G + 5)

//8 z.push(H + 9)

//9 if I != z.pop() - 7:
//  z.push(I + 3)

//10 z.push(J + 13)

//11  if K != z.pop() - 8:
//        z.push(K + 2)

//12 if L != z.pop() - 5:
//  z.push(L + 1)

13 if M != z.pop() - 10:
    z.push(M + 11)

14 if N != z.pop() - 7:
  z.push(N + 8)
  */
//for(let i=0; i<14; i++){
//    let digit = i % 9 +1;
//    inputNum.push(digit);
//}
//console.log(inputNum)
/*
function createProgram(inputNumber) {

    let jsScript =`
    let input = ${JSON.stringify(inputNumber)};
    let x=0;
    let y=0; 
    let z=0;
    let w=0;
    let i = 0;
    function add(a, b){
        a += b;
        return a;
    }
    function mul(a, b){
        a *= b;
        return a;
    }
    function div(a, b){
        a /= b;
        return Math.floor(a);
    }
    function mod(a, b){
        let r = a %= b;
        return r;
    }
    function eql(a, b){
        return a === b;
    }
    function inp(a){
        return input[i++];
    }
    `;

    function convertCommands(){
        for(let i=0; i < commands.length; i++){
            let command = commands[i];
            switch(command[0]){
                case 'inp':
                    jsScript += `${command[1]} = inp();\n`;
                    break;
                case 'add':
                    jsScript += `${command[1]} = add(${command[1]}, ${command[2]});\n`;
                    break;
                case 'mul':
                    jsScript += `${command[1]} = mul(${command[1]}, ${command[2]});\n`;
                    break;
                case 'div':
                    jsScript += `${command[1]} = div(${command[1]}, ${command[2]});\n`;
                    break;
                case 'mod':
                    jsScript += `${command[1]} = mod(${command[1]}, ${command[2]});\n`;
                    break;
                case 'eql':
                    jsScript += `${command[1]} = eql(${command[1]}, ${command[2]});\n`;
                    break;
                case 'eql':
                    jsScript += `${command[1]} = eql(${command[1]}, ${command[2]});\n`;
                    break;
                default:
                    console.log('unknown command', command);
                    process.exit();

            }
            //console.log(input);
        }
    }
    convertCommands();
    jsScript += `
    console.log('x,y,z,w',x,y,z,w);
    `;
    return jsScript;
}*/
//console.log(jsScript);

/*

  function arrayRotate(arr, reverse) {
    if (reverse) arr.unshift(arr.pop());
    else arr.push(arr.shift());
    return arr;
  }

  let mya =inputNum;
  for(let i=0; i<14; i++){
    mya = arrayRotate(mya, false);
    //console.log(inp);
    let script = createProgram(mya);
    eval(script);
  }
*/
//console.log(inputs.length);
//let script = createProgram(inputNum);

//eval(script);
//fs.writeFileSync('day24_generated.js', script, 'utf8');