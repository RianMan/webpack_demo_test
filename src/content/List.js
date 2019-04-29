import React from 'react';


function List(props){
    const { list = [] } = props;
    const color = PRODUCTION ? ['orange','red','skyblue'] : ['blue','red','green']
    return (
        <ul>    
            {list.map((v,index) => <li style={{color: color[index] }} key={v}>{v}</li>)}
        </ul>
    )
}

export default List;