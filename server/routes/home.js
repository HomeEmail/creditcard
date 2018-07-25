var express = require('express');
var router = express.Router();
var http = require('http');
var Hashes = require('jshashes');//加密库
var path = require('path');
var $user = require('../dao/userDao');
var log4js = require('../conf/log');//配置好的日记对象
var logger=log4js.getLogger(__filename);//把当前代码文件路径也输出到日记中

var wx_api= require('../lib/wx_api');

var common=require('../lib/common');

var execFile = require('child_process').execFile;

//var cache = require('../dao/cache');//返回配置好的缓存对象

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
  var obj={
    title:'welcome to Home!',
    id:3344,
    code:1,
    number:fRandomBy(1,500),
    msg:'OK'
  };

  


  logger.info('index:','query mysql begin');

  $user.queryAll(req,function(err,rows,feild){
    //console.log(err);
    //console.log(rows);
    if(rows&&rows.length>0){//rows是数组
      res.send(JSON.stringify(rows));

	    // //set cache
	    // cache.set('author','ivan',function(err,res){
		   //  console.log('print:'+res);
	    // });
	    // cache.get('author',function(err,res){
		   //  if(err){
			  //   console.log('Error:'+err);
			  //   return;
		   //  }
		   //  console.log('custom callback handle:'+res);
	    // });

	    // cache.expire('author',20);//设置键author 20秒后过期
      

      /*console.log('-----need many time handle this task-----');

	    console.log(__dirname);

	    console.log('path.resolve:'+path.resolve('./'));// 当前执行node命令时所处的目录路径

	    //假设这里耗时很多的,开另外一个异步进程来处理，不影响后来的请求

		  var param = path.resolve('./')+'/server/lib/child_tast_handle.js';

		  //node ../lib/child_tast_handle.js
	    execFile('node',[param,'param1','param2'],{
		    //cwd:__dirname
	    },function(err,stdout,stderr){
		   if(err){
			   console.log(err);
			   return;
		   }
		    console.log(':'+stdout);
	    });*/

      return;
    }
    if(rows&&rows.length<=0){
      res.send('no data');
      return;
    }
    
    logger.error('index:','query mysql error');

    res.send(err);

  });

  //?username=xx&email=xx@qq.com
  /*$user.insert(req,function(err,rows){
    console.log(err);
    console.log(rows);//插入操作，返回rows是对象
    if(rows&&rows.insertId){ //insertId 就是刚刚新增的id
      res.send(JSON.stringify(rows));
      return;
    }
    
    res.send(err);//插入失败，比如数据数据不唯一等等
    // {
    //   "code": "ER_DUP_ENTRY",
    //   "errno": 1062,
    //   "sqlState": "#23000"
    // }

  });*/



  //index.html/?name=刘传宝&email=xxoo@xx.com&userId=1
  /*$user.update(req,function(err,rows){
    console.log(err);
    console.log(rows);//更新操作，返回rows是对象
    if(rows&&rows.serverStatus==2&&rows.affectedRows>0){
      res.send(JSON.stringify(rows));
      return;
    }
    if(rows.affectedRows<=0){
      res.send('no this record;update fail!');
      return;
    }

    res.send(err);
  });*/

  //index.html/?userId=1
  /*$user.delete(req,function(err,rows){
    console.log(err);
    console.log(rows);//删除操作，返回rows是对象
    if(rows&&rows.serverStatus==2&&rows.affectedRows>0){
      res.send(JSON.stringify(rows));
      return;
    }
    if(rows.affectedRows<=0){
      res.send('no this record;delete fail!');
      return;
    }
    
    res.send(err);
  });*/

  //index.html/?userId=1
  /*$user.queryById(req,function(err,rows){
    //console.log(req.query.userId);
    if(rows&&rows.length>0){//rows是数组
      res.send(JSON.stringify(rows));
      return;
    }
    if(rows.length<=0){
      res.send('no data');
      return;
    }
    console.log(err);
    console.log(rows);
    res.send(err);
  });*/

  //index.html/?username=ivan
  /*$user.queryByUsername(req,function(err,rows){
    //console.log(req.query.username);
    if(rows&&rows.length>0){//rows是数组
      res.send(JSON.stringify(rows));
      return;
    }
    if(rows.length<=0){
      res.send('no data');
      return;
    }
    console.log(err);
    console.log(rows);
    res.send(err);
  });*/

  //res.send(JSON.stringify(obj));

});







router.get('/logout',function(req,res,next){
  var token=req.get('token');//获取header参数 token
  var data={};
  if(!token){
    data={
      code:0,
      msg:'param error'
    };
  }
  if(!!req.session[token]){
    req.session[token]=null;
    //销毁session
    req.session.destroy(function(err) {
      // cannot access session here
    });
    //req.session={};
    data={
      code:1,
      msg:'logout success',
      isLogout:true
    };
  }
  
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

router.get('/test1',function(req,res,next){
  res.setHeader('Content-Type', 'application/json');
  res.send({oo:1,dd:'ss',token:req.get('token')});//获取header参数 token
});

router.get('/test1/child',function(req,res,next){
  //console.log('req.headers:',req.headers);
  console.log('req.get(\'token\')',req.get('token'));
  res.setHeader('Content-Type', 'application/json');
  res.send({test:'child',oo:1,dd:'ss',aa:null,bb:undefined,token:req.get('token')});//获取header参数 token
});

router.get('/test',function(req,res,next){
  req.session.testId='indextestid:'+new Date().getTime();
  res.setHeader('Content-Type', 'application/json');
  res.send({oo:1,dd:'ss',testId:req.session.testId});//
});

router.get('/test/sd',function(req,res,next){
  //console.log('req.headers:',req.headers);
  res.setHeader('Content-Type', 'application/json');
  res.send({test:'child',oo:1,dd:'ss',aa:null,bb:undefined,testId:req.session.testId});//
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
*/

router.post('/login',function(req,res){
  var username=req.body.username;
  var pwd=req.body.pwd;

  var data={
    code:0,
    msg:'login failure'
  };
  if(!username||!pwd){
    data.msg='账号或密码为空';
  }

  if(username=='ivan'&&pwd=='123456'){
    var value=username+'||'+Date.now();
    var token=common.encrypt(value);
    req.session[token]=value;
    res.setHeader('token', token);
    data={
      code:1,
      msg:'login success',
      token:token
    };
  }else{
    data={
      code:0,
      msg:'login failure:username or pwd error'
    }
  }
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});
router.get('/login/check',function(req,res){
  var token=req.get('token');//获取header参数 token
  console.log('/login/check','req.get',token);
  var data={
  };
  if(!token){
    data={
      code:0,
      msg:'param error'
    };
  }else{
    data={
      code:1,
      msg:'',
      isLogin:!!req.session[token]&&common.decrypt(token)===req.session[token]
    };
  }
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});



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
