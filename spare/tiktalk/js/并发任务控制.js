function timeout(time) {
    return new Promise((reslove, reject) => {
        setTimeout(() => {
            reslove()
        }, time)
    })
}

class superTask {
    constructor(parallerCount = 2) {
        this.parallerCount = parallerCount // 并发数量
        this.runningCount = 0 // 正在运行的数量
        this.tasks = [] // 任务列表
    }

    add(task) {
        return new Promise((reslove, reject) => {
            this.tasks.push({
                task,
                reslove,
                reject
            })
            this._run()
        })
    }

    _run() {
        if (this.runningCount < this.parallerCount && this.tasks.length) {
            const { task, reslove, reject } = this.tasks.shift()
            task().then(reslove, reject).finally(() => {
                this.runningCount--;
                this._run()
            })
        }
    }
}

let supertask = new superTask()

function addTask(time, name) {
    supertask.add(() => timeout(time)).then(() => {
        console.log(`任务${name}执行`)
    })
}

addTask(10000,1)
addTask(5000,2)
addTask(3000,3)
addTask(4000,4)
addTask(5000,5)