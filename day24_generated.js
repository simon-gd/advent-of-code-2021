/*
Conditions
E - 7 = F
D + 1 = G
H + 2 = I
J + 5 = K
C -4 = L
B -8 = M
A + 7 = N
*/
    //           A B C D E F G H I J K L M N 
    // let input = [2,9,9,8,9,2,9,7,9,4,9,5,1,9];
    let input = [1,9,5,1,8,1,2,1,3,1,6,1,1,8];
//29989297949519
//19518121316118
    
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
        let r = a % b;
        return r;
    }
    function eql(a, b){
        return a == b ? 1 : 0;
    }
    function inp(a){
        return input[i++];
    }
w = inp();
x = mul(x, 0); // x = 0
x = add(x, z); // x = x + z
x = mod(x, 26); // x = x % 26
z = div(z, 1);  // z = z / 1
x = add(x, 14); // x = x + 14
x = eql(x, w);  // if x === w then x = 1 else x = 0
x = eql(x, 0);  // 
y = mul(y, 0);  
y = add(y, 25); // y = 25
y = mul(y, x);  // y = y * x
y = add(y, 1);  // y = y + 1
z = mul(z, y);  // z = z * y
y = mul(y, 0);  // y = 0
y = add(y, w);  // y = y + w
y = add(y, 14); // y = y + 14
y = mul(y, x);  // y = y * x
z = add(z, y);  // z = z + y


//if w != z.peek() + 14:
//    z.push(w + 14)
// z = w + 14
console.log(1, 'x,y,z,w',x,y,z,w);

//-----------------
w = inp();
x = mul(x, 0);
x = add(x, z);  // x = z
x = mod(x, 26); // x = x % 26
z = div(z, 1);
x = add(x, 14); // x = x + 14
x = eql(x, w);
x = eql(x, 0);  // x = 0
y = mul(y, 0);
y = add(y, 25); // y = 25
y = mul(y, x);  // y = y * x
y = add(y, 1);  // y = y + 1
z = mul(z, y);  // z = z * y
y = mul(y, 0);
y = add(y, w);  // y = y + w
y = add(y, 2);  // y = y + 2
y = mul(y, x);  // y = y * x
z = add(z, y); // z = z + y

