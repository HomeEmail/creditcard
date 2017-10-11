var $_ = require('underscore');

var $pool = require('./pool');

var $sql = require('./userSqlMapping');



module.exports={
	insert : function(req,cb){//插入并返回id
		$pool.exec($sql.insert,[req.query.username,req.query.email],cb);
		//查询最新id
		//$pool.exec("SELECT LAST_INSERT_ID() as id",[],cb);

	},
	update : function(req,cb){
		$pool.exec($sql.update,[req.query.name,req.query.email,req.query.userId||0],cb);
	},
	delete :function(req,cb){
		$pool.exec($sql.delete,[req.query.userId||0],cb);
	},
	queryById : function(req,cb){
		$pool.exec($sql.queryById,[req.query.userId],cb);
	},
	queryByUsername : function(req,cb){
		$pool.exec($sql.queryByUsername,[req.query.username],cb);
	},
	queryAll : function(req,cb){
		$pool.exec($sql.queryAll,[],cb);

	}
};