function isInt(n) {
    return n % 1 === 0;
 }


 function isInt(n){
    return Number(n) === n && n % 1 === 0;
}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

isInt = (n) => {
    return n % 1 === 0;
 }

show = (x) => {
    if(x) {
       if (this.isInt(x)) {
           return ${x} 
       }
       else {
        return ${x.toFixed(2)}
       }
    }
}

var IsDecimal = function(num){
    return ((num.toString().split('.').length) <= 2 && num.toString().match(/^[\+\-]?\d*\.?\d+(?:[Ee][\+\-]?\d+)?$/)) ? (!isNaN(Number.parseFloat(num))) : false ;
}


var IsInteger = function(num){
    return ((num.toString().split('.').length) == 1 && num.toString().match(/^[\-]?\d+$/)) ? (!isNaN(Number.parseInt(num))) : false ;
}


var IsDecimal = function(num){
    return ((num.toString().split('.').length) <= 2 && num.toString().match(/^[\+\-]?\d*\.?\d+(?:[Ee][\+\-]?\d+)?$/)) ? (!isNaN(Number.parseFloat(num))) : false ;
}

var IsInteger = function(num){
    return ((num.toString().split('.').length) == 1 && num.toString().match(/^[\-]?\d+$/)) ? (!isNaN(Number.parseInt(num))) : false ;
}


console.log("-------------- As string --------------");
console.log("Integers:");
console.log("0 = " + IsInteger("0"));
console.log("34 = " + IsInteger("34"));
console.log(".34 = " + IsInteger(".34"));
console.log("3.4 = " + IsInteger("3.4"));
console.log("3e = " + IsInteger("3e"));
console.log("e3 = " + IsInteger("e3"));
console.log("-34 = " + IsInteger("-34"));
console.log("--34 = " + IsInteger("--34"));
console.log("034 = " + IsInteger("034"));
console.log("0-34 = " + IsInteger("0-34"));
console.log("Floats/decimals:");
console.log("0 = " + IsDecimal("0"));
console.log("64 = " + IsDecimal("64"));
console.log(".64 = " + IsDecimal(".64"));
console.log("6.4 = " + IsDecimal("6.4"));
console.log("6e2 = " + IsDecimal("6e2"));
console.log("6e = " + IsDecimal("6e"));
console.log("e6 = " + IsDecimal("e6"));
console.log("-64 = " + IsDecimal("-64"));
console.log("--64 = " + IsDecimal("--64"));
console.log("064 = " + IsDecimal("064"));
console.log("0-64 = " + IsDecimal("0-64"));
console.log("\n-------------- As numbers --------------");
console.log("Integers:");
console.log("0 = " + IsInteger(0));
console.log("34 = " + IsInteger(34));
console.log(".34 = " + IsInteger(0.34));
console.log("3.4 = " + IsInteger(3.4));
console.log("-34 = " + IsInteger(-34));
console.log("034 = " + IsInteger(034));
console.log("0-34 = " + IsInteger(0-34));
console.log("Floats/decimals:");
console.log("0 = " + IsDecimal(0));
console.log("64 = " + IsDecimal(64));
console.log(".64 = " + IsDecimal(0.64));
console.log("6.4 = " + IsDecimal(6.4));
console.log("6e2 = " + IsDecimal(6e2));
console.log("-64 = " + IsDecimal(-64));
console.log("064 = " + IsDecimal(064));
console.log("0-64 = " + IsDecimal(0-64));

console.log(Number.isInteger(2))

var decimal=  /^[-+]?[0-9]+\.[0-9]+$/; 

if (!price.match(decimal)) {
      alert('Please enter valid float');
      return false;
    }


    var number = /^\d+$/; 

if (!price.match(number)) {
      alert('Please enter valid integer');
      return false;
    }


    function isNumberFloatOrInteger(a, b){
        if(Number.isInteger(a / b)){
         return true;
         }
         else{ return false };
   }


   function isInt(number) {
    if(!/^["|']{0,1}[-]{0,1}\d{0,}(\.{0,1}\d+)["|']{0,1}$/.test(number)) return false;
    return !(number - parseInt(number));
}

function isFloat(number) {
    if(!/^["|']{0,1}[-]{0,1}\d{0,}(\.{0,1}\d+)["|']{0,1}$/.test(number)) return false;
    return number - parseInt(number) ? true : false;
}



var tests = {
    'integer' : 1,
    'float' : 1.1,
    'integerInString' : '5',
    'floatInString' : '5.5',
    'negativeInt' : -345,
    'negativeFloat' : -34.98,
    'negativeIntString' : '-45',
    'negativeFloatString' : '-23.09',
    'notValidFalse' : false,
    'notValidTrue' : true,
    'notValidString' : '45lorem',
    'notValidStringFloat' : '4.5lorem',
    'notValidNan' : NaN,
    'notValidObj' : {},
    'notValidArr' : [1,2],
};

function isInt(number) {
    if(!/^["|']{0,1}[-]{0,1}\d{0,}(\.{0,1}\d+)["|']{0,1}$/.test(number)) return false;
    return !(number - parseInt(number));
}

function isFloat(number) {
    if(!/^["|']{0,1}[-]{0,1}\d{0,}(\.{0,1}\d+)["|']{0,1}$/.test(number)) return false;
    return number - parseInt(number) ? true : false;
}

function testFunctions(obj) {
    var keys = Object.keys(obj);
    var values = Object.values(obj);

    values.forEach(function(element, index){
        console.log(`Is ${keys[index]} (${element}) var an integer? ${isInt(element)}`);
        console.log(`Is ${keys[index]} (${element}) var a float? ${isFloat(element)}`);
    });
}



testFunctions(tests);