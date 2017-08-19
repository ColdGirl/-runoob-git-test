/*** Created by Administrator on 2017/8/16 0016.*/
$(function(){
    getcategoryTitle();
    getcategoryContent();
});
function getcategoryTitle(){
    $.ajax({
        url: url + 'api/getcategorytitle',
        success:function(result){
            var html = template('categroyTemplate',result);
            $('.categoryUU').html(html);
        }
    })
}

function getcategoryContent(){
    $('.categoryUU').on('click','.categoryTitle',function(){
        // $(this).css('borderBottom','1px solid #ccc');
        var tid = parseInt($(this).attr('titleId'));
        var that = this;
        $.ajax({
            url: url + 'api/getcategory',
            data: {
            titleid: tid
        },
        success: function(result){
            var html = template('categroyContentTemplate',result);
            $('.categoryContent' + tid).html(html);
        },
        complete:function(){
            $('.categoryList').hide();
            $('.categoryContent' + tid).show();

            $(that).parent().find('i').css('backgroundImage','url("http://www.zuyushop.com/wap/images/arrow2.gif")');
            $(that).find('i').css('backgroundImage','url("http://www.zuyushop.com/wap/images/arrow1.gif")');

           // $(that).css('borderBottom','none');
        }

    });
        $('.categoryContent' + tid).slideToggle();

})
}
