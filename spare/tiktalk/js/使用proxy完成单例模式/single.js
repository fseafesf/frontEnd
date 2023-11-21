export function single(className) {
    let instance;
    return new Proxy(className, {
        construct(target, args) {
            if (!instance) {
                instance = new target(...args)
            }
            else {
                return instance
            }
        }
    })
}