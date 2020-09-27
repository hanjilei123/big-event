
// 先加载模块
let form = layui.form;
form.verify({
    len: [/\S{6,12}/, '长度6~12位'],
    diff: function (val) {
        let oldPwd = $('.oldPwd').val();
        if (oldPwd === val) {
            return '新密码不能和原密码一样';
        }
    },
    same: function (val) {
        let newPwd = $('.newPwd').val();
        if (newPwd !== val) {
            return '两次密码不一样';
        }
    }
});

// -------------------- 重置密码功能 -----------------------
$('form').on('submit', function (e) {
    e.preventDefault();
    let data = $(this).serialize(); 
    $.ajax({
        type: 'POST',
        url: '/my/updatepwd',
        data: data,
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) {
                $('form')[0].reset();
            }
        }
    });
});