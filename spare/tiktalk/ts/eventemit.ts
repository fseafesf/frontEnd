type Listener = (...args: any[]) => void

type EventInfo = {
    listener: Listener,
    back?: Listener
}

function createOnceListener(sub: Pubsub, EventName: string | symbol, listener: Listener) {
    const onceListener: Listener = (...args: any[]) => {
        listener(...args)
        sub.off(EventName, listener)
    }
    return onceListener
}

class Pubsub {
    private EventMap: Record<string | symbol, EventInfo[]> = {}
    on = (EventName: string | symbol, listener: Listener) => {
        if (!this.EventMap[EventName]) {
            this.EventMap[EventName] = []
        }
        this.EventMap[EventName].push({ listener })
        return this
    }

    off = (EventName: string | symbol, listener: Listener) => {
        if (this.EventMap[EventName]) {
            this.EventMap[EventName].filter(item => {
                if (item.back) {
                    return item.back !== listener
                }
                return item.listener !== listener
            })
        }
    }

    emit = (EventName: string | symbol, ...args: any[]) => {
        this.EventMap[EventName].forEach(item => {
            item.listener(args)
        })
        return this
    }

    once = (EventName: string | symbol, listener: Listener) => {
        const onceListener = createOnceListener(this, EventName, listener)
        if (!this.EventMap[EventName]) {
            this.EventMap[EventName] = []
        }
        this.EventMap[EventName].push({
            listener: onceListener,
            back: listener
        })
    }
}