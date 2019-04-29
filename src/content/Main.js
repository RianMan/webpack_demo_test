import React from 'react';
import { hot } from 'react-hot-loader/root';
import Button from './Button/Button';
import List from './List';


function Main(props){
    return (
        <div>
            <List list={['jack','bob','shawVi']} />
            <Button ghost>确定</Button>
            <Button type="danger">取消</Button>
        </div>)
}

export default hot(Main);
