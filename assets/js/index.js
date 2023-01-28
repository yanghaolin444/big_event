$(function () {
  getUserInfo()
  $(".usernews").on("mouseover", function () {
    $(".usernews").addClass("layui-this")
    $("#icon").hide()
    $("#icon-down").show()
  })
  $(".usernews").on("mouseout", function () {
    $(".usernews").removeClass("layui-this")
    $("#icon").show()
    $("#icon-down").hide()
  })
  $(".usermag").on("mouseover", function () {
    $(".usermag").addClass("layui-this")
  })
  $(".usermag").on("mouseout", function () {
    $(".usermag").removeClass("layui-this")
  })
  $(".back").on("mouseover", function () {
    $(".back").addClass("layui-this")
  })
  $(".back").on("mouseout", function () {
    $(".back").removeClass("layui-this")
  })
  layui.use('dropdown', function () {
    var dropdown = layui.dropdown
    dropdown.render({
      elem: '#demo1' //可绑定在任意元素中，此处以上述按钮为例
      , data: [{
        title: '基本资料'
        , id: 100
        , href: './user/user_info.html',
        target : "fm"
      }, {
        title: '更换头像'
        , id: 101
        , href: './user/user_avatar.html' //开启超链接
        ,
        target : "fm"
      }, {
        title: '重置密码'
        , id: 102
        , href: './user/re_password.html' //开启超链接
        ,
        target : "fm"
      }]
      , id: 'demo1'
      //菜单被点击的事件
      , click: function (obj) {
        console.log(obj);
      }
    });
  });
  $(".back").on("click", function () {
    layer.confirm('您确定要退出吗?', { icon: 3, title: '提示' }, function (index) {
      localStorage.removeItem("token")
      location.href = "http://127.0.0.1:5500/node/%E5%A4%A7%E4%BA%8B%E4%BB%B6%E9%A1%B9%E7%9B%AE/login.html"
      layer.close(index);
    });
  })
})
function getUserInfo() {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    // headers: {
    //   Authorization: localStorage.getItem("token") || ''
    // },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg("获取用户信息失败！")
      }
      if (res.data.nickname !== "") {
        document.querySelector("#user").innerHTML = " " + res.data.nickname
      } else {
        document.querySelector("#user").innerHTML = " " + res.data.username
      }
      renderAvatar(res.data)
    },
    // complete:function(res){
    //   if(res.responseJSON.status === 1&&res.responseJSON.message ==="身份认证失败！"){
    //     localStorage.removeItem("token")
    //     location.href = "http://127.0.0.1:5500/node/%E5%A4%A7%E4%BA%8B%E4%BB%B6%E9%A1%B9%E7%9B%AE/login.html"
    //   }
    // }
  })
}
// 渲染用户的头像
function renderAvatar(user) {
  if (user.user_pic !== null) {
    // 3.1 渲染图片头像
    $('.userimg')
      .attr('src', user.user_pic)
  }
}

