const fs = require('fs');
const { v4: uuid } = require('uuid');
let text = fs.readFileSync('day19.txt', 'utf8');
const lines = text.split('---').filter(x => x !== '').map(x => x.split('\r\n').filter(z => z !== ''));
const scanners = lines.map(sensor => sensor.map(point => point.split(',').map(y => parseInt(y))));

function pointsEquals(a, b) {
    return a.every((x, i) => x === b[i]);
}

function sub(a, b) {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function arrayEquals(a, b) {
    return a.every((x, i) => pointsEquals(x, b[i]));
}

function makeUniqueArray(arr) {
    let unique = [];
    for (let i = 0; i < arr.length; i++) {
        if (!unique.find(x => arrayEquals(x, arr[i]))) {
            unique.push(arr[i]);
        }
    }
    return unique;
}

function rotatePoints(points) {
    let p = [...points];
    let transformedPts = [];
    transformedPts.push(p);
    for (let i = 0; i < 4; i++) {
        // rotate 90 degrees around z
        p = p.map(x => [x[1], -x[0], x[2]]);
        transformedPts.push(p);
        for (let j = 0; j < 4; j++) {
            // rotate 90 degrees around y
            p = p.map(x => [x[2], x[1], -x[0]]);
            transformedPts.push(p);
            for (let k = 0; k < 4; k++) {
                // rotate 90 degrees around x
                p = p.map(x => [x[0], x[2], -x[1]]);
                transformedPts.push(p);
            }
        }
    }
    // get rid of duplicates
    let unique = makeUniqueArray(transformedPts);
    return unique;
}

function alignmentCount(ptsA, ptsB) {
    //let result = {};
    for (let a1 = 0; a1 < ptsA.length; a1++) {
        for (let a2 = 0; a2 < ptsB.length; a2++) {
            let a = ptsA[a1];
            let b = ptsB[a2];
            let offsets = {};
            for (let i = 0; i < a.length; i++) {
                for (let j = 0; j < b.length; j++) {
                    //console.log('a', a[i], 'b', b[i]);
                    let diff = sub(a[i], b[j]);
                    //console.log(a1, a2, 'diff', diff);
                    if (!offsets[`${diff[0]},${diff[1]},${diff[2]}`]) {
                        offsets[`${diff[0]},${diff[1]},${diff[2]}`] = 1;
                    } else {
                        offsets[`${diff[0]},${diff[1]},${diff[2]}`]++;
                    }
                }
            }
            //console.log('offsets', offsets);
            let maxOffset = Math.max(...Object.values(offsets));
            //console.log(a1, a2, 'maxOffset', maxOffset);
            if (maxOffset >= 12) {
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

function makeUnique(arr) {
    let unique = [];
    for (let i = 0; i < arr.length; i++) {
        if (!unique.find(x => pointsEquals(x, arr[i]))) {
            unique.push(arr[i]);
        }
    }
    return unique;
}

let offsets = [[0, 0, 0]];
//alignedBeacons = //makeUnique(alignedBeacons);
//console.log('alignedBeacons', scanners[0].length, scanners[1].length, alignedBeacons.length);
alignedBeacons = [...scanners[0]];
//console.log('alignedBeacons', alignedBeacons);
let queue = scanners.slice(1, scanners.length); //scanners.length);
while (queue.length > 0) {
    //let next = queue.shift();
    let points1 = rotatePoints(alignedBeacons);
    let points2 = rotatePoints(queue[0]);
    let overlapInfo = alignmentCount(points1, points2);
    if (overlapInfo) {
        console.log('overlapInfo', overlapInfo);
        const aligned = points2[overlapInfo.a2].map(x => [x[0] + overlapInfo.offset[0], x[1] + overlapInfo.offset[1], x[2] + overlapInfo.offset[2]]);
        offsets.push(overlapInfo.offset);
        alignedBeacons = points1[overlapInfo.a1];
        alignedBeacons = alignedBeacons.concat(aligned);
        alignedBeacons = makeUnique(alignedBeacons);
        queue.shift();
    } else {
        // move it to the end
        //console.log('no overlap',queue.length);
        queue.push(queue.shift());
    }
}

console.log('Part 1, alignedBeacons', alignedBeacons.length);

console.log('Part 2, alignedBeacons', alignedBeacons.length);
console.log('Part 2, offsets', offsets);
let maxDist = 0;
for (let i = 0; i < offsets.length; i++) {
    for (let j = 0; j < offsets.length; j++) {
        let s1 = offsets[i];
        let s2 = offsets[j];
        let dist = Math.abs(s1[0] - s2[0]) + Math.abs(s1[1] - s2[1]) + Math.abs(s1[2] - s2[2]);
        //console.log('Part 2, maxDist', dist);
        if (dist > maxDist) {
            maxDist = dist;
        }
        //offsets[i][j] = offsets[i][j] * -1;
    }
}
console.log('Part 2, maxDist', maxDist);