
// -----------------  切换两个盒子 --------------------
$('.login a').click(function () {
    $('.login').hide().next().show();
});

$('.register a').click(function () {
    $('.login').show().next().hide();
});
// -----------------  注册 --------------------
$('.register form').on('submit', function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: '/api/reguser',
        data: data,
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) {
                $('.register form')[0].reset();
                $('.login').show().next().hide();
            }
        }
    });
});


// ----------------- 自定义验证规则 -------------
let form = layui.form;
form.verify({
    len: [/^\S{6,12}$/, '你的密码长度不行'], 
    same: function (val) {
        let pwd = $('.register .pwd').val();
        if (pwd !== val) {
            return '两个密码不一样';
        }
    }
});
// -----------------  登录 --------------------
$('.login form').on('submit', function (e) {
    e.preventDefault();
    // ajax提交
    $.ajax({
        type: 'POST',
        url: '/api/login',
        data: $(this).serialize(),
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0){
                // 登录成功，保存token
                localStorage.setItem('token', res.token);
                // 跳转到后台首页 index.html
                location.href = '/index.html'
            }
        }
    })
})