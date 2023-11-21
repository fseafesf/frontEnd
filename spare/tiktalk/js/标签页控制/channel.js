function createId(name) {
    const key = `channel${name}`
    let id = + localStorage.getItem(key)
    if (!id) {
        id = 0
    }
    id++;
    localStorage.setItem(key, id.toString())
    return id
}

function sendMessage(msg, channel) {
    channel.postMessage({
        id: channel.id,
        msg
    })
}
function createChannel(name) {
    let channel = new BroadcastChannel(name)
    channel.id = createId(name)
    channel.listeners = new Set();
    sendMessage('嘿', channel)
    window.addEventListener('unload', () => {
        sendMessage('哦豁', channel)
    })

    channel.addEventListener('message', (e) => {
        if (e.data.msg === '嘿') {
            sendMessage('哈', channel)
            channel.listeners.add(e.data.id)
        }
        else if (e.data.mag === '哈') {
            channel.listeners.add(e.data.id)
        }
        else if (e.data.mag === '哦豁') {
            channel.listeners.delete(e.data.id)
        }
    })
    return channel
}