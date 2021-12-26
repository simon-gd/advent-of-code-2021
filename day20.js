const fs = require('fs');
let text = fs.readFileSync('day20_input.txt', 'utf8');
let image = text.split('\r\n').map(x => x.split(''));
//const enhansmentStr = "..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#";
const enhansmentStr = "##....###.#.##...##....####..###.#.######.#.#.##.#.####.#.#####.##.##..##.###.###..##.##..#####.##..#..##..#...#.####..#.###..#....####.#..##.##...#######.###...#.######..#..#...###..###.#####.##..#.#.###.#.###.#..#.###.###.#..##.....####..#.##.##.#..#...###.#.....##..#....#.##..#....#....####.#...#.#.##.#...#.##..#..#.#..###.###.#.##...##.#.##.##..#..##.#..#...######.#.#..###....##...##....#....##....#.#..##..#####.####.#.##...#...#.#.#....#.####...#.##..#...#..#....#..#..#..##.#.#.#.#######.###..##.#.....";

function padImage(image, expandSize){
    // pad left and right
    let pad = new Array(expandSize);
    pad.fill('.');

    for(let y=0; y < image.length; y++){
       image[y] = pad.concat(image[y]);
       image[y] = image[y].concat(pad);
    }
    
    let newRow = new Array(image[0].length);
    newRow.fill('.');
    //console.log('newRow', newRow)
    for(let i=0; i < expandSize; i++){
        image.splice(0, 0, newRow);
    }
    for(let i=0; i < expandSize; i++){
        image.push(newRow);
    }
    return image;
}

function displayImage(image){
    let d = image.map(x => x.join(''));
    d.map(x => console.log(x));
}
function savmeImage(image){
    let d = image.map(x => x.join(''));
    //d.map(x => console.log(x));
    fs.writeFileSync('day20_output.txt', d.join('\r\n'));
}

function get3x3Window(image, x, y){
    let win = [];
    for(let yi=y-1; yi <= y+1; yi++){
        for(let xi=x-1; xi <= x+1; xi++){
            if(xi < 0 || xi >= image[0].length || yi < 0 || yi >= image.length){
                win.push('.');
            }else{
                let c = image[yi][xi];
                win.push(c);
            }
        }
    }
    return win;
} 

function  processWindow(win){
    // convert to binary
    let bin = win.map(x => x === '#' ? '1' : '0');
    // convert to decimal
    let dec = parseInt(bin.join(''), 2);
    return enhansmentStr.charAt(dec);
}

function processImage(image){
    let newImage = JSON.parse(JSON.stringify(image));
    for(let y=0; y < image.length; y++){
        for(let x=0; x < image[0].length; x++){
            let win = get3x3Window(image, x, y);
            let newPixel = processWindow(win);
            newImage[y][x] = newPixel;
            //console.log( 'newPixel', newPixel);
        }
    }
    return newImage;
}

function crop(image){
    image = image.map(x => x.slice(0, image[0].length-2));
    image = image.slice(0, image.length-2);
    return image;
}

//let win = get3x3Window(image, 2, 2);
//console.log('win',win);
//let newPixel = processWindow(win);
//console.log('newPixel', newPixel);

//image = padImage(image, 6);
for(let i=0; i < 50; i++){
    if(i % 2 === 0){
        console.log('i', i, i % 2 );
        image = padImage(image, 7);
    }
    image = processImage(image);
    image = crop(image);
}
//image = processImage(image);
//console.log('image', image);



// crop edges

//displayImage(image);
savmeImage(image);

let count = 0;
for(let y=0; y < image.length; y++){
    for(let x=0; x < image[0].length; x++){
        if(image[y][x] === '#'){
            count++;
        }
    }
}
console.log('count', count);
// 5736 is too high
// 5461