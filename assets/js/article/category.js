


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