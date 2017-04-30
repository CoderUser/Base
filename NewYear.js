/**
 * Created by ww on 2016/12/1.
 */

/*---------------------------------运营配置-----------------------------------*/
AjaxUrl = {
    //IsLogin: 's.do?j=l&p=8&c=13703',  //是否登录
    IsLogin: 's.do?j=l&p=8&c=13944',  //是否登录

    //LeftTimes: 's.do?j=l&p=8&c=13706',  //剩余次数
    LeftTimes: 's.do?j=l&p=8&c=13935',  //剩余次数

    //LuckyDraw: 's.do?j=l&p=8&c=13707',  //抽奖
    LuckyDraw: 's.do?j=l&p=8&c=13940',  //抽奖

    //History: 's.do?j=l&p=8&c=13708',  //中奖历史
    History: 's.do?j=l&p=8&c=13931',  //中奖历史

    //SignUrl: 's.do?j=l&p=8&c=13709',  //签到链接
    SignUrl: 's.do?j=l&p=8&c=13937',  //签到链接

    //PhoneNumber: 's.do?j=l&p=8&c=13715',  //手机号码
    PhoneNumber: 's.do?j=l&p=8&c=13945',  //手机号码

    //RandomNews: 's.do?j=l&p=72&c=12143',  //随机新闻
    RandomNews: 's.do?j=l&p=72&c=13972',  //随机祝福语


    Messages: 'http://a.10086.cn:7071/pams2/l/s.do?pmColumnId=COLUMN13926&j=l&c=13933&p=8&u=1',//留言
    end: 0
};
gUrl = {
    Login: 's.do?j=l&c=204&p=72',
    Personal: 's.do?j=l&c=1426&p=72'
}
var DBY830AjaxUrl = {
    loginUrl : 's.do?j=l&p=72&c=204&bUrl=' + encodeURIComponent(getQueryString()),
    typeUrl : '/pams2/l/s.do?c=1534&j=l&p=72&bUrl=' + encodeURIComponent(getQueryString())
}


/*---------------------------------Global-----------------------------------*/
//烟花触点
Yanhua = {
    'chudian': [
        {
            pageX: 250,
            pageY: 133
        },
        {
            pageX: 98,
            pageY: 131

        },
        {
            pageX: 328,
            pageY: 217
        },
        {
            pageX: 73,
            pageY: 187
        },
        {
            pageX: 241,
            pageY: 156
        }
    ]
}




/*---------------------------------Utils-----------------------------------*/
var getParam = function (name) {
    var value = location.search.match(new RegExp("[?&]" + name + "=([^&]*)(&?)", "i"));
    value = value ? decodeURIComponent(value[1]) : '';
    return value;
};
//随机数区间
function selectfrom (lowValue,highValue){
    var choice=highValue-lowValue+1;
    return Math.floor(Math.random()*choice+lowValue);
}
//文字弹窗
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
        //ww:改下样式
        /*popMsgObj.css({
         'position' : 'absolute',
         'top' : _posiTop + 'px'
         });*/
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

/*---------------------------------统计-----------------------------------*/
function statistics(a, b, c, d) {
    $.ajax({
        type: "get",
        url: '/pams2/bi.jsp',
        data: {pname: a, ppos: b, act: c, pvalue: d},
        success: function () {
        },
        error: function () {
        }
    })
}

/*---------------------------------Function-----------------------------------*/
function goLoginPage(){
    location.href = gUrl.Login + '&bUrl=' + encodeURIComponent(location.href);
}



function sub3(errorCode, url) {
    var alertStr = "";
    switch(errorCode) {
        case 0:
            sub7(url);
            break;
        case 1:
            alertStr = "此应用不适配您的手机，若机型适配有误，<a style='color:#5ea1db' href=" + DBY830AjaxUrl.typeUrl + ">请更换</a>";
            //popMsg2(alertStr);
            popMsgClass("bigTC",alertStr);
        case 2:
            //alertStr = "该商品属于游戏基地";
            alertStr = "此应用不适配您的手机，若机型适配有误，<a style='color:#5ea1db' href=" + DBY830AjaxUrl.typeUrl + ">请更换</a>";
            popMsgClass("bigTC",alertStr);
            break;
        case 3:
            alertStr = "此商品需要先订购再下载";
            popMsgClass("bigTC",alertStr);
            break;
        case 4:
            alertStr = "当前商品是收费的，请先<a style='color:#5ea1db' href=" + DBY830AjaxUrl.loginUrl + ">登录</a>";
            popMsgClass("bigTC",alertStr);
            break;
        case 5:
            alertStr = "您还没有设置机型，<a style='color:#5ea1db' href=" + DBY830AjaxUrl.typeUrl + ">设置机型快速下载</a>";
            popMsgClass("bigTC",alertStr);
            break;
        case 6:
            //alertStr = "该收费商品不支持WIFI下载";
            alertStr = "购买下载收费应用请使用CMWAP/CMNET接入";
            popMsgClass("bigTC",alertStr);
            break;
        case 7:
            alertStr = "异网用户不能订购下载收费应用";
            popMsgClass("bigTC",alertStr);
            break;
    }
}
var xmlHttp;
function createXMLHttpRequest() {
    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        var MSXML;
        MSXML = ['MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];
        var n = 0;
        for ( n = 0; n < MSXML.length; n = n + 1) {
            try {
                xmlHttp = new ActiveXObject(MSXML[n]);
                break;
            } catch (e) {
            }
        }
    }
    return xmlHttp;
}
function sub7(url) {
    createXMLHttpRequest();
    var uri = url;
    xmlHttp.onreadystatechange = handleState;
    xmlHttp.open("POST", uri, true);
    xmlHttp.send(null);
}
function handleState() {
    try {
        if (xmlHttp.readyState == 4) {
            if (xmlHttp.status == 200) {
                var data = xmlHttp.responseText;
                var data = data;
                if (data != '') {
                    window.location.href = data;
                }
            }
        }
    } catch (error) {
        error.message
    }
}
function getQueryString() {
    var strHref = location.href;
    var intPos = strHref.indexOf("?");
    return strHref.substr(intPos + 1);
}

