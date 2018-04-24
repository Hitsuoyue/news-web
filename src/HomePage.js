import React, {Component} from 'react';

export default class HomePage extends Component{
    render(){
        let xhr = new XMLHttpRequest();
        xhr.open('get', 'http://localhost:3000', true);//创建请求
        xhr.send();//发送请求
        //响应请求
        xhr.onload = function () {
            console.log(this, this.responseText);
        }
        return(
            <div>HomePage</div>
        )
    }
}
