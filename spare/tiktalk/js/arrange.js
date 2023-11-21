function arrange(taskId) {
    const tasks = []
    tasks.push(() => {
        console.log(`${taskId} is notified`)
    })

    async function excute() {
        for (let task of tasks) {
            await task()
        }
    }

    function doSomething(something) {
        tasks.push(() => {
            console.log(`Start to ${something}`)
        })
        return this;
    }

    function wait(duration) {
        tasks.push(() => new Promise((reslove, reject) => {
            setTimeout(reslove, duration * 1000)
        }))
        return this;
    }

    function waitFirst(duration) {
        tasks.unshift(() => new Promise((reslove, reject) => {
            setTimeout(reslove, duration * 1000)
        }))
        return this
    }
    return {
        excute,
        do: doSomething,
        wait,
        waitFirst
    }
}