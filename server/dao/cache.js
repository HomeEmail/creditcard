var $conf=require('../conf/db');

var $redis = require('redis');

var $bluebird = require('bluebird');//promise 库
$bluebird.promisifyAll($redis);

var client = $redis.createClient($conf.redis);
//console.log(client);

client.on('ready',function(err){
    console.log('redis ready');
});

client.on('error',function(err){
    console.log('Error '+err);
});

//redis 运行信息

// client.info(function(err,response){
//     console.log(err,response);
// });

client.on('connect',function(){
    console.log('connected redis');
});

module.exports=client;

/*
//use demo:
//字符串
client.set('author','ivan',$redis.print);
client.get('author',$redis.print);
client.get('author',function(err,res){
    if(err){
        console.log('Error:'+err);
        return;
    }
    console.log('custom callback handle:'+res);
});

client.expire('author',20);//设置键author 20秒后过期


//下边是promise方式 所有redis库方法加Async后缀
client.setAsync('var1','var11').then(function(res){
    console.log('setAsync result:');
    console.log(res);
    return client.getAsync('var1');
}).then(function(res){
    console.log('getAsync result:');
    console.log(res); 
});

*/