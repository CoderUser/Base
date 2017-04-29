/*------------------GLOBAL-------------------*/
AjaxUrl = {
    IsLogin: 's.do?j=l&p=8&c=13944',  //是否登录

    LeftTimes: 's.do?j=l&p=8&c=13935',  //剩余次数

    LuckyDraw: 's.do?j=l&p=8&c=13940',  //抽奖

    History: 's.do?j=l&p=8&c=13931',  //中奖历史

    PhoneNumber: 's.do?j=l&p=8&c=13945'  //手机号码


};

//login
var DBY4AjaxUrl = {
    duihuanjihuoma : '/pams2/l/s.do?j=l&p=72&c=6597',
    chaxunjihuoma : '/pams2/l/s.do?j=l&p=72&c=6965',
    isLogin : "s.do?j=l&p=72&c=6666"
};
var HE5Url = {
    checkMMB : 's.do?j=l&p=72&c=8332',
    dhMMB : 's.do?j=l&p=72&c=8333',
    isLogin : "s.do?j=l&p=72&c=6666",
    loginUrl : 's.do?j=l&p=72&c=204&bUrl=' + encodeURIComponent(getQueryString()),

};
var musicV4AjaxUrl = {
    //1.不同类型歌单兼所有歌单地址
    getMusicUrl : 's.do?c=4958&j=l&p=84'
};

//一共有几期
gTotalQi = 0;
//当前期数
gCurQi = 0;
//音乐对象
audio = new Audio();
//一共有几首歌
gTotalShou = 3;
//当前是第几首
gCurShou = 1;
//题目信息
var gQuestionInfoData;
//倒计时定时器
timeSpanInterval = 0;

/*------------------FUNCTION-------------------*/
//文字弹窗
//获取弹出窗口的top值
function popHeight(popDiv) {
    var _scrollHeight = window.pageYOffset;
    //获取当前窗口距离页面顶部高度
    var _windowHeight = window.innerHeight;
    //获取当前窗口高度
    var _popupHeight = popDiv.height();
    //获取弹出层高度
    _popupHeight = parseFloat(_popupHeight) || 0;
    _posiTop = (_windowHeight - _popupHeight) / 2 + _scrollHeight;
    return _posiTop;
}

//弹出窗口--宽度定义为150px
var popMsgHideTimer;
function popMsg(txt) {
    var popMsgObj = $('#popMsg');
    if (popMsgObj.length <= 0) {
        var popMsg = document.createElement('div');
        $(popMsg).attr('id', 'popMsg')
        $('body').append(popMsg);
        popMsgObj = $('#popMsg');
    }
    popHeight(popMsgObj);
    popMsgObj.css({
        'position' : 'absolute',
        'left' : '50%',
        'marginLeft' : '-85px',
        'top' : _posiTop + 'px',
        'background' : '#333',
        'opacity' : '0.8',
        'borderRadius' : '5px',
        'padding' : '10px',
        'color' : '#fff',
        'textAlign' : 'center',
        'width' : '150px',
        'z-index' : '99999'
    });
    if (!txt) {
        popMsgObj.show().text("网络不给力哦！");
    } else {
        popMsgObj.show().html(txt);
    }
    if (popMsgHideTimer) {
        clearTimeout(popMsgHideTimer);
    }
    popMsgHideTimer = setTimeout('$("#popMsg").hide()', 2500);
}
function popMsgClass(className, html, css) {

    var popMsgObj = $('.' + className);
    if (popMsgObj.length <= 0) {
        var popMsg = document.createElement('div');
        $(popMsg).attr('class', className)
        $('body').append(popMsg);
        popMsgObj = $('.' + className);
    }
    var _scrollHeight = window.pageYOffset;
    //获取当前窗口距离页面顶部高度
    var tempHeight = window.innerHeight;
    //获取当前窗口高度
    var _popupHeight = popMsgObj.height();
    //获取弹出层高度
    _popupHeight = parseFloat(_popupHeight) || 0;
    _posiTop = (tempHeight - _popupHeight) / 2 + _scrollHeight;
    if (!css || css == "") {

        popMsgObj.css({
            'position' : 'fixed',
            //'top' : _posiTop + 'px',
            'top' : '40%',
            'left' : '50%'
            /*'marginLeft' : '-150px'*/
        });
    } else {
        popMsgObj.css(css);
    }
    if (!html) {
        popMsgObj.show().html("<h6>网络不给力哦！<h6>");
    } else {
        popMsgObj.show().html(html);
    }
    setTimeout(function() {
        $('.' + className).hide();
    }, 2000);
}

//查询登录
function checkLogin(btn, callback) {
    $.ajax({
        type : 'get',
        url : HE5Url.isLogin,
        success : function(data) {
            var data = ' ' + data + ' ';
            data = data.trim();
            if (data == 'true') {
                callback.apply(btn);
            } else {
                //改为提示登录
                location.href = HE5Url.loginUrl;
                //popMsg("请先登录");
            };
        },
        error : function() {
            popMsg('网络不给力哦...');
        }
    });
}

//获取url的？号后面的字符串
function getQueryString() {
    var strHref = location.href;
    var intPos = strHref.indexOf("?");
    return strHref.substr(intPos + 1);
}

//获取手机号码
function getphoneNumber(){
    $.ajax({
        type: "get",
        url: AjaxUrl.PhoneNumber,
        dataType: "html",
        success: function (data) {
            //处理手机号码数据
            console.log(data);

            var _phoneNumber = data;

            $('.page5-detail').find('.page5-number .page5-number-span').html(_phoneNumber);

        },
        error: function () {
            console.log('ajax error: getPhoneNumber');
        }
    });
}

