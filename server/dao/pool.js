var $mysql = require('mysql2');  
var $conf = require('../conf/db');

var mysql_pool = $mysql.createPool(Object.assign({},$conf.mysql));  
module.exports=mysql_pool;

