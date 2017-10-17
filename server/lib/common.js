//公共基础工具库
var Hashes = require('jshashes');//加密库
var uuidv1 = require('uuid/v1');//base timestamp
var uuidv4 = require('uuid/v4');//base random
var uuidv5 = require('uuid/v5');//base namespace
var fs = require('fs');
var Hashids = require('hashids');//加密解密 (短字符串)
var crypto = require('crypto');//nodejs 自带的加解密库


module.exports = {
    encrypt:function(s){//加密
        var key='xssd&s@$aa.ddWd';//你的密钥
        var cipher = crypto.createCipher('aes-256-cbc',key);
        var crypted = cipher.update(s,'utf8','hex');
        crypted += cipher.final('hex');
        return crypted;
    },
    decrypt:function(s){//解密
        var key='xssd&s@$aa.ddWd';//你的密钥
        var decipher = crypto.createDecipher('aes-256-cbc',key)
        var dec = decipher.update(s,'hex','utf8');
        dec += decipher.final('utf8');
        return dec;
    },
    sha1:function(s){
        return new Hashes.SHA1().hex(s);
    },
    sha1_b64:function(s){
        return new Hashes.SHA1().b64(s);
    },
    sha256:function(s){
        return new Hashes.SHA256().hex(s);
    },
    sha512:function(s){
        return new Hashes.SHA512().hex(s);
    },
    md5:function(s){
        return new Hashes.MD5().hex(s);
    },
    uuidv1 : function(){
        return uuidv1();
    },
    uuidv4 : function(){
        return uuidv4();
    },
    uuidv5 : function(s,type){
        if(type=='DNS'){
            return uuidv5(s, uuidv5.DNS); 
        }
        if(type=='URL'){
            return uuidv5(s,uuidv5.URL);
        }
        var MY_NAMESPACE = '3a602f20-956f-11e7-99ce-17399588291f';
        return uuidv5(s, MY_NAMESPACE);
    },
    hashids_encode:function(nums){//加密 to 短字符串;s:number||array
        var hashids = new Hashids('garden is your public key', 8);//最短8位 
        return hashids.encode(nums); 
    },
    hashids_decode:function(s){//解密 ; s:string
        var hashids = new Hashids('garden is your public key', 8);//最短8位 
        return hashids.decode(s);
    },
    b64_encode:function(s){
        var b = new Buffer(s);
        var s = b.toString('base64');
        return s;
    },
    b64_decode:function(s){
        var b = new Buffer(s, 'base64');
        var s = b.toString();
        return s;
    },
    img2b64:function(file){
        // read binary data
        var bitmap = fs.readFileSync(file);
        // convert binary data to base64 encoded string
        return new Buffer(bitmap).toString('base64');
    },
    b642img:function(s,file){
        try{
             // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
            var bitmap = new Buffer(s, 'base64');
            // write buffer to file
            fs.writeFileSync(file, bitmap);
            console.log('******** File created from base64 encoded string ********');
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
       
    }
};









