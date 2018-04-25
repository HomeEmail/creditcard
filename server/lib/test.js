
// import {someConfig} from 'test1';

// console.log(someConfig);
var fs = require('fs');
var path = require('path');

//判断文件是否存在
if(fs.access(path.join(__dirname,'test.log'),fs.F_OK,function(err){
	console.log(err?'test.log文件不存在':'test.log文件存在');
}));
if(fs.access(path.join(__dirname,'common.js'),fs.F_OK,function(err){
	console.log(err?'common.js文件不存在':'common.js文件存在');
}));

console.log('__dirname:'+__dirname);

console.log('__filename:'+__filename);

//(() => {console.log('=>>>>>');})();


//node v7 

// async function sleep(timeout) {
//   return new Promise((resolve, reject) => {
//     setTimeout(function() {
//       resolve();
//     }, timeout);
//   });
// };


// (async function() {
//   console.log('Do some thing, ' + new Date());
//   await sleep(3000);
//   console.log('Do other things, ' + new Date());
// })();

