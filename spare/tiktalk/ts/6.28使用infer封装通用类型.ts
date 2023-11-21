type sum = (a: number, b: number) => number;
type concat = (a: any[], b: any[]) => any[];

// 得到函数返回值的类型
type Return<T> = T extends (...args: any[]) => infer R ? R : never;

type sumResult = Return<sum>;
type concatResult = Return<concat>;

// 得到Promise的类型
type PromiseType<T> = T extends Promise<infer U> ? PromiseType<U> : T;
type pt = PromiseType<Promise<Promise<number>>>;

// 得到函数第一个参数的类型
type FirstArg<T> = T extends (firstArg: infer K, ...args: any[]) => void
  ? K
  : T;
type fa = FirstArg<(name: string, age: number) => void>;

// 得到数组每一项的类型
type ArrayType<T> = T extends (infer R)[] ? R : T;

type ItemType1 = ArrayType<[string, number]>;
type ItemType2 = ArrayType<[string, number, boolean]>;

function foo(bar: string) {
  return { baz: 1 };
}

//  inside your app, if you need { baz: number }
type FooReturn = typeof foo; //

type Person = {
  name: string;
  age: number;
};

const person: Person = {
  name: "1",
  age: 19,
};

type PersonKeys = keyof typeof person;
