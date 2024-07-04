console.log("your first  code ");
function add(n1, n2) {
    return n1 + n2;
}
var number1 = 5;
var number2 = 7;
var result;
result = add(number1, number2);
console.log(result);
function AddHandler(num, num1, cb) {
    result = num + num1;
    cb(result);
}
AddHandler(number1, number2, function () {
    console.log(result);
});
