class Calc {
    static get pi() { return 3.14 }
    static get euler() { return 2.71 }

    static percentage = function(x, y){return x*100/y;}
    static add = function(x, y){return x + y;}
    static subtract = function(x, y){return x - y;}
    static multiply = function(x, y){return x * y;}
    static divide = function(x, y) {
        if (y == 0) return "ERROR";
        return x / y;
    }

    static ratio = function(x, y, width) {
        return `The height is ${y * width / x} on ratio ${x}:${y}.`;
    }

    static modulation = function(x, y) {
        if (y == 0) return "The divisor cannot be 0!";
        return `${x} % ${y} = ${x % y}`;
    }

    static elevate = function(x, y) {
        return `${x} ^ ${y} = ${Math.pow(x, y)}`;
    }

    static sqrt = function(x) {
        return `The sqrt of ${x} = ${Math.sqrt(x)}`;
    }

    static radius = function(x) {
        return `the radius of this circle is ${x/(2*Calculator.pi)}`
    }

    static circumference = function(x) {
        return `With a radius ${x} the circumference is ${(x * Calculator.pi * 2).toFixed(1)}cm.`;
    }
}


function read(type, input){
    let dot = 0;
    for(let i = document.querySelector('input').value.length; i >= 0; i--){
        if(document.querySelector('input').value[i] == '.') dot++;
        if(document.querySelector('input').value[i] == '+'
        || document.querySelector('input').value[i] == '-'
        || document.querySelector('input').value[i] == '*'
        || document.querySelector('input').value[i] == '/') break;
    }
    if(input == 'c') document.querySelector('input').value = '';
    else if(input == 'ce') document.querySelector('input').value = document.querySelector('input').value.slice(0, -1);
    else if(input == '.'
    && dot == 0
    && document.querySelector('input').value.slice(-1) != '.') document.querySelector('input').value += input;
    else if(type == 'n') document.querySelector('input').value += input;
    else if(input == 'pi'
    && document.querySelector('input').value.slice(-1) != '.'
    && isNaN(parseInt(document.querySelector('input').value.slice(-1))))
        document.querySelector('input').value += Calc.pi;
    else if(type == 'o'
    && document.querySelector('input').value != ''
    && !isNaN(parseInt(document.querySelector('input').value.slice(-1))))
        document.querySelector('input').value += input;
    else if(input == '=' &&
        !isNaN(parseInt(document.querySelector('input').value.slice(-1))))
            seperate(document.querySelector('input').value);
}


function seperate(input){
    let output = [];
    for(let i = 0; i < input.length; i++){
        if( i == input.length - 1) output.push(input);
        if(input[i] == '+'
        || input[i] == '-'
        || input[i] == '*'
        || input[i] == '/'){
            output.push(input.slice(0, i));
            output.push(input[i]);
            input = input.slice(i + 1);
            i = -1;
        }
    }
    console.log(output)
    return compute(output);
}

function compute(input){
    let i = 0;
    do{
        i = input.findIndex(e => e == '*' || e == '/')
        if(i > 0){
            if(input[i] == '*') input.splice(i-1, 3, Calc.multiply(input[i - 1], input[i + 1]));
            if(input[i] == '/') input.splice(i-1, 3, Calc.divide(input[i - 1], input[i + 1]));
        }
    }while(i > 0);
    console.log(input)
    do{
        i = input.findIndex(e => e == '+' || e == '-')
        if(i > 0){
            if(input[i] == '+') input.splice(i-1, 3, Calc.add(parseFloat(input[i - 1]), parseFloat(input[i + 1])));
            if(input[i] == '-') input.splice(i-1, 3, Calc.subtract(input[i - 1], input[i + 1]));
        }
    }while(i > 0);
    document.querySelector('input').value = input;
}
