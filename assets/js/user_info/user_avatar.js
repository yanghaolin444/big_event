$(function () {
    let layer = layui.layer
    let $image = $("#image")//获取裁剪区的dom元素
    const options = {//配置选项
        aspectRatio: 1,//纵横比,例如4/11《裁剪框的形状》
        preview: ".img-preview"//指定预览区域
    }
    $image.cropper(options)//创建裁剪区域
    $("#btnChooseImage").on("click", function () {
        $("#file").click()
    })
    $("#file").on("change", function (e) {
        let fileList = e.target.files//拿到提交的文件
        let newImageUrl = URL.createObjectURL(fileList[0])
        $image.cropper("destroy")//销毁旧的裁剪区域
            .attr("src", newImageUrl)//重新设置文件
            .cropper(options)//重新初始化裁剪区域

        if (fileList.length === 0) {
            return layer.msg("请选择照片")
        }
    })//当提交文件发生改变时，触发长事件
    $("#btnUpload").on("click",function(){
        //拿到裁剪完的头像
        let dataURL = $image.cropper("getCroppedCanvas",{
            width:100,
            height:100
        }).toDataURL("image/png")//将canvas画布上的内容转换为base64格式的字符串
        $.ajax({
            url:"/my/update/avatar",
            method:"post",
            data:{avatar:dataURL},
            success:function(res){
                if(res.status !== 0){
                    return layer.msg("更换头像失败")
                }
                layer.msg("更换头像成功")
                window.parent.getUserInfo()
            }
        })
    })
    
})
