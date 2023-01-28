$.ajaxPrefilter(function (options) {
    options.url = "http://www.liulongbin.top:3007" + options.url
    //set headers
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || ''
        }
    }
    //complete
    options.complete = function(res){
        if(res.responseJSON.status === 1&&res.responseJSON.message ==="身份认证失败！"){
          localStorage.removeItem("token")
          location.href = "http://127.0.0.1:5500/node/%E5%A4%A7%E4%BA%8B%E4%BB%B6%E9%A1%B9%E7%9B%AE/login.html"
        }
      }
})