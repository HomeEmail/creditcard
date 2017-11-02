var config=require('../conf/wx.js');
var request=require('request');
var common =require('./common');

module.exports = {
    //获取token;有效期7200秒，开发者必须在自己的服务全局缓存access_token
    //cb函数参数(error,result)
    getToken:function(cb) {
        var tokenUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appId=' + config.appId + '&secret=' + config.appSecret;
        request.get(tokenUrl, function(error, response, body) {
            if (error) {
                cb('getToken error', error);
            }
            else {
                try {
                    var token = JSON.parse(body).access_token;
                    cb(null, token);
                }
                catch (e) {
                    cb('getToken error', e);
                }
            }
        });
    },
    //获取ticket; 有效期7200秒，开发者必须在自己的服务全局缓存jsapi_ticket
    //参数：token;cb函数参数(error,result)
    getTicket:function(token, cb) {
        request.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + token + '&type=jsapi', function(error, res, body) {
            if (error) {
                cb('getNewTicket error', error);
            }
            else {
                try {
                    var ticket = JSON.parse(body).ticket;
                    cb(null, ticket);
                }
                catch (e) {
                    cb('getNewTicket error', e);
                }
            }
        });
    },
    //生成JS-SDK权限验证的签名了
    /*
        ticket
        url:需要签名的页面地址;不包含#及其后面部分
        cb:函数参数(error,result) result如下返回的对象
    */
    getSignature:function(ticket,url,cb){
        function getTimesTamp() {
            return parseInt(new Date().getTime() / 1000) + '';
        }
        function getNonceStr() {
            return Math.random().toString(36).substr(2, 15);
        }
        var timestamp = getTimesTamp();
        var noncestr = getNonceStr();
        var str = 'jsapi_ticket=' + ticket + '&noncestr='+ noncestr+'&timestamp=' + timestamp + '&url=' + url;
        console.log(str);
        var signature = common.sha1(str);//crypto.createHash('sha1').update(str).digest('hex');
        cb(null, {
            appId: config.appId,
            timestamp: timestamp,
            nonceStr: noncestr,
            signature: signature
        });
    }
    

};