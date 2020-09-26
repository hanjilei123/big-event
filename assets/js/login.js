
// -----------------  切换两个盒子 --------------------
$('.login a').click(function () {
    $('.login').hide().next().show();
});

$('.register a').click(function () {
    $('.login').show().next().hide();
});


// -----------------  注册 --------------------
// 找到注册的表单，注册submit事件
$('.register form').on('submit', function (e) {
    e.preventDefault();
    // 收集用户填写的账号和密码
    let data = $(this).serialize();
    // console.log(data);
    $.ajax({
        type: 'POST',
        url: 'http://ajax.frontend.itheima.net/api/reguser',
        data: data,
        success: function (res) {
            // 无论成功还是失败，给出提示
            layer.msg(res.message);
            if (res.status === 0) {
                // 清空输入框的值
                $('.register form')[0].reset();
                // 注册成功，让登录的盒子显示；
                $('.login').show().next().hide();
            }
        }
    });
});


// ----------------- 自定义验证规则 -------------
// 使用layui的内置模块，必须先加载模块
// let 变量 = layui.模块名;
let form = layui.form;
// 调用form模块的verify方法，自定义验证规则
form.verify({
    // 键: 值,
    // 键: 值,
    // 规则: 数组/函数
    // len: ['验证规则', '验证不通过时的提示']
    len: [/^\S{6,12}$/, '你的密码长度不行'], // {6,12} 不是 {6, 12}

    same: function (val) {
        // 函数的形参 val，表示使用验证规则的输入框的值
        // 确认密码使用了该验证规则，所以形参 val ==== 用户输入的确认密码
        // 获取输入的密码
        let pwd = $('.register .pwd').val();
        if (pwd !== val) {
            // return '验证不通过是的提示';
            return '两个密码不一样';
        }
    }
});

// -----------------  登录 --------------------
// 找到登录的表单，注册submit事件
$('.login form').on('submit', function (e) {
    e.preventDefault();
    // ajax提交
    $.ajax({
        type: 'POST',
        url: 'http://ajax.frontend.itheima.net/api/login',
        data: $(this).serialize(), // 使用serialize，一定要检查name属性
        success: function (res) {
            // 无论登录成功，还是失败，都给提示
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