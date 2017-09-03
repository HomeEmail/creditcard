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


/* GET home page. */
router.get('/', function(req, res, next) {
  /*res.setHeader('token', 'xxoo1100');*/
  //重定向
  //res.location('/login');
  //res.status(301).send('跳转中...');
  //重定向
  //res.redirect('/login');
  //http://fshk.96956.com.cn/utvgoClient/interfaces/main_index.action
  http.get({
    hostname: 'fshk.96956.com.cn',
    port: 80,
    path: '/utvgoClient/interfaces/main_index.action',
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
      datas.title='推荐 - 佛山U生活';
      handleTopBanner(datas);
      res.render('index',datas);
    });
  }).on('error',function(e){
    console.log('problem with request: ${e.message}');
  });

});

function hasDetailPage(channelId){
  var channelIds=[10085,10086];
  for(var i=0,len=channelIds.length;i<len;i++){
    if(channelId==channelIds[i]){
      return true;
    }
  }
  return false;
}
function handleTopBanner(data){
  var items=data.result.headPics;
  for(var i=0,len=items.length;i<len;i++){
    if(hasDetailPage(items[i].extra.channelId)){
      items[i].href='./dyDetail.html?channelId='+items[i].extra.channelId+'&contentId='+items[i].extra.id+'&type='+(items[i].extra.channelId==10086 ? 'dsj':'dy');
    }else{
      items[i].href='list_set.html?qdId='+items[i].extra.id+'&qdName='+items[i].extra.name;
    }

  }
}


router.get('/getWXsignature/:url',function(req,res,next){
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







router.get('/logout',function(req,res,next){
	res.send('logout ooh! are u sure?');
});


/*
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



/**生成指定范围的随机整数*/
function fRandomBy(under, over){ 
  switch(arguments.length){ 
    case 1: return parseInt(Math.random()*under+1); 
    case 2: return parseInt(Math.random()*(over-under+1) + under); 
    default: return 0; 
  } 
}
/*
var heyuData={
  total: 301,
  records: [
    {
      id: 1,
      gid: 1,
      name: "小传",
      greeting: "春节到，快乐找你谈心，幸福揽你入怀，健康赐你福寿，吉祥赏你好运，平安保你满意，朋友则送你祝福：祝你新春快乐，吉星高照，阖家幸福，万事如意",
      zone: "天河",
      createTime: 1454031784,
      statusCode: "0",
      sortNum: 0
    }
  ],
  pageSize: 8
};

var letter='春节到，快乐找你谈心，幸福揽你入怀，健康赐你福寿，吉祥赏你好运，平安保你满意，朋友则送你祝福：祝你新春快乐，吉星高照，阖家幸福，万事如意';
letter=letter.split('');
function getName(){
  var len=letter.length;
  return letter[fRandomBy(0,len-1)]+letter[fRandomBy(0,len-1)]+letter[fRandomBy(0,len-1)];
}
function getHeyu(){
  var len=letter.length;
  var s='';
  for(var i=0;i<80;i++){
    s+=letter[fRandomBy(0,len-1)];
  }
  return s;
}
function generateData(offset,pageSize){
  heyuData.pageSize=pageSize;
  if((offset+pageSize)>=heyuData.total){
    pageSize=heyuData.total-offset;
  }
  var records=[];
  if(offset<heyuData.total){
    for(var i=0;i<pageSize;i++){
      records.push({
        id:offset+i
        ,gid:offset+i
        ,name:getName()
        ,greeting:getHeyu()
        ,zone: "南海"
        ,createTime: +new Date()
        ,statusCode: "0"
        ,sortNum: 0
      });
    }
  }
  heyuData.records=records;
  return JSON.stringify(heyuData);
}
router.get('/heyu',function(req,res){
  ///heyu?offset=0&pageSize=10
  var offset=req.query.offset||0;
  var pageSize=req.query.pageSize||5;
  offset=parseInt(offset,10);
  pageSize=parseInt(pageSize,10);
  var str=generateData(offset,pageSize);
  res.send(str);
  console.log('/heyu?offset='+offset+'&pageSize='+pageSize);
});
*/

/*
//hifi 获得风格列表
router.get('/hifi/fenge',function(req,res){
  var str='{"code":"0","data":[{"name":"流行","id":12},{"name":"古典","id":11}]}';
  res.send(str);
});

//hifi 根据风格拿专辑
router.get('/hifi/fenge/get',function(req,res){
  var str='{"code":"0","data":{"list":[{"name":"刘德华经典","id":11}],"totalPage":1,"page":1,"total":1}}';
  res.send(str);
});

*/


module.exports = router;
