import helloworld from "./hello-world";
import imgsrc from './assets/background.jpg'
import txt from './assets/1.txt'
helloworld()

const img = document.createElement('img');
img.src = imgsrc
document.documentElement.appendChild(img)

let div = document.createElement('div');
div.textContent = txt;
document.body.appendChild(div);