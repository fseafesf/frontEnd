type JSTypeName = keyof JSTypeMap;

type JSTypeMap = {
  string: string;
  number: number;
  boolean: boolean;
  undefined: undefined;
  null: null;
  object: object;
  function: Function;
  date: Date;
  symbol: symbol;
};

type ArgsType<T extends JSTypeName[]> = {
  [I in keyof T]: JSTypeMap[T[I]];
};

declare function addImple<T extends JSTypeName[]>(
  ...args: [...T, (...args: ArgsType<T>) => any]
): void;

addImple("string", "number", "symbol", (a, b, c) => {
  console.log(a + b, c);
});

let t1 = typeof addImple
