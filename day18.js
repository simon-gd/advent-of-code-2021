const fs = require('fs');
const { v4: uuid } = require('uuid');
let text = fs.readFileSync('day18.txt', 'utf8');
const lines = text.split('\r\n').map(x => eval(x));
//lines.map(x => console.log(JSON.stringify(x)));


class HumanNumber {
    constructor(value, type, parent=null) {
        this.id = uuid();
        this.value = value;
        this.type = type;
        this.parent = parent;
    }
}
class SnailNumber{
    constructor(left, right, type=null, parent=null){
        this.id = uuid();
        this.left  = left;
        this.right = right;
        this.type = type;
        this.parent = parent;
    }
}

function SnailNumberToArray(snailNum){
    let result = null;
    if(snailNum instanceof HumanNumber){
        return snailNum;
    } else if (snailNum instanceof SnailNumber) {
        result = [SnailNumberToArray(snailNum.left), SnailNumberToArray(snailNum.right)];
    }
    return result;
}
function snailNumberToArrayValues(snailNum){
    let result = null;
    if(snailNum instanceof HumanNumber){
        return snailNum.value;
    } else if (snailNum instanceof SnailNumber) {
        result = [snailNumberToArrayValues(snailNum.left), snailNumberToArrayValues(snailNum.right)];
    }
    return result;
}

function convertToSnailNumber(input, type){
    if(Array.isArray(input)){
        let left = convertToSnailNumber(input[0], 'left');
        let right = convertToSnailNumber(input[1], 'right');
        let newNumber = new SnailNumber(left, right, type);
        left.parent = newNumber;
        right.parent = newNumber;
        return newNumber;
    } else {
        return new HumanNumber(input, type);
    }
}

function flattenTree(tree){
    let snailNumberToArray = SnailNumberToArray(tree);
    return snailNumberToArray.flat(Infinity);
}

function getNeighborNumber(flattenedTree, id, direction){
    let result = null;
    let index = flattenedTree.findIndex(x => x.id === id);
    //console.log('getNeighborNumber index', index);
    if(direction === 'left'){
        if(index > 0){
            result = flattenedTree[index - 1];
        }
    } else if (direction === 'right') {
        if(index < flattenedTree.length - 1){
            result = flattenedTree[index + 1];
        }
    }
    return result;
}

function explode(input, depth, flattenedTree){
    if(input instanceof HumanNumber){
        return false;
    }
    if(input instanceof SnailNumber && input.left instanceof HumanNumber &&  input.right instanceof HumanNumber && depth >= 4){
        // NEED TO EXPLODE
        let myOldId = input.id;
        //console.log('explode', input.left.id, input.left.value, input.right.id, input.right.value);
        let numberOnTheRight = getNeighborNumber(flattenedTree, input.right.id, 'right');
        //console.log('numberOnTheRight', numberOnTheRight);
        if(numberOnTheRight){
            numberOnTheRight.value += input.right.value;
        }
        // set leftmost Number
        let numberOnTheLeft = getNeighborNumber(flattenedTree, input.left.id, 'left');
        //console.log('numberOnTheLeft', numberOnTheLeft);
        if(numberOnTheLeft){
            numberOnTheLeft.value += input.left.value;
        }
        // update parent
        if (input.type === 'left') {
            input.parent.left = new HumanNumber(0, 'left', input.parent);
            input = input.parent.left;
        } else if (input.type === 'right') {
            input.parent.right = new HumanNumber(0, 'right', input.parent);
            input = input.parent.right;
        }
        let index = flattenedTree.findIndex(x => x.id === myOldId);
        flattenedTree.splice(index, 1);
        return true;
    }
    return explode(input.left, depth + 1, flattenedTree) || explode(input.right, depth + 1, flattenedTree);
}


function split(flattenedTree){
    for(let i = 0; i < flattenedTree.length; i++){
        let current = flattenedTree[i];
        if(current instanceof HumanNumber && current.value >= 10){
            //console.log('split', current.id, current.value);
            let a = new HumanNumber(Math.floor(current.value / 2), 'left');
            let b = new HumanNumber(Math.ceil(current.value / 2), 'right');
            if(current.type === 'left'){
            
                current.parent.left = new SnailNumber(a, b, current.type, current.parent);
                a.parent = current.parent.left;
                b.parent = current.parent.left;
                current = current.parent.left;
            } else if (current.type === 'right') {
                current.parent.right = new SnailNumber(a, b, current.type, current.parent);
                a.parent = current.parent.right;
                b.parent = current.parent.right;
                current = current.parent.right;
            }
            
            return true;
            
        }
    }
    return false;
}

function addSnailNumbers(a, b){
    let newNumber = new SnailNumber(a, b, null);
    a.type = 'left';
    b.type = 'right';
    a.parent = newNumber;
    b.parent = newNumber;
    return newNumber;
}

function magnitude(snailNum){
    let r = null;
    if(snailNum instanceof HumanNumber){
        return snailNum.value;
    } else if (snailNum instanceof SnailNumber) {
        r = 3 * magnitude(snailNum.left) +  2 * magnitude(snailNum.right);
    }
    return r;
}

{
    let result = null;
    for(let i=0; i < lines.length; i++) {
        let line = lines[i];
        //console.log('line', line);
        if(result === null){
            result = convertToSnailNumber(line, null); 
        } else {
            result = addSnailNumbers(result, convertToSnailNumber( line, null)); 
            while (true) {
                let flattenedTree = flattenTree(result);
                //console.log('flattenedTree', flattenedTree.length);
                if(explode(result, 0, flattenedTree)){
                    //console.log(i, "exploded", JSON.stringify(snailNumberToArrayValues(result)));
                    continue;
                } else if(split(flattenedTree)){
                    //console.log(i, "split", JSON.stringify(snailNumberToArrayValues(result)));
                    continue;
                } 
                break;
                
            } 
        }
    
    }



    let answer = magnitude(result);
    console.log('Part 1 answer', answer);
}
{
    
    // Part 2
    let maxMag  = 0
    for(let i=0; i < lines.length; i++) {
        for(let j=0; j < lines.length; j++) {
            if(i !== j){
                let line1 = lines[i];
                let line2 = lines[j];
                let sum = addSnailNumbers(convertToSnailNumber( line1, null), convertToSnailNumber( line2, null)); 
                while (true) {
                    let flattenedTree = flattenTree(sum);
                    //console.log('flattenedTree', flattenedTree.length);
                    if(explode(sum, 0, flattenedTree)){
                        //console.log(i, "exploded", JSON.stringify(snailNumberToArrayValues(result)));
                        continue;
                    } else if(split(flattenedTree)){
                        //console.log(i, "split", JSON.stringify(snailNumberToArrayValues(result)));
                        continue;
                    } 
                    break;
                    
                } 
                let mag = magnitude(sum);
                if(mag > maxMag){
                    maxMag = mag;
                }
                //console.log('mag', i, j,mag);
                
            }
        
        }
    }
    console.log('Part 2 answer', maxMag);
}