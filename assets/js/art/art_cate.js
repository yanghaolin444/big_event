$(function () {
    initArtCateList();
    let layer = layui.layer
    let index = null
    let form = layui.form
    $(".btn-add").on("click", function () {
        index = layer.open({
            type:1,
            area: ['500px', '250px'],
            offset: '200px',
            title: '添加文章类别'
            , content: $(".msg").html()
        });
    })
    $(".msg").html(template("dialog-add"))

    function initArtCateList() {
        $.ajax({
            url: "/my/article/cates",
            method: "get",
            success: function (res) {
                let htmlStr = template("tpl-table", res)
                //获取模板引擎渲染好的字符串
                $('tbody').html(htmlStr)
            }
        })
    }
    $('body').on("submit","#form-add",function(e){
        e.preventDefault()
        console.log($(this).serialize())
        $.ajax({
            url:"/my/article/addcates",
            method:"post",
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    console.log(res)
                    return layer.msg("新增分类失败！")
                }
                initArtCateList()
                layer.msg("新增分类成功！")
                layer.close(index);
            }
        })
    })
    let indexEdit =null
    $("table").on("click",'.btn-edit',function(){
        indexEdit = layer.open({
            type:1,
            area: ['500px', '250px'],
            offset: '200px',
            title: '修改文章类别'
            , content: $("#edit").html()
        });
        let id = $(this).attr("data-id")
        $.ajax({
            method:"get",
            url:"/my/article/cates/"+id,
            success:function(res){
                form.val("form-eidt",res.data)
            }
        })
    })
    $("body").on("submit","#form-edit",function(e){
        e.preventDefault()
        $.ajax({
            method:"post",
            url:"/my/article/updatecate",
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    console.log(res)
                    return layer.msg("更新数据失败!")
                }
                layer.msg("更新数据成功！")
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })
    $("body").on("click",".btn-delet",function(e){
        let id = $(this).attr("data-id")
        layer.confirm('确认删除', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method:"get",
                url:"/my/article/deletecate/"+id,
                success:function(res){
                    if(res.status !== 0){
                        console.log(res)
                        return layer.msg("删除分类失败！")
                    }
                    layer.msg("删除分类成功")
                    layer.close(index)
                    initArtCateList()
                }
            })
          });
    })
})