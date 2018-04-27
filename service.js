export function service(url, type, data) {
    let promise = new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(type, url, true);//创建请求
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8' );
        xhr.send(data && JSON.stringify(data));//发送请求
        //响应请求
        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4 && xhr.status === 200){
                try {
                    let response = JSON.parse(xhr.responseText);
                    resolve(response);
                } catch (err){
                    reject(err);
                }
            }
        }
    });
    return promise;
}
