function getValue<T, k extends keyof T>(obj: T, name: k): T[k] {
    return obj[name]
}

let obj = {
    sex: '男',
    age: 18,
    name: '小王'
}

console.log(getValue(obj, 'age'))