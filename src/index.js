require('./index.css');
import hello from './es6';
import obj from '../ast/loadshExample';

document.getElementById('app').innerHTML = 'hello webpack';
let imgSrc = require('./1.png');
let img = new Image();
img.src = imgSrc;
document.body.appendChild(img);