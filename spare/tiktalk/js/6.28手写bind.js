function fn(a, b, c, d) {
  console.log(a, b, c, d);
  console.log(this);
}

Function.prototype.myBind = function (ctx) {
  let args = Array.prototype.slice.call(arguments, 1);
  console.log(args);
  let fn = this;
  return function A() {
    let restArgs = Array.prototype.slice.call(arguments);
    let allArgs = args.concat(restArgs);
    // 假如是以new调用的该函数 说明当前this的原型和A的原型相同
    if (Object.getPrototypeOf(this) === A.prototype) {
      return new fn(...allArgs);
    } else {
      return fn.apply(ctx, allArgs);
    }
  };
};

const newFn = fn.myBind("ctx", 1, 2, 3);

newFn(4);
