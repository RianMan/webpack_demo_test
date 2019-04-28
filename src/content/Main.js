import React from 'react';
import { hot } from 'react-hot-loader/root';
import Button from './Button';
import List from './List';

function Main(props){
    return (
        <div>
            <List list={['jack','bob','shawVi']} />
            <Button style={{backgroundColor:'skyblue',color:"#fff"}}>取消</Button>
        </div>)
}

export default hot(Main);
