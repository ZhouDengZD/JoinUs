// version 1.0.0
function ajax(opt){
    opt = opt || {};
    opt.method = opt.method.toUpperCase() || 'POST';//请求类型，默认为POST
    opt.url = opt.url || '';//请求地址，默认为''
    opt.async = opt.async || true;//请求方式，默认异步
    opt.dataType = opt.dataType || 'json';// 预期服务器返回的数据类型，默认为json
    opt.data = opt.data || null;//发送的数据，默认为空
    opt.success = opt.success || DefultSuccess;//请求成功，默认执行DefultSuccess函数
    opt.error = opt.error || DefultError;//请求失败，默认执行DefultError函数

    var xhr = createXML();

    if(opt.async === false){// 同步请求
        if(opt.method.toUpperCase() === 'POST'){// 请求方式为post
            xhr.open('POST', opt.url, false);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(JSON.stringify(opt.data));
        }else if(opt.method.toUpperCase() === 'GET'){
            opt.url = createUrl(opt.url, data);//新增
            xhr.open('GET', opt.url, false);
            xhr.send(null);
        }else{
            throw new TypeError('Your request type error.');
        }
       //对服务器的响应作出回应
        if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
            if(typeof opt.success === 'function'){//success函数存在
                opt.success(xhr.responseText);
            }else{
                DefultSuccess();
            }
        }else{
            if(typeof opt.error === 'function'){//error函数存在
                opt.error(xhr.status);
            }else{
                DefultError();
            }
        }
    }else if(opt.async === true){//异步请求
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                    if(typeof opt.success === 'function'){//success函数存在
                        opt.success(xhr.responseText);
                    }else{
                        DefultSuccess();
                    }
                }else{
                    if(typeof opt.error === 'function'){//error函数存在
                        opt.error(xhr.status);
                    }else{
                        DefultError();
                    }
                }
            }
        };
        if(opt.method.toUpperCase() === 'POST'){// 请求方式为post
            xhr.open('POST', opt.url, true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(JSON.stringify(opt.data));
        }else if(opt.method.toUpperCase() === 'GET'){
            opt.url = createUrl(opt.url, data);//新增
            xhr.open('GET', opt.url, true);
            xhr.send(null);
        }else{
            throw new TypeError('请求错误.');
        }
    }else{
        throw new TypeError('Param `async` requires "true" or "false" only.');
    } 
};

function createXML() {  
    if (typeof XMLHttpRequest != "undefined") {   
        return new XMLHttpRequest();  
    } else if(typeof ActiveXObject != "undefined"){  
        // 适用于IE前 
            try {  
                return new ActiveXObject("Msxml2.XMLHTTP.6.0");  
            } catch (e) {  
                try {  
                    return new ActiveXObject("Msxml2.XMLHTTP.3.0");  
                } catch (e) {  
                    try {  
                        return new ActiveXObject("Msxml2.XMLHTTP");  
                    } catch (e) {  
                    }  
                }  
            }  
    }  else{
        throw new Error('No xhr object available.');
    }
} //新增
function createUrl(url, data){
    if(!data){
        return url;
    }
    for(var k in data){
        url += (url.indexOf('?') === -1 ? '?' : '&');
        url += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
    }
    return url;
}//新增
function DefultSuccess(){ 
    console.log('Your request succeeded.');
};
function DefultError(){
    console.log('Sorry,Your request failed.');
};
//用例
// ajax({
//     //
// });