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
        , href: '#'
      }, {
        title: '更换头像'
        , id: 101
        , href: '#' //开启超链接
      }, {
        title: '重置密码'
        , id: 102
        , href: '#' //开启超链接
      }]
      , id: 'demo1'
      //菜单被点击的事件
      , click: function (obj) {
        console.log(obj);
      }
    });
  });
})
function getUserInfo() {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    headers: {


      Authorization: localStorage.getItem("token") || ''
    },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg("获取用户信息失败！")
      }
      renderAvatar(res.data)//渲染用户头像

    }
  })
}
function renderAvatar(user) {
  let name = user.nickname || user.username

}