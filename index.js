// key input
document.onkeyup = keyControl;
function keyControl(c){
    switch(c.key){
    case 'Enter':
        read('s', '=');
        break;
    case 'Escape':
        read('s', 'c');
        break;
    case 'Backspace':
        read('s', 'ce');
        break;
    case '.':
        read('s', '.');
        break;
    case '+':
        read('o', '+');
        break;
    case '-':
        read('o', '-');
        break;
    case '*':
    case 'x':
        read('o', 'x');
        break;
    case '/':
        read('o', '/');
        break;
    case '^':
        read('o', '^');
        break;
    case 'm':
        read('o', 'm');
        break;
    case 's':
    case 'q':
        read('s', '√');
        break;
    case '%':
        read('o', '%');
        break;
    case 'p':
        read('s', 'p');
        break;
    case 'e':
        read('s', 'e');
        break;
    case '0':
        read('n', 0);
        break;
    case '1':
        read('n', 1);
        break;
    case '2':
        read('n', 2);
        break;
    case '3':
        read('n', 3);
        break;
    case '4':
        read('n', 4);
        break;
    case '5':
        read('n', 5);
        break;
    case '6':
        read('n', 6);
        break;
    case '7':
        read('n', 7);
        break;
    case '7':
        read('n', 8);
        break;
    case '9':
        read('n', 9);
        break;
    default:
    }
}


// calc collection
class Calc {
    static get pi() { return 3.1415 }
    static get euler() { return 2.7182 }

    static percentage = function(x, o, y){
        if(o == '+') return x * (1 + y / 100);
        if(o == '-') return x * (1 - y / 100);
        if(o == 'x') return x * (y / 100);
        if(o == '/') return x / (y / 100);
    }
    static add = function(x, y){return x + y;}
    static subtract = function(x, y){return x - y;}
    static multiply = function(x, y){return x * y;}
    static divide = function(x, y) {
        if (y == 0) return "ERROR";
        return x / y;
    }
    static modulation = function(x, y){
        if (y == 0) return "ERROR";
        return x % y;
    }
    static power = function(x, y){return Math.pow(x, y);}

    static sqrt = function(x) {
        return `The sqrt of ${x} = ${Math.sqrt(x)}`;
    }
}


// input
function read(type, input){
    let dot = 0;
    for(let i = document.querySelector('input').value.length; i >= 0; i--){
        if(document.querySelector('input').value[i] == '.') dot++;
        if(document.querySelector('input').value[i] == '+'
        || document.querySelector('input').value[i] == '-'
        || document.querySelector('input').value[i] == 'x'
        || document.querySelector('input').value[i] == '/'
        || document.querySelector('input').value[i] == 'm'
        || document.querySelector('input').value[i] == '^') break;
    }
    // C
    if(input == 'c') document.querySelector('input').value = '';
    // CE
    else if(input == 'ce') document.querySelector('input').value = document.querySelector('input').value.slice(0, -1);
    // .
    else if(input == '.'
    && dot == 0
    && document.querySelector('input').value.slice(-1) != '.'
    ) document.querySelector('input').value += input;
    // PI
    else if(input == 'p'
    && document.querySelector('input').value.slice(-1) != '.'
    && isNaN(parseInt(document.querySelector('input').value.slice(-1)))
    ) document.querySelector('input').value += Calc.pi;
    // euler
    else if(input == 'e'
    && document.querySelector('input').value.slice(-1) != '.'
    && isNaN(parseInt(document.querySelector('input').value.slice(-1)))
    ) document.querySelector('input').value += Calc.euler;
    // -
    else if(input == '-'
    && document.querySelector('input').value.slice(-1) != '.'
    ) document.querySelector('input').value += input;
    // 0 - 9
    else if(type == 'n'
    && document.querySelector('input').value.slice(-1) != '%'
    ) document.querySelector('input').value += input;
    // + x / mod ^ %
    else if(type == 'o'
    && document.querySelector('input').value != ''
    &&(!isNaN(parseInt(document.querySelector('input').value.slice(-1)))
    || document.querySelector('input').value.slice(-1) == '%')
    ) document.querySelector('input').value += input;
    // =
    else if(input == '='
    &&(!isNaN(parseInt(document.querySelector('input').value.slice(-1)))
    || document.querySelector('input').value.slice(-1) == '%'
    )) seperate(document.querySelector('input').value);
}


// split input
function seperate(input){
    let output = [];
    for(let i = 0; i < input.length; i++){
        if( i == input.length - 1) output.push(input);
        if(input[i].includes('%')){
            input = input.slice(i + 1);
            i = -1;
        }
        if(input[i] == '+'
        || input[i] == '-'
        || input[i] == 'x'
        || input[i] == '/'
        || input[i] == 'm'
        || input[i] == '^'){
            output.push(input.slice(0, i));
            output.push(input[i]);
            input = input.slice(i + 1);
            i = -1;
        }
    }
    return compute(output);
}


//compute input
function compute(input){
    let i = 0;
    do{
        i= input.findIndex((e)=> e[e.length-1] == '%');
        if(i > 0){
            console.log(i, input)
            input.splice(i-2, 3, Calc.percentage(input[i - 2], input[i - 1], input[i].slice(0, -1)));
        }
    }while(i > 0);
    do{
        i = input.findIndex(e => e == '^');
        if(i > 0){
            if(input[i] == '^') input.splice(i-1, 3, Calc.power(input[i - 1], input[i + 1]));
        }
    }while(i > 0);
    do{
        i = input.findIndex(e => e == 'x' || e == '/' || e == 'm');
        if(i > 0){
            if(input[i] == 'x') input.splice(i-1, 3, Calc.multiply(input[i - 1], input[i + 1]));
            if(input[i] == '/') input.splice(i-1, 3, Calc.divide(input[i - 1], input[i + 1]));
            if(input[i] == 'm') input.splice(i-1, 3, Calc.modulation(input[i - 1], input[i + 1]));
        }
    }while(i > 0);
    do{
        i = input.findIndex(e => e == '+' || e == '-');
        if(i > 0){
            if(input[i] == '+') input.splice(i-1, 3, Calc.add(parseFloat(input[i - 1]), parseFloat(input[i + 1])));
            if(input[i] == '-') input.splice(i-1, 3, Calc.subtract(input[i - 1], input[i + 1]));
        }
    }while(i > 0);
    document.querySelector('input').value = input;
}
