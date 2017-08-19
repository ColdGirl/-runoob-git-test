/**
 * Created by Administrator on 2017/8/15 0015.
 */
$(function () {
    bindclick();
    getIndexMenu();
    getDissale();

})
function getIndexMenu() {
    $.ajax({
        url: url + 'api/getindexmenu',
        success: function (result) {
            //准备模板
            //绑定数据和模板
            var indexMenuHtml = template('indexMenuTemplate', result);
            $('#menu .row').html(indexMenuHtml);
        }
    })
}
function getDissale() {
    $.ajax({
        url: url + 'api/getmoneyctrl',
        success: function(result){
            var html = template('dissaleListTemplate',result);
            $('#dissale #dissaleList').html(html);
        }
    })
}

function bindclick(){
    $('#icon').click(function(){
        $('html,body').animate({scrollTop:0},1000);
        return false;
    })
    $('#menu').on('click',$('#menu .item:nth-child(8)'),function(){
       $('#menu .item:nth-last-child(-n+4)').toggle();
    });

}

