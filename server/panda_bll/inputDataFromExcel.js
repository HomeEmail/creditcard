
var path = require('path');
var $panda = require('../dao/pandaDao');
var log4js = require('../conf/log');
var logger = log4js.getLogger(__filename);


function getSupplier(req,cb){
	var req={};
	logger.info('inputDataFromExcel:','query supplier begin');
	console.log('333333333');
	$panda.utvgo_supplier.queryAll(req)
	.then(function(rows,feild){
		if(rows&&rows.length>0){
			logger.info('inputDataFromExcel:','query supplier ok');
			console.log(JSON.stringify(rows));
			return 0;
		}
		if(rows&&rows.length<=0){
			console.log('no data');
			return 0;
		}
	})
	.catch(function(err){
		console.log('utvgo_supplier error:',err);
		logger.error('inputDataFromExcel:','query supplier error');
	})
	.then(function(){
		return $panda.utvgo_language.queryAll(req);
	})
	.then(function(rows,feild){
		console.log('utvgo_language----------');
		if(rows&&rows.length>0){
			//logger.info('inputDataFromExcel:','query supplier ok');
			console.log(JSON.stringify(rows));
			return 0;
		}
		if(rows&&rows.length<=0){
			console.log('no data');
			return 0;
		}
	})
	.catch(function(err){
		console.log('utvgo_language error:',err);
		logger.error('inputDataFromExcel:','query language error');
	})
	.finally(function(){
		console.log('final........33003......');
		logger.info('inputDataFromExcel:','query supplier end');
	});

	/*$panda.utvgo_supplier.queryAll(req,function(err,rows,feild){
		if(rows&&rows.length>0){
			logger.info('inputDataFromExcel:','query supplier ok');
			console.log(JSON.stringify(rows));
			return 0;
		}
		if(rows&&rows.length<=0){
			console.log('no data');
			return 0;
		}
		logger.error('inputDataFromExcel:','query supplier error');
		return 0;
	});*/

	
}
//getSupplier();

function addSupplier(req,cb){
	var query={
		name:'测试供应商'+(new Date().getTime()),
		logo:'',
		descript:'测试11',
		createBy:'sys',
		editeBy:'sys',
		createTime:'2018-04-22 22:22:22',
		updateTime:new Date()

	};
	req=req||{};
	req.query=query;
	$panda.utvgo_supplier.insert(req)
	.then(function(rows,feild){
		if(rows&&rows.insertId){
			console.log('insert supplier success:'+rows.insertId);
			req.query.id=rows.insertId;
			//console.log('insert feild:',feild);//undefined
			return 0;
		}
	})
	.catch(function(err){
		console.log('supplier insert error:',err);
	})
	.then(function(){
		req.query.descript='测试333333更新';
		return $panda.utvgo_supplier.update(req);
	})
	.then(function(rows,feild){
		console.log('update supplier success:',rows);
		if(rows&&rows.serverStatus==2&&rows.affectedRows>0){
	      //res.send(JSON.stringify(rows));
	      console.log('update supplier affectedRows:'+rows.affectedRows);
	      return;
	    }
	    if(rows.affectedRows<=0){
	      console.log('no this record;update fail!');
	      return;
	    }
		//console.log('update feild:',feild);//undefined
	})
	.catch(function(err){
		console.log('supplier update error:',err);
	})
	.then(function(){
		console.log('queryTotalNum supplier begin');
		return $panda.utvgo_supplier.queryTotalNum();
	})
	.then(function(rows,feild){
		console.log('queryTotalNum supplier success:',rows);
		if(rows&&rows.length>0){
			console.log('queryTotalNum supplier num:',rows[0].ROWS);
		}
		
		//console.log('queryTotalNum feild:',feild);//undefined
	})
	.catch(function(err){
		console.log('supplier queryTotalNum error:',err);
	})
	.finally(function(){
		console.log('insert and update finally...');
	});

	/*$panda.utvgo_supplier.insert(req,function(err,rows){
		if(rows&&rows.insertId){
			console.log('insert success:'+rows.insertId);
			return 0;
		}
		console.log('insert error');
	});*/
}
addSupplier();

function getLanguage(req,cb){
	var req={};
	$panda.utvgo_language.queryAll(req,function(err,rows,feild){
		if(rows&&rows.length>0){
			//logger.info('inputDataFromExcel:','query supplier ok');
			console.log(JSON.stringify(rows));
			return 0;
		}
		if(rows&&rows.length<=0){
			console.log('no data');
			return 0;
		}
		//logger.error('inputDataFromExcel:','query supplier error');
		return 0;
	});
}
function getArea(req,cb){
	var req={};
	$panda.utvgo_area.queryAll(req,function(err,rows,feild){
		if(rows&&rows.length>0){
			//logger.info('inputDataFromExcel:','query supplier ok');
			console.log(JSON.stringify(rows));
			return 0;
		}
		if(rows&&rows.length<=0){
			console.log('no data');
			return 0;
		}
		//logger.error('inputDataFromExcel:','query supplier error');
		return 0;
	});
}
function getChannel(req,cb){
	var req={};
	$panda.utvgo_channel.queryAll(req,function(err,rows,feild){
		if(rows&&rows.length>0){
			//logger.info('inputDataFromExcel:','query supplier ok');
			console.log(JSON.stringify(rows));
			return 0;
		}
		if(rows&&rows.length<=0){
			console.log('no data');
			return 0;
		}
		//logger.error('inputDataFromExcel:','query supplier error');
		return 0;
	});
}
function getLabels(req,cb){
	var req={};
	$panda.utvgo_labels.queryAll(req,function(err,rows,feild){
		if(rows&&rows.length>0){
			//logger.info('inputDataFromExcel:','query supplier ok');
			console.log(JSON.stringify(rows));
			return 0;
		}
		if(rows&&rows.length<=0){
			console.log('no data');
			return 0;
		}
		//logger.error('inputDataFromExcel:','query supplier error');
		return 0;
	});
}