//跑马灯
function notice() {
    if ($('#noticeId')) {
        notice()
    }
    function notice() {
        var _this = $('#noticeId');
        var timeInterval = _this.attr('time');
        timeInterval = (timeInterval != '5') ? timeInterval : 5;
        timeInterval = timeInterval * 1000;
        var nLen = _this.find('span').length;
        var nHeight = _this.find('span').height();
        var n = 1;
        setInterval(function() {
            _this.css({
                'webkitTransitionDuration' : '300ms',
                'MozTransitionDuration' : '300ms',
                'msTransitionDuration' : '300ms',
                'OTransitionDuration' : '300ms',
                'transitionDuration' : '300ms',
                'webkitTransform' : 'translate(0,-' + nHeight * n + 'px) translateZ(0)',
                'MozTransform' : 'translate(0,-' + nHeight * n + 'px) translateZ(0)',
                'msTransform' : 'translate(0,-' + nHeight * n + 'px) translateZ(0)',
                'OTransform' : 'translate(0,-' + nHeight * n + 'px) translateZ(0)',
                'transform' : 'translate(0,-' + nHeight * n + 'px) translateZ(0)'
            });
            n++;
            n = (n >= nLen) ? 0 : n;
        }, timeInterval);
    }

}
function noticeGuess() {
    if ($('#noticeGuessId')) {
        noticeGuess()
    }
    function noticeGuess() {
        var _this = $('#noticeGuessId');
        var timeInterval = _this.attr('time');
        timeInterval = (timeInterval != '5') ? timeInterval : 5;
        timeInterval = timeInterval * 1000;
        var nLen = _this.find('span').length;
        var nHeight = _this.find('span').height();
        var n = 1;
        setInterval(function() {
            _this.css({
                'webkitTransitionDuration' : '300ms',
                'MozTransitionDuration' : '300ms',
                'msTransitionDuration' : '300ms',
                'OTransitionDuration' : '300ms',
                'transitionDuration' : '300ms',
                'webkitTransform' : 'translate(0,-' + nHeight * n + 'px) translateZ(0)',
                'MozTransform' : 'translate(0,-' + nHeight * n + 'px) translateZ(0)',
                'msTransform' : 'translate(0,-' + nHeight * n + 'px) translateZ(0)',
                'OTransform' : 'translate(0,-' + nHeight * n + 'px) translateZ(0)',
                'transform' : 'translate(0,-' + nHeight * n + 'px) translateZ(0)'
            });
            n++;
            n = (n >= nLen) ? 0 : n;
        }, timeInterval);
    }

}
//倒计时
//function timing(){
//    var setTime;
//    $(document).ready(function(){
//        var time=parseInt($("#time").text());
//        setTime=setInterval(function(){
//            if(time<=0){
//                clearInterval(setTime);
//                return;
//            }
//            time--;
//            $("#time").text(time);
//        },1000);
//    });
//}


//1.获取第几期题目
function getqueston(index){
    var newNum = 1;
    ///////////////////////获取当前期数要猜的题目
    $.ajax({
        type: "get",
        url:'s.do?j=l&p=8&c=14155',
        //url:'http://a.10086.cn:7071/pams2/l/s.do?j=l&p=8&c=14155',
        data:{
            newType:newNum,//接口功能产生  1 获取当前期数要猜的题目  2. 验证用户提交的答案  3. 获取用当前期数已经猜对的题目 4. 判断某一期用户是否参与
            activitySeq:index
        },
        dataType: "json",
        timeout: 8000,
        success: function (data) {
            console.log(data);
            gQuestionInfoData = data;
           // var gCurShou=1;
            //展示第一题
            showIndexQuestion(gCurShou);
            //倒计时
            //timing();
            //绑定选项
            $('.song-list').on('click','.songName',function(){
                 statistics("musicAnwer", "anwer", "click", "in");
                //用户选择的选项index
                var index = $(this).attr('index');

                //提交答案
                postAnswer(index);
            });


        }

    });
}

//2.展示第几个题目
function showIndexQuestion(index){
    var i = index-1;
    var data = gQuestionInfoData;

    //1.展示题目信息
    var len = data.musics.length;
    var data = data;
    var code = data.code;
    var sHtml = '';
    var questionHtml = '';
    var questionid = data.musics[i].id;//题目id
    var questionname = data.musics[i].questionName;//问题名称
    //显示标题
    questionHtml = '<span>'+questionname+'</span>';
    $('.page2-top').html(questionHtml);
    //显示选项
    for(var j=0; j<data.musics[i].options.length; j++){
        var optionNo = data.musics[i].options[j].optionNo;//答案编号
        var optionName = data.musics[i].options[j].optionName;//答案名称
        sHtml += '<div class="songName" index=\"' +j+ '\"><span> '+ optionName +' </span></div>';
    }
    $('#songList').html(sHtml);

    //2.显示秒数变回60
    clearInterval(timeSpanInterval);
    $(".left-time").html(60);

    //3.播放音乐i
    var songId = data.musics[i].songId;//音乐Id
    getMusicUrlMe(songId);
}

