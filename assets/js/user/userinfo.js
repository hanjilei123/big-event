
let form = layui.form;
function renderForm () {
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            form.val('abc', res.data);
        }
    });
}
renderForm();
// ----------------------  点击提交按钮，完成修改操作 ---------------------
$('form').on('submit', function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
        type: 'POST',
        data: data,
        url: '/my/userinfo',
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) {
                window.parent.renderUser();
            }
        }
    });
});
$('button[type=reset]').on('click', function (e) {
    e.preventDefault();
    renderForm();
})