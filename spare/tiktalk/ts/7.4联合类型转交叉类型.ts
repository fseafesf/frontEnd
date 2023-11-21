type UnionTest<T> = (T extends any ? (x: T) => any : never) extends (
  x: infer U
) => any
  ? U
  : never;

type test = UnionTest<{ a: string } | { b: number } | { c: boolean }>;

type d1<T> = T extends any ? (x: T) => any : never;
type d1Test = d1<{ a: string } | { b: number } | { c: boolean }>;
