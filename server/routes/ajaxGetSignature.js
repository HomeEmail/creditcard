var express = require('express');
var router = express.Router();
var http = require('http');
var Hashes = require('jshashes');//加密库


/**路由级中间件，注意顺序*/
/*router.use(function (req,res,next){

  if(req.session.lastPage){
    console.log('Last page was: '+req.session.lastPage);
  }
  req.session.lastPage='/index';
  
  //获取cookie
  console.log('cookies:'+req.cookies.cookiename);
  if ('undefined' === (typeof req.cookies.cookiename)){
    console.log('deleted cookie');
  }
  //设置cookie
  res.cookie('cookiename','i am a cookie',{ maxAge: 20000,httpOnly:true, path:'/'});//cooike 时长 20 sec
  //清除cookie
  //res.cookie('cookiename','null',{maxAge:0});


  next();
});*/



router.get('/:url',function(req,res,next){
  var url=decodeURIComponent(req.params.url);
  http.get({
    hostname: 'www.96956.com.cn',
    port: 80,
    path: '/mcrapp/jsapiTicket?publishnum=gh_c18d8c5de73b&clientcode=UtvgoCard&clientpwd=32refewf32rfewdss3232fs42edcxilkipoiuytr87',
    agent: false  // create a new agent just for this one request
  }, function(response){
    // Do stuff with response
    var s='';
    response.on('data', function(chunk){
      //console.log('receive data:'+chunk);
      s+=chunk;
    });
    response.on('end', function(){
      //console.log('No more data in response.')
      //res.send(JSON.stringify(s));
      var datas=JSON.parse(s);
      var jsapi_ticket=datas.ticket;
      console.log('jsapi_ticket:'+jsapi_ticket);
      var timestamp=Date.parse( new Date() ).toString().substr(0,10);//10位的时间戳
      console.log('timestamp:'+timestamp);
      var noncestr=createNoncestr();
      console.log('noncestr:'+noncestr);
      console.log(url);
      var string1='jsapi_ticket='+jsapi_ticket+'&noncestr='+noncestr+'&timestamp='+timestamp+'&url='+url;
      console.log(string1);
      var signature=new Hashes.SHA1().hex(string1);//MD5.hex(str)
      console.log('signature:'+signature);
      //console.log(new Hashes.SHA1().b64(string1));
      datas.timestamp=timestamp;
      datas.noncestr=noncestr;
      datas.signature=signature;
      datas.url=url;
      if(datas.errcode==0){
        datas.status=0;
      }else{
        datas.status=1;
      }
      res.send(JSON.stringify(datas));
    });
  }).on('error',function(e){
    console.log('problem with request: ${e.message}');
  });

});


//随机字符串
function createNoncestr(){
  var a=['a','b','c','d','e','f','g','h','i','j','k','m','l','n','o','p','q','r','s','t','u','v','w','x','y','z',0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','M','L','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  var al=a.length;
  var s='';
  for(var i=0;i<16;i++){
    s+=a[fRandomBy(0,al-1)];
  }
  return s;
}






/**生成指定范围的随机整数*/
function fRandomBy(under, over){ 
  switch(arguments.length){ 
    case 1: return parseInt(Math.random()*under+1); 
    case 2: return parseInt(Math.random()*(over-under+1) + under); 
    default: return 0; 
  } 
}


module.exports = router;