//随机数
function getRandomString(e) {
    e = e || 32;
    var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678", r = t.length, n = "";
    for (i = 0; i < e; i++)n += t.charAt(Math.floor(Math.random() * r));
    return n
}





/*---------------------------------CLASS-----------------------------------*/
var ShuangDan = (function(){
    var _lockerDandan = 1;
    var _lockerSign = 1;
    var _signUrl = '';
    var _phoneNumber = '';
    var _num = 0;  //中奖流量
    var _leftTimes = 0;  //剩余次数
    var _newsData = new Object();  //存储随机资讯新闻
    var _newsDataLen = 0;  //随机资讯新闻数量
    var _lockerLeftTimes = 1;
    var _loadLocker = true;

    var ua = navigator.userAgent.toLowerCase();
    var iphone = /iphone|ipad|ipod/.test(ua);

    var _ts = (new Date).getTime() + getRandomString(12);

    var _hasYanzhengma = !($('.imgCheck').hasClass('hidden'));

    return {
        init:function(){
            //增加弹窗html框架
            ShuangDan.addTanchuangHtml();
            //是否登录
            ShuangDan.isLogin();
            //获取随机资讯新闻
            ShuangDan.getRandomNews();
            //加载图片
            ShuangDan.loadImgs();
            //间隔增加蛋蛋特效
            ShuangDan.addEffect();
            if(_hasYanzhengma){
                //获取验证码
                ShuangDan.getYanzhengma();
                //绑定刷新验证码
                ShuangDan.bindRefreshYanzhengma();
            }
        },

        //获取验证码
        getYanzhengma:function(){
            $.ajax({
                url: "/pams2/l/s.do?j=l&p=8&c=13029",
                type: "post",
                dataType: 'json',
                success: function (e) {
                    if (0 == e.result) {
                        var t = "http://" + location.host + "/pams2/" + e.message + ".validate";
                        $('#imgCheckImg').attr("src", t + "?ts=" + _ts)
                    }
                }, error: function () {
                    console.log("yanzhengma: 网络不给力哦...")
                }
            })
        },

        //绑定刷新验证码
        bindRefreshYanzhengma:function(){
            $('#refresh').bind('click',function(){
                ShuangDan.getYanzhengma();
            })
        },

        //判断验证码是否正确
        checkYanzhenma:function(){
            $.ajax({
                type: "post",
                url: "/pams2/l/s.do?j=l&p=8&c=13028",
                data: {mm_bmst: 2, lst: 1, textCheckingCode: t, mobile: r, ts: ts},
                success: function (i) {
                    0 == i.result ? (e(t, r), messageInput.removeAttr("disabled"), addSuccess(imgCheckInput[0])) : (addError(imgCheckInput[0]), imgCheckFun())
                },
                error: function () {
                    console.log("网络不给力哦...")
                }
            })
        },

        //增加弹窗html框架
        addTanchuangHtml:function(){
            //var sHtmlDetail = '<!--10.活动详情--><div class="con hr_rule detail hidden"><!--蒙层--><p class="overlay"></p><!--正文--><div class="hr_rule_bg"><!--关闭--><div class="hr_close_rule_btn"></div><!--活动规则--><p class="hr_rule_title">活动规则</p><!--说明文案--><div class="hr_rule_content"><ol class="hr_rule_list"><li>MM特权包赠送价值20元的MM币2000个，系统将在5个工作日内赠送到账；</li><li>赠送的MM币自到账之日起30天内有效，逾期自动失效，不能再使用；</li><li>MM特权包其他权益，如：签到送流量、玩游戏送礼品活动，需用户下载并登录MM客户端后，在客户端内参加。</li></ol></div></div></div>';
            //var sHtmlDetail = '<!--10.活动详情--><div class="con hr_rule detail hidden"><!--蒙层--> <p class="overlay"></p><!--正文--><div class="hr_rule_bg"> <!--关闭-->  <div class="hr_close_rule_btn"></div><!--活动规则--> <p class="hr_rule_title">活动规则</p><!--说明文案--><div class="hr_rule_content"><ol class="hr_rule_list"><li>活动时间：2016年12月15日-2017年1月15日</li><li>一等奖1G、二等奖150M、三等奖70M、四等奖30M<br></li><li>活动规则</li><li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用户进入页面后，可在挂满礼物的圣诞树上拆取礼物。用户可以通过完成指定的任务，增加拆礼物的次数做任务可获得更多机会。页面下方为任务栏，用户可通过每天参与获得免费机会。</li><li>任务包括：<ol><li>1）在活动页面上进行签到，每天可获得一次拆礼物的机会。</li><li>2）下载指定游戏与应用，每下载一款可获得一次拆礼物机会（多次下载同款只能获得一次机会）。</li><li>3）下载并激活MM资讯客户端可获得一次拆礼物机会。</li><li>4）订购视频或图书，每次订购可获得一次拆礼物机会。</li></ol></li><li class="weight">奖品有限，先到先得，送完即止。</li><li>用户须知</li><li>按活动规则成功中奖的客户，10M、30M、70M、150M中奖用户将在15个工作日内流量下发；</li><li>每月最后三天领取的流量，将顺延至次月1日赠送；在流量当月（自然月）有效，到账时会有短信告知。</li><li>参与活动客户需为中国移动用户，需通过中国移动手机号码验证登陆，才能获得抽奖机会。</li><li>活动至奖品发放期间，无因欠费等个人原因导致手机停机或关机等，如遇号码状态异常无法赠送奖品，视为放弃。</li><li>为保证活动公平，对于使用违规行为参与活动（如同一台手机使用多个号码参与抽奖行为）的用户，活动方有权取消其获奖资格，并且不再另行通知。</li><li>如有疑问，请咨询10086</li></ol></div></div></div>';
            var sHtmlDetail = '<!--10.活动详情--><div class="con hr_rule detail hidden"><p class="overlay"></p><div class="hr_rule_bg"><div class="guize"><img class="guizeimg" src="http://p.i139.cn/nmpfs/media/p/image/20170112/132/134/8799/10491837.png"></div><div class="hr_close_rule_btn"></div><div class="hr_rule_content"><ol class="hr_rule_list"><li class="weight">活动时间：</li><li>2017年1月19日-2月18日</li><li class="weight">活动奖品：</li><li>一等奖500M、二等奖70M、三等奖30M、四等奖10M、幸运祝福奖1G</li><!--<li class="weight">活动规则：</li>--><li>1、	在活动期间，登录活动页面后进行签到，就可以免费抽取财神爷爷派发的红包。</li><!--<li class="weight">任务包括：</li>--><li><ol><li>2、	更多红包获取攻略：</li><li>1）	每天在活动页面内进行签到，都可以免费获得一次抽红包的机会。</li><li>2）	下载活动页面应用专区内的应用/游戏可获得一次抽红包机会。</li><li>3）	观看活动页面内视频专区的视频可获得一次抽红包机会。</li><li>4）	通过攻略2）3）获得的抽红包机会会递增哟！第一天下载一个应用/观看一个视频，可获得一次抽奖机会，累计两天，可获得两次，累计三天或以上，可获得三次机会。</li><li>5）	重复下载同一个应用、观看同一个视频，都只能获得一次抽红包的机会哟。</li><li>3、在留言板块写下自己的新年愿望或祝福，被MM相中，就有机会获得1G流量大奖！ </li></ol></li><li class="weight">奖品有限，先到先得，送完即止。</li><li class="weight">用户须知：</li><li><ol><li>1、成功中奖的客户将在15个工作日内流量下发；在流量当月（自然月）有效，到账时会有短信告知。每月最后三天领取的流量，将顺延至次月1日赠送；在流量当月（自然月）有效，到账时会有短信告知。</li><li>2、请保持手机状态正常，赠送流量时如遇号码状态异常将无法赠送，视为放弃。</li><li>3、为保证活动公平，对于使用违规行为参与活动（如同一台手机使用多个号码参与抽奖行为）的用户，活动方有权取消其获奖资格，并且不再另行通知。</li><li>4、参与活动客户需为中国移动用户，需通过中国移动手机号码验证登陆，才能获得抽奖机会。</li><li>5、如有疑问，请咨询10086</li></ol></li></ol></div></div></div>';

            var sHtmlHistory = '<!--11.中奖历史--><div class="con hr_rule history hidden" ><!--蒙层--><p class="overlay"></p><!--正文--><div class="hr_rule_bg "><div class="caishen"><img class="ciashenimg" src="http://p.i139.cn/nmpfs/media/p/image/20170112/132/134/8799/10491839.png"></div><!--关闭--><div class="hr_close_rule_btn"></div><!--活动规则--><p class="hr_rule_title"><span class="phone-number" id="phoneNumber"></span>的奖品：</p><!--说明文案--><div class="hr_rule_content"><div class="item"><div class="present">10</div><div class="liuliang">流量</div><div class="date">2016年03月21日</div></div></div><div class="chaliuliang"><!--<a href="http://a.10086.cn/pams2/l/s.do?j=l&p=72&c=8703">查流量</a>-->查流量</div></div></div>'
            var sHtmlWin = '<!--12.中奖弹窗--><div class="con hr_rule win i-win hidden"><!--蒙层--><p class="overlay"></p><!--标题&提示--><div class="title-tips"><div class="caishen"><img class="caishenimg" src="http://p.i139.cn/nmpfs/media/p/image/20170112/132/134/8799/10491839.png"></div><div class="title">恭喜您！中奖啦！</div><div class="tips">哎哟，不错哟，抽到了<span class="num"></span>M流量。稍后可在我的奖品中查看。</div></div><!--图片--><div class="win-pic"></div></div>';
            //var sHtmlNoWin = '<!--13.未中奖弹窗--><div class="con hr_rule no-win hidden" ><!--蒙层--><p class="overlay"></p><!--正文--><div class="hr_rule_bg "><!--关闭--><div class="hr_close_rule_btn"></div><!--活动规则--><p class="hr_rule_title"><span class="phone-number"></span>的奖品：</p><!--说明文案--><div class="hr_rule_content">您还没有抽中任何奖品</div></div></div>';
            var sHtmlNews = '<!--14.资讯弹框--><div class="con hr_rule win news hidden"><!--蒙层--><p class="overlay"></p><!--标题&提示--><div class="title-tips"><div class="caishen"><img class="caishenimg" src="http://p.i139.cn/nmpfs/media/p/image/20170112/132/134/8799/10491839.png"></div><div class="title">您抽到了一条祝福语:</div><div class="tips"><div class="content"></div><!--<div class="to-detail"><a>点击查看详情>></a></div>--></div></div><!--<div class="caishen"><img class="ciashenimg" src="http://p.i139.cn/nmpfs/media/p/image/20170112/132/134/8799/10491839.png"></div>--><!--图片--><div class="win-pic"></div></div>';
            var sHtmlLoading = '<!--15.抽奖等待过程--><div class="con hr_rule wait hidden"><p class="overlay"></p><div class="hr_rule_bg"></div></div>';
            var sHtmlDegree = '<!--16.抽奖次数为0--><div class="con hr_rule win Degree hidden"><!--蒙层--><p class="overlay"></p><!--标题&提示--><div class="title-tips"><div class="caishen"><img class="caishenimg" src="http://p.i139.cn/nmpfs/media/p/image/20170112/132/134/8799/10491839.png"></div><div class="titleed">您还没有抽奖机会，马上去做任务可得抽奖机会</div><div class="tips"><div class="content"></div></div></div><!--图片--><div class="win-pic"></div></div>';

            $('body').append(sHtmlDetail);
            $('body').append(sHtmlHistory);
            $('body').append(sHtmlWin);
            //$('body').append(sHtmlNoWin);
            $('body').append(sHtmlNews);
            $('body').append(sHtmlLoading);
            $('body').append(sHtmlDegree);

            //绑定活动详情按钮
            $('#activityDetail').unbind('click');
            $('#activityDetail').bind('click',function(){
                $('.hr_rule.detail').removeClass('hidden');
            })
            //关闭活动详情按钮
            $('.hr_rule.detail').find('.hr_close_rule_btn').bind('click',function(){
                $('.hr_rule.detail').addClass('hidden');
            })
            //返回上级页面
            $('.my-header').find('.back').unbind('click');
            $('.my-header').find('.back').bind('click',function(){
                console.log('goback')
                window.history.go(-1);
            })
        },

        //是否登录
        isLogin:function(){
            $.ajax({
                type: "get",
                url: AjaxUrl.IsLogin,
                dataType: "json",
                success: function (data) {
                    //已登录
                    if(data){
                        //登录icon
                        $('.my-header').find('.login').addClass('active');
                        //$('.my-header').find('.login .m a').attr('href', gUrl.Personal);
                        $('.my-header').find('.login .m').html('<a href=\"' +gUrl.Personal+ '\"></a>');

                        //剩余次数文案
                        //$('.my-left').find('.m1').html('快来选个礼物吧');
                        //获取剩余次数
                        ShuangDan.getLeftTimes();

                        //获取签到链接
                        ShuangDan.getSignUrl();

                        //获取中奖历史记录
                        ShuangDan.getHistory();

                        //获取手机号码
                        ShuangDan.getPhoneNumber();
                    }
                    //未登录
                    else{
                        //登录icon
                        $('.my-header').find('.login').removeClass('active');
                        $('.my-header').find('.login .m').html('<a></a>');
                        $('.my-header').find('.login .m a').attr('href', gUrl.Login + '&bUrl=' + encodeURIComponent(location.href));

                        //剩余次数文案
                        $('.my-left').find('.m1').html('快来选个礼物吧');

                        //点击礼物跳转登录页
                        $('.dandan').bind('click',function(){
                            goLoginPage();
                        });

                        //点击签到跳转登录页
                        $('#toSign').bind('click',function(){
                            goLoginPage();
                        })

                        //点击中奖历史跳转登录页
                        $('#myGift').bind('click',function(){
                            goLoginPage();
                        })
                    }
                },
                error: function () {
                    console.log('ajax error: isLogin');
                }
            });
        },

        //获取剩余次数
        getLeftTimes:function(){
            $.ajax({
                type: "get",
                url: AjaxUrl.LeftTimes,
                dataType: "html",
                timeout: 8000,
                success: function (data) {
                    //每次成功就重置为1
                    _lockerLeftTimes = 1;
                    //处理剩余次数数据
                    ShuangDan.makeLeftTimesData(data);

                },
                error: function () {
                    console.log('ajax error: getLeftTimes');
                    $('.my-left').find('.m1').html('快来选个礼物吧');
                    //重新连接至多2次
                    if(_lockerLeftTimes <= 2){
                        //重新获取剩余次数
                        ShuangDan.getLeftTimes();
                    }
                    _lockerLeftTimes++;
                }
            });
        },

        //处理剩余次数数据
        makeLeftTimesData:function(data){
            data = data.trim();
            //已登录
            if(!~data.indexOf('请您先登录再查看')){
                $('.my-left').find('.m1').html('您还有<span id="leftCounts-nums" class="m1-1">' +data+ '</span>次抽奖机会');
                _leftTimes = parseInt(data);
                //剩余次数不为0
                if(data!=0){
                    //点击礼物调起抽奖
                    $('.dandan').unbind('click');
                    $('.dandan').bind('click',function(){
                        if(_lockerDandan){
                            console.log('click draw')
                            _lockerDandan = 0;
                            //点击红包统计
                            statistics("hongbaopage", "hongbao", "click", "in");

                            ShuangDan.luckyDraw();
                        }
                    })
                }
                //剩余次数为0
                else{
                    //点击礼物调起抽奖
                    $('.dandan').unbind('click');
                    $('.dandan').bind('click',function(){


                        //先隐藏所有任务
                        $('.mission-item').addClass('transparent');
                        //到达那个高度
                        $('body')[0].scrollTop = $('.my-left')[0].offsetTop - 2 * parseInt($('.my-left').css('margin-top').replace(/[A-Za-z]/,''));

                        //弹出没有抽奖次数的弹窗
                        $('.hr_rule.win.Degree').removeClass('hidden');

                        $('.hr_rule.win.Degree').unbind('click');
                        $('.hr_rule.win.Degree').bind('click',function(){
                            $('.hr_rule.win.Degree').addClass('hidden');
                        });

                        //提示特效
                        $('#leftCounts-nums').addClass('active');
                        setTimeout(function(){
                            $('.todo').find('.title').addClass('active');
                            setTimeout(function(){
                                $('#leftCounts-nums').removeClass('active');
                                $('.todo').find('.title').removeClass('active');
                                //签到
                                $('.mission-item.m-sign').addClass('active');
                                setTimeout(function(){
                                    //阅读
                                    //下载
                                    $('.mission-item.m-download').addClass('active');
                                    setTimeout(function(){
                                        //客户端
                                        $('.mission-item.mmclient').addClass('active');
                                        //取消特效
                                        $('.mission-item').removeClass('transparent');
                                        $('.mission-item').removeClass('active');
                                    },400)
                                    /*},400)*/
                                    /*},400);*/
                                },400);
                            },500);
                        },500);

                    })
                }
            }
            //未登录
            else{
                $('.my-left').find('.m1').html('快来选个礼物吧');
            }
        },

        //去抽奖
        luckyDraw:function(){
            //等待超过1s后才显示加载图标
            _loadLocker = true;
            setTimeout(function(){
                if(_loadLocker){
                    $('.hr_rule.wait').removeClass('hidden');
                }
            },800);


            $.ajax({
                type: "get",
                url: AjaxUrl.LuckyDraw,
                dataType: "html",
                timeout: 8000,
                success: function (data) {
                    _loadLocker = false;
                    //去除加载图标
                    $('.hr_rule.wait').addClass('hidden');
                    data = data.trim();
                    //已登录
                    if(data!='0'){
                        console.log(data);
                        switch(data){
                            case '2010':  //未中奖
                                console.log('未中奖');
                                //随机获取一条资讯
                                var index = selectfrom(1,_newsDataLen);
                                $('.hr_rule.win.news').find('.title-tips .tips .content').html(_newsData.newsList[index-1].title);
                                $('.hr_rule.win.news').find('.title-tips .tips .to-detail a').attr('href',_newsData.newsList[index-1].addr);
                                //显示未中奖弹框
                                $('.hr_rule.win.news').removeClass('hidden');
                                $('.hr_rule.win.news').unbind('click');
                                $('.hr_rule.win.news').bind('click',function(){
                                    $('.hr_rule.win.news').addClass('hidden');
                                });
                                break;
                            case '100':  //四等奖:30M
                                console.log('10M');
                                _num = 10;
                                $('.hr_rule.win.i-win').find('.title-tips .tips .num').html(_num);
                                //显示中奖弹窗
                                $('.hr_rule.win.i-win').removeClass('hidden');
                                $('.hr_rule.win.news').unbind('click');
                                $('.hr_rule.win.i-win').bind('click',function(){
                                    $('.hr_rule.win.i-win').addClass('hidden');
                                });
                                break;
                            case '101':  //四等奖:30M
                                console.log('30M');
                                _num = 30;
                                $('.hr_rule.win.i-win').find('.title-tips .tips .num').html(_num);
                                //显示中奖弹窗
                                $('.hr_rule.win.i-win').removeClass('hidden');
                                $('.hr_rule.win.news').unbind('click');
                                $('.hr_rule.win.i-win').bind('click',function(){
                                    $('.hr_rule.win.i-win').addClass('hidden');
                                });
                                break;
                            case '102':  //二等奖:500M
                                console.log('500M');
                                _num = 500;
                                $('.hr_rule.win.i-win').find('.title-tips .tips .num').html(_num);
                                //显示中奖弹窗
                                $('.hr_rule.win.i-win').removeClass('hidden');
                                $('.hr_rule.win.news').unbind('click');
                                $('.hr_rule.win.i-win').bind('click',function(){
                                    $('.hr_rule.win.i-win').addClass('hidden');
                                });
                                break;
                            case '103':  //四等奖:70M
                                console.log('70M');
                                _num = 70;
                                $('.hr_rule.win.i-win').find('.title-tips .tips .num').html(_num);
                                //显示中奖弹窗
                                $('.hr_rule.win.i-win').removeClass('hidden');
                                $('.hr_rule.win.news').unbind('click');
                                $('.hr_rule.win.i-win').bind('click',function(){
                                    $('.hr_rule.win.i-win').addClass('hidden');
                                });
                                break;
                            case '104':  //四等奖:70M
                                console.log('50元话费');
                                _num = 50;
                                $('.hr_rule.win.i-win').find('.title-tips .tips').html('50元话费正光速飞向你的手机，请留意短信通知。');
                                //显示中奖弹窗
                                $('.hr_rule.win.i-win').removeClass('hidden');
                                $('.hr_rule.win.news').unbind('click');
                                $('.hr_rule.win.i-win').bind('click',function(){
                                    $('.hr_rule.win.i-win').addClass('hidden');
                                });
                                break;
                            case '105':  //四等奖:70M
                                console.log('100元话费');
                                _num = 100;
                                $('.hr_rule.win.i-win').find('.title-tips .tips').html('100元话费正光速飞向你的手机，请留意短信通知。');
                                //显示中奖弹窗
                                $('.hr_rule.win.i-win').removeClass('hidden');
                                $('.hr_rule.win.news').unbind('click');
                                $('.hr_rule.win.i-win').bind('click',function(){
                                    $('.hr_rule.win.i-win').addClass('hidden');
                                });
                                break;
                            case '106':  //四等奖:70M
                                console.log('电影票');
                                _num = 100;
                                $('.hr_rule.win.i-win').find('.title-tips .tips').html('一张电影票正光速飞向你的手机，请留意短信通知。');
                                //显示中奖弹窗
                                $('.hr_rule.win.i-win').removeClass('hidden');
                                $('.hr_rule.win.news').unbind('click');
                                $('.hr_rule.win.i-win').bind('click',function(){
                                    $('.hr_rule.win.i-win').addClass('hidden');
                                });
                                break;
                            case '107':  //三等奖：150M
                                console.log('150M');
                                _num = 150;
                                $('.hr_rule.win.i-win').find('.title-tips .tips .num').html(_num);
                                //显示中奖弹窗
                                $('.hr_rule.win.i-win').removeClass('hidden');
                                $('.hr_rule.win.news').unbind('click');
                                $('.hr_rule.win.i-win').bind('click',function(){
                                    $('.hr_rule.win.i-win').addClass('hidden');
                                });
                                break;
                            case '108':  //一等奖1000M
                                console.log('1024M');
                                _num = 1024;
                                $('.hr_rule.win.i-win').find('.title-tips .tips .num').html(_num);
                                //显示中奖弹窗
                                $('.hr_rule.win.i-win').removeClass('hidden');
                                $('.hr_rule.win.news').unbind('click');
                                $('.hr_rule.win.i-win').bind('click',function(){
                                    $('.hr_rule.win.i-win').addClass('hidden');
                                });
                                break;
                            case '2':  //一等奖1000M
                                popMsgClass("bigTC", '抽奖次数用完了');
                                break;
                            default:
                                popMsgClass("bigTC", '网络错误:' + data);
                                break;
                        }
                    }
                    //未登录
                    else{
                        goLoginPage();
                    }

                    //解锁点击礼物锁
                    _lockerDandan = 1;

                    //先取本地的剩余次数
                    var leftTimes = 0;
                    if(_leftTimes > 0){
                        leftTimes = _leftTimes - 1;
                    }
                    $('.my-left').find('.m1').html('您还有<span id="leftCounts-nums" class="m1-1">' +leftTimes+ '</span>次抽奖机会');
                    //再重新获取实际的剩余次数
                    ShuangDan.getLeftTimes();
                },
                error: function () {
                    _loadLocker = false;
                    //去除加载图标
                    $('.hr_rule.wait').addClass('hidden');
                    console.log('ajax error: luckyDraw');
                    popMsgClass("bigTC", '网络错误');
                    //解锁点击礼物锁
                    _lockerDandan = 1;
                }
            });
        },

        //去获取资讯新闻
        getRandomNews:function(){
            $.ajax({
                type: "get",
                url: AjaxUrl.RandomNews,
                dataType: "html",
                success: function (data) {
                    ShuangDan.makeRandomNews(data);
                },
                error: function () {
                    //alert('ajax error: getRandomNews');
                }
            });
        },

        //处理资讯新闻
        makeRandomNews:function(data){
            /*_newsData = {
             'newsList':
             [{title: '1',addr:'1'},{title: '2',addr:'2'}]
             }*/
            var aNewsList = [];
            _newsDataLen = $(data).find('ul li').length;
            for(var i=0;i<_newsDataLen;i++){
                var oItem = {};
                oItem.title = $(data).find('ul li').eq(i).find('.title').html();
                oItem.addr = $(data).find('ul li').eq(i).find('.addr').html().replace(/&amp;/g,'&');
                aNewsList[i] = oItem;
            }
            _newsData.newsList = aNewsList;
            console.log(_newsData);
        },

        //获取中奖历史记录
        getHistory:function(){
            $.ajax({
                type: "get",
                url: AjaxUrl.History,
                dataType: "html",
                timeout: 8000,
                success: function (data) {
                    ShuangDan.makeHistoryData(data);
                },
                error: function () {
                    console.log('ajax error: getHistory');
                }
            });
        },

        //处理中奖历史记录数据
        makeHistoryData:function(data){
            data = data.trim();
            //已登录
            if(!~data.indexOf('登录')){
                //有中奖记录
                if(data){
                    console.log(data);
                    $('.history').find('.hr_rule_content').html(data);
                }
                //无中奖记录
                else{
                    console.log(data);
                    $('.history').find('.hr_rule_content').html('暂无中奖记录');
                }

                //绑定中奖历史点击事件
                $('#myGift').unbind('click');
                $('#myGift').bind('click',function(){
                    $('.hr_rule.history').removeClass('hidden');
                });
                //绑定中奖历史关闭按钮
                $('.history').find('.hr_close_rule_btn').bind('click',function(){
                    $('.hr_rule.history').addClass('hidden');
                })
            }
            //未登录
            else{
                //点击中奖历史跳转登录页
                $('#myGift').unbind('click');
                $('#myGift').bind('click',function(){
                    goLoginPage();
                })
            }
        },

        //获取签到链接
        getSignUrl:function(){
            $.ajax({
                type: "get",
                url: AjaxUrl.SignUrl,
                dataType: "html",
                success: function (data) {
                    //已登录
                    if(data){
                        //未签到
                        if(data != 1){
                            $('#toSign').html('点击签到');
                            data = data.replace(/&amp;/g,'&');
                            _signUrl = data;
                            //去签到
                            $('#toSign').unbind('click');
                            $('#toSign').bind('click',function(){
                                //alert('toSign');
                                //点击签到统计
                                statistics("tosignpage", "sign", "click", "in");
                                if(_lockerSign){
                                    _lockerSign = 0;

                                    //去签到
                                    ShuangDan.toSign(_signUrl);


                                }
                            });
                        }
                        //已签到
                        else{
                            $('#toSign').html('今日已签到');
                            //隐藏验证码
                            $('.imgCheck').addClass('hidden');
                        }
                    }
                    //未登录
                    else{
                        //去签到跳转到登录页
                        $('#toSign').unbind('click');
                        $('#toSign').bind('click',function(){
                            goLoginPage();
                        });
                    }
                },
                error: function () {
                    //alert('ajax error: getSignUrl');
                    console.log('ajax error: getSignUrl');
                }
            });
        },

        //去签到
        toSign:function(url){
            //有验证码模式
            var textCheckingCode = '';
            if(_hasYanzhengma){
                textCheckingCode = $('#imgCheckInput')[0].value;
            }
            //无验证码模式
            else{

            }

            $.ajax({
                type: "post",
                url: url,
                dataType: "html",
                data: {
                    textCheckingCode: textCheckingCode,
                    ts: _ts
                },
                success: function (data) {
                    data = data.trim();
                    //已登录
                    if(data != "2"){
                        switch(data){
                            case "0":  //成功
                                //提示签到成功
                                popMsgClass("bigTC", '签到成功');
                                $('#toSign').html('今日已签到');
                                //先取本地的剩余次数
                                var leftTimes = 0;
                                leftTimes = _leftTimes + 1;
                                $('.my-left').find('.m1').html('您还有<span id="leftCounts-nums" class="m1-1">' +leftTimes+ '</span>次抽奖机会');
                                //再重新获取实际的剩余次数
                                ShuangDan.getLeftTimes();
                                break;
                            case "1":  //失败
                                popMsgClass("bigTC", '签到失败');
                                break;
                            case "3":  //当天已经领过
                                popMsgClass("bigTC", '当天已经签到');
                                break;
                            case '4':  //验证码错误
                                popMsgClass("bigTC", '验证码错误');
                                break;
                            default:
                                popMsgClass('网络错误，请稍候再试'+data);
                                break;
                        }
                    }
                    //未登录
                    else{
                        popMsgClass('请先登录');
                    }
                    //解锁
                    _lockerSign = 1;
                },
                error: function () {
                    console.log('ajax error: getHistory');
                    //alert('ajax error: getHistory');
                    //解锁
                    _lockerSign = 1;
                }
            });
        },

        //获取手机号码数据
        getPhoneNumber:function(){
            $.ajax({
                type: "get",
                url: AjaxUrl.PhoneNumber,
                dataType: "html",
                success: function (data) {
                    //处理手机号码数据
                    ShuangDan.makePhoneNumberData(data);
                },
                error: function () {
                    console.log('ajax error: getPhoneNumber');
                }
            });


        },

        //处理手机号码数据
        makePhoneNumberData:function(data){
            //已登录
            if(data){
                _phoneNumber = data;
                $('.phone-number').html(_phoneNumber);
            }
            //未登录
            else{
                $('.hr_rule_title').html('您的奖品：');
            }
        },

        //加载图片
        loadImgs:function(){
            var len = $('img[data-original]').length;
            for(var i=0;i<len;i++){
                $('img[data-original]').eq(i).attr('src', $('img[data-original]').eq(i).attr('data-original'));
            }
        },

        //间隔增加蛋蛋特效
        addEffect:function(){
            //蛋蛋1
            $('.dandan.item1').addClass('active');
            //蛋蛋2
            $('.dandan.item2').addClass('active');
            //蛋蛋3
            $('.dandan.item3').addClass('active');
        }
    }

})();