//3.音乐播放
function playMusic(musicId, musicUrl) {
    if (musicUrl.length < 5) {
        popMsg("本首歌曲暂时不提供试听");
        audio.src='';
        /*$("span[id='" + musicId + "']").eq(musicIndex).html("");
         playingMusicId = 0;
         playingMusicIndex = -1;
         //把别的歌停了
         clearInterval(intervalIdTimeSpan);*/
        return;
    }

    var reg = new RegExp("&amp;", "g");
    musicUrl = musicUrl.replace(reg, "&");
    audio.src = musicUrl;
    audio.load();
    var loadedMetaData = false;
    audio.addEventListener("loadedmetadata", function() {
        loadedMetaData = true;
    });

    var checkreadyIntervalId = setInterval(function() {
        var timeInterval;
        if (/UCBrowser/.test(navigator.userAgent)) {
            loadedMetaData = true;
        }
        if (audio.readyState > 2 && loadedMetaData) {
            clearInterval(checkreadyIntervalId);
            audio.play();
            timeInterval = timeSpan(musicId);
        } else {
        }
    }, 1000);

}
function getMusicUrlMe(musicId) {

    //iphone
    if (/i(Phone|P(o|a)d)/.test(navigator.userAgent)) {
        //alert("is apple");

        var musicSrcAjax = false;
        var ajaxSrc = "";
        $.ajax({
            type : 'post',
            url : musicV4AjaxUrl.getMusicUrl,
            data : {
                mgId : musicId
            },
            success : function(data) {
                console.log(data);

                //data = 'http://tyst.migu.cn/public/ringmaker01/n16/2017/02/2017%E5%B9%B402%E6%9C%8827%E6%97%A510%E7%82%B905%E5%88%86%E7%B4%A7%E6%80%A5%E5%86%85%E5%AE%B9%E5%87%86%E5%85%A5%E5%8D%8E%E8%8D%A3%E6%96%87%E5%8C%96%E9%A2%84%E7%95%991%E9%A6%96/%E5%85%A8%E6%9B%B2%E8%AF%95%E5%90%AC/Mp3_40_16_16/%E8%AE%A9%E4%B8%96%E7%95%8C%E6%AF%81%E7%81%AD%28%E7%94%B5%E5%BD%B1%E9%87%91%E5%88%9A%E7%8B%BC3%E6%AE%8A%E6%AD%BB%E4%B8%80%E6%88%98%E5%AE%A3%E4%BC%A0%E6%8E%A8%E5%B9%BF%E6%9B%B2%29-%E6%9E%97%E5%AE%A5%E5%98%89.mp3?channelid=08&amp;msisdn=23a62a3c-2ebd-490f-8ee4-741d023a269c'
                musicSrcAjax = true;
                ajaxSrc = data;
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                /*popMsg(false);
                 //playMusic(musicId,"music/Kalimba.mp3");
                 $("span[id='" + musicId + "']").eq(musicIndex).html("");
                 playingMusicId = 0;
                 playingMusicIndex = -1;*/
                console.log('ajax错误：getMusicUrl');

            }
        });
        var ajaxInterval = setInterval(function() {
            if (musicSrcAjax) {
                playMusic(musicId, ajaxSrc);
                statistics("musicPlay", "play", "click", "in");
                clearInterval(ajaxInterval);
            }
        }, 1000);
    }
    //android
    else {
        $.ajax({
            type : 'post',
            url : musicV4AjaxUrl.getMusicUrl,
            data : {
                mgId : musicId
            },
            success : function(data) {
                playMusic(musicId, data);
                statistics("musiclistPlay", "play", "click", "in");
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                console.log('ajax错误：getMusicUrl');
            }
        });
    }
}
//修改成分钟：秒的形式
function timeDispose(number) {
    if (isNaN(number)) {
        return "暂未获得";
    }
    var minute = parseInt(number / 60);
    var second = parseInt(number % 60);
    minute = minute >= 10 ? minute : "0" + minute;
    second = second >= 10 ? second : "0" + second;
    return minute + ":" + second;
}
function timeSpan() {
    clearInterval(timeSpanInterval);
    gTime = 60;
    timeSpanInterval = setInterval(function() {
        var currentTime = timeDispose(audio.currentTime);
        //var timeAll = timeDispose(audio.duration);
        //var timeAll = timeDispose(gTime);

        //$(".left-time").html(currentTime + "&nbsp;/&nbsp;" + timeAll);
        $(".left-time").html(gTime);
        gTime--;
        //播放完
        if(gTime<0){
            audio.pause();
            clearInterval(timeSpanInterval);
            gTime = 60;
        }

    }, 1000);
    return timeSpanInterval;
}

