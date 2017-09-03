var $_ = require('underscore');

var $pool = require('./pool');

var $sql = require('./userSqlMapping');



module.exports={
	insert : function(req,cb){//插入并返回id
		$pool.getConnection(function (err, conn) {
	        if (err) return cb(err);
	        conn.execute(
				$sql.insert,
				[req.query.username,req.query.email],
				function(err,rows){
					conn.release();
					if(err){
						console.log(err);
						cb(err);
						return 0;
					}
					cb(err,rows);
					console.log('insert:');
					console.log(rows);

					/*conn.execute("SELECT LAST_INSERT_ID() as id",function(err1,rows1){
		                conn.release();
		                if(err1){
				            console.log(err1);
				            cb(err1);
				        }else{
				            cb(err1,rows1);
				        }
			        	
		            });*/
			        
			    }
			);
	    });

		
	},
	update : function(req,cb){
		$pool.getConnection(function (err, conn) {
	        if (err) return cb(err);

	        conn.execute(
				$sql.update,
				[req.query.name,req.query.email,req.query.userId||0],
				function(err,rows){
					conn.release();
					if(err){
						console.log(err);
						cb(err);
						return 0;
					}
					cb(err,rows);
					console.log('update:');
					console.log(rows);
				}
			);
	    });
	},
	delete :function(req,cb){
		$pool.getConnection(function (err, conn) {
	        if (err) return cb(err);

	        conn.execute(
				$sql.delete,
				[req.query.userId||0],
				function(err,rows){
					conn.release();
					if(err){
						console.log(err);
						cb(err);
						return 0;
					}
					cb(err,rows);
					console.log('delete:');
					console.log(rows);
				}
			);
	    });
	},
	queryById : function(req,cb){
		$pool.getConnection(function (err, conn) {
	        if (err) return cb(err);
	        console.log(req.query.userId);
	        conn.execute(
				$sql.queryById,
				[req.query.userId],
				function(err,rows){
					conn.release();
					if(err){
						console.log(err);
						cb(err);
						return 0;
					}
					cb(err,rows);
				}
			);
	    });
	},
	queryByUsername : function(req,cb){
		$pool.getConnection(function (err, conn) {
	        if (err) return cb(err);
	        console.log(req.query.username);
	        conn.execute(
				$sql.queryByUsername,
				[req.query.username],
				function(err,rows){
					conn.release();
					if(err){
						console.log(err);
						cb(err);
						return 0;
					}
					cb(err,rows);
				}
			);
	    });
	},
	queryAll : function(req,cb){
		$pool.getConnection(function (err, conn) {
	        if (err) return cb(err);

	        conn.execute(
				$sql.queryAll,
				[],
				function(err,rows){
					conn.release();
					if(err){
						console.log(err);
						cb(err);
						return 0;
					}
					cb(err,rows);
				}
			);
	    });

		
	}
};