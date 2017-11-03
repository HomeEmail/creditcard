var ftp=require('ftp');
var fs=require('fs');
var config=require('../conf/ftp');
var path = require('path');
var iconv = require('iconv-lite');

//Get a directory listing of the current (remote) working directory:
var c = new ftp();
c.on('ready', function() {
	c.list('/tvutvgo/',function(err, list) {
		if (err) throw err;
		//console.dir(list);
		var len=list.length;
		var buffer;
		list.forEach(function (element, index, array) {
			//buffer = new Buffer(element.name,'utf8');
			//element.name=iconv.decode(element.name,'gb2312');
			//下载，文件名有中文不行，
            //Ignore directories
            if (element.type === 'd') {
                console.log('ignoring directory ' + element.name);
                return;
            }
            //Ignore non zips
            if (path.extname(element.name) == '.zip') {
                console.log('ignoring file ' + element.name);
                return;
            }
            if(element.name.indexOf('wap live')>-1){ //eclipse问题汇总 wap live hybrid
            	console.log('begin Download file-->');
            	c.get('/tvutvgo/'+element.name, function (err, stream) {
                	if (err) throw err;
	                stream.once('close', function () {
	                	console.log('Download File OK!');
	                    c.end();

	                });
	                stream.pipe(fs.createWriteStream(element.name));//下载到当前终端执行命令的目录下
	            });
            }else{
            	console.log('no this file! ->'+element.name);
            	// if(index==(len-1)){//遍历到最后一个文件了
	            // 	c.end();
	            // }
            }
            

            //Download files
            /*c.get(element.name, function (err, stream) {
                if (err) throw err;
                stream.once('close', function () {
                    c.end();
                });
                stream.pipe(fs.createWriteStream(element.name));
            });*/
        });
		//c.end();
	});
});
// connect to localhost:21 as anonymous 
c.connect(config);


/*//Download remote file 'foo.txt' and save it to the local file system:
var c = new ftp();
c.on('ready', function() {
	c.get('foo.txt', function(err, stream) {
		if (err) throw err;
		stream.once('close', function() { c.end(); });
		stream.pipe(fs.createWriteStream('foo.local-copy.txt'));
	});
});
// connect to localhost:21 as anonymous 
c.connect(config);



//Upload local file 'foo.txt' to the server:
var c = new ftp();
c.on('ready', function() {
	c.put('foo.txt', 'foo.remote-copy.txt', function(err) {
		if (err) throw err;
		c.end();
	});
});
// connect to localhost:21 as anonymous 
c.connect(config);*/