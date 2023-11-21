const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  #state = PENDING;
  #result = null;
  #handlers = [];

  constructor(excutor) {
    const reslove = (data) => {
      this.#changeState(FULFILLED, data);
    };
    const reject = (reason) => {
      this.#changeState(REJECTED, reason);
    };
    // 这里决定了Promise是捕获不到异步错误的
    try {
      excutor(reslove, reject);
    } catch (error) {
      reject(error);
    }
  }

  // 判断是不是promise
  #isPromise(value) {
    if (
      value !== null &&
      (typeof value === "object" || typeof value === "function")
    ) {
      return typeof value.then === "function";
    }
    return false;
  }

  // 该变Promise状态
  #changeState(state, result) {
    if (this.#state !== PENDING) return;
    this.#state = state;
    this.#result = result;
    this.#run();
  }

  // 执行微任务
  #runMicaroTask(callback) {
    if (typeof process === "object" && typeof process.nextTick === "function") {
      process.nextTick(callback);
    } else if (typeof MutationObserver === "function") {
      const ob = new MutationObserver(callback);
      const textNode = document.createTextNode("1");
      ob.observe(textNode, {
        characterData: true,
      });
      textNode.data = "2";
    } else {
      setTimeout(callback, 0);
    }
  }

  #runOne(callback, reslove, reject) {
    this.#runMicaroTask(() => {
      if (typeof callback !== "function") {
        const settled = this.#state === FULFILLED ? reslove : reject;
        settled(this.#result);
        return;
      } else {
        try {
          const data = callback(this.#result);
          if (this.#isPromise(data)) {
            data.then(reslove, reject);
          } else {
            reslove(data);
          }
        } catch (error) {
          reject(error);
        }
      }
    });
  }

  #run() {
    if (this.#state == PENDING) return;
    while (this.#handlers.length) {
      const { onfulfilled, onrejected, reslove, reject } =
        this.#handlers.shift();
      if ((this.#state = FULFILLED)) {
        this.#runOne(onfulfilled, reslove, reject);
      } else {
        this.#runOne(onrejected, reslove, reject);
      }
    }
  }

  then(onfulfilled, onrejected) {
    return new MyPromise((resolve, reject) => {
      this.#handlers.push({ onfulfilled, onrejected, resolve, reject });
      this.#run();
    });
  }
}

const p = new MyPromise((reslove, reject) => {
  setTimeout(() => {
    reslove(100);
  }, 1000);
});

p.then((res) => {
  console.log(res);
});
