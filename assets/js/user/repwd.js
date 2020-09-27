// 自定义验证规则

/**
 * 验证长度 （三个输入框都需要）
 * 验证新密码不能和原密码相同 （新密码使用该验证规则）
 * 验证两次新密码必须一致 （确认密码使用该验证规则）
 */

// 先加载模块
let form = layui.form;
form.verify({
    // 验证长度 （三个输入框都需要）
    len: [/\S{6,12}/, '长度6~12位，你数数是吗'],

    // 验证新密码不能和原密码相同 （新密码使用该验证规则）
    diff: function (val) {
        // 形参表示新密码，所以还需要获取原密码
        let oldPwd = $('.oldPwd').val();
        if (oldPwd === val) {
            return '新密码不能和原密码一样';
        }
    },

    // 验证两次新密码必须一致 （确认密码使用该验证规则）
    same: function (val) {
        // 形参表示确认密码，所以还需要获取新密码
        let newPwd = $('.newPwd').val();
        if (newPwd !== val) {
            return '两次密码不一样，好好看看';
        }
    }
});





// -------------------- 完成重置密码功能 -----------------------
$('form').on('submit', function (e) {
    e.preventDefault();
    // 收集填写的各项值
    let data = $(this).serialize(); // 一定要检查表单各项的name属性值
    // console.log(data);
    $.ajax({
        type: 'POST',
        url: '/my/updatepwd',
        data: data,
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) {
                // 情况输入框的值
                $('form')[0].reset();
            }
        }
    });
});