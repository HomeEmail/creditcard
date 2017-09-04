var $redis = require('redis');

var client = $redis.createClient(6379,'127.0.0.1',{auth_pass:'123456'});
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
    client.sadd(key,'C#');
    client.sadd(key,'nodejs');
    client.sadd(key,'MySQL');

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

    client.quit();

});
