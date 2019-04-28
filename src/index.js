import React from 'react';
import ReactDOM from 'react-dom';
import Main from './content/Main';


ReactDOM.render(
  <Main />,
  document.getElementById('app'),
);
// console.log(hot,'212121')
// if(module.hot){
//   console.log(module.hot);
//   module.hot.accept('./content/Main',()=>{
//     const NextMain = require('./content/Main');
//     console.log(NextMain,'我是nextmain')
//     ReactDOM.render(<NextMain />,document.getElementById('app'));
//   })
// }