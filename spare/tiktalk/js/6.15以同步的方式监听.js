function getElement(cssSelector) {
  const dom = document.querySelector(cssSelector);
  const domProxy = new Proxy(dom, {
    get(target, key) {
      if (!key.startsWith("wait")) {
        return target[key];
      }
      const event = key.replace("wait", "").toLowerCase();
      return new Promise((reslove, reject) => {
        target.addEventListener(event, reslove, { once: true });
      });
    },
  });
  return domProxy;
}

(async () => {
  const btn = getElement("button");
  while (1) {
    const e = await btn.waitClick;
    console.log("button clicked", e);
  }
})();
