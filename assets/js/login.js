$(function () {
    $("#login-box").on("click", function () {
        $(".login-box").hide()
        $(".reg-box").show()
    })
    $("#reg-box").on("click", function () {
        $(".login-box").show()
        $(".reg-box").hide()
    })
    let form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value, item) {
            let pwd = $(".reg-box [name=password]").val()
            if (pwd !== value) {
                return "两次密码不一致"
            }
        }
    })
    $("#form_reg").on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            method: "post",
            url: "/api/reguser",
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                return layer.msg(res.message)
            }
        })
    })
    $("#form_login").on("submit",function(e){
        e.preventDefault()
        // console.log($(this).serialize())
        $.ajax({
            method:"post",
            url:"/api/login",
            method:"post",
            data:$(this).serialize(),//快速获取表单的数据,
            success:function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                localStorage.setItem("token",res.token)
                location.href = "/node/大事件项目/index.html"
            }
        })
    })
})