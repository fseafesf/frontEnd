Promise.myAll = function (params) {
    let res, rej
    const p = new Promise((reslove, reject) => {
        res = reslove;
        rej = reject;
    });

    const result = []
    let count = 0; // promise数量
    let fulFilledCount = 0
    for (const iterator of params) {
        const i = count
        count++;
        Promise.resolve(iterator).then(data => {
            // 将成功的数据汇总到result
            result[i] = data
            fulFilledCount++;
            if (fulFilledCount === count) {
                res(result)
            }
        }, rej)
    }

    if (count === 0) {
        res(result)
    }
    return p
}