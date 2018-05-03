var $_ = require('underscore');

var $pool = require('./poolPanda');

var $sql = require('./pandaSqlMapping');

module.exports={
	utvgo_supplier:{
		insert:function(req){
			return $pool.exec($sql.utvgo_supplier.insert,[req.query.name,req.query.logo,req.query.descript,req.query.createBy,req.query.editeBy,req.query.createTime,req.query.updateTime]);
		},
		update:function(req){
			return $pool.exec($sql.utvgo_supplier.update,[req.query.name,req.query.descript,req.query.id||0]);
		},
		queryAll : function(req){
			return $pool.exec($sql.utvgo_supplier.queryAll,[]);

		},
		queryTotalNum : function(req){
			return $pool.exec($sql.utvgo_supplier.queryTotalNum,[]);
		},
		queryLimit : function(req){
			return $pool.exec($sql.utvgo_supplier.queryLimit,[req.query.offsize,req.query.pageSize]);
		}
	},
	utvgo_language:{
		insert:function(req){
			return $pool.exec($sql.utvgo_language.insert,[req.query.name,req.query.descript,req.query.createBy,req.query.editeBy,req.query.createTime,req.query.updateTime]);
		},
		update:function(req){
			return $pool.exec($sql.utvgo_language.update,[req.query.name,req.query.descript,req.query.id||0]);
		},
		queryAll : function(req){
			return $pool.exec($sql.utvgo_language.queryAll,[]);

		}
	},
	utvgo_area:{
		insert:function(req){
			return $pool.exec($sql.utvgo_area.insert,[req.query.name,req.query.descript,req.query.createBy,req.query.editeBy,req.query.createTime,req.query.updateTime]);
		},
		update:function(req){
			return $pool.exec($sql.utvgo_area.update,[req.query.name,req.query.descript,req.query.id||0]);
		},
		queryAll : function(req){
			return $pool.exec($sql.utvgo_area.queryAll,[]);

		}
	},
	utvgo_channel:{
		insert:function(req){
			return $pool.exec($sql.utvgo_channel.insert,[req.query.name,req.query.descript,req.query.createBy,req.query.editeBy,req.query.createTime,req.query.updateTime]);
		},
		update:function(req){
			return $pool.exec($sql.utvgo_channel.update,[req.query.name,req.query.descript,req.query.id||0]);
		},
		queryAll : function(req){
			return $pool.exec($sql.utvgo_channel.queryAll,[]);

		}
	},
	utvgo_labels:{
		insert:function(req){
			return $pool.exec($sql.utvgo_labels.insert,[req.query.name,req.query.functionType,req.query.functionData,req.query.descript,req.query.createBy,req.query.editeBy,req.query.createTime,req.query.updateTime]);
		},
		update:function(req){
			return $pool.exec($sql.utvgo_labels.update,[req.query.name,req.query.descript,req.query.id||0]);
		},
		queryAll : function(req){
			return $pool.exec($sql.utvgo_labels.queryAll,[]);

		}
	}

};