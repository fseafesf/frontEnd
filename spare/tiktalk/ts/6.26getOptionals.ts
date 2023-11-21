type getOptionals<T> = {
  [P in keyof T as T[P] extends Required<T>[P] ? never : P]: T[P];
};

interface testOption {
  main: string;
  optional1?: number;
  optional2?: string;
}

let keys: getOptionals<testOption>;

type User = {
  name: string;
  age: number;
};

type UserAction = {
  [P in keyof User as `get${P}`]: () => User[P];
};

const a: Promise<string> = Promise.resolve().then(() => Promise.resolve("a"));
