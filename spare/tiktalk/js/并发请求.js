function concurRequest(urls, maxNum) {
    return new Promise(reslove => {
        if (urls.length == 0) {
            reslove([])
        }
        const result = [];
        let index = 0; // 下一个请求的下标
        let count = 0; // 当前请求完成的数量
        // 发送请求
        async function request() {
            if (index === urls.length) return
            const i = index // 保存下标
            const url = urls[index]
            index++;
            try {
                const resp = await fetch(url)
                result[i] = resp
            } catch (error) {
                result[i] = error
            } finally {
                count++
                if (count == urls.length) {
                    reslove(result)
                }
                request()
            }
        }

        const times = Math.min(urls.length, maxNum)
        for (let i = 0; i < times; i++) {
            request()
        }
    })
}