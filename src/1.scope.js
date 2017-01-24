function Scope() {
    this.$$watchers = [];
}
Scope.prototype.$watch = function (expr,listener) {
    var watcher = {
        expr:expr,
        fn:listener,
        last:undefined
    };
    this.$$watchers.push(watcher);
};
Scope.prototype.$apply = function () {
    var self = this;
    this.$$watchers.forEach(function (watcher) {
        var newVal = self[watcher.expr];
        var oldVal = watcher.last;
        if(newVal != oldVal){
            watcher.fn(newVal,oldVal);
            watcher.last = newVal;
        }
    })
};

var scope = new Scope();
var age = 0;
scope.$watch('age',function (nv,ov) {
    console.log(nv,ov);
});
scope.age = ++age;
scope.$apply();