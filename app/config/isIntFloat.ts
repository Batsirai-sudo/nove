const mathjs = require('mathjs');

export default (x) => {
    const n = x * 1
    // check if the passed value is a number
    if (typeof n == 'number' && !isNaN(n)) {

        const isValidInt = isInt(n)
        const isValidFloat = isFloat(n)

        if (isValidInt) {

            return {
                value: parseInt(n),
                type: 'interger'
            }
        }
        if (isValidFloat) {
            return {
                value: parseFloat(mathjs.round(n, 2)),
                type: 'float'
            }
        }
    }

}

function isInt(n) {
    return Number(n) === n && n % 1 === 0;
}


function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
}

// var IsDecimal = function (num) {
//     return ((num.toString().split('.').length) <= 2 && num.toString().match(/^[\+\-]?\d*\.?\d+(?:[Ee][\+\-]?\d+)?$/)) ? (!isNaN(Number.parseFloat(num))) : false;
// }

// var IsDecimal = function (num) {
//     return ((num.toString().split('.').length) <= 2 && num.toString().match(/^[\+\-]?\d*\.?\d+(?:[Ee][\+\-]?\d+)?$/)) ? (!isNaN(Number.parseFloat(num))) : false;
// }

/**
 * JavaScript Program to Check if a Number is Float or Integer
 *
 * To understand this example, you should have the knowledge of the following JavaScript programming topics:

JavaScript Regex
JavaScript Number.isInteger()
JavaScript typeof Operator
 */

/**
 * Example 1: Using Number.isInteger()
 */

// program to check if a number is a float or integer value

// function checkNumber(x) {

//     // check if the passed value is a number
//     if (typeof x == 'number' && !isNaN(x)) {

//         // check if it is integer
//         if (Number.isInteger(x)) {
//             console.log(`${x} is integer.`);
//         }
//         else {
//             console.log(`${x} is a float value.`);
//         }

//     } else {
//         console.log(`${x} is not a number`);
//     }
// }

// checkNumber('hello');
// checkNumber(44);
// checkNumber(3.4);
// checkNumber(-3.4);
// checkNumber(NaN);

// /**
//  * The typeof operator is used to check the data type of the passed value.
// The isNaN() method checks if the passed value is a number.
// The Number.isInteger() method is used to check if the number is an integer value.

//  */

// // program to check if a number is a float or integer value
// //Example 2: Using Regex

// function checkNumber2(x) {

//     let regexPattern = /^-?[0-9]+$/;

//     // check if the passed number is integer or float
//     let result = regexPattern.test(x);

//     if (result) {
//         console.log(`${x} is an integer.`);
//     }
//     else {
//         console.log(`${x} is a float value.`)
//     }

// }