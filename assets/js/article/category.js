


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
// ----------------------  删除分类 ---------------------
$('body').on('click', 'button:contains("删除")', function () {
    let id = $(this).data('id');
    layer.confirm('你确定删除吗？', { icon: 3, title: '提示' }, function (index) {
        $.ajax({
            url: '/my/article/deletecate/' + id,
            success: function (res) {
                layer.msg(res.message);
                if (res.status === 0) {
                    fn();
                }
            }
        });
        layer.close(index);
    });
})
// ----------------------  点击添加出现坦诚 ---------------------
let addIndex;
$('button:contains("添加类别")').on('click', function () {
    addIndex = layer.open({
        type: 1,
        title: '添加类别',
        content: $('#tpl-add').html(),
        area: ['500px', '250px']
    });
})
// ---------------------- 完成添加 ---------------------
$('body').on('submit', '.add-form', function (e) {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: '/my/article/addcates',
        data: $(this).serialize(),
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) {
                fn();
                layer.close(addIndex);
            }
        }
    });
})

// ----------------------  点击 编辑 --------------------------
let editIndex;
$('body').on('click', 'button:contains("编辑")', function () {
    let data = $(this).data();
    data.Id = data.id;
    console.log(data);
    editIndex = layer.open({
        type: 1,
        title: '编辑类别',
        content: $('#tpl-edit').html(),
        area: ['500px', '250px'],
        success: function () {
            let form = layui.form;
            form.val('xxx', data);
        }
    });
})
// ---------------------- 点击确认修改---------------------
$('body').on('submit', '.edit-form', function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: '/my/article/updatecate',
        data: data,
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) {
                fn();
                layer.close(editIndex);
            }
        }
    });
})