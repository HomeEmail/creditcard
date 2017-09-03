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



//#获取accesstoken的接口地址是
var chengyi_accessToken='http://www.96956.com.cn/mcrapp/accessToken?publishnum=gh_c18d8c5de73b&clientcode=UtvgoCard&clientpwd=32refewf32rfewdss3232fs42edcxilkipoiuytr87';

//#获取jsapi_ticket的接口地址
var chengyi_jsapi_ticket='http://www.96956.com.cn/mcrapp/jsapiTicket?publishnum=gh_c18d8c5de73b&clientcode=UtvgoCard&clientpwd=32refewf32rfewdss3232fs42edcxilkipoiuytr87';


/* GET login page. */
router.get('/', function(req, res, next) {
  /*res.setHeader('token', 'xxoo1100');*/
  //重定向
  //res.location('/login');
  //res.status(301).send('跳转中...');
  //重定向
  //res.redirect('/login');
  //http://fshk.96956.com.cn/utvgoClient/interfaces/main_index.action
  
  

  console.log(req.protocol); //http
  console.log(req.hostname);//本地nodejs服务的hostname(如有nginx转发过来的，则不是浏览器地址的)
  //console.log(req.port);//没有这个属性
  console.log(req.headers);
  //console.log(req.connection);
  console.log(req.originalUrl);
  console.log(req.headers.host);
  var url=req.protocol+'://'+req.headers.host+req.originalUrl;//当前网址
  console.log('url:'+url);//http://fshk.96956.com.cn/utvgo_wx/dest/index.html

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
      res.render('login',datas);
    });
  }).on('error',function(e){
    console.log('problem with request: ${e.message}');
  });

});



/*

router.get('/logout',function(req,res,next){
	res.send('logout ooh! are u sure?');
});

router.get('/login',function(req,res){
  //res.setHeader('AuthorityId', 'xxoo1100');
  //res.setHeader('Content-Type', 'application/json');//application/x-www-form-urlencoded application/json text/xml form-data ext/html
  //res.send('hello login');
  console.log(req.get('content-type'));
  console.log('req header token: '+req.get('token'));
  //req.xhr//是否是ajax发起的请求
  res.render('login',{title:'login'});
  console.log('login');
});
router.post('/login',function(req,res){
  res.setHeader('token', 'xxoo1100');
  var info=req.body.username+'<br/>'+req.body.pwd;
  res.send(info+'<br/>login success');
  console.log(req.body);
  //console.log(res);
});
router.get('/login/check',function(req,res){
  res.send('login check');
  console.log('/login/check');
});
*/

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
