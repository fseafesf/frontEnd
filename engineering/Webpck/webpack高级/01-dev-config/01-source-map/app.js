class A {
    constructor(){
        this.str = 'hello-webpack'
    }
    sayHello(){
        console.log(this.str)
    }
}
let a = new A
a.sayHello()