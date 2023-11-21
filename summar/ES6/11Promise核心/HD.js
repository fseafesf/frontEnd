class HD {
    static PENDING = 'pending';
    static FUFILLED = 'fulfilled';
    static REJECTED = 'rejected';
    constructor(executor) {
        this.status = HD.PENDING
        this.value = null;
        this.callbacks = [] // 回调函数的数组
        // 这里try catch 是为了避免构造函数运行的时候出现错误
        try {
            executor(this.resolve.bind(this), this.reject.bind(this)); // 开始构造函数需要调用
        } catch (error) {
            this.reject(error)
        }

    }
    resolve(value) {
        if (this.status === HD.PENDING) {
            this.value = value;
            this.status = HD.FUFILLED;
            setTimeout(() => {
                this.callbacks.map(callback => {
                    callback.onFulfilled(this.value)
                })
            }, 0)
        }
    }
    reject(reason) {
        if (this.status === HD.PENDING) {
            this.value = reason;
            this.status = HD.REJECTED;

            // 
            setTimeout(() => {
                this.callbacks.map(callback => {
                    callback.onRejected(this.value)
                })
            }, 0)
        }
    }
    then(onFulfilled, onRejected) {
        if (typeof onFulfilled !== 'function') { // 假如then 的两个参数不是函数 则需要给它设置成一个函数
            onFulfilled = () => this.value
        }
        if (typeof onRejected !== 'function') {
            onRejected = () => this.value
        }
        let promise = new HD((resolve, reject) => {
            if (this.status === HD.PENDING) { // 假如是pending 说明执行到了then 还没有执行reslove 或者 reject 将函数存入回调函数数组当中去
                this.callbacks.push({
                    onFulfilled: value => {
                        this.parse(promise, onFulfilled(value), resolve, reject)
                    },
                    onRejected: value => {
                        this.parse(promise, onRejected(value), resolve, reject)
                    }
                })
            }
            if (this.status === HD.FUFILLED) {
                setTimeout(() => {
                    this.parse(promise, onFulfilled(this.value), resolve, reject)
                }, 0)
            }
            if (this.status === HD.REJECTED) {
                setTimeout(() => {
                    this.parse(promise, onRejected(this.value), resolve, reject)
                }, 0)

            }
        })
        return promise // then 链式调用 需要返回一个promise
    }
    parse(promise, result, resolve, reject) {
        if (promise === result) {
            throw new Error('error')
        }
        try {
            if (result instanceof HD) {
                result.then(value => {
                    resolve(value)
                }, reason => {
                    reject(reason)
                })
            } else {
                resolve(result)
            }
        } catch (error) {
            reject(error)
        }
    }
    static resolve(value) {
        return new HD((resolve, reject) => {
            if (value instanceof HD) {
                value.then((resolve, reject))
            }
            else {
                resolve(value)
            }
        })
    }
    static reject(value) {
        return new HD((resolve, reject) => {
            reject(value)
        })
    }
    static all(promises) {
        return new HD((resolve, reject) => {
            promises.forEach(element => {
                const resolves = []
                element.then(value => {
                    resolves.push(element)
                    if (resolves.length === promises.length) {
                        resolve(value)
                    }
                }, reason => {
                    reject(reason)
                })
            });
        })

    }
}