// 统一配置Ajax请求
$.ajaxPrefilter(function (option) {
    // console.log(option);
    // 统一配置url
    option.url = 'http://ajax.frontend.itheima.net' + option.url;

    // 判断url里面有没有 /my/ 
    if (option.url.includes('/my/')) {
        // 统一配置headers
        option.headers = {
            Authorization: localStorage.getItem('token')
        }
        // 统一配置complete
        option.complete = function (xhr) {
            if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {
                // 说明用户使用了过期的token或者假token
                // 1. 删除假token
                localStorage.removeItem('token');
                // 2. 跳转到登录页
                location.href = '/login.html';
            }
        }
    }
});