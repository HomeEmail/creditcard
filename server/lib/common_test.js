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
var path = require('path');

var common =require('./common');

console.log('sha1:'+common.sha1('123456'));
console.log('sha256:'+common.sha256('123456'));
console.log('sha512:'+common.sha512('123456'));
console.log('md5:'+common.md5('123456'));
console.log('sha1_b64:'+common.sha1_b64('123456'));

console.log('uuidv1:'+common.uuidv1());
console.log('uuidv4:'+common.uuidv4());
console.log('uuidv5:'+common.uuidv5('12345'));
console.log('uuidv5 dns:'+common.uuidv5('12345','DNS'));
console.log('uuidv5 url:'+common.uuidv5('12345','URL'));

console.log('base64 encode:'+common.b64_encode('JavaScript'));
console.log('base64 decode:'+common.b64_decode('SmF2YVNjcmlwdA=='));

console.log('__dirname:'+__dirname);
console.log('path.resolve:'+path.resolve('./'));// 当前项目根路径绝对路径

var projectPath=path.resolve('./');//不带/的

var img_base64_str=common.img2b64(projectPath+'/server/public/images/test2.png');
console.log('img_base64_str:'+img_base64_str);
console.log('---------------img_base64_str end----------------');
common.b642img(img_base64_str,projectPath+'/server/upload/test-2.png');

//http://www.cnblogs.com/nano/archive/2013/05/27/3101348.html

var encodeStr1=common.hashids_encode(['66',77,'88',99]);//参数只支持数字或数字数组；不合法的将返回空字符串

//console.log('字符串加密成短字符串');
console.log('hashids_encode:'+encodeStr1+'||end');
//console.log('短字符串解密');
console.log('hashids_decode:'+common.hashids_decode(encodeStr1)+'||end');
console.log(common.hashids_decode(encodeStr1));

//加解密
var encryptStr=common.encrypt('sdf2233d$dsf||33||username');
console.log('encryptStr:'+encryptStr);
var decryptStr=common.decrypt(encryptStr);
console.log('decryptStr:'+decryptStr);







