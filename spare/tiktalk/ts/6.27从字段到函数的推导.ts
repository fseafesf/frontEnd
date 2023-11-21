type Watcher<T> = {
  // on 函数约束泛型 因为不能用Symbol约束
  on<K extends string & keyof T>(
    eventName: `${K}Changed`,
    callback: (oldValue: T[K], newValue: T[K]) => void
  ): void;
};

declare function watch<T>(obj: T): Watcher<T>;

const personWatcher = watch({
  firstname: "John",
  lastname: "Doe",
  age: 30,
});

personWatcher.on("ageChanged", (oldValue: number, newValue: number) =>
  console.log(oldValue, newValue)
);
