// 获取用户信息，并渲染到页面中
function renderUser() {
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            // console.log(res);
            if (res.status === 0) {
                let name = res.data.nickname || res.data.username;
                $('.username').text(name);
                if (res.data.user_pic) {
                    $('.layui-nav-img').attr('src', res.data.user_pic).show();
                } else {
                    let first = name.substr(0, 1).toUpperCase();
                    $('.avatar').text(first).css('display', 'inline-block');
                }
            }
        }
    });
}
renderUser();
// -------------- 退出功能 -----------------
$('#logout').on('click', function () {
    layer.confirm('确定退出吗？', { icon: 3, title: '提示' }, function (index) {
        localStorage.removeItem('token');
        location.href = '/login.html';
        layer.close(index);
    });
});