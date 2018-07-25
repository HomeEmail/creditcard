var express = require('express');
var path = require('path');
/*var favicon = require('serve-favicon');
var logger = require('morgan');*/
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var indexHome = require('./routes/home');

var captcha = require('./routes/captcha');
var weixin = require('./routes/weixin');

// var indexHome = require('./routes/index');
// var login = require('./routes/login');
// var getWXsignature = require('./routes/ajaxGetSignature');

/*var users = require('./routes/users');*/
var common = require('./lib/common');
var config = require('./conf/config');//配置项

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');//ejs jade
app.engine('.html',require('ejs').__express);
app.set('view engine','html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
/*app.use(logger('dev'));*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//__dirname 当前代码执行的目录
//path.resolve(__dirname, '..') 当前目录的上级目录
//app.use(express.static(path.join(path.resolve(__dirname, '..'), 'dest')));

app.use(express.static(path.join(path.resolve(__dirname, '..'), 'dest')));

app.use(cookieParser());

//session 配置
console.log('config.js:',config);
app.use(session({
  secret: config.session.secret, //生成session sid和cookie的密钥
  name: 'sid',   //这里的name指的是cookie的name，将会作为cookie随请求发给客户端，默认cookie的name是：connect.sid
  cookie: {maxAge: config.session.maxAge },  //设置maxAge是ms，即maxAge后session和相应的cookie失效过期
  resave: false,
  saveUninitialized: true
}));
//会生成 req.sessionID


// 没有挂载路径的中间件，应用的每个请求都会执行该中间件,注意应用级中间件的顺序
app.use(function (req, res, next) {
  console.log('应用级Time:', Date.now());
  var url=req.url;
  var token=req.get('token');//获取header参数 token
  //检查是否需要登陆验证
  var urlPath=url.split('?')[0];
  var isNeedLogin=true;
  for(var i=0,len=config.notNeedLoginUrls.length;i<len;i++){
    if(urlPath===config.notNeedLoginUrls[i]||urlPath===config.notNeedLoginUrls[i]+'/'){
      isNeedLogin=false;
      break;
    }
  }
  console.log('isNeedLogin:'+isNeedLogin);
  //检查是否登陆了
  if(isNeedLogin){
    if(!!req.session[token]&&common.decrypt(token)===req.session[token]){
      //登陆验证通过
    }else{
      //登陆验证不通过
      res.status(401).send();
      return 0;
    }
  }

  if(req.session){
    console.log('session 存在 值为:',req.session);
    if(!!req.session.captcha){
      console.log('captcha:'+req.session.captcha);//验证码
    }
  }else{
    console.log('session 不存在');
  }
  if(req.cookies){
    console.log('cookies 存在 值为:',req.cookies);//
  }
  if(req.sessionID){
    console.log('req.sessionID:'+req.sessionID);
  }
  console.log('req url:',req.url);
  // if(req.session.sessionName){
  //   console.log('sessionName page was: '+req.session.sessionName);
  // }
  //设置session
  //req.session.sessionName='sessionName';
  //销毁session
  // req.session.destroy(function(err) {
  //   // cannot access session here
  // });

  next();
});

app.use('/',indexHome);
app.use('/captcha',captcha);
app.use('/weixin',weixin);

//app.use('/utvgo_wx/dest/index.html', indexHome);
//app.use('/utvgo_wx/dest/login.html',login);
//app.use('/utvgo_wx/dest/getWXsignature',getWXsignature);
/*app.use('/users', users);*/




// app.get('/login',function(req,res){
//   res.setHeader('AuthorityId', 'xxoo1100');
//   res.send('hello login');
//   //console.log(res);
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).send();
  //next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500).send();
    // res.render('error', {
    //   message: err.message,
    //   error: err
    // });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500).send();
  // res.render('error', {
  //   message: err.message,
  //   error: {}
  // });
});


module.exports = app;
