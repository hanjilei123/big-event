// 获取用户信息，并渲染到页面中
function renderUser() {
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            // console.log(res);
            if (res.status === 0) {
                // 渲染用户的用户名(优先使用nickname，没有nickname，使用username)
                let name = res.data.nickname || res.data.username;
                $('.username').text(name);
                // 渲染头像(优先使用图片类型的头像，其次使用名字的第一个字符)
                if (res.data.user_pic) {
                    // 有图片
                    $('.layui-nav-img').attr('src', res.data.user_pic).show();
                } else {
                    // 没有图片
                    let first = name.substr(0, 1).toUpperCase();
                    $('.avatar').text(first).css('display', 'inline-block');
                }
            }
        }
    });
}
renderUser();








// -------------- 退出功能 -----------------
// 点击退出，询问，删除token，跳转到login.html
$('#logout').on('click', function () {
    layer.confirm('确定退出吗？', { icon: 3, title: '提示' }, function (index) {
        //do something
        // 移除token
        localStorage.removeItem('token');
        // 跳转到login.html
        location.href = '/login.html';

        layer.close(index); // 关闭弹层
    });
});