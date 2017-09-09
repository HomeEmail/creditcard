//公共基础工具库
var Hashes = require('jshashes');//加密库
var uuidv1 = require('uuid/v1');//base timestamp
var uuidv4 = require('uuid/v4');//base random
var uuidv5 = require('uuid/v5');//base namespace

module.exports = {
    sha1:function(s){
        return new Hashes.SHA1().hex(s);
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
    }
};









