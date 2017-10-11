// MySQL数据库联接配置
module.exports = {
    mysql: {
        host: '127.0.0.1', 
        user: 'root',
        password: '123456',
        database:'creditcard', // 数据库
        port: 3306,
        connectionLimit: 200 //最大连接数
    },
    redis:{
        host: '127.0.0.1',
        port: 6379,
        auth_pass: '123456'
    }
};

