// 想要排除单独一个类型 可以给它一个类型约束 假如成立的话就将它的类型置为never
type Bandent<T, E> = T extends E ? never : T;
function log<T>(x: Bandent<T, Date>) {
  console.log(x);
}
log("band");

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type MyExclude<T, U> = T extends U ? never : T;
type test = MyExclude<"a" | "b", "a">;

type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type MyConstructorParameters<T extends (...args: any) => any> = T extends (
  ...args: infer R
) => any
  ? R
  : never;

type MyReturnType<T> = T extends (...args: any) => infer R ? R : never;
