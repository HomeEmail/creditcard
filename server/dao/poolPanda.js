var $mysql = require('mysql2');  
var $conf = require('../conf/dbPanda');



var mysql_pool = $mysql.createPool(Object.assign({},$conf.mysql));  

module.exports={
	exec:function(querySql,params,cb){
		mysql_pool.getConnection(function (err, conn) {
	        if (err) return cb(err);

	        conn.execute(
				querySql,
				params||[],
				function(err,rows,feild){
					//console.log('----------feild-------');
					//console.log(feild);
					conn.release();
					if(err){
						console.log(err);
						cb(err);
						return 0;
					}
					cb(err,rows,feild);
				}
			);
	    });
	}
};