// if(z % 26)
// z = w + 2
console.log(2, 'x,y,z,w',x,y,z,w);
w = inp();
x = mul(x, 0);
x = add(x, z);
x = mod(x, 26);
z = div(z, 1);
x = add(x, 14);
x = eql(x, w);
x = eql(x, 0);
y = mul(y, 0);
y = add(y, 25);
y = mul(y, x);
y = add(y, 1);
z = mul(z, y);
y = mul(y, 0);
y = add(y, w);
y = add(y, 1);
y = mul(y, x);
z = add(z, y);
console.log(3, 'x,y,z,w',x,y,z,w);
w = inp();
x = mul(x, 0);
x = add(x, z);
x = mod(x, 26);
z = div(z, 1);
x = add(x, 12);
x = eql(x, w);
x = eql(x, 0);
y = mul(y, 0);
y = add(y, 25);
y = mul(y, x);
y = add(y, 1);
z = mul(z, y);
y = mul(y, 0);
y = add(y, w);
y = add(y, 13);
y = mul(y, x);
z = add(z, y);
console.log(4, 'x,y,z,w',x,y,z,w);
w = inp();
x = mul(x, 0);
x = add(x, z);
x = mod(x, 26);
z = div(z, 1);
x = add(x, 15);
x = eql(x, w);
x = eql(x, 0);
y = mul(y, 0);
y = add(y, 25);
y = mul(y, x);
y = add(y, 1);
z = mul(z, y);
y = mul(y, 0);
y = add(y, w);
y = add(y, 5);
y = mul(y, x);
z = add(z, y);
console.log(5, 'x,y,z,w',x,y,z,w);
w = inp();
x = mul(x, 0);
x = add(x, z);
x = mod(x, 26);
z = div(z, 26);
x = add(x, -12);
x = eql(x, w);
x = eql(x, 0);
y = mul(y, 0);
y = add(y, 25);
y = mul(y, x);
y = add(y, 1);
z = mul(z, y);
y = mul(y, 0);
y = add(y, w);
y = add(y, 5);
y = mul(y, x);
z = add(z, y);
console.log(6, 'x,y,z,w',x,y,z,w);
w = inp();
x = mul(x, 0);
x = add(x, z);
x = mod(x, 26);
z = div(z, 26);
x = add(x, -12);
x = eql(x, w);
x = eql(x, 0);
y = mul(y, 0);
y = add(y, 25);
y = mul(y, x);
y = add(y, 1);
z = mul(z, y);
y = mul(y, 0);
y = add(y, w);
y = add(y, 5);
y = mul(y, x);
z = add(z, y);
console.log(7, 'x,y,z,w',x,y,z,w);
w = inp();
x = mul(x, 0);
x = add(x, z);
x = mod(x, 26);
z = div(z, 1);
x = add(x, 12);
x = eql(x, w);
x = eql(x, 0);
y = mul(y, 0);
y = add(y, 25);
y = mul(y, x);
y = add(y, 1);
z = mul(z, y);
y = mul(y, 0);
y = add(y, w);
y = add(y, 9);
y = mul(y, x);
z = add(z, y);
console.log(8, 'x,y,z,w',x,y,z,w);
w = inp();
x = mul(x, 0);
x = add(x, z);
x = mod(x, 26);
z = div(z, 26);
x = add(x, -7);
x = eql(x, w);
x = eql(x, 0);
y = mul(y, 0);
y = add(y, 25);
y = mul(y, x);
y = add(y, 1);
z = mul(z, y);
y = mul(y, 0);
y = add(y, w);
y = add(y, 3);
y = mul(y, x);
z = add(z, y);
console.log(9, 'x,y,z,w',x,y,z,w);
w = inp();
x = mul(x, 0);
x = add(x, z);
x = mod(x, 26);
z = div(z, 1);
x = add(x, 13);
x = eql(x, w);
x = eql(x, 0);
y = mul(y, 0);
y = add(y, 25);
y = mul(y, x);
y = add(y, 1);
z = mul(z, y);
y = mul(y, 0);
y = add(y, w);
y = add(y, 13);
y = mul(y, x);
z = add(z, y);
console.log(10, 'x,y,z,w',x,y,z,w);
w = inp();
x = mul(x, 0);
x = add(x, z);
x = mod(x, 26);
z = div(z, 26);
x = add(x, -8);
x = eql(x, w);
x = eql(x, 0);
y = mul(y, 0);
y = add(y, 25);
y = mul(y, x);
y = add(y, 1);
z = mul(z, y);
y = mul(y, 0);
y = add(y, w);
y = add(y, 2);
y = mul(y, x);
z = add(z, y);
console.log(11, 'x,y,z,w',x,y,z,w);
w = inp();
x = mul(x, 0);
x = add(x, z);
x = mod(x, 26);
z = div(z, 26);
x = add(x, -5);
x = eql(x, w);
x = eql(x, 0);
y = mul(y, 0);
y = add(y, 25);
y = mul(y, x);
y = add(y, 1);
z = mul(z, y);
y = mul(y, 0);
y = add(y, w);
y = add(y, 1);
y = mul(y, x);
z = add(z, y);
console.log(12, 'x,y,z,w',x,y,z,w);
w = inp();
x = mul(x, 0);
x = add(x, z);
x = mod(x, 26);
z = div(z, 26);
x = add(x, -10);
x = eql(x, w);
x = eql(x, 0);
y = mul(y, 0);
y = add(y, 25);
y = mul(y, x);
y = add(y, 1);
z = mul(z, y);
y = mul(y, 0);
y = add(y, w);
y = add(y, 11);
y = mul(y, x);
z = add(z, y);
console.log(13, 'x,y,z,w',x,y,z,w);
w = inp();
x = mul(x, 0);
x = add(x, z);
x = mod(x, 26);
z = div(z, 26);
x = add(x, -7);
x = eql(x, w);
x = eql(x, 0);
y = mul(y, 0);
y = add(y, 25);
y = mul(y, x);
y = add(y, 1);
z = mul(z, y);
y = mul(y, 0);
y = add(y, w);
y = add(y, 8);
y = mul(y, x);
z = add(z, y);

console.log(14, 'x,y,z,w',x,y,z,w);
    