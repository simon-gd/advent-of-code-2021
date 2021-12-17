// Example: target area: x=20..30, y=-10..-5
// Problem: target area: x=236..262, y=-78..-58

//let targetArea = {x: [20, 30], y: [-10, -5]};
let targetArea = {x: [236, 262], y: [-78, -58]};
{
    const maxStep = 1000;
    const minV = -100;
    const maxV = 100;

    let overallHighest = 0;
    for(let ivX = 0; ivX <= maxV; ivX++){
        for(let ivY = minV; ivY <= maxV; ivY++){
            let posX=0;
            let posY=0;
            let vX=ivX;
            let vY=ivY;
            let highestY = 0;
            for(let step=0; step < maxStep; step++){
                if(posX >= targetArea.x[0] && posX <= targetArea.x[1] && posY >= targetArea.y[0] && posY <= targetArea.y[1]){
                    if(highestY > overallHighest){
                        overallHighest = highestY;
                    }
                    console.log(`Part 1: hit target step, highestY: ${highestY}  overallHighest:${overallHighest} V:${ivX} ${ivY}`);
                    break;
                }
                posX = posX + vX;
                posY = posY + vY;
                if(posY > highestY){
                    highestY = posY;
                }
                vX = (vX > 0) ? vX - 1 : vX < 0 ? vX + 1 : 0;
                vY = vY - 1;
            }
        }
    }
}
console.log('part 1 end');
// Part 2
{
    const maxStep = 1000;
    const minV = -2000;
    const maxV = 2000;

    let targetHit = [];
    for(let ivX = 0; ivX <= maxV; ivX++){
        for(let ivY = minV; ivY <= maxV; ivY++){
            let posX=0;
            let posY=0;
            let vX=ivX;
            let vY=ivY;
            for(let step=0; step < maxStep; step++){
                if(posX >= targetArea.x[0] && posX <= targetArea.x[1] && posY >= targetArea.y[0] && posY <= targetArea.y[1]){
                    targetHit.push(`${ivX} ${ivY}`);
                    console.log(`Part 2: hit target step, V:${ivX} ${ivY}`);
                    
                    break;
                }
                posX = posX + vX;
                posY = posY + vY;
                vX = (vX > 0) ? vX - 1 : vX < 0 ? vX + 1 : 0;
                vY = vY - 1;
            }
        }
    }
    console.log('part 2 end', targetHit.length);
    // 940
}
