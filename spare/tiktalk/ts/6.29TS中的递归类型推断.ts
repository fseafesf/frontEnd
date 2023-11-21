type curried<A, R> = A extends []
  ? () => R
  : A extends [infer Arg]
  ? (param: Arg) => R
  : A extends [infer Arg1, ...infer Reset]
  ? (param: Arg1) => curried<Reset, R>
  : never;

// A是入参列表 R是返回类型
declare function curry<A extends any[], R>(
  fn: (...args: A) => R
): curried<A, R>;

function sum(a: number, b: string, c: object) {
  return a + b + c;
}

const currySum = curry(sum);
currySum(1)("2")({});
