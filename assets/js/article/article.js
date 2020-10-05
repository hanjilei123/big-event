// 前面加载所需模块
let laypage = layui.laypage;
let form = layui.form;

// ------------------------  获取文章列表并渲染 ----------------------------

// 使用全局变量设置请求参数
let data = {
    pagenum: 1,  // 获取第1页的数据
    pagesize: 2, // 每页显示2条数据
    // cate_id: '',
    // state: ''
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

// 获取第 2 页的数据
// data.pagenum = 2;
// renderArticle();




// ------------------------- 分页 ---------------------------------------
function showPage (t) {
    //执行一个laypage实例
    laypage.render({
        elem: 'page', // 注意，这里的 test1 是 ID，不用加 # 号
        count: t, // 数据总数，从服务端得到
        limit: data.pagesize, // 每页显示条数
        limits: [2, 3, 5, 10], // 下拉框的值，表示每页多少条，下拉框用于更换
        curr: data.pagenum, // 起始页，当前页
        // groups: 10, // 连续出现的页码个数
        // prev: '<<<<',
        layout: [ 'prev', 'page', 'next', 'count', 'limit', 'skip'],
        // 刷新页面 及 页码切换 的时候，会执行jump函数
        jump: function (obj, first) {
            // first: jump第一次触发，first=true;  除此之外，first=undefined
            console.log(first)
            // obj包含了当前分页的所有参数，比如：
            // console.log(obj.curr); // 得到当前页，以便向服务端请求对应页的数据。
            // console.log(obj.limit); // 得到每页显示的条数
            if (first === undefined) {
                data.pagenum = obj.curr;
                data.pagesize = obj.limit;
                renderArticle();
            }
        }
    });
}
// showPage();



// ------------------------- 发送请求，获取所有的分类 -----------------------
$.ajax({
    url: '/my/article/cates',
    success: function (res) {
        // console.log(res)
        var html = template('tpl-category', res)
        $('select[name=category]').html(html);
        // 因为下拉框重新渲染了。所以要调用layui的更新渲染方法
        form.render('select');
    }
});


// ------------------------- 完成筛选功能 -----------------------
$('.search').on('submit', function (e) {
    e.preventDefault();
    // 获取下拉框的值
    let p = $(this).serializeArray();
    // console.log(p);
    // 修改请求参数，发送ajax请求即可
    data.cate_id = p[0].value;
    data.state = p[1].value;
    // 重置一下pagenum（筛选之后，也是应该先看到第1页的数据）
    data.pagenum = 1;
    renderArticle();
})



// -------------------  注册模板过滤器  -------------------
template.defaults.imports.dateFormat = function (str) {
    let date = new Date(str);
    // 获取年月日时分秒
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


// console.log(  dateFormat('2020-08-24 15:44:36.713')  )




// -------------------  删除文章 -------------------
$('body').on('click', 'button:contains("删除")', function () {
    // 获取id
    let id = $(this).data('id');
    // console.log(id);
    // 询问是否要删除
    layer.confirm('是否要删除？', function (index) {

        // 点击确定，执行这里的代码
        $.ajax({
            // url: '/my/article/delete/:id',
            url: '/my/article/delete/' + id,
            success: function (res) {
                // {status: 0, message: 'xxxx'}
                layer.msg(res.message);
                if (res.status === 0) {
                    renderArticle();
                }
            }
        });

        layer.close(index);
    });
})