
// -----------------  切换两个盒子 --------------------
$('.login a').click(function () {
    $('.login').hide().next().show();
});

$('.register a').click(function () {
    $('.login').show().next().hide();
});