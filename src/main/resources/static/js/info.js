/**
 * Created by 周邓 on 2017/12/6.
 */

function ajaxTest(currentPage) {
    var option = {
        method: 'post',
        // async:false,
        url: '/getAllInfo',
        data: { rows: 10, pageNo: currentPage },
        dataType: 'json',
        success: function (data) {
            var rows=10;//每页显示条数

            var display = document.getElementById('display');
            display.innerHTML = '';//清空页面当前信息

            var Data = JSON.parse(data);//将Json字符串解析
            Data.forEach(function(obj,index){
                if(index != (Data.length-1)){
                    var sec = document.createElement('section');
                    display.appendChild(sec);
                    // 添加标题
                    var Uid = document.createElement('p');
                    Uid.setAttribute("class","h5 left");
                    var S = document.createElement('strong')
                    var name = document.createTextNode(obj['name']);
                     S.appendChild(name);
                    Uid.appendChild(S);
                    sec.appendChild(Uid);
                    // 添加主体
                    var SelfIntro = document.createElement('div');
                    SelfIntro.setAttribute("class","Selfintroduction");
                    var selfbriefly = document.createTextNode(obj['selfbriefly']);
                    SelfIntro.appendChild(selfbriefly);
                    sec.appendChild(SelfIntro);
                    //添加其余详细信息
                    var Details = document.createElement('p');
                    var pro = document.createTextNode(obj['professional']+' / ');
                    Details.appendChild(pro);
                    var tel = document.createTextNode(obj['tel']+' / ');
                    Details.appendChild(tel);
                    var email = document.createTextNode(obj['email']);
                    Details.appendChild(email);
                    sec.appendChild(Details);

                }
            });
            scrollTo(0,0);//回到顶部
            //分页
            $("#pagination").paging({
                rows:rows,//每页显示条数
                pageNo: currentPage,//当前所在页码
                totalPage: Data[Data.length-1]['totalPage'],//总页数   修改
                totalSize:Data[Data.length-1]['totalSize'],//总记录数
                callback: function (currentPage) {
                    ajaxTest(currentPage);
                }
            })
        },
        error: function () {
            alert('获取消息失败！');
        }
    }
    ajax(option);
    
    // $.ajax({
    //     type: 'get',
    //     url: '/getAllInfo',
    //     data: { rows: "10", pageNo: currentPage },
    //     dataType: 'json',
    //     success: function (data) {
    //         var rows=10;//每页显示条数
    //         var clear='';
    //         $('#display').html(clear);//清空页面当前信息
    //         $.each(data, function (index, obj) {
    //             if(index!=(data.length-1)){
    //                 var sec = $('<section></section>');
    //                 // 添加标题
    //                 var Uid = $('<p class="h5 left"></p>');
    //                 Uid.append('<strong>' + obj['name'] + '</strong>');
    //                 sec.append(Uid);
    //                 // 添加主体
    //                 var SelfIntro = $('<div class="Selfintroduction"></div>');
    //                 SelfIntro.append(obj['selfbriefly']+'<br/>');
    //                 sec.append(SelfIntro);
    //                 //添加其余详细信息
    //                 var Details = $('<p></p>');
    //                 Details.append(obj['professional'] + '&nbsp;&nbsp;&nbsp;/&nbsp;' + obj['tel'] + '&nbsp;&nbsp;&nbsp;/&nbsp;' + obj['email']);
    //                 sec.append(Details);
    //                 $('#display').append(sec);
    //             }
    //         });
    //         //分页
    //         $("#pagination").paging({
    //             rows:rows,//每页显示条数
    //             pageNo: currentPage,//当前所在页码
    //             totalPage: data[data.length-1]['totalPage'],//总页数
    //             totalSize:data[data.length-1]['totalSize'],//总记录数
    //             callback: function (currentPage) {
    //                 ajaxTest(currentPage);
    //             }
    //         })
    //     },
    //     error: function () {
    //         alert('获取消息失败！');
    //     }
    // });
};
ajaxTest(1);//初始化
