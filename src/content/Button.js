import React from 'react';

function Button(props){
    console.log(props.style);
    return (
    <button style={props.style}>
        {props.children}
    </button>
    );
};
export default Button;