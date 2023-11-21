async function getUser() {
  return await fetch("url");
}

function m1() {
  return getUser();
}

function m2() {
  return m1();
}

function main() {
  const user = m2();
  return user;
}

function run(func) {
  let cache = [];
  let i = 0;
  const originFetch = window.fetch;
  window.fetch = (...args) => {
    if (cache[i]) {
      if (cache[i].status === "fuifilled") {
        return cache[i].data;
      } else if (cache[i].status === "rejected") {
        throw cache[i].err;
      }
    }
    const result = {
      status: "pending",
      data: null,
      err: null,
    };
    cache[i++] = result;
    // 发送请求
    const param = originFetch(...args)
      .then((resp) => resp.json())
      .then(
        (resp) => {
          (result.status = "fulfilled"), (result.data = resp);
        },
        (err) => {
          (result.status = "rejected"), (result.err = err);
        }
      );
    // 报错
    throw param;
  };
  try {
    func();
  } catch (error) {
    if (error instanceof Promise) {
      const reRun = () => {
        i = 0;
        func();
      };
      error.then(reRun, reRun);
    }
  }
}

run(main);
