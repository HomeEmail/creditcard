var $_ = require('underscore');

var $pool = require('./poolPanda');

var $sql = require('./pandaSqlMapping');

module.exports={
	utvgo_supplier:{
		insert:function(req,cb){
			$pool.exec($sql.utvgo_supplier.insert,[req.query.name,req.query.logo,req.query.descript,req.query.createBy,req.query.editeBy,req.query.createTime,req.query.updateTime],cb);
		},
		update:function(req,cb){
			$pool.exec($sql.utvgo_supplier.update,[req.query.name,req.query.descript,req.query.id||0],cb);
		},
		queryAll : function(req,cb){
			$pool.exec($sql.utvgo_supplier.queryAll,[],cb);

		}
	},
	utvgo_language:{
		insert:function(req,cb){
			$pool.exec($sql.utvgo_language.insert,[req.query.name,req.query.descript,req.query.createBy,req.query.editeBy,req.query.createTime,req.query.updateTime],cb);
		},
		update:function(req,cb){
			$pool.exec($sql.utvgo_language.update,[req.query.name,req.query.descript,req.query.id||0],cb);
		},
		queryAll : function(req,cb){
			$pool.exec($sql.utvgo_language.queryAll,[],cb);

		}
	},
	utvgo_area:{
		insert:function(req,cb){
			$pool.exec($sql.utvgo_area.insert,[req.query.name,req.query.descript,req.query.createBy,req.query.editeBy,req.query.createTime,req.query.updateTime],cb);
		},
		update:function(req,cb){
			$pool.exec($sql.utvgo_area.update,[req.query.name,req.query.descript,req.query.id||0],cb);
		},
		queryAll : function(req,cb){
			$pool.exec($sql.utvgo_area.queryAll,[],cb);

		}
	},
	utvgo_channel:{
		insert:function(req,cb){
			$pool.exec($sql.utvgo_channel.insert,[req.query.name,req.query.descript,req.query.createBy,req.query.editeBy,req.query.createTime,req.query.updateTime],cb);
		},
		update:function(req,cb){
			$pool.exec($sql.utvgo_channel.update,[req.query.name,req.query.descript,req.query.id||0],cb);
		},
		queryAll : function(req,cb){
			$pool.exec($sql.utvgo_channel.queryAll,[],cb);

		}
	},
	utvgo_labels:{
		insert:function(req,cb){
			$pool.exec($sql.utvgo_labels.insert,[req.query.name,req.query.functionType,req.query.functionData,req.query.descript,req.query.createBy,req.query.editeBy,req.query.createTime,req.query.updateTime],cb);
		},
		update:function(req,cb){
			$pool.exec($sql.utvgo_labels.update,[req.query.name,req.query.descript,req.query.id||0],cb);
		},
		queryAll : function(req,cb){
			$pool.exec($sql.utvgo_labels.queryAll,[],cb);

		}
	}

};