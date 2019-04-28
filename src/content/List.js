import React from 'react';


function List(props){
    const { list = [] } = props;
    const color = ['orange','red','skyblue']
    console.log(list)
    return (
        <ul>    
            {list.map((v,index) => <li style={{color: color[index] }} key={v}>{v}</li>)}
        </ul>
    )
}

export default List;