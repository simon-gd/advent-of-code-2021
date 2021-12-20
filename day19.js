const fs = require('fs');
const { v4: uuid } = require('uuid');
let text = fs.readFileSync('day19.txt', 'utf8');
const lines = text.split('---').filter(x => x !== '').map(x => x.split('\r\n').filter(z => z !== ''));
const scanners = lines.map(sensor => sensor.map(point => point.split(',').map(y => parseInt(y))));
//console.log(scanners);

function pointsEquals(a, b){
    return a.every((x, i) => x === b[i]);
}

function sub(a, b){
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function rotatePoints(points){
   let p = [...points];
   let transformedPts = [];
   for(let i = 0; i < 4; i++){
       transformedPts.push(p);
       p = p.map(x => [x[2], x[1], -x[0]]);  // (z, y, -x) // rotate 90 degrees around y counter-clockwise
       transformedPts.push(p);
       p = p.map(x => [x[2], x[1], -x[0]]);  // (z, y, -x) // rotate 90 degrees around y counter-clockwise
       transformedPts.push(p);
       p = p.map(x => [x[2], x[1], -x[0]]);  // (z, y, -x) // rotate 90 degrees around y counter-clockwise
       transformedPts.push(p);
       p = p.map(x => [x[2], x[1], -x[0]]);  // (z, y, -x) // rotate 90 degrees around y counter-clockwise
       transformedPts.push(p.map(x => [x[1], -x[0], x[2]]));  // (y, -x, z)  // rotate 90 degrees around z clockwise
       transformedPts.push(p.map(x => [-x[1], x[0], x[2]]));  // (-y, x, z)  // rotate 90 degrees around z counter-clockwise
       p = p.map(x => [x[0], x[2], -x[1]]); // (x, z, -y) // rotate 90 degrees around x
  
   }
   return transformedPts;
}

function alignmentCount(ptsA, ptsB){
    //let result = {};
    for(let a1=0; a1 < ptsA.length; a1++){
        for(let a2=0; a2 < ptsB.length; a2++){
            let a = ptsA[a1];
            let b = ptsB[a2];
            let offsets = {};
            for(let i = 0; i < a.length; i++){
                for(let j = 0; j < b.length; j++){
                    //console.log('a', a[i], 'b', b[i]);
                    let diff = sub(a[i], b[j]);
                    //console.log(a1, a2, 'diff', diff);
                    if(!offsets[`${diff[0]},${diff[1]},${diff[2]}`]){
                        offsets[`${diff[0]},${diff[1]},${diff[2]}`] = 1;
                    } else {
                        offsets[`${diff[0]},${diff[1]},${diff[2]}`]++;
                    }
                }
            }
            //console.log('offsets', offsets);
            let maxOffset = Math.max(...Object.values(offsets));
            //console.log(a1, a2, 'maxOffset', maxOffset);
            if(maxOffset >= 12){
                let largeOffset = Object.keys(offsets).find(x => offsets[x] === maxOffset);
                return {
                    a1: a1,
                    a2: a2,
                    offset: largeOffset.split(',').map(x => parseInt(x)),
                    maxOffset: maxOffset
                }
            }
        }
    }
    return null;
}

function makeUnique(arr){
    let unique = [];
    for(let i=0; i < arr.length; i++){
        if(!unique.find(x => pointsEquals(x, arr[i]))){
            unique.push(arr[i]);
        }
    }
    return unique;
}

{
    //alignedBeacons = //makeUnique(alignedBeacons);
    //console.log('alignedBeacons', scanners[0].length, scanners[1].length, alignedBeacons.length);
    alignedBeacons = [...scanners[0]];
    //console.log('alignedBeacons', alignedBeacons);
    let queue = scanners.slice(1, scanners.length); //scanners.length);
    while(queue.length > 0){
        //let next = queue.shift();
        let points1 = rotatePoints(alignedBeacons);
        let points2 = rotatePoints(queue[0]);
        let overlapInfo = alignmentCount(points1, points2);
        if(overlapInfo){
            console.log('overlapInfo', overlapInfo);
            const aligned = points2[overlapInfo.a2].map(x => [x[0] + overlapInfo.offset[0], x[1] + overlapInfo.offset[1], x[2] + overlapInfo.offset[2]]);
            alignedBeacons = points1[overlapInfo.a1];
            alignedBeacons = alignedBeacons.concat(aligned);
            alignedBeacons = makeUnique(alignedBeacons);
            queue.shift();
        }else{
            // move it to the end
            //console.log('no overlap',queue.length);
            queue.push(queue.shift());
        }
    }

    console.log('Part 1, alignedBeacons', alignedBeacons.length);
}
console.log('Part 2');