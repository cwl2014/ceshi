/**
 * 公共
 * Created by stephenz117 on 2017/3/25.
 */

function loginout() {
    if(confirm("确定要退出吗？")){
        $.get("/login/quit",function (re) {
            if(re.status == 200){
                window.location.href='/login';
            }else{
                alert(re.msg);
            }
        });
    }
}

shequRegexValidator = {
    "mobile":/^1[34578]{1}\d{9}$/,
    "password":/^\S{6,15}$/,
    "smsVerify":/^[a-z0-9]{4,6}$/
};

SqApi = {
            "confirm":function(msg,option,callback1,callback2){
                SqApi.count++;
                var count = SqApi.count;
                var funcItem = {
                    "func1":callback1,
                    "func2":callback2
                };
                var btnItem = option.btn == undefined? ["取消","确定"]:option.btn;
                var btn = "";
                var title = option.title == undefined?"信息":option.title;
                $(btnItem).each(function(index,ele){
                    btn += "<a class='sqjr-btn' index='"+index+"'>"+ele+"</a>";
                });
                var Bombbox="";
                    Bombbox+="<div class='Bombbox' id='sq-bombox-"+count+"'>"+"<div class='shadow'></div>"+"<div class='Popup'>"+"<h4>"+title+"</h4>"+"<span>"+msg+"</span>"+"<p class='Popup_Btn'>"+btn+"</p>"+"</div>"+"</div>";

                $("html").append(Bombbox);
                var p_length = $(".Popup_Btn").children('a').length;
                $(".sqjr-btn").click(function(){
                    var index = $(this).attr("index");
                    console.log(p_length);
                    if (p_length == 1) {
                        if(funcItem.func1 !=undefined && funcItem.func1 !=null){
                            funcItem.func1();
                        }
                        SqApi.close(count);
                    }else if (p_length == 2) {
                        if(index == 0){
                            funcItem.func2();
                            SqApi.close(count);
                        }else if (index == 1) {
                            funcItem.func1();
                            SqApi.close(count);
                        }else{
                            console.log("没有第三个事件参数！");
                        };
                    };
                    
                })
                return count;
            },
            "msg":function(msg,option){
                SqApi.count++;
                var count = SqApi.count;
                var time = 3000;
                var title = "";
                if(option != undefined && option != null){
              
                    title = (option.title==undefined || option.title == null)?"":option.title;
                    time = (option.time==undefined || option.time == null)?3000:option.time;

                }

                var Bombbox="<div class='sq-bombox-msg smsPopup' id='sq-bombox-"+count+"'> <div class='Popup'>"+"<h4>"+title+"</h4>"+"<span>"+msg+"</span></div></div>";
                $("body").append(Bombbox);  
                console.log(Bombbox)          
                var t =  setTimeout(function () {
                    SqApi.close(count);
                    clearTimeout(t);
                },time);
                return count;
            },
            "count":0,
            "close":function (index) {
                $("#sq-bombox-"+index).remove();
            }
        };
    function showMsg(){
        SqApi.confirm("按实际的科技",{"btn":["取消","确定"]},function(){
            alert("第一个")
        },function(){
            alert("第二个")
        });
    }