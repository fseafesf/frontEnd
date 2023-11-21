window.addEventListener('load', function () {
    //获取元素
    let focus = document.querySelector('.focus')
    let arrow_l = document.querySelector('.arrow-l')
    let arrow_r = document.querySelector('.arrow-r')
    let focusWidth = focus.offsetWidth;

    //鼠标经过显示两边箭头
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(() => {
            arrow_r.click()
        }, 2000)
    })

    //动态生成小圆点
    let num = 0;
    let circle = 0;
    let flag = true;
    let ul = focus.querySelector('ul')
    let ol = focus.querySelector('.circle')
    for (let i = 0; i < ul.children.length; i++) {
        let li = document.createElement('li')
        li.setAttribute('data-index', i)
        li.addEventListener('click', function () {
            for (let i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ''
            }
            this.className = 'current'
            //点击小圆圈移动ul
            //点击某个小li 获取索引号
            let index = li.getAttribute('data-index')
            //当我们点击了某个小li 需要将num改变
            num = index
            circle = index

            animate(ul, -index * focusWidth);
        })
        ol.appendChild(li)
    }
    ol.children[0].className = 'current'
    let clone = ul.children[0].cloneNode(true);
    ul.appendChild(clone)

    //点击右侧按钮 滚动一张

    arrow_r.addEventListener('click', function () {
        if(flag){
            flag = false
            if (num == 4) {
                ul.style.left = 0
                num = 0
            }
            num++;
            animate(ul, -num * focusWidth , function(){
                flag = true
            });
            circle++;
            if (circle == 4) {
                circle = 0;
            }
            circleChange()
    
        }
    })

    arrow_l.addEventListener('click', function () {
        if(flag){
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth , function(){
                flag = true
            });
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            circleChange()
        }
    })

    function circleChange() {
        for (let i = 0; i < ol.children.length; i++) {
            ol.children[i].className = ''
        }
        ol.children[circle].className = 'current'
    }

    let timer = setInterval(() => {
        arrow_r.click()
    }, 2000)
})