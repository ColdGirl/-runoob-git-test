/*** Created by Administrator on 2017/8/18 0018.*/
$(function(){
    getRequest();
    console.log(getRequest());//{category: "空调", categoryid: "1"}
    var arr = getRequest();
    //获取面包屑的导航上面的分类名称
    var productTitle = arr['category'];
    $('#plisttitle').html(productTitle);

    var productTitleid = arr['categoryid'];//分类id
    var pageid = 1;
    var totalSize = 0;

    getproductList(productTitleid,pageid,totalSize);
});

function getproductList(productTitleid,pageid,totalSize){
    $.ajax({
        url: url + 'api/getproductlist' ,
        data: {
            categoryid: productTitleid,
            pageid: pageid
        },
        success: function(data){
            var html = template('productlistTemplate',{data:data.result});
            $('#productListContent').html(html);

            totalSize = Math.ceil(data.totalCount / data.pagesize);
            var str = "";

            for ( var i = 0 ; i < totalSize ; i++){
                str += '<option value=' + (i+1) + '> ' + (i+1) + '</option>'
            }
            $('#productListSelect').html(str);
            $('#productListSelect option').each(function(I,item){
                if((i+1) == pageid){
                    $(item).attr('selected','selected');
                }
            });
        },
        complete:function(){
            $('#btnPre').unbind('click').click(function(){
                if(pageid === 1) return false;
                pageid--;
                console.log(pageid);
                $('#productListSelect option').attr('selected','selected');
                getproductList(productTitleid,pageid);
            });
            $('#btnNext').unbind('click').click(function(){
                if(pageid == totalSize) return false;
                pageid++;
                console.log(pageid);
                getproductList(productTitleid,pageid);
            });
            $('#productPage #productListSelect').change(function(){
                //console.log();
                pageid = $(this).val();
                getproductList(productTitleid,pageid);
            })
        }


    })
}

//获取地址栏的参数
function getRequest() {
    var url = window.location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            //就是这句的问题
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
            //之前用了unescape()
            //才会出现乱码
        }
    }
    return theRequest;
}