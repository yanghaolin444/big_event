$(function () {
    let form = layui.form
    let layer = layui.layer
    form.verify({
        nickname: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (value.length > 6) {
                return "昵称长度必须在6个字符之间"
            }
        }
    });
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            method: "get",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg("获取用户信息失败")
                }
                //表单快速赋值和取值操作
                form.val("formUserInfo", res.data);
            }
        })
    }
    $("#btnReset").on("click",function(e){
        e.preventDefault();
        initUserInfo()
    })
    //监听表单提交事件
    $(".layui-form").on("submit",function(e){
        e.preventDefault()
        $.ajax({
            method: "post",
            url: "/my/userinfo",
            data:$(this).serialize(),//快速拿到表单填写的数据
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg("更新用户信息失败！")
                }
                layer.msg("更新用户信息成功！")
                //调用父页面中的方法
                window.parent.getUserInfo()
                // console.log($(".layui-form").serialize())
            }
        })
    })
})