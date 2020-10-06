
let laypage = layui.laypage;
let form = layui.form;

// ------------------------  获取文章列表并渲染 ----------------------------
let data = {
    pagenum: 1, 
    pagesize: 2, 
};

function renderArticle() {
    $.ajax({
        url: '/my/article/list',
        data: data,
        success: function (res) {
            console.log(res);
            let html = template('tpl-list', res);
            $('tbody').html(html);

            // Ajax请求成功之后，调用showPage，展示分页页码
            showPage(res.total);
        }
    });
}
renderArticle();
// ------------------------- 分页 ---------------------------------------
function showPage (t) {
    laypage.render({
        elem: 'page',
        count: t, 
        limit: data.pagesize, 
        limits: [2, 3, 5, 10],
        curr: data.pagenum, 
        layout: [ 'prev', 'page', 'next', 'count', 'limit', 'skip'],
        jump: function (obj, first) {
            console.log(first)
            if (first === undefined) {
                data.pagenum = obj.curr;
                data.pagesize = obj.limit;
                renderArticle();
            }
        }
    });
}
// ------------------------- 发送请求，获取所有的分类 -----------------------
$.ajax({
    url: '/my/article/cates',
    success: function (res) {
        var html = template('tpl-category', res)
        $('select[name=category]').html(html);
        form.render('select');
    }
});
// ------------------------ 完成筛选功能 -----------------------
$('.search').on('submit', function (e) {
    e.preventDefault();
    let p = $(this).serializeArray();
    data.cate_id = p[0].value;
    data.state = p[1].value;
    data.pagenum = 1;
    renderArticle();
})



// -------------------  注册模板过滤器  -------------------
template.defaults.imports.dateFormat = function (str) {
    let date = new Date(str);
    let y = date.getFullYear();
    let m = addZero(date.getMonth() + 1);
    let d = addZero(date.getDate());
    let h = addZero(date.getHours());
    let i = addZero(date.getMinutes());
    let s = addZero(date.getSeconds());
    return y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s;
}

function addZero (n) {
    return n < 10 ? '0' + n : n ;
}
// -------------------  删除文章 -------------------
$('body').on('click', 'button:contains("删除")', function () {
    let id = $(this).data('id');
    layer.confirm('是否要删除？', function (index) {
        $.ajax({
            url: '/my/article/delete/' + id,
            success: function (res) {
                layer.msg(res.message);
                if (res.status === 0) {
                    renderArticle();
                }
            }
        });
        layer.close(index);
    });
})