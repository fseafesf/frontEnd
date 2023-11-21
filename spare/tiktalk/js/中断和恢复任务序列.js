
function processTasks(...tasks) {
    let isRunning = false;
    const result = [];
    let i = 0;
    const prom = null;
    return {
        async start() {
            return new Promise(async (reslove, reject) => {
                if (prom) {
                    prom.then(reslove, reject)
                    return;
                }
                if (isRunning) {
                    return;
                }
                isRunning = true
                while (i < tasks.length) {
                    try {
                        result.push(await tasks[i]);
                    } catch (error) {
                        reject(error)
                        prom = Promise.reject(error)
                        isRunning = false;
                        return;
                    }
                    i++
                    if (!isRunning && i < tasks.length - 1) {
                        return;
                    }
                }
                reslove(result)
                prom = Promise.resolve(result)
                isRunning = false
            })
        },

        pause() {
            isRunning = false
        }
    }
}