import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './Button.css';

console.log(styles)

function Button(props){
    return (
    <button 
        className={ props.type || 'primary' } 
    >
        {props.children}
    </button>
    );
};
export default Button;