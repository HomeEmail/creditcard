
var path = require('path');
var $panda = require('../dao/pandaDao');
var log4js = require('../conf/log');
var logger = log4js.getLogger(__filename);


function getSupplier(req,cb){
	var req={};
	logger.info('inputDataFromExcel:','query supplier begin');
	$panda.utvgo_supplier.queryAll(req,function(err,rows,feild){
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
	});
	logger.info('inputDataFromExcel:','query supplier end');
}
getSupplier();

function addSupplier(req,cb){
	var query={
		name:'测试供应商'+(new Date().getTime()),
		logo:'',
		descript:'测试',
		createBy:'sys',
		editeBy:'sys',
		createTime:'2018-04-22 22:22:22',
		updateTime:new Date()

	};
	req=req||{};
	req.query=query;
	$panda.utvgo_supplier.insert(req,function(err,rows){
		if(rows&&rows.insertId){
			console.log('insert success:'+rows.insertId);
			return 0;
		}
		console.log('insert error');
	});
}
//addSupplier();

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