/*
var greet = function (words) {
    console.log(words.text);
};
var registry = {
    words:{
        text:'hello'
    }
};
var inject = function (func) {
    var source = func.toString();
    var matchers = source.match(/function\s?\((\w+)\)/);
    var argname = matchers[1];//words
    var args = [];
    var argObj = registry[argname];
    args.push(argObj);
    func(argObj);
};
inject(greet);*/
var arr1 = [1,34,4];
var arr2 = [2,6];
Array.prototype.push.apply(arr1,arr2);
console.log(arr1);