const fs = require('fs');
let text = fs.readFileSync('day16.txt', 'utf8');
//console.log('input', text);
String.prototype.removeCharsAt = function (i, count) {
    var tmp = this.split(''); // convert to an array
    tmp.splice(i , count); // remove count element from the array (adjusting for non-zero-indexed counts)
    return tmp.join(''); // reconstruct the string
}

function hexToBinary(hex){
    let r = '';
    for(let char of hex){
        if(char === '0'){
            r += '0000';
        }else if(char === '1'){
            r += '0001';
        }else if(char === '2'){
            r += '0010';
        }else if(char === '3'){
            r += '0011';
        }else if(char === '4'){
            r += '0100';
        }else if(char === '5'){
            r += '0101';
        }else if(char === '6'){
            r += '0110';
        }else if(char === '7'){
            r += '0111';
        }else if(char === '8'){
            r += '1000';
        }else if(char === '9'){
            r += '1001';
        }else if(char === 'A'){
            r += '1010';
        }else if(char === 'B'){
            r += '1011';
        }else if(char === 'C'){
            r += '1100';
        }else if(char === 'D'){
            r += '1101';
        }else if(char === 'E'){
            r += '1110';
        }else if(char === 'F'){
            r += '1111';
        }
    }
    return r;
    //return parseInt(hex, 16).toString(2);
}


function parsePackets(input){
    function inputPop(len){
        let result = input.substring(0, len);
        input = input.removeCharsAt(0, len);
        return result;
    }
    //console.log('calleing parsePackets', input, input.length);
    let packet = {};
    let packetVersion = parseInt(inputPop(3), 2);
    let packetType = parseInt(inputPop(3),2);
    let lengthType = null;
    let resultLiteral = '';
    if(packetType === 4){
        // literal value
        
        let keepReading = true;
        while(keepReading){
            let packet = inputPop(5);
            if(packet[0] === '0'){
                keepReading = false;
            }
            resultLiteral += packet.substring(1, 5);
            //console.log('packet', packet, resultLiteral);
        }
        // strip andy 0's after the last position
        //while(input.length  && input[0] === '0'){
        //    inputPop(1);
        //}
        packet = {
            version: packetVersion,
            type: packetType,
            literal: parseInt(resultLiteral, 2),
            input: input
        }
        //console.log('Literal value', packet.literal);
        return packet;
    } else {
        //console.log('Operation');
        let packets = [];
        // operator
        lengthType = inputPop(1);
        //console.log('Operation', 'lengthType', lengthType);
        if(lengthType === '0') {
            
            // length is next 15 bits
            let length = parseInt(inputPop(15), 2);
            let newPackatData = inputPop(length);
            while(newPackatData.length){
                let packet = parsePackets(newPackatData);
                if(packet){
                    //console.log('packet', packet);
                    newPackatData = packet.input; // remove the packet from the input
                    packets.push(packet);
                }
            }
           // parseInt(input.substring(0,22),2) : parseInt(input.substring(7,18),2);
        // packetTypes
        } else {
            
            // length is next 11 bits
            let length = parseInt(inputPop(11), 2);
            for(let i = 0; i < length; i++){
                let packet = parsePackets(input);
                if(packet){
                    //console.log('packet', packet);
                    input = packet.input; // remove the packet from the input
                    packets.push(packet);
                }
            }
            //console.log("Unhandled", length);
        }

        packet.type = packetType;
        packet.version = packetVersion;
        packet.input = input;
        packet.packets = packets;
        return packet;
    }

    //let packetLength = parseInt(binary.substring(6,16),2);
    //let packetData = binary.substring(16);
    

}

function sumupVersions(packet){
    let sum = packet.version;
    if(packet.packets){
        for(let p of packet.packets){
            sum += sumupVersions(p);
        }
    }
    return sum;
}


let hexText0 = 'D2FE28'; //literal value
let hexText1 = '38006F45291200';  // operator with 2 sub-packets
let hexText12 = 'EE00D40C823060'; // operator with 2 sub-packets
let hexText2 = '8A004A801A8002F478'; 
let hexText3 = '620080001611562C8802118E34'; 
let hexText4 = 'C0015000016115A2E0802F182340'; 
let hexText5 = 'A0016C880162017C3686B18A3D4780'; 


{
    let i = text;
    let ex12 = hexToBinary(i);
    //console.log(i, ex12);
    let packets12 = parsePackets(ex12);
    //console.log(packets12);
    let sum = sumupVersions(packets12);
    console.log('Part 1 sum', sum);
}


// part 2
function performOperations(packet){
    let value = 0;
    if(packet.type === 0){
        // sum
        value = packet.packets.map(k => performOperations(k)).reduce((a, b) => a + b);

    } else if(packet.type === 1){
        // product
        value = packet.packets.map(k => performOperations(k)).reduce((a, b) => a * b);
    }else if(packet.type === 2){
        // minimum
        value = Math.min(...packet.packets.map(k => performOperations(k)));
    }else if(packet.type === 3){
        // maximum
        value = Math.max(...packet.packets.map(k => performOperations(k)));
    }else if(packet.type === 4){
        // literal
        value = packet.literal;
    }else if(packet.type === 5){
        // greater than
        value = performOperations(packet.packets[0]) > performOperations(packet.packets[1]) ? 1 : 0;
    }else if(packet.type === 6){
        // less than
        value = performOperations(packet.packets[0]) < performOperations(packet.packets[1]) ? 1 : 0;
    }else if(packet.type === 7){
        // equals
        value = performOperations(packet.packets[0]) === performOperations(packet.packets[1]) ? 1 : 0;
        
    } else {
        value = 0;
    }
    return value;
}



let v1 = '9C0141080250320F1802104A08';
let i = text;
let ex12 = hexToBinary(i);
//console.log(i, ex12);
let packets12 = parsePackets(ex12);
//console.log(packets12);
let result = performOperations(packets12);
console.log('operations', result);