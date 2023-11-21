let controller;

input.onchange = async () => {
    controller && controller.abort()
    controller = new AbortController()
    const list = await fetch(url,
        {
            signal: controller.signal
        }).then(res => {
            res.json()
        })
}