function request(timeout) {
    const controller = new AbortController()
    fetch('url', {
        signal: controller.signal
    })
    setTimeout(() => {
        controller.abort()
    }, timeout)
}


function createFetch(timeout) {
    return (resource, options) => {
        let controller = new AbortController()
        options = options || {}
        options.signal = controller.signal
        setTimeout(() => {
            controller.abort()
        }, timeout)
        return fetch(resource, options)
    }
}

createFetch(100)('url')