var $mysql = require('mysql2');  
var $conf = require('../conf/dbPanda');

var Promise = require('bluebird');//promise 库

var mysql_pool = $mysql.createPool(Object.assign({},$conf.mysql));  

module.exports={
	exec:function(querySql,params){
		return new Promise(function(resolve,reject){

			mysql_pool.getConnection(function (err, conn) {
		        if (err) return reject(err);

		        conn.execute(
					querySql,
					params||[],
					function(err,rows,feild){
						//console.log('----------feild-------');
						//console.log(feild);
						conn.release();
						if(err){
							console.log(err);
							reject(err);
							return 0;
						}
						resolve(rows,feild);
					}
				);
		    });
		});
	}
};

