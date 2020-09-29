


// ------------------获取类别渲染页面------------
function fn (){
    $.ajax({
        url: '/my/article/cates',
        success: function (res) {
            console.log(res)
            let html = template('tpl-list', res);
            $('tbody').html(html);
        }
    });
}
fn()

// ------------------删除------------------------
$('body').on('click', 'button:contains("删除")', function () {
    let id = $(this).data('id');
    layer.confirm('你确定删除吗？', { icon: 3, title: '提示' }, function (index) {
        $.ajax({
            url: '/my/article/deletecate/' + id,
            success: function (res) {
                layer.msg(res.message);
                if (res.status === 0) {
                    renderCategory();
                }
            }
        });

        layer.close(index);
    });
})
