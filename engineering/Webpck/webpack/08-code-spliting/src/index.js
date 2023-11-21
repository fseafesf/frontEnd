import helloworld from "./hello-world";
import imgsrc from './assets/background.jpg'
import txt from './assets/1.txt'
import './style.css'
import './style.less'
import './async-module'
helloworld()

const img = document.createElement('img');
img.src = imgsrc
document.documentElement.appendChild(img)

let div = document.createElement('div');
div.classList.add('block-bg');
div.textContent = txt;

document.body.appendChild(div);
div.classList.add('hello')

const button = document.createElement('button');
button.textContent = 'dianji';
button.addEventListener('click',() => {
    // 动态加载  预加载
    import(/* webpackChunkName:'math' ,webpackPrefetch:true */'./math.js').then(({add}) => {
        console.log(add(4,5))
    })
})
document.body.appendChild(button);