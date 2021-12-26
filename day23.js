

/*
//Problem
let roomA = ["A", "B"];
let roomB = ["C", "A"];
let roomC = ["B", "D"];
let roomD = ["D", "C"];
*/

//#D#C#B#A#
//#D#B#A#C#
//Example
let roomA = ["B", "D", "D", "A"];
let roomB = ["C", "C", "B", "D"];
let roomC = ["B", "B", "A", "C"];
let roomD = ["D", "A", "C", "A"];

let cost = {'A': 1, 'B': 10, 'C': 100, 'D': 1000};
let hallway = new Array(11).fill('.');
let state = {
    rooms: {
        A: roomA,
        B: roomB,
        C: roomC,
        D: roomD
    },
    hallway: hallway,
    cost: 0
};


function finished(state){
    for(let room in state.rooms){
        console.log(room, state.rooms[room]);
        for(let i = 0; i < state.rooms[room].length; i++){
            if(state.rooms[room][i] !== room){
                return false;
            }
        }
    }
    return true;
}

function canMoveFrom(s, room){

}

console.log(finished(state));

let intermediateAnswer = {};
function solve(s){
    let answer = Infinity;
    let key = JSON.stringify(state);
    if(finished(s)){
        return 0;
    }
    if(intermediateAnswer[key]){
        return intermediateAnswer[key];
    }
    // move to destination
    for(let i=0; i < s.hallway.length; i++){
        //let c = s.hallway[i];
        //if
    }

    return answer;
}

let result = solve(state);