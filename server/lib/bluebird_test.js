//var $bluebird = require('bluebird');
var Promise = require('bluebird');//promise 库


var asyncObj={
	fn1:function(){
		console.log('enter fn1');
		return new Promise(function(resolve,reject){

			setTimeout(function(){
				if(true){
					console.log('out fn1');
					resolve();
				}else{
					reject('error1');
				}
			},3000);
		});
	},
	fn2:function(){
		console.log('enter fn2');
		return new Promise(function(resolve,reject){

			setTimeout(function(){
				if(true){
					console.log('out fn2');
					resolve();
				}else{
					reject('error2');
				}
			},2000);
		});
	},
	fn3:function(){
		console.log('enter fn3');
		return new Promise(function(resolve,reject){

			setTimeout(function(){
				if(true){
					console.log('out fn3');
					resolve();
				}else{
					reject('error3');
				}
			},1000);
		});
	}
};
//$bluebird.promisifyAll(asyncObj);//处理

asyncObj.fn1()
.then(asyncObj.fn2)
.then(asyncObj.fn3)
.catch(function(err){
	console.log(err);
});