//4.提交答案 index为用户选的选项index
function postAnswer(index){
    var curShou = gCurShou - 1;
    var questionId = gQuestionInfoData.musics[curShou].id;
    var questionSeq = gQuestionInfoData.musics[curShou].questionSeq;
    var questionNo = gQuestionInfoData.musics[curShou].questionNo;
    var optionNo = gQuestionInfoData.musics[curShou].options[parseInt(index)].optionNo;

    $.ajax({
        type: "get",
        url:'s.do?j=l&p=8&c=14155',
        //url:'http://a.10086.cn:7071/pams2/l/s.do?j=l&p=8&c=14155',
        data:{
            newType:2,//接口功能产生  1 获取当前期数要猜的题目  2. 验证用户提交的答案  3. 获取用当前期数已经猜对的题目 4. 判断某一期用户是否参与
            activitySeq:gCurQi,
            questionId: questionId, //获取当前题目id
            questionSeq:questionSeq, //获取当前题目序号
            questionNo:questionNo, //获取当前题目编号
            optionNo:optionNo  //获取用户当前选择的答案选项
        },
        dataType: "json",
        timeout: 8000,
        success: function (data) {
            console.log('ww:');
            console.log(data);
            /*var code = data.code;// 1该期为已经过期活动不参与抽奖 0 活动未开始 2正常活动 可参加抽奖
            var desc = data.desc; //code为0值 该值为提示用户改期活动为开始

            // 1 允许提交，并保存用户的答案成功 -1 允许提交，但是保存用户的答案出错了
            // -9 允许提交，但是题目或选项不存在 -8 允许提交，但是用户手机号不正确
            // 9 不允许提交。比如，只允许提交一次，但是多次提交。
            var correctAnswer = data.correctAnswer// 用户回答正确返回 true 错误返回 false
            var count = data;*/

            //判断用户选择的答案对错
            var resultCode = data.result.resultCode;
            //判断是否是最后一题
            var lastQuestionOfActivieyPeriod = data.result.lastQuestionOfActivieyPeriod;
            if(resultCode == 1){//允许提交

                var correctAnswer = data.result.correctAnswer;
                if(correctAnswer == true){
                    var jhtml = '<span class="optionRight"></span>';

                    //var jhtml = '<img class="optionRight" src="http://p.i139.cn/nmpfs/media/p/image/20170313/132/134/9013/11735225.png">';
                    //改变选中选项的样式
                    $('#songList').find('.songName').eq(index).append(jhtml);

                }else{
                    //改变选中选项的样式
                    var jhtml = '<span class="optionerror"></span>';

                    //var jhtml = '<img class="optionRight" src="http://p.i139.cn/nmpfs/media/p/image/20170313/132/134/9013/11735257.png">';
                    $('#songList').find('.songName').eq(index).append(jhtml);

                    //$('#songList').find('.songName').eq(index).addClass('introfalse');
                }

            }
            if(resultCode == 9){

                $('#page2').css('visibility','hidden');
                $('#page5').css('visibility','hidden');
                //$('#page6').css('visibility','hidden');

                $('#page1').css('visibility','visible');
                //隐藏马上挑战按钮
                $('.page1-bottom').css('display','none');
                //显示查看上一期按钮
                $('.page1-bottom-on').css('display','block');
                //显示提示语
                $('.page7-top').css('display','block');
                //显示跑马灯
                $('.radiated').css('display','block');
                //显示音乐，视频，图书div
                $('.endadd').css('display','block');
                $('.page1,.m-page,.m-page1').css('height','auto');
                $('.down').show();

                popMsg('您已经参与过此期猜猜猜了！');

                //判断是在微信还是浏览器内的分享
                $(".page6-bottom").on("click",function(){
                    statistics("musicShare", "share", "click", "in");
                    var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
                    if (ua.match(/MicroMessenger/i) == "micromessenger") {
                        //在微信中打开
                        $("#alertWeixin").css("display", "block");

                    } else {
                        //否则就是浏览器打开
                        $("#alertOtherBox").css("display", "block");
                    }
                });

            }
            if(resultCode == -1){
                popMsg('保存答案出错了！')
            }
            // -9 允许提交，但是题目或选项不存在 -8 允许提交，但是用户手机号不正确
            if(resultCode == -9){
                popMsg('您已答过此题或选项不存在')

            }
            if(resultCode == -8){
                popMsg('您的手机号码有误')

            }
            //5.当期已猜中题目数
            several();

            setTimeout(function(){
                gCurShou++;
                if(gCurShou>gTotalShou){
                    gCurShou = gTotalShou;
                    //停止音乐
           
                    audio.pause();

                    //展示分享页面
                    var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
                    //分享页面
                    checkLogin(this, function() {
                        $("#page6").css("display", "block");
                        $("#page6").css("z-index", "120");
                        $("#page2").hide();
                        gCurShou=1;
                    });

                    //判断是在微信还是浏览器内的分享
                    $(".page6-bottom").on("click",function(){

                        var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
                        if (ua.match(/MicroMessenger/i) == "micromessenger") {
                            //在微信中打开
                            $("#alertWeixin").css("display", "block");
                             init();

                        } else {
                            //否则就是浏览器打开
                            $("#alertOtherBox").css("display", "block");
                             init();
                        }
                    });


                }else{
                    //展示下一题
                    
                    showIndexQuestion(gCurShou);
                }
            },1000);

       //返回首页
                        $("#page6").find('.back').on('click',function(){
                            $("#page6").hide();
                             back();
                             audio.src='';
                             //audio.currentTime = pauseTime;
                             $('.m-page1').show();
                             $("#page1").removeClass("page1-hide").addClass("page1-show");
                        })

            //点击隐藏微信/浏览器的提示浮层
            $("#alertWeixin").find('.box').on("click", function(){
                $("#alertWeixin").css("display", "none");

            });
            $("#alertOtherBox").find('.box').on("click", function(){
                $("#alertOtherBox").css("display", "none");

            });

        },
        error : function() {
            popMsgSign('提交答案失败');
        }
    });
}

//复制链接
function init() {
    clip = new ZeroClipboard.Client();
    clip.setHandCursor(true);   
    clip.addEventListener('mouseOver', function (client) {
    // update the text on mouse over
    clip.setText( $('.xiaobobo').value );
    });
    
    clip.addEventListener('complete', function (client, text) {
    //debugstr("Copied text to clipboard: " + text );
    alert("该地址已经复制，你可以使用Ctrl+V 粘贴。");
    });

    clip.glue('clip_button', 'clip_container' );
  }

