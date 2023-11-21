Function.prototype.myCall = function (ctx, ...args) {
    ctx = (ctx === null || ctx === undefined) ? globalThis : Object(ctx)
    let key = new Symbol('key')
    Object.defineProperty(ctx, key, {
        enumerable: false,
        value: this
    })

    let res = ctx[key](...args)
    delete ctx[key]
    return res
}