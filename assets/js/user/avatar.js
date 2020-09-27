// ------------------------ 实现基本的剪裁效果 ----------------------
var $image = $('#image')
const options = {
  aspectRatio: 1,
  preview: '.img-preview'
}
$image.cropper(options);

// ------------------------ 点击 上传 可以选择图片 ----------------------
$('button:contains("上传")').on('click', function () {
    $('#file').trigger('click');
});

// ------------------------ 更换剪裁区的图片 ---------------------------
$('#file').on('change', function () {
    let fileObj = this.files[0];
    let url = URL.createObjectURL(fileObj);
    $image.cropper('destroy').attr('src', url).cropper(options);
});


// ------------------------ 点击确定，完成更换 ---------------------------
$('button:contains("确定")').on('click', function () {
    let canvas = $image.cropper('getCroppedCanvas', {
        width: 100,
        height: 100
    });
    let str = canvas.toDataURL('image/png');
    $.ajax({
        type: 'POST',
        url: '/my/update/avatar',
        data: {
            avatar: str
        },
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) {
                window.parent.renderUser();
            }
        }
    });
})