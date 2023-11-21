function animate(obj, target, callback) {
    console.log(callback);
    //先清除以前的定时器
    clearInterval(obj.timer);
    obj.timer = setInterval(() => {
        //把步长值改为整数
        let num =
            target - obj.offsetLeft > 0
                ? Math.ceil((target - obj.offsetLeft) / 10)
                : Math.floor((target - obj.offsetLeft) / 10);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            callback && callback();
        } else {
            obj.style.left = obj.offsetLeft + num + "px";
        }
    }, 15);
}