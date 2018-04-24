let xhr = new XMLHttpRequest();
xhr.open('get', 'simple.txt', true);//创建请求
xhr.send();//发送请求
//响应请求
xhr.onload = function () {
    console.log(this.responseText);
}



// const services = {
//
// }
