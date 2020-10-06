// 最开头，加载所需的模块
let form = layui.form;
$.ajax({
    url: '/my/article/cates',
    success: function (res) {
        let html = template('tpl-category', res);
        $('select[name=cate_id]').html(html);
        form.render('select');
    }
});
initEditor();

// --------------------  使用剪裁插件 ----------------------------------
let $image = $('#image');
let options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
};
$image.cropper(options);
$('button:contains("选择封面")').on('click', function () {
    $('#file').trigger('click');
})
$('#file').on('change', function () {
    let fileObj = this.files[0];
    let url = URL.createObjectURL(fileObj);
    $image.cropper('destroy').attr('src', url).cropper(options);
})
// ------------------- 完成添加功能 -------------------
$('form').on('submit', function (e) {
    e.preventDefault();
    let fd = new FormData(this);
    fd.set('content', tinyMCE.activeEditor.getContent());
    let canvas = $image.cropper('getCroppedCanvas', {
        width: 400,
        height: 280
    });
    canvas.toBlob(function (blob) {
        fd.append('cover_img', blob);
        $.ajax({
            type: 'POST',
            url: '/my/article/add',
            data: fd,
            processData: false,
            contentType: false,
            success: function (res) {
                layer.msg(res.message);
                if (res.status === 0) {
                    location.href = '/article/article.html';
                }
            }
        });
    });
});