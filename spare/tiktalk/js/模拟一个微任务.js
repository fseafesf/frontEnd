function async(func) {
    if (typeof Promise !== 'undefined') {
        Promise.resolve().then(func);
    }
    else if (typeof MutationObserver !== 'undefined') {
        const ob = new MutationObserver(func)
        const textNode = document.createTextNode('a')
        ob.observe(textNode, {
            characterData: true
        })
        textNode.data = '1'
    }
    else {
        setTimeout(func)
    }
}