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
Scope.prototype.$digest = function () {
    var dirty;
    var count=9;
    do{
        dirty = this.$digestOnce();
        if(dirty && count == 0){
            throw Error('已经运行10次');
        }
    }while(dirty && count--)
}
Scope.prototype.$digestOnce = function () {
    var self = this;
    var dirty = false;
    this.$$watchers.forEach(function (watcher) {
        var newVal = self[watcher.expr];
        var oldVal = watcher.last;
        if(newVal != oldVal){
            watcher.fn(newVal,oldVal);
            watcher.last = newVal;
            dirty = true;
        }
    })
    return dirty;
};
Scope.prototype.$apply = function () {
    this.$digest();
}

var scope = new Scope();
scope.one = 0;
scope.two = 0;

scope.$watch('one',function (nv,ov) {
    scope.two = Math.random();
    console.log(scope.two);
});
scope.$watch('two',function (nv,ov) {
    scope.one = Math.random();
    console.log(scope.one);
});
scope.one = 1;
scope.$apply();