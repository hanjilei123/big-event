// 加载layui的表单模块
let form = layui.form;

// 完成数据回填 或者叫做 为表单赋值 
function renderForm () {
    // 发送ajax请求，获取用户的信息
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            // console.log(res);
            // 完成数据回填
            // $('input[name=username]').val(res.data.username);
            // $('input[name=nickname]').val(res.data.nickname);
            // $('input[name=email]').val(res.data.email);
            // layui已经封装了数据回填的方法，叫做快速为表单赋值

            /**
             * abc ==== 表单的 lay-filter 属性值
             * 对象的键 ==== 表单项的name属性值
             */

            // form.val("abc", {
            //     username1: 'aaa',
            //     nickname: 'bbb',
            //     email: 'ccc'
            // });
            form.val('abc', res.data);
        }
    });
}

renderForm();





// ----------------------  点击提交按钮，完成修改操作 ---------------------
$('form').on('submit', function (e) {
    e.preventDefault();
    // 如果一个表单项是disabled状态，那么不能通过serialize收集到该项数据
    let data = $(this).serialize();
    // console.log( data );
    // ajax提交
    $.ajax({
        type: 'POST',
        data: data,
        url: '/my/userinfo',
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) {
                // 调用父页面的函数，重新渲染头像和欢迎语部分
                window.parent.renderUser();
            }
        }
    });
});



// ---------------------  完成重置 ------------------
$('button[type=reset]').on('click', function (e) {
    e.preventDefault();
    renderForm();
})