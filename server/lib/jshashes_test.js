//jshashes 加密库测试

var Hashes = require('jshashes');//加密库

var string1= '123456';
var signature=new Hashes.SHA1().hex(string1);//
console.log('sha1:'+ signature);
console.log('sha1 b64:'+ new Hashes.SHA1().b64(string1));
console.log('SHA256:'+ new Hashes.SHA256().hex(string1));
console.log('SHA512:'+ new Hashes.SHA512().hex(string1));

var MD5 = new Hashes.MD5;

console.log('MD5:'+ MD5.hex(string1));