//5.当期答对题目数
function several(){
    $.ajax({
        type:"get",
        url:'s.do?j=l&p=8&c=14155',
        data:{
            newType:3,//接口功能产生  1 获取当前期数要猜的题目  2. 验证用户提交的答案  3. 获取用当前期数已经猜对的题目 4. 判断某一期用户是否参与
            activitySeq:gCurQi
        },
        dataType: "json",
        timeout: 8000,
        success: function (data) {

            console.log('zb：'+data);
            var data = data;
            var count = data.count;
            if(count == undefined){
                count = 0;
            }

            //获取答对题的数量
            $("#guessRight").html(count);
            //结束猜题后首页显示框获取答对题的数量
            $(".guessNumber").html(count);


        }
    });
}
//6.用户是否回答过该期问题；
function whetherQuestion(){
    $.ajax({
        type:"get",
        url:'s.do?j=l&p=8&c=14155',
        data:{
            newType : 4,//接口功能产生  1 获取当前期数要猜的题目  2. 验证用户提交的答案  3. 获取用当前期数已经猜对的题目 4. 判断某一期用户是否参与
            activitySeq:''
        },
        dataType: "json",
        timeout: 8000,
        success: function (data) {
            console.log(data);
            var data = data;
            //isAnsered  // true 用户已回答过改期  code为1有值
            //code      // 1 为该期活动已经开始 0 活动未开始

            //desc //code为0值 该值为提示用户改期活动未开始
            var isAnsered = data.isAnsered;
            var code = data.code;
            var desc = data.desc;
            //如果已经挑战过就显示挑战后的页面；
            if(isAnsered == true){
                $('#page2,#page3,#page4,#page5,#page6').css('visibility','hidden');
                //$('.page7').css('visibility','visible');
                //隐藏马上挑战按钮
                $('.page1-bottom').css('display','none');
                //显示查看上一期按钮
                $('.page1-bottom-on').css('display','block');
                //显示提示语
                $('.page7-top').css('display','block');
                //显示跑马灯
                $('.radiated').css('display','block');
                //显示音乐，视频，图书div
                $('.endadd').css('display','block');
                $('.page1,.m-page,.m-page1').css('height','auto');
                $('.down').show();
            }

        }
    });
}

//7.//本期音乐标签地址：///////////////////////////////////
function myGetmusicsUrl(){

    $.ajax({
        type: "get",
        url:'s.do?j=l&p=8&c=14173',
        data:{
            activitySeq:gCurQi//传参： activitySeq  //获取猜猜的期数
        },
        dataType: "json",
        timeout: 8000,
        success: function (data) {

            console.log(data);
            for(var i = 0;i < data.length;i++){

                var musicId = data[i].musicId; //音乐id
                var musicName = data[i].musicName; //音乐名称
                var musicSinger = data[i].musicSinger; //音乐歌手
                //把获取到的音乐循环放到页面
                $('.music').find('.name').eq(i).find('.hiden h2').html(musicName);
                $('.music').find('.name').eq(i).find('.hiden p').html(musicSinger);
                $('.music').find('.all').find('ul').eq(i).attr('id',musicId);
                $('.music .all ul').eq(i).find('.btn2 a').attr('musicId',musicId);
                $('.music .all ul').eq(i).find('.name a .timeBar span').attr('id',musicId);

            }

        }
    });
}

function back(){
                        //auto.remove();
                        $('.song-list').remove();
                        $('.down').show();
                         //获取音乐
                       //clearInterval(timeSpanInterval);
                        myGetmusicsUrl();
                        $.ajax({
                            type:"get",
                            url:'s.do?j=l&p=8&c=14155',
                            data:{
                                newType : 4,//接口功能产生  1 获取当前期数要猜的题目  2. 验证用户提交的答案  3. 获取用当前期数已经猜对的题目 4. 判断某一期用户是否参与
                                activitySeq:gCurQi
                            },
                            dataType: "json",
                            timeout: 1000,
                            success: function (data) {
                                var isAnsered = data.isAnsered;
                                //isAnsered = false;

                                if(isAnsered == true){

                                    $('#page2,#page3,#page4,#page5,#page6').css('display','none');
                                    //$('.page7').css('visibility','visible');
                                    //隐藏马上挑战按钮
                                    $('.page1-bottom').css('display','none');
                                    //显示查看上一期按钮
                                    $('.page1-bottom-on').css('display','block');
                                    if(gCurQi<=1){
                                        //$('.periodsLeft').unbind('click');
                                       gCurQi = 1;
                                        $('.periodsLeft').css('background','url(http://a.10086.cn/mmfs/image/29118/29118790.png) no-repeat');
                                        $('.periodsLeft').css('background-size','100% 100%');
                                        $('.periodsRight').css('background','url(http://p.i139.cn/nmpfs/media/p/image/20170301/132/134/9013/11460329.png) no-repeat');
                                        $('.periodsRight').css('background-size','100% 100%');
                                        $(".page1-bottom-on").find('span').css({
                                                    'color': '#3d3d3d',
                                                    'background-color': '#ddd',
                                                    'border-bottom': 'solid 5px #bbb'

                                            });

                                    }
                                    else{
                                        $('.periodsRight').css('background','url(http://p.i139.cn/nmpfs/media/p/image/20170301/132/134/9013/11460329.png) no-repeat');
                                        $('.periodsRight').css('background-size','100% 100%');
                                    }
                                    //显示提示语
                                    $('.page7-top').css('display','block');
                                    //显示跑马灯
                                    $('.radiated').css('display','block');
                                    //显示音乐，视频，图书div
                                    $('.endadd').css('display','block');
                                    $('.page1,.m-page,.m-page1').css('height','auto');
                                    $('.down').show();
                                }else{
                                    //显示马上挑战按钮
                                    $('.page1-bottom').css('display','block');
                                    //隐藏查看上一期按钮
                                    $('.page1-bottom-on').css('display','none');
                                    //隐藏提示语
                                    $('.page7-top').css('display','none');
                                    //隐藏跑马灯
                                    $('.radiated').css('display','none');
                                    //隐藏音乐，视频，图书div
                                    $('.endadd').css('display','none');
                                    $('.page1,.m-page,.m-page1').css('height','100%');
                                    $('.down').hide();
                                    //获取题目
                                    //getqueston(gCurQi);
                                }

                            }
                        });
                        //显示当前期数
                        $('.page1-periods').find('.m .index').html(parseInt(gCurQi));

                        //显示答对题数
                        several();

                    }
