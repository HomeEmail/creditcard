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
    client.select(3);//选择库

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

    //hash
    client.hmset('lesson:short',{'js':'javascript','C#':'C Sharp'},function(err,res){
        if(err){
            console.log('Error:'+err);
            return;
        }
        console.log('custom callback handle:'+res);
    });

    client.hgetall('lesson:short',function(err,res){
        if(err){
            console.log('Error:'+err);
            return;
        }
        console.log(res.js);
        console.dir(res);
    });

    //集合
    var key = 'skills';
    client.sadd(key,'C#',$redis.print);
    client.sadd(key,'nodejs',$redis.print);
    client.sadd(key,'MySQL',$redis.print);

    //事务
    client.multi()
    .set('uuid','1234567')
    .get('uuid')
    .sismember(key,'C#') //元素value是否存在于集合key中，存在返回1，不存在返回0
    .smembers(key) //返回集合 key 中的所有成员，不存在的集合key也不会报错，而是当作空集返回
    .exec(function(err,replies){
        console.log('MULTI got ' + replies.length + ' replies');
        replies.forEach(function(item,index){
            console.log('Reply '+ index + ': '+item.toString());
        });
        //client.quit();
    });

    client.smembers(key,function(err,res){
        console.log(res);
    });

    console.log('---uid----');
    var uid=client.get('uid');
    console.log(uid);
    if(!!!uid){
        console.log('uid is false');
    }

    //下边是promise方式 所有redis库方法加Async后缀
    client.setAsync('var1','var11').then(function(res){
        console.log('setAsync result:');
        console.log(res);
        
        client.getAsync('var1').then(function(res){
            console.log('getAsync result:');
            console.log(res); 
            client.quit();
        });
    }).catch(function(err){
        console.log(err);
    });

   //client.quit();

});