/*---------------------------------MAIN-----------------------------------*/
(function(){
    try{
        ShuangDan.init();

        //预先加载图片
        new Image().src = 'http://p.i139.cn/nmpfs/media/p/image/20161202/132/134/8357/9592967.png';
        new Image().src = 'http://p.i139.cn/nmpfs/media/p/image/20161202/132/134/8357/9599925.png';
        new Image().src = 'http://p.i139.cn/nmpfs/media/p/image/20161206/132/134/8357/9684249.png';

    }catch(err){
        console.log(err);
    }
})();






//跑马灯
function notice() {
    if ($('#noticeId')) {
        notice()
    }
    function notice() {
        var _this = $('#noticeId');
        var timeInterval = _this.attr('time');
        timeInterval = (timeInterval != '2') ? timeInterval : 2;
        timeInterval = timeInterval * 1000;
        var nLen = _this.find('a').length;
        var nHeight = _this.find('a').height();
        var n = 1
        setInterval(function() {
            _this.css({
                'webkitTransitionDuration' : '100ms',
                'MozTransitionDuration' : '100ms',
                'msTransitionDuration' : '100ms',
                'OTransitionDuration' : '100ms',
                'transitionDuration' : '100ms',
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

notice();


function noticed() {
    if ($('#noticeIdtwo')) {
        noticed()
    }
    function noticed() {
        var _this = $('#noticeIdtwo');
        var timeInterval = _this.attr('time');
        timeInterval = (timeInterval != '2') ? timeInterval : 2;
        timeInterval = timeInterval * 1000;
        var nLen = _this.find('a').length;
        var nHeight = _this.find('a').height();
        var n = 1
        setInterval(function() {
            _this.css({
                'webkitTransitionDuration' : '100ms',
                'MozTransitionDuration' : '100ms',
                'msTransitionDuration' : '100ms',
                'OTransitionDuration' : '100ms',
                'transitionDuration' : '100ms',
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

noticed();

///获取留言信息放到跑马灯上

//function message(){
//    $.ajax({
//        type : 'post',
//        dataType : "html",
//        url : AjaxUrl.Messages,
//        data :{
//            //rateId : resolution
//        },
//        success : function(data) {
//            console.log("请求成功...")
//            var dataNum = data;
//            var dataHtml = '';
//
//            $("#noticeId").html(data);
//
//        },
//        error:function(){
//            popMsg('获取留言失败');
//        }
//    });
//}
//message();


/*-------------------login ------------------*/

var DBY830AjaxUrl = {
    loginUrl : 's.do?j=l&p=72&c=204&bUrl=' + encodeURIComponent(getQueryString()),
    typeUrl : '/pams2/l/s.do?c=1534&j=l&p=72&bUrl=' + encodeURIComponent(getQueryString())
}
var Cartoon1411Url = {
    golookup :'s.do?j=l&p=72&c=8703' ,
    goUrl : 's.do?j=l&p=8&c=13926',
    rankUrl : 's.do?j=l&p=72&c=8399',
    //rankUrl : 'list.txt',
    isLogin : "s.do?j=l&p=72&c=6666",
    loginUrl : 's.do?j=l&p=72&c=204&bUrl=' + encodeURIComponent(getQueryString()),
    typeUrl : 's.do?c=8048&j=l&p=72&bUrl=' + encodeURIComponent(getQueryString())
}


function goMessage(){
    location.href = Cartoon1411Url.goUrl;
}
function goflow(){
    location.href = Cartoon1411Url.golookup;
}
//登录
function loginShi(){
    //判断是否登录
    $.ajax({
        type : 'get',
        url : Cartoon1411Url.isLogin,
        success : function(data) {
            var data = ' ' + data + ' ';
            data = data.trim();
            if (data == 'true') {

                $('.message3').bind('click',function(){
                    //发送祝福统计
                    statistics("toblessing", "blessing", "click", "in");

                    goMessage();
                });

            } else {

                $('.message3').bind('click',function(){
                    goLoginPage();
                });
                //popMsg("请先登录");
            }

            //$('#MMcoin').removeClass('hidden');
        },
        error : function() {
            popMsgClass('请刷新重试！');
        }
    });
}
loginShi();
    //查流量统计
    $('.chaliuliang').bind('click',function(){
        statistics("toflux", "flux", "click", "in");

        goflow();
    });