/*----------------------MAIN-------------------------*/
$(function(){
     statistics("musicCaicaicai", "music", "onload", "in");
    //1.获取当天活动期数
    $.ajax({
        type: "get",
        url:'s.do?j=l&p=8&c=14155',
        //url:'http://a.10086.cn:7071/pams2/l/s.do?j=l&p=8&c=14155',
        data:{
            newType:5,//接口功能产生  1 获取当前期数要猜的题目  2. 验证用户提交的答案  3. 获取用当前期数已经猜对的题目 4. 判断某一期用户是否参与
            activitySeq:''
        },
        dataType: "json",
        timeout: 8000,
        success: function (data) {

            //1.1 显示期数
            var periodsdata = data;
            var activitySeq = data.activitySeq;
            gTotalQi = parseInt(activitySeq);
            gCurQi = parseInt(activitySeq);
                /*var periodsHtml = '';
                periodsHtml =  '<div class="periodsLeft" id="periodsLeft"></div> <span>第'+activitySeq+'期</span> <div class="periodsRight"></div>';
                $('.page1-periods').html(periodsHtml);*/
            $('.page1-periods').find('.m .index').html(activitySeq);
             $('.periodsRight').css('background','url(http://a.10086.cn/mmfs/image/29118/29118791.png) no-repeat');
            $('.periodsRight').css('background-size','100% 100%');
             if(activitySeq==1){
                 $('.periodsRight').css('background','url(http://a.10086.cn/mmfs/image/29118/29118791.png) no-repeat');
                 $('.periodsRight').css('background-size','100% 100%');
                 $('.periodsLeft').css('background','url(http://a.10086.cn/mmfs/image/29118/29118790.png) no-repeat');
                 $('.periodsLeft').css('background-size','100% 100%');
                  $(".page1-bottom-on").find('span').css({
                        'color': '#3d3d3d',
                        'background-color': '#ddd',
                        'border-bottom': 'solid 5px #bbb'

                });
             }
            //1.2 绑定马上挑战
            $(".page1-bottom").on("click", function () {
                $('#page6').hide();
                statistics("musicDekaron", "dekaron", "click", "in");
                $('.down').hide();
                var songList ='<div class="song-list" id="songList"></div>';
                $('.page2-center').append(songList);
                audio.play();
                statistics("musicPlay", "play", "click", "in");
                checkLogin(this, function() {
                    //页面切换           
                    $('.m-page1').hide();
                    $("#page2").css("display", "block");
                    $("#page1").removeClass("page1-show").addClass("page1-hide");
                    $("#circle").addClass("circle-animation");
                    //alert(gCurShou);
                    //获取题目
                    getqueston(gCurQi);
                });

            });
        }
    });
   var onOff =true;
$(document).unbind("scroll");
$(window).bind("scroll", function(e){
   e.preventDefault();
 
if( document.body.scrollTop >= 600 && onOff ){
//alert(123);
                   $('.down').hide();
                   //GetAjaxData();
                   onOff =false;
 }
});
$("#page2").find('.back').on('click',function(){
                          /*$("#page2").hide();
                          $(".m-page1").show();
                          $("#page1").removeClass("page1-hide").addClass("page1-show");
                           //停止音乐
                           audio.src='';*/
                          // audio.currentTime = pauseTime;
                           window.location.reload();

                    })
    //点击回到上一期
    $('.periodsLeft').bind('click', function () {
        //当前期数
        
        gCurQi--;
        if(gCurQi<=1){
            //$('.periodsLeft').unbind('click');
           gCurQi = 1;
            $('.periodsLeft').css('background','url(http://a.10086.cn/mmfs/image/29118/29118790.png) no-repeat');
            $('.periodsLeft').css('background-size','100% 100%');
            $('.periodsRight').css('background','url(http://p.i139.cn/nmpfs/media/p/image/20170301/132/134/9013/11460329.png) no-repeat');
            $('.periodsRight').css('background-size','100% 100%');
            $(".page1-bottom-on").find('span').css({
                        'color': '#3d3d3d',
                        'background-color': '#ddd',
                        'border-bottom': 'solid 5px #bbb'

                });

        }
        else{
            $('.periodsRight').css('background','url(http://p.i139.cn/nmpfs/media/p/image/20170301/132/134/9013/11460329.png) no-repeat');
            $('.periodsRight').css('background-size','100% 100%');
        }

        //获取音乐
        myGetmusicsUrl();
        $.ajax({
            type:"get",
            url:'s.do?j=l&p=8&c=14155',
            data:{
                newType : 4,//接口功能产生  1 获取当前期数要猜的题目  2. 验证用户提交的答案  3. 获取用当前期数已经猜对的题目 4. 判断某一期用户是否参与
                activitySeq:gCurQi
            },
            dataType: "json",
            timeout: 8000,
            success: function (data) {
                var isAnsered = data.isAnsered;
                //isAnsered = false;

                if(isAnsered == true){
                     $('#page2,#page3,#page4,#page5,#page6').css('display','none');
                    //$('.page7').css('visibility','visible');
                    //隐藏马上挑战按钮
                    $('.page1-bottom').css('display','none');
                    //显示查看上一期按钮
                    $('.page1-bottom-on').css('display','block');
                    //显示提示语
                    $('.page7-top').css('display','block');
                    //显示跑马灯
                    $('.radiated').css('display','block');
                    //显示音乐，视频，图书div
                    $('.endadd').css('display','block');
                    $('.page1,.m-page,.m-page1').css('height','auto');
                    $('.down').show();
                }else{
                    //显示马上挑战按钮
                    $('.page1-bottom').css('display','block');
                    //隐藏查看上一期按钮
                    $('.page1-bottom-on').css('display','none');
                    //隐藏提示语
                    $('.page7-top').css('display','none');
                    //隐藏跑马灯
                    $('.radiated').css('display','none');
                    //隐藏音乐，视频，图书div
                    $('.endadd').css('display','none');
                    //$('.page1').css('height','100%');
                   $('.page1,.m-page,.m-page1').css('height','100%');
                   $('.down').hide();

                    //获取题目
                    //getqueston(gCurQi);
                }

            }
        });
        //显示当前期数
        $('.page1-periods').find('.m .index').html(gCurQi);

        //显示答对题数
        several();
    });

    //点击回到下一期
    $('.periodsRight').bind('click', function () {
        //当前期数
        gCurQi++;
        if(gCurQi>=gTotalQi){
           // $('.periodsRight').unbind('click');
            gCurQi = gTotalQi;
            $('.periodsRight').css('background','url(http://a.10086.cn/mmfs/image/29118/29118791.png) no-repeat');
            $('.periodsRight').css('background-size','100% 100%');
            $('.periodsLeft').css('background','url(http://p.i139.cn/nmpfs/media/p/image/20170301/132/134/9013/11460283.png) no-repeat');
            $('.periodsLeft').css('background-size','100% 100%');
             $(".page1-bottom-on").find('span').css({
                        'color': '#000',
                        'background-color': '#ffd86c',
                        'border-bottom': 'solid 5px #a26619'
                });
        }
        else{
            $('.periodsLeft').css('background','url(http://p.i139.cn/nmpfs/media/p/image/20170301/132/134/9013/11460283.png) no-repeat');
            $('.periodsLeft').css('background-size','100% 100%');
            $('.periodsRight').css('background','url(http://p.i139.cn/nmpfs/media/p/image/20170301/132/134/9013/11460329.png) no-repeat');
            $('.periodsRight').css('background-size','100% 100%');
             $(".page1-bottom-on").find('span').css({
                        'color': '#000',
                        'background-color': '#ffd86c',
                        'border-bottom': 'solid 5px #a26619'
                });
        }
        //获取音乐
        myGetmusicsUrl();
        $.ajax({
            type:"get",
            url:'s.do?j=l&p=8&c=14155',
            data:{
                newType : 4,//接口功能产生  1 获取当前期数要猜的题目  2. 验证用户提交的答案  3. 获取用当前期数已经猜对的题目 4. 判断某一期用户是否参与
                activitySeq:gCurQi
            },
            dataType: "json",
            timeout: 8000,
            success: function (data) {
                var isAnsered = data.isAnsered;

                if(isAnsered == true){
                     $('#page2,#page3,#page4,#page5,#page6').css('display','none');
                    //$('.page7').css('visibility','visible');
                    //隐藏马上挑战按钮
                    $('.page1-bottom').css('display','none');
                    //显示查看上一期按钮
                    $('.page1-bottom-on').css('display','block');
                    //显示提示语
                    $('.page7-top').css('display','block');
                    //显示跑马灯
                    $('.radiated').css('display','block');
                    //显示音乐，视频，图书div
                    $('.endadd').css('display','block');
                    $('.page1,.m-page,.m-page1').css('height','auto');
                    $('.down').show();
                }else{
                    //显示马上挑战按钮
                    $('.page1-bottom').css('display','block');
                    //隐藏查看上一期按钮
                    $('.page1-bottom-on').css('display','none');
                    //隐藏提示语
                    $('.page7-top').css('display','none');
                    //隐藏跑马灯
                    $('.radiated').css('display','none');
                    //隐藏音乐，视频，图书div
                    $('.endadd').css('display','none');
                    $('.page1,.m-page,.m-page1').css('height','100%');
                    $('.down').hide();

                    //获取题目
                    //getqueston(gCurQi);
                }
            }
        });

        //显示当前期数
        $('.page1-periods').find('.m .index').html(gCurQi);

        //显示答对题数
        several();
    });


    //1.2.1 绑定查看上一期
    $(".page1-bottom-on").on("click", function () {

        checkLogin(this, function() {

            //当前期数
            gCurQi--;
            if(gCurQi<=1){
                //$(".page1-bottom-on").unbind('click');
                gCurQi = 1;
                 $(".page1-bottom-on").find('span').css({
                        'color': '#3d3d3d',
                        'background-color': '#ddd',
                        'border-bottom': 'solid 5px #bbb'

                });
                 $('.periodsLeft').css('background','url(http://a.10086.cn/mmfs/image/29118/29118790.png) no-repeat');
                 $('.periodsLeft').css('background-size','100% 100%');
                 $('.periodsRight').css('background','url(http://p.i139.cn/nmpfs/media/p/image/20170301/132/134/9013/11460329.png) no-repeat');
                 $('.periodsRight').css('background-size','100% 100%');

            }
            else{
                $(".page1-bottom-on").find('span').css({
                        'color': '#000',
                        'background-color': '#ffd86c',
                        'border-bottom': 'solid 5px #a26619'
                });

            }
            //获取音乐
             $('a.paused').trigger('click');
             $('.timeBar').find('span').html('');
            myGetmusicsUrl();
            $.ajax({
                type:"get",
                url:'s.do?j=l&p=8&c=14155',
                data:{
                    newType : 4,//接口功能产生  1 获取当前期数要猜的题目  2. 验证用户提交的答案  3. 获取用当前期数已经猜对的题目 4. 判断某一期用户是否参与
                    activitySeq:gCurQi
                },
                dataType: "json",
                timeout: 8000,
                success: function (data) {
                    var isAnsered = data.isAnsered;

                    if(isAnsered == true){
                          $('#page2,#page3,#page4,#page5,#page6').hide();
                        //$('.page7').css('visibility','visible');
                        //隐藏马上挑战按钮
                        $('.page1-bottom').css('display','none');
                        //显示查看上一期按钮
                        $('.page1-bottom-on').css('display','block');
                        //显示提示语
                        $('.page7-top').css('display','block');
                        //显示跑马灯
                        $('.radiated').css('display','block');
                        //显示音乐，视频，图书div
                        $('.endadd').css('display','block');
                        $('.page1,.m-page,.m-page1').css('height','auto');
                        $('.down').show();

                    }else{
                        //显示马上挑战按钮
                        $('.page1-bottom').css('display','block');
                        //隐藏查看上一期按钮
                        $('.page1-bottom-on').css('display','none');
                        //隐藏提示语
                        $('.page7-top').css('display','none');
                        //隐藏跑马灯
                        $('.radiated').css('display','none');
                        //隐藏音乐，视频，图书div
                        $('.endadd').css('display','none');
                         $('.page1,.m-page,.m-page1').css('height','100%');
                         $('.down').hide();
                        //获取音乐
                        myGetmusicsUrl();
                        //获取题目
                        //getqueston(gCurQi);
                    }
                }
            });

            //显示当前期数
            $('.page1-periods').find('.m .index').html(gCurQi);

            //显示答对题数
            several();

        });

    });

    //2.显示活动详情
    $(".top-detail").on("click",function(){
        $('.down').hide()
        $("#page4").css("display", "block");
        $(".m-page1").css("display", "none");

    });
    //点击关闭活动详情
    $(".closepage4").on("click",function(){
        //$('.down').show();
        $("#page4").css("display", "none");
        $(".m-page1").show();
        $("#page1").removeClass("page1-hide").addClass("page1-show");
    });

    //3.中奖信息
    $(".page1-btn").on("click",function(){
        checkLogin(this, function() {
            $("#page5").show();

            //获取中奖记录
            $.ajax({
                type: "get",
                url:'s.do?j=l&p=8&c=14170',

                dataType: "json",
                success: function (data) {
                    console.log(data);
                    var awardHret = data.awardHret;// 1 获取到中奖纪录  2 没有中奖纪录

                    var prize = '';
                    if(awardHret == 2){
                        prize += '<div class="page5-prize"> <span class="prize-num">暂无中奖记录</span></div>';
                        $('.page5-prize').html(prize);
                    }else if(awardHret == 0){
                        var userHistoryList = data.userHistoryList; //中奖纪录集合
                        for(var i = 0;i<data.userHistoryList.length;i++){
                            var awardName = data.userHistoryList[i].awardName; //中奖名称
                            var awardDate = data.userHistoryList[i].awardDate; //中奖日期
                            var awardId = data.userHistoryList[i].awardId;   //奖品id
                            var awardContent = data.userHistoryList[i].awardContent; //奖品兑换码

                            prize += '<div class="page5-prize"> <span class="prize-num">'+awardName+'</span><span class="prize-date">'+awardDate+'</span> </div>';

                        }

                        $('.page5-prize').html(prize);
                    }

                }

            });
        });
    });
    //点击关闭中奖信息
    $(".page5Close").on("click",function(){
          $("#page5").hide();

    });
    //加载图片

    $("img[data-original]").lazyload({
        event : "scrollstop"
    });


    //4.获取手机号码
    getphoneNumber();

    //6.是否已回答题目
    whetherQuestion();

    //7.跑马灯
    notice();
    noticeGuess();
    //8.获取挑战后的音乐id
    myGetmusicsUrl();


});

 function statistics(a, b, c, d) {
        $.ajax({
            type: "get",
            url: 'http://a.10086.cn/pams2/bi.jsp',
            data: {pname: a, ppos: b, act: c, pvalue: d},
            success: function () {
            },
            error: function () {
            }
        })
    }











