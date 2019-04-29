import React from 'react';
import styles from './Button.less';

function Button(props){
    console.log(props);
    console.log(122);
    return (
    <button 
        {...props} 
        className={styles[props.type] || styles.primary } 
    >
        {props.children}
    </button>
    );
};
export default Button;