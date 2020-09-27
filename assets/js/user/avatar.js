// ------------------------ 实现基本的剪裁效果 ----------------------
// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
  
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options);


// ------------------------ 点击 上传 可以选择图片 ----------------------
$('button:contains("上传")').on('click', function () {
    // 触发文件域的单击事件
    $('#file').trigger('click');
});


// ------------------------ 更换剪裁区的图片 ---------------------------
$('#file').on('change', function () {
    // console.dir(this)
    // 1. 找到文件对象
    let fileObj = this.files[0];
    // 2. 为文件对象生成一个临时的url
    let url = URL.createObjectURL(fileObj);
    // console.log(url);
    // 销毁剪裁区  --->  更换剪裁区的图片  --->  重建剪裁区
    // $image.cropper('destroy');
    // $image.attr('src', url);
    // $image.cropper(options);
    $image.cropper('destroy').attr('src', url).cropper(options);
});


// ------------------------ 点击确定，完成更换 ---------------------------
$('button:contains("确定")').on('click', function () {
    // 1. 完成剪裁，得到canvas图片
    let canvas = $image.cropper('getCroppedCanvas', {
        width: 100,
        height: 100
    });
    // 2. 把图片转成字符串形式
    let str = canvas.toDataURL('image/png');
    // console.log(str);
    // 3. ajax提交字符串即可
    $.ajax({
        type: 'POST',
        url: '/my/update/avatar',
        data: {
            avatar: str
        },
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) {
                // 调用父页面的函数，重新渲染头像
                window.parent.renderUser();
            }
        }
    });
})