//jshashes 加密库测试

/*var Hashes = require('jshashes');//加密库

var string1= '123456';
var signature=new Hashes.SHA1().hex(string1);//
console.log('sha1:'+ signature);
console.log('sha1 b64:'+ new Hashes.SHA1().b64(string1));
console.log('sha1 bb:'+ new Hashes.SHA1().hex('MTIzNDU2'));

console.log('SHA256:'+ new Hashes.SHA256().hex(string1));
console.log('SHA512:'+ new Hashes.SHA512().hex(string1));

//var MD5 = new Hashes.MD5;

console.log('MD5:'+ new Hashes.MD5().hex(string1));

*/

var common =require('./common');

console.log(common.sha1('123456'));
console.log(common.sha256('123456'));
console.log(common.sha512('123456'));
console.log(common.md5('123456'));

console.log('uuidv1:'+common.uuidv1());
console.log('uuidv4:'+common.uuidv4());
console.log('uuidv5:'+common.uuidv5('12345'));
console.log('uuidv5 dns:'+common.uuidv5('12345','DNS'));
console.log('uuidv5 url:'+common.uuidv5('12345','URL'));

var b = new Buffer('JavaScript');
var s = b.toString('base64');
console.log('base64 encode:'+s);

var bb = new Buffer('SmF2YVNjcmlwdA==', 'base64')
var ss = bb.toString();
console.log('base64 decode:'+ss);

//http://www.cnblogs.com/nano/archive/2013/05/27/3101348.html



