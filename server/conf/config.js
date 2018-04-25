// MySQL数据库联接配置
module.exports = {
    session: {
        secret: 'fuckyou.oo' //session 密钥
        ,maxAge: 60*1000 //失效时间 毫秒
        
    },
    notNeedLoginUrls:[ //不需要登陆的接口地址
        '/',
        '/login',
        '/captcha',
        '/captcha/math'
    ]
};

