{
    let player1pos = 7; //4;
    let player2pos = 1; //8;
    let player1score = 0;
    let player2score = 0;

    let die = 0;
    let playerTurn = 1;
    let dieRollCount = 0;

    function roll_die() {
        dieRollCount++;
        die = (die % 100) + 1;
        return die;
    }

    const wrap = (x) => {
        while  (x > 10) {
            x = x - 10;
        }
        return x;
    }

    let c =0;
    while(player1score < 1000 && player2score < 1000) {
        c++;
        let current_score = 0;
        current_score += roll_die();
        current_score += roll_die();
        current_score += roll_die();

        if(playerTurn === 1) {
            player1pos += current_score;
            player1pos = wrap(player1pos);
            player1score += player1pos;
            //console.log("die: " + die + " player1pos: " + player1pos + " player1score: " + player1score);
        } else {
            player2pos += current_score;
            player2pos = wrap(player2pos);
            player2score += player2pos;
            //console.log("die: " + die + " player2pos: " + player2pos + " player2score: " + player2score);
        }
        

        playerTurn = (playerTurn == 1) ? 2 : 1;
    }

    let losingScore = (player1score > player2score) ? player2score : player1score;

    console.log("Part 1", dieRollCount, losingScore,  dieRollCount * losingScore);
}

// Part 2
{

const wrap = (x) => {
    while  (x > 10) {
        x = x - 10;
    }
    return x;
}
let winCount = {};
let die = [1, 2, 3];
function countWins(p1, p2, s1, s2){
    if(s1 >= 21){
        return [1, 0];
    }
    if(s2 >= 21){
        return [0, 1];
    }
    if(winCount[`${p1},${p2},${s1},${s2}`]){
        return winCount[`${p1},${p2},${s1},${s2}`];
    }
    let currentCount = [0,0];
    // roll 1
    for(let d1 of die){
        // roll 2
        for (let d2 of die){
            // roll 3
            for(let d3 of die){
                let new_p1 = wrap(p1+d1+d2+d3);
                let new_s1 = s1 + new_p1;

                let r = countWins(p2, new_p1, s2, new_s1)
                currentCount = [currentCount[0]+ r[1], currentCount[1]+r[0]]
            }
        }
    }
    winCount[`${p1},${p2},${s1},${s2}`] = currentCount;
    return currentCount;

}

let p1 = 7;//4; 
let p2 = 1;//8;
let answer = countWins(p1, p2, 0, 0);
console.log("Part 2", Math.max(...answer));
}
