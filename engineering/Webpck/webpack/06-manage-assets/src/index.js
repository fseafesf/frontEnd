import helloworld from "./hello-world";
import imgsrc from './assets/background.jpg'
import txt from './assets/1.txt'
import './style.css'
import './style.less'
helloworld()

const img = document.createElement('img');
img.src = imgsrc
document.documentElement.appendChild(img)

let div = document.createElement('div');
div.classList.add('block-bg');
div.textContent = txt;

document.body.appendChild(div);
div.classList.add('hello')